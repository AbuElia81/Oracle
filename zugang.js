/* ------------------------------------------------------------------------
   zugang.js — zuerst der Weg, dann die Maske, dann die Abschnitte.

   Die Seite fragt als Erstes, was man befragen will. Das Orakel will
   Namen und eine Frage und kein Geburtsdatum; die Sterne wollen Stunde
   und Ort und keinen Mutternamen. Erst die Wahl entscheidet, welche
   Maske erscheint — und erst eine ausgefüllte Maske öffnet die Reiter
   des jeweiligen Weges.
   --------------------------------------------------------------------- */
import { leseProfilRoh, aufProfilAenderung } from "./profil.js?v=245";
import { t } from "./sprachen.js?v=245";

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
  /* Jede Maske fragt nur, was ihr Weg braucht. Solange nichts gewählt ist,
     gilt der Weg der Sterne: Die Lesung auf der Startseite hängt an Datum,
     Stunde und Ort, und wer frisch ankommt, soll vier Felder sehen und
     nicht dreizehn. Die Namen für das Orakel kommen, wenn man es wählt. */
  zeig("#maskeGemein", true);
  zeig("#maskeOrakel", weg === "orakel");
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
  /* Das Ergebnis steht oben, die Techniken liegen darunter in einem Fach.
     Co–Star und Chani machen es genauso: erst eine Antwort, dann das Menü. */
  /* Die Lesung hängt nicht am gewählten Weg, sondern allein daran, ob
     Datum, Stunde und Ort dastehen. Sonst sähe sie, wer die Seite frisch
     öffnet, erst nach einem Klick auf "Die Sterne" — und dann wäre sie
     wieder eine Technik unter anderen statt das Erste, was da ist. */
  zeig("#lesungHeim", genug("sterne", p));
  zeig("#technikFach", bereit);
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
   sieht, was es gibt, bevor man sich für eines entscheidet. Was jedes
   Feld verspricht, steht in den Sprachtafeln unter "worum.*". */

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
    h.textContent = t("gruppe.weiteres");
    liste.appendChild(h);
    rest.forEach(b => liste.appendChild(feldVon(b)));
  }
}

function feldVon(b) {
  const k = document.createElement("button");
  k.type = "button";
  k.className = "wegFeld";
  /* Nicht t nennen: t ist die Übersetzungsfunktion. */
  const name = document.createElement("span");
  name.className = "wegName";
  const schluessel = "nav." + b.dataset.bolum;
  const uebersetzt = t(schluessel);
  name.textContent = uebersetzt && uebersetzt !== schluessel ? uebersetzt : b.textContent;
  const u = document.createElement("span");
  u.className = "wegWorum";
  u.textContent = t("worum." + b.dataset.bolum);
  k.append(name, u);
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
