/* ------------------------------------------------------------------------
   auto-rechnen.js — was der Geist schon tut, sollen die anderen auch tun.

   Lebensbogen, Zodiacal Releasing und die Antiszien des Horoskops warten
   in ihren eigenen Modulen auf einen Knopfdruck. Sobald ein vollständiges
   Geburtsprofil vorliegt, drückt dieses Modul den Knopf — nichts anderes.
   An ihrer Rechnung wird nichts geändert.
   --------------------------------------------------------------------- */
import { leseProfil, aufProfilAenderung } from "./profil.js?v=30";

const RECHNER = [
  { knopf:"#lbBerechnen",        cikti:"#lbCikti",          reiter:"bLebensbogen" },
  { knopf:"#zrBerechnen",        cikti:"#zrCikti",          reiter:"bZR" },
  { knopf:"#azHoroskopBerechnen",cikti:"#azHoroskopCikti",  reiter:"bAntiszien" },
  { knopf:"#pfBerechnen",        cikti:"#pfCikti",          reiter:"bProfektionen" },
  { knopf:"#dkBerechnen",        cikti:"#dkCikti",          reiter:"bDodekaoros" },
  { knopf:"#pfBerechnen",        cikti:"#pfCikti",          reiter:"bProfektionen" }
];

function leer(cikti) {
  return !cikti || cikti.hidden || !cikti.children.length;
}

function anstossen({ nurWennLeer }) {
  if (!leseProfil()) return;            // ohne vollständigen Himmel nichts
  RECHNER.forEach(r => {
    const knopf = document.querySelector(r.knopf);
    const cikti = document.querySelector(r.cikti);
    if (!knopf) return;
    if (nurWennLeer && !leer(cikti)) return;
    knopf.click();
  });
}

/* Neue Daten: alles neu rechnen. */
aufProfilAenderung(() => anstossen({ nurWennLeer: false }));

/* Reiter geöffnet: nachholen, falls dort noch nichts steht. */
RECHNER.forEach(r => {
  document.querySelector(`nav#reiter button[data-bolum="${r.reiter}"]`)
    ?.addEventListener("click", () => setTimeout(() => anstossen({ nurWennLeer: true }), 0));
});

/* Beim Laden: was schon gespeichert ist, gleich rechnen — aber erst, wenn
   alle Module durch sind. Dieses Modul steht im HTML vor den Rechnern; ein
   Klick zu früh trifft einen Knopf, der noch keinen Zuhörer hat. */
function ersterDurchgang() {
  anstossen({ nurWennLeer: true });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setTimeout(ersterDurchgang, 0));
} else {
  setTimeout(ersterDurchgang, 0);
}
