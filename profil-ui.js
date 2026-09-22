/* ------------------------------------------------------------------------
   profil-ui.js — Bedienung des Reiters "Meine Daten".
   --------------------------------------------------------------------- */
import { leseProfil, schreibeProfil, loescheProfil } from "./profil.js?v=10";

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
    status.textContent = "Gefunden: " + treffer.anzeige;
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
  const r = document.querySelector(`input[name="pCinsiyet"][value="${p.cinsiyet || "erkek"}"]`);
  if (r) r.checked = true;
  $("#pDatum").value = p.datum || "";
  $("#pZeit").value = p.zeit || "";
  $("#pOrt").value = p.ort || "";
  $("#pBreite").value = p.breite ?? "";
  $("#pLaenge").value = p.laenge ?? "";
  $("#pUtc").value = p.utc ?? "";
}
fuelleFormular(leseProfil());

$("#pSpeichern").addEventListener("click", () => {
  const status = $("#pSpeicherStatus");
  status.className = "geoStatus";
  const daten = {
    name: $("#pName").value.trim(),
    anne: $("#pAnne").value.trim(),
    cinsiyet: document.querySelector('input[name="pCinsiyet"]:checked').value,
    datum: $("#pDatum").value,
    zeit: $("#pZeit").value,
    ort: $("#pOrt").value.trim(),
    breite: parseFloat($("#pBreite").value),
    laenge: parseFloat($("#pLaenge").value),
    utc: parseFloat($("#pUtc").value)
  };
  const namenDa = daten.name && daten.anne;
  const geburtDa = daten.datum && daten.zeit &&
                   !isNaN(daten.breite) && !isNaN(daten.laenge) && !isNaN(daten.utc);

  if (!namenDa && !geburtDa) {
    status.textContent = "Trag entweder beide Namen ein oder die vollständigen Geburtsangaben — " +
                         "sonst hat kein Abschnitt etwas zu rechnen.";
    status.classList.add("fehler");
    return;
  }

  schreibeProfil(daten);
  const bereit = [], fehlt = [];
  (namenDa ? bereit : fehlt).push("Sternbild, Niyet und İsim uyumu");
  (geburtDa ? bereit : fehlt).push("Geist, Lebensbogen und Zodiacal Releasing");
  status.textContent = "Gespeichert. " + bereit.join(" sowie ") + " rechnen jetzt damit." +
    (fehlt.length ? ` Für ${fehlt.join(" und ")} fehlt noch etwas.` : "");
  status.classList.add(fehlt.length ? "warnung" : "ok");
});

$("#pLoeschen").addEventListener("click", () => {
  loescheProfil();
  ["pName","pAnne","pDatum","pZeit","pOrt","pBreite","pLaenge","pUtc"].forEach(id => $("#" + id).value = "");
  const status = $("#pSpeicherStatus");
  status.className = "geoStatus";
  status.textContent = "Gelöscht.";
});
