/* ------------------------------------------------------------------------
   zugang.js — zuerst der Weg, dann die Maske, dann die Abschnitte.

   Die Seite fragt als Erstes, was man befragen will. Das Orakel will
   Namen und eine Frage und kein Geburtsdatum; die Sterne wollen Stunde
   und Ort und keinen Mutternamen. Erst die Wahl entscheidet, welche
   Maske erscheint — und erst eine ausgefüllte Maske öffnet die Reiter
   des jeweiligen Weges.
   --------------------------------------------------------------------- */
import { leseProfilRoh, aufProfilAenderung } from "./profil.js?v=125";

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
  zeig("#maskeRahmen", !!weg);
  /* Steht schon alles da, bleibt die Maske zugeklappt — die Startseite
     soll die beiden Wege zeigen und sonst nichts. Fehlt noch etwas,
     steht sie offen, denn dann ist sie das Nächste, was zu tun ist. */
  const rahmen = document.getElementById("maskeRahmen");
  if (rahmen && rahmen.open === bereit) rahmen.open = !bereit;
  zeig("#maskeGemein", !!weg);
  zeig("#maskeOrakel", weg === "orakel");
  zeig("#maskeSterne", weg === "sterne");
  zeig("#speicherBlock", !!weg);
  zeig("#torHinweis", !!weg && !bereit);

  /* Die Reiterleiste gehört zu den Abschnitten, nicht zum Anfang. Auf der
     Startseite bleibt sie weg: Dort stehen nur die beiden Wege. */
  const leiste = document.querySelector("nav#reiter");
  const daheim = !document.getElementById(HEIM)?.hidden;
  if (leiste) leiste.hidden = !bereit || daheim;

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

/* ------------------------------------------------- heim und wieder fort */
function geheZu(id) {
  const knopf = document.querySelector(`nav#reiter button[data-bolum="${id}"]`);
  if (knopf) { knopf.click(); }
  else {
    /* Abschnitte ohne Reiter — etwa "Die Idee dahinter". */
    document.querySelectorAll("nav#reiter button").forEach(b => b.classList.remove("etkin"));
    document.querySelectorAll("section.bolum").forEach(s => s.hidden = s.id !== id);
  }
  schalte();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("heimKnopf")?.addEventListener("click", () => geheZu(HEIM));
document.getElementById("zurIdee")?.addEventListener("click", () => geheZu("bNasil"));
document.querySelectorAll("[data-heim]").forEach(b =>
  b.addEventListener("click", () => geheZu(HEIM)));

/* Jeder Reiterklick kann die Leiste selbst betreffen — etwa der Weg zurück
   auf die Startseite, wo sie verschwinden soll. */
document.querySelectorAll("nav#reiter button").forEach(b =>
  b.addEventListener("click", () => setTimeout(schalte, 0)));
