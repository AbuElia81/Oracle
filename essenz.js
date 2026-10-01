/* ------------------------------------------------------------------------
   essenz.js — die Zusammenschau.

   Rechnet nichts Eigenes. Das Sternbild leitet sie aus den beiden Namen
   selbst her (das ist derselbe kurze Weg wie im Yıldıznâme-Abschnitt);
   alles Übrige liest sie aus dem, was die anderen Abschnitte bereits
   ausgegeben haben, und fügt es zu einem Text.
   --------------------------------------------------------------------- */
import { cevir, toplam, kalan } from "./ebced.js?v=92";
import { BURCLAR, UNSURLAR, GEZEGENLER, MENZILLER } from "./korpus.js?v=92";
import { leseProfilRoh, profilBeschriftung, zurDateneingabe, aufProfilAenderung } from "./profil.js?v=92";
import { JAHR, profektionJetzt } from "./jahr.js?v=92";
import { radix, transite, progression, zustandVon, ZEICHEN, PLANET, HAUS, mitArtikel } from "./horoskop.js?v=92";
import { mondHeute } from "./elektion.js?v=92";
import { firdariaJetzt, vimshottariJetzt } from "./perioden.js?v=92";
import { zrStand } from "./zr.js?v=92";
import { jahresUmdrehung } from "./solar.js?v=92";
import { lebensmass } from "./lebensmass.js?v=92";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const gezegen = ad => GEZEGENLER.find(g => g.tr === ad);
const komma = n => n.toFixed(1).replace(".", ",");

/* Alter heute, in Jahren, aus dem hinterlegten Geburtsdatum. */
function alterHeute(p) {
  if (!p || !p.datum) return null;
  const [j, m, t] = p.datum.split("-").map(Number);
  const geburt = new Date(j, m - 1, t);
  return (Date.now() - geburt.getTime()) / (365.2425 * 864e5);
}

/* Sorgt dafür, dass ein Abschnitt gerechnet hat, ehe wir ihn auslesen. */
function anstossen(knopfWahl, ciktiWahl) {
  const cikti = $(ciktiWahl), knopf = $(knopfWahl);
  if (cikti && knopf && (cikti.hidden || !cikti.children.length)) knopf.click();
  return cikti;
}

/* --------------------------------------------------------- die Bausteine */

function sternbild(p) {
  if (!p || !p.name || !p.anne) return null;
  const summe = toplam(cevir(p.name)) + toplam(cevir(p.anne));
  if (!summe) return null;
  const burc = BURCLAR[kalan(summe, 12) - 1];
  return {
    summe, burc,
    unsur: UNSURLAR[burc.unsur - 1],
    herr: gezegen(burc.gezegen),
    stern: GEZEGENLER[kalan(summe, 7) - 1],
    menzil: MENZILLER[kalan(summe, 28) - 1],
    kadin: p.cinsiyet === "kadin"
  };
}

function geistname() {
  const c = anstossen("#gBerechnen", "#gCikti");
  const kasten = c && c.querySelector(".geistName .buyukToplam");
  if (!kasten) return null;
  const name = kasten.firstChild ? kasten.firstChild.textContent.trim() : "";
  const herkunft = c.querySelector(".geistName .kucukNot");
  return name ? { name, herkunft: herkunft ? herkunft.textContent.trim() : "" } : null;
}

/* Zodiacal Releasing: die Zeile, in deren Spanne das heutige Alter fällt. */
function zeitalter(alter) {
  const c = anstossen("#zrBerechnen", "#zrCikti");
  if (alter == null) return null;

  /* Der kurze Weg: zr.js gibt seine Rechnung heraus, samt dritter Ebene,
     die in der Tafel gar nicht steht. Nur wenn das fehlschlägt, wird die
     Tafel gelesen. */
  try {
    const st = zrStand(alter);
    if (st && st.L1) {
      const um = x => x && { zeichen: x.glyph + " " + x.zeichen, herrscher: x.herrscher,
                             von: x.von, bis: x.bis, hoehepunkt: x.hoehepunkt, loesung: x.loesung };
      return { L1: um(st.L1), L2: um(st.L2), L3: um(st.L3), fortunaZeichen: st.fortunaZeichen };
    }
  } catch (e) {}

  if (!c) return null;
  const treffer = {};
  c.querySelectorAll("tbody tr").forEach(tr => {
    const z = [...tr.cells].map(td => td.innerText.trim());
    if (z.length < 5) return;
    const stufe = z[0], von = parseFloat(z[3]), bis = parseFloat(z[4]);
    if (isNaN(von) || isNaN(bis) || alter < von || alter >= bis) return;
    if (!treffer[stufe]) treffer[stufe] = { zeichen: z[1], herrscher: z[2], von, bis };
  });
  return treffer.L1 ? treffer : null;
}

/* Lebensbogen: die nächste Direktion, die nach heute fällig wird. */
function naechsteDirektion(alter) {
  const c = anstossen("#lbBerechnen", "#lbCikti");
  if (!c || alter == null) return null;
  let beste = null;
  c.querySelectorAll("tbody tr").forEach(tr => {
    const z = [...tr.cells].map(td => td.innerText.trim());
    if (z.length < 4) return;
    const a = parseFloat(z[0]);
    if (isNaN(a) || a < alter) return;
    if (!beste || a < beste.alter) beste = { alter: a, promissor: z[1], aspekt: z[2], signifikator: z[3] };
  });
  return beste;
}

/* Die Gipfel und Bandlösungen, die der ZR-Abschnitt schon aufgelistet hat. */
function zrGipfel() {
  const c = anstossen("#zrBerechnen", "#zrCikti");
  if (!c || c.hidden) return null;
  const hole = titel => {
    const h = [...c.querySelectorAll("h3")].find(x => x.innerText.includes(titel));
    if (!h) return [];
    let n = h.nextElementSibling;
    while (n && n.tagName !== "UL") n = n.nextElementSibling;
    return n ? [...n.querySelectorAll("li")].map(li => li.innerText.replace(/\s+/g, " ").trim()) : [];
  };
  return { gipfel: hole("Höhepunkte"), loesungen: hole("Lösung des Bandes") };
}

/* Profektionen: das Jahreshaus und sein Herr — die Jahrestechnik schlechthin. */
function profektion() {
  anstossen("#pfBerechnen", "#pfCikti");      // Tafel im Abschnitt füllen
  const pr = profektionJetzt();               // gerechnet, nicht abgelesen
  if (!pr) return null;
  return { text: `dein ${pr.haus}. Haus in ${pr.glyph} ${pr.name}, Herr des Jahres ${pr.herr}; ` +
                 `Thema: ${pr.thema}` };
}

/* Antiszien: die verborgenen Verbindungen des Horoskops. */
function antiszien() {
  const c = anstossen("#azHoroskopBerechnen", "#azHoroskopCikti");
  if (!c || c.hidden) return null;
  const funde = [...c.querySelectorAll(".naheDranItem")].map(x => x.innerText.trim());
  return { funde };
}

/* Die Jahreskästen der einzelnen Abschnitte — jahr.js hat sie schon
   gefüllt; hier wird nur das Wichtigste daraus übernommen. */
function jahresPunkte() {
  const quellen = [
    ["#yildizJahr", "Yıldıznâme"],
    ["#lbJahr",     "Lebensbogen"],
    ["#zrJahr",     "Zodiacal Releasing"],
    ["#azJahr",     "Antiszien"]
  ];
  return quellen.map(([wahl, titel]) => {
    const k = document.querySelector(wahl);
    if (!k || k.hidden || !k.children.length) return null;
    const saetze = [...k.querySelectorAll("p")]
      .filter(x => !x.classList.contains("kucukNot"))
      .map(x => x.textContent.trim());
    const punkte = [...k.querySelectorAll(".deutungListe li")].map(x => x.textContent.trim());
    if (!saetze.length && !punkte.length) return null;
    return { titel, kern: saetze[0] || "", punkte: punkte.slice(0, 3) };
  }).filter(Boolean);
}

/* ------------------------------------------------------- die Zusammenschau
   Die einzelnen Techniken nennen jede einen Herrn der Zeit. Interessant
   wird es, wo mehrere denselben nennen — Systeme, die einander nie gelesen
   haben. Das ist keine Deutung aus der Luft, sondern eine Zählung. */

const PLANET_NAME = {
  sonne:"Sonne", mond:"Mond", merkur:"Merkur", venus:"Venus",
  mars:"Mars", jupiter:"Jupiter", saturn:"Saturn"
};
const ZAHLWORT = { 1:"eine", 2:"zwei", 3:"drei", 4:"vier" };
const NAME_ZU_KEY = Object.fromEntries(Object.entries(PLANET_NAME).map(([k, v]) => [v, k]));

function herrenDerZeit({ zr, prof, fd, vd }) {
  const stimmen = [];
  /* Aus der ZR-Tafel kommt der Herrscher als "♄ Saturn" — Glyphe weg. */
  const blank = t => String(t || "").replace(/[^A-Za-zÄÖÜäöüß]/g, "").trim();
  const zrHerr = zr && zr.L1 ? blank(zr.L1.herrscher) : "";
  if (NAME_ZU_KEY[zrHerr])
    stimmen.push({ key: NAME_ZU_KEY[zrHerr], quelle: "Zodiacal Releasing" });
  const profHerr = prof ? blank(prof.herr) : "";
  if (NAME_ZU_KEY[profHerr])
    stimmen.push({ key: NAME_ZU_KEY[profHerr], quelle: "die Profektion" });
  if (fd && fd.laufend && PLANET_NAME[fd.laufend.key])
    stimmen.push({ key: fd.laufend.key, quelle: "die Firdaria" });
  if (vd && vd.laufend && PLANET_NAME[vd.laufend.key])
    stimmen.push({ key: vd.laufend.key, quelle: "die Vimshottari Dasha" });

  const zaehlung = {};
  stimmen.forEach(st => {
    zaehlung[st.key] = zaehlung[st.key] || { key: st.key, quellen: [] };
    zaehlung[st.key].quellen.push(st.quelle);
  });
  const sortiert = Object.values(zaehlung).sort((a, b) => b.quellen.length - a.quellen.length);
  return { stimmen, sortiert, anzahl: stimmen.length };
}

function undListe(teile) {
  if (teile.length <= 1) return teile[0] || "";
  return teile.slice(0, -1).join(", ") + " und " + teile[teile.length - 1];
}

/* ------------------------------------------------------------- der Text */

function absatz(titel, text) {
  const f = document.createDocumentFragment();
  f.append(el("h3", null, titel), el("p", null, text));
  return f;
}

function schreibe(zielWahl) {
  const cikti = $(typeof zielWahl === "string" ? zielWahl : "#eCikti");
  if (!cikti) return;
  const p = leseProfilRoh();
  cikti.hidden = false;
  cikti.innerHTML = "";

  if (!p) {
    const w = el("p", "kucukNot", "Noch nichts hinterlegt. ");
    const b = el("button", "knopfKlein", "Zur Dateneingabe");
    b.addEventListener("click", zurDateneingabe);
    w.appendChild(b);
    cikti.appendChild(w);
    return;
  }

  const sb = sternbild(p);
  const alter = alterHeute(p);
  const geist = geistname();
  const zr = alter != null ? zeitalter(alter) : null;
  const dir = alter != null ? naechsteDirektion(alter) : null;
  const anti = antiszien();
  const r = radix();
  const tr = transite();
  const prg = progression();
  const zrg = zrGipfel();
  let fd = null, vd = null, sr = null, lm = null;
  try { sr = jahresUmdrehung(); } catch (e) {}
  try { lm = lebensmass(); } catch (e) {}
  try { fd = firdariaJetzt(); } catch (e) {}
  try { vd = vimshottariJetzt(); } catch (e) {}
  let mond = null;
  try { mond = mondHeute(); } catch (e) { mond = null; }
  const prof = profektion();

  cikti.appendChild(el("p", "kucukNot", "Für: " + profilBeschriftung(p) +
    (alter != null ? ` · heute ${alter.toFixed(0)} Jahre alt` : "")));

  if (r) {
    const h = r.planeten[r.herrscher];
    cikti.appendChild(absatz("Dein Horoskop",
      `${ZEICHEN[r.ascZeichen].glyph} ${ZEICHEN[r.ascZeichen].name} stieg auf, als du geboren wurdest, ` +
      `das MC steht in ${ZEICHEN[r.mcZeichen].glyph} ${ZEICHEN[r.mcZeichen].name}; es war eine ` +
      `${r.tagGeburt ? "Taggeburt" : "Nachtgeburt"}. ` +
      (h ? `Herr des Horoskops ist damit ${mitArtikel(r.herrscher)}, und er steht in ` +
           `${ZEICHEN[h.zeichen].glyph} ${ZEICHEN[h.zeichen].name} im ${h.haus}. Haus — ` +
           `${HAUS[h.haus - 1]}. Dorthin zieht dein Leben, noch ehe irgendeine Zeittechnik etwas dazu sagt.` : "")));

    if (r.aspekte.length) {
      const a = r.aspekte[0];
      cikti.appendChild(absatz("Der lauteste Aspekt",
        `Am engsten stehen ${a.a.name} und ${a.b.name} zueinander (${a.name}, ${a.orbis.toFixed(1)}°): ` +
        `${a.a.was} und ${a.b.was} treten bei dir ${a.ton} auf. Das ist der Zug, der sich durch ` +
        `alles zieht, was dir begegnet.`));
    }
  }

  if (sb) {
    const kopf = el("div", "essenzKopf");
    kopf.append(
      el("div", "kalanBaslik", "Dein Zeichen im Yıldıznâme"),
      el("div", "buyukToplam", `${sb.burc.tr} — ${sb.burc.de}`),
      el("div", "kucukNot",
        `${sb.unsur.tr} · ${sb.unsur.de} — ${sb.unsur.tabiat} · Herr: ${sb.herr.tr} (${sb.herr.de})`)
    );
    cikti.appendChild(kopf);

    cikti.appendChild(absatz("Wer du bist",
      `${sb.burc.tabiat} ${sb.kadin ? sb.burc.kadin : sb.burc.erkek} ` +
      `Dein Element ist ${sb.unsur.tr.toLowerCase() === "ateş" ? "das Feuer" :
        sb.unsur.de === "Erde" ? "die Erde" : sb.unsur.de === "Luft" ? "die Luft" : "das Wasser"}: ` +
      `${sb.unsur.metin}`));

    if (sb.menzil) {
      cikti.appendChild(absatz(`Deine Mondstation — ${sb.menzil.tr}`,
        `Von den achtundzwanzig Herbergen des Mondes fällt deine Summe auf die ` +
        `${sb.menzil.no}.: ${sb.menzil.hukum} Günstig für ${sb.menzil.iyi.toLowerCase()}; ` +
        `meide ${sb.menzil.kacin.toLowerCase()}.`));
    }

    cikti.appendChild(absatz(`Was ${sb.herr.tr} dir gibt und nimmt`,
      `Über deinem Zeichen steht ${sb.herr.tr}, ${sb.herr.de}. ` +
      `Er gibt: ${sb.herr.armagan}. Er nimmt: ${sb.herr.tehlike}. ` +
      `Sein Tag ist ${sb.herr.gun}, sein Metall ${sb.herr.maden}, seine Anrufung ${sb.herr.esma}. ` +
      `Aus der Summe ${sb.summe} tritt außerdem ${sb.stern.tr} hinzu und bringt ` +
      `${sb.stern.armagan.split(",").slice(0, 2).map(t => t.trim()).join(" und ")} mit.`));
  }

  if (geist) {
    const kasten = el("div", "essenzKopf");
    kasten.append(
      el("div", "kalanBaslik", "Dein Spirit Name"),
      el("div", "buyukToplam", geist.name),
      geist.herkunft ? el("div", "kucukNot", geist.herkunft) : el("span")
    );
    cikti.appendChild(kasten);
    cikti.appendChild(absatz("Der gute Geist",
      `Aus dem wirklichen Himmel deiner Geburtsstunde — nicht aus deinem Namen, sondern aus ` +
      `Aszendent, Sonne, Mond, Glückspunkt und der Syzygie davor — tritt ${geist.name} hervor. ` +
      `Agrippa nennt ihn den Geist des elften Hauses, des Hauses des guten Dämons: nicht einen ` +
      `Fremden, der über dich wacht, sondern den Namen dessen, was in dir für dich ist.`));
  }

  if (zr) {
    const l1 = zr.L1, l2 = zr.L2, l3 = zr.L3;
    cikti.appendChild(absatz("Wo du gerade stehst",
      `Im Zodiacal Releasing läuft seit deinem ${l1.von.toFixed(0)}. Jahr und noch bis zum ` +
      `${l1.bis.toFixed(0)}. das große Kapitel ${l1.zeichen}, geführt von ${l1.herrscher}. ` +
      (l2 ? `Darin steht gerade das kleinere ${l2.zeichen} unter ${l2.herrscher}, ` +
            `von ${komma(l2.von)} bis ${komma(l2.bis)} Jahren. ` : "") +
      (l3 ? `Und darin wiederum ${l3.zeichen} unter ${l3.herrscher}, das nur bis ` +
            `${komma(l3.bis)} Jahren währt. ` : "") +
      `Die erste Ebene sagt, worum es über Jahre hinweg geht; die zweite, in welcher Tonart ` +
      `es gerade gespielt wird; die dritte färbt die Monate.` +
      ((l2 && l2.hoehepunkt) || (l3 && l3.hoehepunkt)
        ? ` Dabei steht ${l2 && l2.hoehepunkt ? "die zweite" : "die dritte"} Ebene gerade winkelhaft ` +
          `zum Los des Glücks — eine der tätigen Strecken.` : "")));
  }

  if (zrg && alter != null) {
    const laufend = zrg.gipfel.find(g => {
      const m = g.match(/^([\d.]+)\s*–\s*([\d.]+)/);
      return m && alter >= parseFloat(m[1]) && alter < parseFloat(m[2]);
    });
    const kommend = zrg.gipfel.find(g => {
      const m = g.match(/^([\d.]+)/);
      return m && parseFloat(m[1]) > alter;
    });
    if (laufend || kommend || zrg.loesungen.length) {
      cikti.appendChild(absatz("Gipfel und Wendepunkte",
        (laufend
          ? `Du stehst gerade in einem Gipfel deines Kapitels: ${laufend} Das sind die tätigen, sichtbaren Strecken. `
          : "Du stehst gerade nicht in einem Gipfel — eine der stillen Strecken, in denen mehr vorbereitet als entschieden wird. ") +
        (kommend ? `Der nächste beginnt bei ${kommend} ` : "") +
        (() => {
          const kuenftig = zrg.loesungen.filter(l => {
            const m = l.match(/([\d.]+)\s*Jahren/);
            return m && parseFloat(m[1]) > alter;
          });
          if (kuenftig.length) return `Und einmal löst sich das Band: ${kuenftig[0]} Dann setzt das Leben an anderer Stelle neu an.`;
          const vergangen = zrg.loesungen.filter(l => {
            const m = l.match(/([\d.]+)\s*Jahren/);
            return m && parseFloat(m[1]) <= alter;
          });
          if (vergangen.length) return `Die letzte Lösung des Bandes liegt hinter dir: ${vergangen[vergangen.length - 1]}`;
          return "";
        })()));
    }
  }

  if ((fd && fd.laufend) || (vd && vd.laufend)) {
    const teile = [];
    if (zr && zr.L1) {
      teile.push(`<b>Zodiacal Releasing</b> gibt das große Kapitel ${zr.L1.zeichen} unter ` +
        `${zr.L1.herrscher}` +
        (zr.L2 ? `, darin ${zr.L2.zeichen} unter ${zr.L2.herrscher}` : "") +
        (zr.L3 ? `, und darin ${zr.L3.zeichen} unter ${zr.L3.herrscher}` : ""));
    }
    if (fd && fd.laufend) {
      teile.push(`Die <b>Firdaria</b> der Perser gibt diese Jahre ${fd.laufend.name} ` +
        `(${komma(fd.laufend.anfang)} bis ${komma(fd.laufend.ende)})` +
        (fd.laufendUnter && fd.laufendUnter.key !== fd.laufend.key
          ? `, darin gerade ${fd.laufendUnter.name}` : "") +
        ` — ${fd.laufend.was}`);
    }
    if (vd && vd.laufend) {
      teile.push(`Die <b>Vimshottari Dasha</b> aus Indien, gezählt von deinem Mondhaus ` +
        `${vd.nakshatra}, steht bei ${vd.laufend.name}` +
        (vd.laufendUnter ? ` mit ${vd.laufendUnter.name} darin` : "") +
        ` — ${vd.laufend.was}`);
    }
    const p = el("p");
    p.innerHTML = teile.join(". ") + ". Zwei Systeme, die den Tierkreis gar nicht befragen, " +
      "sondern feste Jahresmengen verteilen — und die trotzdem auf dieselben Jahre zeigen wie die übrigen.";
    cikti.appendChild(el("h3", null, "Die Herren deiner Zeit"));
    cikti.appendChild(p);
  }

  if (dir) {
    const jahre = dir.alter - alter;
    const wann = jahre < 1
      ? `in ${Math.max(1, Math.round(jahre * 12))} Monaten`
      : `in gut ${jahre.toFixed(0)} Jahren`;
    cikti.appendChild(absatz("Was als Nächstes anklopft",
      `Der Lebensbogen zeigt die nächste Direktion ${wann}, mit ${dir.alter.toFixed(1)} Jahren: ` +
      `${dir.promissor} ${dir.aspekt} ${dir.signifikator}. Primärdirektionen sind keine Ereignisse, ` +
      `sondern Fälligkeiten — sie sagen, wann ein Thema an die Tür kommt, nicht, wer öffnet.`));
  }

  if (anti) {
    if (anti.funde.length) {
      const namen = anti.funde.map(f => {
        const n = [...new Set((f.match(/(Sonne|Mond|Merkur|Venus|Mars|Jupiter|Saturn|Aszendent|ASC|MC)/g) || []))];
        return n.slice(0, 2).join(" und ");
      }).filter(Boolean);
      cikti.appendChild(absatz("Was im Verborgenen mitläuft",
        `Im Horoskop fallen ${namen.length === 1 ? "zwei Punkte" : "mehrere Punkte"} auf den ` +
        `Schattenzwilling des jeweils anderen — gespiegelt an der Sonnenwendachse, gleiche Höhe, ` +
        `gleicher Tagbogen, und doch kein sichtbarer Aspekt: ${namen.join("; ")}. ` +
        `Solche Paare arbeiten miteinander, ohne dass man es von außen erkennt.`));
    } else {
      cikti.appendChild(absatz("Was im Verborgenen mitläuft",
        "Kein Punkt deines Horoskops fällt auf den Schattenzwilling eines anderen. " +
        "Bei dir läuft nichts im Verborgenen mit — was wirkt, ist sichtbar."));
    }
  }

  /* Die Jahreskästen der anderen Abschnitte entstehen erst, wenn deren
     Rechner fertig sind. Deshalb wird dieser Block nachgezogen, bis alles
     da ist — er ersetzt sich dabei selbst. */
  const jahrFach = el("div", "jahrFach");
  cikti.appendChild(jahrFach);

  function zeichneJahr() {
    const jahr = jahresPunkte();
    const pf = profektion();
    jahrFach.innerHTML = "";
    if (!jahr.length && !pf) return 0;
    jahrFach.appendChild(el("h3", null, `Dieses Jahr — ${JAHR}`));
    jahrFach.appendChild(el("p", null,
      `Was die einzelnen Techniken für ${JAHR} sagen, nebeneinandergelegt:`));
    if (sr) {
      const MON = ["Januar","Februar","März","April","Mai","Juni","Juli",
                   "August","September","Oktober","November","Dezember"];
      const zp = sr.zeitpunkt;
      const sp = el("p");
      const stuetzen = [];
      if (sr.firdar && sr.firdar.winkelhaft) stuetzen.push("der Firdar steht winkelhaft zum Zeichen des Jahres");
      if (sr.firdar && (sr.firdar.sichtZumHerrn || sr.firdar.key === sr.herrDesJahres)) stuetzen.push("er sieht den Herrn des Jahres");
      if (sr.teilhaber && (sr.teilhaber.sichtZumHerrn || sr.teilhaber.key === sr.herrDesJahres)) stuetzen.push("der Teilhaber sieht ihn auch");
      sp.innerHTML = `<b>Jahresumdrehung:</b> Am ${zp.tag}. ${MON[zp.monat - 1]} ${zp.jahr} kehrte ` +
        `die Sonne auf ihren Geburtsgrad zurück. Der Aszendent jener Stunde fällt in dein ` +
        `${sr.umAscImNatal}. Geburtshaus — ${HAUS[sr.umAscImNatal - 1]}. Herr des Jahres ist ` +
        `${mitArtikel(sr.herrDesJahres)}` +
        (sr.firdarKey ? `, Firdar ist ${mitArtikel(sr.firdarKey)}` : "") +
        (sr.teilhaberKey ? ` mit ${mitArtikel(sr.teilhaberKey)} als Teilhaber` : "") + ". " +
        (stuetzen.length >= 2
          ? `Nach Abū Maʿšar ein <b>sprechendes Jahr</b>: ${stuetzen.join(", ")}.`
          : stuetzen.length === 1
            ? `Eine Stütze: ${stuetzen[0]} — das Jahr spricht halblaut.`
            : `Weder Firdar noch Teilhaber stützen das Zeichen des Jahres — nach Abū Maʿšar ein <b>stilles Jahr</b>.`);
      jahrFach.appendChild(sp);
    }
    if (mond) {
      const mp = el("p");
      mp.innerHTML = `<b>Heute:</b> Der Mond steht in ${ZEICHEN[mond.zeichen].glyph} ` +
        `${ZEICHEN[mond.zeichen].name}, in der ${mond.menzilNr}. Station — ${mond.menzil.tr}, ` +
        `${mond.menzil.hukum.replace(/\.$/, "")} — und ${mond.zunehmend ? "nimmt zu" : "nimmt ab"}. ` +
        `Günstig für: ${mond.menzil.iyi}. Meide: ${mond.menzil.kacin}.` +
        (mond.verbrannt ? " Er steht dabei in der verbrannten Bahn — heute nichts anfangen, was halten soll." : "");
      jahrFach.appendChild(mp);
    }
    if (tr && tr.treffer.length) {
      const t = tr.treffer[0];
      const tp = el("p");
      tp.innerHTML = `<b>Transit:</b> ${t.transit.name} steht gerade ${t.name.toLowerCase()} zu ` +
        `deinem ${t.natal.name} (${t.orbis.toFixed(1)}°) — ` +
        (t.natal.achse ? "die Achse selbst wird angesprochen" : `${t.natal.was} — berührt`) +
        `, ${t.ton}.`;
      jahrFach.appendChild(tp);
    }
    if (prg) {
      const gp = el("p");
      gp.innerHTML = `<b>Progression:</b> deine progressierte Sonne steht in ` +
        `${ZEICHEN[prg.sonne.zeichen].glyph} ${ZEICHEN[prg.sonne.zeichen].name}, ` +
        `der progressierte Mond in ${ZEICHEN[prg.mond.zeichen].glyph} ${ZEICHEN[prg.mond.zeichen].name} ` +
        `(${prg.mond.haus}. Haus) — ${prg.phaseText}.`;
      jahrFach.appendChild(gp);
    }
    if (pf) {
      const pp = el("p");
      pp.innerHTML = `<b>Profektion:</b> ${pf.text} — in dieser Technik gibt das Jahreshaus ` +
        `dem Jahr sein Thema, und sein Herrscher ist der Herr des Jahres.`;
      jahrFach.appendChild(pp);
    }
    const liste = el("ul", "deutungListe");
    jahr.forEach(j => {
      const li = el("li");
      li.innerHTML = `<b>${j.titel}:</b> ${j.kern}` +
        (j.punkte.length ? `<br><span class="jahrPunkte">${j.punkte.join("<br>")}</span>` : "");
      liste.appendChild(li);
    });
    jahrFach.appendChild(liste);
    return jahr.length;
  }

  zeichneJahr();
  [500, 1200, 2500].forEach(ms => setTimeout(() => {
    if (document.body.contains(jahrFach)) zeichneJahr();
  }, ms));

  if (lm) {
    cikti.appendChild(absatz("Der Geber des Lebens",
      `Die alte Lehre fragt, von welcher Stelle des Horoskops das Leben ausgeht — bei dir ist ` +
      `das ${lm.hylech.art} auf ${ZEICHEN[lm.hZeichen].glyph} ${ZEICHEN[lm.hZeichen].name}. ` +
      `Wer darüber gebietet, heißt der Hausherr des Lebens: ${mitArtikel(lm.alkochoden)}, ` +
      `bei dir im ${lm.alkoHaus}. Haus — ${HAUS[lm.alkoHaus - 1]}. Von dort nimmt deine ` +
      `Lebenskraft ihre Färbung. Die Jahreszahl, die die Tradition daraus zieht, steht ` +
      `im eigenen Abschnitt und gehört nicht in eine Zusammenschau — sie ist ein Streitpunkt ` +
      `der Überlieferung, kein Befund.`));
  }

  if (sb) {
    cikti.appendChild(absatz("Der Rat", sb.burc.ogut));
  }

  /* ------------------------------------------------- die Zusammenschau */
  const h = herrenDerZeit({ zr, prof: profektionJetzt(), fd, vd });

  if (sb || r || h.anzahl) {
    const kasten = el("div", "schlussKasten");
    kasten.appendChild(el("h3", null, "Was das zusammen ergibt"));

    /* Das Bleibende zuerst. */
    if (r || sb) {
      const hp = r && r.planeten[r.herrscher];
      const satz = el("p");
      satz.innerHTML =
        (sb ? `Im Namen liegt ${sb.burc.tr} — ein Zeichen ${sb.unsur.de === "Feuer" ? "des Feuers" :
              sb.unsur.de === "Erde" ? "der Erde" : sb.unsur.de === "Luft" ? "der Luft" : "des Wassers"}, ` +
              `unter ${sb.herr.tr}. ` : "") +
        (r && hp
          ? `Im Himmel deiner Geburtsstunde steigt ${ZEICHEN[r.ascZeichen].name} auf, und ${mitArtikel(r.herrscher)} ` +
            `führt von ${ZEICHEN[hp.zeichen].name} aus, ${HAUS[hp.haus - 1]}. `
          : "") +
        `Das ist der Teil, der sich nicht ändert — er läuft unter allem mit, was die Zeittechniken sagen.`;
      kasten.appendChild(satz);
    }

    /* Und nun: worauf mehrere zugleich zeigen. */
    if (h.anzahl) {
      const oben = h.sortiert[0];
      const mehrfach = oben.quellen.length > 1;
      const z = zustandVon(oben.key);

      const p1 = el("p");
      if (mehrfach) {
        p1.innerHTML = `Auffällig ist, worauf gerade <b>mehrere Systeme zugleich</b> zeigen: ` +
          `${undListe(oben.quellen)} geben diese Jahre ${mitArtikel(oben.key)}. ` +
          `${ZAHLWORT[h.anzahl] === "eine" ? "Eine" : (ZAHLWORT[h.anzahl] || h.anzahl).replace(/^./, c => c.toUpperCase())} Überlieferungen sprechen hier mit, die einander nie gelesen haben — ` +
          `persisch, hellenistisch, indisch —, und ${ZAHLWORT[oben.quellen.length] || oben.quellen.length} ` +
          `davon nennen denselben Herrn.`;
      } else {
        p1.innerHTML = `Die Zeittechniken nennen zurzeit verschiedene Herren: ` +
          undListe(h.stimmen.map(st => `${st.quelle} ${mitArtikel(st.key)}`)) + `. ` +
          `Keiner hat das Übergewicht — eine Strecke, in der mehreres nebeneinander läuft, ` +
          `statt dass eine Sache alles bestimmt.`;
      }
      kasten.appendChild(p1);

      if (mehrfach && z) {
        const p2 = el("p");
        p2.innerHTML = `Und dieser Herr ist bei dir kein Unbekannter: ${mitArtikel(oben.key)} steht ` +
          `in ${z.zeichenGlyph} ${z.zeichenName}, im ${z.haus}. Haus — ${z.hausOrt}. ` +
          `Dort, und nicht anderswo, wird sich in diesen Jahren entscheiden, was sie bringen. ` +
          (z.wuerde.stufe === "—"
            ? `Er hat dabei keine besondere Würde: Es hängt an den Umständen und an dir, nicht an einer mitgegebenen Stärke.`
            : `Er steht dabei ${z.wuerde.text}, und das gibt der Sache ihr Gewicht.`);
        kasten.appendChild(p2);
      }
    }

    /* Der Schluss. */
    const ende = el("p", "schlussWort");
    ende.innerHTML =
      "Keine dieser Künste sagt die Zukunft voraus, und keine wird hier so gebraucht. " +
      "Sie geben Themen, Fälligkeiten und Tonarten — sie sagen, <em>worum es geht</em> und " +
      "<em>wann es dran ist</em>, nicht, was daraus wird. Das steht in keiner Tafel.";
    kasten.appendChild(ende);

    cikti.appendChild(kasten);
  }

  /* Zwei Abschnitte kann die Essenz nicht von sich aus füllen — sie brauchen
     etwas, das nur du beisteuern kannst. */
  const offen = [];
  if (document.querySelector("#soru")) offen.push(
    ["Niyet — die Frage", "eine Frage in einem Satz; die Antwort hängt auch an der Stunde, in der du fragst"]);
  if (document.querySelector("#u2ad")) offen.push(
    ["İsim uyumu", "den Namen eines zweiten Menschen und den seiner Mutter"]);
  if (document.querySelector("#rmFrage")) offen.push(
    ["ʿIlm al-Raml", "eine Frage — der Sand antwortet auf den Augenblick, nicht auf das Leben"]);
  if (document.querySelector("#ekVorhaben")) offen.push(
    ["Der rechte Zeitpunkt", "ein Vorhaben, das du beginnen willst; dann prüft er den Mondstand darauf"]);
  if (offen.length) {
    const kasten = el("div", "offeneListe");
    kasten.append(el("h3", null, "Was hier noch fehlt"));
    kasten.append(el("p", null,
      "Zwei Abschnitte stehen bereit, brauchen aber etwas von dir:"));
    const ul = el("ul", "deutungListe");
    offen.forEach(([titel, was]) => {
      const li = el("li");
      li.innerHTML = `<b>${titel}</b> — ${was}.`;
      ul.appendChild(li);
    });
    kasten.append(ul);
    cikti.appendChild(kasten);
  }

  if (!sb && !geist && !zr && !dir && !anti && !prof && !r && !fd && !vd && !lm) {
    const w = el("p", "kucukNot", "Es fehlen noch Angaben. ");
    const b = el("button", "knopfKlein", "Zur Dateneingabe");
    b.addEventListener("click", zurDateneingabe);
    w.appendChild(b);
    cikti.appendChild(w);
  }
}

$("#eLesen")?.addEventListener("click", () => schreibe("#eCikti"));

/* Beim Öffnen des Reiters von selbst lesen. */
const reiter = document.querySelector('nav#reiter button[data-bolum="bEssenz"]');
if (reiter) reiter.addEventListener("click", () => setTimeout(() => schreibe("#eCikti"), 0));

/* ------------------------------------------------ Essenz auf der Hauptseite
   Wer seine Angaben eingetragen hat, soll nicht erst einen Reiter suchen:
   Die Zusammenschau steht gleich darunter, und von dort geht man in die
   einzelnen Abschnitte, um zu vertiefen. */
function startEssenz() {
  const ziel = $("#eStartCikti");
  const rahmen = $("#eStart");
  if (!ziel || !rahmen) return;
  const p = leseProfilRoh();
  const etwasDa = p && ((p.name && p.anne) || (p.datum && p.zeit && !isNaN(parseFloat(p.breite))));
  rahmen.hidden = !etwasDa;
  if (etwasDa) schreibe("#eStartCikti");
}

let startUhr = null;
function startNachziehen() {
  clearTimeout(startUhr);
  startUhr = setTimeout(startEssenz, 600);
  [1500, 3000].forEach(ms => setTimeout(startEssenz, ms));
}
aufProfilAenderung(startNachziehen);
if (document.readyState === "complete") startNachziehen();
else window.addEventListener("load", startNachziehen);
