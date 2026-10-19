# Backoffice: provozní zázemí projektu

[← Přehled plánu](../plan/00-prehled.md)

Stav k 19. 10. 2026 · navazuje na [05 Web a technika](../plan/05-web.md#bezpečnost-a-ochrana-značky) a [06 Bezpečnost týmu](../plan/06-tym-rozpocet-rizika.md#bezpečnost-týmu)

Tahle složka popisuje, jak založit a spravovat všechno, co projekt potřebuje „za oponou“: doménu, e-maily, hesla, účty, nástroje a šablony dokumentů. Priorita zadavatele je jasná: **nejdřív web, obsadit sociální sítě a připravit backoffice.** Správní rada a instituce přijdou na řadu později.

> **Repozitář je veřejný.** Sem nikdy nepatří hesla, obnovovací kódy, API klíče, osobní telefony, osobní e-maily ani jména soukromých osob. Všechno citlivé patří do správce hesel (viz krok 1). V dokumentech uvádíme jen **role** (koordinátor/ka, šéfredaktor/ka, správa sítí), ne jména.

## Co ve složce najdete

| Soubor | K čemu je |
| --- | --- |
| **README.md** (tento soubor) | Pořadí kroků, kdo, proč a bezpečnostní poznámky |
| [ucty.md](ucty.md) | Registr účtů bez hesel: kdo co vlastní, jak je chráněné, v jakém je stavu |
| [zakladani-socialnich-siti.md](zakladani-socialnich-siti.md) | Postup založení účtů na 9 sítích, nastavení zabezpečení a moderace |
| [socialni-site/profily.md](socialni-site/profily.md) | Texty profilů: jméno, bio v limitu znaků, odkaz, kategorie, připnutý příspěvek |
| [socialni-site/prvni-prispevky.md](socialni-site/prvni-prispevky.md) | 10 příspěvků před spuštěním a plán týdne spuštění |
| [socialni-site/pravidla-diskuze.md](socialni-site/pravidla-diskuze.md) | Veřejná pravidla diskuze a interní příručka pro správce |
| [sablony/souhlas-svedectvi.md](sablony/souhlas-svedectvi.md) | Vzor informovaného souhlasu svědka (nutná právní kontrola) |
| [sablony/oslovovaci-dopisy.md](sablony/oslovovaci-dopisy.md) | Vzorové e-maily: designérské studio, video studio, tvůrci, testovací čtenáři |

## Role, se kterými počítáme

| Role (zkratka v dokumentech) | Kdo to je | Co v backoffice dělá |
| --- | --- | --- |
| **KOO** koordinátor/ka | hlavní správce účtů | Zakládá účty, vlastní hlavní přístupy, vede registr účtů |
| **SR** šéfredaktor/ka | druhý správce | Záložní správce všech kritických účtů, schvaluje obsah |
| **SOC** správa sítí a komunity | provoz sítí | Publikuje a moderuje, nemá vlastnická práva k doméně a e-mailům |
| **DEV** vývojář/ka webu | technika | Hosting, DNS záznamy webu, GitHub, měření |
| **ZAK** zakladatel | v pozadí | Nemá být jediným vlastníkem žádného účtu, aby projekt nebyl spojený s jednou osobou |

Pravidlo: **každý kritický účet má dva správce (KOO + SR) a nikdo nesdílí přihlašovací údaje.** Každý člověk má vlastní přihlášení a vlastní bezpečnostní klíče.

## Pořadí kroků

Kroky jsou seřazené tak, aby každý další stavěl na předchozím. Odhad času je pro jednoho člověka, který postup dělá poprvé. Stav průběžně zapisujte do [ucty.md](ucty.md).

### Týden 1: základ (doména, e-mail, hesla)

- [ ] **0. Objednat hardwarové bezpečnostní klíče** (dodání trvá několik dní)
- [ ] **1. Zaregistrovat doménu a obranné varianty**
- [ ] **2. Nastavit DNS: DNSSEC, zámek, záznamy pro e-mail**
- [ ] **3. Zřídit e-maily na doméně** (`info@`, `media@`, `opravy@`, `redakce@`, `ucty@`)
- [ ] **4. Založit správce hesel organizace a uložit do něj vše z kroků 1–3**
- [ ] **5. Zabrat uživatelská jména na sítích** (podle [zakladani-socialnich-siti.md](zakladani-socialnich-siti.md))
- [ ] **6. Založit organizaci na GitHubu a nastavit práva k repozitáři**

### Týden 2–3: pracovní nástroje

- [ ] **7. Sdílený disk** (dokumenty, souhlasy, zdrojová data)
- [ ] **8. Kalendář obsahu**
- [ ] **9. Nástroj pro plánování příspěvků**

### Do 15. 12. 2026 (rozhodnutí R5 a R6)

- [ ] **10. Hosting webu** (hlavní + zrcadlo)
- [ ] **11. Brevo: newsletter** (účet, ověření domény, odesílatel, seznam, double opt-in)
- [ ] **12. Měření návštěvnosti bez cookies**
- [ ] **13. Formulář pro hlášení chyb**

Podrobnosti ke každému kroku jsou níže.

---

### 0. Hardwarové bezpečnostní klíče

| | |
| --- | --- |
| **Kdo** | KOO objedná, každý správce dostane své |
| **Proč** | Projekt bude terčem phishingu a pokusů o převzetí účtů. Hardwarový klíč (FIDO2/WebAuthn) nejde vylákat falešnou stránkou, na rozdíl od SMS nebo kódu z aplikace. |
| **Co** | Dva klíče na každého správce (hlavní + záložní), tedy aspoň 4–6 kusů. Klíče standardu FIDO2 s USB-C a NFC, aby fungovaly s počítačem i telefonem (např. YubiKey, Nitrokey nebo Token2; vybrat podle ceny a dostupnosti). |
| **Bezpečnost** | Záložní klíč se registruje ke všem účtům hned spolu s hlavním a uloží se odděleně (doma v šuplíku, ne v tašce s hlavním). Ke každému účtu zároveň uložit obnovovací kódy do správce hesel. Evidence klíčů je v [ucty.md](ucty.md#evidence-bezpečnostních-klíčů) bez sériových čísel. |

### 1. Doména a obranné varianty

| | |
| --- | --- |
| **Kdo** | KOO |
| **Proč** | `vimecodelat.cz` byla podle RDAP CZ.NIC 19. 10. 2026 volná (rozhodnutí R2: registrovat ihned). Obranné varianty brání napodobeninám webu, které by mohly šířit hoaxy naším jménem. |
| **Co registrovat** | `vimecodelat.cz` (hlavní), `vime-co-delat.cz`, `vimecodelt.cz` (překlep), `vimecodelat.eu`, `vimecodelat.com`, `vimecodelat.org`. Na 2–3 roky dopředu, se zapnutým automatickým prodloužením. |
| **U koho** | U registrátora akreditovaného u CZ.NIC, který nabízí: DNSSEC (ideálně automaticky přes CDS/CDNSKEY), dvoufázové přihlášení do účtu, zámek proti převodu a správu `.eu`, `.com` a `.org` na jednom místě. Ceny a podmínky porovnat u 2–3 registrátorů. |
| **Držitel domény** | Až vznikne spolek nebo ústav, musí být držitelem **právnická osoba**, ne člověk. Do té doby se doména zaregistruje na KOO jako fyzickou osobu a po zápisu organizace se provede změna držitele. [OVĚŘIT: postup změny držitele a poplatek u zvoleného registrátora.] |
| **Bezpečnost** | Účet u registrátora založit na `ucty@vimecodelat.cz` (po kroku 3 adresu změnit, pokud byla doména registrována dřív než e-mail). Zapnout 2FA, nejlépe bezpečnostním klíčem. Zjistit, zda registrátor nabízí blokaci změn přímo v registru CZ.NIC (tzv. registry lock). [OVĚŘIT: název a dostupnost služby u zvoleného registrátora.] U fyzických osob CZ.NIC ve výchozím stavu skrývá osobní údaje ve veřejném WHOIS. [OVĚŘIT: aktuální nastavení zveřejňování údajů u držitele.] |
| **Obranné domény** | Nasměrovat přesměrováním 301 na `vimecodelat.cz`. Protože z nich nikdy neposíláme e-maily, nastavit „prázdný“ e-mail, aby je nikdo nemohl zneužít k podvrženým zprávám: `MX 0 .` (null MX), SPF `v=spf1 -all`, DMARC `v=DMARC1; p=reject`. |

### 2. DNS, DNSSEC a zámek

| | |
| --- | --- |
| **Kdo** | DEV nastaví, KOO zkontroluje |
| **Proč** | DNS rozhoduje, kam míří web i e-mail. Kdo ovládne DNS, ovládne projekt. Plán [05](../plan/05-web.md#technické-řešení) počítá s přepnutím na zrcadlo do 15 minut. |
| **Co** | DNS buď u registrátora, nebo u samostatného poskytovatele DNS v EU s podporou DNSSEC a API (např. deSEC, nezisková služba z Berlína se zapnutým DNSSEC ve výchozím stavu; [OVĚŘIT: podmínky a dostupnost]). Zapnout **DNSSEC**, nastavit **nízké TTL** (např. 300 s) u záznamů webu kvůli rychlému přepnutí na zrcadlo, zapnout **zámek domény** proti převodu. |
| **Záznamy pro e-mail** | MX podle poskytovatele e-mailu (krok 3), SPF (jeden záznam pro celou doménu, který zahrnuje poskytovatele e-mailu i Brevo, pokud ho Brevo bude vyžadovat), DKIM pro poskytovatele e-mailu i pro Brevo, DMARC. DMARC zavádět postupně: první 2–4 týdny `p=none` s reporty, pak `p=quarantine`, nakonec `p=reject`. |
| **Další záznamy** | `_atproto` TXT pro handle `@vimecodelat.cz` na Bluesky (viz [postup](zakladani-socialnich-siti.md#bluesky)), ověřovací TXT záznamy pro Google (YouTube), Meta a GitHub podle potřeby, CAA záznam omezující vydávání certifikátů na certifikační autoritu hostingu. |
| **Bezpečnost** | Každou změnu DNS zapsat do registru účtů nebo do issue v repozitáři (datum, kdo, proč). Přístup do DNS mají jen KOO a DEV, oba s 2FA klíčem. Po zapnutí DNSSEC ověřit nástrojem, např. DNSViz. |

### 3. E-maily na doméně

| | |
| --- | --- |
| **Kdo** | KOO založí, DEV nastaví DNS záznamy |
| **Proč** | Účty na sítích, u registrátora a u nástrojů nesmí viset na osobních e-mailech. Když člověk odejde, schránka zůstane projektu. Adresa na doméně je také podmínkou ověření domény v Brevu a ověření stránky na LinkedInu. |
| **Doporučený poskytovatel** | Poskytovatel se sídlem a servery v EU, s podporou vlastní domény, aliasů, sdílených schránek a 2FA. Možnosti k porovnání: **mailbox.org** (Německo; tarif Standard umožňuje 50 aliasů na vlastní doméně, Light aliasy na vlastní doméně jen v týmových účtech), **Tuta** (Německo; silné šifrování, ale bez klasického IMAP, což komplikuje sdílené schránky a nástroje) nebo **Proton Mail** (Švýcarsko, mimo EU, ale s rozhodnutím EU o odpovídající ochraně údajů). Doporučení: mailbox.org kvůli IMAP, aliasům a nízké ceně. [OVĚŘIT: aktuální ceník a podmínky pro neziskové organizace.] |
| **Adresy** | Viz tabulka níže. Každý člen týmu má osobní pracovní schránku. Sdílené adresy jsou aliasy nebo sdílené schránky s přístupem pro určené role. |
| **Bezpečnost** | 2FA bezpečnostním klíčem u všech schránek. Žádné automatické přeposílání na osobní e-maily. Podpis e-mailu bez osobního telefonu. Phishingové školení před spuštěním (plán [06](../plan/06-tym-rozpocet-rizika.md#bezpečnost-týmu)). |

| Adresa | K čemu | Kdo čte | Kdo je záloha | Zveřejnit? |
| --- | --- | --- | --- | --- |
| `info@vimecodelat.cz` | Obecné dotazy, partneři, veřejnost | KOO | SR | Ano (web, profily) |
| `media@vimecodelat.cz` | Novináři, žádosti o rozhovor | PR / KOO | SR | Ano (stránka Pro média) |
| `opravy@vimecodelat.cz` | Hlášení chyb v obsahu, lhůta odpovědi 3 pracovní dny | SR | autor/ka podle tématu | Ano (stránka Opravy) |
| `redakce@vimecodelat.cz` | Autoři, recenzenti, svědci, tvůrci | SR | KOO | Jen v komunikaci s autory |
| `ucty@vimecodelat.cz` | Registrace u sítí a služeb, obnova přístupů | KOO | SR | **Ne**, nikde nezveřejňovat |

`ucty@` je technická adresa, na kterou se registrují všechny služby. Nesmí být nikde veřejně, aby ji útočník nemohl použít k obnově hesla nebo k cílenému phishingu.

### 4. Správce hesel s hardwarovými klíči

| | |
| --- | --- |
| **Kdo** | KOO založí organizaci, pozve SR, SOC, DEV |
| **Proč** | Plán [05](../plan/05-web.md#bezpečnost-a-ochrana-značky) vyžaduje oddělené účty, žádné sdílené heslo a auditní stopu. Správce hesel je jediné místo, kde žijí hesla, obnovovací kódy a API klíče. |
| **Doporučení** | **Bitwarden** (organizace s datovým regionem EU, FIDO2/WebAuthn 2FA zdarma pro všechny uživatele, sdílené kolekce podle rolí, protokol událostí). Region se volí při registraci a později ho nejde přesunout, proto hned zvolit **EU**. Alternativa: Proton Pass (Švýcarsko). [OVĚŘIT: cena tarifu pro organizace a případná sleva pro neziskovky.] |
| **Struktura kolekcí** | `Kritické` (registrátor, DNS, e-mail admin, GitHub owner, Meta business portfolio, Google účet YouTube): KOO + SR · `Sítě` (přístupy k sítím, kde nejde přidat osobní účet): KOO + SR + SOC · `Technika` (hosting, měření, API klíč Brevo): KOO + DEV · `Obnovovací kódy`: KOO + SR |
| **Bezpečnost** | Hlavní heslo do správce hesel si každý pamatuje a nikam nepíše do počítače. Obnovovací kód správce hesel vytisknout a uložit v zalepené obálce na bezpečném místě organizace (u KOO a SR zvlášť). Při odchodu člověka: odebrat z organizace, změnit hesla ve všech kolekcích, kam měl přístup. |

### 5. Zabrat uživatelská jména na sítích

| | |
| --- | --- |
| **Kdo** | KOO, s pomocí SOC |
| **Proč** | Ochrana před napodobením (riziko „falešný Víme, co dělat“ v plánu [06](../plan/06-tym-rozpocet-rizika.md#rizika)). Jméno `vimecodelat` zabíráme i na sítích, které zatím nepoužijeme. |
| **Postup** | Podrobně v [zakladani-socialnich-siti.md](zakladani-socialnich-siti.md). Texty profilů v [socialni-site/profily.md](socialni-site/profily.md). |
| **Bezpečnost** | Registrace na `ucty@`, telefon organizace (ne osobní), 2FA klíčem všude, kde to síť umí. Účty do spuštění prázdné a neveřejné, kde to jde. |

### 6. GitHub: repozitář a práva

| | |
| --- | --- |
| **Kdo** | DEV nastaví, KOO je druhý vlastník |
| **Proč** | Repozitář je zdroj pravdy pro texty a plán a jeho historie slouží jako veřejný záznam oprav (plán [02](../plan/02-obsah.md#redakční-proces)). |
| **Co** | Organizace `vimecodelat` na GitHubu (zabrat i jméno). Přesunout do ní tento repozitář. Dva vlastníci (KOO, DEV), ostatní jako členové s právem zápisu jen do potřebných repozitářů. Autoři a recenzenti mohou přispívat přes pull requesty. |
| **Nastavení** | Povinné 2FA pro všechny členy organizace · ochrana větve `main` (změny jen přes pull request se schválením aspoň jednou další osobou, žádný force push) · zapnuté skenování tajných údajů a ochrana proti jejich nahrání (secret scanning, push protection) · Dependabot pro aktualizace závislostí · ověřená doména `vimecodelat.cz` v nastavení organizace. |
| **Bezpečnost** | Repozitář je veřejný: žádné osobní údaje, souhlasy svědků, kontakty na recenzenty ani surová data z průzkumů. Ty patří na sdílený disk (krok 7). Tajné klíče pro nasazení webu jen v šifrovaných proměnných (Actions secrets), nikdy v kódu. |

### 7. Sdílený disk

| | |
| --- | --- |
| **Kdo** | KOO |
| **Proč** | Pro to, co nesmí do veřejného repozitáře: podepsané souhlasy svědků, smlouvy, faktury, nabídky studií, kontakty na partnery, surová videa a zdrojové soubory grafiky. |
| **Doporučení** | Úložiště v EU se sdílením podle složek a 2FA. Možnosti: disk u poskytovatele e-mailu (mailbox.org má vlastní úložiště), hostovaný Nextcloud u evropského poskytovatele, nebo Proton Drive. Google Workspace pro neziskové organizace je možný až po zápisu organizace a data jsou u amerického poskytovatele. [OVĚŘIT: kapacita pro videa, plán počítá s originály na dvou nezávislých úložištích.] |
| **Struktura** | `01-organizace` · `02-smlouvy-a-nabidky` · `03-souhlasy` (přístup jen SR a KOO) · `04-zdrojova-data` (grafika, video) · `05-media` (tiskové materiály) · `06-pruzkumy` (jen anonymizovaná data) |
| **Bezpečnost** | Složka `03-souhlasy` obsahuje osobní údaje svědků: přístup jen pro 2 role, žádné veřejné odkazy, zálohy šifrované. Sdílení odkazem „kdokoli s odkazem“ zakázat. |

### 8. Kalendář obsahu

| | |
| --- | --- |
| **Kdo** | SR vede, SOC plní |
| **Proč** | Týdenní rytmus (Po Krok na týden · St Poznej techniku · Pá Příběh · Ne odpovědi), měsíční rituál „Siréna = 1 krok“ a klíčová data roku 2027 z plánu [04](../plan/04-socialni-site.md#týdenní-rytmus-od-spuštění). |
| **Doporučení** | Jednoduchá sdílená tabulka na sdíleném disku (ne v repozitáři, kvůli embargu tiskových zpráv a nezveřejněným příspěvkům). Sloupce: datum a čas · kanál · pilíř · ID obsahu (např. P-01, B01) · text (odkaz na dokument) · vizuál (odkaz) · Krok na dnes · stav (návrh / ke schválení / schváleno / naplánováno / zveřejněno) · schválil/a (role). |
| **Bezpečnost** | Zapisovat jen schválené texty. Do kalendáře nepatří osobní údaje svědků. Při krizovém režimu je v kalendáři vidět, co se má pozastavit. |

### 9. Nástroj pro plánování příspěvků

| | |
| --- | --- |
| **Kdo** | SOC, schvaluje SR |
| **Proč** | Plánování 4–5 příspěvků týdně na 8 kanálech a rychlé pozastavení všeho v krizovém režimu (do 30 minut). |
| **Doporučení** | Začít **nativními nástroji** (zdarma, bez předávání přístupů třetí straně): Meta Business Suite pro Facebook a Instagram, YouTube Studio, plánování v TikTok Studiu a na LinkedInu. Pokud to bude nepraktické, jeden nástroj pro všechny kanály, např. Buffer (sleva 50 % pro registrované neziskové organizace přes TechSoup, tedy až po zápisu organizace). [OVĚŘIT: aktuální podporu Bluesky, Threads a TikToku v nástroji a jeho podmínky.] WhatsApp kanál se plánovat nedá, zveřejňuje se ručně. [OVĚŘIT v aplikaci.] |
| **Bezpečnost** | Nástroj třetí strany dostane přístup ke všem kanálům. Proto: 2FA klíčem, jen nezbytná oprávnění, u Bluesky jen „heslo aplikace“, nikdy hlavní heslo. Musí umět **jedním krokem pozastavit frontu** (krizový režim). |

### 10. Hosting webu

| | |
| --- | --- |
| **Kdo** | DEV |
| **Proč** | Web musí fungovat i při útoku a výpadku. Plán [05](../plan/05-web.md#technické-řešení): dva nezávislí poskytovatelé v EU (hlavní + zrcadlo), CDN, ochrana proti DDoS, přepnutí do 15 minut. |
| **Co** | Statický web (Astro) nasazovaný z repozitáře. Hlavní hosting a zrcadlo u dvou různých firem a v různých datových centrech. Funkce pro přihlášení k newsletteru (`/api/odber`) musí mít náhradu, když hlavní hosting vypadne (na zrcadle stačí odkaz na formulář Brevo). Možnosti k porovnání: evropské CDN a úložiště (např. Bunny.net, Slovinsko), evropské datové centrum (např. Hetzner, Německo) nebo český hosting. [OVĚŘIT nabídkami: cena, ochrana proti DDoS, nasazení z GitHubu.] |
| **Bezpečnost** | HTTPS s HSTS, Content Security Policy, žádné skripty a fonty od třetích stran. Přístup k hostingu jen DEV a KOO s 2FA. Nasazovací klíče jen v GitHub Actions secrets. Před spuštěním lehký penetrační test (plán [05](../plan/05-web.md#bezpečnost-a-ochrana-značky)). |

### 11. Brevo: newsletter

| | |
| --- | --- |
| **Kdo** | KOO založí účet, DEV propojí s webem, SR píše obsah |
| **Proč** | Newsletter je jediný kanál, který nám platforma nevezme (rozhodnutí R5). Brevo je francouzská firma, data zůstávají v EU. |

Postup:

- [ ] **Vlastní účet organizace.** Založit na `ucty@vimecodelat.cz`, ne na osobní e-mail a ne pod účtem jiné organizace či agentury. Zapnout 2FA. Přidat SR jako druhého uživatele s vlastním přihlášením.
- [ ] **Ověření domény.** V Brevu: *Settings → Senders, Domains, IPs → Domains → Add a domain*. Brevo vyžaduje záznamy **Brevo code** (TXT), **DKIM** (1 TXT nebo 2 CNAME podle stáří účtu) a **DMARC** (TXT). Doporučujeme **ruční ověření**: záznamy zkopíruje DEV do DNS sám. Automatické ověření by vyžadovalo zadat do Brevа přihlašovací údaje k DNS, a to nechceme. Pokud už doména DMARC má (z kroku 2), Brevo nabídne jeho nahrazení: **nenahrazovat**, ponechat vlastní DMARC. Doména smí mít jen jeden DMARC záznam. SPF nastavujeme kvůli poskytovateli e-mailu; záznam pro Brevo přidat jen tehdy, když ho Brevo na stránce Domains vyžaduje. Ověření může trvat až 48 hodin.
- [ ] **Odesílatel na doméně.** Např. „Víme, co dělat“ `<novinky@vimecodelat.cz>` (alias, odpovědi chodí na `info@`). Nikdy neodesílat z adresy na Gmailu nebo Seznamu.
- [ ] **Seznam „Newsletter“.** Jeden hlavní seznam. Protože formulář je na našem webu (`/api/odber`), potřebujeme ještě dočasný seznam pro nepotvrzené adresy, nebo použít volání API pro double opt-in, které adresu zařadí do seznamu „Newsletter“ až po potvrzení. Postup techniky domluví DEV (viz `web/brevo/` a dokumentace Brevo k double opt-in pro formuláře mimo Brevo).
- [ ] **Šablona double opt-in.** V *Marketing → Templates* vytvořit šablonu „DOI potvrzení“. Bez personalizace (údaje kontaktu ještě nejsou uložené), bez reklamy a propagace. Obsahuje text souhlasu shodný s textem zaškrtávacího pole na webu a tlačítko s odkazem typu *Double opt-in link* (u formuláře z Brevа), nebo s proměnnou `{{ params.DOIurl }}` (při volání API). Návrh textu je níže.
- [ ] **Anonymní měření.** Brevo ve výchozím stavu měří otevření a kliknutí u každého příjemce. Úplně vypnout měření podle odpovědí podpory z roku 2024 nejde. Zapnout proto **anonymní měření (anonymous email tracking)**: otevření a kliknutí se počítají jen souhrnně a nepřiřazují se ke konkrétním lidem. To musíme správně popsat i na stránce [Ochrana soukromí](../web/src/content/o-nas/ochrana-soukromi.md). [OVĚŘIT: zda nejde měření úplně vypnout přes podporu Brevo. Rozhodnutí R5 počítalo s „bez sledování otevření“.]
- [ ] **Patička každého e-mailu:** kdo posílá, proč (přihlásili jste se na webu), odkaz na odhlášení jedním kliknutím, odkaz na ochranu soukromí.

**Návrh šablony double opt-in**

> **Předmět:** Potvrďte prosím odběr Víme, co dělat
>
> Dobrý den,
>
> někdo (nejspíš vy) zadal tuto adresu na webu vimecodelat.cz. Kliknutím na tlačítko potvrdíte tento souhlas:
>
> „Souhlasím se zasíláním e-mailů a se zpracováním e-mailové adresy podle zásad ochrany soukromí (vimecodelat.cz/o-nas/ochrana-soukromi).“
>
> **[ Ano, chci odebírat ]**
>
> Posíláme dvakrát měsíčně jeden krok, jeden příběh a jednu techniku manipulace. Odhlásit se můžete kdykoli jedním kliknutím v každém e-mailu.
>
> Pokud jste se nepřihlásili, nic nedělejte. Bez potvrzení vám nic posílat nebudeme.
>
> Víme, co dělat · vimecodelat.cz

| | |
| --- | --- |
| **Bezpečnost** | API klíč Brevo jen v proměnné prostředí hostingu a ve správci hesel, nikdy v repozitáři. Klíč s co nejmenšími oprávněními. Seznam odběratelů nikdy neexportovat do sdílených tabulek. Při odchodu člověka odebrat přístup. |

### 12. Měření bez cookies

| | |
| --- | --- |
| **Kdo** | DEV, rozhoduje KOO (rozhodnutí R6 do 15. 12.) |
| **Proč** | Potřebujeme vědět, kolik lidí si vytisklo plán a stáhlo kartu, ale nesmíme sledovat lidi, kteří k nám přijdou s obavou. |
| **Možnosti** | **Plausible Cloud** (firma z Estonska, data na serverech evropské firmy Hetzner v Německu, bez cookies, placené) nebo vlastní instance **Umami** či **GoatCounter** na našem serveru v EU (levnější, ale musíme ji udržovat). [OVĚŘIT: cena Plausible, případná sleva pro neziskovky.] |
| **Co měřit** | Jen agregované počty: návštěvy stránek, odkud lidé přišli (sociální síť, web partnera), stažení a tisky plánu a karty, dokončení průvodce, odpovědi na otázku „Cítíte se teď klidněji?“. Žádné IP adresy, žádné identifikátory, žádné nahrávání pohybu myši. |
| **Bezpečnost** | Skript měření hostovat na naší doméně. Na stránce Ochrana soukromí přesně popsat, co měříme. Přístup do statistik pro KOO, SR, SOC jen ke čtení. |

### 13. Formulář pro hlášení chyb

| | |
| --- | --- |
| **Kdo** | DEV nastaví, SR odpovídá |
| **Proč** | Opravy viditelně: chybu může nahlásit kdokoli, odpověď do 3 pracovních dnů (plán [02](../plan/02-obsah.md#redakční-proces)). |
| **Doporučení pro MVP** | 1) Odkaz `mailto:opravy@vimecodelat.cz` na každé stránce, s předvyplněným předmětem a adresou stránky. 2) Jednoduchý formulář na webu bez povinných osobních údajů (pole: adresa stránky, co je špatně, zdroj, nepovinný e-mail pro odpověď), odesílaný buď vlastní funkcí na hostingu do schránky `opravy@`, nebo přes službu v EU (např. Tally, Belgie, data uložená v EU). 3) Pro technicky zdatné odkaz na GitHub issues. |
| **Bezpečnost** | Ochrana proti spamu bez reCAPTCHA (skryté pole, omezení počtu odeslání). Nepovinný e-mail mazat po vyřízení opravy. Hlášení s osobními údaji třetích osob nepublikovat. |

## Na co nezapomenout

- **Stránka „Naše oficiální kanály“** na webu se seznamem všech účtů. Při objevení napodobeniny ji aktualizovat a varovat na sítích (plán [05](../plan/05-web.md#bezpečnost-a-ochrana-značky)).
- **Telefon organizace:** jedna předplacená SIM ve služebním telefonu, který má u sebe KOO. Slouží k ověření účtů a pro WhatsApp. Číslo se nikde nezveřejňuje a nesmí to být osobní číslo nikoho z týmu.
- **Odchod člověka z týmu:** odebrat ze správce hesel, z GitHubu, z Meta business portfolia, ze sdíleného disku a z e-mailu. Změnit hesla v kolekcích, kam měl přístup. Zapsat do [ucty.md](ucty.md).
- **Čtvrtletní kontrola:** projít [ucty.md](ucty.md), ověřit správce, 2FA a záložní kontakty, zkusit obnovu jednoho účtu podle postupu.
