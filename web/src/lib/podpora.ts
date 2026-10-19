// Odkaz na platební stránku Stripe (Payment Link) na příspěvek 50 Kč.
// Vytvoří se v dashboardu Stripe: Payment Links → New → 50 CZK. Dokud je prázdný, blok s podporou se nezobrazí.
export const STRIPE_ODKAZ: string = import.meta.env.PUBLIC_STRIPE_ODKAZ ?? '';
