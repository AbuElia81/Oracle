/* ------------------------------------------------------------------------
   astro.js — die Himmelsmechanik.

   Julianisches Datum, Greenwich-Sternzeit, Schiefe der Ekliptik und die
   Positionen von Sonne, Mond und den fünf klassischen Planeten, ohne
   Ephemeridenbibliothek: niedrig-präzise Bahnelemente (Van Flandern/
   Pulkkinen-Familie, wie u. a. bei Paul Schlyter dokumentiert), Kepler-
   Gleichung per Newton-Verfahren gelöst, heliozentrisch → geozentrisch.
   Genauigkeit liegt bei wenigen Bogenminuten — für Primärdirektionen, bei
   denen ein Grad einem Jahr entspricht, für den symbolischen Gebrauch
   dieser Seite ausreichend, aber kein Ersatz für eine professionelle
   Ephemeride.
   --------------------------------------------------------------------- */

export const grad = r => r * 180 / Math.PI;
export const rad = d => d * Math.PI / 180;
export const norm360 = d => ((d % 360) + 360) % 360;

export function julianischesDatum(jahr, monat, tag, stundeUT) {
  let y = jahr, m = monat;
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + tag + B - 1524.5 + stundeUT / 24;
}

export function siderischeZeitGreenwich(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  return norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000.0);
}

export function schiefeDerEkliptik(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  return 23.439291 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
}

/* Sonnenlänge und -abstand, Meeus Kap. 25, niedrige Präzision. */
export function sonnenLaenge(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mr = rad(M);
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * Mr)
          + 0.000289 * Math.sin(3 * Mr);
  return norm360(L0 + C);
}
function sonnenAbstand(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mr = rad(M);
  const e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T * T;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * Mr)
          + 0.000289 * Math.sin(3 * Mr);
  const v = M + C;
  return 1.000001018 * (1 - e * e) / (1 + e * Math.cos(rad(v)));
}

/* Bahnelemente (Äquinoktium J2000, d = Tage seit J2000.0), Van-Flandern/
   Pulkkinen-Familie: N Knoten, i Neigung, w Perihelargument, a gr. Halbachse
   (AE bzw. bei Mond Erdradien), e Exzentrizität, M mittlere Anomalie. */
const ELEMENTE = {
  merkur:  { N:[48.3313,3.24587e-5], i:[7.0047,5.00e-8],  w:[29.1241,1.01444e-5],  a:0.387098, e:[0.205635,5.59e-10],  M:[168.6562,4.0923344368] },
  venus:   { N:[76.6799,2.46590e-5], i:[3.3946,2.75e-8],  w:[54.8910,1.38374e-5],  a:0.723330, e:[0.006773,-1.302e-9], M:[48.0052,1.6021302244] },
  mars:    { N:[49.5574,2.11081e-5], i:[1.8497,-1.78e-8], w:[286.5016,2.92961e-5], a:1.523688, e:[0.093405,2.516e-9],  M:[18.6021,0.5240207766] },
  jupiter: { N:[100.4542,2.76854e-5],i:[1.3030,-1.557e-7],w:[273.8777,1.64505e-5], a:5.20256,  e:[0.048498,4.469e-9],  M:[19.8950,0.0830853001] },
  saturn:  { N:[113.6634,2.38980e-5],i:[2.4886,-1.081e-7],w:[339.3939,2.97661e-5], a:9.55475,  e:[0.055546,-9.499e-9], M:[316.9670,0.0334442282] }
};
const MOND = { N:[125.1228,-0.0529538083], i:[5.1454,0], w:[318.0634,0.1643573223], a:60.2666, e:[0.054900,0], M:[115.3654,13.0649929509] };

function keplerE(mGrad, e) {
  const M = rad(norm360(mGrad));
  let E = M;
  for (let k = 0; k < 8; k++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return E;
}

/* Liefert {x,y,z} in der Bahnebene → Ekliptik, heliozentrisch (Planeten)
   bzw. direkt geozentrisch (Mond, dessen Elemente erdbezogen sind). */
function bahnPosition(el, tageSeitJ2000) {
  const d = tageSeitJ2000;
  const N = el.N[0] + el.N[1] * d, i = el.i[0] + el.i[1] * d, w = el.w[0] + el.w[1] * d;
  const e = el.e[0] + el.e[1] * d, M = norm360(el.M[0] + el.M[1] * d), a = el.a;
  const E = keplerE(M, e);
  const xv = a * (Math.cos(E) - e), yv = a * (Math.sqrt(1 - e * e) * Math.sin(E));
  const r = Math.hypot(xv, yv), v = grad(Math.atan2(yv, xv));
  const Nr = rad(N), ir = rad(i), vw = rad(v + w);
  return {
    x: r * (Math.cos(Nr) * Math.cos(vw) - Math.sin(Nr) * Math.sin(vw) * Math.cos(ir)),
    y: r * (Math.sin(Nr) * Math.cos(vw) + Math.cos(Nr) * Math.sin(vw) * Math.cos(ir)),
    z: r * (Math.sin(vw) * Math.sin(ir))
  };
}

/* Sonnen-Geozentrik als Vektor (Erde → Sonne); Erde-Heliozentrik ist das
   Negative davon, also: geozentrisch(Planet) = heliozentrisch(Planet) +
   dieser Vektor. */
function sonnenVektor(jd) {
  const l = rad(sonnenLaenge(jd)), r = sonnenAbstand(jd);
  return { x: r * Math.cos(l), y: r * Math.sin(l), z: 0 };
}

function eklToAequ(laengeGrad, breiteGrad, schiefeGrad) {
  const l = rad(laengeGrad), b = rad(breiteGrad), eps = rad(schiefeGrad);
  const ra = norm360(grad(Math.atan2(Math.sin(l) * Math.cos(eps) - Math.tan(b) * Math.sin(eps), Math.cos(l))));
  const dek = grad(Math.asin(Math.sin(b) * Math.cos(eps) + Math.cos(b) * Math.sin(eps) * Math.sin(l)));
  return { rektaszension: ra, deklination: dek };
}

/* Positionen aller sieben Wandelsterne: {laenge, breite, rektaszension,
   deklination} in Grad, ekliptikale Länge ab Widder 0°. */
export function planetenPositionen(jd) {
  const eps = schiefeDerEkliptik(jd);
  const d = jd - 2451545.0;
  const sv = sonnenVektor(jd);
  const out = {};

  out.sonne = (() => {
    const l = sonnenLaenge(jd);
    const { rektaszension, deklination } = eklToAequ(l, 0, eps);
    return { laenge: l, breite: 0, rektaszension, deklination };
  })();

  const m = bahnPosition(MOND, d);
  {
    const laenge = norm360(grad(Math.atan2(m.y, m.x)));
    const breite = grad(Math.atan2(m.z, Math.hypot(m.x, m.y)));
    const { rektaszension, deklination } = eklToAequ(laenge, breite, eps);
    out.mond = { laenge, breite, rektaszension, deklination };
  }

  for (const name in ELEMENTE) {
    const h = bahnPosition(ELEMENTE[name], d);
    const xg = h.x + sv.x, yg = h.y + sv.y, zg = h.z + sv.z;
    const laenge = norm360(grad(Math.atan2(yg, xg)));
    const breite = grad(Math.atan2(zg, Math.hypot(xg, yg)));
    const { rektaszension, deklination } = eklToAequ(laenge, breite, eps);
    out[name] = { laenge, breite, rektaszension, deklination };
  }

  return out;
}

/* -------------------------------------------------------- Häuser, Winkel */
export function aszendent(ramcGrad, breiteGrad, schiefeGrad) {
  const R = rad(ramcGrad), phi = rad(breiteGrad), eps = rad(schiefeGrad);
  const y = Math.cos(R);
  const x = -(Math.sin(R) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps));
  return norm360(grad(Math.atan2(y, x)));
}

export function medium(ramcGrad, schiefeGrad) {
  const R = rad(ramcGrad), eps = rad(schiefeGrad);
  return norm360(grad(Math.atan2(Math.sin(R), Math.cos(R) * Math.cos(eps))));
}

export function sonnenHoehe(ramcGrad, breiteGrad, rektaszensionGrad, deklinationGrad) {
  const H = rad(norm360(ramcGrad - rektaszensionGrad));
  const phi = rad(breiteGrad), dek = rad(deklinationGrad);
  const sinH = Math.sin(dek) * Math.sin(phi) + Math.cos(dek) * Math.cos(phi) * Math.cos(H);
  return grad(Math.asin(Math.max(-1, Math.min(1, sinH))));
}

/* Aufsteigungsdifferenz (AD) und schiefe Auf-/Untergangsrektaszension. */
export function aufsteigungsdifferenz(deklinationGrad, breiteGrad) {
  const t = Math.tan(rad(breiteGrad)) * Math.tan(rad(deklinationGrad));
  return grad(Math.asin(Math.max(-1, Math.min(1, t))));
}
export function schiefeAufgangsRA(rektaszensionGrad, deklinationGrad, breiteGrad) {
  return norm360(rektaszensionGrad - aufsteigungsdifferenz(deklinationGrad, breiteGrad));
}
export function schiefeUntergangsRA(rektaszensionGrad, deklinationGrad, breiteGrad) {
  return norm360(rektaszensionGrad + aufsteigungsdifferenz(deklinationGrad, breiteGrad));
}

export function berechneGeburt(jahr, monat, tag, stunde, minute, utcOffset, breite, laenge) {
  const stundeUT = stunde + minute / 60 - utcOffset;
  const jd = julianischesDatum(jahr, monat, tag, stundeUT);
  const gmst = siderischeZeitGreenwich(jd);
  const ramc = norm360(gmst + laenge); // Länge Ost positiv = RAMC (Ortssternzeit in Grad)
  const eps = schiefeDerEkliptik(jd);
  const asc = aszendent(ramc, breite, eps);
  const mc = medium(ramc, eps);
  const planeten = planetenPositionen(jd);
  const hoehe = sonnenHoehe(ramc, breite, planeten.sonne.rektaszension, planeten.sonne.deklination);
  return { jd, ramc, eps, asc, mc, breite, laenge, planeten, sonnenhoehe: hoehe, tagGeburt: hoehe > 0 };
}
