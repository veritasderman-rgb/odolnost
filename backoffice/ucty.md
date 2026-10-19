# Registr účtů

[← Backoffice](README.md)

Přehled všech účtů projektu: kdo je vlastní, jak jsou chráněné a v jakém jsou stavu. **Tabulka je bez hesel.** Hesla, obnovovací kódy a API klíče jsou jen ve správci hesel organizace (kolekce uvedená ve sloupci 2FA nebo v poznámce).

> **Repozitář je veřejný.** Do tohoto souboru nepište hesla, obnovovací kódy, telefonní čísla, osobní e-maily, jména lidí ani sériová čísla klíčů. Vlastníka uvádějte rolí. Technická adresa `ucty@` se zde uvádí jen jako označení, mimo repozitář ji nezveřejňujte.

## Legenda

**Role:** KOO koordinátor/ka · SR šéfredaktor/ka · SOC správa sítí a komunity · DEV vývojář/ka · PR média ([role v README](README.md#role-se-kterými-počítáme))

**2FA:** `klíč` = hardwarový bezpečnostní klíč FIDO2 (hlavní + záložní) · `app` = aplikace pro ověřování · `e-mail` = kód e-mailem · `SMS` = jen nouzově, nepoužívat jako jedinou metodu · `–` = zatím nenastaveno

**Stav:** `nezaloženo` · `zabráno` (jméno obsazené, profil prázdný a neveřejný) · `připraveno` (vyplněný profil, neveřejný) · `veřejné` · `ověřené` (odznak nebo ověření domény) · `zrušeno`

**Záložní kontakt:** kam chodí obnova přístupu a kdo je druhý správce. Nikdy osobní e-mail ani osobní telefon.

## Doména, e-mail a technika

| Služba | Uživatelské jméno / identifikátor | URL | Vlastník (role) | 2FA | Záložní kontakt | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| Registrátor domén (.cz, .eu, .com, .org) | účet organizace | [OVĚŘIT: zvolený registrátor] | KOO | klíč | SR · `ucty@` | nezaloženo |
| Doména `vimecodelat.cz` | držitel: KOO, po zápisu organizace právnická osoba | vimecodelat.cz | KOO | (přes registrátora) | SR | nezaloženo |
| Obranné domény (`vime-co-delat.cz`, `vimecodelt.cz`, `vimecodelat.eu`, `.com`, `.org`) | stejný účet registrátora | – | KOO | (přes registrátora) | SR | nezaloženo |
| Poskytovatel DNS (pokud jiný než registrátor) | účet organizace | [OVĚŘIT] | DEV | klíč | KOO · `ucty@` | nezaloženo |
| E-mail: správa domény (admin) | admin účet | [OVĚŘIT: zvolený poskytovatel] | KOO | klíč | SR | nezaloženo |
| E-mail `info@` | sdílená schránka / alias | – | KOO | klíč | SR | nezaloženo |
| E-mail `media@` | sdílená schránka / alias | – | PR / KOO | klíč | SR | nezaloženo |
| E-mail `opravy@` | sdílená schránka | – | SR | klíč | KOO | nezaloženo |
| E-mail `redakce@` | sdílená schránka | – | SR | klíč | KOO | nezaloženo |
| E-mail `ucty@` (technická, neveřejná) | schránka | – | KOO | klíč | SR | nezaloženo |
| E-mail `novinky@` (odesílatel newsletteru) | alias, odpovědi na `info@` | – | KOO | (přes schránku) | SR | nezaloženo |
| Správce hesel (organizace) | organizace `vimecodelat` | [OVĚŘIT: Bitwarden, region EU] | KOO | klíč | SR (vlastník organizace) | nezaloženo |
| Sdílený disk | prostor organizace | [OVĚŘIT] | KOO | klíč | SR | nezaloženo |
| GitHub: organizace | `vimecodelat` | github.com/vimecodelat | DEV + KOO (vlastníci) | klíč | `ucty@` | nezaloženo |
| GitHub: repozitář s obsahem a webem | `vimecodelat/…` | [OVĚŘIT: název repozitáře po přesunu] | DEV | (přes organizaci) | KOO | nezaloženo |
| Hosting: hlavní | účet organizace | [OVĚŘIT nabídkami] | DEV | klíč | KOO · `ucty@` | nezaloženo |
| Hosting: zrcadlo (jiný poskytovatel) | účet organizace | [OVĚŘIT nabídkami] | DEV | klíč | KOO · `ucty@` | nezaloženo |
| Brevo (newsletter) | účet organizace | app.brevo.com | KOO | app / klíč | SR · `ucty@` | nezaloženo |
| Měření návštěvnosti bez cookies | účet organizace / vlastní instance | [OVĚŘIT: Plausible, Umami nebo GoatCounter] | DEV | klíč / app | KOO | nezaloženo |
| Formulář pro hlášení chyb | účet organizace (pokud služba) | [OVĚŘIT] | DEV | app | SR | nezaloženo |
| Nástroj pro plánování příspěvků | účet organizace | [OVĚŘIT: nativní nástroje nebo Buffer] | SOC | klíč / app | SR · `ucty@` | nezaloženo |
| Telefon organizace (SIM) | služební číslo, nezveřejňovat | – | KOO | PIN SIM | SR ví, kde je telefon | nezaloženo |

## Sociální sítě

Postup založení je v [zakladani-socialnich-siti.md](zakladani-socialnich-siti.md), texty profilů v [socialni-site/profily.md](socialni-site/profily.md).

| Služba | Uživatelské jméno | URL | Vlastník (role) | 2FA | Záložní kontakt | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| Meta: business portfolio (Meta Business Suite) | „Víme, co dělat“ | business.facebook.com | KOO (plná kontrola) | klíč / app, vynuceno pro všechny | SR (plná kontrola) | nezaloženo |
| Facebook: stránka | `vimecodelat` | facebook.com/vimecodelat | KOO | (osobní účty správců: klíč / app) | SR | nezaloženo |
| Instagram (firemní účet) | `vimecodelat` | instagram.com/vimecodelat | KOO | app / klíč | SR · `ucty@` | nezaloženo |
| Threads | `vimecodelat` | threads.com/@vimecodelat | KOO | (přes Instagram) | SR | nezaloženo |
| WhatsApp Business (číslo organizace) | profil „Víme, co dělat“ | – | KOO | PIN dvoufázového ověření | SR · `ucty@` | nezaloženo |
| WhatsApp kanál | „Víme, co dělat“ | odkaz kanálu [doplnit po založení] | KOO | (přes WhatsApp Business) | SR (druhý správce kanálu) | nezaloženo |
| TikTok (firemní účet) | `vimecodelat` | tiktok.com/@vimecodelat | SOC | app | KOO · `ucty@` | nezaloženo |
| Google účet pro YouTube | `ucty@vimecodelat.cz` | myaccount.google.com | KOO | klíč (zvážit Advanced Protection) | SR | nezaloženo |
| YouTube kanál (Brand Account) | `@vimecodelat` | youtube.com/@vimecodelat | KOO (vlastník) | (přes Google účet) | SR (vlastník), SOC (správce) | nezaloženo |
| LinkedIn stránka | `vimecodelat` | linkedin.com/company/vimecodelat | KOO (superadmin) | (osobní účty správců: app) | SR (superadmin) | nezaloženo |
| Bluesky | `vimecodelat.bsky.social`, po ověření domény `vimecodelat.cz` | bsky.app/profile/vimecodelat.cz | SOC | e-mail | KOO · `ucty@` | nezaloženo |
| X | `vimecodelat` | x.com/vimecodelat | SOC | klíč / app | KOO · `ucty@` | nezaloženo |

## Později (po zápisu organizace)

| Služba | Uživatelské jméno | URL | Vlastník (role) | 2FA | Záložní kontakt | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| Darujme.cz nebo Donio (crowdfunding v pilotu) | účet organizace | [OVĚŘIT] | KOO | app | SR | nezaloženo |
| TechSoup (slevy pro neziskovky) | účet organizace | [OVĚŘIT] | KOO | app | SR | nezaloženo |
| Ochranná známka (ÚPV) | přihláška | – | KOO | – | právník/ice | nezaloženo |
| Grafické šablony (Canva nebo Figma, rozhodne designér) | tým organizace | [OVĚŘIT] | SOC | app | KOO | nezaloženo |

## Evidence bezpečnostních klíčů

Evidujeme jen počet a umístění, žádná sériová čísla.

| Klíč | Držitel (role) | Hlavní / záložní | Kde je uložen (obecně) | Registrován u | Stav |
| --- | --- | --- | --- | --- | --- |
| K1 | KOO | hlavní | nosí u sebe | [doplnit služby] | neobjednáno |
| K2 | KOO | záložní | uložen odděleně | [doplnit služby] | neobjednáno |
| K3 | SR | hlavní | nosí u sebe | [doplnit služby] | neobjednáno |
| K4 | SR | záložní | uložen odděleně | [doplnit služby] | neobjednáno |
| K5 | DEV | hlavní | nosí u sebe | [doplnit služby] | neobjednáno |
| K6 | SOC | hlavní | nosí u sebe | [doplnit služby] | neobjednáno |

## Záznam změn

| Datum | Co se změnilo | Kdo (role) |
| --- | --- | --- |
| 2026-10-19 | Založení registru, všechny služby ve stavu „nezaloženo“ | KOO |
