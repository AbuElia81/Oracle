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
  from "./horoskop.js?v=160";
import { almutemFiguris } from "./almutem.js?v=160";
import { FIGUR, BILD, ORT, STAND, figurVon, bildDat } from "./sprache.js?v=160";

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

const TEMPERAMENT = {
  "warm-feucht":   { name: "sanguinisch", saft: "Blut", element: "Luft",
    bild: "Luft und Blut — das rasche, zugewandte, leicht entzündliche Gemüt",
    text: "Du nimmst schnell auf und gibst schnell weiter. Gesellschaft bekommt dir, " +
          "Alleinsein zehrt. Was dich reizt, reizt dich sofort und ist ebenso schnell " +
          "wieder vorbei. Die alten Ärzte hielten diese Mischung für die glücklichste " +
          "und warnten zugleich vor ihrer Flüchtigkeit: Was leicht kommt, bleibt nicht " +
          "von selbst." },
  "warm-trocken":  { name: "cholerisch", saft: "gelbe Galle", element: "Feuer",
    bild: "Feuer und gelbe Galle — das scharfe, schnelle, auffahrende Gemüt",
    text: "Du entscheidest, ehe andere fertig überlegt haben, und liegst damit öfter " +
          "richtig, als die Überlegenden zugeben. Dein Zorn kommt schnell und geht " +
          "schnell. Die Gefahr dieser Mischung ist nicht die Hitze, sondern die " +
          "Trockenheit: zu wenig Geduld mit dem, was Zeit braucht." },
  "kalt-trocken":  { name: "melancholisch", saft: "schwarze Galle", element: "Erde",
    bild: "Erde und schwarze Galle — das ernste, haltbare, schwer zu bewegende Gemüt",
    text: "Du prüfst lange und bindest dich dann fest. Was du einmal begriffen hast, " +
          "verlierst du nicht wieder. Diese Mischung galt den Alten als die der " +
          "Gelehrten und Handwerker — und als die, die am ehesten in Schwermut kippt, " +
          "wenn nichts von außen sie wärmt." },
  "kalt-feucht":   { name: "phlegmatisch", saft: "Schleim", element: "Wasser",
    bild: "Wasser und Schleim — das ruhige, aufnehmende, nachgiebige Gemüt",
    text: "Du lässt vieles an dich heran, ohne dich davon umwerfen zu lassen. Wo andere " +
          "auffahren, wartest du ab, und oft hat sich die Sache dann erledigt. Die " +
          "Gefahr dieser Mischung ist nicht die Trägheit, sondern das Nachgeben: " +
          "Du räumst Felder, auf denen du hättest stehen bleiben sollen." }
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
  const d = radixDeutung();
  ziel.innerHTML = "";
  ziel.hidden = false;
  if (!d) {
    ziel.appendChild(el("p", "kucukNot",
      "Dafür fehlen die Geburtsangaben — Datum, Uhrzeit und der Ort mit gesuchten Koordinaten."));
    return;
  }
  const { r, herr, temp, alm } = d;
  const nr = n => el("div", "rdNummer", n);

  /* ---- 1. Die Sekte ---- */
  const s1 = el("section", "rdTeil");
  s1.append(nr("I"), el("h3", null, "Die Sekte"));
  const p1 = el("p");
  p1.innerHTML = r.tagGeburt
    ? `Du bist <b>bei Tag</b> geboren: Die Sonne stand über dem Horizont. Damit gehört ` +
      `diese Geburt der Tagsekte. Sonne, Jupiter und Saturn treten hier in ihrer ` +
      `umgänglicheren Gestalt auf, Mond, Venus und Mars in ihrer fordernden. ` +
      `Der schwerere der beiden Übeltäter ist <b>Saturn</b>, der größere Wohltäter ` +
      `<b>Venus</b> — nicht Jupiter, wie man meinen würde.`
    : `Du bist <b>bei Nacht</b> geboren: Die Sonne stand unter dem Horizont. Damit gehört ` +
      `diese Geburt der Nachtsekte. Mond, Venus und Mars treten hier in ihrer ` +
      `umgänglicheren Gestalt auf, Sonne, Jupiter und Saturn in ihrer fordernden. ` +
      `Der schwerere der beiden Übeltäter ist <b>Mars</b>, der größere Wohltäter ` +
      `<b>Jupiter</b>.`;
  s1.appendChild(p1);
  s1.appendChild(el("p", "kucukNot",
    "Dies ist der erste Griff jeder alten Deutung und der folgenreichste: Dieselbe " +
    "Stellung bedeutet bei Tag etwas anderes als bei Nacht."));
  ziel.appendChild(s1);

  /* ---- 2. Das Temperament ---- */
  if (temp) {
    const s2 = el("section", "rdTeil");
    s2.append(nr("II"), el("h3", null, "Das Temperament"));
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
      n.innerHTML = `Die Mischung ist nicht rein: Auf einer Achse steht es knapp, und darum ` +
        `läuft <b>${temp.neben.name}</b> mit — ${temp.neben.bild}. Die alten Ärzte nannten ` +
        `so etwas eine zusammengesetzte Komplexion und hielten sie für den Normalfall.`;
      s2.appendChild(n);
    }
    const liste = el("ul", "zeugenListe");
    temp.zeugen.forEach(z => {
      const li = el("li", "z-neutral");
      const w = z.warm > 0 ? "warm" : z.warm < 0 ? "kalt" : "weder warm noch kalt";
      const f = z.feucht > 0 ? "feucht" : z.feucht < 0 ? "trocken" : "weder feucht noch trocken";
      li.innerHTML = `${z.wer} — <span class="rdQual">${w}, ${f}</span>`;
      liste.appendChild(li);
    });
    s2.appendChild(liste);
    s2.appendChild(el("p", "kucukNot",
      "Gerechnet nach den vier Zeugen der Überlieferung: das aufsteigende Zeichen, sein " +
      "Herr, der Mond nach Zeichen und Phase, die Jahreszeit — dazu, wer im ersten Feld " +
      "steht. Die Alten lasen daran Leib, Gemüt, Tempo und Krankheitsneigung zugleich; " +
      "hier steht nur, was das Gemüt betrifft."));
    ziel.appendChild(s2);
  }

  /* ---- 3. Der Aufsteigende und sein Herr ---- */
  const s3 = el("section", "rdTeil");
  s3.append(nr("III"), el("h3", null, "Der Aufsteigende und sein Herr"));
  const p3 = el("p");
  p3.innerHTML = `In der Stunde deiner Geburt stieg ${ZEICHEN[r.ascZeichen].glyph} ` +
    `<b>${ZEICHEN[r.ascZeichen].name}</b> über den Osthorizont, im ` +
    `${Math.floor(r.ascGrad) + 1}. Grad. Das aufsteigende Zeichen ist in dieser Lehre ` +
    `nicht dein Charakter, sondern dein <em>Körper in der Welt</em>: wie du auftrittst, ` +
    `wie man dich zuerst sieht, was man dir zutraut. ` +
    (herr
      ? `Darüber gebietet ${mitArtikel(PLANET[r.herrscher].name)} — und wo der steht, ` +
        `dorthin zieht dein Leben. ${grossMitArtikel(PLANET[r.herrscher].name)} steht in ` +
        `${ZEICHEN[herr.zeichen].glyph} ${ZEICHEN[herr.zeichen].name}, im ${herr.haus}. Feld: ` +
        `${HAUS[herr.haus - 1]}` +
        (herr.wuerde.stufe !== "—" ? `, und ${herr.wuerde.text}` : "") + `. ` +
        (WINKEL.includes(herr.haus)
          ? "Er steht winkelhaft — was er anzeigt, tritt sichtbar und bald ein."
          : FOLGEND.includes(herr.haus)
            ? "Er steht folgend — es wirkt, aber mit Verzögerung."
            : "Er steht kadent — es wirkt mittelbar, oft durch andere hindurch.")
      : "");
  s3.appendChild(p3);
  ziel.appendChild(s3);

  /* ---- 4. Der Herr des Ganzen ---- */
  if (alm) {
    const s4 = el("section", "rdTeil");
    s4.append(nr("IV"), el("h3", null, "Der Herr des Ganzen"));
    const a = alm.sieger;
    const p4 = el("p");
    p4.innerHTML = `Über alle fünf Stellen gerechnet führt ` +
      `<b>${PLANET[a.key].g} ${PLANET[a.key].name}</b> mit ${a.total} Punkten. ` +
      `Wo die einzelnen Zeugen sich widersprechen, hat er das letzte Wort. ` +
      (a.key === r.herrscher
        ? `Er ist zugleich der Herr des Aufsteigenden — das ist der klare Fall: ` +
          `Diese Geburt hat eine Mitte, und sie ist unstrittig.`
        : `Er ist nicht der Herr des Aufsteigenden; der ist ` +
          `${mitArtikel(PLANET[r.herrscher].name)}. Zwei verschiedene also: Der eine sagt, ` +
          `wie du auftrittst, der andere, worum es in diesem Leben überhaupt geht.`);
    s4.appendChild(p4);
    s4.appendChild(el("p", "kucukNot", "Ausführlich im Abschnitt „Der Herr der Geburt“."));
    ziel.appendChild(s4);
  }

  /* ---- 5. Die Lichter ---- */
  const s5 = el("section", "rdTeil");
  s5.append(nr("V"), el("h3", null, "Die beiden Lichter"));
  [["sonne", "Vater, Obrigkeit, Rang, Lebenskraft und alles, was ins Licht tritt"],
   ["mond",  "Mutter, Leib, Gemüt, das tägliche Leben und alles, was sich wandelt"]].forEach(([k, was]) => {
    const pl = r.planeten[k];
    if (!pl) return;
    const p = el("p");
    p.innerHTML = `<b>${PLANET[k].g} ${PLANET[k].name}</b> — ${was}. ` +
      `Bei dir in ${ZEICHEN[pl.zeichen].glyph} ${ZEICHEN[pl.zeichen].name}, im ${pl.haus}. Feld: ` +
      `${HAUS[pl.haus - 1]}` +
      (pl.wuerde.stufe !== "—" ? `, und ${pl.wuerde.text}` : "") + ".";
    s5.appendChild(p);
  });
  ziel.appendChild(s5);

  /* ---- 6. Stark und schwach ---- */
  const s6 = el("section", "rdTeil");
  s6.append(nr("VI"), el("h3", null, "Wer stark steht und wer schwach"));
  const tab = el("table", "rdTafel");
  tab.innerHTML = "<thead><tr><th>Planet</th><th>Zeichen</th><th>Feld</th>" +
                  "<th>Würde</th><th>Rolle in dieser Sekte</th></tr></thead>";
  const tb = el("tbody");
  d.staerke.forEach((x, i) => {
    const tr = el("tr");
    if (i === 0) tr.className = "rdStark";
    if (i === d.staerke.length - 1) tr.className = "rdSchwach";
    const rolleWort = x.rolle.art === "wohl" ? (x.rolle.rang === 1 ? "größerer Wohltäter" : "Wohltäter")
      : x.rolle.art === "uebel" ? (x.rolle.rang === 1 ? "schwererer Übeltäter" : "Übeltäter")
      : x.rolle.art === "sekte" ? "Licht dieser Sekte"
      : x.rolle.art === "fremd" ? "Licht der anderen Sekte" : "weder noch";
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
  p6.innerHTML = `Am stärksten steht <b>${PLANET[d.staerkster.key].name}</b>: ` +
    `Was er anzeigt, bekommst du, ob du willst oder nicht. ` +
    `Am schwächsten <b>${PLANET[d.schwaechster.key].name}</b> — was er anzeigt, ` +
    `musst du dir nehmen; es fällt dir nicht zu.`;
  s6.appendChild(p6);
  ziel.appendChild(s6);

  /* ---- 7. Die Winkel ---- */
  const s7 = el("section", "rdTeil");
  s7.append(nr("VII"), el("h3", null, "Was sofort wirkt"));
  const p7 = el("p");
  p7.innerHTML = d.winkelhaft.length
    ? `Winkelhaft — also im 1., 4., 7. oder 10. Feld — stehen ` +
      `<b>${d.winkelhaft.map(p => p.name).join(", ")}</b>. Was diese anzeigen, tritt sichtbar ` +
      `ein und braucht keinen Umweg. In der alten Lehre ist das der wichtigste Unterschied ` +
      `überhaupt: nicht ob ein Planet gut oder schlecht steht, sondern ob er überhaupt ` +
      `zu Wort kommt.`
    : `Kein Planet steht winkelhaft. Das ist selten und heißt: In diesem Leben tritt nichts ` +
      `von selbst ein. Alles geht über Umwege, über andere Menschen, über Geduld.`;
  s7.appendChild(p7);
  if (d.kadent.length) {
    const p = el("p");
    p.innerHTML = `Kadent — im 3., 6., 9. oder 12. Feld — stehen ` +
      `${d.kadent.map(x => x.name).join(", ")}. Sie wirken mittelbar: durch andere, ` +
      `im Verborgenen, oder erst auf den zweiten Blick.`;
    s7.appendChild(p);
  }
  ziel.appendChild(s7);

  /* ---- 8. Die Aufnahmen ---- */
  const s8 = el("section", "rdTeil");
  s8.append(nr("VIII"), el("h3", null, "Wer wen beherbergt"));
  if (d.aufnahmen.length) {
    const ul = el("ul", "zeugenListe");
    d.aufnahmen.forEach(a => {
      const li = el("li", a.voll ? "z-gut" : "z-neutral");
      li.innerHTML = `<b>${PLANET[a.gast].name}</b> steht im Zeichen von ` +
        `<b>${PLANET[a.wirt].name}</b> (${ZEICHEN[a.zeichen].name}) — ` +
        (a.voll
          ? `und beide sehen einander an (${a.sicht}). Das ist eine <b>volle Aufnahme</b>: ` +
            `Der Wirt nimmt den Gast auf und tut für ihn, was er kann. Die Alten halten das ` +
            `für den stärksten Zusammenhalt zweier Gestalten im ganzen Horoskop.`
          : `sie sehen einander aber nicht. Der Gast wohnt beim Wirt, ohne dass der es ` +
            `bemerkt: Die Hilfe liegt bereit und wird nicht abgerufen.`);
      ul.appendChild(li);
    });
    s8.appendChild(ul);
  } else {
    s8.appendChild(el("p", null,
      "Kein Planet steht im Zeichen eines anderen, der ihn ansieht. Jeder steht für sich."));
  }
  ziel.appendChild(s8);

  ziel.appendChild(el("p", "kucukNot",
    "Die Reihenfolge ist die der mittelalterlichen Schule: erst die Sekte, dann das " +
    "Temperament, dann der Mensch selbst, dann der Herr des Ganzen, die Lichter, die " +
    "Stärken, die Winkel und zuletzt die Aufnahmen. Robert Zoller fasst die Regel in " +
    "vier Worte: keine Deutung, keine Vorhersage. Was hier steht, ist der Inhalt — die " +
    "Zeittechniken dieser Seite sagen nur, wann davon etwas fällig wird."));
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

const SAFT_BILD = {
  "sanguinisch":   "Luft, die durch ein offenes Fenster streicht: Sie bringt herein, was draußen ist, und nimmt mit, was drinnen war.",
  "cholerisch":    "Ein Feuer, das sofort brennt, wenn man es anrührt — und das Holz braucht, sonst geht es aus.",
  "melancholisch": "Erde, in der etwas liegt und wartet. Sie gibt nichts schnell heraus, aber was sie hergibt, ist gewachsen.",
  "phlegmatisch":  "Wasser, das die Form des Gefäßes annimmt und sich doch nicht ändert."
};

function zeichneMythisch() {
  const ziel = $("#rdCikti");
  if (!ziel) return;
  const d = radixDeutung();
  ziel.innerHTML = "";
  ziel.hidden = false;
  if (!d) {
    ziel.appendChild(el("p", "kucukNot",
      "Dafür fehlen die Geburtsangaben — Datum, Uhrzeit und der Ort mit gesuchten Koordinaten."));
    return;
  }
  const { r, herr, temp, alm } = d;
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
  absatz("Die Bühne", 
    `In der Stunde deiner Geburt kam ${BILD[r.ascZeichen]} über den Rand der Welt herauf. ` +
    `Das ist das Bild, in dem du auftrittst — nicht wer du bist, sondern wie der Vorhang ` +
    `aufgeht. ` +
    (r.tagGeburt
      ? `Es war hell. In einem hellen Stück treten die Lauten zuerst auf, und die Leisen ` +
        `bekommen ihre Szene später.`
      : `Es war dunkel. In einem dunklen Stück fängt alles leiser an, und was zählt, ` +
        `geschieht abseits der Fackeln.`) +
    (fh ? ` Die Hand, die dieses Stück führt, ist ${fh.figur}: ${fh.pron} ${fh.tut}. ` +
          `${fh.pron.charAt(0).toUpperCase() + fh.pron.slice(1)} hält sich auf ${ORT[herr.haus - 1]}. ` +
          `${STAND[herr.wuerde.stufe] || STAND["—"]}` : ""));

  /* Der Stoff, aus dem du gemacht bist. */
  if (temp) {
    absatz("Der Stoff",
      `Die alten Ärzte mischten jeden Menschen aus vier Dingen, und bei dir überwiegt ` +
      `<b>${temp.haupt.element}</b>. ${SAFT_BILD[temp.haupt.name]} ` +
      `${temp.haupt.text} ` +
      (temp.neben
        ? `Rein ist die Mischung nicht — ${temp.neben.element} läuft mit, und das ist ` +
          `der Normalfall: Niemand ist nur ein Element.`
        : `Die Mischung ist auffallend deutlich; das ist selten.`));
  }

  /* Zwei, die das Licht halten. */
  const so = r.planeten.sonne, mo = r.planeten.mond;
  if (so && mo) {
    absatz("Die beiden Lichter",
      `Zwei Gestalten halten in jeder Geburt das Licht: ` +
      `<b>der König im Licht</b> steht bei ${bildDat(so.zeichen)} und ${ORT[so.haus - 1]} — ` +
      `von dort kommt, was an dir gesehen werden will, und von dort kam auch dein Vater. ` +
      `<b>Die Wandernde mit den vielen Gesichtern</b> steht bei ${bildDat(mo.zeichen)} und ` +
      `${ORT[mo.haus - 1]} — von dort kommt, was dich nährt und was sich bei dir ändert, ` +
      `und von dort kam deine Mutter. ` +
      `In den alten Büchern ist das kein Vergleich, sondern dieselbe Sache: Was oben ` +
      `wandert, heißt unten Mutter.`);
  }

  /* Der Starke und der Schwache. */
  const st = figurVon(d.staerkster.key), sw = figurVon(d.schwaechster.key);
  absatz("Wer das Wort führt und wer schweigt",
    `Am lautesten spricht ${st.figur} — ${st.pron} ${st.tut}. ` +
    `${st.pron.charAt(0).toUpperCase() + st.pron.slice(1)} gibt dir ${st.gabe} und nimmt sich ` +
    `${st.preis}. Was von dort kommt, bekommst du, ob du willst oder nicht. ` +
    `Am leisesten ${sw.figur} — ${sw.fabel}. ` +
    `Was von dort kommt, fällt dir nicht zu: Du musst es dir holen, und zwar jedes Mal neu.`);

  /* Die Gastfreundschaften. */
  if (d.aufnahmen.length) {
    const volle = d.aufnahmen.filter(a => a.voll);
    absatz("Wer bei wem zu Gast ist",
      volle.length
        ? volle.map(a => {
            const g = figurVon(a.gast), w = figurVon(a.wirt);
            return `${g.figur.charAt(0).toUpperCase() + g.figur.slice(1)} wohnt im Haus ` +
                   `${w.dat}, und die beiden sehen einander dabei an. ` +
                   `In den alten Büchern ist das die stärkste Freundschaft, die zwei ` +
                   `Gestalten schließen können: Der Wirt tut für den Gast, was er kann, ` +
                   `und zwar ohne dass man ihn bitten muss.`;
          }).join(" ")
        : d.aufnahmen.map(a => {
            const g = figurVon(a.gast), w = figurVon(a.wirt);
            return `${g.figur.charAt(0).toUpperCase() + g.figur.slice(1)} wohnt im Haus ` +
                   `${w.dat} — aber sie sehen einander nicht. Die Gastfreundschaft liegt ` +
                   `bereit und wird nicht in Anspruch genommen.`;
          }).join(" "));
  }

  /* Was das zusammen heißt. */
  if (alm) {
    const fa = figurVon(alm.sieger.key);
    absatz("Wovon hier die Rede ist",
      `Rechnet man alles zusammen — jede Stelle, jeden Ort, den Tag und die Stunde —, ` +
      `so steht am Ende ${fa.figur} obenan. ${fa.fabel.charAt(0).toUpperCase() + fa.fabel.slice(1)}: ` +
      `Das ist die Fabel, die unter diesem Leben liegt. ` +
      `Wo sich die einzelnen Zeichen widersprechen, erzählt sie weiter.`);
  }

  ziel.appendChild(el("p", "kucukNot",
    "Dies ist dieselbe Geburt wie nebenan, nur anders gelesen. Die mittelalterliche " +
    "Schule würde diese Lesart ablehnen: Robert Zoller nennt es eine Verwechslung des " +
    "Horoskops mit dem Innenleben und besteht darauf, dass die Felder äußere Verhältnisse " +
    "bezeichnen, nicht Vorstellungen davon. Er hat damit nicht unrecht — aber ein Bild " +
    "merkt man sich, und eine Tabelle nicht. Darum stehen hier beide."));
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
}
