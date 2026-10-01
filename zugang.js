/* ------------------------------------------------------------------------
   zugang.js — die Hauptseite ist das Tor, und hinter ihr zwei Wege.

   Solange nichts eingetragen ist, gibt es nur Oracle selbst. Sobald die
   ersten Angaben da sind, steht die Wahl: das Orakel befragen — eine Frage
   stellen und eine Antwort bekommen — oder die Sterne befragen, also den
   Himmel der Geburtsstunde auslegen. Erst die Wahl öffnet die Reiter des
   jeweiligen Weges; die Essenz gehört zu beiden.
   --------------------------------------------------------------------- */
import { leseProfilRoh, aufProfilAenderung } from "./profil.js?v=92";

const HEIM = "bProfil";
const SPEICHER = "oracle-weg";

function brauchbar(p) {
  if (!p) return false;
  const zahl = x => !isNaN(parseFloat(x));
  return !!(p.name && p.anne) ||
         !!(p.datum && p.zeit && zahl(p.breite) && zahl(p.laenge) && zahl(p.utc));
}

function lies() {
  try { return sessionStorage.getItem(SPEICHER) || ""; } catch (e) { return ""; }
}
function schreib(w) {
  try { w ? sessionStorage.setItem(SPEICHER, w) : sessionStorage.removeItem(SPEICHER); } catch (e) {}
}

function schalte() {
  const offen = brauchbar(leseProfilRoh());
  const weg = lies();
  const knoepfe = [...document.querySelectorAll("nav#reiter button")];

  const leiste = document.querySelector("nav#reiter");
  if (leiste) leiste.hidden = !offen;

  knoepfe.forEach(b => {
    const bolum = b.dataset.bolum, g = b.dataset.gruppe;
    if (bolum === HEIM) { b.hidden = !offen; return; }
    if (!g) { b.hidden = !offen; return; }          // "Die Idee dahinter": immer dabei
    b.hidden = !offen || !weg || (g !== "beide" && g !== weg);
  });

  const hinweis = document.querySelector("#torHinweis");
  if (hinweis) hinweis.hidden = offen;

  const wahl = document.querySelector("#wahl");
  if (wahl) {
    wahl.hidden = !offen;
    wahl.querySelectorAll(".wahlKarte").forEach(k =>
      k.classList.toggle("gewaehlt", k.dataset.weg === weg));
  }

  /* Steht man auf einem Reiter, der nicht mehr sichtbar ist: nach Hause. */
  const aktiv = document.querySelector("nav#reiter button.etkin");
  if (aktiv && aktiv.hidden) {
    document.querySelector(`nav#reiter button[data-bolum="${HEIM}"]`)?.click();
  }
}

/* Die Wahl treffen — und gleich in den ersten Abschnitt des Weges gehen. */
document.querySelectorAll("#wahl .wahlKarte").forEach(karte => {
  karte.addEventListener("click", () => {
    const weg = karte.dataset.weg;
    schreib(lies() === weg ? "" : weg);
    schalte();
    const erster = [...document.querySelectorAll("nav#reiter button")]
      .find(b => !b.hidden && b.dataset.gruppe && b.dataset.gruppe !== "beide");
    if (lies() && erster) erster.click();
  });
});

aufProfilAenderung(schalte);
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", schalte);
else schalte();
