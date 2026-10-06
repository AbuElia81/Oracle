/* ------------------------------------------------------------------------
   planeten-it.js — i sette pianeti erranti, in italiano.

   Le figure sono quelle del Picatrix: egli le descrive così esattamente
   perché si dovessero poter intagliare nella pietra. Metallo, giorno,
   natura, colore ed età restano quelli delle tavole.
   ------------------------------------------------------------------------ */

export const WANDELSTERNE_IT = {
  saturn: {
    name:"Saturno", metall:"piombo", tag:"sabato", natur:"freddo e secco",
    farbe:"nero", alter:"la vecchiaia",
    gestalt:"Un uomo scarno in piedi su un drago, tutto in nero, il volto nell'ombra del " +
      "cappuccio, un corvo sulla spalla. Nella destra una falce, nella sinistra una lancia " +
      "rivolta verso la terra.",
    bedeutet:"Il padre e la vecchiaia. La morte e l'eredità. Terreni e fondi, campi, miniere, " +
      "tutto ciò che è profondo e nascosto. Contadini, minatori, conciatori, becchini, monaci ed " +
      "eremiti. La prigione e la solitudine. La pazienza. Tutto ciò che richiede molto tempo e " +
      "molto tempo rimane.",
    gedanke:"Saturno è il più esterno dei sette e il più lento — trent'anni per un giro. Perciò " +
      "i libri antichi ne fecero il guardiano del confine: dove sta lui, qualcosa finisce, e dove " +
      "qualcosa finisce, comincia qualcosa che dura di più. Vale come il più grave dei due " +
      "malefici — ma nelle nascite diurne più mite, perché non rafforza anche il freddo della notte."
  },
  jupiter: {
    name:"Giove", metall:"stagno", tag:"giovedì", natur:"caldo e umido",
    farbe:"blu e porpora", alter:"gli anni maturi",
    gestalt:"Un uomo coronato in veste color zafferano su un'aquila dalle ali spiegate. La " +
      "destra aperta e levata nel gesto del giudizio, nella sinistra un rotolo chiuso.",
    bedeutet:"Il giudice e la legge. Ricchezza, figli, eredità in senso buono. Fede, sacerdoti, " +
      "dotti, giuristi. Magnanimità, fiducia, misura. Tutto ciò che cresce perché lo si lascia " +
      "crescere.",
    gedanke:"Giove si chiama il benefico maggiore, e i libri non lo motivano col fatto che faccia " +
      "del bene, ma col fatto che dà spazio. Dove sta lui, c'è più posto del necessario. Nelle " +
      "nascite notturne cede il passo a Venere — non perché sia più debole, ma perché la notte " +
      "preferisce il beneficio più sommesso."
  },
  mars: {
    name:"Marte", metall:"ferro", tag:"martedì", natur:"caldo e secco",
    farbe:"rosso", alter:"la giovinezza",
    gestalt:"Un uomo armato su un leone, l'elmo in capo, nella destra levata una spada nuda. " +
      "Dietro di lui fiamme.",
    bedeutet:"La guerra e le armi. Fuoco, fabbri, macellai, chirurghi — tutto ciò che taglia. " +
      "Fratelli e contesa. Collera e coraggio. Ladri e predoni. Febbri, ferite, e tutto ciò che " +
      "viene all'improvviso.",
    gedanke:"Marte separa. Ogni taglio gli appartiene — quello del chirurgo come quello " +
      "dell'assassino, e i libri antichi non fanno fra i due alcuna differenza, perché il taglio " +
      "è lo stesso. È il più grave dei malefici nelle nascite notturne; di giorno è soltanto rapido."
  },
  sonne: {
    name:"il Sole", metall:"oro", tag:"domenica", natur:"caldo e secco",
    farbe:"oro", alter:"il mezzo della vita",
    gestalt:"Un re in trono, visto di fronte, una corona radiata sul capo, un disco d'oro davanti " +
      "al petto, un corvo ai suoi piedi.",
    bedeutet:"Il re e il padre. Onore, rango, considerazione. La vista e il cuore. Oro, pietre " +
      "preziose, tutto ciò che risplende. Principi, giudici, padri. La vita stessa.",
    gedanke:"Il sole non è il più forte dei sette, ma il centro: tutto il resto si misura su di " +
      "lui. Da qui la regola singolare per cui brucia ciò che gli viene troppo vicino — un " +
      "pianeta nella sua prossimità continua ad agire, ma nessuno lo vede più. Solo chi gli " +
      "arriva vicinissimo, più vicino di un terzo di grado, sta nel suo cuore ed è allora il più " +
      "favorito di tutti."
  },
  venus: {
    name:"Venere", metall:"rame", tag:"venerdì", natur:"freddo e umido",
    farbe:"verde e bianco", alter:"gli anni giovani",
    gestalt:"Una donna dai capelli sciolti su un cervo bianco, vestita di bianco, nella destra " +
      "una mela, nella sinistra dei fiori, un piccolo specchio alla cintura. Colombe nell'aria " +
      "intorno a lei.",
    bedeutet:"Matrimonio e amore. Bellezza, musica, danza, vesti, gioielli, profumi. La madre " +
      "nelle nascite notturne. Gioia, gioco, convito. Pittori, musicanti, tessitori e tutti " +
      "coloro che commerciano in cose belle.",
    gedanke:"Venere lega ciò che Marte separa — è la più antica coppia di opposti di questa " +
      "dottrina. Ciò che lei tocca vuole restare insieme. Nelle nascite notturne è il benefico " +
      "maggiore: la notte appartiene a ciò che è morbido."
  },
  merkur: {
    name:"Mercurio", metall:"mercurio", tag:"mercoledì", natur:"mutevole",
    farbe:"tutti i colori insieme", alter:"l'infanzia",
    gestalt:"Un giovane snello e imberbe su un pavone, calzari alati ai piedi, nella destra una " +
      "canna da scrivere, nella sinistra una tavoletta di cera aperta, un gallo al suo fianco.",
    bedeutet:"Parola e scrittura. Commercio, calcolo, contratti. Messaggeri, scrivani, mercanti, " +
      "dotti — e ladri e imbroglioni, perché gli uni e gli altri vivono di destrezza. Fratelli, " +
      "notizie, strade brevi. Memoria e arguzia.",
    gedanke:"Mercurio è l'unico a non avere una natura propria. I libri dicono: assume la natura " +
      "di colui presso cui sta — presso Saturno diventa pesante, presso Venere gradevole, presso " +
      "Marte tagliente. Per questo in nessun elenco è benefico e in nessuno malefico."
  },
  mond: {
    name:"la Luna", metall:"argento", tag:"lunedì", natur:"freddo e umido",
    farbe:"bianco e argento", alter:"i primi anni",
    gestalt:"Una donna dal volto quieto su un drago, due corna lunari sul capo, in ciascuna mano " +
      "un serpente. Dietro di lei la luna piena, sotto di lei acqua e un vaso di latte.",
    bedeutet:"La madre. Il nutrimento e tutto ciò che nutre. Crescita, acqua, latte, tutti gli " +
      "umori. Il popolo e la moltitudine. Viaggi per acqua. <b>Il sapere</b> — perché la luna " +
      "porta avanti la luce degli altri. <b>L'onore</b>, quando è piena. E il <b>sacrificio</b>: " +
      "cala ogni mese prima di tornare.",
    gedanke:"La luna non ha luce propria, e proprio su questo riposa la sua posizione in questa " +
      "dottrina. È la messaggera fra l'alto e il basso — ciò che accade in cielo raggiunge la " +
      "terra attraverso di lei. Perciò è il più importante indicatore di tutta l'arte oraria: non " +
      "perché significhi molto, ma perché passa tutto avanti. La dottrina araba la chiama la " +
      "traslazione della luce."
  }
};

export const PLANETEN_UI_IT = {
  "titel":"I sette pianeti erranti",
  "note":"Le immagini sono eseguite secondo le descrizioni del Picatrix, non ricalcate da un " +
    "manoscritto — le copie medievali contengono le figure come testo, non come immagine.",
  "metall":"Metallo", "tag":"Giorno", "natur":"Natura", "farbe":"Colore", "alter":"Età della vita",
  "gestalt":"La figura nel Picatrix.", "bedeutet":"Che cosa significa."
};
