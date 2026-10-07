/* ------------------------------------------------------------------------
   sprache.js — die Bildersprache der Essenz.

   Die einzelnen Abschnitte dürfen Fachwörter benutzen; dort gehören sie
   hin, dort kann man sie nachschlagen. Die Essenz nicht. Wer sie liest,
   will nicht wissen, was ein Almuten ist, sondern was gemeint ist.

   Darum hier zu jedem Stück eine Gestalt statt eines Begriffs: die
   Planeten als Figuren aus Mythos und Fabel, die Zeichen als Bilder, die
   Häuser als Orte. Die Rechnung bleibt dieselbe — nur die Sprache
   wechselt.
   --------------------------------------------------------------------- */

const FIGUR_DE = {
  sonne: {
    figur: "der König im Licht", dat: "dem König im Licht", akk: "den König im Licht",
    kurz: "der König", pron: "er",
    tut: "will gesehen werden und muss es auch",
    fabel: "Helios, der jeden Morgen den Wagen besteigt, weil es sonst niemand täte",
    gabe: "Ansehen und ein großes Herz",
    preis: "die Eitelkeit, die sich für Großmut hält"
  },
  mond: {
    figur: "die Wandernde mit den vielen Gesichtern", dat: "der Wandernden mit den vielen Gesichtern", akk: "die Wandernde mit den vielen Gesichtern",
    kurz: "die Wandernde", pron: "sie",
    tut: "zeigt jede Nacht ein anderes Gesicht und ist doch dieselbe",
    fabel: "Penelope am Webstuhl, die nachts auftrennt, was sie am Tag gewebt hat — nicht aus Unentschlossenheit, sondern um Zeit zu gewinnen",
    gabe: "Gespür und ein Gedächtnis für das, was andere vergessen",
    preis: "die fremde Stimmung, die man für die eigene hält"
  },
  merkur: {
    figur: "der Bote mit den Flügelschuhen", dat: "dem Boten mit den Flügelschuhen", akk: "den Boten mit den Flügelschuhen",
    kurz: "der Bote", pron: "er",
    tut: "geht zwischen den Welten hin und her und bringt mit, was er dort hört",
    fabel: "Hermes, der am ersten Tag seines Lebens die Rinder stahl und am Abend die Leier erfand, um sich freizukaufen",
    gabe: "Rede, Rechnung und der Blick für den Umweg",
    preis: "die Unruhe, die nichts zu Ende bringt"
  },
  venus: {
    figur: "die Gärtnerin mit dem Apfel", dat: "der Gärtnerin mit dem Apfel", akk: "die Gärtnerin mit dem Apfel",
    kurz: "die Gärtnerin", pron: "sie",
    tut: "stiftet Frieden, wo Frieden möglich ist, und macht ihn schön, wo er brüchig bleibt",
    fabel: "die Gärtnerin, die weiß, dass man nichts wachsen machen kann — nur gießen und warten",
    gabe: "Anmut, Maß und die leichte Hand",
    preis: "das Ausweichen, bis der Streit einen selbst sucht"
  },
  mars: {
    figur: "der Schmied am Feuer", dat: "dem Schmied am Feuer", akk: "den Schmied am Feuer",
    kurz: "der Schmied", pron: "er",
    tut: "entscheidet mit dem Hammer, nicht mit dem Wort",
    fabel: "der Schmied, der das Eisen nur dann biegen kann, wenn es glüht — und der weiß, dass das Fenster kurz ist",
    gabe: "Mut und die Kraft, den ersten Schlag zu tun",
    preis: "der Streit, den man gewinnt, während man den Menschen verliert"
  },
  jupiter: {
    figur: "der Gastgeber mit der offenen Tafel", dat: "dem Gastgeber mit der offenen Tafel", akk: "den Gastgeber mit der offenen Tafel",
    kurz: "der Gastgeber", pron: "er",
    tut: "macht Platz, lädt ein, spricht Recht",
    fabel: "Philemon und Baucis, die zwei Fremde aufnahmen und erst hinterher merkten, wen sie bewirtet hatten",
    gabe: "Weite, Zuversicht und Menschen, die einem die Tür aufhalten",
    preis: "das Übermaß, das sich für Großzügigkeit ausgibt"
  },
  saturn: {
    figur: "der Alte mit der Sichel", dat: "dem Alten mit der Sichel", akk: "den Alten mit der Sichel",
    kurz: "der Alte", pron: "er",
    tut: "mäht ab, was seine Zeit hatte, und baut, was länger steht als er selbst",
    fabel: "der Steinmetz, der Quader setzt, von denen er weiß, dass er den fertigen Bau nicht sehen wird",
    gabe: "Ausdauer und etwas, das bleibt",
    preis: "die Härte gegen sich selbst, lange bevor andere hart werden"
  },
  kopf:    { figur:"die Tür, die aufgeht", dat:"der Tür, die aufgeht", akk:"die Tür, die aufgeht", kurz:"die offene Tür", pron:"sie", tut:"lässt herein",
             fabel:"die Schwelle, über die man zum ersten Mal tritt", gabe:"Zuwachs", preis:"Unübersicht" },
  schwanz: { figur:"die Tür, die zufällt", dat:"der Tür, die zufällt", akk:"die Tür, die zufällt", kurz:"die zufallende Tür", pron:"sie", tut:"lässt hinaus",
             fabel:"die Schwelle, über die man zum letzten Mal tritt", gabe:"Freiheit", preis:"Verlust" },
  rahu:    { figur:"der Hunger nach dem Fremden", dat:"dem Hunger nach dem Fremden", akk:"den Hunger nach dem Fremden", kurz:"der Hunger", pron:"er", tut:"zieht hinaus",
             fabel:"der Kopf, der verschlingt und nie satt wird", gabe:"Aufstieg", preis:"der Beigeschmack" },
  ketu:    { figur:"das Loslassen", dat:"dem Loslassen", akk:"das Loslassen", kurz:"das Loslassen", pron:"es", tut:"legt ab",
             fabel:"der Rest, der bleibt, wenn man aufgehört hat zu greifen", gabe:"Freiheit", preis:"Leere" }
};

/* Die zwölf Zeichen als Bild, nicht als Name. */
const BILD_DE = [
  "der erste Trieb, der durch den Frost stößt",
  "der Garten, der trägt, weil ihn jemand hält",
  "zwei, die sich unterhalten und dabei weitergehen",
  "das Haus mit dem Feuer darin",
  "die Mitte des Raums, wo das Licht hinfällt",
  "die Hand, die sortiert, was durcheinandergeriet",
  "die Waagschale, die noch schwankt",
  "das Wasser, das tief steht und nicht zeigt, wie tief",
  "der Pfeil, der schon fort ist, während man noch zielt",
  "der Pfad, der am Hang hinaufführt",
  "der Krug, aus dem für alle gegossen wird",
  "das Meer, in dem die Umrisse weich werden"
];

/* Die zwölf Orte in gewöhnlichen Worten. */
const ORT_DE = [
  "bei dir selbst, an Leib und Auftreten",
  "bei dem, was du besitzt und verdienst",
  "auf den kurzen Wegen, unter Geschwistern und Nachrichten",
  "zu Hause, bei Herkunft und Eltern",
  "bei Kindern, Lust und allem, was du hervorbringst",
  "in der Arbeit, im Dienst und bei der Gesundheit",
  "beim Anderen — in der Ehe, in Verträgen, bei offenen Gegnern",
  "bei dem, was von anderen kommt: Erbe, Schulden, Anvertrautes",
  "in der Fremde, in Lehre und Glauben",
  "im Amt und im Ruf",
  "unter Freunden, in Bünden und Hoffnungen",
  "im Verborgenen, bei dem, was dir selbst im Weg steht"
];

/* Wie zwei Gestalten zueinander stehen. */
const NAEHE_DE = {
  "Konjunktion": "stehen so dicht beieinander, dass man sie kaum trennen kann",
  "Opposition":  "stehen einander gegenüber wie zwei, die sich über einen Tisch hinweg ansehen",
  "Quadrat":     "reiben sich aneinander; was der eine aufbaut, stellt der andere in Frage",
  "Trigon":      "kommen gut miteinander aus, fast zu gut — es geht leicht, und das Leichte wird selten geprüft",
  "Sextil":      "reichen einander die Hand, wenn man sie darum bittet"
};

/* Zustand eines Planeten, ohne die Fachwörter. */
const STAND_DE = {
  "Domizil":  "Dort ist sie auf eigenem Grund: Da muss niemand um Erlaubnis gebeten werden.",
  "Erhöhung": "Dort wird mehr erwartet, als das eigene Maß hergibt — wie bei einem Gast, den man überschätzt und der sich nichts anmerken lässt.",
  "Exil":     "Dort ist fremdes Land: Nichts kommt von selbst, alles muss erarbeitet werden.",
  "Fall":     "Dort hört man nicht gern zu. Alles braucht dort doppelt so lange wie anderswo.",
  "—":        "Dort wird nichts begünstigt und nichts behindert: Es hängt an den Umständen und an dir."
};

export const figurVon = k => FIGUR[k] || { figur:k, dat:k, akk:k, kurz:k, pron:"es", tut:"", fabel:"", gabe:"", preis:"" };

/* Die Bilder im Dativ — "bei dem Haus mit dem Feuer darin". */
const DAT_ART = { der: "dem", die: "der", das: "dem", zwei: "zweien," };
const bildDat_DE = i => {
  const b = BILD_DE[i];
  if (!b) return b;
  const m = b.match(/^(der|die|das|zwei)\b(.*)$/);
  if (!m) return b;
  return m[1] === "zwei" ? "zweien" + m[2].replace(/^, /, ", ") : DAT_ART[m[1]] + m[2];
};

/* ------------------------------------------------------ die Sprachschalter
   Die Exporte sind absichtlich mit let gebunden: ES-Module geben lebende
   Bindungen weiter, darum sehen alle Abschnitte sofort die andere Tafel,
   sobald hier umgehängt wird. */
import { FIGUR_IT, BILD_IT, ORT_IT, NAEHE_IT, STAND_IT, bildDat_IT } from "./sprache-it.js?v=253";
import { FIGUR_EN, BILD_EN, ORT_EN, NAEHE_EN, STAND_EN, bildDat_EN } from "./sprache-en.js?v=253";
import { aktuelleSprache } from "./sprachen.js?v=253";

export let FIGUR = FIGUR_DE, BILD = BILD_DE, ORT = ORT_DE,
           NAEHE = NAEHE_DE, STAND = STAND_DE, bildDat = bildDat_DE;

/* Eine Tafel statt einer Weiche: Eine weitere Sprache ist eine Datei und
   eine Zeile hier, nicht ein weiteres Fragezeichen in sechs Zuweisungen. */
const TAFELN = {
  de: { FIGUR: FIGUR_DE, BILD: BILD_DE, ORT: ORT_DE,
        NAEHE: NAEHE_DE, STAND: STAND_DE, bildDat: bildDat_DE },
  it: { FIGUR: FIGUR_IT, BILD: BILD_IT, ORT: ORT_IT,
        NAEHE: NAEHE_IT, STAND: STAND_IT, bildDat: bildDat_IT },
  en: { FIGUR: FIGUR_EN, BILD: BILD_EN, ORT: ORT_EN,
        NAEHE: NAEHE_EN, STAND: STAND_EN, bildDat: bildDat_EN }
};

/* Welche Sprachen haben eine eigene Bildersprache? Die übrigen fallen
   auf Deutsch zurück, bis sie übersetzt sind. */
export const TEXTSPRACHEN = Object.keys(TAFELN);

export function setzeTextsprache(code) {
  const t = TAFELN[code] || TAFELN.de;
  FIGUR = t.FIGUR; BILD = t.BILD; ORT = t.ORT;
  NAEHE = t.NAEHE; STAND = t.STAND; bildDat = t.bildDat;
}

setzeTextsprache(aktuelleSprache());
window.addEventListener("sprache-geaendert", e => setzeTextsprache(e.detail));
