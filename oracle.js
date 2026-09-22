/* ------------------------------------------------------------------------
   oracle.js — die Bedienung.
   --------------------------------------------------------------------- */
import { EBCED, HARFLER, cevir, dokum, toplam, kalan } from "./ebced.js?v=11";
import { UNSURLAR, GEZEGENLER, BURCLAR, MENZILLER, NIYET, UYUM,
         UNSUR_UYUM, SAAT_SIRASI, GUN_SAHIBI, GUN_ADI } from "./korpus.js?v=11";

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const el = (t, c, txt) => { const n = document.createElement(t);
  if (c) n.className = c; if (txt !== undefined) n.textContent = txt; return n; };

const gezegen = ad => GEZEGENLER.find(g => g.tr === ad);

/* ------------------------------------------------------------- Reiter */
$$("nav#reiter button").forEach(b => b.addEventListener("click", () => {
  $$("nav#reiter button").forEach(x => x.classList.toggle("etkin", x === b));
  $$("section.bolum").forEach(s => s.hidden = s.id !== b.dataset.bolum);
}));

/* -------------------------------------------------------- Korrekturzeile
   Jeder Buchstabe ist auswechselbar. Die Umschrift ist ein Vorschlag,
   kein Urteil — wer seinen Namen anders geschrieben weiß, schreibt ihn hier
   anders, und die Rechnung folgt. */
function harfZinciri(kutu, arapca, degisti) {
  kutu.textContent = "";
  const harfler = [...arapca].filter(c => EBCED[c] !== undefined);

  harfler.forEach((h, i) => {
    const cip = el("span", "cip");
    const sec = el("select");
    HARFLER.forEach(x => {
      const o = el("option", null, x);
      o.title = `${x} = ${EBCED[x]}`;
      o.value = x; if (x === h) o.selected = true; sec.appendChild(o);
    });
    sec.addEventListener("change", () => {
      const y = [...harfler]; y[i] = sec.value; degisti(y.join(""));
    });
    const sil = el("button", "sil", "×");
    sil.title = "Buchstabe streichen";
    sil.addEventListener("click", () => {
      const y = [...harfler]; y.splice(i, 1); degisti(y.join(""));
    });
    cip.append(sec, el("span", "deger", String(EBCED[h])), sil);
    kutu.appendChild(cip);
  });

  const ekle = el("button", "ekle", "+");
  ekle.title = "Buchstabe anfügen";
  ekle.addEventListener("click", () => degisti(harfler.join("") + "ا"));
  kutu.appendChild(ekle);

  const t = harfler.reduce((a, c) => a + EBCED[c], 0);
  kutu.appendChild(el("span", "satirToplam", `= ${t}`));
  return t;
}

/* Ein Namensfeld: Eingabe, Umschrift, Korrekturzeile. */
function adAlani(girisSec, zincirSec, degisince) {
  const giris  = $(girisSec);
  const zincir = $(zincirSec);
  const durum  = { arapca:"", elle:false, toplam:0 };

  function ciz() {
    durum.toplam = harfZinciri(zincir, durum.arapca, yeni => {
      durum.arapca = yeni; durum.elle = true; ciz(); degisince();
    });
  }
  giris.addEventListener("input", () => {
    durum.arapca = cevir(giris.value); durum.elle = false; ciz(); degisince();
  });
  durum.tazele = () => { if (!durum.elle) durum.arapca = cevir(giris.value); ciz(); };
  return durum;
}

/* ------------------------------------------------- I. Das Sternbild */
const alanAd   = adAlani("#ad",   "#zincirAd",   () => yildizname());
const alanAnne = adAlani("#anne", "#zincirAnne", () => yildizname());
$$("input[name=cinsiyet]").forEach(r => r.addEventListener("change", yildizname));

function yildizname() {
  const cikti = $("#yildizCikti");
  const t = alanAd.toplam + alanAnne.toplam;
  if (!t) { cikti.hidden = true; return; }
  cikti.hidden = false;
  cikti.textContent = "";

  const kadin = $("input[name=cinsiyet]:checked").value === "kadin";
  const bNo = kalan(t, 12), gNo = kalan(t, 7), uNo = kalan(t, 4), mNo = kalan(t, 28);
  const burc = BURCLAR[bNo - 1];
  const gSum = GEZEGENLER[gNo - 1];              // aus der Siebenerteilung
  const gBurc = gezegen(burc.gezegen);           // Herr des Zeichens
  const unsur = UNSURLAR[uNo - 1];
  const menzil = MENZILLER[mNo - 1];

  /* Die Rechnung offen hinlegen. */
  const hesap = el("div", "hesap");
  hesap.append(
    el("div", "buyukToplam", String(t)),
    el("div", "hesapNot", `${alanAd.toplam} (Name) + ${alanAnne.toplam} (Mutter)`)
  );
  const kalanlar = el("div", "kalanlar");
  [[12, bNo, "Burç", burc.tr + " · " + burc.de],
   [7,  gNo, "Gezegen", gSum.tr + " · " + gSum.de],
   [4,  uNo, "Unsur", unsur.tr + " · " + unsur.de],
   [28, mNo, "Menzil", menzil.tr]].forEach(([b, r, ad, wert]) => {
    const k = el("div", "kalanKutu");
    k.append(el("div", "kalanBaslik", `${t} ÷ ${b}`),
             el("div", "kalanSayi", `Rest ${r}`),
             el("div", "kalanAd", ad),
             el("div", "kalanDeger", wert));
    kalanlar.appendChild(k);
  });
  hesap.appendChild(kalanlar);
  hesap.appendChild(el("p", "kucukNot",
    "Rest null zählt als das letzte Fach — die Fächer sind von eins an gezählt. " +
    "Dass Zeichen und Element dasselbe Element nennen, ist kein Zufall: zwölf ist durch vier teilbar."));
  cikti.appendChild(hesap);

  /* Das Kapitel. */
  const k = el("article", "kapitel");
  k.append(el("h2", null, `${burc.tr} — ${burc.de}`),
           el("div", "arapBaslik", burc.ar));

  const satir = el("div", "kunye");
  [["Element", `${unsur.tr} · ${unsur.de}, ${unsur.tabiat}`],
   ["Herr des Zeichens", `${gBurc.tr} · ${gBurc.de}`],
   ["Stern der Summe", `${gSum.tr} · ${gSum.de}`],
   ["Stein", burc.tas], ["Metall", burc.maden], ["Farbe", burc.renk],
   ["Zahl", String(burc.sayi)], ["Guter Tag", burc.gun],
   ["Schwerer Tag", burc.kotugun], ["Anrufung", burc.esma]
  ].forEach(([a, b]) => {
    const z = el("div", "kunyeSatir");
    z.append(el("dt", null, a), el("dd", null, b));
    satir.appendChild(z);
  });
  k.appendChild(satir);

  const boluml = [
    ["Mizaç — das Gemüt", burc.tabiat],
    [kadin ? "Für die Frau" : "Für den Mann", kadin ? burc.kadin : burc.erkek],
    ["Element", unsur.metin],
    [`Stern der Summe — ${gSum.tr}`,
      `Er gibt: ${gSum.armagan}. Er nimmt: ${gSum.tehlike}. Sein Tag ist ${gSum.gun}, sein Metall ${gSum.maden}, seine Zahl ${gSum.sayi}, seine Anrufung ${gSum.esma}.`],
    ["Erwerb und Amt", burc.is],
    ["Ehe", `Es passen zu dir: ${burc.evlilik.join(", ")}. Die Bücher raten ab von dem Zeichen, das dir im Kreis gegenübersteht — außer du hast es schon geheiratet; dann ist es die Aufgabe und nicht der Fehler.`],
    ["Krankheit", burc.hastalik],
    [`Mondherberge ${menzil.no} — ${menzil.tr}`,
      `${menzil.ar} — ${menzil.hukum} Günstig für: ${menzil.iyi}. Meide: ${menzil.kacin}.`],
    ["Der Rat", burc.ogut]
  ];
  boluml.forEach(([b, m]) => {
    k.append(el("h3", null, b), el("p", null, m));
  });
  cikti.appendChild(k);
}

/* ---------------------------------------------------- II. Die Absicht */
function saatSahibi(d = new Date()) {
  let s = d.getHours() - 6, gun = d.getDay();
  if (s < 0) { s += 24; gun = (gun + 6) % 7; }
  const bas = SAAT_SIRASI.indexOf(GUN_SAHIBI[gun]);
  return { gezegen: SAAT_SIRASI[(bas + s) % 7], no: s + 1, gun: GUN_ADI[gun] };
}

const alanNiyetAd = adAlani("#niyetAd", "#zincirNiyetAd", () => {});
$("#niyetSor").addEventListener("click", () => {
  const soru = $("#soru").value.trim();
  const cikti = $("#niyetCikti");
  if (!soru) { cikti.hidden = false; cikti.textContent = "Erst die Frage."; return; }

  const saat = saatSahibi();
  const g = gezegen(saat.gezegen);
  const soruAr = cevir(soru);
  const soruT = toplam(soruAr);
  const t = soruT + alanNiyetAd.toplam + saat.no;
  const n = NIYET[kalan(t, 12) - 1];

  cikti.hidden = false;
  cikti.textContent = "";
  cikti.append(
    el("p", "kucukNot",
      `${saat.gun}, ${saat.no}. Stunde nach Sonnenaufgang — sie gehört ${g.tr} (${g.de}). ` +
      `Frage ${soruT} + Name ${alanNiyetAd.toplam} + Stunde ${saat.no} = ${t}, geteilt durch zwölf: Rest ${kalan(t,12)}.`),
    el("div", "hukum", n.hukum),
    el("div", "hukumDe", n.de),
    el("p", "niyetMetin", n.metin),
    el("p", "kucukNot",
      "Dieselbe Frage bekommt zu anderer Stunde eine andere Antwort. Das ist keine Schwäche der Tafel, " +
      "sondern ihr Sinn: gefragt wird nicht die Sache, sondern der Augenblick.")
  );
});

/* ------------------------------------------------ III. Zwei Namen */
const u1a = adAlani("#u1ad", "#zincirU1ad", () => {});
const u1m = adAlani("#u1anne", "#zincirU1anne", () => {});
const u2a = adAlani("#u2ad", "#zincirU2ad", () => {});
const u2m = adAlani("#u2anne", "#zincirU2anne", () => {});

$("#uyumHesapla").addEventListener("click", () => {
  const A = u1a.toplam + u1m.toplam, B = u2a.toplam + u2m.toplam;
  const cikti = $("#uyumCikti");
  if (!A || !B) { cikti.hidden = false; cikti.textContent = "Beide Namen und beide Mütter."; return; }

  const bA = BURCLAR[kalan(A, 12) - 1], bB = BURCLAR[kalan(B, 12) - 1];
  const uA = UNSURLAR[bA.unsur - 1], uB = UNSURLAR[bB.unsur - 1];
  const anahtar = UNSUR_UYUM[`${uA.tr}|${uB.tr}`] || UNSUR_UYUM[`${uB.tr}|${uA.tr}`];
  const kar = UYUM[kalan(A + B, 12) - 1];

  cikti.hidden = false;
  cikti.textContent = "";
  const ust = el("div", "ikiBurc");
  [[A, bA, uA], [B, bB, uB]].forEach(([s, b, u]) => {
    const kk = el("div", "kalanKutu");
    kk.append(el("div", "kalanBaslik", String(s)),
              el("div", "kalanDeger", `${b.tr} · ${b.de}`),
              el("div", "kalanAd", `${u.tr} · ${u.de}`));
    ust.appendChild(kk);
  });
  cikti.append(ust,
    el("p", "kucukNot", `${A} + ${B} = ${A + B}, geteilt durch zwölf: Rest ${kalan(A + B, 12)}.`),
    el("h3", null, anahtar[0]), el("p", null, anahtar[1]),
    el("h3", null, kar.hukum), el("p", null, kar.metin));
});

/* --------------------------------------------------- IV. Die Herbergen */
(function menzilTablosu() {
  const t = $("#menzilTablo");
  MENZILLER.forEach(m => {
    const r = el("tr");
    [String(m.no), m.tr, m.ar, m.hukum, m.iyi, m.kacin].forEach((v, i) => {
      const c = el("td", i === 2 ? "arap" : null, v);
      r.appendChild(c);
    });
    t.appendChild(r);
  });
})();
