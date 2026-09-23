/* ------------------------------------------------------------------------
   jahr.js — der Jahresüberblick.

   Jede Technik bekommt einen Kasten "Dieses Jahr": was im laufenden
   Kalenderjahr auf sie zukommt. Wie deutung.js liest dieses Modul nur die
   fertigen Ausgaben der anderen Rechner und schreibt in eigene Kästen
   daneben — an fremden Rechnungen wird nichts geändert.
   --------------------------------------------------------------------- */
import { leseProfilRoh } from "./profil.js?v=38";
import { cevir, toplam, kalan } from "./ebced.js?v=38";
import { BURCLAR } from "./korpus.js?v=38";
import { sonnenLaenge, julianischesDatum, norm360, berechneGeburt } from "./astro.js?v=38";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

export const JAHR = new Date().getFullYear();
const MONATE = ["Januar","Februar","März","April","Mai","Juni","Juli",
                "August","September","Oktober","November","Dezember"];
const GLYPHEN = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

function geburtsDatum(p) {
  if (!p || !p.datum) return null;
  const [j, m, t] = p.datum.split("-").map(Number);
  return new Date(j, m - 1, t);
}
function alterAm(p, datum) {
  const g = geburtsDatum(p);
  return g ? (datum - g) / (365.2425 * 864e5) : null;
}
/* Alter -> Datum, damit aus Jahreszahlen wieder Kalendertage werden. */
function datumBeiAlter(p, alter) {
  const g = geburtsDatum(p);
  return g ? new Date(g.getTime() + alter * 365.2425 * 864e5) : null;
}
const tagMonat = d => `${d.getDate()}. ${MONATE[d.getMonth()]}`;
const komma = n => n.toFixed(1).replace(".", ",");

function nennwort(z) {
  const w = (z || "").replace(/[^A-Za-zÄÖÜäöüß ]/g, "").trim().split(/\s+/).filter(Boolean);
  return [...new Set(w)].join(" ");
}
/* "♊ 23.1°" -> 83.1 */
function laengeAus(zelle) {
  const g = GLYPHEN.findIndex(x => (zelle || "").includes(x));
  const gr = parseFloat((zelle || "").replace(/[^\d.,-]/g, "").replace(",", "."));
  return g < 0 || isNaN(gr) ? null : g * 30 + gr;
}

function jahresFenster(p) {
  const anfang = new Date(JAHR, 0, 1), ende = new Date(JAHR, 11, 31);
  return { anfang, ende, alterAnfang: alterAm(p, anfang), alterEnde: alterAm(p, ende) };
}

/* --------------------------------------------- Yıldıznâme: Jahresregent
   Im Falnâme-Gebrauch wird die Namenssumme mit der Jahreszahl verbunden und
   der Rest wieder durch zwölf gelesen. Das Zeichen, das herauskommt, gibt
   dem Jahr seinen Ton — es ist nicht das Geburtszeichen. */
function yildizJahr(kasten) {
  const p = leseProfilRoh();
  if (!p || !p.name || !p.anne) { kasten.hidden = true; return; }
  const summe = toplam(cevir(p.name)) + toplam(cevir(p.anne));
  if (!summe) { kasten.hidden = true; return; }
  const regent = BURCLAR[kalan(summe + JAHR, 12) - 1];

  kasten.hidden = false;
  kasten.innerHTML = "";
  kasten.append(el("h3", null, `Dieses Jahr — ${JAHR}`));
  const p1 = el("p");
  p1.innerHTML = `Namenssumme ${summe} und Jahreszahl ${JAHR} ergeben ${summe + JAHR}; ` +
    `durch zwölf geteilt bleibt ${kalan(summe + JAHR, 12)}. Regent des Jahres ist damit ` +
    `<b>${regent.tr} — ${regent.de}</b>, nicht dein Geburtszeichen.`;
  kasten.append(p1);
  kasten.append(el("p", null, `Der Ton des Jahres: ${regent.tabiat}`));
  kasten.append(el("p", null,
    `Günstig in diesem Jahr: ${regent.is} Guter Tag der Woche: ${regent.gun}; ` +
    `schwerer Tag: ${regent.kotugun}. Anrufung des Jahres: ${regent.esma}.`));
  kasten.append(el("p", "kucukNot",
    "Der Jahresregent ist eine Anwendung der Ebced-Rechnung auf die Jahreszahl, " +
    "wie sie die Falnâme-Praxis kennt — nicht aus einer einzelnen Handschrift belegt."));
}

/* ------------------------------------------------ Profektion des Jahres
   Ein Jahr, ein Haus: mit jedem Geburtstag rückt der Aszendent ein Zeichen
   weiter. Das Zeichen, auf das er fällt, gibt dem Jahr sein Thema, und sein
   Herrscher ist der Herr des Jahres. Wird hier eigens gerechnet, weil die
   Tafel im Abschnitt an ihrem Schieber hängt — der steht auf Alter null. */
const ZEICHEN_NAMEN = ["Widder","Stier","Zwillinge","Krebs","Löwe","Jungfrau",
                       "Waage","Skorpion","Schütze","Steinbock","Wassermann","Fische"];
const DOMIZIL = ["Mars","Venus","Merkur","Mond","Sonne","Merkur",
                 "Venus","Mars","Jupiter","Saturn","Saturn","Jupiter"];
const HAUSTHEMA = [
  "Leib, Auftreten, das eigene Vorhaben",
  "Besitz, Einkommen, was man in der Hand hat",
  "Wege, Geschwister, Nachrichten, das Nahe",
  "Haus, Herkunft, Eltern, der Grund unter den Füßen",
  "Kinder, Lust, Spiel, was man hervorbringt",
  "Arbeit, Dienst, Gesundheit, das Mühsame",
  "der Andere: Ehe, Verträge, offene Gegner",
  "Verlust und Erbe, Tiefe, was von anderen kommt",
  "Fremde, Lehre, Glaube, die weite Reise",
  "Amt, Ruf, Stellung in der Welt",
  "Freunde, Bünde, Hoffnungen, der gute Geist",
  "Rückzug, Verborgenes, was einem selbst im Weg steht"
];

export function profektionJetzt() {
  const p = leseProfilRoh();
  if (!p || !p.datum || !p.zeit) return null;
  const breite = parseFloat(p.breite), laenge = parseFloat(p.laenge), utc = parseFloat(p.utc);
  if (isNaN(breite) || isNaN(laenge) || isNaN(utc)) return null;
  const [j, m, t] = p.datum.split("-").map(Number);
  const [st, mi] = p.zeit.split(":").map(Number);
  let g;
  try { g = berechneGeburt(j, m, t, st, mi, utc, breite, laenge); } catch (e) { return null; }
  const ascZeichen = Math.floor(norm360(g.asc) / 30);
  const alter = Math.floor(alterAm(p, new Date()));
  if (alter == null || alter < 0) return null;
  const zeichen = (ascZeichen + alter) % 12;
  const haus = (alter % 12) + 1;
  return {
    alter, haus, zeichen,
    name: ZEICHEN_NAMEN[zeichen], glyph: GLYPHEN[zeichen],
    herr: DOMIZIL[zeichen], thema: HAUSTHEMA[haus - 1],
    ascName: ZEICHEN_NAMEN[ascZeichen]
  };
}

function pfJahr(kasten) {
  const pr = profektionJetzt();
  if (!pr) { kasten.hidden = true; return; }
  kasten.hidden = false;
  kasten.innerHTML = "";
  kasten.append(el("h3", null, `Dieses Jahr — ${JAHR}`));
  const p1 = el("p");
  p1.innerHTML = `Du bist ${pr.alter} Jahre alt; der Aszendent ist seit der Geburt ${pr.alter} Zeichen ` +
    `weitergerückt, von ${pr.ascName} auf <b>${pr.glyph} ${pr.name}</b>. Damit steht dein ` +
    `<b>${pr.haus}. Haus</b> im Jahr, und Herr des Jahres ist <b>${pr.herr}</b>.`;
  kasten.append(p1);
  kasten.append(el("p", null, `Thema des Jahres: ${pr.thema}.`));
  kasten.append(el("p", "kucukNot",
    "Das Jahr läuft von Geburtstag zu Geburtstag, nicht von Januar zu Januar. " +
    "Wo der Herr des Jahres im Geburtshoroskop steht und wie er dasteht, entscheidet, " +
    "ob das Thema leicht oder schwer wird."));
}

/* ------------------------------------------- Lebensbogen: was heuer fällt */
function lbJahr(kasten) {
  const tafel = $("#lbCikti");
  const p = leseProfilRoh();
  if (!tafel || tafel.hidden || !p || !p.datum) { kasten.hidden = true; return; }
  const f = jahresFenster(p);
  const treffer = [...tafel.querySelectorAll("tbody tr")].map(tr => {
    const z = [...tr.cells].map(td => td.innerText.trim());
    return { alter: parseFloat(z[0]), promissor: nennwort(z[1]), aspekt: z[2], signifikator: nennwort(z[3]) };
  }).filter(d => !isNaN(d.alter) && d.alter >= f.alterAnfang && d.alter <= f.alterEnde);

  kasten.hidden = false;
  kasten.innerHTML = "";
  kasten.append(el("h3", null, `Dieses Jahr — ${JAHR}`));
  if (!treffer.length) {
    kasten.append(el("p", null,
      `Im Jahr ${JAHR} bist du zwischen ${komma(f.alterAnfang)} und ${komma(f.alterEnde)} Jahre alt. ` +
      `In dieser Spanne wird keine Direktion fällig. Ein ruhiges Jahr in dieser Technik; ` +
      `was wirkt, wirkt aus den Jahren davor nach.`));
  } else {
    kasten.append(el("p", null,
      `Im Jahr ${JAHR} bist du zwischen ${komma(f.alterAnfang)} und ${komma(f.alterEnde)} Jahre alt. ` +
      `Darin wird fällig:`));
    const liste = el("ul", "deutungListe");
    treffer.forEach(d => {
      const wann = datumBeiAlter(p, d.alter);
      const li = el("li");
      li.innerHTML = `<b>um den ${tagMonat(wann)}</b> (mit ${komma(d.alter)} Jahren): ` +
        `${d.promissor} ${d.aspekt} ${d.signifikator}`;
      liste.appendChild(li);
    });
    kasten.append(liste);
    kasten.append(el("p", "kucukNot",
      "Die Tage sind gerundet — Primärdirektionen reagieren empfindlich auf die Geburtszeit. " +
      "Rechne mit einem Fenster von Wochen, nicht von Tagen."));
  }
}

/* --------------------------------- Zodiacal Releasing: Kapitel dieses Jahr */
function zrJahr(kasten) {
  const tafel = $("#zrCikti");
  const p = leseProfilRoh();
  if (!tafel || tafel.hidden || !p || !p.datum) { kasten.hidden = true; return; }
  const f = jahresFenster(p);
  const zeilen = [...tafel.querySelectorAll("tbody tr")].map(tr => {
    const z = [...tr.cells].map(td => td.innerText.trim());
    return { stufe: z[0], zeichen: nennwort(z[1]), herrscher: nennwort(z[2]),
             von: parseFloat(z[3]), bis: parseFloat(z[4]) };
  }).filter(d => !isNaN(d.von) && !isNaN(d.bis));

  const laufend = st => zeilen.find(d => d.stufe === st && f.alterAnfang >= d.von && f.alterAnfang < d.bis);
  const wechsel = zeilen.filter(d => d.von > f.alterAnfang && d.von <= f.alterEnde);

  kasten.hidden = false;
  kasten.innerHTML = "";
  kasten.append(el("h3", null, `Dieses Jahr — ${JAHR}`));

  const l1 = laufend("L1"), l2 = laufend("L2");
  if (l1) {
    const p1 = el("p");
    p1.innerHTML = `Ins Jahr ${JAHR} gehst du im großen Kapitel <b>${l1.zeichen}</b> ` +
      `(${l1.herrscher}), das von ${l1.von.toFixed(0)} bis ${l1.bis.toFixed(0)} läuft` +
      (l2 ? `, und in der kleineren Periode <b>${l2.zeichen}</b> (${l2.herrscher})` : "") + ".";
    kasten.append(p1);
  }

  const echte = wechsel.filter(d => d.stufe === "L1" || d.stufe === "L2");
  if (echte.length) {
    kasten.append(el("p", null, "Im Lauf des Jahres wechselt der Ton:"));
    const liste = el("ul", "deutungListe");
    echte.forEach(d => {
      const wann = datumBeiAlter(p, d.von);
      const li = el("li");
      li.innerHTML = `<b>${tagMonat(wann)}</b>: ${d.stufe === "L1" ? "neues großes Kapitel" : "neue kleinere Periode"} ` +
        `— ${d.zeichen} unter ${d.herrscher}, bis ${komma(d.bis)} Jahren.`;
      liste.appendChild(li);
    });
    kasten.append(liste);
    kasten.append(el("p", "kucukNot",
      "Übergänge sind in dieser Technik die eigentlichen Stellen: Der Ton ändert sich " +
      "oft binnen weniger Wochen um das Datum herum."));
  } else {
    kasten.append(el("p", null,
      `Im Jahr ${JAHR} steht kein Wechsel auf den beiden oberen Ebenen an — das Jahr läuft ` +
      `durch, ohne dass sich das Thema grundsätzlich dreht.`));
  }
}

/* --------------------------- Antiszien: wann die Sonne den Zwilling trifft */
function azJahr(kasten) {
  const tafel = $("#azHoroskopCikti");
  const p = leseProfilRoh();
  if (!tafel || tafel.hidden || !p || !p.datum) { kasten.hidden = true; return; }

  const punkte = [...tafel.querySelectorAll("tbody tr")].map(tr => {
    const z = [...tr.cells].map(td => td.innerText.trim());
    return { name: nennwort(z[0]), antiszion: laengeAus(z[2]) };
  }).filter(x => x.antiszion != null && x.name);
  if (!punkte.length) { kasten.hidden = true; return; }

  /* Tag für Tag durchs Jahr: wo steht die Sonne, und trifft sie einen
     Schattenzwilling? Die Sonne läuft rund ein Grad am Tag. */
  const funde = [];
  let vorher = null;
  for (let t = 0; t < 366; t++) {
    const d = new Date(JAHR, 0, 1 + t);
    if (d.getFullYear() !== JAHR) break;
    const jd = julianischesDatum(d.getFullYear(), d.getMonth() + 1, d.getDate(), 12);
    const lon = sonnenLaenge(jd);
    if (vorher != null) {
      punkte.forEach(pt => {
        const a = norm360(vorher - pt.antiszion), b = norm360(lon - pt.antiszion);
        if (a > 180 && b <= 180 && norm360(b) < 2) funde.push({ datum: d, punkt: pt.name });
      });
    }
    vorher = lon;
  }

  kasten.hidden = false;
  kasten.innerHTML = "";
  kasten.append(el("h3", null, `Dieses Jahr — ${JAHR}`));
  kasten.append(el("p", null,
    `Einmal im Jahr läuft die Sonne über jeden deiner Schattenzwillinge. An diesen Tagen ` +
    `wird das sonst Verborgene für kurze Zeit beleuchtet — die alte Lesart nennt sie gute ` +
    `Tage, um etwas anzusprechen, das lange unausgesprochen war.`));
  if (!funde.length) {
    kasten.append(el("p", "kucukNot", "Für dieses Jahr ließ sich kein solcher Tag bestimmen."));
    return;
  }
  const liste = el("ul", "deutungListe");
  funde.sort((a, b) => a.datum - b.datum).forEach(f => {
    const li = el("li");
    li.innerHTML = `<b>${tagMonat(f.datum)}</b>: die Sonne steht auf dem Schattenzwilling von ${f.punkt}.`;
    liste.appendChild(li);
  });
  kasten.append(liste);
  kasten.append(el("p", "kucukNot", "Auf ein bis zwei Tage genau."));
}

/* ------------------------------------------------------------ Verdrahtung */
function haenge(ciktiWahl, kastenId, zeichner, sofort) {
  const cikti = $(ciktiWahl);
  if (!cikti) return;
  let kasten = $("#" + kastenId);
  if (!kasten) {
    kasten = el("div", "jahrKasten");
    kasten.id = kastenId;
    kasten.hidden = true;
    (document.getElementById(kastenId.replace("Jahr", "Deutung")) || cikti).after(kasten);
  }
  const neu = () => { try { zeichner(kasten); } catch (e) { kasten.hidden = true; } };
  new MutationObserver(neu).observe(cikti, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
  if (sofort) window.addEventListener("profil-geaendert", neu);
  neu();
}

haenge("#yildizCikti", "yildizJahr", yildizJahr, true);
haenge("#lbCikti", "lbJahr", lbJahr);
haenge("#zrCikti", "zrJahr", zrJahr);
haenge("#azHoroskopCikti", "azJahr", azJahr);
haenge("#pfCikti", "pfJahr", pfJahr, true);
