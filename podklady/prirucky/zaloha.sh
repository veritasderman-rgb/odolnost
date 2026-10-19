#!/usr/bin/env bash
# Záloha oficiálních příruček připravenosti.
# Stáhne všechna PDF ze seznamu zdroje-pdf.tsv z oficiálních webů a ověří je
# podle kontrolních součtů v kontrolni-soucty.sha256 (stav k 19. 10. 2026).
#
# Použití:  ./zaloha.sh [cílová složka]      (výchozí: ./pdf)
#
# Když se součet neshoduje, vydavatel soubor mezitím aktualizoval, nebo byl
# soubor podvržen. Takový soubor uložíme s příponou .nova.pdf a nepřepíšeme
# původní zálohu. Rozdíl je potřeba ručně zkontrolovat.
set -euo pipefail

ADRESAR="$(cd "$(dirname "$0")" && pwd)"
CIL="${1:-$ADRESAR/pdf}"
mkdir -p "$CIL"

ok=0; zmena=0; chyba=0
while IFS=$'\t' read -r soubor url; do
  [ -z "$soubor" ] && continue
  docasny="$(mktemp)"
  if ! curl -fsSL --max-time 120 -A "Mozilla/5.0 (zaloha prirucek)" -o "$docasny" "$url"; then
    echo "CHYBA   $soubor (nepodařilo se stáhnout: $url)"; chyba=$((chyba + 1)); rm -f "$docasny"; continue
  fi
  if [ "$(head -c 5 "$docasny")" != "%PDF-" ]; then
    echo "CHYBA   $soubor (server nevrátil PDF)"; chyba=$((chyba + 1)); rm -f "$docasny"; continue
  fi
  ocekavany="$(grep "  $soubor\$" "$ADRESAR/kontrolni-soucty.sha256" | cut -d' ' -f1 || true)"
  skutecny="$(sha256sum "$docasny" | cut -d' ' -f1)"
  if [ -n "$ocekavany" ] && [ "$ocekavany" = "$skutecny" ]; then
    mv "$docasny" "$CIL/$soubor"; echo "OK      $soubor"; ok=$((ok + 1))
  else
    mv "$docasny" "$CIL/${soubor%.pdf}.nova.pdf"; echo "ZMĚNA   $soubor (jiný obsah než v záloze, uloženo jako .nova.pdf)"; zmena=$((zmena + 1))
  fi
done < "$ADRESAR/zdroje-pdf.tsv"

echo
echo "Shoduje se: $ok · Změněno: $zmena · Chyba: $chyba · Složka: $CIL"
