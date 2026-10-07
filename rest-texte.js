/* ------------------------------------------------------------------------
   rest-texte.js — die Sätze des Werks, der Lebensalter, der arabischen
   Punkte, der Verteilung und des Herrn der Geburt, je Sprache.

   Dasselbe Verfahren wie bei der Essenz und der Deutung: jeder Satz eine
   Funktion, keine Zeichenkette mit Platzhaltern.
   ------------------------------------------------------------------------ */

export const R = {
  de: {
    /* ------------------------------------------- Das Lebensmaß */
    "lm.warnung":"<b>Vorab, damit es nicht missverstanden wird:</b> Diese Technik teilt eine " +
      "Zahl von Jahren zu — sie sagt nicht, wann jemand stirbt, und kann es nicht. Schon in der " +
      "Überlieferung war sie die umstrittenste von allen: Ptolemaios, die Perser und die Araber " +
      "rechneten verschieden, und dieselbe Geburt ergab bei ihnen verschiedene Zahlen. Gemeint " +
      "ist ein Maß an Lebenskraft, das einer Anlage mitgegeben ist — nicht ein Datum.",
    "lm.erstens":"Erstens: der Hylech",
    "lm.erstensText":"Gesucht wird die Stelle, von der das Leben ausgeht. Die Reihenfolge ist " +
      "fest: bei einer Taggeburt zuerst die Sonne, bei einer Nachtgeburt zuerst der Mond — aber " +
      "nur, wenn das Licht in einem der Örter des Lebens steht: im ersten, siebten, neunten, " +
      "zehnten oder elften Haus. Sonst rückt der nächste Anwärter nach.",
    "lm.tab.anwaerter":"Anwärter", "lm.tab.stellung":"Stellung", "lm.tab.haus":"Haus",
    "lm.tab.ort":"Ort des Lebens?", "lm.ja":"ja", "lm.nein":"nein",
    "lm.hylechIst": (art, glyph, zeichen, grad, haus) =>
      `Hylech ist damit <b>${art}</b>, auf ${glyph} ${zeichen} ${grad}°, im ${haus}. Haus.`,
    "lm.zweitens":"Zweitens: der Alkochoden",
    "lm.drittens":"Drittens: die Jahre",
    "lm.zweitensText":"Nun wird gefragt, wer über diesem Grad gebietet — wer dort die meiste " +
      "Würde hat: durch Domizil, Erhöhung, Trigon, Term oder Gesicht. Und er muss den Hylech " +
      "sehen; ein Planet, der ihn nicht erblickt, kann ihm auch nichts geben.",
    "lm.tab.planet":"Planet", "lm.tab.wuerde":"Würde", "lm.tab.sieht":"sieht den Hylech",
    "lm.alkoIst": (name) => `Alkochoden ist <b>${name}</b>`,
    "lm.alkoSieht":", und er sieht den Hylech.",
    "lm.alkoSiehtNicht":" — er hat zwar die meiste Würde, sieht den Hylech aber nicht. Die " +
      "strenge Lesart lässt ihn dann nicht gelten; hier steht er trotzdem, damit die Rechnung " +
      "sichtbar bleibt.",
    "lm.stufe.gross":"in einem Winkelhaus — die stärkste Stellung, er gibt seine <b>größten</b> Jahre",
    "lm.stufe.mittel":"in einem Folgehaus — die mittlere Stellung, er gibt seine <b>mittleren</b> Jahre",
    "lm.stufe.klein":"in einem fallenden Haus — die schwächste Stellung, er gibt seine <b>kleinsten</b> Jahre",
    "lm.jahreSatz": (name, haus, stufe, jahre, g, m, k) =>
      `${name} steht im ${haus}. Haus, ${stufe}: <b>${jahre} Jahre</b>. ` +
      `(Seine Zahlen sind ${g} / ${m} / ${k}.)`,
    "lm.zuschlaege":"Dazu die Zu- und Abschläge: Wohltäter, die den Alkochoden sehen, legen zu; Übeltäter nehmen.",
    "lm.zuschlagZeile": (planet, aspekt, vorzeichen, wert) =>
      `${planet}, ${aspekt}: <b>${vorzeichen}${wert}</b> Jahre`,
    "lm.keineZuschlaege":"Weder Wohltäter noch Übeltäter sehen den Alkochoden — es bleibt bei der Grundzahl.",
    "lm.masz":"Das zugeteilte Maß",
    "lm.jahre": (n) => `${n} Jahre`,
    "lm.herkunft": (grund, aspekte) =>
      `${grund} vom Alkochoden` + (aspekte ? `, ${aspekte} aus den Aspekten` : ""),
    "lm.wieLesen":"Wie das zu lesen ist",
    "lm.wieLesenText":"Die Alten selbst haben diese Zahl nie für ein Datum gehalten. Sie nannten " +
      "sie das Maß, das der Anlage mitgegeben ist — und sie wussten, dass Lebensweise, Herkunft, " +
      "Zeitläufte und Zufall darüber entscheiden, was daraus wird. Ptolemaios rechnete anders " +
      "als die Perser, die Perser anders als die Araber, und dieselbe Geburt ergab bei ihnen " +
      "verschiedene Zahlen. Wer diese Technik ernst nimmt, nimmt zuerst ihre Uneinigkeit ernst.",
    "lm.schlusswort":"Was hier steht, ist eine historische Rechnung, kein Befund über dich. Es " +
      "sagt nichts über deine Gesundheit und nichts über deine Lebenszeit. Wer sich Sorgen um " +
      "beides macht, ist bei einem Arzt richtig und nicht bei einer Tafel aus dem neunten " +
      "Jahrhundert.",
    "lm.kandidat.sonne":"Sonne", "lm.kandidat.mond":"Mond",
    "lm.kandidat.asc":"Aszendent",
    "lm.kandidat.neumond":"Syzygie (Neumond)", "lm.kandidat.vollmond":"Syzygie (Vollmond)",
    "keineAngaben":"Noch keine Geburtsangaben hinterlegt. ",
    "zurEingabe":"Zur Dateneingabe",
    "fuer":"Für: ",
    "aspekt.Konjunktion":"Konjunktion", "aspekt.Opposition":"Opposition",
    "aspekt.Quadrat":"Quadrat", "aspekt.Trigon":"Trigon", "aspekt.Sextil":"Sextil",
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
    "yz.rat":"Der Rat",
    "rm.frage":"Erst die Frage — ohne Absicht schweigt der Sand.",
    "rm.ueberspringen":"Überspringen",
    "rm.richter":"Der Richter — قاضي",
    "rm.zeugen":"Die beiden Zeugen",
    "rm.zeugenText":"Der rechte Zeuge spricht über das, was war und was von dir ausgeht; der " +
      "linke über das, was kommt und was dir entgegentritt. Der Richter entsteht aus beiden.",
    "rm.rechts":"Rechter Zeuge · was war", "rm.links":"Linker Zeuge · was kommt",
    "rm.mutter": (n) => `${n}. Mutter`,
    "ek.art":["Reise und Aufbruch","Ehe, Liebe und Versöhnung","Handel, Kauf und Vertrag",
              "Bauen, Gründen und Anfangen","Heilung und Gesundheit",
              "Lernen, Schreiben und Vortragen","Säen, Pflanzen und Ernten",
              "Beenden, Trennen und Aufräumen","Streit, Recht und Behörde","Bitten und Ansprechen"],
    "ek.vorhaben":"Dein Vorhaben",
    "ek.gut":"Ein guter Zeitpunkt", "ek.brauchbar":"Brauchbar",
    "ek.weder":"Weder noch", "ek.nicht":"Lieber nicht heute",
    "ek.mond": (zeichen, nr, name, zu) =>
      `Der Mond steht in ${zeichen}, Station ${nr} — ${name}, und ${zu ? "nimmt zu" : "nimmt ab"}.`,
    "ek.unklar":"Die Art des Vorhabens konnte ich nicht sicher erkennen — geurteilt wird " +
      "deshalb nur nach dem allgemeinen Stand des Mondes. Nenne etwas konkreter, worum es geht " +
      "(reisen, heiraten, kaufen, bauen, heilen, lernen, säen, beenden).",
    "ek.station":"Die Station heute",
    "ek.stationText": (nr, tr, ar, urteil, gut, meide) =>
      `<b>${nr}. ${tr}</b> (${ar}) — ${urteil} Günstig für: ${gut}. Meide: ${meide}.`,
    "ek.dafuer":"Was dafür und was dagegen spricht"
  },

  it: {
    /* ------------------------------------------- La misura della vita */
    "lm.warnung":"<b>Prima di tutto, perché non sia frainteso:</b> questa tecnica assegna un " +
      "numero di anni — non dice quando qualcuno muoia, e non può dirlo. Già nella tradizione " +
      "era la più controversa di tutte: Tolomeo, i persiani e gli arabi calcolavano in modo " +
      "diverso, e la stessa nascita dava presso di loro cifre diverse. Si intende una misura di " +
      "forza vitale data a una disposizione — non una data.",
    "lm.erstens":"Primo: l'hyleg",
    "lm.erstensText":"Si cerca il punto da cui la vita procede. L'ordine è fisso: in una " +
      "nascita diurna prima il sole, in una notturna prima la luna — ma solo se la luce si " +
      "trova in uno dei luoghi della vita: nella prima, settima, nona, decima o undicesima " +
      "casa. Altrimenti subentra il candidato successivo.",
    "lm.tab.anwaerter":"Candidato", "lm.tab.stellung":"Posizione", "lm.tab.haus":"Casa",
    "lm.tab.ort":"Luogo della vita?", "lm.ja":"sì", "lm.nein":"no",
    "lm.hylechIst": (art, glyph, zeichen, grad, haus) =>
      `L'hyleg è dunque <b>${art}</b>, a ${glyph} ${zeichen} ${grad}°, nella ${haus}ª casa.`,
    "lm.zweitens":"Secondo: l'alcocoden",
    "lm.drittens":"Terzo: gli anni",
    "lm.zweitensText":"Ora si chiede chi comandi su questo grado — chi vi abbia più dignità: " +
      "per domicilio, esaltazione, triplicità, termine o faccia. E deve vedere l'hyleg; un " +
      "pianeta che non lo scorge non può dargli nulla.",
    "lm.tab.planet":"Pianeta", "lm.tab.wuerde":"Dignità", "lm.tab.sieht":"vede l'hyleg",
    "lm.alkoIst": (name) => `L'alcocoden è <b>${name}</b>`,
    "lm.alkoSieht":", e vede l'hyleg.",
    "lm.alkoSiehtNicht":" — ha sì la maggiore dignità, ma non vede l'hyleg. La lettura severa " +
      "non lo ammette allora; qui sta ugualmente, perché il calcolo resti visibile.",
    "lm.stufe.gross":"in una casa angolare — la posizione più forte, dà i suoi anni <b>maggiori</b>",
    "lm.stufe.mittel":"in una casa succedente — la posizione media, dà i suoi anni <b>medi</b>",
    "lm.stufe.klein":"in una casa cadente — la posizione più debole, dà i suoi anni <b>minori</b>",
    "lm.jahreSatz": (name, haus, stufe, jahre, g, m, k) =>
      `${name} sta nella ${haus}ª casa, ${stufe}: <b>${jahre} anni</b>. ` +
      `(Le sue cifre sono ${g} / ${m} / ${k}.)`,
    "lm.zuschlaege":"Vi si aggiungono gli aumenti e le diminuzioni: i benefici che vedono l'alcocoden aggiungono; i malefici tolgono.",
    "lm.zuschlagZeile": (planet, aspekt, vorzeichen, wert) =>
      `${planet}, ${aspekt}: <b>${vorzeichen}${wert}</b> anni`,
    "lm.keineZuschlaege":"Né benefici né malefici vedono l'alcocoden — resta la cifra di base.",
    "lm.masz":"La misura assegnata",
    "lm.jahre": (n) => `${n} anni`,
    "lm.herkunft": (grund, aspekte) =>
      `${grund} dall'alcocoden` + (aspekte ? `, ${aspekte} dagli aspetti` : ""),
    "lm.wieLesen":"Come va letto",
    "lm.wieLesenText":"Gli antichi stessi non hanno mai preso questa cifra per una data. La " +
      "chiamavano la misura data alla disposizione — e sapevano che modo di vivere, origine, " +
      "vicende del tempo e caso decidono che cosa ne venga. Tolomeo calcolava diversamente dai " +
      "persiani, i persiani diversamente dagli arabi, e la stessa nascita dava presso di loro " +
      "cifre diverse. Chi prende sul serio questa tecnica prende sul serio anzitutto il suo " +
      "disaccordo.",
    "lm.schlusswort":"Ciò che sta qui è un calcolo storico, non un referto su di te. Non dice " +
      "nulla sulla tua salute e nulla sulla durata della tua vita. Chi si preoccupa dell'una o " +
      "dell'altra si rivolga a un medico e non a una tavola del nono secolo.",
    "lm.kandidat.sonne":"Sole", "lm.kandidat.mond":"Luna",
    "lm.kandidat.asc":"Ascendente",
    "lm.kandidat.neumond":"Sizigia (luna nuova)", "lm.kandidat.vollmond":"Sizigia (luna piena)",
    "keineAngaben":"Nessun dato di nascita ancora registrato. ",
    "zurEingabe":"Ai dati",
    "fuer":"Per: ",
    "aspekt.Konjunktion":"congiunzione", "aspekt.Opposition":"opposizione",
    "aspekt.Quadrat":"quadrato", "aspekt.Trigon":"trigono", "aspekt.Sextil":"sestile",
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
    "yz.rat":"Il consiglio",
    "rm.frage":"Prima la domanda — senza intenzione la sabbia tace.",
    "rm.ueberspringen":"Salta",
    "rm.richter":"Il giudice — قاضي",
    "rm.zeugen":"I due testimoni",
    "rm.zeugenText":"Il testimone destro parla di ciò che è stato e di ciò che parte da te; " +
      "il sinistro di ciò che viene e di ciò che ti viene incontro. Il giudice nasce da entrambi.",
    "rm.rechts":"Testimone destro · ciò che è stato", "rm.links":"Testimone sinistro · ciò che viene",
    "rm.mutter": (n) => `${n}ª madre`,
    "ek.art":["Viaggio e partenza","Matrimonio, amore e riconciliazione","Commercio, acquisto e contratto",
              "Costruire, fondare e cominciare","Guarigione e salute",
              "Imparare, scrivere e esporre","Seminare, piantare e raccogliere",
              "Finire, separare e mettere in ordine","Lite, diritto e autorità","Chiedere e rivolgersi"],
    "ek.vorhaben":"Il tuo proposito",
    "ek.gut":"Un buon momento", "ek.brauchbar":"Utilizzabile",
    "ek.weder":"Né l'uno né l'altro", "ek.nicht":"Oggi meglio di no",
    "ek.mond": (zeichen, nr, name, zu) =>
      `La luna sta in ${zeichen}, stazione ${nr} — ${name}, e ${zu ? "cresce" : "cala"}.`,
    "ek.unklar":"Non ho potuto riconoscere con sicurezza il genere del proposito — si giudica " +
      "perciò soltanto sulla posizione generale della luna. Di' più concretamente di che cosa " +
      "si tratta (viaggiare, sposarsi, comprare, costruire, guarire, imparare, seminare, finire).",
    "ek.station":"La stazione di oggi",
    "ek.stationText": (nr, tr, ar, urteil, gut, meide) =>
      `<b>${nr}. ${tr}</b> (${ar}) — ${urteil} Favorevole a: ${gut}. Evita: ${meide}.`,
    "ek.dafuer":"Che cosa parla a favore e che cosa contro"
  },

  en: {
    /* ------------------------------------------- The measure of life */
    "lm.warnung":"<b>First, so that it is not misunderstood:</b> this technique assigns a " +
      "number of years — it does not say when anyone dies, and cannot. Even in the tradition it " +
      "was the most disputed of all: Ptolemy, the Persians and the Arabs reckoned differently, " +
      "and the same birth gave different numbers in their hands. What is meant is a measure of " +
      "vital force given with a disposition — not a date.",
    "lm.erstens":"First: the hyleg",
    "lm.erstensText":"Sought is the place from which the life proceeds. The order is fixed: in " +
      "a day birth the sun first, in a night birth the moon first — but only if the light " +
      "stands in one of the places of life: in the first, seventh, ninth, tenth or eleventh " +
      "house. Otherwise the next candidate moves up.",
    "lm.tab.anwaerter":"Candidate", "lm.tab.stellung":"Position", "lm.tab.haus":"House",
    "lm.tab.ort":"Place of life?", "lm.ja":"yes", "lm.nein":"no",
    "lm.hylechIst": (art, glyph, zeichen, grad, haus) =>
      `The hyleg is therefore <b>${art}</b>, at ${glyph} ${zeichen} ${grad}°, in the ${haus}th house.`,
    "lm.zweitens":"Second: the alcocoden",
    "lm.drittens":"Third: the years",
    "lm.zweitensText":"Now it is asked who commands over this degree — who has the most dignity " +
      "there: by domicile, exaltation, triplicity, bound or face. And it must see the hyleg; a " +
      "planet that does not behold it can give it nothing either.",
    "lm.tab.planet":"Planet", "lm.tab.wuerde":"Dignity", "lm.tab.sieht":"sees the hyleg",
    "lm.alkoIst": (name) => `The alcocoden is <b>${name}</b>`,
    "lm.alkoSieht":", and it sees the hyleg.",
    "lm.alkoSiehtNicht":" — it has the most dignity, true, but does not see the hyleg. The " +
      "strict reading then does not let it stand; here it stands all the same, so that the " +
      "reckoning stays visible.",
    "lm.stufe.gross":"in an angular house — the strongest position, it gives its <b>greatest</b> years",
    "lm.stufe.mittel":"in a succedent house — the middle position, it gives its <b>middle</b> years",
    "lm.stufe.klein":"in a cadent house — the weakest position, it gives its <b>least</b> years",
    "lm.jahreSatz": (name, haus, stufe, jahre, g, m, k) =>
      `${name} stands in the ${haus}th house, ${stufe}: <b>${jahre} years</b>. ` +
      `(Its numbers are ${g} / ${m} / ${k}.)`,
    "lm.zuschlaege":"Added to that are the increases and decreases: benefics that see the alcocoden add; malefics take away.",
    "lm.zuschlagZeile": (planet, aspekt, vorzeichen, wert) =>
      `${planet}, ${aspekt}: <b>${vorzeichen}${wert}</b> years`,
    "lm.keineZuschlaege":"Neither benefics nor malefics see the alcocoden — the base number stands.",
    "lm.masz":"The measure assigned",
    "lm.jahre": (n) => `${n} years`,
    "lm.herkunft": (grund, aspekte) =>
      `${grund} from the alcocoden` + (aspekte ? `, ${aspekte} from the aspects` : ""),
    "lm.wieLesen":"How to read this",
    "lm.wieLesenText":"The old writers themselves never took this number for a date. They " +
      "called it the measure given with the disposition — and they knew that manner of life, " +
      "origin, the run of the times and chance decide what comes of it. Ptolemy reckoned " +
      "differently from the Persians, the Persians differently from the Arabs, and the same " +
      "birth gave different numbers in their hands. Whoever takes this technique seriously " +
      "takes its disagreement seriously first.",
    "lm.schlusswort":"What stands here is a historical calculation, not a finding about you. It " +
      "says nothing about your health and nothing about your lifespan. Anyone worried about " +
      "either belongs with a doctor and not with a table from the ninth century.",
    "lm.kandidat.sonne":"Sun", "lm.kandidat.mond":"Moon",
    "lm.kandidat.asc":"Ascendant",
    "lm.kandidat.neumond":"Syzygy (new moon)", "lm.kandidat.vollmond":"Syzygy (full moon)",
    "keineAngaben":"No birth data stored yet. ",
    "zurEingabe":"To the data entry",
    "fuer":"For: ",
    "aspekt.Konjunktion":"conjunction", "aspekt.Opposition":"opposition",
    "aspekt.Quadrat":"square", "aspekt.Trigon":"trine", "aspekt.Sextil":"sextile",
    /* ------------------------------------------------- The work */
    "werk.merkur.kurz":"by the word and the number",
    "werk.merkur.feld":"Writing, reckoning, teaching, trading, mediating, interpreting — " +
      "everything that goes back and forth between people and has to be exact in doing so. " +
      "Ptolemy names scribes, merchants, reckoners, astrologers, orators; the Arabs add " +
      "translators and messengers.",
    "werk.venus.kurz":"by the eye and the hand",
    "werk.venus.feld":"Making what pleases: music, painting, ornament, clothes, sweet scent, " +
      "gardens, hospitality. Ptolemy names musicians, painters, mixers of unguents, weavers — " +
      "all whose work is measured by whether it has turned out beautiful.",
    "werk.mars.kurz":"by fire and iron",
    "werk.mars.feld":"Everything that cuts and shapes: metalwork, building, surgery, weapons, " +
      "fire, slaughter. Ptolemy names smiths, surgeons, soldiers, cooks, stonemasons — work in " +
      "which something gives way because it is forced to.",

    "werk.paar.merkurVenus":"Word and beauty together: music with words, poetry, the teaching " +
      "of beautiful things, trade in art, everything performed. Ptolemy expressly names here " +
      "those who stand on stages.",
    "werk.paar.marsMerkur":"Word and iron together: sharp, contentious speech — law, litigation, " +
      "criticism, surgery with teaching, engineering with calculation. What is at stake here is " +
      "work that separates and must be exact in doing so.",
    "werk.paar.marsVenus":"Beauty and iron together: work on material that calls for strength " +
      "and taste at once — sculpture, smithing, dyeing, cookery, every craft whose result is " +
      "looked at.",

    "werk.titel":"The lord of your work",
    "werk.keiner.titel":"No lord of the work",
    "werk.keiner.text":"None of the three — Mercury, Venus, Mars — rises in the morning before " +
      "the sun, stands at the midheaven, or in its sign. Ptolemy says for this case that the " +
      "person is assigned to no particular work: they then live not by a craft but by what " +
      "falls to them — from origin, office or property. The Arabs read it more mildly: the work " +
      "is not laid down beforehand and is therefore free.",
    "werk.geteilt": (a, b, text) =>
      `<b>Two share the precedence:</b> ${a} and ${b} come to the same. Ptolemy has sentences ` +
      `of his own for this case — ${text}`,
    "werk.ort": (zeichen, haus, ort) =>
      `With you he stands in ${zeichen}, in the ${haus}th field — ${ort}. The sign says in what ` +
      `kind of material the work is done, the field says on whose commission.`,
    "werk.wie":"How it was calculated",
    "werk.grund.morgens": (grad) => `rises in the morning before the sun (${grad}° ahead of it)`,
    "werk.grund.verbrannt": (grad) => `stands too near the sun (${grad}°) — combust, does not count`,
    "werk.grund.zehntes":"stands in the tenth field, at the midheaven",
    "werk.grund.mcZeichen":"stands in the sign of the midheaven",
    "werk.grund.mcHerr":"is lord of the midheaven",
    "werk.grund.winkel":"stands angular",
    "werk.grund.keine":"none of the conditions met",
    "werk.note":"After Ptolemy (Tetrabiblos IV.4): sought are the planet that rises in the " +
      "morning before the sun, and the one at the midheaven. Only Mercury, Venus and Mars count " +
      "as lords of the work — all bringing-forth, he says, goes by hand, eye or word. The other " +
      "four give rank and circumstance, not the work itself.",

    /* ------------------------------------- The three ages of life */
    "alter.kopf": (element, tag) =>
      `Your rising sign belongs to the element ${element}. You were born ${tag ? "by day" : "by night"}, ` +
      `so ${tag ? "the lord of the day" : "the lord of the night"} leads the first third.`,
    "alter.spanne": (von, bis) => `${von}–${bis} years`,
    "alter.satz": (rang, herr, zeichen, haus, stellung, wuerde) =>
      `The ${rang} third stands under ${herr}. ${herr} stands in ${zeichen}, in the ${haus}th ` +
      `field, and ${stellung}${wuerde}.`,
    "alter.erste":"first", "alter.zweite":"second", "alter.dritte":"third",
    "alter.winkel":"stands angular — this third works visibly and brings things forth",
    "alter.folgend":"stands succedent — this third carries, but more slowly",
    "alter.kadent":"stands cadent — this third goes by detours and through other people",
    "alter.jetzt":"This is where you stand now",
    "alter.note":"After Dorotheus (Carmen Astrologicum I): each element has three lords — one " +
      "for the day, one for the night, and a third whom the Arabic tradition calls the partner. " +
      "The life falls into three parts, and as the lord in question stands, so his third runs. " +
      "The thirds are reckoned here on seventy-five years; the old texts set for this the years " +
      "the measure of life yields. It is the simplest division of time in the tradition and at " +
      "the same time the coarsest — it gives a tendency, not a date.",

    /* --------------------------------------- The Arabic parts */
    "pkt.tag":"You were born by day — the parts are reckoned in their basic form.",
    "pkt.nacht":"You were born by night — most of the parts are therefore reversed. That is no " +
      "trick: the Lot of Fortune measures the way from the sun to the moon, and by night the " +
      "moon leads.",
    "pkt.gruppe1":"The seven hermetic",
    "pkt.gruppe2":"The parts of circumstance",
    "pkt.gedreht":"reversed by night",
    "pkt.feld": (n) => `${n}th field`,
    "pkt.satz": (was, ort, herr, herrHaus, wuerde) =>
      `${was} With you this place falls ${ort}. Over it ${herr} has command` +
      (herrHaus ? `, and he stands in the ${herrHaus}th field${wuerde}.` : "."),
    "pkt.note":"A part is no heavenly body but a calculated place: one takes the distance " +
      "between two places of the chart and lays it off once more from the Ascendant. Bonatti " +
      "lists ninety-seven of them; here stand the seven hermetic ones — one to each wandering " +
      "star — and those most often asked after in practice. The part of death is not among them.",

    /* ------------------------------------------ The distribution */
    "vt.saturn":"work, endurance, solitude, everything slow and lasting; old things and old people",
    "vt.jupiter":"generosity, teaching, law, standing, freedom; what widens",
    "vt.mars":"strife, drive, risk, setting out; what cuts and what pushes",
    "vt.sonne":"rank, pride, visibility, fathers and authority; what steps into the light",
    "vt.venus":"love, beauty, art, pleasure, peace; what pleases",
    "vt.merkur":"speaking, writing, trade, learning, siblings; what goes between people",
    "vt.mond":"mother, the people, the body, travel, change; what nourishes and what alters",
    "vt.kopf": (breite, nord, lang, langJahre, kurz, kurzJahre) =>
      `Reckoned for ${breite}° ${nord ? "North" : "South"}. At this place ${lang} needs ` +
      `<b>${langJahre} years</b> to rise, and ${kurz} only <b>${kurzJahre}</b>. ` +
      `That is why the stretches below are so unequal in length: they measure not degrees but ` +
      `the time the sky above this place needs for them.`,
    "vt.jetzt":"Where you stand now",
    "vt.spanne": (von, bis, vonDatum, bisDatum) =>
      `distributes to you the years ${von} to ${bis} — that is ${vonDatum} to ${bisDatum}`,
    "vt.satz": (verteiler, wesen, teilhaber, art, jahre) =>
      `The <b>distributor</b> of this stretch is ${verteiler}: ${wesen}. That is the theme ` +
      `under which these years stand. ` +
      (teilhaber
        ? `Your <b>partner</b> is ${teilhaber} — the point last crossed ${art}, at ${jahre} ` +
          `years. From there come the people and the events.`
        : `There is no partner here yet — since the birth the point has crossed no body and no ` +
          `ray. The distributor stands alone.`),
    "vt.koerper":"its body",
    "vt.strahl": (art) => `its ${art}`,
    "vt.waehrend": (liste) => `Still within this stretch there comes: ${liste}.`,
    "vt.folge":"The succession of distributors",
    "vt.tab.alter":"Age", "vt.tab.jahr":"Year", "vt.tab.verteiler":"Distributor",
    "vt.tab.grenze":"Bound", "vt.tab.teilhaber":"Partner",
    "vt.note":"Dorotheus reads the measure of life off this table as well — there, where a " +
      "malefic distributes and a malefic is at the same time partner. That reading does not " +
      "stand here: it names years for a death, and this site does not do that. The reckoning " +
      "uses the oblique ascensions for your birth latitude, not a table of climates — checked " +
      "against the examples in Benjamin Dykes' workshop material on distribution, to five places.",

    /* ------------------------------------- The lord of the nativity */
    "alm.saturn":"He makes of this birth one that takes long and then stays. What counts here counts only late — and then not a little.",
    "alm.jupiter":"He makes of this birth one that is given room. It goes further than the origin led one to expect.",
    "alm.mars":"He makes of this birth one that has to assert itself, and does. Nothing here comes of itself, and that is not the trouble.",
    "alm.sonne":"He makes of this birth one that wants to be seen and is seen. The centre is not negotiable here.",
    "alm.venus":"She makes of this birth one in which what joins weighs more than what divides. What succeeds here succeeds with others.",
    "alm.merkur":"He makes of this birth one that goes by way of the word. What happens here happens through speaking, writing, mediating.",
    "alm.mond":"He makes of this birth one that changes and stays faithful in doing so. It carries on what it has received.",
    "alm.titel":"The lord of your nativity",
    "alm.punkte": (gesamt, wuerde, ort, zeit) =>
      `${gesamt} points — ${wuerde} from the dignities, ${ort} from his own place, ${zeit} from day and hour`,
    "alm.ort": (zeichen, haus, ort) =>
      ` He himself stands with you in ${zeichen}, in the ${haus}th field — ${ort}. That is the ` +
      `place where this birth shows itself most plainly.`,
    "alm.gleich": (zweiter, punkte, sieger, w1, w2) =>
      `Here it stands <b>equal</b>: ${zweiter} comes to the same ${punkte} points. The decision ` +
      `goes on ${sieger} having more of them from the dignities (${w1} against ${w2}) — those ` +
      `are the real rulership, day and hour only an addition. With so close a standing Bonatti ` +
      `advises reading both anyway: the second then says how the first goes to work.`,
    "alm.knapp": (zweiter, punkte) =>
      `It is close: ${zweiter} comes to ${punkte} points. With so close a standing Bonatti ` +
      `advises reading both — the second then says how the first goes to work.`,
    "alm.stellen":"The five places",
    "alm.tab.stelle":"Place", "alm.tab.steht":"stands at", "alm.tab.wuerde":"who has dignity there",
    "alm.rangliste":"The ranking",
    "alm.tagStunde": (tag, tagherr, stundenherr) =>
      `Along with that: born on a ${tag} — the day belongs to ${tagherr} (7 points); the hour of ` +
      `birth belongs to ${stundenherr} (6 points).`,
    "alm.note":"Reckoned after Abraham Ibn Ezra (Sefer ha-Moladot, 12th century), as Guido " +
      "Bonatti takes the procedure over in the Liber Astronomiae: dignities over the five " +
      "places, with the planet's own place by Ibn Ezra's weighting of the twelve fields, and " +
      "the lord of the day and the lord of the hour. The syzygy before the birth is approximated " +
      "here by the mean motions, not sought exactly — what matters is the sign, and that it hits.",
    "alm.stelle.sonne":"the Sun", "alm.stelle.mond":"the Moon",
    "alm.stelle.asc":"the Ascendant", "alm.stelle.fortuna":"the Lot of Fortune",
    "alm.stelle.syzygie":"the syzygy before the birth",
    "wuerde.Zeichen":"Domicile", "wuerde.Erhöhung":"Exaltation", "wuerde.Triplizität":"Triplicity",
    "wuerde.Grenze":"Bound", "wuerde.Gesicht":"Face",

    "fehlt.geburt":"For that the birth data are missing — date, time, and the place with coordinates looked up.",

    "ny.frage":"The question first.",
    "ny.stunde": (tag, nr, planet, deutsch, soru, name, stunde, summe, rest) =>
      `${tag}, ${nr}th hour after sunrise — it belongs to ${planet} (${deutsch}). ` +
      `Question ${soru} + name ${name} + hour ${stunde} = ${summe}, divided by twelve: remainder ${rest}.`,
    "ny.note":"The same question gets a different answer at a different hour. That is no " +
      "weakness of the table but its point: what is asked is not the matter but the moment.",
    "uy.beide":"Both names and both mothers.",
    "uy.rechnung": (a, b, summe, rest) =>
      `${a} + ${b} = ${summe}, divided by twelve: remainder ${rest}.`,
    "wochentage":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "yz.restNull":"A remainder of zero counts as the last compartment — the compartments are " +
      "counted from one. That sign and element name the same element is no accident: twelve is " +
      "divisible by four.",
    "yz.gemuet":"Mizaç — the temper", "yz.frau":"For the woman", "yz.mann":"For the man",
    "yz.element":"Element", "yz.stern": (tr) => `Star of the sum — ${tr}`,
    "yz.sternText": (gibt, nimmt, tag, metall, zahl, anrufung) =>
      `It gives: ${gibt}. It takes: ${nimmt}. Its day is ${tag}, its metal ${metall}, ` +
      `its number ${zahl}, its invocation ${anrufung}.`,
    "yz.erwerb":"Livelihood and office", "yz.ehe":"Marriage",
    "yz.eheText": (liste) =>
      `These suit you: ${liste}. The books advise against the sign that stands opposite you in ` +
      `the circle — unless you have married it already; then it is the task and not the mistake.`,
    "yz.krankheit":"Illness",
    "yz.herberge": (nr, tr) => `Lunar mansion ${nr} — ${tr}`,
    "yz.herbergeText": (ar, urteil, gut, meide) =>
      `${ar} — ${urteil} Favourable for: ${gut}. Avoid: ${meide}.`,
    "yz.rat":"The counsel",
    "rm.frage":"The question first — without intent the sand is silent.",
    "rm.ueberspringen":"Skip",
    "rm.richter":"The judge — قاضي",
    "rm.zeugen":"The two witnesses",
    "rm.zeugenText":"The right-hand witness speaks of what has been and what goes out from you; " +
      "the left-hand of what is coming and what comes to meet you. The judge arises out of both.",
    "rm.rechts":"Right witness · what has been", "rm.links":"Left witness · what is coming",
    "rm.mutter": (n) => `${n}th mother`,
    "ek.art":["Travel and setting out","Marriage, love and reconciliation","Trade, purchase and contract",
              "Building, founding and beginning","Healing and health",
              "Learning, writing and lecturing","Sowing, planting and harvesting",
              "Ending, parting and clearing up","Strife, law and authorities","Petitioning and approaching"],
    "ek.vorhaben":"What you mean to do",
    "ek.gut":"A good moment", "ek.brauchbar":"Usable",
    "ek.weder":"Neither", "ek.nicht":"Better not today",
    "ek.mond": (zeichen, nr, name, zu) =>
      `The moon stands in ${zeichen}, station ${nr} — ${name}, and is ${zu ? "waxing" : "waning"}.`,
    "ek.unklar":"I could not reliably make out what kind of undertaking this is — the judgment " +
      "therefore rests only on the moon's general standing. Say a little more concretely what it " +
      "is about (travel, marry, buy, build, heal, learn, sow, end).",
    "ek.station":"Today's station",
    "ek.stationText": (nr, tr, ar, urteil, gut, meide) =>
      `<b>${nr}. ${tr}</b> (${ar}) — ${urteil} Favourable for: ${gut}. Avoid: ${meide}.`,
    "ek.dafuer":"What speaks for it and what against"
  }
};

let aktiv = "de";
export function setzeRestSprache(code) { aktiv = R[code] ? code : "de"; }
export function rt(schluessel, ...args) {
  const tafel = R[aktiv] || R.de;
  const w = tafel[schluessel] !== undefined ? tafel[schluessel] : R.de[schluessel];
  return typeof w === "function" ? w(...args) : w;
}

/* Das Dezimalzeichen hängt an der Sprache: 7,5 im Deutschen und
   Italienischen, 7.5 im Englischen. Vorher stand überall ein Komma, auch
   wo englischer Text darum herum lief. */
export function zahl(n, stellen = 1) {
  const z = (Math.round(n * 10 ** stellen) / 10 ** stellen).toString();
  return aktiv === "en" ? z : z.replace(".", ",");
}

/* Aspektnamen kommen aus den Rechnern auf Deutsch; hier werden sie
   übersetzt und fallen auf den deutschen Namen zurück, wenn es keinen
   Eintrag gibt. */
export function aspektName(deutsch) {
  const w = rt("aspekt." + deutsch);
  return w && w !== "aspekt." + deutsch ? w : deutsch;
}
