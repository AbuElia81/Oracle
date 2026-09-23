/* ------------------------------------------------------------------------
   geist.js — Der Geist des 11. Hauses (Agrippa, De Occulta Philosophia III.26).

   Der Aszendent wird aus Geburtsdatum/-zeit/-ort selbst berechnet, ohne
   Ephemeridenbibliothek: julianisches Datum, Greenwich-Sternzeit, Schiefe
   der Ekliptik und Sonnenposition nach den Standardformeln bei Meeus
   (Astronomical Algorithms), niedrige Praezision (~1 Bogenminute) — fuer
   diesen symbolischen Gebrauch reichlich genau. Die Spitze des 11. Hauses
   folgt der Ganzzeichen-Vereinfachung (zehn Zeichen nach dem Aszendenten).
   --------------------------------------------------------------------- */

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const grad = r => r * 180 / Math.PI;
const rad  = d => d * Math.PI / 180;
const norm360 = d => ((d % 360) + 360) % 360;

/* ------------------------------------------------------------ Astronomie */
function julianischesDatum(jahr, monat, tag, stundeUT) {
  let y = jahr, m = monat;
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + tag + B - 1524.5 + stundeUT / 24;
}

function siderischeZeitGreenwich(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  return norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000.0);
}

function schiefeDerEkliptik(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  return 23.439291 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
}

/* Meeus, Kap. 25, niedrige Praezision. */
function sonnenPosition(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M  = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mr = rad(M);
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * Mr)
          + 0.000289 * Math.sin(3 * Mr);
  const laenge = norm360(L0 + C);
  const eps = rad(schiefeDerEkliptik(jd));
  const l = rad(laenge);
  return {
    laenge,
    rektaszension: norm360(grad(Math.atan2(Math.cos(eps) * Math.sin(l), Math.cos(l)))),
    deklination: grad(Math.asin(Math.sin(eps) * Math.sin(l)))
  };
}

/* Mondlaenge, Meeus Kap. 47, gekuerzte Reihe (~0,02 Grad) — fuer einen
   Buchstabensektor von gut 16 Grad ueberreichlich genau. */
function mondLaenge(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  const Ls = norm360(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T
            + T * T * T / 538841 - T * T * T * T / 65194000);
  const D  = rad(norm360(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T
            + T * T * T / 545868 - T * T * T * T / 113065000));
  const M  = rad(norm360(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T
            + T * T * T / 24490000));
  const Ms = rad(norm360(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T
            + T * T * T / 69699 - T * T * T * T / 14712000));
  const F  = rad(norm360(93.2720950 + 483202.0175233 * T - 0.0036539 * T * T
            - T * T * T / 3526000 + T * T * T * T / 863310000));

  const s = [
    [6.288774, Ms], [1.274027, 2*D - Ms], [0.658314, 2*D], [0.213618, 2*Ms],
    [-0.185116, M], [-0.114332, 2*F], [0.058793, 2*D - 2*Ms],
    [0.057066, 2*D - M - Ms], [0.053322, 2*D + Ms], [0.045758, 2*D - M],
    [-0.040923, M - Ms], [-0.034720, D], [-0.030383, M + Ms],
    [0.015327, 2*D - 2*F], [-0.012528, Ms + 2*F], [0.010980, Ms - 2*F],
    [0.010675, 4*D - Ms], [0.010034, 3*Ms], [0.008548, 4*D - 2*Ms]
  ].reduce((a, [k, arg]) => a + k * Math.sin(arg), 0);

  return norm360(Ls + s);
}

/* Die Syzygie vor der Geburt: der letzte Neumond oder Vollmond davor.
   Agrippa nimmt den Grad der vorangehenden Konjunktion oder Opposition
   der Lichter. Gesucht wird ueber die Elongation — sie waechst um rund
   12,19 Grad am Tag, das traegt die Naeherung in wenigen Schritten. */
const SYN_RATE = 12.190749;
function letzteSyzygie(jd) {
  const psi = j => norm360(mondLaenge(j) - sonnenPosition(j).laenge);
  const feilen = j => {
    for (let i = 0; i < 12; i++) {
      let d = psi(j) % 180;
      if (d > 90) d -= 180;
      j -= d / SYN_RATE;
    }
    return j;
  };
  let j = feilen(jd - (psi(jd) % 180) / SYN_RATE);
  if (j > jd) j = feilen(j - 14.765294);   // versehentlich die naechste erwischt
  const p = psi(j);
  const konjunktion = p < 90 || p > 270;
  return {
    jd: j,
    art: konjunktion ? "Konjunktion" : "Opposition",
    glyph: konjunktion ? "☌" : "☍",
    laenge: mondLaenge(j)
  };
}

/* Glueckspunkt (pars fortunae): bei Tag Asz + Mond - Sonne,
   bei Nacht Asz + Sonne - Mond. */
function glueckspunkt(asc, sonne, mond, tagGeburt) {
  return norm360(tagGeburt ? asc + mond - sonne : asc + sonne - mond);
}

function aszendentAusRamc(ramcGrad, breiteGrad, schiefeGrad) {
  const R = rad(ramcGrad), phi = rad(breiteGrad), eps = rad(schiefeGrad);
  const y = Math.cos(R);
  const x = -(Math.sin(R) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps));
  return norm360(grad(Math.atan2(y, x)));
}

function sonnenHoehe(ramcGrad, breiteGrad, rektaszensionGrad, deklinationGrad) {
  const H = rad(norm360(ramcGrad - rektaszensionGrad));
  const phi = rad(breiteGrad), dek = rad(deklinationGrad);
  const sinH = Math.sin(dek) * Math.sin(phi) + Math.cos(dek) * Math.cos(phi) * Math.cos(H);
  return grad(Math.asin(Math.max(-1, Math.min(1, sinH))));
}

function berechneGeburt(jahr, monat, tag, stunde, minute, utcOffset, breite, laenge) {
  const stundeUT = stunde + minute / 60 - utcOffset;
  const jd = julianischesDatum(jahr, monat, tag, stundeUT);
  const gmst = siderischeZeitGreenwich(jd);
  const ramc = norm360(gmst + laenge); // Laenge Ost positiv = RAMC (Ortssternzeit in Grad)
  const eps = schiefeDerEkliptik(jd);
  const asc = aszendentAusRamc(ramc, breite, eps);
  const sonne = sonnenPosition(jd);
  const mond = mondLaenge(jd);
  const hoehe = sonnenHoehe(ramc, breite, sonne.rektaszension, sonne.deklination);
  const tagGeburt = hoehe > 0;
  const fortuna = glueckspunkt(asc, sonne.laenge, mond, tagGeburt);
  const syzygie = letzteSyzygie(jd);
  return { jd, asc, ramc, eps, sonne, mond, fortuna, syzygie,
           sonnenhoehe: hoehe, tagGeburt };
}

/* -------------------------------------------------------- Tierkreis, Würden */
const ZEICHEN = [
  { name:"Widder", glyph:"♈\ufe0e", el:0 }, { name:"Stier", glyph:"♉\ufe0e", el:1 },
  { name:"Zwillinge", glyph:"♊\ufe0e", el:2 }, { name:"Krebs", glyph:"♋\ufe0e", el:3 },
  { name:"Löwe", glyph:"♌\ufe0e", el:0 }, { name:"Jungfrau", glyph:"♍\ufe0e", el:1 },
  { name:"Waage", glyph:"♎\ufe0e", el:2 }, { name:"Skorpion", glyph:"♏\ufe0e", el:3 },
  { name:"Schütze", glyph:"♐\ufe0e", el:0 }, { name:"Steinbock", glyph:"♑\ufe0e", el:1 },
  { name:"Wassermann", glyph:"♒\ufe0e", el:2 }, { name:"Fische", glyph:"♓\ufe0e", el:3 }
];

const PLANETEN = {
  sonne:{name:"Sonne", g:"☉"}, mond:{name:"Mond", g:"☽"}, merkur:{name:"Merkur", g:"☿"},
  venus:{name:"Venus", g:"♀"}, mars:{name:"Mars", g:"♂"}, jupiter:{name:"Jupiter", g:"♃"},
  saturn:{name:"Saturn", g:"♄"}
};
const PLANETEN_REIHE = ["sonne","mond","merkur","venus","mars","jupiter","saturn"];

const DOMIZIL = ["mars","venus","merkur","mond","sonne","merkur","venus","mars","jupiter","saturn","saturn","jupiter"];
const EXALTATION = ["sonne","mond",null,"jupiter",null,"merkur","saturn",null,null,"mars",null,"venus"];
const TRIGON = [ {tag:"sonne",nacht:"jupiter"}, {tag:"venus",nacht:"mond"}, {tag:"saturn",nacht:"merkur"}, {tag:"venus",nacht:"mars"} ];

const TERME = [
  [[6,"jupiter"],[12,"venus"],[20,"merkur"],[25,"mars"],[30,"saturn"]],
  [[8,"venus"],[14,"merkur"],[22,"jupiter"],[27,"saturn"],[30,"mars"]],
  [[6,"merkur"],[12,"jupiter"],[17,"venus"],[24,"mars"],[30,"saturn"]],
  [[7,"mars"],[13,"venus"],[19,"merkur"],[26,"jupiter"],[30,"saturn"]],
  [[6,"jupiter"],[11,"venus"],[18,"saturn"],[24,"merkur"],[30,"mars"]],
  [[7,"merkur"],[13,"venus"],[18,"jupiter"],[24,"saturn"],[30,"mars"]],
  [[6,"saturn"],[11,"merkur"],[19,"jupiter"],[24,"venus"],[30,"mars"]],
  [[6,"mars"],[14,"venus"],[21,"merkur"],[27,"jupiter"],[30,"saturn"]],
  [[8,"jupiter"],[14,"venus"],[19,"merkur"],[25,"saturn"],[30,"mars"]],
  [[7,"merkur"],[14,"jupiter"],[22,"venus"],[26,"saturn"],[30,"mars"]],
  [[7,"merkur"],[13,"venus"],[20,"jupiter"],[25,"mars"],[30,"saturn"]],
  [[12,"venus"],[16,"jupiter"],[19,"merkur"],[28,"mars"],[30,"saturn"]]
];

const GESICHTER = [
  ["mars","sonne","venus"], ["merkur","mond","saturn"], ["jupiter","mars","sonne"],
  ["venus","merkur","mond"], ["saturn","jupiter","mars"], ["sonne","venus","merkur"],
  ["mond","saturn","jupiter"], ["mars","sonne","venus"], ["merkur","mond","saturn"],
  ["jupiter","mars","sonne"], ["venus","merkur","mond"], ["saturn","jupiter","mars"]
];

/* Die 22 Buchstaben, jeder mit seiner Lautung. `vok` kennzeichnet die
   Lesemuetter — sie treten im Namen als Vokal auf, nicht als Mitlaut. */
const HEBR22 = [
  {g:"א",n:"Aleph", lat:"",   vok:"a"}, {g:"ב",n:"Bet",   lat:"B"},
  {g:"ג",n:"Gimel", lat:"G"},           {g:"ד",n:"Dalet", lat:"D"},
  {g:"ה",n:"He",    lat:"H"},           {g:"ו",n:"Vav",   lat:"",  vok:"u"},
  {g:"ז",n:"Zajin", lat:"Z"},           {g:"ח",n:"Chet",  lat:"Ch"},
  {g:"ט",n:"Tet",   lat:"T"},           {g:"י",n:"Jod",   lat:"",  vok:"i"},
  {g:"כ",n:"Kaf",   lat:"K"},           {g:"ל",n:"Lamed", lat:"L"},
  {g:"מ",n:"Mem",   lat:"M"},           {g:"נ",n:"Nun",   lat:"N"},
  {g:"ס",n:"Samech",lat:"S"},           {g:"ע",n:"Ajin",  lat:"",  vok:"a"},
  {g:"פ",n:"Pe",    lat:"P"},           {g:"צ",n:"Tzade", lat:"Tz"},
  {g:"ק",n:"Qof",   lat:"Q"},           {g:"ר",n:"Resch", lat:"R"},
  {g:"ש",n:"Schin", lat:"Sch"},         {g:"ת",n:"Taw",   lat:"Th"}
];
const HEBR27 = (function () {
  const sofit = { Kaf:"ך", Mem:"ם", Nun:"ן", Pe:"ף", Tzade:"ץ" };
  const out = [];
  HEBR22.forEach(l => {
    out.push(l);
    if (sofit[l.n]) out.push({ ...l, g: sofit[l.n], n: l.n + "-Sofit" });
  });
  return out;
})();

/* Agrippa legt die Buchstaben ueber den ganzen Tierkreis: der Kreis wird in
   so viele gleiche Sektoren geteilt, wie es Buchstaben gibt, beginnend bei
   0 Grad Widder. Der Ort faellt in einen Sektor, und der gibt den Buchstaben. */
function buchstabeFuerLaenge(laenge, alphabet) {
  const breite = 360 / alphabet.length;
  const idx = Math.floor(norm360(laenge) / breite) % alphabet.length;
  return { idx, breite, buchstabe: alphabet[idx], sektorStart: idx * breite };
}

/* Aus den abgelesenen Buchstaben einen sprechbaren Namen fuegen: die
   Lesemuetter geben ihren Vokal, zwischen zwei Mitlaute tritt ein a, und
   am Ende steht die Endung. */
function bildeNamen(buchstaben, endung) {
  let s = "";
  const endetVokal = () => /[aeiou]$/i.test(s);
  buchstaben.forEach(l => {
    if (l.vok) {
      if (!endetVokal() || s.slice(-1).toLowerCase() !== l.vok) s += l.vok;
    } else {
      if (s && !endetVokal()) s += "a";
      s += l.lat.toLowerCase();
    }
  });
  if (!s) s = "A";
  if (!endetVokal() && endung) s += "i";
  if (endung === "el") s += "el";
  else if (endung === "jah") s += "jah";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function wuerden(signIdx, gradImZeichen, tagGeburt) {
  const s = {};
  PLANETEN_REIHE.forEach(p => { s[p] = { total:0, dom:false, ex:false, tri:false, term:false, face:false }; });

  const dom = DOMIZIL[signIdx];
  s[dom].total += 5; s[dom].dom = true;

  const ex = EXALTATION[signIdx];
  if (ex) { s[ex].total += 4; s[ex].ex = true; }

  const elIdx = ZEICHEN[signIdx].el;
  const tri = tagGeburt ? TRIGON[elIdx].tag : TRIGON[elIdx].nacht;
  s[tri].total += 3; s[tri].tri = true;

  const termListe = TERME[signIdx];
  let termHerrscher = null;
  for (const [ob, pl] of termListe) { if (gradImZeichen < ob) { termHerrscher = pl; break; } }
  if (!termHerrscher) termHerrscher = termListe[termListe.length - 1][1];
  s[termHerrscher].total += 2; s[termHerrscher].term = true;

  const dekanIdx = Math.min(2, Math.floor(gradImZeichen / 10));
  const faceHerrscher = GESICHTER[signIdx][dekanIdx];
  s[faceHerrscher].total += 1; s[faceHerrscher].face = true;

  return s;
}

function ermittleAlmuten(scores) {
  let best = null;
  PLANETEN_REIHE.forEach(p => {
    if (!best) { best = p; return; }
    const a = scores[best], b = scores[p];
    if (b.total > a.total) { best = p; return; }
    if (b.total === a.total) {
      const rang = x => [x.dom, x.ex, x.tri, x.term, x.face];
      const ra = rang(a), rb = rang(b);
      for (let i = 0; i < 5; i++) {
        if (rb[i] && !ra[i]) { best = p; break; }
        if (ra[i] && !rb[i]) break;
      }
    }
  });
  return best;
}

/* --------------------------------------------------------------- Das Rad */
function polar(deg, r, cx, cy) {
  const a = rad(deg - 90);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

/* Das Rad: aussen der Buchstabenkreis, innen der Tierkreis, darin die
   fuenf hylegischen Oerter als Zeiger. */
function baueRad(oerter, alphabet, cuspAbs) {
  const cx = 150, cy = 150;
  const rBuchAussen = 142, rBuchInnen = 120, rBuchText = 131;
  const rZeichInnen = 100, rZeichText = 110;
  const zahl = alphabet.length, sektor = 360 / zahl;
  const t = ['<svg viewBox="0 0 300 300" role="img" aria-label="Tierkreis mit Buchstabenkreis und den fünf Örtern">'];

  [rBuchAussen, rBuchInnen, rZeichInnen].forEach(r =>
    t.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--linie)" stroke-width="1"/>`));

  /* Buchstabenkreis */
  for (let i = 0; i < zahl; i++) {
    const p1 = polar(i * sektor, rBuchInnen, cx, cy), p2 = polar(i * sektor, rBuchAussen, cx, cy);
    t.push(`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="var(--linie)" stroke-width="1"/>`);
    const lp = polar(i * sektor + sektor / 2, rBuchText, cx, cy);
    t.push(`<text x="${lp.x.toFixed(2)}" y="${lp.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="${zahl > 22 ? 10 : 12}" fill="var(--ton)" opacity=".85">${alphabet[i].g}</text>`);
  }

  /* Tierkreis */
  for (let i = 0; i < 12; i++) {
    const p1 = polar(i * 30, rZeichInnen, cx, cy), p2 = polar(i * 30, rBuchInnen, cx, cy);
    t.push(`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="var(--linie)" stroke-width="1"/>`);
    const lp = polar(i * 30 + 15, rZeichText, cx, cy);
    t.push(`<text x="${lp.x.toFixed(2)}" y="${lp.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="11" fill="var(--gedaempft)">${ZEICHEN[i].glyph}</text>`);
  }

  /* Spitze des 11. Hauses, gestrichelt */
  const c1 = polar(cuspAbs, rZeichInnen - 14, cx, cy), c2 = polar(cuspAbs, rBuchInnen, cx, cy);
  t.push(`<line x1="${c1.x.toFixed(2)}" y1="${c1.y.toFixed(2)}" x2="${c2.x.toFixed(2)}" y2="${c2.y.toFixed(2)}" stroke="var(--rot)" stroke-width="1.6" stroke-dasharray="4 3" opacity=".8"/>`);
  const cl = polar(cuspAbs, rZeichInnen - 24, cx, cy);
  t.push(`<text x="${cl.x.toFixed(2)}" y="${cl.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="9" fill="var(--rot)">XI</text>`);

  /* Die fuenf Oerter. Liegen zwei dicht beieinander, rueckt das Zeichen
     eine Stufe nach innen, damit sich die Beschriftungen nicht decken. */
  const belegt = [];
  oerter.forEach(o => {
    const a = norm360(o.laenge);
    let stufe = 0;
    const naheBei = b => Math.abs(((b.a - a + 540) % 360) - 180) < 12;
    while (belegt.some(b => b.stufe === stufe && naheBei(b)) && stufe < 3) stufe++;
    belegt.push({ a, stufe });
    const rEnd = rZeichInnen - 4 - stufe * 17;
    const p1 = polar(a, rEnd, cx, cy), p2 = polar(a, rBuchInnen, cx, cy);
    t.push(`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="${o.farbe}" stroke-width="2"/>`);
    const lp = polar(a, rEnd - 11, cx, cy);
    t.push(`<text x="${lp.x.toFixed(2)}" y="${lp.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="12" fill="${o.farbe}">${o.glyph}</text>`);
  });

  t.push("</svg>");
  return t.join("");
}

/* ------------------------------------------------------------ Ortssuche */
async function ortSuchen(name) {
  const url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&accept-language=de&q=" + encodeURIComponent(name);
  const antwort = await fetch(url);
  if (!antwort.ok) throw new Error("Die Suche ist fehlgeschlagen.");
  const daten = await antwort.json();
  if (!daten.length) throw new Error("Kein Ort gefunden — Breite und Länge von Hand eintragen.");
  return { breite: parseFloat(daten[0].lat), laenge: parseFloat(daten[0].lon), anzeige: daten[0].display_name };
}

$("#gOrtSuchen").addEventListener("click", async () => {
  const ort = $("#gOrt").value.trim();
  const status = $("#gGeoStatus");
  status.className = "geoStatus";
  if (!ort) { status.textContent = "Erst einen Ort eintragen."; status.classList.add("fehler"); return; }
  status.textContent = "Suche …";
  try {
    const treffer = await ortSuchen(ort);
    $("#gBreite").value = treffer.breite.toFixed(4);
    $("#gLaenge").value = treffer.laenge.toFixed(4);
    status.textContent = "Gefunden: " + treffer.anzeige;
    status.classList.add("ok");
  } catch (e) {
    status.textContent = e.message || "Die Suche ist fehlgeschlagen.";
    status.classList.add("fehler");
  }
});

/* ------------------------------------------------------------- Rechnung */
const ZEICHEN_GRAD = l => {
  const i = Math.floor(norm360(l) / 30);
  return `${ZEICHEN[i].glyph} ${(norm360(l) - i * 30).toFixed(1)}°`;
};

$("#gBerechnen").addEventListener("click", () => {
  const cikti = $("#gCikti");
  const datumStr = $("#gDatum").value, zeitStr = $("#gZeit").value;
  const breite = parseFloat($("#gBreite").value), laenge = parseFloat($("#gLaenge").value);
  const utc = parseFloat($("#gUtc").value);

  if (!datumStr || !zeitStr || isNaN(breite) || isNaN(laenge) || isNaN(utc)) {
    const fehlt = [];
    if (!datumStr) fehlt.push("das Geburtsdatum");
    if (!zeitStr) fehlt.push("die Geburtszeit");
    if (isNaN(breite) || isNaN(laenge)) fehlt.push("die Koordinaten des Geburtsorts");
    if (isNaN(utc)) fehlt.push("der UTC-Offset");

    cikti.hidden = false;
    cikti.innerHTML = "";
    const kasten = el("div", "mangelKasten");
    kasten.append(
      el("div", "kalanBaslik", "Es fehlt noch etwas"),
      el("p", null, "Für den Geistnamen braucht es den wirklichen Himmel deiner Geburtsstunde. " +
                    "Dafür fehlt " + (fehlt.length > 1
                      ? fehlt.slice(0, -1).join(", ") + " und " + fehlt[fehlt.length - 1]
                      : fehlt[0]) + "."),
      el("p", "kucukNot", "Den Ort allein genügt nicht — die Koordinaten findest du auf der " +
                          "Hauptseite mit dem Knopf „Koordinaten suchen“; den UTC-Offset trägst " +
                          "du daneben ein (Mitteleuropa: 1, im Sommer 2).")
    );
    const b = el("button", "knopfKlein", "Zur Dateneingabe");
    b.addEventListener("click", () =>
      document.querySelector('nav#reiter button[data-bolum="bProfil"]')?.click());
    kasten.appendChild(b);
    cikti.appendChild(kasten);
    cikti.scrollIntoView({ block: "center", behavior: "smooth" });
    return;
  }

  const [jahr, monat, tag] = datumStr.split("-").map(Number);
  const [stunde, minute] = zeitStr.split(":").map(Number);
  const name = $("#gName").value.trim();
  const modus27 = document.querySelector('input[name="gModus"]:checked').value === "27";
  const endung = document.querySelector('input[name="gEndung"]:checked').value;
  const alphabet = modus27 ? HEBR27 : HEBR22;

  const geburt = berechneGeburt(jahr, monat, tag, stunde, minute, utc, breite, laenge);
  const ascSign = Math.floor(geburt.asc / 30), ascGrad = geburt.asc - ascSign * 30;
  const c11Sign = (ascSign + 10) % 12;
  const cuspAbs = c11Sign * 30 + ascGrad;

  /* Die fünf hylegischen Örter, in Agrippas Reihenfolge. */
  const oerter = [
    { kuerzel:"Aszendent",   glyph:"ASC", farbe:"var(--ton-hell)", laenge: geburt.asc },
    { kuerzel:"Sonne",       glyph:"☉",  farbe:"#e7c65c",          laenge: geburt.sonne.laenge },
    { kuerzel:"Mond",        glyph:"☽",  farbe:"#cfd6e6",          laenge: geburt.mond },
    { kuerzel:"Glückspunkt", glyph:"⊗",  farbe:"#7fb08a",          laenge: geburt.fortuna },
    { kuerzel:`Syzygie (${geburt.syzygie.art})`, glyph: geburt.syzygie.glyph,
      farbe:"#9c4a3c", laenge: geburt.syzygie.laenge }
  ];
  oerter.forEach(o => Object.assign(o, buchstabeFuerLaenge(o.laenge, alphabet)));

  const geistname = bildeNamen(oerter.map(o => o.buchstabe), endung);
  const hebr = oerter.map(o => o.buchstabe.g).join("");

  /* Der Almuten bleibt als zweite, eigene Aussage: der Regent des Hauses. */
  const scores = wuerden(c11Sign, ascGrad, geburt.tagGeburt);
  const almutenKey = ermittleAlmuten(scores);
  const almuten = PLANETEN[almutenKey];

  cikti.hidden = false;
  cikti.innerHTML = "";

  /* ------------------------------------------------ zuerst die Antwort */
  const nameBox = el("div", "geistName");
  nameBox.append(
    el("div", "kalanBaslik", name ? `Der Geist von ${name}` : "Abgeleiteter Geistname"),
    (() => { const d = el("div", "buyukToplam");
      d.innerHTML = `${geistname}<span class="buchstabe">${hebr}</span>`; return d; })(),
    el("div", "kucukNot", `aus den Buchstaben ${oerter.map(o => o.buchstabe.n).join(" · ")}`)
  );

  /* Den Namen hören. Ein Geistname will gesprochen werden — die Bücher
     verlangen ihn laut, nicht gelesen. Der Browser spricht ihn selbst;
     nichts davon verlässt das Gerät. */
  if (window.speechSynthesis) {
    const knopf = el("button", "hoerKnopf");
    knopf.innerHTML = `<span class="hoerZeichen">▶</span> Anhören`;
    knopf.title = "Den Namen sprechen lassen";
    knopf.addEventListener("click", () => {
      const sprech = window.speechSynthesis;
      sprech.cancel();
      const spruch = new SpeechSynthesisUtterance(geistname);
      spruch.lang = "de-DE";
      spruch.rate = 0.75;
      spruch.pitch = 0.9;
      const stimmen = sprech.getVoices();
      const deutsch = stimmen.find(v => /^de/i.test(v.lang));
      if (deutsch) spruch.voice = deutsch;
      knopf.classList.add("spricht");
      spruch.onend = () => knopf.classList.remove("spricht");
      spruch.onerror = () => knopf.classList.remove("spricht");
      sprech.speak(spruch);
    });
    nameBox.appendChild(knopf);
  }

  cikti.appendChild(nameBox);

  cikti.appendChild(el("p", "kucukNot",
    `Aszendent ${ZEICHEN[ascSign].glyph} ${ZEICHEN[ascSign].name} ${ascGrad.toFixed(1)}° · ` +
    `${geburt.tagGeburt ? "Taggeburt" : "Nachtgeburt"} (Sonnenhöhe ${geburt.sonnenhoehe.toFixed(1)}°) · ` +
    `Buchstabenkreis mit ${alphabet.length} Sektoren zu je ${(360 / alphabet.length).toFixed(2)}°`));

  /* ------------------------------------------------- die fünf Örter */
  cikti.appendChild(el("h3", null, "Die fünf hylegischen Örter"));
  const tablo = el("div", "tabloKutu");
  const tab = el("table", "wuerdeTablo oerterTablo");
  tab.innerHTML = "<thead><tr><th>Ort</th><th>Länge</th><th>im Zeichen</th><th>Sektor</th><th>Buchstabe</th></tr></thead>";
  const tbody = el("tbody");
  oerter.forEach(o => {
    const tr = el("tr");
    tr.appendChild(el("td", null, `${o.glyph}  ${o.kuerzel}`));
    tr.appendChild(el("td", null, `${norm360(o.laenge).toFixed(2)}°`));
    tr.appendChild(el("td", null, ZEICHEN_GRAD(o.laenge)));
    tr.appendChild(el("td", null, `${o.idx + 1}. (ab ${o.sektorStart.toFixed(1)}°)`));
    const td = el("td", "treffer");
    td.innerHTML = `<span class="hebr">${o.buchstabe.g}</span> ${o.buchstabe.n}`;
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
  tab.appendChild(tbody);
  tablo.appendChild(tab);
  cikti.appendChild(tablo);

  /* ------------------------------------------------------------ das Rad */
  const radKutu = el("div", "radKutu");
  radKutu.innerHTML = baueRad(oerter, alphabet, cuspAbs);
  const legende = el("div", "radLegende");
  legende.innerHTML = oerter.map(o =>
    `<span><span class="punkt" style="background:${o.farbe}"></span>${o.glyph} ${o.kuerzel}</span>`).join("") +
    `<span><span class="punkt" style="background:var(--rot)"></span>XI Spitze</span>`;
  radKutu.appendChild(legende);
  cikti.appendChild(radKutu);

  /* -------------------------------------------- der Regent des Hauses */
  cikti.appendChild(el("h3", null, "Der Regent des 11. Hauses"));
  cikti.appendChild(el("p", "kucukNot",
    "Eine zweite, vom Namen unabhängige Aussage: wer über das Haus des guten Geistes gebietet. " +
    `Spitze XI nach Ganzzeichen: ${ZEICHEN[c11Sign].glyph} ${ZEICHEN[c11Sign].name} ${ascGrad.toFixed(1)}°.`));

  const karte = el("div", "almutenKarte");
  karte.append(
    el("div", "kalanBaslik", "Almuten des 11. Hauses"),
    (() => { const d = el("div", "almutenPlanet");
      d.innerHTML = `<span class="glyph">${almuten.g}</span>${almuten.name}`; return d; })(),
    el("div", "kucukNot", `${scores[almutenKey].total} Würdepunkte auf ${ZEICHEN[c11Sign].glyph} ${ZEICHEN[c11Sign].name} ${ascGrad.toFixed(1)}°`)
  );
  cikti.appendChild(karte);

  const wTablo = el("div", "tabloKutu");
  const wTab = el("table", "wuerdeTablo");
  wTab.innerHTML = "<thead><tr><th>Planet</th><th>Dom.</th><th>Ex.</th><th>Trigon</th><th>Term</th><th>Gesicht</th><th>Summe</th></tr></thead>";
  const wBody = el("tbody");
  PLANETEN_REIHE.forEach(p => {
    const s = scores[p];
    const tr = el("tr", p === almutenKey ? "sieger" : null);
    tr.appendChild(el("td", null, `${PLANETEN[p].g} ${PLANETEN[p].name}`));
    [["dom",5], ["ex",4], ["tri",3], ["term",2], ["face",1]].forEach(([k, pkt]) => {
      tr.appendChild(el("td", s[k] ? "treffer" : null, s[k] ? String(pkt) : "–"));
    });
    tr.appendChild(el("td", "summe", String(s.total)));
    wBody.appendChild(tr);
  });
  wTab.appendChild(wBody);
  wTablo.appendChild(wTab);
  cikti.appendChild(wTablo);

  /* Zum Ergebnis führen — und nicht irgendwohin mittendrin. */
  nameBox.scrollIntoView({ block: "center", behavior: "smooth" });
});
