/* ------------------------------------------------------------------------
   geist-profil.js — Brücke zum gemeinsamen Geburtsprofil für den Reiter
   "Der Geist des 11. Hauses". Absichtlich getrennt von geist.js: füllt
   dessen eigene Felder nur vor, rührt an dessen Rechnung nichts an.
   --------------------------------------------------------------------- */
import { leseProfil, aufProfilAenderung } from "./profil.js?v=20";

const $ = s => document.querySelector(s);

function fuelleVorUndRechne() {
  const p = leseProfil();
  if (!p) return;
  const felder = { gName:"name", gDatum:"datum", gZeit:"zeit", gOrt:"ort", gBreite:"breite", gLaenge:"laenge", gUtc:"utc" };
  for (const id in felder) {
    const feld = $("#" + id);
    if (!feld) return; // geist.js noch nicht geladen oder Feld umbenannt
    feld.value = p[felder[id]] ?? "";
  }
  const knopf = $("#gBerechnen");
  if (knopf) knopf.click();
}

document.querySelector('nav#reiter button[data-bolum="bGeist"]')?.addEventListener("click", fuelleVorUndRechne);
aufProfilAenderung(fuelleVorUndRechne);
fuelleVorUndRechne();
