/* ------------------------------------------------------------------------
   radixdeutung.js — die Geburt als Ganzes, ehe die Zeit anfängt.

   Alles andere auf dieser Seite sagt, WANN etwas fällig wird. Dies hier
   sagt, WAS fällig wird. In der mittelalterlichen Schule steht dieser
   Schritt vor allen anderen, und Robert Zoller fasst die Regel in vier
   Worte: keine Deutung, keine Vorhersage. Wer das Geburtsbild nicht
   zuerst als Ganzes gelesen hat, bekommt aus den Zeitherren nur einen
   Kalender ohne Inhalt.

   Die Reihenfolge ist die der Überlieferung — Bonatti im "Liber
   Astronomiae", Abū Maʿšar, und für das Temperament die Linie, die über
   Ptolemäus und die arabischen Ärzte bis in die Renaissance läuft:

     1. Die Sekte: Tag oder Nacht. Sie entscheidet, wer in diesem Leben
        gefällig auftritt und wer fordernd.
     2. Das Temperament: die Mischung aus warm, kalt, feucht und trocken,
        aus der die Alten den ganzen Menschen ableiteten — Leib, Gemüt,
        Tempo, Krankheitsneigung.
     3. Der Aufsteigende und sein Herr: der Mensch selbst.
     4. Der Herr des Ganzen (Almutem Figuris).
     5. Die beiden Lichter: Sonne und Mond.
     6. Wer stark steht und wer schwach.
     7. Was winkelhaft steht — was also sofort wirkt.
     8. Die Aufnahmen (Rezeptionen): wer wen beherbergt.
   ------------------------------------------------------------------------ */

import { radix, PLANET, REIHE, ZEICHEN, HAUS, mitArtikel, grossMitArtikel, zustandVon }
  from "./horoskop.js?v=256";
import { almutemFiguris } from "./almutem.js?v=256";
import { FIGUR, BILD, ORT, STAND, figurVon, bildDat } from "./sprache.js?v=256";
import { d, setzeDeutungSprache } from "./deutung-texte.js?v=256";
import { aktuelleSprache } from "./sprachen.js?v=256";
setzeDeutungSprache(aktuelleSprache());
window.addEventListener("sprache-geaendert", ev => setzeDeutungSprache(ev.detail));

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

/* ------------------------------------------------------- das Temperament
   Vier Zeugen stimmen ab, jeder über zwei Achsen: warm/kalt und
   feucht/trocken. Aus der Mehrheit ergibt sich die Mischung, und aus der
   Mischung der Name, den die Alten ihr gaben. */

const ELEMENT = [  /* je Zeichen: [warm, feucht] als +1 / -1 */
  [ 1, -1], [-1, -1], [ 1,  1], [-1,  1],   /* Widder Stier Zwillinge Krebs */
  [ 1, -1], [-1, -1], [ 1,  1], [-1,  1],   /* Löwe Jungfrau Waage Skorpion */
  [ 1, -1], [-1, -1], [ 1,  1], [-1,  1]    /* Schütze Steinbock Wassermann Fische */
];

const PLANET_NATUR = {
  saturn:  [-1, -1], jupiter: [ 1,  1], mars:   [ 1, -1], sonne: [ 1, -1],
  venus:   [-1,  1], merkur:  [ 0,  0], mond:   [-1,  1]
};

/* Die vier Mischungen holen ihre Worte erst beim Lesen aus der Textdatei —
   so steht nach einem Sprachwechsel sofort die andere Fassung da, ohne
   dass hier etwas neu gebaut werden müsste. */
function mischung(schluessel) {
  return {
    schluessel,
    get name()    { return d(`temp.${schluessel}.name`); },
    get saft()    { return d(`temp.${schluessel}.saft`); },
    get element() { return d(`temp.${schluessel}.element`); },
    get bild()    { return d(`temp.${schluessel}.bild`); },
    get text()    { return d(`temp.${schluessel}.text`); },
    get saftBild(){ return d(`saft.${schluessel}`); }
  };
}

const TEMPERAMENT = {
  "warm-feucht":  mischung("sanguinisch"),
  "warm-trocken": mischung("cholerisch"),
  "kalt-trocken": mischung("melancholisch"),
  "kalt-feucht":  mischung("phlegmatisch")
};

export function temperament() {
  const r = radix();
  if (!r) return null;
  const zeugen = [];
  let warm = 0, feucht = 0;

  /* 1. Das aufsteigende Zeichen. */
  const [aw, af] = ELEMENT[r.ascZeichen];
  warm += aw * 2; feucht += af * 2;
  zeugen.push({ wer: `Das aufsteigende Zeichen ${ZEICHEN[r.ascZeichen].glyph} ${ZEICHEN[r.ascZeichen].name}`,
                warm: aw * 2, feucht: af * 2, gewicht: 2 });

  /* 2. Sein Herr, nach eigener Natur und nach dem Zeichen, in dem er steht. */
  const herr = r.planeten[r.herrscher];
  if (herr) {
    const [pw, pf] = PLANET_NATUR[r.herrscher];
    const [zw, zf] = ELEMENT[herr.zeichen];
    warm += pw + zw; feucht += pf + zf;
    zeugen.push({ wer: `Sein Herr ${PLANET[r.herrscher].name} (eigene Natur und ${ZEICHEN[herr.zeichen].name})`,
                  warm: pw + zw, feucht: pf + zf, gewicht: 2 });
  }

  /* 3. Der Mond: sein Zeichen und seine Phase. Die vier Viertel laufen
        durch dieselben vier Mischungen wie die Jahreszeiten. */
  const mond = r.planeten.mond, sonne = r.planeten.sonne;
  if (mond && sonne) {
    const elong = ((mond.laenge - sonne.laenge) % 360 + 360) % 360;
    const viertel = Math.floor(elong / 90);
    const PHASE = [[ 1, 1], [ 1, -1], [-1, -1], [-1, 1]];
    const PHASE_NAME = ["zunehmende Sichel", "zweites Viertel", "abnehmend nach Vollmond", "letztes Viertel"];
    const [hw, hf] = PHASE[viertel];
    const [zw, zf] = ELEMENT[mond.zeichen];
    warm += hw + zw; feucht += hf + zf;
    zeugen.push({ wer: `Der Mond in ${ZEICHEN[mond.zeichen].name}, ${PHASE_NAME[viertel]}`,
                  warm: hw + zw, feucht: hf + zf, gewicht: 2 });
  }

  /* 4. Die Jahreszeit, abgelesen am Stand der Sonne. */
  if (sonne) {
    const [sw, sf] = ELEMENT[sonne.zeichen];
    const JAHRESZEIT = ["Frühling", "Sommer", "Herbst", "Winter"];
    warm += sw; feucht += sf;
    zeugen.push({ wer: `Die Jahreszeit (Sonne in ${ZEICHEN[sonne.zeichen].name})`,
                  warm: sw, feucht: sf, gewicht: 1 });
  }

  /* 5. Wer im ersten Feld steht, redet mit. */
  REIHE.forEach(k => {
    const pl = r.planeten[k];
    if (!pl || pl.haus !== 1) return;
    const [pw, pf] = PLANET_NATUR[k];
    warm += pw; feucht += pf;
    zeugen.push({ wer: `${PLANET[k].name} steht im ersten Feld`, warm: pw, feucht: pf, gewicht: 1 });
  });

  const schluessel = `${warm >= 0 ? "warm" : "kalt"}-${feucht >= 0 ? "feucht" : "trocken"}`;
  const rein = Math.abs(warm) >= 3 && Math.abs(feucht) >= 3;
  /* Die zweite Mischung, wenn eine Achse knapp ausfällt. */
  let neben = null;
  if (Math.abs(warm) <= 1) neben = `${warm >= 0 ? "kalt" : "warm"}-${feucht >= 0 ? "feucht" : "trocken"}`;
  else if (Math.abs(feucht) <= 1) neben = `${warm >= 0 ? "warm" : "kalt"}-${feucht >= 0 ? "trocken" : "feucht"}`;

  return { warm, feucht, zeugen, schluessel, rein,
           haupt: TEMPERAMENT[schluessel],
           neben: neben ? TEMPERAMENT[neben] : null, nebenKey: neben };
}

/* ---------------------------------------------- die übrigen Stücke der Deutung */

const WINKEL = [1, 4, 7, 10], FOLGEND = [2, 5, 8, 11];

function sekteRolle(key, tag) {
  if (key === "jupiter") return { art: "wohl",  rang: tag ? 2 : 1 };
  if (key === "venus")   return { art: "wohl",  rang: tag ? 1 : 2 };
  if (key === "saturn")  return { art: "uebel", rang: tag ? 1 : 2 };
  if (key === "mars")    return { art: "uebel", rang: tag ? 2 : 1 };
  if (key === "sonne")   return { art: tag ? "sekte" : "fremd", rang: 1 };
  if (key === "mond")    return { art: tag ? "fremd" : "sekte", rang: 1 };
  return { art: "neutral", rang: 1 };
}

const WUERDE_PUNKTE = { "Domizil": 5, "Erhöhung": 4, "Triplizität": 3, "—": 0, "Fall": -4, "Exil": -5 };

/* Aufnahme: Steht ein Planet im Zeichen eines anderen, so beherbergt der
   Hausherr ihn. Sehen sie einander dabei an, ist es eine volle Aufnahme —
   die Alten halten sie für den stärksten Zusammenhalt zweier Gestalten. */
const DOMIZIL = ["mars","venus","merkur","mond","sonne","merkur",
                 "venus","mars","jupiter","saturn","saturn","jupiter"];

function aufnahmen(r) {
  const out = [];
  REIHE.forEach(k => {
    const pl = r.planeten[k];
    if (!pl) return;
    const wirt = DOMIZIL[pl.zeichen];
    if (wirt === k) return;                      /* zu Hause, kein Gast */
    const asp = r.aspekte.find(a =>
      (a.a.key === k && a.b.key === wirt) || (a.b.key === k && a.a.key === wirt));
    out.push({ gast: k, wirt, sicht: asp ? asp.name : null,
               voll: !!asp, zeichen: pl.zeichen });
  });
  return out;
}

export function radixDeutung() {
  const r = radix();
  if (!r) return null;

  const herr = r.planeten[r.herrscher];
  const temp = temperament();
  let alm = null;
  try { alm = almutemFiguris(); } catch (e) {}

  /* Stärke und Schwäche: Würde plus Ort. */
  const staerke = REIHE.map(k => {
    const pl = r.planeten[k];
    if (!pl) return null;
    const w = WUERDE_PUNKTE[pl.wuerde.stufe] ?? 0;
    const o = WINKEL.includes(pl.haus) ? 3 : FOLGEND.includes(pl.haus) ? 1 : -2;
    return { key: k, pl, wuerde: w, ort: o, summe: w + o,
             rolle: sekteRolle(k, r.tagGeburt) };
  }).filter(Boolean).sort((a, b) => b.summe - a.summe);

  const winkelhaft = REIHE.map(k => r.planeten[k])
                          .filter(p => p && WINKEL.includes(p.haus));
  const kadent = REIHE.map(k => r.planeten[k])
                      .filter(p => p && !WINKEL.includes(p.haus) && !FOLGEND.includes(p.haus));

  return { r, herr, temp, alm, staerke, winkelhaft, kadent,
           aufnahmen: aufnahmen(r),
           staerkster: staerke[0], schwaechster: staerke[staerke.length - 1] };
}

/* ====================================================================== */

function zeichneMittelalter() {
  const ziel = $("#rdCikti");
  if (!ziel) return;
  const dt = radixDeutung();
  ziel.innerHTML = "";
  ziel.hidden = false;
  if (!dt) {
    ziel.appendChild(el("p", "kucukNot",
      "Dafür fehlen die Geburtsangaben — Datum, Uhrzeit und der Ort mit gesuchten Koordinaten."));
    return;
  }
  const { r, herr, temp, alm } = dt;
  const nr = n => el("div", "rdNummer", n);

  /* ---- 1. Die Sekte ---- */
  const s1 = el("section", "rdTeil");
  s1.append(nr("I"), el("h3", null, d("rd.1")));
  const p1 = el("p");
  p1.innerHTML = d(r.tagGeburt ? "sekte.tag" : "sekte.nacht");
  s1.appendChild(p1);
  s1.appendChild(el("p", "kucukNot", d("sekte.note")));
  ziel.appendChild(s1);

  /* ---- 2. Das Temperament ---- */
  if (temp) {
    const s2 = el("section", "rdTeil");
    s2.append(nr("II"), el("h3", null, d("rd.2")));
    const kasten = el("div", "rdTempKasten");
    kasten.appendChild(el("div", "rdTempName", temp.haupt.name));
    kasten.appendChild(el("div", "kucukNot", temp.haupt.bild));
    const waage = el("div", "rdWaage");
    [["warm", "kalt", temp.warm], ["feucht", "trocken", temp.feucht]].forEach(([a, b, v]) => {
      const z = el("div", "rdWaageZeile");
      z.append(el("span", "rdPol", b));
      const bar = el("div", "rdWaageBalken");
      const pkt = el("div", "rdWaagePunkt");
      pkt.style.left = Math.max(2, Math.min(98, 50 + v * 7)) + "%";
      bar.appendChild(pkt);
      z.append(bar, el("span", "rdPol", a));
      waage.appendChild(z);
    });
    kasten.appendChild(waage);
    s2.appendChild(kasten);
    s2.appendChild(el("p", null, temp.haupt.text));
    if (temp.neben) {
      const n = el("p");
      n.innerHTML = d("temp.gemischt", temp.neben.name, temp.neben.bild);
      s2.appendChild(n);
    }
    const liste = el("ul", "zeugenListe");
    temp.zeugen.forEach(z => {
      const li = el("li", "z-neutral");
      const w = z.warm > 0 ? d("temp.warm") : z.warm < 0 ? d("temp.kalt") : d("temp.wederWarm");
      const f = z.feucht > 0 ? d("temp.feucht") : z.feucht < 0 ? d("temp.trocken") : d("temp.wederFeucht");
      li.innerHTML = `${z.wer} — <span class="rdQual">${w}, ${f}</span>`;
      liste.appendChild(li);
    });
    s2.appendChild(liste);
    s2.appendChild(el("p", "kucukNot", d("temp.note")));
    ziel.appendChild(s2);
  }

  /* ---- 3. Der Aufsteigende und sein Herr ---- */
  const s3 = el("section", "rdTeil");
  s3.append(nr("III"), el("h3", null, d("rd.3")));
  const p3 = el("p");
  p3.innerHTML = d("asc.satz",
    `${ZEICHEN[r.ascZeichen].glyph} <b>${ZEICHEN[r.ascZeichen].name}</b>`,
    Math.floor(r.ascGrad) + 1,
    herr ? mitArtikel(PLANET[r.herrscher].name) : null,
    herr ? `${ZEICHEN[herr.zeichen].glyph} ${ZEICHEN[herr.zeichen].name}` : "",
    herr ? herr.haus : "", herr ? HAUS[herr.haus - 1] : "",
    herr && herr.wuerde.stufe !== "—" ? `, ${herr.wuerde.text}` : "",
    herr ? d(WINKEL.includes(herr.haus) ? "stellung.winkel"
            : FOLGEND.includes(herr.haus) ? "stellung.folgend" : "stellung.kadent") : "");
  s3.appendChild(p3);
  ziel.appendChild(s3);

  /* ---- 4. Der Herr des Ganzen ---- */
  if (alm) {
    const s4 = el("section", "rdTeil");
    s4.append(nr("IV"), el("h3", null, d("rd.4")));
    const a = alm.sieger;
    const p4 = el("p");
    p4.innerHTML = d("alm.satz", `${PLANET[a.key].g} ${PLANET[a.key].name}`, a.total,
                     a.key === r.herrscher, mitArtikel(PLANET[r.herrscher].name));
    s4.appendChild(p4);
    s4.appendChild(el("p", "kucukNot", d("alm.mehr")));
    ziel.appendChild(s4);
  }

  /* ---- 5. Die Lichter ---- */
  const s5 = el("section", "rdTeil");
  s5.append(nr("V"), el("h3", null, d("rd.5")));
  [["sonne", d("licht.sonne")], ["mond", d("licht.mond")]].forEach(([k, was]) => {
    const pl = r.planeten[k];
    if (!pl) return;
    const p = el("p");
    p.innerHTML = d("licht.satz", `${PLANET[k].g} ${PLANET[k].name}`, was,
      `${ZEICHEN[pl.zeichen].glyph} ${ZEICHEN[pl.zeichen].name}`, pl.haus,
      HAUS[pl.haus - 1], pl.wuerde.stufe !== "—" ? `, ${pl.wuerde.text}` : "");
    s5.appendChild(p);
  });
  ziel.appendChild(s5);

  /* ---- 6. Stark und schwach ---- */
  const s6 = el("section", "rdTeil");
  s6.append(nr("VI"), el("h3", null, d("rd.6")));
  const tab = el("table", "rdTafel");
  tab.innerHTML = `<thead><tr><th>${d("tab.planet")}</th><th>${d("tab.zeichen")}</th>` +
                  `<th>${d("tab.feld")}</th><th>${d("tab.wuerde")}</th>` +
                  `<th>${d("tab.rolle")}</th></tr></thead>`;
  const tb = el("tbody");
  dt.staerke.forEach((x, i) => {
    const tr = el("tr");
    if (i === 0) tr.className = "rdStark";
    if (i === dt.staerke.length - 1) tr.className = "rdSchwach";
    const rolleWort = x.rolle.art === "wohl" ? d(x.rolle.rang === 1 ? "rolle.wohlGross" : "rolle.wohl")
      : x.rolle.art === "uebel" ? d(x.rolle.rang === 1 ? "rolle.uebelGross" : "rolle.uebel")
      : x.rolle.art === "sekte" ? d("rolle.sekte")
      : x.rolle.art === "fremd" ? d("rolle.fremd") : d("rolle.keine");
    tr.innerHTML = `<td>${PLANET[x.key].g} ${PLANET[x.key].name}</td>` +
      `<td>${ZEICHEN[x.pl.zeichen].glyph} ${ZEICHEN[x.pl.zeichen].name}</td>` +
      `<td>${x.pl.haus}.</td>` +
      `<td>${x.pl.wuerde.stufe === "—" ? "—" : x.pl.wuerde.stufe}</td>` +
      `<td>${rolleWort}</td>`;
    tb.appendChild(tr);
  });
  tab.appendChild(tb);
  s6.appendChild(tab);
  const p6 = el("p");
  p6.innerHTML = d("stark.satz", PLANET[dt.staerkster.key].name, PLANET[dt.schwaechster.key].name);
  s6.appendChild(p6);
  ziel.appendChild(s6);

  /* ---- 7. Die Winkel ---- */
  const s7 = el("section", "rdTeil");
  s7.append(nr("VII"), el("h3", null, d("rd.7")));
  const p7 = el("p");
  p7.innerHTML = dt.winkelhaft.length
    ? d("winkel.ja", dt.winkelhaft.map(p => p.name).join(", "))
    : d("winkel.nein");
  s7.appendChild(p7);
  if (dt.kadent.length) {
    const p = el("p");
    p.innerHTML = d("kadent", dt.kadent.map(x => x.name).join(", "));
    s7.appendChild(p);
  }
  ziel.appendChild(s7);

  /* ---- 8. Die Aufnahmen ---- */
  const s8 = el("section", "rdTeil");
  s8.append(nr("VIII"), el("h3", null, d("rd.8")));
  if (dt.aufnahmen.length) {
    const ul = el("ul", "zeugenListe");
    dt.aufnahmen.forEach(a => {
      const li = el("li", a.voll ? "z-gut" : "z-neutral");
      li.innerHTML = a.voll
        ? d("aufnahme.voll", PLANET[a.gast].name, PLANET[a.wirt].name,
            ZEICHEN[a.zeichen].name, a.sicht)
        : d("aufnahme.halb", PLANET[a.gast].name, PLANET[a.wirt].name, ZEICHEN[a.zeichen].name);
      ul.appendChild(li);
    });
    s8.appendChild(ul);
  } else {
    s8.appendChild(el("p", null, d("aufnahme.keine")));
  }
  ziel.appendChild(s8);

  ziel.appendChild(el("p", "kucukNot", d("rd.note")));
}



/* ======================================================================
   Dieselbe Geburt durch die andere Brille.

   Die mittelalterliche Deutung oben fragt, was objektiv der Fall ist:
   Welcher Planet regiert, wie steht er, was folgt daraus. Zoller besteht
   darauf, dass nur das Astrologie sei, und hält alles andere für eine
   Verwechslung des Horoskops mit dem Innenleben.

   Diese hier macht genau das, was er ablehnt — und zwar mit Absicht.
   Sie liest dieselben Zahlen als Figuren und fragt nicht, was der Fall
   ist, sondern wovon die Rede ist. Beide Brillen zeigen denselben
   Himmel. Welche man aufsetzt, ist eine Entscheidung, keine Wahrheit.
   ====================================================================== */



function zeichneMythisch() {
  const ziel = $("#rdCikti");
  if (!ziel) return;
  const dt = radixDeutung();
  ziel.innerHTML = "";
  ziel.hidden = false;
  if (!dt) {
    ziel.appendChild(el("p", "kucukNot",
      "Dafür fehlen die Geburtsangaben — Datum, Uhrzeit und der Ort mit gesuchten Koordinaten."));
    return;
  }
  const { r, herr, temp, alm } = dt;
  const fh = herr ? figurVon(r.herrscher) : null;

  const absatz = (titel, html) => {
    const w = el("section", "rdTeil");
    w.appendChild(el("h3", null, titel));
    const p = el("p");
    p.innerHTML = html;
    w.appendChild(p);
    ziel.appendChild(w);
    return w;
  };

  /* Die Bühne. */
  absatz(d("my.buehne"),
    d("my.buehne.satz", BILD[r.ascZeichen], r.tagGeburt, fh,
      herr ? ORT[herr.haus - 1] : "",
      herr ? (STAND[herr.wuerde.stufe] || STAND["—"]) : ""));

  /* Der Stoff, aus dem du gemacht bist. */
  if (temp) {
    absatz(d("my.stoff"),
      d("my.stoff.satz", temp.haupt.element, temp.haupt.saftBild, temp.haupt.text,
        temp.neben ? temp.neben.element : null));
  }

  /* Zwei, die das Licht halten. */
  const so = r.planeten.sonne, mo = r.planeten.mond;
  if (so && mo) {
    absatz(d("my.lichter"),
      d("my.lichter.satz", bildDat(so.zeichen), ORT[so.haus - 1],
        bildDat(mo.zeichen), ORT[mo.haus - 1]));
  }

  /* Der Starke und der Schwache. */
  const st = figurVon(dt.staerkster.key), sw = figurVon(dt.schwaechster.key);
  absatz(d("my.wort"), d("my.wort.satz", st, sw));

  /* Die Gastfreundschaften. */
  if (dt.aufnahmen.length) {
    const volle = dt.aufnahmen.filter(a => a.voll);
    absatz(d("my.gast"),
      volle.length
        ? volle.map(a => d("my.gast.voll", figurVon(a.gast).figur, figurVon(a.wirt).dat)).join(" ")
        : dt.aufnahmen.map(a => d("my.gast.halb", figurVon(a.gast).figur, figurVon(a.wirt).dat)).join(" "));
  }

  /* Was das zusammen heißt. */
  if (alm) {
    const fa = figurVon(alm.sieger.key);
    absatz(d("my.rede"), d("my.rede.satz", fa.figur, fa.fabel));
  }

  ziel.appendChild(el("p", "kucukNot", d("my.note")));
}

/* ------------------------------------------------------- die Umschaltung */
let brille = "mittelalter";
try { brille = localStorage.getItem("oracle-brille") || "mittelalter"; } catch (e) {}

function schalteBrille(neu) {
  brille = neu;
  try { localStorage.setItem("oracle-brille", neu); } catch (e) {}
  document.querySelectorAll("#rdWahl .brilleKarte").forEach(k =>
    k.classList.toggle("gewaehlt", k.dataset.brille === neu));
  (neu === "mythos" ? zeichneMythisch : zeichneMittelalter)();
}

document.querySelectorAll("#rdWahl .brilleKarte").forEach(k =>
  k.addEventListener("click", () => schalteBrille(k.dataset.brille)));

$("#rdBerechnen")?.addEventListener("click", () => schalteBrille(brille));
if ($("#rdCikti")) {
  window.addEventListener("load", () => setTimeout(() => schalteBrille(brille), 350));
  window.addEventListener("profil-geaendert", () => setTimeout(() => schalteBrille(brille), 250));
  /* Nach einem Sprachwechsel muss die gerade offene Brille neu gezeichnet
     werden — sonst bleibt der alte Text stehen, bis man die Brille wechselt. */
  window.addEventListener("sprache-geaendert", () => setTimeout(() => schalteBrille(brille), 60));
}
