/* ------------------------------------------------------------------------
   profektionen.js — jährliche und monatliche Profektionen (hellenistische
   Zeitherren-Technik, Vettius Valens u. a.).

   Nicht die Planeten wandern, sondern die Häuser: mit jedem Lebensjahr
   rückt die Zählung um ein Zeichen weiter — Jahr 0 (Geburt) steht das
   Zeichen des Aszendenten selbst auf dem I. Haus, Jahr 1 das nächste, Jahr
   2 das übernächste, und so fort, in Ganzzeichen-Häusern. Der Herrscher des
   profizierten I. Hauses ist der "Herr des Jahres" (κύριος τοῦ ἐνιαυτοῦ).
   Innerhalb eines Jahres profizieren die zwölf Monate auf dieselbe Weise
   weiter, beim Zeichen des Jahres beginnend.
   --------------------------------------------------------------------- */
import { berechneGeburt, norm360 } from "./astro.js?v=30";
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=30";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };
const rad = d => d * Math.PI / 180;

const ZEICHEN = [
  { name:"Widder", glyph:"♈" }, { name:"Stier", glyph:"♉" }, { name:"Zwillinge", glyph:"♊" },
  { name:"Krebs", glyph:"♋" }, { name:"Löwe", glyph:"♌" }, { name:"Jungfrau", glyph:"♍" },
  { name:"Waage", glyph:"♎" }, { name:"Skorpion", glyph:"♏" }, { name:"Schütze", glyph:"♐" },
  { name:"Steinbock", glyph:"♑" }, { name:"Wassermann", glyph:"♒" }, { name:"Fische", glyph:"♓" }
];
const DOMIZIL = ["mars","venus","merkur","mond","sonne","merkur","venus","mars","jupiter","saturn","saturn","jupiter"];
const PLANETEN = {
  sonne:{name:"Sonne", g:"☉"}, mond:{name:"Mond", g:"☽"}, merkur:{name:"Merkur", g:"☿"},
  venus:{name:"Venus", g:"♀"}, mars:{name:"Mars", g:"♂"}, jupiter:{name:"Jupiter", g:"♃"}, saturn:{name:"Saturn", g:"♄"}
};
const FARBEN = { sonne:"#e7c65c", mond:"#cfd6e6", merkur:"#9fbfa8", venus:"#e0a6c2", mars:"#c96a4a", jupiter:"#7fa6d6", saturn:"#8b8471" };
const HAUSNAMEN = ["I. Leib und Leben","II. Habe","III. Geschwister und Wege","IV. Haus und Wurzel",
  "V. Kinder und Freude","VI. Krankheit und Dienst","VII. Partner und offene Gegner","VIII. Tod und das Fremde",
  "IX. Fernes und Glaube","X. Amt und Ruf","XI. Freunde und Hoffnung","XII. Verborgenes und Kummer"];
const ROEMISCH = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];

function polar(deg, r, cx, cy) {
  const a = rad(deg - 90);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

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

function baueRad(ascSign, profSign) {
  const cx = 160, cy = 160, rA = 150, rI = 96;
  const t = [`<svg viewBox="0 0 320 320" role="img" aria-label="Profektionsrad">`];
  t.push(`<circle cx="${cx}" cy="${cy}" r="${rA}" fill="none" stroke="var(--linie)" stroke-width="1"/>`);
  t.push(`<circle cx="${cx}" cy="${cy}" r="${rI}" fill="none" stroke="var(--linie)" stroke-width="1"/>`);
  for (let i = 0; i < 12; i++) {
    const p1 = polar(i * 30, rI, cx, cy), p2 = polar(i * 30, rA, cx, cy);
    t.push(`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="var(--linie)" stroke-width="1"/>`);
    if (i === profSign) {
      const pts = [polar(i*30, rI, cx, cy), polar(i*30, rA, cx, cy), polar((i+1)*30, rA, cx, cy), polar((i+1)*30, rI, cx, cy)];
      t.push(`<path d="M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} L ${pts[1].x.toFixed(1)} ${pts[1].y.toFixed(1)} A ${rA} ${rA} 0 0 1 ${pts[2].x.toFixed(1)} ${pts[2].y.toFixed(1)} L ${pts[3].x.toFixed(1)} ${pts[3].y.toFixed(1)} A ${rI} ${rI} 0 0 0 ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} Z" fill="var(--ton)" opacity=".2"/>`);
    }
    const hausNr = (i - ascSign + 12) % 12;
    const lz = polar(i * 30 + 15, rA - 14, cx, cy);
    t.push(`<text x="${lz.x.toFixed(2)}" y="${lz.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="13" fill="${i === profSign ? "var(--ton-hell)" : "var(--gedaempft)"}">${ZEICHEN[i].glyph}</text>`);
    const lh = polar(i * 30 + 15, (rA + rI) / 2 - 2, cx, cy);
    t.push(`<text x="${lh.x.toFixed(2)}" y="${lh.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="11" fill="${i === profSign ? "var(--ton-hell)" : "var(--schrift)"}">${ROEMISCH[hausNr]}</text>`);
    if (i === ascSign) {
      const la = polar(i * 30, rA + 14, cx, cy);
      t.push(`<text x="${la.x.toFixed(2)}" y="${la.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="9" fill="var(--ton)">ASC</text>`);
    }
  }
  if (profSign !== ascSign) {
    const pfeil = polar(profSign * 30 + 15, rI + 10, cx, cy);
    t.push(`<text x="${pfeil.x.toFixed(2)}" y="${pfeil.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="9" fill="var(--ton-hell)">I. Jahr</text>`);
  }
  t.push("</svg>");
  return t.join("");
}

let GEBURT = null, ASC_SIGN = 0;

function zeigeAlter(alterJahre) {
  const jahr = Math.floor(alterJahre);
  const monatAnteil = alterJahre - jahr;
  const monat = Math.floor(monatAnteil * 12);

  const profSign = (ASC_SIGN + jahr) % 12;
  const herr = DOMIZIL[profSign];
  const profMonatSign = (profSign + monat) % 12;
  const herrMonat = DOMIZIL[profMonatSign];

  $("#pfAblesung").innerHTML =
    `<b>Alter ${jahr} Jahre, Monat ${monat + 1}</b><br>` +
    `Jahr: ${ZEICHEN[profSign].glyph} ${ZEICHEN[profSign].name} — Herr des Jahres ${PLANETEN[herr].g} ${PLANETEN[herr].name} · ` +
    `Monat: ${ZEICHEN[profMonatSign].glyph} ${ZEICHEN[profMonatSign].name} (${PLANETEN[herrMonat].g} ${PLANETEN[herrMonat].name})`;

  $("#pfRad").innerHTML = baueRad(ASC_SIGN, profSign);

  const monatsStreifen = $("#pfMonate");
  monatsStreifen.innerHTML = "";
  for (let m = 0; m < 12; m++) {
    const s = (profSign + m) % 12;
    const zelle = el("div", "harfZelle" + (m === monat ? " treffer" : ""));
    zelle.style.borderColor = FARBEN[DOMIZIL[s]];
    zelle.append(el("div", "g", ZEICHEN[s].glyph), el("div", null, `M${m + 1}`));
    monatsStreifen.appendChild(zelle);
  }

  const haeuser = $("#pfHaeuser");
  haeuser.innerHTML = "";
  for (let h = 0; h < 12; h++) {
    const s = (profSign + h) % 12;
    const zeile = el("div", "kalanKutu");
    zeile.style.borderColor = FARBEN[DOMIZIL[s]];
    zeile.append(
      el("div", "kalanBaslik", HAUSNAMEN[h]),
      el("div", "kalanDeger", `${ZEICHEN[s].glyph} ${ZEICHEN[s].name}`),
      el("div", "kalanAd", `${PLANETEN[DOMIZIL[s]].g} ${PLANETEN[DOMIZIL[s]].name}`)
    );
    haeuser.appendChild(zeile);
  }
}

function zeichneZeitleiste(maxAlter) {
  const breite = 640, hoehe = 60, padL = 24, padR = 24;
  const x = alter => padL + (alter / maxAlter) * (breite - padL - padR);
  const alterVonX = px => Math.max(0, Math.min(maxAlter - 0.001, ((px - padL) / (breite - padL - padR)) * maxAlter));

  const t = [`<svg id="pfSvg" viewBox="0 0 ${breite} ${hoehe}" role="img" aria-label="Profektions-Zeitleiste" style="touch-action:none;">`];
  for (let j = 0; j < maxAlter; j++) {
    const s = (ASC_SIGN + j) % 12;
    const x1 = x(j), x2 = x(j + 1);
    t.push(`<rect x="${x1.toFixed(1)}" y="6" width="${(x2 - x1).toFixed(1)}" height="24" fill="${FARBEN[DOMIZIL[s]]}" opacity=".8" stroke="var(--grund)" stroke-width=".5"/>`);
    if (x2 - x1 > 9) t.push(`<text x="${((x1+x2)/2).toFixed(1)}" y="19" text-anchor="middle" dominant-baseline="middle" font-size="9" fill="var(--grund)">${ZEICHEN[s].glyph}</text>`);
  }
  for (let a = 0; a <= maxAlter; a += 10) {
    const px = x(a);
    t.push(`<line x1="${px}" y1="30" x2="${px}" y2="34" stroke="var(--linie)" stroke-width="1"/>`);
    t.push(`<text x="${px}" y="45" text-anchor="middle" font-size="9" fill="var(--gedaempft)">${a}</text>`);
  }
  t.push(`<line id="pfSchieber" x1="${x(0)}" y1="2" x2="${x(0)}" y2="32" stroke="var(--ton-hell)" stroke-width="2"/>`);
  t.push(`<circle id="pfGriff" cx="${x(0)}" cy="2" r="5" fill="var(--ton-hell)"/>`);
  t.push("</svg>");
  $("#pfZeitleiste").innerHTML = t.join("");

  const svg = $("#pfSvg");
  let ziehen = false;
  function schieberAuf(clientX) {
    const rect = svg.getBoundingClientRect();
    const relX = (clientX - rect.left) / rect.width * breite;
    const alter = alterVonX(relX);
    const px = x(alter);
    $("#pfSchieber").setAttribute("x1", px); $("#pfSchieber").setAttribute("x2", px);
    $("#pfGriff").setAttribute("cx", px);
    zeigeAlter(alter);
  }
  svg.addEventListener("pointerdown", e => { ziehen = true; svg.setPointerCapture(e.pointerId); schieberAuf(e.clientX); });
  svg.addEventListener("pointermove", e => { if (ziehen) schieberAuf(e.clientX); });
  svg.addEventListener("pointerup", () => { ziehen = false; });
  svg.addEventListener("pointercancel", () => { ziehen = false; });
}

function berechne() {
  const cikti = $("#pfCikti");
  const p = leseProfil();
  if (!p) { cikti.hidden = true; return; }

  const [jahr, monat, tag] = p.datum.split("-").map(Number);
  const [stunde, minute] = p.zeit.split(":").map(Number);
  GEBURT = berechneGeburt(jahr, monat, tag, stunde, minute, p.utc, p.breite, p.laenge);
  ASC_SIGN = Math.floor(norm360(GEBURT.asc) / 30);

  const maxAlter = Math.max(10, parseInt($("#pfMaxAlter").value, 10) || 90);

  cikti.hidden = false;
  cikti.innerHTML = "";
  cikti.appendChild(el("p", "kucukNot", `Aszendent (Jahr 0) — ${ZEICHEN[ASC_SIGN].glyph} ${ZEICHEN[ASC_SIGN].name}. Ganzzeichen-Häuser.`));

  const zlKutu = el("div", "zeitleisteKutu");
  const zlDiv = el("div"); zlDiv.id = "pfZeitleiste";
  const ablesung = el("div", "zeitleisteAblesung"); ablesung.id = "pfAblesung";
  zlKutu.append(zlDiv, ablesung);
  cikti.appendChild(zlKutu);

  const radKutu = el("div", "radKutu"); radKutu.id = "pfRad";
  cikti.appendChild(radKutu);

  cikti.appendChild(el("div", "harfStreifenTitel", "Die zwölf Monate des laufenden Jahres"));
  const monatsStreifen = el("div", "harfStreifen"); monatsStreifen.id = "pfMonate";
  cikti.appendChild(monatsStreifen);

  cikti.appendChild(el("h3", null, "Alle zwölf profizierten Häuser"));
  const haeuser = el("div", "kalanlar"); haeuser.id = "pfHaeuser";
  cikti.appendChild(haeuser);

  zeichneZeitleiste(maxAlter);
  zeigeAlter(0);
}

$("#pfBerechnen").addEventListener("click", berechne);
aufProfilAenderung(() => renderProfilAnzeige($("#pfProfilAnzeige")));
document.querySelector('nav#reiter button[data-bolum="bProfektionen"]')?.addEventListener("click", () => {
  renderProfilAnzeige($("#pfProfilAnzeige"));
});
renderProfilAnzeige($("#pfProfilAnzeige"));
