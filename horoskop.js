/* ------------------------------------------------------------------------
   horoskop.js — die Radix und ihre Zeit.

   Alle Zeitherrscher-Techniken dieser Seite — Profektionen, Zodiacal
   Releasing, der Lebensbogen — sagen nur, *wann* etwas dran ist. Was dran
   ist, steht im Geburtshoroskop. Dieses Modul rechnet es und stellt seine
   Ergebnisse den übrigen Abschnitten zur Verfügung, damit deren Deutungen
   konkret werden können.

   Häuser im Ganzzeichen, wie überall auf dieser Seite.
   --------------------------------------------------------------------- */
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=268";
import { berechneGeburt, planetenPositionen, julianischesDatum,
         aszendent, medium, schiefeDerEkliptik, siderischeZeitGreenwich,
         norm360 } from "./astro.js?v=268";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

export const ZEICHEN = [
  { name:"Widder", glyph:"♈︎" }, { name:"Stier", glyph:"♉︎" },
  { name:"Zwillinge", glyph:"♊︎" }, { name:"Krebs", glyph:"♋︎" },
  { name:"Löwe", glyph:"♌︎" }, { name:"Jungfrau", glyph:"♍︎" },
  { name:"Waage", glyph:"♎︎" }, { name:"Skorpion", glyph:"♏︎" },
  { name:"Schütze", glyph:"♐︎" }, { name:"Steinbock", glyph:"♑︎" },
  { name:"Wassermann", glyph:"♒︎" }, { name:"Fische", glyph:"♓︎" }
];

export const PLANET = {
  sonne:   { name:"Sonne",   g:"☉", was:"dein Wille und dein Rang" },
  mond:    { name:"Mond",    g:"☽", was:"dein Gemüt und dein Bedürfnis" },
  merkur:  { name:"Merkur",  g:"☿", was:"dein Denken und dein Reden" },
  venus:   { name:"Venus",   g:"♀", was:"was du liebst und was du schön findest" },
  mars:    { name:"Mars",    g:"♂", was:"dein Antrieb und dein Zorn" },
  jupiter: { name:"Jupiter", g:"♃", was:"dein Vertrauen und dein Maß" },
  saturn:  { name:"Saturn",  g:"♄", was:"dein Ernst und deine Grenze" }
};
export const REIHE = ["sonne","mond","merkur","venus","mars","jupiter","saturn"];

/* Sonne und Mond brauchen den Artikel, die übrigen nicht. */
const ARTIKEL = { sonne:"die Sonne", mond:"der Mond" };
export function mitArtikel(name) {
  const k = String(name).toLowerCase();
  return ARTIKEL[k] || (PLANET[k] ? PLANET[k].name : name);
}
export function grossMitArtikel(name) {
  const t = mitArtikel(name);
  return t.charAt(0).toUpperCase() + t.slice(1);
}

const ART_DE = [
  "geradeheraus und schnell", "beharrlich und sinnlich", "beweglich und neugierig",
  "empfindsam und schützend", "großzügig und auf Wirkung bedacht", "prüfend und genau",
  "abwägend und auf Ausgleich bedacht", "unbedingt und tief", "weit ausholend und überzeugt",
  "ernst und auf Dauer angelegt", "eigenwillig und sachlich", "durchlässig und mitfühlend"
];
let ART = ART_DE;

export const HAUS = [
  "am eigenen Leib und im Auftreten", "beim Besitz und beim Einkommen",
  "auf den nahen Wegen, unter Geschwistern und Nachrichten", "im Haus, bei Herkunft und Eltern",
  "bei Kindern, Lust und allem Hervorbringen", "in Arbeit, Dienst und Gesundheit",
  "beim Anderen — Ehe, Verträge, offene Gegner", "bei Verlust, Erbe und allem Geliehenen",
  "in der Fremde, in Lehre und Glauben", "im Amt und im Ruf",
  "unter Freunden, in Bünden und Hoffnungen", "im Verborgenen und im eigenen Weg"
];

const DOMIZIL   = ["mars","venus","merkur","mond","sonne","merkur","venus","mars","jupiter","saturn","saturn","jupiter"];
const EXALT     = { sonne:0, mond:1, jupiter:3, merkur:5, saturn:6, mars:9, venus:11 };
const FALL      = { sonne:6, mond:7, jupiter:9, merkur:11, saturn:0, mars:3, venus:5 };

/* Die Stufe ist der sprachfeste Schlüssel, der Text hängt an der Sprache.
   Als Getter, damit ein Umschalten auch schon gerechnete Würden erreicht. */
const WUERDE_TEXT_DE = {
  "Domizil":"in eigenem Zeichen — hat, was nötig ist, und wirkt ungehindert",
  "Erhöhung":"erhöht — wird hier über das eigene Maß hinaus geachtet",
  "Exil":"im Exil — muss hier gegen den Strich arbeiten",
  "Fall":"im Fall — kommt hier schwer zu seinem Recht",
  "—":"ohne besondere Würde — wirkt hier nach den Umständen"
};
let WUERDE_TEXT = WUERDE_TEXT_DE;

function wuerde(planetKey, zeichen) {
  const stufe =
    DOMIZIL[zeichen] === planetKey ? "Domizil" :
    EXALT[planetKey] === zeichen ? "Erhöhung" :
    DOMIZIL[(zeichen + 6) % 12] === planetKey ? "Exil" :
    FALL[planetKey] === zeichen ? "Fall" : "—";
  return { stufe, get text() { return WUERDE_TEXT[stufe]; } };
}

const ASPEKT_TON_DE = {
  "Konjunktion":"verschmolzen", "Sextil":"als Gelegenheit", "Quadrat":"unter Spannung",
  "Trigon":"leichthin", "Opposition":"einander gegenüber"
};
let ASPEKT_TON = ASPEKT_TON_DE;

const PHASEN_DE = [
  "Neumond — ein Anfang, der noch niemandem auffällt",
  "zunehmende Sichel — das Vorhaben nimmt Gestalt an, gegen Widerstand",
  "erstes Viertel — jetzt muss entschieden werden",
  "zunehmender Dreiviertelmond — Ausbau, Tempo, Sichtbarwerden",
  "Vollmond — es steht im Licht, und man sieht auch, was fehlt",
  "abnehmender Dreiviertelmond — Ernte, Weitergabe, Verbreitung",
  "letztes Viertel — die Sache wird überprüft und zurechtgerückt",
  "abnehmende Sichel — Loslassen, Aufräumen, Vorbereitung auf das Nächste"
];
let PHASEN = PHASEN_DE;

/* Die wenigen Bindewörter des Zustandssatzes. */
const SATZ_WORT_DE = { steht:"steht bei dir in", haus: n => `im ${n}. Haus`,
  ohneWuerde:"ohne besondere Würde",
  stufe: { Domizil:"Domizil", "Erhöhung":"Erhöhung", Exil:"Exil", Fall:"Fall" } };
const SATZ_WORT_IT = { steht:"sta presso di te in", haus: n => `nella ${n}ª casa`,
  ohneWuerde:"senza dignità particolare",
  stufe: { Domizil:"domicilio", "Erhöhung":"esaltazione", Exil:"esilio", Fall:"caduta" } };
const SATZ_WORT_EN = { steht:"stands with you in",
  haus: n => `in the ${englischeOrdnung(n)} house`, ohneWuerde:"without particular dignity",
  stufe: { Domizil:"domicile", "Erhöhung":"exaltation", Exil:"exile", Fall:"fall" } };

/* 1st, 2nd, 3rd, 4th — und 11th bis 13th trotz der Endziffern. */
function englischeOrdnung(n) {
  const z = Math.abs(Math.round(Number(n))), zehner = z % 100, einer = z % 10;
  return n + ((zehner >= 11 && zehner <= 13) ? "th"
    : einer === 1 ? "st" : einer === 2 ? "nd" : einer === 3 ? "rd" : "th");
}
let SATZ_WORT = SATZ_WORT_DE;
const ASPEKTE = [
  { name:"Konjunktion", winkel:0   }, { name:"Sextil", winkel:60  },
  { name:"Quadrat",     winkel:90  }, { name:"Trigon", winkel:120 },
  { name:"Opposition",  winkel:180 }
].map(a => ({ ...a, get ton() { return ASPEKT_TON[a.name]; } }));

function aspektZwischen(a, b, orbis) {
  /* ((a-b+540) mod 360) - 180 bringt die Differenz nach (-180,180];
     der Betrag davon ist bereits der Winkelabstand 0..180. Ihn noch
     einmal von 180 abzuziehen ergäbe das Komplement und vertauschte
     Konjunktion mit Opposition und Sextil mit Trigon. */
  const abstand = Math.abs(((a - b + 540) % 360) - 180);
  for (const asp of ASPEKTE) {
    const ab = Math.abs(abstand - asp.winkel);
    if (ab <= orbis) return { ...asp, orbis: ab };
  }
  return null;
}

/* ----------------------------------------------------------- die Radix */
let zwischenspeicher = null;

export function radix() {
  const p = leseProfil();
  if (!p) return null;
  if (zwischenspeicher && zwischenspeicher.quelle === JSON.stringify(p)) return zwischenspeicher;

  const [j, m, t] = p.datum.split("-").map(Number);
  const [st, mi] = p.zeit.split(":").map(Number);
  let g;
  try { g = berechneGeburt(j, m, t, st, mi, p.utc, p.breite, p.laenge); } catch (e) { return null; }

  const ascZeichen = Math.floor(norm360(g.asc) / 30);
  const hausVon = laenge => ((Math.floor(norm360(laenge) / 30) - ascZeichen + 12) % 12) + 1;

  const planeten = {};
  REIHE.forEach(k => {
    const pos = g.planeten[k];
    if (!pos) return;
    const zeichen = Math.floor(norm360(pos.laenge) / 30);
    planeten[k] = {
      key: k, ...PLANET[k],
      laenge: norm360(pos.laenge),
      grad: norm360(pos.laenge) - zeichen * 30,
      zeichen, haus: hausVon(pos.laenge),
      wuerde: wuerde(k, zeichen)
    };
  });

  /* Aspekte untereinander */
  const aspekte = [];
  for (let i = 0; i < REIHE.length; i++) {
    for (let k = i + 1; k < REIHE.length; k++) {
      const a = planeten[REIHE[i]], b = planeten[REIHE[k]];
      if (!a || !b) continue;
      const orbis = (a.key === "sonne" || a.key === "mond" || b.key === "sonne" || b.key === "mond") ? 8 : 6;
      const asp = aspektZwischen(a.laenge, b.laenge, orbis);
      if (asp) aspekte.push({ a, b, ...asp });
    }
  }
  aspekte.sort((x, y) => x.orbis - y.orbis);

  const mcZeichen = Math.floor(norm360(g.mc) / 30);
  const herrscher = DOMIZIL[ascZeichen];

  zwischenspeicher = {
    quelle: JSON.stringify(p),
    geburt: g, profil: p,
    asc: norm360(g.asc), ascZeichen, ascGrad: norm360(g.asc) - ascZeichen * 30,
    mc: norm360(g.mc), mcZeichen,
    tagGeburt: g.tagGeburt, herrscher, planeten, aspekte, hausVon
  };
  return zwischenspeicher;
}

/* Zustand eines einzelnen Planeten — für die anderen Abschnitte. */
export function zustandVon(nameOderKey) {
  const r = radix();
  if (!r) return null;
  const key = REIHE.find(k => k === String(nameOderKey).toLowerCase() ||
                              PLANET[k].name.toLowerCase() === String(nameOderKey).toLowerCase());
  if (!key || !r.planeten[key]) return null;
  const pl = r.planeten[key];
  return {
    ...pl,
    zeichenName: ZEICHEN[pl.zeichen].name,
    zeichenGlyph: ZEICHEN[pl.zeichen].glyph,
    hausOrt: HAUS[pl.haus - 1],
    /* Als Getter, damit der Satz die Sprache zeigt, die beim Lesen gilt,
       und nicht die, die beim Rechnen galt. */
    get satz() {
      return `${pl.name} ${SATZ_WORT.steht} ${ZEICHEN[pl.zeichen].glyph} ` +
             `${ZEICHEN[pl.zeichen].name}, ${SATZ_WORT.haus(pl.haus)} ` +
             `(${pl.wuerde.stufe === "—" ? SATZ_WORT.ohneWuerde
                  : (SATZ_WORT.stufe[pl.wuerde.stufe] || pl.wuerde.stufe)})`;
    }
  };
}

/* ---------------------------------------------------------- die Transite */
export function transite() {
  const r = radix();
  if (!r) return null;
  const jetzt = new Date();
  const jd = julianischesDatum(jetzt.getFullYear(), jetzt.getMonth() + 1, jetzt.getDate(),
                               jetzt.getHours() + jetzt.getMinutes() / 60);
  const heute = planetenPositionen(jd);
  const treffer = [];
  /* Nur die langsamen Läufer — die schnellen sind in Tagen vorbei. */
  ["mars","jupiter","saturn"].forEach(tk => {
    const tp = heute[tk];
    if (!tp) return;
    REIHE.forEach(nk => {
      const np = r.planeten[nk];
      if (!np) return;
      const asp = aspektZwischen(norm360(tp.laenge), np.laenge, 2);
      if (asp) treffer.push({ transit: PLANET[tk], natal: np, ...asp });
    });
    /* und die Achsen */
    [["Aszendent", r.asc], ["MC", r.mc]].forEach(([nm, lon]) => {
      const asp = aspektZwischen(norm360(tp.laenge), lon, 2);
      if (asp) treffer.push({ transit: PLANET[tk], natal: { name: nm, achse: true }, ...asp });
    });
  });
  treffer.sort((a, b) => a.orbis - b.orbis);
  const stand = {};
  ["mars","jupiter","saturn"].forEach(k => {
    if (!heute[k]) return;
    const z = Math.floor(norm360(heute[k].laenge) / 30);
    stand[k] = { zeichen: z, haus: r.hausVon(heute[k].laenge), grad: norm360(heute[k].laenge) - z * 30 };
  });

  /* Alle sieben — die Profektion fragt, wer gerade durch das Haus des
     Jahres zieht, und da zählen auch die schnellen Läufer. */
  const alle = {};
  REIHE.forEach(k => {
    if (!heute[k]) return;
    const z = Math.floor(norm360(heute[k].laenge) / 30);
    alle[k] = { key: k, zeichen: z, haus: r.hausVon(heute[k].laenge),
                grad: norm360(heute[k].laenge) - z * 30, laenge: norm360(heute[k].laenge) };
  });

  return { treffer, stand, alle, jd };
}

/* ------------------------------------------------- sekundäre Progression
   Ein Tag nach der Geburt gilt für ein Lebensjahr. */
export function progression() {
  const r = radix();
  if (!r) return null;
  const p = r.profil;
  const [j, m, t] = p.datum.split("-").map(Number);
  const [st, mi] = p.zeit.split(":").map(Number);
  const geburt = new Date(j, m - 1, t);
  const alter = (Date.now() - geburt.getTime()) / (365.2425 * 864e5);

  const jdGeburt = julianischesDatum(j, m, t, st + mi / 60 - p.utc);
  const jdProg = jdGeburt + alter;                      // ein Tag je Jahr
  const pos = planetenPositionen(jdProg);

  const eps = schiefeDerEkliptik(jdProg);
  const gmst = siderischeZeitGreenwich(jdProg);
  const ramc = norm360(gmst + p.laenge);
  const pAsc = aszendent(ramc, p.breite, eps);

  const machen = k => {
    const z = Math.floor(norm360(pos[k].laenge) / 30);
    return { zeichen: z, grad: norm360(pos[k].laenge) - z * 30, haus: r.hausVon(pos[k].laenge) };
  };
  const sonne = machen("sonne"), mond = machen("mond");
  const phase = norm360(pos.mond.laenge - pos.sonne.laenge);
  return { alter, sonne, mond, phase, phaseText: PHASEN[Math.floor(phase / 45) % 8],
           asc: pAsc, ascZeichen: Math.floor(norm360(pAsc) / 30) };
}

/* ========================================================== Darstellung */

const SEKT_TEXT = {
  tag:  "Eine <b>Taggeburt</b>: Die Sonne stand über dem Horizont. Die Partei des Tages führt — " +
        "Sonne, Jupiter und Saturn wirken hier gefälliger, Mond, Venus und Mars fordernder.",
  nacht:"Eine <b>Nachtgeburt</b>: Die Sonne stand unter dem Horizont. Die Partei der Nacht führt — " +
        "Mond, Venus und Mars wirken hier gefälliger, Sonne, Jupiter und Saturn fordernder."
};

function planetSatz(pl) {
  /* Alle sieben "was"-Angaben sind Paare — der Satz steht im Plural.
     Die Würde wird nur genannt, wenn es eine gibt; sonst stünde bei fünf
     von sieben Planeten derselbe Satz. */
  const kern = `${pl.was.charAt(0).toUpperCase() + pl.was.slice(1)} zeigen sich ${ART[pl.zeichen]}, ` +
               `${HAUS[pl.haus - 1]}.`;
  return pl.wuerde.stufe === "—" ? kern : `${kern} Der Planet steht ${pl.wuerde.text}.`;
}

function zeichneRadix(ziel) {
  const r = radix();
  ziel.innerHTML = "";
  if (!r) {
    const w = el("p", "kucukNot", "Noch keine Geburtsangaben hinterlegt. ");
    const b = el("button", "knopfKlein", "Zur Dateneingabe");
    b.addEventListener("click", zurDateneingabe);
    w.appendChild(b);
    ziel.appendChild(w);
    ziel.hidden = false;
    return;
  }
  ziel.hidden = false;
  ziel.appendChild(el("p", "kucukNot", "Für: " + profilBeschriftung(r.profil)));

  /* Gerüst */
  const kopf = el("div", "essenzKopf");
  const herrsch = r.planeten[r.herrscher];
  kopf.append(
    el("div", "kalanBaslik", "Das Gerüst"),
    el("div", "buyukToplam",
      `${ZEICHEN[r.ascZeichen].glyph} ${ZEICHEN[r.ascZeichen].name} steigt auf`),
    el("div", "kucukNot",
      `Aszendent ${r.ascGrad.toFixed(1)}° · MC ${ZEICHEN[r.mcZeichen].glyph} ${ZEICHEN[r.mcZeichen].name}` +
      (herrsch ? ` · Herr des Horoskops: ${PLANET[r.herrscher].g} ${PLANET[r.herrscher].name}` : ""))
  );
  ziel.appendChild(kopf);

  const s = el("p");
  s.innerHTML = SEKT_TEXT[r.tagGeburt ? "tag" : "nacht"];
  ziel.appendChild(s);

  if (herrsch) {
    const h = el("p");
    h.innerHTML = `<b>Herr des Horoskops</b> ist ${mitArtikel(r.herrscher)}, Herrscher deines ` +
      `Aszendenten, und steht in ${ZEICHEN[herrsch.zeichen].glyph} ${ZEICHEN[herrsch.zeichen].name} ` +
      `im ${herrsch.haus}. Haus, ${herrsch.wuerde.text}. Wohin dein Leben zieht, zeigt zuerst dieser Planet: ` +
      `${HAUS[herrsch.haus - 1]}.`;
    ziel.appendChild(h);
  }

  /* Tafel */
  ziel.appendChild(el("h3", null, "Die sieben Planeten"));
  const kutu = el("div", "tabloKutu");
  const tab = el("table", "wuerdeTablo");
  tab.innerHTML = "<thead><tr><th>Planet</th><th>Zeichen</th><th>Haus</th><th>Würde</th></tr></thead>";
  const tb = el("tbody");
  REIHE.forEach(k => {
    const pl = r.planeten[k];
    if (!pl) return;
    const tr = el("tr");
    tr.appendChild(el("td", null, `${pl.g} ${pl.name}`));
    tr.appendChild(el("td", null, `${ZEICHEN[pl.zeichen].glyph} ${pl.grad.toFixed(1)}°`));
    tr.appendChild(el("td", null, `${pl.haus}.`));
    tr.appendChild(el("td", pl.wuerde.stufe !== "—" ? "treffer" : null, pl.wuerde.stufe));
    tb.appendChild(tr);
  });
  tab.appendChild(tb);
  kutu.appendChild(tab);
  ziel.appendChild(kutu);

  /* Deutung je Planet */
  ziel.appendChild(el("h3", null, "Was die Planeten sagen"));
  REIHE.forEach(k => {
    const pl = r.planeten[k];
    if (!pl) return;
    const blk = el("div", "planetBlock");
    const t = el("div", "planetKopf");
    t.innerHTML = `<span class="glyph">${pl.g}</span> <b>${pl.name}</b> in ` +
      `${ZEICHEN[pl.zeichen].glyph} ${ZEICHEN[pl.zeichen].name}, ${pl.haus}. Haus`;
    blk.append(t, el("p", null, planetSatz(pl)));
    ziel.appendChild(blk);
  });

  /* Aspekte */
  if (r.aspekte.length) {
    ziel.appendChild(el("h3", null, "Die engsten Aspekte"));
    ziel.appendChild(el("p", null,
      "Aspekte sind die Gespräche der Planeten untereinander. Je enger der Winkel, " +
      "desto lauter — die engsten stehen oben."));
    const ul = el("ul", "deutungListe");
    r.aspekte.slice(0, 6).forEach(a => {
      const li = el("li");
      li.innerHTML = `<b>${a.a.name} ${a.name} ${a.b.name}</b> (${a.orbis.toFixed(1)}°) — ` +
        `${a.a.was} und ${a.b.was} treten ${a.ton} auf.`;
      ul.appendChild(li);
    });
    ziel.appendChild(ul);
  }
}

function zeichneZeit(ziel) {
  const r = radix();
  ziel.innerHTML = "";
  if (!r) { ziel.hidden = true; return; }
  ziel.hidden = false;

  /* Transite */
  const tr = transite();
  ziel.appendChild(el("h3", null, "Transite — der Himmel gerade jetzt"));
  ziel.appendChild(el("p", null,
    "Wo die langsamen Planeten heute stehen und was sie in deinem Horoskop berühren. " +
    "Mars bleibt Wochen, Jupiter Monate, Saturn Jahre — deshalb zählen hier nur diese drei."));
  if (tr && Object.keys(tr.stand).length) {
    const ul0 = el("ul", "deutungListe");
    Object.entries(tr.stand).forEach(([k, st]) => {
      const li = el("li");
      li.innerHTML = `<b>${PLANET[k].g} ${PLANET[k].name}</b> läuft durch ` +
        `${ZEICHEN[st.zeichen].glyph} ${ZEICHEN[st.zeichen].name} — bei dir ` +
        `${HAUS[st.haus - 1]}.`;
      ul0.appendChild(li);
    });
    ziel.appendChild(ul0);
  }
  if (tr && tr.treffer.length) {
    ziel.appendChild(el("p", null, "Was davon dein Geburtshoroskop gerade berührt:"));
    const ul = el("ul", "deutungListe");
    tr.treffer.slice(0, 5).forEach(t => {
      const li = el("li");
      li.innerHTML = `<b>${t.transit.name} ${t.name} ${t.natal.name}</b> (${t.orbis.toFixed(1)}°) — ` +
        (t.natal.achse
          ? `die Achse selbst wird angesprochen, ${t.ton}.`
          : `${t.natal.was} — ${t.ton} angesprochen.`);
      ul.appendChild(li);
    });
    ziel.appendChild(ul);
  } else {
    ziel.appendChild(el("p", "kucukNot",
      "Zurzeit berührt keiner der drei dein Horoskop eng genug, um ihn zu nennen. " +
      "Eine ruhige Strecke."));
  }

  /* Progression */
  const pr = progression();
  if (pr) {
    ziel.appendChild(el("h3", null, "Sekundäre Progression — der innere Kalender"));
    ziel.appendChild(el("p", null,
      "Ein Tag nach der Geburt gilt für ein Lebensjahr. Die progressierte Sonne rückt " +
      "etwa ein Grad im Jahr und wechselt alle dreißig Jahre das Zeichen; der " +
      "progressierte Mond braucht rund achtundzwanzig Jahre für den ganzen Kreis. " +
      "Beide beschreiben keine Ereignisse, sondern das innere Wetter."));
    const ul = el("ul", "deutungListe");
    const l1 = el("li");
    l1.innerHTML = `<b>Progressierte Sonne</b> in ${ZEICHEN[pr.sonne.zeichen].glyph} ` +
      `${ZEICHEN[pr.sonne.zeichen].name} ${pr.sonne.grad.toFixed(1)}°, ${pr.sonne.haus}. Haus — ` +
      `worauf dein Wille in diesem Lebensabschnitt zielt: ${ART[pr.sonne.zeichen]}, ` +
      `${HAUS[pr.sonne.haus - 1]}.`;
    const l2 = el("li");
    l2.innerHTML = `<b>Progressierter Mond</b> in ${ZEICHEN[pr.mond.zeichen].glyph} ` +
      `${ZEICHEN[pr.mond.zeichen].name}, ${pr.mond.haus}. Haus — woran du dich zurzeit ` +
      `aufhältst: ${HAUS[pr.mond.haus - 1]}. Er bleibt gut zwei Jahre je Zeichen.`;
    const l3 = el("li");
    l3.innerHTML = `<b>Progressierte Mondphase</b>: ${pr.phaseText}.`;
    ul.append(l1, l2, l3);
    ziel.appendChild(ul);
  }
}

function zeichne() {
  const radixZiel = $("#hkCikti");
  const zeitZiel = $("#hkZeit");
  if (radixZiel) zeichneRadix(radixZiel);
  if (zeitZiel) zeichneZeit(zeitZiel);
}

$("#hkBerechnen")?.addEventListener("click", zeichne);
aufProfilAenderung(zeichne);
document.querySelector('nav#reiter button[data-bolum="bHoroskop"]')
  ?.addEventListener("click", () => setTimeout(zeichne, 0));
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", zeichne);
} else { zeichne(); }

/* ------------------------------------------------------- die Sprachschalter
   Planeten-, Zeichen- und Feldernamen stecken in fast jedem Satz. Sie
   werden hier beim Sprachwechsel ausgetauscht, nicht neu importiert —
   die Objekte bleiben dieselben, nur ihre Namensfelder wechseln. */
import { PLANET_NAME_IT, PLANET_ARTIKEL_IT, ZEICHEN_NAME_IT, HAUS_IT,
         PLANET_WAS_IT, ART_IT, WUERDE_TEXT_IT, ASPEKT_TON_IT, PHASEN_IT } from "./namen-it.js?v=268";
import { PLANET_NAME_EN, PLANET_ARTIKEL_EN, ZEICHEN_NAME_EN, HAUS_EN,
         PLANET_WAS_EN, ART_EN, WUERDE_TEXT_EN, ASPEKT_TON_EN, PHASEN_EN } from "./namen-en.js?v=268";
import { aktuelleSprache } from "./sprachen.js?v=268";

const PLANET_NAME_DE  = Object.fromEntries(REIHE.map(k => [k, PLANET[k].name]));
const PLANET_WAS_DE   = Object.fromEntries(REIHE.map(k => [k, PLANET[k].was]));
const ARTIKEL_DE      = { ...ARTIKEL };
const ZEICHEN_NAME_DE = ZEICHEN.map(z => z.name);
const HAUS_DE         = [...HAUS];

export function setzeNamenSprache(code) {
  /* Eine Tafel statt einer Weiche — eine weitere Sprache ist eine Zeile. */
  const NAMEN = {
    de: { planet: PLANET_NAME_DE, artikel: ARTIKEL_DE, zeichen: ZEICHEN_NAME_DE, haus: HAUS_DE,
          was: PLANET_WAS_DE, art: ART_DE, wuerde: WUERDE_TEXT_DE, ton: ASPEKT_TON_DE, phasen: PHASEN_DE , satzwort: SATZ_WORT_DE },
    it: { planet: PLANET_NAME_IT, artikel: PLANET_ARTIKEL_IT, zeichen: ZEICHEN_NAME_IT, haus: HAUS_IT,
          was: PLANET_WAS_IT, art: ART_IT, wuerde: WUERDE_TEXT_IT, ton: ASPEKT_TON_IT, phasen: PHASEN_IT , satzwort: SATZ_WORT_IT },
    en: { planet: PLANET_NAME_EN, artikel: PLANET_ARTIKEL_EN, zeichen: ZEICHEN_NAME_EN, haus: HAUS_EN,
          was: PLANET_WAS_EN, art: ART_EN, wuerde: WUERDE_TEXT_EN, ton: ASPEKT_TON_EN, phasen: PHASEN_EN , satzwort: SATZ_WORT_EN }
  };
  const n = NAMEN[code] || NAMEN.de;
  REIHE.forEach(k => { PLANET[k].name = n.planet[k]; PLANET[k].was = n.was[k]; });
  ART = n.art; WUERDE_TEXT = n.wuerde; ASPEKT_TON = n.ton; PHASEN = n.phasen;
  SATZ_WORT = n.satzwort;
  Object.keys(ARTIKEL).forEach(k => delete ARTIKEL[k]);
  Object.assign(ARTIKEL, n.artikel);
  ZEICHEN.forEach((z, i) => { z.name = n.zeichen[i]; });
  HAUS.forEach((_, i) => { HAUS[i] = n.haus[i]; });
  zwischenspeicher = null;          /* die Radix neu bilden lassen */
}

setzeNamenSprache(aktuelleSprache());
window.addEventListener("sprache-geaendert", e => setzeNamenSprache(e.detail));
