// Spočítá časování scén a titulků z nahraných hlasů a složí hlasovou stopu každého videa.
// Spuštění: node --experimental-strip-types skripty/casovani.mjs
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VIDEA } from '../src/data/videa.ts';

const KOREN = join(dirname(fileURLToPath(import.meta.url)), '..');
const SCENY = join(KOREN, 'public/audio/sceny');
const HLAS = join(KOREN, 'public/audio/hlas');
const VYSTUP = join(KOREN, 'vystup');
mkdirSync(HLAS, { recursive: true });
mkdirSync(VYSTUP, { recursive: true });

const NABEH = 0.7; // ticho před první větou
const MEZERA = 0.45; // ticho na začátku každé další scény
const DOZVUK = 0.6; // ticho po konci řeči ve scéně
const KONEC = 2.8; // jak dlouho zůstane poslední scéna po dořečení
const MAX_ZNAKU = 84; // titulek: nejvýš dva řádky po 42 znacích

const delka = (soubor) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', soubor]).toString().trim());

// Středy pauz v nahrávce (hranice vět).
const pauzyZ = (soubor) => {
  let log = '';
  try {
    log = execFileSync('ffmpeg', ['-hide_banner', '-nostats', '-i', soubor, '-af', 'silencedetect=noise=-32dB:d=0.16', '-f', 'null', '-'], { stdio: ['ignore', 'ignore', 'pipe'], encoding: 'utf8' });
  } catch (e) {
    log = e.stderr?.toString() ?? '';
  }
  const res = [];
  const re = /silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)/g;
  let m;
  while ((m = re.exec(log))) res.push((Number(m[1]) + Number(m[2])) / 2);
  return res;
};

const vety = (text) => text.match(/[^.?!…]+[.?!…]+(\s|$)|[^.?!…]+$/g).map((s) => s.trim()).filter(Boolean);

// Dlouhou větu rozdělí na kousky do MAX_ZNAKU, nejlépe u čárky nebo dvojtečky.
const rozdel = (veta) => {
  if (veta.length <= MAX_ZNAKU) return [veta];
  const stred = veta.length / 2;
  let nej = -1;
  for (let i = 0; i < veta.length; i++) if (/[,:]/.test(veta[i]) && (nej < 0 || Math.abs(i - stred) < Math.abs(nej - stred))) nej = i;
  if (nej < 0 || nej < 15 || veta.length - nej < 15) {
    nej = veta.lastIndexOf(' ', stred + 10);
    return [...rozdel(veta.slice(0, nej).trim()), ...rozdel(veta.slice(nej).trim())];
  }
  return [...rozdel(veta.slice(0, nej + 1).trim()), ...rozdel(veta.slice(nej + 1).trim())];
};

// Rozloží kousky textu na časový úsek podle počtu znaků, hranice vět přitáhne k pauzám v řeči.
const rozlozit = (text, od, trvani, pauzyVeScene) => {
  const vv = vety(text);
  const celkem = vv.reduce((a, v) => a + v.length, 0);
  const hranice = [0];
  let soucet = 0;
  vv.forEach((v, i) => {
    soucet += v.length;
    if (i === vv.length - 1) return;
    let t = (soucet / celkem) * trvani;
    const blizka = pauzyVeScene.filter((p) => Math.abs(p - t) < 0.9).sort((a, b) => Math.abs(a - t) - Math.abs(b - t))[0];
    if (blizka !== undefined) t = blizka;
    hranice.push(t);
  });
  hranice.push(trvani);
  const cues = [];
  vv.forEach((v, i) => {
    const a = hranice[i];
    const b = hranice[i + 1];
    const kusy = rozdel(v);
    const zn = kusy.reduce((x, k) => x + k.length, 0);
    let t = a;
    for (const k of kusy) {
      const d = ((b - a) * k.length) / zn;
      cues.push({ od: +(od + t).toFixed(3), do: +(od + t + d).toFixed(3), text: k });
      t += d;
    }
  });
  return cues;
};

const srtCas = (s) => {
  const ms = Math.round(s * 1000);
  const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  return `${h}:${m}:${sec},${String(ms % 1000).padStart(3, '0')}`;
};

const vysledek = {};
for (const video of VIDEA) {
  const sceny = [];
  const titulky = [];
  let t = 0;
  if (video.hlas) {
    const klipy = video.sceny.map((_, i) => join(SCENY, video.id, `${String(i + 1).padStart(2, '0')}.mp3`));
    if (!klipy.every(existsSync)) {
      console.log(`přeskočeno (chybí hlas): ${video.id}`);
      continue;
    }
    const starty = [];
    klipy.forEach((klip, i) => {
      const L = delka(klip);
      const start = t + (i === 0 ? NABEH : MEZERA);
      starty.push(start);
      const konec = start + L + (i === klipy.length - 1 ? KONEC : DOZVUK);
      sceny.push({ od: +t.toFixed(3), do: +konec.toFixed(3) });
      titulky.push(...rozlozit(video.sceny[i].titulky, start, L, pauzyZ(klip)));
      t = konec;
    });
    // Složí hlasovou stopu: každý klip na svém místě.
    const args = ['-y', '-hide_banner', '-loglevel', 'error'];
    klipy.forEach((k) => args.push('-i', k));
    const filtr = klipy.map((_, i) => `[${i}]adelay=${Math.round(starty[i] * 1000)}:all=1[a${i}]`).join(';') + ';' + klipy.map((_, i) => `[a${i}]`).join('') + `amix=inputs=${klipy.length}:normalize=0,apad=whole_dur=${t.toFixed(3)}`;
    args.push('-filter_complex', filtr, '-ar', '44100', '-b:a', '160k', join(HLAS, `${video.id}.mp3`));
    execFileSync('ffmpeg', args);
  } else {
    video.sceny.forEach((s) => {
      const d = s.delka ?? 6;
      sceny.push({ od: +t.toFixed(3), do: +(t + d).toFixed(3) });
      titulky.push(...rozlozit(s.titulky, t + 0.5, d - 0.9, []));
      t += d;
    });
  }
  // Titulek vydrží až do dalšího, pokud je mezera krátká.
  titulky.forEach((c, i) => {
    const dalsi = titulky[i + 1];
    if (dalsi && dalsi.od - c.do < 0.8) c.do = dalsi.od;
    else c.do = +(c.do + 0.4).toFixed(3);
  });
  vysledek[video.id] = { delka: +t.toFixed(3), hlasOd: 0, sceny, titulky };
  writeFileSync(join(VYSTUP, `${video.id}.srt`), titulky.map((c, i) => `${i + 1}\n${srtCas(c.od)} --> ${srtCas(c.do)}\n${c.text}\n`).join('\n'));
  console.log(`${video.id}: ${t.toFixed(1)} s, ${sceny.length} scén, ${titulky.length} titulků`);
}
writeFileSync(join(KOREN, 'src/data/casovani.json'), JSON.stringify(vysledek, null, 1));
