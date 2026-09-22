/* ------------------------------------------------------------------------
   essenz.js — die Zusammenschau.

   Rechnet nichts Eigenes. Das Sternbild leitet sie aus den beiden Namen
   selbst her (das ist derselbe kurze Weg wie im Yıldıznâme-Abschnitt);
   alles Übrige liest sie aus dem, was die anderen Abschnitte bereits
   ausgegeben haben, und fügt es zu einem Text.
   --------------------------------------------------------------------- */
import { cevir, toplam, kalan } from "./ebced.js?v=11";
import { BURCLAR, UNSURLAR, GEZEGENLER } from "./korpus.js?v=11";
import { leseProfilRoh, profilBeschriftung, zurDateneingabe } from "./profil.js?v=11";

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
      el("div", "kalanBaslik", "Dein Geist des 11. Hauses"),
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

  if (sb) {
    cikti.appendChild(absatz("Der Rat", sb.burc.ogut));
  }

  if (!sb && !geist && !zr && !dir) {
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
