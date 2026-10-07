/* ------------------------------------------------------------------------
   planeten.js — die sieben Wandelsterne, wie die magische Astrologie
   sie beschreibt.

   Die rechnende Astrologie sagt, wo ein Planet steht. Was er ist, sagt
   sie nicht — das steht in anderen Büchern. Im "Picatrix", dem
   arabischen Ġāyat al-Ḥakīm aus dem zehnten Jahrhundert, das im
   dreizehnten ins Lateinische kam, und bei Agrippa in der "Occulta
   Philosophia". Diese Bücher geben jedem Planeten eine Gestalt, ein
   Metall, einen Tag, eine Farbe und eine lange Liste dessen, was er
   bedeutet: Berufe, Körperteile, Steine, Pflanzen, Lebensalter.

   Die Gestalten unten sind die des Picatrix. Er beschreibt sie, damit
   man sie in Stein schneiden kann — das war ihr Zweck. Hier stehen sie
   aus einem anderen Grund: Wer die Gestalt vor Augen hat, versteht die
   Deutungen dieser Seite schneller als über jede Definition.
   ------------------------------------------------------------------------ */

import { WANDELSTERNE_IT, PLANETEN_UI_IT } from "./planeten-it.js?v=253";
import { WANDELSTERNE_EN, PLANETEN_UI_EN } from "./planeten-en.js?v=253";
import { aktuelleSprache } from "./sprachen.js?v=253";

export const WANDELSTERNE = [
  { key: "saturn", name: "Saturn", glyph: "♄", tr: "Zühal",
    metall: "Blei", tag: "Samstag", natur: "kalt und trocken",
    farbe: "Schwarz", alter: "das Greisenalter",
    gestalt: "Ein hagerer Mann auf einem Drachen stehend, ganz in Schwarz, das " +
      "Gesicht im Schatten der Kapuze, ein Rabe auf der Schulter. In der Rechten " +
      "eine Sichel, in der Linken ein Speer, der in die Erde zeigt.",
    bedeutet: "Den Vater und das Alter. Tod und Erbe. Grund und Boden, Äcker, " +
      "Bergwerke, alles Tiefe und Verborgene. Bauern, Bergleute, Gerber, " +
      "Totengräber, Mönche und Einsiedler. Gefängnis und Einsamkeit. Geduld. " +
      "Alles, was lange braucht und lange bleibt.",
    gedanke: "Saturn ist der äußerste der sieben und der langsamste — dreißig " +
      "Jahre für einen Umlauf. Darum machten ihn die alten Bücher zum Hüter der " +
      "Grenze: Wo er steht, ist etwas zu Ende, und wo etwas zu Ende ist, fängt " +
      "etwas an, das länger hält. Er gilt als der schwerere der beiden Übeltäter — " +
      "aber bei Tagesgeburten milder, weil er die Kälte der Nacht nicht noch " +
      "verstärkt." },

  { key: "jupiter", name: "Jupiter", glyph: "♃", tr: "Müşteri",
    metall: "Zinn", tag: "Donnerstag", natur: "warm und feucht",
    farbe: "Blau und Purpur", alter: "die reifen Jahre",
    gestalt: "Ein gekrönter Mann im safrangelben Gewand auf einem Adler mit " +
      "ausgebreiteten Schwingen. Die Rechte offen zum Urteil erhoben, in der " +
      "Linken eine geschlossene Rolle.",
    bedeutet: "Den Richter und das Gesetz. Reichtum, Kinder, Erbe im guten Sinn. " +
      "Glauben, Priester, Gelehrte, Rechtskundige. Großmut, Vertrauen, Maß. " +
      "Alles, was wächst, weil man es wachsen lässt.",
    gedanke: "Jupiter heißt der größere Wohltäter, und die Bücher begründen das " +
      "nicht damit, dass er Gutes tut, sondern damit, dass er Raum gibt. Wo er " +
      "steht, ist mehr Platz als nötig. Bei Nachtgeburten tritt er hinter Venus " +
      "zurück — nicht weil er schwächer wäre, sondern weil die Nacht die " +
      "leisere Wohltat vorzieht." },

  { key: "mars", name: "Mars", glyph: "♂", tr: "Merih",
    metall: "Eisen", tag: "Dienstag", natur: "heiß und trocken",
    farbe: "Rot", alter: "die Jugend",
    gestalt: "Ein geharnischter Mann auf einem Löwen, den Helm auf dem Kopf, " +
      "in der erhobenen Rechten ein blankes Schwert. Hinter ihm Flammen.",
    bedeutet: "Krieg und Waffen. Feuer, Schmiede, Schlachter, Wundärzte — alles " +
      "Schneidende. Brüder und Streit. Zorn und Mut. Diebe und Räuber. Fieber, " +
      "Wunden, und alles, was plötzlich kommt.",
    gedanke: "Mars trennt. Jeder Schnitt gehört ihm — der des Wundarztes wie der " +
      "des Mörders, und die alten Bücher machen zwischen beiden keinen " +
      "Unterschied, weil der Schnitt derselbe ist. Er ist der schwerere " +
      "Übeltäter bei Nachtgeburten; bei Tag ist er bloß schnell." },

  { key: "sonne", name: "die Sonne", glyph: "☉", tr: "Şems",
    metall: "Gold", tag: "Sonntag", natur: "heiß und trocken",
    farbe: "Gold", alter: "die Mitte des Lebens",
    gestalt: "Ein König auf dem Thron, von vorn gesehen, eine Strahlenkrone auf " +
      "dem Haupt, eine goldene Scheibe vor der Brust, ein Rabe zu seinen Füßen.",
    bedeutet: "Den König und den Vater. Ehre, Rang, Ansehen. Das Augenlicht und " +
      "das Herz. Gold, Edelsteine, alles Leuchtende. Fürsten, Richter, Väter. " +
      "Das Leben selbst.",
    gedanke: "Die Sonne ist nicht der stärkste der sieben, sondern die Mitte: " +
      "Alles andere wird an ihr gemessen. Daher die eigentümliche Regel, dass " +
      "sie verbrennt, was ihr zu nahe kommt — ein Planet in ihrer Nähe wirkt " +
      "weiter, aber niemand sieht ihn mehr. Nur wer ihr ganz nah kommt, näher " +
      "als ein Drittel Grad, steht in ihrem Herzen und ist dann der " +
      "begünstigtste von allen." },

  { key: "venus", name: "Venus", glyph: "♀", tr: "Zühre",
    metall: "Kupfer", tag: "Freitag", natur: "kalt und feucht",
    farbe: "Grün und Weiß", alter: "die jungen Jahre",
    gestalt: "Eine Frau mit gelöstem Haar auf einem weißen Hirsch, weiß " +
      "gekleidet, in der Rechten einen Apfel, in der Linken Blumen, ein kleiner " +
      "Spiegel am Gürtel. Tauben in der Luft um sie her.",
    bedeutet: "Ehe und Liebe. Schönheit, Musik, Tanz, Kleider, Schmuck, " +
      "Wohlgeruch. Die Mutter bei Nachtgeburten. Freude, Spiel, Gastmahl. " +
      "Maler, Musikanten, Weber und alle, die mit Schönem handeln.",
    gedanke: "Venus bindet, was Mars trennt — das ist das älteste Gegensatzpaar " +
      "dieser Lehre. Was sie berührt, will beieinanderbleiben. Bei Nachtgeburten " +
      "ist sie der größere Wohltäter: Die Nacht gehört dem Weichen." },

  { key: "merkur", name: "Merkur", glyph: "☿", tr: "Utarit",
    metall: "Quecksilber", tag: "Mittwoch", natur: "wandelbar",
    farbe: "Alle Farben zugleich", alter: "die Kindheit",
    gestalt: "Ein schlanker bartloser Jüngling auf einem Pfau, geflügelte " +
      "Sohlen an den Füßen, in der Rechten ein Rohrkiel, in der Linken eine " +
      "offene Wachstafel, ein Hahn an seiner Seite.",
    bedeutet: "Rede und Schrift. Handel, Rechnen, Verträge. Boten, Schreiber, " +
      "Kaufleute, Gelehrte — und Diebe und Betrüger, denn beide leben von der " +
      "Geschicklichkeit. Geschwister, Nachrichten, kurze Wege. Gedächtnis und Witz.",
    gedanke: "Merkur hat als einziger keine eigene Natur. Die Bücher sagen: Er " +
      "nimmt die Natur dessen an, bei dem er steht — bei Saturn wird er schwer, " +
      "bei Venus gefällig, bei Mars scharf. Deshalb ist er in keiner Liste " +
      "Wohltäter und in keiner Übeltäter." },

  { key: "mond", name: "der Mond", glyph: "☽", tr: "Kamer",
    metall: "Silber", tag: "Montag", natur: "kalt und feucht",
    farbe: "Weiß und Silber", alter: "die ersten Jahre",
    gestalt: "Eine Frau mit ruhigem Gesicht auf einem Drachen, zwei " +
      "Mondhörner am Kopf, in jeder Hand eine Schlange. Hinter ihr der volle " +
      "Mond, unter ihr Wasser und ein Gefäß mit Milch.",
    bedeutet: "Die Mutter. Nahrung und alles Nährende. Wachstum, Wasser, Milch, " +
      "alle Säfte. Das Volk und die Menge. Reisen über Wasser. <b>Wissen</b> — " +
      "denn der Mond trägt das Licht der anderen weiter. <b>Ehre</b>, wenn er " +
      "voll steht. Und das <b>Opfer</b>: Er nimmt jeden Monat ab, ehe er " +
      "wiederkommt.",
    gedanke: "Der Mond hat kein eigenes Licht, und genau darauf beruht seine " +
      "Stellung in dieser Lehre. Er ist der Bote zwischen oben und unten — was " +
      "im Himmel geschieht, erreicht die Erde durch ihn. Darum ist er der " +
      "wichtigste Zeiger der ganzen Horarkunst: Nicht weil er viel bedeutet, " +
      "sondern weil er alles weiterreicht. Die arabische Lehre nennt das die " +
      "Übertragung des Lichts." }
];

/* ------------------------------------------------------- die Sprachschalter */
const DE_FELDER = ["name","metall","tag","natur","farbe","alter","gestalt","bedeutet","gedanke"];
const WANDEL_DE = WANDELSTERNE.map(p => Object.fromEntries(DE_FELDER.map(f => [f, p[f]])));

const UI_DE = { titel:"Die sieben Wandelsterne", metall:"Metall", tag:"Tag", natur:"Natur",
  farbe:"Farbe", alter:"Lebensalter", gestalt:"Die Gestalt im Picatrix.",
  bedeutet:"Was er bedeutet.",
  note:"Die Bilder sind nach den Beschreibungen des Picatrix angefertigt, nicht aus einer " +
       "Handschrift abgezeichnet — die mittelalterlichen Abschriften enthalten die Gestalten " +
       "als Text, nicht als Bild." };
let UI = UI_DE;

export function setzePlanetenSprache(code) {
  const SPRACHEN = {
    it: { ui: PLANETEN_UI_IT, sterne: WANDELSTERNE_IT },
    en: { ui: PLANETEN_UI_EN, sterne: WANDELSTERNE_EN }
  };
  const L = SPRACHEN[code] || null;
  UI = L ? { ...UI_DE, ...L.ui } : UI_DE;
  WANDELSTERNE.forEach((p, i) => {
    const q = L ? L.sterne[p.key] : WANDEL_DE[i];
    if (!q) return;
    DE_FELDER.forEach(f => { if (q[f] !== undefined) p[f] = q[f]; });
  });
}

/* ------------------------------------------------------------- Oberfläche */
const ziel = document.getElementById("wandelsterne");
function zeichneSterne() {
  if (!ziel) return;
  ziel.innerHTML = "";
  {
  const el = (tag, cls, txt) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  };

  WANDELSTERNE.forEach(p => {
    const karte = el("article", "sternKarte");

    const bild = document.createElement("img");
    bild.src = `bilder/planet-${p.key}.jpg`;
    bild.alt = `${p.name} nach der Beschreibung des Picatrix`;
    bild.loading = "lazy";
    bild.className = "sternBild";
    karte.appendChild(bild);

    /* Der Name ist ein eigenes Kind der Karte, nicht Teil der Textspalte:
       Dann kann er am Handy über das Bild rücken und am Schirm daneben
       stehen bleiben — siehe grid-template-areas in stil.css. */
    const kopf = el("h3", "sternName");
    kopf.innerHTML = `<span class="sternGlyph">${p.glyph}</span> ${p.name} ` +
      `<span class="sternTr">${p.tr}</span>`;
    karte.appendChild(kopf);

    const text = el("div", "sternText");

    const daten = el("div", "sternDaten");
    [[UI.metall, p.metall], [UI.tag, p.tag], [UI.natur, p.natur],
     [UI.farbe, p.farbe], [UI.alter, p.alter]].forEach(([k, v]) => {
      const z = el("div", "sternDatum");
      z.appendChild(el("span", "sternSchild", k));
      z.appendChild(el("span", null, v));
      daten.appendChild(z);
    });
    text.appendChild(daten);

    const g = el("p", "sternGestalt");
    g.innerHTML = `<b>${UI.gestalt}</b> ${p.gestalt}`;
    text.appendChild(g);

    const b = el("p");
    b.innerHTML = `<b>${UI.bedeutet}</b> ${p.bedeutet}`;
    text.appendChild(b);

    const d = el("p", "sternGedanke");
    d.innerHTML = p.gedanke;
    text.appendChild(d);

    karte.appendChild(text);
    ziel.appendChild(karte);
  });
}
}

setzePlanetenSprache(aktuelleSprache());
zeichneSterne();
window.addEventListener("sprache-geaendert", e => {
  setzePlanetenSprache(e.detail);
  zeichneSterne();
});
