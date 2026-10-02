/* ------------------------------------------------------------------------
   essenz.js — die Zusammenschau.

   Rechnet nichts Eigenes. Das Sternbild leitet sie aus den beiden Namen
   selbst her (das ist derselbe kurze Weg wie im Yıldıznâme-Abschnitt);
   alles Übrige liest sie aus dem, was die anderen Abschnitte bereits
   ausgegeben haben, und fügt es zu einem Text.
   --------------------------------------------------------------------- */
import { cevir, toplam, kalan } from "./ebced.js?v=122";
import { BURCLAR, UNSURLAR, GEZEGENLER, MENZILLER } from "./korpus.js?v=122";
import { leseProfilRoh, profilBeschriftung, zurDateneingabe, aufProfilAenderung } from "./profil.js?v=122";
import { JAHR, profektionJetzt } from "./jahr.js?v=122";
import { radix, transite, progression, zustandVon, ZEICHEN, PLANET, HAUS, mitArtikel } from "./horoskop.js?v=122";
import { mondHeute } from "./elektion.js?v=122";
import { firdariaJetzt, vimshottariJetzt } from "./perioden.js?v=122";
import { zrStand } from "./zr.js?v=122";
import { FIGUR, BILD, ORT, NAEHE, STAND, figurVon, bildDat } from "./sprache.js?v=122";
import { jahresUmdrehung } from "./solar.js?v=122";
import { lebensmass } from "./lebensmass.js?v=122";

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
    stimmen.push({ key: NAME_ZU_KEY[zrHerr], quelle: "die Tafel der Kapitel" });
  const profHerr = prof ? blank(prof.herr) : "";
  if (NAME_ZU_KEY[profHerr])
    stimmen.push({ key: NAME_ZU_KEY[profHerr], quelle: "der Zeiger, der jedes Jahr ein Feld weiterrückt" });
  if (fd && fd.laufend && PLANET_NAME[fd.laufend.key])
    stimmen.push({ key: fd.laufend.key, quelle: "eine persische Zählung" });
  if (vd && vd.laufend && PLANET_NAME[vd.laufend.key])
    stimmen.push({ key: vd.laufend.key, quelle: "eine indische Zählung" });

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
  return teile.slice(0, -1).join(", ") + " und " + teile[teile.length - 1];
}

/* ------------------------------------------------------------- der Text */

function absatz(titel, text) {
  const f = document.createDocumentFragment();
  f.append(el("h3", null, titel), el("p", null, text));
  return f;
}

function schreibe(zielWahl) {
  const cikti = $(typeof zielWahl === "string" ? zielWahl : "#eCikti");
  if (!cikti) return;
  const p = leseProfilRoh();
  cikti.hidden = false;
  cikti.innerHTML = "";

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
  try { fd = firdariaJetzt(); } catch (e) {}
  try { vd = vimshottariJetzt(); } catch (e) {}
  let mond = null;
  try { mond = mondHeute(); } catch (e) { mond = null; }
  const prof = profektion();

  cikti.appendChild(el("p", "kucukNot", "Für: " + profilBeschriftung(p) +
    (alter != null ? ` · heute ${alter.toFixed(0)} Jahre alt` : "")));

  if (r) {
    const h = r.planeten[r.herrscher];
    const fh = figurVon(r.herrscher);
    cikti.appendChild(absatz("Womit du anfängst",
      `In der Stunde deiner Geburt stieg über den Rand der Welt ${BILD[r.ascZeichen]}. ` +
      `Es war ${r.tagGeburt ? "hell" : "dunkel"} — die Sonne stand ${r.tagGeburt ? "über" : "unter"} ` +
      `dem Horizont, und das entscheidet, wer in deinem Leben leise auftritt und wer laut. ` +
      (h ? `Wer die Führung hat, ist ${fh.figur} — ${fh.pron} ${fh.tut}. ` +
           `${fh.pron.charAt(0).toUpperCase() + fh.pron.slice(1)} hält sich auf ${ORT[h.haus - 1]}. ` +
           `${STAND[h.wuerde.stufe] || STAND["—"]} ` +
           `Dorthin zieht dein Leben, noch ehe irgendeine Zählung etwas dazu sagt.` : "")));

    if (r.aspekte.length) {
      const a = r.aspekte[0];
      const fa = figurVon(a.a.key), fb = figurVon(a.b.key);
      cikti.appendChild(absatz("Zwei, die nicht voneinander loskommen",
        `${fa.figur.charAt(0).toUpperCase() + fa.figur.slice(1)} und ${fb.figur} ` +
        `${NAEHE[a.name] || "stehen in einem festen Verhältnis zueinander"}. ` +
        `Der eine ${fa.tut}, der andere ${fb.tut}. Das ist der Zug, der sich durch alles zieht, ` +
        `was dir begegnet — du wirst ihn in jeder Geschichte deines Lebens wiederfinden.`));
    }
  }

  if (sb) {
    const kopf = el("div", "essenzKopf");
    kopf.append(
      el("div", "kalanBaslik", "Dein Zeichen im Yıldıznâme"),
      el("div", "buyukToplam", `${sb.burc.tr} — ${sb.burc.de}`),
      el("div", "kucukNot",
        `ein Zeichen ${sb.unsur.de === "Feuer" ? "des Feuers" : sb.unsur.de === "Erde" ? "der Erde" :
          sb.unsur.de === "Luft" ? "der Luft" : "des Wassers"} — ${sb.unsur.tabiat}`)
    );
    cikti.appendChild(kopf);

    cikti.appendChild(absatz("Wer du bist",
      `${sb.burc.tabiat} ${sb.kadin ? sb.burc.kadin : sb.burc.erkek} ` +
      `Dein Element ist ${sb.unsur.tr.toLowerCase() === "ateş" ? "das Feuer" :
        sb.unsur.de === "Erde" ? "die Erde" : sb.unsur.de === "Luft" ? "die Luft" : "das Wasser"}: ` +
      `${sb.unsur.metin}`));

    if (sb.menzil) {
      cikti.appendChild(absatz("Deine Herberge",
        `Der Mond zieht in gut siebenundzwanzig Tagen durch achtundzwanzig Herbergen, und deine ` +
        `Namenssumme fällt auf die ${sb.menzil.no}., ${sb.menzil.tr}: ${sb.menzil.hukum} ` +
        `Günstig für ${sb.menzil.iyi.toLowerCase()}; meide ${sb.menzil.kacin.toLowerCase()}.`));
    }

    const fHerr = figurVon((sb.herr.de || "").toLowerCase());
    cikti.appendChild(absatz("Was dir gegeben und was dir genommen ist",
      `Über deinem Zeichen steht ${fHerr.figur}: ${fHerr.fabel}. ` +
      `Er gibt dir ${fHerr.gabe}. Und er nimmt dafür ${fHerr.preis}. ` +
      `Das ist kein Handel, den man ausschlagen könnte — es ist dieselbe Eigenschaft, ` +
      `von zwei Seiten gesehen.`));
  }

  if (geist) {
    const kasten = el("div", "essenzKopf");
    kasten.append(
      el("div", "kalanBaslik", "Dein Spirit Name"),
      el("div", "buyukToplam", geist.name),
      geist.herkunft ? el("div", "kucukNot", geist.herkunft) : el("span")
    );
    cikti.appendChild(kasten);
    cikti.appendChild(absatz("Der gute Geist",
      `Dieser Name kommt nicht aus deinem Namen, sondern aus dem Himmel selbst: aus der Stelle, ` +
      `die in deiner Geburtsstunde über den Rand der Welt stieg, aus dem Stand von Sonne und Mond, ` +
      `aus der Stelle, an der dir das Glück zufällt, und aus dem letzten Mal, als Sonne und Mond ` +
      `vor deiner Geburt zusammentraten. Fünf Orte, ein Name. Die Alten setzten ihn an die Stelle, ` +
      `wo bei den Griechen der gute Dämon wohnt — Sokrates' Stimme, die ihn nie zu etwas trieb, ` +
      `sondern ihn nur zurückhielt, wenn er im Begriff war, sich selbst zu schaden. Kein Fremder, ` +
      `der über dich wacht: der Name dessen, was in dir für dich ist.`));
  }

  if (zr) {
    const l1 = zr.L1, l2 = zr.L2, l3 = zr.L3;
    const bildVon = txt => {
      const i = ZEICHEN.findIndex(z => txt && txt.includes(z.name));
      return i >= 0 ? BILD[i] : "ein eigenes Bild";
    };
    cikti.appendChild(absatz("Das Kapitel, in dem du gerade liest",
      `Dein Leben zerfällt nicht in Jahre, sondern in Kapitel, und eines davon läuft seit deinem ` +
      `${l1.von.toFixed(0)}. Lebensjahr und noch bis zum ${l1.bis.toFixed(0)}. Sein Bild ist ` +
      `${bildVon(l1.zeichen)}, und es steht unter ` +
      `${figurVon(NAME_ZU_KEY[blank(l1.herrscher)] || "").dat || l1.herrscher}. ` +
      (l2 ? `Darin liegt ein kleineres Kapitel, die Jahre ${komma(l2.von)} bis ${komma(l2.bis)}: ` +
            `${bildVon(l2.zeichen)}. ` : "") +
      (l3 ? `Und über diesen Monaten liegt noch einmal ein eigenes Licht: ${bildVon(l3.zeichen)}. ` : "") +
      `Das Kapitel sagt, worum es überhaupt geht; das Unterkapitel, in welcher Tonart; die Monate, ` +
      `woran du es gerade merkst.`));
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

      cikti.appendChild(absatz("Laute und leise Strecken",
        (laufend
          ? `Du stehst gerade auf einer lauten Strecke — einer von denen, auf denen sich entscheidet, ` +
            `wie man dich sieht und wofür man dich hält. `
          : `Du stehst gerade auf einer leisen Strecke. Das ist keine schlechte Nachricht: Auf den ` +
            `leisen Strecken wird vorbereitet, was auf den lauten dann als plötzlicher Erfolg aussieht. `) +
        (kommend ? `Die nächste laute beginnt mit ${kommend.match(/([\d.]+)/)[1].replace(".", ",")} Jahren. ` : "") +
        (naechsteLoesung
          ? `Und mit etwa ${komma(naechsteLoesung.jahr)} Jahren reißt ein Faden: Was bis dahin trug, ` +
            `hört auf zu tragen, und das Leben setzt an ganz anderer Stelle neu an. Die alten Bücher ` +
            `halten solche Stellen für die wichtigsten einer Biographie.`
          : "")));
    }
  }

  if ((fd && fd.laufend) || (vd && vd.laufend)) {
    const nenn = k => figurVon(k).figur;
    const teile = [];
    if (fd && fd.laufend) {
      teile.push(`Eine persische Zählung gibt diese Jahre ${figurVon(fd.laufend.key).dat}` +
        (fd.laufendUnter && fd.laufendUnter.key !== fd.laufend.key
          ? `, und darin führt gerade ${figurVon(fd.laufendUnter.key).figur}` : ""));
    }
    if (vd && vd.laufend) {
      teile.push(`Eine indische, die vom Stand des Mondes bei deiner Geburt ausgeht, nennt ` +
        `${figurVon(vd.laufend.key).akk}` +
        (vd.laufendUnter ? ` und darin ${figurVon(vd.laufendUnter.key).akk}` : ""));
    }
    const pp = el("p");
    pp.innerHTML = teile.join(". ") + ". Beide zählen keine Sternbilder ab, sondern verteilen feste " +
      "Mengen von Jahren — und landen trotzdem bei denselben Zeiten wie die übrigen.";
    cikti.appendChild(el("h3", null, "Wer deine Jahre führt"));
    cikti.appendChild(pp);
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
    cikti.appendChild(absatz("Was als Nächstes an die Tür klopft",
      `Die älteste aller Zählungen rechnet mit der Drehung der Erde selbst: ein Grad für ein ` +
      `Lebensjahr. Nach ihr klopft ${wann}, mit ${komma(dir.alter)} Jahren, ${wer} ${wo}. ` +
      `Das sagt nicht, was geschieht — nur, wann ein Thema fällig wird. Ob geöffnet wird und wer ` +
      `davorsteht, steht auf einem anderen Blatt.`));
  }

  if (anti) {
    if (anti.funde.length) {
      const namen = anti.funde.map(f => {
        const n = [...new Set((f.match(/(Sonne|Mond|Merkur|Venus|Mars|Jupiter|Saturn|Aszendent|ASC|MC)/g) || []))];
        return n.slice(0, 2).join(" und ");
      }).filter(Boolean);
      cikti.appendChild(absatz("Was im Verborgenen mitläuft",
        `Es gibt in deinem Himmel ${namen.length === 1 ? "ein Paar" : "mehrere Paare"}, die ` +
        `einander nicht ansehen und doch denselben Schatten werfen: Spiegelt man die eine Seite ` +
        `des Jahres auf die andere — Sommer auf Winter, längster Tag auf kürzesten —, dann stehen ` +
        `sie genau übereinander. Gleich hoch am Himmel, gleich lang am Tag, und trotzdem fällt kein ` +
        `Blick von einem zum anderen: ${namen.join("; ")}. ` +
        `So wie Kastor und Polydeukes, von denen immer nur einer oben war, während der andere ` +
        `unten blieb, und die doch nie etwas getrennt voneinander taten: Diese Paare arbeiten ` +
        `zusammen, ohne dass man es von außen bemerkt. Es sind die Stellen, an denen bei dir etwas ` +
        `geschieht, das sich hinterher nicht erklären lässt.`));
    } else {
      cikti.appendChild(absatz("Was im Verborgenen mitläuft",
        "Spiegelt man die eine Hälfte des Jahres auf die andere, fällt bei dir nichts zusammen. " +
        "Es läuft bei dir nichts im Verborgenen mit: Was wirkt, zeigt sich auch."));
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

    jahrFach.appendChild(el("h3", null, `Dieses Jahr — ${JAHR}`));

    if (pf) {
      const fh = figurVon(pf.herr.toLowerCase());
      const p1 = el("p");
      p1.innerHTML = `Jedes Jahr rückt ein Zeiger um ein Feld weiter, und in diesem Jahr steht er ` +
        `${ORT[pf.haus - 1]}. Darum geht es, von Geburtstag zu Geburtstag. Die Hand, die das Jahr ` +
        `führt, ist ${fh.figur} — ${fh.pron} ${fh.tut}.`;
      jahrFach.appendChild(p1);
    }

    if (sr) {
      const MON = ["Januar","Februar","März","April","Mai","Juni","Juli",
                   "August","September","Oktober","November","Dezember"];
      const zp = sr.zeitpunkt;
      const stuetzen = (sr.firdar && sr.firdar.winkelhaft ? 1 : 0) +
                       (sr.firdar && (sr.firdar.sichtZumHerrn || sr.firdar.key === sr.herrDesJahres) ? 1 : 0) +
                       (sr.teilhaber && (sr.teilhaber.sichtZumHerrn || sr.teilhaber.key === sr.herrDesJahres) ? 1 : 0);
      const p2 = el("p");
      p2.innerHTML = `Am ${zp.tag}. ${MON[zp.monat - 1]} ${zp.jahr} stand die Sonne wieder genau ` +
        `dort, wo sie bei deiner Geburt stand — das ist der Jahreswechsel, den diese Bücher zählen, ` +
        `nicht der erste Januar. Der Schwerpunkt des Jahres fällt dabei ` +
        `${ORT[sr.umAscImNatal - 1]}. ` +
        (stuetzen >= 2
          ? `Die Zeichen stützen einander: ein <b>lautes Jahr</b>, in dem man merkt, was geschieht.`
          : stuetzen === 1
            ? `Eine einzige Stütze: Das Jahr spricht, aber halblaut.`
            : `Nichts stützt einander: ein <b>stilles Jahr</b>. Es geschieht etwas, aber unter der ` +
              `Oberfläche, und man erkennt es erst später.`);
      jahrFach.appendChild(p2);
    }

    if (tr && tr.treffer.length) {
      const t = tr.treffer[0];
      const ft = figurVon((t.transit.name || "").toLowerCase());
      const tp = el("p");
      tp.innerHTML = `Von den langsamen Wanderern steht dir gerade ${ft.figur} am nächsten: ` +
        `${ft.pron} ${ft.tut} — und rührt dabei an ` +
        (t.natal.achse ? "eine deiner Achsen" : `das, was bei dir ${figurVon(t.natal.key || "").kurz || t.natal.name} trägt`) + `.`;
      jahrFach.appendChild(tp);
    }

    if (prg) {
      const gp = el("p");
      gp.innerHTML = `Dein inneres Wetter — eine Zählung, die jeden Tag nach deiner Geburt für ein ` +
        `ganzes Lebensjahr nimmt — steht bei ${bildDat(prg.sonne.zeichen)}, und das Licht, ` +
        `das darin zu- und abnimmt, bei ${bildDat(prg.mond.zeichen)}. ` +
        `${prg.phaseText.charAt(0).toUpperCase() + prg.phaseText.slice(1)}.`;
      jahrFach.appendChild(gp);
    }

    if (mond) {
      const mp = el("p");
      mp.innerHTML = `Und für heute: Der Mond ist in seiner ${mond.menzilNr}. Herberge, ` +
        `${mond.menzil.tr} — ${mond.menzil.hukum.replace(/\.$/, "")} — und ` +
        `${mond.zunehmend ? "nimmt zu" : "nimmt ab"}. Günstig für ${mond.menzil.iyi.toLowerCase()}; ` +
        `meide ${mond.menzil.kacin.toLowerCase()}.` +
        (mond.verbrannt ? " Er steht dabei auf der verbrannten Strecke — heute nichts anfangen, was halten soll." : "");
      jahrFach.appendChild(mp);
    }
    return 1;
  }

  zeichneJahr();
  [500, 1200, 2500].forEach(ms => setTimeout(() => {
    if (document.body.contains(jahrFach)) zeichneJahr();
  }, ms));

  if (lm) {
    cikti.appendChild(absatz("Der Geber des Lebens",
      `Die Alten fragten: Wo in diesem Himmel brennt die Flamme, von der ein Leben seine Wärme ` +
      `nimmt? Bei dir brennt sie bei ${bildDat(lm.hZeichen)}. ` +
      `Und wer hütet diese Flamme? ${figurVon(lm.alkochoden).figur.replace(/^./, c => c.toUpperCase())} — ` +
      `und ${figurVon(lm.alkochoden).pron} hütet sie ${ORT[lm.alkoHaus - 1]}. ` +
      `Von dort nimmt deine Kraft ihre Färbung; wie bei Meleagros, dessen Leben an einem Holzscheit ` +
      `hing, den seine Mutter aus dem Feuer zog und verwahrte: Es gibt eine Stelle, an der ein ` +
      `Leben besonders nah an sich selbst liegt. ` +
      `Wie viele Jahre daraus gezählt werden, steht im eigenen Kapitel und bleibt dort — darüber ` +
      `sind sich die Überlieferungen selbst nicht einig, und eine Zahl wäre hier eine falsche Sicherheit.`));
  }

  if (sb) {
    cikti.appendChild(absatz("Der Rat", sb.burc.ogut));
  }

  /* ------------------------------------------------- die Zusammenschau */
  const h = herrenDerZeit({ zr, prof: profektionJetzt(), fd, vd });

  if (sb || r || h.anzahl) {
    const kasten = el("div", "schlussKasten");
    kasten.appendChild(el("h3", null, "Was das zusammen ergibt"));

    /* Das Bleibende zuerst. */
    if (r || sb) {
      const hp = r && r.planeten[r.herrscher];
      const satz = el("p");
      satz.innerHTML =
        (sb ? `Im Namen liegt ${sb.burc.tr} — ein Zeichen ${sb.unsur.de === "Feuer" ? "des Feuers" :
              sb.unsur.de === "Erde" ? "der Erde" : sb.unsur.de === "Luft" ? "der Luft" : "des Wassers"}, ` +
              `unter ${sb.herr.tr}. ` : "") +
        (r && hp
          ? `In der Stunde deiner Geburt kam ${BILD[r.ascZeichen]} über den Rand der Welt herauf, ` +
            `und die Hand, die das führt, ist ${figurVon(r.herrscher).figur}: ` +
            `${figurVon(r.herrscher).pron} steht bei ${bildDat(hp.zeichen)}, und hält sich auf ` +
            `${ORT[hp.haus - 1]}. `
          : "") +
        `Das ist der Teil, der sich nicht ändert. Er läuft unter allem mit — die Zählungen weiter ` +
        `unten sagen nur, welches Wetter gerade darüber hinwegzieht.`;
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
        p1.innerHTML = `Und nun das Merkwürdige. Hier sprechen ` +
          `${ZAHLWORT[h.anzahl] || h.anzahl} alte Zählungen mit, die einander nie gelesen haben — ` +
          `aus Persien, aus Griechenland, aus Indien —, und ` +
          `${ZAHLWORT[oben.quellen.length] || oben.quellen.length} von ihnen zeigen auf ` +
          `<b>dieselbe Hand</b>, nämlich auf ${fo.akk} — ${undListe(oben.quellen)}. ` +
          `Es ist wie mit den Blinden in der Fabel, die denselben Elefanten betasten: Jeder greift ` +
          `etwas anderes, und am Ende reden doch alle von einem Tier. Wenn Fremde aus ` +
          `verschiedenen Ländern unabhängig voneinander dasselbe sagen, lohnt es sich hinzuhören. ` +
          `${GROSS(fo.pron)} ${fo.tut}. Dafür gibt ${fo.pron} dir ${fo.gabe} — und nimmt sich ` +
          `${fo.preis}.`;
      } else {
        p1.innerHTML = `Diesmal sagen die Zählungen nicht dasselbe. Jede nennt eine andere Hand: ` +
          undListe(h.stimmen.map(st =>
            `${st.quelle.charAt(0).toUpperCase() + st.quelle.slice(1)} nennt ${figurVon(st.key).akk}`)) + `. ` +
          `Keine hat das Übergewicht — eine Strecke wie ein Weg mit mehreren Spuren, auf dem sich ` +
          `noch nicht entschieden hat, welche die Hauptspur wird. Das ist kein Mangel: Es heißt, ` +
          `dass gerade mehr als eine Sache gleichzeitig wächst.`;
      }
      kasten.appendChild(p1);

      if (mehrfach && z) {
        const p2 = el("p");
        const fo2 = figurVon(oben.key);
        p2.innerHTML = `Und diese Hand ist bei dir keine fremde. Sie stand schon in der Stunde deiner ` +
          `Geburt da, und zwar bei ${bildDat(z.zeichen)} — und ihr Ort ist ` +
          `${ORT[z.haus - 1]}. Dort, und nirgends sonst, wird sich in diesen Jahren entscheiden, ` +
          `was sie bringen. ${STAND[z.wuerde.stufe] || STAND["—"]}`;
        kasten.appendChild(p2);
      }
    }

    /* Der Schluss. */
    const ende = el("p", "schlussWort");
    ende.innerHTML =
      "Keine dieser Künste sagt die Zukunft voraus, und keine wird hier so gebraucht. " +
      "Sie geben Themen, Fälligkeiten und Tonarten — sie sagen, <em>worum es geht</em> und " +
      "<em>wann es dran ist</em>, nicht, was daraus wird. Das steht in keiner Tafel.";
    kasten.appendChild(ende);

    cikti.appendChild(kasten);
  }

  /* Zwei Abschnitte kann die Essenz nicht von sich aus füllen — sie brauchen
     etwas, das nur du beisteuern kannst. */
  const offen = [];
  if (document.querySelector("#soru")) offen.push(
    ["Niyet — die Frage", "eine Frage in einem Satz; die Antwort hängt auch an der Stunde, in der du fragst"]);
  if (document.querySelector("#u2ad")) offen.push(
    ["İsim uyumu", "den Namen eines zweiten Menschen und den seiner Mutter"]);
  if (document.querySelector("#rmFrage")) offen.push(
    ["ʿIlm al-Raml", "eine Frage — der Sand antwortet auf den Augenblick, nicht auf das Leben"]);
  if (document.querySelector("#ekVorhaben")) offen.push(
    ["Der rechte Zeitpunkt", "ein Vorhaben, das du beginnen willst; dann prüft er den Mondstand darauf"]);
  if (offen.length) {
    const kasten = el("div", "offeneListe");
    kasten.append(el("h3", null, "Was hier noch fehlt"));
    kasten.append(el("p", null,
      "Zwei Abschnitte stehen bereit, brauchen aber etwas von dir:"));
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
