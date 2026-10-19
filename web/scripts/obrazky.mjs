// Vygeneruje PNG ikony, sdílecí obrázky (Open Graph) a kartu do telefonu.
// Použití: PW=<cesta k playwright> node scripts/obrazky.mjs   (Playwright není závislost webu)
import { createRequire } from 'node:module';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { TECHNIKY } from './karta-data.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || 'playwright');
const koren = new URL('..', import.meta.url).pathname;
const font = (soubor) => `file://${koren}node_modules/@fontsource/atkinson-hyperlegible-next/files/${soubor}`;
const zaklad = `
  @font-face { font-family: A; font-weight: 400; src: url(${font('atkinson-hyperlegible-next-latin-ext-400-normal.woff2')}); }
  @font-face { font-family: A; font-weight: 700; src: url(${font('atkinson-hyperlegible-next-latin-ext-700-normal.woff2')}); }
  @font-face { font-family: A; font-weight: 400; src: url(${font('atkinson-hyperlegible-next-latin-400-normal.woff2')}); unicode-range: U+0000-00FF; }
  @font-face { font-family: A; font-weight: 700; src: url(${font('atkinson-hyperlegible-next-latin-700-normal.woff2')}); unicode-range: U+0000-00FF; }
  * { box-sizing: border-box; } body { margin: 0; font-family: A, sans-serif; }`;
const okno = (v) => `<svg width="${v}" height="${v}" viewBox="0 0 48 48"><rect x="3" y="3" width="42" height="42" rx="7" fill="#1d2b36" stroke="#4a6070" stroke-width="1.5"/><rect x="10" y="10" width="12.5" height="12.5" rx="2" fill="#2c4150"/><rect x="25.5" y="10" width="12.5" height="12.5" rx="2" fill="#2c4150"/><rect x="10" y="25.5" width="12.5" height="12.5" rx="2" fill="#e8a93a"/><rect x="25.5" y="25.5" width="12.5" height="12.5" rx="2" fill="#2c4150"/></svg>`;

const OG = {
  vychozi: { barva: '#1d2b36', nad: 'Klidně. Pravdivě. Prakticky.', titul: 'Když víme, co dělat, máme menší strach.' },
  scenar: { barva: '#1f5e6b', nad: '1 · Scénář', titul: 'Jak by to mohlo vypadat' },
  pribehy: { barva: '#a4492e', nad: '2 · Příběhy', titul: 'Jak to lidé zvládli' },
  'priprav-se': { barva: '#3f6b4e', nad: '3 · Připrav se', titul: 'Praktické kroky pro vaši rodinu' },
  manipulace: { barva: '#5e3a6e', nad: '4 · Poznej manipulaci', titul: 'Když triky znáte předem, nefungují' },
  'o-nas': { barva: '#1d2b36', nad: 'O projektu', titul: 'Nezávislí a nadstraničtí' },
};

const b = await chromium.launch();
const p = await b.newPage();
// Obsah se načítá ze souboru, aby prohlížeč smí načíst písma z node_modules.
const docasny = join(mkdtempSync(join(tmpdir(), 'vcd-')), 'obrazek.html');
const vykresli = async (html) => {
  writeFileSync(docasny, `<!doctype html><meta charset="utf-8">${html}`);
  await p.goto(`file://${docasny}`);
  await p.evaluate(() => document.fonts.ready);
};

for (const v of [192, 512]) {
  await p.setViewportSize({ width: v, height: v });
  await vykresli(`<style>${zaklad} body{background:#1d2b36;display:grid;place-items:center;height:100vh}</style>${okno(Math.round(v * 0.8))}`);
  await p.screenshot({ path: `${koren}public/ikony/ikona-${v}.png` });
}

await p.setViewportSize({ width: 1200, height: 630 });
for (const [klic, o] of Object.entries(OG)) {
  await vykresli(`<style>${zaklad}
    body{width:1200px;height:630px;background:#f6f1e7;color:#1d2b36;padding:70px 80px;display:flex;flex-direction:column;justify-content:space-between;border-top:24px solid ${o.barva}}
    .nad{font-weight:700;font-size:30px;color:${o.barva};text-transform:uppercase;letter-spacing:.06em}
    h1{font-size:78px;line-height:1.08;margin:18px 0 0;max-width:980px}
    .pata{display:flex;align-items:center;gap:22px;font-size:34px;font-weight:700}
    .pata span.url{margin-left:auto;font-weight:400;color:#5b6670}</style>
    <div><div class="nad">${o.nad}</div><h1>${o.titul}</h1></div>
    <div class="pata">${okno(72)}<span>Víme, co dělat</span><span class="url">vimecodelat.cz</span></div>`);
  await p.screenshot({ path: `${koren}public/og/${klic}.png` });
}

await p.setViewportSize({ width: 1080, height: 1920 });
await vykresli(`<style>${zaklad}
  body{width:1080px;height:1920px;background:#5e3a6e;color:#fff;padding:150px 90px 120px;display:flex;flex-direction:column}
  .hlava{display:flex;align-items:center;gap:30px}.male{font-size:36px;opacity:.85;margin:0}.titul{font-size:76px;font-weight:700;margin:0;line-height:1.05}
  ol{list-style:none;padding:0;margin:80px 0 0;counter-reset:k}
  li{counter-increment:k;margin:0 0 70px;padding-left:96px;position:relative}
  li::before{content:counter(k);position:absolute;left:0;top:4px;width:66px;height:66px;border-radius:50%;background:#e8a93a;color:#1d2b36;font-weight:700;font-size:38px;display:grid;place-items:center}
  .n{font-size:54px;font-weight:700;display:block}.o{font-size:44px;opacity:.95;display:block;margin-top:6px}
  .pata{margin-top:auto;font-size:36px;opacity:.9;border-top:2px solid rgb(255 255 255 / .35);padding-top:36px}</style>
  <div class="hlava">${okno(120)}<div><p class="male">Víme, co dělat</p><p class="titul">Poznej manipulaci</p></div></div>
  <ol>${TECHNIKY.map((t) => `<li><span class="n">${t.nazev}</span><span class="o">${t.otazka}</span></li>`).join('')}</ol>
  <div class="pata">Než něco pošlete dál: zastavte se, ověřte, zeptejte se.<br><strong>vimecodelat.cz</strong></div>`);
await p.screenshot({ path: `${koren}public/karta/poznej-manipulaci-telefon.png` });

await b.close();
console.log('Hotovo');
