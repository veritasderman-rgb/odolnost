# Web vimecodelat.cz

Statický web v [Astro](https://astro.build) 5. Obsah je v Markdownu (`src/content/`), nástroje běží jen v prohlížeči a nic neodesílají. Jediná serverová část je přihlášení k newsletteru (`api/odber.js`).

## Spuštění

```bash
cd web
npm install
npm run dev        # vývojový server na http://localhost:4321
npm run build      # sestavení do dist/ včetně vyhledávání (Pagefind)
npm run check      # kontrola obsahu: značky [OVĚŘIT], stav stránek, chybějící kroky
node scripts/kontrola-obsahu.mjs --prisne   # před spuštěním: skončí chybou, když něco zbývá
```

Ikony, sdílecí obrázky a kartu do telefonu vygeneruje `scripts/obrazky.mjs` (potřebuje Playwright; viz hlavička skriptu).

## Struktura

| Cesta | Co tam je |
| --- | --- |
| `src/content/<pilíř>/*.md` | Texty stránek. Jak psát: [OBSAH.md](OBSAH.md) |
| `src/pages/` | Rozcestníky, nástroje (`zacit`, `priprav-se/rodinny-plan`, `priprav-se/kontrolni-seznam`, `manipulace/karta-tisk`), lehká verze, stránky pro média a obce |
| `src/components/` | Krok na dnes, Odkud to víme, štítky příběhů, kapesní karta, formulář odběru |
| `src/styles/global.css` | Design tokeny podle `plan/01-brand.md` (pracovní do dodání manuálu značky) |
| `public/sw.js` | Offline režim: klíčové stránky fungují i bez internetu |
| `api/odber.js` | Newsletter přes Brevo s dvojitým potvrzením, nastavení v [brevo/README.md](brevo/README.md) |
| `vercel.json`, `public/_headers` | Bezpečnostní hlavičky (přísná CSP, HSTS) pro Vercel a záložní hosting |

## Nasazení

Doporučený hosting je Vercel (region Frankfurt) s nastaveným kořenovým adresářem projektu `web`. Záložní zrcadlo může běžet na libovolném statickém hostingu, protože `dist/` je čisté HTML. Newsletter na zrcadle nefunguje, všechno ostatní ano.

## Zásady

- Žádné skripty, písma ani obrázky od třetích stran. Žádné cookies.
- Žádné vložené skripty (kvůli Content-Security-Policy). Skripty patří do komponent nebo do `public/js/`.
- Přístupnost WCAG 2.2 AA: kontrast, ovládání klávesnicí, větší písmo, omezení pohybu.
