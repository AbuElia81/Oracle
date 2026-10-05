/* ------------------------------------------------------------------------
   essenz-texte.js — die Sätze der Essenz, je Sprache.

   Die Essenz besteht aus Sätzen, in die gerechnete Stücke eingesetzt
   werden. Übersetzen heißt darum nicht, Wörter zu tauschen, sondern den
   Satz neu zu bauen: Das Deutsche stellt das Verb ans Ende, das
   Italienische nicht; das Deutsche fügt zusammen, wo das Italienische
   auflöst. Jeder Satz ist deshalb eine eigene Funktion je Sprache, und
   keine Zeichenkette mit Platzhaltern.

   Sprachen ohne eigene Fassung fallen auf Deutsch zurück.
   ------------------------------------------------------------------------ */

export const T = {
  de: {
    "titel.anfang":      "Womit du anfängst",
    "titel.zwei":        "Zwei, die nicht voneinander loskommen",
    "titel.werDuBist":   "Wer du bist",
    "titel.herberge":    "Deine Herberge",
    "titel.gegeben":     "Was dir gegeben und was dir genommen ist",
    "titel.geist":       "Der gute Geist",
    "titel.kapitel":     "Das Kapitel, in dem du gerade liest",
    "titel.strecken":    "Laute und leise Strecken",
    "titel.jahre":       "Wer deine Jahre führt",
    "titel.jahreFuehrt": "Wer deine Jahre führt",
    "titel.austeilt":    "Wer gerade austeilt",
    "titel.klopft":      "Was als Nächstes an die Tür klopft",
    "titel.verborgen":   "Was im Verborgenen mitläuft",
    "titel.geber":       "Der Geber des Lebens",
    "titel.rat":         "Der Rat",
    "titel.zusammen":    "Was das zusammen ergibt",
    "titel.fehlt":       "Was hier noch fehlt",
    "titel.jahr":        jahr => `Dieses Jahr — ${jahr}`,

    "auftakt.zeile":     name => name ? `Was über ${name} zu sagen ist` : "Was zu sagen ist",
    "daten.uhr":"Uhr", "daten.alter": (n) => ` · heute ${n} Jahre alt`,
    "kopf.zeichen":"Dein Zeichen im Yıldıznâme",
    "kopf.element": (element, tabiat) =>
      `ein Zeichen ${element === "Feuer" ? "des Feuers" : element === "Erde" ? "der Erde"
        : element === "Luft" ? "der Luft" : "des Wassers"} — ${tabiat}`,
    "auftakt.text":      "Vier Überlieferungen, die einander nie gelesen haben, sind hier " +
      "übereinandergelegt worden — eine aus Griechenland, eine aus Persien, eine aus Indien, " +
      "eine aus dem osmanischen Buch der Sterne. Was folgt, ist nicht ihre Summe, sondern " +
      "das, worin sie sich berühren.",

    "anfang": (bild, hell, fh, ort, stand) =>
      `In der Stunde deiner Geburt stieg über den Rand der Welt ${bild}. ` +
      `Es war ${hell ? "hell" : "dunkel"} — die Sonne stand ${hell ? "über" : "unter"} dem ` +
      `Horizont, und das entscheidet, wer in deinem Leben leise auftritt und wer laut. ` +
      (fh ? `Wer die Führung hat, ist ${fh.figur} — ${fh.pron} ${fh.tut}. ` +
            `${gross(fh.pron)} hält sich auf ${ort}. ${stand} ` +
            `Dorthin zieht dein Leben, noch ehe irgendeine Zählung etwas dazu sagt.` : ""),

    "zwei": (a, b, naehe) =>
      `${gross(a.figur)} und ${b.figur} ${naehe}. ` +
      `Der eine ${a.tut}, der andere ${b.tut}. Das ist der Zug, der sich durch alles zieht, ` +
      `was dir begegnet — du wirst ihn in jeder Geschichte deines Lebens wiederfinden.`,

    "gegeben": (f) =>
      `Über deinem Zeichen steht ${f.figur}: ${f.fabel}. ` +
      `Er gibt dir ${f.gabe}. Und er nimmt dafür ${f.preis}. ` +
      `Das ist kein Handel, den man ausschlagen könnte — es ist dieselbe Eigenschaft, ` +
      `von zwei Seiten gesehen.`,

    "klopft": (jahre, alter, f, ort) =>
      `Die älteste aller Zählungen rechnet mit der Drehung der Erde selbst: ein Grad für ` +
      `ein Lebensjahr. Nach ihr klopft in gut ${jahre} Jahren, mit ${alter} Jahren, ` +
      `${f} an ${ort}. Das sagt nicht, was geschieht — nur, wann ein Thema fällig wird. ` +
      `Ob geöffnet wird und wer davorsteht, steht auf einem anderen Blatt.`,

    "austeilt": (von, bis, fv, ft, naechsterAlter, naechsterFigur) =>
      `Es gibt eine noch ältere Zählung, und sie ist die einzige, die danach fragt, wo du ` +
      `geboren bist. Der Punkt, der in deiner Geburtsstunde über den Rand der Welt kam, ` +
      `wandert mit der Drehung des Himmels weiter, und jedes Stück Weg dauert genau so lange, ` +
      `wie der Himmel über deinem Geburtsort dafür braucht. Darum sind diese Abschnitte ` +
      `ungleich lang — an einem anderen Ort geboren, hättest du andere. ` +
      `Von deinem ${von}. bis zu deinem ${bis}. Jahr teilt ${fv.figur} aus: ${fv.pron} ${fv.tut}. ` +
      (ft ? `Und ${ft.figur} teilt sich die Zeit mit ${fv.dat} — von dort kommen die Menschen ` +
            `und das, was tatsächlich geschieht, während der erste nur das Thema vorgibt.`
          : `Teilhaber hat ${fv.pron} keinen: Was in diesen Jahren geschieht, geschieht ohne ` +
            `zweite Hand.`) +
      (naechsterAlter != null
        ? ` Mit ${naechsterAlter} wechselt das Austeilen an ${naechsterFigur}.` : ""),

    "geist": (name) =>
      `Dieser Name kommt nicht aus deinem Namen, sondern aus dem Himmel selbst: aus der Stelle, ` +
      `die in deiner Geburtsstunde über den Rand der Welt stieg, aus dem Stand von Sonne und Mond, ` +
      `aus der Stelle, an der dir das Glück zufällt, und aus dem letzten Mal, als Sonne und Mond ` +
      `vor deiner Geburt zusammentraten. Fünf Orte, ein Name. Die Alten setzten ihn an die Stelle, ` +
      `wo bei den Griechen der gute Dämon wohnt — Sokrates' Stimme, die ihn nie zu etwas trieb, ` +
      `sondern ihn nur zurückhielt, wenn er im Begriff war, sich selbst zu schaden. Kein Fremder, ` +
      `der über dich wacht: der Name dessen, was in dir für dich ist.`,

    "strecken": (laut, naechste, riss) =>
      (laut
        ? `Du stehst gerade auf einer lauten Strecke — einer von denen, auf denen sich entscheidet, ` +
          `wie man dich sieht und wofür man dich hält. `
        : `Du stehst gerade auf einer leisen Strecke. Das ist keine schlechte Nachricht: Auf den ` +
          `leisen Strecken wird vorbereitet, was auf den lauten dann als plötzlicher Erfolg aussieht. `) +
      (naechste ? `Die nächste laute beginnt mit ${naechste} Jahren. ` : "") +
      (riss ? `Und mit etwa ${riss} Jahren reißt ein Faden: Was bis dahin trug, hört auf zu tragen, ` +
              `und das Leben setzt an ganz anderer Stelle neu an. Die alten Bücher halten solche ` +
              `Stellen für die wichtigsten einer Biographie.` : ""),

    "verborgen.ja": (namen) =>
      `Es gibt in deinem Himmel ${namen.length === 1 ? "ein Paar" : "mehrere Paare"}, die ` +
      `einander nicht ansehen und doch denselben Schatten werfen: Spiegelt man die eine Seite ` +
      `des Jahres auf die andere — Sommer auf Winter, längster Tag auf kürzesten —, dann stehen ` +
      `sie genau übereinander. Gleich hoch am Himmel, gleich lang am Tag, und trotzdem fällt kein ` +
      `Blick von einem zum anderen: ${namen.join("; ")}. ` +
      `So wie Kastor und Polydeukes, von denen immer nur einer oben war, während der andere ` +
      `unten blieb, und die doch nie etwas getrennt voneinander taten: Diese Paare arbeiten ` +
      `zusammen, ohne dass man es von außen bemerkt. Es sind die Stellen, an denen bei dir etwas ` +
      `geschieht, das sich hinterher nicht erklären lässt.`,
    "verborgen.nein":
      "Spiegelt man die eine Hälfte des Jahres auf die andere, fällt bei dir nichts zusammen. " +
      "Es läuft bei dir nichts im Verborgenen mit: Was wirkt, zeigt sich auch.",

    "fehlt.zahl": (n) => {
      const Z = { 1:"Ein Abschnitt steht", 2:"Zwei Abschnitte stehen",
                  3:"Drei Abschnitte stehen", 4:"Vier Abschnitte stehen" };
      return `${Z[n] || n + " Abschnitte stehen"} bereit und ${n === 1 ? "braucht" : "brauchen"} ` +
             `nur noch etwas von dir:`;
    },

    "kapitel": (von, bis, bild1, herr, l2von, l2bis, bild2, bild3) =>
      `Dein Leben zerfällt nicht in Jahre, sondern in Kapitel, und eines davon läuft seit deinem ` +
      `${von}. Lebensjahr und noch bis zum ${bis}. Sein Bild ist ${bild1}, und es steht unter ${herr}. ` +
      (bild2 ? `Darin liegt ein kleineres Kapitel, die Jahre ${l2von} bis ${l2bis}: ${bild2}. ` : "") +
      (bild3 ? `Und über diesen Monaten liegt noch einmal ein eigenes Licht: ${bild3}. ` : "") +
      `Das Kapitel sagt, worum es überhaupt geht; das Unterkapitel, in welcher Tonart; die Monate, ` +
      `woran du es gerade merkst.`,

    "werDuBist": (tabiat, geschlecht, element, elementText) =>
      `${tabiat} ${geschlecht} Dein Element ist ${element}: ${elementText}`,
    "element.feuer":"das Feuer", "element.erde":"die Erde",
    "element.luft":"die Luft", "element.wasser":"das Wasser",
    "herberge": (nr, name, urteil, gut, meide) =>
      `Der Mond zieht in gut siebenundzwanzig Tagen durch achtundzwanzig Herbergen, und deine ` +
      `Namenssumme fällt auf die ${nr}., ${name}: ${urteil} ` +
      `Günstig für ${gut}; meide ${meide}.`,

    "jahre.persisch": (herr, unter) =>
      `Eine persische Zählung gibt diese Jahre ${herr}` +
      (unter ? `, und darin führt gerade ${unter}` : ""),
    "jahre.indisch": (herr, unter) =>
      `Eine indische, die vom Stand des Mondes bei deiner Geburt ausgeht, nennt ${herr}` +
      (unter ? ` und darin ${unter}` : ""),
    "jahre.schluss":". Beide zählen keine Sternbilder ab, sondern verteilen feste Mengen von " +
      "Jahren — und landen trotzdem bei denselben Zeiten wie die übrigen.",

    "jahr.zeiger": (ort, fh) =>
      `Jedes Jahr rückt ein Zeiger um ein Feld weiter, und in diesem Jahr steht er ${ort}. ` +
      `Darum geht es, von Geburtstag zu Geburtstag. Die Hand, die das Jahr führt, ist ` +
      `${fh.figur} — ${fh.pron} ${fh.tut}.`,
    "jahr.sonne": (tag, monat, jahr, ort, stuetzen) =>
      `Am ${tag}. ${monat} ${jahr} stand die Sonne wieder genau dort, wo sie bei deiner Geburt ` +
      `stand — das ist der Jahreswechsel, den diese Bücher zählen, nicht der erste Januar. Der ` +
      `Schwerpunkt des Jahres fällt dabei ${ort}. ` +
      (stuetzen >= 2 ? `Die Zeichen stützen einander: ein <b>lautes Jahr</b>, in dem man merkt, was geschieht.`
       : stuetzen === 1 ? `Eine einzige Stütze: Das Jahr spricht, aber halblaut.`
       : `Nichts stützt einander: ein <b>stilles Jahr</b>. Es geschieht etwas, aber unter der ` +
         `Oberfläche, und man erkennt es erst später.`),
    "jahr.transit": (ft, woran) =>
      `Von den langsamen Wanderern steht dir gerade ${ft.figur} am nächsten: ${ft.pron} ${ft.tut} ` +
      `— und rührt dabei an ${woran}.`,
    "jahr.achse":"eine deiner Achsen",
    "jahr.traegt": (was) => `das, was bei dir ${was} trägt`,
    "jahr.progression": (sonne, mond, phase) =>
      `Dein inneres Wetter — eine Zählung, die jeden Tag nach deiner Geburt für ein ganzes ` +
      `Lebensjahr nimmt — steht bei ${sonne}, und das Licht, das darin zu- und abnimmt, bei ` +
      `${mond}. ${phase}.`,
    "jahr.mond": (nr, name, urteil, zu, gut, meide, verbrannt) =>
      `Und für heute: Der Mond ist in seiner ${nr}. Herberge, ${name} — ${urteil} — und ` +
      `${zu ? "nimmt zu" : "nimmt ab"}. Günstig für ${gut}; meide ${meide}.` +
      (verbrannt ? " Er steht dabei auf der verbrannten Strecke — heute nichts anfangen, was halten soll." : ""),
    "monate":["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],

    "geber": (flamme, huetet, pron, ort) =>
      `Die Alten fragten: Wo in diesem Himmel brennt die Flamme, von der ein Leben seine Wärme ` +
      `nimmt? Bei dir brennt sie bei ${flamme}. Und wer hütet diese Flamme? ${huetet} — und ` +
      `${pron} hütet sie ${ort}. Von dort nimmt deine Kraft ihre Färbung; wie bei Meleagros, ` +
      `dessen Leben an einem Holzscheit hing, den seine Mutter aus dem Feuer zog und verwahrte: ` +
      `Es gibt eine Stelle, an der ein Leben besonders nah an sich selbst liegt. Wie viele Jahre ` +
      `daraus gezählt werden, steht im eigenen Kapitel und bleibt dort — darüber sind sich die ` +
      `Überlieferungen selbst nicht einig, und eine Zahl wäre hier eine falsche Sicherheit.`,

    "zus.bleibend": (name, element, herr, bild, figur, pron, steht, ort) =>
      (name ? `Im Namen liegt ${name} — ein Zeichen ${element}, unter ${herr}. ` : "") +
      (bild ? `In der Stunde deiner Geburt kam ${bild} über den Rand der Welt herauf, und die ` +
              `Hand, die das führt, ist ${figur}: ${pron} steht bei ${steht}, und hält sich auf ` +
              `${ort}. ` : "") +
      `Das ist der Teil, der sich nicht ändert. Er läuft unter allem mit — die Zählungen weiter ` +
      `unten sagen nur, welches Wetter gerade darüber hinwegzieht.`,
    "zus.element.feuer":"des Feuers", "zus.element.erde":"der Erde",
    "zus.element.luft":"der Luft", "zus.element.wasser":"des Wassers",

    "offen.niyet":["Niyet — die Frage","eine Frage in einem Satz; die Antwort hängt auch an der Stunde, in der du fragst"],
    "offen.uyum":["İsim uyumu","den Namen eines zweiten Menschen und den seiner Mutter"],
    "offen.raml":["ʿIlm al-Raml","eine Frage — der Sand antwortet auf den Augenblick, nicht auf das Leben"],
    "offen.zeit":["Der rechte Zeitpunkt","ein Vorhaben, das du beginnen willst; dann prüft er den Mondstand darauf"],

    "zus.einig": (anzahl, davon, akk, quellen, fo) =>
      `Und nun das Merkwürdige. Hier sprechen ${anzahl} alte Zählungen mit, die einander nie ` +
      `gelesen haben — aus Persien, aus Griechenland, aus Indien —, und ${davon} von ihnen ` +
      `zeigen auf <b>dieselbe Hand</b>, nämlich auf ${akk} — ${quellen}. ` +
      `Es ist wie mit den Blinden in der Fabel, die denselben Elefanten betasten: Jeder greift ` +
      `etwas anderes, und am Ende reden doch alle von einem Tier. Wenn Fremde aus verschiedenen ` +
      `Ländern unabhängig voneinander dasselbe sagen, lohnt es sich hinzuhören. ` +
      `${fo.pron.charAt(0).toUpperCase() + fo.pron.slice(1)} ${fo.tut}. Dafür gibt ${fo.pron} ` +
      `dir ${fo.gabe} — und nimmt sich ${fo.preis}.`,
    "zus.uneinig": (liste) =>
      `Diesmal sagen die Zählungen nicht dasselbe. Jede nennt eine andere Hand: ${liste}. ` +
      `Keine hat das Übergewicht — eine Strecke wie ein Weg mit mehreren Spuren, auf dem sich ` +
      `noch nicht entschieden hat, welche die Hauptspur wird. Das ist kein Mangel: Es heißt, ` +
      `dass gerade mehr als eine Sache gleichzeitig wächst.`,
    "zus.nennt": (quelle, akk) => `${quelle.charAt(0).toUpperCase() + quelle.slice(1)} nennt ${akk}`,
    "zus.hand": (zeichen, ort, stand) =>
      `Und diese Hand ist bei dir keine fremde. Sie stand schon in der Stunde deiner Geburt da, ` +
      `und zwar bei ${zeichen} — und ihr Ort ist ${ort}. Dort, und nirgends sonst, wird sich in ` +
      `diesen Jahren entscheiden, was sie bringen. ${stand}`,
    "zahlwort":{1:"eine",2:"zwei",3:"drei",4:"vier"},
    "quelle.zr":"die Tafel der Kapitel",
    "quelle.prof":"der Zeiger, der jedes Jahr ein Feld weiterrückt",
    "quelle.fd":"eine persische Zählung",
    "quelle.vd":"eine indische Zählung",
    "und":"und",

    "rat.schild":        "Der Rat",
    "schluss":
      "Keine dieser Künste sagt die Zukunft voraus, und keine wird hier so gebraucht. " +
      "Sie geben Themen, Fälligkeiten und Tonarten — sie sagen, <em>worum es geht</em> und " +
      "<em>wann es dran ist</em>, nicht, was daraus wird. Das steht in keiner Tafel."
  },

  it: {
    "titel.anfang":      "Da che cosa cominci",
    "titel.zwei":        "Due che non si lasciano",
    "titel.werDuBist":   "Chi sei",
    "titel.herberge":    "La tua stazione",
    "titel.gegeben":     "Ciò che ti è dato e ciò che ti è tolto",
    "titel.geist":       "Il buon genio",
    "titel.kapitel":     "Il capitolo che stai leggendo adesso",
    "titel.strecken":    "Tratti rumorosi e tratti quieti",
    "titel.jahre":       "Chi guida i tuoi anni",
    "titel.austeilt":    "Chi distribuisce in questo momento",
    "titel.klopft":      "Che cosa busserà alla porta",
    "titel.verborgen":   "Ciò che corre nel nascosto",
    "titel.geber":       "Il datore della vita",
    "titel.rat":         "Il consiglio",
    "titel.zusammen":    "Che cosa dà tutto questo insieme",
    "titel.fehlt":       "Che cosa manca ancora qui",
    "titel.jahr":        jahr => `Quest'anno — ${jahr}`,

    "auftakt.zeile":     name => name ? `Ciò che si può dire di ${name}` : "Ciò che si può dire",
    "daten.uhr":"", "daten.alter": (n) => ` · oggi ${n} anni`,
    "kopf.zeichen":"Il tuo segno nello Yıldıznâme",
    "kopf.element": (element, tabiat) =>
      `un segno ${element === "Feuer" ? "del fuoco" : element === "Erde" ? "della terra"
        : element === "Luft" ? "dell'aria" : "dell'acqua"} — ${tabiat}`,
    "auftakt.text":      "Quattro tradizioni che non si sono mai lette a vicenda sono state " +
      "qui sovrapposte — una dalla Grecia, una dalla Persia, una dall'India, una dal libro " +
      "ottomano delle stelle. Ciò che segue non è la loro somma, ma il punto in cui si toccano.",

    "anfang": (bild, hell, fh, ort, stand) =>
      `Nell'ora della tua nascita salì oltre il bordo del mondo ${bild}. ` +
      `Era ${hell ? "giorno" : "notte"} — il sole stava ${hell ? "sopra" : "sotto"} ` +
      `l'orizzonte, e questo decide chi nella tua vita entra in scena piano e chi forte. ` +
      (fh ? `A guidare è ${fh.figur} — ${fh.pron} ${fh.tut}. ` +
            `${gross(fh.pron)} si trattiene ${ort}. ${stand} ` +
            `È là che tira la tua vita, prima ancora che un qualsiasi calcolo dica la sua.` : ""),

    "zwei": (a, b, naehe) =>
      `${gross(a.figur)} e ${b.figur} ${naehe}. ` +
      `Il primo ${a.tut}, il secondo ${b.tut}. È il tratto che attraversa tutto ciò che ti ` +
      `accade — lo ritroverai in ogni storia della tua vita.`,

    "gegeben": (f) =>
      `Sopra il tuo segno sta ${f.figur}: ${f.fabel}. ` +
      `Ti dà ${f.gabe}. E in cambio si prende ${f.preis}. ` +
      `Non è un patto che si possa rifiutare — è la stessa qualità, vista da due lati.`,

    "klopft": (jahre, alter, f, ort) =>
      `Il più antico di tutti i calcoli lavora con la rotazione stessa della terra: un grado ` +
      `per un anno di vita. Secondo esso, fra circa ${jahre} anni, ai tuoi ${alter}, ` +
      `${f} busserà ${ort}. Questo non dice che cosa accadrà — solo quando un tema viene a ` +
      `scadenza. Se si apra, e chi stia davanti alla porta, è un altro foglio.`,

    "austeilt": (von, bis, fv, ft, naechsterAlter, naechsterFigur) =>
      `C'è un calcolo ancora più antico, ed è il solo che chieda dove sei nato. Il punto che ` +
      `nell'ora della tua nascita salì oltre il bordo del mondo continua a camminare con la ` +
      `rotazione del cielo, e ogni tratto di strada dura esattamente quanto il cielo sopra il ` +
      `tuo luogo di nascita impiega a percorrerlo. Per questo questi periodi sono di lunghezza ` +
      `diversa — nato altrove, ne avresti avuti altri. ` +
      `Dal tuo ${von}° al tuo ${bis}° anno distribuisce ${fv.figur}: ${fv.pron} ${fv.tut}. ` +
      (ft ? `E ${ft.figur} divide il tempo con lui — di là vengono le persone e ciò che ` +
            `accade davvero, mentre il primo si limita a dare il tema.`
          : `Compagno non ne ha: ciò che accade in questi anni accade senza una seconda mano.`) +
      (naechsterAlter != null
        ? ` A ${naechsterAlter} il distribuire passa a ${naechsterFigur}.` : ""),

    "geist": (name) =>
      `Questo nome non viene dal tuo nome, ma dal cielo stesso: dal punto che nell'ora della tua ` +
      `nascita salì oltre il bordo del mondo, dalla posizione del sole e della luna, dal punto in ` +
      `cui la fortuna ti tocca, e dall'ultima volta in cui sole e luna si incontrarono prima che ` +
      `tu nascessi. Cinque luoghi, un nome. Gli antichi lo collocavano là dove presso i greci ` +
      `abita il buon demone — la voce di Socrate, che non lo spinse mai a nulla, ma lo tratteneva ` +
      `soltanto quando stava per nuocere a se stesso. Non un estraneo che veglia su di te: il ` +
      `nome di ciò che in te sta dalla tua parte.`,

    "strecken": (laut, naechste, riss) =>
      (laut
        ? `Sei in questo momento su un tratto rumoroso — uno di quelli in cui si decide come ti ` +
          `si vede e per che cosa ti si prende. `
        : `Sei in questo momento su un tratto quieto. Non è una cattiva notizia: nei tratti quieti ` +
          `si prepara ciò che nei rumorosi appare poi come un successo improvviso. `) +
      (naechste ? `Il prossimo tratto rumoroso comincia a ${naechste} anni. ` : "") +
      (riss ? `E verso i ${riss} anni si spezza un filo: ciò che fino allora reggeva smette di ` +
              `reggere, e la vita riparte da tutt'altra parte. I libri antichi considerano questi ` +
              `punti i più importanti di una biografia.` : ""),

    "verborgen.ja": (namen) =>
      `Nel tuo cielo ${namen.length === 1 ? "c'è una coppia" : "ci sono più coppie"} che non si ` +
      `guardano e tuttavia gettano la stessa ombra: se si specchia una metà dell'anno sull'altra ` +
      `— l'estate sull'inverno, il giorno più lungo sul più corto —, essi vengono a stare ` +
      `esattamente l'uno sopra l'altro. Stessa altezza in cielo, stessa durata del giorno, e ` +
      `nondimeno nessuno sguardo passa dall'uno all'altro: ${namen.join("; ")}. ` +
      `Come Castore e Polideuce, di cui uno stava sempre sopra mentre l'altro restava sotto, e ` +
      `che pure non facevano mai nulla separatamente: queste coppie lavorano insieme senza che ` +
      `da fuori lo si noti. Sono i punti in cui ti accade qualcosa che poi non si lascia spiegare.`,
    "verborgen.nein":
      "Specchiando una metà dell'anno sull'altra, da te non cade nulla a coincidere. " +
      "Nulla corre in te nel nascosto: ciò che agisce, si mostra anche.",

    "fehlt.zahl": (n) => {
      const Z = { 1:"Una sezione è pronta", 2:"Due sezioni sono pronte",
                  3:"Tre sezioni sono pronte", 4:"Quattro sezioni sono pronte" };
      return `${Z[n] || n + " sezioni sono pronte"} e ${n === 1 ? "aspetta" : "aspettano"} ` +
             `soltanto qualcosa da te:`;
    },

    "kapitel": (von, bis, bild1, herr, l2von, l2bis, bild2, bild3) =>
      `La tua vita non si divide in anni, ma in capitoli, e uno di essi corre dal tuo ${von}° ` +
      `anno di vita fino al ${bis}°. La sua immagine è ${bild1}, e sta sotto ${herr}. ` +
      (bild2 ? `Dentro vi è un capitolo minore, gli anni da ${l2von} a ${l2bis}: ${bild2}. ` : "") +
      (bild3 ? `E su questi mesi cade ancora una luce propria: ${bild3}. ` : "") +
      `Il capitolo dice di che cosa si tratti in generale; il sottocapitolo, in quale tonalità; ` +
      `i mesi, a che cosa lo stai notando proprio adesso.`,

    "werDuBist": (tabiat, geschlecht, element, elementText) =>
      `${tabiat} ${geschlecht} Il tuo elemento è ${element}: ${elementText}`,
    "element.feuer":"il fuoco", "element.erde":"la terra",
    "element.luft":"l'aria", "element.wasser":"l'acqua",
    "herberge": (nr, name, urteil, gut, meide) =>
      `La luna attraversa in poco più di ventisette giorni ventotto stazioni, e la somma del tuo ` +
      `nome cade sulla ${nr}ª, ${name}: ${urteil} ` +
      `Favorevole a ${gut}; evita ${meide}.`,

    "jahre.persisch": (herr, unter) =>
      `Un calcolo persiano affida questi anni ${herr}` +
      (unter ? `, e dentro di essi conduce in questo momento ${unter}` : ""),
    "jahre.indisch": (herr, unter) =>
      `Uno indiano, che parte dalla posizione della luna alla tua nascita, nomina ${herr}` +
      (unter ? ` e dentro ${unter}` : ""),
    "jahre.schluss":". Nessuno dei due conta costellazioni: distribuiscono quantità fisse di " +
      "anni — e finiscono ugualmente sugli stessi tempi degli altri.",

    "jahr.zeiger": (ort, fh) =>
      `Ogni anno una lancetta avanza di un campo, e quest'anno sta ${ort}. Di questo si tratta, ` +
      `di compleanno in compleanno. La mano che guida l'anno è ${fh.figur} — ${fh.pron} ${fh.tut}.`,
    "jahr.sonne": (tag, monat, jahr, ort, stuetzen) =>
      `Il ${tag} ${monat} ${jahr} il sole è tornato esattamente dove stava alla tua nascita — ` +
      `è il capodanno che questi libri contano, non il primo di gennaio. Il baricentro dell'anno ` +
      `cade ${ort}. ` +
      (stuetzen >= 2 ? `I segni si sostengono a vicenda: un <b>anno rumoroso</b>, in cui ci si accorge di ciò che accade.`
       : stuetzen === 1 ? `Un solo sostegno: l'anno parla, ma a mezza voce.`
       : `Nulla si sostiene: un <b>anno silenzioso</b>. Qualcosa accade, ma sotto la superficie, ` +
         `e lo si riconosce solo dopo.`),
    "jahr.transit": (ft, woran) =>
      `Dei camminatori lenti ti sta ora più vicino ${ft.figur}: ${ft.pron} ${ft.tut} — e tocca ` +
      `con ciò ${woran}.`,
    "jahr.achse":"uno dei tuoi assi",
    "jahr.traegt": (was) => `ciò che in te regge ${was}`,
    "jahr.progression": (sonne, mond, phase) =>
      `Il tuo tempo interiore — un calcolo che prende ogni giorno dopo la tua nascita per un ` +
      `intero anno di vita — sta presso ${sonne}, e la luce che vi cresce e cala, presso ` +
      `${mond}. ${phase}.`,
    "jahr.mond": (nr, name, urteil, zu, gut, meide, verbrannt) =>
      `E per oggi: la luna è nella sua ${nr}ª stazione, ${name} — ${urteil} — e ` +
      `${zu ? "cresce" : "cala"}. Favorevole a ${gut}; evita ${meide}.` +
      (verbrannt ? " Sta per giunta sulla via combusta — oggi non cominciare nulla che debba durare." : ""),
    "monate":["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"],

    "geber": (flamme, huetet, pron, ort) =>
      `Gli antichi domandavano: dove in questo cielo arde la fiamma da cui una vita prende il suo ` +
      `calore? In te arde presso ${flamme}. E chi custodisce questa fiamma? ${huetet} — e ` +
      `${pron} la custodisce ${ort}. Di là la tua forza prende il suo colore; come per Meleagro, ` +
      `la cui vita era appesa a un tizzone che sua madre trasse dal fuoco e serbò: c'è un punto ` +
      `in cui una vita sta particolarmente vicina a se stessa. Quanti anni se ne contino sta nel ` +
      `capitolo proprio e lì rimane — su questo le tradizioni stesse non concordano, e una cifra ` +
      `sarebbe qui una falsa sicurezza.`,

    "zus.bleibend": (name, element, herr, bild, figur, pron, steht, ort) =>
      (name ? `Nel nome sta ${name} — un segno ${element}, sotto ${herr}. ` : "") +
      (bild ? `Nell'ora della tua nascita ${bild} venne su oltre il bordo del mondo, e la mano ` +
              `che conduce è ${figur}: ${pron} sta presso ${steht}, e si trattiene ${ort}. ` : "") +
      `È la parte che non cambia. Corre sotto tutto il resto — i calcoli più in basso dicono ` +
      `soltanto quale tempo passa sopra di essa in questo momento.`,
    "zus.element.feuer":"del fuoco", "zus.element.erde":"della terra",
    "zus.element.luft":"dell'aria", "zus.element.wasser":"dell'acqua",

    "offen.niyet":["Niyet — la domanda","una domanda in una sola frase; la risposta dipende anche dall'ora in cui chiedi"],
    "offen.uyum":["İsim uyumu","il nome di una seconda persona e quello di sua madre"],
    "offen.raml":["ʿIlm al-Raml","una domanda — la sabbia risponde all'istante, non alla vita"],
    "offen.zeit":["Il momento giusto","un proposito che vuoi cominciare; allora esamina su di esso la posizione della luna"],

    "zus.einig": (anzahl, davon, akk, quellen, fo) =>
      `E ora il fatto curioso. Qui parlano ${anzahl} calcoli antichi che non si sono mai letti a ` +
      `vicenda — dalla Persia, dalla Grecia, dall'India —, e ${davon} di essi indicano ` +
      `<b>la stessa mano</b>, cioè ${akk} — ${quellen}. ` +
      `È come con i ciechi della favola che tastano lo stesso elefante: ciascuno afferra qualcosa ` +
      `di diverso, e alla fine parlano tutti di un solo animale. Quando stranieri di paesi ` +
      `diversi dicono indipendentemente la stessa cosa, conviene ascoltare. ` +
      `${fo.pron.charAt(0).toUpperCase() + fo.pron.slice(1)} ${fo.tut}. In cambio ${fo.pron} ti ` +
      `dà ${fo.gabe} — e si prende ${fo.preis}.`,
    "zus.uneinig": (liste) =>
      `Questa volta i calcoli non dicono la stessa cosa. Ciascuno nomina una mano diversa: ` +
      `${liste}. Nessuna ha il sopravvento — un tratto come una strada a più corsie, su cui non ` +
      `si è ancora deciso quale sarà la principale. Non è un difetto: vuol dire che in questo ` +
      `momento cresce più di una cosa per volta.`,
    "zus.nennt": (quelle, akk) => `${quelle.charAt(0).toUpperCase() + quelle.slice(1)} nomina ${akk}`,
    "zus.hand": (zeichen, ort, stand) =>
      `E questa mano per te non è una straniera. Stava già là nell'ora della tua nascita, e ` +
      `precisamente presso ${zeichen} — e il suo luogo è ${ort}. Lì, e in nessun altro posto, si ` +
      `deciderà in questi anni che cosa portino. ${stand}`,
    "zahlwort":{1:"uno",2:"due",3:"tre",4:"quattro"},
    "quelle.zr":"la tavola dei capitoli",
    "quelle.prof":"la lancetta che ogni anno avanza di un campo",
    "quelle.fd":"un calcolo persiano",
    "quelle.vd":"un calcolo indiano",
    "und":"e",

    "titel.jahreFuehrt": "Chi guida i tuoi anni",
    "rat.schild":        "Il consiglio",
    "schluss":
      "Nessuna di queste arti predice il futuro, e nessuna è usata qui a quel modo. " +
      "Danno temi, scadenze e tonalità — dicono <em>di che cosa si tratta</em> e " +
      "<em>quando è il momento</em>, non che cosa ne verrà. Questo non sta in nessuna tavola."
  }
};

function gross(w) { return String(w || "").charAt(0).toUpperCase() + String(w || "").slice(1); }

let aktiv = "de";
export function setzeEssenzSprache(code) { aktiv = T[code] ? code : "de"; }
export function e(schluessel, ...args) {
  const tafel = T[aktiv] || T.de;
  const w = tafel[schluessel] !== undefined ? tafel[schluessel] : T.de[schluessel];
  return typeof w === "function" ? w(...args) : w;
}
