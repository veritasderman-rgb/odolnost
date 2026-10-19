// Spouští se před vykreslením stránky, aby se větší písmo nepřepínalo až po načtení.
try {
  if (localStorage.getItem('vcd-pismo') === 'velke') document.documentElement.dataset.pismo = 'velke';
} catch (e) {}
