/* ------------------------------------------------------------------------
   lebensbogen.js — Bedienung des Reiters "Der Lebensbogen" (Primärdirektionen).
   Nutzt das gemeinsame Geburtsprofil (profil.js) und die Himmelsmechanik aus
   astro.js; die Bogen-Mathematik selbst steht in direktionen.js.
   --------------------------------------------------------------------- */
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=36";
import { berechneGeburt } from "./astro.js?v=36";
import { berechneDirektionen, PLANETEN, PLANETEN_REIHE, ACHSEN } from "./direktionen.js?v=36";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const FARBEN = {
  sonne:"#e7c65c", mond:"#cfd6e6", merkur:"#9fbfa8", venus:"#e0a6c2",
  mars:"#c96a4a", jupiter:"#7fa6d6", saturn:"#8b8471", asc:"#e7c65c", mc:"#c9a227"
};

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

function datumAusAlter(geburtsJd, alterJahre) {
  const jd = geburtsJd + alterJahre * 365.2425;
  return jd; // nur zur groben Datumsanzeige, siehe unten
}
function jdZuGrobemDatum(jd) {
  // Grobe Kalenderumrechnung (Meeus 7.1), fuer die Anzeige ausreichend.
  const z = Math.floor(jd + 0.5);
  const f = jd + 0.5 - z;
  let a = z;
  if (z >= 2299161) { const alpha = Math.floor((z - 1867216.25) / 36524.25); a = z + 1 + alpha - Math.floor(alpha / 4); }
  const b = a + 1524, c = Math.floor((b - 122.1) / 365.25), d = Math.floor(365.25 * c), e = Math.floor((b - d) / 30.6001);
  const tag = b - d - Math.floor(30.6001 * e) + f;
  const monat = e < 14 ? e - 1 : e - 13;
  const jahr = monat > 2 ? c - 4716 : c - 4715;
  return `${Math.floor(tag)}.${String(monat).padStart(2,"0")}.${jahr}`;
}

function zeichnenZeitleiste(container, direktionen, geburtJd, maxAlter, onScrub) {
  const breite = 640, hoehe = 150, padL = 24, padR = 24, achseY = 70;
  const x = alter => padL + (alter / maxAlter) * (breite - padL - padR);
  const alterVonX = px => Math.max(0, Math.min(maxAlter, ((px - padL) / (breite - padL - padR)) * maxAlter));

  const teile = [`<svg id="lbSvg" viewBox="0 0 ${breite} ${hoehe}" role="img" aria-label="Zeitleiste der Direktionen" style="touch-action:none;">`];
  teile.push(`<line x1="${padL}" y1="${achseY}" x2="${breite-padR}" y2="${achseY}" stroke="var(--linie)" stroke-width="1.5"/>`);
  for (let a = 0; a <= maxAlter; a += 10) {
    const px = x(a);
    teile.push(`<line x1="${px}" y1="${achseY-4}" x2="${px}" y2="${achseY+4}" stroke="var(--linie)" stroke-width="1"/>`);
    teile.push(`<text x="${px}" y="${achseY+18}" text-anchor="middle" font-size="9" fill="var(--gedaempft)">${a}</text>`);
  }
  direktionen.forEach((d, i) => {
    const px = x(d.alter);
    const lane = d.richtung === "direkt" ? -1 : 1;
    const py = achseY + lane * (12 + (i % 3) * 7);
    const farbe = FARBEN[d.promissor] || "var(--ton)";
    teile.push(`<circle data-i="${i}" cx="${px}" cy="${py}" r="3.4" fill="${farbe}" opacity=".85" stroke="var(--grund)" stroke-width=".6"/>`);
  });
  teile.push(`<line id="lbSchieber" x1="${x(0)}" y1="8" x2="${x(0)}" y2="${hoehe-6}" stroke="var(--ton-hell)" stroke-width="2"/>`);
  teile.push(`<circle id="lbGriff" cx="${x(0)}" cy="8" r="6" fill="var(--ton-hell)"/>`);
  teile.push("</svg>");
  container.innerHTML = teile.join("");

  const svg = $("#lbSvg");
  let ziehen = false;

  function schieberAuf(clientX) {
    const rect = svg.getBoundingClientRect();
    const relX = (clientX - rect.left) / rect.width * breite;
    const alter = alterVonX(relX);
    const px = x(alter);
    $("#lbSchieber").setAttribute("x1", px); $("#lbSchieber").setAttribute("x2", px);
    $("#lbGriff").setAttribute("cx", px);
    onScrub(alter);
  }

  svg.addEventListener("pointerdown", e => { ziehen = true; svg.setPointerCapture(e.pointerId); schieberAuf(e.clientX); });
  svg.addEventListener("pointermove", e => { if (ziehen) schieberAuf(e.clientX); });
  svg.addEventListener("pointerup", () => { ziehen = false; });
  svg.addEventListener("pointercancel", () => { ziehen = false; });

  return { schieberAufAlter: alter => schieberAuf(padL + (alter / maxAlter) * (breite - padL - padR) + svg.getBoundingClientRect().left) };
}

function aspektRegler() {
  const feld = $("#lbAspektFeld");
  const anAus = () => feld.hidden = !$("#lbPlanetZuPlanet").checked;
  $("#lbPlanetZuPlanet").addEventListener("change", anAus);
  anAus();
}
aspektRegler();

function berechneUndZeige() {
  const cikti = $("#lbCikti");
  const p = leseProfil();
  if (!p) { cikti.hidden = true; return; }

  const [jahr, monat, tag] = p.datum.split("-").map(Number);
  const [stunde, minute] = p.zeit.split(":").map(Number);
  const geburt = berechneGeburt(jahr, monat, tag, stunde, minute, p.utc, p.breite, p.laenge);

  const aspektSchluessel = new Set();
  if ($("#lbAKon").checked) aspektSchluessel.add("kon");
  if ($("#lbAQua").checked) aspektSchluessel.add("qua");
  if ($("#lbAOpp").checked) aspektSchluessel.add("opp");
  if ($("#lbASex").checked) aspektSchluessel.add("sex");
  if ($("#lbATri").checked) aspektSchluessel.add("tri");

  const maxAlter = Math.max(10, parseInt($("#lbMaxAlter").value, 10) || 90);
  const schluessel = document.querySelector('input[name="lbSchluessel"]:checked').value;

  const direktionen = berechneDirektionen(geburt, {
    aspektSchluessel, mitAchsen: $("#lbAchsen").checked, mitPlanetZuPlanet: $("#lbPlanetZuPlanet").checked,
    mitKonvers: $("#lbKonvers").checked, schluessel, maxAlter
  });

  cikti.hidden = false;
  cikti.innerHTML = "";

  if (!direktionen.length) {
    cikti.appendChild(el("p", "kucukNot", "Keine Direktionen im gewählten Altersfenster und Umfang gefunden."));
    return;
  }

  const zlKutu = el("div", "zeitleisteKutu");
  const zlDiv = el("div"); zlDiv.id = "zeitleiste";
  const ablesung = el("div", "zeitleisteAblesung");
  zlKutu.append(zlDiv, ablesung);
  cikti.appendChild(zlKutu);

  const naheDran = el("div", "naheDran");
  cikti.appendChild(naheDran);

  const tablo = el("div", "tabloKutu");
  const tab = el("table");
  tab.innerHTML = "<thead><tr><th>Alter</th><th>Promissor</th><th></th><th>Signifikator</th><th>Bogen</th><th>Richtung</th></tr></thead>";
  const tbody = el("tbody");
  direktionen.forEach((d, i) => {
    const tr = el("tr"); tr.dataset.i = i;
    tr.appendChild(el("td", null, d.alter.toFixed(1) + " J."));
    tr.appendChild(el("td", null, `${PLANETEN[d.promissor].g} ${PLANETEN[d.promissor].name}`));
    tr.appendChild(el("td", null, d.aspekt));
    tr.appendChild(el("td", null, `${d.sigGlyph} ${d.signifikator}`));
    tr.appendChild(el("td", null, d.arc.toFixed(2) + "°"));
    tr.appendChild(el("td", null, d.richtung));
    tbody.appendChild(tr);
  });
  tab.appendChild(tbody);
  tablo.appendChild(tab);
  cikti.appendChild(tablo);

  function zeigeNaehe(alter) {
    const datumTxt = jdZuGrobemDatum(geburt.jd + alter * 365.2425);
    ablesung.textContent = `Alter ${alter.toFixed(1)} Jahre — ungefähr ${datumTxt}`;

    const sortiert = direktionen.map((d, i) => ({ ...d, i, dist: Math.abs(d.alter - alter) }))
      .sort((a, b) => a.dist - b.dist).slice(0, 6);
    naheDran.innerHTML = "";
    sortiert.forEach(d => {
      const chip = el("div", "naheDranItem");
      chip.innerHTML = `<b>${d.alter.toFixed(1)} J.</b> ${PLANETEN[d.promissor].g}${PLANETEN[d.promissor].name} ${d.aspekt} ${d.sigGlyph}${d.signifikator} (${d.richtung})`;
      naheDran.appendChild(chip);
    });

    tbody.querySelectorAll("tr").forEach(tr => tr.classList.remove("naeheAktiv"));
    const naechste = sortiert[0];
    if (naechste && naechste.dist < Math.max(1, maxAlter * 0.01)) {
      const tr = tbody.querySelector(`tr[data-i="${naechste.i}"]`);
      if (tr) { tr.classList.add("naeheAktiv"); tr.scrollIntoView({ block: "nearest" }); }
    }
  }

  const rad = zeichnenZeitleiste(zlDiv, direktionen, geburt.jd, maxAlter, zeigeNaehe);
  zeigeNaehe(0);

  tbody.querySelectorAll("tr").forEach(tr => {
    tr.style.cursor = "pointer";
    tr.addEventListener("click", () => {
      const d = direktionen[Number(tr.dataset.i)];
      rad.schieberAufAlter(d.alter);
      zeigeNaehe(d.alter);
    });
  });
}

$("#lbBerechnen").addEventListener("click", berechneUndZeige);

aufProfilAenderung(() => renderProfilAnzeige($("#lbProfilAnzeige")));
document.querySelector('nav#reiter button[data-bolum="bLebensbogen"]')?.addEventListener("click", () => {
  renderProfilAnzeige($("#lbProfilAnzeige"));
});
renderProfilAnzeige($("#lbProfilAnzeige"));
