/* ------------------------------------------------------------------------
   heute.js — was der Himmel heute sagt, ohne dass man etwas eingibt.

   Wer die Seite zum ersten Mal öffnet, sah bisher als Erstes ein
   Formular. Das ist die falsche Reihenfolge: Erst zeigen, dann fragen.
   Die Mondherberge des Tages braucht keine Geburtsstunde und keinen Ort
   — sie steht einfach da, und wer mehr will, trägt seine Geburt ein.

   Sobald ein Geburtsdatum gespeichert ist, verschwindet dieser Kasten:
   Dann steht die eigene Lesung an seiner Stelle, und zwei Eröffnungen
   übereinander wären eine zu viel.
   ------------------------------------------------------------------------ */
import { mondHeute } from "./elektion.js?v=259";
import { leseProfilRoh, aufProfilAenderung } from "./profil.js?v=259";
import { t } from "./sprachen.js?v=259";

const el = (art, klasse, text) => {
  const k = document.createElement(art);
  if (klasse) k.className = klasse;
  if (text != null) k.textContent = text;
  return k;
};

function ohnePunkt(s) { return String(s || "").replace(/\.$/, ""); }

function zeichne() {
  const heim = document.getElementById("heuteHeim");
  if (!heim) return;

  /* Steht eine eigene Lesung an, tritt der Tag zurück. */
  const p = leseProfilRoh();
  if (p && p.datum) { heim.hidden = true; heim.innerHTML = ""; return; }

  let m;
  try { m = mondHeute(); } catch (e) { heim.hidden = true; return; }
  if (!m) { heim.hidden = true; return; }

  heim.innerHTML = "";
  heim.hidden = false;
  heim.appendChild(el("p", "heuteMarke", t("heute.marke")));

  const satz = el("p", "heuteSatz");
  satz.innerHTML = t("heute.mond")
    .replace("%n", m.menzilNr)
    .replace("%h", `<b>${m.menzil.tr}</b>`)
    .replace("%u", ohnePunkt(m.menzil.hukum));
  heim.appendChild(satz);

  const rat = el("p", "heuteRat");
  rat.innerHTML =
    `<span class="heuteSchild">${t("heute.gut")}</span> ${ohnePunkt(m.menzil.iyi)}` +
    `<span class="heuteTrenner">·</span>` +
    `<span class="heuteSchild">${t("heute.meiden")}</span> ${ohnePunkt(m.menzil.kacin)}`;
  heim.appendChild(rat);

  const lauf = el("p", "heuteLauf",
    t(m.zunehmend ? "heute.zunehmend" : "heute.abnehmend") +
    (m.verbrannt ? " · " + t("heute.verbrannt") : ""));
  heim.appendChild(lauf);

  heim.appendChild(el("p", "heuteLocken", t("heute.locken")));
}

zeichne();
aufProfilAenderung(zeichne);
window.addEventListener("sprache-geaendert", () => setTimeout(zeichne, 60));
