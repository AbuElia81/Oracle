/* ------------------------------------------------------------------------
   zugang.js — zuerst der Weg, dann die Maske, dann die Abschnitte.

   Die Seite fragt als Erstes, was man befragen will. Das Orakel will
   Namen und eine Frage und kein Geburtsdatum; die Sterne wollen Stunde
   und Ort und keinen Mutternamen. Erst die Wahl entscheidet, welche
   Maske erscheint — und erst eine ausgefüllte Maske öffnet die Reiter
   des jeweiligen Weges.
   --------------------------------------------------------------------- */
import { leseProfilRoh, aufProfilAenderung } from "./profil.js?v=113";

const HEIM = "bProfil";
const SPEICHER = "oracle-weg";
const zahl = x => !isNaN(parseFloat(x));

function lies() { try { return sessionStorage.getItem(SPEICHER) || ""; } catch (e) { return ""; } }
function schreib(w) {
  try { w ? sessionStorage.setItem(SPEICHER, w) : sessionStorage.removeItem(SPEICHER); } catch (e) {}
}

/* Jeder Weg hat sein eigenes Maß dafür, wann er genug weiß. */
function genug(weg, p) {
  if (!p) return false;
  if (weg === "orakel") return !!(p.name && p.anne);
  if (weg === "sterne") return !!(p.datum && p.zeit && zahl(p.breite) && zahl(p.laenge) && zahl(p.utc));
  return false;
}

function schalte() {
  const weg = lies();
  const p = leseProfilRoh();
  const bereit = genug(weg, p);

  const zeig = (id, an) => { const e = document.querySelector(id); if (e) e.hidden = !an; };
  zeig("#maskeGemein", !!weg);
  zeig("#maskeOrakel", weg === "orakel");
  zeig("#maskeSterne", weg === "sterne");
  zeig("#speicherBlock", !!weg);
  zeig("#torHinweis", !!weg && !bereit);

  const leiste = document.querySelector("nav#reiter");
  if (leiste) leiste.hidden = !bereit;

  document.querySelectorAll("nav#reiter button").forEach(b => {
    const g = b.dataset.gruppe;
    if (b.dataset.bolum === HEIM || !g) { b.hidden = !bereit; return; }
    b.hidden = !bereit || (g !== "beide" && g !== weg);
  });

  document.querySelectorAll("#wahl .wahlKarte").forEach(k =>
    k.classList.toggle("gewaehlt", k.dataset.weg === weg));

  const aktiv = document.querySelector("nav#reiter button.etkin");
  if (aktiv && aktiv.hidden) {
    document.querySelector(`nav#reiter button[data-bolum="${HEIM}"]`)?.click();
  }
}

document.querySelectorAll("#wahl .wahlKarte").forEach(karte => {
  karte.addEventListener("click", () => {
    const neu = karte.dataset.weg;
    schreib(lies() === neu ? "" : neu);
    schalte();
    /* Steht schon alles da, gleich in den ersten Abschnitt des Weges. */
    if (lies() && genug(lies(), leseProfilRoh())) {
      const erster = [...document.querySelectorAll("nav#reiter button")]
        .find(b => !b.hidden && b.dataset.gruppe && b.dataset.gruppe !== "beide");
      erster?.click();
    } else {
      document.querySelector("#maskeGemein")?.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });
});

aufProfilAenderung(schalte);
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", schalte);
else schalte();
