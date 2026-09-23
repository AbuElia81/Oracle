/* ------------------------------------------------------------------------
   essenz.js — die Zusammenschau.

   Rechnet nichts Eigenes. Das Sternbild leitet sie aus den beiden Namen
   selbst her (das ist derselbe kurze Weg wie im Yıldıznâme-Abschnitt);
   alles Übrige liest sie aus dem, was die anderen Abschnitte bereits
   ausgegeben haben, und fügt es zu einem Text.
   --------------------------------------------------------------------- */
import { cevir, toplam, kalan } from "./ebced.js?v=38";
import { BURCLAR, UNSURLAR, GEZEGENLER, MENZILLER } from "./korpus.js?v=38";
import { leseProfilRoh, profilBeschriftung, zurDateneingabe } from "./profil.js?v=38";
import { JAHR, profektionJetzt } from "./jahr.js?v=38";

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const gezegen = ad => GEZEGENLER.find(g => g.tr === ad);

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
  if (!c || alter == null) return null;
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

/* Profektionen: das Jahreshaus und sein Herr — die Jahrestechnik schlechthin. */
function profektion() {
  anstossen("#pfBerechnen", "#pfCikti");      // Tafel im Abschnitt füllen
  const pr = profektionJetzt();               // gerechnet, nicht abgelesen
  if (!pr) return null;
  return { text: `dein ${pr.haus}. Haus in ${pr.glyph} ${pr.name}, Herr des Jahres ${pr.herr}; ` +
                 `Thema: ${pr.thema}` };
}

/* Dodekaoros: das Tier der Sonne. */
function dodekaoros() {
  const c = anstossen("#dkBerechnen", "#dkCikti");
  if (!c || c.hidden) return null;
  const kopf = c.querySelector(".buyukToplam, .almutenPlanet, h3");
  const tier = kopf ? kopf.innerText.trim() : "";
  const unter = c.querySelector(".kucukNot");
  return tier ? { tier, dazu: unter ? unter.innerText.replace(/\s+/g, " ").trim() : "" } : null;
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

/* ------------------------------------------------------------- der Text */

function absatz(titel, text) {
  const f = document.createDocumentFragment();
  f.append(el("h3", null, titel), el("p", null, text));
  return f;
}

function schreibe() {
  const cikti = $("#eCikti");
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
  const prof = profektion();
  const dodek = dodekaoros();

  cikti.appendChild(el("p", "kucukNot", "Für: " + profilBeschriftung(p) +
    (alter != null ? ` · heute ${alter.toFixed(0)} Jahre alt` : "")));

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
    const l1 = zr.L1, l2 = zr.L2;
    cikti.appendChild(absatz("Wo du gerade stehst",
      `Im Zodiacal Releasing läuft seit deinem ${l1.von.toFixed(0)}. Jahr und noch bis zum ` +
      `${l1.bis.toFixed(0)}. das große Kapitel ${l1.zeichen}, geführt von ${l1.herrscher}. ` +
      (l2 ? `Darin steht gerade das kleinere ${l2.zeichen} unter ${l2.herrscher}, ` +
            `von ${l2.von.toFixed(1)} bis ${l2.bis.toFixed(1)} Jahren. ` : "") +
      `Das große Kapitel sagt, worum es in diesen Jahren überhaupt geht; das kleinere, ` +
      `in welcher Tonart es gerade gespielt wird.`));
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

  if (dodek) {
    cikti.appendChild(absatz("Dein Tier",
      `Die ägyptische Zwölftierreihe, der Dodekaoros, ordnet jedem Tierkreiszeichen ein Tier zu. ` +
      `Für den Stand deiner Sonne ist es: ${dodek.tier}. ` +
      `Eine ältere Schicht als der Tierkreis selbst — dieselbe Einteilung, andere Bilder.`));
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

  if (sb) {
    cikti.appendChild(absatz("Der Rat", sb.burc.ogut));
  }

  /* Zwei Abschnitte kann die Essenz nicht von sich aus füllen — sie brauchen
     etwas, das nur du beisteuern kannst. */
  const offen = [];
  if (document.querySelector("#soru")) offen.push(
    ["Niyet — die Frage", "eine Frage in einem Satz; die Antwort hängt auch an der Stunde, in der du fragst"]);
  if (document.querySelector("#u2ad")) offen.push(
    ["İsim uyumu", "den Namen eines zweiten Menschen und den seiner Mutter"]);
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

  if (!sb && !geist && !zr && !dir && !anti && !prof && !dodek) {
    const w = el("p", "kucukNot", "Es fehlen noch Angaben. ");
    const b = el("button", "knopfKlein", "Zur Dateneingabe");
    b.addEventListener("click", zurDateneingabe);
    w.appendChild(b);
    cikti.appendChild(w);
  }
}

$("#eLesen").addEventListener("click", schreibe);

/* Beim Öffnen des Reiters von selbst lesen. */
const reiter = document.querySelector('nav#reiter button[data-bolum="bEssenz"]');
if (reiter) reiter.addEventListener("click", () => setTimeout(schreibe, 0));
