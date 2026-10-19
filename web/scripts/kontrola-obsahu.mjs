// Kontrola obsahu před vydáním: značky [OVĚŘIT], stav stránek, chybějící kroky a zdroje.
// Použití: npm run check   (s --prisne skončí chybou, pokud něco zbývá; vhodné před spuštěním)
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const KOREN = new URL('../src/content/', import.meta.url).pathname;
const prisne = process.argv.includes('--prisne');

function soubory(adresar) {
  return readdirSync(adresar).flatMap((n) => {
    const cesta = join(adresar, n);
    return statSync(cesta).isDirectory() ? soubory(cesta) : cesta.endsWith('.md') ? [cesta] : [];
  });
}

let problemu = 0;
const radky = [];
for (const soubor of soubory(KOREN)) {
  const text = readFileSync(soubor, 'utf8');
  const id = relative(KOREN, soubor).replace(/\.md$/, '');
  const hlavicka = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const overit = text.match(/\[OVĚŘIT:[^\]]*\]/g) ?? [];
  const stav = hlavicka.match(/^stav:\s*"?(\w+)"?/m)?.[1] ?? '?';
  const chybi = [];
  if (!/^krok:/m.test(hlavicka) && !id.startsWith('o-nas/')) chybi.push('krok');
  if (id.startsWith('scenar/') && !/^\s+- nazev:/m.test(hlavicka)) chybi.push('zdroje');
  if (/—/.test(text)) chybi.push('dlouhá pomlčka');
  problemu += overit.length + chybi.length + (stav === 'schvaleno' ? 0 : 1);
  radky.push({ id, stav, overit: overit.length, chybi: chybi.join(', ') });
}

radky.sort((a, b) => a.id.localeCompare(b.id));
console.log('Stránka'.padEnd(42), 'Stav'.padEnd(10), 'OVĚŘIT', ' Chybí');
for (const r of radky) console.log(r.id.padEnd(42), r.stav.padEnd(10), String(r.overit).padStart(6), ' ' + r.chybi);
console.log(`\nStránek: ${radky.length} · značek OVĚŘIT: ${radky.reduce((s, r) => s + r.overit, 0)} · neschválených: ${radky.filter((r) => r.stav !== 'schvaleno').length}`);
if (prisne && problemu > 0) process.exit(1);
