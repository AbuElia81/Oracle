/* ------------------------------------------------------------------------
   antiszien.js — Antiszien und Kontra-Antiszien, die "Schatten" der
   hellenistischen Astrologie.

   Antiszion: der Punkt der Ekliptik mit derselben Deklination, gespiegelt
   an der Sonnwendachse (0° Krebs/0° Steinbock) — gleiche Sonnenhöhe,
   gleiche Tageslänge, gleicher Auf-/Untergangspunkt am selben Ort.
   Formel: antiszion(λ) = 180° − λ.
   Kontra-Antiszion: gespiegelt an der Äquinoktialachse (0° Widder/0° Waage)
   — entgegengesetzte Deklination, Tag und Nacht vertauscht.
   Formel: kontra(λ) = 360° − λ = antiszion(λ) + 180°.
   --------------------------------------------------------------------- */
import { julianischesDatum, schiefeDerEkliptik, sonnenLaenge, berechneGeburt, norm360, rad, grad } from "./astro.js?v=50";
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=50";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const ZEICHEN = [
  { name:"Widder", glyph:"♈" }, { name:"Stier", glyph:"♉" }, { name:"Zwillinge", glyph:"♊" },
  { name:"Krebs", glyph:"♋" }, { name:"Löwe", glyph:"♌" }, { name:"Jungfrau", glyph:"♍" },
  { name:"Waage", glyph:"♎" }, { name:"Skorpion", glyph:"♏" }, { name:"Schütze", glyph:"♐" },
  { name:"Steinbock", glyph:"♑" }, { name:"Wassermann", glyph:"♒" }, { name:"Fische", glyph:"♓" }
];
const PLANETEN = {
  sonne:{name:"Sonne", g:"☉"}, mond:{name:"Mond", g:"☽"}, merkur:{name:"Merkur", g:"☿"},
  venus:{name:"Venus", g:"♀"}, mars:{name:"Mars", g:"♂"}, jupiter:{name:"Jupiter", g:"♃"},
  saturn:{name:"Saturn", g:"♄"}, asc:{name:"Aszendent", g:"ASC"}, mc:{name:"MC", g:"MC"}
};
const PLANETEN_REIHE = ["sonne","mond","merkur","venus","mars","jupiter","saturn","asc","mc"];
const FARBEN = {
  sonne:"#e7c65c", mond:"#cfd6e6", merkur:"#9fbfa8", venus:"#e0a6c2",
  mars:"#c96a4a", jupiter:"#7fa6d6", saturn:"#8b8471", asc:"#e7c65c", mc:"#c9a227"
};

const antiszion = laenge => norm360(180 - laenge);
const kontraAntiszion = laenge => norm360(360 - laenge);
const deklinationVonLaenge = (laenge, schiefeGrad) => grad(Math.asin(Math.sin(rad(schiefeGrad)) * Math.sin(rad(laenge))));

function zeichenGrad(l) {
  const i = Math.floor(norm360(l) / 30);
  return `${ZEICHEN[i].glyph} ${(norm360(l) - i * 30).toFixed(1)}°`;
}

/* Julianisches Datum, an dem die Sonne eine bestimmte Länge erreicht — per
   einfacher Fixpunkt-Iteration über die mittlere tägliche Bewegung
   (~0,9856°/Tag). Die Startschätzung `jdSchaetzung` muss nur ungefähr im
   selben Halbjahr liegen; wenige Schritte reichen zur Konvergenz. */
function jdFuerSonnenlaenge(zielLaenge, jdSchaetzung) {
  let jd = jdSchaetzung;
  for (let i = 0; i < 10; i++) {
    const diff = ((zielLaenge - sonnenLaenge(jd) + 180) % 360 + 360) % 360 - 180;
    jd += diff / 0.9856076686;
  }
  return jd;
}

/* Grobe gregorianische Kalenderumrechnung (Meeus 7.1), für die Anzeige. */
function jdZuDatum(jd) {
  const z = Math.floor(jd + 0.5), f = jd + 0.5 - z;
  let a = z;
  if (z >= 2299161) { const alpha = Math.floor((z - 1867216.25) / 36524.25); a = z + 1 + alpha - Math.floor(alpha / 4); }
  const b = a + 1524, c = Math.floor((b - 122.1) / 365.25), d = Math.floor(365.25 * c), e = Math.floor((b - d) / 30.6001);
  const tagDez = b - d - Math.floor(30.6001 * e) + f;
  const monat = e < 14 ? e - 1 : e - 13;
  const jahr = monat > 2 ? c - 4716 : c - 4715;
  return { jahr, monat, tag: Math.floor(tagDez) };
}
const MONATSNAMEN = ["", "Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const datumText = d => `${d.tag}. ${MONATSNAMEN[d.monat]}`;

function tageslaenge(deklinationGrad, breiteGrad) {
  const t = -Math.tan(rad(breiteGrad)) * Math.tan(rad(deklinationGrad));
  if (t <= -1) return 24; if (t >= 1) return 0;
  return 2 * grad(Math.acos(t)) / 15;
}

/* --------------------------------------------------------------- Räder */
function polar(deg, r, cx, cy) {
  const a = rad(deg - 90);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function baueGrundring(cx, cy, rAussen, rInnen, achsenZeigen) {
  const t = [];
  t.push(`<circle cx="${cx}" cy="${cy}" r="${rAussen}" fill="none" stroke="var(--linie)" stroke-width="1"/>`);
  t.push(`<circle cx="${cx}" cy="${cy}" r="${rInnen}" fill="none" stroke="var(--linie)" stroke-width="1"/>`);
  for (let i = 0; i < 12; i++) {
    const p1 = polar(i * 30, rInnen, cx, cy), p2 = polar(i * 30, rAussen, cx, cy);
    t.push(`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="var(--linie)" stroke-width="1"/>`);
    const lp = polar(i * 30 + 15, (rAussen + rInnen) / 2, cx, cy);
    t.push(`<text x="${lp.x.toFixed(2)}" y="${lp.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="11" fill="var(--gedaempft)">${ZEICHEN[i].glyph}</text>`);
  }
  if (achsenZeigen) {
    const s1 = polar(90, rInnen, cx, cy), s2 = polar(270, rInnen, cx, cy);
    t.push(`<line x1="${s1.x.toFixed(2)}" y1="${s1.y.toFixed(2)}" x2="${s2.x.toFixed(2)}" y2="${s2.y.toFixed(2)}" stroke="var(--ton)" stroke-width="1" stroke-dasharray="2 3" opacity=".6"/>`);
    const e1 = polar(0, rInnen, cx, cy), e2 = polar(180, rInnen, cx, cy);
    t.push(`<line x1="${e1.x.toFixed(2)}" y1="${e1.y.toFixed(2)}" x2="${e2.x.toFixed(2)}" y2="${e2.y.toFixed(2)}" stroke="var(--rot)" stroke-width="1" stroke-dasharray="2 3" opacity=".5"/>`);
  }
  return t.join("");
}

function zeiger(deg, rVon, rBis, cx, cy, farbe, breite, label) {
  const t = [];
  const p1 = polar(deg, rVon, cx, cy), p2 = polar(deg, rBis, cx, cy);
  t.push(`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="${farbe}" stroke-width="${breite}"/>`);
  if (label) {
    const lp = polar(deg, rVon - 12, cx, cy);
    t.push(`<text x="${lp.x.toFixed(2)}" y="${lp.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="11" fill="${farbe}">${label}</text>`);
  }
  return t.join("");
}

/* ------------------------------------------------ A. Schattenzwilling */
function berechneSchattenzwilling() {
  const cikti = $("#azKalenderCikti");
  const datumStr = $("#azDatum").value;
  if (!datumStr) { cikti.hidden = true; return; }
  const [jahr, monat, tag] = datumStr.split("-").map(Number);
  const jd0 = julianischesDatum(jahr, monat, tag, 12);
  const eps = schiefeDerEkliptik(jd0);
  const l0 = sonnenLaenge(jd0);
  const dek0 = deklinationVonLaenge(l0, eps);

  const lAnt = antiszion(l0);
  const jdAnt = jdFuerSonnenlaenge(lAnt, jd0);
  const dAnt = jdZuDatum(jdAnt);

  const lKon = kontraAntiszion(l0);
  const jdKon = jdFuerSonnenlaenge(lKon, jd0);
  const dKon = jdZuDatum(jdKon);

  cikti.hidden = false;
  cikti.innerHTML = "";

  const breite = parseFloat($("#pBreite")?.value);
  const profil = leseProfil();
  const ortBreite = !isNaN(breite) ? breite : (profil ? profil.breite : null);

  const karten = el("div", "kalanlar");
  const karte = (titel, datumTxt, laenge, dek, farbe, zusatz) => {
    const k = el("div", "kalanKutu");
    k.style.borderColor = farbe;
    k.append(
      el("div", "kalanBaslik", titel),
      el("div", "kalanDeger", datumTxt),
      el("div", "kalanAd", zeichenGrad(laenge)),
      el("div", "kalanAd", `Deklination ${dek >= 0 ? "+" : ""}${dek.toFixed(1)}°`)
    );
    if (zusatz) k.appendChild(el("div", "kalanAd", zusatz));
    return k;
  };
  const tagLaenge = ortBreite !== null ? `Taglänge ${tageslaenge(dek0, ortBreite).toFixed(1)} h (Breite ${ortBreite.toFixed(1)}°)` : "";
  const tagLaengeKon = ortBreite !== null ? `Taglänge ${tageslaenge(-dek0, ortBreite).toFixed(1)} h` : "";
  karten.append(
    karte("Eingegebenes Datum", `${tag}. ${MONATSNAMEN[monat]} ${jahr}`, l0, dek0, "var(--ton-hell)", tagLaenge),
    karte("Antiszion — der Schattenzwilling", datumText(dAnt), lAnt, deklinationVonLaenge(lAnt, eps), "#7fb08a", tagLaenge),
    karte("Kontra-Antiszion", datumText(dKon), lKon, deklinationVonLaenge(lKon, eps), "var(--rot)", tagLaengeKon)
  );
  cikti.appendChild(karten);

  const radKutu = el("div", "radKutu");
  const cx = 150, cy = 150, rA = 142, rI = 112, rZ = 96;
  const svg = [`<svg viewBox="0 0 300 300" role="img" aria-label="Jahresrad mit Antiszion und Kontra-Antiszion">`];
  svg.push(baueGrundring(cx, cy, rA, rI, true));
  svg.push(zeiger(90, rI - 14, rA + 4, cx, cy, "var(--ton)", 1, "☀︎ SoWe"));
  svg.push(zeiger(270, rI - 14, rA + 4, cx, cy, "var(--ton)", 1, "☀︎ WiWe"));
  svg.push(zeiger(l0, 0, rI, cx, cy, "var(--ton-hell)", 2.4));
  svg.push(zeiger(lAnt, 0, rI, cx, cy, "#7fb08a", 2.4));
  svg.push(zeiger(lKon, 0, rI, cx, cy, "var(--rot)", 2.4));
  const p1 = polar(l0, rZ, cx, cy), p2 = polar(lAnt, rZ, cx, cy), p3 = polar(lKon, rZ, cx, cy);
  svg.push(`<path d="M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}" fill="none" stroke="#7fb08a" stroke-width="1" stroke-dasharray="3 3" opacity=".6"/>`);
  svg.push(`<path d="M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}" fill="none" stroke="var(--rot)" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>`);
  svg.push("</svg>");
  radKutu.innerHTML = svg.join("");
  const legende = el("div", "radLegende");
  legende.innerHTML =
    `<span><span class="punkt" style="background:var(--ton-hell)"></span>Eingabe</span>` +
    `<span><span class="punkt" style="background:#7fb08a"></span>Antiszion</span>` +
    `<span><span class="punkt" style="background:var(--rot)"></span>Kontra-Antiszion</span>` +
    `<span><span class="punkt" style="background:var(--ton)"></span>Sonnwendachse</span>`;
  radKutu.appendChild(legende);
  cikti.appendChild(radKutu);
}

$("#azBerechnen").addEventListener("click", berechneSchattenzwilling);
(function vorbelegen() {
  const feld = $("#azDatum");
  const profil = leseProfil();
  if (profil && profil.datum) feld.value = profil.datum;
  else feld.valueAsDate = new Date();
  berechneSchattenzwilling();
})();

/* ------------------------------------------------ B. Im Horoskop */
function renderProfilAnzeige(container) {
  const p = leseProfil();
  container.innerHTML = "";
  if (!p) {
    const w = el("p", "kucukNot", "Noch keine Geburtsdaten hinterlegt. ");
    const btn = el("button", "knopfKlein", "Zur Dateneingabe");
    btn.type = "button";
    btn.addEventListener("click", zurDateneingabe);
    w.appendChild(btn);
    container.appendChild(w);
    return null;
  }
  container.appendChild(el("p", "kucukNot", "Für: " + profilBeschriftung(p)));
  return p;
}

function berechneHoroskopAntiszien() {
  const cikti = $("#azHoroskopCikti");
  const p = leseProfil();
  if (!p) { cikti.hidden = true; return; }

  const [jahr, monat, tag] = p.datum.split("-").map(Number);
  const [stunde, minute] = p.zeit.split(":").map(Number);
  const geburt = berechneGeburt(jahr, monat, tag, stunde, minute, p.utc, p.breite, p.laenge);

  const punkte = {};
  PLANETEN_REIHE.forEach(k => {
    const laenge = k === "asc" ? geburt.asc : k === "mc" ? geburt.mc : geburt.planeten[k].laenge;
    punkte[k] = { laenge, antiszion: antiszion(laenge), kontra: kontraAntiszion(laenge) };
  });

  const orb = 2.5;
  const treffer = [];
  PLANETEN_REIHE.forEach(a => {
    PLANETEN_REIHE.forEach(b => {
      if (a === b) return;
      const dAnt = Math.min(Math.abs(punkte[a].antiszion - punkte[b].laenge), 360 - Math.abs(punkte[a].antiszion - punkte[b].laenge));
      if (dAnt <= orb) treffer.push({ a, b, art: "Antiszion", abstand: dAnt });
      const dKon = Math.min(Math.abs(punkte[a].kontra - punkte[b].laenge), 360 - Math.abs(punkte[a].kontra - punkte[b].laenge));
      if (dKon <= orb) treffer.push({ a, b, art: "Kontra-Antiszion", abstand: dKon });
    });
  });
  // Jedes Paar nur einmal zeigen (A→B und B→A sind dieselbe Verbindung für Antiszion, symmetrisch).
  const gesehen = new Set();
  const einzigartig = treffer.filter(t => {
    const schluessel = [t.a, t.b].sort().join("|") + t.art;
    if (gesehen.has(schluessel)) return false;
    gesehen.add(schluessel);
    return true;
  });

  cikti.hidden = false;
  cikti.innerHTML = "";

  if (einzigartig.length) {
    cikti.appendChild(el("h3", null, "Verborgene Verbindungen (Orbis 2,5°)"));
    const liste = el("div", "naheDran");
    einzigartig.forEach(t => {
      const chip = el("div", "naheDranItem");
      chip.innerHTML = `${PLANETEN[t.a].g} ${PLANETEN[t.a].name} — ${t.art} von ${PLANETEN[t.b].g} ${PLANETEN[t.b].name} (${t.abstand.toFixed(1)}°)`;
      liste.appendChild(chip);
    });
    cikti.appendChild(liste);
  } else {
    cikti.appendChild(el("p", "kucukNot", "Keine Verbindung innerhalb von 2,5° gefunden."));
  }

  const radKutu = el("div", "radKutu");
  const cx = 160, cy = 160, rA = 150, rI = 118, rP = 100;
  const svg = [`<svg viewBox="0 0 320 320" role="img" aria-label="Horoskoprad mit Antiszien und Kontra-Antiszien">`];
  svg.push(baueGrundring(cx, cy, rA, rI, true));
  PLANETEN_REIHE.forEach(k => {
    const farbe = FARBEN[k];
    svg.push(zeiger(punkte[k].laenge, 0, rI, cx, cy, farbe, 2.2, PLANETEN[k].g));
    svg.push(zeiger(punkte[k].antiszion, rP, rI, cx, cy, "#7fb08a", 1.4));
    svg.push(zeiger(punkte[k].kontra, rP, rI, cx, cy, "var(--rot)", 1.2));
  });
  svg.push("</svg>");
  radKutu.innerHTML = svg.join("");
  const legende = el("div", "radLegende");
  legende.innerHTML =
    `<span><span class="punkt" style="background:var(--ton-hell)"></span>Natal</span>` +
    `<span><span class="punkt" style="background:#7fb08a"></span>Antiszien</span>` +
    `<span><span class="punkt" style="background:var(--rot)"></span>Kontra-Antiszien</span>`;
  radKutu.appendChild(legende);
  cikti.appendChild(radKutu);

  const tablo = el("div", "tabloKutu");
  const tab = el("table");
  tab.innerHTML = "<thead><tr><th>Punkt</th><th>Länge</th><th>Antiszion</th><th>Kontra-Antiszion</th></tr></thead>";
  const tbody = el("tbody");
  PLANETEN_REIHE.forEach(k => {
    const tr = el("tr");
    tr.appendChild(el("td", null, `${PLANETEN[k].g} ${PLANETEN[k].name}`));
    tr.appendChild(el("td", null, zeichenGrad(punkte[k].laenge)));
    tr.appendChild(el("td", null, zeichenGrad(punkte[k].antiszion)));
    tr.appendChild(el("td", null, zeichenGrad(punkte[k].kontra)));
    tbody.appendChild(tr);
  });
  tab.appendChild(tbody);
  tablo.appendChild(tab);
  cikti.appendChild(tablo);
}

$("#azHoroskopBerechnen").addEventListener("click", berechneHoroskopAntiszien);
aufProfilAenderung(() => renderProfilAnzeige($("#azProfilAnzeige")));
document.querySelector('nav#reiter button[data-bolum="bAntiszien"]')?.addEventListener("click", () => {
  renderProfilAnzeige($("#azProfilAnzeige"));
});
renderProfilAnzeige($("#azProfilAnzeige"));
