// Render videí a náhledů.
//   node skripty/render.mjs                     všechna videa v obou formátech do vystup/
//   node skripty/render.mjs v1 v2               jen vybraná videa (podle začátku id)
//   node skripty/render.mjs --nahledy v1        jeden snímek z prostředka každé scény do vystup/nahledy/
//   node skripty/render.mjs --plakaty           úvodní obrázky pro web bez titulků (vystup/<id>-<format>.jpg)
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOREN = join(dirname(fileURLToPath(import.meta.url)), '..');
const VYSTUP = join(KOREN, 'vystup');
const args = process.argv.slice(2);
const nahledy = args.includes('--nahledy');
const plakaty = args.includes('--plakaty');
// Plakát pro web: konec první scény, nadpis je celý vidět. Šířka 1280 (na šířku) a 540 (na výšku).
const PLAKAT_MERITKO = { '16x9': 2 / 3, '9x16': 0.5 };
const filtr = args.filter((a) => !a.startsWith('--'));

// Prohlížeč: v prostředí bez staženého Chromu použijeme předinstalovaný headless shell.
const najdiShell = () => {
  const zaklad = '/opt/pw-browsers';
  if (!existsSync(zaklad)) return undefined;
  for (const d of readdirSync(zaklad).filter((x) => x.startsWith('chromium_headless_shell'))) {
    for (const sub of readdirSync(join(zaklad, d))) {
      const cesta = join(zaklad, d, sub, 'chrome-headless-shell');
      if (existsSync(cesta)) return cesta;
    }
  }
  return undefined;
};
const browserExecutable = process.env.REMOTION_BROWSER || najdiShell();

const casovani = JSON.parse(readFileSync(join(KOREN, 'src/data/casovani.json'), 'utf8'));
const idcka = Object.keys(casovani).filter((id) => !filtr.length || filtr.some((f) => id.startsWith(f)));

const serveUrl = await bundle({ entryPoint: join(KOREN, 'src/index.ts'), publicDir: join(KOREN, 'public') });
mkdirSync(join(VYSTUP, 'nahledy'), { recursive: true });

for (const id of idcka) {
  for (const format of ['16x9', '9x16']) {
    if (plakaty) {
      // Bez titulků: na webu je pod videem nadpis i přepis.
      const inputProps = { cas: { ...casovani[id], titulky: [] } };
      const composition = await selectComposition({ serveUrl, id: `${id}-${format}`, browserExecutable, inputProps });
      const frame = Math.round(Math.max(casovani[id].sceny[0].do - 0.8, 0) * composition.fps);
      const output = join(VYSTUP, `${id}-${format}.jpg`);
      await renderStill({ composition, serveUrl, output, frame, browserExecutable, inputProps, imageFormat: 'jpeg', jpegQuality: 82, scale: PLAKAT_MERITKO[format] });
      console.log(`plakát: ${id} ${format}`);
      continue;
    }
    const composition = await selectComposition({ serveUrl, id: `${id}-${format}`, browserExecutable });
    if (nahledy) {
      for (const [i, s] of casovani[id].sceny.entries()) {
        const frame = Math.round(((s.od + s.do) / 2) * composition.fps);
        const output = join(VYSTUP, 'nahledy', `${id}-${format}-${String(i + 1).padStart(2, '0')}.png`);
        await renderStill({ composition, serveUrl, output, frame, browserExecutable });
      }
      console.log(`náhledy: ${id} ${format}`);
    } else {
      const output = join(VYSTUP, `${id}-${format}.mp4`);
      const docasny = join(VYSTUP, `.${id}-${format}.mp4`);
      await renderMedia({
        composition, serveUrl, codec: 'h264', outputLocation: docasny, browserExecutable,
        crf: 23, audioBitrate: '192k', concurrency: 4,
        onProgress: ({ progress }) => process.stdout.write(`\r${id} ${format} ${(progress * 100).toFixed(0)} %   `),
      });
      // Hlasitost pro sítě a web: −14 LUFS, špičky do −1,5 dBTP. Obraz se nepřekódovává.
      execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', docasny, '-c:v', 'copy', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', output]);
      unlinkSync(docasny);
      console.log(`\nhotovo: ${output}`);
    }
  }
}
