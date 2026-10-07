/* ------------------------------------------------------------------------
   punkte.js — die arabischen Punkte (partes, sahm, "lots").

   Sie heißen arabisch, sind aber älter: Schon Paulus Alexandrinus und
   der Liber Hermetis kennen sie. Ein Punkt entsteht immer gleich — man
   nimmt den Abstand zwischen zwei Stellen des Horoskops und trägt ihn
   vom Aufsteigenden aus noch einmal ab. Was dabei herauskommt, ist kein
   Himmelskörper, sondern eine rechnerische Stelle: ein Ort, an dem zwei
   Bedeutungen sich treffen.

   Fast alle kehren sich bei Nacht um. Das ist kein Kunstgriff, sondern
   der Kern der Sache: Der Glückspunkt misst den Abstand von der Sonne
   zum Mond — und bei Nacht führt der Mond, nicht die Sonne.

   Guido Bonatti führt im "Liber Astronomiae" siebenundneunzig davon auf.
   Hier stehen die sieben hermetischen, zu jedem Wandelstern einer, und
   dazu die, nach denen in der Praxis am häufigsten gefragt wurde.
   Der Punkt des Todes steht nicht dabei.
   ------------------------------------------------------------------------ */

import { radix, PLANET, ZEICHEN, HAUS, mitArtikel } from "./horoskop.js?v=256";
import { norm360 } from "./astro.js?v=256";
import { rt, setzeRestSprache } from "./rest-texte.js?v=256";
import { PUNKT_IT } from "./namen-it.js?v=256";
import { PUNKT_EN } from "./namen-en.js?v=256";
import { aktuelleSprache } from "./sprachen.js?v=256";
setzeRestSprache(aktuelleSprache());
window.addEventListener("sprache-geaendert", ev => setzeRestSprache(ev.detail));

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const DOMIZIL = ["mars","venus","merkur","mond","sonne","merkur",
                 "venus","mars","jupiter","saturn","saturn","jupiter"];

/* Jeder Punkt: von welcher Stelle zu welcher, und ob er sich bei Nacht
   umkehrt. Formel immer: Aszendent + a − b. */
export const PUNKTE = [
  { key:"fortuna", name:"Glück", lat:"Pars Fortunae", sternKey:"mond", dreht:true,
    a:"mond", b:"sonne",
    was:"Der Leib und das, was einem zufällt. Die älteste und am häufigsten gebrauchte " +
        "Stelle: wo das Glück von außen kommt, ohne dass man es sich erarbeitet hat." },
  { key:"geist", name:"Geist", lat:"Pars Spiritus", sternKey:"sonne", dreht:true,
    a:"sonne", b:"mond",
    was:"Der Gegenpunkt zum Glück. Was nicht zufällt, sondern aus einem selbst kommt — " +
        "Wille, Vorhaben, das Gewollte. Die Alten sagen: Fortuna ist, was dir geschieht, " +
        "Spiritus, was du tust." },
  { key:"liebe", name:"Liebe", lat:"Pars Amoris", sternKey:"venus", dreht:true,
    a:"$geist", b:"$fortuna",
    was:"Wo Zuneigung entsteht und worauf sie sich richtet — nicht die Ehe, sondern " +
        "das Mögen selbst, auch für Dinge und Künste." },
  { key:"not", name:"Notwendigkeit", lat:"Pars Necessitatis", sternKey:"merkur", dreht:true,
    a:"$fortuna", b:"$geist",
    was:"Wo man unter Zwang steht und keine Wahl hat. Die arabischen Autoren setzen " +
        "hier auch den Streit und die Schulden an." },
  { key:"sieg", name:"Sieg", lat:"Pars Victoriae", sternKey:"jupiter", dreht:true,
    a:"jupiter", b:"$geist",
    was:"Wo man durchkommt. Nicht Glück, sondern Gelingen gegen Widerstand — " +
        "und wo Vertrauen von anderen zurückkommt." },
  { key:"kuehn", name:"Kühnheit", lat:"Pars Audaciae", sternKey:"mars", dreht:true,
    a:"$fortuna", b:"mars",
    was:"Wo man wagt und wo man sich überhebt. Die Stelle des Muts und derselben " +
        "Stelle die Unvorsichtigkeit." },
  { key:"nemesis", name:"Vergeltung", lat:"Pars Nemesis", sternKey:"saturn", dreht:true,
    a:"saturn", b:"$fortuna",
    was:"Wo etwas zurückkommt, das man selbst in Gang gesetzt hat — im Guten wie im " +
        "Schlechten. Die Alten nennen hier auch das Verborgene und das Vergangene." },

  { key:"vater", name:"Vater", lat:"Pars Patris", sternKey:null, dreht:true,
    a:"sonne", b:"saturn",
    was:"Der Vater und was von ihm kommt: Herkunft, Name, Erbe im weiteren Sinn." },
  { key:"mutter", name:"Mutter", lat:"Pars Matris", sternKey:null, dreht:true,
    a:"mond", b:"venus",
    was:"Die Mutter und was von ihr kommt: Nahrung, Schutz, der erste Boden." },
  { key:"geschwister", name:"Geschwister", lat:"Pars Fratrum", sternKey:null, dreht:false,
    a:"saturn", b:"jupiter",
    was:"Geschwister und alle, die mit einem aufwachsen." },
  { key:"kinder", name:"Kinder", lat:"Pars Filiorum", sternKey:null, dreht:true,
    a:"jupiter", b:"saturn",
    was:"Kinder und alles Hervorgebrachte, das eigenes Leben bekommt." },
  { key:"ehe", name:"Ehe", lat:"Pars Matrimonii", sternKey:null, dreht:false,
    a:"venus", b:"saturn", frauUm:true,
    was:"Die Bindung und ihr Zustandekommen. Bonatti rechnet sie für Mann und Frau " +
        "verschieden — hier steht die Form, die zum eingetragenen Geschlecht passt." },
  { key:"glaube", name:"Glaube", lat:"Pars Fidei", sternKey:null, dreht:false,
    a:"merkur", b:"mond",
    was:"Woran man ohne Beweis festhält — Religion, Überzeugung, Vertrauen in eine Lehre." },
  { key:"reise", name:"Reise", lat:"Pars Peregrinationis", sternKey:null, dreht:false,
    a:"$fortuna", b:"saturn",
    was:"Das Fortgehen und die Fremde: wo einen das Weggehen hinführt." }
];

/* Name und Beschreibung jedes Punktes hängen an der Sprache. */
function punktText(p, sprache) {
  const TAFELN = { it: PUNKT_IT, en: PUNKT_EN };
  const q = (TAFELN[sprache] || {})[p.key] || null;
  return { name: q ? q.name : p.name, was: q ? q.was : p.was };
}

export function arabischePunkte() {
  const r = radix();
  if (!r) return null;
  const sprache = aktuelleSprache();
  const tag = r.tagGeburt;
  const lon = k => {
    if (k === "asc") return r.asc;
    const pl = r.planeten[k];
    return pl ? pl.laenge : 0;
  };

  const fertig = {};
  const liste = [];
  const weiblich = (r.profil.geschlecht || "").toLowerCase().startsWith("w");

  PUNKTE.forEach(p => {
    const hol = s => s.startsWith("$") ? fertig[s.slice(1)] : lon(s);
    let a = p.a, b = p.b;
    /* Der Ehepunkt wird für Frauen umgekehrt gerechnet. */
    if (p.frauUm && weiblich) { const h = a; a = b; b = h; }
    /* Bei Nacht kehren sich die meisten um. */
    if (p.dreht && !tag) { const h = a; a = b; b = h; }

    const wert = norm360(r.asc + hol(a) - hol(b));
    fertig[p.key] = wert;
    const z = Math.floor(wert / 30);
    const haus = ((z - r.ascZeichen + 12) % 12) + 1;
    liste.push({ ...p, ...punktText(p, sprache),
                 laenge: wert, zeichen: z, grad: wert - z * 30, haus,
                 herr: DOMIZIL[z], herrStand: r.planeten[DOMIZIL[z]] || null,
                 gedreht: p.dreht && !tag });
  });

  return { liste, tag, radix: r, weiblich };
}

/* ====================================================================== */

function zeichne() {
  const ziel = $("#apCikti");
  if (!ziel) return;
  const d = arabischePunkte();
  ziel.innerHTML = ""; ziel.hidden = false;
  if (!d) {
    ziel.appendChild(el("p", "kucukNot", rt("fehlt.geburt")));
    return;
  }

  ziel.appendChild(el("p", "kucukNot", rt(d.tag ? "pkt.tag" : "pkt.nacht")));

  const gruppen = [
    [rt("pkt.gruppe1"), ["fortuna","geist","liebe","not","sieg","kuehn","nemesis"]],
    [rt("pkt.gruppe2"), ["vater","mutter","geschwister","kinder","ehe","glaube","reise"]]
  ];

  gruppen.forEach(([titel, keys]) => {
    ziel.appendChild(el("h3", null, titel));
    keys.forEach(k => {
      const p = d.liste.find(x => x.key === k);
      if (!p) return;
      const karte = el("div", "apKarte");
      const kopf = el("div", "apKopf");
      kopf.appendChild(el("span", "apName", p.name));
      kopf.appendChild(el("span", "apOrt",
        `${ZEICHEN[p.zeichen].glyph} ${p.grad.toFixed(1)}° · ${rt("pkt.feld", p.haus)}`));
      karte.appendChild(kopf);
      karte.appendChild(el("div", "apLat",
        p.lat + (p.sternKey ? ` · ${PLANET[p.sternKey].name}` : "") + (p.gedreht ? " · " + rt("pkt.gedreht") : "")));
      const t = el("p");
      t.innerHTML = rt("pkt.satz", p.was, HAUS[p.haus - 1], mitArtikel(PLANET[p.herr].name),
        p.herrStand ? p.herrStand.haus : null,
        p.herrStand && p.herrStand.wuerde.stufe !== "—" ? `, ${p.herrStand.wuerde.text}` : "");
      karte.appendChild(t);
      ziel.appendChild(karte);
    });
  });

  ziel.appendChild(el("p", "kucukNot", rt("pkt.note")));
}


$("#apBerechnen")?.addEventListener("click", zeichne);
if ($("#apCikti")) {
  window.addEventListener("load", () => setTimeout(zeichne, 350));
  window.addEventListener("profil-geaendert", () => setTimeout(zeichne, 250));
}

window.addEventListener("sprache-geaendert", () => setTimeout(zeichne, 80));
