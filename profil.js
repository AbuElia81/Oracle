/* ------------------------------------------------------------------------
   profil.js — das eine Geburtsprofil, das Geist, Lebensbogen und Zodiacal
   Releasing gemeinsam nutzen. Einmal eingetragen (Reiter "Meine Daten"),
   liegt es lokal im Browser und wird von den anderen Rechnern gelesen.
   --------------------------------------------------------------------- */

const SCHLUESSEL = "oracle-geburtsprofil";

export function leseProfil() {
  try {
    const raw = localStorage.getItem(SCHLUESSEL);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (!p || !p.datum || !p.zeit || isNaN(p.breite) || isNaN(p.laenge) || isNaN(p.utc)) return null;
    return p;
  } catch (e) { return null; }
}

export function schreibeProfil(daten) {
  try { localStorage.setItem(SCHLUESSEL, JSON.stringify(daten)); } catch (e) {}
  window.dispatchEvent(new CustomEvent("profil-geaendert", { detail: daten }));
}

export function loescheProfil() {
  try { localStorage.removeItem(SCHLUESSEL); } catch (e) {}
  window.dispatchEvent(new CustomEvent("profil-geaendert", { detail: null }));
}

export function aufProfilAenderung(fn) {
  window.addEventListener("profil-geaendert", e => fn(e.detail));
}

export function profilBeschriftung(p) {
  if (!p) return "";
  const [j, m, t] = p.datum.split("-");
  return `${p.name ? p.name + " · " : ""}${t}.${m}.${j}, ${p.zeit} Uhr` + (p.ort ? ` · ${p.ort}` : "");
}

/* Springt auf den Reiter "Meine Daten". */
export function zurDateneingabe() {
  const btn = document.querySelector('nav#reiter button[data-bolum="bProfil"]');
  if (btn) btn.click();
}
