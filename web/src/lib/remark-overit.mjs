// Zvýrazní značky [OVĚŘIT: …] v textu, aby žádná nezůstala bez povšimnutí.
const VZOR = /\[OVĚŘIT:[^\]]*\]/g;

function projdi(uzel) {
  if (!uzel.children) return;
  const nove = [];
  for (const dite of uzel.children) {
    if (dite.type === 'text' && VZOR.test(dite.value)) {
      VZOR.lastIndex = 0;
      let posledni = 0;
      for (const shoda of dite.value.matchAll(VZOR)) {
        if (shoda.index > posledni) nove.push({ type: 'text', value: dite.value.slice(posledni, shoda.index) });
        nove.push({ type: 'html', value: `<mark class="overit">${shoda[0].replace(/</g, '&lt;')}</mark>` });
        posledni = shoda.index + shoda[0].length;
      }
      if (posledni < dite.value.length) nove.push({ type: 'text', value: dite.value.slice(posledni) });
    } else {
      projdi(dite);
      nove.push(dite);
    }
  }
  uzel.children = nove;
}

export function remarkOverit() {
  return (strom) => projdi(strom);
}
