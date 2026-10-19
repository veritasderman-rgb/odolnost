// Přihlášení k newsletteru přes Brevo s dvojitým potvrzením (double opt-in).
// Běží jako serverless funkce na Vercelu. Nastavení: web/brevo/README.md.
//
// Proměnné prostředí:
//   BREVO_API_KEY          API klíč Brevo (jen na serveru, nikdy do repozitáře)
//   BREVO_LIST_ID          číslo seznamu „Newsletter“
//   BREVO_DOI_TEMPLATE_ID  číslo šablony potvrzovacího e-mailu (musí obsahovat {{ doubleoptin }})
//   SITE_URL               např. https://vimecodelat.cz

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function nactiTelo(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const casti = [];
  for await (const kus of req) casti.push(kus);
  const surove = Buffer.concat(casti).toString('utf8');
  const typ = req.headers['content-type'] || '';
  if (typ.includes('application/json')) {
    try { return JSON.parse(surove); } catch { return {}; }
  }
  return Object.fromEntries(new URLSearchParams(surove));
}

function odpovez(req, res, status, data) {
  const chceJson = (req.headers.accept || '').includes('application/json');
  if (chceJson) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
    return;
  }
  // Formulář bez JavaScriptu: přesměrování na stránku s výsledkem.
  res.statusCode = 303;
  res.setHeader('Location', status < 400 ? '/odber/dekujeme' : '/odber/chyba');
  res.end();
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    return res.end();
  }

  const { BREVO_API_KEY, BREVO_LIST_ID, BREVO_DOI_TEMPLATE_ID, SITE_URL = 'https://vimecodelat.cz' } = process.env;
  if (!BREVO_API_KEY || !BREVO_LIST_ID || !BREVO_DOI_TEMPLATE_ID) {
    return odpovez(req, res, 503, { chyba: 'Odběr zatím není spuštěný. Zkuste to prosím později.' });
  }

  const telo = await nactiTelo(req);
  const email = String(telo.email || '').trim().toLowerCase();

  // Past na roboty: skryté pole vyplní jen robot. Tváříme se, že vše proběhlo.
  if (telo.web) return odpovez(req, res, 200, { ok: true });
  if (!EMAIL.test(email) || email.length > 254) return odpovez(req, res, 400, { chyba: 'Zkontrolujte prosím e-mailovou adresu.' });
  if (telo.souhlas !== 'ano') return odpovez(req, res, 400, { chyba: 'Pro odběr je potřeba souhlas se zasíláním.' });

  try {
    const odpoved = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
      method: 'POST',
      headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email,
        includeListIds: [Number(BREVO_LIST_ID)],
        templateId: Number(BREVO_DOI_TEMPLATE_ID),
        redirectionUrl: `${SITE_URL}/odber/potvrzeno`,
      }),
    });
    if (odpoved.ok) return odpovez(req, res, 200, { ok: true });
    const chyba = await odpoved.json().catch(() => ({}));
    // Kontakt už existuje: pro uživatele je to v pořádku a nechceme prozrazovat, kdo odebírá.
    if (chyba.code === 'duplicate_parameter') return odpovez(req, res, 200, { ok: true });
    console.error('Brevo odmítlo požadavek', odpoved.status, chyba.code);
    return odpovez(req, res, 502, { chyba: 'Odběr se nepodařilo založit. Zkuste to prosím později.' });
  } catch (e) {
    console.error('Brevo nedostupné', e?.message);
    return odpovez(req, res, 502, { chyba: 'Nepodařilo se spojit s poštovní službou. Zkuste to prosím později.' });
  }
}
