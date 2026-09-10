/* ------------------------------------------------------------------------
   ebced.js — Buchstaben zu Zahlen.

   Ebced-i kebîr: die 28 arabischen Buchstaben in der Reihenfolge der acht
   Merkwoerter ebced · hevvez · huttî · kelemen · sa'fes · karaşet · sehaz ·
   dazağ, mit Werten von 1 bis 1000. Die vier persisch-osmanischen
   Zusatzbuchstaben (پ چ ژ گ) zaehlen wie ihre arabischen Nachbarn.
   --------------------------------------------------------------------- */

export const EBCED = {
  "ا": 1, "ب": 2, "ج": 3, "د": 4,
  "ه": 5, "و": 6, "ز": 7,
  "ح": 8, "ط": 9, "ي": 10,
  "ك": 20, "ل": 30, "م": 40, "ن": 50,
  "س": 60, "ع": 70, "ف": 80, "ص": 90,
  "ق": 100, "ر": 200, "ش": 300, "ت": 400,
  "ث": 500, "خ": 600, "ذ": 700,
  "ض": 800, "ظ": 900, "غ": 1000,
  // persisch-osmanische Zusatzbuchstaben
  "پ": 2, "چ": 3, "ژ": 7, "گ": 20,
  // Schreibvarianten
  "ة": 400, "ى": 10, "أ": 1, "إ": 1, "آ": 1, "ؤ": 6, "ئ": 10
};

/* Die 28 Buchstaben in Ebced-Reihenfolge — fuer die Korrekturzeile. */
export const HARFLER = [
  "ا","ب","ج","د","ه","و","ز","ح","ط","ي","ك","ل","م","ن",
  "س","ع","ف","ص","ق","ر","ش","ت","ث","خ","ذ","ض","ظ","غ",
  "پ","چ","ژ","گ","ة","ى"
];

/* Namen, deren osmanische Schreibung feststeht. Die Regeln unten treffen
   sie nicht zuverlaessig — arabischstaemmige Namen schreiben sich nach
   ihrer Herkunft, nicht nach ihrem tuerkischen Klang. */
export const SOZLUK = {
  mehmet:"محمد", mehmed:"محمد", muhammed:"محمد", ahmet:"احمد", ahmed:"احمد",
  mahmut:"محمود", mahmud:"محمود", mustafa:"مصطفى", murat:"مراد", murad:"مراد",
  ali:"علي", veli:"ولي", hasan:"حسن", huseyin:"حسين", hüseyin:"حسين",
  omer:"عمر", ömer:"عمر", osman:"عثمان", ibrahim:"ابراهيم",
  ismail:"اسماعيل", yusuf:"يوسف", yakup:"يعقوب", musa:"موسى", isa:"عيسى",
  idris:"ادريس", ilyas:"الياس", davut:"داود", suleyman:"سليمان",
  süleyman:"سليمان", selim:"سليم", salim:"سالم", halil:"خليل", kemal:"كمال",
  cemal:"جمال", celal:"جلال", bilal:"بلال", talip:"طالب", kadir:"قادر",
  abdullah:"عبدالله", abdurrahman:"عبدالرحمن", hamza:"حمزة", enes:"انس",
  emin:"امين", eyup:"ايوب", eyüp:"ايوب", riza:"رضا", rıza:"رضا",
  sabri:"صبري", sadik:"صادق", sadık:"صادق", cafer:"جعفر", huseyn:"حسين",
  yunus:"يونس", harun:"هارون", ishak:"اسحاق", zekeriya:"زكريا",
  nuh:"نوح", adem:"آدم", salih:"صالح", tarik:"طارق", tarık:"طارق",
  fatma:"فاطمة", fatime:"فاطمة", ayse:"عائشة", ayşe:"عائشة",
  hatice:"خديجة", zeynep:"زينب", emine:"آمنة", amine:"آمنة",
  meryem:"مريم", havva:"حواء", asiye:"آسية", saliha:"صالحة",
  halime:"حليمة", rabia:"رابعة", rabıa:"رابعة", zehra:"زهراء",
  zeliha:"زليخا", nur:"نور", nuray:"نوراي", sultan:"سلطان",
  sevgi:"سوگي", hayriye:"خيرية", naime:"نعيمة", saime:"صائمة",
  kadriye:"قدرية", nesrin:"نسرين", leyla:"ليلى", elif:"الف",
  esra:"اسرا", merve:"مروة", sema:"سما", semra:"سمرا", hulya:"خوليا",
  gul:"گل", gül:"گل", gulsum:"گلثوم", gülsüm:"گلثوم", ummu:"ام",
  bedriye:"بدرية", munevver:"منورة", münevver:"منورة", saadet:"سعادت",
  sabiha:"صبيحة", nazmiye:"نظمية", remziye:"رمزية", zubeyde:"زبيدة",
  zübeyde:"زبيدة", safiye:"صفية", rukiye:"رقية", ummugulsum:"ام گلثوم"
};

/* Regelwerk fuer alles, was nicht im Wortverzeichnis steht. Vokale sind im
   Arabischen weitgehend ungeschrieben — deshalb faellt das mittlere e weg,
   waehrend das mittlere a als Alif erhalten bleibt. Das ist eine Naeherung;
   dafuer steht darunter die Korrekturzeile. */
const ORTA = {
  a:"ا", e:"", "ı":"ي", i:"ي", o:"و", "ö":"و", u:"و", "ü":"و",
  "â":"ا", "ä":"ا", "î":"ي", "û":"و",
  b:"ب", c:"ج", "ç":"چ", d:"د", f:"ف", g:"گ", "ğ":"غ", h:"ه",
  j:"ژ", k:"ك", l:"ل", m:"م", n:"ن", p:"پ", q:"ق", r:"ر",
  s:"س", "ş":"ش", t:"ت", v:"و", w:"و", y:"ي", z:"ز", "ß":"س"
};
const BAS = { a:"ا", e:"ا", "ı":"اي", i:"اي", o:"او", "ö":"او", u:"او", "ü":"او", "â":"آ" };
const SON = { a:"ا", e:"ه", "ı":"ي", i:"ي", o:"و", "ö":"و", u:"و", "ü":"و" };

const SESLI = "aeıioöuüâäîû";

/* Tuerkisch oder deutsch geschriebener Name -> vorgeschlagene arabische
   Schreibung. */
/* Tuerkisches Kleinschreiben: I wird zu ı, İ wird zu i — sonst zerfaellt
   "İbrahim" in ein i mit losem Punkt und findet sein Wort nicht mehr. */
function kucult(s) {
  return (s || "").replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase()
                  .normalize("NFC").replace(/\u0307/g, "");
}

export function cevir(ad) {
  const t = kucult(ad).trim();
  if (!t) return "";

  // Mehrteilige Namen Wort fuer Wort.
  if (/[\s-]/.test(t)) {
    return t.split(/[\s-]+/).filter(Boolean).map(cevir).join("");
  }
  if (SOZLUK[t]) return SOZLUK[t];

  const h = [...t];
  let out = "";
  for (let i = 0; i < h.length; i++) {
    const c = h[i];
    if (c === h[i - 1]) continue;            // Verdoppelung: arabisch ein Buchstabe (Şedde)
    const sesli = SESLI.includes(c);
    let p;
    if (i === 0 && sesli) p = BAS[c];
    else if (i === h.length - 1 && sesli) p = SON[c];
    else p = ORTA[c];
    if (p === undefined) p = "";
    out += p;
  }
  return out;
}

/* Buchstabenweise Aufschluesselung mit Werten. */
export function dokum(arapca) {
  return [...(arapca || "")]
    .filter(c => EBCED[c] !== undefined)
    .map(c => ({ harf: c, deger: EBCED[c] }));
}

export function toplam(arapca) {
  return dokum(arapca).reduce((a, x) => a + x.deger, 0);
}

/* Der Rest der Teilung. Rest null zaehlt als der letzte Platz —
   die Faecher sind von eins an gezaehlt, nicht von null. */
export function kalan(sayi, bolen) {
  const r = sayi % bolen;
  return r === 0 ? bolen : r;
}
