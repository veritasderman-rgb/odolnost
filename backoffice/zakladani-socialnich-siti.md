# Založení účtů na sociálních sítích

[← Backoffice](README.md) · texty profilů: [socialni-site/profily.md](socialni-site/profily.md) · registr: [ucty.md](ucty.md)

Postupy ověřené 19. 10. 2026 podle nápověd platforem a odborných zdrojů (seznam na konci). Platformy rozhraní často mění: **názvy menu a limity vždy ověřte přímo v aplikaci.** Co jsme nedokázali ověřit z oficiálního zdroje, je označené `[OVĚŘIT]`.

Uživatelské jméno je všude **`vimecodelat`**, zobrazované jméno **Víme, co dělat**.

## Co připravit předem

| Co | Proč | Stav |
| --- | --- | --- |
| E-mail `ucty@vimecodelat.cz` (neveřejný) | Registrace všech účtů a obnova přístupu. Ne osobní e-mail. | viz [README, krok 3](README.md#3-e-maily-na-doméně) |
| Telefon organizace se samostatnou SIM | SMS ověření, WhatsApp Business. Ne osobní číslo. Telefon má u sebe KOO. | viz [README](README.md#na-co-nezapomenout) |
| Hardwarové klíče a správce hesel | 2FA a bezpečné uložení obnovovacích kódů | viz [README, kroky 0 a 4](README.md#0-hardwarové-bezpečnostní-klíče) |
| Osobní účty správců na Facebooku a LinkedInu | Meta i LinkedIn vyžadují, aby stránku spravoval skutečný člověk se svým účtem. Falešné nebo „služební“ osobní profily porušují pravidla a hrozí za ně zablokování. Správci (KOO, SR) použijí své skutečné účty se zapnutou 2FA. | – |
| Profilový obrázek a titulní obrázek | Dodá designér. Do té doby neutrální dočasný obrázek (název na barvě Papír), **ne** fotky z fotobank s vojenskou tematikou. | – |
| Texty profilů | [socialni-site/profily.md](socialni-site/profily.md) | hotovo v návrhu |

## Doporučené pořadí

Jména zabíráme **hned** (riziko napodobení). Profily vyplňujeme a zveřejňujeme až 1–2 týdny před spuštěním, a jen pokud je splněná brána B2 (viz [prvni-prispevky.md](socialni-site/prvni-prispevky.md)).

| # | Síť | Proč v tomto pořadí | Odhad času |
| --- | --- | --- | --- |
| 1 | **Facebook stránka + Meta business portfolio** | Na Metu navazuje Instagram, Threads i WhatsApp | 60–90 min |
| 2 | **Instagram** | Propojení se stránkou Facebooku | 30 min |
| 3 | **Threads** | Vzniká z účtu na Instagramu | 10 min |
| 4 | **WhatsApp Business + kanál** | Potřebuje telefon organizace | 30 min |
| 5 | **Google účet + YouTube kanál** | Google účet na `ucty@`, kanál jako Brand Account | 45 min |
| 6 | **TikTok** | Samostatná registrace | 30 min |
| 7 | **LinkedIn stránka** | Potřebuje osobní profil správce a e-mail na doméně | 30 min |
| 8 | **Bluesky** | Handle z vlastní domény po nastavení DNS | 20 min + čekání na DNS |
| 9 | **X** | Samostatná registrace | 20 min |

Celkem zhruba **5–6 hodin** práce, rozložené do 2–3 dnů kvůli ověřovacím SMS a šíření DNS.

## Pravidla, která platí na všech sítích

1. **Kategorie vždy neutrální**: komunitní nebo vzdělávací. **Nikdy** „politická organizace“, „politik“, „kandidát“, „politická strana“ ani „vládní organizace“ (nejsme stát a nesmíme tak působit). Ani „nezisková organizace“, protože projekt žádnou organizaci nemá.
2. **2FA na každém účtu**, kde to jde hardwarovým klíčem, jinak aplikací. SMS jen jako záložní metoda, nikdy jediná.
3. **Dva správci** s vlastními přihlášeními (KOO + SR). Nikdo nesdílí heslo.
4. **Žádná placená propagace** příspěvků ani „boost“, dokud neproběhne test v lednu 2027 (plán [04](../plan/04-socialni-site.md#placená-podpora)). Nikdy neobcházet pravidla o reklamách na společenská témata.
5. **Ověření pravosti**: všechny profily odkazují na `vimecodelat.cz` a web má stránku „Naše oficiální kanály“, která odkazuje zpět. Tím se profily ověřují navzájem i bez placeného odznaku.
6. **Pravidla diskuze** připnout nebo odkázat v profilu na každé síti ([pravidla-diskuze.md](socialni-site/pravidla-diskuze.md)).
7. Obnovovací kódy každé sítě uložit do správce hesel (kolekce `Obnovovací kódy`) a zapsat stav do [ucty.md](ucty.md).

---

## Facebook

**Co je potřeba:** osobní účet správce na Facebooku (KOO), druhý správce (SR), e-mail `info@` jako veřejný kontakt.

**Postup**

1. KOO se přihlásí svým osobním účtem a zapne si 2FA (bezpečnostní klíč nebo aplikace). Bez toho nezačínat.
2. Vytvořit stránku: *Stránky → Vytvořit novou stránku*. Název **Víme, co dělat**.
3. **Kategorie:** do pole napsat a vybrat neutrální kategorii. Doporučení: **Komunitní organizace** (Community organization). Druhá kategorie může být vzdělávací. Kategorie se vybírají vyhledáváním z dlouhého seznamu, přesné české názvy ověřte v nabídce. Nevybírat nic politického ani vládního.
4. **Uživatelské jméno stránky:** `vimecodelat` (adresa facebook.com/vimecodelat).
5. Krátký popis (bio), kontakt `info@vimecodelat.cz`, web `vimecodelat.cz`. **Nevyplňovat** telefon ani adresu. Texty v [profily.md](socialni-site/profily.md#facebook).
6. Stránku zatím **nezveřejňovat** nebo nechat bez obsahu. [OVĚŘIT: zda nové rozhraní stránek umožňuje stránku před zveřejněním skrýt.]
7. Přidat SR jako druhého správce s plnou kontrolou (*Nastavení → Přístup ke stránce*).

**Meta business portfolio (dříve Business Manager)**

1. Na business.facebook.com vytvořit **business portfolio** s názvem „Víme, co dělat“ a e-mailem `ucty@vimecodelat.cz`.
2. Přidat do něj stránku Facebooku, později Instagram a WhatsApp.
3. Lidé: KOO a SR s **plnou kontrolou**, SOC jen s **částečným přístupem** (obsah, zprávy, komentáře). Plnou kontrolu mají nejvýš 2–3 lidé. Nikdy nepřidávat agenturu s plnou kontrolou.
4. *Nastavení → Informace o business portfoliu → Dvoufázové ověření*: nastavit **„Všichni“**, tedy vynucené 2FA pro každého, kdo do portfolia vstoupí.
5. Ověření firmy (business verification) zatím nedělat, projekt nemá organizaci. [OVĚŘIT: zda ho Meta u osobního projektu vyžaduje a jaké doklady chce.]

**Soukromí a zabezpečení**

- Vypnout možnost, aby ostatní označovali stránku ve fotkách a příspěvcích, nebo nastavit kontrolu označení.
- Zprávy (Messenger): automatická odpověď s odkazem na časté otázky a s informací, že na věcné dotazy odpovídáme do 24 hodin v pracovní dny.
- Sekce „Transparentnost stránky“ ukazuje zemi správců, ne jejich jména. To je v pořádku.

**Moderace a filtry**

- **Filtr vulgarit:** střední úroveň. Silná úroveň by skrývala i ostřejší, ale legitimní kritiku, kterou mazat nechceme.
- **Blokovaná slova:** seznam nadávek vůči skupinám, hanlivých označení a podvodných frází (seznam vede SOC na sdíleném disku, ne v repozitáři, aby ho nešlo snadno obejít).
- **Moderation Assist** (v profesním panelu): pravidla pro automatické skrytí komentářů s externími odkazy, od účtů bez profilové fotky nebo bez přátel a sledujících. Skryté komentáře se dají zkontrolovat v protokolu a odkrýt. V týdnu spuštění zapnout, potom podle zkušenosti. [OVĚŘIT: aktuální nabídku pravidel v panelu.]
- Skrytí komentáře je mírnější než smazání: autor ho dál vidí, ostatní ne. Mažeme jen to, co porušuje pravidla (výhrůžky, osobní údaje, nenávist, spam, podvody).

**Ověření:** Meta Verified pro firmy je placené a má podmínky způsobilosti. [OVĚŘIT: dostupnost v ČR, cena a podmínky pro neziskové organizace.] Do té doby stačí vzájemné odkazy web ↔ profil.

**Ručně:** přihlášení osobním účtem, 2FA, výběr kategorie, nahrání obrázků, pozvání druhého správce a potvrzení pozvánky.

## Instagram

**Co je potřeba:** e-mail `ucty@`, stránka Facebooku (pro propojení), telefon organizace pro ověření.

**Postup**

1. Založit nový účet s e-mailem `ucty@vimecodelat.cz`, uživatelské jméno `vimecodelat`, jméno **Víme, co dělat**.
2. Do doby zveřejnění nechat účet **soukromý** a prázdný.
3. 1–2 týdny před spuštěním přepnout na **profesionální účet**: *Nastavení a aktivita → Typ účtu a nástroje → Přepnout na profesionální účet*. Zvolit **Firma** (Business), ne Autor (Creator): autor je určený pro jednotlivce a veřejné osobnosti. Pozor: přepnutím se soukromý účet stane veřejným a firemní účet nejde nastavit jako soukromý. Proto přepínat až před zveřejněním.
4. Kategorie: při propojení se stránkou Facebooku převezme Instagram její kategorii. Štítek kategorie pod jménem lze v *Upravit profil → Zobrazení profilu* skrýt nebo zobrazit. Doporučujeme zobrazit („Komunitní organizace“).
5. Propojit se stránkou Facebooku a přidat do business portfolia.
6. Odkazy: Instagram umožňuje až **5 odkazů** v profilu. První: `vimecodelat.cz`, druhý: `vimecodelat.cz/o-nas/o-nas` (název „Kdo za tím stojí“).
7. Kontaktní tlačítko: e-mail `info@`, **bez** telefonu a adresy.

**Soukromí a zabezpečení**

- 2FA (*Centrum účtů → Heslo a zabezpečení → Dvoufázové ověření*) aplikací, případně bezpečnostním klíčem, pokud ho nabídka umožní. Uložit záložní kódy.
- Zmínky a označení: jen od lidí, které sledujeme, nebo s ručním schválením.

**Moderace a filtry**

- **Skrytá slova:** zapnout skrývání urážlivých komentářů a žádostí o zprávy, doplnit vlastní seznam slov (stejný jako na Facebooku).
- **Omezení (Limits):** při náhlé vlně komentářů dočasně omezit komentáře a zprávy od účtů, které nás nesledují nebo sledují jen krátce. Nástroj na nájezdy je přesně pro koordinované útoky.
- **Omezit (Restrict)** u jednotlivých účtů, které opakovaně porušují pravidla: jejich komentáře vidí jen oni.

**Ověření:** odznak přes Meta Verified [OVĚŘIT, viz Facebook].

**Ručně:** registrace, ověřovací kód z e-mailu, přepnutí typu účtu, propojení s Facebookem.

## Threads

**Co je potřeba:** účet na Instagramu (Threads se zakládá přes něj).

**Postup**

1. V aplikaci Threads se přihlásit účtem `vimecodelat` z Instagramu. Uživatelské jméno se převezme.
2. Profil: **veřejný**. Bio a fotka se při založení načtou z Instagramu. [OVĚŘIT v aplikaci: zda jde bio na Threads upravit odděleně od Instagramu. Pokud ne, platí text bia z Instagramu, viz [profily.md](socialni-site/profily.md#threads).]
3. Sdílení do fedivesmíru (fediverse sharing): **zatím vypnout**, rozhodnout po spuštění podle kapacity moderace.

**Moderace a filtry:** Skrytá slova, omezení, kdo nás může zmínit (jen sledovaní), u citlivých příspěvků omezit odpovědi na sledované profily.

**Ověření:** přes Meta Verified pro Instagram [OVĚŘIT].

**Ručně:** přihlášení v aplikaci, potvrzení podmínek.

## WhatsApp kanál

**Co je potřeba:** telefon organizace se samostatnou SIM, aplikace **WhatsApp Business** (odděluje projekt od soukromého WhatsAppu), e-mail `ucty@` pro obnovu.

**Postup**

1. Do služebního telefonu nainstalovat WhatsApp Business a zaregistrovat číslo organizace. Profil firmy: název **Víme, co dělat**, web, e-mail `info@`, kategorie neutrální (např. vzdělávání; [OVĚŘIT nabídku kategorií]).
2. Zapnout **dvoufázové ověření** (6místný PIN, e-mail pro obnovu `ucty@`).
3. Založit kanál: *Aktualizace → Kanály → + → Vytvořit kanál*. Název **Víme, co dělat**, popis z [profily.md](socialni-site/profily.md#whatsapp-kanál), ikona.
4. Přidat SR jako druhého správce kanálu. [OVĚŘIT v aplikaci: počet a práva správců kanálu.]
5. Odkaz na kanál zapsat do [ucty.md](ucty.md) a na stránku Oficiální kanály.

**Soukromí a zabezpečení**

- Sledující nevidí telefonní číslo správce a správce nevidí čísla sledujících (pokud je nemá v kontaktech). Obsah kanálu je ale **veřejný** a není koncově šifrovaný.
- Kanál je jednosměrný: sledující nemohou psát komentáře, jen reagovat. Reakce omezit na základní sadu emoji.
- Telefon organizace chránit zámkem obrazovky a nenechávat ho bez dozoru.

**Ověření:** zelený nebo modrý odznak přes Meta Verified pro firmy. [OVĚŘIT: dostupnost a podmínky.]

**Ručně:** všechno. WhatsApp kanál se zakládá a plní jen v aplikaci, plánovací nástroje ho většinou nepodporují.

## YouTube

**Co je potřeba:** Google účet na `ucty@vimecodelat.cz` (Google účet jde založit i s jinou než gmailovou adresou), bezpečnostní klíč.

**Postup**

1. Vytvořit Google účet s adresou `ucty@vimecodelat.cz`. Zapnout 2FA bezpečnostním klíčem (hlavní + záložní). Zvážit **Program pokročilé ochrany** (Advanced Protection) pro tento účet.
2. Na YouTube vytvořit kanál **s jiným názvem** (Brand Account): *Seznam kanálů → Vytvořit nový kanál*, název **Víme, co dělat**. Brand Account umožňuje více vlastníků a správců bez sdílení hesla.
3. **Handle:** `@vimecodelat`. Název i handle lze změnit nejvýš dvakrát za 14 dní.
4. Oprávnění: SR jako druhý **vlastník**, SOC jako **správce** (*YouTube Studio → Nastavení → Oprávnění*).
5. Ověřit kanál telefonem organizace (odemkne delší videa a vlastní miniatury).
6. Popis, odkazy, e-mail pro firemní dotazy (`media@`) podle [profily.md](socialni-site/profily.md#youtube).

**Výchozí nastavení nahrávání**

- **Licence:** YouTube nabízí jen „Creative Commons – uvedení autora“. [OVĚŘIT: na jakou verzi CC BY YouTube odkazuje.] Projekt šíří obsah pod CC BY 4.0, proto to do popisu každého videa uvádíme výslovně.
- **Publikum:** „Není určeno dětem“ (obsah je pro dospělé a mladé od 15 let; školní verze řady H řešit zvlášť).
- Titulky: nahrávat vlastní soubory `.srt` (plán [03](../plan/03-video.md#technické-parametry)).

**Moderace a filtry:** zadržet potenciálně nevhodné komentáře ke kontrole, seznam blokovaných slov, blokovat odkazy v komentářích (výjimky pro správce). V týdnu spuštění zvážit režim „zadržet všechny komentáře ke kontrole“.

**Ověření:** šedý ověřovací odznak má YouTube jen pro kanály s vysokým počtem odběratelů. [OVĚŘIT: aktuální podmínky odznaku.] Do té doby vzájemné odkazy web ↔ kanál.

**Ručně:** založení Google účtu, registrace klíčů, telefonní ověření kanálu, přidání vlastníků.

## TikTok

**Co je potřeba:** e-mail `ucty@`, telefon organizace pro ověření.

**Postup**

1. Registrace e-mailem `ucty@vimecodelat.cz` (ne telefonem), uživatelské jméno `vimecodelat`, jméno **Víme, co dělat**.
2. Do zveřejnění nechat účet **soukromý** jako osobní účet.
3. 1–2 týdny před spuštěním přepnout na **firemní účet** (*Nastavení a soukromí → Účet → Přepnout na firemní účet*) a zvolit neutrální kategorii (např. vzdělávání; [OVĚŘIT nabídku kategorií]). Firemní účet nejde mít soukromý, proto přepínat až před zveřejněním.
4. Firemní účet má k dispozici jen **knihovnu komerční hudby** (Commercial Music Library). To nám nevadí: podle plánu [03](../plan/03-video.md#zásady-pro-všechna-videa) používáme jen hudbu na objednávku nebo CC0/CC BY. Pozor, licence z knihovny TikToku platí jen na TikToku, ne pro YouTube ani web.
5. Odkaz na web v profilu (u firemního účtu dostupný) a e-mail `info@`.

**Soukromí a zabezpečení**

- 2FA aplikací (*Nastavení a soukromí → Zabezpečení → Dvoufázové ověření*), uložit záložní kódy.
- Zprávy: jen od lidí, které sledujeme, nebo vypnuto. Dotazy směrovat na `info@`.
- **Duety a stitch:** povolit (strategie počítá se spoluprací s tvůrci), ale sledovat zneužití.
- **Stahování videí:** povolit (obsah je pod CC BY).

**Moderace a filtry:** filtr spamu a urážlivých komentářů zapnout, filtr podle klíčových slov (vlastní seznam), v týdnu spuštění zvážit „filtrovat všechny komentáře“ s ručním schválením.

**Ověření:** modrý odznak uděluje TikTok jen u známých a autentických účtů. [OVĚŘIT: aktuální postup žádosti.] Pozor na pravidla TikToku pro vládní, politické a stranické účty: účet se do těchto kategorií nesmí zařadit a obsah nesmí působit jako politická kampaň.

**Ručně:** registrace, CAPTCHA, ověřovací kód, přepnutí na firemní účet.

## LinkedIn

**Co je potřeba:** osobní profil správce na LinkedInu (KOO) se skutečným jménem a zapnutou 2FA, e-mail na doméně `vimecodelat.cz` přidaný do osobního profilu (LinkedIn ho může vyžadovat k ověření pracoviště). Stránku nejde založit z aplikace na Androidu, jen na počítači nebo v aplikaci pro iOS.

**Postup**

1. KOO na počítači otevře *Pro firmy → Vytvořit stránku společnosti* (linkedin.com/company/setup/new) a vybere typ **Společnost**.
2. Název **Víme, co dělat**, veřejná adresa `linkedin.com/company/vimecodelat`, web `vimecodelat.cz`.
3. **Odvětví:** občanské a sociální organizace (Civic and Social Organizations), **typ:** nejbližší neutrální typ pro osobní projekt, ne nezisková ani vládní organizace. Velikost nejmenší možná (0–1 zaměstnanců). [OVĚŘIT české názvy v nabídce.]
4. Zaškrtnout potvrzení, že jednáme jménem organizace. Pokud LinkedIn požádá o ověření pracoviště, ověřit e-mailem na doméně.
5. Slogan (tagline, max. 120 znaků) a přehled (max. 2 000 znaků) z [profily.md](socialni-site/profily.md#linkedin).
6. Přidat SR jako druhého **superadministrátora** hned po založení, aby stránka nikdy nezávisela na jednom přihlášení. SOC jako správce obsahu.

**Moderace:** u příspěvků lze omezit nebo vypnout komentáře. Na LinkedInu čekáme hlavně firmy, obce a odborníky, moderace bude menší.

**Ověření:** LinkedIn nabízí ověření stránek organizací. [OVĚŘIT: aktuální podmínky ověření stránky.]

**Ručně:** všechno, včetně ověření pracoviště.

## Bluesky

**Co je potřeba:** e-mail `ucty@`, přístup do DNS domény `vimecodelat.cz` (DEV).

**Postup**

1. Na bsky.app založit účet e-mailem `ucty@vimecodelat.cz`. Dočasný handle `vimecodelat.bsky.social`.
2. Zobrazované jméno **Víme, co dělat** (max. 64 znaků), popis (max. 256 znaků) z [profily.md](socialni-site/profily.md#bluesky).
3. **Handle z vlastní domény** (doporučuje ho Bluesky oficiálním organizacím): *Nastavení → Účet → Handle → Mám vlastní doménu*, zadat `vimecodelat.cz`. Bluesky ukáže hodnotu DID. DEV přidá do DNS záznam:
   - název: `_atproto.vimecodelat.cz`
   - typ: `TXT`
   - hodnota: `did=did:plc:…` (přesně podle Bluesky)
4. Po rozšíření DNS (minuty až hodiny) kliknout na *Ověřit DNS záznam* a uložit. Účet je pak `@vimecodelat.cz`. Kdo ho vidí, ví, že patří majiteli domény. Tím je zároveň chráněný proti napodobení.
5. Dočasný handle `vimecodelat.bsky.social` se po změně uvolní. [OVĚŘIT: zda ho jde ponechat jako rezervu, aby ho nikdo nezabral.]

**Zabezpečení:** zapnout dvoufázové přihlášení kódem e-mailem. Pro plánovací nástroje vytvářet jen **hesla aplikací** (App passwords), nikdy nedávat hlavní heslo.

**Moderace:** u každého příspěvku lze určit, kdo může odpovídat (všichni, sledovaní, zmínění), skrývat odpovědi a používat moderační seznamy. Při útoku omezit odpovědi na sledované.

**Ověření:** modrý odznak uděluje Bluesky a vybraní důvěryhodní ověřovatelé „významným a autentickým“ účtům, žádost přes formulář Bluesky. Handle z domény je samostatné ověření a odznak automaticky nepřináší. Požádat po spuštění.

**Ručně:** registrace, nastavení handle, ověření DNS.

## X

**Co je potřeba:** e-mail `ucty@`, telefon organizace.

**Postup**

1. Registrace e-mailem `ucty@vimecodelat.cz`, uživatelské jméno `vimecodelat` (limit je 15 znaků, máme 11), jméno **Víme, co dělat** (max. 50 znaků).
2. Do zveřejnění nastavit **chráněné příspěvky** (viditelné jen schváleným sledujícím).
3. Bio (max. 160 znaků), web, poloha „Česko“ podle [profily.md](socialni-site/profily.md#x).

**Zabezpečení:** 2FA bezpečnostním klíčem a aplikací (2FA přes SMS je na X jen pro předplatitele, a stejně ji nechceme). Uložit záložní kód.

**Moderace:** u každého příspěvku nastavit, kdo může odpovídat, ztlumená slova, filtr kvality oznámení, skrývání odpovědí.

**Ověření:** zlatý odznak organizace je placený (Premium Business, od 200 USD měsíčně podle zpráv z října 2025). Šedý odznak (Premium Organizations) je určený vládám a mezinárodním organizacím, ne nám. **Doporučení: neplatit.** X je pro nás doplňkový kanál pro novináře a rychlé opravy. Pravost dokládá stránka Oficiální kanály.

**Ručně:** registrace, CAPTCHA, ověřovací kódy, nastavení 2FA.

---

## Co se musí udělat ručně (shrnutí)

Žádný z kroků nejde bezpečně automatizovat. Platformy vyžadují přihlášení skutečného člověka, ověřovací kódy, CAPTCHA a souhlas s podmínkami.

| Úkol | Kdo | Odhad |
| --- | --- | --- |
| Pořídit SIM a služební telefon, nainstalovat WhatsApp Business | KOO | 1 h + nákup |
| Založit 9 účtů a zabrat jména (bez vyplnění profilů) | KOO | 3 h |
| Nastavit 2FA, registrovat klíče, uložit obnovovací kódy | KOO, SR | 2 h |
| Bluesky handle z domény (záznam `_atproto` v DNS) | DEV | 20 min |
| Přidat druhé správce na všech sítích a potvrdit pozvánky | KOO, SR | 1 h |
| Vyplnit profily, nahrát obrázky, připnout příspěvky (1–2 týdny před spuštěním) | SOC | 3 h |
| Nastavit moderaci a filtry, nahrát seznamy blokovaných slov | SOC | 2 h |
| Přepnout Instagram a TikTok na firemní účet, zrušit ochranu příspěvků na X | SOC | 30 min |
| Zapsat vše do [ucty.md](ucty.md) | KOO | 30 min |

## Zdroje (ověřeno 19. 10. 2026)

- [Instagram: profesionální účty (Help Center)](https://help.instagram.com/iphone-app/138925576505882) a [Sociality: přepnutí na profesionální účet v roce 2026](https://sociality.io/blog/instagram-creator-account/)
- [Search Engine Land: Instagram umožňuje až 5 odkazů v profilu](https://searchengineland.com/instagram-now-allows-up-to-5-links-in-bio-395742)
- [Meta for Creators: moderace komentářů](https://creators.facebook.com/comment-moderation-and-support) a [NapoleonCat: skrývání komentářů na Facebooku 2026](https://napoleoncat.com/blog/how-to-hide-comments-on-facebook/)
- [Návod k vynucení 2FA v Meta business portfoliu](https://support.chatarchitect.com/books/meta-business-portfolio-setup/page/turn-on-the-two-factor-authentication-requirement-in-your-business-portfolio)
- [Google: Vytvoření kanálu YouTube (Brand Account)](https://support.google.com/youtube/answer/1646861) a [Google: Správa základních informací kanálu](https://support.google.com/youtube/answer/2657964)
- [Soundstripe: hudební knihovny TikToku 2026](https://www.soundstripe.com/blogs/tiktok-music-library-explained)
- [LinkedIn Help: Vytvoření stránky LinkedIn](https://www.linkedin.com/help/linkedin/answer/a543852)
- [Bluesky: Jak ověřit účet vlastní doménou](https://bsky.social/about/blog/4-28-2023-domain-handle-tutorial) a [Bluesky: Ověřovací odznaky (2025)](https://bsky.social/about/blog/04-21-2025-verification)
- [TechCrunch: X rozdělil ověření organizací na Premium Business a Premium Organizations (10/2025)](https://techcrunch.com/2025/10/07/x-splits-verified-organizations-into-premium-business-and-premium-organizations)
- [WhatsApp: Zásady ochrany soukromí kanálů (EHP)](https://www.whatsapp.com/legal/channels-privacy-policy-eea/)
