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
  from "./horoskop.js?v=160";
import { norm360 } from "./astro.js?v=160";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

/* ---------------------------------------------- I. Der Herr des Werks */

/* Nur diese drei kommen für Ptolemäus in Frage. */
const WERKER = ["merkur", "venus", "mars"];

const STOFF = {
  merkur: { kurz: "durch das Wort und die Zahl",
    feld: "Schreiben, Rechnen, Lehren, Handeln, Vermitteln, Deuten — alles, was " +
          "zwischen Menschen hin und her geht und dabei genau sein muss. Ptolemäus " +
          "nennt Schreiber, Kaufleute, Rechner, Astrologen, Redner; die Araber fügen " +
          "Übersetzer und Boten hinzu." },
  venus:  { kurz: "durch das Auge und die Hand",
    feld: "Machen, was gefällt: Musik, Malerei, Schmuck, Kleider, Wohlgeruch, Gärten, " +
          "Gastlichkeit. Ptolemäus nennt Musikanten, Maler, Salbenmischer, Weber — alle, " +
          "deren Arbeit daran gemessen wird, ob sie schön geworden ist." },
  mars:   { kurz: "durch Feuer und Eisen",
    feld: "Alles Schneidende und Formende: Handwerk am Metall, Bauen, Wundarznei, " +
          "Waffen, Feuer, Schlachten. Ptolemäus nennt Schmiede, Chirurgen, Soldaten, " +
          "Köche, Steinmetzen — Arbeit, bei der etwas nachgibt, weil man es zwingt." }
};

/* Die Verbindungen, die Ptolemäus eigens aufführt. */
const PAARE = {
  "merkur+venus": "Wort und Schönheit zusammen: Musik mit Text, Dichtung, Lehre von " +
    "schönen Dingen, Handel mit Kunst, alles Darstellende. Ptolemäus nennt hier " +
    "ausdrücklich die, die auf Bühnen stehen.",
  "mars+merkur":  "Wort und Eisen zusammen: scharfes, strittiges Reden — Recht, " +
    "Streitführung, Kritik, Chirurgie mit Lehre, Technik mit Berechnung. Es geht " +
    "hier um Arbeit, die trennt und dabei genau sein muss.",
  "mars+venus":   "Schönheit und Eisen zusammen: Arbeit am Stoff, die Kraft und " +
    "Geschmack zugleich verlangt — Bildhauerei, Schmiedekunst, Färberei, Küche, " +
    "alles Handwerk, dessen Ergebnis man ansieht."
};

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
        gruende.push(`geht morgens vor der Sonne auf (${nah.toFixed(0)}° davor)`);
      } else {
        gruende.push(`steht der Sonne zu nah (${nah.toFixed(1)}°) — verbrannt, zählt nicht`);
      }
    }
    if (pl.haus === 10) { punkte += 3; gruende.push("steht im zehnten Feld, am Himmelsmittelpunkt"); }
    if (pl.zeichen === mcZeichen) { punkte += 2; gruende.push("steht im Zeichen des Himmelsmittelpunkts"); }
    if (k === mcHerr) { punkte += 2; gruende.push("ist Herr des Himmelsmittelpunkts"); }
    if ([1, 4, 7, 10].includes(pl.haus)) { punkte += 1; gruende.push("steht winkelhaft"); }
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
           paar: paarKey && PAARE[paarKey] ? { key: paarKey, text: PAARE[paarKey] } : null,
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
          text: "steht winkelhaft — dieses Drittel wirkt sichtbar und bringt hervor" }
      : FOLGEND.includes(pl.haus) ? { art: "folgend", gut: true,
          text: "steht folgend — dieses Drittel trägt, aber langsamer" }
      : { art: "kadent", gut: false,
          text: "steht kadent — dieses Drittel geht über Umwege und durch andere" };
    const wuerde = pl ? pl.wuerde : null;
    return { key: k, pl, von, bis, stellung, wuerde,
             rang: i === 0 ? "erste" : i === 1 ? "zweite" : "dritte" };
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
    ziel.appendChild(el("p", "kucukNot",
      "Dafür fehlen die Geburtsangaben — Datum, Uhrzeit und der Ort mit gesuchten Koordinaten."));
    return;
  }

  if (w.leer) {
    const k = el("div", "wkKasten");
    k.appendChild(el("div", "kalanBaslik", "Kein Herr des Werks"));
    k.appendChild(el("p", null,
      "Keiner der drei — Merkur, Venus, Mars — steht morgens vor der Sonne, am " +
      "Himmelsmittelpunkt oder in dessen Zeichen. Ptolemäus sagt für diesen Fall, " +
      "dass der Mensch keinem bestimmten Werk zugeordnet ist: Er lebt dann nicht von " +
      "einem Handwerk, sondern von dem, was ihm zufällt — aus Herkunft, Amt oder Besitz. " +
      "Die Araber lesen es milder: Das Werk ist nicht vorgezeichnet und darum frei."));
    ziel.appendChild(k);
    return;
  }

  const e = w.erster, st = STOFF[e.key];
  const kasten = el("div", "wkKasten");
  kasten.appendChild(el("div", "kalanBaslik", "Der Herr deines Werks"));
  kasten.appendChild(el("div", "buyukToplam", `${PLANET[e.key].g} ${PLANET[e.key].name}`));
  kasten.appendChild(el("div", "kucukNot", st.kurz));
  const p = el("p");
  p.innerHTML = st.feld;
  kasten.appendChild(p);

  if (w.geteilt && w.paar) {
    const g = el("p", "wkPaar");
    g.innerHTML = `<b>Zwei teilen sich den Vorrang:</b> ${PLANET[e.key].name} und ` +
      `${PLANET[w.zweiter.key].name} kommen auf gleich viel. Ptolemäus hat für diesen ` +
      `Fall eigene Sätze — ${w.paar.text}`;
    kasten.appendChild(g);
  }

  const zeichen = e.pl.zeichen;
  const z = el("p");
  z.innerHTML = `Er steht bei dir in ${ZEICHEN[zeichen].glyph} <b>${ZEICHEN[zeichen].name}</b>, ` +
    `im ${e.pl.haus}. Feld — ${HAUS[e.pl.haus - 1]}. Das Zeichen sagt, in welcher Art von ` +
    `Stoff gearbeitet wird, das Feld, in wessen Auftrag.`;
  kasten.appendChild(z);
  ziel.appendChild(kasten);

  ziel.appendChild(el("h3", null, "Wie gerechnet wurde"));
  const ul = el("ul", "zeugenListe");
  w.kandidaten.forEach(k => {
    const li = el("li", k === w.erster ? "z-gut" : k.punkte ? "z-neutral" : "z-schlecht");
    li.innerHTML = `<b>${PLANET[k.key].g} ${PLANET[k.key].name}</b> — ` +
      (k.gruende.length ? k.gruende.join("; ") : "keine der Bedingungen erfüllt") +
      ` <span class="zGewicht">${k.punkte}</span>`;
    ul.appendChild(li);
  });
  ziel.appendChild(ul);
  ziel.appendChild(el("p", "kucukNot",
    "Nach Ptolemäus (Tetrabiblos IV.4): Gesucht wird der Planet, der morgens vor der " +
    "Sonne aufgeht, und der am Himmelsmittelpunkt steht. Nur Merkur, Venus und Mars " +
    "gelten als Herren des Werks — alles Hervorbringen, sagt er, geht durch Hand, Auge " +
    "oder Wort. Die übrigen vier geben Rang und Umstände, nicht das Werk selbst."));
}

function zeichneAlter() {
  const ziel = $("#laCikti");
  if (!ziel) return;
  const a = lebensalter();
  ziel.innerHTML = ""; ziel.hidden = false;
  if (!a) {
    ziel.appendChild(el("p", "kucukNot", "Dafür fehlen die Geburtsangaben."));
    return;
  }

  const p = a.radix.profil;
  const [jj, mm, tt] = p.datum.split("-").map(Number);
  const jetzt = (Date.now() - new Date(jj, mm - 1, tt).getTime()) / (365.2422 * 864e5);

  ziel.appendChild(el("p", "kucukNot",
    `Dein aufsteigendes Zeichen gehört dem Element ${a.element}. Du bist ` +
    `${a.tagGeburt ? "bei Tag" : "bei Nacht"} geboren, darum führt ` +
    `${a.tagGeburt ? "der Herr des Tages" : "der Herr der Nacht"} das erste Drittel.`));

  a.drittel.forEach(d => {
    const k = el("div", "laDrittel" + (jetzt >= d.von && jetzt < d.bis ? " laHier" : ""));
    const kopf = el("div", "laKopf");
    kopf.appendChild(el("span", "laSpanne", `${d.von.toFixed(0)}–${d.bis.toFixed(0)} Jahre`));
    kopf.appendChild(el("span", "laName", `${PLANET[d.key].g} ${PLANET[d.key].name}`));
    k.appendChild(kopf);
    const t = el("p");
    t.innerHTML = d.pl
      ? `Das ${d.rang} Drittel steht unter ${mitArtikel(PLANET[d.key].name)}. ` +
        `${grossMitArtikel(PLANET[d.key].name)} steht in ${ZEICHEN[d.pl.zeichen].glyph} ` +
        `${ZEICHEN[d.pl.zeichen].name}, im ${d.pl.haus}. Feld, und ${d.stellung.text}` +
        (d.wuerde.stufe !== "—" ? `. Dazu: ${d.wuerde.text}` : "") + "."
      : `Das ${d.rang} Drittel steht unter ${PLANET[d.key].name}.`;
    k.appendChild(t);
    if (jetzt >= d.von && jetzt < d.bis) {
      k.appendChild(el("div", "laJetzt", "Hier stehst du gerade"));
    }
    ziel.appendChild(k);
  });

  ziel.appendChild(el("p", "kucukNot",
    "Nach Dorotheos (Carmen Astrologicum I): Jedes Element hat drei Herren — einen für " +
    "den Tag, einen für die Nacht und einen dritten, den die arabische Überlieferung den " +
    "Teilhaber nennt. Das Leben zerfällt in drei Teile, und wie der jeweilige Herr steht, " +
    "so verläuft sein Drittel. Die Drittel sind hier auf 75 Jahre gerechnet; die alten " +
    "Texte setzen dafür die Jahre an, die das Lebensmaß ergibt. Es ist die einfachste " +
    "Zeitteilung der Überlieferung und zugleich die gröbste — sie sagt eine Tendenz, " +
    "keinen Termin."));
}

$("#wkBerechnen")?.addEventListener("click", zeichneWerk);
$("#laBerechnen")?.addEventListener("click", zeichneAlter);
if ($("#wkCikti") || $("#laCikti")) {
  const alle = () => { zeichneWerk(); zeichneAlter(); };
  window.addEventListener("load", () => setTimeout(alle, 350));
  window.addEventListener("profil-geaendert", () => setTimeout(alle, 250));
}
