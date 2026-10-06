/* ------------------------------------------------------------------------
   crosscheck.js — bestätigen die Sterne, was das Orakel gesagt hat?

   Die Orakelkünste dieser Seite rechnen mit Buchstaben, Zahlen und Sand.
   Sie befragen den Augenblick, nicht den Himmel. Die alte Horarastrologie
   befragt denselben Augenblick — aber am Stand der Gestirne. Darum lässt
   sich das eine am anderen prüfen.

   Die mittelalterlichen Bücher taten das vor jedem Urteil. Bonatti nennt
   sie die "considerationes ante iudicium", William Lilly übersetzt sie als
   die Vorsichtsregeln: Fragen, die man stellt, bevor man überhaupt urteilt.
   Sie sagen nicht, ob die Antwort ja oder nein lautet — sondern ob dieser
   Augenblick eine Antwort hergibt.

     - Steht der Aszendent unter 3°, ist die Sache noch nicht reif.
     - Steht er über 27°, ist sie längst entschieden; es gibt nichts
       mehr zu fragen.
     - Läuft der Mond leer — bildet er keinen Aspekt mehr, ehe er sein
       Zeichen verlässt —, so wird nichts daraus.
     - Steht der Mond in der verbrannten Bahn, trübt das jedes Urteil.
     - Steht Saturn im ersten Feld, täuscht sich der Fragende selbst;
       steht er im siebten, irrt der Deuter.
     - Stimmt der Herr der Stunde mit dem Herrn des Aszendenten überein
       — oder ist er ihm wenigstens verwandt —, so gilt die Frage als
       echt: radikal, aus der Wurzel.

   Dazu kommt die zweite Prüfung, die inhaltliche: Der zunehmende Mond
   stützt, was zusagt; der abnehmende stützt, was absagt. Und die
   Mondstation des Augenblicks hat ihr eigenes Urteil, das zur Sache
   passen kann oder nicht.
   ------------------------------------------------------------------------ */

import { julianischesDatum, berechneGeburt, planetenPositionen, sonnenLaenge, norm360 } from "./astro.js?v=212";
import { MENZILLER, SAAT_SIRASI, GUN_SAHIBI, GUN_ADI } from "./korpus.js?v=212";
import { leseProfilRoh } from "./profil.js?v=212";
import { ZEICHEN } from "./horoskop.js?v=212";

const SEKTOR  = 360 / 28;
const DOMIZIL = ["mars","venus","merkur","mond","sonne","merkur",
                 "venus","mars","jupiter","saturn","saturn","jupiter"];
const DEUTSCH = { "Zühal":"saturn", "Müşteri":"jupiter", "Merih":"mars",
                  "Şems":"sonne", "Zühre":"venus", "Utarit":"merkur", "Kamer":"mond" };
const NAME_DE = { saturn:"Saturn", jupiter:"Jupiter", mars:"Mars", sonne:"die Sonne",
                  venus:"Venus", merkur:"Merkur", mond:"der Mond" };
/* Im Dativ reicht der Nominativ nicht: "zu der Sonne" heißt "zur Sonne". */
const NAME_DAT = { saturn:"Saturn", jupiter:"Jupiter", mars:"Mars", sonne:"zur Sonne",
                   venus:"Venus", merkur:"Merkur", mond:"zum Mond" };
const zuWem = k => NAME_DAT[k] && /^zu/.test(NAME_DAT[k]) ? NAME_DAT[k] : `zu ${NAME_DE[k]}`;
/* Die Triplizitäten — für die Frage, ob Stundenherr und Aszendentenherr
   wenigstens derselben Natur sind, wenn sie schon nicht derselbe sind. */
const NATUR = { sonne:"heiß", mars:"heiß", jupiter:"heiß",
                saturn:"kalt", mond:"kalt", venus:"kalt", merkur:"wandelbar" };

const ASPEKT_WINKEL = [0, 60, 90, 120, 180];
const REIHE6 = ["sonne","merkur","venus","mars","jupiter","saturn"];

/* Der Herr der Stunde — dieselbe Rechnung wie bei Niyet, damit beide
   Abschnitte vom selben Augenblick reden. */
function stundenHerr(d = new Date()) {
  let s = d.getHours() - 6, gun = d.getDay();
  if (s < 0) { s += 24; gun = (gun + 6) % 7; }
  const bas = SAAT_SIRASI.indexOf(GUN_SAHIBI[gun]);
  const tr  = SAAT_SIRASI[(bas + s) % 7];
  return { tr, key: DEUTSCH[tr], no: s + 1, gun: GUN_ADI[gun] };
}

/* Läuft der Mond leer? Er läuft leer, wenn er bis zum Ende seines
   Zeichens keinen Aspekt mehr zu einem der übrigen Planeten schließt. */
function laeuftLeer(jd, mondLaenge, positionen) {
  const bisZeichenEnde = 30 - (mondLaenge % 30);
  const tage = bisZeichenEnde / 13.176;           /* mittlerer Tageslauf */
  for (const k of REIHE6) {
    const p = positionen[k];
    if (!p) continue;
    const jetzt = norm360(mondLaenge - p.laenge);
    for (const w of ASPEKT_WINKEL) {
      /* Wie weit muss der Mond noch laufen, bis der Aspekt genau wird? */
      for (const ziel of (w === 0 || w === 180 ? [w] : [w, 360 - w])) {
        let rest = norm360(ziel - jetzt);
        if (rest > 0.01 && rest < bisZeichenEnde)
          return { leer: false, naechster: { planet: k, winkel: w, grad: rest,
                   stunden: Math.round(rest / 13.176 * 24) } };
      }
    }
  }
  return { leer: true, tage };
}

/* ------------------------------------------------- der Stand des Augenblicks */
export function augenblick(datum = new Date()) {
  /* julianischesDatum will Weltzeit; getTimezoneOffset zählt in die
     andere Richtung, darum plus statt minus. */
  const jd  = julianischesDatum(datum.getFullYear(), datum.getMonth() + 1, datum.getDate(),
                datum.getHours() + datum.getMinutes() / 60 + datum.getTimezoneOffset() / 60);
  const pos = planetenPositionen(jd);
  const mond = norm360(pos.mond.laenge);
  const sonne = norm360(sonnenLaenge(jd));
  const elong = norm360(mond - sonne);

  const stand = {
    datum, jd, positionen: pos,
    mondLaenge: mond,
    mondZeichen: Math.floor(mond / 30),
    mondGrad: mond % 30,
    zunehmend: elong < 180,
    menzilNr: Math.floor(mond / SEKTOR) % 28 + 1,
    menzil: MENZILLER[Math.floor(mond / SEKTOR) % 28],
    verbrannt: mond >= 195 && mond <= 225,
    leerlauf: laeuftLeer(jd, mond, pos),
    stunde: stundenHerr(datum),
    asc: null, ascZeichen: null, ascGrad: null, haeuser: null
  };

  /* Der Aszendent des Augenblicks — nur, wenn ein Ort bekannt ist. */
  const p = leseProfilRoh();
  if (p && Number.isFinite(+p.breite) && Number.isFinite(+p.laenge)) {
    try {
      const g = berechneGeburt(datum.getFullYear(), datum.getMonth() + 1, datum.getDate(),
                               datum.getHours(), datum.getMinutes(),
                               -datum.getTimezoneOffset() / 60, +p.breite, +p.laenge);
      stand.asc = norm360(g.asc);
      stand.ascZeichen = Math.floor(stand.asc / 30);
      stand.ascGrad = stand.asc % 30;
      stand.hausVon = l => ((Math.floor(norm360(l) / 30) - stand.ascZeichen + 12) % 12) + 1;
      stand.ort = p.ort || "";
    } catch (e) { /* ohne Aszendent weiterrechnen */ }
  }
  return stand;
}

/* --------------------------------------------- die Vorsichtsregeln */
export function vorsicht(st) {
  const punkte = [];
  let urteilsreif = 0;

  if (st.ascZeichen != null) {
    if (st.ascGrad < 3) {
      urteilsreif -= 2;
      punkte.push({ gut: false, schwer: true,
        text: `Über dem Horizont steht gerade erst der ${Math.floor(st.ascGrad) + 1}. Grad von ` +
          `${ZEICHEN[st.ascZeichen].glyph} ${ZEICHEN[st.ascZeichen].name}. Die alte Regel sagt: ` +
          `unter drei Grad ist die Sache noch nicht reif — man fragt zu früh, und es ist noch ` +
          `nichts da, worüber zu urteilen wäre.` });
    } else if (st.ascGrad > 27) {
      urteilsreif -= 2;
      punkte.push({ gut: false, schwer: true,
        text: `Über dem Horizont steht der ${Math.floor(st.ascGrad) + 1}. Grad von ` +
          `${ZEICHEN[st.ascZeichen].glyph} ${ZEICHEN[st.ascZeichen].name} — fast am Ende des Zeichens. ` +
          `Über siebenundzwanzig Grad gilt die Sache als bereits entschieden: Man fragt zu spät, ` +
          `die Antwort ist längst gefallen, auch wenn man sie noch nicht kennt.` });
    } else {
      urteilsreif += 1;
      punkte.push({ gut: true,
        text: `Über dem Horizont steht der ${Math.floor(st.ascGrad) + 1}. Grad von ` +
          `${ZEICHEN[st.ascZeichen].glyph} ${ZEICHEN[st.ascZeichen].name} — im mittleren Bereich. ` +
          `Die Sache ist reif genug zum Fragen und noch nicht entschieden.` });
    }

    /* Der Herr der Stunde und der Herr des Aszendenten. */
    const ascHerr = DOMIZIL[st.ascZeichen];
    if (ascHerr === st.stunde.key) {
      urteilsreif += 2;
      punkte.push({ gut: true,
        text: `Der Herr dieser Stunde und der Herr des Aufgehenden sind derselbe: ` +
          `${NAME_DE[ascHerr]}. Das ist die stärkste Bestätigung, die diese Prüfung kennt — ` +
          `die Frage gilt als <b>radikal</b>, aus der Wurzel gewachsen, nicht aus einer Laune.` });
    } else if (NATUR[ascHerr] === NATUR[st.stunde.key]) {
      urteilsreif += 1;
      punkte.push({ gut: true,
        text: `Der Herr dieser Stunde ist ${NAME_DE[st.stunde.key]}, der Herr des Aufgehenden ` +
          `${NAME_DE[ascHerr]} — nicht derselbe, aber von gleicher Natur. Die Bücher lassen das ` +
          `als Bestätigung gelten.` });
    } else {
      punkte.push({ gut: null,
        text: `Der Herr dieser Stunde ist ${NAME_DE[st.stunde.key]}, der Herr des Aufgehenden ` +
          `${NAME_DE[ascHerr]}. Sie haben nichts miteinander zu tun. Das spricht nicht gegen die ` +
          `Antwort, nimmt ihr aber das zusätzliche Gewicht.` });
    }

    /* Saturn im ersten oder siebten Feld. */
    const sat = st.positionen.saturn;
    if (sat && st.hausVon) {
      const h = st.hausVon(sat.laenge);
      if (h === 1) {
        urteilsreif -= 1;
        punkte.push({ gut: false,
          text: `Saturn steht im ersten Feld. Bonatti warnt an dieser Stelle nicht vor dem ` +
            `Schicksal, sondern vor dem Fragenden: Wer so fragt, hat die Antwort meist schon ` +
            `und sucht nur noch Bestätigung.` });
      } else if (h === 7) {
        urteilsreif -= 1;
        punkte.push({ gut: false,
          text: `Saturn steht im siebten Feld — dem Feld des Gegenübers. Die alte Regel richtet ` +
            `sich hier gegen den Deuter: Er wird sich irren. Lies also, was unten steht, mit ` +
            `mehr Vorbehalt als sonst.` });
      }
    }
  }

  /* Die verbrannte Bahn. */
  if (st.verbrannt) {
    urteilsreif -= 2;
    punkte.push({ gut: false, schwer: true,
      text: `Der Mond steht auf der <b>verbrannten Bahn</b> zwischen 15° Waage und 15° Skorpion. ` +
        `Die Wahlastrologie meidet diese Strecke für alles, was halten soll, und die Horarkunst ` +
        `urteilt dort nur ungern. Was jetzt beantwortet wird, bleibt vorläufig.` });
  }

  /* Der leerlaufende Mond. */
  if (st.leerlauf.leer) {
    urteilsreif -= 2;
    punkte.push({ gut: false, schwer: true,
      text: `Der Mond läuft leer: Bis er ${ZEICHEN[st.mondZeichen].glyph} ` +
        `${ZEICHEN[st.mondZeichen].name} verlässt, schließt er keinen Aspekt mehr. ` +
        `Lilly schreibt dazu den berühmtesten Satz dieser Lehre: Es wird nichts daraus. ` +
        `Nicht, dass die Antwort falsch wäre — es geschieht einfach nichts.` });
  } else {
    const n = st.leerlauf.naechster;
    urteilsreif += 1;
    punkte.push({ gut: true,
      text: `Der Mond läuft nicht leer: In etwa ${n.stunden} Stunden schließt er noch einen ` +
        `Aspekt ${zuWem(n.planet)} (${n.winkel}°), ehe er sein Zeichen verlässt. ` +
        `Die Sache nimmt also noch einen Verlauf — sie versandet nicht.` });
  }

  const stufe = urteilsreif >= 3  ? { wort: "Der Augenblick trägt", art: "ja" }
              : urteilsreif >= 1  ? { wort: "Der Augenblick ist brauchbar", art: "halb" }
              : urteilsreif >= -1 ? { wort: "Der Augenblick ist zweifelhaft", art: "halb" }
                                  : { wort: "Der Augenblick trägt nicht", art: "nein" };
  return { punkte, summe: urteilsreif, stufe };
}

/* ===================================================================
   Die zweite Prüfung: stützt der Himmel die Antwort selbst?

   Die erste Prüfung fragt nur, ob der Augenblick überhaupt etwas
   hergibt. Diese hier fragt, ob er in dieselbe Richtung zeigt wie
   das Orakel. Der zunehmende Mond stützt, was zusagt; der abnehmende
   stützt, was absagt — das ist die durchgehende Regel aller
   Wahlastrologie. Dazu kommt das Urteil der Mondstation selbst.
   =================================================================== */

/* Zusage oder Absage im Text des Orakels. Die Tafeln dieser Seite
   sprechen Deutsch, also wird Deutsch gelesen. */
const JA_WORT   = /\b(gut|sehr gut|günstig|glück|gelingt|gelingen|ja\b|erfüllt|erfüllung|zusage|trägt|wächst|kommt zustande|segen|fruchtbar|erfolg)/i;
const NEIN_WORT = /\b(schlecht|ungünstig|unglück|misslingt|vergeblich|nein\b|warte|warnung|meide|hüte|scheitert|verlust|nichts von gewicht|aufschub)/i;

/* Die Tafeln dieser Seite setzen ihr Urteil in ein eigenes Element —
   "Ja", "Nein", "Warte", "Hüte dich". Dieses Wort wiegt schwerer als
   der Fließtext darunter, der die Sache nur ausmalt. */
const URTEIL_JA   = /^(ja|evet|sehr gut|gut|günstig|glück)/i;
const URTEIL_NEIN = /^(nein|hayır|warte|bekle|hüte dich|sakın|kehr um|dön|frag anders|sor|schlecht|ungünstig|unglück)/i;

export function richtung(text, kern) {
  const t = String(text || "");
  let ja   = (t.match(JA_WORT) || []).length;
  let nein = (t.match(NEIN_WORT) || []).length;

  const k = String(kern || "").trim();
  if (k) {
    if (URTEIL_JA.test(k))   ja   += 3;
    if (URTEIL_NEIN.test(k)) nein += 3;
  }
  if (ja > nein) return "zusage";
  if (nein > ja) return "absage";
  return "offen";
}

export function stuetzt(st, richt) {
  const punkte = [];
  let p = 0;

  if (richt === "zusage") {
    if (st.zunehmend) { p += 2; punkte.push({ gut: true,
      text: "Der Mond nimmt zu. Das ist die Hälfte des Anfangens und des Wachsens — " +
            "sie stützt eine Zusage. Himmel und Tafel sagen hier dasselbe." }); }
    else { p -= 1; punkte.push({ gut: false,
      text: "Der Mond nimmt ab, die Tafel aber sagt zu. Das muss sich nicht widersprechen: " +
            "Die alte Regel liest es dann so, dass die Sache gelingt, aber langsamer — " +
            "oder dass sie aus etwas Altem hervorgeht statt aus einem Anfang." }); }
  } else if (richt === "absage") {
    if (!st.zunehmend) { p += 2; punkte.push({ gut: true,
      text: "Der Mond nimmt ab. Das ist die Hälfte des Abtragens und Beendens — " +
            "sie stützt eine Absage. Himmel und Tafel sagen hier dasselbe." }); }
    else { p -= 1; punkte.push({ gut: false,
      text: "Der Mond nimmt zu, die Tafel aber sagt ab. Die Bücher lesen das als Aufschub " +
            "statt als Ende: nicht jetzt, aber nicht nie." }); }
  } else {
    punkte.push({ gut: null,
      text: `Die Tafel sagt weder klar zu noch klar ab. Der Mond ` +
        `${st.zunehmend ? "nimmt zu — die Richtung des Anfangens" : "nimmt ab — die Richtung des Beendens"}; ` +
        `das ist alles, was der Himmel hier beisteuert.` });
  }

  /* Das Urteil der Station selbst. */
  const h = st.menzil.hukum.toLowerCase();
  if (/glück der glücke|günstigste|sehr günstig/.test(h)) {
    p += 2; punkte.push({ gut: true,
      text: `Der Mond steht in seiner ${st.menzilNr}. Herberge, ${st.menzil.tr} — ` +
        `und das ist eine der besten des Kreises: ${st.menzil.hukum}` });
  } else if (/nichts von gewicht|unglücklich|schwer|streit/.test(h)) {
    p -= 2; punkte.push({ gut: false,
      text: `Der Mond steht in seiner ${st.menzilNr}. Herberge, ${st.menzil.tr}, und ihr Urteil ` +
        `lautet: ${st.menzil.hukum} Das legt sich über die Antwort, wie sie auch ausfällt.` });
  } else {
    punkte.push({ gut: null,
      text: `Der Mond steht in seiner ${st.menzilNr}. Herberge, ${st.menzil.tr}: ` +
        `${st.menzil.hukum} Günstig für ${st.menzil.iyi.toLowerCase()}; meide ${st.menzil.kacin.toLowerCase()}.` });
  }

  return { punkte, summe: p };
}

/* ===================================================================
   Der ganze Crosscheck, fertig zum Anzeigen.
   =================================================================== */
export function crosscheck(antwortText, kernText) {
  const st = augenblick();
  const v  = vorsicht(st);
  const r  = richtung(antwortText, kernText);
  const s  = stuetzt(st, r);
  const ges = v.summe + s.summe;

  const schluss =
      ges >= 4  ? { art: "ja",   wort: "Der Himmel bestätigt",
                    satz: "Vorsichtsregeln und Mondstand sprechen beide für diese Antwort. " +
                      "Wenn zwei Künste, die nichts voneinander wissen, dasselbe sagen, ist das " +
                      "der Fall, in dem die alten Bücher zum Handeln raten." }
    : ges >= 1  ? { art: "halb", wort: "Der Himmel stimmt halb zu",
                    satz: "Einiges stützt die Antwort, anderes nicht. Das ist der gewöhnliche Fall — " +
                      "er heißt: Die Antwort gilt, aber nicht ohne Bedingungen." }
    : ges >= -2 ? { art: "halb", wort: "Der Himmel schweigt",
                    satz: "Die Zeugen heben einander auf. Die alte Lehre rät dann, in einer anderen " +
                      "Stunde noch einmal zu fragen — nicht, weil die Tafel sich ändert, sondern " +
                      "weil der Augenblick ein anderer sein wird." }
                : { art: "nein", wort: "Der Himmel widerspricht",
                    satz: "Die Prüfung fällt gegen diesen Augenblick aus. Das heißt nicht, dass die " +
                      "Tafel irrt — es heißt, dass jetzt nicht die Stunde ist, ihr Urteil zur " +
                      "Grundlage einer Entscheidung zu machen." };

  return { stand: st, vorsicht: v, stuetze: s, richtung: r, summe: ges, schluss };
}

/* ===================================================================
   Die Oberfläche: unter jedes Orakelergebnis ein Prüfkasten.

   Die Rechner selbst werden nicht angerührt. Der Kasten hängt sich
   neben ihre Ausgabe und erneuert sich, sobald die sich ändert.
   =================================================================== */

const el = (tag, cls, txt) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt != null) e.textContent = txt;
  return e;
};

function zeichneKasten(ziel, antwortText, was, kernText) {
  const c = crosscheck(antwortText, kernText);
  ziel.innerHTML = "";

  const kopf = el("div", `ccKopf cc-${c.schluss.art}`);
  kopf.appendChild(el("div", "ccWort", c.schluss.wort));
  kopf.appendChild(el("div", "ccSatz", c.schluss.satz));
  ziel.appendChild(kopf);

  const d = new Date();
  ziel.appendChild(el("p", "kucukNot",
    `Geprüft für ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")} Uhr — ` +
    `${c.stand.stunde.gun}, ${c.stand.stunde.no}. Stunde nach Sonnenaufgang, sie gehört ` +
    `${c.stand.stunde.tr}. ` +
    (c.stand.ascZeichen == null
      ? "Ohne Ort lässt sich der Aufgehende nicht rechnen — geprüft wird darum nur am Mond. " +
        "Trag unter „Meine Daten“ einen Geburtsort ein, dann kommen die vollen Vorsichtsregeln dazu."
      : `Gerechnet für ${c.stand.ort || "deinen Ort"}.`)));

  const t1 = el("h4", null, "Gibt dieser Augenblick ein Urteil her?");
  ziel.appendChild(t1);
  const u1 = el("ul", "zeugenListe");
  c.vorsicht.punkte.forEach(p => {
    const li = el("li", p.gut === true ? "z-gut" : p.gut === false ? "z-schlecht" : "z-neutral");
    li.innerHTML = p.text;
    u1.appendChild(li);
  });
  ziel.appendChild(u1);

  ziel.appendChild(el("h4", null, `Zeigt der Himmel in dieselbe Richtung wie ${was}?`));
  const u2 = el("ul", "zeugenListe");
  c.stuetze.punkte.forEach(p => {
    const li = el("li", p.gut === true ? "z-gut" : p.gut === false ? "z-schlecht" : "z-neutral");
    li.innerHTML = p.text;
    u2.appendChild(li);
  });
  ziel.appendChild(u2);

  ziel.appendChild(el("p", "kucukNot",
    "Geprüft wird nach den Vorsichtsregeln des Guido Bonatti, die William Lilly als " +
    "„considerations before judgement“ überliefert: Fragen, die vor jedem Urteil stehen und " +
    "nur eines klären — ob dieser Augenblick überhaupt eine Antwort hergibt. Dazu die Regel " +
    "des zu- und abnehmenden Mondes und das Urteil seiner Herberge."));
  ziel.hidden = false;
}

/* Hängt neben eine Ausgabe einen Prüfkasten, der mitläuft. */
function haengeAn(quelleId, was) {
  const quelle = document.getElementById(quelleId);
  if (!quelle) return;
  const ziel = el("div", "ccKasten");
  ziel.hidden = true;
  quelle.insertAdjacentElement("afterend", ziel);

  let letzte = "";
  const pruefe = () => {
    if (quelle.hidden) { ziel.hidden = true; return; }
    const txt = quelle.innerText.trim();
    if (!txt || txt === letzte) return;
    letzte = txt;
    /* Das Urteilswort steht in einem eigenen Element — Niyet und Raml
       setzen es als .hukumDe beziehungsweise .hukum, der Namensvergleich
       als erste Überschrift. */
    const kern = (quelle.querySelector(".hukumDe, .hukum, h3") || {}).textContent || "";
    zeichneKasten(ziel, txt, was, kern);
  };
  new MutationObserver(pruefe).observe(quelle,
    { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["hidden"] });
  pruefe();
}

haengeAn("niyetCikti", "die Absicht");
haengeAn("rmCikti",    "der Sand");
haengeAn("uyumCikti",  "der Namensvergleich");

/* ===================================================================
   Der Crosscheck für İsim uyumu — hier zählen zwei Geburten.

   Der Namensvergleich rechnet mit Buchstaben. Ob zwei Menschen
   zueinander passen, fragten die alten Bücher aber auch am Himmel,
   und dort nach wenigen, immer denselben Berührungen:

     - Mond zu Mond: ob zwei im selben Rhythmus leben.
     - Sonne zu Mond: die älteste aller Ehefiguren — einer gibt das
       Licht, der andere nimmt es auf.
     - Venus zu Mars: ob es zwischen ihnen zieht.
     - Venus zu Venus und Venus zu Jupiter: ob sie dasselbe schön
       und dasselbe richtig finden.

   Dafür braucht es von beiden Datum und Uhrzeit. Der Ort bleibt hier
   außen vor: Ohne ihn fehlen die Häuser, aber die Berührungen der
   Planeten untereinander stehen auch ohne ihn fest.
   =================================================================== */

const KONTAKTE = [
  { a:"mond",  b:"mond",    gut:[0,60,120], mittel:[90,180],
    ja:"Beide Monde berühren einander. Das ist der Kontakt, den die alten Bücher an die erste Stelle setzen: Zwei, die im selben Rhythmus wach und müde werden, streiten über weniger, als sie glauben.",
    spannung:"Die beiden Monde stehen gegeneinander. Das heißt nicht Streit, sondern Gegentakt: Was dem einen Ruhe ist, ist dem anderen Unruhe. Es lässt sich lernen, aber es lernt sich nicht von selbst." },
  { a:"sonne", b:"mond",    gut:[0,60,120], mittel:[90,180],
    ja:"Hier berührt eine Sonne den Mond des anderen. Das ist die älteste Ehefigur der ganzen Lehre — einer gibt das Licht, der andere nimmt es auf, und beide halten das für selbstverständlich.",
    spannung:"Sonne und Mond stehen einander gegenüber. Die Bücher lesen das als Anziehung durch Gegensatz: Es zieht stark, und es reibt ebenso stark." },
  { a:"venus", b:"mars",    gut:[0,60,120], mittel:[90,180],
    ja:"Venus berührt Mars. Zwischen diesen beiden zieht es; die Handschriften sind an dieser Stelle deutlicher, als man es von ihnen erwartet.",
    spannung:"Venus und Mars im harten Winkel. Es zieht, aber mit Funken. Was anzieht, ist genau das, was später aneinandergerät." },
  { a:"venus", b:"venus",   gut:[0,60,120], mittel:[90,180],
    ja:"Beide Venus berühren einander: Sie finden dasselbe schön. Das klingt klein und trägt über Jahre weiter als vieles Größere.",
    spannung:"Die beiden Venus stehen quer. Ihr Geschmack geht auseinander — in Dingen, über die man nicht streiten kann, weil sie keine Gründe haben." },
  { a:"venus", b:"jupiter", gut:[0,60,120], mittel:[],
    ja:"Venus und Jupiter berühren einander. Die alten Bücher nennen das den Segen über einem Bund: Es wird mehr daraus, als beide hineingelegt haben.",
    spannung:"" },
  { a:"saturn",b:"mond",    gut:[], mittel:[0,90,180],
    ja:"",
    spannung:"Hier liegt ein Saturn auf dem Mond des anderen. Das ist der ernsteste Kontakt dieser Liste: Er bindet fest und drückt zugleich. Die Bücher sagen, solche Bünde halten lange — und sie sagen nicht, dass sie leicht sind." }
];

function winkelZwischen(a, b) {
  return Math.abs(((a - b + 540) % 360) - 180);
}

export function synastrie(datumA, zeitA, datumB, zeitB) {
  const stell = (ds, zs) => {
    const [j, m, t] = ds.split("-").map(Number);
    const [h, mi]   = (zs || "12:00").split(":").map(Number);
    const jd = julianischesDatum(j, m, t, h + mi / 60);
    return planetenPositionen(jd);
  };
  let A, B;
  try { A = stell(datumA, zeitA); B = stell(datumB, zeitB); }
  catch (e) { return null; }

  const treffer = [];
  let punkte = 0;

  KONTAKTE.forEach(k => {
    /* Jede Berührung in beide Richtungen prüfen — Sonne des einen zum
       Mond des anderen ist etwas anderes als umgekehrt. */
    [[A, B, 1], [B, A, 2]].forEach(([x, y, wer]) => {
      if (k.a === k.b && wer === 2) return;           /* Mond–Mond nur einmal */
      const px = x[k.a], py = y[k.b];
      if (!px || !py) return;
      const w = winkelZwischen(px.laenge, py.laenge);
      const orbis = (k.a === "mond" || k.b === "mond") ? 8 : 6;

      for (const ziel of k.gut) {
        if (Math.abs(w - ziel) <= orbis) {
          punkte += ziel === 0 ? 3 : 2;
          treffer.push({ gut: true, text: k.ja, winkel: ziel,
            wie: `${NAME_DE[k.a]} ${wer === 1 ? "des ersten" : "des zweiten"} und ` +
                 `${NAME_DE[k.b]} ${wer === 1 ? "des zweiten" : "des ersten"}, ` +
                 `${ziel}° (${Math.abs(w - ziel).toFixed(1)}° genau)` });
          return;
        }
      }
      for (const ziel of k.mittel) {
        if (Math.abs(w - ziel) <= orbis) {
          punkte += k.spannung ? (k.a === "saturn" ? -2 : -1) : 1;
          treffer.push({ gut: false, text: k.spannung || k.ja, winkel: ziel,
            wie: `${NAME_DE[k.a]} ${wer === 1 ? "des ersten" : "des zweiten"} und ` +
                 `${NAME_DE[k.b]} ${wer === 1 ? "des zweiten" : "des ersten"}, ` +
                 `${ziel}° (${Math.abs(w - ziel).toFixed(1)}° genau)` });
          return;
        }
      }
    });
  });

  const schluss =
      !treffer.length
        ? { art: "halb", wort: "Der Himmel sagt nichts dazu",
            satz: "Zwischen diesen beiden Geburten steht keine der klassischen Berührungen. " +
              "Das ist kein schlechtes Zeichen — es heißt, dass nichts von außen mitspielt, " +
              "weder ziehend noch bremsend. Was zwischen euch ist, kommt von euch." }
    : punkte >= 5
        ? { art: "ja", wort: "Der Himmel bestätigt",
            satz: "Mehrere der alten Berührungen stehen zwischen euch, und die meisten tragen. " +
              "Namensrechnung und Himmel sagen hier dasselbe." }
    : punkte >= 1
        ? { art: "halb", wort: "Der Himmel stimmt halb zu",
            satz: "Es gibt Berührungen, und sie sind gemischt. Das ist der gewöhnliche Fall bei " +
              "zwei wirklichen Menschen — die Bücher halten ihn für tragfähiger als die " +
              "ungetrübte Übereinstimmung, weil er etwas zu tun übrig lässt." }
        : { art: "nein", wort: "Der Himmel mahnt",
            satz: "Die Berührungen, die hier stehen, sind überwiegend die schweren. Das spricht " +
              "nicht gegen den Bund — die alten Bücher sagen bei genau dieser Lage, dass er hält, " +
              "aber dass er Arbeit ist, und zwar von Anfang an." };

  return { treffer, punkte, schluss };
}

/* -------------------- die Oberfläche für den Vergleich zweier Geburten */
function zeichneSynastrie() {
  const ziel = document.getElementById("uyumHimmel");
  if (!ziel) return;
  const w = id => (document.getElementById(id) || {}).value || "";
  const dA = w("u1datum"), zA = w("u1zeit"), dB = w("u2datum"), zB = w("u2zeit");

  ziel.innerHTML = "";
  if (!dA || !dB) {
    ziel.appendChild(el("p", "kucukNot",
      "Sobald beide Geburtstage dastehen, wird hier gerechnet."));
    return;
  }

  const sy = synastrie(dA, zA, dB, zB);
  if (!sy) { ziel.appendChild(el("p", "kucukNot", "Die Daten ließen sich nicht lesen.")); return; }

  const kopf = el("div", `ccKopf cc-${sy.schluss.art}`);
  kopf.appendChild(el("div", "ccWort", sy.schluss.wort));
  kopf.appendChild(el("div", "ccSatz", sy.schluss.satz));
  ziel.appendChild(kopf);

  if (sy.treffer.length) {
    const ul = el("ul", "zeugenListe");
    sy.treffer.forEach(t => {
      const li = el("li", t.gut ? "z-gut" : "z-schlecht");
      li.innerHTML = `${t.text} <span class="zGewicht">${t.wie}</span>`;
      ul.appendChild(li);
    });
    ziel.appendChild(ul);
  }

  ziel.appendChild(el("p", "kucukNot",
    "Gerechnet werden nur die Berührungen der Planeten untereinander — dafür " +
    "braucht es keinen Geburtsort. Ohne Uhrzeit steht der Mond bis zu sechs Grad " +
    "daneben; die übrigen Berührungen bleiben davon unberührt."));
}

["u1datum","u1zeit","u2datum","u2zeit"].forEach(id => {
  const f = document.getElementById(id);
  if (f) f.addEventListener("change", zeichneSynastrie);
});
if (document.getElementById("uyumHimmel")) zeichneSynastrie();
