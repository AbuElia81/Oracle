/* ------------------------------------------------------------------------
   spende.js — der Spendenknopf.

   Hier die PayPal-Adresse eintragen, dann erscheint der Knopf im Fuß der
   Seite. Solange das Feld leer ist, zeigt die Seite nichts davon — lieber
   kein Knopf als einer, der ins Leere führt.

   Möglich sind:
     "https://paypal.me/DEINNAME"        — der übliche PayPal.Me-Link
     "mailto:..."                        — irgendein anderer Weg
   --------------------------------------------------------------------- */
const PAYPAL = "";     // <— hier eintragen

const TEXT = "Diese Seite kostet nichts und sammelt nichts. Wer mag, wirft etwas in den Hut.";

(function spendenknopf() {
  if (!PAYPAL) return;
  const fuss = document.querySelector("footer");
  if (!fuss) return;

  const kasten = document.createElement("div");
  kasten.className = "spende";

  const p = document.createElement("p");
  p.className = "kucukNot";
  p.textContent = TEXT;

  const a = document.createElement("a");
  a.className = "spendeKnopf";
  a.href = PAYPAL;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.textContent = "Etwas dalassen";

  kasten.append(a, p);
  fuss.prepend(kasten);
})();
