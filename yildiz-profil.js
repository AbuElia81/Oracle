/* ------------------------------------------------------------------------
   yildiz-profil.js — Brücke vom gemeinsamen Profil zu den Yıldıznâme-
   Abschnitten. Nach dem Vorbild von geist-profil.js: füllt nur deren
   eigene Felder vor und stößt die Rechnung an, rührt an ihr nichts.
   --------------------------------------------------------------------- */
import { leseProfilRoh, aufProfilAenderung } from "./profil.js?v=14";

const $ = s => document.querySelector(s);

function setze(wahl, wert) {
  const feld = $(wahl);
  if (!feld) return;
  feld.value = wert ?? "";
  feld.dispatchEvent(new Event("input", { bubbles: true }));
}

function uebernehmen(p) {
  if (!p) return;

  // Sternbild — rechnet sich bei jeder Eingabe selbst neu
  setze("#ad", p.name);
  setze("#anne", p.anne);
  if (p.cinsiyet) {
    const r = document.querySelector(`input[name="cinsiyet"][value="${p.cinsiyet}"]`);
    if (r && !r.checked) { r.checked = true; r.dispatchEvent(new Event("change", { bubbles: true })); }
  }

  // Niyet — der Name; die Frage bleibt dem Fragenden
  setze("#niyetAd", p.name);

  // İsim uyumu — der erste der beiden; der zweite ist ja ein anderer Mensch
  setze("#u1ad", p.name);
  setze("#u1anne", p.anne);
}

uebernehmen(leseProfilRoh());
aufProfilAenderung(uebernehmen);
