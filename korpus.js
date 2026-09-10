/* ------------------------------------------------------------------------
   korpus.js — das Buch.

   Die Rechnung im Ebced ist nur der Zeigefinger; das Orakel ist der Text,
   auf den er zeigt. Die Faecher folgen der Ordnung der Handschriften:
   zwoelf Zeichen, sieben Wandelsterne, vier Elemente, achtundzwanzig
   Mondstationen. Die Deutungen sind hier neu gefasst — im Ton der Vorlage,
   aber nicht aus einer einzelnen Handschrift abgeschrieben; es gibt keine.
   --------------------------------------------------------------------- */

/* --------------------------------------------------------- vier Elemente */
export const UNSURLAR = [
  { tr:"Ateş", ar:"نار", de:"Feuer", tabiat:"heiß und trocken",
    metin:"Was im Feuer steht, geht voran, ehe es bedacht hat. Der Anfang gelingt dir leichter als das Ende; such dir Menschen, die zu Ende bringen." },
  { tr:"Toprak", ar:"تراب", de:"Erde", tabiat:"kalt und trocken",
    metin:"Was in der Erde steht, hält und trägt. Du sammelst langsam und verlierst selten; die Gefahr ist, dass du sitzen bleibst, wo du längst fertig bist." },
  { tr:"Hava", ar:"هواء", de:"Luft", tabiat:"warm und feucht",
    metin:"Was in der Luft steht, verbindet. Dir gehört das Wort und der Weg zwischen den Menschen; hüte dich, überall zu sein und nirgends zu bleiben." },
  { tr:"Su", ar:"ماء", de:"Wasser", tabiat:"kalt und feucht",
    metin:"Was im Wasser steht, nimmt die Form dessen an, was es umgibt. Du spürst früher als du weißt; achte darauf, wessen Gefäß du gerade bist." }
];

/* ----------------------------------------------------- sieben Wandelsterne
   Reihenfolge der Siebenerteilung: von der Sonne abwärts durch die
   chaldäische Ordnung — Şems, Zühre, Utarit, Kamer, Zühal, Müşteri, Merih. */
export const GEZEGENLER = [
  { tr:"Şems", ar:"الشمس", de:"Sonne", gun:"Sonntag", maden:"Gold", renk:"Goldgelb",
    sayi:6, esma:"Yâ Nûr", tabiat:"heiß und trocken",
    armagan:"Ansehen, ein großes Herz, die Kraft, im Mittelpunkt zu stehen, ohne klein zu werden",
    tehlike:"Hochmut — und die Gewohnheit, das eigene Licht für die Sonne aller zu halten" },
  { tr:"Zühre", ar:"الزهرة", de:"Venus", gun:"Freitag", maden:"Kupfer", renk:"Grün und Weiß",
    sayi:7, esma:"Yâ Vedûd", tabiat:"warm und feucht",
    armagan:"Anmut, Sinn für Maß und Form, Kunst, Freundschaft, die leichte Hand",
    tehlike:"Weichheit — du weichst dem Streit aus, bis der Streit dich sucht" },
  { tr:"Utarit", ar:"عطارد", de:"Merkur", gun:"Mittwoch", maden:"Quecksilber", renk:"Changierend, Grau",
    sayi:8, esma:"Yâ Alîm", tabiat:"wandelbar, nimmt an, was ihm begegnet",
    armagan:"Rede, Schrift, Rechnung, Handel — und ein Verstand, der Umwege findet",
    tehlike:"Unstetigkeit; die List, die man sich selbst zuletzt eingesteht" },
  { tr:"Kamer", ar:"القمر", de:"Mond", gun:"Montag", maden:"Silber", renk:"Weiß",
    sayi:9, esma:"Yâ Latîf", tabiat:"kalt und feucht",
    armagan:"Empfindung, Traum, Gedächtnis, die Gabe, im Wandel heimisch zu sein",
    tehlike:"Schwanken — du nimmst die Stimmung des Raumes für dein eigenes Urteil" },
  { tr:"Zühal", ar:"زحل", de:"Saturn", gun:"Samstag", maden:"Blei", renk:"Schwarz",
    sayi:3, esma:"Yâ Sabûr", tabiat:"kalt und trocken",
    armagan:"Ausdauer, Tiefe, Ernst; was du baust, steht noch, wenn du nicht mehr stehst",
    tehlike:"Schwermut und Härte gegen dich selbst, lange bevor andere hart werden" },
  { tr:"Müşteri", ar:"المشتري", de:"Jupiter", gun:"Donnerstag", maden:"Zinn", renk:"Blau",
    sayi:4, esma:"Yâ Rezzâk", tabiat:"warm und feucht",
    armagan:"Segen, Recht, Weite, Ansehen bei denen, die verstehen",
    tehlike:"Übermaß — du nimmst dir zu viel vor und nennst es Großzügigkeit" },
  { tr:"Merih", ar:"المريخ", de:"Mars", gun:"Dienstag", maden:"Eisen", renk:"Rot",
    sayi:5, esma:"Yâ Kaviyy", tabiat:"heiß und trocken",
    armagan:"Mut, Schneide, die Kraft, den ersten Schlag zu tun und ihn auszuhalten",
    tehlike:"Jähzorn; du gewinnst den Streit und verlierst den Menschen" }
];

/* --------------------------------------------------------- zwölf Zeichen */
export const BURCLAR = [
  { no:1, tr:"Koç", ar:"الحمل", de:"Widder", unsur:1, gezegen:"Merih",
    tas:"Rubin und roter Achat", maden:"Eisen", renk:"Rot", sayi:5,
    gun:"Dienstag", kotugun:"Freitag", esma:"Yâ Kaviyy",
    tabiat:"Erster im Kreis, und es merkt man dir an. Du fängst an, ehe der Weg fertig ist, und findest ihn im Gehen. Wo andere beraten, hast du schon eine Tür geöffnet.",
    erkek:"Sein Wort geht vor seiner Überlegung her; er hält es dennoch. Er verträgt Widerstand besser als Langeweile, und ein Herr, der ihn bremst, verliert ihn.",
    kadin:"Sie lässt sich nicht führen, aber sie geht mit, wo sie geachtet wird. Sie verzeiht schnell und vergisst nichts.",
    is:"Eisen, Feuer, Waffe und Werkzeug; Heerwesen, Wundarznei, alles, was Schnitt und Entschluss verlangt.",
    evlilik:["Aslan","Yay","İkizler","Kova"],
    hastalik:"Kopf und Augen; Fieber, das rasch kommt und rasch geht. Hüte den Kopf vor Schlag und Sonne.",
    ogut:"Zähle bis zum dritten Atemzug, ehe du antwortest. Was du dann noch sagen willst, ist wahr." },

  { no:2, tr:"Boğa", ar:"الثور", de:"Stier", unsur:2, gezegen:"Zühre",
    tas:"Smaragd", maden:"Kupfer", renk:"Grün", sayi:7,
    gun:"Freitag", kotugun:"Dienstag", esma:"Yâ Vedûd",
    tabiat:"Du hältst, was du hast, und du hältst es lange. Dein Nein kommt spät, aber es kommt endgültig. Schönheit ist dir kein Schmuck, sondern Nahrung.",
    erkek:"Ruhig, bis er nicht mehr ruhig ist; dann ist nichts mehr zu machen. Er kommt zu Besitz, weil er nicht loslässt, und verliert Jahre aus demselben Grund.",
    kadin:"Sie schafft Häuser, in denen andere zur Ruhe kommen. Wer ihr Vertrauen bricht, bekommt es nicht zweimal.",
    is:"Erde und Ertrag: Landbau, Bauwesen, Geldwechsel, Gastlichkeit, alles Handwerk der Hand.",
    evlilik:["Başak","Oğlak","Yengeç","Balık"],
    hastalik:"Hals und Kehle; Stockungen, die vom Übermaß kommen. Weniger und langsamer heilt bei dir mehr als jede Arznei.",
    ogut:"Prüfe einmal im Jahr, was du nur aus Gewohnheit noch trägst." },

  { no:3, tr:"İkizler", ar:"الجوزاء", de:"Zwillinge", unsur:3, gezegen:"Utarit",
    tas:"Achat", maden:"Quecksilber", renk:"Bunt", sayi:8,
    gun:"Mittwoch", kotugun:"Donnerstag", esma:"Yâ Alîm",
    tabiat:"Zwei in einem, und beide haben recht. Du lernst schnell, langweilst dich schneller, und dein bestes Werkzeug ist das Wort.",
    erkek:"Er kennt jeden und wird von wenigen gekannt. Was er verspricht, meint er im Augenblick des Versprechens ganz.",
    kadin:"Sie hört, was nicht gesagt wurde, und sagt es weiter, ehe sie es geprüft hat. Ihr Witz öffnet Türen, die Rang und Geld verschlossen halten.",
    is:"Schrift, Rechnung, Botschaft, Handel, Übersetzung, Vermittlung, Lehre.",
    evlilik:["Terazi","Kova","Koç","Aslan"],
    hastalik:"Schultern, Arme, Atem; Unruhe, die sich als Erschöpfung zeigt. Schlaf ist deine Arznei.",
    ogut:"Bring eines zu Ende, ehe du das nächste anfängst — nur eines, und du wirst sehen, was du kannst." },

  { no:4, tr:"Yengeç", ar:"السرطان", de:"Krebs", unsur:4, gezegen:"Kamer",
    tas:"Perle und Mondstein", maden:"Silber", renk:"Weiß und Silbergrau", sayi:9,
    gun:"Montag", kotugun:"Samstag", esma:"Yâ Latîf",
    tabiat:"Deine Schale ist außen; drinnen bist du weich, und das weiß nicht jeder, der dich sieht. Du vergisst kein Unrecht und keine Freundlichkeit.",
    erkek:"Er sorgt, ehe er gefragt wird, und zieht sich zurück, statt zu streiten. Sein Haus ist seine Burg — man erobert es nur mit Geduld.",
    kadin:"Sie trägt das Gedächtnis der Familie, oft ungefragt und meist allein. Wo sie liebt, gibt es keine Grenze; deshalb braucht sie eine.",
    is:"Wasser und Nahrung, Herberge, Heilkunde, Erziehung, Handel über See, alles Bewahrende.",
    evlilik:["Akrep","Balık","Boğa","Başak"],
    hastalik:"Brust und Magen; alles, was du hinunterschluckst, kommt dort an. Kummer macht dich früher krank als Kälte.",
    ogut:"Sag es, solange es klein ist. Was du hütest, wächst im Dunkeln." },

  { no:5, tr:"Aslan", ar:"الأسد", de:"Löwe", unsur:1, gezegen:"Şems",
    tas:"Goldtopas", maden:"Gold", renk:"Goldgelb", sayi:6,
    gun:"Sonntag", kotugun:"Samstag", esma:"Yâ Nûr",
    tabiat:"Du wirst gesehen, ob du willst oder nicht, und du willst. Großmut ist deine wahre Kraft; Eitelkeit ist ihr Schatten und sieht ihr zum Verwechseln ähnlich.",
    erkek:"Er führt gut, solange man ihm die Ehre lässt, und schlecht, sobald man sie ihm nimmt. Er ist treu bis zur Torheit gegen die, die zu ihm halten.",
    kadin:"Sie füllt einen Raum, ohne die Stimme zu heben. Lob nährt sie; Übergehen kränkt sie tiefer als Widerspruch.",
    is:"Amt und Vorstand, Lehre, Bühne, Gold und Schmuck, alles, was vor Menschen geschieht.",
    evlilik:["Koç","Yay","Terazi","İkizler"],
    hastalik:"Herz und Rücken; Übermaß an Hitze. Ruhe ist dir keine Schwäche, sondern Heilmittel.",
    ogut:"Gib einmal, ohne dass jemand erfährt, dass du gegeben hast. Das ist deine Prüfung." },

  { no:6, tr:"Başak", ar:"السنبلة", de:"Jungfrau", unsur:2, gezegen:"Utarit",
    tas:"Jaspis", maden:"Quecksilber", renk:"Erdbraun und Grau", sayi:8,
    gun:"Mittwoch", kotugun:"Donnerstag", esma:"Yâ Hakîm",
    tabiat:"Du siehst den Fehler, ehe du das Werk siehst. Das macht dich unentbehrlich und einsam. Dienen ist dir keine Erniedrigung, sondern Ordnung.",
    erkek:"Er redet wenig und prüft viel. Man merkt erst, was er getragen hat, wenn er fort ist.",
    kadin:"Sie hält alles zusammen und nennt es Selbstverständlichkeit. Ihre Strenge gegen sich selbst ist härter als jede gegen andere.",
    is:"Heilkunde und Kräuter, Rechnungswesen, Schreibstube, Handwerk der Feinheit, Prüfung und Aufsicht.",
    evlilik:["Boğa","Oğlak","Yengeç","Akrep"],
    hastalik:"Eingeweide; Sorge schlägt dir auf den Leib. Deine Krankheit beginnt fast immer als Gedanke.",
    ogut:"Lass ein Ding im Jahr unvollkommen und sieh zu, ob die Welt einstürzt." },

  { no:7, tr:"Terazi", ar:"الميزان", de:"Waage", unsur:3, gezegen:"Zühre",
    tas:"Saphir", maden:"Kupfer", renk:"Hellgrün und Rosé", sayi:7,
    gun:"Freitag", kotugun:"Dienstag", esma:"Yâ Adl",
    tabiat:"Du wägst, und während du wägst, entscheidet die Zeit für dich. Unrecht erträgst du schlechter als Unglück — auch fremdes.",
    erkek:"Er sucht den Ausgleich, bis der Ausgleich selbst zur Last wird. Man vertraut ihm Streitfälle an, die keiner sonst anfasst.",
    kadin:"Sie verbindet Menschen, die einander nicht gefunden hätten. Alleinsein bekommt ihr selten; ganz aufgehen im anderen noch weniger.",
    is:"Recht und Richteramt, Vermittlung, Kunst, Putz und Kleid, Handel mit Schönem.",
    evlilik:["İkizler","Kova","Aslan","Yay"],
    hastalik:"Nieren und Lenden; Ungleichgewicht, außen wie innen. Zu viel Süßes, zu wenig Schlaf.",
    ogut:"Entscheide heute die kleinere Frage sofort. Übe das Entscheiden am Leichten." },

  { no:8, tr:"Akrep", ar:"العقرب", de:"Skorpion", unsur:4, gezegen:"Merih",
    tas:"Granat und Blutstein", maden:"Eisen", renk:"Dunkelrot und Schwarz", sayi:5,
    gun:"Dienstag", kotugun:"Freitag", esma:"Yâ Kahhâr",
    tabiat:"Du siehst, was verborgen ist, weil du selbst verborgen lebst. Halbe Dinge gibt es bei dir nicht — weder halbe Liebe noch halbe Feindschaft.",
    erkek:"Er wartet, und sein Warten ist eine Handlung. Wer ihn unterschätzt, merkt es erst spät.",
    kadin:"Sie erkennt die Lüge am Tonfall. Ihre Treue ist unbedingt, und ihr Bruch ist es auch.",
    is:"Heilkunde und Wundarznei, Bergbau, Erforschung des Verborgenen, Verwaltung fremden Gutes, Erbschaften.",
    evlilik:["Yengeç","Balık","Başak","Oğlak"],
    hastalik:"Unterleib; Gift und Fäulnis, im Leib wie im Gemüt. Was du nicht ausspricht, sammelt sich.",
    ogut:"Lass einmal etwas ungerächt. Du wirst spüren, wie viel Kraft frei wird." },

  { no:9, tr:"Yay", ar:"القوس", de:"Schütze", unsur:1, gezegen:"Müşteri",
    tas:"Türkis", maden:"Zinn", renk:"Blau und Purpur", sayi:4,
    gun:"Donnerstag", kotugun:"Mittwoch", esma:"Yâ Rezzâk",
    tabiat:"Der Pfeil ist schon fort, während du noch zielst. Du brauchst Weite — im Land, im Gedanken, im Glauben — sonst wirst du unwirsch.",
    erkek:"Er sagt die Wahrheit auch dort, wo sie niemand bestellt hat. Sein Glück im Leben ist auffällig und keine Erklärung wert.",
    kadin:"Sie hält es nirgends lange, wo man ihr das Fragen verbietet. Sie ist großzügig bis zur Unvernunft und bereut es nicht.",
    is:"Lehre und Recht, Glaubensdinge, Fremde und Reise, Pferd und Weg, Handel über Grenzen.",
    evlilik:["Koç","Aslan","Terazi","Kova"],
    hastalik:"Hüften und Schenkel; Übermaß und Sturz. Deine Gefahr ist selten Mangel, fast immer Zuviel.",
    ogut:"Bleib drei Tage länger, als dir recht ist. Dort beginnt, was du sonst nie siehst." },

  { no:10, tr:"Oğlak", ar:"الجدي", de:"Steinbock", unsur:2, gezegen:"Zühal",
    tas:"Onyx", maden:"Blei", renk:"Schwarz und Dunkelbraun", sayi:3,
    gun:"Samstag", kotugun:"Montag", esma:"Yâ Sabûr",
    tabiat:"Du steigst langsam und fällst selten. Was andere Begabung nennen, ist bei dir die Summe von Jahren. Dein Ernst ist früh gekommen.",
    erkek:"Er trägt Verantwortung, die ihm keiner aufgetragen hat. Zärtlichkeit zeigt er in Taten, und wartet vergeblich, dass man sie so liest.",
    kadin:"Sie plant weiter, als sie sagt. Sie bittet spät um Hilfe und meist, wenn es schon eng ist.",
    is:"Amt und Verwaltung, Stein und Bau, Land, Zeit und Alter, alles Langsame und Bleibende.",
    evlilik:["Boğa","Başak","Akrep","Balık"],
    hastalik:"Knie und Gebein, Haut und Zähne; Kälte und Trockenheit. Wärme, Öl und Gesellschaft sind dir Arznei.",
    ogut:"Nimm dir eine Freude, für die es keinen Grund gibt. Das ist Arbeit für dich — tu sie." },

  { no:11, tr:"Kova", ar:"الدلو", de:"Wassermann", unsur:3, gezegen:"Zühal",
    tas:"Amethyst", maden:"Blei und Zinn", renk:"Indigo", sayi:3,
    gun:"Samstag", kotugun:"Sonntag", esma:"Yâ Vâsi'",
    tabiat:"Du gehörst dazu und stehst zugleich daneben — das ist keine Wahl, das ist deine Stellung. Was alle tun, ist dir kein Grund, es auch zu tun.",
    erkek:"Er hat viele Gefährten und wenige Nahe. Für eine Sache tut er mehr als für eine Person, und das kränkt die Person.",
    kadin:"Sie braucht Freiheit wie andere Luft und gibt sie ebenso selbstverständlich zurück. Besitzansprüche vertreiben sie schneller als Streit.",
    is:"Neues Wissen, Sternkunde und Rechnung, Wasserwerk, Zunft und Bund, alles Gemeinsame.",
    evlilik:["İkizler","Terazi","Yay","Koç"],
    hastalik:"Waden und Knöchel, Kreislauf; plötzliche Beschwerden ohne Vorwarnung. Regelmaß bekommt dir, obwohl du es verachtest.",
    ogut:"Bleib bei einem Menschen, auch wenn er dich enttäuscht hat. Nähe ist deine unerledigte Aufgabe." },

  { no:12, tr:"Balık", ar:"الحوت", de:"Fische", unsur:4, gezegen:"Müşteri",
    tas:"Mondstein und Aquamarin", maden:"Zinn", renk:"Meergrün", sayi:4,
    gun:"Donnerstag", kotugun:"Mittwoch", esma:"Yâ Rahîm",
    tabiat:"Letzter im Kreis, und du trägst etwas von allen elf. Du nimmst auf, was um dich her ist, und weißt nachts nicht mehr, was davon dir gehört.",
    erkek:"Er hilft, auch wo Hilfe nicht guttut. Seine Träume sind genauer als seine Pläne.",
    kadin:"Sie spürt den Kummer im Raum, ehe jemand spricht. Ihre Güte braucht eine Tür, die sie schließen kann.",
    is:"Heilkunde, Gebet und Seelsorge, Bild und Ton, See und Fischerei, Dienst an Kranken.",
    evlilik:["Yengeç","Akrep","Boğa","Oğlak"],
    hastalik:"Füße, Lymphe, Schlaf; Betäubung jeder Art bekommt dir schlecht. Wasser und Stille heilen dich schneller als Mittel.",
    ogut:"Schreib auf, was du am Morgen weißt, ehe der Tag es dir wegredet." }
];

/* ------------------------------------------- achtundzwanzig Mondstationen
   Menâzil-i Kamer: die Herbergen, in denen der Mond auf seinem Umlauf je
   eine Nacht wohnt. Achtundzwanzig Stationen, achtundzwanzig Buchstaben —
   in den Handschriften ist das kein Zufall, sondern der Grund. Diese Schicht
   lassen fast alle heutigen Rechner weg. */
export const MENZILLER = [
  { no:1,  tr:"Şeretan",        ar:"الشرطان",      hukum:"Aufbruch. Das Erste von allem.", iyi:"Reise, Beginn, Arznei nehmen", kacin:"Hochzeit, Verträge auf Dauer" },
  { no:2,  tr:"Butayn",         ar:"البطين",        hukum:"Verborgener Bauch; wenig Segen, viel Vorrat.", iyi:"Verbergen, Verwahren, Sparen", kacin:"Großes anfangen, Bitten vortragen" },
  { no:3,  tr:"Süreyya",        ar:"الثريا",        hukum:"Das Siebengestirn — die glücklichste Herberge der ersten Hälfte.", iyi:"Bündnis, Handel, Reise, Lernen", kacin:"Nichts von Gewicht" },
  { no:4,  tr:"Debeân",         ar:"الدبران",       hukum:"Der Nachfolgende. Streit im Rücken.", iyi:"Erdarbeit, Grenzen ziehen", kacin:"Ehe, Gesellschaft, Reisen" },
  { no:5,  tr:"Hak'a",          ar:"الهقعة",        hukum:"Rückkehr und Wiederfinden.", iyi:"Heimkehr, Studium, Bündnis erneuern", kacin:"Neues Land betreten" },
  { no:6,  tr:"Hen'a",          ar:"الهنعة",        hukum:"Zeichen für Weg und Ernte.", iyi:"Reise, Aussaat, Ernte, Botschaft", kacin:"Hochzeit" },
  { no:7,  tr:"Zirâ",           ar:"الذراع",        hukum:"Der Arm; er nimmt und er gibt.", iyi:"Gewinn, Freundschaft, Reise, Arznei", kacin:"Streit suchen" },
  { no:8,  tr:"Nesre",          ar:"النثرة",        hukum:"Zuneigung — und ihre Kehrseite, die Bindung wider Willen.", iyi:"Liebe, Freundschaft, Heilung", kacin:"Gefangene lösen, Schulden aufnehmen" },
  { no:9,  tr:"Tarf",           ar:"الطرف",         hukum:"Der Blick, der trennt. Unglückliche Herberge.", iyi:"Auflösen, Beenden, Trennen", kacin:"Bauen, Heiraten, Säen" },
  { no:10, tr:"Cebhe",          ar:"الجبهة",        hukum:"Die Stirn des Löwen. Wohlwollen von oben.", iyi:"Bauen, Bitten bei Mächtigen, Liebe", kacin:"Verbergen, Fliehen" },
  { no:11, tr:"Zübre",          ar:"الزبرة",        hukum:"Aufstieg, Ansehen, ein gutes Wort zur rechten Zeit.", iyi:"Reise, Amt, Handel, Bündnis", kacin:"Feindschaft anfangen" },
  { no:12, tr:"Sarfe",          ar:"الصرفة",        hukum:"Das Wenden. Was hier beginnt, endet anders.", iyi:"Freilassen, Ernten, Kaufen und Verkaufen", kacin:"Ehe, langfristige Bindung" },
  { no:13, tr:"Avvâ",           ar:"العواء",        hukum:"Der Rufer. Gewinn aus der Ferne, Zwietracht in der Nähe.", iyi:"Reise, Saat, Gewinn", kacin:"Gesellschaft, gemeinsame Kasse" },
  { no:14, tr:"Simâk",          ar:"السماك",        hukum:"Der Hochstehende. Eintracht und Genesung.", iyi:"Heilung, Ehe, Versöhnung, Bauen", kacin:"Reise über Wasser" },
  { no:15, tr:"Gafr",           ar:"الغفر",         hukum:"Die Decke; was hier geschieht, bleibt bedeckt.", iyi:"Graben, Suchen, Reisen, Heilen", kacin:"Öffentliches Auftreten, Klagen" },
  { no:16, tr:"Zübânâ",         ar:"الزبانى",       hukum:"Die Scheren. Unglückliche Herberge, Trennung.", iyi:"Scheiden, Trennen, Feinde entzweien", kacin:"Ehe, Bündnis, Handel" },
  { no:17, tr:"İklîl",          ar:"الإكليل",       hukum:"Die Krone. Freundschaft, die trägt.", iyi:"Liebe, Bündnis, Handel, Bitten", kacin:"Rache, Streit" },
  { no:18, tr:"Kalb",           ar:"القلب",         hukum:"Das Herz des Skorpions. Scharfe Stunde.", iyi:"Feinde besiegen, Festes lösen", kacin:"Reise, Ehe, Neubeginn" },
  { no:19, tr:"Şevle",          ar:"الشولة",        hukum:"Der erhobene Stachel. Binden und Belagern.", iyi:"Bewahren, Verschließen, Standhalten", kacin:"Reise, Saat, Vertrauen schenken" },
  { no:20, tr:"Neâim",          ar:"النعائم",       hukum:"Die Straußenherde. Zähmen, was wild ist.", iyi:"Jagd, Zähmen, Erziehen, Gutes stiften", kacin:"Fliehen, Verstecken" },
  { no:21, tr:"Belde",          ar:"البلدة",        hukum:"Die leere Stelle. Grund für Neues.", iyi:"Bauen, Säen, Ehe, Grundstein legen", kacin:"Reise, Ortswechsel" },
  { no:22, tr:"Sa'dü'z-Zâbih",  ar:"سعد الذابح",   hukum:"Glück des Schlachtenden — Lösen durch Schnitt.", iyi:"Heilen, Befreien, Verträge auflösen", kacin:"Bündnis schließen" },
  { no:23, tr:"Sa'dü Bula'",    ar:"سعد بلع",      hukum:"Glück des Verschlingenden. Zweischneidig.", iyi:"Heilen, Zurückholen, Wasser leiten", kacin:"Ehe, Anvertrauen" },
  { no:24, tr:"Sa'dü's-Suûd",   ar:"سعد السعود",   hukum:"Glück der Glücke — die günstigste Herberge von allen.", iyi:"Alles Gute: Ehe, Handel, Reise, Bitten, Beginnen", kacin:"Nichts" },
  { no:25, tr:"Sa'dü'l-Ahbiye", ar:"سعد الأخبية",  hukum:"Glück der Zelte; Verborgenes, auch Verborgenes zum Schaden.", iyi:"Verbergen, Bewahren, Geheimes", kacin:"Öffentliches, Arznei, Ehe" },
  { no:26, tr:"Fer'u'l-Mukaddem", ar:"الفرغ المقدم", hukum:"Der vordere Ausguss. Der Zufluss beginnt.", iyi:"Gewinn, Bündnis, Ernte, Kaufen", kacin:"Zögern" },
  { no:27, tr:"Fer'u'l-Muahhar", ar:"الفرغ المؤخر", hukum:"Der hintere Ausguss. Was ausstand, kommt an.", iyi:"Handel, Rückkehr, Einfordern, Ernte", kacin:"Neue Schulden" },
  { no:28, tr:"Batnü'l-Hût",    ar:"بطن الحوت",    hukum:"Der Bauch des Fisches. Ende und Heimkehr.", iyi:"Heimkehr, Ehe, Handel, Abschluss", kacin:"Weit fortgehen" }
];

/* ------------------------------------------------------- Tafel der Absicht
   Niyet cetveli: nicht das Wesen, sondern die eine Frage. Der Ausschlag
   kommt aus der Summe von Frage, Name und Stunde des Fragens — dieselbe
   Frage zu anderer Stunde bekommt eine andere Antwort. So ist es gemeint. */
export const NIYET = [
  { no:1,  hukum:"Evet",        de:"Ja",              metin:"Die Sache ist reif. Was du zögerst, zögerst du aus alter Gewohnheit, nicht aus Vorsicht. Greif zu, und zwar in diesen Tagen." },
  { no:2,  hukum:"Hayır",       de:"Nein",            metin:"Nicht dieser Weg und nicht diese Menschen. Man wird dir das Gegenteil versichern; die Versicherung selbst ist das Zeichen." },
  { no:3,  hukum:"Bekle",       de:"Warte",           metin:"Weder ja noch nein — noch nicht. Es fehlt ein Dritter, der noch nicht gekommen ist. Frag nach vierzig Tagen wieder." },
  { no:4,  hukum:"Evet, lâkin", de:"Ja, aber",        metin:"Du bekommst, was du erbeten hast, in anderer Gestalt als gedacht. Nimm es trotzdem; die Gestalt wirst du später verstehen." },
  { no:5,  hukum:"Sakın",       de:"Hüte dich",       metin:"Es liegt eine Zunge dazwischen. Jemand, den du für gleichgültig hältst, redet über dich. Schweig über dein Vorhaben, bis es getan ist." },
  { no:6,  hukum:"Evet",        de:"Ja",              metin:"Die Antwort war längst da; du hast nur einen Zeugen gesucht. Hier ist er. Handle nach dem, was du im ersten Augenblick wusstest." },
  { no:7,  hukum:"Dön",         de:"Kehr um",         metin:"Der Fehler liegt weiter zurück als die Frage. Geh drei Schritte zurück und flick, was dort offen blieb; von dort aus geht es." },
  { no:8,  hukum:"Hayır",       de:"Nein",            metin:"Was du willst, ist nicht das, was du brauchst, und du ahnst es. Der Verlust, den du fürchtest, ist die Erleichterung, die du suchst." },
  { no:9,  hukum:"Bekle",       de:"Warte",           metin:"Die Stunde steht schlecht, die Sache gut. Ändere nicht das Vorhaben, ändere den Tag. Suche den Tag deines Herrschersterns." },
  { no:10, hukum:"Evet, çabuk", de:"Ja, aber schnell",metin:"Ein Fenster steht offen und schließt sich bald. Was in diesem Mond nicht beginnt, beginnt in diesem Jahr nicht mehr." },
  { no:11, hukum:"Sor başkasını", de:"Frag anders",   metin:"Du hast nicht die Frage gestellt, die du meinst. Schreib sie in einem Satz auf, ohne Nebensatz — und frag noch einmal." },
  { no:12, hukum:"Evet",        de:"Ja",              metin:"Segen liegt darauf, aber nicht schnell. Es kommt langsam und bleibt lange. Rechne in Jahren, nicht in Wochen." }
];

/* ---------------------------------------------------- Verträglichkeit
   İsim uyumu: die Handschriften rechnen die beiden Summen gegeneinander
   und lesen den Rest. Dazu tritt die alte Regel der Elemente — Feuer und
   Luft nähren einander, Erde und Wasser tragen einander. */
export const UNSUR_UYUM = {
  "Ateş|Ateş":  ["Zwei Feuer", "Ihr brennt hell und ihr brennt schnell. Solange ihr ein gemeinsames Ziel außerhalb von euch habt, ist es gut; sobald ihr euch gegenseitig zum Ziel nehmt, wird es Streit."],
  "Ateş|Hava":  ["Feuer und Luft", "Die Luft nährt das Feuer. Das ist der leichteste aller Bünde — und der, in dem am ehesten das Maß verlorengeht."],
  "Ateş|Toprak":["Feuer und Erde", "Er will los, sie will bleiben — oder umgekehrt. Es kann tragen, wenn beide es aushalten, dass der andere nicht schneller wird und nicht langsamer."],
  "Ateş|Su":    ["Feuer und Wasser", "Das eine löscht, das andere verdampft. Der schwerste Bund und zugleich der, der am meisten verwandelt, wenn er hält."],
  "Toprak|Toprak":["Zwei Erden", "Fest, verlässlich, dauerhaft — und in Gefahr, gemeinsam stehenzubleiben. Sucht euch etwas, das euch beide zwingt, umzuziehen."],
  "Toprak|Su": ["Erde und Wasser", "Wasser macht die Erde fruchtbar, Erde gibt dem Wasser ein Bett. Der ruhigste und fruchtbarste Bund der vier."],
  "Toprak|Hava":["Erde und Luft", "Sie redet, er baut. Ihr versteht einander selten sofort und oft am Ende doch — vorausgesetzt, keiner hält die Art des anderen für einen Fehler."],
  "Hava|Hava": ["Zwei Lüfte", "Ihr versteht euch im Wort und verfehlt euch im Leib. Sorgt für das Gemeinsame, das man anfassen kann: ein Haus, eine Arbeit, ein Tisch."],
  "Hava|Su":   ["Luft und Wasser", "Luft kräuselt das Wasser und bringt es nie zur Ruhe. Viel Empfindung, wenig Halt — es braucht feste Verabredungen."],
  "Su|Su":     ["Zwei Wasser", "Tief, wortlos, ineinander. Ihr wisst voneinander alles und sagt euch wenig; darum ist die eine Gefahr, dass ihr euch verliert, ohne es zu bemerken."]
};

export const UYUM = [
  { no:1,  hukum:"Sehr gut",   metin:"Der Bund steht unter einem offenen Zeichen. Was ihr gemeinsam anfangt, gelingt schneller als das, was jeder allein anfängt." },
  { no:2,  hukum:"Gut",        metin:"Ruhig und tragfähig. Kein Feuerwerk, aber es hält über die Jahre — und die Jahre sind es, die zählen." },
  { no:3,  hukum:"Geteilt",    metin:"Im Wort einig, in der Sache nicht. Prüft an einer kleinen gemeinsamen Ausgabe, ob ihr dieselbe Ordnung meint." },
  { no:4,  hukum:"Gut",        metin:"Einer trägt, einer treibt. Das ist kein Ungleichgewicht, solange beide wissen, wer gerade welches ist." },
  { no:5,  hukum:"Achtung",    metin:"Ein Dritter steht dazwischen — ein Mensch, ein Amt oder ein altes Versprechen. Bis das geklärt ist, klärt sich nichts anderes." },
  { no:6,  hukum:"Sehr gut",   metin:"Gleiche Sprache, gleiches Maß. Ihr könnt miteinander arbeiten, nicht nur miteinander leben; das ist selten." },
  { no:7,  hukum:"Geteilt",    metin:"Große Anziehung, große Reibung, beides aus demselben Grund. Es wird nie bequem und selten langweilig." },
  { no:8,  hukum:"Schwer",     metin:"Ihr ähnelt euch in dem, was ihr an euch selbst nicht mögt. Solange keiner das ausspricht, wird gestritten über anderes." },
  { no:9,  hukum:"Gut",        metin:"Segen auf Weg und Haus. Reisen, Umzüge und alles, was ihr fern von zu Hause tut, gelingt euch besser als das Nahe." },
  { no:10, hukum:"Achtung",    metin:"Zwischen euch steht das Geld oder die Zeit. Regelt beides früh und schriftlich; es ist keine Kränkung, es ist Vorsorge." },
  { no:11, hukum:"Gut",        metin:"Freundschaft trägt hier weiter als Leidenschaft. Wenn ihr Gefährten bleibt, bleibt ihr alles andere auch." },
  { no:12, hukum:"Sehr gut",   metin:"Ein alter Bund, so lesen es die Bücher — als hättet ihr euch nicht getroffen, sondern wiedergetroffen." }
];

/* ------------------------------------------------------ Planetenstunden
   Jede Stunde des Tages hat ihren Herrn. Die erste Stunde nach Sonnen-
   aufgang gehört dem Herrn des Wochentages, danach läuft die chaldäische
   Ordnung weiter — absteigend nach der Himmelshöhe. */
export const SAAT_SIRASI = ["Zühal","Müşteri","Merih","Şems","Zühre","Utarit","Kamer"];
export const GUN_SAHIBI = ["Şems","Kamer","Merih","Utarit","Müşteri","Zühre","Zühal"];
export const GUN_ADI = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
