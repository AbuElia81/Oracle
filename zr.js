/* ------------------------------------------------------------------------
   zr.js — Zodiacal Releasing (Vettius Valens, in der Neuzeit vor allem durch
   Robert Hand erschlossen). Von einem Los werden die zwölf Zeichen der Reihe
   nach "freigesetzt", jedes für die kleineren Jahre seines Herrschers; jede
   Stufe verschachtelt dieselbe Zählung anteilig in sich selbst.

   Umgesetzt: L1–L3, die Verdopplungsregel (Herrscher der Periode steht
   selbst in einem seiner eigenen Zeichen). NICHT umgesetzt: die "Lösung des
   Bandes" — siehe Transparenzabschnitt im HTML.
   --------------------------------------------------------------------- */
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=45";
import { berechneGeburt, norm360 } from "./astro.js?v=45";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

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
const KLEINE_JAHRE = { mond:25, sonne:19, merkur:20, venus:8, mars:15, jupiter:12, saturn:30 };
const FARBEN = { sonne:"#e7c65c", mond:"#cfd6e6", merkur:"#9fbfa8", venus:"#e0a6c2", mars:"#c96a4a", jupiter:"#7fa6d6", saturn:"#8b8471" };

const SIGN_JAHRE = DOMIZIL.map(p => KLEINE_JAHRE[p]);
const GESAMT_JAHRE = SIGN_JAHRE.reduce((a, b) => a + b, 0); // 214

function losDesGlueck(asc, sonne, mond, tagGeburt) {
  return norm360(tagGeburt ? asc + mond - sonne : asc + sonne - mond);
}
function losDesGeist(asc, sonne, mond, tagGeburt) {
  return norm360(tagGeburt ? asc + sonne - mond : asc + mond - sonne);
}

/* Planeten, die natal in einem ihrer eigenen Zeichen stehen — die Zeichen,
   deren Perioden dadurch verdoppelt werden. */
function ermittleVerdopplung(geburt) {
  const verdoppelt = new Array(12).fill(false);
  ["sonne","mond","merkur","venus","mars","jupiter","saturn"].forEach(p => {
    const signIdx = Math.floor(norm360(geburt.planeten[p].laenge) / 30);
    if (DOMIZIL[signIdx] === p) {
      DOMIZIL.forEach((herr, i) => { if (herr === p) verdoppelt[i] = true; });
    }
  });
  return verdoppelt;
}

/* Erzeugt die Perioden einer Stufe, rekursiv bis maxLevel, begrenzt auf das
   Anzeigefenster [0, kappe] Jahre. */
function erzeugePerioden(startSign, laengeElternperiode, startAlter, level, pfad, verdoppelt, maxLevel, kappe, out) {
  let cursor = startAlter;
  for (let k = 0; k < 12; k++) {
    if (cursor >= kappe) break;
    const signIdx = (startSign + k) % 12;
    let laenge = level === 1 ? SIGN_JAHRE[signIdx] : laengeElternperiode * SIGN_JAHRE[signIdx] / GESAMT_JAHRE;
    const istVerdoppelt = verdoppelt[signIdx];
    if (istVerdoppelt) laenge *= 2;
    const periode = { signIdx, level, startAlter: cursor, endAlter: cursor + laenge, laenge, verdoppelt: istVerdoppelt, pfad: [...pfad, signIdx] };
    out.push(periode);
    if (level < maxLevel && cursor < kappe) {
      erzeugePerioden(signIdx, laenge, cursor, level + 1, periode.pfad, verdoppelt, maxLevel, Math.min(kappe, periode.endAlter), out);
    }
    cursor += laenge;
  }
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

function zeichnenBaender(container, perioden, maxAlter, maxLevel, onScrub) {
  const breite = 640, reihenHoehe = 26, padL = 24, padR = 24, padT = 10;
  const hoehe = padT + maxLevel * reihenHoehe + 28;
  const x = alter => padL + (alter / maxAlter) * (breite - padL - padR);
  const alterVonX = px => Math.max(0, Math.min(maxAlter, ((px - padL) / (breite - padL - padR)) * maxAlter));

  const teile = [`<svg id="zrSvg" viewBox="0 0 ${breite} ${hoehe}" role="img" aria-label="Zodiacal-Releasing-Zeitleiste" style="touch-action:none;">`];

  for (let lvl = 1; lvl <= maxLevel; lvl++) {
    const y = padT + (lvl - 1) * reihenHoehe;
    perioden.filter(p => p.level === lvl).forEach(p => {
      const x1 = x(p.startAlter), x2 = x(Math.min(p.endAlter, maxAlter));
      const farbe = FARBEN[DOMIZIL[p.signIdx]];
      teile.push(`<rect x="${x1.toFixed(1)}" y="${y}" width="${Math.max(0.5, x2 - x1).toFixed(1)}" height="${reihenHoehe - 3}" fill="${farbe}" opacity="${lvl === 1 ? 0.85 : 0.55 - lvl * 0.05}" stroke="var(--grund)" stroke-width="0.6"/>`);
      if (x2 - x1 > 10) {
        teile.push(`<text x="${((x1+x2)/2).toFixed(1)}" y="${y + reihenHoehe/2 - 1}" text-anchor="middle" dominant-baseline="middle" font-size="${lvl === 1 ? 11 : 9}" fill="var(--grund)">${ZEICHEN[p.signIdx].glyph}${p.verdoppelt ? " ×2" : ""}</text>`);
      }
    });
  }
  const achseY = padT + maxLevel * reihenHoehe + 4;
  for (let a = 0; a <= maxAlter; a += 10) {
    const px = x(a);
    teile.push(`<line x1="${px}" y1="${achseY}" x2="${px}" y2="${achseY+4}" stroke="var(--linie)" stroke-width="1"/>`);
    teile.push(`<text x="${px}" y="${achseY+15}" text-anchor="middle" font-size="9" fill="var(--gedaempft)">${a}</text>`);
  }
  teile.push(`<line id="zrSchieber" x1="${x(0)}" y1="${padT-6}" x2="${x(0)}" y2="${achseY}" stroke="var(--ton-hell)" stroke-width="2"/>`);
  teile.push(`<circle id="zrGriff" cx="${x(0)}" cy="${padT-6}" r="6" fill="var(--ton-hell)"/>`);
  teile.push("</svg>");
  container.innerHTML = teile.join("");

  const svg = $("#zrSvg");
  let ziehen = false;
  function schieberAuf(clientX) {
    const rect = svg.getBoundingClientRect();
    const relX = (clientX - rect.left) / rect.width * breite;
    const alter = alterVonX(relX);
    const px = x(alter);
    $("#zrSchieber").setAttribute("x1", px); $("#zrSchieber").setAttribute("x2", px);
    $("#zrGriff").setAttribute("cx", px);
    onScrub(alter);
  }
  svg.addEventListener("pointerdown", e => { ziehen = true; svg.setPointerCapture(e.pointerId); schieberAuf(e.clientX); });
  svg.addEventListener("pointermove", e => { if (ziehen) schieberAuf(e.clientX); });
  svg.addEventListener("pointerup", () => { ziehen = false; });
  svg.addEventListener("pointercancel", () => { ziehen = false; });
}

function berechneUndZeige() {
  const cikti = $("#zrCikti");
  const p = leseProfil();
  if (!p) { cikti.hidden = true; return; }

  const [jahr, monat, tag] = p.datum.split("-").map(Number);
  const [stunde, minute] = p.zeit.split(":").map(Number);
  const geburt = berechneGeburt(jahr, monat, tag, stunde, minute, p.utc, p.breite, p.laenge);

  const losArt = document.querySelector('input[name="zrLos"]:checked').value;
  const los = losArt === "fortuna"
    ? losDesGlueck(geburt.asc, geburt.planeten.sonne.laenge, geburt.planeten.mond.laenge, geburt.tagGeburt)
    : losDesGeist(geburt.asc, geburt.planeten.sonne.laenge, geburt.planeten.mond.laenge, geburt.tagGeburt);
  const losSign = Math.floor(los / 30);

  const maxAlter = Math.max(10, parseInt($("#zrMaxAlter").value, 10) || 90);
  const verdoppelt = ermittleVerdopplung(geburt);
  const maxLevel = 3;

  const perioden = [];
  erzeugePerioden(losSign, GESAMT_JAHRE, 0, 1, [], verdoppelt, maxLevel, maxAlter, perioden);

  cikti.hidden = false;
  cikti.innerHTML = "";

  cikti.appendChild(el("p", "kucukNot",
    `${losArt === "fortuna" ? "Los des Glücks" : "Los des Geistes"} auf ${ZEICHEN[losSign].glyph} ${ZEICHEN[losSign].name} ` +
    `${(los - losSign * 30).toFixed(1)}° · ${geburt.tagGeburt ? "Taggeburt" : "Nachtgeburt"} · ` +
    `natal in eigenem Zeichen (Verdopplung): ${DOMIZIL.filter((_, i) => verdoppelt[i]).length ? [...new Set(DOMIZIL.filter((_, i) => verdoppelt[i]))].map(k => PLANETEN[k].name).join(", ") : "keiner"}`));

  const baenderKutu = el("div", "zeitleisteKutu");
  const baenderDiv = el("div"); baenderDiv.id = "zrBaender";
  const ablesung = el("div", "zeitleisteAblesung");
  baenderKutu.append(baenderDiv, ablesung);
  cikti.appendChild(baenderKutu);

  function zeigeStand(alter) {
    const aktive = [1, 2, 3].map(lvl => perioden.find(pr => pr.level === lvl && alter >= pr.startAlter && alter < pr.endAlter));
    ablesung.innerHTML = `<b>Alter ${alter.toFixed(1)} Jahre</b><br>` + aktive.filter(Boolean).map(pr =>
      `L${pr.level}: ${ZEICHEN[pr.signIdx].glyph} ${ZEICHEN[pr.signIdx].name} (${PLANETEN[DOMIZIL[pr.signIdx]].g} ${pr.startAlter.toFixed(1)}–${pr.endAlter.toFixed(1)} J.${pr.verdoppelt ? ", verdoppelt" : ""})`
    ).join(" · ");
  }

  zeichnenBaender(baenderDiv, perioden, maxAlter, maxLevel, zeigeStand);
  zeigeStand(0);

  const tablo = el("div", "tabloKutu");
  const tab = el("table");
  tab.innerHTML = "<thead><tr><th>Stufe</th><th>Zeichen</th><th>Herrscher</th><th>Von</th><th>Bis</th><th>Jahre</th></tr></thead>";
  const tbody = el("tbody");
  perioden.filter(pr => pr.level <= 2).sort((a, b) => a.startAlter - b.startAlter || a.level - b.level).forEach(pr => {
    const tr = el("tr", pr.level === 1 ? "sieger" : null);
    tr.appendChild(el("td", null, "L" + pr.level));
    tr.appendChild(el("td", null, `${ZEICHEN[pr.signIdx].glyph} ${ZEICHEN[pr.signIdx].name}`));
    tr.appendChild(el("td", null, `${PLANETEN[DOMIZIL[pr.signIdx]].g} ${PLANETEN[DOMIZIL[pr.signIdx]].name}`));
    tr.appendChild(el("td", null, pr.startAlter.toFixed(1)));
    tr.appendChild(el("td", null, pr.endAlter.toFixed(1)));
    tr.appendChild(el("td", null, pr.laenge.toFixed(2) + (pr.verdoppelt ? " (×2)" : "")));
    tbody.appendChild(tr);
  });
  tab.appendChild(tbody);
  tablo.appendChild(tab);
  cikti.appendChild(tablo);
  cikti.appendChild(el("p", "kucukNot", "Die Tafel zeigt L1 und L2; L3 ist in der Zeitleiste sichtbar, aber hier aus Platzgründen nicht aufgeführt."));
}

$("#zrBerechnen").addEventListener("click", berechneUndZeige);

aufProfilAenderung(() => renderProfilAnzeige($("#zrProfilAnzeige")));
document.querySelector('nav#reiter button[data-bolum="bZR"]')?.addEventListener("click", () => {
  renderProfilAnzeige($("#zrProfilAnzeige"));
});
renderProfilAnzeige($("#zrProfilAnzeige"));
