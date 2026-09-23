/* ------------------------------------------------------------------------
   ramel.js — ʿIlm al-Raml, die Sandkunst.

   Die arabische Punktierkunst: Man zieht mit dem Finger oder dem Stab
   Reihen von Punkten in den Sand, ohne sie zu zählen, und liest nur, ob
   ihre Zahl gerade oder ungerade war. Vier solche Reihen ergeben eine
   Figur, vier Figuren die "Mütter". Aus ihnen wächst nach festen Regeln
   ein ganzer Schild: Töchter, Nichten, zwei Zeugen und zuletzt der Richter,
   der die Frage beantwortet.

   Über Nordafrika kam das Verfahren als geomantia nach Europa; die
   sechzehn Figuren tragen dort lateinische Namen. Beide stehen hier.
   --------------------------------------------------------------------- */
const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

/* Die sechzehn Figuren. Die vier Reihen stehen für Feuer, Luft, Wasser,
   Erde; 1 heißt ein Punkt (ungerade), 2 heißt zwei Punkte (gerade).
   Die Paare sind Umkehrungen voneinander — Puer und Puella, Albus und
   Rubeus, Fortuna maior und minor, Acquisitio und Amissio, Laetitia und
   Tristitia, Caput und Cauda. Nur Via, Populus, Carcer und Coniunctio
   spiegeln sich selbst. */
export const FIGUREN = [
  { m:"1111", ar:"طريق", tr:"Ṭarīq", lat:"Via", de:"Der Weg",
    el:"Wasser", planet:"Mond", ja:"beweglich",
    text:"Alles ist in Bewegung, nichts steht. Für Reise, Wechsel und Aufbruch die beste Figur; für alles, was bleiben soll, die schlechteste.",
    frage:"Es wird sich ändern — die Frage ist nur, wohin." },
  { m:"2222", ar:"جماعة", tr:"Jamāʿa", lat:"Populus", de:"Die Versammlung",
    el:"Wasser", planet:"Mond", ja:"neutral",
    text:"Die Menge. Sie nimmt die Farbe dessen an, was um sie herum steht, und hat keine eigene. Allein sagt sie nichts; im Schild färbt sie sich von ihren Nachbarn.",
    frage:"Es hängt an den anderen, nicht an dir." },
  { m:"1112", ar:"حمرة", tr:"Ḥumra", lat:"Rubeus", de:"Das Rote",
    el:"Wasser", planet:"Mars", ja:"nein",
    text:"Leidenschaft, Blut, Täuschung. Eine der beiden unglücklichen Figuren: Was sie berührt, wird heiß und unklar. Gut allein für das, was Hitze braucht.",
    frage:"Nein — und es ist mehr im Spiel, als gesagt wird." },
  { m:"2111", ar:"بياض", tr:"Bayāḍ", lat:"Albus", de:"Das Weiße",
    el:"Wasser", planet:"Merkur", ja:"ja",
    text:"Klarheit, Frieden, ein kühler Kopf. Die Figur des guten Rats und des klaren Blicks; günstig für alles, was Einsicht verlangt, träge für alles, was Schwung braucht.",
    frage:"Ja, aber bedächtig." },
  { m:"1222", ar:"فرح", tr:"Faraḥ", lat:"Laetitia", de:"Die Freude",
    el:"Luft", planet:"Jupiter", ja:"ja",
    text:"Aufrichten, Gesundheit, gute Nachricht. Eine der günstigsten Figuren, nach oben gerichtet wie ein Bart, der in den Wind zeigt.",
    frage:"Ja, und es wird leichter, als du denkst." },
  { m:"2221", ar:"حزن", tr:"Ḥuzn", lat:"Tristitia", de:"Die Trauer",
    el:"Erde", planet:"Saturn", ja:"nein",
    text:"Niedergedrückt, langsam, tief. Nicht bösartig, aber schwer: Was hier steht, dauert und kostet. Für Gräber, Grundmauern und alles Tiefliegende dennoch günstig.",
    frage:"Nein, jedenfalls nicht bald." },
  { m:"2121", ar:"قبض الداخل", tr:"Qabḍ al-dākhil", lat:"Acquisitio", de:"Der Griff nach innen",
    el:"Luft", planet:"Jupiter", ja:"ja",
    text:"Die Hand, die etwas hereinholt. Gewinn, Erwerb, Empfangen — die beste Figur für alles, was man haben will.",
    frage:"Ja, du bekommst es." },
  { m:"1212", ar:"قبض الخارج", tr:"Qabḍ al-khārij", lat:"Amissio", de:"Der Griff nach außen",
    el:"Feuer", planet:"Venus", ja:"nein",
    text:"Die Hand, die etwas hergibt. Verlust — aber auch das Loslassen, das nötig war. Schlecht fürs Behalten, gut fürs Abgeben.",
    frage:"Nein — und das ist vielleicht gut so." },
  { m:"1122", ar:"نصرة الداخلة", tr:"Naṣra al-dākhila", lat:"Fortuna minor", de:"Der innere Sieg",
    el:"Feuer", planet:"Sonne", ja:"ja",
    text:"Hilfe von außen, schnell und vorübergehend. Es gelingt, aber nicht aus eigener Kraft und nicht auf Dauer. Gut für das Rasche, schlecht für das Bleibende.",
    frage:"Ja — schnell, aber es hält nicht von selbst." },
  { m:"2211", ar:"نصرة الخارجة", tr:"Naṣra al-khārija", lat:"Fortuna maior", de:"Der äußere Sieg",
    el:"Erde", planet:"Sonne", ja:"ja",
    text:"Gelingen aus eigener Kraft, langsam und haltbar. Die stärkste der günstigen Figuren; was unter ihr beginnt, steht noch, wenn anderes längst fort ist.",
    frage:"Ja, und es hält." },
  { m:"1221", ar:"عقلة", tr:"ʿUqla", lat:"Carcer", de:"Die Fessel",
    el:"Erde", planet:"Saturn", ja:"nein",
    text:"Gebunden, eingeschlossen, aufgehalten. Schlecht für alles, was sich bewegen soll — gut für alles, was gehalten und bewahrt werden muss.",
    frage:"Nein, noch nicht: etwas hält es fest." },
  { m:"2112", ar:"اجتماع", tr:"Ijtimāʿ", lat:"Coniunctio", de:"Die Begegnung",
    el:"Luft", planet:"Merkur", ja:"kommt darauf an",
    text:"Zusammenkommen, Verbindung, Wiederfinden. Sie ist weder gut noch schlecht, sondern verbindet, was sie berührt. Die Figur für Verlorenes und für Verträge.",
    frage:"Es kommt zusammen — ob dir das nützt, sagt die Figur nicht." },
  { m:"1121", ar:"لحيان", tr:"Liḥyān", lat:"Puer", de:"Der Bartlose",
    el:"Feuer", planet:"Mars", ja:"kommt darauf an",
    text:"Jung, rasch, unbedacht, mit dem Schwert in der Hand. Gut für Streit, Wettkampf und alles, was Mut verlangt; schlecht für alles, was Geduld braucht.",
    frage:"Ja, wenn du schnell und ohne Zögern handelst." },
  { m:"1211", ar:"نقي الخد", tr:"Naqī al-khadd", lat:"Puella", de:"Die Reinwangige",
    el:"Wasser", planet:"Venus", ja:"ja",
    text:"Anmut, Schönheit, Eintracht. Günstig in allem, was Liebe und Umgang betrifft; in Geschäften aber nachgiebig und leicht zu beeinflussen.",
    frage:"Ja, und es wird freundlich zugehen." },
  { m:"2122", ar:"عتبة الداخلة", tr:"ʿAtaba al-dākhila", lat:"Caput draconis", de:"Die innere Schwelle",
    el:"Erde", planet:"Mondknoten (aufsteigend)", ja:"ja",
    text:"Die Schwelle, über die man hereinkommt. Ein Anfang, eine Tür, ein Eintritt — sie verstärkt, was neben ihr steht, im Guten wie im Schlechten.",
    frage:"Ja — es beginnt etwas." },
  { m:"2212", ar:"عتبة الخارجة", tr:"ʿAtaba al-khārija", lat:"Cauda draconis", de:"Die äußere Schwelle",
    el:"Feuer", planet:"Mondknoten (absteigend)", ja:"nein",
    text:"Die Schwelle, über die man hinausgeht. Ein Ende, ein Abgang, ein Abschluss — gut für alles, was aufhören soll, schlecht für alles, was anfangen will.",
    frage:"Nein — es geht zu Ende." }
];

const nachMuster = m => FIGUREN.find(f => f.m === m);

/* ----------------------------------------------------------- der Schild */
/* Zwei Figuren "addieren": Reihe für Reihe, gerade plus gerade gibt gerade. */
function addiere(a, b) {
  let m = "";
  for (let i = 0; i < 4; i++) {
    const summe = Number(a.m[i]) + Number(b.m[i]);
    m += (summe % 2 === 0) ? "2" : "1";
  }
  return nachMuster(m);
}

/* Sechzehn Reihen Punkte — jede Reihe gibt ein gerade oder ungerade. */
function sandReihen() {
  const zahlen = [];
  const zufall = new Uint8Array(16);
  (self.crypto || window.crypto).getRandomValues(zufall);
  for (let i = 0; i < 16; i++) zahlen.push(9 + (zufall[i] % 8));   // 9 bis 16 Punkte
  return zahlen;
}

export function schlageSand() {
  const reihen = sandReihen();
  const muetter = [];
  for (let i = 0; i < 4; i++) {
    let m = "";
    for (let k = 0; k < 4; k++) m += (reihen[i * 4 + k] % 2 === 1) ? "1" : "2";
    muetter.push(nachMuster(m));
  }

  /* Töchter: die Reihen der Mütter von oben nach unten als Spalten gelesen. */
  const toechter = [];
  for (let k = 0; k < 4; k++) {
    let m = "";
    for (let i = 0; i < 4; i++) m += muetter[i].m[k];
    toechter.push(nachMuster(m));
  }

  const acht = [...muetter, ...toechter];
  const nichten = [
    addiere(acht[0], acht[1]), addiere(acht[2], acht[3]),
    addiere(acht[4], acht[5]), addiere(acht[6], acht[7])
  ];
  const zeugeRechts = addiere(nichten[0], nichten[1]);
  const zeugeLinks  = addiere(nichten[2], nichten[3]);
  const richter     = addiere(zeugeRechts, zeugeLinks);
  const versoehner  = addiere(richter, acht[0]);

  return { reihen, muetter, toechter, nichten, zeugeRechts, zeugeLinks, richter, versoehner,
           haeuser: acht.concat(nichten) };
}

/* Die zwölf Häuser, in die die ersten zwölf Figuren fallen. */
const HAUSNAME = [
  "Leib und Auftreten", "Besitz und Einkommen", "Wege, Geschwister, Nachrichten",
  "Haus, Herkunft, Eltern", "Kinder, Lust, Hervorbringen", "Arbeit, Dienst, Gesundheit",
  "Der Andere: Ehe, Verträge, Gegner", "Verlust, Erbe, Geliehenes",
  "Fremde, Lehre, Glaube", "Amt und Ruf", "Freunde, Bünde, Hoffnungen",
  "Verborgenes und das, was im Weg steht"
];

/* Welches Haus die Frage betrifft — grob an Schlagwörtern erkannt. */
const HAUSWORT = [
  ["ich","selbst","gesundheit","körper","aussehen","leben"],
  ["geld","besitz","gehalt","einkommen","kaufen","schulden","verdien"],
  ["geschwister","brief","nachricht","nachbar","kurz","lernen","schreib"],
  ["haus","wohnung","eltern","familie","herkunft","umzug","heimat","grundstück"],
  ["kind","schwanger","lust","spiel","kunst","schaffen","hobby"],
  ["arbeit","job","dienst","krank","kollege","alltag","angestellt"],
  ["ehe","partner","heirat","beziehung","vertrag","gegner","prozess","liebe"],
  ["erbe","tod","verlust","kredit","steuer","versicherung","geheimnis"],
  ["reise","ausland","studium","glaube","recht","fremde","lehre","universität"],
  ["beruf","karriere","chef","amt","ruf","ansehen","beförder","firma"],
  ["freund","gruppe","verein","hoffnung","wunsch","netzwerk","bund"],
  ["feind","angst","verborgen","heimlich","rückzug","krankenhaus","sucht"]
];
function hausFuer(frage) {
  const t = (frage || "").toLowerCase();
  for (let i = 0; i < 12; i++) if (HAUSWORT[i].some(w => t.includes(w))) return i + 1;
  return null;
}

/* ------------------------------------------------------------ Darstellung */
function figurSvg(f, gross) {
  const b = gross ? 54 : 36, r = gross ? 3.6 : 2.6, zeil = gross ? 13 : 9;
  const t = [`<svg class="ramlFigur" viewBox="0 0 ${b} ${zeil * 4 + 6}" width="${b}" aria-label="${f.lat}">`];
  for (let i = 0; i < 4; i++) {
    const y = 6 + i * zeil;
    if (f.m[i] === "1") {
      t.push(`<circle cx="${b / 2}" cy="${y}" r="${r}" fill="currentColor"/>`);
    } else {
      t.push(`<circle cx="${b / 2 - b / 5}" cy="${y}" r="${r}" fill="currentColor"/>`);
      t.push(`<circle cx="${b / 2 + b / 5}" cy="${y}" r="${r}" fill="currentColor"/>`);
    }
  }
  t.push("</svg>");
  return t.join("");
}

function figurKachel(f, rolle, gross) {
  const d = el("div", "ramlKachel" + (gross ? " gross" : ""));
  d.innerHTML = `<div class="ramlRolle">${rolle}</div>${figurSvg(f, gross)}` +
    `<div class="ramlName">${f.lat}</div><div class="ramlAr">${f.ar}</div>`;
  return d;
}

let letzterWurf = null;
let laeuft = null;

/* ------------------------------------------------------------ der Sand
   Erster Akt: Die sechzehn Reihen werden in den Sand geschlagen, eine nach
   der anderen. Nach je vier Reihen tritt die Figur hervor, die sie ergeben
   haben. Wer nicht warten will, überspringt. */
function inszeniere(w, cikti, danach) {
  const buehne = el("div", "ramlBuehne");
  const sand = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  sand.setAttribute("viewBox", "0 0 320 190");
  sand.setAttribute("class", "ramlSand");
  buehne.appendChild(sand);

  const figuren = el("div", "ramlWerden");
  buehne.appendChild(figuren);

  const ueber = el("button", "knopfKlein ramlUeberspringen", "Überspringen");
  buehne.appendChild(ueber);
  cikti.appendChild(buehne);

  const NS = "http://www.w3.org/2000/svg";

  /* Eine eigene Sandfläche: Das Bild dahinter wird je nach Breite anders
     beschnitten — die Punkte sollen trotzdem immer auf einer Fläche liegen. */
  const flaeche = document.createElementNS(NS, "rect");
  flaeche.setAttribute("x", 112); flaeche.setAttribute("y", 24);
  flaeche.setAttribute("width", 196); flaeche.setAttribute("height", 144);
  flaeche.setAttribute("rx", 3);
  flaeche.setAttribute("class", "sandFlaeche");
  sand.appendChild(flaeche);

  const punkt = (x, y) => {
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1));
    c.setAttribute("r", 2.3);
    c.setAttribute("class", "sandPunkt");
    sand.appendChild(c);
    return c;
  };

  let reihe = 0, spalte = 0, uhr = null;
  const sparsam = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fertig() {
    clearTimeout(uhr);
    laeuft = null;
    buehne.classList.add("still");
    ueber.remove();
    danach();
  }
  ueber.addEventListener("click", fertig);
  laeuft = fertig;

  if (sparsam) { fertig(); return; }

  function schritt() {
    if (reihe >= 16) { setTimeout(fertig, 550); return; }
    const anzahl = w.reihen[reihe];
    const y = 52 + (reihe % 4) * 30;
    if (spalte === 0) sand.dataset.gruppe = Math.floor(reihe / 4);
    const x = 128 + spalte * 11 + (Math.random() - 0.5) * 2.5;
    punkt(x, y + (Math.random() - 0.5) * 3.5);
    spalte++;

    if (spalte >= anzahl) {
      spalte = 0; reihe++;
      /* Vier Reihen voll: die Mutter tritt hervor. */
      if (reihe % 4 === 0) {
        const m = w.muetter[reihe / 4 - 1];
        const k = figurKachel(m, `${reihe / 4}. Mutter`);
        k.classList.add("kommtHervor");
        figuren.appendChild(k);
        uhr = setTimeout(() => { [...sand.querySelectorAll("circle")].forEach(c => c.remove()); schritt(); }, 430);
        return;
      }
      uhr = setTimeout(schritt, 95);
      return;
    }
    uhr = setTimeout(schritt, 23);
  }
  schritt();
}

function werfen() {
  const frage = $("#rmFrage").value.trim();
  const cikti = $("#rmCikti");
  if (laeuft) laeuft();
  cikti.hidden = false;
  cikti.innerHTML = "";

  if (!frage) {
    cikti.appendChild(el("p", "kucukNot", "Erst die Frage — ohne Absicht schweigt der Sand."));
    return;
  }

  const w = schlageSand();
  letzterWurf = w;
  inszeniere(w, cikti, () => zeigeErgebnis(w, frage, cikti));
}

function zeigeErgebnis(w, frage, cikti) {
  /* Der Richter zuerst: er ist die Antwort. */
  const kasten = el("div", "geistName");
  kasten.innerHTML =
    `<div class="kalanBaslik">Der Richter — قاضي</div>` +
    `<div class="ramlRichter">${figurSvg(w.richter, true)}</div>` +
    `<div class="buyukToplam">${w.richter.de}</div>` +
    `<div class="kucukNot">${w.richter.tr} · ${w.richter.lat} · ${w.richter.el} · ${w.richter.planet}</div>`;
  cikti.appendChild(kasten);

  cikti.appendChild(el("p", "ramlUrteil", w.richter.frage));
  cikti.appendChild(el("p", null, w.richter.text));

  /* Die Zeugen */
  cikti.appendChild(el("h3", null, "Die beiden Zeugen"));
  cikti.appendChild(el("p", null,
    "Der rechte Zeuge spricht über das, was war und was von dir ausgeht; der linke über " +
    "das, was kommt und was dir entgegentritt. Der Richter entsteht aus beiden."));
  const zeugen = el("div", "ramlReihe");
  zeugen.append(figurKachel(w.zeugeRechts, "Rechter Zeuge · was war", true),
                figurKachel(w.zeugeLinks, "Linker Zeuge · was kommt", true));
  cikti.appendChild(zeugen);
  const zl = el("ul", "deutungListe");
  const z1 = el("li"); z1.innerHTML = `<b>${w.zeugeRechts.de}</b> (${w.zeugeRechts.lat}) — ${w.zeugeRechts.text}`;
  const z2 = el("li"); z2.innerHTML = `<b>${w.zeugeLinks.de}</b> (${w.zeugeLinks.lat}) — ${w.zeugeLinks.text}`;
  zl.append(z1, z2);
  cikti.appendChild(zl);

  /* Der Schild */
  cikti.appendChild(el("h3", null, "Der Schild"));
  cikti.appendChild(el("p", null,
    "Sechzehn Reihen Punkte ergaben vier <b>Mütter</b>. Aus ihren Reihen, als Spalten " +
    "gelesen, wachsen die vier <b>Töchter</b>; je zwei benachbarte Figuren zusammengezählt " +
    "ergeben die <b>Nichten</b>, daraus die Zeugen, daraus der Richter."));
  const schild = el("div", "ramlSchild");
  w.muetter.forEach((f, i) => schild.appendChild(figurKachel(f, `${i + 1}. Mutter`)));
  w.toechter.forEach((f, i) => schild.appendChild(figurKachel(f, `${i + 1}. Tochter`)));
  w.nichten.forEach((f, i) => schild.appendChild(figurKachel(f, `${i + 1}. Nichte`)));
  cikti.appendChild(schild);

  /* Die zwölf Häuser */
  const haus = hausFuer(frage);
  cikti.appendChild(el("h3", null, "Die zwölf Häuser"));
  if (haus) {
    const f = w.haeuser[haus - 1];
    const p = el("p");
    p.innerHTML = `Deine Frage gehört ins <b>${haus}. Haus</b> — ${HAUSNAME[haus - 1]}. ` +
      `Dort steht <b>${f.de}</b> (${f.lat}): ${f.text}`;
    cikti.appendChild(p);
  } else {
    cikti.appendChild(el("p", "kucukNot",
      "Welches Haus deine Frage betrifft, konnte ich nicht erkennen — die Tafel unten " +
      "zeigt trotzdem, welche Figur in welchem Haus liegt."));
  }
  const kutu = el("div", "tabloKutu");
  const tab = el("table", "wuerdeTablo");
  tab.innerHTML = "<thead><tr><th>Haus</th><th>Worum es geht</th><th>Figur</th><th>Kurz</th></tr></thead>";
  const tb = el("tbody");
  for (let i = 0; i < 12; i++) {
    const f = w.haeuser[i];
    const tr = el("tr", haus === i + 1 ? "sieger" : null);
    tr.appendChild(el("td", null, `${i + 1}.`));
    tr.appendChild(el("td", null, HAUSNAME[i]));
    const td = el("td"); td.innerHTML = `${figurSvg(f)} ${f.de}`;
    tr.appendChild(td);
    tr.appendChild(el("td", null, f.ja));
    tb.appendChild(tr);
  }
  tab.appendChild(tb);
  kutu.appendChild(tab);
  cikti.appendChild(kutu);

  cikti.appendChild(el("p", "kucukNot",
    `Die sechzehn Reihen hatten ${w.reihen.join(", ")} Punkte. ` +
    "Gezählt wird nur gerade oder ungerade — deshalb ist es gleich, wie viele es genau waren. " +
    "Ein neuer Wurf gibt eine neue Antwort: Gefragt wird der Augenblick, nicht die Sache."));
}

$("#rmWerfen")?.addEventListener("click", werfen);
$("#rmFrage")?.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); werfen(); } });

/* Die Tafel der sechzehn Figuren zum Nachschlagen. */
(function tafel() {
  const ziel = $("#rmTafel");
  if (!ziel) return;
  FIGUREN.forEach(f => {
    const tr = el("tr");
    const td0 = el("td"); td0.innerHTML = figurSvg(f);
    tr.appendChild(td0);
    tr.appendChild(el("td", "arap", f.ar));
    tr.appendChild(el("td", null, f.tr));
    tr.appendChild(el("td", null, `${f.lat} · ${f.de}`));
    tr.appendChild(el("td", null, `${f.el}, ${f.planet}`));
    tr.appendChild(el("td", null, f.text));
    ziel.appendChild(tr);
  });
})();
