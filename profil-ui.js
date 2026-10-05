/* ------------------------------------------------------------------------
   profil-ui.js — Bedienung des Reiters "Meine Daten".
   --------------------------------------------------------------------- */
import { leseProfilRoh, schreibeProfil, loescheProfil } from "./profil.js?v=182";

const $ = s => document.querySelector(s);

async function ortSuchen(name) {
  const url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&accept-language=de&q=" + encodeURIComponent(name);
  const antwort = await fetch(url);
  if (!antwort.ok) throw new Error("Die Suche ist fehlgeschlagen.");
  const daten = await antwort.json();
  if (!daten.length) throw new Error("Kein Ort gefunden — Breite und Länge von Hand eintragen.");
  return { breite: parseFloat(daten[0].lat), laenge: parseFloat(daten[0].lon), anzeige: daten[0].display_name };
}

$("#pOrtSuchen").addEventListener("click", async () => {
  const ort = $("#pOrt").value.trim();
  const status = $("#pGeoStatus");
  status.className = "geoStatus";
  if (!ort) { status.textContent = "Erst einen Ort eintragen."; status.classList.add("fehler"); return; }
  status.textContent = "Suche …";
  try {
    const treffer = await ortSuchen(ort);
    $("#pBreite").value = treffer.breite.toFixed(4);
    $("#pLaenge").value = treffer.laenge.toFixed(4);

    /* Der UTC-Offset lässt sich aus der Länge schätzen — auf die Sommerzeit
       kann das nicht Rücksicht nehmen, darum steht es als Vorschlag da. */
    let zusatz = "";
    if (!$("#pUtc").value) {
      $("#pUtc").value = Math.round(treffer.laenge / 15);
      zusatz = ` · UTC-Offset auf ${Math.round(treffer.laenge / 15)} geschätzt — bei Sommerzeit eins mehr`;
    }
    $("#pBreite").dispatchEvent(new Event("input", { bubbles: true }));
    status.textContent = "Gefunden: " + treffer.anzeige + zusatz;
    status.classList.add("ok");
  } catch (e) {
    status.textContent = e.message || "Die Suche ist fehlgeschlagen.";
    status.classList.add("fehler");
  }
});

function fuelleFormular(p) {
  if (!p) return;
  $("#pName").value = p.name || "";
  $("#pAnne").value = p.anne || "";
  if ($("#pPartner")) $("#pPartner").value = p.partner || "";
  if ($("#pPartnerAnne")) $("#pPartnerAnne").value = p.partnerAnne || "";
  const r = document.querySelector(`input[name="pCinsiyet"][value="${p.cinsiyet || "erkek"}"]`);
  if (r) r.checked = true;
  $("#pDatum").value = p.datum || "";
  $("#pZeit").value = p.zeit || "";
  $("#pOrt").value = p.ort || "";
  $("#pBreite").value = p.breite ?? "";
  $("#pLaenge").value = p.laenge ?? "";
  $("#pUtc").value = p.utc ?? "";
}
fuelleFormular(leseProfilRoh());

function sammle() {
  return {
    name: $("#pName").value.trim(),
    anne: $("#pAnne").value.trim(),
    partner: $("#pPartner") ? $("#pPartner").value.trim() : "",
    partnerAnne: $("#pPartnerAnne") ? $("#pPartnerAnne").value.trim() : "",
    cinsiyet: document.querySelector('input[name="pCinsiyet"]:checked').value,
    datum: $("#pDatum").value,
    zeit: $("#pZeit").value,
    ort: $("#pOrt").value.trim(),
    breite: parseFloat($("#pBreite").value),
    laenge: parseFloat($("#pLaenge").value),
    utc: parseFloat($("#pUtc").value),
    gespeichertAm: new Date().toISOString()
  };
}

const MONATE = ["Januar","Februar","März","April","Mai","Juni","Juli",
                "August","September","Oktober","November","Dezember"];

/* Zeigt an, dass und wann die Angaben auf diesem Gerät liegen. Sie liegen
   im localStorage des Browsers — nicht auf einem Server, den es nicht gibt,
   und nicht auf anderen Geräten. Genau das soll dastehen. */
function zeigeGespeichert() {
  const kasten = $("#pGespeichert");
  if (!kasten) return;
  const p = leseProfilRoh();
  if (!p) { kasten.hidden = true; return; }

  let wann = "";
  if (p.gespeichertAm) {
    const d = new Date(p.gespeichertAm);
    if (!isNaN(d)) {
      const uhr = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
      wann = `${d.getDate()}. ${MONATE[d.getMonth()]} ${d.getFullYear()}, ${uhr} Uhr`;
    }
  }
  kasten.hidden = false;
  kasten.innerHTML =
    `<div class="gespeichertZeile"><span class="haken">✓</span> ` +
    `<b>Auf diesem Gerät gespeichert</b>${wann ? " — " + wann : ""}</div>` +
    `<p class="kucukNot">Die Angaben liegen im Speicher deines Browsers. Beim nächsten Besuch ` +
    `stehen sie wieder da, auch ohne Netz. Auf ein anderes Gerät kommen sie nur über eine ` +
    `Sicherung — es gibt keinen Server, der sie abgleichen könnte.</p>`;
}

function speichern(still) {
  const status = $("#pSpeicherStatus");
  status.className = "geoStatus";
  const daten = sammle();
  const namenDa = daten.name && daten.anne;
  const geburtDa = daten.datum && daten.zeit &&
                   !isNaN(daten.breite) && !isNaN(daten.laenge) && !isNaN(daten.utc);

  if (!namenDa && !geburtDa) {
    if (still) return;
    status.textContent = "Trag entweder beide Namen ein oder die vollständigen Geburtsangaben — " +
                         "sonst hat kein Abschnitt etwas zu rechnen.";
    status.classList.add("fehler");
    return;
  }

  schreibeProfil(daten);
  zeigeGespeichert();

  const ortOhneKoordinaten = daten.ort && (isNaN(daten.breite) || isNaN(daten.laenge));
  const warnung = $("#pKoordWarnung");
  if (warnung) {
    warnung.hidden = !ortOhneKoordinaten;
    warnung.innerHTML = ortOhneKoordinaten
      ? `Du hast <b>${daten.ort}</b> eingetragen, aber noch keine Koordinaten. ` +
        `Spirit Name, Horoskop, Lebensbogen, Zodiacal Releasing, Antiszien und Profektionen ` +
        `rechnen erst damit — drück einmal auf „Koordinaten suchen“.`
      : "";
  }

  if (still) {
    status.textContent = "Übernommen — die anderen Abschnitte rechnen mit.";
    status.classList.add("ok");
    return;
  }
  const bereit = [], fehlt = [];
  (namenDa ? bereit : fehlt).push("Yıldıznâme, Niyet und İsim uyumu");
  (geburtDa ? bereit : fehlt).push("Spirit Name, Lebensbogen und Zodiacal Releasing");
  status.textContent = "Gespeichert. " + bereit.join(" sowie ") + " rechnen jetzt damit." +
    (fehlt.length ? ` Für ${fehlt.join(" und ")} fehlt noch etwas.` : "");
  status.classList.add(fehlt.length ? "warnung" : "ok");
}

$("#pSpeichern").addEventListener("click", () => speichern(false));

/* Von selbst übernehmen: wer tippt, soll nicht erst einen Knopf suchen.
   Kurz abwarten, damit nicht jeder Tastenschlag die Rechner anwirft. */
let uhr = null;
["pName","pAnne","pPartner","pPartnerAnne","pDatum","pZeit","pOrt","pBreite","pLaenge","pUtc"].forEach(id => {
  const feld = $("#" + id);
  if (feld) feld.addEventListener("input", () => {
    clearTimeout(uhr);
    uhr = setTimeout(() => speichern(true), 450);
  });
});
document.querySelectorAll('input[name="pCinsiyet"]').forEach(r =>
  r.addEventListener("change", () => speichern(true)));

$("#pLoeschen").addEventListener("click", () => {
  loescheProfil();
  ["pName","pAnne","pPartner","pPartnerAnne","pDatum","pZeit","pOrt","pBreite","pLaenge","pUtc"].forEach(id => $("#" + id).value = "");
  const status = $("#pSpeicherStatus");
  status.className = "geoStatus";
  status.textContent = "Gelöscht.";
  zeigeGespeichert();
});

/* ------------------------------------------------------------- Sicherung
   Der Browserspeicher ist an dieses eine Gerät und diesen einen Browser
   gebunden. Wer die Angaben mitnehmen will — auf das Telefon, in einen
   anderen Browser, über eine Neuinstallation hinweg —, nimmt eine Datei. */

$("#pAusgeben")?.addEventListener("click", () => {
  const status = $("#pSicherungStatus");
  status.className = "geoStatus";
  const p = leseProfilRoh();
  if (!p) { status.textContent = "Noch nichts einzutragen."; status.classList.add("fehler"); return; }

  const text = JSON.stringify({ art: "oracle-geburtsprofil", fassung: 1, daten: p }, null, 2);
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "oracle-daten" + (p.name ? "-" + p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "") + ".json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  status.textContent = "Datei erzeugt — gut aufheben, sie enthält deine Angaben.";
  status.classList.add("ok");
});

$("#pEinlesen")?.addEventListener("click", () => $("#pDatei")?.click());

$("#pDatei")?.addEventListener("change", e => {
  const status = $("#pSicherungStatus");
  status.className = "geoStatus";
  const datei = e.target.files && e.target.files[0];
  if (!datei) return;

  const leser = new FileReader();
  leser.onload = () => {
    try {
      let gelesen;
      try { gelesen = JSON.parse(String(leser.result)); }
      catch (e) { throw new Error("die Datei ist beschädigt oder gar keine Sicherung"); }
      const d = gelesen && gelesen.art === "oracle-geburtsprofil" ? gelesen.daten : gelesen;
      if (!d || typeof d !== "object") throw new Error("unbekannter Inhalt");
      const hatNamen = d.name && d.anne;
      const hatGeburt = d.datum && d.zeit;
      if (!hatNamen && !hatGeburt) throw new Error("keine brauchbaren Angaben darin");

      fuelleFormular(d);
      speichern(true);
      status.textContent = "Eingelesen — alle Abschnitte rechnen jetzt damit.";
      status.classList.add("ok");
    } catch (fehler) {
      status.textContent = "Das war keine Oracle-Sicherung — " + (fehler.message || "unlesbar") + ". Deine bisherigen Angaben bleiben unberührt.";
      status.classList.add("fehler");
    }
    e.target.value = "";
  };
  leser.onerror = () => {
    status.textContent = "Die Datei ließ sich nicht lesen.";
    status.classList.add("fehler");
    e.target.value = "";
  };
  leser.readAsText(datei);
});

zeigeGespeichert();
