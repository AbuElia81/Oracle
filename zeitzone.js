/* ------------------------------------------------------------------------
   zeitzone.js — welchen Abstand zur Weltzeit ein Ort an einem Tag hatte.

   Bisher wurde der Abstand aus dem Längengrad geschätzt: Länge durch
   fünfzehn. Für Palermo ergibt das 1 — richtig war im Juli 1981 aber 2,
   denn Italien hatte Sommerzeit. Eine Stunde verschiebt den Aszendenten
   um rund fünfzehn Grad, also oft um ein ganzes Zeichen, und mit ihm
   alles, was daran hängt.

   Geraten werden muss gar nichts. Jeder Browser trägt die vollständige
   Zeitzonendatenbank mit sich, mitsamt ihrer Geschichte: Er weiß, dass
   die Bundesrepublik 1975 keine Sommerzeit kannte und sie 1980 wieder
   einführte, und dass die Türkei 1981 auf UTC+3 stand. Es fehlte nur das
   Stück vom Ort zum Namen der Zone — das steht jetzt in tz-tafel.js.
   ------------------------------------------------------------------------ */
import { tzlookup } from "./tz-tafel.js?v=274";

export function zoneVon(breite, laenge) {
  const b = parseFloat(breite), l = parseFloat(laenge);
  if (isNaN(b) || isNaN(l)) return null;
  try { return tzlookup(b, l); } catch (e) { return null; }
}

/* Was eine Zone zu einem bestimmten Augenblick von der Weltzeit entfernt
   war, in Stunden. Halbe und viertel Stunden kommen vor — Indien steht
   auf 5,5, Nepal auf 5,75 —, darum wird auch die Minute gelesen. */
function offsetZuAugenblick(zone, datum) {
  let text;
  try {
    text = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "longOffset" })
      .format(datum);
  } catch (e) {
    try {
      text = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "shortOffset" })
        .format(datum);
    } catch (e2) { return null; }
  }
  const m = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(text);
  if (!m) return /GMT\b/.test(text) ? 0 : null;
  const vorzeichen = m[1] === "-" ? -1 : 1;
  return vorzeichen * (parseInt(m[2], 10) + (m[3] ? parseInt(m[3], 10) / 60 : 0));
}

/* Gesucht ist der Abstand zu einer Ortszeit — "14.07.1981, 04:35 in
   Palermo" —, gefragt werden kann aber nur nach einem Augenblick. Also
   zweimal: einmal so getan, als wäre die Ortszeit schon Weltzeit, dann
   mit dem so gefundenen Abstand zurückgerechnet und noch einmal gefragt.
   Der zweite Durchgang fängt die Tage ab, an denen die Uhr umgestellt
   wurde und die erste Antwort noch von der anderen Seite der Grenze kam. */
export function offsetVon(breite, laenge, datum, zeit) {
  const zone = zoneVon(breite, laenge);
  if (!zone) return null;
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(datum || ""));
  if (!d) return null;
  const z = /^(\d{1,2}):(\d{2})/.exec(String(zeit || "12:00")) || [null, "12", "00"];
  const alsWaereEsWeltzeit = Date.UTC(+d[1], +d[2] - 1, +d[3], +z[1], +z[2]);

  const erster = offsetZuAugenblick(zone, new Date(alsWaereEsWeltzeit));
  if (erster === null) return null;
  const zweiter = offsetZuAugenblick(zone, new Date(alsWaereEsWeltzeit - erster * 3600000));
  return { zone, offset: zweiter === null ? erster : zweiter };
}
