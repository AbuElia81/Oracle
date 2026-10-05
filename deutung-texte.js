/* ------------------------------------------------------------------------
   deutung-texte.js — die Sätze der Radixdeutung, je Sprache.

   Dasselbe Verfahren wie bei der Essenz: Jeder Satz ist eine Funktion,
   nicht eine Zeichenkette mit Platzhaltern, weil die Sprachen ihre
   Wörter verschieden stellen.
   ------------------------------------------------------------------------ */

export const D = {
  de: {
    "temp.sanguinisch.name":"sanguinisch", "temp.sanguinisch.saft":"Blut",
    "temp.sanguinisch.element":"Luft",
    "temp.sanguinisch.bild":"Luft und Blut — das rasche, zugewandte, leicht entzündliche Gemüt",
    "temp.sanguinisch.text":
      "Du nimmst schnell auf und gibst schnell weiter. Gesellschaft bekommt dir, Alleinsein " +
      "zehrt. Was dich reizt, reizt dich sofort und ist ebenso schnell wieder vorbei. Die alten " +
      "Ärzte hielten diese Mischung für die glücklichste und warnten zugleich vor ihrer " +
      "Flüchtigkeit: Was leicht kommt, bleibt nicht von selbst.",
    "temp.cholerisch.name":"cholerisch", "temp.cholerisch.saft":"gelbe Galle",
    "temp.cholerisch.element":"Feuer",
    "temp.cholerisch.bild":"Feuer und gelbe Galle — das scharfe, schnelle, auffahrende Gemüt",
    "temp.cholerisch.text":
      "Du entscheidest, ehe andere fertig überlegt haben, und liegst damit öfter richtig, als " +
      "die Überlegenden zugeben. Dein Zorn kommt schnell und geht schnell. Die Gefahr dieser " +
      "Mischung ist nicht die Hitze, sondern die Trockenheit: zu wenig Geduld mit dem, was " +
      "Zeit braucht.",
    "temp.melancholisch.name":"melancholisch", "temp.melancholisch.saft":"schwarze Galle",
    "temp.melancholisch.element":"Erde",
    "temp.melancholisch.bild":"Erde und schwarze Galle — das ernste, haltbare, schwer zu bewegende Gemüt",
    "temp.melancholisch.text":
      "Du prüfst lange und bindest dich dann fest. Was du einmal begriffen hast, verlierst du " +
      "nicht wieder. Diese Mischung galt den Alten als die der Gelehrten und Handwerker — und " +
      "als die, die am ehesten in Schwermut kippt, wenn nichts von außen sie wärmt.",
    "temp.phlegmatisch.name":"phlegmatisch", "temp.phlegmatisch.saft":"Schleim",
    "temp.phlegmatisch.element":"Wasser",
    "temp.phlegmatisch.bild":"Wasser und Schleim — das ruhige, aufnehmende, nachgiebige Gemüt",
    "temp.phlegmatisch.text":
      "Du lässt vieles an dich heran, ohne dich davon umwerfen zu lassen. Wo andere auffahren, " +
      "wartest du ab, und oft hat sich die Sache dann erledigt. Die Gefahr dieser Mischung ist " +
      "nicht die Trägheit, sondern das Nachgeben: Du räumst Felder, auf denen du hättest stehen " +
      "bleiben sollen.",

    "saft.sanguinisch":"Luft, die durch ein offenes Fenster streicht: Sie bringt herein, was draußen ist, und nimmt mit, was drinnen war.",
    "saft.cholerisch":"Ein Feuer, das sofort brennt, wenn man es anrührt — und das Holz braucht, sonst geht es aus.",
    "saft.melancholisch":"Erde, in der etwas liegt und wartet. Sie gibt nichts schnell heraus, aber was sie hergibt, ist gewachsen.",
    "saft.phlegmatisch":"Wasser, das die Form des Gefäßes annimmt und sich doch nicht ändert.",

    "rd.1":"Die Sekte", "rd.2":"Das Temperament",
    "rd.3":"Der Aufsteigende und sein Herr", "rd.4":"Der Herr des Ganzen",
    "rd.5":"Die beiden Lichter", "rd.6":"Wer stark steht und wer schwach",
    "rd.7":"Was sofort wirkt", "rd.8":"Wer wen beherbergt",

    "sekte.tag": "Du bist <b>bei Tag</b> geboren: Die Sonne stand über dem Horizont. Damit gehört " +
      "diese Geburt der Tagsekte. Sonne, Jupiter und Saturn treten hier in ihrer umgänglicheren " +
      "Gestalt auf, Mond, Venus und Mars in ihrer fordernden. Der schwerere der beiden Übeltäter " +
      "ist <b>Saturn</b>, der größere Wohltäter <b>Venus</b> — nicht Jupiter, wie man meinen würde.",
    "sekte.nacht": "Du bist <b>bei Nacht</b> geboren: Die Sonne stand unter dem Horizont. Damit " +
      "gehört diese Geburt der Nachtsekte. Mond, Venus und Mars treten hier in ihrer " +
      "umgänglicheren Gestalt auf, Sonne, Jupiter und Saturn in ihrer fordernden. Der schwerere " +
      "der beiden Übeltäter ist <b>Mars</b>, der größere Wohltäter <b>Jupiter</b>.",
    "sekte.note":"Dies ist der erste Griff jeder alten Deutung und der folgenreichste: Dieselbe " +
      "Stellung bedeutet bei Tag etwas anderes als bei Nacht.",

    "temp.gemischt": (name, bild) =>
      `Die Mischung ist nicht rein: Auf einer Achse steht es knapp, und darum läuft ` +
      `<b>${name}</b> mit — ${bild}. Die alten Ärzte nannten so etwas eine zusammengesetzte ` +
      `Komplexion und hielten sie für den Normalfall.`,
    "temp.note":"Gerechnet nach den vier Zeugen der Überlieferung: das aufsteigende Zeichen, sein " +
      "Herr, der Mond nach Zeichen und Phase, die Jahreszeit — dazu, wer im ersten Feld steht. " +
      "Die Alten lasen daran Leib, Gemüt, Tempo und Krankheitsneigung zugleich; hier steht nur, " +
      "was das Gemüt betrifft.",
    "temp.warm":"warm", "temp.kalt":"kalt", "temp.feucht":"feucht", "temp.trocken":"trocken",
    "temp.wederWarm":"weder warm noch kalt", "temp.wederFeucht":"weder feucht noch trocken",

    "winkel.ja": (namen) =>
      `Winkelhaft — also im 1., 4., 7. oder 10. Feld — stehen <b>${namen}</b>. Was diese ` +
      `anzeigen, tritt sichtbar ein und braucht keinen Umweg. In der alten Lehre ist das der ` +
      `wichtigste Unterschied überhaupt: nicht ob ein Planet gut oder schlecht steht, sondern ` +
      `ob er überhaupt zu Wort kommt.`,
    "winkel.nein":"Kein Planet steht winkelhaft. Das ist selten und heißt: In diesem Leben tritt " +
      "nichts von selbst ein. Alles geht über Umwege, über andere Menschen, über Geduld.",
    "kadent": (namen) =>
      `Kadent — im 3., 6., 9. oder 12. Feld — stehen ${namen}. Sie wirken mittelbar: durch ` +
      `andere, im Verborgenen, oder erst auf den zweiten Blick.`,
    "aufnahme.keine":"Kein Planet steht im Zeichen eines anderen, der ihn ansieht. Jeder steht für sich.",

    "rd.note":"Die Reihenfolge ist die der mittelalterlichen Schule: erst die Sekte, dann das " +
      "Temperament, dann der Mensch selbst, dann der Herr des Ganzen, die Lichter, die Stärken, " +
      "die Winkel und zuletzt die Aufnahmen. Robert Zoller fasst die Regel in vier Worte: keine " +
      "Deutung, keine Vorhersage. Was hier steht, ist der Inhalt — die Zeittechniken dieser " +
      "Seite sagen nur, wann davon etwas fällig wird.",

    "asc.satz": (bild, grad, herrName, herrZeichen, herrHaus, hausOrt, wuerde, stellung) =>
      `In der Stunde deiner Geburt stieg ${bild} über den Osthorizont, im ${grad}. Grad. Das ` +
      `aufsteigende Zeichen ist in dieser Lehre nicht dein Charakter, sondern dein <em>Körper ` +
      `in der Welt</em>: wie du auftrittst, wie man dich zuerst sieht, was man dir zutraut. ` +
      (herrName
        ? `Darüber gebietet ${herrName} — und wo der steht, dorthin zieht dein Leben. Er steht ` +
          `in ${herrZeichen}, im ${herrHaus}. Feld: ${hausOrt}${wuerde}. ${stellung}`
        : ""),
    "stellung.winkel":"Er steht winkelhaft — was er anzeigt, tritt sichtbar und bald ein.",
    "stellung.folgend":"Er steht folgend — es wirkt, aber mit Verzögerung.",
    "stellung.kadent":"Er steht kadent — es wirkt mittelbar, oft durch andere hindurch.",

    "alm.satz": (planet, punkte, gleich, ascHerr) =>
      `Über alle fünf Stellen gerechnet führt <b>${planet}</b> mit ${punkte} Punkten. ` +
      `Wo die einzelnen Zeugen sich widersprechen, hat er das letzte Wort. ` +
      (gleich
        ? `Er ist zugleich der Herr des Aufsteigenden — das ist der klare Fall: Diese Geburt ` +
          `hat eine Mitte, und sie ist unstrittig.`
        : `Er ist nicht der Herr des Aufsteigenden; der ist ${ascHerr}. Zwei verschiedene also: ` +
          `Der eine sagt, wie du auftrittst, der andere, worum es in diesem Leben überhaupt geht.`),
    "alm.mehr":"Ausführlich im Abschnitt „Der Herr der Geburt“.",

    "licht.sonne":"Vater, Obrigkeit, Rang, Lebenskraft und alles, was ins Licht tritt",
    "licht.mond":"Mutter, Leib, Gemüt, das tägliche Leben und alles, was sich wandelt",
    "licht.satz": (name, was, zeichen, haus, ort, wuerde) =>
      `<b>${name}</b> — ${was}. Bei dir in ${zeichen}, im ${haus}. Feld: ${ort}${wuerde}.`,

    "tab.planet":"Planet", "tab.zeichen":"Zeichen", "tab.feld":"Feld",
    "tab.wuerde":"Würde", "tab.rolle":"Rolle in dieser Sekte",
    "rolle.wohlGross":"größerer Wohltäter", "rolle.wohl":"Wohltäter",
    "rolle.uebelGross":"schwererer Übeltäter", "rolle.uebel":"Übeltäter",
    "rolle.sekte":"Licht dieser Sekte", "rolle.fremd":"Licht der anderen Sekte",
    "rolle.keine":"weder noch",
    "stark.satz": (stark, schwach) =>
      `Am stärksten steht <b>${stark}</b>: Was er anzeigt, bekommst du, ob du willst oder nicht. ` +
      `Am schwächsten <b>${schwach}</b> — was er anzeigt, musst du dir nehmen; es fällt dir nicht zu.`,

    "aufnahme.voll": (gast, wirt, zeichen, sicht) =>
      `<b>${gast}</b> steht im Zeichen von <b>${wirt}</b> (${zeichen}) — und beide sehen ` +
      `einander an (${sicht}). Das ist eine <b>volle Aufnahme</b>: Der Wirt nimmt den Gast auf ` +
      `und tut für ihn, was er kann. Die Alten halten das für den stärksten Zusammenhalt zweier ` +
      `Gestalten im ganzen Horoskop.`,
    "aufnahme.halb": (gast, wirt, zeichen) =>
      `<b>${gast}</b> steht im Zeichen von <b>${wirt}</b> (${zeichen}) — sie sehen einander ` +
      `aber nicht. Der Gast wohnt beim Wirt, ohne dass der es bemerkt: Die Hilfe liegt bereit ` +
      `und wird nicht abgerufen.`,

    "my.buehne.satz": (bild, hell, fh, ort, stand) =>
      `In der Stunde deiner Geburt kam ${bild} über den Rand der Welt herauf. Das ist das Bild, ` +
      `in dem du auftrittst — nicht wer du bist, sondern wie der Vorhang aufgeht. ` +
      (hell
        ? `Es war hell. In einem hellen Stück treten die Lauten zuerst auf, und die Leisen ` +
          `bekommen ihre Szene später.`
        : `Es war dunkel. In einem dunklen Stück fängt alles leiser an, und was zählt, ` +
          `geschieht abseits der Fackeln.`) +
      (fh ? ` Die Hand, die dieses Stück führt, ist ${fh.figur}: ${fh.pron} ${fh.tut}. ` +
            `${fh.pron.charAt(0).toUpperCase() + fh.pron.slice(1)} hält sich auf ${ort}. ${stand}` : ""),
    "my.stoff.satz": (element, saftBild, text, neben) =>
      `Die alten Ärzte mischten jeden Menschen aus vier Dingen, und bei dir überwiegt ` +
      `<b>${element}</b>. ${saftBild} ${text} ` +
      (neben
        ? `Rein ist die Mischung nicht — ${neben} läuft mit, und das ist der Normalfall: ` +
          `Niemand ist nur ein Element.`
        : `Die Mischung ist auffallend deutlich; das ist selten.`),
    "my.lichter.satz": (soBild, soOrt, moBild, moOrt) =>
      `Zwei Gestalten halten in jeder Geburt das Licht: <b>der König im Licht</b> steht bei ` +
      `${soBild} und ${soOrt} — von dort kommt, was an dir gesehen werden will, und von dort ` +
      `kam auch dein Vater. <b>Die Wandernde mit den vielen Gesichtern</b> steht bei ${moBild} ` +
      `und ${moOrt} — von dort kommt, was dich nährt und was sich bei dir ändert, und von dort ` +
      `kam deine Mutter. In den alten Büchern ist das kein Vergleich, sondern dieselbe Sache: ` +
      `Was oben wandert, heißt unten Mutter.`,
    "my.wort.satz": (st, sw) =>
      `Am lautesten spricht ${st.figur} — ${st.pron} ${st.tut}. ` +
      `${st.pron.charAt(0).toUpperCase() + st.pron.slice(1)} gibt dir ${st.gabe} und nimmt sich ` +
      `${st.preis}. Was von dort kommt, bekommst du, ob du willst oder nicht. ` +
      `Am leisesten ${sw.figur} — ${sw.fabel}. Was von dort kommt, fällt dir nicht zu: Du musst ` +
      `es dir holen, und zwar jedes Mal neu.`,
    "my.gast.voll": (gast, wirt) =>
      `${gast.charAt(0).toUpperCase() + gast.slice(1)} wohnt im Haus ${wirt}, und die beiden ` +
      `sehen einander dabei an. In den alten Büchern ist das die stärkste Freundschaft, die zwei ` +
      `Gestalten schließen können: Der Wirt tut für den Gast, was er kann, und zwar ohne dass ` +
      `man ihn bitten muss.`,
    "my.gast.halb": (gast, wirt) =>
      `${gast.charAt(0).toUpperCase() + gast.slice(1)} wohnt im Haus ${wirt} — aber sie sehen ` +
      `einander nicht. Die Gastfreundschaft liegt bereit und wird nicht in Anspruch genommen.`,
    "my.rede.satz": (figur, fabel) =>
      `Rechnet man alles zusammen — jede Stelle, jeden Ort, den Tag und die Stunde —, so steht ` +
      `am Ende ${figur} obenan. ${fabel.charAt(0).toUpperCase() + fabel.slice(1)}: Das ist die ` +
      `Fabel, die unter diesem Leben liegt. Wo sich die einzelnen Zeichen widersprechen, ` +
      `erzählt sie weiter.`,

    "my.buehne":"Die Bühne", "my.stoff":"Der Stoff", "my.lichter":"Die beiden Lichter",
    "my.wort":"Wer das Wort führt und wer schweigt", "my.gast":"Wer bei wem zu Gast ist",
    "my.rede":"Wovon hier die Rede ist",
    "my.note":"Dies ist dieselbe Geburt wie nebenan, nur anders gelesen. Die mittelalterliche " +
      "Schule würde diese Lesart ablehnen: Robert Zoller nennt es eine Verwechslung des " +
      "Horoskops mit dem Innenleben und besteht darauf, dass die Felder äußere Verhältnisse " +
      "bezeichnen, nicht Vorstellungen davon. Er hat damit nicht unrecht — aber ein Bild merkt " +
      "man sich, und eine Tabelle nicht. Darum stehen hier beide."
  },

  it: {
    "temp.sanguinisch.name":"sanguigno", "temp.sanguinisch.saft":"sangue",
    "temp.sanguinisch.element":"aria",
    "temp.sanguinisch.bild":"aria e sangue — l'animo rapido, aperto, facile ad accendersi",
    "temp.sanguinisch.text":
      "Accogli in fretta e in fretta restituisci. La compagnia ti fa bene, la solitudine ti " +
      "consuma. Ciò che ti irrita, ti irrita subito ed è altrettanto presto passato. I vecchi " +
      "medici tenevano questa mescolanza per la più fortunata e insieme mettevano in guardia " +
      "dalla sua volatilità: ciò che viene facilmente non resta da sé.",
    "temp.cholerisch.name":"collerico", "temp.cholerisch.saft":"bile gialla",
    "temp.cholerisch.element":"fuoco",
    "temp.cholerisch.bild":"fuoco e bile gialla — l'animo tagliente, rapido, pronto a divampare",
    "temp.cholerisch.text":
      "Decidi prima che gli altri abbiano finito di riflettere, e hai ragione più spesso di " +
      "quanto i riflessivi ammettano. La tua collera viene in fretta e in fretta se ne va. Il " +
      "pericolo di questa mescolanza non è il calore, ma la secchezza: troppa poca pazienza " +
      "con ciò che richiede tempo.",
    "temp.melancholisch.name":"malinconico", "temp.melancholisch.saft":"bile nera",
    "temp.melancholisch.element":"terra",
    "temp.melancholisch.bild":"terra e bile nera — l'animo serio, durevole, difficile da smuovere",
    "temp.melancholisch.text":
      "Verifichi a lungo e poi ti leghi saldamente. Ciò che hai capito una volta non lo perdi " +
      "più. Questa mescolanza era per gli antichi quella dei dotti e degli artigiani — e quella " +
      "che più facilmente scivola nella tristezza, se nulla la riscalda da fuori.",
    "temp.phlegmatisch.name":"flemmatico", "temp.phlegmatisch.saft":"flemma",
    "temp.phlegmatisch.element":"acqua",
    "temp.phlegmatisch.bild":"acqua e flemma — l'animo quieto, accogliente, arrendevole",
    "temp.phlegmatisch.text":
      "Lasci che molte cose ti si avvicinino senza lasciartene travolgere. Dove gli altri " +
      "insorgono, tu aspetti, e spesso la cosa si è poi risolta da sé. Il pericolo di questa " +
      "mescolanza non è la pigrizia, ma il cedere: sgombri campi sui quali avresti dovuto " +
      "restare.",

    "saft.sanguinisch":"Aria che passa per una finestra aperta: porta dentro ciò che è fuori e porta via ciò che era dentro.",
    "saft.cholerisch":"Un fuoco che brucia appena lo si tocca — e che ha bisogno di legna, altrimenti si spegne.",
    "saft.melancholisch":"Terra in cui qualcosa giace e aspetta. Non dà fuori nulla in fretta, ma ciò che dà è cresciuto.",
    "saft.phlegmatisch":"Acqua che prende la forma del recipiente e tuttavia non cambia.",

    "rd.1":"La setta", "rd.2":"Il temperamento",
    "rd.3":"L'Ascendente e il suo signore", "rd.4":"Il signore del tutto",
    "rd.5":"I due luminari", "rd.6":"Chi sta forte e chi sta debole",
    "rd.7":"Ciò che agisce subito", "rd.8":"Chi ospita chi",

    "sekte.tag": "Sei nato <b>di giorno</b>: il sole stava sopra l'orizzonte. Questa nascita " +
      "appartiene dunque alla setta diurna. Sole, Giove e Saturno vi compaiono nella loro figura " +
      "più accomodante, Luna, Venere e Marte in quella esigente. Il più grave dei due malefici è " +
      "<b>Saturno</b>, il maggiore dei benefici è <b>Venere</b> — non Giove, come si crederebbe.",
    "sekte.nacht": "Sei nato <b>di notte</b>: il sole stava sotto l'orizzonte. Questa nascita " +
      "appartiene dunque alla setta notturna. Luna, Venere e Marte vi compaiono nella loro figura " +
      "più accomodante, Sole, Giove e Saturno in quella esigente. Il più grave dei due malefici è " +
      "<b>Marte</b>, il maggiore dei benefici è <b>Giove</b>.",
    "sekte.note":"È la prima presa di ogni lettura antica e la più gravida di conseguenze: la " +
      "stessa posizione significa di giorno una cosa e di notte un'altra.",

    "temp.gemischt": (name, bild) =>
      `La mescolanza non è pura: su un asse la cosa è di stretta misura, e perciò corre con essa ` +
      `anche il <b>${name}</b> — ${bild}. I vecchi medici chiamavano questo una complessione ` +
      `composta e la tenevano per il caso normale.`,
    "temp.note":"Calcolato secondo i quattro testimoni della tradizione: il segno che sale, il " +
      "suo signore, la luna per segno e per fase, la stagione — e inoltre chi sta nel primo " +
      "campo. Gli antichi vi leggevano insieme corpo, animo, andatura e inclinazione alle " +
      "malattie; qui sta soltanto ciò che riguarda l'animo.",
    "temp.warm":"caldo", "temp.kalt":"freddo", "temp.feucht":"umido", "temp.trocken":"secco",
    "temp.wederWarm":"né caldo né freddo", "temp.wederFeucht":"né umido né secco",

    "winkel.ja": (namen) =>
      `Angolari — cioè nel 1°, 4°, 7° o 10° campo — stanno <b>${namen}</b>. Ciò che essi ` +
      `indicano si presenta visibilmente e non ha bisogno di giri. Nella vecchia dottrina è la ` +
      `differenza più importante di tutte: non se un pianeta stia bene o male, ma se arrivi ` +
      `affatto a parlare.`,
    "winkel.nein":"Nessun pianeta sta angolare. È raro e vuol dire: in questa vita nulla si " +
      "presenta da sé. Tutto passa per giri, per altre persone, per la pazienza.",
    "kadent": (namen) =>
      `Cadenti — nel 3°, 6°, 9° o 12° campo — stanno ${namen}. Agiscono per via indiretta: ` +
      `attraverso altri, nel nascosto, o soltanto a un secondo sguardo.`,
    "aufnahme.keine":"Nessun pianeta sta nel segno di un altro che lo guardi. Ciascuno sta per sé.",

    "rd.note":"L'ordine è quello della scuola medievale: prima la setta, poi il temperamento, " +
      "poi l'uomo stesso, poi il signore del tutto, i luminari, le forze, gli angoli e da ultimo " +
      "le ricezioni. Robert Zoller riassume la regola in quattro parole: nessuna lettura, nessuna " +
      "previsione. Ciò che sta qui è il contenuto — le tecniche temporali di questo sito dicono " +
      "soltanto quando qualcosa di esso viene a scadenza.",

    "asc.satz": (bild, grad, herrName, herrZeichen, herrHaus, hausOrt, wuerde, stellung) =>
      `Nell'ora della tua nascita ${bild} salì oltre l'orizzonte orientale, nel ${grad}° grado. ` +
      `In questa dottrina il segno che sale non è il tuo carattere, ma il tuo <em>corpo nel ` +
      `mondo</em>: come ti presenti, come ti si vede per primo, che cosa ti si attribuisce. ` +
      (herrName
        ? `Vi comanda ${herrName} — e dove sta lui, là tira la tua vita. Sta in ${herrZeichen}, ` +
          `nel ${herrHaus}° campo: ${hausOrt}${wuerde}. ${stellung}`
        : ""),
    "stellung.winkel":"Sta angolare — ciò che indica si presenta visibilmente e presto.",
    "stellung.folgend":"Sta succedente — agisce, ma con ritardo.",
    "stellung.kadent":"Sta cadente — agisce per via indiretta, spesso attraverso altri.",

    "alm.satz": (planet, punkte, gleich, ascHerr) =>
      `Calcolato su tutte e cinque le posizioni, è in testa <b>${planet}</b> con ${punkte} punti. ` +
      `Dove i singoli testimoni si contraddicono, è lui ad avere l'ultima parola. ` +
      (gleich
        ? `È insieme il signore dell'Ascendente — questo è il caso limpido: questa nascita ha un ` +
          `centro, e non è controverso.`
        : `Non è il signore dell'Ascendente; quello è ${ascHerr}. Due dunque diversi: l'uno dice ` +
          `come ti presenti, l'altro di che cosa si tratti in questa vita.`),
    "alm.mehr":"Per esteso nella sezione «Il signore della nascita».",

    "licht.sonne":"il padre, l'autorità, il rango, la forza vitale e tutto ciò che viene alla luce",
    "licht.mond":"la madre, il corpo, l'animo, la vita quotidiana e tutto ciò che muta",
    "licht.satz": (name, was, zeichen, haus, ort, wuerde) =>
      `<b>${name}</b> — ${was}. Da te in ${zeichen}, nel ${haus}° campo: ${ort}${wuerde}.`,

    "tab.planet":"Pianeta", "tab.zeichen":"Segno", "tab.feld":"Campo",
    "tab.wuerde":"Dignità", "tab.rolle":"Ruolo in questa setta",
    "rolle.wohlGross":"benefico maggiore", "rolle.wohl":"benefico",
    "rolle.uebelGross":"malefico più grave", "rolle.uebel":"malefico",
    "rolle.sekte":"luminare di questa setta", "rolle.fremd":"luminare dell'altra setta",
    "rolle.keine":"né l'uno né l'altro",
    "stark.satz": (stark, schwach) =>
      `Più forte di tutti sta <b>${stark}</b>: ciò che indica, lo ottieni, che tu lo voglia o no. ` +
      `Più debole di tutti <b>${schwach}</b> — ciò che indica devi andartelo a prendere; non ti ` +
      `cade addosso.`,

    "aufnahme.voll": (gast, wirt, zeichen, sicht) =>
      `<b>${gast}</b> sta nel segno di <b>${wirt}</b> (${zeichen}) — e i due si guardano a ` +
      `vicenda (${sicht}). È una <b>ricezione piena</b>: l'ospitante accoglie l'ospite e fa per ` +
      `lui quanto può. Gli antichi la tengono per la coesione più forte che due figure possano ` +
      `avere in tutto l'oroscopo.`,
    "aufnahme.halb": (gast, wirt, zeichen) =>
      `<b>${gast}</b> sta nel segno di <b>${wirt}</b> (${zeichen}) — ma non si guardano. ` +
      `L'ospite abita dall'ospitante senza che questi se ne accorga: l'aiuto è pronto e non ` +
      `viene chiamato.`,

    "my.buehne.satz": (bild, hell, fh, ort, stand) =>
      `Nell'ora della tua nascita ${bild} venne su oltre il bordo del mondo. È l'immagine in cui ` +
      `entri in scena — non chi sei, ma come si alza il sipario. ` +
      (hell
        ? `Era giorno. In un pezzo illuminato entrano per primi i rumorosi, e i silenziosi hanno ` +
          `la loro scena più tardi.`
        : `Era notte. In un pezzo buio tutto comincia più piano, e ciò che conta accade lontano ` +
          `dalle torce.`) +
      (fh ? ` La mano che conduce questo pezzo è ${fh.figur}: ${fh.pron} ${fh.tut}. ` +
            `${fh.pron.charAt(0).toUpperCase() + fh.pron.slice(1)} si trattiene ${ort}. ${stand}` : ""),
    "my.stoff.satz": (element, saftBild, text, neben) =>
      `I vecchi medici mescolavano ogni uomo con quattro cose, e in te prevale ` +
      `<b>${element}</b>. ${saftBild} ${text} ` +
      (neben
        ? `La mescolanza non è pura — corre con essa anche ${neben}, ed è il caso normale: ` +
          `nessuno è un solo elemento.`
        : `La mescolanza è straordinariamente netta; è raro.`),
    "my.lichter.satz": (soBild, soOrt, moBild, moOrt) =>
      `Due figure tengono in ogni nascita la luce: <b>il Re nella luce</b> sta presso ${soBild} ` +
      `e ${soOrt} — di là viene ciò che in te vuole essere visto, e di là veniva anche tuo padre. ` +
      `<b>La Viandante dai molti volti</b> sta presso ${moBild} e ${moOrt} — di là viene ciò che ` +
      `ti nutre e ciò che in te cambia, e di là veniva tua madre. Nei libri antichi questo non è ` +
      `un paragone, ma la stessa cosa: ciò che in alto cammina, in basso si chiama madre.`,
    "my.wort.satz": (st, sw) =>
      `A parlare più forte è ${st.figur} — ${st.pron} ${st.tut}. ` +
      `${st.pron.charAt(0).toUpperCase() + st.pron.slice(1)} ti dà ${st.gabe} e si prende ` +
      `${st.preis}. Ciò che viene di là lo ottieni, che tu lo voglia o no. ` +
      `A parlare più piano ${sw.figur} — ${sw.fabel}. Ciò che viene di là non ti cade addosso: ` +
      `devi andartelo a prendere, e ogni volta daccapo.`,
    "my.gast.voll": (gast, wirt) =>
      `${gast.charAt(0).toUpperCase() + gast.slice(1)} abita nella casa ${wirt}, e i due si ` +
      `guardano a vicenda. Nei libri antichi è la più forte amicizia che due figure possano ` +
      `stringere: l'ospitante fa per l'ospite quanto può, e senza che glielo si debba chiedere.`,
    "my.gast.halb": (gast, wirt) =>
      `${gast.charAt(0).toUpperCase() + gast.slice(1)} abita nella casa ${wirt} — ma non si ` +
      `guardano. L'ospitalità è pronta e non viene richiesta.`,
    "my.rede.satz": (figur, fabel) =>
      `Se si mette tutto insieme — ogni posizione, ogni luogo, il giorno e l'ora —, alla fine ` +
      `sta in cima ${figur}. ${fabel.charAt(0).toUpperCase() + fabel.slice(1)}: è la favola che ` +
      `sta sotto questa vita. Dove i singoli segni si contraddicono, è lei a continuare il racconto.`,

    "my.buehne":"La scena", "my.stoff":"La stoffa", "my.lichter":"I due luminari",
    "my.wort":"Chi tiene la parola e chi tace", "my.gast":"Chi è ospite di chi",
    "my.rede":"Di che cosa qui si parla",
    "my.note":"È la stessa nascita di accanto, solo letta in altro modo. La scuola medievale " +
      "respingerebbe questa lettura: Robert Zoller la chiama uno scambio dell'oroscopo con la " +
      "vita interiore e insiste sul fatto che i campi designano rapporti esterni, non " +
      "rappresentazioni di essi. In questo non ha torto — ma un'immagine la si ricorda, una " +
      "tabella no. Per questo stanno qui tutte e due."
  }
};

let aktiv = "de";
export function setzeDeutungSprache(code) { aktiv = D[code] ? code : "de"; }
export function d(schluessel, ...args) {
  const tafel = D[aktiv] || D.de;
  const w = tafel[schluessel] !== undefined ? tafel[schluessel] : D.de[schluessel];
  return typeof w === "function" ? w(...args) : w;
}
