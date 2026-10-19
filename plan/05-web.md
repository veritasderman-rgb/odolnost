# 05 Web a technika

[← Přehled](00-prehled.md)

Web musí fungovat přesně tehdy, kdy ostatní věci fungovat přestávají: na slabém signálu, na starém telefonu, při útoku na servery a ideálně i bez internetu. Zároveň nesmí sbírat data o lidech, kteří k nám přijdou s obavou.

## Struktura webu

```
vimecodelat.cz
├── /                          Úvod: 3 vstupy, Krok na dnes, úvodní video
├── /zacit                     Průvodce „Co by to znamenalo pro nás?“ (5 otázek → doporučení)
├── /scenar                    Pilíř 1
│   ├── /proc-tyl
│   ├── /faze-krize
│   ├── /co-nas-zasahne
│   └── /co-bude-fungovat
├── /pribehy                   Pilíř 2 (filtr: modelové / svědectví, skupina)
│   └── /rodina-u-dalnice, /pani-vera, /student …
├── /priprav-se                Pilíř 3
│   ├── /rodinny-plan          ★ vyplnění + tisk
│   ├── /kontrolni-seznam      ★ zaškrtávání (uloženo v prohlížeči)
│   ├── /informace-bez-internetu
│   ├── /zranitelni
│   ├── /psychika
│   └── /rodinna-vyzva
├── /manipulace                Pilíř 4
│   ├── /karta                 ★ kapesní karta (tisk + obrázek)
│   ├── /hra-na-strach, /falesne-dilema, … (6 technik)
│   └── /nesouhlas-neni-zrada
├── /pro-obce, /pro-skoly, /pro-firmy, /pro-media
├── /o-nas, /financovani, /redakcni-pravidla, /opravy, /kontakt
└── /lehka                     Lehká verze (jen text, < 50 kB na stránku)
```

**Hlavní navigace (mobil):** Začít · Příběhy · Připrav se · Manipulace. Ve spodní liště je trvale tlačítko **„Můj plán“**.

## Klíčové nástroje

### Průvodce „Co by to znamenalo pro nás?“

- 5 otázek: kdo s vámi žije (děti, senioři, zvířata) · léky nebo přístroje na proud · byt nebo dům · auto ano/ne · typ lokality.
- Výsledek: seznam 5–8 stránek a kroků v pořadí podle priority. Žádné „skóre připravenosti“, které by mohlo strašit.
- **Vše běží v prohlížeči.** Odpovědi se nikam neodesílají a na stránce to stojí jasně napsané.

### Rodinný plán

- Formulář po krocích: místo setkání (hlavní a náhradní), kdo vyzvedne které dítě, kontakty, léky a přístroje, zvířata, plán bez signálu (čas a místo, kam přijít, když telefony nefungují).
- Výstup: **jedna strana A4** přes tiskový styl a „Uložit jako PDF“. Funguje i v černobílém tisku. Prázdná verze k ručnímu vyplnění.
- Data zůstávají jen v prohlížeči (local storage), s tlačítkem „Smazat vše“. Upozornění: „Plán obsahuje citlivé údaje. Nesdílejte ho na sítích.“

### Kontrolní seznam

- Položky s odkazy na konkrétní stránky 72h.gov.cz. Zaškrtávání se ukládá v prohlížeči.
- Ukazatel postupu („Máte hotovo 6 z 15“), bez srovnávání s ostatními.

### Kapesní karta

- Tisková verze 85 × 55 mm (8 karet na A4, ořezové značky) a obrázek 1080 × 1920 pro uložení do telefonu jako tapeta nebo do fotek.

### Později (pilot a rozšíření)

- **Hra „Kdo tahá za nitky?“**: 10 příspěvků a určování techniky, skóre před a po (anonymní, slouží k měření). Prototyp v pilotu.
- **Týden v týlu**: interaktivní příběh. Doporučený nástroj je Ink (inkle) nebo Twine exportovaný do statické stránky.

## Technické řešení

| Oblast | Doporučení | Proč |
| --- | --- | --- |
| Generátor webu | **Astro** (statický výstup, interaktivní ostrůvky jen u nástrojů) | Rychlý, žádný server, obsah v Markdownu |
| Obsah | Markdown v tomto repozitáři (git) | Historie změn = veřejné opravy, jednoduchá revize přes pull requesty |
| Vyhledávání | Pagefind (statický index) | Bez serveru a bez třetích stran |
| Hosting | Dva nezávislí poskytovatelé v EU (hlavní + zrcadlo) s CDN a ochranou proti DDoS | Odolnost proti výpadku i útoku |
| DNS | Spolehlivý poskytovatel, DNSSEC, nízké TTL pro rychlé přepnutí na zrcadlo | Přepnutí do 15 minut |
| Offline | **PWA**: po první návštěvě se uloží rodinný plán, karta, kontrolní seznam a 10 klíčových stránek | Funguje bez internetu, což je v krizi zásadní |
| Lehká verze | `/lehka`: čisté HTML bez obrázků a skriptů | Slabé připojení, staré telefony, rychlé načtení |
| Tisk | Tiskové styly pro všechny stránky | Knihovny, obce, senioři |
| Měření | Agregované počty bez cookies (vlastní Plausible, Umami nebo GoatCounter), anonymní počítadla stažení a tisků plánu | Měření účinku bez sledování lidí |
| Formuláře | Nahlášení chyby a kontakt přes e-mail nebo jednoduchou službu v EU, bez povinných osobních údajů | GDPR, minimum dat |
| Video | YouTube (nocookie) a zároveň vlastní soubory MP4 na webu | Funguje i při blokaci YouTube; stahování pod CC BY |
| Fonty a skripty | Vše hostované u nás, žádné načítání od třetích stran | Soukromí, rychlost, bezpečnost |

**Výkonnostní limity:** úvodní stránka do 300 kB, načtení do 2 s na 3G, Lighthouse aspoň 95 ve všech kategoriích.

**Přístupnost:** WCAG 2.2 AA, ovládání klávesnicí, čtečky obrazovky, volba „Větší písmo“, respektování nastavení „omezit pohyb“, titulky u videí, srozumitelný jazyk. Před spuštěním audit přístupnosti (např. s organizacemi nevidomých a seniorů).

**Jazyky:** čeština (M), ukrajinština (R), angličtina u stránky O nás pro zahraniční partnery a média (P).

## Bezpečnost a ochrana značky

Projekt se stane terčem. Počítáme s napodobeninami webu, falešnými účty a útoky na tým.

- **Domény:** hlavní + obranné varianty a překlepy (`vimecodelat.cz`, `vime-co-delat.cz`, `vimecodelat.eu`, `.com`, `.org`, případně `vimecodelt.cz`). Sledovat nově registrované podobné domény.
- **Účty:** dvoufázové ověření hardwarovým klíčem u všech správců, oddělené účty pro každého člověka, žádné sdílené heslo. Správce hesel s auditní stopou.
- **Web:** Content Security Policy, HSTS, žádné formuláře s citlivými daty, automatické aktualizace závislostí, revize kódu přes pull requesty.
- **Ověření pravosti:** stránka „Naše oficiální kanály“ se seznamem všech účtů. Při napodobení jasné varování na webu i na sítích.
- **Tým:** pravidla digitální bezpečnosti (viz [06](06-tym-rozpocet-rizika.md#bezpečnost-týmu)), skrytí osobních údajů v registrech, kde to jde.
- **Penetrační test** (lehký, statický web) před spuštěním.

## Licence

- Texty, ilustrace, videa a audio: **CC BY 4.0** (obce, školy a média je mohou volně přebírat s uvedením zdroje).
- Kód webu: MIT nebo EUPL.
- Logo a název: chráněné, nejsou součástí CC BY. Partneři je smějí použít podle manuálu značky. Zvážit registraci ochranné známky (ÚPV) kvůli ochraně před napodobením.
- Výjimky (fotografie svědků, hudba třetích stran) se u díla výslovně vyznačí.

## Harmonogram vývoje

| Termín | Výstup |
| --- | --- |
| do 15. 12. 2026 | Výběr vývojáře nebo týmu, struktura webu, drátěné modely hlavních stránek |
| do 15. 1. 2027 | Design systém podle brandu, prototyp průvodce a rodinného plánu, testy použitelnosti s 5 lidmi |
| do 5. 2. 2027 | Kompletní web s obsahem MVP na testovací adrese, PWA, lehká verze, tisk |
| do 12. 2. 2027 | Audit přístupnosti, penetrační test, výkonnostní test, zrcadlo |
| 8.–19. 2. 2027 | Test s 30 čtenáři na testovací adrese (brána B2) |
| 26. 2. 2027 | Zmrazení obsahu a kódu, záložní plán |
| 1. 3. 2027 | Spuštění |
