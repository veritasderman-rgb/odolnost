window.addEventListener('DOMContentLoaded', function () {
  if (typeof PagefindUI === 'undefined') {
    document.getElementById('hledani').textContent = 'Vyhledávání je dostupné až na sestaveném webu.';
    return;
  }
  new PagefindUI({
    element: '#hledani',
    showImages: false,
    translations: { placeholder: 'Co hledáte? Např. sirény, voda, děti', zero_results: 'Pro „[SEARCH_TERM]“ jsme nic nenašli.' },
  });
});
