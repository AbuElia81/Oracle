/* ------------------------------------------------------------------------
   deutung.js — Deutungen unter den Lebensbogen und unter Zodiacal Releasing.

   Rührt an den beiden Rechnern nichts. Sie schreiben in ihre eigenen
   Ausgabefelder; dieses Modul sieht dabei zu (MutationObserver), liest die
   fertigen Tafeln und setzt seinen Text in einen eigenen Kasten daneben.
   Deshalb überlebt die Deutung auch ein Neurechnen.
   --------------------------------------------------------------------- */
import { leseProfilRoh } from "./profil.js?v=23";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

function alterHeute(p) {
  if (!p || !p.datum) return null;
  const [j, m, t] = p.datum.split("-").map(Number);
  return (Date.now() - new Date(j, m - 1, t).getTime()) / (365.2425 * 864e5);
}

/* ------------------------------------------------- Lebensbogen: Bedeutung */

const PROMISSOR = {
  "Sonne":   "Sichtbarkeit — Amt, Anerkennung, das Hervortreten vor anderen; und die Rechnung, die dafür kommt",
  "Mond":    "das Häusliche und das Bewegliche — Wohnort, Familie, Gemüt, ein Wechsel, der von innen anfängt",
  "Merkur":  "Papier und Wort — Verträge, Schrift, Handel, Lernen, Wege, die man mehrmals geht",
  "Venus":   "Bindung und Wohlgefallen — Zuneigung, Kunst, Geld, das leicht kommt, Versöhnung",
  "Mars":    "der Schnitt — Arbeit, Streit, Entschluss, Trennung; was nicht mehr wartet",
  "Jupiter": "Erweiterung — Recht, Gönner, Reise, Ansehen; und die Gefahr, sich zu viel vorzunehmen",
  "Saturn":  "Ernst — Verantwortung, Verzicht, Prüfung, das Bleibende; was Zeit verlangt und Zeit gibt",
  "MC":      "die Achse des Amtes selbst rückt vor: die Stellung in der Welt ordnet sich neu",
  "ASC":     "die Achse der Person selbst rückt vor: Leib, Auftritt und Selbstbild ordnen sich neu"
};

const SIGNIFIKATOR = {
  "MC":          "im Beruf und im Ruf",
  "IC":          "im Haus, in der Herkunft und bei den Wurzeln",
  "Aszendent":   "am eigenen Leib und im Auftreten",
  "ASC":         "am eigenen Leib und im Auftreten",
  "Deszendent":  "beim Anderen — Ehe, Verträge, offene Gegner",
  "DESC":        "beim Anderen — Ehe, Verträge, offene Gegner"
};

const ASPEKT_TON = {
  "Konjunktion": "unvermittelt und ohne Umweg",
  "Quadrat":     "unter Reibung, gegen einen Widerstand",
  "Opposition":  "von außen, durch einen anderen Menschen",
  "Trigon":      "leicht, fast von selbst",
  "Sextil":      "als Gelegenheit, die man ergreifen muss"
};

function tonFuer(aspekt) {
  const a = (aspekt || "").replace(/\(.*\)/, "").trim();
  for (const k in ASPEKT_TON) if (a.includes(k)) return ASPEKT_TON[k];
  return "unvermittelt";
}

function nennwort(zelle) {
  const w = (zelle || "").replace(/[^A-Za-zÄÖÜäöüß ]/g, "").trim().split(/\s+/).filter(Boolean);
  return [...new Set(w)].join(" ");   // "MC MC" wird zu "MC"
}

function lebensbogenDeutung(kasten) {
  const tafel = $("#lbCikti");
  if (!tafel || tafel.hidden) { kasten.hidden = true; return; }
  const alter = alterHeute(leseProfilRoh());
  const zeilen = [...tafel.querySelectorAll("tbody tr")].map(tr => {
    const z = [...tr.cells].map(td => td.innerText.trim());
    return { alter: parseFloat(z[0]), promissor: nennwort(z[1]), aspekt: z[2], signifikator: nennwort(z[3]) };
  }).filter(d => !isNaN(d.alter));
  if (!zeilen.length) { kasten.hidden = true; return; }

  kasten.hidden = false;
  kasten.innerHTML = "";
  kasten.append(el("h3", null, "Was das heißt"));
  kasten.append(el("p", null,
    "Primärdirektionen messen nicht, was geschieht, sondern wann etwas fällig wird. " +
    "Der Himmel dreht sich nach der Geburt weiter; ein Grad dieser Drehung gilt für ein Lebensjahr. " +
    "Wo ein Planet dabei auf eine Achse trifft, klopft sein Thema an — ob geöffnet wird, " +
    "steht auf einem anderen Blatt."));

  const kommend = alter == null ? zeilen.slice(0, 3)
                                : zeilen.filter(d => d.alter >= alter - 1).slice(0, 3);
  if (!kommend.length) {
    kasten.append(el("p", "kucukNot", "Im gewählten Altersfenster liegt nichts mehr vor dir."));
    return;
  }

  kasten.append(el("h3", null, kommend.length > 1 ? "Die nächsten Fälligkeiten" : "Die nächste Fälligkeit"));
  const liste = el("ul", "deutungListe");
  kommend.forEach(d => {
    const was = PROMISSOR[d.promissor] || `das Thema von ${d.promissor}`;
    const wo = SIGNIFIKATOR[d.signifikator] || `bei ${d.signifikator}`;
    const wann = alter == null ? `mit ${d.alter.toFixed(0)} Jahren`
      : d.alter <= alter ? "gerade jetzt"
      : d.alter - alter < 1 ? `in etwa ${Math.max(1, Math.round((d.alter - alter) * 12))} Monaten`
      : `in gut ${(d.alter - alter).toFixed(0)} Jahren`;
    const li = el("li");
    li.innerHTML = `<b>${wann}</b> (mit ${d.alter.toFixed(1)}): ${was} — ${wo}, ${tonFuer(d.aspekt)}.`;
    liste.appendChild(li);
  });
  kasten.append(liste);
  kasten.append(el("p", "kucukNot",
    "Eine Direktion ist ein Termin, kein Urteil. Zwei Menschen mit demselben Termin erleben " +
    "Verschiedenes — die Frage ist immer, was zu diesem Zeitpunkt schon vorbereitet war."));
}

/* -------------------------------------------- Zodiacal Releasing: Bedeutung */

const KAPITEL = {
  "Widder":      "ein Kapitel des Anfangens. Man wird geschoben, ehe man den Weg kennt; vieles beginnt, nicht alles bleibt.",
  "Stier":       "ein Kapitel des Sammelns. Langsam, gegenständlich, auf Besitz und Sicherheit hin — und schwer wieder in Bewegung zu bringen.",
  "Zwillinge":   "ein Kapitel der Wege und Worte. Viele Kontakte, viel Lernen, viel Hin und Her; die Kunst ist, etwas davon zu Ende zu bringen.",
  "Krebs":       "ein Kapitel des Hauses. Herkunft, Familie, Wohnort und Gemüt stehen im Vordergrund; das Innere entscheidet über das Äußere.",
  "Löwe":        "ein Kapitel des Hervortretens. Man wird gesehen, gefragt, gefordert — und muss lernen, die Aufmerksamkeit zu tragen.",
  "Jungfrau":    "ein Kapitel der Arbeit und der Ordnung. Dienst, Gesundheit, Handwerk, das Kleinteilige; unspektakulär und tragend.",
  "Waage":       "ein Kapitel der Anderen. Ehe, Verträge, Ausgleich, auch offene Gegnerschaft; wenig entscheidet sich allein.",
  "Skorpion":    "ein Kapitel der Tiefe. Verborgenes kommt hoch, Bindungen werden ernst, Verluste und Erbschaften wiegen schwer.",
  "Schütze":     "ein Kapitel der Weite. Fremde, Lehre, Glaube, Recht; der Horizont rückt hinaus, notfalls indem man selbst fortgeht.",
  "Steinbock":   "ein Kapitel des Aufbaus. Amt, Verantwortung, Ausdauer; es geht langsam voran und bleibt dann stehen.",
  "Wassermann":  "ein Kapitel der Bünde. Freundschaften, Gruppen, Vorhaben, die über einen selbst hinausgehen; man gehört dazu und steht doch daneben.",
  "Fische":      "ein Kapitel des Auflösens. Rückzug, Mitleid, Traum, auch Verwirrung; Altes geht zu Ende, ehe Neues Gestalt hat."
};

function zrDeutung(kasten) {
  const tafel = $("#zrCikti");
  if (!tafel || tafel.hidden) { kasten.hidden = true; return; }
  const alter = alterHeute(leseProfilRoh());
  const treffer = {};
  tafel.querySelectorAll("tbody tr").forEach(tr => {
    const z = [...tr.cells].map(td => td.innerText.trim());
    if (z.length < 5) return;
    const von = parseFloat(z[3]), bis = parseFloat(z[4]);
    if (isNaN(von) || isNaN(bis)) return;
    if (alter == null || alter < von || alter >= bis) return;
    if (!treffer[z[0]]) treffer[z[0]] = { zeichen: nennwort(z[1]), herrscher: nennwort(z[2]), von, bis };
  });

  kasten.hidden = false;
  kasten.innerHTML = "";
  kasten.append(el("h3", null, "Was das heißt"));
  kasten.append(el("p", null,
    "Zodiacal Releasing teilt das Leben in Kapitel, nicht in Ereignisse. Vom Los des Glücks aus " +
    "werden Zeichen für Zeichen Perioden abgezählt, jede so lang wie die Jahre ihres Herrschers. " +
    "Die erste Ebene sagt, worum es über Jahre hinweg geht; die zweite, in welcher Tonart es " +
    "gerade gespielt wird; die dritte färbt die Monate."));

  const l1 = treffer.L1, l2 = treffer.L2;
  if (!l1) {
    kasten.append(el("p", "kucukNot",
      "Ohne Geburtsdatum lässt sich nicht sagen, wo du gerade stehst — die Tafel oben gilt trotzdem."));
    return;
  }

  kasten.append(el("h3", null, "Wo du gerade stehst"));
  const p1 = el("p");
  p1.innerHTML = `<b>Das große Kapitel</b> läuft von deinem ${l1.von.toFixed(0)}. bis zum ` +
    `${l1.bis.toFixed(0)}. Jahr unter ${l1.zeichen}, geführt von ${l1.herrscher}: ` +
    `${KAPITEL[l1.zeichen] || "ein Kapitel eigener Art."}`;
  kasten.append(p1);

  if (l2) {
    const p2 = el("p");
    p2.innerHTML = `<b>Darin die kleinere Periode</b>, von ${l2.von.toFixed(1)} bis ${l2.bis.toFixed(1)} Jahren, ` +
      `unter ${l2.zeichen} und ${l2.herrscher}: ${KAPITEL[l2.zeichen] || "eigener Art."} ` +
      `Sie sagt nicht, worum es geht — das sagt das große Kapitel —, sondern woran man es gerade merkt.`;
    kasten.append(p2);
  }

  kasten.append(el("p", "kucukNot",
    "Die Übergänge sind die eigentlichen Stellen: Wo eine Periode endet und die nächste beginnt, " +
    "ändert sich der Ton, oft binnen weniger Wochen. Schau in der Tafel nach, wann das als Nächstes ansteht."));
}

/* ------------------------------------------------- Antiszien: Bedeutung */

const PLANET_KURZ = {
  "Sonne":   "Selbstbild und Rang", "Mond":    "Gemüt und Herkunft",
  "Merkur":  "Denken und Sprechen", "Venus":   "Zuneigung und Geschmack",
  "Mars":    "Antrieb und Zorn",    "Jupiter": "Zuversicht und Maß",
  "Saturn":  "Ernst und Grenze",    "ASC":     "Auftreten und Leib",
  "Aszendent": "Auftreten und Leib","MC":      "Beruf und Ruf"
};

function antiszienDeutung(kasten) {
  const tafel = $("#azHoroskopCikti");
  if (!tafel || tafel.hidden || !tafel.children.length) { kasten.hidden = true; return; }

  kasten.hidden = false;
  kasten.innerHTML = "";
  kasten.append(el("h3", null, "Was das heißt"));
  kasten.append(el("p", null,
    "Antiszien sind Schattenzwillinge. Spiegelt man einen Grad an der Sonnenwendachse — " +
    "0° Krebs gegenüber 0° Steinbock —, so hat der gespiegelte Punkt dieselbe Deklination und " +
    "denselben Tagbogen: Die Sonne stünde dort gleich hoch und gleich lang am Himmel. " +
    "Zwei solche Punkte sind verbunden, ohne einander zu sehen — sie bilden keinen sichtbaren " +
    "Aspekt und wirken doch aufeinander."));
  kasten.append(el("p", null,
    "Die alte Lesart: Das <b>Antiszion</b> ist die verborgene Freundschaft — zwei Kräfte arbeiten " +
    "zusammen, ohne dass es von außen erkennbar wäre. Das <b>Kontra-Antiszion</b>, gespiegelt an der " +
    "Tag-und-Nacht-Gleiche, gilt als die verdeckte Gegnerschaft: etwas hemmt sich gegenseitig, " +
    "und niemand sieht, woran es liegt.".replace(/<\/?b>/g, "")));

  const funde = [...tafel.querySelectorAll(".naheDranItem")].map(x => x.innerText.trim());
  if (!funde.length) {
    kasten.append(el("p", "kucukNot",
      "In deinem Horoskop fällt kein Punkt auf den Schattenzwilling eines anderen — " +
      "nichts arbeitet hier im Verborgenen mit- oder gegeneinander. Das ist der häufigere Fall."));
    return;
  }

  kasten.append(el("h3", null, funde.length > 1 ? "Deine verborgenen Verbindungen" : "Deine verborgene Verbindung"));
  const liste = el("ul", "deutungListe");
  funde.forEach(f => {
    const kontra = /Kontra/i.test(f);
    const namen = [...new Set((f.match(/(Sonne|Mond|Merkur|Venus|Mars|Jupiter|Saturn|Aszendent|ASC|MC)/g) || []))];
    const li = el("li");
    if (namen.length >= 2) {
      const [a, b] = namen;
      li.innerHTML = `<b>${a} und ${b}</b> — ${PLANET_KURZ[a] || a} trifft auf ${PLANET_KURZ[b] || b}. ` +
        (kontra
          ? "Die beiden hemmen einander verdeckt: die Reibung ist da, aber sie zeigt sich nie dort, wo sie entsteht."
          : "Die beiden arbeiten zusammen, ohne dass man es von außen sieht; was dem einen gelingt, nützt dem anderen still.");
    } else {
      li.textContent = f;
    }
    liste.appendChild(li);
  });
  kasten.append(liste);
  kasten.append(el("p", "kucukNot",
    "Je enger der Gradabstand, desto deutlicher. Unter einem Grad gilt die Verbindung als eng."));
}

/* ------------------------------------------------------------ Verdrahtung */

function haenge(ciktiWahl, kastenId, zeichner) {
  const cikti = $(ciktiWahl);
  if (!cikti) return;
  let kasten = $("#" + kastenId);
  if (!kasten) {
    kasten = el("div", "deutungKasten");
    kasten.id = kastenId;
    kasten.hidden = true;
    cikti.after(kasten);
  }
  const neu = () => { try { zeichner(kasten); } catch (e) { kasten.hidden = true; } };
  new MutationObserver(neu).observe(cikti, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
  neu();
}

haenge("#lbCikti", "lbDeutung", lebensbogenDeutung);
haenge("#zrCikti", "zrDeutung", zrDeutung);
haenge("#azHoroskopCikti", "azDeutung", antiszienDeutung);
