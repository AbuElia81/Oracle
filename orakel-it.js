/* ------------------------------------------------------------------------
   orakel-it.js — le tavole del percorso oracolare, in italiano.

   La tavola dell'intenzione (Niyet), la concordanza dei nomi e le
   combinazioni dei quattro elementi. Come altrove: non parola per
   parola, ma nel tono secco e senza consolazione delle carte originali.
   ------------------------------------------------------------------------ */

/* I dodici responsi della tavola dell'intenzione. */
export const NIYET_IT = [
  { de:"Sì",             metin:"La cosa è matura. Ciò per cui esiti, lo esiti per vecchia abitudine, non per prudenza. Prendi, e proprio in questi giorni." },
  { de:"No",             metin:"Non questa strada e non queste persone. Ti assicureranno il contrario; l'assicurazione stessa è il segno." },
  { de:"Aspetta",        metin:"Né sì né no — non ancora. Manca un terzo che non è ancora arrivato. Richiedi fra quaranta giorni." },
  { de:"Sì, ma",         metin:"Ottieni ciò che hai chiesto, in altra forma da quella pensata. Prendilo lo stesso; la forma la capirai dopo." },
  { de:"Guardati",       metin:"C'è una lingua di mezzo. Qualcuno che ritieni indifferente parla di te. Taci sul tuo proposito finché non è compiuto." },
  { de:"Sì",             metin:"La risposta c'era da tempo; cercavi solo un testimone. Eccolo. Agisci secondo ciò che sapevi al primo istante." },
  { de:"Torna indietro", metin:"L'errore sta più indietro della domanda. Fa' tre passi all'indietro e rattoppa ciò che là è rimasto aperto; di là si va." },
  { de:"No",             metin:"Ciò che vuoi non è ciò di cui hai bisogno, e lo intuisci. La perdita che temi è il sollievo che cerchi." },
  { de:"Aspetta",        metin:"L'ora sta male, la cosa sta bene. Non cambiare il proposito, cambia il giorno. Cerca il giorno della tua stella dominante." },
  { de:"Sì, ma presto",  metin:"Una finestra è aperta e si chiude presto. Ciò che non comincia in questa lunazione, in quest'anno non comincia più." },
  { de:"Chiedi altro",   metin:"Non hai posto la domanda che intendi. Scrivila in una frase sola, senza subordinate — e richiedi." },
  { de:"Sì",             metin:"Vi è una benedizione, ma non rapida. Viene lentamente e resta a lungo. Conta in anni, non in settimane." }
];

/* I dodici responsi della concordanza dei nomi. */
export const UYUM_IT = [
  { hukum:"Molto buono", metin:"Il legame sta sotto un segno aperto. Ciò che cominciate insieme riesce più in fretta di ciò che ciascuno comincia da solo." },
  { hukum:"Buono",       metin:"Quieto e portante. Nessun fuoco d'artificio, ma regge negli anni — e sono gli anni a contare." },
  { hukum:"Diviso",      metin:"D'accordo nella parola, non nella cosa. Verificate su una piccola spesa comune se intendete lo stesso ordine." },
  { hukum:"Buono",       metin:"Uno regge, uno spinge. Non è squilibrio, finché entrambi sanno chi è in quel momento l'uno e chi l'altro." },
  { hukum:"Attenzione",  metin:"Un terzo sta in mezzo — una persona, una carica o una vecchia promessa. Finché quello non è chiarito, non si chiarisce nient'altro." },
  { hukum:"Molto buono", metin:"Stessa lingua, stessa misura. Potete lavorare insieme, non soltanto vivere insieme; ed è raro." },
  { hukum:"Diviso",      metin:"Grande attrazione, grande attrito, entrambi per la stessa ragione. Non diventerà mai comodo e di rado sarà noioso." },
  { hukum:"Difficile",   metin:"Vi somigliate in ciò che di voi stessi non amate. Finché nessuno lo dice, si litiga su altro." },
  { hukum:"Buono",       metin:"Benedizione sulla strada e sulla casa. Viaggi, traslochi e tutto ciò che fate lontano da casa vi riesce meglio di ciò che è vicino." },
  { hukum:"Attenzione",  metin:"Fra voi sta il denaro o il tempo. Regolate presto entrambi e per iscritto; non è un'offesa, è previdenza." },
  { hukum:"Buono",       metin:"Qui l'amicizia porta più lontano della passione. Se restate compagni, vi resta anche tutto il resto." },
  { hukum:"Molto buono", metin:"Un legame antico, così lo leggono i libri — come se non vi foste incontrati, ma ritrovati." }
];

/* Le dieci combinazioni dei quattro elementi. */
export const UNSUR_UYUM_IT = {
  "Ateş|Ateş":    ["Due fuochi", "Ardete chiari e ardete in fretta. Finché avete una meta comune fuori di voi, va bene; appena prendete a meta l'uno l'altro, diventa lite."],
  "Ateş|Hava":    ["Fuoco e aria", "L'aria nutre il fuoco. È il più leggero di tutti i legami — e quello in cui più facilmente si perde la misura."],
  "Ateş|Toprak":  ["Fuoco e terra", "Lui vuole partire, lei vuole restare — o viceversa. Può reggere, se entrambi sopportano che l'altro non diventi né più veloce né più lento."],
  "Ateş|Su":      ["Fuoco e acqua", "L'uno spegne, l'altro evapora. Il legame più difficile e insieme quello che più trasforma, quando regge."],
  "Toprak|Toprak":["Due terre", "Saldo, affidabile, duraturo — e in pericolo di fermarsi insieme. Cercatevi qualcosa che costringa entrambi a muoversi."],
  "Toprak|Su":    ["Terra e acqua", "L'acqua rende feconda la terra, la terra dà all'acqua un letto. Il più quieto e il più fecondo dei quattro."],
  "Toprak|Hava":  ["Terra e aria", "Lei parla, lui costruisce. Di rado vi capite subito e spesso alla fine sì — a patto che nessuno prenda il modo dell'altro per un difetto."],
  "Hava|Hava":    ["Due arie", "Vi capite nella parola e vi mancate nel corpo. Provvedete a ciò che è comune e si può toccare: una casa, un lavoro, una tavola."],
  "Hava|Su":      ["Aria e acqua", "L'aria increspa l'acqua e non la lascia mai quietare. Molto sentire, poco appoggio — servono accordi fermi."],
  "Su|Su":        ["Due acque", "Profondo, senza parole, l'uno nell'altro. Sapete tutto l'uno dell'altro e vi dite poco; perciò il solo pericolo è che vi perdiate senza accorgervene."]
};
