/* ------------------------------------------------------------------------
   zugang.js — zuerst der Weg, dann die Maske, dann die Abschnitte.

   Die Seite fragt als Erstes, was man befragen will. Das Orakel will
   Namen und eine Frage und kein Geburtsdatum; die Sterne wollen Stunde
   und Ort und keinen Mutternamen. Erst die Wahl entscheidet, welche
   Maske erscheint — und erst eine ausgefüllte Maske öffnet die Reiter
   des jeweiligen Weges.
   --------------------------------------------------------------------- */
import { leseProfilRoh, aufProfilAenderung } from "./profil.js?v=178";
import { t } from "./sprachen.js?v=178";

const HEIM = "bProfil";
const SPEICHER = "oracle-weg";
const zahl = x => !isNaN(parseFloat(x));

function lies() { try { return sessionStorage.getItem(SPEICHER) || ""; } catch (e) { return ""; } }
function schreib(w) {
  try { w ? sessionStorage.setItem(SPEICHER, w) : sessionStorage.removeItem(SPEICHER); } catch (e) {}
}

/* Jeder Weg hat sein eigenes Maß dafür, wann er genug weiß. */
function genug(weg, p) {
  if (!p) return false;
  if (weg === "orakel") return !!(p.name && p.anne);
  if (weg === "sterne") return !!(p.datum && p.zeit && zahl(p.breite) && zahl(p.laenge) && zahl(p.utc));
  return false;
}

function schalte() {
  const weg = lies();
  const p = leseProfilRoh();
  const bereit = genug(weg, p);

  const zeig = (id, an) => { const e = document.querySelector(id); if (e) e.hidden = !an; };
  zeig("#maskeRahmen", true);
  /* Steht schon alles da, bleibt die Maske zugeklappt — die Startseite
     soll die beiden Wege zeigen und sonst nichts. Fehlt noch etwas,
     steht sie offen, denn dann ist sie das Nächste, was zu tun ist. */
  /* Die Maske wird nur ein einziges Mal von selbst auf- oder zugeklappt:
     beim ersten Zeichnen, und danach nie wieder. Vorher klappte sie beim
     Tippen zu — das Profil speichert sich nach einer halben Sekunde von
     selbst, das löst dieses Schalten aus, und die Maske schloss sich dem
     Tippenden vor der Nase. Wer sie öffnet, soll sie offen behalten. */
  const rahmen = document.getElementById("maskeRahmen");
  if (rahmen && !rahmen.dataset.gestellt) {
    rahmen.dataset.gestellt = "1";
    rahmen.open = weg ? !bereit : !(p && (p.name || p.datum));
  }
  /* Die Angaben stehen jetzt vor der Wahl. Solange kein Weg gewählt ist,
     zeigt die Maske alles — die Zwischenüberschriften sagen ohnehin, was
     wofür gebraucht wird. Nach der Wahl bleibt nur das Nötige stehen. */
  zeig("#maskeGemein", true);
  zeig("#maskeOrakel", weg !== "sterne");
  zeig("#maskeSterne", weg !== "orakel");
  zeig("#speicherBlock", true);
  zeig("#torHinweis", !!weg && !bereit);

  /* Die Reiterleiste gehört zu den Abschnitten, nicht zum Anfang. Auf der
     Startseite bleibt sie weg: Dort stehen nur die beiden Wege. */
  const leiste = document.querySelector("nav#reiter");
  const daheim = !document.getElementById(HEIM)?.hidden;
  if (leiste) leiste.hidden = !bereit || daheim;

  document.querySelectorAll("nav#reiter button").forEach(b => {
    const g = b.dataset.gruppe;
    if (b.dataset.bolum === HEIM || !g) { b.hidden = !bereit; return; }
    b.hidden = !bereit || (g !== "beide" && g !== weg);
  });

  document.querySelectorAll("#wahl .wahlKarte").forEach(k =>
    k.classList.toggle("gewaehlt", k.dataset.weg === weg));

  zeichneWege();
  /* Das Leuchten steht nicht in der Liste, sondern unten auf der
     Startseite — es ist kein Rechner, sondern ein Blick aufs Ganze. */
  zeig("#leuchtenHeim", genug("sterne", p));

  const aktiv = document.querySelector("nav#reiter button.etkin");
  if (aktiv && aktiv.hidden) {
    document.querySelector(`nav#reiter button[data-bolum="${HEIM}"]`)?.click();
  }
}

document.querySelectorAll("#wahl .wahlKarte").forEach(karte => {
  karte.addEventListener("click", () => {
    /* Eine Karte wählt ihren Weg — sie hebt ihn nicht wieder auf.
       Wer wechseln will, drückt die andere. */
    schreib(karte.dataset.weg);
    /* Der Wegwechsel darf sie öffnen — das ist eine Handlung des Nutzers,
       keine Nebenwirkung des Speicherns. */
    const rahmen = document.getElementById("maskeRahmen");
    if (rahmen && !genug(karte.dataset.weg, leseProfilRoh())) rahmen.open = true;
    schalte();
    /* Nicht gleich in die erste Technik springen: Erst zeigen, was es gibt. */
    const ziel = lies() && genug(lies(), leseProfilRoh())
      ? document.getElementById("wegListe")
      : document.getElementById("maskeRahmen");
    if (lies()) ziel?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
});


/* ---------------------------------------------- die Techniken des Weges
   Nach der Wahl steht nicht gleich die erste Technik da, sondern die
   Liste aller — als große Felder untereinander, damit man am Telefon
   sieht, was es gibt, bevor man sich für eines entscheidet. */
const WORUM = {
  bHoroskop:     "Der Himmel deiner Geburtsstunde: Aszendent, die sieben Planeten in Zeichen und Feldern, ihre Würden und Winkel. Dazu die zwölf Felder des Lebens, einzeln befragt.",
  bYildiz:       "Das osmanische Sternbuch. Dein Name und der deiner Mutter werden zu Zahlen, die Summe fällt in ein Fach des Himmels.",
  bNiyet:        "Die Tafel der Absicht. Nicht die Sache wird gefragt, sondern der Augenblick, in dem du fragst.",
  bUyum:         "Zwei Menschen, vier Namen. Die Handschriften rechnen beide Summen gegeneinander und lesen die alte Regel der Elemente.",
  bMenzil:       "Die Wahlastrologie. Wann fängt man etwas an? Der Mond zieht durch achtundzwanzig Herbergen, und jede hat ihr Urteil.",
  bRamel:        "Die Sandkunst. Sechzehn Figuren aus geraden und ungeraden Punkten, aus vier Müttern wächst ein ganzes Feld.",
  bGeist:        "Agrippas Geist des elften Hauses — ein Name, der nicht aus deinem Namen kommt, sondern aus fünf Orten deines Himmels.",
  bLebensbogen:  "Die älteste Vorhersagetechnik des Westens: ein Grad der Himmelsdrehung für ein Lebensjahr.",
  bZR:           "Die Kapitel deines Lebens, nach Vettius Valens — mit ihren Unterkapiteln, den Höhepunkten und der Stelle, an der ein Faden reißt.",
  bAntiszien:    "Die Schattenzwillinge: Punkte, die einander nicht ansehen und doch denselben Schatten werfen.",
  bProfektionen: "Ein Zeiger, der jedes Jahr ein Feld weiterrückt. Worum es von Geburtstag zu Geburtstag geht — und wer das Jahr führt.",
  bFirdaria:     "Die persische Zählung des Abū Maʿšar: feste Mengen von Jahren, jede unter einer anderen Hand.",
  bVimshottari:  "Das verbreitetste Zeitsystem Indiens, gerechnet vom Stand des Mondes bei deiner Geburt.",
  bSolar:        "Einmal im Jahr kehrt die Sonne auf ihren Geburtsgrad zurück. Was dieses Jahr trägt — in neun Schritten nach Abū Maʿšar.",
  bRadixdeutung: "Die Geburt als Ganzes, ehe die Zeit anfängt — Sekte, Temperament, der Aufsteigende und sein Herr. Wahlweise nüchtern nach Bonatti oder in Bildern und Fabeln.",
  bAlmutem:      "Der Herr des ganzen Horoskops nach Ibn Ezra und Bonatti — wer über diese Geburt als solche das letzte Wort hat, wenn die einzelnen Zeugen sich widersprechen.",
  bWerk:         "Ptolemäus fragt nicht nach dem Beruf, sondern aus welchem Stoff deine Arbeit ist — durch Hand, Auge oder Wort.",
  bLebensalter:  "Dorotheos teilt das Leben in drei Teile und gibt jedem einen der drei Herren deines Elements.",
  bPunkte:       "Gerechnete Stellen, keine Himmelskörper: wo Glück, Geist, Liebe, Vater, Mutter und die übrigen im Horoskop zu liegen kommen.",
  bVerteilung:   "Dorotheos' Verteilung durch die Grenzen: Der Aszendent wandert mit der Drehung des Himmels, und jede Grenze dauert so lange, wie sie an deinem Ort zum Aufgehen braucht.",
  bLebensmass:   "Die alte Frage nach dem Maß des Lebens: Hylech und Alcocoden, der Geber und der Hüter.",
  bEssenz:       "Alles zusammen, in Bildern statt in Fachsprache — was die einzelnen Künste gemeinsam sagen."
};

function zeichneWege() {
  const liste = document.getElementById("wegListe");
  if (!liste) return;
  const weg = lies();
  const bereit = genug(weg, leseProfilRoh());
  liste.hidden = !weg || !bereit;
  if (liste.hidden) { liste.innerHTML = ""; return; }

  liste.innerHTML = "";
  /* Siebzehn Felder in einer Reihe sind am Telefon drei Bildschirme ohne
     Ordnung. Darum in Gruppen, und zwar in der Reihenfolge der alten
     Schule: erst das Geburtsbild, dann was darin angelegt ist, dann die
     Zeitherren, zuletzt die Zusammenschau. */
  const GRUPPEN = weg === "orakel" ? [
    [t("gruppe.augenblick"), ["bNiyet","bRamel","bMenzil"]],
    [t("gruppe.namen"),      ["bYildiz","bUyum"]],
    [t("gruppe.zusammen"),   ["bEssenz"]]
  ] : [
    [t("gruppe.geburtsbild"), ["bHoroskop","bRadixdeutung","bAlmutem","bPunkte","bGeist"]],
    [t("gruppe.angelegt"),    ["bWerk","bLebensmass","bAntiszien"]],
    [t("gruppe.zeit"),        ["bProfektionen","bVerteilung","bZR","bFirdaria",
                               "bVimshottari","bLebensalter","bLebensbogen","bSolar"]],
    [t("gruppe.zusammen"),    ["bEssenz"]]
  ];

  const knopfVon = id => document.querySelector(`nav#reiter button[data-bolum="${id}"]`);

  const kopf = document.createElement("h3");
  kopf.textContent = t(weg === "orakel" ? "liste.orakel" : "liste.sterne");
  liste.appendChild(kopf);

  const gezeigt = new Set();
  GRUPPEN.forEach(([titel, ids]) => {
    const drin = ids.map(knopfVon).filter(b => b && b.dataset.gruppe &&
      (b.dataset.gruppe === "beide" || b.dataset.gruppe === weg));
    if (!drin.length) return;
    const h = document.createElement("h4");
    h.className = "wegGruppe";
    h.textContent = titel;
    liste.appendChild(h);
    drin.forEach(b => { gezeigt.add(b.dataset.bolum); liste.appendChild(feldVon(b)); });
  });

  /* Was keiner Gruppe zugeordnet ist, hängt hinten dran — so geht beim
     Hinzufügen einer Technik nichts verloren. */
  const rest = [...document.querySelectorAll("nav#reiter button")].filter(b => {
    const g = b.dataset.gruppe;
    return g && (g === "beide" || g === weg) && !gezeigt.has(b.dataset.bolum);
  });
  if (rest.length) {
    const h = document.createElement("h4");
    h.className = "wegGruppe";
    h.textContent = "Weiteres";
    liste.appendChild(h);
    rest.forEach(b => liste.appendChild(feldVon(b)));
  }
}

function feldVon(b) {
  const k = document.createElement("button");
  k.type = "button";
  k.className = "wegFeld";
  const t = document.createElement("span");
  t.className = "wegName";
  t.textContent = b.textContent;
  const u = document.createElement("span");
  u.className = "wegWorum";
  u.textContent = WORUM[b.dataset.bolum] || "";
  k.append(t, u);
  k.addEventListener("click", () => { b.click(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  return k;
}

/* ------------------------------------------------- heim und wieder fort */
function geheZu(id) {
  const knopf = document.querySelector(`nav#reiter button[data-bolum="${id}"]`);
  if (knopf) { knopf.click(); }
  else {
    /* Abschnitte ohne Reiter — etwa "Die Idee dahinter". */
    document.querySelectorAll("nav#reiter button").forEach(b => b.classList.remove("etkin"));
    document.querySelectorAll("section.bolum").forEach(s => s.hidden = s.id !== id);
  }
  schalte();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("heimKnopf")?.addEventListener("click", () => geheZu(HEIM));
document.getElementById("zurIdee")?.addEventListener("click", () => geheZu("bNasil"));
document.querySelectorAll("[data-heim]").forEach(b =>
  b.addEventListener("click", () => geheZu(HEIM)));

/* Jeder Reiterklick kann die Leiste selbst betreffen — etwa der Weg zurück
   auf die Startseite, wo sie verschwinden soll. */
document.querySelectorAll("nav#reiter button").forEach(b =>
  b.addEventListener("click", () => setTimeout(schalte, 0)));

/* In jedem Abschnitt oben ein Weg zurück — der Kopf allein ist zu leise. */
document.querySelectorAll("section.bolum").forEach(ab => {
  if (ab.id === HEIM || ab.querySelector(":scope > .zurueckKnopf")) return;
  const k = document.createElement("button");
  k.type = "button";
  k.className = "zurueckKnopf";
  k.textContent = t("knopf.zurueck");
  k.dataset.t = "knopf.zurueck";
  k.addEventListener("click", () => geheZu(HEIM));
  ab.prepend(k);
});

/* Erst ganz zum Schluss loslegen: schalte() greift auf WORUM und
   zeichneWege() weiter unten zu, und ein const ist vor seiner Zeile
   noch nicht da — ein Aufruf von hier oben bräche mitten in der
   Liste ab. */
aufProfilAenderung(schalte);
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", schalte);
else schalte();

window.addEventListener("sprache-geaendert", () => schalte());
