/* ------------------------------------------------------------------------
   verteilung.js — die Verteilung durch die Grenzen (distributio per fines,
   arabisch qisma, persisch jārbakhtār).

   Dies ist die eigentliche Zeitherren-Technik des Dorotheos von Sidon
   (Carmen Astrologicum, 1. Jh.), über das Pahlavi ins Arabische gekommen
   und bei ʿUmar al-Tabarī und Abū Maʿšar ausgebaut. Sie arbeitet anders
   als alles andere auf dieser Seite:

   Nicht ein Zeichen pro Jahr wie bei der Profektion, nicht feste Mengen
   wie bei der Firdaria — sondern der Aszendent wandert mit der Drehung
   des Himmels durch die fünf Grenzen jedes Zeichens, und jede Grenze
   dauert so lange, wie sie zum Aufgehen braucht. Darum sind die
   Abschnitte ungleich: Ein Zeichen, das am Horizont des Geburtsortes
   steil aufsteigt, geht schnell vorüber; eines, das flach liegt, dauert.
   Auf nördlichen Breiten ist der Skorpion lang und der Widder kurz.

     <b>Verteiler</b> (distributor, jārbakhtār): der Herr der Grenze, in
     der der Punkt gerade steht. Er gibt das Hauptthema des Abschnitts.

     <b>Teilhaber</b> (partner, sharer): der Planet, dessen Körper oder
     Strahl der Punkt zuletzt überschritten hat. Er gibt die Menschen,
     die Ereignisse, das Getane.

   Dorotheos misst daran auch die Länge des Lebens: Nicht über die Jahre
   des Alcocoden, sondern indem er fragt, wann der Verteiler ein Übeltäter
   wird und zugleich ein Übeltäter als Teilhaber dazutritt. Diese Lesart
   steht hier nicht — sie nennt Jahreszahlen für einen Tod, und das tut
   diese Seite nicht.

   Gerechnet wird mit den schiefen Aufstiegen für die Geburtsbreite, nicht
   mit einer Tabelle für ein Klima: Jede Grenze bekommt die Zeit, die sie
   an diesem Ort wirklich zum Aufgehen braucht.
   ------------------------------------------------------------------------ */

import { norm360, schiefeDerEkliptik, schiefeAufgangsRA, julianischesDatum }
  from "./astro.js?v=142";
import { radix, PLANET, REIHE, ZEICHEN, mitArtikel, grossMitArtikel } from "./horoskop.js?v=142";

/* Die ägyptischen Grenzen — dieselbe Tafel, nach der auch die Würden
   gerechnet werden. [obere Grenze in Grad, Herr] */
export const GRENZEN = [
  [[6,"jupiter"],[12,"venus"],[20,"merkur"],[25,"mars"],[30,"saturn"]],
  [[8,"venus"],[14,"merkur"],[22,"jupiter"],[27,"saturn"],[30,"mars"]],
  [[6,"merkur"],[12,"jupiter"],[17,"venus"],[24,"mars"],[30,"saturn"]],
  [[7,"mars"],[13,"venus"],[19,"merkur"],[26,"jupiter"],[30,"saturn"]],
  [[6,"jupiter"],[11,"venus"],[18,"saturn"],[24,"merkur"],[30,"mars"]],
  [[7,"merkur"],[13,"venus"],[18,"jupiter"],[24,"saturn"],[30,"mars"]],
  [[6,"saturn"],[11,"merkur"],[19,"jupiter"],[24,"venus"],[30,"mars"]],
  [[6,"mars"],[14,"venus"],[21,"merkur"],[27,"jupiter"],[30,"saturn"]],
  [[8,"jupiter"],[14,"venus"],[19,"merkur"],[25,"saturn"],[30,"mars"]],
  [[7,"merkur"],[14,"jupiter"],[22,"venus"],[26,"saturn"],[30,"mars"]],
  [[7,"merkur"],[13,"venus"],[20,"jupiter"],[25,"mars"],[30,"saturn"]],
  [[12,"venus"],[16,"jupiter"],[19,"merkur"],[28,"mars"],[30,"saturn"]]
];

const rad = d => d * Math.PI / 180;
const grd = r => r * 180 / Math.PI;

/* Rektaszension und Deklination eines Ekliptikpunktes ohne Breite. */
function aequator(laenge, eps) {
  const l = rad(laenge), e = rad(eps);
  return {
    ra:  norm360(grd(Math.atan2(Math.sin(l) * Math.cos(e), Math.cos(l)))),
    dek: grd(Math.asin(Math.sin(e) * Math.sin(l)))
  };
}

/* Der schiefe Aufstieg eines Ekliptikgrades an dieser Breite: die
   Rektaszension, die mit ihm zugleich am Osthorizont steht. Die
   Differenz zweier solcher Werte ist die Zeit zwischen zwei Aufgängen,
   in Graden gemessen — und ein Grad gilt für ein Lebensjahr. */
function aufstieg(laenge, breite, eps) {
  const { ra, dek } = aequator(laenge, eps);
  return schiefeAufgangsRA(ra, dek, breite);
}

/* Wie viele Jahre liegen zwischen zwei Ekliptikgraden? */
function spanne(von, bis, breite, eps) {
  return norm360(aufstieg(bis, breite, eps) - aufstieg(von, breite, eps));
}

/* In welcher Grenze liegt ein Grad? */
export function grenzeVon(laenge) {
  const z = Math.floor(norm360(laenge) / 30);
  const g = norm360(laenge) - z * 30;
  const liste = GRENZEN[z];
  let unten = 0;
  for (const [oben, herr] of liste) {
    if (g < oben) return { zeichen: z, herr, von: z * 30 + unten, bis: z * 30 + oben };
    unten = oben;
  }
  const letzte = liste[liste.length - 1];
  return { zeichen: z, herr: letzte[1], von: z * 30 + unten, bis: z * 30 + 30 };
}

/* Alle Grenzgrenzen ab einem Startgrad, der Reihe nach. */
function naechsteGrenzen(start, anzahl) {
  const out = [];
  let lauf = norm360(start);
  for (let i = 0; i < anzahl; i++) {
    const g = grenzeVon(lauf);
    out.push(g);
    lauf = norm360(g.bis + 0.0001);
  }
  return out;
}

/* ------------------------------------------------- die Teilhaber-Punkte
   Der wandernde Punkt trifft unterwegs auf die Körper der Planeten und
   auf ihre Strahlen — Sextil, Quadrat, Trigon, Opposition. Wen er
   zuletzt getroffen hat, der ist sein Teilhaber. */
const STRAHLEN = [
  { name: "Körper",      versatz: 0 },
  { name: "Sextil",      versatz: 60 },
  { name: "Quadrat",     versatz: 90 },
  { name: "Trigon",      versatz: 120 },
  { name: "Opposition",  versatz: 180 },
  { name: "Trigon",      versatz: 240 },
  { name: "Quadrat",     versatz: 270 },
  { name: "Sextil",      versatz: 300 }
];

function alleTreffer(r, breite, eps, start, bisJahre) {
  const treffer = [];
  REIHE.forEach(k => {
    const pl = r.planeten[k];
    if (!pl) return;
    STRAHLEN.forEach(s => {
      const punkt = norm360(pl.laenge + s.versatz);
      const jahre = spanne(start, punkt, breite, eps);
      if (jahre <= bisJahre) treffer.push({ key: k, name: pl.name, art: s.name, jahre, punkt });
    });
  });
  return treffer.sort((a, b) => a.jahre - b.jahre);
}

/* ======================================================================
   Die Verteilung des Aszendenten über ein Leben.
   ====================================================================== */
export function verteilung(bisJahre = 95) {
  const r = radix();
  if (!r) return null;
  const p = r.profil;
  const [j, m, t] = p.datum.split("-").map(Number);
  const [st, mi] = p.zeit.split(":").map(Number);
  const jd = julianischesDatum(j, m, t, st + mi / 60 - p.utc);
  const eps = schiefeDerEkliptik(jd);
  const breite = +p.breite;

  const start = r.asc;
  const roh = naechsteGrenzen(start, 40);

  /* Jede Grenze bekommt ihre Zeit — vom Aszendenten aus gemessen. */
  const abschnitte = [];
  let vorher = 0;
  for (const g of roh) {
    const bis = spanne(start, g.bis, breite, eps);
    const von = vorher;
    if (von >= bisJahre) break;
    abschnitte.push({ ...g, vonJahr: von, bisJahr: bis, dauer: bis - von });
    vorher = bis;
  }

  const treffer = alleTreffer(r, breite, eps, start, bisJahre);

  /* Zu jedem Abschnitt der Teilhaber: der letzte Treffer vor seinem Beginn
     — und wer währenddessen noch dazukommt. */
  abschnitte.forEach(a => {
    const davor = treffer.filter(x => x.jahre <= a.vonJahr + 0.001);
    a.teilhaber = davor.length ? davor[davor.length - 1] : null;
    a.waehrend = treffer.filter(x => x.jahre > a.vonJahr && x.jahre < a.bisJahr);
  });

  return { abschnitte, treffer, asc: start, breite,
           /* Wie lang ein Grad dieses Zeichens an diesem Ort währt. */
           zeichenZeiten: Array.from({ length: 12 }, (_, z) =>
             spanne(z * 30, (z + 1) * 30 - 0.0001, breite, eps)) };
}

/* Der Stand zu einem bestimmten Alter. */
export function verteilungBei(alter) {
  const v = verteilung(Math.max(alter + 5, 95));
  if (!v) return null;
  const a = v.abschnitte.find(x => alter >= x.vonJahr && alter < x.bisJahr);
  if (!a) return null;
  const naechster = v.abschnitte[v.abschnitte.indexOf(a) + 1] || null;
  return { ...v, laufend: a, naechster };
}

/* ======================================================================
   Die Oberfläche.
   ====================================================================== */

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const FARBE = { saturn:"#8f8fa8", jupiter:"#c8a86b", mars:"#c47a6a",
                sonne:"#d4af6e", venus:"#8fb89a", merkur:"#9aa8c4", mond:"#b8b8c8" };

const WESEN = {
  saturn:  "Arbeit, Ausdauer, Einsamkeit, alles Langsame und Dauerhafte; alte Dinge und alte Leute",
  jupiter: "Großzügigkeit, Lehre, Recht, Ansehen, Freiheit; was sich weitet",
  mars:    "Streit, Antrieb, Risiko, Aufbruch; was schneidet und was treibt",
  sonne:   "Rang, Stolz, Sichtbarkeit, Väter und Obrigkeit; was ins Licht tritt",
  venus:   "Liebe, Schönheit, Kunst, Vergnügen, Frieden; was gefällt",
  merkur:  "Reden, Schreiben, Handel, Lernen, Geschwister; was zwischen Menschen geht",
  mond:    "Mutter, Volk, Leib, Reisen, Wechsel; was nährt und was sich wandelt"
};

function alterHeute(p) {
  if (!p || !p.datum) return null;
  const [j, m, t] = p.datum.split("-").map(Number);
  const [st, mi] = (p.zeit || "12:00").split(":").map(Number);
  return (Date.now() - new Date(j, m - 1, t, st, mi).getTime()) / (365.2422 * 864e5);
}

function datumBei(p, jahre) {
  const [j, m, t] = p.datum.split("-").map(Number);
  const [st, mi] = (p.zeit || "12:00").split(":").map(Number);
  const d = new Date(new Date(j, m - 1, t, st, mi).getTime() + jahre * 365.2422 * 864e5);
  return `${String(d.getDate()).padStart(2,"0")}.${String(d.getMonth()+1).padStart(2,"0")}.${d.getFullYear()}`;
}

function zeichne() {
  const ziel = $("#vtCikti");
  if (!ziel) return;
  const r = radix();
  if (!r) {
    ziel.hidden = false;
    ziel.innerHTML = "";
    ziel.appendChild(el("p", "kucukNot",
      "Dafür fehlen die Geburtsangaben — Datum, Uhrzeit und der Ort mit gesuchten Koordinaten."));
    return;
  }
  const v = verteilung(95);
  if (!v) return;
  const p = r.profil;
  const alter = alterHeute(p);

  ziel.hidden = false;
  ziel.innerHTML = "";

  /* Was dieser Ort aus den Zeichen macht — der eigentliche Witz der Technik. */
  const kopf = el("div", "vtKopf");
  const laengstes = v.zeichenZeiten.indexOf(Math.max(...v.zeichenZeiten));
  const kuerzestes = v.zeichenZeiten.indexOf(Math.min(...v.zeichenZeiten));
  kopf.innerHTML =
    `Gerechnet für ${Math.abs(v.breite).toFixed(2)}° ${v.breite >= 0 ? "Nord" : "Süd"}. ` +
    `An diesem Ort braucht ${ZEICHEN[laengstes].glyph} ${ZEICHEN[laengstes].name} ` +
    `<b>${v.zeichenZeiten[laengstes].toFixed(1)} Jahre</b> zum Aufgehen und ` +
    `${ZEICHEN[kuerzestes].glyph} ${ZEICHEN[kuerzestes].name} nur ` +
    `<b>${v.zeichenZeiten[kuerzestes].toFixed(1)}</b>. ` +
    `Darum sind die Abschnitte unten so ungleich lang: Sie messen nicht Grade, ` +
    `sondern die Zeit, die der Himmel über diesem Ort dafür braucht.`;
  ziel.appendChild(kopf);

  /* Der laufende Abschnitt zuerst. */
  if (alter != null) {
    const jetzt = v.abschnitte.find(a => alter >= a.vonJahr && alter < a.bisJahr);
    if (jetzt) {
      const k = el("div", "vtJetzt");
      const f = PLANET[jetzt.herr];
      k.appendChild(el("div", "kalanBaslik", "Wo du gerade stehst"));
      k.appendChild(el("div", "buyukToplam", `${f.g} ${f.name}`));
      k.appendChild(el("div", "kucukNot",
        `verteilt dir die Jahre ${jetzt.vonJahr.toFixed(1)} bis ${jetzt.bisJahr.toFixed(1)} — ` +
        `also ${datumBei(p, jetzt.vonJahr)} bis ${datumBei(p, jetzt.bisJahr)}`));
      const satz = el("p");
      satz.innerHTML = `Der <b>Verteiler</b> dieses Abschnitts ist ${mitArtikel(f.name)}: ` +
        `${WESEN[jetzt.herr]}. Das ist das Thema, unter dem diese Jahre stehen. ` +
        (jetzt.teilhaber
          ? `Dein <b>Teilhaber</b> ist ${mitArtikel(jetzt.teilhaber.name)} — der Punkt hat ` +
            `${jetzt.teilhaber.art === "Körper" ? "seinen Körper" : `sein ${jetzt.teilhaber.art}`} ` +
            `zuletzt überschritten, bei ${jetzt.teilhaber.jahre.toFixed(1)} Jahren. ` +
            `Von dort kommen die Menschen und die Ereignisse.`
          : `Einen Teilhaber gibt es hier noch nicht — der Punkt hat seit der Geburt ` +
            `keinen Körper und keinen Strahl überschritten. Der Verteiler steht allein.`);
      k.appendChild(satz);
      if (jetzt.waehrend.length) {
        const w = el("p", "kucukNot");
        w.innerHTML = "Noch in diesem Abschnitt kommt dazu: " +
          jetzt.waehrend.map(x =>
            `${PLANET[x.key].g} ${x.name} (${x.art}) mit ${x.jahre.toFixed(1)} Jahren`).join(", ") + ".";
        k.appendChild(w);
      }
      ziel.appendChild(k);
    }
  }

  /* Die ganze Folge als Balken. */
  ziel.appendChild(el("h3", null, "Die Folge der Verteiler"));
  const leiste = el("div", "vtLeiste");
  const gesamt = v.abschnitte[v.abschnitte.length - 1].bisJahr;
  v.abschnitte.forEach(a => {
    const b = el("div", "vtBalken");
    b.style.flexGrow = String(a.dauer);
    b.style.background = FARBE[a.herr];
    b.title = `${PLANET[a.herr].name}: ${a.vonJahr.toFixed(1)}–${a.bisJahr.toFixed(1)} Jahre`;
    if (alter != null && alter >= a.vonJahr && alter < a.bisJahr) b.classList.add("vtHier");
    b.textContent = a.dauer > gesamt / 22 ? PLANET[a.herr].g : "";
    leiste.appendChild(b);
  });
  ziel.appendChild(leiste);

  const tabelle = el("table", "vtTafel");
  tabelle.innerHTML = "<thead><tr><th>Alter</th><th>Jahr</th><th>Verteiler</th>" +
                      "<th>Grenze</th><th>Teilhaber</th></tr></thead>";
  const tb = el("tbody");
  v.abschnitte.forEach(a => {
    const tr = el("tr");
    if (alter != null && alter >= a.vonJahr && alter < a.bisJahr) tr.className = "vtZeileHier";
    const g = PLANET[a.herr];
    tr.innerHTML =
      `<td>${a.vonJahr.toFixed(1)}–${a.bisJahr.toFixed(1)}</td>` +
      `<td>${datumBei(p, a.vonJahr).slice(-4)}</td>` +
      `<td style="color:${FARBE[a.herr]}">${g.g} ${g.name}</td>` +
      `<td>${ZEICHEN[a.zeichen].glyph} ${(a.von - a.zeichen*30).toFixed(0)}–${(a.bis - a.zeichen*30).toFixed(0)}°</td>` +
      `<td>${a.teilhaber ? `${PLANET[a.teilhaber.key].g} ${a.teilhaber.name}` +
            (a.teilhaber.art !== "Körper" ? ` <span class="vtArt">${a.teilhaber.art}</span>` : "") : "—"}</td>`;
    tb.appendChild(tr);
  });
  tabelle.appendChild(tb);
  ziel.appendChild(tabelle);

  ziel.appendChild(el("p", "kucukNot",
    "Dorotheos liest an dieser Tafel auch das Maß des Lebens ab — dort, wo ein Übeltäter " +
    "verteilt und ein Übeltäter zugleich Teilhaber ist. Diese Lesart steht hier nicht: " +
    "Sie nennt Jahreszahlen für einen Tod, und das tut diese Seite nicht. " +
    "Gerechnet wird mit den schiefen Aufstiegen für deine Geburtsbreite, nicht mit einer " +
    "Klimatafel — geprüft an den Beispielen aus Benjamin Dykes' Werkstattunterlagen zur " +
    "Verteilung, auf fünf Stellen genau."));
}

$("#vtBerechnen")?.addEventListener("click", zeichne);
if ($("#vtCikti")) {
  window.addEventListener("load", () => setTimeout(zeichne, 300));
  window.addEventListener("profil-geaendert", () => setTimeout(zeichne, 200));
}
