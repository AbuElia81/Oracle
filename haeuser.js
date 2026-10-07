/* ------------------------------------------------------------------------
   haeuser.js — die Quadrantenhäuser nach Alcabitius, und die Direktionen
   unter dem Pol.

   Ganzzeichenhäuser, mit denen diese Seite sonst durchweg rechnet, teilen
   den Tierkreis; Quadrantenhäuser teilen den Raum um die Erde. Robert
   Zoller verlangt für die Chartberechnung ausdrücklich eines der beiden
   großen Quadrantensysteme — "either that of Placidus or that of
   Alchabitus". Hier steht Alcabitius (al-Qabīṣī, 10. Jh.), weil er der
   ältere und im arabisch-lateinischen Mittelalter der verbreitetere war.

   Das Verfahren: Man nimmt den Halbtagbogen des aufsteigenden Grades —
   also die Zeit, die er zwischen Aufgang und Meridian braucht — und
   drittelt ihn. Ebenso den Halbnachtbogen. Die so gefundenen Stellen
   sind die Hausspitzen. Die Hausgrenzen sind dabei Stundenkreise, also
   Großkreise durch die Himmelspole; darum lässt sich aus jeder
   Rektaszension die Ekliptiklänge unmittelbar zurückrechnen.

   Wozu das gebraucht wird: für die Direktionen von Planet zu Planet.
   Die Richtung zu den vier Achsen ist geschlossen lösbar und braucht
   keine Häuser — die zwischen zwei Planeten aber schon. Die alte Lehre
   rechnet sie "unter dem Pol des Signifikators": Jeder Punkt bekommt
   je nach Stand zwischen Horizont und Meridian einen eigenen Pol,
   zwischen null am Meridian und der vollen geographischen Breite am
   Horizont. Unter diesem Pol wird dann der Bogen gemessen.
   ------------------------------------------------------------------------ */

import { norm360, schiefeDerEkliptik, julianischesDatum, aufsteigungsdifferenz }
  from "./astro.js?v=244";

const rad = d => d * Math.PI / 180;
const grd = r => r * 180 / Math.PI;

/* Ekliptiklänge eines Punktes, der mit gegebener Rektaszension auf einem
   Stundenkreis liegt. Umkehrung von tan(α) = tan(λ)·cos(ε). */
export function laengeAusRA(ra, eps) {
  const a = rad(norm360(ra)), e = rad(eps);
  return norm360(grd(Math.atan2(Math.sin(a), Math.cos(a) * Math.cos(e))));
}

export function raAusLaenge(laenge, eps) {
  const l = rad(norm360(laenge)), e = rad(eps);
  return norm360(grd(Math.atan2(Math.sin(l) * Math.cos(e), Math.cos(l))));
}

export function deklination(laenge, eps) {
  return grd(Math.asin(Math.sin(rad(eps)) * Math.sin(rad(laenge))));
}

/* ------------------------------------------------- Die zwölf Spitzen */
export function alcabitius(ramc, asc, breite, eps) {
  const raAsc = raAusLaenge(asc, eps);
  const dekAsc = deklination(asc, eps);
  /* Der Halbtagbogen des aufsteigenden Grades: 90° plus seine
     Aufsteigungsdifferenz. Auf der Nordhalbkugel ist er für nördliche
     Deklination länger als ein Viertelkreis, für südliche kürzer. */
  const ad = aufsteigungsdifferenz(dekAsc, breite);
  const DSA = 90 + ad;          /* Aufgang bis Meridian */
  const NSA = 90 - ad;          /* Meridian bis Untergang, von unten gesehen */

  /* Die Rektaszensionen der Spitzen, gegen den Lauf der Zeichen gezählt. */
  const ra = {};
  ra[10] = norm360(ramc);
  ra[11] = norm360(ramc + DSA / 3);
  ra[12] = norm360(ramc + 2 * DSA / 3);
  ra[1]  = norm360(ramc + DSA);           /* = raAsc */
  ra[2]  = norm360(ra[1] + NSA / 3);
  ra[3]  = norm360(ra[1] + 2 * NSA / 3);
  ra[4]  = norm360(ramc + 180);
  ra[5]  = norm360(ra[4] + DSA / 3);
  ra[6]  = norm360(ra[4] + 2 * DSA / 3);
  ra[7]  = norm360(ra[1] + 180);
  ra[8]  = norm360(ra[7] + NSA / 3);
  ra[9]  = norm360(ra[7] + 2 * NSA / 3);

  const spitzen = {};
  for (let h = 1; h <= 12; h++) spitzen[h] = laengeAusRA(ra[h], eps);
  /* Die erste Spitze ist der Aszendent selbst — die Rundung soll das
     nicht verschieben. */
  spitzen[1] = norm360(asc);
  spitzen[7] = norm360(asc + 180);

  return { spitzen, ra, DSA, NSA, ad, raAsc };
}

/* In welchem Quadrantenhaus liegt ein Ekliptikgrad? */
export function hausVonAlcabitius(laenge, spitzen) {
  const l = norm360(laenge);
  for (let h = 1; h <= 12; h++) {
    const von = spitzen[h], bis = spitzen[h % 12 + 1];
    const spanne = norm360(bis - von);
    if (norm360(l - von) < spanne) return h;
  }
  return 1;
}

/* --------------------------------------------- Der Pol eines Punktes
   Am Meridian braucht ein Punkt keine Korrektur, am Horizont die volle
   geographische Breite. Dazwischen wird proportional zum Stand in
   seinem eigenen Halbbogen geteilt — das ist die Semibogen-Regel, mit
   der auch Alcabitius' Häuser gebildet werden. */
export function polVon(ra, dek, ramc, breite) {
  const ad = aufsteigungsdifferenz(dek, breite);
  const stundenwinkel = norm360(ramc - ra);
  const h = stundenwinkel > 180 ? 360 - stundenwinkel : stundenwinkel;  /* 0..180 */
  const ueberHorizont = h <= 90 + ad;
  const halbbogen = ueberHorizont ? 90 + ad : 90 - ad;
  const genommen = ueberHorizont ? h : 180 - h;
  /* 0 am Meridian, 1 am Horizont */
  const f = halbbogen ? Math.min(1, genommen / halbbogen) : 0;
  return grd(Math.atan(Math.tan(rad(breite)) * f));
}

/* Schiefer Aufstieg unter einem gegebenen Pol. */
export function aufstiegUnterPol(ra, dek, pol) {
  const t = Math.tan(rad(pol)) * Math.tan(rad(dek));
  if (Math.abs(t) >= 1) return null;          /* zirkumpolar unter diesem Pol */
  return norm360(ra - grd(Math.asin(t)));
}

/* Der Richtungsbogen zwischen zwei Punkten unter dem Pol des
   Signifikators — die klassische Rechnung für Planet zu Planet. */
export function bogenUnterPol(promissor, signifikator, ramc, breite) {
  const pol = polVon(signifikator.ra, signifikator.dek, ramc, breite);
  const oaS = aufstiegUnterPol(signifikator.ra, signifikator.dek, pol);
  const oaP = aufstiegUnterPol(promissor.ra, promissor.dek, pol);
  if (oaS === null || oaP === null) return null;
  return { pol, direkt: norm360(oaP - oaS), konvers: norm360(oaS - oaP) };
}
