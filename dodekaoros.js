/* ------------------------------------------------------------------------
   dodekaoros.js — der Dodekaoros (δωδεκάωρος), das hellenistisch-ägyptische
   Tierkreisbild-System.

   Zwölf Tiere, fest an die zwölf Tierkreiszeichen gebunden ("feste
   Ausrichtung" — anders als ein Los, das irgendwo beginnen kann), belegt
   beim Astrologen Teukros von Babylon, verwendet in den griechischen
   Zauberpapyri und auf magischen Gemmen. Jedes Tier steht für eine
   Erscheinungsform der Sonne beim Eintritt in das jeweilige Zeichen.

   TRANSPARENZ: die antiken Quellen überliefern nicht eine einzige Tierreihe
   — Franz Boll (Sphaera, 1903) dokumentiert mehrere voneinander abweichende
   Fassungen. Die hier verwendete Reihe folgt der in der Sekundärliteratur
   am häufigsten zitierten, dem Teukros zugeschriebenen Fassung mit klarem
   ägyptischen Götterbezug (Katze/Bastet, Ibis/Thot usw.) — eine plausible,
   aber nicht letztgültig gesicherte Rekonstruktion. Wer die eigene
   Quellenseite mit einer anderen Reihe vor sich hat, sollte dieser folgen.
   --------------------------------------------------------------------- */
import { julianischesDatum, sonnenLaenge, norm360 } from "./astro.js?v=46";
import { leseProfil, aufProfilAenderung, zurDateneingabe } from "./profil.js?v=46";

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

/* Reihe nach Teukros (Sekundärliteratur), siehe Transparenzhinweis oben. */
const TIERE = [
  { tier:"Katze",     gott:"Bastet" },
  { tier:"Hund",      gott:"Anubis" },
  { tier:"Schlange",  gott:"Wadjet" },
  { tier:"Skarabäus", gott:"Chepri" },
  { tier:"Esel",      gott:"Seth" },
  { tier:"Löwe",      gott:"Sachmet" },
  { tier:"Ziegenbock",gott:"Banebdjedet" },
  { tier:"Stier",     gott:"Apis" },
  { tier:"Falke",     gott:"Horus" },
  { tier:"Affe",      gott:"Thot" },
  { tier:"Ibis",      gott:"Thot" },
  { tier:"Krokodil",  gott:"Sobek" }
];
/* Die klassische Geschlechter-/Sekte-Reihe der Zeichen (mask./diurn. im
   Wechsel mit fem./nokturn., unabhängig vom Dodekaoros selbst) als
   Tag-/Nachthälfte gelesen. */
const TAGZEICHEN = new Set([0,2,4,6,8,10]);

function polar(deg, r, cx, cy) {
  const a = rad(deg - 90);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function baueRad(hervorgehobenIdx) {
  const cx = 160, cy = 160, rA = 150, rI = 96;
  const t = [`<svg viewBox="0 0 320 320" role="img" aria-label="Dodekaoros-Rad">`];
  t.push(`<circle cx="${cx}" cy="${cy}" r="${rA}" fill="none" stroke="var(--linie)" stroke-width="1"/>`);
  t.push(`<circle cx="${cx}" cy="${cy}" r="${rI}" fill="none" stroke="var(--linie)" stroke-width="1"/>`);
  for (let i = 0; i < 12; i++) {
    const p1 = polar(i * 30, rI, cx, cy), p2 = polar(i * 30, rA, cx, cy);
    t.push(`<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="var(--linie)" stroke-width="1"/>`);
    const istHervor = i === hervorgehobenIdx;
    if (istHervor) {
      const a0 = rad(i * 30 - 90), a1 = rad((i + 1) * 30 - 90);
      const pts = [polar(i*30, rI, cx, cy), polar(i*30, rA, cx, cy), polar((i+1)*30, rA, cx, cy), polar((i+1)*30, rI, cx, cy)];
      t.push(`<path d="M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} L ${pts[1].x.toFixed(1)} ${pts[1].y.toFixed(1)} A ${rA} ${rA} 0 0 1 ${pts[2].x.toFixed(1)} ${pts[2].y.toFixed(1)} L ${pts[3].x.toFixed(1)} ${pts[3].y.toFixed(1)} A ${rI} ${rI} 0 0 0 ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} Z" fill="var(--ton)" opacity=".18"/>`);
    }
    const lz = polar(i * 30 + 15, rA - 14, cx, cy);
    t.push(`<text x="${lz.x.toFixed(2)}" y="${lz.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="13" fill="${istHervor ? "var(--ton-hell)" : "var(--gedaempft)"}">${ZEICHEN[i].glyph}</text>`);
    const lt = polar(i * 30 + 15, (rA + rI) / 2 - 4, cx, cy);
    t.push(`<text x="${lt.x.toFixed(2)}" y="${lt.y.toFixed(2)}" text-anchor="middle" dominant-baseline="central" font-size="10.5" fill="${istHervor ? "var(--ton-hell)" : "var(--schrift)"}">${TIERE[i].tier}</text>`);
  }
  t.push("</svg>");
  return t.join("");
}

function berechne() {
  const cikti = $("#dkCikti");
  const datumStr = $("#dkDatum").value;
  if (!datumStr) { cikti.hidden = true; return; }
  const [jahr, monat, tag] = datumStr.split("-").map(Number);
  const jd = julianischesDatum(jahr, monat, tag, 12);
  const laenge = sonnenLaenge(jd);
  const idx = Math.floor(norm360(laenge) / 30);
  const tier = TIERE[idx], zeichen = ZEICHEN[idx];
  const tagHaelfte = TAGZEICHEN.has(idx);

  cikti.hidden = false;
  cikti.innerHTML = "";

  const karte = el("div", "almutenKarte");
  karte.append(
    el("div", "kalanBaslik", "Dodekaoros-Tier der Sonne"),
    (() => { const d = el("div", "almutenPlanet"); d.textContent = tier.tier; return d; })(),
    el("div", "kucukNot",
      `Sonne in ${zeichen.glyph} ${zeichen.name} · ägyptischer Bezug: ${tier.gott} · ` +
      `${tagHaelfte ? "Taghälfte" : "Nachthälfte"} der Tierreihe`)
  );
  cikti.appendChild(karte);

  const radKutu = el("div", "radKutu");
  radKutu.innerHTML = baueRad(idx);
  cikti.appendChild(radKutu);

  const tablo = el("div", "tabloKutu");
  const tab = el("table");
  tab.innerHTML = "<thead><tr><th>Zeichen</th><th>Tier</th><th>Bezug</th><th>Hälfte</th></tr></thead>";
  const tbody = el("tbody");
  ZEICHEN.forEach((z, i) => {
    const tr = el("tr", i === idx ? "sieger" : null);
    tr.appendChild(el("td", null, `${z.glyph} ${z.name}`));
    tr.appendChild(el("td", null, TIERE[i].tier));
    tr.appendChild(el("td", null, TIERE[i].gott));
    tr.appendChild(el("td", null, TAGZEICHEN.has(i) ? "Tag" : "Nacht"));
    tbody.appendChild(tr);
  });
  tab.appendChild(tbody);
  tablo.appendChild(tab);
  cikti.appendChild(tablo);
}

$("#dkBerechnen").addEventListener("click", berechne);
(function vorbelegen() {
  const feld = $("#dkDatum");
  const profil = leseProfil();
  if (profil && profil.datum) feld.value = profil.datum;
  else feld.valueAsDate = new Date();
  berechne();
})();
aufProfilAenderung(() => {
  const profil = leseProfil();
  if (profil && profil.datum) { $("#dkDatum").value = profil.datum; berechne(); }
});
