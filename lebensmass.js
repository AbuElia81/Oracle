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
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=253";
import { norm360, planetenPositionen, julianischesDatum, sonnenLaenge } from "./astro.js?v=253";
import { radix, PLANET, REIHE, ZEICHEN, HAUS, mitArtikel } from "./horoskop.js?v=253";
import { wuerden, ermittleAlmuten } from "./geist.js?v=253";
import { rt, zahl, aspektName, setzeRestSprache } from "./rest-texte.js?v=253";
import { aktuelleSprache } from "./sprachen.js?v=253";
setzeRestSprache(aktuelleSprache());

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
    kandidaten.push({ key:"sonne", lon:sonne.laenge, haus:sonne.haus, taugt:LEBENSORTE.includes(sonne.haus) });
    kandidaten.push({ key:"mond",  lon:mond.laenge,  haus:mond.haus,  taugt:LEBENSORTE.includes(mond.haus) });
  } else {
    kandidaten.push({ key:"mond",  lon:mond.laenge,  haus:mond.haus,  taugt:LEBENSORTE.includes(mond.haus) });
    kandidaten.push({ key:"sonne", lon:sonne.laenge, haus:sonne.haus, taugt:LEBENSORTE.includes(sonne.haus) });
  }
  const syz = letzteSyzygie(jd);
  kandidaten.push({ key: syz.konjunktion ? "neumond" : "vollmond",
                    lon: syz.laenge, haus: hausVon(syz.laenge),
                    taugt: LEBENSORTE.includes(hausVon(syz.laenge)) });
  kandidaten.push({ key:"asc", lon:r.asc, haus:1, taugt:true });

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

/* Die Stufenwörter und das Dezimalzeichen stehen in der Sprachtafel. */
const komma = zahl;

function zeichne() {
  const ziel = $("#lmCikti");
  if (!ziel) return;
  const L = lebensmass();
  ziel.innerHTML = "";

  if (!L) {
    const w = el("p", "kucukNot", rt("keineAngaben"));
    const b = el("button", "knopfKlein", rt("zurEingabe"));
    b.addEventListener("click", zurDateneingabe);
    w.appendChild(b);
    ziel.append(w); ziel.hidden = false;
    return;
  }
  ziel.hidden = false;
  ziel.appendChild(el("p", "kucukNot", rt("fuer") + profilBeschriftung(L.profil)));

  /* Die Warnung steht vor dem Ergebnis, nicht dahinter. */
  const warnung = el("div", "lmWarnung");
  warnung.innerHTML = rt("lm.warnung");
  ziel.appendChild(warnung);

  /* 1. Der Hylech */
  ziel.appendChild(el("h3", null, rt("lm.erstens")));
  ziel.appendChild(el("p", null, rt("lm.erstensText")));

  const kutu = el("div", "tabloKutu");
  const tab = el("table", "wuerdeTablo hylechTablo");
  tab.innerHTML = `<thead><tr><th>${rt("lm.tab.anwaerter")}</th><th>${rt("lm.tab.stellung")}</th>` +
    `<th>${rt("lm.tab.haus")}</th><th>${rt("lm.tab.ort")}</th></tr></thead>`;
  const tb = el("tbody");
  L.kandidaten.forEach(k => {
    const z = Math.floor(norm360(k.lon) / 30);
    const tr = el("tr", k === L.hylech ? "sieger" : null);
    tr.appendChild(el("td", null, rt("lm.kandidat." + k.key)));
    tr.appendChild(el("td", null, `${ZEICHEN[z].glyph} ${(norm360(k.lon) - z * 30).toFixed(1)}°`));
    tr.appendChild(el("td", null, `${k.haus}.`));
    tr.appendChild(el("td", k.taugt ? "treffer" : null, rt(k.taugt ? "lm.ja" : "lm.nein")));
    tb.appendChild(tr);
  });
  tab.appendChild(tb); kutu.appendChild(tab);
  ziel.appendChild(kutu);

  const h = el("p");
  h.innerHTML = rt("lm.hylechIst", rt("lm.kandidat." + L.hylech.key),
    ZEICHEN[L.hZeichen].glyph, ZEICHEN[L.hZeichen].name, zahl(L.hGrad), L.hylech.haus);
  ziel.appendChild(h);

  /* 2. Der Alkochoden */
  ziel.appendChild(el("h3", null, rt("lm.zweitens")));
  ziel.appendChild(el("p", null,
    rt("lm.zweitensText")));

  const kutu2 = el("div", "tabloKutu");
  const tab2 = el("table", "wuerdeTablo");
  tab2.innerHTML = `<thead><tr><th>${rt("lm.tab.planet")}</th><th>${rt("lm.tab.wuerde")}</th>` +
    `<th>${rt("lm.tab.sieht")}</th></tr></thead>`;
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
  a.innerHTML = rt("lm.alkoIst", mitArtikel(L.alkochoden)) +
    rt(L.alkoSahHylech ? "lm.alkoSieht" : "lm.alkoSiehtNicht");
  ziel.appendChild(a);

  /* 3. Die Jahre */
  ziel.appendChild(el("h3", null, rt("lm.drittens")));
  const j = el("p");
  j.innerHTML = rt("lm.jahreSatz",
    mitArtikel(L.alkochoden).replace(/^./, c => c.toUpperCase()),
    L.alkoHaus, rt("lm.stufe." + L.wuerdeStufe), zahl(L.grundJahre),
    zahl(L.jahreTabelle.gross), zahl(L.jahreTabelle.mittel), zahl(L.jahreTabelle.klein));
  ziel.appendChild(j);

  if (L.zuschlaege.length) {
    ziel.appendChild(el("p", null,
      rt("lm.zuschlaege")));
    const ul = el("ul", "deutungListe");
    L.zuschlaege.forEach(x => {
      const li = el("li");
      li.innerHTML = rt("lm.zuschlagZeile",
        `${PLANET[x.key].g} ${PLANET[x.key].name}`, aspektName(x.aspekt),
        x.wert > 0 ? "+" : "−", zahl(Math.abs(x.wert)));
      ul.appendChild(li);
    });
    ziel.appendChild(ul);
  } else {
    ziel.appendChild(el("p", "kucukNot",
      rt("lm.keineZuschlaege")));
  }

  const kasten = el("div", "geistName");
  kasten.innerHTML =
    `<div class="kalanBaslik">${rt("lm.masz")}</div>` +
    `<div class="buyukToplam">${rt("lm.jahre", zahl(L.gesamt))}</div>` +
    `<div class="kucukNot">${rt("lm.herkunft", zahl(L.grundJahre),
       L.summe ? `${L.summe > 0 ? "+" : "−"}${zahl(Math.abs(L.summe))}` : null)}</div>`;
  ziel.appendChild(kasten);

  const schluss = el("div", "schlussKasten");
  schluss.append(el("h3", null, rt("lm.wieLesen")));
  schluss.appendChild(el("p", null, rt("lm.wieLesenText")));
  schluss.appendChild(el("p", "schlussWort", rt("lm.schlusswort")));
  ziel.appendChild(schluss);
}

/* Beim Sprachwechsel neu schreiben: Die Sätze stehen in der Tafel, aber
   das Gezeichnete steht schon im Baum. */
window.addEventListener("sprache-geaendert", ev => {
  setzeRestSprache(ev.detail);
  setTimeout(zeichne, 0);
});

$("#lmBerechnen")?.addEventListener("click", zeichne);
aufProfilAenderung(zeichne);
document.querySelector('nav#reiter button[data-bolum="bLebensmass"]')
  ?.addEventListener("click", () => setTimeout(zeichne, 0));
if (document.readyState === "complete") zeichne();
else window.addEventListener("load", zeichne);
