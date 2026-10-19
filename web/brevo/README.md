# Napojení newsletteru na Brevo

Formulář na webu (`src/components/Odber.astro`) posílá e-mail na funkci `api/odber.js`. Ta zavolá Brevo s dvojitým potvrzením: člověk dostane e-mail s odkazem a do seznamu se zapíše až po kliknutí. API klíč je jen na serveru.

## Nastavení (jednorázově)

1. **Účet Brevo pro projekt.** Doporučujeme samostatný účet organizace, ne osobní ani firemní účet zakladatele. Adresa odesílatele a název firmy se zobrazují v patičce každého e-mailu.
2. **Ověřit doménu** `vimecodelat.cz` v Brevu (Senders & IP → Domains): DNS záznamy SPF, DKIM a DMARC.
3. **Odesílatel:** `Víme, co dělat <novinky@vimecodelat.cz>`.
4. **Seznam:** Contacts → Lists → vytvořit seznam „Newsletter“ a poznamenat si jeho číslo (ID).
5. **Šablona potvrzovacího e-mailu:** Templates → nová šablona, obsah z `doi-sablona.html`. Šablona musí obsahovat odkaz `{{ doubleoptin }}`. Šablonu aktivovat a poznamenat si její číslo (ID).
6. **API klíč:** SMTP & API → API keys → nový klíč jen pro web. Klíč nikdy nedávat do repozitáře.
7. **Vercel → Project → Settings → Environment Variables:**

| Proměnná | Hodnota |
| --- | --- |
| `BREVO_API_KEY` | klíč z kroku 6 |
| `BREVO_LIST_ID` | číslo seznamu z kroku 4 |
| `BREVO_DOI_TEMPLATE_ID` | číslo šablony z kroku 5 |
| `SITE_URL` | `https://vimecodelat.cz` |

8. V Brevu **vypnout sledování otevření a kliknutí** u kampaní (Settings → Tracking), aby platilo, co slibujeme v zásadách ochrany soukromí.

Dokud proměnné nejsou nastavené, formulář slušně odpoví, že odběr zatím není spuštěný.

## Jak to otestovat

```bash
curl -i -X POST https://<adresa-nasazení>/api/odber \
  -H 'Accept: application/json' \
  -d 'email=test@example.com&souhlas=ano'
```

Očekávaná odpověď je `200 {"ok":true}` a do schránky přijde potvrzovací e-mail.
