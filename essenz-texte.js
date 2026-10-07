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
    "kapitel.eigenesBild":"ein eigenes Bild",
    "achse.asc":"der Aszendent", "achse.mc":"das Medium Coeli",
    "ordnung": n => `${n}.`,

    "auftakt.zeile":     name => name ? `Was über ${name} zu sagen ist` : "Was zu sagen ist",
    "daten.uhr":"Uhr", "daten.alter": (n) => ` · heute ${n} Jahre alt`,

    /* Ohne bekannte Geburtsstunde. */
    "ohneStunde.zeile":"Geburtszeit unbekannt — gerechnet mit 12 Uhr mittags.",
    "ohneStunde.auf":"Was das heißt",
    "ohneStunde.wackelt":"<b>Unsicher ist:</b> der Aszendent und damit alle zwölf Felder — " +
      "er wandert in vierundzwanzig Stunden einmal durch den ganzen Kreis, also kann er " +
      "jedes Zeichen sein. Mit ihm wackelt, was an den Feldern hängt: in welchem Feld ein " +
      "Planet steht, die Profektionen, die Direktionen, das Lebensmaß. Auch der Grad des " +
      "Mondes ist nur auf etwa sechs Grad genau, denn er läuft dreizehn Grad am Tag.",
    "ohneStunde.steht":"<b>Sicher ist:</b> in welchem Zeichen jeder Planet steht — die " +
      "langsamen ohnehin, die Sonne fast immer, der Mond meistens. Die Winkel der Planeten " +
      "untereinander. Deine Sekte, dein Temperament, die Herren der Dreiheiten, der " +
      "Berufssignifikator. Alles, was aus dem Namen kommt, ist von der Stunde gar nicht " +
      "berührt. Wenn du die Stunde später erfährst, trag sie nach — die Lesung rechnet " +
      "sich von selbst neu.",
    "kopf.zeichen":"Dein Zeichen im Yıldıznâme",
    /* key statt Anzeigename: der wechselt mit der Sprache. */
    "kopf.element": (key, tabiat) =>
      `ein Zeichen ${ {feuer:"des Feuers", erde:"der Erde", luft:"der Luft",
                       wasser:"des Wassers"}[key] || "des Wassers"} — ${tabiat}`,
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

    "klopft.achse.mc":() => "die Achse deines Amtes",
    "klopft.achse.asc":(rein) => rein === "ASC" ? "die Achse deiner Person" : rein,
    "klopft.wo": (achse, roh) => ({ mc:"an deinem Ruf", ic:"an deinem Haus und deiner Herkunft",
      asc:"an dir selbst", desc:"an deiner Ehe und deinen Verträgen" }[achse] || `an ${roh}`),
    "klopft": (jahre, monate, alter, f, ort) =>
      `Die älteste aller Zählungen rechnet mit der Drehung der Erde selbst: ein Grad für ` +
      `ein Lebensjahr. Nach ihr klopft ` +
      (monate ? `in ${monate} Monaten` : `in gut ${jahre.toFixed(0)} Jahren`) +
      `, mit ${alter.toFixed(1).replace(".", ",")} Jahren, ` +
      `${f} ${ort}. Das sagt nicht, was geschieht — nur, wann ein Thema fällig wird. ` +
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
    "kapitel.eigenesBild":"un'immagine propria",
    "achse.asc":"l'Ascendente", "achse.mc":"il Medio Cielo",
    "ordnung": n => `${n}\u00ba`,

    "auftakt.zeile":     name => name ? `Ciò che si può dire di ${name}` : "Ciò che si può dire",
    "daten.uhr":"", "daten.alter": (n) => ` · oggi ${n} anni`,

    /* Senza l'ora di nascita nota. */
    "ohneStunde.zeile":"Ora di nascita sconosciuta — calcolato con mezzogiorno.",
    "ohneStunde.auf":"Che cosa significa",
    "ohneStunde.wackelt":"<b>È incerto:</b> l'Ascendente e con esso tutti i dodici campi — " +
      "in ventiquattro ore percorre l'intero cerchio, dunque può essere qualsiasi segno. " +
      "Con lui vacilla ciò che dipende dai campi: in quale campo si trovi un pianeta, le " +
      "profezioni, le direzioni, la misura della vita. Anche il grado della luna è esatto " +
      "solo entro sei gradi circa, poiché essa percorre tredici gradi al giorno.",
    "ohneStunde.steht":"<b>È certo:</b> in quale segno si trovi ciascun pianeta — i lenti " +
      "in ogni caso, il sole quasi sempre, la luna il più delle volte. Gli angoli dei " +
      "pianeti fra loro. La tua setta, il tuo temperamento, i signori delle triplicità, il " +
      "significatore del mestiere. Tutto ciò che viene dal nome non è toccato affatto " +
      "dall'ora. Se un giorno verrai a saperla, aggiungila — la lettura si ricalcola da sé.",
    "kopf.zeichen":"Il tuo segno nello Yıldıznâme",
    "kopf.element": (key, tabiat) =>
      `un segno ${ {feuer:"del fuoco", erde:"della terra", luft:"dell'aria",
                    wasser:"dell'acqua"}[key] || "dell'acqua"} — ${tabiat}`,
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

    "klopft.achse.mc":() => "l'asse della tua carica",
    "klopft.achse.asc":(rein) => rein === "ASC" ? "l'asse della tua persona" : rein,
    "klopft.wo": (achse, roh) => ({ mc:"alla tua reputazione", ic:"alla tua casa e alla tua origine",
      asc:"a te stesso", desc:"al tuo matrimonio e ai tuoi contratti" }[achse] || `a ${roh}`),
    "klopft": (jahre, monate, alter, f, ort) =>
      `Il più antico di tutti i calcoli lavora con la rotazione stessa della terra: un grado ` +
      `per un anno di vita. Secondo esso, ` +
      (monate ? `fra ${monate} mesi` : `fra circa ${jahre.toFixed(0)} anni`) +
      `, ai tuoi ${alter.toFixed(1).replace(".", ",")}, ` +
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
  },

  en: {
    "titel.anfang":      "What you begin with",
    "titel.zwei":        "Two who cannot let go of each other",
    "titel.werDuBist":   "Who you are",
    "titel.herberge":    "Your lodging",
    "titel.gegeben":     "What is given you and what is taken",
    "titel.geist":       "The good spirit",
    "titel.kapitel":     "The chapter you are reading now",
    "titel.strecken":    "Loud stretches and quiet ones",
    "titel.jahre":       "Who leads your years",
    "titel.jahreFuehrt": "Who leads your years",
    "titel.austeilt":    "Who is dealing just now",
    "titel.klopft":      "What knocks next",
    "titel.verborgen":   "What runs along in hiding",
    "titel.geber":       "The giver of life",
    "titel.rat":         "The counsel",
    "titel.zusammen":    "What all this comes to",
    "titel.fehlt":       "What is still missing here",
    "titel.jahr":        jahr => `This year — ${jahr}`,
    "kapitel.eigenesBild":"an image of its own",
    "achse.asc":"the Ascendant", "achse.mc":"the Midheaven",
    /* 1st, 2nd, 3rd, 4th — und 11th bis 13th trotz der Endziffern. */
    "ordnung": n => {
      const z = Math.abs(Math.round(Number(n)));
      const zehner = z % 100, einer = z % 10;
      const endung = (zehner >= 11 && zehner <= 13) ? "th"
        : einer === 1 ? "st" : einer === 2 ? "nd" : einer === 3 ? "rd" : "th";
      return `${n}${endung}`;
    },

    "auftakt.zeile":     name => name ? `What there is to say about ${name}` : "What there is to say",
    "daten.uhr":"", "daten.alter": (n) => ` · ${n} years old today`,

    /* Without a known hour of birth. */
    "ohneStunde.zeile":"Hour of birth unknown — calculated with noon.",
    "ohneStunde.auf":"What that means",
    "ohneStunde.wackelt":"<b>Uncertain:</b> the Ascendant, and with it all twelve fields — " +
      "it travels the whole circle once in twenty-four hours, so it could be any sign. With " +
      "it goes everything that hangs on the fields: which field a planet stands in, the " +
      "profections, the directions, the measure of life. The moon's degree, too, is only " +
      "good to about six degrees, since it runs thirteen degrees a day.",
    "ohneStunde.steht":"<b>Certain:</b> which sign each planet stands in — the slow ones in " +
      "any case, the sun almost always, the moon most of the time. The angles of the planets " +
      "to one another. Your sect, your temperament, the lords of the triplicities, the " +
      "significator of work. Everything that comes from the name is untouched by the hour. " +
      "If you learn the hour later, enter it — the reading recalculates itself.",
    "kopf.zeichen":"Your sign in the Yıldıznâme",
    "kopf.element": (key, tabiat) =>
      `a sign of ${ {feuer:"fire", erde:"earth", luft:"air", wasser:"water"}[key] || "water"} — ${tabiat}`,
    "auftakt.text":      "Four traditions that never read one another have been laid over " +
      "each other here — one from Greece, one from Persia, one from India, one from the " +
      "Ottoman book of the stars. What follows is not their sum, but the place where they touch.",

    "anfang": (bild, hell, fh, ort, stand) =>
      `In the hour of your birth, ${bild} rose over the edge of the world. ` +
      `It was ${hell ? "day" : "night"} — the sun stood ${hell ? "above" : "below"} the ` +
      `horizon, and that decides who enters your life quietly and who loudly. ` +
      (fh ? `The one who leads is ${fh.figur} — ${fh.pron} ${fh.tut}. ` +
            `${gross(fh.pron)} keeps ${ort}. ${stand} ` +
            `That is where your life pulls, before any reckoning has said a word about it.` : ""),

    "zwei": (a, b, naehe) =>
      `${gross(a.figur)} and ${b.figur} ${naehe}. ` +
      `The one ${a.tut}, the other ${b.tut}. That is the streak running through everything ` +
      `you meet — you will find it again in every story of your life.`,

    "gegeben": (f) =>
      `Over your sign stands ${f.figur}: ${f.fabel}. ` +
      `${gross(f.pron)} gives you ${f.gabe}. And takes ${f.preis} for it. ` +
      `This is not a bargain one could decline — it is the same quality, seen from two sides.`,

    "klopft.achse.mc":() => "the axis of your office",
    "klopft.achse.asc":(rein) => rein === "ASC" ? "the axis of your person" : rein,
    "klopft.wo": (achse, roh) => ({ mc:"at your reputation", ic:"at your house and your origin",
      asc:"at you yourself", desc:"at your marriage and your contracts" }[achse] || `at ${roh}`),
    "klopft": (jahre, monate, alter, f, ort) =>
      `The oldest reckoning of all works with the turning of the earth itself: one degree for ` +
      `one year of life. By it, ` +
      (monate ? `in ${monate} months` : `in a good ${jahre.toFixed(0)} years`) +
      `, at ${alter.toFixed(1)}, ${f} will knock ${ort}. ` +
      `That does not say what happens — only when a theme falls due. Whether the door opens, ` +
      `and who is standing outside it, is another matter.`,

    "austeilt": (von, bis, fv, ft, naechsterAlter, naechsterFigur) =>
      `There is an older reckoning still, and it is the only one that asks where you were born. ` +
      `The point that came over the edge of the world in your hour of birth travels on with the ` +
      `turning of the sky, and each stretch of the way lasts exactly as long as the sky above ` +
      `your birthplace needs for it. That is why these stretches are of unequal length — born ` +
      `elsewhere, you would have had others. ` +
      `From your ${ord(von)} to your ${ord(bis)} year, ${fv.figur} deals: ${fv.pron} ${fv.tut}. ` +
      (ft ? `And ${ft.figur} shares the time with ${fv.dat} — from there come the people and ` +
            `what actually happens, while the first only sets the theme.`
          : `${gross(fv.pron)} has no partner: what happens in these years happens without a ` +
            `second hand.`) +
      (naechsterAlter != null
        ? ` At ${naechsterAlter} the dealing passes to ${naechsterFigur}.` : ""),

    "geist": (name) =>
      `This name does not come from your name but from the sky itself: from the place that rose ` +
      `over the edge of the world in your hour of birth, from where the sun and the moon stood, ` +
      `from the place where fortune falls to you, and from the last time sun and moon came ` +
      `together before you were born. Five places, one name. The old writers set it where the ` +
      `Greeks house the good daimon — Socrates' voice, which never drove him to anything but ` +
      `only held him back when he was about to harm himself. Not a stranger watching over you: ` +
      `the name of what in you is on your side.`,

    "strecken": (laut, naechste, riss) =>
      (laut
        ? `You are on a loud stretch just now — one of those on which it is decided how you are ` +
          `seen and what you are taken for. `
        : `You are on a quiet stretch just now. That is not bad news: on the quiet stretches, ` +
          `what later looks like sudden success on the loud ones is prepared. `) +
      (naechste ? `The next loud one begins at ${naechste}. ` : "") +
      (riss ? `And at about ${riss} a thread breaks: what carried until then stops carrying, and ` +
              `life starts again somewhere else entirely. The old books hold such places to be ` +
              `the most important in a life.` : ""),

    "verborgen.ja": (namen) =>
      `There ${namen.length === 1 ? "is a pair" : "are several pairs"} in your sky that do not ` +
      `look at each other and yet throw the same shadow: mirror one half of the year onto the ` +
      `other — summer onto winter, longest day onto shortest — and they come to stand exactly ` +
      `one above the other. The same height in the sky, the same length of day, and still no ` +
      `glance passes from one to the other: ${namen.join("; ")}. ` +
      `Like Castor and Polydeuces, of whom only ever one was above while the other stayed below, ` +
      `and who yet never did anything apart: these pairs work together without it being noticed ` +
      `from outside. They are the places where something happens to you that will not let itself ` +
      `be explained afterwards.`,
    "verborgen.nein":
      "Mirror one half of the year onto the other, and nothing in you falls together. " +
      "Nothing runs along in hiding with you: what works, also shows.",

    "fehlt.zahl": (n) => {
      const Z = { 1:"One section stands", 2:"Two sections stand",
                  3:"Three sections stand", 4:"Four sections stand" };
      return `${Z[n] || n + " sections stand"} ready and ${n === 1 ? "needs" : "need"} ` +
             `only something from you:`;
    },

    "kapitel": (von, bis, bild1, herr, l2von, l2bis, bild2, bild3) =>
      `Your life does not fall into years but into chapters, and one of them has run since your ` +
      `${ord(von)} year and runs on until your ${ord(bis)}. Its image is ${bild1}, and it stands under ` +
      `${herr}. ` +
      (bild2 ? `Within it lies a smaller chapter, the years ${l2von} to ${l2bis}: ${bild2}. ` : "") +
      (bild3 ? `And over these months lies a light of its own again: ${bild3}. ` : "") +
      `The chapter says what it is about at all; the sub-chapter, in which key; the months, what ` +
      `you are noticing it by right now.`,

    "werDuBist": (tabiat, geschlecht, element, elementText) =>
      `${tabiat} ${geschlecht} Your element is ${element}: ${elementText}`,
    "element.feuer":"fire", "element.erde":"earth",
    "element.luft":"air", "element.wasser":"water",
    "herberge": (nr, name, urteil, gut, meide) =>
      `The moon passes through twenty-eight lodgings in a good twenty-seven days, and the sum of ` +
      `your name falls on the ${ord(nr)}, ${name}: ${urteil} ` +
      `Favourable for ${gut}; avoid ${meide}.`,

    "jahre.persisch": (herr, unter) =>
      `A Persian reckoning gives these years to ${herr}` +
      (unter ? `, and within them ${unter} is leading just now` : ""),
    "jahre.indisch": (herr, unter) =>
      `An Indian one, which starts from where the moon stood at your birth, names ${herr}` +
      (unter ? ` and within that ${unter}` : ""),
    "jahre.schluss":". Neither counts off constellations; they hand out fixed quantities of " +
      "years — and still land on the same times as the rest.",

    "jahr.zeiger": (ort, fh) =>
      `Every year a pointer moves on by one field, and this year it stands ${ort}. That is what ` +
      `it is about, from birthday to birthday. The hand leading the year is ${fh.figur} — ` +
      `${fh.pron} ${fh.tut}.`,
    "jahr.sonne": (tag, monat, jahr, ort, stuetzen) =>
      `On ${monat} ${tag}, ${jahr}, the sun stood again exactly where it stood at your birth — ` +
      `that is the turn of the year these books count, not the first of January. The year's ` +
      `centre of gravity falls ${ort}. ` +
      (stuetzen >= 2 ? `The signs support one another: a <b>loud year</b>, in which one notices what is happening.`
       : stuetzen === 1 ? `A single support: the year speaks, but at half voice.`
       : `Nothing supports anything: a <b>quiet year</b>. Something happens, but below the ` +
         `surface, and one recognises it only later.`),
    "jahr.transit": (ft, woran) =>
      `Of the slow travellers, ${ft.figur} stands closest to you just now: ${ft.pron} ${ft.tut} ` +
      `— and in doing so touches ${woran}.`,
    "jahr.achse":"one of your axes",
    "jahr.traegt": (was) => `what carries ${was} in you`,
    "jahr.progression": (sonne, mond, phase) =>
      `Your inner weather — a reckoning that takes each day after your birth for a whole year of ` +
      `life — stands at ${sonne}, and the light that waxes and wanes in it, at ${mond}. ${phase}.`,
    "jahr.mond": (nr, name, urteil, zu, gut, meide, verbrannt) =>
      `And for today: the moon is in its ${ord(nr)} lodging, ${name} — ${urteil} — and is ` +
      `${zu ? "waxing" : "waning"}. Favourable for ${gut}; avoid ${meide}.` +
      (verbrannt ? " It stands on the burnt way besides — begin nothing today that is meant to last." : ""),
    "monate":["January","February","March","April","May","June","July","August","September","October","November","December"],

    "geber": (flamme, huetet, pron, ort) =>
      `The old writers asked: where in this sky burns the flame from which a life takes its ` +
      `warmth? In you it burns at ${flamme}. And who keeps this flame? ${huetet} — and ${pron} ` +
      `keeps it ${ort}. From there your strength takes its colouring; as with Meleager, whose ` +
      `life hung on a brand his mother pulled from the fire and put away: there is a place where ` +
      `a life lies particularly close to itself. How many years are counted from it stands in ` +
      `its own chapter and stays there — the traditions do not agree among themselves, and a ` +
      `number here would be a false certainty.`,

    "zus.bleibend": (name, element, herr, bild, figur, pron, steht, ort) =>
      (name ? `In the name lies ${name} — a sign ${element}, under ${herr}. ` : "") +
      (bild ? `In the hour of your birth, ${bild} came up over the edge of the world, and the ` +
              `hand that leads it is ${figur}: ${pron} stands at ${steht}, and keeps ${ort}. ` : "") +
      `That is the part that does not change. It runs along under everything — the reckonings ` +
      `further down say only what weather is passing over it just now.`,
    "zus.element.feuer":"of fire", "zus.element.erde":"of earth",
    "zus.element.luft":"of air", "zus.element.wasser":"of water",

    "offen.niyet":["Niyet — the question","a question in one sentence; the answer hangs also on the hour in which you ask"],
    "offen.uyum":["İsim uyumu","the name of a second person and that of their mother"],
    "offen.raml":["ʿIlm al-Raml","a question — the sand answers the moment, not the life"],
    "offen.zeit":["The right moment","something you mean to begin; then it tests the moon's standing against it"],

    "zus.einig": (anzahl, davon, akk, quellen, fo) =>
      `And now the curious thing. ${gross(anzahl)} old reckonings speak here that never read one ` +
      `another — from Persia, from Greece, from India —, and ${davon} of them point to <b>the ` +
      `same hand</b>, namely to ${akk} — ${quellen}. ` +
      `It is like the blind men in the fable feeling the same elephant: each takes hold of ` +
      `something different, and in the end they are all talking about one animal. When strangers ` +
      `from different countries say the same thing independently, it is worth listening. ` +
      `${gross(fo.pron)} ${fo.tut}. For that ${fo.pron} gives you ${fo.gabe} — and takes ` +
      `${fo.preis}.`,
    "zus.uneinig": (liste) =>
      `This time the reckonings do not say the same thing. Each names a different hand: ${liste}. ` +
      `None has the upper hand — a stretch like a road with several lanes, on which it has not ` +
      `yet been decided which will be the main one. That is no defect: it means that more than ` +
      `one thing is growing at a time.`,
    "zus.nennt": (quelle, akk) => `${gross(quelle)} names ${akk}`,
    "zus.hand": (zeichen, ort, stand) =>
      `And this hand is no stranger to you. It stood there already in the hour of your birth, ` +
      `at ${zeichen} — and its place is ${ort}. There, and nowhere else, will it be decided in ` +
      `these years what they bring. ${stand}`,
    "zahlwort":{1:"one",2:"two",3:"three",4:"four"},
    "quelle.zr":"the table of chapters",
    "quelle.prof":"the pointer that moves on one field each year",
    "quelle.fd":"a Persian reckoning",
    "quelle.vd":"an Indian reckoning",
    "und":"and",

    "rat.schild":        "The counsel",
    "schluss":
      "None of these arts foretells the future, and none is used that way here. " +
      "They give themes, due dates and keys — they say <em>what it is about</em> and " +
      "<em>when it is due</em>, not what will come of it. That stands in no table."
  }
};

function gross(w) { return String(w || "").charAt(0).toUpperCase() + String(w || "").slice(1); }

/* Englische Ordnungszahl: 1st, 2nd, 3rd, 4th — und 11th bis 13th trotz
   der Endziffern. Im Deutschen und Italienischen steht sie in der Tafel
   selbst, hier braucht sie eine Regel. */
function ord(n) {
  const z = Math.abs(Math.round(Number(n)));
  const zehner = z % 100, einer = z % 10;
  const endung = (zehner >= 11 && zehner <= 13) ? "th"
    : einer === 1 ? "st" : einer === 2 ? "nd" : einer === 3 ? "rd" : "th";
  return `${n}${endung}`;
}

let aktiv = "de";
export function setzeEssenzSprache(code) { aktiv = T[code] ? code : "de"; }
export function e(schluessel, ...args) {
  const tafel = T[aktiv] || T.de;
  const w = tafel[schluessel] !== undefined ? tafel[schluessel] : T.de[schluessel];
  return typeof w === "function" ? w(...args) : w;
}
