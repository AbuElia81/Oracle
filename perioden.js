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
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=250";
import { berechneGeburt, norm360 } from "./astro.js?v=250";
import { zustandVon, ZEICHEN } from "./horoskop.js?v=250";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

/* --------------------------------------------------------------- Firdaria */
const F_PLANET = {
  sonne:   { name:"Sonne",   g:"☉", jahre:10, was:"Ansehen, Amt, das Hervortreten; auch der Vater" },
  venus:   { name:"Venus",   g:"♀", jahre:8,  was:"Bindung, Kunst, Genuss, Geld, das über Menschen kommt" },
  merkur:  { name:"Merkur",  g:"☿", jahre:13, was:"Lernen, Schrift, Handel, Wege, Verhandlung" },
  mond:    { name:"Mond",    g:"☽", jahre:9,  was:"Haus, Familie, Gemüt, Wechsel; auch die Mutter" },
  saturn:  { name:"Saturn",  g:"♄", jahre:11, was:"Ernst, Verzicht, Verantwortung, das Langsame und Bleibende" },
  jupiter: { name:"Jupiter", g:"♃", jahre:12, was:"Erweiterung, Gönner, Recht, Reise, Zuwachs" },
  mars:    { name:"Mars",    g:"♂", jahre:7,  was:"Streit, Arbeit, Schnitt, Entschluss, Gefahr durch Hitze" },
  kopf:    { name:"Mondknoten (aufsteigend)", g:"☊", jahre:3, was:"Eintritt, Zuwachs, Anschluss — eine Tür geht auf" },
  schwanz: { name:"Mondknoten (absteigend)",  g:"☋", jahre:2, was:"Austritt, Abbau, Loslassen — eine Tür geht zu" }
};
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
const V_HERR = {
  ketu:    { name:"Ketu",    g:"☋", jahre:7,  was:"Loslassen, Rückzug, das Unfertige; was man nicht mehr braucht" },
  venus:   { name:"Shukra",  g:"♀", jahre:20, was:"Genuss, Kunst, Bindung, Wohlstand, das Angenehme" },
  sonne:   { name:"Surya",   g:"☉", jahre:6,  was:"Amt, Vater, Ansehen, Selbstbehauptung" },
  mond:    { name:"Chandra", g:"☽", jahre:10, was:"Mutter, Gemüt, Heim, Empfinden, Wechsel" },
  mars:    { name:"Mangala", g:"♂", jahre:7,  was:"Tatkraft, Streit, Geschwister, Land, Blut" },
  rahu:    { name:"Rahu",    g:"☊", jahre:18, was:"Hunger nach Neuem, Fremdes, Aufstieg mit Beigeschmack" },
  jupiter: { name:"Guru",    g:"♃", jahre:16, was:"Lehre, Kinder, Glaube, Segen, Weite" },
  saturn:  { name:"Shani",   g:"♄", jahre:19, was:"Mühe, Dauer, Alter, Dienst, das Erarbeitete" },
  merkur:  { name:"Budha",   g:"☿", jahre:17, was:"Rede, Rechnung, Handel, Verstand, Geschick" }
};
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
const komma = n => n.toFixed(1).replace(".", ",");

/* Den laufenden Herrn am Geburtshoroskop festmachen — dieselbe Logik wie
   bei den übrigen Zeittechniken: Die Technik sagt wann, das Horoskop was. */
function amHoroskop(schluessel, rolle) {
  if (["kopf","schwanz","rahu","ketu"].includes(schluessel)) return null;
  const z = zustandVon(schluessel);
  if (!z) return null;
  return `${rolle} steht bei dir in ${z.zeichenGlyph} ${z.zeichenName}, im ${z.haus}. Haus — ` +
         `${z.hausOrt}. Dort spielt sich ab, was diese Zeit bringt.`;
}

function leerHinweis(ziel) {
  ziel.innerHTML = "";
  const w = el("p", "kucukNot", "Noch keine Geburtsangaben hinterlegt. ");
  const b = el("button", "knopfKlein", "Zur Dateneingabe");
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
    `Für: ${profilBeschriftung(b.profil)} · ${b.geburt.tagGeburt ? "Taggeburt" : "Nachtgeburt"} — ` +
    `darum beginnt die Reihe mit ${f.gross[0].name}.`));

  if (f.laufend) {
    const k = el("div", "geistName");
    k.innerHTML =
      `<div class="kalanBaslik">Dein Firdar</div>` +
      `<div class="buyukToplam"><span class="glyph">${f.laufend.g}</span> ${f.laufend.name}</div>` +
      `<div class="kucukNot">${komma(f.laufend.anfang)} bis ${komma(f.laufend.ende)} Jahre` +
      (f.laufendUnter ? ` · Unterperiode ${f.laufendUnter.g} ${f.laufendUnter.name}` : "") + `</div>`;
    ziel.appendChild(k);

    ziel.appendChild(el("p", null, `Was in dieser Zeit verhandelt wird: ${f.laufend.was}.`));
    if (f.laufendUnter && f.laufendUnter.key !== f.laufend.key) {
      ziel.appendChild(el("p", null,
        `Darin führt gerade ${f.laufendUnter.name} — ${f.laufendUnter.was} —, ` +
        `bis ${komma(f.laufendUnter.ende)} Jahren. Der große Herr gibt das Thema, der kleine den Ton.`));
    }
    const fest = amHoroskop(f.laufend.key, `${f.laufend.name}, der Herr dieser Jahre,`);
    if (fest) ziel.appendChild(el("p", null, fest));
  } else {
    ziel.appendChild(el("p", null,
      "Die fünfundsiebzig Jahre der Firdaria sind durchlaufen. Die Perser ließen die Reihe " +
      "danach von vorn beginnen; hier endet sie."));
  }

  const kutu = el("div", "tabloKutu");
  const tab = el("table", "wuerdeTablo periodenTablo");
  tab.innerHTML = "<thead><tr><th>Herr</th><th>Jahre</th><th>Von</th><th>Bis</th><th>Datum</th></tr></thead>";
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

  ziel.appendChild(el("p", "kucukNot",
    "Fünfundsiebzig Jahre auf neun Herren, in fester Folge und fester Länge — die Firdaria " +
    "fragt weder nach Zeichen noch nach Häusern, nur danach, ob die Sonne bei der Geburt " +
    "über dem Horizont stand. Die beiden Mondknoten am Ende führen keine Unterperioden."));
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
    `Für: ${profilBeschriftung(b.profil)} · Mond siderisch auf ${ZEICHEN[sidZeichen].glyph} ` +
    `${(v.siderisch - sidZeichen * 30).toFixed(1)}° · Ayanamsa ${ayanamsa(b.jahr).toFixed(2)}°`));

  const k = el("div", "geistName");
  k.innerHTML =
    `<div class="kalanBaslik">Mondhaus der Geburt</div>` +
    `<div class="buyukToplam">${v.nakshatra}</div>` +
    `<div class="kucukNot">${v.nakshatraNr}. von 27 · Herr ${v.startHerr.g} ${v.startHerr.name} · ` +
    `bei der Geburt waren davon noch ${komma(v.restBeiGeburt)} Jahre übrig</div>`;
  ziel.appendChild(k);

  if (v.laufend) {
    const p1 = el("p");
    p1.innerHTML = `<b>Mahadasha:</b> ${v.laufend.g} ${v.laufend.name} — ${v.laufend.was}. ` +
      `Von ${komma(v.laufend.anfang)} bis ${komma(v.laufend.ende)} Jahren, also bis ` +
      `${datumBei(b.profil, v.laufend.ende)}.`;
    ziel.appendChild(p1);
    if (v.laufendUnter) {
      const p2 = el("p");
      p2.innerHTML = `<b>Antardasha:</b> ${v.laufendUnter.g} ${v.laufendUnter.name} — ` +
        `${v.laufendUnter.was}. Bis ${datumBei(b.profil, v.laufendUnter.ende)}. ` +
        `Die große Periode sagt, worum es geht; die kleine, woran man es merkt.`;
      ziel.appendChild(p2);
    }
    const fest = amHoroskop(v.laufend.key, `${v.laufend.name}`);
    if (fest) ziel.appendChild(el("p", null, fest));
  }

  const kutu = el("div", "tabloKutu");
  const tab = el("table", "wuerdeTablo periodenTablo");
  tab.innerHTML = "<thead><tr><th>Mahadasha</th><th>Jahre</th><th>Von</th><th>Bis</th><th>Beginnt</th></tr></thead>";
  const tb = el("tbody");
  v.maha.forEach(m => {
    const tr = el("tr", m === v.laufend ? "sieger" : null);
    tr.appendChild(el("td", null, `${m.g} ${m.name}`));
    tr.appendChild(el("td", null, komma(m.laenge) + (m.angebrochen ? " (Rest)" : "")));
    tr.appendChild(el("td", null, komma(m.anfang)));
    tr.appendChild(el("td", null, komma(m.ende)));
    tr.appendChild(el("td", null, datumBei(b.profil, m.anfang)));
    tb.appendChild(tr);
  });
  tab.appendChild(tb);
  kutu.appendChild(tab);
  ziel.appendChild(kutu);

  ziel.appendChild(el("p", "kucukNot",
    "Hundertzwanzig Jahre auf neun Herren. Welcher beginnt und wie viel von seiner Zeit schon " +
    "verbraucht war, hängt allein daran, wo der Mond bei der Geburt in seinen siebenundzwanzig " +
    "Häusern stand. Gerechnet wird siderisch nach Lahiri — der Ayanamsa hier genähert, auf " +
    "wenige Bogenminuten genau; bei einem Mondhaus von 13°20′ fällt das nicht ins Gewicht."));
}

function zeichne() { zeichneFirdaria(); zeichneVimshottari(); }

$("#fdBerechnen")?.addEventListener("click", zeichneFirdaria);
$("#vdBerechnen")?.addEventListener("click", zeichneVimshottari);
aufProfilAenderung(zeichne);
["bFirdaria","bVimshottari"].forEach(r =>
  document.querySelector(`nav#reiter button[data-bolum="${r}"]`)
    ?.addEventListener("click", () => setTimeout(zeichne, 0)));
if (document.readyState === "complete") zeichne();
else window.addEventListener("load", zeichne);
