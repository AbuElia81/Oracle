/* ------------------------------------------------------------------------
   leuchten.js — ein Leben, vor- und zurückgespult.

   Vier Zeitherrscher-Systeme laufen nebeneinander her: Zodiacal Releasing,
   die Profektion, die persische Firdaria und die indische Vimshottari.
   Jedes nennt zu jedem Alter einen Herrn. Dieser Abschnitt legt sie
   übereinander und zeigt, worauf sie gemeinsam zeigen — als Farbe und
   Stärke eines Leuchtens um eine Gestalt, über die man die Zeitleiste
   zieht. Wo viele dasselbe sagen, brennt es hell; wo jedes etwas anderes
   sagt, bleibt es matt und vielfarbig.
   --------------------------------------------------------------------- */
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=85";
import { radix, PLANET, mitArtikel, ZEICHEN } from "./horoskop.js?v=85";
import { firdaria, vimshottari } from "./perioden.js?v=85";
import { zrStand } from "./zr.js?v=85";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const FARBE = {
  sonne:"#e7c65c", mond:"#cfd6e6", merkur:"#9fbfa8", venus:"#e0a6c2",
  mars:"#c96a4a", jupiter:"#7fa6d6", saturn:"#8b8471",
  /* Die Mondknoten führen in beiden Systemen eigene Perioden — sie sind
     keine Wandelsterne, aber sie sind Herren der Zeit und gehören dazu. */
  kopf:"#9b8bc4", schwanz:"#7d6f66", rahu:"#9b8bc4", ketu:"#7d6f66"
};
const ZEICHENSATZ = {
  kopf:{ g:"☊", name:"der aufsteigende Knoten" },
  schwanz:{ g:"☋", name:"der absteigende Knoten" },
  rahu:{ g:"☊", name:"Rahu" },
  ketu:{ g:"☋", name:"Ketu" }
};
const stern = k => ZEICHENSATZ[k] ? ZEICHENSATZ[k].g : (PLANET[k] ? PLANET[k].g : "·");
const nenne = k => ZEICHENSATZ[k] ? ZEICHENSATZ[k].name : mitArtikel(k);
const DOMIZIL = ["mars","venus","merkur","mond","sonne","merkur",
                 "venus","mars","jupiter","saturn","saturn","jupiter"];
const NAME_ZU_KEY = { Sonne:"sonne", Mond:"mond", Merkur:"merkur", Venus:"venus",
                      Mars:"mars", Jupiter:"jupiter", Saturn:"saturn" };
const blank = t => String(t || "").replace(/[^A-Za-zÄÖÜäöüß]/g, "").trim();
const komma = n => n.toFixed(1).replace(".", ",");

/* Wer spricht bei diesem Alter — und was sagt er? */
export function stimmenBei(alter, grund) {
  const stimmen = [];

  const zs = zrStand(alter);
  if (zs && zs.L1) {
    const k = NAME_ZU_KEY[blank(zs.L1.herrscher)];
    if (k) stimmen.push({ key:k, quelle:"Zodiacal Releasing",
      sagt:`${zs.L1.glyph} ${zs.L1.zeichen}` + (zs.L2 ? ` · ${zs.L2.glyph} ${zs.L2.zeichen}` : "") });
  }

  if (grund) {
    const jahr = Math.floor(alter);
    const zeichen = (grund.ascZeichen + jahr) % 12;
    const k = DOMIZIL[zeichen];
    stimmen.push({ key:k, quelle:"Profektion",
      sagt:`${(jahr % 12) + 1}. Haus, ${ZEICHEN[zeichen].glyph} ${ZEICHEN[zeichen].name}` });

    const f = firdaria(alter, grund.tagGeburt);
    if (f.laufend && FARBE[f.laufend.key]) stimmen.push({ key:f.laufend.key, quelle:"Firdaria",
      sagt:`${komma(f.laufend.anfang)}–${komma(f.laufend.ende)} J.` +
           (f.laufendUnter ? ` · ${f.laufendUnter.name}` : "") });
    else if (!f.laufend) stimmen.push({ key:null, quelle:"Firdaria", sagt:"nach 75 Jahren zu Ende" });

    const v = vimshottari(grund.mondLaenge, grund.jahr, alter);
    if (v.laufend && FARBE[v.laufend.key]) stimmen.push({ key:v.laufend.key, quelle:"Vimshottari",
      sagt:`${v.laufend.name}` + (v.laufendUnter ? ` · ${v.laufendUnter.name}` : "") });
  }

  const zaehlung = {};
  stimmen.forEach(st => { if (st.key) zaehlung[st.key] = (zaehlung[st.key] || 0) + 1; });
  const sortiert = Object.entries(zaehlung).sort((a, b) => b[1] - a[1]);
  const herr = sortiert.length ? sortiert[0][0] : null;
  const einigkeit = sortiert.length ? sortiert[0][1] : 0;

  return { stimmen, herr, einigkeit, verteilung: sortiert };
}

/* ---------------------------------------------------------- Darstellung */
let grund = null, maxAlter = 90;

function sammleGrund() {
  const r = radix();
  if (!r) return null;
  const p = r.profil;
  const [j, m] = p.datum.split("-").map(Number);
  return {
    profil: p, ascZeichen: r.ascZeichen, tagGeburt: r.tagGeburt,
    mondLaenge: r.planeten.mond ? r.planeten.mond.laenge : 0,
    jahr: j + (m - 1) / 12,
    heute: (Date.now() - new Date(p.datum).getTime()) / (365.2425 * 864e5)
  };
}

function male(alter) {
  const { stimmen, herr, einigkeit } = stimmenBei(alter, grund);
  const aura = $("#lhAura"), ablesung = $("#lhAblesung"), chips = $("#lhStimmen");
  if (!aura) return;

  const farbe = herr ? FARBE[herr] : "#8b8471";
  /* Je einiger sich die Systeme sind, desto heller und weiter das Leuchten. */
  const staerke = Math.min(einigkeit, 4);
  const deckung = 0.24 + staerke * 0.16;
  const weite = 32 + staerke * 9;

  aura.style.background =
    `radial-gradient(ellipse ${weite}% ${weite + 14}% at 50% 46%, ` +
    `${farbe}${Math.round(deckung * 255).toString(16).padStart(2, "0")} 0%, ` +
    `${farbe}3a 44%, transparent 74%)`;
  aura.style.setProperty("--puls", (2.6 - staerke * 0.25) + "s");

  const jahre = Math.floor(alter);
  const monate = Math.round((alter - jahre) * 12);
  ablesung.innerHTML =
    `<span class="lhAlter">${jahre} Jahre${monate ? `, ${monate} Monate` : ""}</span>` +
    (herr ? ` <span class="lhHerr" style="color:${farbe}">${stern(herr)} ${nenne(herr)}</span>` : "") +
    (einigkeit > 1 ? `<span class="lhEinig">${einigkeit} von ${stimmen.filter(x => x.key).length} Systemen</span>`
                   : `<span class="lhEinig">kein Übergewicht</span>`);

  chips.innerHTML = "";
  stimmen.forEach(st => {
    const c = el("div", "lhChip");
    c.style.borderColor = st.key ? FARBE[st.key] : "var(--linie)";
    c.innerHTML = `<span class="lhChipStern" style="color:${FARBE[st.key]}">${stern(st.key)}</span>` +
      `<span class="lhChipQuelle">${st.quelle}</span>` +
      `<span class="lhChipSagt">${st.sagt}</span>`;
    chips.appendChild(c);
  });
}

function zeichne() {
  const ziel = $("#lhCikti");
  if (!ziel) return;
  grund = sammleGrund();
  ziel.innerHTML = "";

  if (!grund) {
    const w = el("p", "kucukNot", "Noch keine Geburtsangaben hinterlegt. ");
    const b = el("button", "knopfKlein", "Zur Dateneingabe");
    b.addEventListener("click", zurDateneingabe);
    w.appendChild(b);
    ziel.append(w);
    ziel.hidden = false;
    return;
  }
  ziel.hidden = false;
  ziel.appendChild(el("p", "kucukNot", "Für: " + profilBeschriftung(grund.profil)));

  const buehne = el("div", "lhBuehne");
  /* Die Gestalt liegt unten, das Leuchten darüber mit Schirm-Mischung:
     Schwarz bleibt schwarz, Farbe addiert sich als Licht. So legt sich die
     Aura um die Figur, statt sie zu verdecken. */
  buehne.innerHTML =
    `<img class="lhFigur" src="bilder/figur.jpg?v=1" alt="stehende Gestalt">` +
    `<div class="lhAura" id="lhAura"></div>`;
  ziel.appendChild(buehne);

  const ablesung = el("div", "lhAblesung"); ablesung.id = "lhAblesung";
  ziel.appendChild(ablesung);

  const leiste = el("div", "lhLeiste");
  const schieber = el("input");
  schieber.type = "range"; schieber.id = "lhSchieber";
  schieber.min = "0"; schieber.max = String(maxAlter); schieber.step = "0.25";
  schieber.value = String(Math.min(grund.heute, maxAlter));
  schieber.setAttribute("aria-label", "Alter");
  const jetzt = el("button", "knopfKlein", "Jetzt");
  jetzt.addEventListener("click", () => {
    schieber.value = String(Math.min(grund.heute, maxAlter));
    male(parseFloat(schieber.value));
  });
  leiste.append(schieber, jetzt);
  ziel.appendChild(leiste);

  const marken = el("div", "lhMarken");
  for (let a = 0; a <= maxAlter; a += 10) marken.appendChild(el("span", null, String(a)));
  ziel.appendChild(marken);

  const chips = el("div", "lhStimmen"); chips.id = "lhStimmen";
  ziel.appendChild(chips);

  ziel.appendChild(el("p", "kucukNot",
    "Die Farbe ist der Herr, auf den die meisten Systeme gerade zeigen; Helligkeit und " +
    "Weite sagen, wie einig sie sich sind. Vier Stimmen in derselben Farbe heißen: eine " +
    "Zeit mit einem klaren Thema. Vier verschiedene Farben heißen: eine Zeit, in der " +
    "mehreres nebeneinander läuft — das ist keine schwächere Aussage, nur eine andere."));

  schieber.addEventListener("input", () => male(parseFloat(schieber.value)));
  male(parseFloat(schieber.value));
}

$("#lhBerechnen")?.addEventListener("click", zeichne);
aufProfilAenderung(zeichne);
document.querySelector('nav#reiter button[data-bolum="bLeuchten"]')
  ?.addEventListener("click", () => setTimeout(zeichne, 0));
if (document.readyState === "complete") zeichne();
else window.addEventListener("load", zeichne);
