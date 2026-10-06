/* ------------------------------------------------------------------------
   sprachen.js — die Oberfläche in sieben Sprachen.

   Übersetzt werden die Wegweiser: Kopf, Navigation, die beiden Wege, die
   Namen der Abschnitte, die Beschriftungen der Eingabefelder, die Knöpfe.
   Die langen Deutungstexte bleiben vorerst deutsch — sie sind in Bildern
   und Fabeln geschrieben, und eine maschinelle Übertragung würde genau
   das zerstören, was an ihnen etwas taugt. Wo ein Abschnitt noch nicht
   übersetzt ist, sagt die Seite das.

   Arabisch läuft von rechts nach links; dafür wird am Wurzelelement
   dir="rtl" gesetzt, und das Satzbild dreht sich mit.
   ------------------------------------------------------------------------ */

export const SPRACHEN = [
  { code: "de", name: "Deutsch",   kurz: "DE" },
  { code: "en", name: "English",   kurz: "EN" },
  { code: "tr", name: "Türkçe",    kurz: "TR" },
  { code: "it", name: "Italiano",  kurz: "IT" },
  { code: "es", name: "Español",   kurz: "ES" },
  { code: "fr", name: "Français",  kurz: "FR" },
  { code: "ar", name: "العربية",   kurz: "AR", rtl: true }
];

import { HTML_IT } from "./html-it.js?v=225";
import { HTML_DE } from "./html-de.js?v=225";

export const WORTE = {
  "kopf.unterzeile": {
    de:"Orakelrechner nach alten Büchern", en:"Oracle calculators from old books",
    tr:"Eski kitaplara göre fal hesapları", it:"Calcolatori oracolari dai libri antichi",
    es:"Calculadoras oraculares de libros antiguos", fr:"Calculateurs oraculaires d'après les livres anciens",
    ar:"حاسبات العرافة من الكتب القديمة" },

  "start.frage": {
    de:"Was möchtest du befragen?", en:"What would you like to consult?",
    tr:"Neyi sormak istersin?", it:"Che cosa vuoi interrogare?",
    es:"¿Qué deseas consultar?", fr:"Que veux-tu interroger ?",
    ar:"ماذا تريد أن تسأل؟" },

  "weg.orakel": {
    de:"Das Orakel", en:"The Oracle", tr:"Fal", it:"L'oracolo",
    es:"El oráculo", fr:"L'oracle", ar:"العرافة" },
  "weg.orakel.text": {
    de:"Eine Frage stellen und eine Antwort bekommen — die Tafel der Absicht, zwei Namen gegeneinander, die Sandkunst, der rechte Zeitpunkt.",
    en:"Ask a question and receive an answer — the table of intention, two names weighed against each other, the sand art, the right moment.",
    tr:"Bir soru sor ve cevap al — niyet cetveli, iki ad karşı karşıya, remil, doğru vakit.",
    it:"Porre una domanda e ricevere una risposta — la tavola dell'intenzione, due nomi messi a confronto, l'arte della sabbia, il momento giusto.",
    es:"Hacer una pregunta y recibir una respuesta — la tabla de la intención, dos nombres enfrentados, el arte de la arena, el momento justo.",
    fr:"Poser une question et recevoir une réponse — la table de l'intention, deux noms confrontés, l'art du sable, le moment juste.",
    ar:"اطرح سؤالاً واحصل على جواب — لوح النية، اسمان في المقابلة، علم الرمل، الوقت المناسب." },
  "weg.sterne": {
    de:"Die Sterne", en:"The Stars", tr:"Yıldızlar", it:"Le stelle",
    es:"Las estrellas", fr:"Les étoiles", ar:"النجوم" },
  "weg.sterne.text": {
    de:"Den Himmel deiner Geburtsstunde auslegen — Horoskop, Yıldıznâme, Spirit Name und die Herren der Zeit.",
    en:"Read the sky of your birth hour — the chart, the Yıldıznâme, the spirit name and the lords of time.",
    tr:"Doğum saatinin göğünü yorumla — yıldız haritası, Yıldıznâme, ruh adı ve zaman efendileri.",
    it:"Interpretare il cielo della tua ora di nascita — oroscopo, Yıldıznâme, nome dello spirito e i signori del tempo.",
    es:"Interpretar el cielo de tu hora de nacimiento — horóscopo, Yıldıznâme, nombre del espíritu y los señores del tiempo.",
    fr:"Lire le ciel de ton heure de naissance — horoscope, Yıldıznâme, nom de l'esprit et les seigneurs du temps.",
    ar:"اقرأ سماء ساعة ميلادك — الطالع، اليلدزنامه، اسم الروح وأرباب الزمان." },

  "maske.titel": {
    de:"Meine Angaben", en:"My details", tr:"Bilgilerim", it:"I miei dati",
    es:"Mis datos", fr:"Mes données", ar:"بياناتي" },
  "feld.name": {
    de:"Dein Name", en:"Your name", tr:"Adın", it:"Il tuo nome",
    es:"Tu nombre", fr:"Ton nom", ar:"اسمك" },
  "feld.mutter": {
    de:"Name deiner Mutter", en:"Your mother's name", tr:"Annenin adı",
    it:"Il nome di tua madre", es:"El nombre de tu madre",
    fr:"Le nom de ta mère", ar:"اسم أمك" },
  "feld.datum": {
    de:"Geburtsdatum", en:"Date of birth", tr:"Doğum tarihi", it:"Data di nascita",
    es:"Fecha de nacimiento", fr:"Date de naissance", ar:"تاريخ الميلاد" },
  "feld.zeit": {
    de:"Geburtszeit", en:"Time of birth", tr:"Doğum saati", it:"Ora di nascita",
    es:"Hora de nacimiento", fr:"Heure de naissance", ar:"ساعة الميلاد" },
  "feld.ort": {
    de:"Geburtsort", en:"Place of birth", tr:"Doğum yeri", it:"Luogo di nascita",
    es:"Lugar de nacimiento", fr:"Lieu de naissance", ar:"مكان الميلاد" },
  "knopf.koordinaten": {
    de:"Koordinaten suchen", en:"Find coordinates", tr:"Koordinat ara",
    it:"Cerca coordinate", es:"Buscar coordenadas", fr:"Chercher les coordonnées",
    ar:"ابحث عن الإحداثيات" },
  "knopf.speichern": {
    de:"Speichern", en:"Save", tr:"Kaydet", it:"Salva", es:"Guardar",
    fr:"Enregistrer", ar:"احفظ" },
  "knopf.rechnen": {
    de:"Neu rechnen", en:"Recalculate", tr:"Yeniden hesapla", it:"Ricalcola",
    es:"Recalcular", fr:"Recalculer", ar:"أعد الحساب" },
  "knopf.zurueck": {
    de:"← Zurück zum Anfang", en:"← Back to the start", tr:"← Başa dön",
    it:"← Torna all'inizio", es:"← Volver al inicio", fr:"← Retour au début",
    ar:"→ العودة إلى البداية" },
  "knopf.idee": {
    de:"Was ist Oracle? — die Idee dahinter", en:"What is Oracle? — the idea behind it",
    tr:"Oracle nedir? — arkasındaki fikir", it:"Che cos'è Oracle? — l'idea dietro",
    es:"¿Qué es Oracle? — la idea detrás", fr:"Qu'est-ce qu'Oracle ? — l'idée derrière",
    ar:"ما هو أوراكل؟ — الفكرة وراءه" },

  "gruppe.geburtsbild": {
    de:"Das Geburtsbild", en:"The birth chart", tr:"Doğum haritası",
    it:"Il quadro di nascita", es:"La carta natal", fr:"Le thème de naissance",
    ar:"خريطة الميلاد" },
  "gruppe.angelegt": {
    de:"Was darin angelegt ist", en:"What is laid out in it", tr:"İçinde yatanlar",
    it:"Ciò che vi è iscritto", es:"Lo que en ella está dispuesto",
    fr:"Ce qui y est inscrit", ar:"ما هو مُودَع فيها" },
  "gruppe.zeit": {
    de:"Die Herren der Zeit", en:"The lords of time", tr:"Zamanın efendileri",
    it:"I signori del tempo", es:"Los señores del tiempo",
    fr:"Les seigneurs du temps", ar:"أرباب الزمان" },
  "gruppe.zusammen": {
    de:"Alles zusammen", en:"Everything together", tr:"Hepsi birlikte",
    it:"Tutto insieme", es:"Todo junto", fr:"Tout ensemble", ar:"كل ذلك معاً" },
  "gruppe.weiteres": {
    de:"Weiteres", en:"Further", tr:"Diğerleri",
    it:"Altro", es:"Más", fr:"Autres", ar:"المزيد" },
  "gruppe.augenblick": {
    de:"Den Augenblick befragen", en:"Consulting the moment", tr:"Ânı sormak",
    it:"Interrogare l'istante", es:"Consultar el instante",
    fr:"Interroger l'instant", ar:"سؤال اللحظة" },
  "gruppe.namen": {
    de:"Namen gegeneinander", en:"Names weighed against each other",
    tr:"Adları karşılaştırmak", it:"Nomi a confronto",
    es:"Nombres enfrentados", fr:"Noms confrontés", ar:"الأسماء في المقابلة" },

  "liste.orakel": {
    de:"Das Orakel — die Künste", en:"The Oracle — the arts", tr:"Fal — sanatlar",
    it:"L'oracolo — le arti", es:"El oráculo — las artes",
    fr:"L'oracle — les arts", ar:"العرافة — الفنون" },
  "liste.sterne": {
    de:"Die Sterne — die Techniken", en:"The Stars — the techniques",
    tr:"Yıldızlar — teknikler", it:"Le stelle — le tecniche",
    es:"Las estrellas — las técnicas", fr:"Les étoiles — les techniques",
    ar:"النجوم — الطرق" },

  "lesung.titel": { de:"Deine Lesung", it:"La tua lettura", en:"Your reading",
    tr:"Okuman", es:"Tu lectura", fr:"Ta lecture", ar:"قراءتك" },
  "lesung.unter": { de:"Alles, was der Himmel deiner Geburtsstunde hergibt — in einem Stück",
    it:"Tutto ciò che il cielo della tua ora di nascita dice — in un solo racconto",
    en:"Everything the sky of your birth hour says — in a single reading",
    tr:"Doğum saatinin göğü ne veriyorsa — tek parça hâlinde",
    es:"Todo lo que dice el cielo de tu hora de nacimiento — en una sola lectura",
    fr:"Tout ce que donne le ciel de ton heure de naissance — d'un seul tenant",
    ar:"كل ما تقوله سماء ساعة ميلادك — في قراءة واحدة" },
  "lesung.weiter": { de:"Weiterlesen — noch %n Abschnitte",
    it:"Continua a leggere — altri %n capitoli", en:"Read on — %n more sections",
    tr:"Devamını oku — %n bölüm daha", es:"Seguir leyendo — %n secciones más",
    fr:"Lire la suite — %n sections de plus", ar:"تابع القراءة — %n أقسام أخرى" },
  "lesung.zu": { de:"Wieder zuklappen", it:"Richiudi", en:"Collapse again",
    tr:"Tekrar kapat", es:"Volver a plegar", fr:"Replier", ar:"أغلق مرة أخرى" },
  "technik.auf": { de:"Die Techniken einzeln", it:"Le tecniche una per una",
    en:"The techniques one by one", tr:"Teknikler tek tek",
    es:"Las técnicas una por una", fr:"Les techniques une à une",
    ar:"الطرق واحدة واحدة" },

  "nav.bHoroskop":     { de:"Das Horoskop", it:"L'oroscopo", en:"The chart", tr:"Yıldız haritası", es:"El horóscopo", fr:"L'horoscope", ar:"الطالع" },
  "nav.bRadixdeutung": { de:"Die Deutung", it:"La lettura", en:"The reading", tr:"Yorum", es:"La lectura", fr:"La lecture", ar:"القراءة" },
  "nav.bAlmutem":      { de:"Der Herr der Geburt", it:"Il signore della nascita", en:"The lord of the nativity", tr:"Doğumun efendisi", es:"El señor del nacimiento", fr:"Le seigneur de la nativité", ar:"رب المولد" },
  "nav.bPunkte":       { de:"Die arabischen Punkte", it:"Le parti arabe", en:"The Arabic parts", tr:"Arap noktaları", es:"Las partes árabes", fr:"Les parts arabes", ar:"السهام العربية" },
  "nav.bGeist":        { de:"Spirit Name", it:"Il nome dello spirito", en:"Spirit name", tr:"Ruh adı", es:"Nombre del espíritu", fr:"Nom de l'esprit", ar:"اسم الروح" },
  "nav.bWerk":         { de:"Das Werk", it:"L'opera", en:"The work", tr:"Meslek", es:"La obra", fr:"L'œuvre", ar:"العمل" },
  "nav.bLebensmass":   { de:"Das Lebensmaß", it:"La misura della vita", en:"The measure of life", tr:"Ömür ölçüsü", es:"La medida de la vida", fr:"La mesure de la vie", ar:"مقدار العمر" },
  "nav.bAntiszien":    { de:"Antiszien", it:"Antiscia", en:"Antiscia", tr:"Antisya", es:"Antiscia", fr:"Antiscia", ar:"الظلال" },
  "nav.bProfektionen": { de:"Profektionen", it:"Le profezioni", en:"Profections", tr:"Profeksiyonlar", es:"Profecciones", fr:"Profections", ar:"الانتهاءات" },
  "nav.bVerteilung":   { de:"Die Verteilung", it:"Le distribuzioni", en:"Distributions", tr:"Dağıtım", es:"Las distribuciones", fr:"Les distributions", ar:"القسمة" },
  "nav.bZR":           { de:"Zodiacal Releasing", it:"Zodiacal Releasing", en:"Zodiacal releasing", tr:"Zodiacal Releasing", es:"Zodiacal Releasing", fr:"Zodiacal Releasing", ar:"الإطلاق البروجي" },
  "nav.bFirdaria":     { de:"Firdaria", it:"Firdaria", en:"Firdaria", tr:"Fardarlar", es:"Firdaria", fr:"Firdaria", ar:"الفردارات" },
  "nav.bVimshottari":  { de:"Vimshottari", it:"Vimshottari", en:"Vimshottari", tr:"Vimshottari", es:"Vimshottari", fr:"Vimshottari", ar:"فيمشوتاري" },
  "nav.bLebensalter":  { de:"Die drei Lebensalter", it:"Le tre età della vita", en:"The three ages of life", tr:"Üç yaş dönemi", es:"Las tres edades", fr:"Les trois âges", ar:"أعمار الحياة الثلاثة" },
  "nav.bLebensbogen":  { de:"Der Lebensbogen", it:"L'arco della vita", en:"The arc of life", tr:"Ömür yayı", es:"El arco de la vida", fr:"L'arc de la vie", ar:"قوس الحياة" },
  "nav.bSolar":        { de:"Jahresumdrehung", it:"La rivoluzione solare", en:"Solar revolution", tr:"Yıl dönümü", es:"Revolución solar", fr:"Révolution solaire", ar:"تحويل السنة" },
  "nav.bEssenz":       { de:"Die Essenz", it:"L'essenza", en:"The essence", tr:"Öz", es:"La esencia", fr:"L'essence", ar:"الخلاصة" },
  "nav.bYildiz":       { de:"Yıldıznâme", it:"Yıldıznâme", en:"Yıldıznâme", tr:"Yıldıznâme", es:"Yıldıznâme", fr:"Yıldıznâme", ar:"يلدزنامه" },
  "nav.bNiyet":        { de:"Niyet — die Frage", it:"Niyet — la domanda", en:"Niyet — the question", tr:"Niyet — soru", es:"Niyet — la pregunta", fr:"Niyet — la question", ar:"النية — السؤال" },
  "nav.bUyum":         { de:"İsim uyumu", it:"İsim uyumu", en:"İsim uyumu", tr:"İsim uyumu", es:"İsim uyumu", fr:"İsim uyumu", ar:"توافق الأسماء" },
  "nav.bMenzil":       { de:"Der rechte Zeitpunkt", it:"Il momento giusto", en:"The right moment", tr:"Doğru vakit", es:"El momento justo", fr:"Le moment juste", ar:"الوقت المناسب" },
  "nav.bRamel":        { de:"ʿIlm al-Raml", it:"ʿIlm al-Raml", en:"ʿIlm al-Raml", tr:"Remil", es:"ʿIlm al-Raml", fr:"ʿIlm al-Raml", ar:"علم الرمل" },

  "hinweis.nurDeutsch": {
    de:"", 
    en:"The calculations run in every language; the long interpretive texts are still in German. They are written in images and fables, and a machine translation would destroy exactly what is worth having about them.",
    tr:"Hesaplar her dilde çalışır; uzun yorum metinleri şimdilik Almancadır. Bunlar imge ve masallarla yazılmıştır, makine çevirisi değerli olan şeyi tam olarak yok ederdi.",
    it:"I calcoli funzionano in ogni lingua; i lunghi testi interpretativi sono ancora in tedesco. Sono scritti per immagini e favole, e una traduzione automatica distruggerebbe proprio ciò che vale.",
    es:"Los cálculos funcionan en todos los idiomas; los textos largos de interpretación siguen en alemán. Están escritos en imágenes y fábulas, y una traducción automática destruiría justo lo que vale la pena.",
    fr:"Les calculs fonctionnent dans toutes les langues ; les longs textes d'interprétation sont encore en allemand. Ils sont écrits en images et en fables, et une traduction automatique détruirait précisément ce qui en fait la valeur.",
    ar:"الحسابات تعمل بكل اللغات؛ أما نصوص التأويل الطويلة فما زالت بالألمانية. وهي مكتوبة بالصور والأمثال، والترجمة الآلية تُفسد ما فيها من قيمة." }
};

const SCHLUESSEL = "oracle-sprache";

export function aktuelleSprache() {
  try {
    const g = localStorage.getItem(SCHLUESSEL);
    if (g && SPRACHEN.some(s => s.code === g)) return g;
  } catch (e) {}
  const b = (navigator.language || "de").slice(0, 2).toLowerCase();
  return SPRACHEN.some(s => s.code === b) ? b : "de";
}

export function t(schluessel, sprache) {
  const s = sprache || aktuelleSprache();
  const e = WORTE[schluessel];
  if (e) return e[s] || e.de || "";
  /* Die Rahmentexte der Abschnitte stehen in eigenen Dateien, weil sie
     lang sind und sonst diese Tafel unlesbar machen würden. */
  if (s === "it" && HTML_IT[schluessel]) return HTML_IT[schluessel];
  if (HTML_DE[schluessel]) return HTML_DE[schluessel];
  return schluessel;
}

export function setzeSprache(code) {
  try { localStorage.setItem(SCHLUESSEL, code); } catch (e) {}
  anwenden(code);
  window.dispatchEvent(new CustomEvent("sprache-geaendert", { detail: code }));
}

/* Jedes Element mit data-t bekommt seinen Text, jedes mit data-t-ph den
   Platzhalter. So bleibt die Übersetzung im HTML sichtbar statt im Code
   versteckt. */
export function anwenden(code) {
  const s = code || aktuelleSprache();
  const def = SPRACHEN.find(x => x.code === s) || SPRACHEN[0];
  document.documentElement.lang = s;
  document.documentElement.dir = def.rtl ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", !!def.rtl);

  document.querySelectorAll("[data-t]").forEach(e => {
    const w = t(e.dataset.t, s);
    if (w) e.textContent = w;
  });
  document.querySelectorAll("[data-t-ph]").forEach(e => {
    const w = t(e.dataset.tPh, s);
    if (w) e.placeholder = w;
  });

  const hinweis = document.getElementById("spracheHinweis");
  if (hinweis) {
    const txt = t("hinweis.nurDeutsch", s);
    hinweis.textContent = txt;
    hinweis.hidden = !txt;
  }

  document.querySelectorAll("#sprachWahl button").forEach(b =>
    b.classList.toggle("aktiv", b.dataset.sprache === s));
}

/* ------------------------------------------------------------ der Umschalter */
function baueWahl() {
  const ziel = document.getElementById("sprachWahl");
  if (!ziel) return;
  ziel.innerHTML = "";
  SPRACHEN.forEach(s => {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.sprache = s.code;
    b.textContent = s.kurz;
    b.title = s.name;
    b.addEventListener("click", () => setzeSprache(s.code));
    ziel.appendChild(b);
  });
}

baueWahl();
anwenden();
