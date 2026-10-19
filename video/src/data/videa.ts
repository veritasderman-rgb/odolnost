// Scénáře všech videí. Z tohoto souboru se bere text pro hlas (ElevenLabs), titulky i obsah animací.
// `hlas` je text pro syntézu řeči (čísla a zkratky vypsané slovy), `titulky` je totéž, jak se to čte na obrazovce.

export type Ikona = string; // název ikony z lucide-react

export type Vizual =
  | { typ: 'nadpis'; text: string; pod?: string; ikona?: Ikona; preskrtnout?: boolean }
  | { typ: 'obraz'; src: string; nadpis: string; pod?: string; stitek?: string }
  | { typ: 'ikony'; nadpis?: string; polozky: { ikona: Ikona; text: string; zakaz?: boolean }[]; pozadi?: string }
  | { typ: 'seznam'; nadpis: string; polozky: string[]; cisla?: boolean }
  | { typ: 'fakta'; src: string; polozky: { rok: string; text: string; razitko?: string }[]; pod?: string }
  | { typ: 'srovnani'; levy: Strana; pravy: Strana; pod?: string }
  | { typ: 'plan'; aktivni: number[] }
  | { typ: 'osa'; aktivni: number; polozky: { ikona: Ikona; text: string }[]; pozn?: string }
  | { typ: 'retez'; src: string; nadpis: string; kroky: string[]; pozn?: string }
  | { typ: 'zpravy'; zpravy: string[]; stitek: string }
  | { typ: 'dvezdi' }
  | { typ: 'karty' }
  | { typ: 'karta'; cislo: number; technika: string; priklad: string; otazka: string }
  | { typ: 'krok'; text: string; odkaz: string };

export type Strana = { nadpis: string; popis: string; aktivni?: boolean; vlna?: 'kolisava' | 'rovna' };

export type Scena = {
  hlas?: string; // text pro syntézu, když chybí, použije se `titulky`
  titulky: string;
  vizual: Vizual;
  delka?: number; // v sekundách, jen u videa bez hlasu
};

export type Video = {
  id: string;
  cislo: number;
  nazev: string;
  hlas: 'aneta' | 'kuba' | 'autor' | null; // 'autor' = vlastní nahrávka ve public/audio/sceny/<id>/
  hudba: 'klidna' | 'pulzni' | 'ulevna';
  odkaz: string;
  sceny: Scena[];
};

export const OSA_PROUD = ['1 hodina', '24 hodin', '3 dny'];

export const PLAN_POLE: { ikona: Ikona; nadpis: string; detail: string }[] = [
  { ikona: 'MapPin', nadpis: 'Kde se sejdeme', detail: 'Jedno místo u domu, jedno mimo čtvrť' },
  { ikona: 'School', nadpis: 'Kdo vyzvedne děti', detail: 'A kdo ho zastoupí' },
  { ikona: 'Clock', nadpis: 'Když nejde signál', detail: 'Kdy se sejdeme a kde necháme vzkaz' },
  { ikona: 'Contact', nadpis: 'Kontakty na papíře', detail: 'Mobil se vybije, papír ne' },
  { ikona: 'Pill', nadpis: 'Léky a zvířata', detail: 'Kdo co potřebuje' },
  { ikona: 'Radio', nadpis: 'Rádio', detail: 'Frekvence Radiožurnálu' },
];

export const TECHNIKY = ['Hra na strach', 'Falešné dilema', 'Falešný svědek', 'Obětní beránek', 'Nikomu nevěř', 'Útok na osobu'];

const KONEC = ' Víme, co dělat tečka cé zet.';
const KONEC_T = ' vimecodelat.cz';

export const VIDEA: Video[] = [
  {
    id: 'v1-valka-se-nevyhlasuje',
    cislo: 1,
    nazev: 'Válka se dnes nevyhlašuje',
    hlas: 'aneta',
    hudba: 'pulzni',
    odkaz: 'vimecodelat.cz/scenar/jsme-ve-valce',
    sceny: [
      { titulky: 'Kdy začne válka? Možná čekáme na den, který nikdy nepřijde.', vizual: { typ: 'nadpis', text: 'Kdy začne válka?', ikona: 'CalendarX' } },
      { titulky: 'Dnes se válka nevyhlašuje. Rusko ji nevyhlásilo ani Ukrajině. Říkalo tomu speciální operace.', vizual: { typ: 'nadpis', text: 'Válka se dnes nevyhlašuje', pod: 'Rusko ji nevyhlásilo ani Ukrajině.', ikona: 'Newspaper', preskrtnout: true } },
      {
        hlas: 'Proti Evropě Rusko nepoužívá tanky. Používá sabotáže, kybernetické útoky, propagandu, drony nad cizím územím a rušení gé pé es. Je to levné a dá se to popřít.',
        titulky: 'Proti Evropě Rusko nepoužívá tanky. Používá sabotáže, kybernetické útoky, propagandu, drony nad cizím územím a rušení GPS. Je to levné a dá se to popřít.',
        vizual: { typ: 'ikony', nadpis: 'Jak Rusko útočí na Evropu', pozadi: 'obrazky/clanky/scenar-jsme-ve-valce.jpg', polozky: [
          { ikona: 'Flame', text: 'Sabotáže' }, { ikona: 'Lock', text: 'Kybernetické útoky' }, { ikona: 'Megaphone', text: 'Propaganda' }, { ikona: 'Drone', text: 'Drony' }, { ikona: 'Satellite', text: 'Rušení GPS' },
        ] },
      },
      {
        titulky: 'Týká se to i nás. Za výbuchy ve Vrběticích podle vlády a policie stáli ruští agenti. Bezpečnostní informační služba píše, že ruské hybridní působení proti Česku pokračuje.',
        vizual: { typ: 'fakta', src: 'obrazky/clanky/scenar-kdyby-rusko-zautocilo.jpg', polozky: [
          { rok: '2014', text: 'Vrbětice: výbuchy muničních skladů. Podle vlády a policie ruští agenti GRU.', razitko: 'Potvrzeno' },
          { rok: '2025', text: 'BIS: ruské hybridní působení proti Česku pokračuje.' },
        ] },
      },
      { titulky: 'Podle zákona ve válce nejsme. Ale žijeme v šedé zóně. Cílem je vyvolat strach a rozdělit nás.', vizual: { typ: 'srovnani', levy: { nadpis: 'Šedá zóna', popis: 'Sabotáže, kyberútoky, propaganda', aktivni: true }, pravy: { nadpis: 'Ozbrojený útok', popis: 'Válka i podle zákona' }, pod: 'Cíl: vyvolat strach a rozdělit nás' } },
      { titulky: 'Nejlepší odpověď je klid a příprava. Kdo je připravený, toho se vystrašit nedá.', vizual: { typ: 'obraz', src: 'obrazky/hero-domov.jpg', nadpis: 'Nejlepší odpověď?', pod: 'Klid a příprava.' } },
      { hlas: 'Krok na dnes: přečtěte si, co se už stalo, a ověřte si to sami.' + KONEC, titulky: 'Krok na dnes: přečtěte si, co se už stalo, a ověřte si to sami.' + KONEC_T, vizual: { typ: 'krok', text: 'Přečtěte si, co se už stalo, a ověřte si to sami.', odkaz: 'vimecodelat.cz/scenar/jsme-ve-valce' } },
    ],
  },
  {
    id: 'v2-rodinny-plan',
    cislo: 2,
    nazev: 'Rodinný plán za 15 minut',
    hlas: 'kuba',
    hudba: 'klidna',
    odkaz: 'vimecodelat.cz/priprav-se/rodinny-plan',
    sceny: [
      { titulky: 'Telefony nejdou. Děti jsou ve škole, vy v práci. Víte, kde se sejdete?', vizual: { typ: 'obraz', src: 'obrazky/clanky/pribehy-rodina-u-dalnice.jpg', nadpis: 'Telefony nejdou.', pod: 'Víte, kde se sejdete?', stitek: 'Ilustrace' } },
      { titulky: 'Stačí jeden papír na lednici a patnáct minut u stolu s rodinou.', vizual: { typ: 'nadpis', text: 'Rodinný plán', pod: '1 papír · 15 minut', ikona: 'FileText' } },
      { titulky: 'Zaprvé: kde se sejdete. Jedno místo blízko domova a jedno mimo vaši čtvrť.', vizual: { typ: 'plan', aktivni: [0] } },
      { titulky: 'Zadruhé: kdo vyzvedne děti, a kdo ho zastoupí, když nemůže.', vizual: { typ: 'plan', aktivni: [1] } },
      { titulky: 'Zatřetí: co když nejde signál. Domluvte si hodinu, kdy se sejdete, a kde necháte vzkaz.', vizual: { typ: 'plan', aktivni: [2] } },
      { titulky: 'A pak kontakty na papíře, léky, zvířata a frekvence rádia. Mobil se vybije, papír ne.', vizual: { typ: 'plan', aktivni: [3, 4, 5] } },
      { titulky: 'Formulář najdete na webu. Vyplníte ho v prohlížeči, nic se nikam neodesílá.', vizual: { typ: 'nadpis', text: 'Formulář je na webu', pod: 'Vyplníte ho v prohlížeči. Nic se neodesílá.', ikona: 'AppWindow' } },
      { hlas: 'Krok na dnes: domluvte se s rodinou, kde se sejdete, když nepůjdou telefony.' + KONEC, titulky: 'Krok na dnes: domluvte se s rodinou, kde se sejdete, když nepůjdou telefony.' + KONEC_T, vizual: { typ: 'krok', text: 'Domluvte se s rodinou, kde se sejdete, když nepůjdou telefony.', odkaz: 'vimecodelat.cz/priprav-se/rodinny-plan' } },
    ],
  },
  {
    id: 'v3-kdyz-vypadne-proud',
    cislo: 3,
    nazev: 'Když vypadne proud',
    hlas: 'aneta',
    hudba: 'pulzni',
    odkaz: 'vimecodelat.cz/scenar/utok-na-elektrickou-sit',
    sceny: [
      { titulky: 'Představte si, že zhasne celé město. Co se stane během první hodiny?', vizual: { typ: 'obraz', src: 'obrazky/clanky/scenar-co-nas-zasahne.jpg', nadpis: 'Zhasne celé město.', pod: 'Co se stane během první hodiny?' } },
      {
        hlas: 'Česko to zažilo čtvrtého července dva tisíce dvacet pět. Nebyl to útok, ale ukázal, co se zastaví nejdřív.',
        titulky: 'Česko to zažilo 4. července 2025. Nebyl to útok, ale ukázal, co se zastaví nejdřív.',
        vizual: { typ: 'fakta', src: 'obrazky/clanky/scenar-utok-na-elektrickou-sit.jpg', polozky: [
          { rok: '4. 7. 2025', text: 'Výpadek v Česku. Bez proudu asi půl milionu odběratelů.' },
          { rok: '', text: 'Nebyl to útok. Ukázal, co se zastaví nejdřív.' },
        ] },
      },
      { titulky: 'Za hodinu stojí výtahy, semafory, tramvaje a platby kartou. Mobil zatím funguje, ale síť je přetížená.', vizual: { typ: 'osa', aktivni: 0, polozky: [{ ikona: 'Building2', text: 'Výtahy' }, { ikona: 'TrafficCone', text: 'Semafory' }, { ikona: 'TramFront', text: 'Tramvaje' }, { ikona: 'CreditCard', text: 'Platby kartou' }] } },
      { titulky: 'Do druhého dne může přestat fungovat mobilní síť. Ve vyšších patrech nemusí téct voda a bez proudu netopí ani plynový kotel.', vizual: { typ: 'osa', aktivni: 1, polozky: [{ ikona: 'SignalLow', text: 'Mobilní síť' }, { ikona: 'Droplets', text: 'Voda ve vyšších patrech' }, { ikona: 'Heater', text: 'Topení' }] } },
      { titulky: 'Po třech dnech je největší problém teplo. To zažívají lidé na Ukrajině každou zimu.', vizual: { typ: 'osa', aktivni: 2, polozky: [{ ikona: 'Thermometer', text: 'Nejvíc chybí teplo' }], pozn: 'Zkušenost z Ukrajiny' } },
      { titulky: 'Pomůže málo věcí: svítilna místo svíček, rádio na baterky, voda na tři dny, teplé oblečení a trochu hotovosti.', vizual: { typ: 'seznam', nadpis: 'Co pomůže', polozky: ['Svítilna místo svíček', 'Rádio na baterky', 'Voda na tři dny', 'Teplé oblečení', 'Trochu hotovosti'] } },
      { titulky: 'Když proud vypadne, vypněte jistič, zapněte rádio a tísňové linky volejte jen v ohrožení.', vizual: { typ: 'ikony', nadpis: 'Když proud vypadne', polozky: [{ ikona: 'Power', text: 'Vypněte jistič' }, { ikona: 'Radio', text: 'Zapněte rádio' }, { ikona: 'Siren', text: '112 jen v ohrožení' }] } },
      { hlas: 'Krok na dnes: najděte doma svítilnu a zkontrolujte baterky.' + KONEC, titulky: 'Krok na dnes: najděte doma svítilnu a zkontrolujte baterky.' + KONEC_T, vizual: { typ: 'krok', text: 'Najděte doma svítilnu a zkontrolujte baterky.', odkaz: 'vimecodelat.cz/scenar/utok-na-elektrickou-sit' } },
    ],
  },
  {
    id: 'v4-sirena',
    cislo: 4,
    nazev: 'Siréna: první minuta',
    hlas: 'kuba',
    hudba: 'klidna',
    odkaz: 'vimecodelat.cz/priprav-se/informace-bez-internetu',
    sceny: [
      { titulky: 'Víte, co znamená siréna? V Česku platí jediný varovný signál.', vizual: { typ: 'obraz', src: 'obrazky/clanky/priprav-se-informace-bez-internetu.jpg', nadpis: 'Víte, co znamená siréna?', pod: 'Platí jediný varovný signál.' } },
      {
        hlas: 'Kolísavý tón dlouhý sto čtyřicet sekund znamená všeobecnou výstrahu. Rovný tón je jen zkouška. Bývá první středu v měsíci ve dvanáct.',
        titulky: 'Kolísavý tón dlouhý 140 sekund znamená všeobecnou výstrahu. Rovný tón je jen zkouška. Bývá první středu v měsíci ve 12:00.',
        vizual: { typ: 'srovnani', levy: { nadpis: 'Kolísavý tón · 140 s', popis: 'Všeobecná výstraha', aktivni: true, vlna: 'kolisava' }, pravy: { nadpis: 'Rovný tón', popis: 'Jen zkouška. První středa v měsíci ve 12:00', vlna: 'rovna' } },
      },
      { titulky: 'Když zazní: jděte dovnitř do nejbližší pevné budovy. Zavřete okna a dveře. Zapněte rádio nebo televizi. Hned potom uslyšíte, co se stalo a co dělat.', vizual: { typ: 'seznam', nadpis: 'Když zazní', cisla: true, polozky: ['Jděte dovnitř', 'Zavřete okna a dveře', 'Zapněte rádio nebo televizi'] } },
      { titulky: 'Při nebezpečí ze vzduchu platí pravidlo dvou zdí. Mezi vámi a ulicí mají být aspoň dvě zdi. A držte se dál od oken.', vizual: { typ: 'dvezdi' } },
      { titulky: 'Nenatáčejte a nesdílejte, kam co dopadlo. A nejezděte pro děti do školy, učitelé se o ně postarají.', vizual: { typ: 'ikony', nadpis: 'Co nedělat', polozky: [{ ikona: 'Camera', text: 'Nenatáčejte', zakaz: true }, { ikona: 'Share2', text: 'Nesdílejte, kam co dopadlo', zakaz: true }, { ikona: 'Car', text: 'Nejezděte pro děti do školy', zakaz: true }] } },
      { hlas: 'Krok na dnes: zjistěte, na jaké frekvenci u vás chytá Radiožurnál, a napište si ji na papír.' + KONEC, titulky: 'Krok na dnes: zjistěte, na jaké frekvenci u vás chytá Radiožurnál, a napište si ji na papír.' + KONEC_T, vizual: { typ: 'krok', text: 'Zjistěte frekvenci Radiožurnálu a napište si ji na papír.', odkaz: 'vimecodelat.cz/priprav-se/informace-bez-internetu' } },
    ],
  },
  {
    id: 'v5-panika-a-famy',
    cislo: 5,
    nazev: 'První hodiny: panika a fámy',
    hlas: 'aneta',
    hudba: 'pulzni',
    odkaz: 'vimecodelat.cz/scenar/panika',
    sceny: [
      { titulky: 'Pošlete to dál, než to smažou. Zítra zavřou banky. Známý od armády říká…', vizual: { typ: 'zpravy', stitek: 'Vymyšlené zprávy', zpravy: ['Pošlete to dál, než to smažou!', 'Zítra zavřou banky!!!', 'Známý od armády říká…'] } },
      { titulky: 'Takhle vzniká panika. Jeden koupí víc, regál se vyprázdní a další lidé koupí ještě víc. Na začátku covidu zboží nechybělo. Obchody ho jen nestíhaly doplnit.', vizual: { typ: 'retez', src: 'obrazky/clanky/scenar-panika.jpg', nadpis: 'Řetězová reakce', kroky: ['Jeden koupí víc', 'Regál se vyprázdní', 'Další koupí ještě víc'], pozn: 'Covid 2020: zboží bylo, obchody nestíhaly doplňovat' } },
      { titulky: 'Panika škodí. Ucpané silnice zdrží záchranku. A kdo nakoupí deset balení léků, může je vzít někomu, kdo je potřebuje hned.', vizual: { typ: 'ikony', nadpis: 'Panika škodí', polozky: [{ ikona: 'Ambulance', text: 'Ucpané silnice zdrží záchranku' }, { ikona: 'Pill', text: 'Léky chybí tomu, kdo je potřebuje' }] } },
      { titulky: 'Co dělat místo toho? Zastavte se na deset minut. Zjistěte, jestli jste v bezprostředním ohrožení. Pokud ne, máte čas. Zapněte Radiožurnál nebo web hasičů. Napište rodině krátkou zprávu podle plánu. A neodjíždějte jen proto, že odjíždějí ostatní. Evakuaci by oznámily úřady.', vizual: { typ: 'seznam', nadpis: 'Co dělat místo toho', cisla: true, polozky: ['Zastavte se na 10 minut', 'Jste v bezprostředním ohrožení?', 'Zapněte Radiožurnál nebo web hasičů', 'Napište rodině podle plánu', 'Neodjíždějte jen proto, že ostatní'] } },
      { titulky: 'A zeptejte se sousedů. Pár klidných vět pomůže víc než deset sdílených videí.', vizual: { typ: 'obraz', src: 'obrazky/clanky/pribehy-pani-vera.jpg', nadpis: 'Zeptejte se sousedů.', pod: 'Pár klidných vět pomůže víc než deset sdílených videí.', stitek: 'Ilustrace' } },
      { hlas: 'Krok na dnes: rozhodněte se, kde si v krizi ověříte zprávy.' + KONEC, titulky: 'Krok na dnes: rozhodněte se, kde si v krizi ověříte zprávy.' + KONEC_T, vizual: { typ: 'krok', text: 'Rozhodněte se, kde si v krizi ověříte zprávy.', odkaz: 'vimecodelat.cz/scenar/panika' } },
    ],
  },
  {
    id: 'v6-poznej-manipulaci',
    cislo: 6,
    nazev: 'Poznej manipulaci za minutu',
    hlas: 'kuba',
    hudba: 'klidna',
    odkaz: 'vimecodelat.cz/manipulace/karta',
    sceny: [
      { titulky: 'Až budou lidé ve stresu, někdo toho zkusí využít. Ukážeme vám šest triků. Na každý stačí jedna otázka.', vizual: { typ: 'karty' } },
      { titulky: 'Hra na strach chce, abyste jednali dřív, než přemýšlíte. Zeptejte se: kdo to říká a odkud to ví?', vizual: { typ: 'karta', cislo: 1, technika: 'Hra na strach', priklad: 'Zítra dojde káva. Navždy!', otazka: 'Kdo to říká a odkud to ví?' } },
      { titulky: 'Falešné dilema zúží svět na dvě možnosti. Zeptejte se: opravdu jsou jen dvě?', vizual: { typ: 'karta', cislo: 2, technika: 'Falešné dilema', priklad: 'Buď si koupíte tuhle kávu, nebo máte rádi pondělky.', otazka: 'Opravdu jsou jen dvě možnosti?' } },
      { titulky: 'Falešný svědek předstírá, že byl u toho nebo že je odborník. Zeptejte se: dá se to ověřit? Kdy účet vznikl?', vizual: { typ: 'karta', cislo: 3, technika: 'Falešný svědek', priklad: 'Jsem odborník, věřte mi. (účet založen včera)', otazka: 'Dá se zdroj ověřit?' } },
      { titulky: 'Obětní beránek svalí složitý problém na jednu skupinu. Zeptejte se: je to opravdu tak jednoduché?', vizual: { typ: 'karta', cislo: 4, technika: 'Obětní beránek', priklad: 'Za všechny zácpy můžou cyklisti.', otazka: 'Je to opravdu tak jednoduché?' } },
      { titulky: 'Nikomu nevěř chce, abyste nevěřili ničemu. Zeptejte se: kdo má z mého zmatení prospěch?', vizual: { typ: 'karta', cislo: 5, technika: 'Nikomu nevěř', priklad: 'Všichni lžou. Nevěřte ničemu.', otazka: 'Kdo má z mého zmatení prospěch?' } },
      { titulky: 'Útok na osobu nadává místo argumentu. Zeptejte se: odpovídá to na věc, nebo jen uráží?', vizual: { typ: 'karta', cislo: 6, technika: 'Útok na osobu', priklad: 'Co ten může vědět, nosí ponožky v sandálech.', otazka: 'Odpovídá to na věc, nebo jen uráží?' } },
      { titulky: 'A pozor: názor a kritika nejsou manipulace. Nesouhlas není zrada.', vizual: { typ: 'nadpis', text: 'Nesouhlas není zrada.', pod: 'Názor a kritika nejsou manipulace.', ikona: 'MessageCircle' } },
      { hlas: 'Krok na dnes: uložte si kapesní kartu do telefonu.' + KONEC, titulky: 'Krok na dnes: uložte si kapesní kartu do telefonu.' + KONEC_T, vizual: { typ: 'krok', text: 'Uložte si kapesní kartu do telefonu.', odkaz: 'vimecodelat.cz/manipulace/karta' } },
    ],
  },
  {
    id: 'v7-co-muzu-udelat-ja',
    cislo: 7,
    nazev: 'Co můžu udělat já',
    hlas: 'aneta',
    hudba: 'ulevna',
    odkaz: 'vimecodelat.cz/priprav-se/co-mohu-udelat-ja',
    sceny: [
      { titulky: 'Máte rodinný plán a doma svítilnu. Co dál?', vizual: { typ: 'nadpis', text: 'Rodina je připravená.', pod: 'A dál?', ikona: 'House' } },
      { titulky: 'Můžete se přidat k dobrovolným hasičům. Udělat si kurz první pomoci. Darovat krev. Zapojit se v obci nebo jen znát sousedy. Kdo chce víc, může zvážit aktivní zálohu, výcvik pár týdnů v roce vedle běžné práce. A pomůže i obyčejná kondice. V krizi se chodí pěšky a nosí voda.', vizual: { typ: 'ikony', nadpis: 'Cesty, jak pomoct', polozky: [{ ikona: 'HardHat', text: 'Dobrovolní hasiči' }, { ikona: 'HeartPulse', text: 'Kurz první pomoci' }, { ikona: 'Droplet', text: 'Darování krve' }, { ikona: 'Users', text: 'Obec a sousedé' }, { ikona: 'Backpack', text: 'Aktivní záloha' }, { ikona: 'Footprints', text: 'Kondice' }] } },
      { titulky: 'Odolná země nejsou jen armáda a úřady. Jsou to lidé, kteří vědí, co dělat, a pomůžou ostatním.', vizual: { typ: 'obraz', src: 'obrazky/clanky/priprav-se-co-mohu-udelat-ja.jpg', nadpis: 'Odolná země', pod: 'jsou lidé, kteří si pomůžou.' } },
      { titulky: 'Nemusíte všechno. Vyberte si jednu věc.', vizual: { typ: 'nadpis', text: 'Vyberte si jednu cestu.', ikona: 'Check' } },
      { hlas: 'Krok na dnes: vyberte si jednu cestu a zjistěte, kdy je nejbližší kurz nebo schůzka.' + KONEC, titulky: 'Krok na dnes: vyberte si jednu cestu a zjistěte, kdy je nejbližší kurz nebo schůzka.' + KONEC_T, vizual: { typ: 'krok', text: 'Vyberte si jednu cestu a zjistěte, kdy je nejbližší kurz nebo schůzka.', odkaz: 'vimecodelat.cz/priprav-se/co-mohu-udelat-ja' } },
    ],
  },
  {
    id: 'v8-proc-tento-web',
    cislo: 8,
    nazev: 'Proč tento web',
    hlas: null,
    hudba: 'ulevna',
    odkaz: 'vimecodelat.cz/o-nas/o-nas',
    sceny: [
      { delka: 4.5, titulky: 'Proč vznikl tento web?', vizual: { typ: 'nadpis', text: 'Proč vznikl tento web?', ikona: 'MessageCircle' } },
      { delka: 7, titulky: 'Jmenuji se Josef Pavlovic. Víme, co dělat je můj osobní projekt.', vizual: { typ: 'obraz', src: 'obrazky/clanky/o-nas-o-nas.jpg', nadpis: 'Josef Pavlovic', pod: 'Víme, co dělat je můj osobní projekt.' } },
      { delka: 8, titulky: 'Švédsko, Finsko, Polsko i pobaltské státy svým lidem otevřeně říkají, co dělat, když přijde krize.', vizual: { typ: 'obraz', src: 'obrazky/clanky/priprav-se-jak-se-pripravuji-jinde.jpg', nadpis: 'Jinde to lidem říká stát.', pod: 'Švédsko, Finsko, Polsko, Pobaltí' } },
      { delka: 8, titulky: 'U nás takové místo chybělo. Tak jsem prošel zahraniční příručky a dal je dohromady na jedno místo.', vizual: { typ: 'nadpis', text: 'Zahraniční příručky na jednom místě', pod: 'Česky, srozumitelně, s odkazy na zdroje.', ikona: 'FileText' } },
      { delka: 8, titulky: 'Nejsem státní instituce. V krizi se řiďte pokyny hasičů, policie, záchranky, armády a obce.', vizual: { typ: 'ikony', nadpis: 'V krizi se řiďte pokyny', polozky: [{ ikona: 'HardHat', text: 'Hasiči' }, { ikona: 'ShieldCheck', text: 'Policie' }, { ikona: 'Ambulance', text: 'Záchranka' }, { ikona: 'Shield', text: 'Armáda' }, { ikona: 'Building2', text: 'Obec' }] } },
      { delka: 7, titulky: 'Nestraším. Každá stránka končí jedním krokem, který zvládnete ještě dnes.', vizual: { typ: 'nadpis', text: 'Nestraším.', pod: 'Každá stránka končí jedním krokem na dnes.', ikona: 'Check' } },
      { delka: 6.5, titulky: 'Začněte rodinným plánem. vimecodelat.cz', vizual: { typ: 'krok', text: 'Začněte rodinným plánem.', odkaz: 'vimecodelat.cz/zacit' } },
    ],
  },
];

export const hlasText = (s: Scena) => s.hlas ?? s.titulky;
