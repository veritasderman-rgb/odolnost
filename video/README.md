# Videa Víme, co dělat

Krátká vysvětlující videa k webu. Obraz se skládá v [Remotionu](https://www.remotion.dev) (React), hlas a hudba jsou z ElevenLabs. Scénáře a popis série jsou v [`plan/videa-scenare.md`](../plan/videa-scenare.md).

## Co kde je

| Cesta | Obsah |
| --- | --- |
| `src/data/videa.ts` | Scénáře všech videí: text pro hlas, titulky a co je v každé scéně vidět |
| `src/data/casovani.json` | Časování scén a titulků (generuje `skripty/casovani.mjs`) |
| `src/komponenty/` | Animace scén, titulky, štítek AI, lišta s logem |
| `public/audio/sceny/<video>/NN.mp3` | Hlas po scénách (ElevenLabs) |
| `public/audio/hlas/<video>.mp3` | Složená hlasová stopa celého videa (generuje se) |
| `public/audio/hudba/` | Tři hudební podkresy: `klidna`, `pulzni`, `ulevna` |
| `public/obrazky` | Odkaz na `web/public/obrazky` (ilustrace z webu) |
| `vystup/` | Hotová videa `<video>-16x9.mp4`, `<video>-9x16.mp4` a titulky `<video>.srt` |

## Jak upravit a znovu vyrenderovat

```sh
cd video
npm install
# 1. upravte text nebo obraz ve src/data/videa.ts
# 2. když se změnil text pro hlas, nechte scénu namluvit znovu v ElevenLabs
#    (hlas Aneta nebo Kuba, model Multilingual v2) a uložte ji jako public/audio/sceny/<video>/NN.mp3
# 3. přepočítejte časování a titulky
node --experimental-strip-types skripty/casovani.mjs
# 4. náhledy (jeden snímek z každé scény do vystup/nahledy/)
node skripty/render.mjs --nahledy v2
# 5. render (bez parametru všechna videa, jinak podle začátku id)
node skripty/render.mjs v2
# 6. aktualizujte dokument se scénáři
node --experimental-strip-types skripty/scenare-md.mjs
```

Živý náhled s časovou osou: `npx remotion studio src/index.ts`.

Render hledá prohlížeč v `/opt/pw-browsers` (headless shell). Jinde ho Remotion stáhne sám, nebo ho nastavte proměnnou `REMOTION_BROWSER`.

## Vlastní hlas u videa 8

Video 8 „Proč tento web“ je zatím bez hlasu, jen s titulky a hudbou. Text k namluvení je v tabulce ve [`plan/videa-scenare.md`](../plan/videa-scenare.md) (sloupec Titulky). Postup:

1. Nahrajte každý řádek zvlášť (01–07), klidně a bez spěchu, ideálně v tiché místnosti.
2. Uložte nahrávky jako `public/audio/sceny/v8-proc-tento-web/01.mp3` až `07.mp3`.
3. V `src/data/videa.ts` u videa 8 změňte `hlas: null` na `hlas: 'autor'`. Pole `delka` u scén se pak ignoruje a délky se vezmou z nahrávek.
4. Spusťte `casovani.mjs` a `render.mjs v8`.

Štítek „Vytvořeno s pomocí AI“ ve videu zůstává, protože hudba a ilustrace jsou z AI.

## Pravidla

- Žádné realistické AI tváře, zbraně, zničená města ani státní symboly.
- AI hlas jen z knihovny, nikdy klon skutečného člověka. Štítek „Vytvořeno s pomocí AI“ je vidět po celou dobu.
- Siréna ve videu nezní, aby se video nedalo zaměnit se skutečným poplachem.
- Barvy a písmo podle manuálu značky (`plan/01-brand.md`).
