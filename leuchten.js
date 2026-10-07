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
import { leseProfil, aufProfilAenderung, profilBeschriftung, zurDateneingabe } from "./profil.js?v=261";
import { radix, PLANET, mitArtikel, ZEICHEN } from "./horoskop.js?v=261";
import { firdaria, vimshottari } from "./perioden.js?v=261";
import { zrStand } from "./zr.js?v=261";

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

  /* Jedes System hat einen großen Herrn und einen kleineren darin. Der
     große gibt die Farbe, der kleinere den Unterton — die Überlieferung
     sagt überall dasselbe: das Thema vom großen, der Ton vom kleinen. */
  const zs = zrStand(alter);
  if (zs && zs.L1) {
    const k = NAME_ZU_KEY[blank(zs.L1.herrscher)];
    const u2 = zs.L2 ? NAME_ZU_KEY[blank(zs.L2.herrscher)] : null;
    const u3 = zs.L3 ? NAME_ZU_KEY[blank(zs.L3.herrscher)] : null;
    if (k) stimmen.push({ key:k, unterKey:u2, quelle:"Zodiacal Releasing",
      gross:`${zs.L1.glyph} ${zs.L1.zeichen}`,
      klein: zs.L2 ? `${zs.L2.glyph} ${zs.L2.zeichen}` + (zs.L3 ? ` › ${zs.L3.glyph} ${zs.L3.zeichen}` : "") : null,
      dritt: u3 });
  }

  if (grund) {
    /* Profektion: ein Zeichen im Jahr, und darin ein Zeichen im Monat. */
    const jahr = Math.floor(alter);
    const monat = Math.floor((alter - jahr) * 12);
    const zJahr = (grund.ascZeichen + jahr) % 12;
    const zMonat = (zJahr + monat) % 12;
    stimmen.push({ key:DOMIZIL[zJahr], unterKey:DOMIZIL[zMonat], quelle:"Profektion",
      gross:`${(jahr % 12) + 1}. Haus, ${ZEICHEN[zJahr].glyph} ${ZEICHEN[zJahr].name}`,
      klein:`Monat ${monat + 1}: ${ZEICHEN[zMonat].glyph} ${ZEICHEN[zMonat].name}` });

    const f = firdaria(alter, grund.tagGeburt);
    if (f.laufend && FARBE[f.laufend.key]) {
      const uk = f.laufendUnter && FARBE[f.laufendUnter.key] ? f.laufendUnter.key : null;
      stimmen.push({ key:f.laufend.key, unterKey:uk, quelle:"Firdaria",
        gross:`${komma(f.laufend.anfang)}–${komma(f.laufend.ende)} J.`,
        klein: f.laufendUnter ? `${f.laufendUnter.name} bis ${komma(f.laufendUnter.ende)} J.` : null });
    } else if (!f.laufend) {
      stimmen.push({ key:null, unterKey:null, quelle:"Firdaria", gross:"nach 75 Jahren zu Ende", klein:null });
    }

    const v = vimshottari(grund.mondLaenge, grund.jahr, alter);
    if (v.laufend && FARBE[v.laufend.key]) {
      const uk = v.laufendUnter && FARBE[v.laufendUnter.key] ? v.laufendUnter.key : null;
      stimmen.push({ key:v.laufend.key, unterKey:uk, quelle:"Vimshottari",
        gross:`${v.laufend.name} (Mahadasha)`,
        klein: v.laufendUnter ? `${v.laufendUnter.name} (Antardasha)` : null });
    }
  }

  const zaehle = feld => {
    const z = {};
    stimmen.forEach(st => { const k = st[feld]; if (k) z[k] = (z[k] || 0) + 1; });
    return Object.entries(z).sort((a, b) => b[1] - a[1]);
  };
  const gross = zaehle("key"), klein = zaehle("unterKey");

  return {
    stimmen,
    herr: gross.length ? gross[0][0] : null,
    einigkeit: gross.length ? gross[0][1] : 0,
    unterHerr: klein.length ? klein[0][0] : null,
    unterEinigkeit: klein.length ? klein[0][1] : 0,
    verteilung: gross
  };
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
  const { stimmen, herr, einigkeit, unterHerr, unterEinigkeit } = stimmenBei(alter, grund);
  const aura = $("#lhAura"), kern = $("#lhKern"), ablesung = $("#lhAblesung"), chips = $("#lhStimmen");
  if (!aura) return;

  const farbe = herr ? FARBE[herr] : "#8b8471";
  const staerke = Math.min(einigkeit, 4);
  const deckung = 0.24 + staerke * 0.16;
  const weite = 32 + staerke * 9;

  aura.style.background =
    `radial-gradient(ellipse ${weite}% ${weite + 14}% at 50% 46%, ` +
    `${farbe}${Math.round(deckung * 255).toString(16).padStart(2, "0")} 0%, ` +
    `${farbe}3a 44%, transparent 74%)`;
  aura.style.setProperty("--puls", (2.6 - staerke * 0.25) + "s");

  /* Der Unterton sitzt als engerer Kern darin — wo die kleineren Perioden
     sich einig sind, glimmt eine zweite Farbe im Innern. */
  if (kern) {
    if (unterHerr && unterHerr !== herr) {
      const uf = FARBE[unterHerr];
      const ud = 0.14 + Math.min(unterEinigkeit, 4) * 0.08;
      kern.style.background =
        `radial-gradient(ellipse 17% 26% at 50% 44%, ` +
        `${uf}${Math.round(ud * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`;
    } else {
      kern.style.background = "none";
    }
  }

  const jahre = Math.floor(alter);
  const monate = Math.round((alter - jahre) * 12);
  ablesung.innerHTML =
    `<span class="lhAlter">${jahre} Jahre${monate ? `, ${monate} Monate` : ""}</span>` +
    (herr ? ` <span class="lhHerr" style="color:${farbe}">${stern(herr)} ${nenne(herr)}</span>` : "") +
    (unterHerr && unterHerr !== herr
      ? `<span class="lhUnterton">Unterton <span style="color:${FARBE[unterHerr]}">${stern(unterHerr)} ${nenne(unterHerr)}</span></span>`
      : "") +
    (einigkeit > 1 ? `<span class="lhEinig">${einigkeit} von ${stimmen.filter(x => x.key).length} Systemen</span>`
                   : `<span class="lhEinig">kein Übergewicht</span>`);

  chips.innerHTML = "";
  stimmen.forEach(st => {
    const c = el("div", "lhChip");
    c.style.borderColor = st.key ? FARBE[st.key] : "var(--linie)";
    c.innerHTML =
      `<span class="lhChipStern" style="color:${st.key ? FARBE[st.key] : "var(--gedaempft)"}">${st.key ? stern(st.key) : "·"}</span>` +
      `<span class="lhChipQuelle">${st.quelle}</span>` +
      `<span class="lhChipSagt">${st.gross}</span>` +
      (st.klein
        ? `<span class="lhChipUnter">` +
          (st.unterKey ? `<span style="color:${FARBE[st.unterKey]}">${stern(st.unterKey)}</span> ` : "") +
          `${st.klein}</span>`
        : "");
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
    `<div class="lhAura" id="lhAura"></div>` +
    `<div class="lhKern" id="lhKern"></div>`;
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
