// Připraví videa pro web: malé náhledy pro dlaždice (vystup/<id>-16x9-nahled.jpg) a data web/src/data/videa.json.
// Web bere soubory přímo z vystup/ přes odkaz web/public/videa.
// Spuštění po renderu a plakátech (node skripty/render.mjs --plakaty):
//   node --experimental-strip-types skripty/web.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VIDEA } from '../src/data/videa.ts';

const KOREN = join(dirname(fileURLToPath(import.meta.url)), '..');
const VYSTUP = join(KOREN, 'vystup');
const cas = JSON.parse(readFileSync(join(KOREN, 'src/data/casovani.json'), 'utf8'));
const HLASY = { aneta: 'Aneta (AI hlas)', kuba: 'Kuba (AI hlas)', autor: 'Josef Pavlovic' };

const data = VIDEA.map((v) => {
  const c = cas[v.id];
  const soubory = {};
  for (const format of ['16x9', '9x16']) {
    soubory[format] = { mb: Math.round((statSync(join(VYSTUP, `${v.id}-${format}.mp4`)).size / 1e6) * 10) / 10 };
  }
  // Malý náhled pro dlaždice na webu (komponenta Dlazdice hledá <obrázek>-nahled.jpg).
  execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', join(VYSTUP, `${v.id}-16x9.jpg`), '-vf', 'scale=640:360', '-q:v', '5', join(VYSTUP, `${v.id}-16x9-nahled.jpg`)]);
  return {
    id: v.id,
    cislo: v.cislo,
    nazev: v.nazev,
    popis: v.popis,
    stranka: v.odkaz.replace('vimecodelat.cz', ''),
    delka: Math.round(c.delka),
    hlas: v.hlas ? HLASY[v.hlas] : null,
    soubory,
    prepis: v.sceny.map((s) => s.titulky),
  };
});

writeFileSync(join(KOREN, '../web/src/data/videa.json'), JSON.stringify(data, null, 2) + '\n');
console.log(`web/src/data/videa.json: ${data.length} videí, náhledy ve vystup/`);
