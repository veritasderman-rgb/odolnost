// Tučné „Potvrzeno …“ a „Podezření“ v tabulkách vykreslí jako razítko, aby šel verdikt vidět na první pohled.
const VZOR = /^(Potvrzeno|Podezření)(?:\s+(.+?))?\.?$/;

function text(uzel) {
  if (uzel.type === 'text') return uzel.value;
  return (uzel.children || []).map(text).join('');
}

function razitko(druh, kdo) {
  const potvrzeno = druh === 'Potvrzeno';
  const trida = potvrzeno ? 'razitko razitko--potvrzeno' : 'razitko razitko--podezreni';
  const znak = potvrzeno ? '✓' : '?';
  const dodatek = kdo ? `<span class="razitko__kdo">${kdo.replace(/</g, '&lt;')}</span>` : '';
  return `<span class="${trida}"><span class="razitko__hlavni"><span aria-hidden="true">${znak}</span> ${druh}</span>${dodatek}</span>`;
}

function projdi(uzel, vTabulce) {
  if (!uzel.children) return;
  const tabulka = vTabulce || uzel.type === 'tableCell';
  uzel.children = uzel.children.map((dite) => {
    if (tabulka && dite.type === 'strong') {
      const shoda = text(dite).trim().match(VZOR);
      if (shoda) return { type: 'html', value: razitko(shoda[1], shoda[2]) };
    }
    projdi(dite, tabulka);
    return dite;
  });
}

export function remarkRazitko() {
  return (strom) => projdi(strom, false);
}
