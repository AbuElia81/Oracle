/* ------------------------------------------------------------------------
   direktionen.js — Primärdirektionen (Ptolemäus, Tetrabiblos III; Gansten,
   Primary Directions).

   Primärbewegung: nicht die Planeten bewegen sich, sondern der ganze Himmel
   dreht sich um die Weltachse — mit rund einem Grad pro vier Zeitminuten,
   also (im "Schlüssel" des Ptolemäus) einem Grad pro Lebensjahr. Ein
   Promissor "kommt zur Richtung", wenn die Drehung ihn auf die Position
   eines Signifikators bringt.

   Direktionen zu den vier Achsen (ASC/MC/DESC/IC) sind geschlossen lösbar
   über die schiefe Auf-/Untergangsrektaszension (Ptolemäus' eigenes
   Verfahren, keine Häusertrisektion nötig). Direktionen zwischen zwei
   Planeten sind hier "im Tierkreis" vereinfacht: der Aspektpunkt wird als
   Punkt der Ekliptik (Breite null) behandelt, nicht über die volle
   Häusertrisektion nach Regiomontanus oder Placidus — siehe
   Transparenzabschnitt der Seite.
   --------------------------------------------------------------------- */

import { rad, grad, norm360, schiefeAufgangsRA, schiefeUntergangsRA } from "./astro.js?v=56";

export const PLANETEN = {
  sonne:{name:"Sonne", g:"☉"}, mond:{name:"Mond", g:"☽"}, merkur:{name:"Merkur", g:"☿"},
  venus:{name:"Venus", g:"♀"}, mars:{name:"Mars", g:"♂"}, jupiter:{name:"Jupiter", g:"♃"},
  saturn:{name:"Saturn", g:"♄"}, asc:{name:"Aszendent", g:"ASC"}, mc:{name:"MC", g:"MC"}
};
export const PLANETEN_REIHE = ["sonne","mond","merkur","venus","mars","jupiter","saturn","asc","mc"];

export const ACHSEN = { asc:{name:"Aszendent", g:""}, mc:{name:"MC", g:""}, desc:{name:"Deszendent", g:""}, ic:{name:"IC", g:""} };

export const ASPEKTE = [
  { key:"kon", name:"Konjunktion", zeichen:"☌", offsets:[0], standard:true },
  { key:"sex", name:"Sextil",      zeichen:"⚹", offsets:[60,-60], standard:false },
  { key:"qua", name:"Quadrat",     zeichen:"□", offsets:[90,-90], standard:true },
  { key:"tri", name:"Trigon",      zeichen:"△", offsets:[120,-120], standard:false },
  { key:"opp", name:"Opposition",  zeichen:"☍", offsets:[180], standard:true }
];

export const SCHLUESSEL = {
  ptolemaeus: { name:"Ptolemäus (1° = 1 Jahr)", grad:1.0 },
  naibod:     { name:"Naibod (≈ 0°59′08″ = 1 Jahr)", grad:360 / 365.2425 }
};

/* eklToAequ ist in astro.js nicht exportiert (nur intern genutzt) — hier
   dieselbe Umrechnung noch einmal, für Aspektpunkte auf der Ekliptik
   (Breite angenommen null: die "im Tierkreis"-Vereinfachung). */
function eklZuRektaszension(laengeGrad, schiefeGrad) {
  const l = rad(laengeGrad), eps = rad(schiefeGrad);
  return norm360(grad(Math.atan2(Math.sin(l) * Math.cos(eps), Math.cos(l))));
}

/* Für ASC/MC als Promissor oder Signifikator: als Ekliptikpunkt (Breite 0)
   behandelt, dieselbe "im Tierkreis"-Konvention wie bei den Aspektpunkten. */
function punktDaten(geburt, key) {
  if (key === "asc") return { laenge: geburt.asc, rektaszension: eklZuRektaszension(geburt.asc, geburt.eps), deklination: 0 };
  if (key === "mc")  return { laenge: geburt.mc,  rektaszension: eklZuRektaszension(geburt.mc, geburt.eps),  deklination: 0 };
  return geburt.planeten[key];
}

/* ------------------------------------------------------ Zu den Achsen */
function arcZuAchse(promissor, achse, geburt) {
  const { rektaszension: ra, deklination: dek } = promissor;
  const phi = geburt.breite, ramc = geburt.ramc;
  let direkt;
  if (achse === "mc")  direkt = norm360(ra - ramc);
  else if (achse === "ic")   direkt = norm360(ra - ramc - 180);
  else if (achse === "asc")  direkt = norm360(schiefeAufgangsRA(ra, dek, phi) - ramc - 90);
  else /* desc */             direkt = norm360(schiefeUntergangsRA(ra, dek, phi) - ramc - 270);
  return { direkt, konvers: norm360(360 - direkt) };
}

/* ------------------------------------------------------- Planet zu Planet
   ("im Tierkreis", vereinfacht: Aspektpunkt auf der Ekliptik, Breite 0). */
function arcZuAspektpunkt(promissor, signifikatorLaenge, offsetGrad, schiefeGrad) {
  const raZiel = eklZuRektaszension(norm360(signifikatorLaenge + offsetGrad), schiefeGrad);
  const direkt = norm360(raZiel - promissor.rektaszension);
  return { direkt, konvers: norm360(360 - direkt) };
}

/* ---------------------------------------------------- Die volle Liste */
export function berechneDirektionen(geburt, optionen) {
  const { aspektSchluessel = new Set(["kon","qua","opp"]), mitAchsen = true, mitPlanetZuPlanet = false,
          mitKonvers = false, schluessel = "ptolemaeus", maxAlter = 100 } = optionen;
  const key = SCHLUESSEL[schluessel].grad;
  const ausgabe = [];

  const alterVon = arcGrad => arcGrad / key;
  const push = (promissorKey, sigLabel, sigGlyph, aspektLabel, arc, konvers) => {
    const alterD = alterVon(arc);
    if (alterD >= 0 && alterD <= maxAlter) {
      ausgabe.push({ promissor: promissorKey, signifikator: sigLabel, sigGlyph, aspekt: aspektLabel, richtung:"direkt", arc, alter: alterD });
    }
    if (mitKonvers) {
      const alterK = alterVon(konvers);
      if (alterK >= 0 && alterK <= maxAlter) {
        ausgabe.push({ promissor: promissorKey, signifikator: sigLabel, sigGlyph, aspekt: aspektLabel, richtung:"konvers", arc: konvers, alter: alterK });
      }
    }
  };

  PLANETEN_REIHE.forEach(pKey => {
    const p = punktDaten(geburt, pKey);

    if (mitAchsen) {
      for (const aKey in ACHSEN) {
        if (aKey === pKey) continue;
        if (pKey === "asc" && aKey === "desc") continue; // starre Gegenachse, trivial
        if (pKey === "mc" && aKey === "ic") continue;
        const { direkt, konvers } = arcZuAchse(p, aKey, geburt);
        push(pKey, ACHSEN[aKey].name, ACHSEN[aKey].g, "→", direkt, konvers);
      }
    }

    if (mitPlanetZuPlanet) {
      PLANETEN_REIHE.forEach(sKey => {
        if (sKey === pKey) return;
        const s = punktDaten(geburt, sKey);
        ASPEKTE.forEach(asp => {
          if (!aspektSchluessel.has(asp.key)) return;
          asp.offsets.forEach(off => {
            const { direkt, konvers } = arcZuAspektpunkt(p, s.laenge, off, geburt.eps);
            const label = `${PLANETEN[sKey].name}${off ? (off > 0 ? " +" + off + "°" : " " + off + "°") : ""}`;
            push(pKey, label, PLANETEN[sKey].g, asp.zeichen, direkt, konvers);
          });
        });
      });
    }
  });

  ausgabe.sort((a, b) => a.alter - b.alter);
  return ausgabe;
}
