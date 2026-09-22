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
  const hoehe = sonnenHoehe(ramc, breite, sonne.rektaszension, sonne.deklination);
  return { asc, ramc, eps, sonne, sonnenhoehe: hoehe, tagGeburt: hoehe > 0 };
}

/* -------------------------------------------------------- Tierkreis, Würden */
const ZEICHEN = [
  { name:"Widder", glyph:"♈", el:0 }, { name:"Stier", glyph:"♉", el:1 },
  { name:"Zwillinge", glyph:"♊", el:2 }, { name:"Krebs", glyph:"♋", el:3 },
  { name:"Löwe", glyph:"♌", el:0 }, { name:"Jungfrau", glyph:"♍", el:1 },
  { name:"Waage", glyph:"♎", el:2 }, { name:"Skorpion", glyph:"♏", el:3 },
  { name:"Schütze", glyph:"♐", el:0 }, { name:"Steinbock", glyph:"♑", el:1 },
  { name:"Wassermann", glyph:"♒", el:2 }, { name:"Fische", glyph:"♓", el:3 }
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

const HEBR22 = [
  {g:"א",n:"Aleph"},{g:"ב",n:"Bet"},{g:"ג",n:"Gimel"},{g:"ד",n:"Dalet"},{g:"ה",n:"He"},
  {g:"ו",n:"Vav"},{g:"ז",n:"Zajin"},{g:"ח",n:"Chet"},{g:"ט",n:"Tet"},{g:"י",n:"Jod"},
  {g:"כ",n:"Kaf"},{g:"ל",n:"Lamed"},{g:"מ",n:"Mem"},{g:"נ",n:"Nun"},{g:"ס",n:"Samech"},
  {g:"ע",n:"Ajin"},{g:"פ",n:"Pe"},{g:"צ",n:"Tzade"},{g:"ק",n:"Qof"},{g:"ר",n:"Resch"},
  {g:"ש",n:"Schin"},{g:"ת",n:"Taw"}
];
const HEBR27 = (function () {
  const sofit = { Kaf:"ך", Mem:"ם", Nun:"ן", Pe:"ף", Tzade:"ץ" };
  const out = [];
  HEBR22.forEach(l => { out.push(l); if (sofit[l.n]) out.push({ g: sofit[l.n], n: l.n + "-Sofit" }); });
  return out;
})();

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

function baueRad(ascAbs, cuspAbs) {
  const cx = 130, cy = 130, rAussen = 120, rInnen = 95, rArc = 84, rLabel = 107;
  const offset = norm360(cuspAbs - ascAbs);
  const teile = ['<svg viewBox="0 0 260 260" role="img" aria-label="Tierkreisrad, schematisch">'];

  teile.push(`<circle cx="${cx}" cy="${cy}" r="${rAussen}" fill="none" stroke="var(--linie)" stroke-width="1"/>`);
  teile.push(`<circle cx="${cx}" cy="${cy}" r="${rInnen}" fill="none" stroke="var(--linie)" stroke-width="1"/>`);

  for (let i = 0; i < 12; i++) {
    const p1 = polar(i * 30, rInnen, cx, cy), p2 = polar(i * 30, rAussen, cx, cy);
    teile.push(`<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="var(--linie)" stroke-width="1"/>`);
    const lp = polar(i * 30 + 15, rLabel, cx, cy);
    teile.push(`<text x="${lp.x}" y="${lp.y}" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="var(--gedaempft)">${ZEICHEN[i].glyph}</text>`);
  }

  const a1 = polar(ascAbs, rArc, cx, cy), a2 = polar(cuspAbs, rArc, cx, cy);
  const grossBogen = offset > 180 ? 1 : 0;
  teile.push(`<path d="M ${a1.x} ${a1.y} A ${rArc} ${rArc} 0 ${grossBogen} 1 ${a2.x} ${a2.y}" fill="none" stroke="var(--ton)" stroke-width="5" stroke-linecap="round" opacity="0.55"/>`);

  const ascP1 = polar(ascAbs, rInnen - 12, cx, cy), ascP2 = polar(ascAbs, rAussen + 5, cx, cy);
  teile.push(`<line x1="${ascP1.x}" y1="${ascP1.y}" x2="${ascP2.x}" y2="${ascP2.y}" stroke="var(--ton-hell)" stroke-width="2.2"/>`);
  const ascLbl = polar(ascAbs, rInnen - 23, cx, cy);
  teile.push(`<text x="${ascLbl.x}" y="${ascLbl.y}" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="var(--ton-hell)">ASC</text>`);

  const cP1 = polar(cuspAbs, rInnen - 12, cx, cy), cP2 = polar(cuspAbs, rAussen + 5, cx, cy);
  teile.push(`<line x1="${cP1.x}" y1="${cP1.y}" x2="${cP2.x}" y2="${cP2.y}" stroke="var(--rot)" stroke-width="2.2"/>`);
  const cLbl = polar(cuspAbs, rInnen - 23, cx, cy);
  teile.push(`<text x="${cLbl.x}" y="${cLbl.y}" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="var(--rot)">XI</text>`);

  teile.push("</svg>");
  return teile.join("");
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
$("#gBerechnen").addEventListener("click", () => {
  const cikti = $("#gCikti");
  const datumStr = $("#gDatum").value, zeitStr = $("#gZeit").value;
  const breite = parseFloat($("#gBreite").value), laenge = parseFloat($("#gLaenge").value);
  const utc = parseFloat($("#gUtc").value);

  if (!datumStr || !zeitStr || isNaN(breite) || isNaN(laenge) || isNaN(utc)) {
    cikti.hidden = false;
    cikti.innerHTML = "";
    cikti.appendChild(el("p", "kucukNot", "Geburtsdatum, -zeit, Breite, Länge und UTC-Offset werden alle gebraucht."));
    return;
  }

  const [jahr, monat, tag] = datumStr.split("-").map(Number);
  const [stunde, minute] = zeitStr.split(":").map(Number);
  const name = $("#gName").value.trim();
  const modus27 = document.querySelector('input[name="gModus"]:checked').value === "27";
  const endung = document.querySelector('input[name="gEndung"]:checked').value;

  const geburt = berechneGeburt(jahr, monat, tag, stunde, minute, utc, breite, laenge);
  const ascSign = Math.floor(geburt.asc / 30), ascGrad = geburt.asc - ascSign * 30;
  const c11Sign = (ascSign + 10) % 12, c11Grad = ascGrad;
  const cuspAbs = c11Sign * 30 + c11Grad;

  const scores = wuerden(c11Sign, c11Grad, geburt.tagGeburt);
  const almutenKey = ermittleAlmuten(scores);
  const almuten = PLANETEN[almutenKey];

  const offset = norm360(cuspAbs - geburt.asc);
  const gradZahl = Math.floor(offset);
  const alphabet = modus27 ? HEBR27 : HEBR22;
  const zyklus = alphabet.length;
  const buchstabe = alphabet[gradZahl % zyklus];
  const endungText = endung === "el" ? "-El" : (endung === "jah" ? "-Jah" : "");
  const geistname = buchstabe.n + endungText;

  cikti.hidden = false;
  cikti.innerHTML = "";

  if (name) cikti.appendChild(el("h2", null, `Der Geist von ${name}`));

  const kopfNot = el("p", "kucukNot",
    `Aszendent ${ZEICHEN[ascSign].glyph} ${ZEICHEN[ascSign].name} ${ascGrad.toFixed(1)}° · ` +
    `Spitze XI ${ZEICHEN[c11Sign].glyph} ${ZEICHEN[c11Sign].name} ${c11Grad.toFixed(1)}° (Ganzzeichen) · ` +
    `${geburt.tagGeburt ? "Taggeburt" : "Nachtgeburt"} (Sonnenhöhe ${geburt.sonnenhoehe.toFixed(1)}°)`);
  cikti.appendChild(kopfNot);

  const karte = el("div", "almutenKarte");
  karte.append(
    el("div", "kalanBaslik", "Almuten des 11. Hauses"),
    (() => { const d = el("div", "almutenPlanet");
      d.innerHTML = `<span class="glyph">${almuten.g}</span>${almuten.name}`; return d; })(),
    el("div", "kucukNot", `${scores[almutenKey].total} Würdepunkte auf ${ZEICHEN[c11Sign].glyph} ${ZEICHEN[c11Sign].name} ${c11Grad.toFixed(1)}°`)
  );
  cikti.appendChild(karte);

  const tablo = el("div", "tabloKutu");
  const tab = el("table", "wuerdeTablo");
  tab.innerHTML = "<thead><tr><th>Planet</th><th>Dom.</th><th>Ex.</th><th>Trigon</th><th>Term</th><th>Gesicht</th><th>Summe</th></tr></thead>";
  const tbody = el("tbody");
  PLANETEN_REIHE.forEach(p => {
    const s = scores[p];
    const tr = el("tr", p === almutenKey ? "sieger" : null);
    tr.appendChild(el("td", null, `${PLANETEN[p].g} ${PLANETEN[p].name}`));
    [["dom",5], ["ex",4], ["tri",3], ["term",2], ["face",1]].forEach(([k, pkt]) => {
      tr.appendChild(el("td", s[k] ? "treffer" : null, s[k] ? String(pkt) : "–"));
    });
    tr.appendChild(el("td", "summe", String(s.total)));
    tbody.appendChild(tr);
  });
  tab.appendChild(tbody);
  tablo.appendChild(tab);
  cikti.appendChild(tablo);

  const radKutu = el("div", "radKutu");
  radKutu.innerHTML = baueRad(geburt.asc, cuspAbs);
  const legende = el("div", "radLegende");
  legende.innerHTML =
    `<span><span class="punkt" style="background:var(--ton-hell)"></span>Aszendent</span>` +
    `<span><span class="punkt" style="background:var(--rot)"></span>Spitze XI</span>` +
    `<span><span class="punkt" style="background:var(--ton);opacity:.55"></span>gezählter Bogen (${gradZahl}°)</span>`;
  radKutu.appendChild(legende);
  cikti.appendChild(radKutu);

  cikti.appendChild(el("div", "harfStreifenTitel", `Buchstaben-Kreis (${zyklus}-Modus) — die letzten Schritte der Zählung`));
  const streifen = el("div", "harfStreifen");
  const anzahl = Math.min(gradZahl + 1, zyklus);
  for (let k = anzahl - 1; k >= 0; k--) {
    const idx = ((gradZahl - k) % zyklus + zyklus) % zyklus;
    const l = alphabet[idx];
    const zelle = el("div", "harfZelle" + (k === 0 ? " treffer" : ""));
    zelle.append(el("div", "g", l.g), el("div", null, l.n));
    streifen.appendChild(zelle);
  }
  cikti.appendChild(streifen);
  const treffer = streifen.querySelector(".treffer");
  if (treffer) treffer.scrollIntoView({ inline: "end", block: "nearest" });

  const nameBox = el("div", "geistName");
  nameBox.append(
    el("div", "kalanBaslik", "Abgeleiteter Geistname"),
    (() => { const d = el("div", "buyukToplam");
      d.innerHTML = `${geistname}<span class="buchstabe">${buchstabe.g}</span>`; return d; })()
  );
  cikti.appendChild(nameBox);
});
