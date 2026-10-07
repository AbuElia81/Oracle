/* ------------------------------------------------------------------------
   essenz.js — die Zusammenschau.

   Rechnet nichts Eigenes. Das Sternbild leitet sie aus den beiden Namen
   selbst her (das ist derselbe kurze Weg wie im Yıldıznâme-Abschnitt);
   alles Übrige liest sie aus dem, was die anderen Abschnitte bereits
   ausgegeben haben, und fügt es zu einem Text.
   --------------------------------------------------------------------- */
import { cevir, toplam, kalan } from "./ebced.js?v=229";
import { BURCLAR, UNSURLAR, GEZEGENLER, MENZILLER } from "./korpus.js?v=229";
import { leseProfilRoh, profilBeschriftung, zurDateneingabe, aufProfilAenderung } from "./profil.js?v=229";
import { JAHR, profektionJetzt } from "./jahr.js?v=229";
import { radix, transite, progression, zustandVon, ZEICHEN, PLANET, HAUS, mitArtikel } from "./horoskop.js?v=229";
import { mondHeute } from "./elektion.js?v=229";
import { firdariaJetzt, vimshottariJetzt } from "./perioden.js?v=229";
import { zrStand } from "./zr.js?v=229";
import { FIGUR, BILD, ORT, NAEHE, STAND, figurVon, bildDat } from "./sprache.js?v=229";
import { e, setzeEssenzSprache } from "./essenz-texte.js?v=229";
import { aktuelleSprache, t } from "./sprachen.js?v=229";
import { herkunftVon, hUi, setzeHerkunftSprache, HERKUNFT } from "./herkunft.js?v=229";
setzeEssenzSprache(aktuelleSprache());
window.addEventListener("sprache-geaendert", ev => { setzeEssenzSprache(ev.detail); setzeHerkunftSprache(ev.detail); });
setzeHerkunftSprache(aktuelleSprache());
import { jahresUmdrehung } from "./solar.js?v=229";
import { lebensmass } from "./lebensmass.js?v=229";
import { verteilungBei } from "./verteilung.js?v=229";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const gezegen = ad => GEZEGENLER.find(g => g.tr === ad);
const komma = n => n.toFixed(1).replace(".", ",");
const blank = t => String(t || "").replace(/[^A-Za-zÄÖÜäöüß]/g, "").trim();

/* Alter heute, in Jahren, aus dem hinterlegten Geburtsdatum. */
function alterHeute(p) {
  if (!p || !p.datum) return null;
  const [j, m, t] = p.datum.split("-").map(Number);
  const geburt = new Date(j, m - 1, t);
  return (Date.now() - geburt.getTime()) / (365.2425 * 864e5);
}

/* Sorgt dafür, dass ein Abschnitt gerechnet hat, ehe wir ihn auslesen. */
function anstossen(knopfWahl, ciktiWahl) {
  const cikti = $(ciktiWahl), knopf = $(knopfWahl);
  if (cikti && knopf && (cikti.hidden || !cikti.children.length)) knopf.click();
  return cikti;
}

/* --------------------------------------------------------- die Bausteine */

function sternbild(p) {
  if (!p || !p.name || !p.anne) return null;
  const summe = toplam(cevir(p.name)) + toplam(cevir(p.anne));
  if (!summe) return null;
  const burc = BURCLAR[kalan(summe, 12) - 1];
  return {
    summe, burc,
    unsur: UNSURLAR[burc.unsur - 1],
    herr: gezegen(burc.gezegen),
    stern: GEZEGENLER[kalan(summe, 7) - 1],
    menzil: MENZILLER[kalan(summe, 28) - 1],
    kadin: p.cinsiyet === "kadin"
  };
}

function geistname() {
  const c = anstossen("#gBerechnen", "#gCikti");
  const kasten = c && c.querySelector(".geistName .buyukToplam");
  if (!kasten) return null;
  const name = kasten.firstChild ? kasten.firstChild.textContent.trim() : "";
  const herkunft = c.querySelector(".geistName .kucukNot");
  return name ? { name, herkunft: herkunft ? herkunft.textContent.trim() : "" } : null;
}

/* Zodiacal Releasing: die Zeile, in deren Spanne das heutige Alter fällt. */
function zeitalter(alter) {
  const c = anstossen("#zrBerechnen", "#zrCikti");
  if (alter == null) return null;

  /* Der kurze Weg: zr.js gibt seine Rechnung heraus, samt dritter Ebene,
     die in der Tafel gar nicht steht. Nur wenn das fehlschlägt, wird die
     Tafel gelesen. */
  try {
    const st = zrStand(alter);
    if (st && st.L1) {
      const um = x => x && { zeichen: x.glyph + " " + x.zeichen, herrscher: x.herrscher,
                             von: x.von, bis: x.bis, hoehepunkt: x.hoehepunkt, loesung: x.loesung };
      return { L1: um(st.L1), L2: um(st.L2), L3: um(st.L3), fortunaZeichen: st.fortunaZeichen };
    }
  } catch (e) {}

  if (!c) return null;
  const treffer = {};
  c.querySelectorAll("tbody tr").forEach(tr => {
    const z = [...tr.cells].map(td => td.innerText.trim());
    if (z.length < 5) return;
    const stufe = z[0], von = parseFloat(z[3]), bis = parseFloat(z[4]);
    if (isNaN(von) || isNaN(bis) || alter < von || alter >= bis) return;
    if (!treffer[stufe]) treffer[stufe] = { zeichen: z[1], herrscher: z[2], von, bis };
  });
  return treffer.L1 ? treffer : null;
}

/* Lebensbogen: die nächste Direktion, die nach heute fällig wird. */
function naechsteDirektion(alter) {
  const c = anstossen("#lbBerechnen", "#lbCikti");
  if (!c || alter == null) return null;
  let beste = null;
  c.querySelectorAll("tbody tr").forEach(tr => {
    const z = [...tr.cells].map(td => td.innerText.trim());
    if (z.length < 4) return;
    const a = parseFloat(z[0]);
    if (isNaN(a) || a < alter) return;
    if (!beste || a < beste.alter) beste = { alter: a, promissor: z[1], aspekt: z[2], signifikator: z[3] };
  });
  return beste;
}

/* Die Gipfel und Bandlösungen, die der ZR-Abschnitt schon aufgelistet hat. */
function zrGipfel() {
  const c = anstossen("#zrBerechnen", "#zrCikti");
  if (!c || c.hidden) return null;
  const hole = titel => {
    const h = [...c.querySelectorAll("h3")].find(x => x.innerText.includes(titel));
    if (!h) return [];
    let n = h.nextElementSibling;
    while (n && n.tagName !== "UL") n = n.nextElementSibling;
    return n ? [...n.querySelectorAll("li")].map(li => li.innerText.replace(/\s+/g, " ").trim()) : [];
  };
  return { gipfel: hole("Höhepunkte"), loesungen: hole("Lösung des Bandes") };
}

/* Profektionen: das Jahreshaus und sein Herr — die Jahrestechnik schlechthin. */
function profektion() {
  anstossen("#pfBerechnen", "#pfCikti");      // Tafel im Abschnitt füllen
  const pr = profektionJetzt();               // gerechnet, nicht abgelesen
  if (!pr) return null;
  return { text: `dein ${pr.haus}. Haus in ${pr.glyph} ${pr.name}, Herr des Jahres ${pr.herr}; ` +
                 `Thema: ${pr.thema}` };
}

/* Antiszien: die verborgenen Verbindungen des Horoskops. */
function antiszien() {
  const c = anstossen("#azHoroskopBerechnen", "#azHoroskopCikti");
  if (!c || c.hidden) return null;
  const funde = [...c.querySelectorAll(".naheDranItem")].map(x => x.innerText.trim());
  return { funde };
}

/* Die Jahreskästen der einzelnen Abschnitte — jahr.js hat sie schon
   gefüllt; hier wird nur das Wichtigste daraus übernommen. */
function jahresPunkte() {
  const quellen = [
    ["#yildizJahr", "Yıldıznâme"],
    ["#lbJahr",     "Lebensbogen"],
    ["#zrJahr",     "Zodiacal Releasing"],
    ["#azJahr",     "Antiszien"]
  ];
  return quellen.map(([wahl, titel]) => {
    const k = document.querySelector(wahl);
    if (!k || k.hidden || !k.children.length) return null;
    const saetze = [...k.querySelectorAll("p")]
      .filter(x => !x.classList.contains("kucukNot"))
      .map(x => x.textContent.trim());
    const punkte = [...k.querySelectorAll(".deutungListe li")].map(x => x.textContent.trim());
    if (!saetze.length && !punkte.length) return null;
    return { titel, kern: saetze[0] || "", punkte: punkte.slice(0, 3) };
  }).filter(Boolean);
}

/* ------------------------------------------------------- die Zusammenschau
   Die einzelnen Techniken nennen jede einen Herrn der Zeit. Interessant
   wird es, wo mehrere denselben nennen — Systeme, die einander nie gelesen
   haben. Das ist keine Deutung aus der Luft, sondern eine Zählung. */

const PLANET_NAME = {
  sonne:"Sonne", mond:"Mond", merkur:"Merkur", venus:"Venus",
  mars:"Mars", jupiter:"Jupiter", saturn:"Saturn"
};
const ZAHLWORT = { 1:"eine", 2:"zwei", 3:"drei", 4:"vier" };
const NAME_ZU_KEY = Object.fromEntries(Object.entries(PLANET_NAME).map(([k, v]) => [v, k]));

function herrenDerZeit({ zr, prof, fd, vd }) {
  const stimmen = [];
  /* Aus der ZR-Tafel kommt der Herrscher als "♄ Saturn" — Glyphe weg. */
  const blank = t => String(t || "").replace(/[^A-Za-zÄÖÜäöüß]/g, "").trim();
  const zrHerr = zr && zr.L1 ? blank(zr.L1.herrscher) : "";
  if (NAME_ZU_KEY[zrHerr])
    stimmen.push({ key: NAME_ZU_KEY[zrHerr], quelle: e("quelle.zr") });
  const profHerr = prof ? blank(prof.herr) : "";
  if (NAME_ZU_KEY[profHerr])
    stimmen.push({ key: NAME_ZU_KEY[profHerr], quelle: e("quelle.prof") });
  if (fd && fd.laufend && PLANET_NAME[fd.laufend.key])
    stimmen.push({ key: fd.laufend.key, quelle: e("quelle.fd") });
  if (vd && vd.laufend && PLANET_NAME[vd.laufend.key])
    stimmen.push({ key: vd.laufend.key, quelle: e("quelle.vd") });

  const zaehlung = {};
  stimmen.forEach(st => {
    zaehlung[st.key] = zaehlung[st.key] || { key: st.key, quellen: [] };
    zaehlung[st.key].quellen.push(st.quelle);
  });
  const sortiert = Object.values(zaehlung).sort((a, b) => b.quellen.length - a.quellen.length);
  return { stimmen, sortiert, anzahl: stimmen.length };
}

function undListe(teile) {
  if (teile.length <= 1) return teile[0] || "";
  return teile.slice(0, -1).join(", ") + " " + e("und") + " " + teile[teile.length - 1];
}

/* ------------------------------------------------------------- der Text */

let kapitelZaehler = 0;
/* Welcher Herkunftseintrag zu einem Absatz gehört, wird über seinen
   Titel gefunden: Die Titel kommen alle aus derselben Tafel, und so
   braucht kein einziger Aufruf ein zusätzliches Argument. */
function schluesselVonTitel(titel) {
  for (const k of Object.keys(HERKUNFT.de)) if (e(k) === titel) return k;
  return null;
}

/* Jeder Absatz bekommt unten eine Zeile, die sich aufklappen lässt: wie
   die Technik heißt, woher sie stammt, wie gerechnet wird. Zugeklappt
   sind das drei Worte — die Lesung bleibt eine Lesung, und die Tiefe ist
   trotzdem einen Klick entfernt. */
function herkunftZeile(schluessel) {
  const h = herkunftVon(schluessel);
  if (!h) return null;
  const d = el("details", "herkunft");
  d.appendChild(el("summary", null, hUi("auf")));
  const k = el("div", "herkunftInhalt");
  k.appendChild(el("div", "herkunftTechnik", h.technik));
  const q = el("p", "herkunftZeile");
  q.innerHTML = `<span class="herkunftSchild">${hUi("quelle")}</span> ${h.quelle}`;
  k.appendChild(q);
  const w = el("p", "herkunftZeile");
  w.innerHTML = `<span class="herkunftSchild">${hUi("wie")}</span> ${h.wie}`;
  k.appendChild(w);
  if (h.abschnitt) {
    const b = el("button", "herkunftKnopf", hUi("mehr"));
    b.addEventListener("click", () => {
      const r = document.querySelector(`nav#reiter button[data-bolum="${h.abschnitt}"]`);
      if (r) { r.click(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    });
    k.appendChild(b);
  }
  d.appendChild(k);
  return d;
}

function absatz(titel, text) {
  const f = document.createDocumentFragment();
  const h = el("h3", null, titel);
  const t = el("p", kapitelZaehler === 0 ? "erstesWort" : null, text);
  kapitelZaehler++;
  f.append(h, t);
  const hz = herkunftZeile(schluesselVonTitel(titel));
  if (hz) f.append(hz);
  return f;
}

function schreibe(zielWahl) {
  const cikti = $(typeof zielWahl === "string" ? zielWahl : "#eCikti");
  if (!cikti) return;
  const p = leseProfilRoh();
  cikti.hidden = false;
  cikti.innerHTML = "";
  kapitelZaehler = 0;

  if (!p) {
    const w = el("p", "kucukNot", "Noch nichts hinterlegt. ");
    const b = el("button", "knopfKlein", "Zur Dateneingabe");
    b.addEventListener("click", zurDateneingabe);
    w.appendChild(b);
    cikti.appendChild(w);
    return;
  }

  const sb = sternbild(p);
  const alter = alterHeute(p);
  const geist = geistname();
  const zr = alter != null ? zeitalter(alter) : null;
  const dir = alter != null ? naechsteDirektion(alter) : null;
  const anti = antiszien();
  const r = radix();
  const tr = transite();
  const prg = progression();
  const zrg = zrGipfel();
  let fd = null, vd = null, sr = null, lm = null;
  try { sr = jahresUmdrehung(); } catch (e) {}
  try { lm = lebensmass(); } catch (e) {}
  let vt = null;
  try { vt = alter != null ? verteilungBei(alter) : null; } catch (e) {}
  try { fd = firdariaJetzt(); } catch (e) {}
  try { vd = vimshottariJetzt(); } catch (e) {}
  let mond = null;
  try { mond = mondHeute(); } catch (e) { mond = null; }
  const prof = profektion();

  /* Eine Eröffnung, ehe die Kapitel anfangen: Sie sagt, was hier gelesen
     wird, und gibt dem Ganzen einen Anfang statt eines Beginns. */
  const auftakt = el("div", "essenzAuftakt");
  auftakt.appendChild(el("p", "auftaktZeile", e("auftakt.zeile", p.name)));
  auftakt.appendChild(el("p", "auftaktText", e("auftakt.text")));
  auftakt.appendChild(el("p", "auftaktDaten",
    profilBeschriftung(p).replace(" Uhr", e("daten.uhr") ? " " + e("daten.uhr") : "") +
    (alter != null ? e("daten.alter", alter.toFixed(0)) : "")));
  cikti.appendChild(auftakt);

  if (r) {
    const h = r.planeten[r.herrscher];
    const fh = figurVon(r.herrscher);
    cikti.appendChild(absatz(e("titel.anfang"),
      e("anfang", BILD[r.ascZeichen], r.tagGeburt, h ? fh : null,
        h ? ORT[h.haus - 1] : "", h ? (STAND[h.wuerde.stufe] || STAND["—"]) : "")));

    if (r.aspekte.length) {
      const a = r.aspekte[0];
      const fa = figurVon(a.a.key), fb = figurVon(a.b.key);
      cikti.appendChild(absatz(e("titel.zwei"),
        e("zwei", fa, fb, NAEHE[a.name] || NAEHE["Konjunktion"])));
    }
  }

  if (sb) {
    const kopf = el("div", "essenzKopf");
    kopf.append(
      el("div", "kalanBaslik", e("kopf.zeichen")),
      el("div", "buyukToplam", `${sb.burc.tr} — ${sb.burc.de}`),
      el("div", "kucukNot",
        e("kopf.element", sb.unsur.de, sb.unsur.tabiat))
    );
    cikti.appendChild(kopf);

    cikti.appendChild(absatz(e("titel.werDuBist"),
      e("werDuBist", sb.burc.tabiat, sb.kadin ? sb.burc.kadin : sb.burc.erkek,
        e(sb.unsur.de === "Feuer" ? "element.feuer" : sb.unsur.de === "Erde" ? "element.erde"
          : sb.unsur.de === "Luft" ? "element.luft" : "element.wasser"),
        sb.unsur.metin)));

    if (sb.menzil) {
      cikti.appendChild(absatz(e("titel.herberge"),
        e("herberge", sb.menzil.no, sb.menzil.tr, sb.menzil.hukum,
          sb.menzil.iyi.toLowerCase(), sb.menzil.kacin.toLowerCase())));
    }

    const fHerr = figurVon((sb.herr.de || "").toLowerCase());
    cikti.appendChild(absatz(e("titel.gegeben"), e("gegeben", fHerr)));
  }

  if (geist) {
    const kasten = el("div", "essenzKopf");
    kasten.append(
      el("div", "kalanBaslik", "Dein Spirit Name"),
      el("div", "buyukToplam", geist.name),
      geist.herkunft ? el("div", "kucukNot", geist.herkunft) : el("span")
    );
    cikti.appendChild(kasten);
    cikti.appendChild(absatz(e("titel.geist"), e("geist", geist.name)));
  }

  if (zr) {
    const l1 = zr.L1, l2 = zr.L2, l3 = zr.L3;
    const bildVon = txt => {
      const i = ZEICHEN.findIndex(z => txt && txt.includes(z.name));
      return i >= 0 ? BILD[i] : "ein eigenes Bild";
    };
    cikti.appendChild(absatz(e("titel.kapitel"),
      e("kapitel", l1.von.toFixed(0), l1.bis.toFixed(0), bildVon(l1.zeichen),
        figurVon(NAME_ZU_KEY[blank(l1.herrscher)] || "").dat || l1.herrscher,
        l2 ? komma(l2.von) : null, l2 ? komma(l2.bis) : null,
        l2 ? bildVon(l2.zeichen) : null, l3 ? bildVon(l3.zeichen) : null)));
  }

  if (zrg && alter != null) {
    const laufend = zrg.gipfel.find(g => {
      const m = g.match(/([\d.]+)\s*–\s*([\d.]+)/);
      return m && alter >= parseFloat(m[1]) && alter < parseFloat(m[2]);
    });
    const kommend = zrg.gipfel.find(g => {
      const m = g.match(/([\d.]+)/);
      return m && parseFloat(m[1]) > alter;
    });
    if (laufend || kommend || zrg.loesungen.length) {
      const naechsteLoesung = zrg.loesungen.map(l => {
        const m = l.match(/([\d.]+)\s*Jahren/);
        return m ? { jahr: parseFloat(m[1]), text: l } : null;
      }).filter(Boolean).filter(x => x.jahr > alter).sort((a, b) => a.jahr - b.jahr)[0];

      /* Der Riss im Faden ist die nächste Lösung des Bandes — vorher hieß
         die Variable hier bond und gab es nicht; die Essenz brach an dieser
         Stelle ab und zeigte nur die ersten sieben Abschnitte. */
      cikti.appendChild(absatz(e("titel.strecken"),
        e("strecken", !!laufend,
          kommend ? kommend.match(/([\d.]+)/)[1].replace(".", ",") : null,
          naechsteLoesung ? String(naechsteLoesung.jahr).replace(".", ",") : null)));
    }
  }

  if ((fd && fd.laufend) || (vd && vd.laufend)) {
    const nenn = k => figurVon(k).figur;
    const teile = [];
    if (fd && fd.laufend) {
      teile.push(e("jahre.persisch", figurVon(fd.laufend.key).dat,
        fd.laufendUnter && fd.laufendUnter.key !== fd.laufend.key
          ? figurVon(fd.laufendUnter.key).figur : null));
    }
    if (vd && vd.laufend) {
      teile.push(e("jahre.indisch", figurVon(vd.laufend.key).akk,
        vd.laufendUnter ? figurVon(vd.laufendUnter.key).akk : null));
    }
    const pp = el("p");
    pp.innerHTML = teile.join(". ") + e("jahre.schluss");
    cikti.appendChild(el("h3", null, e("titel.jahreFuehrt")));
    cikti.appendChild(pp);
    const hzj = herkunftZeile("titel.jahreFuehrt");
    if (hzj) cikti.appendChild(hzj);
  }

  if (dir) {
    const jahre = dir.alter - alter;
    const wann = jahre < 1
      ? `in ${Math.max(1, Math.round(jahre * 12))} Monaten`
      : `in gut ${jahre.toFixed(0)} Jahren`;
    const schl = { "Mars":"der Schmied", "Sonne":"der König", "Mond":"die Wandernde",
                   "Merkur":"der Bote", "Venus":"die Gärtnerin", "Jupiter":"der Gastgeber",
                   "Saturn":"der Alte", "MC":"die Achse deines Amtes", "ASC":"die Achse deiner Person" };
    const rein = String(dir.promissor || "").replace(/[^A-Za-zÄÖÜäöüß ]/g, "").trim().split(/\s+/)[0];
    const wer = schl[rein] || rein || dir.promissor;
    const wo = { "MC":"an deinem Ruf", "IC":"an deinem Haus und deiner Herkunft",
                 "Aszendent":"an dir selbst", "ASC":"an dir selbst",
                 "Deszendent":"an deiner Ehe und deinen Verträgen", "DESC":"an deiner Ehe und deinen Verträgen"
               }[dir.signifikator] || `an ${dir.signifikator}`;
    if (vt && vt.laufend) {
    const fv = figurVon(vt.laufend.herr);
    const ft = vt.laufend.teilhaber ? figurVon(vt.laufend.teilhaber.key) : null;
    cikti.appendChild(absatz(e("titel.austeilt"),
      e("austeilt", vt.laufend.vonJahr.toFixed(0), vt.laufend.bisJahr.toFixed(0), fv, ft,
        vt.naechster ? vt.naechster.vonJahr.toFixed(0) : null,
        vt.naechster ? figurVon(vt.naechster.herr).akk : null)));
  }

  cikti.appendChild(absatz(e("titel.klopft"), e("klopft", wann, komma(dir.alter), wer, wo)));
  }

  if (anti) {
    if (anti.funde.length) {
      const namen = anti.funde.map(f => {
        const n = [...new Set((f.match(/(Sonne|Mond|Merkur|Venus|Mars|Jupiter|Saturn|Aszendent|ASC|MC)/g) || []))];
        return n.slice(0, 2).join(" und ");
      }).filter(Boolean);
      cikti.appendChild(absatz(e("titel.verborgen"), e("verborgen.ja", namen)));
    } else {
      cikti.appendChild(absatz(e("titel.verborgen"), e("verborgen.nein")));
    }
  }

  /* Die Jahreskästen der anderen Abschnitte entstehen erst, wenn deren
     Rechner fertig sind. Deshalb wird dieser Block nachgezogen, bis alles
     da ist — er ersetzt sich dabei selbst. */
  const jahrFach = el("div", "jahrFach");
  cikti.appendChild(jahrFach);

  function zeichneJahr() {
    const pf = profektionJetzt();
    jahrFach.innerHTML = "";
    if (!pf && !sr && !mond && !tr && !prg) return 0;

    jahrFach.appendChild(el("h3", null, e("titel.jahr", JAHR)));

    if (pf) {
      const fh = figurVon(pf.herr.toLowerCase());
      const p1 = el("p");
      p1.innerHTML = e("jahr.zeiger", ORT[pf.haus - 1], fh);
      jahrFach.appendChild(p1);
    }

    if (sr) {
      const zp = sr.zeitpunkt;
      const stuetzen = (sr.firdar && sr.firdar.winkelhaft ? 1 : 0) +
                       (sr.firdar && (sr.firdar.sichtZumHerrn || sr.firdar.key === sr.herrDesJahres) ? 1 : 0) +
                       (sr.teilhaber && (sr.teilhaber.sichtZumHerrn || sr.teilhaber.key === sr.herrDesJahres) ? 1 : 0);
      const p2 = el("p");
      p2.innerHTML = e("jahr.sonne", zp.tag, e("monate")[zp.monat - 1], zp.jahr,
        ORT[sr.umAscImNatal - 1], stuetzen);
      jahrFach.appendChild(p2);
    }

    if (tr && tr.treffer.length) {
      const t = tr.treffer[0];
      const ft = figurVon((t.transit.name || "").toLowerCase());
      const tp = el("p");
      tp.innerHTML = e("jahr.transit", ft,
        t.natal.achse ? e("jahr.achse")
          : e("jahr.traegt", figurVon(t.natal.key || "").kurz || t.natal.name));
      jahrFach.appendChild(tp);
    }

    if (prg) {
      const gp = el("p");
      gp.innerHTML = e("jahr.progression", bildDat(prg.sonne.zeichen), bildDat(prg.mond.zeichen),
        prg.phaseText.charAt(0).toUpperCase() + prg.phaseText.slice(1));
      jahrFach.appendChild(gp);
    }

    if (mond) {
      const mp = el("p");
      mp.innerHTML = e("jahr.mond", mond.menzilNr, mond.menzil.tr,
        mond.menzil.hukum.replace(/\.$/, ""), mond.zunehmend,
        mond.menzil.iyi.toLowerCase(), mond.menzil.kacin.toLowerCase(), mond.verbrannt);
      jahrFach.appendChild(mp);
    }
    const hzp = herkunftZeile("titel.jahr");
    if (hzp) jahrFach.appendChild(hzp);
    return 1;
  }

  zeichneJahr();
  [500, 1200, 2500].forEach(ms => setTimeout(() => {
    if (document.body.contains(jahrFach)) zeichneJahr();
  }, ms));

  if (lm) {
    cikti.appendChild(absatz(e("titel.geber"),
      e("geber", bildDat(lm.hZeichen),
        figurVon(lm.alkochoden).figur.replace(/^./, c => c.toUpperCase()),
        figurVon(lm.alkochoden).pron, ORT[lm.alkoHaus - 1])));
  }

  if (sb) {
    const rat = el("div", "ratBand");
    rat.appendChild(el("div", "ratSchild", e("rat.schild")));
    rat.appendChild(el("p", "ratWort", sb.burc.ogut));
    cikti.appendChild(rat);
  }

  /* ------------------------------------------------- die Zusammenschau */
  const h = herrenDerZeit({ zr, prof: profektionJetzt(), fd, vd });

  if (sb || r || h.anzahl) {
    const kasten = el("div", "schlussKasten");
    kasten.appendChild(el("h3", null, e("titel.zusammen")));

    /* Das Bleibende zuerst. */
    if (r || sb) {
      const hp = r && r.planeten[r.herrscher];
      const satz = el("p");
      satz.innerHTML = e("zus.bleibend",
        sb ? sb.burc.tr : null,
        sb ? e(sb.unsur.de === "Feuer" ? "zus.element.feuer" : sb.unsur.de === "Erde" ? "zus.element.erde"
              : sb.unsur.de === "Luft" ? "zus.element.luft" : "zus.element.wasser") : "",
        sb ? sb.herr.tr : "",
        (r && hp) ? BILD[r.ascZeichen] : null,
        (r && hp) ? figurVon(r.herrscher).figur : "",
        (r && hp) ? figurVon(r.herrscher).pron : "",
        (r && hp) ? bildDat(hp.zeichen) : "",
        (r && hp) ? ORT[hp.haus - 1] : "");
      kasten.appendChild(satz);
    }

    /* Und nun: worauf mehrere zugleich zeigen. */
    if (h.anzahl) {
      const oben = h.sortiert[0];
      const mehrfach = oben.quellen.length > 1;
      const z = zustandVon(oben.key);

      const p1 = el("p");
      if (mehrfach) {
        const fo = figurVon(oben.key);
        const GROSS = w => w.charAt(0).toUpperCase() + w.slice(1);
        p1.innerHTML = e("zus.einig",
          e("zahlwort")[h.anzahl] || h.anzahl,
          e("zahlwort")[oben.quellen.length] || oben.quellen.length,
          fo.akk, undListe(oben.quellen), fo);
      } else {
        p1.innerHTML = e("zus.uneinig", undListe(h.stimmen.map(st =>
          e("zus.nennt", st.quelle, figurVon(st.key).akk))));
      }
      kasten.appendChild(p1);

      if (mehrfach && z) {
        const p2 = el("p");
        const fo2 = figurVon(oben.key);
        p2.innerHTML = e("zus.hand", bildDat(z.zeichen), ORT[z.haus - 1],
          STAND[z.wuerde.stufe] || STAND["—"]);
        kasten.appendChild(p2);
      }
    }

    /* Der Schluss. */
    const ende = el("p", "schlussWort");
    ende.innerHTML = e("schluss");
    kasten.appendChild(ende);
    const hzz = herkunftZeile("titel.zusammen");
    if (hzz) kasten.appendChild(hzz);

    cikti.appendChild(kasten);
  }

  /* Zwei Abschnitte kann die Essenz nicht von sich aus füllen — sie brauchen
     etwas, das nur du beisteuern kannst. */
  const offen = [];
  if (document.querySelector("#soru")) offen.push(
    e("offen.niyet"));
  if (document.querySelector("#u2ad")) offen.push(
    e("offen.uyum"));
  if (document.querySelector("#rmFrage")) offen.push(
    e("offen.raml"));
  if (document.querySelector("#ekVorhaben")) offen.push(
    e("offen.zeit"));
  if (offen.length) {
    const kasten = el("div", "offeneListe");
    kasten.append(el("h3", null, e("titel.fehlt")));
    kasten.append(el("p", null, e("fehlt.zahl", offen.length)));
    const ul = el("ul", "deutungListe");
    offen.forEach(([titel, was]) => {
      const li = el("li");
      li.innerHTML = `<b>${titel}</b> — ${was}.`;
      ul.appendChild(li);
    });
    kasten.append(ul);
    cikti.appendChild(kasten);
  }

  if (!sb && !geist && !zr && !dir && !anti && !prof && !r && !fd && !vd && !lm) {
    const w = el("p", "kucukNot", "Es fehlen noch Angaben. ");
    const b = el("button", "knopfKlein", "Zur Dateneingabe");
    b.addEventListener("click", zurDateneingabe);
    w.appendChild(b);
    cikti.appendChild(w);
  }

  /* Ein Schlusszeichen ganz zuletzt — es markiert das Ende des Gelesenen,
     und steht darum hinter allem, was noch kommt. */
  const zier = el("div", "schlussZier");
  zier.textContent = "✧";
  cikti.appendChild(zier);
}

$("#eLesen")?.addEventListener("click", () => schreibe("#eCikti"));

/* Beim Öffnen des Reiters von selbst lesen. */
const reiter = document.querySelector('nav#reiter button[data-bolum="bEssenz"]');
if (reiter) reiter.addEventListener("click", () => setTimeout(() => schreibe("#eCikti"), 0));

/* Die Essenz steht nicht mehr auf der Hauptseite — dort stehen die beiden
   Wege. Sie wird gelesen, wenn man ihren Abschnitt öffnet, und nachgezogen,
   sobald sich die Angaben ändern. */
let nachUhr = null;
aufProfilAenderung(() => {
  clearTimeout(nachUhr);
  nachUhr = setTimeout(() => {
    const b = document.getElementById("bEssenz");
    if (b && !b.hidden) schreibe("#eCikti");
  }, 600);
});

/* Nach einem Sprachwechsel die offene Essenz neu schreiben. */
window.addEventListener("sprache-geaendert", () => setTimeout(() => {
  const b = document.getElementById("bEssenz");
  if (b && !b.hidden) schreibe("#eCikti");
}, 80));

/* --------------------------------------------------- die Lesung auf der Startseite
   Dieselbe Essenz, aber dort, wo man sie sucht: gleich nach den Angaben,
   ohne dass man erst einen von siebzehn Knöpfen finden muss. */
/* Ganz gelesen sind das am Telefon zwölf Bildschirme. Darum steht
   zunächst nur der Auftakt mit den ersten beiden Kapiteln da, und der
   Rest wartet hinter einem Knopf — die Lesung bleibt vollständig, aber
   sie fällt einem nicht als Wand entgegen. Wer einmal aufgeklappt hat,
   bleibt für diesen Besuch aufgeklappt. */
let lesungOffen = false;

function falteLesung(ziel) {
  const kinder = [...ziel.children];
  let zaehler = 0, schnitt = -1;
  for (let i = 0; i < kinder.length; i++) {
    if (kinder[i].tagName === "H3" && ++zaehler === 3) { schnitt = i; break; }
  }
  if (schnitt < 0) return;
  /* Manche Abschnitte führen einen Kasten mit Überschrift vor sich her.
     Der gehört zu dem, was danach kommt, und darf nicht diesseits der
     Falte stehenbleiben. */
  while (schnitt > 0 && kinder[schnitt - 1].classList &&
         kinder[schnitt - 1].classList.contains("essenzKopf")) schnitt--;

  const rest = document.createElement("div");
  rest.className = "lesungRest";
  kinder.slice(schnitt).forEach(k => rest.appendChild(k));
  const uebrig = rest.querySelectorAll("h3").length;
  rest.hidden = !lesungOffen;

  const knopf = document.createElement("button");
  knopf.type = "button";
  knopf.className = "lesungMehr";
  const beschriften = () => {
    knopf.textContent = rest.hidden
      ? t("lesung.weiter").replace("%n", uebrig)
      : t("lesung.zu");
    knopf.classList.toggle("offen", !rest.hidden);
  };
  beschriften();
  knopf.addEventListener("click", () => {
    rest.hidden = !rest.hidden;
    lesungOffen = !rest.hidden;
    beschriften();
  });

  ziel.append(knopf, rest);
}

function schreibeLesung() {
  const ziel = document.getElementById("lesungCikti");
  const rahmen = document.getElementById("lesungHeim");
  if (!ziel || !rahmen || rahmen.hidden) return;
  schreibe("#lesungCikti");
  falteLesung(ziel);
}

let lesungUhr = null;
function lesungNachziehen() {
  clearTimeout(lesungUhr);
  lesungUhr = setTimeout(schreibeLesung, 400);
  [1200, 2600].forEach(ms => setTimeout(schreibeLesung, ms));
}
aufProfilAenderung(lesungNachziehen);
window.addEventListener("sprache-geaendert", () => setTimeout(schreibeLesung, 120));
if (document.readyState === "complete") lesungNachziehen();
else window.addEventListener("load", lesungNachziehen);
