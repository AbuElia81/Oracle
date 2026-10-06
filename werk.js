/* ------------------------------------------------------------------------
   werk.js — zwei Stücke aus Ptolemäus und Dorotheos:

   I.  DER HERR DES WERKS (κύριος τῆς πράξεως, Tetrabiblos IV.4).
       Ptolemäus fragt nicht, welchen Beruf jemand ergreift, sondern aus
       welchem Stoff seine Tätigkeit ist. Er sucht dafür zwei Stellen ab —
       den Planeten, der morgens vor der Sonne aufgeht, und den, der am
       Himmelsmittelpunkt steht — und lässt nur drei Planeten als Herrn
       des Werks gelten: Merkur, Venus und Mars. Alles Hervorbringen,
       sagt er, geht durch Hand, Auge oder Wort, und diese drei stehen
       dafür. Die übrigen vier geben Rang und Umstände, nicht das Werk.

   II. DIE DREI LEBENSALTER (Dorotheos, Carmen Astrologicum I).
       Jedes Element hat drei Herren: einen für den Tag, einen für die
       Nacht und einen dritten, den die Araber den Teilhaber nennen.
       Dorotheos teilt das Leben in drei Teile und gibt jedem einen von
       ihnen. Wie dieser Herr steht, so verläuft sein Drittel — das ist
       die einfachste Zeitteilung der ganzen Überlieferung und zugleich
       die gröbste.
   ------------------------------------------------------------------------ */

import { radix, PLANET, REIHE, ZEICHEN, HAUS, mitArtikel, grossMitArtikel }
  from "./horoskop.js?v=212";
import { norm360 } from "./astro.js?v=212";
import { rt, setzeRestSprache } from "./rest-texte.js?v=212";
import { ELEMENT_NAME_IT } from "./namen-it.js?v=212";
import { aktuelleSprache } from "./sprachen.js?v=212";
setzeRestSprache(aktuelleSprache());
window.addEventListener("sprache-geaendert", ev => setzeRestSprache(ev.detail));

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

/* ---------------------------------------------- I. Der Herr des Werks */

/* Nur diese drei kommen für Ptolemäus in Frage. */
const WERKER = ["merkur", "venus", "mars"];

const STOFF = {
  merkur: { get kurz() { return rt("werk.merkur.kurz"); }, get feld() { return rt("werk.merkur.feld"); } },
  venus:  { get kurz() { return rt("werk.venus.kurz"); },  get feld() { return rt("werk.venus.feld"); } },
  mars:   { get kurz() { return rt("werk.mars.kurz"); },   get feld() { return rt("werk.mars.feld"); } }
};


/* Die Verbindungen, die Ptolemäus eigens aufführt. */
const PAAR_KEY = { "merkur+venus":"werk.paar.merkurVenus",
                   "mars+merkur":"werk.paar.marsMerkur",
                   "mars+venus":"werk.paar.marsVenus" };


/* Steht ein Planet morgens vor der Sonne? Dann geht er ihr voraus und
   wird kurz vor Sonnenaufgang sichtbar — Ptolemäus' erste Bedingung. */
function morgendlich(pl, sonne) {
  const d = norm360(pl.laenge - sonne.laenge);
  return d > 180;                      /* er steht hinter der Sonne im Tierkreis */
}

export function herrDesWerks() {
  const r = radix();
  if (!r) return null;
  const sonne = r.planeten.sonne;
  const mcZeichen = r.mcZeichen;
  const DOMIZIL = ["mars","venus","merkur","mond","sonne","merkur",
                   "venus","mars","jupiter","saturn","saturn","jupiter"];
  const mcHerr = DOMIZIL[mcZeichen];

  const kandidaten = [];
  WERKER.forEach(k => {
    const pl = r.planeten[k];
    if (!pl) return;
    let punkte = 0;
    const gruende = [];

    if (morgendlich(pl, sonne)) {
      const abstand = norm360(pl.laenge - sonne.laenge);
      /* Je näher an der Sonne, desto deutlicher der Morgenaufgang —
         aber verbrannt zählt nicht mehr. */
      const nah = 360 - abstand;
      if (nah > 8) {
        punkte += 3;
        gruende.push(rt("werk.grund.morgens", nah.toFixed(0)));
      } else {
        gruende.push(rt("werk.grund.verbrannt", nah.toFixed(1)));
      }
    }
    if (pl.haus === 10) { punkte += 3; gruende.push(rt("werk.grund.zehntes")); }
    if (pl.zeichen === mcZeichen) { punkte += 2; gruende.push(rt("werk.grund.mcZeichen")); }
    if (k === mcHerr) { punkte += 2; gruende.push(rt("werk.grund.mcHerr")); }
    if ([1, 4, 7, 10].includes(pl.haus)) { punkte += 1; gruende.push(rt("werk.grund.winkel")); }
    if (pl.wuerde.stufe === "Domizil" || pl.wuerde.stufe === "Erhöhung") {
      punkte += 1; gruende.push(`und ${pl.wuerde.text}`);
    }
    kandidaten.push({ key: k, pl, punkte, gruende });
  });

  kandidaten.sort((a, b) => b.punkte - a.punkte);
  const erster = kandidaten[0];
  const geteilt = kandidaten[1] && kandidaten[1].punkte === erster.punkte && erster.punkte > 0;
  const paarKey = geteilt
    ? [erster.key, kandidaten[1].key].sort().join("+")
    : null;

  return { kandidaten, erster, zweiter: kandidaten[1], geteilt,
           paar: paarKey && PAAR_KEY[paarKey] ? { key: paarKey, get text() { return rt(PAAR_KEY[paarKey]); } } : null,
           mcZeichen, mcHerr, leer: erster.punkte === 0, radix: r };
}

/* -------------------------------------------- II. Die drei Lebensalter */

/* Dorotheos' Tafel: für jedes Element der Herr des Tages, der Herr der
   Nacht und der dritte, den die arabische Überlieferung den Teilhaber
   nennt (participans, šarīk). */
const TRIPLIZITAET = [
  { element: "Feuer",  tag: "sonne",  nacht: "jupiter", teilhaber: "saturn" },
  { element: "Erde",   tag: "venus",  nacht: "mond",    teilhaber: "mars"   },
  { element: "Luft",   tag: "saturn", nacht: "merkur",  teilhaber: "jupiter"},
  { element: "Wasser", tag: "venus",  nacht: "mars",    teilhaber: "mond"   }
];

const WINKEL = [1, 4, 7, 10], FOLGEND = [2, 5, 8, 11];

export function lebensalter(lebensdauer = 75) {
  const r = radix();
  if (!r) return null;
  const el4 = r.ascZeichen % 4;                 /* Feuer Erde Luft Wasser */
  const t = TRIPLIZITAET[el4];
  const reihe = r.tagGeburt
    ? [t.tag, t.nacht, t.teilhaber]
    : [t.nacht, t.tag, t.teilhaber];

  const drittel = reihe.map((k, i) => {
    const pl = r.planeten[k];
    const von = lebensdauer / 3 * i, bis = lebensdauer / 3 * (i + 1);
    const stellung = !pl ? null
      : WINKEL.includes(pl.haus) ? { art: "winkelhaft", gut: true,
          text: rt("alter.winkel") }
      : FOLGEND.includes(pl.haus) ? { art: "folgend", gut: true,
          text: rt("alter.folgend") }
      : { art: "kadent", gut: false,
          text: rt("alter.kadent") };
    const wuerde = pl ? pl.wuerde : null;
    return { key: k, pl, von, bis, stellung, wuerde,
             rang: i === 0 ? "alter.erste" : i === 1 ? "alter.zweite" : "alter.dritte" };
  });

  return { element: t.element, tagGeburt: r.tagGeburt, drittel, lebensdauer, radix: r };
}

/* ====================================================================== */

function zeichneWerk() {
  const ziel = $("#wkCikti");
  if (!ziel) return;
  const w = herrDesWerks();
  ziel.innerHTML = ""; ziel.hidden = false;
  if (!w) {
    ziel.appendChild(el("p", "kucukNot", rt("fehlt.geburt")));
    return;
  }

  if (w.leer) {
    const k = el("div", "wkKasten");
    k.appendChild(el("div", "kalanBaslik", rt("werk.keiner.titel")));
    k.appendChild(el("p", null, rt("werk.keiner.text")));
    ziel.appendChild(k);
    return;
  }

  const e = w.erster, st = STOFF[e.key];
  const kasten = el("div", "wkKasten");
  kasten.appendChild(el("div", "kalanBaslik", rt("werk.titel")));
  kasten.appendChild(el("div", "buyukToplam", `${PLANET[e.key].g} ${PLANET[e.key].name}`));
  kasten.appendChild(el("div", "kucukNot", st.kurz));
  const p = el("p");
  p.innerHTML = st.feld;
  kasten.appendChild(p);

  if (w.geteilt && w.paar) {
    const g = el("p", "wkPaar");
    g.innerHTML = rt("werk.geteilt", PLANET[e.key].name, PLANET[w.zweiter.key].name, w.paar.text);
    kasten.appendChild(g);
  }

  const zeichen = e.pl.zeichen;
  const z = el("p");
  z.innerHTML = rt("werk.ort", `${ZEICHEN[zeichen].glyph} <b>${ZEICHEN[zeichen].name}</b>`, e.pl.haus, HAUS[e.pl.haus - 1]);
  kasten.appendChild(z);
  ziel.appendChild(kasten);

  ziel.appendChild(el("h3", null, rt("werk.wie")));
  const ul = el("ul", "zeugenListe");
  w.kandidaten.forEach(k => {
    const li = el("li", k === w.erster ? "z-gut" : k.punkte ? "z-neutral" : "z-schlecht");
    li.innerHTML = `<b>${PLANET[k.key].g} ${PLANET[k.key].name}</b> — ` +
      (k.gruende.length ? k.gruende.join("; ") : rt("werk.grund.keine")) +
      ` <span class="zGewicht">${k.punkte}</span>`;
    ul.appendChild(li);
  });
  ziel.appendChild(ul);
  ziel.appendChild(el("p", "kucukNot", rt("werk.note")));
}

function zeichneAlter() {
  const ziel = $("#laCikti");
  if (!ziel) return;
  const a = lebensalter();
  ziel.innerHTML = ""; ziel.hidden = false;
  if (!a) {
    ziel.appendChild(el("p", "kucukNot", rt("fehlt.geburt")));
    return;
  }

  const p = a.radix.profil;
  const [jj, mm, tt] = p.datum.split("-").map(Number);
  const jetzt = (Date.now() - new Date(jj, mm - 1, tt).getTime()) / (365.2422 * 864e5);

  ziel.appendChild(el("p", "kucukNot", rt("alter.kopf", aktuelleSprache() === "it" ? (ELEMENT_NAME_IT[a.element] || a.element) : a.element, a.tagGeburt)));

  a.drittel.forEach(d => {
    const k = el("div", "laDrittel" + (jetzt >= d.von && jetzt < d.bis ? " laHier" : ""));
    const kopf = el("div", "laKopf");
    kopf.appendChild(el("span", "laSpanne", rt("alter.spanne", d.von.toFixed(0), d.bis.toFixed(0))));
    kopf.appendChild(el("span", "laName", `${PLANET[d.key].g} ${PLANET[d.key].name}`));
    k.appendChild(kopf);
    const t = el("p");
    t.innerHTML = d.pl
      ? rt("alter.satz", rt(d.rang), mitArtikel(PLANET[d.key].name),
          `${ZEICHEN[d.pl.zeichen].glyph} ${ZEICHEN[d.pl.zeichen].name}`, d.pl.haus,
          d.stellung.text, d.wuerde.stufe !== "—" ? `. ${d.wuerde.text}` : "")
      : rt("alter.satz", rt(d.rang), mitArtikel(PLANET[d.key].name), "", "", "", "");
    k.appendChild(t);
    if (jetzt >= d.von && jetzt < d.bis) {
      k.appendChild(el("div", "laJetzt", rt("alter.jetzt")));
    }
    ziel.appendChild(k);
  });

  ziel.appendChild(el("p", "kucukNot", rt("alter.note")));
}

$("#wkBerechnen")?.addEventListener("click", zeichneWerk);
$("#laBerechnen")?.addEventListener("click", zeichneAlter);
if ($("#wkCikti") || $("#laCikti")) {
  const alle = () => { zeichneWerk(); zeichneAlter(); };
  window.addEventListener("load", () => setTimeout(alle, 350));
  window.addEventListener("profil-geaendert", () => setTimeout(alle, 250));
}

window.addEventListener("sprache-geaendert", () => setTimeout(() => { zeichneWerk(); zeichneAlter(); }, 80));
