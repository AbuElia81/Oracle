/* ------------------------------------------------------------------------
   lebensmass.js — Hylech und Alkochoden, das Maß der Jahre.

   Die älteste und umstrittenste Technik der Überlieferung. Zuerst wird der
   <b>Hylech</b> gesucht (arab. haylāj, griech. aphetes, "der Loslassende"):
   jene Stelle des Horoskops, von der das Leben ausgeht. Dann der
   <b>Alkochoden</b> (kadkhudāh, "der Hausherr"): der Planet, der über dieser
   Stelle die meiste Würde hat. Er gibt seine Jahre her — seine größten,
   mittleren oder kleinsten, je nachdem, wie er selbst steht.

   Was dabei herauskommt, ist eine Zuteilung, keine Vorhersage. Schon die
   Alten waren sich darüber uneins; es ist die Technik, über die am meisten
   gestritten wurde. Sie steht hier, weil sie zur Überlieferung gehört, und
   sie sagt nichts über den Tod eines Menschen.
   --------------------------------------------------------------------- */
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=160";
import { norm360, planetenPositionen, julianischesDatum, sonnenLaenge } from "./astro.js?v=160";
import { radix, PLANET, REIHE, ZEICHEN, HAUS, mitArtikel } from "./horoskop.js?v=160";
import { wuerden, ermittleAlmuten } from "./geist.js?v=160";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

/* Die Jahre der Planeten, wie sie seit Ptolemaios überliefert sind. */
const JAHRE = {
  saturn:  { gross:57,  mittel:43.5, klein:30 },
  jupiter: { gross:79,  mittel:45.5, klein:12 },
  mars:    { gross:66,  mittel:40.5, klein:15 },
  sonne:   { gross:120, mittel:69.5, klein:19 },
  venus:   { gross:82,  mittel:45,   klein:8  },
  merkur:  { gross:76,  mittel:48,   klein:20 },
  mond:    { gross:108, mittel:66.5, klein:25 }
};

/* Die Örter des Lebens: erstes, siebtes, neuntes, zehntes, elftes Haus.
   Nur dort kann ein Licht Hylech sein. */
const LEBENSORTE = [1, 7, 9, 10, 11];
const WINKELHAUS = [1, 4, 7, 10];
const FOLGEHAUS  = [2, 5, 8, 11];

const SICHT = { 0:"Konjunktion", 2:"Sextil", 3:"Quadrat", 4:"Trigon", 6:"Opposition",
                8:"Trigon", 9:"Quadrat", 10:"Sextil" };
const sieht = (a, b) => SICHT[((b - a) % 12 + 12) % 12] || null;

/* Die Syzygie vor der Geburt — Neumond oder Vollmond davor. */
function letzteSyzygie(jd) {
  const psi = j => {
    const pos = planetenPositionen(j);
    return norm360(pos.mond.laenge - pos.sonne.laenge);
  };
  const feilen = j => {
    for (let i = 0; i < 12; i++) {
      let d = psi(j) % 180;
      if (d > 90) d -= 180;
      j -= d / 12.190749;
    }
    return j;
  };
  let j = feilen(jd - (psi(jd) % 180) / 12.190749);
  if (j > jd) j = feilen(j - 14.765294);
  const p = psi(j);
  const konjunktion = p < 90 || p > 270;
  const pos = planetenPositionen(j);
  return { jd: j, konjunktion,
           laenge: konjunktion ? norm360(pos.sonne.laenge) : norm360(pos.mond.laenge) };
}

export function lebensmass() {
  const r = radix();
  if (!r) return null;
  const p = r.profil;
  const [j, m, t] = p.datum.split("-").map(Number);
  const [st, mi] = p.zeit.split(":").map(Number);
  const jd = julianischesDatum(j, m, t, st + mi / 60 - p.utc);

  const hausVon = lon => ((Math.floor(norm360(lon) / 30) - r.ascZeichen + 12) % 12) + 1;

  /* ---- 1. Der Hylech ---- */
  const kandidaten = [];
  const sonne = r.planeten.sonne, mond = r.planeten.mond;
  if (r.tagGeburt) {
    kandidaten.push({ art:"Sonne", lon:sonne.laenge, haus:sonne.haus, taugt:LEBENSORTE.includes(sonne.haus) });
    kandidaten.push({ art:"Mond",  lon:mond.laenge,  haus:mond.haus,  taugt:LEBENSORTE.includes(mond.haus) });
  } else {
    kandidaten.push({ art:"Mond",  lon:mond.laenge,  haus:mond.haus,  taugt:LEBENSORTE.includes(mond.haus) });
    kandidaten.push({ art:"Sonne", lon:sonne.laenge, haus:sonne.haus, taugt:LEBENSORTE.includes(sonne.haus) });
  }
  const syz = letzteSyzygie(jd);
  kandidaten.push({ art: syz.konjunktion ? "Syzygie (Neumond)" : "Syzygie (Vollmond)",
                    lon: syz.laenge, haus: hausVon(syz.laenge),
                    taugt: LEBENSORTE.includes(hausVon(syz.laenge)) });
  kandidaten.push({ art:"Aszendent", lon:r.asc, haus:1, taugt:true });

  const hylech = kandidaten.find(k => k.taugt) || kandidaten[kandidaten.length - 1];
  const hZeichen = Math.floor(norm360(hylech.lon) / 30);
  const hGrad = norm360(hylech.lon) - hZeichen * 30;

  /* ---- 2. Der Alkochoden: die meiste Würde über diesem Grad ---- */
  const punkte = wuerden(hZeichen, hGrad, r.tagGeburt);
  /* Er muss den Hylech auch sehen — sonst gilt er der Überlieferung nach nicht. */
  const sichtbar = {};
  REIHE.forEach(k => {
    const pl = r.planeten[k];
    sichtbar[k] = pl ? sieht(hZeichen, pl.zeichen) : null;
  });
  const geordnet = REIHE
    .map(k => ({ key:k, punkte: punkte[k] ? punkte[k].total : 0, sicht: sichtbar[k] }))
    .sort((a, b) => b.punkte - a.punkte);
  const mitSicht = geordnet.filter(x => x.punkte > 0 && x.sicht);
  const alkochoden = (mitSicht[0] || geordnet[0]).key;
  const alkoSahHylech = !!sichtbar[alkochoden];
  const ap = r.planeten[alkochoden];

  /* ---- 3. Die Jahre, je nach seinem Stand ---- */
  const haus = ap ? ap.haus : 1;
  const stufe = WINKELHAUS.includes(haus) ? "gross"
              : FOLGEHAUS.includes(haus)  ? "mittel" : "klein";
  const grund = JAHRE[alkochoden][stufe];

  /* Zu- und Abschläge: ein Wohltäter, der ihn sieht, legt zu; ein Übeltäter
     nimmt. Gezählt wird in Zwölfteln seiner kleinsten Jahre. */
  const zuschlaege = [];
  const zwoelftel = JAHRE[alkochoden].klein / 12;
  REIHE.forEach(k => {
    if (k === alkochoden || !r.planeten[k] || !ap) return;
    const s = sieht(ap.zeichen, r.planeten[k].zeichen);
    if (!s) return;
    const gut = (k === "jupiter" || k === "venus");
    const boese = (k === "saturn" || k === "mars");
    if (!gut && !boese) return;
    const stark = (s === "Konjunktion" || s === "Trigon" || s === "Sextil") ? 2 : 1;
    const wert = (gut ? 1 : -1) * stark * zwoelftel;
    zuschlaege.push({ key:k, aspekt:s, wert });
  });
  const summe = zuschlaege.reduce((a, x) => a + x.wert, 0);

  return {
    profil: p, radix: r,
    kandidaten, hylech, hZeichen, hGrad,
    alkochoden, alkoSahHylech, alkoHaus: haus, alkoZeichen: ap ? ap.zeichen : null,
    wuerdeStufe: stufe, grundJahre: grund,
    zuschlaege, summe, gesamt: Math.max(0, grund + summe),
    jahreTabelle: JAHRE[alkochoden],
    punkte
  };
}

/* ========================================================== Darstellung */

const STUFE_WORT = {
  gross:  "in einem Winkelhaus — die stärkste Stellung, er gibt seine <b>größten</b> Jahre",
  mittel: "in einem Folgehaus — die mittlere Stellung, er gibt seine <b>mittleren</b> Jahre",
  klein:  "in einem fallenden Haus — die schwächste Stellung, er gibt seine <b>kleinsten</b> Jahre"
};
const komma = n => (Math.round(n * 10) / 10).toString().replace(".", ",");

function zeichne() {
  const ziel = $("#lmCikti");
  if (!ziel) return;
  const L = lebensmass();
  ziel.innerHTML = "";

  if (!L) {
    const w = el("p", "kucukNot", "Noch keine Geburtsangaben hinterlegt. ");
    const b = el("button", "knopfKlein", "Zur Dateneingabe");
    b.addEventListener("click", zurDateneingabe);
    w.appendChild(b);
    ziel.append(w); ziel.hidden = false;
    return;
  }
  ziel.hidden = false;
  ziel.appendChild(el("p", "kucukNot", "Für: " + profilBeschriftung(L.profil)));

  /* Die Warnung steht vor dem Ergebnis, nicht dahinter. */
  const warnung = el("div", "lmWarnung");
  warnung.innerHTML =
    `<b>Vorab, damit es nicht missverstanden wird:</b> Diese Technik teilt eine Zahl von Jahren ` +
    `zu — sie sagt nicht, wann jemand stirbt, und kann es nicht. Schon in der Überlieferung war ` +
    `sie die umstrittenste von allen: Ptolemaios, die Perser und die Araber rechneten verschieden, ` +
    `und dieselbe Geburt ergab bei ihnen verschiedene Zahlen. Gemeint ist ein Maß an ` +
    `Lebenskraft, das einer Anlage mitgegeben ist — nicht ein Datum.`;
  ziel.appendChild(warnung);

  /* 1. Der Hylech */
  ziel.appendChild(el("h3", null, "Erstens: der Hylech"));
  ziel.appendChild(el("p", null,
    "Gesucht wird die Stelle, von der das Leben ausgeht. Die Reihenfolge ist fest: bei einer " +
    "Taggeburt zuerst die Sonne, bei einer Nachtgeburt zuerst der Mond — aber nur, wenn das " +
    "Licht in einem der Örter des Lebens steht: im ersten, siebten, neunten, zehnten oder " +
    "elften Haus. Sonst rückt der nächste Anwärter nach."));

  const kutu = el("div", "tabloKutu");
  const tab = el("table", "wuerdeTablo hylechTablo");
  tab.innerHTML = "<thead><tr><th>Anwärter</th><th>Stellung</th><th>Haus</th><th>Ort des Lebens?</th></tr></thead>";
  const tb = el("tbody");
  L.kandidaten.forEach(k => {
    const z = Math.floor(norm360(k.lon) / 30);
    const tr = el("tr", k === L.hylech ? "sieger" : null);
    tr.appendChild(el("td", null, k.art));
    tr.appendChild(el("td", null, `${ZEICHEN[z].glyph} ${(norm360(k.lon) - z * 30).toFixed(1)}°`));
    tr.appendChild(el("td", null, `${k.haus}.`));
    tr.appendChild(el("td", k.taugt ? "treffer" : null, k.taugt ? "ja" : "nein"));
    tb.appendChild(tr);
  });
  tab.appendChild(tb); kutu.appendChild(tab);
  ziel.appendChild(kutu);

  const h = el("p");
  h.innerHTML = `Hylech ist damit <b>${L.hylech.art}</b>, auf ${ZEICHEN[L.hZeichen].glyph} ` +
    `${ZEICHEN[L.hZeichen].name} ${L.hGrad.toFixed(1)}°, im ${L.hylech.haus}. Haus.`;
  ziel.appendChild(h);

  /* 2. Der Alkochoden */
  ziel.appendChild(el("h3", null, "Zweitens: der Alkochoden"));
  ziel.appendChild(el("p", null,
    "Nun wird gefragt, wer über diesem Grad gebietet — wer dort die meiste Würde hat: " +
    "durch Domizil, Erhöhung, Trigon, Term oder Gesicht. Und er muss den Hylech sehen; " +
    "ein Planet, der ihn nicht erblickt, kann ihm auch nichts geben."));

  const kutu2 = el("div", "tabloKutu");
  const tab2 = el("table", "wuerdeTablo");
  tab2.innerHTML = "<thead><tr><th>Planet</th><th>Würde</th><th>sieht den Hylech</th></tr></thead>";
  const tb2 = el("tbody");
  REIHE.forEach(k => {
    const pl = L.radix.planeten[k];
    const s = pl ? ((d => ({0:"Konjunktion",2:"Sextil",3:"Quadrat",4:"Trigon",6:"Opposition",8:"Trigon",9:"Quadrat",10:"Sextil"})[d])(((pl.zeichen - L.hZeichen) % 12 + 12) % 12)) : null;
    const tr = el("tr", k === L.alkochoden ? "sieger" : null);
    tr.appendChild(el("td", null, `${PLANET[k].g} ${PLANET[k].name}`));
    tr.appendChild(el("td", L.punkte[k] && L.punkte[k].total ? "treffer" : null,
                      String(L.punkte[k] ? L.punkte[k].total : 0)));
    tr.appendChild(el("td", s ? "treffer" : null, s || "Abwendung"));
    tb2.appendChild(tr);
  });
  tab2.appendChild(tb2); kutu2.appendChild(tab2);
  ziel.appendChild(kutu2);

  const a = el("p");
  a.innerHTML = `Alkochoden ist <b>${mitArtikel(L.alkochoden)}</b>` +
    (L.alkoSahHylech ? ", und er sieht den Hylech." :
     " — er hat zwar die meiste Würde, sieht den Hylech aber nicht. Die strenge Lesart " +
     "lässt ihn dann nicht gelten; hier steht er trotzdem, damit die Rechnung sichtbar bleibt.");
  ziel.appendChild(a);

  /* 3. Die Jahre */
  ziel.appendChild(el("h3", null, "Drittens: die Jahre"));
  const j = el("p");
  j.innerHTML = `${mitArtikel(L.alkochoden).replace(/^./, c => c.toUpperCase())} steht im ` +
    `${L.alkoHaus}. Haus, ${STUFE_WORT[L.wuerdeStufe]}: <b>${komma(L.grundJahre)} Jahre</b>. ` +
    `(Seine Zahlen sind ${komma(L.jahreTabelle.gross)} / ${komma(L.jahreTabelle.mittel)} / ${komma(L.jahreTabelle.klein)}.)`;
  ziel.appendChild(j);

  if (L.zuschlaege.length) {
    ziel.appendChild(el("p", null,
      "Dazu die Zu- und Abschläge: Wohltäter, die den Alkochoden sehen, legen zu; Übeltäter nehmen."));
    const ul = el("ul", "deutungListe");
    L.zuschlaege.forEach(x => {
      const li = el("li");
      li.innerHTML = `${PLANET[x.key].g} ${PLANET[x.key].name}, ${x.aspekt}: ` +
        `<b>${x.wert > 0 ? "+" : "−"}${komma(Math.abs(x.wert))}</b> Jahre`;
      ul.appendChild(li);
    });
    ziel.appendChild(ul);
  } else {
    ziel.appendChild(el("p", "kucukNot",
      "Weder Wohltäter noch Übeltäter sehen den Alkochoden — es bleibt bei der Grundzahl."));
  }

  const kasten = el("div", "geistName");
  kasten.innerHTML =
    `<div class="kalanBaslik">Das zugeteilte Maß</div>` +
    `<div class="buyukToplam">${komma(L.gesamt)} Jahre</div>` +
    `<div class="kucukNot">${komma(L.grundJahre)} vom Alkochoden` +
    (L.summe ? `, ${L.summe > 0 ? "+" : "−"}${komma(Math.abs(L.summe))} aus den Aspekten` : "") +
    `</div>`;
  ziel.appendChild(kasten);

  const schluss = el("div", "schlussKasten");
  schluss.append(el("h3", null, "Wie das zu lesen ist"));
  schluss.appendChild(el("p", null,
    "Die Alten selbst haben diese Zahl nie für ein Datum gehalten. Sie nannten sie das Maß, " +
    "das der Anlage mitgegeben ist — und sie wussten, dass Lebensweise, Herkunft, Zeitläufte " +
    "und Zufall darüber entscheiden, was daraus wird. Ptolemaios rechnete anders als die " +
    "Perser, die Perser anders als die Araber, und dieselbe Geburt ergab bei ihnen " +
    "verschiedene Zahlen. Wer diese Technik ernst nimmt, nimmt zuerst ihre Uneinigkeit ernst."));
  schluss.appendChild(el("p", "schlussWort",
    "Was hier steht, ist eine historische Rechnung, kein Befund über dich. Es sagt nichts " +
    "über deine Gesundheit und nichts über deine Lebenszeit. Wer sich Sorgen um beides macht, " +
    "ist bei einem Arzt richtig und nicht bei einer Tafel aus dem neunten Jahrhundert."));
  ziel.appendChild(schluss);
}

$("#lmBerechnen")?.addEventListener("click", zeichne);
aufProfilAenderung(zeichne);
document.querySelector('nav#reiter button[data-bolum="bLebensmass"]')
  ?.addEventListener("click", () => setTimeout(zeichne, 0));
if (document.readyState === "complete") zeichne();
else window.addEventListener("load", zeichne);
