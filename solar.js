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
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=261";
import { berechneGeburt, planetenPositionen, julianischesDatum, sonnenLaenge,
         siderischeZeitGreenwich, schiefeDerEkliptik, aszendent, medium,
         norm360 } from "./astro.js?v=261";
import { radix, zustandVon, PLANET, REIHE, ZEICHEN, HAUS, mitArtikel } from "./horoskop.js?v=261";
import { firdaria } from "./perioden.js?v=261";
import { rt, zahl, aspektName, setzeRestSprache } from "./rest-texte.js?v=261";
import { aktuelleSprache } from "./sprachen.js?v=261";
setzeRestSprache(aktuelleSprache());

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const DOMIZIL = ["mars","venus","merkur","mond","sonne","merkur",
                 "venus","mars","jupiter","saturn","saturn","jupiter"];

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

/* Würdeworte und Monatsnamen stehen in der Sprachtafel. */
const wuerdeWort = stufe => rt("sr.wuerde." + stufe);
const monat = i => rt("sr.monate")[i];

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
    const w = el("p", "kucukNot", rt("keineAngaben"));
    const b = el("button", "knopfKlein", rt("zurEingabe"));
    b.addEventListener("click", zurDateneingabe);
    w.appendChild(b);
    ziel.append(w); ziel.hidden = false;
    return;
  }
  ziel.hidden = false;

  const z = u.zeitpunkt;
  const naechst = jdZuDatum(u.naechsteJd);
  ziel.appendChild(el("p", "kucukNot", rt("fuer") + profilBeschriftung(u.profil)));

  const kopf = el("div", "geistName");
  kopf.innerHTML =
    `<div class="kalanBaslik">${rt("sr.kopfTitel")}</div>` +
    `<div class="buyukToplam">${rt("sr.kopfDatum", z.tag, monat(z.monat - 1), z.jahr)}</div>` +
    `<div class="kucukNot">${rt("sr.kopfNot",
       `${String(z.stunde).padStart(2,"0")}:${String(z.minute).padStart(2,"0")}`,
       u.alter + 1, naechst.tag, monat(naechst.monat - 1), naechst.jahr)}</div>`;
  ziel.appendChild(kopf);

  /* --- 1. Das Geburtshoroskop --- */
  const r = u.radix;
  const hp = r.planeten[r.herrscher];
  ziel.appendChild(schritt(1, rt("sr.s1"),
    rt("sr.s1Text", ZEICHEN[r.ascZeichen].glyph, ZEICHEN[r.ascZeichen].name,
       ZEICHEN[r.mcZeichen].glyph, ZEICHEN[r.mcZeichen].name, mitArtikel(r.herrscher),
       hp ? rt("sr.s1Stand", ZEICHEN[hp.zeichen].glyph, ZEICHEN[hp.zeichen].name,
               hp.haus, wuerdeWort(hp.wuerde.stufe)) : ".")));

  /* --- 2. Die Sekte --- */
  ziel.appendChild(schritt(2, rt("sr.s2"), rt(u.sekte === "Tag" ? "sr.s2Tag" : "sr.s2Nacht")));

  /* --- 3. und 4. Zeichen und Herr des Jahres --- */
  ziel.appendChild(schritt(3, rt("sr.s3"),
    rt("sr.s3Text", rt("achse.asc"), u.alter, ZEICHEN[u.jahrZeichen].glyph,
       ZEICHEN[u.jahrZeichen].name, u.jahrHaus, HAUS[u.jahrHaus - 1])));

  const hj = u.herrBefund;
  ziel.appendChild(schritt(4, rt("sr.s4"),
    rt("sr.s4Text", PLANET[u.herrDesJahres].g, mitArtikel(u.herrDesJahres),
       hj ? rt("sr.s4Natal", ZEICHEN[hj.natal.zeichen].glyph, ZEICHEN[hj.natal.zeichen].name,
               hj.natal.haus, wuerdeWort(hj.natal.wuerde.stufe)) : "")));

  /* --- 5. Firdar und Teilhaber --- */
  const fd = u.firdar, tb = u.teilhaber;
  ziel.appendChild(schritt(5, rt("sr.s5"),
    (fd ? rt("sr.s5Firdar", mitArtikel(fd.key)) : rt("sr.s5Durch")) +
    (tb ? rt("sr.s5Teilhaber", mitArtikel(tb.key)) : ".") + rt("sr.s5Schluss")));

  /* --- 6. Winkelhaft zum Zeichen des Jahres? --- */
  const winkelZeile = (b, rolle) => b
    ? rt("sr.s6Zeile", rolle, b.name, b.vomJahrZeichen, b.winkelhaft)
    : rt("sr.nichtPruefbar", rolle);
  ziel.appendChild(schritt(6, rt("sr.s6"),
    [winkelZeile(fd, rt("sr.rolleFirdar")), winkelZeile(tb, rt("sr.rolleTeilhaber"))]));

  /* --- 7. Mit dem Herrn des Jahres verbunden? --- */
  const sichtZeile = (b, rolle) => {
    if (!b) return rt("sr.nichtPruefbar", rolle);
    if (b.key === u.herrDesJahres) return rt("sr.s7Ist", rolle, b.name);
    return rt("sr.s7Zeile", rolle, b.name, b.sichtZumHerrn ? aspektName(b.sichtZumHerrn) : null);
  };
  ziel.appendChild(schritt(7, rt("sr.s7"),
    [sichtZeile(fd, rt("sr.rolleFirdar")), sichtZeile(tb, rt("sr.rolleTeilhaber"))]));

  /* --- 8. Zustand in der Geburt --- */
  const natalZeile = b => b
    ? rt("sr.s8Zeile", b.g, b.name, ZEICHEN[b.natal.zeichen].glyph, ZEICHEN[b.natal.zeichen].name,
         b.natal.haus, HAUS[b.natal.haus - 1], wuerdeWort(b.natal.wuerde.stufe))
    : rt("sr.leer");
  ziel.appendChild(schritt(8, rt("sr.s8"), [natalZeile(fd), natalZeile(tb)]));

  /* --- 9. Zustand in der Umdrehung --- */
  const umZeile = b => (b && b.inUmdrehung)
    ? rt("sr.s9Zeile", b.g, b.name, ZEICHEN[b.inUmdrehung.zeichen].glyph,
         ZEICHEN[b.inUmdrehung.zeichen].name, zahl(b.inUmdrehung.grad),
         b.inUmdrehung.haus, HAUS[b.inUmdrehung.haus - 1])
    : rt("sr.leer");
  ziel.appendChild(schritt(9, rt("sr.s9"),
    [rt("sr.s9Asc", rt("achse.asc"), ZEICHEN[u.umAscZeichen].glyph, ZEICHEN[u.umAscZeichen].name,
        u.umAscImNatal, HAUS[u.umAscImNatal - 1]),
     umZeile(fd), umZeile(tb)]));

  /* --- 10. Die Deutung --- */
  const einig = [];
  if (fd && fd.winkelhaft) einig.push(rt("sr.einig.firdarWinkel"));
  if (tb && tb.winkelhaft) einig.push(rt("sr.einig.teilhaberWinkel"));
  if (fd && (fd.sichtZumHerrn || fd.key === u.herrDesJahres)) einig.push(rt("sr.einig.firdarSieht"));
  if (tb && (tb.sichtZumHerrn || tb.key === u.herrDesJahres)) einig.push(rt("sr.einig.teilhaberSieht"));

  const schluss = el("div", "schlussKasten");
  schluss.append(el("h3", null, rt("sr.deutung")));
  const s1 = el("p");
  s1.innerHTML = rt("sr.deutungSatz", ZEICHEN[u.jahrZeichen].glyph, ZEICHEN[u.jahrZeichen].name,
    u.jahrHaus, HAUS[u.jahrHaus - 1], mitArtikel(u.herrDesJahres),
    hj ? rt("sr.deutungNatal", HAUS[hj.natal.haus - 1]) : ".");
  schluss.appendChild(s1);

  const s2 = el("p");
  s2.innerHTML = einig.length >= 2 ? rt("sr.sprechend", einig.join(", "))
    : einig.length === 1 ? rt("sr.halblaut", einig[0])
    : rt("sr.still");
  schluss.appendChild(s2);

  schluss.appendChild(el("p", "schlussWort", rt("sr.schlusswort")));
  ziel.appendChild(schluss);
}

window.addEventListener("sprache-geaendert", ev => {
  setzeRestSprache(ev.detail);
  setTimeout(zeichne, 0);
});

$("#srBerechnen")?.addEventListener("click", zeichne);
aufProfilAenderung(zeichne);
document.querySelector('nav#reiter button[data-bolum="bSolar"]')
  ?.addEventListener("click", () => setTimeout(zeichne, 0));
if (document.readyState === "complete") zeichne();
else window.addEventListener("load", zeichne);
