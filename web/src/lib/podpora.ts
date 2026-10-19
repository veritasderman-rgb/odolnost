// Odkaz na platební stránku Stripe (Payment Link) na příspěvek 50 Kč.
// Payment Link v účtu Stripe (produkt „Na kafe pro Víme, co dělat“, 50 CZK, po zaplacení přesměruje na /podpora/dekujeme).
// Proměnná PUBLIC_STRIPE_ODKAZ ho může přepsat.
export const STRIPE_ODKAZ: string = import.meta.env.PUBLIC_STRIPE_ODKAZ || 'https://donate.stripe.com/cNi14g7EHeZX9cZg5l2wU00';
