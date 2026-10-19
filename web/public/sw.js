// Offline režim: po první návštěvě uloží klíčové stránky a nástroje, aby fungovaly i bez internetu.
const VERZE = 'vcd-v1';
const KLICOVE = [
  '/',
  '/zacit/',
  '/priprav-se/',
  '/priprav-se/rodinny-plan/',
  '/priprav-se/kontrolni-seznam/',
  '/priprav-se/informace-bez-internetu/',
  '/priprav-se/zranitelni/',
  '/priprav-se/psychika/',
  '/manipulace/karta/',
  '/lehka/',
  '/favicon.svg',
  '/js/nastaveni.js',
];

self.addEventListener('install', (e) => {
  // Uloží klíčové stránky i styly, skripty a písma, na které odkazují.
  e.waitUntil(
    caches.open(VERZE).then(async (c) => {
      const zdroje = new Set();
      await Promise.allSettled(
        KLICOVE.map(async (u) => {
          const odp = await fetch(u);
          if (!odp.ok) return;
          await c.put(u, odp.clone());
          if ((odp.headers.get('content-type') || '').includes('text/html')) {
            const html = await odp.text();
            for (const m of html.matchAll(/(?:href|src)="(\/_astro\/[^"]+)"/g)) zdroje.add(m[1]);
          }
        }),
      );
      await Promise.allSettled([...zdroje].map((u) => c.add(u)));
    }),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== VERZE).map((x) => caches.delete(x)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin || req.url.includes('/api/')) return;
  if (req.mode === 'navigate') {
    // Stránky: nejdřív síť (aktuální obsah), při výpadku uložená verze.
    e.respondWith(
      fetch(req)
        .then((odp) => {
          const kopie = odp.clone();
          caches.open(VERZE).then((c) => c.put(req, kopie));
          return odp;
        })
        .catch(() => caches.match(req).then((z) => z || caches.match('/lehka/'))),
    );
    return;
  }
  // Styly, skripty, písma: nejdřív uložená verze.
  e.respondWith(
    caches.match(req).then(
      (z) =>
        z ||
        fetch(req).then((odp) => {
          if (odp.ok && /\.(css|js|woff2|svg|png)$/.test(new URL(req.url).pathname)) {
            const kopie = odp.clone();
            caches.open(VERZE).then((c) => c.put(req, kopie));
          }
          return odp;
        }),
    ),
  );
});
