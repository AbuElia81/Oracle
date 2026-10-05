/* ------------------------------------------------------------------------
   almutem.js — der Almutem Figuris, der Herr der ganzen Geburt.

   Alles andere auf dieser Seite fragt nach einzelnen Dingen: Wer regiert
   dieses Jahr, wer dieses Feld, wer diese Stunde. Der Almutem Figuris
   fragt nach dem Ganzen — welcher Planet über diese Geburt als solche
   am meisten zu sagen hat. Bei Abraham Ibn Ezra (12. Jh., Sefer
   ha-Moladot) steht das Verfahren zuerst geschlossen beisammen, Guido
   Bonatti nimmt es in den "Liber Astronomiae" auf, und in der
   mittelalterlichen Schule gilt er als der Schlüssel zur ganzen Deutung:
   Wer ihn nicht kennt, deutet Einzelheiten ohne Mitte.

   Gerechnet wird in drei Lagen, die addiert werden:

     1. Die Würden über fünf Stellen — Sonne, Mond, Aszendent,
        Glückspunkt und die Syzygie vor der Geburt. Für jede Stelle
        bekommt ein Planet 5 Punkte, wenn sie in seinem Zeichen liegt,
        4 für die Erhöhung, 3 für die Triplizität, 2 für die Grenze,
        1 für das Gesicht.

     2. Der Ort, an dem der Planet selbst steht. Ibn Ezra zählt die
        zwölf Felder nicht gleich: das aufsteigende am höchsten, das
        verborgene am niedrigsten.

     3. Der Herr des Wochentages und der Herr der Geburtsstunde.

   Die Zahl, die dabei herauskommt, ist kein Urteil über einen Menschen.
   Sie sagt nur, welche der sieben Gestalten in dieser Geburt das letzte
   Wort hat, wenn die anderen sich widersprechen.
   ------------------------------------------------------------------------ */

import { norm360, julianischesDatum } from "./astro.js?v=165";
import { radix, PLANET, REIHE, ZEICHEN, HAUS, mitArtikel, grossMitArtikel } from "./horoskop.js?v=165";
import { wuerden } from "./geist.js?v=165";
import { leseProfil } from "./profil.js?v=165";

/* Ibn Ezras Gewichtung der zwölf Örter. Das erste Feld wiegt am
   schwersten, das zwölfte am leichtesten. */
const ORT_PUNKTE = { 1:12, 10:11, 7:10, 4:9, 11:8, 5:7, 2:6, 9:5, 3:4, 8:3, 6:2, 12:1 };

const SAAT_SIRASI = ["saturn","jupiter","mars","sonne","venus","merkur","mond"];
const TAG_HERR    = ["sonne","mond","mars","merkur","jupiter","venus","saturn"];

const STELLEN = [
  { key: "sonne",      name: "die Sonne" },
  { key: "mond",       name: "der Mond" },
  { key: "asc",        name: "der Aszendent" },
  { key: "fortuna",    name: "der Glückspunkt" },
  { key: "syzygie",    name: "die Syzygie vor der Geburt" }
];

/* Glückspunkt: bei Tag Asz + Mond − Sonne, bei Nacht umgekehrt. */
function glueckspunkt(asc, sonne, mond, tag) {
  return norm360(tag ? asc + mond - sonne : asc + sonne - mond);
}

/* Die letzte Zusammenkunft oder Gegenüberstellung von Sonne und Mond
   vor der Geburt — grob, über die mittleren Bewegungen genähert. */
function syzygieVor(sonneL, mondL, tagGeburt) {
  const elong = norm360(mondL - sonneL);
  /* Lag die letzte Syzygie beim Neumond oder beim Vollmond? */
  const nachNeumond = elong < 180;
  const zurueck = nachNeumond ? elong : elong - 180;
  /* Der Mond läuft rund 12,19° je Tag schneller als die Sonne. */
  const tage = zurueck / 12.19;
  return { laenge: norm360(sonneL - tage * 0.9856), neumond: nachNeumond };
}

export function almutemFiguris() {
  const r = radix();
  if (!r) return null;
  const p = r.profil;
  const [j, m, t] = p.datum.split("-").map(Number);
  const [st, mi] = p.zeit.split(":").map(Number);

  const sonne = r.planeten.sonne, mond = r.planeten.mond;
  const fort = glueckspunkt(r.asc, sonne.laenge, mond.laenge, r.tagGeburt);
  const syz  = syzygieVor(sonne.laenge, mond.laenge, r.tagGeburt);

  const orte = {
    sonne:   sonne.laenge,
    mond:    mond.laenge,
    asc:     r.asc,
    fortuna: fort,
    syzygie: syz.laenge
  };

  /* ---- 1. Die Würden über die fünf Stellen ---- */
  const punkte = {};
  REIHE.forEach(k => punkte[k] = { wuerde: 0, ort: 0, zeit: 0, total: 0, belege: [] });

  const stellen = STELLEN.map(s => {
    const lon = orte[s.key];
    const z = Math.floor(norm360(lon) / 30);
    const g = norm360(lon) - z * 30;
    const w = wuerden(z, g, r.tagGeburt);
    const mit = [];
    REIHE.forEach(k => {
      const x = w[k];
      if (!x || !x.total) return;
      punkte[k].wuerde += x.total;
      const art = x.dom ? "Zeichen" : x.ex ? "Erhöhung" : x.tri ? "Triplizität"
                : x.term ? "Grenze" : "Gesicht";
      punkte[k].belege.push(`${art} über ${s.name}`);
      mit.push({ key: k, punkte: x.total, art });
    });
    return { ...s, laenge: norm360(lon), zeichen: z, grad: g,
             mit: mit.sort((a, b) => b.punkte - a.punkte) };
  });

  /* ---- 2. Der Ort, an dem der Planet selbst steht ---- */
  REIHE.forEach(k => {
    const pl = r.planeten[k];
    if (!pl) return;
    const w = ORT_PUNKTE[pl.haus] || 0;
    punkte[k].ort = w;
    punkte[k].belege.push(`steht selbst im ${pl.haus}. Feld (${w})`);
  });

  /* ---- 3. Herr des Tages und Herr der Stunde ---- */
  const wochentag = new Date(j, m - 1, t).getDay();
  const tagherr = TAG_HERR[wochentag];
  let std = st - 6, wt = wochentag;
  if (std < 0) { std += 24; wt = (wt + 6) % 7; }
  const stundenherr = SAAT_SIRASI[(SAAT_SIRASI.indexOf(TAG_HERR[wt]) + std) % 7];

  punkte[tagherr].zeit += 7;
  punkte[tagherr].belege.push("Herr des Wochentages (7)");
  punkte[stundenherr].zeit += 6;
  punkte[stundenherr].belege.push("Herr der Geburtsstunde (6)");

  REIHE.forEach(k => punkte[k].total = punkte[k].wuerde + punkte[k].ort + punkte[k].zeit);

  /* Bei Gleichstand entscheidet, wer mehr davon aus den Würden hat: Die
     sind die eigentliche Herrschaft, Tag und Stunde nur Zugabe. Bleibt es
     auch dann gleich, zählt der eigene Ort. */
  const rangliste = REIHE.map(k => ({ key: k, ...punkte[k], planet: r.planeten[k] }))
                         .sort((a, b) => b.total - a.total ||
                                         b.wuerde - a.wuerde ||
                                         b.ort - a.ort);
  const sieger = rangliste[0];
  const knapp  = rangliste[1] && (sieger.total - rangliste[1].total) <= 2;
  const gleich = rangliste[1] && sieger.total === rangliste[1].total;

  return { stellen, rangliste, sieger, knapp, gleich, zweiter: rangliste[1],
           tagherr, stundenherr, syzygie: syz, fortuna: fort,
           radix: r, tagGeburt: r.tagGeburt };
}

/* ======================================================================
   Die Oberfläche.
   ====================================================================== */

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const WOCHE = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];

const ROLLE = {
  saturn:  "Er macht aus dieser Geburt eine, die lange braucht und dann bleibt. Was hier zählt, zählt erst spät — und dann nicht wenig.",
  jupiter: "Er macht aus dieser Geburt eine, der Raum gegeben wird. Es geht weiter, als die Herkunft erwarten ließ.",
  mars:    "Er macht aus dieser Geburt eine, die sich durchsetzen muss und es auch tut. Nichts kommt hier von selbst, und das ist die Sache nicht.",
  sonne:   "Er macht aus dieser Geburt eine, die gesehen werden will und gesehen wird. Die Mitte ist hier nicht verhandelbar.",
  venus:   "Sie macht aus dieser Geburt eine, in der das Verbindende mehr wiegt als das Trennende. Was hier gelingt, gelingt mit anderen.",
  merkur:  "Er macht aus dieser Geburt eine, die über das Wort geht. Was hier geschieht, geschieht durch Reden, Schreiben, Vermitteln.",
  mond:    "Er macht aus dieser Geburt eine, die sich wandelt und darin treu bleibt. Sie trägt weiter, was sie empfangen hat."
};

function zeichne() {
  const ziel = $("#afCikti");
  if (!ziel) return;
  const a = almutemFiguris();
  ziel.innerHTML = "";
  ziel.hidden = false;

  if (!a) {
    ziel.appendChild(el("p", "kucukNot",
      "Dafür fehlen die Geburtsangaben — Datum, Uhrzeit und der Ort mit gesuchten Koordinaten."));
    return;
  }

  const s = a.sieger, pl = s.planet;
  const kasten = el("div", "afKasten");
  kasten.appendChild(el("div", "kalanBaslik", "Der Herr deiner Geburt"));
  kasten.appendChild(el("div", "buyukToplam", `${PLANET[s.key].g} ${PLANET[s.key].name}`));
  kasten.appendChild(el("div", "kucukNot",
    `${s.total} Punkte — ${s.wuerde} aus den Würden, ${s.ort} aus seinem eigenen Ort, ` +
    `${s.zeit} aus Tag und Stunde`));
  const satz = el("p");
  satz.innerHTML = ROLLE[s.key] +
    (pl ? ` Er selbst steht bei dir in ${ZEICHEN[pl.zeichen].glyph} ${ZEICHEN[pl.zeichen].name}, ` +
          `im ${pl.haus}. Feld — ${HAUS[pl.haus - 1]}. Dort ist der Ort, an dem sich diese ` +
          `Geburt am deutlichsten zeigt.` : "");
  kasten.appendChild(satz);
  if (a.knapp) {
    const k = el("p", "kucukNot");
    k.innerHTML = a.gleich
      ? `Hier steht es <b>gleich</b>: ${grossMitArtikel(PLANET[a.zweiter.key].name)} kommt auf ` +
        `dieselben ${a.zweiter.total} Punkte. Den Ausschlag gibt, dass ` +
        `${mitArtikel(PLANET[a.sieger.key].name)} mehr davon aus den Würden hat ` +
        `(${a.sieger.wuerde} gegen ${a.zweiter.wuerde}) — die sind die eigentliche ` +
        `Herrschaft, Tag und Stunde nur Zugabe. Bonatti rät bei so engem Stand ohnehin, ` +
        `beide zu lesen: Der Zweite sagt dann, wie der Erste zu Werke geht.`
      : `Es ist knapp: ${grossMitArtikel(PLANET[a.zweiter.key].name)} kommt auf ` +
        `${a.zweiter.total} Punkte. Bonatti rät bei so engem Stand, beide zu lesen — ` +
        `der Zweite sagt dann, wie der Erste zu Werke geht.`;
    kasten.appendChild(k);
  }
  ziel.appendChild(kasten);

  /* Die fünf Stellen, über die gerechnet wird. */
  ziel.appendChild(el("h3", null, "Die fünf Stellen"));
  const tf = el("table", "afTafel");
  tf.innerHTML = "<thead><tr><th>Stelle</th><th>steht bei</th><th>wer dort Würde hat</th></tr></thead>";
  const tb = el("tbody");
  a.stellen.forEach(st => {
    const tr = el("tr");
    tr.innerHTML = `<td>${st.name}</td>` +
      `<td>${ZEICHEN[st.zeichen].glyph} ${st.grad.toFixed(1)}°</td>` +
      `<td>${st.mit.map(m => `${PLANET[m.key].g} ${m.art} <span class="afP">${m.punkte}</span>`).join(" · ")}</td>`;
    tb.appendChild(tr);
  });
  tf.appendChild(tb);
  ziel.appendChild(tf);

  ziel.appendChild(el("p", "kucukNot",
    `Dazu: Geboren an einem ${WOCHE[new Date(a.radix.profil.datum).getDay()]} — der Tag gehört ` +
    `${PLANET[a.tagherr].name} (7 Punkte); die Geburtsstunde gehört ${PLANET[a.stundenherr].name} ` +
    `(6 Punkte).`));

  /* Die Rangliste. */
  ziel.appendChild(el("h3", null, "Die Rangliste"));
  const liste = el("div", "afListe");
  const hoechst = a.rangliste[0].total || 1;
  a.rangliste.forEach((x, i) => {
    const z = el("div", "afZeile" + (i === 0 ? " afErster" : ""));
    const name = el("div", "afName", `${PLANET[x.key].g} ${PLANET[x.key].name}`);
    const bar = el("div", "afBalken");
    const fill = el("div", "afFuellung");
    fill.style.width = (x.total / hoechst * 100) + "%";
    bar.appendChild(fill);
    const zahl = el("div", "afZahl", String(x.total));
    z.append(name, bar, zahl);
    liste.appendChild(z);
  });
  ziel.appendChild(liste);

  ziel.appendChild(el("p", "kucukNot",
    "Gerechnet nach Abraham Ibn Ezra (Sefer ha-Moladot, 12. Jh.), wie Guido Bonatti " +
    "das Verfahren im Liber Astronomiae übernimmt: Würden über die fünf Stellen, dazu " +
    "der eigene Ort nach Ibn Ezras Gewichtung der zwölf Felder, dazu Herr des Tages und " +
    "Herr der Stunde. Die Syzygie vor der Geburt ist hier über die mittleren Bewegungen " +
    "genähert, nicht exakt gesucht — auf das Zeichen kommt es an, und das trifft sie."));
}

$("#afBerechnen")?.addEventListener("click", zeichne);
if ($("#afCikti")) {
  window.addEventListener("load", () => setTimeout(zeichne, 300));
  window.addEventListener("profil-geaendert", () => setTimeout(zeichne, 200));
}
