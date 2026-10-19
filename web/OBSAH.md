# Jak psát obsah webu

Obsah je v Markdownu ve složce `src/content/<pilíř>/<adresa>.md`. Adresa souboru je zároveň adresa stránky: `src/content/scenar/proc-tyl.md` → `vimecodelat.cz/scenar/proc-tyl`.

Pilíře (složky): `scenar`, `pribehy`, `priprav-se`, `manipulace`, `o-nas`.

## Hlavička souboru

```yaml
---
title: "Proč Česko nebude fronta, ale týl"   # titulek stránky (H1 se nepíše do textu)
id: "S-01"                                     # ID ze soupisu obsahu (plan/02-obsah.md)
popis: "Dvě věty shrnutí pro náhled při sdílení, pro lehkou verzi a pro rozhlas."  # max. 200 znaků
poradi: 1                                      # pořadí v pilíři
druh: "modelovy"                               # jen u příběhů: modelovy | svedectvi
cteni: 5                                       # odhad minut čtení (nepovinné)
krok: "Domluvte se s rodinou, kde se sejdete, když nepůjdou telefony."  # Krok na dnes, max. 25 slov
zdroje:                                        # Odkud to víme (u scénáře povinné)
  - nazev: "BIS: Výroční zpráva 2025"
    url: "https://www.bis.cz/vyrocni-zpravy/"
    datum: "2026"
autor: "Redakce Víme, co dělat"
recenze: "Čeká na odbornou revizi"
revidovano: "2026-10-19"
stav: "navrh"                                  # navrh | revize | schvaleno
---
```

## Pravidla

- Tón a slovník podle `plan/01-brand.md`, stavba stránek podle šablon v `plan/02-obsah.md`.
- Text začíná rovnou prvním odstavcem. Nadpisy uvnitř textu jsou `##` a `###`.
- Krok na dnes se do textu nepíše, vykreslí se z hlavičky `krok`.
- Zdroje se do textu nepíšou jako seznam, vykreslí se z hlavičky `zdroje` jako „Odkud to víme“.
- Nikdy nevymýšlet čísla, citace ani zdroje. Co je potřeba ověřit, se označí `[OVĚŘIT: co a kde]`. Tyto značky web zvýrazní a před spuštěním nesmí žádná zůstat.
- Odkazy na jiné stránky webu jsou relativní od kořene: `[rodinný plán](/priprav-se/rodinny-plan)`.
