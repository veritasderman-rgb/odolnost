export type Pilir = 'scenar' | 'pribehy' | 'priprav-se' | 'manipulace' | 'o-nas';

export const PILIRE: Record<Pilir, { nazev: string; podtitul: string; barva: string; cislo?: number }> = {
  scenar: { nazev: 'Scénář', podtitul: 'Jak by to mohlo vypadat', barva: 'var(--petrol)', cislo: 1 },
  pribehy: { nazev: 'Příběhy', podtitul: 'Jak to lidé zvládli', barva: 'var(--terakota)', cislo: 2 },
  'priprav-se': { nazev: 'Připrav se', podtitul: 'Praktické kroky', barva: 'var(--salvej)', cislo: 3 },
  manipulace: { nazev: 'Poznej manipulaci', podtitul: 'Předběžné očkování', barva: 'var(--svestka)', cislo: 4 },
  'o-nas': { nazev: 'O projektu', podtitul: 'Kdo jsme a jak pracujeme', barva: 'var(--inkoust)' },
};

export function pilirZId(id: string): Pilir {
  return id.split('/')[0] as Pilir;
}

export function formatDatum(d: string | Date | undefined): string {
  if (!d) return '';
  const datum = typeof d === 'string' ? new Date(d) : d;
  if (Number.isNaN(datum.getTime())) return String(d);
  return `${datum.getDate()}. ${datum.getMonth() + 1}. ${datum.getFullYear()}`;
}
