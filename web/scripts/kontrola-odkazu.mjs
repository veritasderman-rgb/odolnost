// Najde v sestaveném webu (dist/) interní odkazy, které nikam nevedou.
// Použití: npm run build && node scripts/kontrola-odkazu.mjs
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const html = (adr) => readdirSync(adr).flatMap((n) => {
  const c = join(adr, n);
  return statSync(c).isDirectory() ? html(c) : c.endsWith('.html') ? [c] : [];
});

const existuje = (cesta) => {
  const bez = decodeURI(cesta.split('#')[0].split('?')[0]).replace(/^\//, '');
  return [bez, join(bez, 'index.html'), `${bez}.html`].some((k) => k === '' || existsSync(join(DIST, k)));
};

const rozbite = new Map();
for (const soubor of html(DIST)) {
  for (const [, href] of readFileSync(soubor, 'utf8').matchAll(/href="(\/[^"]*)"/g)) {
    if (href.startsWith('//') || href.startsWith('/pagefind/')) continue;
    if (!existuje(href)) {
      const kde = rozbite.get(href) ?? new Set();
      kde.add('/' + relative(DIST, soubor).replace(/index\.html$/, ''));
      rozbite.set(href, kde);
    }
  }
}
for (const [href, kde] of rozbite) console.log(href, '←', [...kde].slice(0, 4).join(', '), kde.size > 4 ? `a dalších ${kde.size - 4}` : '');
console.log(rozbite.size ? `\nRozbitých odkazů: ${rozbite.size}` : 'Všechny interní odkazy vedou na existující stránky.');
process.exitCode = rozbite.size ? 1 : 0;
