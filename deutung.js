/* ------------------------------------------------------------------------
   deutung.js — Deutungen unter den Lebensbogen und unter Zodiacal Releasing.

   Rührt an den beiden Rechnern nichts. Sie schreiben in ihre eigenen
   Ausgabefelder; dieses Modul sieht dabei zu (MutationObserver), liest die
   fertigen Tafeln und setzt seinen Text in einen eigenen Kasten daneben.
   Deshalb überlebt die Deutung auch ein Neurechnen.
   --------------------------------------------------------------------- */
import { leseProfilRoh } from "./profil.js?v=274";
import { profektionJetzt } from "./jahr.js?v=274";
import { zustandVon, radix, transite, PLANET, REIHE, ZEICHEN, HAUS, mitArtikel, grossMitArtikel } from "./horoskop.js?v=274";
import { zrStand } from "./zr.js?v=274";
import { rt, zahl, ordnung, setzeRestSprache } from "./rest-texte.js?v=274";
import { aktuelleSprache } from "./sprachen.js?v=274";
setzeRestSprache(aktuelleSprache());

/* Ein Satz, der eine Zeitherrscher-Aussage am Geburtshoroskop festmacht.
   Genau darum geht es: Die Technik sagt wann, das Horoskop sagt was. */
/* Dieses Modul liest die fertig gezeichneten Tafeln und bekommt die Namen
   daher in der gerade eingestellten Sprache. Nachgeschlagen wird aber über
   sprachfeste Schlüssel — vorher stand im englischen Bogen "bei Ascendant"
   statt des Satzes, weil der Nachschlag auf "Aszendent" nicht traf. */
const ACHSEN_SCHLUESSEL = { mc:"mc", ic:"ic", asc:"asc", desc:"desc" };

function schluesselVonAnzeige(text) {
  const w = String(text || "").trim();
  if (!w) return null;
  for (const k of REIHE) if (PLANET[k] && gleich(PLANET[k].name, w)) return k;
  const roh = w.toUpperCase().replace(/[^A-Z]/g, "");
  if (roh === "MC") return "mc";
  if (roh === "IC") return "ic";
  if (roh === "ASC" || gleich(rt("achse.asc"), w)) return "asc";
  if (roh === "DESC" || gleich(rt("achse.desc"), w)) return "desc";
  if (gleich(rt("achse.mc"), w)) return "mc";
  if (gleich(rt("achse.ic"), w)) return "ic";
  return null;
}
function gleich(a, b) {
  const n = x => String(x || "").toLowerCase().replace(/^(der|die|das|the|il|la|lo|l')\s*/, "").trim();
  return n(a) === n(b);
}

function konkret(planetName, rolleSatz) {
  const z = zustandVon(planetName);
  if (!z) return null;
  return rt("dg.konkret", rolleSatz, z.zeichenGlyph, z.zeichenName,
            ordnung(z.haus, true), z.hausOrt, rt("dg.wuerde." + z.wuerde.stufe));
}

const $ = s => document.querySelector(s);
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

function alterHeute(p) {
  if (!p || !p.datum) return null;
  const [j, m, t] = p.datum.split("-").map(Number);
  return (Date.now() - new Date(j, m - 1, t).getTime()) / (365.2425 * 864e5);
}

/* ------------------------------------------------- Lebensbogen: Bedeutung */

/* Was ein Promissor bringt, wo ein Signifikator es trifft und in
   welchem Ton — alles drei aus der Sprachtafel, nachgeschlagen über
   sprachfeste Schlüssel. */
function promissorText(key, anzeige) {
  return key ? rt("dg.pr." + key) : rt("dg.pr.sonst", anzeige);
}
function signifikatorText(key, anzeige) {
  const k = key === "asc" ? "asc" : key === "desc" ? "desc" : key === "mc" ? "mc" : key === "ic" ? "ic" : null;
  return k ? rt("dg.sg." + k) : rt("dg.sg.sonst", anzeige);
}
function tonFuer(aspekt) {
  const a = (aspekt || "").replace(/\(.*\)/, "").trim();
  for (const k of ["Konjunktion","Quadrat","Opposition","Trigon","Sextil"])
    if (a.includes(k)) return rt("dg.ton." + k);
  return rt("dg.ton.Konjunktion");
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
  kasten.append(el("h3", null, rt("dg.wasHeisst")));
  kasten.append(el("p", null, rt("dg.lbText")));

  const kommend = alter == null ? zeilen.slice(0, 3)
                                : zeilen.filter(d => d.alter >= alter - 1).slice(0, 3);
  if (!kommend.length) {
    kasten.append(el("p", "kucukNot", rt("dg.lbLeer")));
    return;
  }

  kasten.append(el("h3", null, rt(kommend.length > 1 ? "dg.lbTitelMehr" : "dg.lbTitelEine")));
  const liste = el("ul", "deutungListe");
  kommend.forEach(d => {
    const was = promissorText(schluesselVonAnzeige(d.promissor), d.promissor);
    const wo = signifikatorText(schluesselVonAnzeige(d.signifikator), d.signifikator);
    const wann = alter == null ? rt("dg.wannJahre", d.alter.toFixed(0))
      : d.alter <= alter ? rt("dg.wannJetzt")
      : d.alter - alter < 1 ? rt("dg.wannMonate", Math.max(1, Math.round((d.alter - alter) * 12)))
      : rt("dg.wannGut", (d.alter - alter).toFixed(0));
    const li = el("li");
    li.innerHTML = rt("dg.lbZeile", wann, zahl(d.alter), was, wo, tonFuer(d.aspekt));
    liste.appendChild(li);
  });
  kasten.append(liste);

  const erster = kommend[0];
  const festP = erster && konkret(erster.promissor, rt("dg.lbRolle", grossMitArtikel(erster.promissor)));
  if (festP) {
    kasten.append(el("h3", null, rt("dg.lbAnklopft")));
    kasten.append(el("p", null, festP));
  }

  kasten.append(el("p", "kucukNot", rt("dg.lbNote")));
}

/* -------------------------------------------- Zodiacal Releasing: Bedeutung */

/* Das Kapitel wird über den Zeichenindex nachgeschlagen, nicht über den
   angezeigten Namen: Der wechselt mit der Sprache. */
function zeichenIndex(anzeige) {
  const n = x => String(x || "").toLowerCase().trim();
  return ZEICHEN.findIndex(z => n(z.name) === n(anzeige));
}
function kapitelText(anzeige, kurz) {
  const i = zeichenIndex(anzeige);
  if (i < 0) return rt(kurz ? "dg.zrEigenKurz" : "dg.zrEigen");
  return rt("dg.kapitel")[i];
}

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
  kasten.append(el("h3", null, rt("dg.wasHeisst")));
  kasten.append(el("p", null, rt("dg.zrText")));

  const l1 = treffer.L1, l2 = treffer.L2;
  if (!l1) {
    kasten.append(el("p", "kucukNot", rt("dg.zrOhneDatum")));
    return;
  }

  kasten.append(el("h3", null, rt("dg.zrWoDuStehst")));
  const p1 = el("p");
  p1.innerHTML = rt("dg.zrL1", ordnung(l1.von.toFixed(0)), ordnung(l1.bis.toFixed(0)),
    l1.zeichen, l1.herrscher, kapitelText(l1.zeichen));
  kasten.append(p1);

  if (l2) {
    const p2 = el("p");
    p2.innerHTML = rt("dg.zrL2", zahl(l2.von), zahl(l2.bis), l2.zeichen, l2.herrscher,
      kapitelText(l2.zeichen, true));
    kasten.append(p2);
  }

  /* Die dritte Ebene steht nicht in der Tafel; zr.js gibt sie heraus. */
  let l3 = null;
  try { const st = zrStand(alter); if (st && st.L3) l3 = st.L3; } catch (e) {}
  if (l3) {
    const p3 = el("p");
    p3.innerHTML = rt("dg.zrL3", l3.glyph, l3.zeichen, l3.herrscher, zahl(l3.bis),
      kapitelText(l3.zeichen, true).replace(/^./, c => c.toUpperCase()));
    kasten.append(p3);
  }

  const festL1 = l1 && konkret(l1.herrscher, rt("dg.zrRolleL1", grossMitArtikel(l1.herrscher)));
  if (festL1) {
    kasten.append(el("h3", null, rt("dg.zrMerkst")));
    kasten.append(el("p", null, festL1));
    const festL2 = l2 && l2.herrscher !== l1.herrscher &&
                   konkret(l2.herrscher, rt("dg.zrRolleL2", grossMitArtikel(l2.herrscher)));
    if (festL2) kasten.append(el("p", null, festL2));
  }

  kasten.append(el("p", "kucukNot", rt("dg.zrNote")));
}

/* ------------------------------------------------- Antiszien: Bedeutung */

/* Die Kurzformel je Planet steht in der Sprachtafel. */
const kurzText = key => key ? rt("dg.kurz." + key) : null;

function antiszienDeutung(kasten) {
  const tafel = $("#azHoroskopCikti");
  if (!tafel || tafel.hidden || !tafel.children.length) { kasten.hidden = true; return; }

  kasten.hidden = false;
  kasten.innerHTML = "";
  kasten.append(el("h3", null, rt("dg.wasHeisst")));
  kasten.append(el("p", null, rt("dg.azText1")));
  kasten.append(el("p", null, rt("dg.azText2")));

  const funde = [...tafel.querySelectorAll(".naheDranItem")].map(x => x.innerText.trim());
  if (!funde.length) {
    kasten.append(el("p", "kucukNot", rt("dg.azKeine")));
    return;
  }

  kasten.append(el("h3", null, rt(funde.length > 1 ? "dg.azTitelMehr" : "dg.azTitelEine")));
  const liste = el("ul", "deutungListe");
  funde.forEach(f => {
    const kontra = /Kontra/i.test(f);
    /* Die Namen im Fundtext stehen in der eingestellten Sprache, darum
       wird die Liste aus den aktuellen Tafeln gebaut statt fest verdrahtet. */
    const kandidaten = [...REIHE.map(k => PLANET[k].name),
                        rt("achse.asc"), rt("achse.mc"), "ASC", "MC", "Aszendent"]
      .filter(Boolean).sort((a, b) => b.length - a.length);
    const namen = [];
    for (const n of kandidaten) {
      if (f.includes(n) && !namen.some(x => x.includes(n) || n.includes(x))) namen.push(n);
    }
    const li = el("li");
    if (namen.length >= 2) {
      const [a, b] = namen;
      li.innerHTML = rt("dg.azZeile", a, b,
        kurzText(schluesselVonAnzeige(a)) || a, kurzText(schluesselVonAnzeige(b)) || b, kontra);
    } else {
      li.textContent = f;
    }
    liste.appendChild(li);
  });
  kasten.append(liste);
  kasten.append(el("p", "kucukNot", rt("dg.azEng")));

  kasten.append(el("h3", null, rt("dg.azUmgang")));
  kasten.append(el("p", null, rt("dg.azUmgang1")));
  kasten.append(el("p", null, rt("dg.azUmgang2")));
  kasten.append(el("p", "kucukNot", rt("dg.azPraktisch")));
}

/* --------------------------------------------- Profektionen: Bedeutung */

/* Wirkung, Dauer und Jahresthema stehen in der Sprachtafel. */

function profektionenDeutung(kasten) {
  const tafel = $("#pfCikti");
  if (!tafel || tafel.hidden) { kasten.hidden = true; return; }

  kasten.hidden = false;
  kasten.innerHTML = "";
  kasten.append(el("h3", null, rt("dg.wasHeisst")));
  kasten.append(el("p", null, rt("pf.text1")));
  kasten.append(el("p", null, rt("pf.text2")));

  const pr = profektionJetzt();
  if (!pr) {
    kasten.append(el("p", "kucukNot", rt("pf.ohneAngaben")));
    return;
  }
  kasten.append(el("h3", null, rt("pf.laufend")));
  const p1 = el("p");
  p1.innerHTML = rt("pf.laufendSatz", pr.alter, ordnung(pr.haus, true), pr.glyph, pr.name, pr.herr, pr.thema);
  kasten.append(p1);
  const herrKeyJahr = schluesselVonAnzeige(pr.herr);
  if (herrKeyJahr) kasten.append(el("p", null, rt("pf.jahr." + herrKeyJahr)));

  const fest = konkret(pr.herr, rt("pf.rolle", mitArtikel(pr.herr)));
  if (fest) {
    kasten.append(el("h3", null, rt("pf.wo")));
    kasten.append(el("p", null, fest));
    const r = radix();
    if (r && r.planeten[pr.herr.toLowerCase()]) {
      const hp = r.planeten[pr.herr.toLowerCase()];
      kasten.append(el("p", "kucukNot",
        rt("pf.zusammen", pr.thema, mitArtikel(pr.herr), HAUS[hp.haus - 1])));
    }
  }
  /* ------------------------------------------------- Wer gerade durchzieht */
  let tr = null;
  try { tr = transite(); } catch (e) {}
  if (tr && tr.alle) {
    const imHaus = Object.values(tr.alle).filter(x => x.zeichen === pr.zeichen);
    const herrKey = pr.herr.toLowerCase();
    const herrZieht = tr.alle[herrKey] || null;

    kasten.append(el("h3", null, rt("pf.werZieht")));
    kasten.append(el("p", null, rt("pf.werZiehtText", pr.glyph, pr.name)));

    if (!imHaus.length) {
      kasten.append(el("p", null, rt("pf.keiner")));
    } else {
      const ul = el("ul", "deutungListe");
      imHaus.sort((a, b) => a.grad - b.grad).forEach(x => {
        const istHerr = x.key === herrKey;
        const li = el("li", istHerr ? "dafuer" : null);
        li.innerHTML = rt("pf.transitZeile", PLANET[x.key].g, PLANET[x.key].name,
          zahl(x.grad), rt("pf.wirkung." + x.key), rt("pf.dauer." + x.key), istHerr);
        ul.appendChild(li);
      });
      kasten.append(ul);
    }

    /* Der Sonderfall, nach dem ausdrücklich gefragt wird. */
    if (herrZieht && herrZieht.zeichen === pr.zeichen) {
      const p1 = el("p", "transitStark");
      p1.innerHTML = rt("pf.herrImHaus", pr.thema);
      kasten.append(p1);
    } else if (herrZieht) {
      const p2 = el("p");
      p2.innerHTML = rt("pf.herrAnderswo", mitArtikel(pr.herr),
        ZEICHEN[herrZieht.zeichen].glyph, ZEICHEN[herrZieht.zeichen].name, HAUS[herrZieht.haus - 1]);
      kasten.append(p2);
    }
  }

  kasten.append(el("p", "kucukNot", rt("pf.note")));
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
  neuzeichner.push(neu);
  neu();
}

/* Beim Sprachwechsel alles neu schreiben: Die Kästen stehen schon im
   Baum, und die Rechner melden den Wechsel nicht an den Beobachter. */
const neuzeichner = [];
window.addEventListener("sprache-geaendert", ev => {
  setzeRestSprache(ev.detail);
  setTimeout(() => neuzeichner.forEach(f => { try { f(); } catch (e) {} }), 60);
});

haenge("#lbCikti", "lbDeutung", lebensbogenDeutung);
haenge("#zrCikti", "zrDeutung", zrDeutung);
haenge("#azHoroskopCikti", "azDeutung", antiszienDeutung);
haenge("#pfCikti", "pfDeutung", profektionenDeutung);
