/* ------------------------------------------------------------------------
   elektion.js — den rechten Zeitpunkt wählen.

   Die Wahlastrologie fragt nicht, wer du bist, sondern wann etwas beginnen
   soll. Ihr ältestes und einfachstes Werkzeug sind die achtundzwanzig
   Mondstationen: Der Mond zieht in gut siebenundzwanzig Tagen durch sie
   hindurch und wechselt fast täglich die Herberge; jede hat, wofür sie
   taugt und wovor sie warnt. Dazu treten die klassischen Elektionsregeln —
   zunehmender oder abnehmender Mond, die verbrannte Bahn, die Stunde.
   --------------------------------------------------------------------- */
import { MENZILLER } from "./korpus.js?v=65";
import { planetenPositionen, julianischesDatum, norm360, sonnenLaenge } from "./astro.js?v=65";
import { ZEICHEN, PLANET } from "./horoskop.js?v=65";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const SEKTOR = 360 / 28;

/* ------------------------------------------------- Was soll begonnen werden
   Jede Art von Vorhaben bekommt Schlagwörter, an denen man sie in der
   Eingabe erkennt, Wörter, die in den Stationstexten dafür oder dagegen
   sprechen, einen zuständigen Planeten und die Frage, ob das Vorhaben
   aufbaut (zunehmender Mond) oder abträgt (abnehmender). */
const VORHABEN = [
  { art:"Reise und Aufbruch",
    woerter:["reis","fahr","flieg","urlaub","umzug","umzieh","weg","ausland","fortgeh","aufbruch","wander","pilger"],
    dafuer:["reise","aufbruch","heimkehr","weg","rückkehr"], dagegen:["reise","ortswechsel","fortgehen","neues land"],
    planet:"merkur", richtung:"zunehmend" },
  { art:"Ehe, Liebe und Versöhnung",
    woerter:["heirat","hochzeit","ehe","antrag","verlob","liebe","date","versöhn","aussöhn","beziehung","partner"],
    dafuer:["ehe","liebe","freundschaft","versöhnung","bündnis","eintracht"], dagegen:["hochzeit","ehe","bindung"],
    planet:"venus", richtung:"zunehmend" },
  { art:"Handel, Kauf und Vertrag",
    woerter:["kauf","verkauf","vertrag","geschäft","handel","investier","geld","gehalt","verhandl","angebot","rechnung","miete"],
    dafuer:["handel","gewinn","kaufen","verkaufen","bündnis","ernte"], dagegen:["schulden","verträge auf dauer","anvertrauen"],
    planet:"merkur", richtung:"zunehmend" },
  { art:"Bauen, Gründen und Anfangen",
    woerter:["bau","haus","grundstein","gründ","firma","eröffn","anfang","beginn","start","projekt","renovier","einzieh"],
    dafuer:["bauen","säen","grundstein","beginn","aussaat"], dagegen:["großes anfangen","bauen"],
    planet:"saturn", richtung:"zunehmend" },
  { art:"Heilung und Gesundheit",
    woerter:["arzt","operation","op ","heil","kur","medizin","zahn","therapie","krank","behandl","impf","diät"],
    dafuer:["heilung","heilen","arznei","genesung","befreien"], dagegen:["arznei"],
    planet:"sonne", richtung:"abnehmend" },
  { art:"Lernen, Schreiben und Vortragen",
    woerter:["lern","prüfung","schreib","vortrag","bewerb","studi","kurs","examen","rede","brief","buch","unterricht"],
    dafuer:["lernen","studium","botschaft","schrift","bündnis"], dagegen:["bitten vortragen"],
    planet:"merkur", richtung:"zunehmend" },
  { art:"Säen, Pflanzen und Ernten",
    woerter:["sä","pflanz","garten","ernte","setzling","acker","baum","beet"],
    dafuer:["aussaat","säen","ernte","ernten","erdarbeit"], dagegen:["säen"],
    planet:"mond", richtung:"zunehmend" },
  { art:"Beenden, Trennen und Aufräumen",
    woerter:["kündig","trenn","beend","aufhör","scheid","entrümpel","aufräum","entlass","löschen","schluss","abschied","wegwerf"],
    dafuer:["auflösen","beenden","trennen","lösen","freilassen","scheiden"], dagegen:["bewahren","verwahren"],
    planet:"saturn", richtung:"abnehmend" },
  { art:"Streit, Recht und Behörde",
    woerter:["prozess","klage","streit","gericht","anwalt","behörde","amt","antrag","widerspruch","einspruch"],
    dafuer:["feinde besiegen","standhalten","grenzen ziehen","recht"], dagegen:["streit suchen","feindschaft","klagen"],
    planet:"mars", richtung:"zunehmend" },
  { art:"Bitten und Ansprechen",
    woerter:["bitt","frag","ansprech","chef","gespräch","um etwas","erbitten","werben"],
    dafuer:["bitten","bitten bei mächtigen","wohlwollen","liebe"], dagegen:["bitten vortragen","öffentliches"],
    planet:"jupiter", richtung:"zunehmend" }
];

function erkenneVorhaben(text) {
  const t = (text || "").toLowerCase();
  const treffer = VORHABEN.filter(v => v.woerter.some(w => t.includes(w)));
  return treffer.length ? treffer[0] : null;
}

/* ----------------------------------------------------------- Mondstand */
export function mondStand(datum) {
  const jd = julianischesDatum(datum.getFullYear(), datum.getMonth() + 1, datum.getDate(),
                               datum.getHours() + datum.getMinutes() / 60);
  const pos = planetenPositionen(jd);
  const lon = norm360(pos.mond.laenge);
  const sonne = norm360(sonnenLaenge(jd));
  const elong = norm360(lon - sonne);
  return {
    jd, laenge: lon, sonne, elongation: elong,
    zunehmend: elong < 180,
    menzil: MENZILLER[Math.floor(lon / SEKTOR) % 28],
    menzilNr: Math.floor(lon / SEKTOR) % 28 + 1,
    zeichen: Math.floor(lon / 30),
    /* Verbrannte Bahn: 15° Waage bis 15° Skorpion — in der Elektion gemieden. */
    verbrannt: lon >= 195 && lon <= 225
  };
}

/* Punkte für einen Zeitpunkt, gemessen am Vorhaben. */
function bewerte(stand, vor) {
  const gruende = [];
  let punkte = 0;

  const iyi = stand.menzil.iyi.toLowerCase();
  const kacin = stand.menzil.kacin.toLowerCase();

  if (vor) {
    if (vor.dafuer.some(w => iyi.includes(w))) {
      punkte += 3;
      gruende.push({ gut: true, text: `Die Station ${stand.menzil.tr} gilt als günstig für: ${stand.menzil.iyi}.` });
    }
    if (vor.dagegen.some(w => kacin.includes(w))) {
      punkte -= 3;
      gruende.push({ gut: false, text: `Die Station ${stand.menzil.tr} warnt ausdrücklich davor — meide: ${stand.menzil.kacin}.` });
    }
    if (vor.richtung === "zunehmend" && stand.zunehmend) {
      punkte += 2;
      gruende.push({ gut: true, text: "Der Mond nimmt zu — die alte Regel gibt das dem Aufbauenden, dem Wachsenden, dem Anfangen." });
    } else if (vor.richtung === "zunehmend" && !stand.zunehmend) {
      punkte -= 1;
      gruende.push({ gut: false, text: "Der Mond nimmt ab. Was jetzt beginnt, wächst der Regel nach langsamer, als es könnte." });
    } else if (vor.richtung === "abnehmend" && !stand.zunehmend) {
      punkte += 2;
      gruende.push({ gut: true, text: "Der Mond nimmt ab — das ist die Zeit fürs Abtragen, Herausnehmen und Beenden." });
    } else if (vor.richtung === "abnehmend" && stand.zunehmend) {
      punkte -= 1;
      gruende.push({ gut: false, text: "Der Mond nimmt zu. Zum Abtragen und Loswerden wäre die abnehmende Hälfte passender." });
    }
  } else {
    if (stand.zunehmend) { punkte += 1;
      gruende.push({ gut: true, text: "Der Mond nimmt zu — im Allgemeinen die Hälfte des Anfangens." }); }
  }

  if (stand.verbrannt) {
    punkte -= 3;
    gruende.push({ gut: false, text: "Der Mond steht in der <b>verbrannten Bahn</b> zwischen 15° Waage und 15° Skorpion. Die Wahlastrologie meidet diese Strecke für alles, was halten soll." });
  }

  if (/nichts von gewicht|unglücklich|schwer/.test(stand.menzil.hukum.toLowerCase())) {
    punkte -= 2;
    gruende.push({ gut: false, text: `Die Station selbst gilt als ungünstig: ${stand.menzil.hukum}` });
  }
  if (/glück der glücke|günstigste/.test(stand.menzil.hukum.toLowerCase())) {
    punkte += 3;
    gruende.push({ gut: true, text: `Die Station selbst gilt als die beste von allen: ${stand.menzil.hukum}` });
  }

  return { punkte, gruende };
}

/* Die nächsten Wochen absuchen. */
function besserTage(vor, tage = 30) {
  const heute = new Date();
  const liste = [];
  for (let i = 0; i <= tage; i++) {
    const d = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate() + i, 12, 0);
    const st = mondStand(d);
    const b = bewerte(st, vor);
    liste.push({ datum: d, stand: st, ...b });
  }
  return liste;
}

const MONATE = ["Januar","Februar","März","April","Mai","Juni","Juli",
                "August","September","Oktober","November","Dezember"];
const tagMonat = d => `${d.getDate()}. ${MONATE[d.getMonth()]}`;
const WOCHENTAG = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];

/* ------------------------------------------------------------ Darstellung */
function raten() {
  const eingabe = $("#ekVorhaben").value.trim();
  const cikti = $("#ekCikti");
  cikti.hidden = false;
  cikti.innerHTML = "";

  if (!eingabe) {
    cikti.appendChild(el("p", "kucukNot", "Schreib hin, was du vorhast — ein paar Worte genügen."));
    return;
  }

  const vor = erkenneVorhaben(eingabe);
  const jetzt = new Date();
  const stand = mondStand(jetzt);
  const { punkte, gruende } = bewerte(stand, vor);

  const urteil = punkte >= 4 ? { wort:"Ein guter Zeitpunkt", klasse:"gut" }
              : punkte >= 1 ? { wort:"Brauchbar", klasse:"gut" }
              : punkte >= -1 ? { wort:"Weder noch", klasse:"mittel" }
              : { wort:"Lieber nicht heute", klasse:"schlecht" };

  const kasten = el("div", "geistName");
  kasten.append(
    el("div", "kalanBaslik", vor ? vor.art : "Dein Vorhaben"),
    el("div", "buyukToplam", urteil.wort),
    el("div", "kucukNot",
      `Der Mond steht in ${ZEICHEN[stand.zeichen].glyph} ${ZEICHEN[stand.zeichen].name}, ` +
      `Station ${stand.menzilNr} — ${stand.menzil.tr}, und ${stand.zunehmend ? "nimmt zu" : "nimmt ab"}.`)
  );
  cikti.appendChild(kasten);

  if (!vor) {
    cikti.appendChild(el("p", "kucukNot",
      "Die Art des Vorhabens konnte ich nicht sicher erkennen — geurteilt wird deshalb nur " +
      "nach dem allgemeinen Stand des Mondes. Nenne etwas konkreter, worum es geht " +
      "(reisen, heiraten, kaufen, bauen, heilen, lernen, säen, beenden, streiten, bitten)."));
  }

  cikti.appendChild(el("h3", null, "Die Station heute"));
  const p1 = el("p");
  p1.innerHTML = `<b>${stand.menzilNr}. ${stand.menzil.tr}</b> (${stand.menzil.ar}) — ` +
    `${stand.menzil.hukum} Günstig für: ${stand.menzil.iyi}. Meide: ${stand.menzil.kacin}.`;
  cikti.appendChild(p1);

  cikti.appendChild(el("h3", null, "Was dafür und was dagegen spricht"));
  const ul = el("ul", "deutungListe");
  gruende.forEach(g => {
    const li = el("li", g.gut ? "dafuer" : "dagegen");
    li.innerHTML = (g.gut ? "Dafür: " : "Dagegen: ") + g.text;
    ul.appendChild(li);
  });
  if (!gruende.length) ul.appendChild(el("li", null, "Nichts spricht deutlich dafür oder dagegen."));
  cikti.appendChild(ul);

  /* Bessere Tage */
  const tage = besserTage(vor);
  const beste = [...tage].sort((a, b) => b.punkte - a.punkte || a.datum - b.datum)
                         .filter(t => t.punkte > punkte)
                         .slice(0, 5)
                         .sort((a, b) => a.datum - b.datum);
  cikti.appendChild(el("h3", null, "Bessere Tage in den nächsten vier Wochen"));
  if (!beste.length) {
    cikti.appendChild(el("p", null,
      "In den nächsten vier Wochen findet sich kein deutlich besserer Tag als heute. " +
      "Wenn es also ohnehin ansteht: heute."));
  } else {
    const ul2 = el("ul", "deutungListe");
    beste.forEach(t => {
      const li = el("li");
      li.innerHTML = `<b>${WOCHENTAG[t.datum.getDay()]}, ${tagMonat(t.datum)}</b> — Station ` +
        `${t.stand.menzilNr}, ${t.stand.menzil.tr}; Mond ${t.stand.zunehmend ? "zunehmend" : "abnehmend"}. ` +
        `Günstig für: ${t.stand.menzil.iyi}.`;
      ul2.appendChild(li);
    });
    cikti.appendChild(ul2);
  }

  cikti.appendChild(el("p", "kucukNot",
    "Gerechnet wird für die Tagesmitte; der Mond wechselt die Station etwa alle 13 Stunden, " +
    "an den Übergängen lohnt der Blick auf die Uhrzeit. Und die alte Warnung gilt: Eine gute " +
    "Stunde macht kein schlechtes Vorhaben gut."));
}

$("#ekFragen")?.addEventListener("click", raten);
$("#ekVorhaben")?.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); raten(); } });

/* Für die Essenz: wo der Mond heute steht, ohne dass etwas gefragt wurde. */
export function mondHeute() {
  const st = mondStand(new Date());
  return {
    menzilNr: st.menzilNr, menzil: st.menzil, zeichen: st.zeichen,
    zunehmend: st.zunehmend, verbrannt: st.verbrannt
  };
}
