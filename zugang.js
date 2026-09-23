/* ------------------------------------------------------------------------
   zugang.js — die Hauptseite ist das Tor.

   Solange nichts eingetragen ist, gibt es nur Oracle selbst. Sobald die
   ersten Angaben da sind, treten die übrigen Abschnitte hervor. Das ist
   keine Sperre, sondern eine Reihenfolge: Ohne Daten hätte keiner von
   ihnen etwas zu zeigen.
   --------------------------------------------------------------------- */
import { leseProfilRoh, aufProfilAenderung } from "./profil.js?v=56";

const HEIM = "bProfil";

function brauchbar(p) {
  if (!p) return false;
  const namen = !!(p.name && p.anne);
  const zahl = x => !isNaN(parseFloat(x));
  const geburt = !!(p.datum && p.zeit && zahl(p.breite) && zahl(p.laenge) && zahl(p.utc));
  return namen || geburt;
}

function schalte() {
  const offen = brauchbar(leseProfilRoh());
  const knoepfe = [...document.querySelectorAll("nav#reiter button")];

  knoepfe.forEach(b => {
    if (b.dataset.bolum === HEIM) return;
    b.hidden = !offen;
  });

  /* Mit nur einem sichtbaren Reiter sieht die Leiste verloren aus —
     solange es nichts zu wechseln gibt, verschwindet sie ganz. */
  const leiste = document.querySelector("nav#reiter");
  if (leiste) leiste.hidden = !offen;

  const hinweis = document.querySelector("#torHinweis");
  if (hinweis) hinweis.hidden = offen;

  /* Wurden die Daten gelöscht, während man auf einer Unterseite stand:
     zurück nach Hause, sonst schaut man auf eine leere Seite. */
  if (!offen) {
    const aktiv = document.querySelector("nav#reiter button.etkin");
    if (aktiv && aktiv.dataset.bolum !== HEIM) {
      document.querySelector(`nav#reiter button[data-bolum="${HEIM}"]`)?.click();
    }
  }
}

aufProfilAenderung(schalte);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", schalte);
} else {
  schalte();
}
