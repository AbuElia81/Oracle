/* ------------------------------------------------------------------------
   rest-texte.js — die Sätze des Werks, der Lebensalter, der arabischen
   Punkte, der Verteilung und des Herrn der Geburt, je Sprache.

   Dasselbe Verfahren wie bei der Essenz und der Deutung: jeder Satz eine
   Funktion, keine Zeichenkette mit Platzhaltern.
   ------------------------------------------------------------------------ */

export const R = {
  de: {
    /* ------------------------------------------------- Das Werk */
    "werk.merkur.kurz":"durch das Wort und die Zahl",
    "werk.merkur.feld":"Schreiben, Rechnen, Lehren, Handeln, Vermitteln, Deuten — alles, was " +
      "zwischen Menschen hin und her geht und dabei genau sein muss. Ptolemäus nennt Schreiber, " +
      "Kaufleute, Rechner, Astrologen, Redner; die Araber fügen Übersetzer und Boten hinzu.",
    "werk.venus.kurz":"durch das Auge und die Hand",
    "werk.venus.feld":"Machen, was gefällt: Musik, Malerei, Schmuck, Kleider, Wohlgeruch, Gärten, " +
      "Gastlichkeit. Ptolemäus nennt Musikanten, Maler, Salbenmischer, Weber — alle, deren Arbeit " +
      "daran gemessen wird, ob sie schön geworden ist.",
    "werk.mars.kurz":"durch Feuer und Eisen",
    "werk.mars.feld":"Alles Schneidende und Formende: Handwerk am Metall, Bauen, Wundarznei, " +
      "Waffen, Feuer, Schlachten. Ptolemäus nennt Schmiede, Chirurgen, Soldaten, Köche, " +
      "Steinmetzen — Arbeit, bei der etwas nachgibt, weil man es zwingt.",

    "werk.paar.merkurVenus":"Wort und Schönheit zusammen: Musik mit Text, Dichtung, Lehre von " +
      "schönen Dingen, Handel mit Kunst, alles Darstellende. Ptolemäus nennt hier ausdrücklich " +
      "die, die auf Bühnen stehen.",
    "werk.paar.marsMerkur":"Wort und Eisen zusammen: scharfes, strittiges Reden — Recht, " +
      "Streitführung, Kritik, Chirurgie mit Lehre, Technik mit Berechnung. Es geht hier um " +
      "Arbeit, die trennt und dabei genau sein muss.",
    "werk.paar.marsVenus":"Schönheit und Eisen zusammen: Arbeit am Stoff, die Kraft und " +
      "Geschmack zugleich verlangt — Bildhauerei, Schmiedekunst, Färberei, Küche, alles " +
      "Handwerk, dessen Ergebnis man ansieht.",

    "werk.titel":"Der Herr deines Werks",
    "werk.keiner.titel":"Kein Herr des Werks",
    "werk.keiner.text":"Keiner der drei — Merkur, Venus, Mars — steht morgens vor der Sonne, am " +
      "Himmelsmittelpunkt oder in dessen Zeichen. Ptolemäus sagt für diesen Fall, dass der " +
      "Mensch keinem bestimmten Werk zugeordnet ist: Er lebt dann nicht von einem Handwerk, " +
      "sondern von dem, was ihm zufällt — aus Herkunft, Amt oder Besitz. Die Araber lesen es " +
      "milder: Das Werk ist nicht vorgezeichnet und darum frei.",
    "werk.geteilt": (a, b, text) =>
      `<b>Zwei teilen sich den Vorrang:</b> ${a} und ${b} kommen auf gleich viel. Ptolemäus hat ` +
      `für diesen Fall eigene Sätze — ${text}`,
    "werk.ort": (zeichen, haus, ort) =>
      `Er steht bei dir in ${zeichen}, im ${haus}. Feld — ${ort}. Das Zeichen sagt, in welcher ` +
      `Art von Stoff gearbeitet wird, das Feld, in wessen Auftrag.`,
    "werk.wie":"Wie gerechnet wurde",
    "werk.grund.morgens": (grad) => `geht morgens vor der Sonne auf (${grad}° davor)`,
    "werk.grund.verbrannt": (grad) => `steht der Sonne zu nah (${grad}°) — verbrannt, zählt nicht`,
    "werk.grund.zehntes":"steht im zehnten Feld, am Himmelsmittelpunkt",
    "werk.grund.mcZeichen":"steht im Zeichen des Himmelsmittelpunkts",
    "werk.grund.mcHerr":"ist Herr des Himmelsmittelpunkts",
    "werk.grund.winkel":"steht winkelhaft",
    "werk.grund.keine":"keine der Bedingungen erfüllt",
    "werk.note":"Nach Ptolemäus (Tetrabiblos IV.4): Gesucht wird der Planet, der morgens vor der " +
      "Sonne aufgeht, und der am Himmelsmittelpunkt steht. Nur Merkur, Venus und Mars gelten als " +
      "Herren des Werks — alles Hervorbringen, sagt er, geht durch Hand, Auge oder Wort. Die " +
      "übrigen vier geben Rang und Umstände, nicht das Werk selbst.",

    /* ------------------------------------- Die drei Lebensalter */
    "alter.kopf": (element, tag) =>
      `Dein aufsteigendes Zeichen gehört dem Element ${element}. Du bist ${tag ? "bei Tag" : "bei Nacht"} ` +
      `geboren, darum führt ${tag ? "der Herr des Tages" : "der Herr der Nacht"} das erste Drittel.`,
    "alter.spanne": (von, bis) => `${von}–${bis} Jahre`,
    "alter.satz": (rang, herr, zeichen, haus, stellung, wuerde) =>
      `Das ${rang} Drittel steht unter ${herr}. ${herr} steht in ${zeichen}, im ${haus}. Feld, ` +
      `und ${stellung}${wuerde}.`,
    "alter.erste":"erste", "alter.zweite":"zweite", "alter.dritte":"dritte",
    "alter.winkel":"steht winkelhaft — dieses Drittel wirkt sichtbar und bringt hervor",
    "alter.folgend":"steht folgend — dieses Drittel trägt, aber langsamer",
    "alter.kadent":"steht kadent — dieses Drittel geht über Umwege und durch andere",
    "alter.jetzt":"Hier stehst du gerade",
    "alter.note":"Nach Dorotheos (Carmen Astrologicum I): Jedes Element hat drei Herren — einen " +
      "für den Tag, einen für die Nacht und einen dritten, den die arabische Überlieferung den " +
      "Teilhaber nennt. Das Leben zerfällt in drei Teile, und wie der jeweilige Herr steht, so " +
      "verläuft sein Drittel. Die Drittel sind hier auf 75 Jahre gerechnet; die alten Texte " +
      "setzen dafür die Jahre an, die das Lebensmaß ergibt. Es ist die einfachste Zeitteilung " +
      "der Überlieferung und zugleich die gröbste — sie sagt eine Tendenz, keinen Termin.",

    /* --------------------------------------- Die arabischen Punkte */
    "pkt.tag":"Du bist bei Tag geboren — die Punkte werden in ihrer Grundform gerechnet.",
    "pkt.nacht":"Du bist bei Nacht geboren — die meisten Punkte kehren sich darum um. Das ist " +
      "kein Kunstgriff: Der Glückspunkt misst den Weg von der Sonne zum Mond, und bei Nacht " +
      "führt der Mond.",
    "pkt.gruppe1":"Die sieben hermetischen",
    "pkt.gruppe2":"Die Punkte der Verhältnisse",
    "pkt.gedreht":"bei Nacht umgekehrt",
    "pkt.feld": (n) => `${n}. Feld`,
    "pkt.satz": (was, ort, herr, herrHaus, wuerde) =>
      `${was} Bei dir fällt diese Stelle ${ort}. Darüber gebietet ${herr}` +
      (herrHaus ? `, und der steht im ${herrHaus}. Feld${wuerde}.` : "."),
    "pkt.note":"Ein Punkt ist kein Himmelskörper, sondern eine gerechnete Stelle: Man nimmt den " +
      "Abstand zwischen zwei Orten des Horoskops und trägt ihn vom Aufsteigenden noch einmal ab. " +
      "Bonatti führt siebenundneunzig davon auf; hier stehen die sieben hermetischen — zu jedem " +
      "Wandelstern einer — und die, nach denen in der Praxis am häufigsten gefragt wurde. Der " +
      "Punkt des Todes steht nicht dabei.",

    /* ------------------------------------------ Die Verteilung */
    "vt.saturn":"Arbeit, Ausdauer, Einsamkeit, alles Langsame und Dauerhafte; alte Dinge und alte Leute",
    "vt.jupiter":"Großzügigkeit, Lehre, Recht, Ansehen, Freiheit; was sich weitet",
    "vt.mars":"Streit, Antrieb, Risiko, Aufbruch; was schneidet und was treibt",
    "vt.sonne":"Rang, Stolz, Sichtbarkeit, Väter und Obrigkeit; was ins Licht tritt",
    "vt.venus":"Liebe, Schönheit, Kunst, Vergnügen, Frieden; was gefällt",
    "vt.merkur":"Reden, Schreiben, Handel, Lernen, Geschwister; was zwischen Menschen geht",
    "vt.mond":"Mutter, Volk, Leib, Reisen, Wechsel; was nährt und was sich wandelt",
    "vt.kopf": (breite, nord, lang, langJahre, kurz, kurzJahre) =>
      `Gerechnet für ${breite}° ${nord ? "Nord" : "Süd"}. An diesem Ort braucht ${lang} ` +
      `<b>${langJahre} Jahre</b> zum Aufgehen und ${kurz} nur <b>${kurzJahre}</b>. ` +
      `Darum sind die Abschnitte unten so ungleich lang: Sie messen nicht Grade, sondern die ` +
      `Zeit, die der Himmel über diesem Ort dafür braucht.`,
    "vt.jetzt":"Wo du gerade stehst",
    "vt.spanne": (von, bis, vonDatum, bisDatum) =>
      `verteilt dir die Jahre ${von} bis ${bis} — also ${vonDatum} bis ${bisDatum}`,
    "vt.satz": (verteiler, wesen, teilhaber, art, jahre) =>
      `Der <b>Verteiler</b> dieses Abschnitts ist ${verteiler}: ${wesen}. Das ist das Thema, ` +
      `unter dem diese Jahre stehen. ` +
      (teilhaber
        ? `Dein <b>Teilhaber</b> ist ${teilhaber} — der Punkt hat ${art} zuletzt überschritten, ` +
          `bei ${jahre} Jahren. Von dort kommen die Menschen und die Ereignisse.`
        : `Einen Teilhaber gibt es hier noch nicht — der Punkt hat seit der Geburt keinen Körper ` +
          `und keinen Strahl überschritten. Der Verteiler steht allein.`),
    "vt.koerper":"seinen Körper",
    "vt.strahl": (art) => `sein ${art}`,
    "vt.waehrend": (liste) => `Noch in diesem Abschnitt kommt dazu: ${liste}.`,
    "vt.folge":"Die Folge der Verteiler",
    "vt.tab.alter":"Alter", "vt.tab.jahr":"Jahr", "vt.tab.verteiler":"Verteiler",
    "vt.tab.grenze":"Grenze", "vt.tab.teilhaber":"Teilhaber",
    "vt.note":"Dorotheos liest an dieser Tafel auch das Maß des Lebens ab — dort, wo ein " +
      "Übeltäter verteilt und ein Übeltäter zugleich Teilhaber ist. Diese Lesart steht hier " +
      "nicht: Sie nennt Jahreszahlen für einen Tod, und das tut diese Seite nicht. Gerechnet " +
      "wird mit den schiefen Aufstiegen für deine Geburtsbreite, nicht mit einer Klimatafel — " +
      "geprüft an den Beispielen aus Benjamin Dykes' Werkstattunterlagen zur Verteilung, auf " +
      "fünf Stellen genau.",

    /* ------------------------------------- Der Herr der Geburt */
    "alm.saturn":"Er macht aus dieser Geburt eine, die lange braucht und dann bleibt. Was hier zählt, zählt erst spät — und dann nicht wenig.",
    "alm.jupiter":"Er macht aus dieser Geburt eine, der Raum gegeben wird. Es geht weiter, als die Herkunft erwarten ließ.",
    "alm.mars":"Er macht aus dieser Geburt eine, die sich durchsetzen muss und es auch tut. Nichts kommt hier von selbst, und das ist die Sache nicht.",
    "alm.sonne":"Er macht aus dieser Geburt eine, die gesehen werden will und gesehen wird. Die Mitte ist hier nicht verhandelbar.",
    "alm.venus":"Sie macht aus dieser Geburt eine, in der das Verbindende mehr wiegt als das Trennende. Was hier gelingt, gelingt mit anderen.",
    "alm.merkur":"Er macht aus dieser Geburt eine, die über das Wort geht. Was hier geschieht, geschieht durch Reden, Schreiben, Vermitteln.",
    "alm.mond":"Er macht aus dieser Geburt eine, die sich wandelt und darin treu bleibt. Sie trägt weiter, was sie empfangen hat.",
    "alm.titel":"Der Herr deiner Geburt",
    "alm.punkte": (gesamt, wuerde, ort, zeit) =>
      `${gesamt} Punkte — ${wuerde} aus den Würden, ${ort} aus seinem eigenen Ort, ${zeit} aus Tag und Stunde`,
    "alm.ort": (zeichen, haus, ort) =>
      ` Er selbst steht bei dir in ${zeichen}, im ${haus}. Feld — ${ort}. Dort ist der Ort, an ` +
      `dem sich diese Geburt am deutlichsten zeigt.`,
    "alm.gleich": (zweiter, punkte, sieger, w1, w2) =>
      `Hier steht es <b>gleich</b>: ${zweiter} kommt auf dieselben ${punkte} Punkte. Den ` +
      `Ausschlag gibt, dass ${sieger} mehr davon aus den Würden hat (${w1} gegen ${w2}) — die ` +
      `sind die eigentliche Herrschaft, Tag und Stunde nur Zugabe. Bonatti rät bei so engem ` +
      `Stand ohnehin, beide zu lesen: Der Zweite sagt dann, wie der Erste zu Werke geht.`,
    "alm.knapp": (zweiter, punkte) =>
      `Es ist knapp: ${zweiter} kommt auf ${punkte} Punkte. Bonatti rät bei so engem Stand, ` +
      `beide zu lesen — der Zweite sagt dann, wie der Erste zu Werke geht.`,
    "alm.stellen":"Die fünf Stellen",
    "alm.tab.stelle":"Stelle", "alm.tab.steht":"steht bei", "alm.tab.wuerde":"wer dort Würde hat",
    "alm.rangliste":"Die Rangliste",
    "alm.tagStunde": (tag, tagherr, stundenherr) =>
      `Dazu: Geboren an einem ${tag} — der Tag gehört ${tagherr} (7 Punkte); die Geburtsstunde ` +
      `gehört ${stundenherr} (6 Punkte).`,
    "alm.note":"Gerechnet nach Abraham Ibn Ezra (Sefer ha-Moladot, 12. Jh.), wie Guido Bonatti " +
      "das Verfahren im Liber Astronomiae übernimmt: Würden über die fünf Stellen, dazu der " +
      "eigene Ort nach Ibn Ezras Gewichtung der zwölf Felder, dazu Herr des Tages und Herr der " +
      "Stunde. Die Syzygie vor der Geburt ist hier über die mittleren Bewegungen genähert, nicht " +
      "exakt gesucht — auf das Zeichen kommt es an, und das trifft sie.",
    "alm.stelle.sonne":"die Sonne", "alm.stelle.mond":"der Mond",
    "alm.stelle.asc":"der Aszendent", "alm.stelle.fortuna":"der Glückspunkt",
    "alm.stelle.syzygie":"die Syzygie vor der Geburt",
    "wuerde.Zeichen":"Zeichen", "wuerde.Erhöhung":"Erhöhung", "wuerde.Triplizität":"Triplizität",
    "wuerde.Grenze":"Grenze", "wuerde.Gesicht":"Gesicht",

    "fehlt.geburt":"Dafür fehlen die Geburtsangaben — Datum, Uhrzeit und der Ort mit gesuchten Koordinaten.",

    "ny.frage":"Erst die Frage.",
    "ny.stunde": (tag, nr, planet, deutsch, soru, name, stunde, summe, rest) =>
      `${tag}, ${nr}. Stunde nach Sonnenaufgang — sie gehört ${planet} (${deutsch}). ` +
      `Frage ${soru} + Name ${name} + Stunde ${stunde} = ${summe}, geteilt durch zwölf: Rest ${rest}.`,
    "ny.note":"Dieselbe Frage bekommt zu anderer Stunde eine andere Antwort. Das ist keine " +
      "Schwäche der Tafel, sondern ihr Sinn: gefragt wird nicht die Sache, sondern der Augenblick.",
    "uy.beide":"Beide Namen und beide Mütter.",
    "uy.rechnung": (a, b, summe, rest) =>
      `${a} + ${b} = ${summe}, geteilt durch zwölf: Rest ${rest}.`,
    "wochentage":["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
    "yz.restNull":"Rest null zählt als das letzte Fach — die Fächer sind von eins an gezählt. " +
      "Dass Zeichen und Element dasselbe Element nennen, ist kein Zufall: zwölf ist durch vier teilbar.",
    "yz.gemuet":"Mizaç — das Gemüt", "yz.frau":"Für die Frau", "yz.mann":"Für den Mann",
    "yz.element":"Element", "yz.stern": (tr) => `Stern der Summe — ${tr}`,
    "yz.sternText": (gibt, nimmt, tag, metall, zahl, anrufung) =>
      `Er gibt: ${gibt}. Er nimmt: ${nimmt}. Sein Tag ist ${tag}, sein Metall ${metall}, ` +
      `seine Zahl ${zahl}, seine Anrufung ${anrufung}.`,
    "yz.erwerb":"Erwerb und Amt", "yz.ehe":"Ehe",
    "yz.eheText": (liste) =>
      `Es passen zu dir: ${liste}. Die Bücher raten ab von dem Zeichen, das dir im Kreis ` +
      `gegenübersteht — außer du hast es schon geheiratet; dann ist es die Aufgabe und nicht ` +
      `der Fehler.`,
    "yz.krankheit":"Krankheit",
    "yz.herberge": (nr, tr) => `Mondherberge ${nr} — ${tr}`,
    "yz.herbergeText": (ar, urteil, gut, meide) =>
      `${ar} — ${urteil} Günstig für: ${gut}. Meide: ${meide}.`,
    "yz.rat":"Der Rat"
  },

  it: {
    "werk.merkur.kurz":"per la parola e il numero",
    "werk.merkur.feld":"Scrivere, calcolare, insegnare, trattare, mediare, interpretare — tutto " +
      "ciò che passa fra le persone e deve nel farlo essere esatto. Tolomeo nomina scrivani, " +
      "mercanti, computisti, astrologi, oratori; gli arabi vi aggiungono traduttori e messaggeri.",
    "werk.venus.kurz":"per l'occhio e la mano",
    "werk.venus.feld":"Fare ciò che piace: musica, pittura, gioielli, vesti, profumi, giardini, " +
      "ospitalità. Tolomeo nomina musicanti, pittori, profumieri, tessitori — tutti coloro il " +
      "cui lavoro si misura su quanto sia venuto bello.",
    "werk.mars.kurz":"per il fuoco e il ferro",
    "werk.mars.feld":"Tutto ciò che taglia e che forma: lavoro del metallo, costruzione, " +
      "chirurgia, armi, fuoco, macellazione. Tolomeo nomina fabbri, chirurghi, soldati, cuochi, " +
      "scalpellini — lavoro in cui qualcosa cede perché lo si costringe.",

    "werk.paar.merkurVenus":"Parola e bellezza insieme: musica con testo, poesia, insegnamento " +
      "delle cose belle, commercio d'arte, tutto ciò che è rappresentazione. Tolomeo nomina qui " +
      "espressamente chi sta sulle scene.",
    "werk.paar.marsMerkur":"Parola e ferro insieme: un parlare tagliente e contenzioso — " +
      "diritto, contesa, critica, chirurgia con dottrina, tecnica con calcolo. Si tratta di " +
      "lavoro che separa e deve nel farlo essere esatto.",
    "werk.paar.marsVenus":"Bellezza e ferro insieme: lavoro sulla materia che richiede insieme " +
      "forza e gusto — scultura, arte del fabbro, tintura, cucina, ogni artigianato il cui " +
      "risultato si guarda.",

    "werk.titel":"Il signore della tua opera",
    "werk.keiner.titel":"Nessun signore dell'opera",
    "werk.keiner.text":"Nessuno dei tre — Mercurio, Venere, Marte — sorge la mattina prima del " +
      "sole, sta al mezzo del cielo o nel suo segno. Tolomeo dice per questo caso che l'uomo non " +
      "è assegnato a nessuna opera determinata: non vive allora di un mestiere, ma di ciò che " +
      "gli tocca — per nascita, per carica o per possesso. Gli arabi lo leggono più mite: " +
      "l'opera non è prescritta e perciò è libera.",
    "werk.geteilt": (a, b, text) =>
      `<b>Due si dividono il primato:</b> ${a} e ${b} arrivano allo stesso punteggio. Tolomeo ha ` +
      `per questo caso frasi proprie — ${text}`,
    "werk.ort": (zeichen, haus, ort) =>
      `Da te sta in ${zeichen}, nel ${haus}° campo — ${ort}. Il segno dice in quale specie di ` +
      `materia si lavora, il campo per conto di chi.`,
    "werk.wie":"Come è stato calcolato",
    "werk.grund.morgens": (grad) => `sorge la mattina prima del sole (${grad}° avanti)`,
    "werk.grund.verbrannt": (grad) => `sta troppo vicino al sole (${grad}°) — combusto, non conta`,
    "werk.grund.zehntes":"sta nel decimo campo, al mezzo del cielo",
    "werk.grund.mcZeichen":"sta nel segno del mezzo del cielo",
    "werk.grund.mcHerr":"è signore del mezzo del cielo",
    "werk.grund.winkel":"sta angolare",
    "werk.grund.keine":"nessuna delle condizioni è soddisfatta",
    "werk.note":"Secondo Tolomeo (Tetrabiblos IV.4): si cerca il pianeta che sorge la mattina " +
      "prima del sole, e quello che sta al mezzo del cielo. Solo Mercurio, Venere e Marte valgono " +
      "come signori dell'opera — ogni produrre, dice, passa per la mano, l'occhio o la parola. " +
      "Gli altri quattro danno rango e circostanze, non l'opera stessa.",

    "alter.kopf": (element, tag) =>
      `Il tuo segno ascendente appartiene all'elemento ${element}. Sei nato ${tag ? "di giorno" : "di notte"}, ` +
      `perciò guida il primo terzo ${tag ? "il signore del giorno" : "il signore della notte"}.`,
    "alter.spanne": (von, bis) => `${von}–${bis} anni`,
    "alter.satz": (rang, herr, zeichen, haus, stellung, wuerde) =>
      `Il ${rang} terzo sta sotto ${herr}. ${herr} sta in ${zeichen}, nel ${haus}° campo, ` +
      `e ${stellung}${wuerde}.`,
    "alter.erste":"primo", "alter.zweite":"secondo", "alter.dritte":"terzo",
    "alter.winkel":"sta angolare — questo terzo agisce visibilmente e produce",
    "alter.folgend":"sta succedente — questo terzo regge, ma più lentamente",
    "alter.kadent":"sta cadente — questo terzo passa per giri e attraverso altri",
    "alter.jetzt":"Qui stai in questo momento",
    "alter.note":"Secondo Doroteo (Carmen Astrologicum I): ogni elemento ha tre signori — uno " +
      "per il giorno, uno per la notte e un terzo, che la tradizione araba chiama il compagno. " +
      "La vita si divide in tre parti, e come sta il signore di turno, così decorre il suo " +
      "terzo. I terzi sono qui calcolati su settantacinque anni; i testi antichi vi pongono gli " +
      "anni che risultano dalla misura della vita. È la più semplice divisione del tempo della " +
      "tradizione e insieme la più grossolana — dice una tendenza, non una scadenza.",

    "pkt.tag":"Sei nato di giorno — i punti si calcolano nella loro forma di base.",
    "pkt.nacht":"Sei nato di notte — perciò la maggior parte dei punti si inverte. Non è un " +
      "artificio: la Parte della Fortuna misura il cammino dal sole alla luna, e di notte guida " +
      "la luna.",
    "pkt.gruppe1":"Le sette ermetiche",
    "pkt.gruppe2":"Le parti dei rapporti",
    "pkt.gedreht":"invertita di notte",
    "pkt.feld": (n) => `${n}° campo`,
    "pkt.satz": (was, ort, herr, herrHaus, wuerde) =>
      `${was} Da te questo punto cade ${ort}. Vi comanda ${herr}` +
      (herrHaus ? `, e questi sta nel ${herrHaus}° campo${wuerde}.` : "."),
    "pkt.note":"Una parte non è un corpo celeste, ma un luogo calcolato: si prende la distanza " +
      "fra due punti dell'oroscopo e la si riporta a partire dall'Ascendente. Bonatti ne elenca " +
      "novantasette; qui stanno le sette ermetiche — una per ciascun pianeta — e quelle su cui " +
      "nella pratica si è chiesto più spesso. La parte della morte non vi è compresa.",

    "vt.saturn":"lavoro, costanza, solitudine, tutto ciò che è lento e duraturo; cose vecchie e gente vecchia",
    "vt.jupiter":"generosità, dottrina, diritto, reputazione, libertà; ciò che si allarga",
    "vt.mars":"contesa, spinta, rischio, partenza; ciò che taglia e ciò che incalza",
    "vt.sonne":"rango, orgoglio, visibilità, padri e autorità; ciò che viene alla luce",
    "vt.venus":"amore, bellezza, arte, piacere, pace; ciò che piace",
    "vt.merkur":"parlare, scrivere, commercio, imparare, fratelli; ciò che passa fra le persone",
    "vt.mond":"madre, popolo, corpo, viaggi, mutamento; ciò che nutre e ciò che si trasforma",
    "vt.kopf": (breite, nord, lang, langJahre, kurz, kurzJahre) =>
      `Calcolato per ${breite}° ${nord ? "Nord" : "Sud"}. In questo luogo ${lang} impiega ` +
      `<b>${langJahre} anni</b> a sorgere e ${kurz} soltanto <b>${kurzJahre}</b>. ` +
      `Per questo i periodi qui sotto sono così diversi di lunghezza: non misurano gradi, ma il ` +
      `tempo che il cielo sopra questo luogo impiega a percorrerli.`,
    "vt.jetzt":"Dove stai in questo momento",
    "vt.spanne": (von, bis, vonDatum, bisDatum) =>
      `ti distribuisce gli anni da ${von} a ${bis} — cioè dal ${vonDatum} al ${bisDatum}`,
    "vt.satz": (verteiler, wesen, teilhaber, art, jahre) =>
      `Il <b>distributore</b> di questo periodo è ${verteiler}: ${wesen}. È il tema sotto cui ` +
      `stanno questi anni. ` +
      (teilhaber
        ? `Il tuo <b>compagno</b> è ${teilhaber} — il punto ne ha superato per ultimo ${art}, ` +
          `a ${jahre} anni. Di là vengono le persone e gli avvenimenti.`
        : `Un compagno qui non c'è ancora — dalla nascita il punto non ha superato né un corpo ` +
          `né un raggio. Il distributore sta solo.`),
    "vt.koerper":"il corpo",
    "vt.strahl": (art) => `il ${art}`,
    "vt.waehrend": (liste) => `Ancora in questo periodo si aggiunge: ${liste}.`,
    "vt.folge":"La successione dei distributori",
    "vt.tab.alter":"Età", "vt.tab.jahr":"Anno", "vt.tab.verteiler":"Distributore",
    "vt.tab.grenze":"Termine", "vt.tab.teilhaber":"Compagno",
    "vt.note":"Doroteo legge su questa tavola anche la misura della vita — là dove un malefico " +
      "distribuisce e un malefico è insieme compagno. Questa lettura qui non c'è: nomina cifre " +
      "di anni per una morte, e questo questo sito non lo fa. Si calcola con le ascensioni " +
      "oblique per la tua latitudine di nascita, non con una tavola climatica — verificato sugli " +
      "esempi delle dispense di Benjamin Dykes sulle distribuzioni, esatto a cinque cifre.",

    "alm.saturn":"Fa di questa nascita una che ha bisogno di tempo e poi resta. Ciò che qui conta, conta tardi — e allora non poco.",
    "alm.jupiter":"Fa di questa nascita una a cui viene dato spazio. Va più avanti di quanto l'origine lasciasse attendere.",
    "alm.mars":"Fa di questa nascita una che deve imporsi, e lo fa. Nulla qui viene da sé, e non è questo il punto.",
    "alm.sonne":"Fa di questa nascita una che vuole essere vista e viene vista. Il centro qui non è negoziabile.",
    "alm.venus":"Fa di questa nascita una in cui ciò che unisce pesa più di ciò che divide. Ciò che qui riesce, riesce con altri.",
    "alm.merkur":"Fa di questa nascita una che passa per la parola. Ciò che qui accade, accade parlando, scrivendo, mediando.",
    "alm.mond":"Fa di questa nascita una che muta e nel mutare resta fedele. Porta avanti ciò che ha ricevuto.",
    "alm.titel":"Il signore della tua nascita",
    "alm.punkte": (gesamt, wuerde, ort, zeit) =>
      `${gesamt} punti — ${wuerde} dalle dignità, ${ort} dal suo proprio luogo, ${zeit} dal giorno e dall'ora`,
    "alm.ort": (zeichen, haus, ort) =>
      ` Egli stesso sta da te in ${zeichen}, nel ${haus}° campo — ${ort}. È là il luogo in cui ` +
      `questa nascita si mostra più chiaramente.`,
    "alm.gleich": (zweiter, punkte, sieger, w1, w2) =>
      `Qui si sta <b>pari</b>: ${zweiter} arriva agli stessi ${punkte} punti. A decidere è che ` +
      `${sieger} ne ha di più dalle dignità (${w1} contro ${w2}) — quelle sono la vera signoria, ` +
      `il giorno e l'ora soltanto un'aggiunta. Bonatti consiglia comunque, con una differenza ` +
      `così stretta, di leggerli entrambi: il secondo dice allora come il primo procede.`,
    "alm.knapp": (zweiter, punkte) =>
      `È stretta: ${zweiter} arriva a ${punkte} punti. Bonatti consiglia, con una differenza ` +
      `così stretta, di leggerli entrambi — il secondo dice allora come il primo procede.`,
    "alm.stellen":"Le cinque posizioni",
    "alm.tab.stelle":"Posizione", "alm.tab.steht":"sta a", "alm.tab.wuerde":"chi vi ha dignità",
    "alm.rangliste":"La graduatoria",
    "alm.tagStunde": (tag, tagherr, stundenherr) =>
      `Inoltre: nato di ${tag} — il giorno appartiene a ${tagherr} (7 punti); l'ora della ` +
      `nascita appartiene a ${stundenherr} (6 punti).`,
    "alm.note":"Calcolato secondo Abraham Ibn Ezra (Sefer ha-Moladot, XII sec.), come Guido " +
      "Bonatti riprende il procedimento nel Liber Astronomiae: le dignità sulle cinque posizioni, " +
      "poi il luogo proprio secondo la ponderazione dei dodici campi di Ibn Ezra, poi il signore " +
      "del giorno e il signore dell'ora. La sizigia precedente la nascita è qui approssimata con " +
      "i moti medi, non cercata esattamente — ciò che conta è il segno, e quello lo coglie.",
    "alm.stelle.sonne":"il sole", "alm.stelle.mond":"la luna",
    "alm.stelle.asc":"l'Ascendente", "alm.stelle.fortuna":"la Parte della Fortuna",
    "alm.stelle.syzygie":"la sizigia precedente la nascita",
    "wuerde.Zeichen":"segno", "wuerde.Erhöhung":"esaltazione", "wuerde.Triplizität":"triplicità",
    "wuerde.Grenze":"termine", "wuerde.Gesicht":"faccia",

    "fehlt.geburt":"Per questo mancano i dati di nascita — data, ora e il luogo con le coordinate cercate.",

    "ny.frage":"Prima la domanda.",
    "ny.stunde": (tag, nr, planet, deutsch, soru, name, stunde, summe, rest) =>
      `${tag}, ${nr}ª ora dopo il levar del sole — appartiene a ${planet} (${deutsch}). ` +
      `Domanda ${soru} + nome ${name} + ora ${stunde} = ${summe}, diviso dodici: resto ${rest}.`,
    "ny.note":"La stessa domanda riceve a un'altra ora un'altra risposta. Non è una debolezza " +
      "della tavola, ma il suo senso: non si interroga la cosa, bensì l'istante.",
    "uy.beide":"Entrambi i nomi ed entrambe le madri.",
    "uy.rechnung": (a, b, summe, rest) =>
      `${a} + ${b} = ${summe}, diviso dodici: resto ${rest}.`,
    "wochentage":["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],
    "yz.restNull":"Il resto zero vale come l'ultimo scomparto — gli scomparti sono contati da uno. " +
      "Che segno ed elemento nominino lo stesso elemento non è un caso: dodici è divisibile per quattro.",
    "yz.gemuet":"Mizaç — l'animo", "yz.frau":"Per la donna", "yz.mann":"Per l'uomo",
    "yz.element":"Elemento", "yz.stern": (tr) => `Stella della somma — ${tr}`,
    "yz.sternText": (gibt, nimmt, tag, metall, zahl, anrufung) =>
      `Dà: ${gibt}. Prende: ${nimmt}. Il suo giorno è ${tag}, il suo metallo ${metall}, ` +
      `il suo numero ${zahl}, la sua invocazione ${anrufung}.`,
    "yz.erwerb":"Guadagno e carica", "yz.ehe":"Matrimonio",
    "yz.eheText": (liste) =>
      `Ti si addicono: ${liste}. I libri sconsigliano il segno che ti sta di fronte nel ` +
      `cerchio — a meno che tu non l'abbia già sposato; allora è il compito e non l'errore.`,
    "yz.krankheit":"Malattia",
    "yz.herberge": (nr, tr) => `Stazione lunare ${nr} — ${tr}`,
    "yz.herbergeText": (ar, urteil, gut, meide) =>
      `${ar} — ${urteil} Favorevole a: ${gut}. Evita: ${meide}.`,
    "yz.rat":"Il consiglio"
  }
};

let aktiv = "de";
export function setzeRestSprache(code) { aktiv = R[code] ? code : "de"; }
export function rt(schluessel, ...args) {
  const tafel = R[aktiv] || R.de;
  const w = tafel[schluessel] !== undefined ? tafel[schluessel] : R.de[schluessel];
  return typeof w === "function" ? w(...args) : w;
}
