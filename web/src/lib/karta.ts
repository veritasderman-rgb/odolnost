// Šest technik pro kapesní kartu (podklady/projekt-zamer.md, sekce Předběžné očkování).
export const TECHNIKY = [
  { slug: 'hra-na-strach', nazev: 'Hra na strach', zni: '„Za týden tu budou padat bomby.“', otazka: 'Kdo to říká a odkud to ví?' },
  { slug: 'falesne-dilema', nazev: 'Falešné dilema', zni: '„Buď neutralita, nebo válka u nás.“', otazka: 'Opravdu existují jen dvě možnosti?' },
  { slug: 'obetni-beranek', nazev: 'Obětní beránek', zni: '„Za všechno můžou ti nahoře.“', otazka: 'Je to opravdu tak jednoduché?' },
  { slug: 'nikomu-never', nazev: 'Nikomu nevěř', zni: '„Pravdu stejně neznáme, všichni lžou.“', otazka: 'Kdo má z mého zmatení prospěch?' },
  { slug: 'utok-na-osobu', nazev: 'Útok na osobu', zni: '„Jsou to loutky, co chtějí válku.“', otazka: 'Odpovídá to na argument, nebo jen nadává?' },
  { slug: 'falesny-svedek', nazev: 'Falešný svědek', zni: 'Video „vojáka“ nebo „lékaře“ z neznámého účtu', otazka: 'Dá se zdroj ověřit? Kdy účet vznikl?' },
] as const;
