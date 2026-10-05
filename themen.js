/* ------------------------------------------------------------------------
   themen.js — die zwölf Felder des Lebens, einzeln befragt.

   Im Basishoroskop stehen die Planeten da, aber sie beantworten keine
   Frage. Hier wird gefragt: Wie steht es um mein Geld? Um meine Arbeit?
   Um Kinder, Ehe, Ruf? Jedes Feld wird nach demselben klassischen
   Verfahren beurteilt — Bonatti nennt es in den "Liber Astronomiae"
   die Betrachtung der Zeugen:

     1. der Herr des Feldes und sein Zustand (Haus, Würde, Verbrennung),
     2. wer in dem Feld selbst steht,
     3. wer den Herrn des Feldes ansieht — Wohltäter oder Übeltäter,
     4. der natürliche Anzeiger der Sache (Venus für die Ehe, Jupiter
        für Kinder und Reichtum, die Sonne für den Ruf).

   Zwei Felder bekommen zusätzlich ihre eigene alte Technik:
   das fünfte die Frage nach der Kinderzahl (Firmicus VII.16), das
   zehnte die Frage nach dem Rang des Ruhms (Ptolemäus, Tetrabiblos
   IV.3 — die Doryphorie, die Leibwache der Lichter).
   ------------------------------------------------------------------------ */

import { radix, ZEICHEN, PLANET, REIHE, HAUS, mitArtikel, grossMitArtikel } from "./horoskop.js?v=182";

const DOMIZIL = ["mars","venus","merkur","mond","sonne","merkur",
                 "venus","mars","jupiter","saturn","saturn","jupiter"];

/* "von der Sonne", "vom Mond", "von Jupiter" — mitArtikel reicht im Dativ nicht. */
const DATIV = { sonne: "der Sonne", mond: "dem Mond" };
const vonWem = name => {
  const k = String(name).toLowerCase();
  return DATIV[k] ? `von ${DATIV[k]}` : `von ${PLANET[k] ? PLANET[k].name : name}`;
};

const WINKEL  = [1, 4, 7, 10];
const FOLGEND = [2, 5, 8, 11];

/* Wohltäter und Übeltäter — und was die Sekte daran ändert.
   Bei Tag ist Jupiter der größere Wohltäter und Mars der schlimmere
   Übeltäter; bei Nacht tauschen Venus und Saturn diese Rollen. */
function sekteRolle(key, tagGeburt) {
  if (key === "jupiter") return { art: "wohl",  rang: tagGeburt ? 2 : 1 };
  if (key === "venus")   return { art: "wohl",  rang: tagGeburt ? 1 : 2 };
  if (key === "saturn")  return { art: "uebel", rang: tagGeburt ? 1 : 2 };
  if (key === "mars")    return { art: "uebel", rang: tagGeburt ? 2 : 1 };
  if (key === "sonne")   return { art: tagGeburt ? "wohl" : "neutral", rang: 1 };
  if (key === "mond")    return { art: tagGeburt ? "neutral" : "wohl", rang: 1 };
  return { art: "neutral", rang: 1 };
}

/* ------------------------------------------------------- die zwölf Felder */
export const THEMEN = [
  { nr: 1,  titel: "Leib und Auftreten",
    frage: "Wie stehe ich selbst da — Gesundheit, Erscheinung, Wirkung auf andere?",
    anzeiger: ["sonne", "mond"] },
  { nr: 2,  titel: "Geld und Besitz",
    frage: "Wie steht es um meine finanzielle Lage?",
    anzeiger: ["jupiter", "venus"] },
  { nr: 3,  titel: "Geschwister und nahe Wege",
    frage: "Wie steht es um Geschwister, Nachbarn, kurze Reisen, Nachrichten?",
    anzeiger: ["merkur", "mars"] },
  { nr: 4,  titel: "Herkunft und Zuhause",
    frage: "Wie steht es um Eltern, Haus, Grund und Boden, das Ende der Dinge?",
    anzeiger: ["saturn", "mond"] },
  { nr: 5,  titel: "Kinder und Freude",
    frage: "Bekomme ich Kinder — und wie steht es um Lust, Spiel, alles Hervorgebrachte?",
    anzeiger: ["jupiter", "venus"] },
  { nr: 6,  titel: "Arbeit und Gesundheit",
    frage: "Welche Arbeit tue ich, wie geht es mir dabei, und wie steht es um den Körper?",
    anzeiger: ["mars", "saturn"] },
  { nr: 7,  titel: "Ehe und der Andere",
    frage: "Wie steht es um Ehe und Bindung — und um offene Gegner?",
    anzeiger: ["venus", "mond"] },
  { nr: 8,  titel: "Das Geliehene",
    frage: "Wie steht es um Erbe, Schulden, Anvertrautes, das Vermögen des Anderen?",
    anzeiger: ["saturn", "mars"] },
  { nr: 9,  titel: "Fremde, Lehre, Glaube",
    frage: "Wie steht es um weite Reisen, Studium, Glauben, Lehrer?",
    anzeiger: ["jupiter", "sonne"] },
  { nr: 10, titel: "Amt und Ruf",
    frage: "Welchen Rang erreiche ich — Beruf, Ansehen, Bekanntheit?",
    anzeiger: ["sonne", "jupiter"] },
  { nr: 11, titel: "Freunde und Hoffnungen",
    frage: "Wie steht es um Freundschaften, Bünde, Gönner, das Erhoffte?",
    anzeiger: ["jupiter", "sonne"] },
  { nr: 12, titel: "Das Verborgene",
    frage: "Was läuft gegen mich, ohne dass ich es sehe — und was steht mir selbst im Weg?",
    anzeiger: ["saturn", "mars"] }
];

/* ------------------------------------------------- Zustand eines Zeugen */
function stellung(h) {
  if (WINKEL.includes(h))  return { art: "winkelhaft", punkte: 2,
    text: "winkelhaft — was dort steht, wirkt sofort und sichtbar" };
  if (FOLGEND.includes(h)) return { art: "folgend", punkte: 1,
    text: "folgend — es wirkt, aber erst mit Verzögerung" };
  return { art: "kadent", punkte: -1,
    text: "kadent — es wirkt mittelbar, oft durch andere hindurch" };
}

function verbrannt(pl, sonne) {
  if (!pl || !sonne || pl.key === "sonne") return null;
  /* Der Betrag der nach (-180,180] gebrachten Differenz ist schon der
     Abstand; die Verbrennung misst die Nähe zur Sonne, nicht die Ferne. */
  const abstand = Math.abs(((pl.laenge - sonne.laenge + 540) % 360) - 180);
  if (abstand < 0.283) return { stufe: "cazimi",     punkte: 2,
    text: "im Herzen der Sonne — das ist keine Verbrennung, sondern die höchste Gunst" };
  if (abstand < 8)     return { stufe: "verbrannt",  punkte: -2,
    text: "von der Sonne verbrannt — es wirkt, aber niemand sieht es" };
  if (abstand < 15)    return { stufe: "unter Strahlen", punkte: -1,
    text: "unter den Strahlen der Sonne — gedämpft, noch nicht erstickt" };
  return null;
}

const WUERDE_PUNKTE = { "Domizil": 2, "Erhöhung": 2, "Triplizität": 1, "—": 0, "Fall": -2, "Exil": -2 };

/* --------------------------------------------------- die Hauptberechnung */
export function themaRechnen(nr) {
  const r = radix();
  if (!r) return null;

  const zeichen   = (r.ascZeichen + nr - 1) % 12;
  const herrKey   = DOMIZIL[zeichen];
  const herr      = r.planeten[herrKey];
  const sonne     = r.planeten.sonne;
  const thema     = THEMEN[nr - 1];
  const zeugen    = [];
  let punkte      = 0;

  /* 1. Der Herr des Feldes. */
  if (herr) {
    const st = stellung(herr.haus);
    const vb = verbrannt(herr, sonne);
    const wp = WUERDE_PUNKTE[herr.wuerde.stufe] ?? 0;
    punkte += st.punkte + wp + (vb ? vb.punkte : 0);

    let t = `Dieses Feld steht unter ${ZEICHEN[zeichen].glyph} ${ZEICHEN[zeichen].name}, ` +
            `und darüber gebietet ${mitArtikel(herr.name)}. ` +
            `${grossMitArtikel(herr.name)} steht in ${ZEICHEN[herr.zeichen].glyph} ${ZEICHEN[herr.zeichen].name}, ` +
            `im ${herr.haus}. Feld — ${st.text}`;
    if (herr.wuerde.stufe !== "—") t += `, und ${herr.wuerde.text}`;
    t += ".";
    if (vb) t += ` Dazu: ${vb.text}.`;
    zeugen.push({ gewicht: st.punkte + wp + (vb ? vb.punkte : 0), text: t, haupt: true });
  }

  /* 2. Wer in dem Feld selbst steht. */
  const drin = REIHE.map(k => r.planeten[k]).filter(p => p && p.haus === nr);
  drin.forEach(p => {
    const rol = sekteRolle(p.key, r.tagGeburt);
    const wp  = WUERDE_PUNKTE[p.wuerde.stufe] ?? 0;
    let g = rol.art === "wohl" ? (rol.rang === 1 ? 3 : 2)
          : rol.art === "uebel" ? (rol.rang === 1 ? -3 : -2) : 0;
    g += wp;
    /* Ein Übeltäter in eigenem Zeichen schadet weit weniger — er ist
       zu Hause und hat keinen Grund, sich an anderen schadlos zu halten. */
    if (rol.art === "uebel" && wp > 0) g = Math.min(g + 2, 0);
    punkte += g;
    const rolleWort = rol.art === "wohl"
      ? (rol.rang === 1 ? "der größere Wohltäter dieser Geburt" : "ein Wohltäter")
      : rol.art === "uebel"
        ? (rol.rang === 1 ? "der schwerere Übeltäter dieser Geburt" : "ein Übeltäter")
        : "weder das eine noch das andere";
    zeugen.push({ gewicht: g,
      text: `In diesem Feld selbst steht ${mitArtikel(p.name)} — ` +
            `${rolleWort}${p.wuerde.stufe !== "—" ? `, und ${p.wuerde.text}` : ""}. ` +
            (rol.art === "uebel" && wp > 0
              ? "Weil er dort zu Hause ist, schadet er hier weit weniger, als man fürchten würde."
              : rol.art === "uebel"
                ? "Was hier geschieht, geschieht mit Widerstand und kostet mehr, als es sollte."
                : rol.art === "wohl"
                  ? "Das ist der stärkste einzelne Hinweis, den dieses Feld haben kann."
                  : "Es färbt die Sache, ohne sie zu entscheiden.") });
  });

  /* 3. Wer den Herrn des Feldes ansieht. */
  if (herr) {
    r.aspekte.filter(a => a.a.key === herrKey || a.b.key === herrKey).forEach(a => {
      const anderer = a.a.key === herrKey ? a.b : a.a;
      const rol = sekteRolle(anderer.key, r.tagGeburt);
      if (rol.art === "neutral") return;
      const hart  = /Quadrat|Opposition/i.test(a.name || a.art || "");
      const weich = /Trigon|Sextil/i.test(a.name || a.art || "");
      let g = rol.art === "wohl" ? (weich ? 2 : hart ? 1 : 1)
                                 : (hart ? -2 : weich ? -1 : -1);
      punkte += g;
      zeugen.push({ gewicht: g,
        text: `${grossMitArtikel(herr.name)} wird ${vonWem(anderer.name)} angesehen ` +
              `(${a.name || a.art}). ` +
              (rol.art === "wohl"
                ? (weich ? "Das ist Hilfe, die von selbst kommt."
                         : "Hilfe — aber sie kommt mit Reibung und will erarbeitet sein.")
                : (hart ? "Von dort kommt der Widerstand in dieser Sache."
                        : "Eine Last, die mitläuft, ohne die Sache zu verhindern.")) });
    });
  }

  /* 4. Der natürliche Anzeiger der Sache. */
  thema.anzeiger.forEach((k, i) => {
    const p = r.planeten[k];
    if (!p || k === herrKey) return;
    const st = stellung(p.haus);
    const wp = WUERDE_PUNKTE[p.wuerde.stufe] ?? 0;
    const g  = Math.round((st.punkte + wp) / (i === 0 ? 1 : 2));
    punkte += g;
    zeugen.push({ gewicht: g,
      text: `${i === 0 ? "Der alte Anzeiger dieser Sache ist" : "Als zweiter Anzeiger gilt"} ` +
            `${mitArtikel(p.name)}. ` +
            `${grossMitArtikel(p.name)} steht in ${ZEICHEN[p.zeichen].glyph} ${ZEICHEN[p.zeichen].name}, ` +
            `im ${p.haus}. Feld — ${st.text}` +
            `${p.wuerde.stufe !== "—" ? `, und ${p.wuerde.text}` : ""}.` });
  });

  zeugen.sort((a, b) => Math.abs(b.gewicht) - Math.abs(a.gewicht));

  const urteil =
    punkte >= 6  ? { stufe: "stark",    wort: "Ein starkes Feld." }
  : punkte >= 2  ? { stufe: "gut",      wort: "Ein tragfähiges Feld." }
  : punkte >= -1 ? { stufe: "gemischt", wort: "Ein gemischtes Feld." }
  : punkte >= -5 ? { stufe: "muehsam",  wort: "Ein mühsames Feld." }
                 : { stufe: "schwer",   wort: "Ein schweres Feld." };

  return { nr, thema, zeichen, herrKey, herr, zeugen, punkte, urteil,
           tagGeburt: r.tagGeburt, radix: r,
           sonder: nr === 5 ? kinder(r) : nr === 10 ? ruhm(r) : null };
}

/* ===================================================================
   Sonderfall 1 — die Kinderzahl.

   Firmicus Maternus (Mathesis VII.16) und Vettius Valens fragen nicht
   nach einer Zahl, sondern nach der Fruchtbarkeit der Zeugen: das
   fünfte Zeichen selbst, das Zeichen, in dem sein Herr steht, Jupiter
   als der Geber der Nachkommenschaft, und wer im fünften Feld steht.
   Die alten Texte nennen danach Zahlen — aber sie widersprechen
   einander darin so sehr, dass hier nur die Tendenz steht.
   =================================================================== */

/* Krebs, Skorpion, Fische gelten als fruchtbar; Zwillinge, Löwe,
   Jungfrau als unfruchtbar; Stier, Waage, Steinbock, Wassermann als
   halbfruchtbar; Widder und Schütze als gleichgültig. */
const ZEICHEN_FRUCHT = [0, 1, -2, 2, -2, -2, 1, 2, 0, 1, 1, 2];
const PLANET_FRUCHT  = { jupiter: 2, venus: 2, mond: 2, merkur: 0,
                         sonne: -1, mars: -2, saturn: -2 };

function kinder(r) {
  const z5    = (r.ascZeichen + 4) % 12;
  const herr5 = r.planeten[DOMIZIL[z5]];
  const jup   = r.planeten.jupiter;
  const drin  = REIHE.map(k => r.planeten[k]).filter(p => p && p.haus === 5);
  const zeugen = [];
  let p = 0;

  const f1 = ZEICHEN_FRUCHT[z5];
  p += f1;
  zeugen.push(`Das fünfte Feld steht unter ${ZEICHEN[z5].glyph} ${ZEICHEN[z5].name} — ` +
    (f1 >= 2 ? "eines der fruchtbaren Zeichen, die alten Bücher nennen sie die vielgebärenden."
     : f1 === 1 ? "ein halbfruchtbares Zeichen: es gibt, aber nicht reichlich."
     : f1 === 0 ? "ein Zeichen, das in dieser Frage weder zu- noch abrät."
     : "eines der unfruchtbaren Zeichen; Firmicus nennt sie die unbefruchteten."));

  if (herr5) {
    const f2 = ZEICHEN_FRUCHT[herr5.zeichen];
    p += f2;
    zeugen.push(`Sein Herr ${mitArtikel(herr5.name)} steht in ` +
      `${ZEICHEN[herr5.zeichen].glyph} ${ZEICHEN[herr5.zeichen].name} — ` +
      (f2 >= 2 ? "wieder ein fruchtbares Zeichen." : f2 === 1 ? "ein halbfruchtbares Zeichen."
       : f2 === 0 ? "ein gleichgültiges Zeichen." : "ein unfruchtbares Zeichen."));
  }

  if (jup) {
    const stJ = stellung(jup.haus);
    const f3  = (ZEICHEN_FRUCHT[jup.zeichen] >= 1 ? 1 : ZEICHEN_FRUCHT[jup.zeichen] <= -2 ? -1 : 0)
              + (stJ.punkte > 0 ? 1 : stJ.punkte < 0 ? -1 : 0)
              + ((WUERDE_PUNKTE[jup.wuerde.stufe] ?? 0) > 0 ? 1 : 0);
    p += f3;
    zeugen.push(`Jupiter, den die Alten den Geber der Nachkommenschaft nennen, steht in ` +
      `${ZEICHEN[jup.zeichen].glyph} ${ZEICHEN[jup.zeichen].name}, im ${jup.haus}. Feld — ${stJ.text}` +
      `${jup.wuerde.stufe !== "—" ? `, und ${jup.wuerde.text}` : ""}.`);
  }

  drin.forEach(pl => {
    const f = PLANET_FRUCHT[pl.key] ?? 0;
    p += f;
    zeugen.push(`Im fünften Feld selbst steht ${mitArtikel(pl.name)} — ` +
      (f >= 2 ? "ein fruchtbarer Zeuge." : f === 0 ? "ein Zeuge ohne eigene Richtung."
       : "ein Zeuge, den die Tradition zu den unfruchtbaren zählt."));
  });

  const stufe =
      p >= 5  ? { wort: "viele",   satz: "Die Zeugen sprechen reichlich für Nachkommen. In den alten Büchern ist das die Konstellation, bei der von einem vollen Haus die Rede ist." }
    : p >= 2  ? { wort: "einige",  satz: "Die Zeugen sprechen für Kinder, ohne eine große Zahl zu versprechen." }
    : p >= -1 ? { wort: "wenige",  satz: "Die Zeugen sind geteilt. Das heißt in dieser Lehre nicht keine, sondern wenige — und oft spät oder auf einem Weg, den man nicht geplant hatte." }
    : p >= -4 ? { wort: "kaum",    satz: "Die Zeugen sprechen überwiegend dagegen. Die alten Texte raten hier, das Hervorbringen in einem anderen Sinn zu lesen: Werke statt Kinder." }
    :           { wort: "keine",   satz: "Fast alle Zeugen sind unfruchtbar. Firmicus sagt an dieser Stelle, was ein Mensch dann hervorbringt, trage seinen Namen auf andere Weise weiter." };

  return { art: "kinder", titel: "Die alte Frage nach den Kindern",
           zeugen, punkte: p, stufe,
           nachsatz: "Diese Technik ist eines der heikelsten Stücke der alten Astrologie " +
             "und wurde früher in Lagen gebraucht, in denen eine ausbleibende Geburt " +
             "ein Urteil über einen Menschen war. Sie steht hier als historische Lehre, " +
             "nicht als Befund über einen Körper." };
}

/* ===================================================================
   Sonderfall 2 — der Rang des Ruhms.

   Ptolemäus (Tetrabiblos IV.3) fragt nicht, ob jemand berühmt wird,
   sondern wie weit sein Rang reicht. Er sieht dafür auf das Licht
   der Sekte — bei Tag die Sonne, bei Nacht den Mond — und auf dessen
   Doryphoroi, die Speerträger: die Planeten, die es wie eine Leibwache
   begleiten. Daraus ergeben sich vier Stufen.
   =================================================================== */

function ruhm(r) {
  const lichtKey = r.tagGeburt ? "sonne" : "mond";
  const licht    = r.planeten[lichtKey];
  if (!licht) return null;

  const lichtWinkel = WINKEL.includes(licht.haus);
  const zeugen = [];

  zeugen.push(`Das Licht deiner Sekte ist ${r.tagGeburt ? "die Sonne" : "der Mond"} — ` +
    `du bist ${r.tagGeburt ? "bei Tag" : "bei Nacht"} geboren. ` +
    `${r.tagGeburt ? "Sie steht" : "Er steht"} in ${ZEICHEN[licht.zeichen].glyph} ${ZEICHEN[licht.zeichen].name}, ` +
    `im ${licht.haus}. Feld — ` +
    (lichtWinkel ? "winkelhaft. Das ist die erste Bedingung, und sie ist erfüllt."
                 : "nicht winkelhaft. Die erste Bedingung des Ptolemäus ist damit nicht erfüllt."));

  /* Die Leibwache: wer das Licht begleitet. Ptolemäus zählt dazu, wer
     in den sieben Graden davor aufgeht, wer es aus eigener Würde
     ansieht, und wer selbst an einem Winkel steht. */
  const wache = [];
  REIHE.forEach(k => {
    if (k === lichtKey) return;
    const p = r.planeten[k];
    if (!p) return;
    const vorlauf = ((licht.laenge - p.laenge + 360) % 360);
    const gruende = [];
    if (vorlauf > 0 && vorlauf <= 7) gruende.push("geht unmittelbar vor dem Licht auf");
    const asp = r.aspekte.find(a =>
      (a.a.key === k && a.b.key === lichtKey) || (a.b.key === k && a.a.key === lichtKey));
    if (asp) gruende.push(`sieht es an (${asp.name || asp.art})`);
    if (!gruende.length) return;
    const stark = WINKEL.includes(p.haus) || (WUERDE_PUNKTE[p.wuerde.stufe] ?? 0) > 0;
    if (WINKEL.includes(p.haus)) gruende.push("und steht dabei selbst an einem Winkel");
    else if ((WUERDE_PUNKTE[p.wuerde.stufe] ?? 0) > 0) gruende.push(`und ${p.wuerde.text}`);
    wache.push({ p, stark, gruende });
  });

  const starkeWache = wache.filter(w => w.stark);

  if (!wache.length) {
    zeugen.push("Kein Planet begleitet dieses Licht — es geht ohne Leibwache. " +
      "Ptolemäus nennt das die Geburt dessen, der für sich selbst steht.");
  } else {
    wache.forEach(w => zeugen.push(
      `${grossMitArtikel(w.p.name)} gehört zur Leibwache: ${w.gruende.join(", ")}.`));
  }

  const stufe =
      lichtWinkel && starkeWache.length >= 2
        ? { nr: 1, wort: "der höchste Rang",
            satz: "Das Licht steht an einem Winkel, und mehrere Begleiter stehen selbst stark. " +
              "Das ist die Stufe, bei der Ptolemäus von Menschen spricht, deren Name über " +
              "ihren Kreis hinausreicht und ihre Zeit überdauert. Er fügt aber hinzu: " +
              "Es sagt nichts darüber, wofür der Name steht." }
    : lichtWinkel && starkeWache.length === 1
        ? { nr: 2, wort: "ein hoher Rang",
            satz: "Das Licht steht an einem Winkel und hat einen starken Begleiter. " +
              "Ein Leben mit Ansehen in einem erkennbaren Feld — nicht Weltruhm, " +
              "aber ein Name, den man in der eigenen Sache kennt." }
    : lichtWinkel
        ? { nr: 2, wort: "ein hoher Rang, ohne Rückhalt",
            satz: "Das Licht steht an einem Winkel, aber die Begleiter stehen schwach. " +
              "Ptolemäus liest das als Aufstieg aus eigener Kraft, ohne die Stützen, " +
              "die andere haben — es geht höher, als die Herkunft erwarten ließ, " +
              "und es bleibt ungesichert." }
    : starkeWache.length
        ? { nr: 3, wort: "ein mittlerer Rang",
            satz: "Das Licht selbst steht nicht an einem Winkel, aber es hat starke Begleiter. " +
              "Das ist in dieser Lehre der Rang, der durch andere kommt: durch Gönner, " +
              "durch ein Amt, durch die Nähe zu jemandem, der selbst oben steht." }
        : { nr: 4, wort: "ein gewöhnlicher Rang",
            satz: "Weder steht das Licht an einem Winkel noch hat es starke Begleiter. " +
              "Ptolemäus nennt das den gewöhnlichen Lauf — und er meint es ohne Abwertung: " +
              "ein Leben, dessen Maß nicht die Zahl derer ist, die davon wissen." };

  return { art: "ruhm", titel: "Der Rang des Ruhms nach Ptolemäus",
           zeugen, stufe, wache,
           nachsatz: "Ptolemäus schreibt diese vier Stufen für eine Welt mit Königen und " +
             "Untertanen. Was er Rang nennt, heißt heute Reichweite — wie weit das, was " +
             "jemand tut, über ihn selbst hinauswirkt. Die Technik sagt nichts über den Wert " +
             "eines Lebens, und sie hat es nie getan." };
}

/* ===================================================================
   Die Oberfläche: zwölf Felder zum Anklicken.
   =================================================================== */

const el = (tag, cls, txt) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt != null) e.textContent = txt;
  return e;
};

const wahlZiel = document.getElementById("thWahl");
const ziel     = document.getElementById("thCikti");
let offen      = null;

function knoepfe() {
  if (!wahlZiel) return;
  wahlZiel.innerHTML = "";
  THEMEN.forEach(t => {
    const b = el("button", "themaKnopf", `${t.nr}. ${t.titel}`);
    b.dataset.nr = t.nr;
    b.addEventListener("click", () => zeige(t.nr));
    wahlZiel.appendChild(b);
  });
}

function zeige(nr) {
  if (!ziel) return;
  [...wahlZiel.querySelectorAll(".themaKnopf")]
    .forEach(b => b.classList.toggle("aktiv", Number(b.dataset.nr) === nr));

  const d = themaRechnen(nr);
  ziel.innerHTML = "";
  ziel.hidden = false;
  offen = nr;

  if (!d) {
    const m = el("div", "mangelKasten");
    m.appendChild(el("p", null,
      "Dafür fehlen die Geburtsdaten — Datum, Uhrzeit und der Ort mit gesuchten Koordinaten."));
    const b = el("button", "kleinDugme", "Zu meinen Daten");
    b.addEventListener("click", () => document.querySelector('[data-bolum="profil"]')?.click());
    m.appendChild(b);
    ziel.appendChild(m);
    return;
  }

  ziel.appendChild(el("h3", null, `${d.nr}. ${d.thema.titel}`));
  ziel.appendChild(el("p", "themaFrage", d.thema.frage));

  const kasten = el("div", `themaUrteil u-${d.urteil.stufe}`);
  kasten.appendChild(el("div", "themaUrteilWort", d.urteil.wort));
  kasten.appendChild(el("div", "kucukNot",
    `Die Zeugen zusammengezählt: ${d.punkte > 0 ? "+" : ""}${d.punkte}`));
  ziel.appendChild(kasten);

  ziel.appendChild(el("h4", null, "Die Zeugen, in der Reihenfolge ihres Gewichts"));
  const ul = el("ul", "zeugenListe");
  d.zeugen.forEach(z => {
    const li = el("li", z.gewicht > 0 ? "z-gut" : z.gewicht < 0 ? "z-schlecht" : "z-neutral");
    li.innerHTML = z.text +
      ` <span class="zGewicht">${z.gewicht > 0 ? "+" : ""}${z.gewicht}</span>`;
    ul.appendChild(li);
  });
  ziel.appendChild(ul);

  if (d.sonder) {
    const s = el("div", "sonderKasten");
    s.appendChild(el("h4", null, d.sonder.titel));
    if (d.sonder.art === "kinder") {
      s.appendChild(el("div", "buyukToplam", d.sonder.stufe.wort));
      s.appendChild(el("p", null, d.sonder.stufe.satz));
    } else {
      s.appendChild(el("div", "buyukToplam", `Stufe ${d.sonder.stufe.nr} von 4`));
      s.appendChild(el("div", "kalanBaslik", d.sonder.stufe.wort));
      s.appendChild(el("p", null, d.sonder.stufe.satz));
    }
    const u2 = el("ul", "zeugenListe");
    d.sonder.zeugen.forEach(t => { const li = el("li", "z-neutral"); li.textContent = t; u2.appendChild(li); });
    s.appendChild(u2);
    s.appendChild(el("p", "kucukNot", d.sonder.nachsatz));
    ziel.appendChild(s);
  }

  ziel.appendChild(el("p", "kucukNot",
    "Gerechnet wird nach den vier Zeugen des Bonatti: der Herr des Feldes und sein Stand, " +
    "wer im Feld steht, wer den Herrn ansieht, und der alte Anzeiger der Sache. " +
    "Die Zahl ist keine Note, sondern nur die Summe dieser Stimmen — sie zeigt, wie " +
    "einig oder uneinig sie sind."));
}

if (wahlZiel) {
  knoepfe();
  window.addEventListener("profil-geaendert", () => { if (offen) zeige(offen); });
}
