/* ------------------------------------------------------------------------
   rest-texte.js — die Sätze des Werks, der Lebensalter, der arabischen
   Punkte, der Verteilung und des Herrn der Geburt, je Sprache.

   Dasselbe Verfahren wie bei der Essenz und der Deutung: jeder Satz eine
   Funktion, keine Zeichenkette mit Platzhaltern.
   ------------------------------------------------------------------------ */

export const R = {
  de: {
    /* ------------------------------------------ Das Horoskop */
    "hk.sekt.tag":"Eine <b>Taggeburt</b>: Die Sonne stand über dem Horizont. Die Partei des Tages " +
      "führt — Sonne, Jupiter und Saturn wirken hier gefälliger, Mond, Venus und Mars fordernder.",
    "hk.sekt.nacht":"Eine <b>Nachtgeburt</b>: Die Sonne stand unter dem Horizont. Die Partei der " +
      "Nacht führt — Mond, Venus und Mars wirken hier gefälliger, Sonne, Jupiter und Saturn fordernder.",
    "hk.planetSatz": (was, art, ort) => `${was} zeigen sich ${art}, ${ort}.`,
    "hk.planetWuerde": (text) => ` Der Planet steht ${text}.`,
    "hk.geruest":"Das Gerüst",
    "hk.steigtAuf": (glyph, zeichen) => `${glyph} ${zeichen} steigt auf`,
    "hk.geruestNot": (asc, grad, mcGlyph, mc, herr) =>
      `${asc} ${grad}° · MC ${mcGlyph} ${mc}` + (herr ? ` · Herr des Horoskops: ${herr}` : ""),
    "hk.siebenPlaneten":"Die sieben Planeten",
    "hk.tab.planet":"Planet", "hk.tab.zeichen":"Zeichen", "hk.tab.haus":"Haus", "hk.tab.wuerde":"Würde",
    "hk.wasSagen":"Was die Planeten sagen",
    "hk.planetKopf": (glyph, name, zGlyph, zeichen, haus) =>
      `<span class="glyph">${glyph}</span> <b>${name}</b> in ${zGlyph} ${zeichen}, ${haus} Haus`,
    "hk.aspekte":"Die engsten Aspekte",
    "hk.transitText":"Wo die langsamen Planeten heute stehen und was sie in deinem Horoskop " +
      "berühren. Mars bleibt Wochen, Jupiter Monate, Saturn Jahre — deshalb zählen hier nur diese drei.",
    "hk.transitZeile": (g, name, zGlyph, zeichen, ort) =>
      `<b>${g} ${name}</b> läuft durch ${zGlyph} ${zeichen} — bei dir ${ort}.`,
    "hk.beruehrt":"Was davon dein Geburtshoroskop gerade berührt:",
    "hk.trefferAchse": (transit, aspekt, natal, orbis, ton) =>
      `<b>${transit} ${aspekt} ${natal}</b> (${orbis}°) — die Achse selbst wird angesprochen, ${ton}.`,
    "hk.treffer": (transit, aspekt, natal, orbis, was, ton) =>
      `<b>${transit} ${aspekt} ${natal}</b> (${orbis}°) — ${was} — ${ton} angesprochen.`,
    "hk.keinTreffer":"Zurzeit berührt keiner der drei dein Horoskop eng genug, um ihn zu nennen. Eine ruhige Strecke.",
    "hk.progression":"Sekundäre Progression — der innere Kalender",
    "hk.progressionText":"Ein Tag nach der Geburt gilt für ein Lebensjahr. Die progressierte " +
      "Sonne rückt etwa ein Grad im Jahr und wechselt alle dreißig Jahre das Zeichen; der " +
      "progressierte Mond braucht rund achtundzwanzig Jahre für den ganzen Kreis. Beide " +
      "beschreiben keine Ereignisse, sondern das innere Wetter.",
    "hk.progSonne": (glyph, zeichen, grad, haus, art, ort) =>
      `<b>Progressierte Sonne</b> in ${glyph} ${zeichen} ${grad}°, ${haus} Haus — worauf dein ` +
      `Wille in diesem Lebensabschnitt zielt: ${art}, ${ort}.`,
    "hk.progMond": (glyph, zeichen, haus, ort) =>
      `<b>Progressierter Mond</b> in ${glyph} ${zeichen}, ${haus} Haus — woran du dich zurzeit ` +
      `aufhältst: ${ort}. Er bleibt gut zwei Jahre je Zeichen.`,
    "hk.progPhase": (phase) => `<b>Progressierte Mondphase</b>: ${phase}.`,
    "pf.note":"Das Profektionsjahr läuft von Geburtstag zu Geburtstag. Wo der Herr des Jahres im Geburtshoroskop steht — gut oder schlecht gestellt, in welchem Haus —, entscheidet, wie leicht das Thema sich einlöst.",
    "pf.wirkung.sonne":"bringt Licht und Sichtbarkeit — was hier liegt, wird gesehen, auch von anderen",
    "pf.wirkung.mond":"bringt Bewegung und Stimmung — es rührt sich etwas, hält aber nicht von selbst",
    "pf.wirkung.merkur":"bringt Gespräche, Papiere und Wege — hier wird verhandelt und geschrieben",
    "pf.wirkung.venus":"bringt Entgegenkommen und leichtere Umstände — hier geht etwas gütlich aus",
    "pf.wirkung.mars":"bringt Hitze und Entschluss — hier wird etwas durchgeschnitten, im Guten wie im Schlechten",
    "pf.wirkung.jupiter":"bringt Zuwachs, Gönner und Spielraum — hier geht das Jahr auf",
    "pf.wirkung.saturn":"bringt Ernst, Verzögerung und Gewicht — hier wird gearbeitet oder verzichtet",
    "pf.dauer.mond":"zweieinhalb Tage", "pf.dauer.merkur":"zwei bis drei Wochen",
    "pf.dauer.venus":"knapp einen Monat", "pf.dauer.sonne":"einen Monat",
    "pf.dauer.mars":"anderthalb Monate", "pf.dauer.jupiter":"ein Jahr", "pf.dauer.saturn":"zweieinhalb Jahre",
    "pf.jahr.sonne":"Es geht ums Gesehenwerden. Was du tust, geschieht dieses Jahr vor Zeugen — such dir die Zeugen aus.",
    "pf.jahr.mond":"Ein Jahr der Wechsel und des Gemüts. Wohnung, Familie, Stimmungen; wenig bleibt, wo es war.",
    "pf.jahr.merkur":"Ein Jahr der Verhandlungen. Papier, Wege, Gespräche; wer dieses Jahr schweigt, verliert.",
    "pf.jahr.venus":"Ein Jahr der Bindung und der Form. Beziehungen, Kunst, Geld, das über Menschen kommt.",
    "pf.jahr.mars":"Ein Jahr des Schnitts. Es wird entschieden, gestritten, gearbeitet; halbe Sachen halten nicht.",
    "pf.jahr.jupiter":"Ein Jahr der Erweiterung. Gönner, Recht, Reise, Zuwachs — und die Versuchung, zu viel zu nehmen.",
    "pf.jahr.saturn":"Ein Jahr der Prüfung. Es geht langsam, es kostet, und was dabei entsteht, hält lange.",
    "pf.text1":"Profektion heißt Vorrücken. Mit jedem Geburtstag wandert der Aszendent ein " +
      "ganzes Zeichen weiter — ein Jahr, ein Haus. Das Haus, auf das er fällt, gibt dem Jahr " +
      "sein Thema; der Herrscher dieses Zeichens wird zum Herrn des Jahres. Nach zwölf Jahren " +
      "ist der Kreis geschlossen und beginnt von vorn, eine Etage höher.",
    "pf.text2":"Es ist die sparsamste Jahrestechnik, die es gibt: Sie braucht nur den " +
      "Aszendenten und dein Alter. Gerade deshalb ist sie robust — sie irrt nicht an einer " +
      "ungenauen Geburtszeit, solange das Zeichen des Aszendenten stimmt.",
    "pf.ohneAngaben":"Ohne vollständige Geburtsangaben lässt sich das Jahreshaus nicht bestimmen.",
    "pf.laufend":"Dein laufendes Jahr",
    "pf.laufendSatz": (alter, haus, glyph, name, herr, thema) =>
      `Mit ${alter} Jahren steht dein <b>${haus} Haus</b> im Jahr, ${glyph} ${name}, und Herr ` +
      `des Jahres ist <b>${herr}</b>. Das Thema: ${thema}.`,
    "pf.wo":"Wo das Jahr dich trifft",
    "pf.rolle": (herr) => `Herr des Jahres ist ${herr}; er`,
    "pf.zusammen": (thema, herr, ort) =>
      `Lies das zusammen: Das Thema des Jahres ist ${thema}; ausgetragen wird es dort, wo ` +
      `${herr} in deinem Horoskop steht — ${ort}.`,
    "pf.werZieht":"Wer gerade durch das Haus des Jahres zieht",
    "pf.werZiehtText": (glyph, name) =>
      `Das Zeichen des Jahres ist ${glyph} ${name}. Jeder Planet, der jetzt dort hindurchläuft, ` +
      `rührt das Thema des Jahres unmittelbar an — die Profektion sagt, worum es geht, der ` +
      `Transit sagt, wann es sich meldet.`,
    "pf.keiner":"Zurzeit zieht keiner der sieben durch dieses Zeichen. Das Jahresthema läuft im " +
      "Hintergrund weiter, ohne dass es gerade angestoßen wird.",
    "pf.transitZeile": (g, name, grad, wirkung, dauer, istHerr) =>
      `<b>${g} ${name}</b> auf ${grad}° — ${wirkung}. Er bleibt dort etwa ${dauer}.` +
      (istHerr ? ` <b>Und das ist zugleich der Herr des Jahres selbst.</b>` : ""),
    "pf.herrImHaus": (thema) =>
      `<b>Der Herr des Jahres zieht selbst durch das Haus des Jahres.</b> Die Technik kennt ` +
      `kaum eine deutlichere Ansage: Was dieses Jahr bedeutet — ${thema} —, kommt jetzt zur ` +
      `Sache und nicht irgendwann. Was in dieser Zeit angefangen oder entschieden wird, trägt ` +
      `die Handschrift des Jahres.`,
    "pf.herrAnderswo": (herr, glyph, zeichen, ort) =>
      `Der Herr des Jahres, ${herr}, läuft zurzeit nicht durch das Zeichen des Jahres, sondern ` +
      `durch ${glyph} ${zeichen} — bei dir ${ort}. Von dort aus wirkt er aufs Jahresthema, aber ` +
      `mittelbar: über diesen Bereich, nicht unmittelbar.`,
    /* Die zwölf Kapitel des Zodiacal Releasing, nach Zeichenindex. */
    "dg.kapitel":[
      "ein Kapitel des Anfangens. Man wird geschoben, ehe man den Weg kennt; vieles beginnt, nicht alles bleibt.",
      "ein Kapitel des Sammelns. Langsam, gegenständlich, auf Besitz und Sicherheit hin — und schwer wieder in Bewegung zu bringen.",
      "ein Kapitel der Wege und Worte. Viele Kontakte, viel Lernen, viel Hin und Her; die Kunst ist, etwas davon zu Ende zu bringen.",
      "ein Kapitel des Hauses. Herkunft, Familie, Wohnort und Gemüt stehen im Vordergrund; das Innere entscheidet über das Äußere.",
      "ein Kapitel des Hervortretens. Man wird gesehen, gefragt, gefordert — und muss lernen, die Aufmerksamkeit zu tragen.",
      "ein Kapitel der Arbeit und der Ordnung. Dienst, Gesundheit, Handwerk, das Kleinteilige; unspektakulär und tragend.",
      "ein Kapitel der Anderen. Ehe, Verträge, Ausgleich, auch offene Gegnerschaft; wenig entscheidet sich allein.",
      "ein Kapitel der Tiefe. Verborgenes kommt hoch, Bindungen werden ernst, Verluste und Erbschaften wiegen schwer.",
      "ein Kapitel der Weite. Fremde, Lehre, Glaube, Recht; der Horizont rückt hinaus, notfalls indem man selbst fortgeht.",
      "ein Kapitel des Aufbaus. Amt, Verantwortung, Ausdauer; es geht langsam voran und bleibt dann stehen.",
      "ein Kapitel der Bünde. Freundschaften, Gruppen, Vorhaben, die über einen selbst hinausgehen; man gehört dazu und steht doch daneben.",
      "ein Kapitel des Auflösens. Rückzug, Mitleid, Traum, auch Verwirrung; Altes geht zu Ende, ehe Neues Gestalt hat."
    ],
    /* --------------------------- Deutungen neben Bogen, ZR, Antiszien */
    "dg.wuerde.Domizil":"in eigenem Zeichen und damit stark",
    "dg.wuerde.Erhöhung":"erhöht und damit über sein Maß hinaus geachtet",
    "dg.wuerde.Exil":"im Exil und damit gegen den Strich arbeitend",
    "dg.wuerde.Fall":"im Fall und damit schwer zu seinem Recht kommend",
    "dg.wuerde.—":"ohne besondere Würde",
    "dg.konkret": (rolle, glyph, zeichen, haus, ort, wuerde) =>
      `${rolle} steht bei dir in ${glyph} ${zeichen}, im ${haus} Haus — ${ort} —, und zwar ` +
      `${wuerde}. Dort wird sich zeigen, was diese Zeit bringt.`,
    "dg.wasHeisst":"Was das heißt",
    "dg.pr.sonne":"Sichtbarkeit — Amt, Anerkennung, das Hervortreten vor anderen; und die Rechnung, die dafür kommt",
    "dg.pr.mond":"das Häusliche und das Bewegliche — Wohnort, Familie, Gemüt, ein Wechsel, der von innen anfängt",
    "dg.pr.merkur":"Papier und Wort — Verträge, Schrift, Handel, Lernen, Wege, die man mehrmals geht",
    "dg.pr.venus":"Bindung und Wohlgefallen — Zuneigung, Kunst, Geld, das leicht kommt, Versöhnung",
    "dg.pr.mars":"der Schnitt — Arbeit, Streit, Entschluss, Trennung; was nicht mehr wartet",
    "dg.pr.jupiter":"Erweiterung — Recht, Gönner, Reise, Ansehen; und die Gefahr, sich zu viel vorzunehmen",
    "dg.pr.saturn":"Ernst — Verantwortung, Verzicht, Prüfung, das Bleibende; was Zeit verlangt und Zeit gibt",
    "dg.pr.mc":"die Achse des Amtes selbst rückt vor: die Stellung in der Welt ordnet sich neu",
    "dg.pr.asc":"die Achse der Person selbst rückt vor: Leib, Auftritt und Selbstbild ordnen sich neu",
    "dg.pr.sonst": (name) => `das Thema von ${name}`,
    "dg.sg.mc":"im Beruf und im Ruf",
    "dg.sg.ic":"im Haus, in der Herkunft und bei den Wurzeln",
    "dg.sg.asc":"am eigenen Leib und im Auftreten",
    "dg.sg.desc":"beim Anderen — Ehe, Verträge, offene Gegner",
    "dg.sg.sonst": (name) => `bei ${name}`,
    "dg.ton.Konjunktion":"unvermittelt und ohne Umweg",
    "dg.ton.Quadrat":"unter Reibung, gegen einen Widerstand",
    "dg.ton.Opposition":"von außen, durch einen anderen Menschen",
    "dg.ton.Trigon":"leicht, fast von selbst",
    "dg.ton.Sextil":"als Gelegenheit, die man ergreifen muss",
    "dg.lbText":"Primärdirektionen messen nicht, was geschieht, sondern wann etwas fällig wird. " +
      "Der Himmel dreht sich nach der Geburt weiter; ein Grad dieser Drehung gilt für ein " +
      "Lebensjahr. Wo ein Planet dabei auf eine Achse trifft, klopft sein Thema an — ob " +
      "geöffnet wird, steht auf einem anderen Blatt.",
    "dg.lbLeer":"Im gewählten Altersfenster liegt nichts mehr vor dir.",
    "dg.lbTitelMehr":"Die nächsten Fälligkeiten", "dg.lbTitelEine":"Die nächste Fälligkeit",
    "dg.wannJahre": (n) => `mit ${n} Jahren`,
    "dg.wannJetzt":"gerade jetzt",
    "dg.wannMonate": (n) => `in etwa ${n} Monaten`,
    "dg.wannGut": (n) => `in gut ${n} Jahren`,
    "dg.lbZeile": (wann, alter, was, wo, ton) => `<b>${wann}</b> (mit ${alter}): ${was} — ${wo}, ${ton}.`,
    "dg.lbAnklopft":"Was da genau anklopft",
    "dg.lbRolle": (name) => `${name} bringt die nächste Direktion und`,
    "dg.lbNote":"Eine Direktion ist ein Termin, kein Urteil. Zwei Menschen mit demselben Termin " +
      "erleben Verschiedenes — die Frage ist immer, was zu diesem Zeitpunkt schon vorbereitet war.",
    "dg.zrText":"Zodiacal Releasing teilt das Leben in Kapitel, nicht in Ereignisse. Vom Los des " +
      "Glücks aus werden Zeichen für Zeichen Perioden abgezählt, jede so lang wie die Jahre ihres " +
      "Herrschers. Die erste Ebene sagt, worum es über Jahre hinweg geht; die zweite, in welcher " +
      "Tonart es gerade gespielt wird; die dritte färbt die Monate.",
    "dg.zrOhneDatum":"Ohne Geburtsdatum lässt sich nicht sagen, wo du gerade stehst — die Tafel oben gilt trotzdem.",
    "dg.zrWoDuStehst":"Wo du gerade stehst",
    "dg.zrL1": (von, bis, zeichen, herr, kapitel) =>
      `<b>Das große Kapitel</b> läuft von deinem ${von} bis zum ${bis} Jahr unter ${zeichen}, ` +
      `geführt von ${herr}: ${kapitel}`,
    "dg.zrL2": (von, bis, zeichen, herr, kapitel) =>
      `<b>Darin die kleinere Periode</b>, von ${von} bis ${bis} Jahren, unter ${zeichen} und ` +
      `${herr}: ${kapitel} Sie sagt nicht, worum es geht — das sagt das große Kapitel —, sondern ` +
      `woran man es gerade merkt.`,
    "dg.zrL3": (glyph, zeichen, herr, bis, kapitel) =>
      `<b>Und darin die dritte Ebene</b>: ${glyph} ${zeichen} unter ${herr}, noch bis ${bis} ` +
      `Jahren. ${kapitel} Auf dieser Ebene geht es um Monate, nicht um Jahre — sie färbt die ` +
      `Tage, ohne das Thema zu ändern.`,
    "dg.zrEigen":"ein Kapitel eigener Art.", "dg.zrEigenKurz":"eigener Art.",
    "dg.zrMerkst":"Woran du es merkst",
    "dg.zrRolleL1": (name) => `${name} führt das große Kapitel und`,
    "dg.zrRolleL2": (name) => `${name} führt die kleinere Periode und`,
    "dg.zrNote":"Die Übergänge sind die eigentlichen Stellen: Wo eine Periode endet und die " +
      "nächste beginnt, ändert sich der Ton, oft binnen weniger Wochen. Schau in der Tafel nach, " +
      "wann das als Nächstes ansteht.",
    "dg.kurz.sonne":"Selbstbild und Rang", "dg.kurz.mond":"Gemüt und Herkunft",
    "dg.kurz.merkur":"Denken und Sprechen", "dg.kurz.venus":"Zuneigung und Geschmack",
    "dg.kurz.mars":"Antrieb und Zorn", "dg.kurz.jupiter":"Zuversicht und Maß",
    "dg.kurz.saturn":"Ernst und Grenze", "dg.kurz.asc":"Auftreten und Leib",
    "dg.kurz.mc":"Beruf und Ruf",
    "dg.azText1":"Antiszien sind Schattenzwillinge. Spiegelt man einen Grad an der " +
      "Sonnenwendachse — 0° Krebs gegenüber 0° Steinbock —, so hat der gespiegelte Punkt " +
      "dieselbe Deklination und denselben Tagbogen: Die Sonne stünde dort gleich hoch und gleich " +
      "lang am Himmel. Zwei solche Punkte sind verbunden, ohne einander zu sehen — sie bilden " +
      "keinen sichtbaren Aspekt und wirken doch aufeinander.",
    "dg.azText2":"Die alte Lesart: Das Antiszion ist die verborgene Freundschaft — zwei Kräfte " +
      "arbeiten zusammen, ohne dass es von außen erkennbar wäre. Das Kontra-Antiszion, " +
      "gespiegelt an der Tag-und-Nacht-Gleiche, gilt als die verdeckte Gegnerschaft: etwas hemmt " +
      "sich gegenseitig, und niemand sieht, woran es liegt.",
    "dg.azKeine":"In deinem Horoskop fällt kein Punkt auf den Schattenzwilling eines anderen — " +
      "nichts arbeitet hier im Verborgenen mit- oder gegeneinander. Das ist der häufigere Fall.",
    "dg.azTitelMehr":"Deine verborgenen Verbindungen", "dg.azTitelEine":"Deine verborgene Verbindung",
    "dg.azZeile": (a, b, wasA, wasB, kontra) =>
      `<b>${a} und ${b}</b> — ${wasA} trifft auf ${wasB}. ` +
      (kontra
        ? "Die beiden hemmen einander verdeckt: die Reibung ist da, aber sie zeigt sich nie dort, wo sie entsteht."
        : "Die beiden arbeiten zusammen, ohne dass man es von außen sieht; was dem einen gelingt, nützt dem anderen still."),
    "dg.azEng":"Je enger der Gradabstand, desto deutlicher. Unter einem Grad gilt die Verbindung als eng.",
    "dg.azUmgang":"Wie man damit umgeht",
    "dg.azUmgang1":"Antiszien erklären das Unerklärliche im Horoskop: eine Anziehung ohne " +
      "Aspekt, eine Hemmung, für die sich kein Grund findet, zwei Lebensbereiche, die immer " +
      "gemeinsam auftreten, obwohl sie nichts miteinander zu tun haben. Wer die Deutung eines " +
      "Horoskops nicht rundbekommt, sieht klassisch als Erstes hier nach.",
    "dg.azUmgang2":"Die Spiegelachse ist die der Sonnenwenden: 0° Krebs und 0° Steinbock, die " +
      "längste und die kürzeste Nacht. Zwei gespiegelte Grade teilen sich denselben Tagbogen — " +
      "deshalb heißt es in den alten Texten, sie hörten einander, ohne sich zu sehen. Das " +
      "Kontra-Antiszion spiegelt stattdessen an 0° Widder und 0° Waage, der Achse der " +
      "Tagundnachtgleiche; es gilt als die ungünstigere der beiden Spiegelungen.",
    "dg.azPraktisch":"Praktisch: Ein Planet auf dem Antiszion eines anderen wirkt wie eine " +
      "stille Konjunktion — man merkt sie an den Folgen, nicht an der Konstellation.",
    "pd.kopf": (profil, sekte, erster) =>
      `Für: ${profil} · ${sekte} — darum beginnt die Reihe mit ${erster}.`,
    "pd.deinFirdar":"Dein Firdar",
    "pd.spanne": (von, bis) => `${von} bis ${bis} Jahre`,
    "pd.unter": (g, name) => ` · Unterperiode ${g} ${name}`,
    "pd.verhandelt": (was) => `Was in dieser Zeit verhandelt wird: ${was}.`,
    "pd.darin": (name, was, bis) =>
      `Darin führt gerade ${name} — ${was} —, bis ${bis} Jahren. Der große Herr gibt das Thema, der kleine den Ton.`,
    "pd.durchlaufen":"Die fünfundsiebzig Jahre der Firdaria sind durchlaufen. Die Perser ließen " +
      "die Reihe danach von vorn beginnen; hier endet sie.",
    "pd.tab.herr":"Herr", "pd.tab.jahre":"Jahre", "pd.tab.von":"Von", "pd.tab.bis":"Bis",
    "pd.tab.datum":"Datum", "pd.tab.beginnt":"Beginnt", "pd.tab.maha":"Mahadasha",
    "pd.fdNote":"Fünfundsiebzig Jahre auf neun Herren, in fester Folge und fester Länge — die " +
      "Firdaria fragt weder nach Zeichen noch nach Häusern, nur danach, ob die Sonne bei der " +
      "Geburt über dem Horizont stand. Die beiden Mondknoten am Ende führen keine Unterperioden.",
    "pd.amHoroskop": (rolle, glyph, zeichen, haus, ort) =>
      `${rolle} steht bei dir in ${glyph} ${zeichen}, im ${haus} Haus — ${ort}. Dort spielt sich ab, was diese Zeit bringt.`,
    "pd.rolleFd": (name) => `${name}, der Herr dieser Jahre,`,
    "pd.vdKopf": (profil, glyph, grad, ayanamsa) =>
      `Für: ${profil} · Mond siderisch auf ${glyph} ${grad}° · Ayanamsa ${ayanamsa}°`,
    "pd.mondhaus":"Mondhaus der Geburt",
    "pd.mondhausNot": (nr, g, herr, rest) =>
      `${nr} von 27 · Herr ${g} ${herr} · bei der Geburt waren davon noch ${rest} Jahre übrig`,
    "pd.maha": (g, name, was, von, bis, datum) =>
      `<b>Mahadasha:</b> ${g} ${name} — ${was}. Von ${von} bis ${bis} Jahren, also bis ${datum}.`,
    "pd.antar": (g, name, was, datum) =>
      `<b>Antardasha:</b> ${g} ${name} — ${was}. Bis ${datum}. ` +
      `Die große Periode sagt, worum es geht; die kleine, woran man es merkt.`,
    "pd.rest":" (Rest)",
    "pd.vdNote":"Hundertzwanzig Jahre auf neun Herren. Welcher beginnt und wie viel von seiner " +
      "Zeit schon verbraucht war, hängt allein daran, wo der Mond bei der Geburt in seinen " +
      "siebenundzwanzig Häusern stand. Gerechnet wird siderisch nach Lahiri — der Ayanamsa hier " +
      "genähert, auf wenige Bogenminuten genau; bei einem Mondhaus von 13°20′ fällt das nicht ins Gewicht.",
    /* ------------------------------- Firdaria und Vimshottari */
    "fd.sonne":"Ansehen, Amt, das Hervortreten; auch der Vater",
    "fd.venus":"Bindung, Kunst, Genuss, Geld, das über Menschen kommt",
    "fd.merkur":"Lernen, Schrift, Handel, Wege, Verhandlung",
    "fd.mond":"Haus, Familie, Gemüt, Wechsel; auch die Mutter",
    "fd.saturn":"Ernst, Verzicht, Verantwortung, das Langsame und Bleibende",
    "fd.jupiter":"Erweiterung, Gönner, Recht, Reise, Zuwachs",
    "fd.mars":"Streit, Arbeit, Schnitt, Entschluss, Gefahr durch Hitze",
    "fd.kopf":"Eintritt, Zuwachs, Anschluss — eine Tür geht auf",
    "fd.schwanz":"Austritt, Abbau, Loslassen — eine Tür geht zu",
    "fd.name.kopf":"Mondknoten (aufsteigend)", "fd.name.schwanz":"Mondknoten (absteigend)",
    "vd.ketu":"Loslassen, Rückzug, das Unfertige; was man nicht mehr braucht",
    "vd.venus":"Genuss, Kunst, Bindung, Wohlstand, das Angenehme",
    "vd.sonne":"Amt, Vater, Ansehen, Selbstbehauptung",
    "vd.mond":"Mutter, Gemüt, Heim, Empfinden, Wechsel",
    "vd.mars":"Tatkraft, Streit, Geschwister, Land, Blut",
    "vd.rahu":"Hunger nach Neuem, Fremdes, Aufstieg mit Beigeschmack",
    "vd.jupiter":"Lehre, Kinder, Glaube, Segen, Weite",
    "vd.saturn":"Mühe, Dauer, Alter, Dienst, das Erarbeitete",
    "vd.merkur":"Rede, Rechnung, Handel, Verstand, Geschick",
    /* ------------------------------------------ Die Jahresumdrehung */
    "sr.wuerde.Domizil":"in eigenem Zeichen, stark",
    "sr.wuerde.Erhöhung":"erhöht, über sein Maß geachtet",
    "sr.wuerde.Exil":"im Exil, gegen den Strich arbeitend",
    "sr.wuerde.Fall":"im Fall, schwer zu seinem Recht kommend",
    "sr.wuerde.—":"ohne besondere Würde",
    "sr.kopfTitel":"Die Umdrehung dieses Jahres",
    "sr.kopfDatum": (tag, monat, jahr) => `${tag}. ${monat} ${jahr}`,
    "sr.kopfNot": (uhr, alter, bisTag, bisMonat, bisJahr) =>
      `${uhr} Weltzeit · dein ${alter}. Lebensjahr · gültig bis ${bisTag}. ${bisMonat} ${bisJahr}`,
    "sr.monate":["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    "sr.s1":"Das Geburtshoroskop stellen",
    "sr.s1Text": (ascGlyph, asc, mcGlyph, mc, herr, stand) =>
      `${ascGlyph} ${asc} steigt auf, das MC in ${mcGlyph} ${mc}. Herr des Horoskops ist ${herr}${stand}`,
    "sr.s1Stand": (glyph, zeichen, haus, wuerde) => `, in ${glyph} ${zeichen}, ${haus}. Haus, ${wuerde}.`,
    "sr.s2":"Die Sekte ansehen",
    "sr.s2Tag":"Eine <b>Taggeburt</b>: Die Sonne stand über dem Horizont. Die Partei des Tages führt — " +
      "Sonne, Jupiter und Saturn gelten hier als die gefälligeren, Mond, Venus und Mars als die fordernderen.",
    "sr.s2Nacht":"Eine <b>Nachtgeburt</b>: Die Sonne stand unter dem Horizont. Die Partei der Nacht führt — " +
      "Mond, Venus und Mars gelten hier als die gefälligeren, Sonne, Jupiter und Saturn als die fordernderen.",
    "sr.s3":"Das Zeichen des Jahres finden",
    "sr.s3Text": (asc, alter, glyph, zeichen, haus, hausOrt) =>
      `${asc} ist seit der Geburt ${alter} Zeichen weitergerückt und steht im <b>${glyph} ${zeichen}</b>. ` +
      `Damit ist dein <b>${haus}. Haus</b> das Haus des Jahres: ${hausOrt}.`,
    "sr.s4":"Den Herrn des Jahres bezeichnen",
    "sr.s4Text": (glyph, herr, natal) =>
      `Herrscher dieses Zeichens und damit <b>Herr des Jahres</b> ist ${glyph} ${herr}.${natal}`,
    "sr.s4Natal": (glyph, zeichen, haus, wuerde) =>
      ` Er steht in der Geburt in ${glyph} ${zeichen}, ${haus}. Haus, ${wuerde}.`,
    "sr.s5":"Firdar und Teilhaber bestimmen",
    "sr.s5Firdar": (herr) => `Die Firdaria gibt diese Jahre <b>${herr}</b>`,
    "sr.s5Durch":"Die Firdaria ist durchlaufen",
    "sr.s5Teilhaber": (herr) => `, und innerhalb davon führt gerade <b>${herr}</b> als Teilhaber.`,
    "sr.s5Schluss":" Der große Herr gibt das Thema, der Teilhaber den Ton.",
    "sr.rolleFirdar":"Der Firdar", "sr.rolleTeilhaber":"Der Teilhaber",
    "sr.nichtPruefbar": (rolle) => `${rolle}: nicht zu prüfen.`,
    "sr.s6":"Stehen sie winkelhaft zum Zeichen des Jahres?",
    "sr.s6Zeile": (rolle, name, nr, winkelhaft) =>
      `<b>${rolle} ${name}</b> steht im ${nr}. Zeichen vom Zeichen des Jahres aus — ` +
      (winkelhaft
        ? `<span class="srJa">winkelhaft</span>. Das ist die starke Stellung: Was er bringt, kommt an.`
        : `<span class="srNein">nicht winkelhaft</span>. Er wirkt, aber mittelbar.`),
    "sr.s7":"Sind sie mit dem Herrn des Jahres verbunden?",
    "sr.s7Ist": (rolle, name) =>
      `<b>${rolle} ${name}</b> <em>ist</em> der Herr des Jahres — die stärkste Verbindung, die es gibt.`,
    "sr.s7Zeile": (rolle, name, sicht) =>
      `<b>${rolle} ${name}</b> und der Herr des Jahres: ` +
      (sicht
        ? `<span class="srJa">${sicht}</span> — sie sehen einander, die Aussagen greifen ineinander.`
        : `<span class="srNein">in Abwendung</span> — sie sehen einander nicht; jeder spricht für sich.`),
    "sr.s8":"Ihren Zustand im Geburtshoroskop prüfen",
    "sr.s8Zeile": (g, name, glyph, zeichen, haus, hausOrt, wuerde) =>
      `<b>${g} ${name}</b>: ${glyph} ${zeichen}, ${haus}. Haus — ${hausOrt}; ${wuerde}.`,
    "sr.s9":"Ihren Zustand in der Jahresumdrehung prüfen",
    "sr.s9Asc": (asc, glyph, zeichen, haus, hausOrt) =>
      `${asc} der Umdrehung steht in ${glyph} ${zeichen} — das fällt in dein <b>${haus}. Geburtshaus</b>, ` +
      `${hausOrt}. Dort liegt in diesem Jahr der Schwerpunkt.`,
    "sr.s9Zeile": (g, name, glyph, zeichen, grad, haus, hausOrt) =>
      `<b>${g} ${name}</b>: in der Umdrehung ${glyph} ${zeichen} ${grad}°, ${haus}. Haus des Jahreshoroskops — ${hausOrt}.`,
    "sr.leer":"—",
    "sr.deutung":"Und jetzt die Deutung",
    "sr.deutungSatz": (glyph, zeichen, haus, hausOrt, herr, natal) =>
      `Das Jahr steht unter ${glyph} ${zeichen} und damit über deinem ${haus}. Haus: ${hausOrt}. ` +
      `Sein Herr ist ${herr}${natal}`,
    "sr.deutungNatal": (hausOrt) => `, der in der Geburt ${hausOrt} steht — dort wird das Thema ausgetragen.`,
    "sr.einig.firdarWinkel":"der Firdar steht winkelhaft",
    "sr.einig.teilhaberWinkel":"der Teilhaber steht winkelhaft",
    "sr.einig.firdarSieht":"der Firdar sieht den Herrn des Jahres",
    "sr.einig.teilhaberSieht":"der Teilhaber sieht ihn",
    "sr.sprechend": (liste) =>
      `Die Zeichen stimmen überein: ${liste}. Wenn Firdar, Teilhaber und Herr des Jahres einander ` +
      `sehen und winkelhaft stehen, gilt das Jahr in dieser Schule als <b>sprechend</b> — was es ` +
      `bringt, kommt deutlich und ist zu erkennen.`,
    "sr.halblaut": (eine) =>
      `Nur eine Stütze: ${eine}. Das Jahr spricht, aber halblaut — es braucht Aufmerksamkeit, ` +
      `um bemerkt zu werden.`,
    "sr.still":"Weder Firdar noch Teilhaber stehen winkelhaft zum Zeichen des Jahres, und keiner " +
      "sieht den Herrn des Jahres. Abū Maʿšar liest das als ein <b>stilles Jahr</b>: Es geschieht " +
      "etwas, aber unterhalb der Schwelle, und es zeigt sich erst später.",
    "sr.schlusswort":"Die Reihenfolge ist die der persischen Schule: erst die Geburt, dann die " +
      "Sekte, dann das Zeichen des Jahres und sein Herr, dann Firdar und Teilhaber, dann deren " +
      "Stellung — und erst ganz zuletzt die Deutung. Wer sie umdreht und mit der Deutung " +
      "anfängt, findet immer etwas, aber nicht das, was dasteht.",
    "pf.kopf": (asc, glyph, zeichen) => `${asc} (Jahr 0) — ${glyph} ${zeichen}. Ganzzeichen-Häuser.`,
    "achse.asc":"Aszendent", "achse.mc":"MC", "achse.desc":"Deszendent", "achse.ic":"IC",
    /* ----------------------------------------- Zodiacal Releasing */
    "zr.los.fortuna":"Los des Glücks", "zr.los.geist":"Los des Geistes",
    "zr.tag":"Taggeburt", "zr.nacht":"Nachtgeburt", "zr.keiner":"keiner",
    "zr.kopf": (los, glyph, zeichen, grad, tag, verdoppelt, fGlyph, fZeichen) =>
      `${los} auf ${glyph} ${zeichen} ${grad}° · ${tag} · ` +
      `natal in eigenem Zeichen (Verdopplung): ${verdoppelt} · ` +
      `Höhepunkte gemessen am Los des Glücks in ${fGlyph} ${fZeichen}`,
    "zr.alter": (n) => `Alter ${n} Jahre`,
    "zr.stand": (lvl, glyph, zeichen, herrGlyph, von, bis, zusatz) =>
      `L${lvl}: ${glyph} ${zeichen} (${herrGlyph} ${von}–${bis} J.${zusatz})`,
    "zr.verdoppelt":"verdoppelt", "zr.hoehepunkt":"Höhepunkt", "zr.loesung":"Lösung des Bandes",
    "zr.tab.stufe":"Stufe", "zr.tab.zeichen":"Zeichen", "zr.tab.herrscher":"Herrscher",
    "zr.tab.von":"Von", "zr.tab.bis":"Bis", "zr.tab.jahre":"Jahre", "zr.tab.besonderes":"Besonderes",
    "zr.markeGipfel":"▲ Höhepunkt", "zr.markeLoesung":"⟲ Lösung des Bandes",
    "zr.tabNote":"Die Tafel zeigt L1 und L2; L3 ist in der Zeitleiste sichtbar, aber hier aus Platzgründen nicht aufgeführt.",
    "zr.gipfelTitel":"Höhepunkte der Lebenskapitel",
    "zr.gipfelText":"Ein Kapitel läuft nicht gleichmäßig. Seine Gipfel sind die Perioden, deren " +
      "Zeichen zum Los des Glücks winkelhaft steht — auf ihm selbst, im vierten, siebten oder " +
      "zehnten Zeichen von ihm aus. Das sind die tätigen, sichtbaren Strecken, in denen sich " +
      "Laufbahn und Ansehen entscheiden; die übrigen Zeichen stehen in Abwendung und sind die stillen.",
    "zr.keinGipfel":"Im gewählten Altersfenster liegt keine solche Periode.",
    "zr.gipfelNote":"Die zweite Ebene gibt die großen Gipfel, die dritte die kurzen darin — " +
      "oft nur Monate, aber auf derselben winkelhaften Stellung.",
    "zr.gipfelZeile": (von, bis, glyph, zeichen, herr, stellung) =>
      `<b>L2 · ${von} – ${bis} Jahre</b>: ${glyph} ${zeichen} unter ${herr} — ${stellung}.`,
    "zr.gipfelKurz": (anzahl, naechster) =>
      `<b>L3</b>: dazu ${anzahl} kurze Gipfel auf der dritten Ebene, der nächste bei ${naechster} Jahren.`,
    "zr.vomLos.0":"auf dem Los selbst", "zr.vomLos.3":"im vierten Zeichen vom Los",
    "zr.vomLos.6":"im siebten Zeichen vom Los", "zr.vomLos.9":"im zehnten Zeichen vom Los",
    "zr.bandTitel":"Lösung des Bandes",
    "zr.bandText":"Hat eine Reihe alle zwölf Zeichen durchlaufen und ist noch Zeit übrig, kehrt " +
      "sie nicht zum Anfang zurück: Sie springt in das gegenüberliegende Zeichen und läuft von " +
      "dort weiter. Valens hält diesen Sprung — die <em>lysis tōn desmōn</em> — für einen der " +
      "wichtigsten Augenblicke einer Biographie: Das Band, das bis dahin trug, löst sich, und " +
      "das Leben setzt an anderer Stelle neu an.",
    "zr.grosseLoesung": (liste) => `<b>Die große Lösung</b> auf der ersten Ebene fällt auf ${liste}.`,
    "zr.keineGrosse":"<b>Die große Lösung</b> auf der ersten Ebene kommt in einem Menschenleben " +
      "nicht vor: Ein voller Umlauf der zwölf Zeichen dauert dort 214 Jahre. Was man erlebt, " +
      "sind die kleinen Lösungen auf den unteren Ebenen — und die sind deutlich genug.",
    "zr.keineKleine":"Im gewählten Altersfenster liegt auch keine kleine Lösung.",
    "zr.kleineTitel":"<b>Die kleinen Lösungen</b> im gewählten Fenster:",
    "zr.kleineZeile": (alter, lvl, glyph, zeichen, auchGipfel) =>
      `<b>mit ${alter} Jahren</b> auf Stufe L${lvl}: Sprung nach ${glyph} ${zeichen}` +
      (auchGipfel ? " — und das ist zugleich ein Gipfel" : "") + ".",
    "zr.jahreKurz": (n) => `${n} Jahre`,
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
    /* ------------------------------------------ Il tema */
    "hk.sekt.tag":"Una <b>nascita diurna</b>: il sole stava sopra l'orizzonte. Guida la parte del " +
      "giorno — Sole, Giove e Saturno agiscono qui più accomodanti, Luna, Venere e Marte più esigenti.",
    "hk.sekt.nacht":"Una <b>nascita notturna</b>: il sole stava sotto l'orizzonte. Guida la parte " +
      "della notte — Luna, Venere e Marte agiscono qui più accomodanti, Sole, Giove e Saturno più esigenti.",
    "hk.planetSatz": (was, art, ort) => `${was} si mostrano ${art}, ${ort}.`,
    "hk.planetWuerde": (text) => ` Il pianeta sta ${text}.`,
    "hk.geruest":"L'impianto",
    "hk.steigtAuf": (glyph, zeichen) => `sorge ${glyph} ${zeichen}`,
    "hk.geruestNot": (asc, grad, mcGlyph, mc, herr) =>
      `${asc} ${grad}° · MC ${mcGlyph} ${mc}` + (herr ? ` · signore del tema: ${herr}` : ""),
    "hk.siebenPlaneten":"I sette pianeti",
    "hk.tab.planet":"Pianeta", "hk.tab.zeichen":"Segno", "hk.tab.haus":"Casa", "hk.tab.wuerde":"Dignità",
    "hk.wasSagen":"Che cosa dicono i pianeti",
    "hk.planetKopf": (glyph, name, zGlyph, zeichen, haus) =>
      `<span class="glyph">${glyph}</span> <b>${name}</b> in ${zGlyph} ${zeichen}, ${haus} casa`,
    "hk.aspekte":"Gli aspetti più stretti",
    "hk.transitText":"Dove stanno oggi i pianeti lenti e che cosa toccano nel tuo tema. Marte " +
      "resta settimane, Giove mesi, Saturno anni — perciò qui contano solo questi tre.",
    "hk.transitZeile": (g, name, zGlyph, zeichen, ort) =>
      `<b>${g} ${name}</b> attraversa ${zGlyph} ${zeichen} — presso di te ${ort}.`,
    "hk.beruehrt":"Che cosa di ciò tocca ora il tuo tema di nascita:",
    "hk.trefferAchse": (transit, aspekt, natal, orbis, ton) =>
      `<b>${transit} ${aspekt} ${natal}</b> (${orbis}°) — è l'asse stesso a essere chiamato in causa, ${ton}.`,
    "hk.treffer": (transit, aspekt, natal, orbis, was, ton) =>
      `<b>${transit} ${aspekt} ${natal}</b> (${orbis}°) — ${was} — chiamato in causa ${ton}.`,
    "hk.keinTreffer":"In questo momento nessuno dei tre tocca il tuo tema abbastanza da vicino da meritare menzione. Un tratto quieto.",
    "hk.progression":"Progressione secondaria — il calendario interiore",
    "hk.progressionText":"Un giorno dopo la nascita vale per un anno di vita. Il sole progresso " +
      "avanza circa un grado all'anno e cambia segno ogni trent'anni; la luna progressa impiega " +
      "circa ventotto anni per l'intero cerchio. Entrambi non descrivono eventi, ma il tempo interiore.",
    "hk.progSonne": (glyph, zeichen, grad, haus, art, ort) =>
      `<b>Sole progresso</b> in ${glyph} ${zeichen} ${grad}°, ${haus} casa — a che cosa mira la ` +
      `tua volontà in questo tratto di vita: ${art}, ${ort}.`,
    "hk.progMond": (glyph, zeichen, haus, ort) =>
      `<b>Luna progressa</b> in ${glyph} ${zeichen}, ${haus} casa — a che cosa ti attieni in ` +
      `questo momento: ${ort}. Resta poco più di due anni per segno.`,
    "hk.progPhase": (phase) => `<b>Fase lunare progressa</b>: ${phase}.`,
    "pf.note":"L'anno di profezione corre di compleanno in compleanno. Come stia il signore dell'anno nel tema di nascita — ben o mal posto, in quale casa — decide quanto facilmente il tema si realizzi.",
    "pf.wirkung.sonne":"porta luce e visibilità — ciò che sta qui viene visto, anche dagli altri",
    "pf.wirkung.mond":"porta movimento e umore — qualcosa si muove, ma non si regge da sé",
    "pf.wirkung.merkur":"porta colloqui, carte e strade — qui si tratta e si scrive",
    "pf.wirkung.venus":"porta accondiscendenza e circostanze più facili — qui qualcosa si compone",
    "pf.wirkung.mars":"porta calore e decisione — qui qualcosa viene tagliato, nel bene come nel male",
    "pf.wirkung.jupiter":"porta accrescimento, protettori e margine — qui l'anno si apre",
    "pf.wirkung.saturn":"porta serietà, ritardo e peso — qui si lavora o si rinuncia",
    "pf.dauer.mond":"due giorni e mezzo", "pf.dauer.merkur":"due o tre settimane",
    "pf.dauer.venus":"poco meno di un mese", "pf.dauer.sonne":"un mese",
    "pf.dauer.mars":"un mese e mezzo", "pf.dauer.jupiter":"un anno", "pf.dauer.saturn":"due anni e mezzo",
    "pf.jahr.sonne":"Si tratta dell'essere visti. Ciò che fai avviene quest'anno davanti a testimoni — sceglili tu.",
    "pf.jahr.mond":"Un anno di mutamenti e di umori. Casa, famiglia, stati d'animo; poco resta dov'era.",
    "pf.jahr.merkur":"Un anno di trattative. Carte, strade, conversazioni; chi quest'anno tace, perde.",
    "pf.jahr.venus":"Un anno del legame e della forma. Relazioni, arte, denaro che viene tramite persone.",
    "pf.jahr.mars":"Un anno del taglio. Si decide, si litiga, si lavora; le mezze misure non reggono.",
    "pf.jahr.jupiter":"Un anno di ampliamento. Protettori, diritto, viaggio, accrescimento — e la tentazione di prendere troppo.",
    "pf.jahr.saturn":"Un anno di prova. Va lentamente, costa, e ciò che ne nasce dura a lungo.",
    "pf.text1":"Profezione significa avanzare. A ogni compleanno l'Ascendente avanza di un " +
      "segno intero — un anno, una casa. La casa su cui cade dà all'anno il suo tema; il signore " +
      "di quel segno diventa signore dell'anno. Dopo dodici anni il cerchio è chiuso e ricomincia " +
      "da capo, un piano più in alto.",
    "pf.text2":"È la tecnica annuale più parsimoniosa che esista: le bastano l'Ascendente e la " +
      "tua età. Proprio per questo è robusta — non sbaglia per un'ora di nascita imprecisa, " +
      "finché il segno dell'Ascendente è giusto.",
    "pf.ohneAngaben":"Senza dati di nascita completi la casa dell'anno non si può determinare.",
    "pf.laufend":"Il tuo anno in corso",
    "pf.laufendSatz": (alter, haus, glyph, name, herr, thema) =>
      `A ${alter} anni la tua <b>${haus} casa</b> è nell'anno, ${glyph} ${name}, e signore ` +
      `dell'anno è <b>${herr}</b>. Il tema: ${thema}.`,
    "pf.wo":"Dove l'anno ti tocca",
    "pf.rolle": (herr) => `Signore dell'anno è ${herr}; egli`,
    "pf.zusammen": (thema, herr, ort) =>
      `Leggi insieme: il tema dell'anno è ${thema}; viene portato avanti là dove ${herr} sta nel ` +
      `tuo tema — ${ort}.`,
    "pf.werZieht":"Chi attraversa in questo momento la casa dell'anno",
    "pf.werZiehtText": (glyph, name) =>
      `Il segno dell'anno è ${glyph} ${name}. Ogni pianeta che ora vi passa tocca direttamente ` +
      `il tema dell'anno — la profezione dice di che cosa si tratti, il transito dice quando si ` +
      `fa sentire.`,
    "pf.keiner":"In questo momento nessuno dei sette attraversa questo segno. Il tema dell'anno " +
      "prosegue sullo sfondo, senza essere sollecitato.",
    "pf.transitZeile": (g, name, grad, wirkung, dauer, istHerr) =>
      `<b>${g} ${name}</b> a ${grad}° — ${wirkung}. Vi resta circa ${dauer}.` +
      (istHerr ? ` <b>Ed è al tempo stesso il signore dell'anno in persona.</b>` : ""),
    "pf.herrImHaus": (thema) =>
      `<b>Il signore dell'anno attraversa esso stesso la casa dell'anno.</b> La tecnica non ` +
      `conosce annuncio più netto: ciò che quest'anno significa — ${thema} — viene al dunque ` +
      `adesso e non un giorno. Ciò che in questo tempo si comincia o si decide porta la firma ` +
      `dell'anno.`,
    "pf.herrAnderswo": (herr, glyph, zeichen, ort) =>
      `Il signore dell'anno, ${herr}, in questo momento non attraversa il segno dell'anno ma ` +
      `${glyph} ${zeichen} — presso di te ${ort}. Di là agisce sul tema dell'anno, ma per vie ` +
      `indirette: attraverso quell'ambito, non immediatamente.`,
    /* Die zwölf Kapitel des Zodiacal Releasing, nach Zeichenindex. */
    "dg.kapitel":[
      "un capitolo del cominciare. Si viene spinti prima di conoscere la strada; molto comincia, non tutto resta.",
      "un capitolo del raccogliere. Lento, concreto, volto al possesso e alla sicurezza — e difficile da rimettere in moto.",
      "un capitolo delle strade e delle parole. Molti contatti, molto apprendere, molto andirivieni; l'arte è portarne a termine qualcosa.",
      "un capitolo della casa. Origine, famiglia, dimora e animo stanno in primo piano; l'interno decide dell'esterno.",
      "un capitolo del farsi avanti. Si è visti, interpellati, richiesti — e si deve imparare a reggere l'attenzione.",
      "un capitolo del lavoro e dell'ordine. Servizio, salute, artigianato, il minuto; senza clamore e portante.",
      "un capitolo degli altri. Matrimonio, patti, compensazione, anche inimicizia dichiarata; poco si decide da soli.",
      "un capitolo della profondità. Ciò che è nascosto viene a galla, i legami si fanno seri, perdite ed eredità pesano.",
      "un capitolo dell'ampiezza. Terra straniera, dottrina, fede, diritto; l'orizzonte si allontana, se occorre andandosene.",
      "un capitolo della costruzione. Carica, responsabilità, costanza; si avanza lentamente e poi si resta.",
      "un capitolo delle alleanze. Amicizie, gruppi, imprese che vanno oltre se stessi; si appartiene e tuttavia si sta accanto.",
      "un capitolo del dissolversi. Ritiro, compassione, sogno, anche confusione; il vecchio finisce prima che il nuovo abbia forma."
    ],
    /* --------------------------- Letture accanto ad arco, ZR e antiscia */
    "dg.wuerde.Domizil":"nel proprio segno e dunque forte",
    "dg.wuerde.Erhöhung":"esaltato e dunque stimato oltre la propria misura",
    "dg.wuerde.Exil":"in esilio e dunque costretto a lavorare controcorrente",
    "dg.wuerde.Fall":"in caduta e dunque a fatica riconosciuto",
    "dg.wuerde.—":"senza dignità particolare",
    "dg.konkret": (rolle, glyph, zeichen, haus, ort, wuerde) =>
      `${rolle} sta presso di te in ${glyph} ${zeichen}, nella ${haus} casa — ${ort} —, e ` +
      `precisamente ${wuerde}. Lì si mostrerà ciò che questo tempo porta.`,
    "dg.wasHeisst":"Che cosa significa",
    "dg.pr.sonne":"visibilità — carica, riconoscimento, il farsi avanti davanti agli altri; e il conto che ne viene",
    "dg.pr.mond":"il domestico e il mobile — dimora, famiglia, animo, un mutamento che comincia da dentro",
    "dg.pr.merkur":"carta e parola — contratti, scrittura, commercio, apprendere, strade percorse più volte",
    "dg.pr.venus":"legame e compiacimento — affetto, arte, denaro che viene facile, riconciliazione",
    "dg.pr.mars":"il taglio — lavoro, lite, decisione, separazione; ciò che non aspetta più",
    "dg.pr.jupiter":"ampliamento — diritto, protettori, viaggio, considerazione; e il rischio di prendersi troppo",
    "dg.pr.saturn":"serietà — responsabilità, rinuncia, prova, ciò che resta; ciò che chiede tempo e dà tempo",
    "dg.pr.mc":"avanza l'asse della carica stessa: la posizione nel mondo si riordina",
    "dg.pr.asc":"avanza l'asse della persona stessa: corpo, presenza e immagine di sé si riordinano",
    "dg.pr.sonst": (name) => `il tema di ${name}`,
    "dg.sg.mc":"nel mestiere e nella reputazione",
    "dg.sg.ic":"nella casa, nell'origine e presso le radici",
    "dg.sg.asc":"nel proprio corpo e nel modo di presentarsi",
    "dg.sg.desc":"presso l'altro — matrimonio, patti, avversari dichiarati",
    "dg.sg.sonst": (name) => `presso ${name}`,
    "dg.ton.Konjunktion":"di colpo e senza giri",
    "dg.ton.Quadrat":"con attrito, contro una resistenza",
    "dg.ton.Opposition":"da fuori, tramite un'altra persona",
    "dg.ton.Trigon":"con facilità, quasi da sé",
    "dg.ton.Sextil":"come occasione che va colta",
    "dg.lbText":"Le direzioni primarie non misurano che cosa accada, ma quando una cosa venga a " +
      "scadenza. Il cielo continua a girare dopo la nascita; un grado di questa rotazione vale " +
      "un anno di vita. Dove un pianeta incontra un asse, il suo tema bussa — se si apra, è un " +
      "altro discorso.",
    "dg.lbLeer":"Nella finestra d'età scelta non ti sta più nulla davanti.",
    "dg.lbTitelMehr":"Le prossime scadenze", "dg.lbTitelEine":"La prossima scadenza",
    "dg.wannJahre": (n) => `a ${n} anni`,
    "dg.wannJetzt":"proprio adesso",
    "dg.wannMonate": (n) => `fra circa ${n} mesi`,
    "dg.wannGut": (n) => `fra circa ${n} anni`,
    "dg.lbZeile": (wann, alter, was, wo, ton) => `<b>${wann}</b> (a ${alter}): ${was} — ${wo}, ${ton}.`,
    "dg.lbAnklopft":"Che cosa bussa esattamente",
    "dg.lbRolle": (name) => `${name} porta la prossima direzione e`,
    "dg.lbNote":"Una direzione è una data, non un verdetto. Due persone con la stessa data " +
      "vivono cose diverse — la domanda è sempre che cosa fosse già pronto a quel momento.",
    "dg.zrText":"Lo Zodiacal Releasing divide la vita in capitoli, non in eventi. Dalla Sorte " +
      "della Fortuna si contano periodi segno per segno, ciascuno lungo quanto gli anni del suo " +
      "signore. Il primo livello dice di che cosa si tratti lungo gli anni; il secondo, in quale " +
      "tonalità lo si stia suonando; il terzo colora i mesi.",
    "dg.zrOhneDatum":"Senza data di nascita non si può dire dove tu stia adesso — la tavola sopra vale comunque.",
    "dg.zrWoDuStehst":"Dove stai adesso",
    "dg.zrL1": (von, bis, zeichen, herr, kapitel) =>
      `<b>Il grande capitolo</b> corre dal tuo ${von} al ${bis} anno sotto ${zeichen}, ` +
      `condotto da ${herr}: ${kapitel}`,
    "dg.zrL2": (von, bis, zeichen, herr, kapitel) =>
      `<b>Dentro, il periodo minore</b>, da ${von} a ${bis} anni, sotto ${zeichen} e ${herr}: ` +
      `${kapitel} Non dice di che cosa si tratti — questo lo dice il grande capitolo — ma da che ` +
      `cosa lo si noti adesso.`,
    "dg.zrL3": (glyph, zeichen, herr, bis, kapitel) =>
      `<b>E dentro, il terzo livello</b>: ${glyph} ${zeichen} sotto ${herr}, ancora fino ai ` +
      `${bis} anni. ${kapitel} A questo livello si tratta di mesi, non di anni — colora i giorni ` +
      `senza cambiare il tema.`,
    "dg.zrEigen":"un capitolo di natura propria.", "dg.zrEigenKurz":"di natura propria.",
    "dg.zrMerkst":"Da che cosa lo noti",
    "dg.zrRolleL1": (name) => `${name} conduce il grande capitolo e`,
    "dg.zrRolleL2": (name) => `${name} conduce il periodo minore e`,
    "dg.zrNote":"I passaggi sono i punti veri: dove un periodo finisce e comincia il successivo, " +
      "il tono cambia, spesso nel giro di poche settimane. Guarda nella tavola quando capita la " +
      "prossima volta.",
    "dg.kurz.sonne":"immagine di sé e rango", "dg.kurz.mond":"animo e origine",
    "dg.kurz.merkur":"pensare e parlare", "dg.kurz.venus":"affetto e gusto",
    "dg.kurz.mars":"impulso e collera", "dg.kurz.jupiter":"fiducia e misura",
    "dg.kurz.saturn":"serietà e limite", "dg.kurz.asc":"presenza e corpo",
    "dg.kurz.mc":"mestiere e reputazione",
    "dg.azText1":"Gli antiscia sono gemelli d'ombra. Se si specchia un grado sull'asse dei " +
      "solstizi — 0° Cancro contro 0° Capricorno —, il punto specchiato ha la stessa " +
      "declinazione e lo stesso arco diurno: il sole vi starebbe ugualmente alto e ugualmente a " +
      "lungo in cielo. Due punti simili sono legati senza vedersi — non formano alcun aspetto " +
      "visibile e tuttavia agiscono l'uno sull'altro.",
    "dg.azText2":"La lettura antica: l'antiscio è l'amicizia nascosta — due forze lavorano " +
      "insieme senza che da fuori lo si riconosca. Il contrantiscio, specchiato sull'equinozio, " +
      "vale come l'inimicizia coperta: qualcosa si ostacola, e nessuno vede da che cosa dipenda.",
    "dg.azKeine":"Nel tuo tema nessun punto cade sul gemello d'ombra di un altro — qui nulla " +
      "lavora con o contro altro nel nascosto. È il caso più frequente.",
    "dg.azTitelMehr":"I tuoi legami nascosti", "dg.azTitelEine":"Il tuo legame nascosto",
    "dg.azZeile": (a, b, wasA, wasB, kontra) =>
      `<b>${a} e ${b}</b> — ${wasA} incontra ${wasB}. ` +
      (kontra
        ? "I due si ostacolano di nascosto: l'attrito c'è, ma non si mostra mai dove nasce."
        : "I due lavorano insieme senza che da fuori lo si veda; ciò che riesce all'uno giova in silenzio all'altro."),
    "dg.azEng":"Quanto più stretta la distanza in gradi, tanto più netto. Sotto un grado il legame vale come stretto.",
    "dg.azUmgang":"Come comportarsi",
    "dg.azUmgang1":"Gli antiscia spiegano l'inspiegabile nel tema: un'attrazione senza aspetto, " +
      "un impedimento di cui non si trova la ragione, due ambiti di vita che compaiono sempre " +
      "insieme pur non avendo nulla in comune. Chi non riesce a far tornare la lettura di un " +
      "tema, classicamente guarda prima qui.",
    "dg.azUmgang2":"L'asse specchio è quello dei solstizi: 0° Cancro e 0° Capricorno, la notte " +
      "più lunga e la più corta. Due gradi specchiati condividono lo stesso arco diurno — per " +
      "questo i testi antichi dicono che si odono senza vedersi. Il contrantiscio specchia " +
      "invece su 0° Ariete e 0° Bilancia, l'asse dell'equinozio; vale come la meno favorevole " +
      "delle due specchiature.",
    "dg.azPraktisch":"In pratica: un pianeta sull'antiscio di un altro agisce come una " +
      "congiunzione silenziosa — la si nota dalle conseguenze, non dalla configurazione.",
    "pd.kopf": (profil, sekte, erster) =>
      `Per: ${profil} · ${sekte} — perciò la serie comincia con ${erster}.`,
    "pd.deinFirdar":"Il tuo firdar",
    "pd.spanne": (von, bis) => `da ${von} a ${bis} anni`,
    "pd.unter": (g, name) => ` · sottoperiodo ${g} ${name}`,
    "pd.verhandelt": (was) => `Ciò che si tratta in questo tempo: ${was}.`,
    "pd.darin": (name, was, bis) =>
      `Dentro conduce ora ${name} — ${was} —, fino ai ${bis} anni. Il grande signore dà il tema, il piccolo il tono.`,
    "pd.durchlaufen":"I settantacinque anni della firdaria sono conclusi. I persiani facevano " +
      "ricominciare la serie da capo; qui finisce.",
    "pd.tab.herr":"Signore", "pd.tab.jahre":"Anni", "pd.tab.von":"Da", "pd.tab.bis":"A",
    "pd.tab.datum":"Data", "pd.tab.beginnt":"Comincia", "pd.tab.maha":"Mahadasha",
    "pd.fdNote":"Settantacinque anni su nove signori, in ordine e durata fissi — la firdaria " +
      "non chiede né segni né case, solo se il sole alla nascita stesse sopra l'orizzonte. I due " +
      "nodi lunari alla fine non hanno sottoperiodi.",
    "pd.amHoroskop": (rolle, glyph, zeichen, haus, ort) =>
      `${rolle} sta presso di te in ${glyph} ${zeichen}, nella ${haus} casa — ${ort}. Lì si svolge ciò che questo tempo porta.`,
    "pd.rolleFd": (name) => `${name}, signore di questi anni,`,
    "pd.vdKopf": (profil, glyph, grad, ayanamsa) =>
      `Per: ${profil} · Luna siderale a ${glyph} ${grad}° · Ayanamsa ${ayanamsa}°`,
    "pd.mondhaus":"Casa lunare della nascita",
    "pd.mondhausNot": (nr, g, herr, rest) =>
      `${nr} di 27 · signore ${g} ${herr} · alla nascita ne restavano ancora ${rest} anni`,
    "pd.maha": (g, name, was, von, bis, datum) =>
      `<b>Mahadasha:</b> ${g} ${name} — ${was}. Da ${von} a ${bis} anni, dunque fino al ${datum}.`,
    "pd.antar": (g, name, was, datum) =>
      `<b>Antardasha:</b> ${g} ${name} — ${was}. Fino al ${datum}. ` +
      `Il periodo grande dice di che cosa si tratti; il piccolo, da che cosa lo si noti.`,
    "pd.rest":" (resto)",
    "pd.vdNote":"Centoventi anni su nove signori. Quale cominci e quanto del suo tempo fosse " +
      "già consumato dipende unicamente da dove stesse la luna alla nascita fra le sue " +
      "ventisette case. Si calcola siderale secondo Lahiri — l'ayanamsa qui approssimato, " +
      "esatto a pochi primi d'arco; con una casa lunare di 13°20′ non ha peso.",
    /* ------------------------------- Firdaria e Vimshottari */
    "fd.sonne":"considerazione, carica, il farsi avanti; anche il padre",
    "fd.venus":"legame, arte, piacere, denaro che viene tramite persone",
    "fd.merkur":"apprendere, scrittura, commercio, strade, trattativa",
    "fd.mond":"casa, famiglia, animo, mutamento; anche la madre",
    "fd.saturn":"serietà, rinuncia, responsabilità, ciò che è lento e duraturo",
    "fd.jupiter":"ampliamento, protettori, diritto, viaggio, accrescimento",
    "fd.mars":"lite, lavoro, taglio, decisione, pericolo per il calore",
    "fd.kopf":"ingresso, accrescimento, aggregazione — una porta si apre",
    "fd.schwanz":"uscita, riduzione, lasciar andare — una porta si chiude",
    "fd.name.kopf":"Nodo lunare (ascendente)", "fd.name.schwanz":"Nodo lunare (discendente)",
    "vd.ketu":"lasciar andare, ritiro, l'incompiuto; ciò di cui non si ha più bisogno",
    "vd.venus":"piacere, arte, legame, benessere, ciò che è gradevole",
    "vd.sonne":"carica, padre, considerazione, affermazione di sé",
    "vd.mond":"madre, animo, casa, sentire, mutamento",
    "vd.mars":"energia, lite, fratelli, terra, sangue",
    "vd.rahu":"fame di nuovo, l'estraneo, ascesa con retrogusto",
    "vd.jupiter":"dottrina, figli, fede, benedizione, ampiezza",
    "vd.saturn":"fatica, durata, vecchiaia, servizio, ciò che si è guadagnato",
    "vd.merkur":"parola, calcolo, commercio, intelletto, destrezza",
    /* ------------------------------------------ La rivoluzione solare */
    "sr.wuerde.Domizil":"nel proprio segno, forte",
    "sr.wuerde.Erhöhung":"esaltato, stimato oltre la propria misura",
    "sr.wuerde.Exil":"in esilio, costretto a lavorare controcorrente",
    "sr.wuerde.Fall":"in caduta, a fatica riconosciuto",
    "sr.wuerde.—":"senza dignità particolare",
    "sr.kopfTitel":"La rivoluzione di quest'anno",
    "sr.kopfDatum": (tag, monat, jahr) => `${tag} ${monat} ${jahr}`,
    "sr.kopfNot": (uhr, alter, bisTag, bisMonat, bisJahr) =>
      `${uhr} tempo universale · il tuo ${alter}º anno di vita · valido fino al ${bisTag} ${bisMonat} ${bisJahr}`,
    "sr.monate":["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"],
    "sr.s1":"Erigere il tema di nascita",
    "sr.s1Text": (ascGlyph, asc, mcGlyph, mc, herr, stand) =>
      `${ascGlyph} ${asc} sorge, il MC in ${mcGlyph} ${mc}. Signore del tema è ${herr}${stand}`,
    "sr.s1Stand": (glyph, zeichen, haus, wuerde) => `, in ${glyph} ${zeichen}, ${haus}ª casa, ${wuerde}.`,
    "sr.s2":"Osservare la setta",
    "sr.s2Tag":"Una <b>nascita diurna</b>: il sole stava sopra l'orizzonte. Guida la parte del giorno — " +
      "Sole, Giove e Saturno valgono qui come i più accomodanti, Luna, Venere e Marte come i più esigenti.",
    "sr.s2Nacht":"Una <b>nascita notturna</b>: il sole stava sotto l'orizzonte. Guida la parte della notte — " +
      "Luna, Venere e Marte valgono qui come i più accomodanti, Sole, Giove e Saturno come i più esigenti.",
    "sr.s3":"Trovare il segno dell'anno",
    "sr.s3Text": (asc, alter, glyph, zeichen, haus, hausOrt) =>
      `L'${asc} è avanzato di ${alter} segni dalla nascita e sta in <b>${glyph} ${zeichen}</b>. ` +
      `Così la tua <b>${haus}ª casa</b> è la casa dell'anno: ${hausOrt}.`,
    "sr.s4":"Designare il signore dell'anno",
    "sr.s4Text": (glyph, herr, natal) =>
      `Signore di questo segno, e dunque <b>signore dell'anno</b>, è ${glyph} ${herr}.${natal}`,
    "sr.s4Natal": (glyph, zeichen, haus, wuerde) =>
      ` Nella nascita sta in ${glyph} ${zeichen}, ${haus}ª casa, ${wuerde}.`,
    "sr.s5":"Determinare il firdar e il compagno",
    "sr.s5Firdar": (herr) => `La firdaria affida questi anni a <b>${herr}</b>`,
    "sr.s5Durch":"La firdaria è conclusa",
    "sr.s5Teilhaber": (herr) => `, e al loro interno conduce in questo momento <b>${herr}</b> come compagno.`,
    "sr.s5Schluss":" Il grande signore dà il tema, il compagno il tono.",
    "sr.rolleFirdar":"Il firdar", "sr.rolleTeilhaber":"Il compagno",
    "sr.nichtPruefbar": (rolle) => `${rolle}: non verificabile.`,
    "sr.s6":"Stanno angolari al segno dell'anno?",
    "sr.s6Zeile": (rolle, name, nr, winkelhaft) =>
      `<b>${rolle} ${name}</b> sta nel ${nr}º segno a partire dal segno dell'anno — ` +
      (winkelhaft
        ? `<span class="srJa">angolare</span>. È la posizione forte: ciò che porta arriva.`
        : `<span class="srNein">non angolare</span>. Agisce, ma per vie indirette.`),
    "sr.s7":"Sono legati al signore dell'anno?",
    "sr.s7Ist": (rolle, name) =>
      `<b>${rolle} ${name}</b> <em>è</em> il signore dell'anno — il legame più forte che esista.`,
    "sr.s7Zeile": (rolle, name, sicht) =>
      `<b>${rolle} ${name}</b> e il signore dell'anno: ` +
      (sicht
        ? `<span class="srJa">${sicht}</span> — si vedono, e le indicazioni si incastrano.`
        : `<span class="srNein">in avversione</span> — non si vedono; ciascuno parla per sé.`),
    "sr.s8":"Verificare il loro stato nel tema di nascita",
    "sr.s8Zeile": (g, name, glyph, zeichen, haus, hausOrt, wuerde) =>
      `<b>${g} ${name}</b>: ${glyph} ${zeichen}, ${haus}ª casa — ${hausOrt}; ${wuerde}.`,
    "sr.s9":"Verificare il loro stato nella rivoluzione",
    "sr.s9Asc": (asc, glyph, zeichen, haus, hausOrt) =>
      `L'${asc} della rivoluzione sta in ${glyph} ${zeichen} — e cade nella tua <b>${haus}ª casa ` +
      `natale</b>, ${hausOrt}. Lì sta quest'anno il baricentro.`,
    "sr.s9Zeile": (g, name, glyph, zeichen, grad, haus, hausOrt) =>
      `<b>${g} ${name}</b>: nella rivoluzione ${glyph} ${zeichen} ${grad}°, ${haus}ª casa del tema annuale — ${hausOrt}.`,
    "sr.leer":"—",
    "sr.deutung":"E ora la lettura",
    "sr.deutungSatz": (glyph, zeichen, haus, hausOrt, herr, natal) =>
      `L'anno sta sotto ${glyph} ${zeichen} e dunque sopra la tua ${haus}ª casa: ${hausOrt}. ` +
      `Il suo signore è ${herr}${natal}`,
    "sr.deutungNatal": (hausOrt) => `, che nella nascita sta ${hausOrt} — lì il tema viene portato avanti.`,
    "sr.einig.firdarWinkel":"il firdar sta angolare",
    "sr.einig.teilhaberWinkel":"il compagno sta angolare",
    "sr.einig.firdarSieht":"il firdar vede il signore dell'anno",
    "sr.einig.teilhaberSieht":"il compagno lo vede",
    "sr.sprechend": (liste) =>
      `I segni concordano: ${liste}. Quando firdar, compagno e signore dell'anno si vedono e ` +
      `stanno angolari, questa scuola considera l'anno <b>parlante</b> — ciò che porta arriva ` +
      `chiaro e si lascia riconoscere.`,
    "sr.halblaut": (eine) =>
      `Un solo sostegno: ${eine}. L'anno parla, ma a mezza voce — ci vuole attenzione per accorgersene.`,
    "sr.still":"Né il firdar né il compagno stanno angolari al segno dell'anno, e nessuno dei due " +
      "vede il signore dell'anno. Abū Maʿšar lo legge come un <b>anno silenzioso</b>: qualcosa " +
      "accade, ma sotto la soglia, e si mostra solo più tardi.",
    "sr.schlusswort":"L'ordine è quello della scuola persiana: prima la nascita, poi la setta, " +
      "poi il segno dell'anno e il suo signore, poi firdar e compagno, poi la loro posizione — " +
      "e solo alla fine la lettura. Chi la rovescia e comincia dalla lettura trova sempre " +
      "qualcosa, ma non ciò che è scritto.",
    "pf.kopf": (asc, glyph, zeichen) => `${asc} (anno 0) — ${glyph} ${zeichen}. Case di segno intero.`,
    "achse.asc":"Ascendente", "achse.mc":"MC", "achse.desc":"Discendente", "achse.ic":"IC",
    /* ----------------------------------------- Zodiacal Releasing */
    "zr.los.fortuna":"Sorte della Fortuna", "zr.los.geist":"Sorte dello Spirito",
    "zr.tag":"nascita diurna", "zr.nacht":"nascita notturna", "zr.keiner":"nessuno",
    "zr.kopf": (los, glyph, zeichen, grad, tag, verdoppelt, fGlyph, fZeichen) =>
      `${los} a ${glyph} ${zeichen} ${grad}° · ${tag} · ` +
      `natale nel proprio segno (raddoppio): ${verdoppelt} · ` +
      `culmini misurati sulla Sorte della Fortuna in ${fGlyph} ${fZeichen}`,
    "zr.alter": (n) => `Età ${n} anni`,
    "zr.stand": (lvl, glyph, zeichen, herrGlyph, von, bis, zusatz) =>
      `L${lvl}: ${glyph} ${zeichen} (${herrGlyph} ${von}–${bis} a.${zusatz})`,
    "zr.verdoppelt":"raddoppiato", "zr.hoehepunkt":"culmine", "zr.loesung":"scioglimento del legame",
    "zr.tab.stufe":"Livello", "zr.tab.zeichen":"Segno", "zr.tab.herrscher":"Signore",
    "zr.tab.von":"Da", "zr.tab.bis":"A", "zr.tab.jahre":"Anni", "zr.tab.besonderes":"Particolarità",
    "zr.markeGipfel":"▲ culmine", "zr.markeLoesung":"⟲ scioglimento del legame",
    "zr.tabNote":"La tavola mostra L1 e L2; L3 è visibile nella linea del tempo, ma qui non è riportata per ragioni di spazio.",
    "zr.gipfelTitel":"I culmini dei capitoli della vita",
    "zr.gipfelText":"Un capitolo non scorre uniforme. I suoi culmini sono i periodi il cui " +
      "segno sta angolare rispetto alla Sorte della Fortuna — su di essa stessa, nel quarto, " +
      "settimo o decimo segno a partire da essa. Sono i tratti attivi e visibili, in cui si " +
      "decidono carriera e reputazione; gli altri segni stanno in avversione e sono i quieti.",
    "zr.keinGipfel":"Nella finestra d'età scelta non cade alcun periodo di questo genere.",
    "zr.gipfelNote":"Il secondo livello dà i grandi culmini, il terzo quelli brevi al loro " +
      "interno — spesso solo mesi, ma sulla stessa posizione angolare.",
    "zr.gipfelZeile": (von, bis, glyph, zeichen, herr, stellung) =>
      `<b>L2 · ${von} – ${bis} anni</b>: ${glyph} ${zeichen} sotto ${herr} — ${stellung}.`,
    "zr.gipfelKurz": (anzahl, naechster) =>
      `<b>L3</b>: in più ${anzahl} culmini brevi sul terzo livello, il prossimo a ${naechster} anni.`,
    "zr.vomLos.0":"sulla Sorte stessa", "zr.vomLos.3":"nel quarto segno dalla Sorte",
    "zr.vomLos.6":"nel settimo segno dalla Sorte", "zr.vomLos.9":"nel decimo segno dalla Sorte",
    "zr.bandTitel":"Lo scioglimento del legame",
    "zr.bandText":"Se una serie ha percorso tutti e dodici i segni e resta ancora tempo, non " +
      "torna all'inizio: salta nel segno opposto e prosegue di là. Valente tiene questo salto " +
      "— la <em>lysis tōn desmōn</em> — per uno dei momenti più importanti di una biografia: " +
      "il legame che fino allora reggeva si scioglie, e la vita riparte da un altro punto.",
    "zr.grosseLoesung": (liste) => `<b>Il grande scioglimento</b> sul primo livello cade a ${liste}.`,
    "zr.keineGrosse":"<b>Il grande scioglimento</b> sul primo livello non ricorre in una vita " +
      "umana: un giro completo dei dodici segni dura là 214 anni. Ciò che si vive sono i piccoli " +
      "scioglimenti sui livelli inferiori — e sono abbastanza netti.",
    "zr.keineKleine":"Nella finestra d'età scelta non cade nemmeno un piccolo scioglimento.",
    "zr.kleineTitel":"<b>I piccoli scioglimenti</b> nella finestra scelta:",
    "zr.kleineZeile": (alter, lvl, glyph, zeichen, auchGipfel) =>
      `<b>a ${alter} anni</b> sul livello L${lvl}: salto verso ${glyph} ${zeichen}` +
      (auchGipfel ? " — ed è al tempo stesso un culmine" : "") + ".",
    "zr.jahreKurz": (n) => `${n} anni`,
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
    /* ------------------------------------------ The chart */
    "hk.sekt.tag":"A <b>day birth</b>: the sun stood above the horizon. The party of the day leads " +
      "— Sun, Jupiter and Saturn work here more agreeably, Moon, Venus and Mars more demandingly.",
    "hk.sekt.nacht":"A <b>night birth</b>: the sun stood below the horizon. The party of the night " +
      "leads — Moon, Venus and Mars work here more agreeably, Sun, Jupiter and Saturn more demandingly.",
    "hk.planetSatz": (was, art, ort) => `${was} show themselves ${art}, ${ort}.`,
    "hk.planetWuerde": (text) => ` The planet stands ${text}.`,
    "hk.geruest":"The frame",
    "hk.steigtAuf": (glyph, zeichen) => `${glyph} ${zeichen} is rising`,
    "hk.geruestNot": (asc, grad, mcGlyph, mc, herr) =>
      `${asc} ${grad}° · MC ${mcGlyph} ${mc}` + (herr ? ` · lord of the chart: ${herr}` : ""),
    "hk.siebenPlaneten":"The seven planets",
    "hk.tab.planet":"Planet", "hk.tab.zeichen":"Sign", "hk.tab.haus":"House", "hk.tab.wuerde":"Dignity",
    "hk.wasSagen":"What the planets say",
    "hk.planetKopf": (glyph, name, zGlyph, zeichen, haus) =>
      `<span class="glyph">${glyph}</span> <b>${name}</b> in ${zGlyph} ${zeichen}, ${haus} house`,
    "hk.aspekte":"The closest aspects",
    "hk.transitText":"Where the slow planets stand today and what they touch in your chart. Mars " +
      "stays for weeks, Jupiter for months, Saturn for years — which is why only these three count here.",
    "hk.transitZeile": (g, name, zGlyph, zeichen, ort) =>
      `<b>${g} ${name}</b> is running through ${zGlyph} ${zeichen} — with you ${ort}.`,
    "hk.beruehrt":"What of that is touching your birth chart just now:",
    "hk.trefferAchse": (transit, aspekt, natal, orbis, ton) =>
      `<b>${transit} ${aspekt} ${natal}</b> (${orbis}°) — the axis itself is addressed, ${ton}.`,
    "hk.treffer": (transit, aspekt, natal, orbis, was, ton) =>
      `<b>${transit} ${aspekt} ${natal}</b> (${orbis}°) — ${was} — addressed ${ton}.`,
    "hk.keinTreffer":"At present none of the three touches your chart closely enough to be worth naming. A quiet stretch.",
    "hk.progression":"Secondary progression — the inner calendar",
    "hk.progressionText":"One day after the birth counts for one year of life. The progressed sun " +
      "moves on about one degree a year and changes sign every thirty years; the progressed moon " +
      "needs some twenty-eight years for the whole circle. Neither describes events, but the inner weather.",
    "hk.progSonne": (glyph, zeichen, grad, haus, art, ort) =>
      `<b>Progressed sun</b> in ${glyph} ${zeichen} ${grad}°, ${haus} house — what your will is ` +
      `aiming at in this stretch of life: ${art}, ${ort}.`,
    "hk.progMond": (glyph, zeichen, haus, ort) =>
      `<b>Progressed moon</b> in ${glyph} ${zeichen}, ${haus} house — what you are dwelling on ` +
      `just now: ${ort}. It stays a good two years to a sign.`,
    "hk.progPhase": (phase) => `<b>Progressed lunar phase</b>: ${phase}.`,
    "pf.note":"The profection year runs from birthday to birthday. How the lord of the year stands in the birth chart — well or badly placed, in which house — decides how easily the theme comes good.",
    "pf.wirkung.sonne":"brings light and visibility — what lies here is seen, by others too",
    "pf.wirkung.mond":"brings movement and mood — something stirs, but does not hold of itself",
    "pf.wirkung.merkur":"brings conversations, papers and roads — here things are negotiated and written",
    "pf.wirkung.venus":"brings accommodation and easier circumstances — here something is settled amicably",
    "pf.wirkung.mars":"brings heat and decision — here something is cut through, for good or ill",
    "pf.wirkung.jupiter":"brings increase, patrons and room — here the year opens up",
    "pf.wirkung.saturn":"brings seriousness, delay and weight — here one works or goes without",
    "pf.dauer.mond":"two and a half days", "pf.dauer.merkur":"two to three weeks",
    "pf.dauer.venus":"barely a month", "pf.dauer.sonne":"a month",
    "pf.dauer.mars":"a month and a half", "pf.dauer.jupiter":"a year", "pf.dauer.saturn":"two and a half years",
    "pf.jahr.sonne":"It is about being seen. What you do happens this year before witnesses — choose your witnesses.",
    "pf.jahr.mond":"A year of changes and of temper. Dwelling, family, moods; little stays where it was.",
    "pf.jahr.merkur":"A year of negotiations. Paper, roads, conversations; whoever keeps silent this year loses.",
    "pf.jahr.venus":"A year of attachment and of form. Relationships, art, money that comes by way of people.",
    "pf.jahr.mars":"A year of the cut. Things are decided, fought over, worked at; half measures do not hold.",
    "pf.jahr.jupiter":"A year of widening. Patrons, law, travel, increase — and the temptation to take too much.",
    "pf.jahr.saturn":"A year of testing. It goes slowly, it costs, and what comes of it lasts a long time.",
    "pf.text1":"Profection means moving forward. With every birthday the Ascendant travels on by " +
      "a whole sign — one year, one house. The house it falls on gives the year its theme; the " +
      "ruler of that sign becomes the lord of the year. After twelve years the circle is closed " +
      "and begins again, one storey higher.",
    "pf.text2":"It is the most frugal annual technique there is: it needs only the Ascendant and " +
      "your age. That is exactly why it is robust — it does not go wrong on an imprecise hour of " +
      "birth, as long as the sign of the Ascendant is right.",
    "pf.ohneAngaben":"Without complete birth data the house of the year cannot be determined.",
    "pf.laufend":"Your current year",
    "pf.laufendSatz": (alter, haus, glyph, name, herr, thema) =>
      `At ${alter} your <b>${haus} house</b> is in the year, ${glyph} ${name}, and the lord of ` +
      `the year is <b>${herr}</b>. The theme: ${thema}.`,
    "pf.wo":"Where the year meets you",
    "pf.rolle": (herr) => `The lord of the year is ${herr}; it`,
    "pf.zusammen": (thema, herr, ort) =>
      `Read the two together: the theme of the year is ${thema}; it is played out where ${herr} ` +
      `stands in your chart — ${ort}.`,
    "pf.werZieht":"Who is passing through the house of the year just now",
    "pf.werZiehtText": (glyph, name) =>
      `The sign of the year is ${glyph} ${name}. Every planet passing through it now touches the ` +
      `theme of the year directly — the profection says what it is about, the transit says when ` +
      `it makes itself heard.`,
    "pf.keiner":"At present none of the seven is passing through this sign. The theme of the " +
      "year runs on in the background without being prompted just now.",
    "pf.transitZeile": (g, name, grad, wirkung, dauer, istHerr) =>
      `<b>${g} ${name}</b> at ${grad}° — ${wirkung}. It stays there about ${dauer}.` +
      (istHerr ? ` <b>And that is at the same time the lord of the year itself.</b>` : ""),
    "pf.herrImHaus": (thema) =>
      `<b>The lord of the year is itself passing through the house of the year.</b> The ` +
      `technique knows hardly a plainer announcement: what this year means — ${thema} — comes to ` +
      `the point now and not some day. Whatever is begun or decided in this time carries the ` +
      `hand of the year.`,
    "pf.herrAnderswo": (herr, glyph, zeichen, ort) =>
      `The lord of the year, ${herr}, is at present not passing through the sign of the year but ` +
      `through ${glyph} ${zeichen} — with you ${ort}. From there it works on the theme of the ` +
      `year, but indirectly: by way of that area, not immediately.`,
    /* Die zwölf Kapitel des Zodiacal Releasing, nach Zeichenindex. */
    "dg.kapitel":[
      "a chapter of beginning. One is pushed before one knows the way; much begins, not all of it stays.",
      "a chapter of gathering. Slow, tangible, bent on property and security — and hard to set moving again.",
      "a chapter of roads and words. Many contacts, much learning, much to and fro; the art is to finish something of it.",
      "a chapter of the house. Origin, family, dwelling and temper come to the front; the inner decides the outer.",
      "a chapter of coming forward. One is seen, asked for, demanded of — and has to learn to carry the attention.",
      "a chapter of work and order. Service, health, craft, the small-scale; unspectacular and load-bearing.",
      "a chapter of the others. Marriage, contracts, balancing, open enmity too; little is decided alone.",
      "a chapter of depth. What is hidden comes up, bonds turn serious, losses and inheritances weigh heavily.",
      "a chapter of breadth. Foreign parts, teaching, belief, law; the horizon moves out, if need be by going away oneself.",
      "a chapter of building. Office, responsibility, endurance; it goes forward slowly and then stands.",
      "a chapter of leagues. Friendships, groups, undertakings that go beyond oneself; one belongs and stands beside it all the same.",
      "a chapter of dissolving. Withdrawal, compassion, dream, confusion too; the old ends before the new has shape."
    ],
    /* --------------------------- Readings beside arc, ZR and antiscia */
    "dg.wuerde.Domizil":"in its own sign and so strong",
    "dg.wuerde.Erhöhung":"exalted and so esteemed beyond its measure",
    "dg.wuerde.Exil":"in exile and so working against the grain",
    "dg.wuerde.Fall":"in fall and so coming into its own only with difficulty",
    "dg.wuerde.—":"without particular dignity",
    "dg.konkret": (rolle, glyph, zeichen, haus, ort, wuerde) =>
      `${rolle} stands with you in ${glyph} ${zeichen}, in the ${haus} house — ${ort} —, and ` +
      `${wuerde}. That is where what this time brings will show itself.`,
    "dg.wasHeisst":"What that means",
    "dg.pr.sonne":"visibility — office, recognition, coming forward before others; and the bill that follows",
    "dg.pr.mond":"the domestic and the movable — dwelling, family, temper, a change that begins from within",
    "dg.pr.merkur":"paper and word — contracts, writing, trade, learning, roads walked more than once",
    "dg.pr.venus":"attachment and liking — affection, art, money that comes easily, reconciliation",
    "dg.pr.mars":"the cut — work, strife, decision, parting; what will wait no longer",
    "dg.pr.jupiter":"widening — law, patrons, travel, standing; and the danger of taking on too much",
    "dg.pr.saturn":"seriousness — responsibility, renunciation, testing, what lasts; what asks for time and gives time",
    "dg.pr.mc":"the axis of office itself moves on: your standing in the world is ordered anew",
    "dg.pr.asc":"the axis of the person itself moves on: body, bearing and self-image are ordered anew",
    "dg.pr.sonst": (name) => `the theme of ${name}`,
    "dg.sg.mc":"in work and in reputation",
    "dg.sg.ic":"in the house, in origin and at the roots",
    "dg.sg.asc":"in your own body and bearing",
    "dg.sg.desc":"with the other — marriage, contracts, declared opponents",
    "dg.sg.sonst": (name) => `at ${name}`,
    "dg.ton.Konjunktion":"directly and without detour",
    "dg.ton.Quadrat":"under friction, against a resistance",
    "dg.ton.Opposition":"from outside, through another person",
    "dg.ton.Trigon":"easily, almost of itself",
    "dg.ton.Sextil":"as an opportunity that has to be taken",
    "dg.lbText":"Primary directions do not measure what happens but when something falls due. " +
      "The sky goes on turning after the birth; one degree of that turning counts for one year " +
      "of life. Where a planet meets an axis in the course of it, its theme knocks — whether the " +
      "door opens is another matter.",
    "dg.lbLeer":"Nothing further lies ahead of you within the chosen window of age.",
    "dg.lbTitelMehr":"The next things falling due", "dg.lbTitelEine":"The next thing falling due",
    "dg.wannJahre": (n) => `at ${n}`,
    "dg.wannJetzt":"just now",
    "dg.wannMonate": (n) => `in about ${n} months`,
    "dg.wannGut": (n) => `in a good ${n} years`,
    "dg.lbZeile": (wann, alter, was, wo, ton) => `<b>${wann}</b> (at ${alter}): ${was} — ${wo}, ${ton}.`,
    "dg.lbAnklopft":"What exactly is knocking",
    "dg.lbRolle": (name) => `${name} brings the next direction and`,
    "dg.lbNote":"A direction is a date, not a verdict. Two people with the same date live " +
      "through different things — the question is always what had already been prepared by then.",
    "dg.zrText":"Zodiacal Releasing divides the life into chapters, not into events. From the " +
      "Lot of Fortune, periods are counted off sign by sign, each as long as the years of its " +
      "ruler. The first level says what it is about across years; the second, in which key it is " +
      "being played just now; the third colours the months.",
    "dg.zrOhneDatum":"Without a date of birth there is no saying where you stand just now — the table above holds all the same.",
    "dg.zrWoDuStehst":"Where you stand now",
    "dg.zrL1": (von, bis, zeichen, herr, kapitel) =>
      `<b>The great chapter</b> runs from your ${von} to your ${bis} year under ${zeichen}, ` +
      `led by ${herr}: ${kapitel}`,
    "dg.zrL2": (von, bis, zeichen, herr, kapitel) =>
      `<b>Within it the smaller period</b>, from ${von} to ${bis} years, under ${zeichen} and ` +
      `${herr}: ${kapitel} It does not say what the matter is — the great chapter says that — ` +
      `but what you notice it by just now.`,
    "dg.zrL3": (glyph, zeichen, herr, bis, kapitel) =>
      `<b>And within that the third level</b>: ${glyph} ${zeichen} under ${herr}, until ${bis} ` +
      `years. ${kapitel} On this level it is a matter of months, not years — it colours the days ` +
      `without changing the theme.`,
    "dg.zrEigen":"a chapter of its own kind.", "dg.zrEigenKurz":"of its own kind.",
    "dg.zrMerkst":"What you notice it by",
    "dg.zrRolleL1": (name) => `${name} leads the great chapter and`,
    "dg.zrRolleL2": (name) => `${name} leads the smaller period and`,
    "dg.zrNote":"The transitions are the real places: where one period ends and the next begins, " +
      "the tone changes, often within a few weeks. Look in the table to see when that comes next.",
    "dg.kurz.sonne":"self-image and rank", "dg.kurz.mond":"temper and origin",
    "dg.kurz.merkur":"thinking and speaking", "dg.kurz.venus":"affection and taste",
    "dg.kurz.mars":"drive and anger", "dg.kurz.jupiter":"confidence and measure",
    "dg.kurz.saturn":"seriousness and limit", "dg.kurz.asc":"bearing and body",
    "dg.kurz.mc":"work and reputation",
    "dg.azText1":"Antiscia are shadow twins. Mirror a degree about the solstice axis — 0° Cancer " +
      "against 0° Capricorn — and the mirrored point has the same declination and the same " +
      "diurnal arc: the sun would stand there equally high and equally long in the sky. Two such " +
      "points are connected without seeing each other — they form no visible aspect and yet work " +
      "upon one another.",
    "dg.azText2":"The old reading: the antiscion is the hidden friendship — two forces work " +
      "together without its being recognisable from outside. The contra-antiscion, mirrored " +
      "about the equinox, counts as the covered enmity: something hinders itself, and nobody " +
      "sees what it is down to.",
    "dg.azKeine":"In your chart no point falls on the shadow twin of another — nothing here " +
      "works with or against anything else in hiding. That is the commoner case.",
    "dg.azTitelMehr":"Your hidden connections", "dg.azTitelEine":"Your hidden connection",
    "dg.azZeile": (a, b, wasA, wasB, kontra) =>
      `<b>${a} and ${b}</b> — ${wasA} meets ${wasB}. ` +
      (kontra
        ? "The two hinder each other covertly: the friction is there, but it never shows itself where it arises."
        : "The two work together without its being seen from outside; what succeeds for the one quietly serves the other."),
    "dg.azEng":"The closer the distance in degrees, the plainer. Under one degree the connection counts as close.",
    "dg.azUmgang":"How to handle it",
    "dg.azUmgang1":"Antiscia explain the inexplicable in a chart: an attraction without aspect, " +
      "a hindrance for which no reason can be found, two areas of life that always appear " +
      "together although they have nothing to do with each other. Whoever cannot get a reading " +
      "to come out right looks here first, classically.",
    "dg.azUmgang2":"The mirror axis is that of the solstices: 0° Cancer and 0° Capricorn, the " +
      "longest and the shortest night. Two mirrored degrees share the same diurnal arc — which " +
      "is why the old texts say they hear each other without seeing each other. The " +
      "contra-antiscion mirrors instead about 0° Aries and 0° Libra, the axis of the equinox; it " +
      "counts as the less favourable of the two mirrorings.",
    "dg.azPraktisch":"In practice: a planet on the antiscion of another works like a silent " +
      "conjunction — one notices it by its consequences, not by the configuration.",
    "pd.kopf": (profil, sekte, erster) =>
      `For: ${profil} · ${sekte} — so the series begins with ${erster}.`,
    "pd.deinFirdar":"Your firdar",
    "pd.spanne": (von, bis) => `${von} to ${bis} years`,
    "pd.unter": (g, name) => ` · sub-period ${g} ${name}`,
    "pd.verhandelt": (was) => `What is being dealt with in this time: ${was}.`,
    "pd.darin": (name, was, bis) =>
      `Within it ${name} is leading just now — ${was} —, until ${bis} years. The great lord gives the theme, the small one the tone.`,
    "pd.durchlaufen":"The seventy-five years of the firdaria have run their course. The Persians " +
      "let the series begin again from the start; here it ends.",
    "pd.tab.herr":"Lord", "pd.tab.jahre":"Years", "pd.tab.von":"From", "pd.tab.bis":"To",
    "pd.tab.datum":"Date", "pd.tab.beginnt":"Begins", "pd.tab.maha":"Mahadasha",
    "pd.fdNote":"Seventy-five years across nine lords, in a fixed order and fixed lengths — the " +
      "firdaria asks after neither signs nor houses, only whether the sun stood above the " +
      "horizon at the birth. The two lunar nodes at the end carry no sub-periods.",
    "pd.amHoroskop": (rolle, glyph, zeichen, haus, ort) =>
      `${rolle} stands with you in ${glyph} ${zeichen}, in the ${haus} house — ${ort}. That is where what this time brings plays out.`,
    "pd.rolleFd": (name) => `${name}, the lord of these years,`,
    "pd.vdKopf": (profil, glyph, grad, ayanamsa) =>
      `For: ${profil} · Moon sidereal at ${glyph} ${grad}° · ayanamsa ${ayanamsa}°`,
    "pd.mondhaus":"Lunar house of the birth",
    "pd.mondhausNot": (nr, g, herr, rest) =>
      `${nr} of 27 · lord ${g} ${herr} · at the birth ${rest} years of it were still left`,
    "pd.maha": (g, name, was, von, bis, datum) =>
      `<b>Mahadasha:</b> ${g} ${name} — ${was}. From ${von} to ${bis} years, that is until ${datum}.`,
    "pd.antar": (g, name, was, datum) =>
      `<b>Antardasha:</b> ${g} ${name} — ${was}. Until ${datum}. ` +
      `The great period says what it is about; the small one, what you notice it by.`,
    "pd.rest":" (remainder)",
    "pd.vdNote":"A hundred and twenty years across nine lords. Which one begins, and how much of " +
      "its time was already spent, hangs solely on where the moon stood at the birth among its " +
      "twenty-seven houses. The reckoning is sidereal after Lahiri — the ayanamsa approximated " +
      "here, exact to a few arc minutes; with a lunar house of 13°20′ that carries no weight.",
    /* ------------------------------- Firdaria and Vimshottari */
    "fd.sonne":"standing, office, coming forward; the father too",
    "fd.venus":"attachment, art, enjoyment, money that comes by way of people",
    "fd.merkur":"learning, writing, trade, roads, negotiation",
    "fd.mond":"house, family, temper, change; the mother too",
    "fd.saturn":"seriousness, renunciation, responsibility, what is slow and lasting",
    "fd.jupiter":"widening, patrons, law, travel, increase",
    "fd.mars":"strife, work, the cut, decision, danger from heat",
    "fd.kopf":"entry, increase, joining — a door opens",
    "fd.schwanz":"exit, reduction, letting go — a door closes",
    "fd.name.kopf":"Lunar node (ascending)", "fd.name.schwanz":"Lunar node (descending)",
    "vd.ketu":"letting go, withdrawal, the unfinished; what one no longer needs",
    "vd.venus":"enjoyment, art, attachment, prosperity, what is agreeable",
    "vd.sonne":"office, father, standing, self-assertion",
    "vd.mond":"mother, temper, home, feeling, change",
    "vd.mars":"energy, strife, siblings, land, blood",
    "vd.rahu":"hunger for the new, the foreign, ascent with an aftertaste",
    "vd.jupiter":"teaching, children, faith, blessing, breadth",
    "vd.saturn":"toil, duration, age, service, what has been worked for",
    "vd.merkur":"speech, reckoning, trade, intellect, dexterity",
    /* ------------------------------------------ The solar revolution */
    "sr.wuerde.Domizil":"in its own sign, strong",
    "sr.wuerde.Erhöhung":"exalted, esteemed beyond its measure",
    "sr.wuerde.Exil":"in exile, working against the grain",
    "sr.wuerde.Fall":"in fall, coming into its own only with difficulty",
    "sr.wuerde.—":"without particular dignity",
    "sr.kopfTitel":"This year's revolution",
    "sr.kopfDatum": (tag, monat, jahr) => `${monat} ${tag}, ${jahr}`,
    "sr.kopfNot": (uhr, alter, bisTag, bisMonat, bisJahr) =>
      `${uhr} universal time · your ${alter}th year of life · valid until ${bisMonat} ${bisTag}, ${bisJahr}`,
    "sr.monate":["January","February","March","April","May","June","July","August","September","October","November","December"],
    "sr.s1":"Cast the birth chart",
    "sr.s1Text": (ascGlyph, asc, mcGlyph, mc, herr, stand) =>
      `${ascGlyph} ${asc} is rising, the MC in ${mcGlyph} ${mc}. The lord of the chart is ${herr}${stand}`,
    "sr.s1Stand": (glyph, zeichen, haus, wuerde) => `, in ${glyph} ${zeichen}, ${haus}th house, ${wuerde}.`,
    "sr.s2":"Look at the sect",
    "sr.s2Tag":"A <b>day birth</b>: the sun stood above the horizon. The party of the day leads — " +
      "Sun, Jupiter and Saturn count here as the more agreeable, Moon, Venus and Mars as the more demanding.",
    "sr.s2Nacht":"A <b>night birth</b>: the sun stood below the horizon. The party of the night leads — " +
      "Moon, Venus and Mars count here as the more agreeable, Sun, Jupiter and Saturn as the more demanding.",
    "sr.s3":"Find the sign of the year",
    "sr.s3Text": (asc, alter, glyph, zeichen, haus, hausOrt) =>
      `The ${asc} has moved on ${alter} signs since the birth and stands in <b>${glyph} ${zeichen}</b>. ` +
      `So your <b>${haus}th house</b> is the house of the year: ${hausOrt}.`,
    "sr.s4":"Name the lord of the year",
    "sr.s4Text": (glyph, herr, natal) =>
      `The ruler of this sign, and so the <b>lord of the year</b>, is ${glyph} ${herr}.${natal}`,
    "sr.s4Natal": (glyph, zeichen, haus, wuerde) =>
      ` In the birth it stands in ${glyph} ${zeichen}, ${haus}th house, ${wuerde}.`,
    "sr.s5":"Determine the firdar and the partner",
    "sr.s5Firdar": (herr) => `The firdaria gives these years to <b>${herr}</b>`,
    "sr.s5Durch":"The firdaria has run its course",
    "sr.s5Teilhaber": (herr) => `, and within them <b>${herr}</b> is leading just now as partner.`,
    "sr.s5Schluss":" The great lord gives the theme, the partner the tone.",
    "sr.rolleFirdar":"The firdar", "sr.rolleTeilhaber":"The partner",
    "sr.nichtPruefbar": (rolle) => `${rolle}: not to be checked.`,
    "sr.s6":"Do they stand angular to the sign of the year?",
    "sr.s6Zeile": (rolle, name, nr, winkelhaft) =>
      `<b>${rolle} ${name}</b> stands in the ${nr}th sign counted from the sign of the year — ` +
      (winkelhaft
        ? `<span class="srJa">angular</span>. That is the strong position: what it brings arrives.`
        : `<span class="srNein">not angular</span>. It works, but indirectly.`),
    "sr.s7":"Are they connected with the lord of the year?",
    "sr.s7Ist": (rolle, name) =>
      `<b>${rolle} ${name}</b> <em>is</em> the lord of the year — the strongest connection there is.`,
    "sr.s7Zeile": (rolle, name, sicht) =>
      `<b>${rolle} ${name}</b> and the lord of the year: ` +
      (sicht
        ? `<span class="srJa">${sicht}</span> — they see each other, and the statements mesh.`
        : `<span class="srNein">in aversion</span> — they do not see each other; each speaks for itself.`),
    "sr.s8":"Check their condition in the birth chart",
    "sr.s8Zeile": (g, name, glyph, zeichen, haus, hausOrt, wuerde) =>
      `<b>${g} ${name}</b>: ${glyph} ${zeichen}, ${haus}th house — ${hausOrt}; ${wuerde}.`,
    "sr.s9":"Check their condition in the solar revolution",
    "sr.s9Asc": (asc, glyph, zeichen, haus, hausOrt) =>
      `The ${asc} of the revolution stands in ${glyph} ${zeichen} — that falls in your <b>${haus}th ` +
      `natal house</b>, ${hausOrt}. That is where this year's weight lies.`,
    "sr.s9Zeile": (g, name, glyph, zeichen, grad, haus, hausOrt) =>
      `<b>${g} ${name}</b>: in the revolution ${glyph} ${zeichen} ${grad}°, ${haus}th house of the year's chart — ${hausOrt}.`,
    "sr.leer":"—",
    "sr.deutung":"And now the reading",
    "sr.deutungSatz": (glyph, zeichen, haus, hausOrt, herr, natal) =>
      `The year stands under ${glyph} ${zeichen} and so over your ${haus}th house: ${hausOrt}. ` +
      `Its lord is ${herr}${natal}`,
    "sr.deutungNatal": (hausOrt) => `, which in the birth stands ${hausOrt} — that is where the theme is played out.`,
    "sr.einig.firdarWinkel":"the firdar stands angular",
    "sr.einig.teilhaberWinkel":"the partner stands angular",
    "sr.einig.firdarSieht":"the firdar sees the lord of the year",
    "sr.einig.teilhaberSieht":"the partner sees it",
    "sr.sprechend": (liste) =>
      `The signs agree: ${liste}. When firdar, partner and lord of the year see each other and ` +
      `stand angular, this school counts the year as <b>speaking</b> — what it brings comes ` +
      `plainly and can be recognised.`,
    "sr.halblaut": (eine) =>
      `Only one support: ${eine}. The year speaks, but at half voice — it needs attention to be noticed.`,
    "sr.still":"Neither firdar nor partner stands angular to the sign of the year, and neither " +
      "sees the lord of the year. Abū Maʿšar reads that as a <b>quiet year</b>: something happens, " +
      "but below the threshold, and it shows itself only later.",
    "sr.schlusswort":"The order is that of the Persian school: first the birth, then the sect, " +
      "then the sign of the year and its lord, then firdar and partner, then their standing — " +
      "and only at the very end the reading. Whoever turns it round and begins with the reading " +
      "always finds something, but not what is there.",
    "pf.kopf": (asc, glyph, zeichen) => `${asc} (year 0) — ${glyph} ${zeichen}. Whole-sign houses.`,
    "achse.asc":"Ascendant", "achse.mc":"MC", "achse.desc":"Descendant", "achse.ic":"IC",
    /* ----------------------------------------- Zodiacal Releasing */
    "zr.los.fortuna":"Lot of Fortune", "zr.los.geist":"Lot of Spirit",
    "zr.tag":"day birth", "zr.nacht":"night birth", "zr.keiner":"none",
    "zr.kopf": (los, glyph, zeichen, grad, tag, verdoppelt, fGlyph, fZeichen) =>
      `${los} at ${glyph} ${zeichen} ${grad}° · ${tag} · ` +
      `natal in its own sign (doubling): ${verdoppelt} · ` +
      `peaks measured from the Lot of Fortune in ${fGlyph} ${fZeichen}`,
    "zr.alter": (n) => `Age ${n} years`,
    "zr.stand": (lvl, glyph, zeichen, herrGlyph, von, bis, zusatz) =>
      `L${lvl}: ${glyph} ${zeichen} (${herrGlyph} ${von}–${bis} yrs${zusatz})`,
    "zr.verdoppelt":"doubled", "zr.hoehepunkt":"peak", "zr.loesung":"loosing of the bond",
    "zr.tab.stufe":"Level", "zr.tab.zeichen":"Sign", "zr.tab.herrscher":"Ruler",
    "zr.tab.von":"From", "zr.tab.bis":"To", "zr.tab.jahre":"Years", "zr.tab.besonderes":"Of note",
    "zr.markeGipfel":"▲ peak", "zr.markeLoesung":"⟲ loosing of the bond",
    "zr.tabNote":"The table shows L1 and L2; L3 is visible in the timeline but is not listed here for reasons of space.",
    "zr.gipfelTitel":"The peaks of the chapters of life",
    "zr.gipfelText":"A chapter does not run evenly. Its peaks are the periods whose sign stands " +
      "angular to the Lot of Fortune — on the lot itself, or in the fourth, seventh or tenth " +
      "sign counted from it. These are the active, visible stretches in which career and " +
      "standing are decided; the remaining signs stand in aversion and are the quiet ones.",
    "zr.keinGipfel":"No such period falls within the chosen window of age.",
    "zr.gipfelNote":"The second level gives the great peaks, the third the short ones within " +
      "them — often only months, but on the same angular position.",
    "zr.gipfelZeile": (von, bis, glyph, zeichen, herr, stellung) =>
      `<b>L2 · ${von} – ${bis} years</b>: ${glyph} ${zeichen} under ${herr} — ${stellung}.`,
    "zr.gipfelKurz": (anzahl, naechster) =>
      `<b>L3</b>: along with ${anzahl} short peaks on the third level, the next at ${naechster} years.`,
    "zr.vomLos.0":"on the lot itself", "zr.vomLos.3":"in the fourth sign from the lot",
    "zr.vomLos.6":"in the seventh sign from the lot", "zr.vomLos.9":"in the tenth sign from the lot",
    "zr.bandTitel":"The loosing of the bond",
    "zr.bandText":"If a series has run through all twelve signs and time is still left, it does " +
      "not return to the beginning: it jumps into the opposite sign and runs on from there. " +
      "Valens holds this jump — the <em>lysis tōn desmōn</em> — to be one of the most important " +
      "moments in a life: the bond that carried until then comes loose, and the life starts " +
      "again at another place.",
    "zr.grosseLoesung": (liste) => `<b>The great loosing</b> on the first level falls at ${liste}.`,
    "zr.keineGrosse":"<b>The great loosing</b> on the first level does not occur in a human " +
      "lifetime: a full circuit of the twelve signs takes 214 years there. What one lives " +
      "through are the small loosings on the lower levels — and those are plain enough.",
    "zr.keineKleine":"No small loosing falls within the chosen window of age either.",
    "zr.kleineTitel":"<b>The small loosings</b> in the chosen window:",
    "zr.kleineZeile": (alter, lvl, glyph, zeichen, auchGipfel) =>
      `<b>at ${alter} years</b> on level L${lvl}: a jump to ${glyph} ${zeichen}` +
      (auchGipfel ? " — and that is at the same time a peak" : "") + ".",
    "zr.jahreKurz": (n) => `${n} years`,
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

/* Englische Ordnungszahl: 1st, 2nd, 3rd, 4th — und 11th bis 13th trotz
   der Endziffern. Deutsch und Italienisch brauchen keine Regel, darum
   steht dort nur das Suffix. */
export function ordnung(n, weiblich) {
  const z = Math.abs(Math.round(Number(n)));
  /* Das Italienische unterscheidet: 1º anno, 1ª casa. */
  if (aktiv !== "en") return aktiv === "it" ? `${n}${weiblich ? "ª" : "º"}` : `${n}.`;
  const zehner = z % 100, einer = z % 10;
  const endung = (zehner >= 11 && zehner <= 13) ? "th"
    : einer === 1 ? "st" : einer === 2 ? "nd" : einer === 3 ? "rd" : "th";
  return `${n}${endung}`;
}
