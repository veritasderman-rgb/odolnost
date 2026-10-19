// Vygeneruje plan/videa-scenare.md ze scénářů (src/data/videa.ts) a časování (src/data/casovani.json).
// Spuštění: node --experimental-strip-types skripty/scenare-md.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VIDEA, PLAN_POLE, TECHNIKY } from '../src/data/videa.ts';

const KOREN = join(dirname(fileURLToPath(import.meta.url)), '..');
const cas = JSON.parse(readFileSync(join(KOREN, 'src/data/casovani.json'), 'utf8'));
const HLASY = { aneta: 'Aneta (ženský)', kuba: 'Kuba (mužský)', autor: 'autor (vlastní nahrávka)' };
const HUDBA = { klidna: 'klidná', pulzni: 'pulzní', ulevna: 'úlevná' };

const s = (x) => `${Math.floor(x / 60)}:${String(Math.round(x % 60)).padStart(2, '0')}`;
const obraz = (v) => {
  switch (v.typ) {
    case 'nadpis': return `Ikona ${v.ikona ?? ''} a velký nadpis${v.preskrtnout ? ', ikona se přeškrtne' : ''}`;
    case 'obraz': return `Ilustrační obrázek \`${v.src.split('/').pop()}\` s pomalým pohybem kamery${v.stitek ? `, štítek „${v.stitek}“` : ''}`;
    case 'ikony': return `Ikony se postupně objevují: ${v.polozky.map((p) => p.text + (p.zakaz ? ' (přeškrtnuto)' : '')).join(', ')}`;
    case 'seznam': return `${v.cisla ? 'Číslovaný seznam' : 'Odškrtávací seznam'}: ${v.polozky.join(', ')}`;
    case 'fakta': return `Fakta na ztmaveném obrázku: ${v.polozky.map((p) => (p.rok ? p.rok + ' ' : '') + p.text + (p.razitko ? ` [razítko ${p.razitko}]` : '')).join(' / ')}`;
    case 'srovnani': return `Dva panely: ${v.levy.nadpis} (zvýrazněno) a ${v.pravy.nadpis}${v.levy.vlna ? ', animované zvukové vlny' : ''}`;
    case 'plan': return `Papír s rodinným plánem, zvýrazní se: ${v.aktivni.map((i) => PLAN_POLE[i].nadpis).join(', ')}`;
    case 'osa': return `Časová osa 1 hodina / 24 hodin / 3 dny, ikony: ${v.polozky.map((p) => p.text).join(', ')}`;
    case 'retez': return `Řetězová reakce: ${v.kroky.join(' → ')}`;
    case 'zpravy': return `Telefon, bubliny vymyšlených zpráv se rychle valí, štítek „${v.stitek}“`;
    case 'dvezdi': return 'Řez domem: ulice, dvě zdi (limetkově), člověk, okno přeškrtnuté';
    case 'karty': return `Šest dlaždic se otočí: ${TECHNIKY.join(', ')}`;
    case 'karta': return `Trik ${v.cislo}/6: ${v.technika}, vymyšlený příklad „${v.priklad}“, otázka „${v.otazka}“`;
    case 'krok': return `Krok na dnes, limetkový pruh, adresa ${v.odkaz}`;
  }
};
const naObrazovce = (v) => {
  switch (v.typ) {
    case 'nadpis': return [v.text, v.pod].filter(Boolean).join(' · ');
    case 'obraz': return [v.nadpis, v.pod].filter(Boolean).join(' · ');
    case 'ikony': return v.nadpis ?? '';
    case 'seznam': return v.nadpis;
    case 'krok': return `Krok na dnes: ${v.text}`;
    case 'karta': return v.technika;
    default: return '';
  }
};

let md = `# Videa „Víme, co dělat. Za minutu.“

[← Video a audio](03-video.md)

Stav: **vyrobeno 19. 10. 2026.** Tento dokument je vygenerovaný ze scénářů ve \`video/src/data/videa.ts\` (\`node --experimental-strip-types skripty/scenare-md.mjs\` ve složce \`video\`). Když se scénář změní, upravte data a dokument vygenerujte znovu.

## Jak videa vznikla

- **Formáty:** každé video ve dvou verzích, na šířku 1920 × 1080 (web, YouTube, promítání) a na výšku 1080 × 1920 (Reels, TikTok, Shorts). Verze na výšku má stejný obsah, jen jiné rozvržení a víc místa nahoře a dole pro rozhraní sítí.
- **Titulky:** vždy vypálené v obraze (max. dva řádky) a navíc jako \`.srt\` ve \`video/vystup/\`.
- **Označení:** po celou dobu štítek „Vytvořeno s pomocí AI“. U komiksových ilustrací navíc štítek „Ilustrace“.
- **Hlas:** ElevenLabs, model Multilingual v2, hotové české hlasy z knihovny (nejde o klon skutečného člověka). Hlasy se po videích střídají: lichá videa Aneta, sudá Kuba. Každá scéna je namluvená zvlášť, aby obraz přesně seděl na řeč.
- **Hudba:** ElevenLabs Music, tři instrumentální podkresy (klidná, pulzní, úlevná), pod hlasem zhruba o 17 dB tišší. Výsledný zvuk je normalizovaný na −14 LUFS.
- **Obraz:** motion grafika v Remotionu (React): kinetická typografie, ikony, časové osy, odškrtávací seznamy, pomalý pohyb kamery po ilustracích z webu. Barvy a písmo podle manuálu značky (grafit, limetková, IBM Plex).
- **Žádné realistické AI tváře, zbraně ani zničená města.** Siréna ve videu nezní, aby se video nedalo zaměnit se skutečným poplachem.

Jak videa upravit a znovu vyrenderovat, popisuje \`video/README.md\`.

## Přehled

| # | Název | Délka | Hlas | Hudba | Stránka na webu |
| --- | --- | --- | --- | --- | --- |
`;
for (const v of VIDEA) md += `| ${v.cislo} | ${v.nazev} | ${s(cas[v.id].delka)} | ${v.hlas ? HLASY[v.hlas] : 'bez hlasu, k namluvení'} | ${HUDBA[v.hudba]} | [${v.odkaz.replace('vimecodelat.cz', '')}](https://www.${v.odkaz}) |\n`;
md += `\nSoubory: \`video/vystup/<id>-16x9.mp4\`, \`video/vystup/<id>-9x16.mp4\` a \`video/vystup/<id>.srt\`.\n`;

for (const v of VIDEA) {
  const c = cas[v.id];
  md += `\n---\n\n## ${v.cislo}. ${v.nazev}\n\n\`${v.id}\` · ${s(c.delka)} · ${v.hlas ? `hlas ${HLASY[v.hlas]}` : 'bez hlasu'} · hudba ${HUDBA[v.hudba]} · ${v.odkaz}\n\n`;
  if (!v.hlas) md += `Video běží jen s hudbou a titulky. Text v posledním sloupci je **scénář k namluvení**: když ho namluvíte, nahrajte každý řádek zvlášť a vejděte se do uvedeného času (zhruba 13 slov na 5 sekund, klidně a s pauzou na konci). Nahrávky pak stačí uložit jako \`video/public/audio/sceny/${v.id}/01.mp3\` až \`07.mp3\`, v \`video/src/data/videa.ts\` nastavit u videa 8 \`hlas: 'autor'\` a video vyrenderovat znovu (postup je ve \`video/README.md\`).\n\n`;
  md += `| Čas | Obraz | Text na obrazovce | ${v.hlas ? 'Hlas a titulky' : 'Titulky = text k namluvení'} |\n| --- | --- | --- | --- |\n`;
  v.sceny.forEach((sc, i) => {
    md += `| ${s(c.sceny[i].od)}–${s(c.sceny[i].do)} | ${obraz(sc.vizual)} | ${naObrazovce(sc.vizual)} | ${sc.titulky} |\n`;
  });
}
writeFileSync(join(KOREN, '../plan/videa-scenare.md'), md);
console.log('plan/videa-scenare.md vygenerováno');
