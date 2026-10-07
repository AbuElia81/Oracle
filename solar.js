/* ------------------------------------------------------------------------
   solar.js — Die Jahresumdrehung (taḥwīl al-sana).

   Abū Maʿšar, "Über die Umdrehungen der Jahre der Geburten". Einmal im
   Jahr kehrt die Sonne genau auf den Grad zurück, auf dem sie bei der
   Geburt stand. Für diesen Augenblick wird ein Horoskop gestellt — das
   Horoskop des Jahres.

   Der Abschnitt geht die Befragung in der Reihenfolge durch, die die
   persische Schule vorgibt: erst das Geburtshoroskop, dann seine Sekte,
   dann das Zeichen des Jahres und sein Herr, dann Firdar und Teilhaber,
   dann deren Stellung zum Zeichen des Jahres und zum Herrn des Jahres,
   dann ihr Zustand in der Geburt und in der Umdrehung — und erst danach
   die Deutung.
   --------------------------------------------------------------------- */
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=246";
import { berechneGeburt, planetenPositionen, julianischesDatum, sonnenLaenge,
         siderischeZeitGreenwich, schiefeDerEkliptik, aszendent, medium,
         norm360 } from "./astro.js?v=246";
import { radix, zustandVon, PLANET, REIHE, ZEICHEN, HAUS, mitArtikel } from "./horoskop.js?v=246";
import { firdaria } from "./perioden.js?v=246";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const DOMIZIL = ["mars","venus","merkur","mond","sonne","merkur",
                 "venus","mars","jupiter","saturn","saturn","jupiter"];
const komma = n => n.toFixed(1).replace(".", ",");
const MONATE = ["Januar","Februar","März","April","Mai","Juni","Juli",
                "August","September","Oktober","November","Dezember"];

/* Julianisches Datum zurück in den Kalender (Meeus, Kap. 7). */
function jdZuDatum(jd) {
  const z = Math.floor(jd + 0.5), f = jd + 0.5 - z;
  let a = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const b = a + 1524, c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c), e = Math.floor((b - d) / 30.6001);
  const tagBruch = b - d - Math.floor(30.6001 * e) + f;
  const tag = Math.floor(tagBruch);
  const stundeDez = (tagBruch - tag) * 24;
  const monat = e < 14 ? e - 1 : e - 13;
  const jahr = monat > 2 ? c - 4716 : c - 4715;
  return { jahr, monat, tag, stunde: Math.floor(stundeDez),
           minute: Math.round((stundeDez - Math.floor(stundeDez)) * 60) };
}

/* Der Augenblick, in dem die Sonne auf ihren Geburtsgrad zurückkehrt. */
export function rueckkehr(natalSonne, zieljahr, geburtMonat, geburtTag) {
  let jd = julianischesDatum(zieljahr, geburtMonat, geburtTag, 12);
  for (let i = 0; i < 14; i++) {
    const abstand = ((sonnenLaenge(jd) - natalSonne + 540) % 360) - 180;
    jd -= abstand / 0.98563;            // die Sonne läuft rund 0,9856° am Tag
  }
  return jd;
}

/* Klassische Aspekte, nach Zeichen gezählt — so sieht die persische
   Schule die Verbindung: nicht nach Graden, sondern ob zwei Zeichen
   einander überhaupt erblicken. */
const SICHT = { 0:"Konjunktion", 2:"Sextil", 3:"Quadrat", 4:"Trigon", 6:"Opposition",
                8:"Trigon", 9:"Quadrat", 10:"Sextil" };
function konfiguriert(zeichenA, zeichenB) {
  const d = ((zeichenB - zeichenA) % 12 + 12) % 12;
  return SICHT[d] || null;       // 1, 5, 7, 11 Zeichen = Abwendung
}
const WINKEL = [0, 3, 6, 9];     // winkelhaft: 1., 4., 7., 10. Zeichen

export function jahresUmdrehung() {
  const r = radix();
  if (!r) return null;
  const p = r.profil;
  const [gj, gm, gt] = p.datum.split("-").map(Number);
  const natalSonne = norm360(r.planeten.sonne.laenge);

  /* Welche Umdrehung ist die laufende? Die letzte, die schon war. */
  const heute = new Date();
  let zieljahr = heute.getFullYear();
  let jd = rueckkehr(natalSonne, zieljahr, gm, gt);
  const jdHeute = julianischesDatum(heute.getFullYear(), heute.getMonth() + 1,
                                    heute.getDate(), heute.getHours());
  if (jd > jdHeute) { zieljahr -= 1; jd = rueckkehr(natalSonne, zieljahr, gm, gt); }
  const naechste = rueckkehr(natalSonne, zieljahr + 1, gm, gt);

  const k = jdZuDatum(jd);
  /* Das Horoskop der Umdrehung, gestellt für den Geburtsort. */
  const um = berechneGeburt(k.jahr, k.monat, k.tag, k.stunde, k.minute, 0, p.breite, p.laenge);

  const alter = Math.floor((new Date(k.jahr, k.monat - 1, k.tag) - new Date(gj, gm - 1, gt))
                           / (365.2425 * 864e5));
  const jahrZeichen = (r.ascZeichen + alter) % 12;        // Zeichen des Jahres
  const jahrHaus = (alter % 12) + 1;
  const herrDesJahres = DOMIZIL[jahrZeichen];

  const f = firdaria(alter + 0.5, r.tagGeburt);
  const firdar = f.laufend ? f.laufend.key : null;
  const teilhaber = f.laufendUnter ? f.laufendUnter.key : null;

  /* Stellung von Firdar und Teilhaber zum Zeichen des Jahres und zum
     Herrn des Jahres — jeweils im Geburtshoroskop gemessen. */
  function befund(key) {
    if (!key || !r.planeten[key]) return null;
    const pl = r.planeten[key];
    const vomJahr = ((pl.zeichen - jahrZeichen) % 12 + 12) % 12;
    const hp = r.planeten[herrDesJahres];
    return {
      key, name: PLANET[key].name, g: PLANET[key].g,
      natal: { zeichen: pl.zeichen, haus: pl.haus, wuerde: pl.wuerde },
      vomJahrZeichen: vomJahr + 1,
      winkelhaft: WINKEL.includes(vomJahr),
      sichtZumJahr: konfiguriert(jahrZeichen, pl.zeichen),
      sichtZumHerrn: hp ? konfiguriert(hp.zeichen, pl.zeichen) : null,
      inUmdrehung: (() => {
        const pos = um.planeten[key];
        if (!pos) return null;
        const z = Math.floor(norm360(pos.laenge) / 30);
        const ascZ = Math.floor(norm360(um.asc) / 30);
        return { zeichen: z, haus: ((z - ascZ + 12) % 12) + 1,
                 grad: norm360(pos.laenge) - z * 30 };
      })()
    };
  }

  const umAscZeichen = Math.floor(norm360(um.asc) / 30);
  return {
    profil: p, radix: r, alter, zieljahr,
    zeitpunkt: k, jd, naechsteJd: naechste,
    umdrehung: um, umAscZeichen,
    umAscImNatal: ((umAscZeichen - r.ascZeichen + 12) % 12) + 1,
    natalAscInUmdrehung: ((r.ascZeichen - umAscZeichen + 12) % 12) + 1,
    jahrZeichen, jahrHaus, herrDesJahres,
    herrBefund: befund(herrDesJahres),
    firdar: befund(firdar), teilhaber: befund(teilhaber),
    firdarKey: firdar, teilhaberKey: teilhaber,
    sekte: r.tagGeburt ? "Tag" : "Nacht"
  };
}

/* ========================================================== Darstellung */

const WUERDE_WORT = {
  "Domizil":"in eigenem Zeichen, stark",
  "Erhöhung":"erhöht, über sein Maß geachtet",
  "Exil":"im Exil, gegen den Strich arbeitend",
  "Fall":"im Fall, schwer zu seinem Recht kommend",
  "—":"ohne besondere Würde"
};

function schritt(nr, titel, inhalt) {
  const d = el("div", "srSchritt");
  d.append(el("div", "srNr", String(nr)));
  const k = el("div", "srInhalt");
  k.append(el("h3", null, titel));
  (Array.isArray(inhalt) ? inhalt : [inhalt]).forEach(x => {
    if (typeof x === "string") { const p = el("p"); p.innerHTML = x; k.appendChild(p); }
    else k.appendChild(x);
  });
  d.appendChild(k);
  return d;
}

function zeichne() {
  const ziel = $("#srCikti");
  if (!ziel) return;
  const u = jahresUmdrehung();
  ziel.innerHTML = "";

  if (!u) {
    const w = el("p", "kucukNot", "Noch keine Geburtsangaben hinterlegt. ");
    const b = el("button", "knopfKlein", "Zur Dateneingabe");
    b.addEventListener("click", zurDateneingabe);
    w.appendChild(b);
    ziel.append(w); ziel.hidden = false;
    return;
  }
  ziel.hidden = false;

  const z = u.zeitpunkt;
  const naechst = jdZuDatum(u.naechsteJd);
  ziel.appendChild(el("p", "kucukNot", "Für: " + profilBeschriftung(u.profil)));

  const kopf = el("div", "geistName");
  kopf.innerHTML =
    `<div class="kalanBaslik">Die Umdrehung dieses Jahres</div>` +
    `<div class="buyukToplam">${z.tag}. ${MONATE[z.monat - 1]} ${z.jahr}</div>` +
    `<div class="kucukNot">${String(z.stunde).padStart(2,"0")}:${String(z.minute).padStart(2,"0")} Weltzeit ` +
    `· dein ${u.alter + 1}. Lebensjahr · gültig bis ${naechst.tag}. ${MONATE[naechst.monat - 1]} ${naechst.jahr}</div>`;
  ziel.appendChild(kopf);

  /* --- 1. Das Geburtshoroskop --- */
  const r = u.radix;
  const hp = r.planeten[r.herrscher];
  ziel.appendChild(schritt(1, "Das Geburtshoroskop stellen",
    `${ZEICHEN[r.ascZeichen].glyph} ${ZEICHEN[r.ascZeichen].name} steigt auf, das MC in ` +
    `${ZEICHEN[r.mcZeichen].glyph} ${ZEICHEN[r.mcZeichen].name}. Herr des Horoskops ist ` +
    `${mitArtikel(r.herrscher)}` +
    (hp ? `, in ${ZEICHEN[hp.zeichen].glyph} ${ZEICHEN[hp.zeichen].name}, ${hp.haus}. Haus, ` +
          `${WUERDE_WORT[hp.wuerde.stufe]}.` : ".")));

  /* --- 2. Die Sekte --- */
  ziel.appendChild(schritt(2, "Die Sekte ansehen",
    u.sekte === "Tag"
      ? "Eine <b>Taggeburt</b>: Die Sonne stand über dem Horizont. Die Partei des Tages führt — " +
        "Sonne, Jupiter und Saturn gelten hier als die gefälligeren, Mond, Venus und Mars als die fordernderen."
      : "Eine <b>Nachtgeburt</b>: Die Sonne stand unter dem Horizont. Die Partei der Nacht führt — " +
        "Mond, Venus und Mars gelten hier als die gefälligeren, Sonne, Jupiter und Saturn als die fordernderen."));

  /* --- 3. und 4. Zeichen und Herr des Jahres --- */
  ziel.appendChild(schritt(3, "Das Zeichen des Jahres finden",
    `Der Aszendent ist seit der Geburt ${u.alter} Zeichen weitergerückt und steht im ` +
    `<b>${ZEICHEN[u.jahrZeichen].glyph} ${ZEICHEN[u.jahrZeichen].name}</b>. Damit ist dein ` +
    `<b>${u.jahrHaus}. Haus</b> das Haus des Jahres: ${HAUS[u.jahrHaus - 1]}.`));

  const hj = u.herrBefund;
  ziel.appendChild(schritt(4, "Den Herrn des Jahres bezeichnen",
    `Herrscher dieses Zeichens und damit <b>Herr des Jahres</b> ist ` +
    `${PLANET[u.herrDesJahres].g} ${mitArtikel(u.herrDesJahres)}.` +
    (hj ? ` Er steht in der Geburt in ${ZEICHEN[hj.natal.zeichen].glyph} ` +
          `${ZEICHEN[hj.natal.zeichen].name}, ${hj.natal.haus}. Haus, ` +
          `${WUERDE_WORT[hj.natal.wuerde.stufe]}.` : "")));

  /* --- 5. Firdar und Teilhaber --- */
  const fd = u.firdar, tb = u.teilhaber;
  ziel.appendChild(schritt(5, "Firdar und Teilhaber bestimmen",
    (fd ? `Die Firdaria gibt diese Jahre <b>${mitArtikel(fd.key)}</b>` : "Die Firdaria ist durchlaufen") +
    (tb ? `, und innerhalb davon führt gerade <b>${mitArtikel(tb.key)}</b> als Teilhaber.` : ".") +
    ` Der große Herr gibt das Thema, der Teilhaber den Ton.`));

  /* --- 6. Winkelhaft zum Zeichen des Jahres? --- */
  const winkelZeile = (b, rolle) => {
    if (!b) return `${rolle}: nicht zu prüfen.`;
    return `<b>${rolle} ${b.name}</b> steht im ${b.vomJahrZeichen}. Zeichen vom Zeichen des Jahres aus — ` +
      (b.winkelhaft
        ? `<span class="srJa">winkelhaft</span>. Das ist die starke Stellung: Was er bringt, kommt an.`
        : `<span class="srNein">nicht winkelhaft</span>. Er wirkt, aber mittelbar.`);
  };
  ziel.appendChild(schritt(6, "Stehen sie winkelhaft zum Zeichen des Jahres?",
    [winkelZeile(fd, "Der Firdar"), winkelZeile(tb, "Der Teilhaber")]));

  /* --- 7. Mit dem Herrn des Jahres verbunden? --- */
  const sichtZeile = (b, rolle) => {
    if (!b) return `${rolle}: nicht zu prüfen.`;
    if (b.key === u.herrDesJahres) return `<b>${rolle} ${b.name}</b> <em>ist</em> der Herr des Jahres — die stärkste Verbindung, die es gibt.`;
    return `<b>${rolle} ${b.name}</b> und der Herr des Jahres: ` +
      (b.sichtZumHerrn
        ? `<span class="srJa">${b.sichtZumHerrn}</span> — sie sehen einander, die Aussagen greifen ineinander.`
        : `<span class="srNein">in Abwendung</span> — sie sehen einander nicht; jeder spricht für sich.`);
  };
  ziel.appendChild(schritt(7, "Sind sie mit dem Herrn des Jahres verbunden?",
    [sichtZeile(fd, "Der Firdar"), sichtZeile(tb, "Der Teilhaber")]));

  /* --- 8. Zustand in der Geburt --- */
  const natalZeile = b => b
    ? `<b>${b.g} ${b.name}</b>: ${ZEICHEN[b.natal.zeichen].glyph} ${ZEICHEN[b.natal.zeichen].name}, ` +
      `${b.natal.haus}. Haus — ${HAUS[b.natal.haus - 1]}; ${WUERDE_WORT[b.natal.wuerde.stufe]}.`
    : "—";
  ziel.appendChild(schritt(8, "Ihren Zustand im Geburtshoroskop prüfen",
    [natalZeile(fd), natalZeile(tb)]));

  /* --- 9. Zustand in der Umdrehung --- */
  const umZeile = b => (b && b.inUmdrehung)
    ? `<b>${b.g} ${b.name}</b>: in der Umdrehung ${ZEICHEN[b.inUmdrehung.zeichen].glyph} ` +
      `${ZEICHEN[b.inUmdrehung.zeichen].name} ${komma(b.inUmdrehung.grad)}°, ` +
      `${b.inUmdrehung.haus}. Haus des Jahreshoroskops — ${HAUS[b.inUmdrehung.haus - 1]}.`
    : "—";
  ziel.appendChild(schritt(9, "Ihren Zustand in der Jahresumdrehung prüfen",
    [`Der Aszendent der Umdrehung steht in ${ZEICHEN[u.umAscZeichen].glyph} ` +
     `${ZEICHEN[u.umAscZeichen].name} — das fällt in dein <b>${u.umAscImNatal}. Geburtshaus</b>, ` +
     `${HAUS[u.umAscImNatal - 1]}. Dort liegt in diesem Jahr der Schwerpunkt.`,
     umZeile(fd), umZeile(tb)]));

  /* --- 10. Die Deutung --- */
  const einig = [];
  if (fd && fd.winkelhaft) einig.push("der Firdar steht winkelhaft");
  if (tb && tb.winkelhaft) einig.push("der Teilhaber steht winkelhaft");
  if (fd && (fd.sichtZumHerrn || fd.key === u.herrDesJahres)) einig.push("der Firdar sieht den Herrn des Jahres");
  if (tb && (tb.sichtZumHerrn || tb.key === u.herrDesJahres)) einig.push("der Teilhaber sieht ihn");

  const schluss = el("div", "schlussKasten");
  schluss.append(el("h3", null, "Und jetzt die Deutung"));
  const s1 = el("p");
  s1.innerHTML = `Das Jahr steht unter ${ZEICHEN[u.jahrZeichen].glyph} ` +
    `${ZEICHEN[u.jahrZeichen].name} und damit über deinem ${u.jahrHaus}. Haus: ` +
    `${HAUS[u.jahrHaus - 1]}. Sein Herr ist ${mitArtikel(u.herrDesJahres)}` +
    (hj ? `, der in der Geburt ${HAUS[hj.natal.haus - 1]} steht — dort wird das Thema ausgetragen.` : ".");
  schluss.appendChild(s1);

  const s2 = el("p");
  s2.innerHTML = einig.length >= 2
    ? `Die Zeichen stimmen überein: ${einig.join(", ")}. Wenn Firdar, Teilhaber und Herr des ` +
      `Jahres einander sehen und winkelhaft stehen, gilt das Jahr in dieser Schule als ` +
      `<b>sprechend</b> — was es bringt, kommt deutlich und ist zu erkennen.`
    : einig.length === 1
      ? `Nur eine Stütze: ${einig[0]}. Das Jahr spricht, aber halblaut — es braucht Aufmerksamkeit, ` +
        `um bemerkt zu werden.`
      : `Weder Firdar noch Teilhaber stehen winkelhaft zum Zeichen des Jahres, und keiner sieht ` +
        `den Herrn des Jahres. Abū Maʿšar liest das als ein <b>stilles Jahr</b>: Es geschieht ` +
        `etwas, aber unterhalb der Schwelle, und es zeigt sich erst später.`;
  schluss.appendChild(s2);

  schluss.appendChild(el("p", "schlussWort",
    "Die Reihenfolge ist die der persischen Schule: erst die Geburt, dann die Sekte, dann das " +
    "Zeichen des Jahres und sein Herr, dann Firdar und Teilhaber, dann deren Stellung — und " +
    "erst ganz zuletzt die Deutung. Wer sie umdreht und mit der Deutung anfängt, findet immer " +
    "etwas, aber nicht das, was dasteht."));
  ziel.appendChild(schluss);
}

$("#srBerechnen")?.addEventListener("click", zeichne);
aufProfilAenderung(zeichne);
document.querySelector('nav#reiter button[data-bolum="bSolar"]')
  ?.addEventListener("click", () => setTimeout(zeichne, 0));
if (document.readyState === "complete") zeichne();
else window.addEventListener("load", zeichne);
