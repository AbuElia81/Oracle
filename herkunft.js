/* ------------------------------------------------------------------------
   herkunft.js — woher jeder Absatz der Lesung kommt.

   Die Lesung spricht in Bildern und nennt keine Fachbegriffe. Das ist
   Absicht: Wer sie liest, will nicht wissen, was ein Almuten ist. Aber
   wer es doch wissen will, soll nicht suchen müssen.

   Darum bekommt jeder Absatz eine Zeile darunter, die sich aufklappen
   lässt: Wie die Technik heißt, woher sie stammt, wie gerechnet wird —
   und ein Knopf, der in den vollen Abschnitt führt. Zugeklappt sieht man
   davon nichts als drei Worte.
   ------------------------------------------------------------------------ */

export const HERKUNFT = {
  de: {
    "titel.anfang": { technik:"Der Aszendent und sein Herrscher", abschnitt:"bHoroskop",
      quelle:"Hellenistisch, seit Ptolemäus",
      wie:"Aus Datum, Uhrzeit und Ort wird der Grad berechnet, der in deiner Geburtsstunde " +
          "über den Osthorizont stieg. Der Herr seines Zeichens heißt der Herrscher des " +
          "Horoskops; wo er steht, gilt als Richtung des Lebens. Dazu die Sekte: ob die Sonne " +
          "über oder unter dem Horizont stand." },
    "titel.zwei": { technik:"Der engste Aspekt", abschnitt:"bHoroskop",
      quelle:"Ptolemäus, Tetrabiblos I",
      wie:"Von allen Winkeln zwischen je zwei Planeten wird der engste genommen — Konjunktion, " +
          "Sextil, Quadrat, Trigon oder Opposition, mit Orbis von sechs bis acht Grad." },
    "titel.werDuBist": { technik:"Yıldıznâme — das Sternbuch", abschnitt:"bYildiz",
      quelle:"Osmanisch, nach arabischem Vorbild",
      wie:"Dein Name und der deiner Mutter werden arabisch geschrieben, ihre Buchstaben nach " +
          "dem Ebced addiert und die Summe durch zwölf geteilt. Der Rest nennt das Zeichen." },
    "titel.herberge": { technik:"Die achtundzwanzig Mondstationen", abschnitt:"bMenzil",
      quelle:"Arabisch — menâzil al-qamar",
      wie:"Dieselbe Namenssumme, geteilt durch achtundzwanzig. Der Rest nennt die Herberge, " +
          "in der der Mond auf seinem Weg steht — jede hat ihr eigenes Urteil." },
    "titel.gegeben": { technik:"Der Herrscherstern des Zeichens", abschnitt:"bYildiz",
      quelle:"Osmanisch",
      wie:"Jedem Zeichen ist ein Planet zugeordnet. Was er gibt und was er nimmt, steht in den " +
          "Tafeln seit Jahrhunderten gleichlautend da." },
    "titel.geist": { technik:"Der Geistname nach Agrippa", abschnitt:"bGeist",
      quelle:"Cornelius Agrippa, De Occulta Philosophia III, 26",
      wie:"Fünf Stellen des Geburtshimmels — Aszendent, Sonne, Mond, Glückspunkt und die " +
          "letzte Zusammenkunft von Sonne und Mond vor der Geburt — werden auf den Kreis der " +
          "hebräischen Buchstaben gelegt. Jede gibt einen Buchstaben; zusammen ergeben sie " +
          "einen Namen." },
    "titel.kapitel": { technik:"Zodiacal Releasing", abschnitt:"bZR",
      quelle:"Vettius Valens, 2. Jh.",
      wie:"Vom Glückspunkt aus werden die zwölf Zeichen nacheinander freigesetzt, jedes so " +
          "viele Jahre, wie sein Herr an kleineren Jahren trägt. Dieselbe Zählung wiederholt " +
          "sich in jedem Abschnitt noch einmal feiner — darum gibt es Kapitel, Unterkapitel " +
          "und Monate." },
    "titel.strecken": { technik:"Die Gipfel und das Lösen des Bandes", abschnitt:"bZR",
      quelle:"Vettius Valens",
      wie:"Fällt ein Abschnitt in eines der Winkelzeichen vom Glückspunkt aus, gilt er als " +
          "laut. Und wo die Zählung das Ende eines Zeichenkreises erreicht, springt sie zurück " +
          "— das ist das Lösen des Bandes, die auffälligste Stelle einer Biographie." },
    "titel.jahreFuehrt": { technik:"Firdaria und Vimshottari", abschnitt:"bFirdaria",
      quelle:"Persisch-arabisch und indisch",
      wie:"Zwei Zählungen, die keine Zeichen abzählen, sondern feste Mengen von Jahren " +
          "verteilen: fünfundsiebzig auf neun Herren bei Abū Maʿšar, hundertzwanzig auf neun " +
          "bei der indischen. Welche zuerst kommt, entscheidet dort die Sekte, hier der Stand " +
          "des Mondes bei der Geburt." },
    "titel.austeilt": { technik:"Die Verteilung durch die Grenzen", abschnitt:"bVerteilung",
      quelle:"Dorotheos von Sidon, 1. Jh.",
      wie:"Der Aszendent wandert mit der Drehung des Himmels durch die fünf Grenzen jedes " +
          "Zeichens. Jede Grenze dauert so lange, wie sie an deinem Geburtsort wirklich zum " +
          "Aufgehen braucht — darum sind die Abschnitte ungleich lang, und darum ist dies die " +
          "einzige Technik, die nach dem Ort fragt." },
    "titel.klopft": { technik:"Primärdirektionen", abschnitt:"bLebensbogen",
      quelle:"Ptolemäus, Tetrabiblos III",
      wie:"Nicht die Planeten bewegen sich, sondern der ganze Himmel dreht sich um die " +
          "Weltachse. Ein Grad dieser Drehung gilt für ein Lebensjahr. Erreicht ein Punkt " +
          "dabei die Stelle eines anderen, heißt das: Hier wird ein Thema fällig." },
    "titel.verborgen": { technik:"Antiszien — die Schattenzwillinge", abschnitt:"bAntiszien",
      quelle:"Hellenistisch",
      wie:"Zwei Punkte, die an der Sonnenwendachse gespiegelt liegen, haben dieselbe " +
          "Sonnendeklination: Die Sonne wirft an beiden den gleich langen Mittagsschatten. " +
          "Sie wirken zusammen, obwohl kein Aspekt zwischen ihnen steht." },
    "titel.jahr": { technik:"Profektion, Jahresumdrehung und Transite", abschnitt:"bProfektionen",
      quelle:"Hellenistisch und arabisch",
      wie:"Drei Techniken für dasselbe Jahr: Die Profektion rückt mit jedem Geburtstag ein " +
          "Zeichen weiter. Die Jahresumdrehung stellt ein Horoskop für den Augenblick, in dem " +
          "die Sonne auf ihren Geburtsgrad zurückkehrt. Die Transite zeigen, wo die langsamen " +
          "Planeten gerade wirklich stehen." },
    "titel.geber": { technik:"Hylech und Alkochoden", abschnitt:"bLebensmass",
      quelle:"Arabisch, nach griechischem Vorbild",
      wie:"Gesucht wird erst die Stelle, von der das Leben ausgeht — Sonne, Mond, Syzygie " +
          "oder Aszendent, je nachdem, welche in einem der Lebensörter steht. Dann der Planet, " +
          "der über dieser Stelle die meiste Würde hat." },
    "titel.zusammen": { technik:"Die Zusammenschau", abschnitt:null,
      quelle:"Keine einzelne Technik",
      wie:"Hier wird nur verglichen, was die vier Zeitherren-Systeme unabhängig voneinander " +
          "sagen: Zodiacal Releasing, Profektion, Firdaria und Vimshottari. Nennen mehrere " +
          "denselben Planeten, zählt das in dieser Lehre mehr als jede einzelne Aussage." }
  },

  it: {
    "titel.anfang": { technik:"L'Ascendente e il suo signore", abschnitt:"bHoroskop",
      quelle:"Ellenistico, da Tolomeo in poi",
      wie:"Da data, ora e luogo si calcola il grado che nell'ora della tua nascita saliva " +
          "oltre l'orizzonte orientale. Il signore del suo segno si chiama signore " +
          "dell'oroscopo; dove sta lui vale come direzione della vita. In più la setta: se il " +
          "sole stava sopra o sotto l'orizzonte." },
    "titel.zwei": { technik:"L'aspetto più stretto", abschnitt:"bHoroskop",
      quelle:"Tolomeo, Tetrabiblos I",
      wie:"Fra tutti gli angoli fra due pianeti si prende il più stretto — congiunzione, " +
          "sestile, quadrato, trigono o opposizione, con orbe da sei a otto gradi." },
    "titel.werDuBist": { technik:"Yıldıznâme — il libro delle stelle", abschnitt:"bYildiz",
      quelle:"Ottomano, su modello arabo",
      wie:"Il tuo nome e quello di tua madre vengono scritti in arabo, le loro lettere sommate " +
          "secondo l'ebced e la somma divisa per dodici. Il resto nomina il segno." },
    "titel.herberge": { technik:"Le ventotto stazioni lunari", abschnitt:"bMenzil",
      quelle:"Arabo — menâzil al-qamar",
      wie:"La stessa somma del nome, divisa per ventotto. Il resto nomina la stazione in cui " +
          "la luna sta sul suo cammino — ciascuna ha il proprio giudizio." },
    "titel.gegeben": { technik:"La stella dominante del segno", abschnitt:"bYildiz",
      quelle:"Ottomano",
      wie:"A ogni segno è assegnato un pianeta. Ciò che dà e ciò che prende sta nelle tavole " +
          "da secoli con le stesse parole." },
    "titel.geist": { technik:"Il nome dello spirito secondo Agrippa", abschnitt:"bGeist",
      quelle:"Cornelio Agrippa, De Occulta Philosophia III, 26",
      wie:"Cinque luoghi del cielo di nascita — Ascendente, Sole, Luna, Parte della Fortuna e " +
          "l'ultimo incontro di sole e luna prima della nascita — vengono posti sul cerchio " +
          "delle lettere ebraiche. Ciascuno dà una lettera; insieme formano un nome." },
    "titel.kapitel": { technik:"Zodiacal Releasing", abschnitt:"bZR",
      quelle:"Vettius Valens, II sec.",
      wie:"Dalla Parte della Fortuna i dodici segni vengono liberati uno dopo l'altro, " +
          "ciascuno per tanti anni quanti il suo signore porta di anni minori. Lo stesso " +
          "conteggio si ripete dentro ogni periodo più finemente — di qui capitoli, " +
          "sottocapitoli e mesi." },
    "titel.strecken": { technik:"I culmini e lo scioglimento del legame", abschnitt:"bZR",
      quelle:"Vettius Valens",
      wie:"Se un periodo cade in uno dei segni angolari rispetto alla Parte della Fortuna, " +
          "vale come rumoroso. E dove il conteggio raggiunge la fine di un giro di segni, " +
          "salta indietro — è lo scioglimento del legame, il punto più vistoso di una biografia." },
    "titel.jahreFuehrt": { technik:"Firdaria e Vimshottari", abschnitt:"bFirdaria",
      quelle:"Persiano-arabo e indiano",
      wie:"Due conteggi che non contano segni, ma distribuiscono quantità fisse di anni: " +
          "settantacinque su nove signori in Abū Maʿšar, centoventi su nove in quello indiano. " +
          "Quale venga per primo lo decide là la setta, qui la posizione della luna alla nascita." },
    "titel.austeilt": { technik:"La distribuzione per i termini", abschnitt:"bVerteilung",
      quelle:"Doroteo di Sidone, I sec.",
      wie:"L'Ascendente cammina con la rotazione del cielo attraverso i cinque termini di ogni " +
          "segno. Ogni termine dura quanto gli occorre realmente per sorgere sul tuo luogo di " +
          "nascita — per questo i periodi sono di lunghezza diversa, e per questo è l'unica " +
          "tecnica che chieda del luogo." },
    "titel.klopft": { technik:"Direzioni primarie", abschnitt:"bLebensbogen",
      quelle:"Tolomeo, Tetrabiblos III",
      wie:"Non sono i pianeti a muoversi, ma tutto il cielo a girare intorno all'asse del " +
          "mondo. Un grado di questa rotazione vale per un anno di vita. Quando un punto " +
          "raggiunge così il luogo di un altro, vuol dire: qui un tema viene a scadenza." },
    "titel.verborgen": { technik:"Antiscia — i gemelli d'ombra", abschnitt:"bAntiszien",
      quelle:"Ellenistico",
      wie:"Due punti specchiati sull'asse dei solstizi hanno la stessa declinazione solare: il " +
          "sole getta in entrambi un'ombra meridiana della stessa lunghezza. Agiscono insieme " +
          "pur non essendoci fra loro alcun aspetto." },
    "titel.jahr": { technik:"Profezione, rivoluzione solare e transiti", abschnitt:"bProfektionen",
      quelle:"Ellenistico e arabo",
      wie:"Tre tecniche per lo stesso anno: la profezione avanza di un segno a ogni compleanno. " +
          "La rivoluzione solare erige un oroscopo per l'istante in cui il sole torna sul suo " +
          "grado di nascita. I transiti mostrano dove i pianeti lenti stiano ora davvero." },
    "titel.geber": { technik:"Hyleg e alcocoden", abschnitt:"bLebensmass",
      quelle:"Arabo, su modello greco",
      wie:"Si cerca prima il luogo da cui la vita prende le mosse — sole, luna, sizigia o " +
          "Ascendente, a seconda di quale stia in uno dei luoghi vitali. Poi il pianeta che su " +
          "quel luogo ha più dignità." },
    "titel.zusammen": { technik:"La sinossi", abschnitt:null,
      quelle:"Nessuna tecnica singola",
      wie:"Qui si confronta soltanto ciò che i quattro sistemi dei signori del tempo dicono " +
          "indipendentemente: Zodiacal Releasing, profezione, firdaria e vimshottari. Se più " +
          "di uno nomina lo stesso pianeta, in questa dottrina conta più di ogni singola " +
          "affermazione." }
  },

  en: {
    "titel.anfang": { technik:"The Ascendant and its lord", abschnitt:"bHoroskop",
      quelle:"Hellenistic, since Ptolemy",
      wie:"From date, time and place the degree is calculated that rose over the eastern " +
          "horizon in your hour of birth. The lord of its sign is called the ruler of the " +
          "chart; where he stands counts as the direction of the life. Along with the sect: " +
          "whether the sun stood above or below the horizon." },
    "titel.zwei": { technik:"The closest aspect", abschnitt:"bHoroskop",
      quelle:"Ptolemy, Tetrabiblos I",
      wie:"Of all the angles between any two planets the closest is taken — conjunction, " +
          "sextile, square, trine or opposition, with an orb of six to eight degrees." },
    "titel.werDuBist": { technik:"Yıldıznâme — the star book", abschnitt:"bYildiz",
      quelle:"Ottoman, after an Arabic model",
      wie:"Your name and your mother's are written in Arabic, their letters added up by the " +
          "abjad and the sum divided by twelve. The remainder names the sign." },
    "titel.herberge": { technik:"The twenty-eight lunar mansions", abschnitt:"bMenzil",
      quelle:"Arabic — manāzil al-qamar",
      wie:"The same name-sum, divided by twenty-eight. The remainder names the lodging in " +
          "which the moon stands on its way — each has a judgment of its own." },
    "titel.gegeben": { technik:"The ruling star of the sign", abschnitt:"bYildiz",
      quelle:"Ottoman",
      wie:"Each sign has a planet assigned to it. What it gives and what it takes has stood " +
          "in the tables, in the same words, for centuries." },
    "titel.geist": { technik:"The name of the spirit after Agrippa", abschnitt:"bGeist",
      quelle:"Cornelius Agrippa, De Occulta Philosophia III, 26",
      wie:"Five places of the birth sky — Ascendant, Sun, Moon, Lot of Fortune, and the last " +
          "meeting of sun and moon before the birth — are laid on the circle of the Hebrew " +
          "letters. Each gives a letter; together they make a name." },
    "titel.kapitel": { technik:"Zodiacal Releasing", abschnitt:"bZR",
      quelle:"Vettius Valens, 2nd century",
      wie:"From the Lot of Fortune the twelve signs are released one after another, each for " +
          "as many years as its lord carries lesser years. The same count repeats itself more " +
          "finely within every stretch — hence chapters, sub-chapters and months." },
    "titel.strecken": { technik:"The peaks and the loosing of the bond", abschnitt:"bZR",
      quelle:"Vettius Valens",
      wie:"If a stretch falls in one of the angular signs counted from the Lot of Fortune, it " +
          "counts as loud. And where the count reaches the end of a round of signs, it jumps " +
          "back — that is the loosing of the bond, the most conspicuous place in a life." },
    "titel.jahreFuehrt": { technik:"Firdaria and Vimshottari", abschnitt:"bFirdaria",
      quelle:"Persian-Arabic and Indian",
      wie:"Two reckonings that count off no signs but hand out fixed quantities of years: " +
          "seventy-five across nine lords in Abū Maʿšar, a hundred and twenty across nine in " +
          "the Indian. Which comes first is decided there by the sect, here by where the moon " +
          "stood at birth." },
    "titel.austeilt": { technik:"Distribution through the bounds", abschnitt:"bVerteilung",
      quelle:"Dorotheus of Sidon, 1st century",
      wie:"The Ascendant travels with the turning of the sky through the five bounds of each " +
          "sign. Each bound lasts as long as it actually needs to rise at your birthplace — " +
          "hence the stretches are of unequal length, and hence this is the only technique " +
          "that asks for the place." },
    "titel.klopft": { technik:"Primary directions", abschnitt:"bLebensbogen",
      quelle:"Ptolemy, Tetrabiblos III",
      wie:"It is not the planets that move but the whole sky that turns about the world axis. " +
          "One degree of this turning counts for one year of life. When a point reaches the " +
          "place of another in the course of it, that means: here a theme falls due." },
    "titel.verborgen": { technik:"Antiscia — the shadow twins", abschnitt:"bAntiszien",
      quelle:"Hellenistic",
      wie:"Two points mirrored about the solstice axis have the same solar declination: at " +
          "both of them the sun throws a noon shadow of equal length. They work together " +
          "although no aspect stands between them." },
    "titel.jahr": { technik:"Profection, solar revolution and transits", abschnitt:"bProfektionen",
      quelle:"Hellenistic and Arabic",
      wie:"Three techniques for the same year: the profection moves on one sign with every " +
          "birthday. The solar revolution sets a chart for the moment the sun returns to its " +
          "birth degree. The transits show where the slow planets actually stand just now." },
    "titel.geber": { technik:"Hyleg and alcocoden", abschnitt:"bLebensmass",
      quelle:"Arabic, after a Greek model",
      wie:"First the place from which the life proceeds is sought — Sun, Moon, syzygy or " +
          "Ascendant, whichever stands in one of the places of life. Then the planet that has " +
          "the most dignity over that place." },
    "titel.zusammen": { technik:"The synopsis", abschnitt:null,
      quelle:"No single technique",
      wie:"Here only what the four time-lord systems say independently of one another is " +
          "compared: Zodiacal Releasing, profection, firdaria and vimshottari. If several " +
          "name the same planet, that counts for more in this teaching than any single " +
          "statement." }
  }
};

export const HERKUNFT_UI = {
  de: { auf:"Woher das kommt", quelle:"Quelle", wie:"Wie gerechnet wird",
        mehr:"Zum ganzen Abschnitt" },
  it: { auf:"Da dove viene", quelle:"Fonte", wie:"Come si calcola",
        mehr:"Alla sezione completa" },
  en: { auf:"Where this comes from", quelle:"Source", wie:"How it is calculated",
        mehr:"To the full section" }
};

let aktiv = "de";
export function setzeHerkunftSprache(code) { aktiv = HERKUNFT[code] ? code : "de"; }
export function herkunftVon(schluessel) {
  return (HERKUNFT[aktiv] || HERKUNFT.de)[schluessel] || HERKUNFT.de[schluessel] || null;
}
export function hUi(k) { return (HERKUNFT_UI[aktiv] || HERKUNFT_UI.de)[k]; }
