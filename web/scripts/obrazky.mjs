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
const font = (balik, soubor) => `file://${koren}node_modules/@fontsource/${balik}/files/${soubor}`;
const zaklad = `
  @font-face { font-family: T; font-weight: 400; src: url(${font('ibm-plex-sans', 'ibm-plex-sans-latin-ext-400-normal.woff2')}); }
  @font-face { font-family: T; font-weight: 400; src: url(${font('ibm-plex-sans', 'ibm-plex-sans-latin-400-normal.woff2')}); unicode-range: U+0000-00FF; }
  @font-face { font-family: T; font-weight: 700; src: url(${font('ibm-plex-sans', 'ibm-plex-sans-latin-ext-700-normal.woff2')}); }
  @font-face { font-family: T; font-weight: 700; src: url(${font('ibm-plex-sans', 'ibm-plex-sans-latin-700-normal.woff2')}); unicode-range: U+0000-00FF; }
  @font-face { font-family: M; font-weight: 500; src: url(${font('ibm-plex-mono', 'ibm-plex-mono-latin-ext-500-normal.woff2')}); }
  @font-face { font-family: M; font-weight: 500; src: url(${font('ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2')}); unicode-range: U+0000-00FF; }
  * { box-sizing: border-box; } body { margin: 0; font-family: T, sans-serif; }
  .n { font-family: T, sans-serif; font-weight: 700; letter-spacing: -.025em; line-height: 1; }
  .m { font-family: M, monospace; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; }`;
const blok = (v) => `<span style="display:inline-block;width:${v}px;height:${v}px;background:#c8f560"></span>`;

const OG = {
  vychozi: { nad: 'Nezávislý projekt · Připravenost · Odolnost', titul: 'Počítáme s tím.<br><em>Připravme se.</em>' },
  scenar: { nad: '01 · Jak by to mohlo vypadat', titul: 'Scénář' },
  pribehy: { nad: '02 · Jak to lidé zvládli', titul: 'Příběhy' },
  'priprav-se': { nad: '03 · Praktické kroky', titul: 'Připrav se' },
  manipulace: { nad: '04 · Předběžné očkování', titul: 'Poznej manipulaci' },
  'o-nas': { nad: 'O projektu', titul: 'Nezávislí a nadstraničtí' },
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
  await vykresli(`<style>${zaklad} body{background:#1f2328;display:grid;place-items:center;height:100vh}</style>${blok(Math.round(v * 0.5))}`);
  await p.screenshot({ path: `${koren}public/ikony/ikona-${v}.png` });
}

await p.setViewportSize({ width: 1200, height: 630 });
for (const [klic, o] of Object.entries(OG)) {
  await vykresli(`<style>${zaklad}
    body{width:1200px;height:630px;background:#1f2328;color:#fff;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;border-bottom:18px solid #c8f560}
    .nad{display:inline-block;background:#c8f560;color:#1f2328;font-size:24px;padding:6px 12px}
    h1{font-size:104px;margin:30px 0 0} h1 em{font-style:normal;color:#c8f560}
    .pata{display:flex;align-items:center;gap:18px} .pata .n{font-size:46px} .url{margin-left:auto;font-size:24px;color:#b5b0a6}</style>
    <div><span class="m nad">${o.nad}</span><h1 class="n">${o.titul}</h1></div>
    <div class="pata">${blok(40)}<span class="n">Víme, co dělat</span><span class="m url">vimecodelat.cz</span></div>`);
  await p.screenshot({ path: `${koren}public/og/${klic}.png` });
}

await p.setViewportSize({ width: 1080, height: 1920 });
await vykresli(`<style>${zaklad}
  body{width:1080px;height:1920px;background:#1f2328;color:#fff;padding:140px 90px 110px;display:flex;flex-direction:column;border-top:28px solid #c8f560}
  .male{font-size:30px;color:#c8f560;margin:0}.titul{font-size:132px;margin:18px 0 0}
  ol{list-style:none;padding:0;margin:90px 0 0;counter-reset:k}
  li{counter-increment:k;margin:0 0 50px;padding-left:110px;position:relative}
  li::before{content:'0' counter(k);position:absolute;left:0;top:6px;font-family:M,monospace;font-weight:500;font-size:40px;color:#c8f560}
  .t{font-size:60px;display:block}.o{font-size:44px;color:#d9d5cc;display:block;margin-top:10px;line-height:1.25}
  .pata{margin-top:auto;font-size:28px;color:#b5b0a6;border-top:3px solid #c8f560;padding-top:34px;line-height:1.5}</style>
  <p class="m male">Víme, co dělat · Kapesní karta</p><p class="n titul">Poznej<br>manipulaci</p>
  <ol>${TECHNIKY.map((t) => `<li><span class="n t">${t.nazev}</span><span class="o">${t.otazka}</span></li>`).join('')}</ol>
  <div class="m pata">Než něco pošlete dál: zastavte se, ověřte, zeptejte se.<br>vimecodelat.cz</div>`);
await p.screenshot({ path: `${koren}public/karta/poznej-manipulaci-telefon.png` });

await b.close();
console.log('Hotovo');
