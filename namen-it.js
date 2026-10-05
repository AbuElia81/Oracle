/* ------------------------------------------------------------------------
   namen-it.js — i nomi stessi.

   Finché i pianeti si chiamano Merkur e i segni Skorpion, nessuna
   traduzione regge: i nomi compaiono dentro quasi ogni frase. Qui stanno
   i sette pianeti, i dodici segni, i dodici campi e i quattro elementi.
   ------------------------------------------------------------------------ */

export const PLANET_NAME_IT = {
  sonne:"il Sole", mond:"la Luna", merkur:"Mercurio", venus:"Venere",
  mars:"Marte", jupiter:"Giove", saturn:"Saturno"
};

/* L'italiano non ha casi, ma ha l'articolo: "di Mercurio", ma "del Sole". */
export const PLANET_ARTIKEL_IT = { sonne:"il Sole", mond:"la Luna" };

export const ZEICHEN_NAME_IT = [
  "Ariete","Toro","Gemelli","Cancro","Leone","Vergine",
  "Bilancia","Scorpione","Sagittario","Capricorno","Acquario","Pesci"
];

export const HAUS_IT = [
  "nel corpo stesso e nel modo di presentarsi",
  "nei beni e nel guadagno",
  "sulle strade vicine, fra fratelli e notizie",
  "in casa, presso l'origine e i genitori",
  "presso i figli, il piacere e ogni cosa prodotta",
  "nel lavoro, nel servizio e nella salute",
  "presso l'altro — matrimonio, patti, avversari dichiarati",
  "nella perdita, nell'eredità e in ogni cosa presa a prestito",
  "in terra straniera, nello studio e nella fede",
  "nella carica e nella reputazione",
  "fra amici, in alleanze e speranze",
  "nel nascosto e sulla propria strada"
];

export const ELEMENT_NAME_IT = { "Feuer":"Fuoco", "Erde":"Terra", "Luft":"Aria", "Wasser":"Acqua" };

/* Le descrizioni delle parti arabe. */
export const PUNKT_IT = {
  fortuna: { name:"Fortuna",
    was:"Il corpo e ciò che tocca in sorte. Il luogo più antico e più usato di tutti: dove la " +
        "fortuna viene da fuori, senza che la si sia guadagnata." },
  geist: { name:"Spirito",
    was:"Il contrappunto della Fortuna. Ciò che non tocca in sorte, ma viene da sé — volontà, " +
        "proposito, il voluto. Gli antichi dicono: Fortuna è ciò che ti accade, Spirito ciò che fai." },
  liebe: { name:"Amore",
    was:"Dove nasce l'affetto e verso che cosa si volge — non il matrimonio, ma il piacere " +
        "stesso, anche per cose e per arti." },
  not: { name:"Necessità",
    was:"Dove si sta sotto costrizione e non si ha scelta. Gli autori arabi vi pongono anche la " +
        "lite e i debiti." },
  sieg: { name:"Vittoria",
    was:"Dove si passa. Non fortuna, ma riuscita contro resistenza — e dove la fiducia degli " +
        "altri torna indietro." },
  kuehn: { name:"Audacia",
    was:"Dove si osa e dove ci si sopravvaluta. Il luogo del coraggio e, nello stesso luogo, " +
        "dell'imprudenza." },
  nemesis: { name:"Nemesi",
    was:"Dove torna indietro qualcosa che si è messo in moto da sé — nel bene come nel male. " +
        "Gli antichi vi nominano anche il nascosto e il passato." },
  vater: { name:"Padre",
    was:"Il padre e ciò che da lui viene: origine, nome, eredità in senso lato." },
  mutter: { name:"Madre",
    was:"La madre e ciò che da lei viene: nutrimento, protezione, il primo terreno." },
  geschwister: { name:"Fratelli",
    was:"Fratelli e sorelle e tutti coloro con cui si cresce." },
  kinder: { name:"Figli",
    was:"I figli e tutto ciò che si è prodotto e che prende vita propria." },
  ehe: { name:"Matrimonio",
    was:"Il legame e il suo venire in essere. Bonatti lo calcola diversamente per l'uomo e per " +
        "la donna — qui sta la forma che corrisponde al sesso indicato." },
  glaube: { name:"Fede",
    was:"Ciò a cui si tiene fermo senza prova — religione, convinzione, fiducia in una dottrina." },
  reise: { name:"Viaggio",
    was:"L'andarsene e la terra straniera: dove il partire conduce." }
};
