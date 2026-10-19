# Videa „Víme, co dělat. Za minutu.“

[← Video a audio](03-video.md)

Stav: **vyrobeno 19. 10. 2026.** Tento dokument je vygenerovaný ze scénářů ve `video/src/data/videa.ts` (`node --experimental-strip-types skripty/scenare-md.mjs` ve složce `video`). Když se scénář změní, upravte data a dokument vygenerujte znovu.

## Jak videa vznikla

- **Formáty:** každé video ve dvou verzích, na šířku 1920 × 1080 (web, YouTube, promítání) a na výšku 1080 × 1920 (Reels, TikTok, Shorts). Verze na výšku má stejný obsah, jen jiné rozvržení a víc místa nahoře a dole pro rozhraní sítí.
- **Titulky:** vždy vypálené v obraze (max. dva řádky) a navíc jako `.srt` ve `video/vystup/`.
- **Označení:** po celou dobu štítek „Vytvořeno s pomocí AI“. U komiksových ilustrací navíc štítek „Ilustrace“.
- **Hlas:** ElevenLabs, model Multilingual v2, hotové české hlasy z knihovny (nejde o klon skutečného člověka). Hlasy se po videích střídají: lichá videa Aneta, sudá Kuba. Každá scéna je namluvená zvlášť, aby obraz přesně seděl na řeč.
- **Hudba:** ElevenLabs Music, tři instrumentální podkresy (klidná, pulzní, úlevná), pod hlasem zhruba o 17 dB tišší. Výsledný zvuk je normalizovaný na −14 LUFS.
- **Obraz:** motion grafika v Remotionu (React): kinetická typografie, ikony, časové osy, odškrtávací seznamy, pomalý pohyb kamery po ilustracích z webu. Barvy a písmo podle manuálu značky (grafit, limetková, IBM Plex).
- **Žádné realistické AI tváře, zbraně ani zničená města.** Siréna ve videu nezní, aby se video nedalo zaměnit se skutečným poplachem.

Jak videa upravit a znovu vyrenderovat, popisuje `video/README.md`.

## Přehled

| # | Název | Délka | Hlas | Hudba | Stránka na webu |
| --- | --- | --- | --- | --- | --- |
| 1 | Válka se dnes nevyhlašuje | 0:59 | Aneta (ženský) | pulzní | [/scenar/jsme-ve-valce](https://www.vimecodelat.cz/scenar/jsme-ve-valce) |
| 2 | Rodinný plán za 15 minut | 0:58 | Kuba (mužský) | klidná | [/priprav-se/rodinny-plan](https://www.vimecodelat.cz/priprav-se/rodinny-plan) |
| 3 | Když vypadne proud | 0:59 | Aneta (ženský) | pulzní | [/scenar/utok-na-elektrickou-sit](https://www.vimecodelat.cz/scenar/utok-na-elektrickou-sit) |
| 4 | Siréna: první minuta | 0:59 | Kuba (mužský) | klidná | [/priprav-se/informace-bez-internetu](https://www.vimecodelat.cz/priprav-se/informace-bez-internetu) |
| 5 | První hodiny: panika a fámy | 1:01 | Aneta (ženský) | pulzní | [/scenar/panika](https://www.vimecodelat.cz/scenar/panika) |
| 6 | Poznej manipulaci za minutu | 1:12 | Kuba (mužský) | klidná | [/manipulace/karta](https://www.vimecodelat.cz/manipulace/karta) |
| 7 | Co můžu udělat já | 0:48 | Aneta (ženský) | úlevná | [/priprav-se/co-mohu-udelat-ja](https://www.vimecodelat.cz/priprav-se/co-mohu-udelat-ja) |
| 8 | Proč tento web | 0:49 | bez hlasu, k namluvení | úlevná | [/o-nas/o-nas](https://www.vimecodelat.cz/o-nas/o-nas) |

Soubory: `video/vystup/<id>-16x9.mp4`, `video/vystup/<id>-9x16.mp4` a `video/vystup/<id>.srt`.

---

## 1. Válka se dnes nevyhlašuje

`v1-valka-se-nevyhlasuje` · 0:59 · hlas Aneta (ženský) · hudba pulzní · vimecodelat.cz/scenar/jsme-ve-valce

| Čas | Obraz | Text na obrazovce | Hlas a titulky |
| --- | --- | --- | --- |
| 0:00–0:05 | Ikona CalendarX a velký nadpis | Kdy začne válka? | Kdy začne válka? Možná čekáme na den, který nikdy nepřijde. |
| 0:05–0:12 | Ikona Newspaper a velký nadpis, ikona se přeškrtne | Válka se dnes nevyhlašuje · Rusko ji nevyhlásilo ani Ukrajině. | Dnes se válka nevyhlašuje. Rusko ji nevyhlásilo ani Ukrajině. Říkalo tomu speciální operace. |
| 0:12–0:24 | Ikony se postupně objevují: Sabotáže, Kybernetické útoky, Propaganda, Drony, Rušení GPS | Jak Rusko útočí na Evropu | Proti Evropě Rusko nepoužívá tanky. Používá sabotáže, kybernetické útoky, propagandu, drony nad cizím územím a rušení GPS. Je to levné a dá se to popřít. |
| 0:24–0:35 | Fakta na ztmaveném obrázku: 2014 Vrbětice: výbuchy muničních skladů. Podle vlády a policie ruští agenti GRU. [razítko Potvrzeno] / 2025 BIS: ruské hybridní působení proti Česku pokračuje. |  | Týká se to i nás. Za výbuchy ve Vrběticích podle vlády a policie stáli ruští agenti. Bezpečnostní informační služba píše, že ruské hybridní působení proti Česku pokračuje. |
| 0:35–0:44 | Dva panely: Šedá zóna (zvýrazněno) a Ozbrojený útok |  | Podle zákona ve válce nejsme. Ale žijeme v šedé zóně. Cílem je vyvolat strach a rozdělit nás. |
| 0:44–0:50 | Ilustrační obrázek `hero-domov.jpg` s pomalým pohybem kamery | Nejlepší odpověď? · Klid a příprava. | Nejlepší odpověď je klid a příprava. Kdo je připravený, toho se vystrašit nedá. |
| 0:50–0:59 | Krok na dnes, limetkový pruh, adresa vimecodelat.cz/scenar/jsme-ve-valce | Krok na dnes: Přečtěte si, co se už stalo, a ověřte si to sami. | Krok na dnes: přečtěte si, co se už stalo, a ověřte si to sami. vimecodelat.cz |

---

## 2. Rodinný plán za 15 minut

`v2-rodinny-plan` · 0:58 · hlas Kuba (mužský) · hudba klidná · vimecodelat.cz/priprav-se/rodinny-plan

| Čas | Obraz | Text na obrazovce | Hlas a titulky |
| --- | --- | --- | --- |
| 0:00–0:06 | Ilustrační obrázek `pribehy-rodina-u-dalnice.jpg` s pomalým pohybem kamery, štítek „Ilustrace“ | Telefony nejdou. · Víte, kde se sejdete? | Telefony nejdou. Děti jsou ve škole, vy v práci. Víte, kde se sejdete? |
| 0:06–0:12 | Ikona FileText a velký nadpis | Rodinný plán · 1 papír · 15 minut | Stačí jeden papír na lednici a patnáct minut u stolu s rodinou. |
| 0:12–0:18 | Papír s rodinným plánem, zvýrazní se: Kde se sejdeme |  | Zaprvé: kde se sejdete. Jedno místo blízko domova a jedno mimo vaši čtvrť. |
| 0:18–0:25 | Papír s rodinným plánem, zvýrazní se: Kdo vyzvedne děti |  | Zadruhé: kdo vyzvedne děti, a kdo ho zastoupí, když nemůže. |
| 0:25–0:32 | Papír s rodinným plánem, zvýrazní se: Když nejde signál |  | Zatřetí: co když nejde signál. Domluvte si hodinu, kdy se sejdete, a kde necháte vzkaz. |
| 0:32–0:39 | Papír s rodinným plánem, zvýrazní se: Kontakty na papíře, Léky a zvířata, Rádio |  | A pak kontakty na papíře, léky, zvířata a frekvence rádia. Mobil se vybije, papír ne. |
| 0:39–0:47 | Ikona AppWindow a velký nadpis | Formulář je na webu · Vyplníte ho v prohlížeči. Nic se neodesílá. | Formulář najdete na webu. Vyplníte ho v prohlížeči, nic se nikam neodesílá. |
| 0:47–0:58 | Krok na dnes, limetkový pruh, adresa vimecodelat.cz/priprav-se/rodinny-plan | Krok na dnes: Domluvte se s rodinou, kde se sejdete, když nepůjdou telefony. | Krok na dnes: domluvte se s rodinou, kde se sejdete, když nepůjdou telefony. vimecodelat.cz |

---

## 3. Když vypadne proud

`v3-kdyz-vypadne-proud` · 0:59 · hlas Aneta (ženský) · hudba pulzní · vimecodelat.cz/scenar/utok-na-elektrickou-sit

| Čas | Obraz | Text na obrazovce | Hlas a titulky |
| --- | --- | --- | --- |
| 0:00–0:06 | Ilustrační obrázek `scenar-co-nas-zasahne.jpg` s pomalým pohybem kamery | Zhasne celé město. · Co se stane během první hodiny? | Představte si, že zhasne celé město. Co se stane během první hodiny? |
| 0:06–0:14 | Fakta na ztmaveném obrázku: 4. 7. 2025 Výpadek v Česku. Bez proudu asi půl milionu odběratelů. / Nebyl to útok. Ukázal, co se zastaví nejdřív. |  | Česko to zažilo 4. července 2025. Nebyl to útok, ale ukázal, co se zastaví nejdřív. |
| 0:14–0:21 | Časová osa 1 hodina / 24 hodin / 3 dny, ikony: Výtahy, Semafory, Tramvaje, Platby kartou |  | Za hodinu stojí výtahy, semafory, tramvaje a platby kartou. Mobil zatím funguje, ale síť je přetížená. |
| 0:21–0:30 | Časová osa 1 hodina / 24 hodin / 3 dny, ikony: Mobilní síť, Voda ve vyšších patrech, Topení |  | Do druhého dne může přestat fungovat mobilní síť. Ve vyšších patrech nemusí téct voda a bez proudu netopí ani plynový kotel. |
| 0:30–0:36 | Časová osa 1 hodina / 24 hodin / 3 dny, ikony: Nejvíc chybí teplo |  | Po třech dnech je největší problém teplo. To zažívají lidé na Ukrajině každou zimu. |
| 0:36–0:44 | Odškrtávací seznam: Svítilna místo svíček, Rádio na baterky, Voda na tři dny, Teplé oblečení, Trochu hotovosti | Co pomůže | Pomůže málo věcí: svítilna místo svíček, rádio na baterky, voda na tři dny, teplé oblečení a trochu hotovosti. |
| 0:44–0:50 | Ikony se postupně objevují: Vypněte jistič, Zapněte rádio, 112 jen v ohrožení | Když proud vypadne | Když proud vypadne, vypněte jistič, zapněte rádio a tísňové linky volejte jen v ohrožení. |
| 0:50–0:59 | Krok na dnes, limetkový pruh, adresa vimecodelat.cz/scenar/utok-na-elektrickou-sit | Krok na dnes: Najděte doma svítilnu a zkontrolujte baterky. | Krok na dnes: najděte doma svítilnu a zkontrolujte baterky. vimecodelat.cz |

---

## 4. Siréna: první minuta

`v4-sirena` · 0:59 · hlas Kuba (mužský) · hudba klidná · vimecodelat.cz/priprav-se/informace-bez-internetu

| Čas | Obraz | Text na obrazovce | Hlas a titulky |
| --- | --- | --- | --- |
| 0:00–0:06 | Ilustrační obrázek `priprav-se-informace-bez-internetu.jpg` s pomalým pohybem kamery | Víte, co znamená siréna? · Platí jediný varovný signál. | Víte, co znamená siréna? V Česku platí jediný varovný signál. |
| 0:06–0:18 | Dva panely: Kolísavý tón · 140 s (zvýrazněno) a Rovný tón, animované zvukové vlny |  | Kolísavý tón dlouhý 140 sekund znamená všeobecnou výstrahu. Rovný tón je jen zkouška. Bývá první středu v měsíci ve 12:00. |
| 0:18–0:29 | Číslovaný seznam: Jděte dovnitř, Zavřete okna a dveře, Zapněte rádio nebo televizi | Když zazní | Když zazní: jděte dovnitř do nejbližší pevné budovy. Zavřete okna a dveře. Zapněte rádio nebo televizi. Hned potom uslyšíte, co se stalo a co dělat. |
| 0:29–0:38 | Řez domem: ulice, dvě zdi (limetkově), člověk, okno přeškrtnuté |  | Při nebezpečí ze vzduchu platí pravidlo dvou zdí. Mezi vámi a ulicí mají být aspoň dvě zdi. A držte se dál od oken. |
| 0:38–0:46 | Ikony se postupně objevují: Nenatáčejte (přeškrtnuto), Nesdílejte, kam co dopadlo (přeškrtnuto), Nejezděte pro děti do školy (přeškrtnuto) | Co nedělat | Nenatáčejte a nesdílejte, kam co dopadlo. A nejezděte pro děti do školy, učitelé se o ně postarají. |
| 0:46–0:59 | Krok na dnes, limetkový pruh, adresa vimecodelat.cz/priprav-se/informace-bez-internetu | Krok na dnes: Zjistěte frekvenci Radiožurnálu a napište si ji na papír. | Krok na dnes: zjistěte, na jaké frekvenci u vás chytá Radiožurnál, a napište si ji na papír. vimecodelat.cz |

---

## 5. První hodiny: panika a fámy

`v5-panika-a-famy` · 1:01 · hlas Aneta (ženský) · hudba pulzní · vimecodelat.cz/scenar/panika

| Čas | Obraz | Text na obrazovce | Hlas a titulky |
| --- | --- | --- | --- |
| 0:00–0:07 | Telefon, bubliny vymyšlených zpráv se rychle valí, štítek „Vymyšlené zprávy“ |  | Pošlete to dál, než to smažou. Zítra zavřou banky. Známý od armády říká… |
| 0:07–0:19 | Řetězová reakce: Jeden koupí víc → Regál se vyprázdní → Další koupí ještě víc |  | Takhle vzniká panika. Jeden koupí víc, regál se vyprázdní a další lidé koupí ještě víc. Na začátku covidu zboží nechybělo. Obchody ho jen nestíhaly doplnit. |
| 0:19–0:27 | Ikony se postupně objevují: Ucpané silnice zdrží záchranku, Léky chybí tomu, kdo je potřebuje | Panika škodí | Panika škodí. Ucpané silnice zdrží záchranku. A kdo nakoupí deset balení léků, může je vzít někomu, kdo je potřebuje hned. |
| 0:27–0:46 | Číslovaný seznam: Zastavte se na 10 minut, Jste v bezprostředním ohrožení?, Zapněte Radiožurnál nebo web hasičů, Napište rodině podle plánu, Neodjíždějte jen proto, že ostatní | Co dělat místo toho | Co dělat místo toho? Zastavte se na deset minut. Zjistěte, jestli jste v bezprostředním ohrožení. Pokud ne, máte čas. Zapněte Radiožurnál nebo web hasičů. Napište rodině krátkou zprávu podle plánu. A neodjíždějte jen proto, že odjíždějí ostatní. Evakuaci by oznámily úřady. |
| 0:46–0:52 | Ilustrační obrázek `pribehy-pani-vera.jpg` s pomalým pohybem kamery, štítek „Ilustrace“ | Zeptejte se sousedů. · Pár klidných vět pomůže víc než deset sdílených videí. | A zeptejte se sousedů. Pár klidných vět pomůže víc než deset sdílených videí. |
| 0:52–1:01 | Krok na dnes, limetkový pruh, adresa vimecodelat.cz/scenar/panika | Krok na dnes: Rozhodněte se, kde si v krizi ověříte zprávy. | Krok na dnes: rozhodněte se, kde si v krizi ověříte zprávy. vimecodelat.cz |

---

## 6. Poznej manipulaci za minutu

`v6-poznej-manipulaci` · 1:12 · hlas Kuba (mužský) · hudba klidná · vimecodelat.cz/manipulace/karta

| Čas | Obraz | Text na obrazovce | Hlas a titulky |
| --- | --- | --- | --- |
| 0:00–0:10 | Šest dlaždic se otočí: Hra na strach, Falešné dilema, Falešný svědek, Obětní beránek, Nikomu nevěř, Útok na osobu |  | Až budou lidé ve stresu, někdo toho zkusí využít. Ukážeme vám šest triků. Na každý stačí jedna otázka. |
| 0:10–0:18 | Trik 1/6: Hra na strach, vymyšlený příklad „Zítra dojde káva. Navždy!“, otázka „Kdo to říká a odkud to ví?“ | Hra na strach | Hra na strach chce, abyste jednali dřív, než přemýšlíte. Zeptejte se: kdo to říká a odkud to ví? |
| 0:18–0:24 | Trik 2/6: Falešné dilema, vymyšlený příklad „Buď si koupíte tuhle kávu, nebo máte rádi pondělky.“, otázka „Opravdu jsou jen dvě možnosti?“ | Falešné dilema | Falešné dilema zúží svět na dvě možnosti. Zeptejte se: opravdu jsou jen dvě? |
| 0:24–0:32 | Trik 3/6: Falešný svědek, vymyšlený příklad „Jsem odborník, věřte mi. (účet založen včera)“, otázka „Dá se zdroj ověřit?“ | Falešný svědek | Falešný svědek předstírá, že byl u toho nebo že je odborník. Zeptejte se: dá se to ověřit? Kdy účet vznikl? |
| 0:32–0:39 | Trik 4/6: Obětní beránek, vymyšlený příklad „Za všechny zácpy můžou cyklisti.“, otázka „Je to opravdu tak jednoduché?“ | Obětní beránek | Obětní beránek svalí složitý problém na jednu skupinu. Zeptejte se: je to opravdu tak jednoduché? |
| 0:39–0:47 | Trik 5/6: Nikomu nevěř, vymyšlený příklad „Všichni lžou. Nevěřte ničemu.“, otázka „Kdo má z mého zmatení prospěch?“ | Nikomu nevěř | Nikomu nevěř chce, abyste nevěřili ničemu. Zeptejte se: kdo má z mého zmatení prospěch? |
| 0:47–0:55 | Trik 6/6: Útok na osobu, vymyšlený příklad „Co ten může vědět, nosí ponožky v sandálech.“, otázka „Odpovídá to na věc, nebo jen uráží?“ | Útok na osobu | Útok na osobu nadává místo argumentu. Zeptejte se: odpovídá to na věc, nebo jen uráží? |
| 0:55–1:01 | Ikona MessageCircle a velký nadpis | Nesouhlas není zrada. · Názor a kritika nejsou manipulace. | A pozor: názor a kritika nejsou manipulace. Nesouhlas není zrada. |
| 1:01–1:12 | Krok na dnes, limetkový pruh, adresa vimecodelat.cz/manipulace/karta | Krok na dnes: Uložte si kapesní kartu do telefonu. | Krok na dnes: uložte si kapesní kartu do telefonu. vimecodelat.cz |

---

## 7. Co můžu udělat já

`v7-co-muzu-udelat-ja` · 0:48 · hlas Aneta (ženský) · hudba úlevná · vimecodelat.cz/priprav-se/co-mohu-udelat-ja

| Čas | Obraz | Text na obrazovce | Hlas a titulky |
| --- | --- | --- | --- |
| 0:00–0:04 | Ikona House a velký nadpis | Rodina je připravená. · A dál? | Máte rodinný plán a doma svítilnu. Co dál? |
| 0:04–0:26 | Ikony se postupně objevují: Dobrovolní hasiči, Kurz první pomoci, Darování krve, Obec a sousedé, Aktivní záloha, Kondice | Cesty, jak pomoct | Můžete se přidat k dobrovolným hasičům. Udělat si kurz první pomoci. Darovat krev. Zapojit se v obci nebo jen znát sousedy. Kdo chce víc, může zvážit aktivní zálohu, výcvik pár týdnů v roce vedle běžné práce. A pomůže i obyčejná kondice. V krizi se chodí pěšky a nosí voda. |
| 0:26–0:34 | Ilustrační obrázek `priprav-se-co-mohu-udelat-ja.jpg` s pomalým pohybem kamery | Odolná země · jsou lidé, kteří si pomůžou. | Odolná země nejsou jen armáda a úřady. Jsou to lidé, kteří vědí, co dělat, a pomůžou ostatním. |
| 0:34–0:37 | Ikona Check a velký nadpis | Vyberte si jednu cestu. | Nemusíte všechno. Vyberte si jednu věc. |
| 0:37–0:48 | Krok na dnes, limetkový pruh, adresa vimecodelat.cz/priprav-se/co-mohu-udelat-ja | Krok na dnes: Vyberte si jednu cestu a zjistěte, kdy je nejbližší kurz nebo schůzka. | Krok na dnes: vyberte si jednu cestu a zjistěte, kdy je nejbližší kurz nebo schůzka. vimecodelat.cz |

---

## 8. Proč tento web

`v8-proc-tento-web` · 0:49 · bez hlasu · hudba úlevná · vimecodelat.cz/o-nas/o-nas

Video běží jen s hudbou a titulky. Text v posledním sloupci je **scénář k namluvení**: když ho namluvíte, nahrajte každý řádek zvlášť a vejděte se do uvedeného času (zhruba 13 slov na 5 sekund, klidně a s pauzou na konci). Nahrávky pak stačí uložit jako `video/public/audio/sceny/v8-proc-tento-web/01.mp3` až `07.mp3`, v `video/src/data/videa.ts` nastavit u videa 8 `hlas: 'autor'` a video vyrenderovat znovu (postup je ve `video/README.md`).

| Čas | Obraz | Text na obrazovce | Titulky = text k namluvení |
| --- | --- | --- | --- |
| 0:00–0:05 | Ikona MessageCircle a velký nadpis | Proč vznikl tento web? | Proč vznikl tento web? |
| 0:05–0:12 | Ilustrační obrázek `o-nas-o-nas.jpg` s pomalým pohybem kamery | Josef Pavlovic · Víme, co dělat je můj osobní projekt. | Jmenuji se Josef Pavlovic. Víme, co dělat je můj osobní projekt. |
| 0:12–0:20 | Ilustrační obrázek `priprav-se-jak-se-pripravuji-jinde.jpg` s pomalým pohybem kamery | Jinde to lidem říká stát. · Švédsko, Finsko, Polsko, Pobaltí | Švédsko, Finsko, Polsko i pobaltské státy svým lidem otevřeně říkají, co dělat, když přijde krize. |
| 0:20–0:28 | Ikona FileText a velký nadpis | Zahraniční příručky na jednom místě · Česky, srozumitelně, s odkazy na zdroje. | U nás takové místo chybělo. Tak jsem prošel zahraniční příručky a dal je dohromady na jedno místo. |
| 0:28–0:36 | Ikony se postupně objevují: Hasiči, Policie, Záchranka, Armáda, Obec | V krizi se řiďte pokyny | Nejsem státní instituce. V krizi se řiďte pokyny hasičů, policie, záchranky, armády a obce. |
| 0:36–0:43 | Ikona Check a velký nadpis | Nestraším. · Každá stránka končí jedním krokem na dnes. | Nestraším. Každá stránka končí jedním krokem, který zvládnete ještě dnes. |
| 0:43–0:49 | Krok na dnes, limetkový pruh, adresa vimecodelat.cz/zacit | Krok na dnes: Začněte rodinným plánem. | Začněte rodinným plánem. vimecodelat.cz |
