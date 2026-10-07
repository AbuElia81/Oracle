/* ------------------------------------------------------------------------
   perioden.js — zwei Zeitherrscher-Systeme, die keinen Tierkreis abzählen,
   sondern feste Jahresmengen verteilen.

   FIRDARIA (persisch فردار, bei Abū Maʿšar und im ganzen persisch-
   arabischen Zweig): fünfundsiebzig Jahre, aufgeteilt auf die sieben
   Wandelsterne und die beiden Mondknoten. Die Reihenfolge hängt daran, ob
   die Sonne bei der Geburt über oder unter dem Horizont stand. Jede große
   Periode zerfällt in sieben gleiche Unterperioden.

   VIMSHOTTARI DASHA (विंशोत्तरी, das verbreitetste System der indischen
   Astrologie): hundertzwanzig Jahre auf neun Herren. Wo der Mond bei der
   Geburt in seinen siebenundzwanzig Mondhäusern stand, bestimmt, welcher
   Herr beginnt — und wie viel von seiner Zeit schon verbraucht war.
   Gerechnet wird siderisch, nicht tropisch.
   --------------------------------------------------------------------- */
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=274";
import { berechneGeburt, norm360 } from "./astro.js?v=274";
import { zustandVon, ZEICHEN } from "./horoskop.js?v=274";
import { rt, zahl, ordnung, setzeRestSprache } from "./rest-texte.js?v=274";
import { aktuelleSprache } from "./sprachen.js?v=274";
import { PLANET } from "./horoskop.js?v=274";
setzeRestSprache(aktuelleSprache());
window.addEventListener("sprache-geaendert", ev => setzeRestSprache(ev.detail));

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

/* --------------------------------------------------------------- Firdaria */
/* Jahre und Glyphe sind sprachfest; Name und Bedeutung werden bei jedem
   Zugriff aus den Sprachtafeln gelesen, damit ein Wechsel sie erreicht.
   Die Mondknoten haben keinen Eintrag in PLANET und einen eigenen Namen. */
const F_JAHRE = { sonne:10, venus:8, merkur:13, mond:9, saturn:11, jupiter:12, mars:7, kopf:3, schwanz:2 };
const F_GLYPH = { sonne:"☉", venus:"♀", merkur:"☿", mond:"☽", saturn:"♄",
                  jupiter:"♃", mars:"♂", kopf:"☊", schwanz:"☋" };
const F_PLANET = Object.fromEntries(Object.keys(F_JAHRE).map(k => [k, {
  g: F_GLYPH[k], jahre: F_JAHRE[k],
  get name() { return (k === "kopf" || k === "schwanz") ? rt("fd.name." + k) : PLANET[k].name; },
  get was()  { return rt("fd." + k); }
}]));
const F_TAG   = ["sonne","venus","merkur","mond","saturn","jupiter","mars","kopf","schwanz"];
const F_NACHT = ["mond","saturn","jupiter","mars","sonne","venus","merkur","kopf","schwanz"];

export function firdaria(alterJetzt, tagGeburt) {
  const folge = tagGeburt ? F_TAG : F_NACHT;
  const gross = [];
  let cursor = 0;
  folge.forEach(k => {
    const p = F_PLANET[k];
    const anfang = cursor, ende = cursor + p.jahre;
    /* Die Knoten führen im persischen Gebrauch keine Unterperioden. */
    const unter = [];
    if (k !== "kopf" && k !== "schwanz") {
      const teil = p.jahre / 7;
      const start = folge.indexOf(k);
      for (let i = 0; i < 7; i++) {
        const uk = folge[(start + i) % 7];
        unter.push({ key: uk, ...F_PLANET[uk], anfang: anfang + i * teil, ende: anfang + (i + 1) * teil });
      }
    }
    gross.push({ key: k, ...p, anfang, ende, unter });
    cursor = ende;
  });
  const laufend = gross.find(g => alterJetzt >= g.anfang && alterJetzt < g.ende) || null;
  const laufendUnter = laufend
    ? laufend.unter.find(u => alterJetzt >= u.anfang && alterJetzt < u.ende) || null : null;
  return { gross, laufend, laufendUnter, gesamt: cursor };
}

/* ---------------------------------------------------------- Vimshottari */
/* Die indischen Namen bleiben: Ketu, Shukra, Surya und die übrigen sind
   die Namen dieser Lehre und keine Übersetzung der römischen Planeten. */
const V_JAHRE = { ketu:7, venus:20, sonne:6, mond:10, mars:7, rahu:18, jupiter:16, saturn:19, merkur:17 };
const V_NAME  = { ketu:"Ketu", venus:"Shukra", sonne:"Surya", mond:"Chandra", mars:"Mangala",
                  rahu:"Rahu", jupiter:"Guru", saturn:"Shani", merkur:"Budha" };
const V_GLYPH = { ketu:"☋", venus:"♀", sonne:"☉", mond:"☽", mars:"♂",
                  rahu:"☊", jupiter:"♃", saturn:"♄", merkur:"☿" };
const V_HERR = Object.fromEntries(Object.keys(V_JAHRE).map(k => [k, {
  name: V_NAME[k], g: V_GLYPH[k], jahre: V_JAHRE[k],
  get was() { return rt("vd." + k); }
}]));
const V_FOLGE = ["ketu","venus","sonne","mond","mars","rahu","jupiter","saturn","merkur"];
const V_GESAMT = 120;

const NAKSHATRA = [
  "Ashvini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha",
  "Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Svati","Vishakha","Anuradha","Jyeshtha",
  "Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishtha","Shatabhisha",
  "Purva Bhadrapada","Uttara Bhadrapada","Revati"
];

/* Lahiri-Ayanamsa, genähert: 23°51′ zur Jahrtausendwende, danach die
   Präzession von rund 50,3 Bogensekunden im Jahr. Auf wenige Bogenminuten
   genau — für ein Mondhaus von 13°20′ reicht das. */
export function ayanamsa(jahrDezimal) {
  return 23.853 + 0.0139694 * (jahrDezimal - 2000);
}

export function vimshottari(mondLaengeTropisch, geburtsJahr, alterJetzt) {
  const sid = norm360(mondLaengeTropisch - ayanamsa(geburtsJahr));
  const spanne = 360 / 27;                       // 13°20′
  const idx = Math.floor(sid / spanne);
  const anteilVerbraucht = (sid - idx * spanne) / spanne;

  const startHerr = V_FOLGE[idx % 9];
  const rest = V_HERR[startHerr].jahre * (1 - anteilVerbraucht);

  const maha = [];
  let cursor = 0;
  for (let i = 0; i < 9; i++) {
    const k = V_FOLGE[(V_FOLGE.indexOf(startHerr) + i) % 9];
    const h = V_HERR[k];
    const laenge = i === 0 ? rest : h.jahre;
    const anfang = cursor, ende = cursor + laenge;

    /* Unterperioden im selben Umlauf, anteilig zur Länge der großen. */
    const unter = [];
    let u = anfang;
    for (let j = 0; j < 9; j++) {
      const uk = V_FOLGE[(V_FOLGE.indexOf(k) + j) % 9];
      const uLaenge = h.jahre * V_HERR[uk].jahre / V_GESAMT;
      unter.push({ key: uk, ...V_HERR[uk], anfang: u, ende: u + uLaenge });
      u += uLaenge;
    }
    /* Bei der angebrochenen ersten Periode fallen die früheren Unterperioden
       vor die Geburt — sie werden abgeschnitten. */
    const unterSichtbar = unter.filter(x => x.ende > anfang).map(x => ({
      ...x, anfang: Math.max(x.anfang, anfang)
    })).filter(x => x.ende > x.anfang);

    maha.push({ key: k, ...h, anfang, ende, laenge, angebrochen: i === 0, unter: unterSichtbar });
    cursor = ende;
  }

  const laufend = maha.find(m => alterJetzt >= m.anfang && alterJetzt < m.ende) || null;
  const laufendUnter = laufend
    ? laufend.unter.find(x => alterJetzt >= x.anfang && alterJetzt < x.ende) || null : null;

  return {
    nakshatra: NAKSHATRA[idx], nakshatraNr: idx + 1,
    siderisch: sid, verbraucht: anteilVerbraucht,
    startHerr: V_HERR[startHerr], restBeiGeburt: rest,
    maha, laufend, laufendUnter
  };
}

/* ------------------------------------------------------- gemeinsame Daten */
function basis() {
  const p = leseProfil();
  if (!p) return null;
  const [j, m, t] = p.datum.split("-").map(Number);
  const [st, mi] = p.zeit.split(":").map(Number);
  let g;
  try { g = berechneGeburt(j, m, t, st, mi, p.utc, p.breite, p.laenge); } catch (e) { return null; }
  const alter = (Date.now() - new Date(j, m - 1, t).getTime()) / (365.2425 * 864e5);
  return { profil: p, geburt: g, alter, jahr: j + (m - 1) / 12 };
}

export function firdariaJetzt() {
  const b = basis();
  if (!b) return null;
  const f = firdaria(b.alter, b.geburt.tagGeburt);
  return { ...f, alter: b.alter, tagGeburt: b.geburt.tagGeburt };
}

export function vimshottariJetzt() {
  const b = basis();
  if (!b) return null;
  const v = vimshottari(b.geburt.planeten.mond.laenge, b.jahr, b.alter);
  return { ...v, alter: b.alter };
}

/* ========================================================== Darstellung */

const MONATE = ["Januar","Februar","März","April","Mai","Juni","Juli",
                "August","September","Oktober","November","Dezember"];
function datumBei(profil, alterJahre) {
  const [j, m, t] = profil.datum.split("-").map(Number);
  const d = new Date(new Date(j, m - 1, t).getTime() + alterJahre * 365.2425 * 864e5);
  return `${d.getDate()}. ${MONATE[d.getMonth()]} ${d.getFullYear()}`;
}
/* Zahlen schreibt zahl() je nach Sprache. */
const komma = zahl;

/* Den laufenden Herrn am Geburtshoroskop festmachen — dieselbe Logik wie
   bei den übrigen Zeittechniken: Die Technik sagt wann, das Horoskop was. */
function amHoroskop(schluessel, rolle) {
  if (["kopf","schwanz","rahu","ketu"].includes(schluessel)) return null;
  const z = zustandVon(schluessel);
  if (!z) return null;
  return rt("pd.amHoroskop", rolle, z.zeichenGlyph, z.zeichenName, ordnung(z.haus, true), z.hausOrt);
}

function leerHinweis(ziel) {
  ziel.innerHTML = "";
  const w = el("p", "kucukNot", rt("keineAngaben"));
  const b = el("button", "knopfKlein", rt("zurEingabe"));
  b.addEventListener("click", zurDateneingabe);
  w.appendChild(b);
  ziel.appendChild(w);
  ziel.hidden = false;
}

/* ------------------------------------------------------------- Firdaria */
function zeichneFirdaria() {
  const ziel = $("#fdCikti");
  if (!ziel) return;
  const b = basis();
  if (!b) { leerHinweis(ziel); return; }
  const f = firdaria(b.alter, b.geburt.tagGeburt);

  ziel.hidden = false;
  ziel.innerHTML = "";
  ziel.appendChild(el("p", "kucukNot",
    rt("pd.kopf", profilBeschriftung(b.profil),
       rt(b.geburt.tagGeburt ? "zr.tag" : "zr.nacht"), f.gross[0].name)));

  if (f.laufend) {
    const k = el("div", "geistName");
    k.innerHTML =
      `<div class="kalanBaslik">${rt("pd.deinFirdar")}</div>` +
      `<div class="buyukToplam"><span class="glyph">${f.laufend.g}</span> ${f.laufend.name}</div>` +
      `<div class="kucukNot">${rt("pd.spanne", zahl(f.laufend.anfang), zahl(f.laufend.ende))}` +
      (f.laufendUnter ? rt("pd.unter", f.laufendUnter.g, f.laufendUnter.name) : "") + `</div>`;
    ziel.appendChild(k);

    ziel.appendChild(el("p", null, rt("pd.verhandelt", f.laufend.was)));
    if (f.laufendUnter && f.laufendUnter.key !== f.laufend.key) {
      ziel.appendChild(el("p", null,
        rt("pd.darin", f.laufendUnter.name, f.laufendUnter.was, zahl(f.laufendUnter.ende))));
    }
    const fest = amHoroskop(f.laufend.key, rt("pd.rolleFd", f.laufend.name));
    if (fest) ziel.appendChild(el("p", null, fest));
  } else {
    ziel.appendChild(el("p", null, rt("pd.durchlaufen")));
  }

  const kutu = el("div", "tabloKutu");
  const tab = el("table", "wuerdeTablo periodenTablo");
  tab.innerHTML = `<thead><tr><th>${rt("pd.tab.herr")}</th><th>${rt("pd.tab.jahre")}</th>` +
    `<th>${rt("pd.tab.von")}</th><th>${rt("pd.tab.bis")}</th><th>${rt("pd.tab.datum")}</th></tr></thead>`;
  const tb = el("tbody");
  f.gross.forEach(g => {
    const tr = el("tr", g === f.laufend ? "sieger" : null);
    tr.appendChild(el("td", null, `${g.g} ${g.name}`));
    tr.appendChild(el("td", null, String(g.jahre)));
    tr.appendChild(el("td", null, komma(g.anfang)));
    tr.appendChild(el("td", null, komma(g.ende)));
    tr.appendChild(el("td", null, datumBei(b.profil, g.anfang)));
    tb.appendChild(tr);
  });
  tab.appendChild(tb);
  kutu.appendChild(tab);
  ziel.appendChild(kutu);

  ziel.appendChild(el("p", "kucukNot", rt("pd.fdNote")));
}

/* ---------------------------------------------------------- Vimshottari */
function zeichneVimshottari() {
  const ziel = $("#vdCikti");
  if (!ziel) return;
  const b = basis();
  if (!b) { leerHinweis(ziel); return; }
  const v = vimshottari(b.geburt.planeten.mond.laenge, b.jahr, b.alter);

  ziel.hidden = false;
  ziel.innerHTML = "";
  const sidZeichen = Math.floor(v.siderisch / 30);
  ziel.appendChild(el("p", "kucukNot",
    rt("pd.vdKopf", profilBeschriftung(b.profil), ZEICHEN[sidZeichen].glyph,
       zahl(v.siderisch - sidZeichen * 30), zahl(ayanamsa(b.jahr), 2))));

  const k = el("div", "geistName");
  k.innerHTML =
    `<div class="kalanBaslik">${rt("pd.mondhaus")}</div>` +
    `<div class="buyukToplam">${v.nakshatra}</div>` +
    `<div class="kucukNot">${rt("pd.mondhausNot", ordnung(v.nakshatraNr, true), v.startHerr.g,
       v.startHerr.name, zahl(v.restBeiGeburt))}</div>`;
  ziel.appendChild(k);

  if (v.laufend) {
    const p1 = el("p");
    p1.innerHTML = rt("pd.maha", v.laufend.g, v.laufend.name, v.laufend.was,
      zahl(v.laufend.anfang), zahl(v.laufend.ende), datumBei(b.profil, v.laufend.ende));
    ziel.appendChild(p1);
    if (v.laufendUnter) {
      const p2 = el("p");
      p2.innerHTML = rt("pd.antar", v.laufendUnter.g, v.laufendUnter.name,
        v.laufendUnter.was, datumBei(b.profil, v.laufendUnter.ende));
      ziel.appendChild(p2);
    }
    const fest = amHoroskop(v.laufend.key, `${v.laufend.name}`);
    if (fest) ziel.appendChild(el("p", null, fest));
  }

  const kutu = el("div", "tabloKutu");
  const tab = el("table", "wuerdeTablo periodenTablo");
  tab.innerHTML = `<thead><tr><th>${rt("pd.tab.maha")}</th><th>${rt("pd.tab.jahre")}</th>` +
    `<th>${rt("pd.tab.von")}</th><th>${rt("pd.tab.bis")}</th><th>${rt("pd.tab.beginnt")}</th></tr></thead>`;
  const tb = el("tbody");
  v.maha.forEach(m => {
    const tr = el("tr", m === v.laufend ? "sieger" : null);
    tr.appendChild(el("td", null, `${m.g} ${m.name}`));
    tr.appendChild(el("td", null, zahl(m.laenge) + (m.angebrochen ? rt("pd.rest") : "")));
    tr.appendChild(el("td", null, komma(m.anfang)));
    tr.appendChild(el("td", null, komma(m.ende)));
    tr.appendChild(el("td", null, datumBei(b.profil, m.anfang)));
    tb.appendChild(tr);
  });
  tab.appendChild(tb);
  kutu.appendChild(tab);
  ziel.appendChild(kutu);

  ziel.appendChild(el("p", "kucukNot", rt("pd.vdNote")));
}

function zeichne() { zeichneFirdaria(); zeichneVimshottari(); }
window.addEventListener("sprache-geaendert", () => setTimeout(zeichne, 0));

$("#fdBerechnen")?.addEventListener("click", zeichneFirdaria);
$("#vdBerechnen")?.addEventListener("click", zeichneVimshottari);
aufProfilAenderung(zeichne);
["bFirdaria","bVimshottari"].forEach(r =>
  document.querySelector(`nav#reiter button[data-bolum="${r}"]`)
    ?.addEventListener("click", () => setTimeout(zeichne, 0)));
if (document.readyState === "complete") zeichne();
else window.addEventListener("load", zeichne);
