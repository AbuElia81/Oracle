/* ------------------------------------------------------------------------
   yildiz-it.js — i campi di dettaglio delle tavole, in italiano.

   Pietra, metallo, colore, giorno, mestiere, malattia per i dodici segni;
   dono e pericolo per i sette pianeti. Sono gli elenchi su cui lo
   Yıldıznâme costruisce il suo giudizio.
   ------------------------------------------------------------------------ */

/* I dodici segni, nell'ordine dell'Ariete. */
export const BURC_DETAIL_IT = [
  { tas:"rubino e agata rossa", maden:"ferro", renk:"rosso",
    gun:"martedì", kotugun:"venerdì",
    is:"ferro, fuoco, arma e utensile; milizia, chirurgia, tutto ciò che richiede taglio e decisione.",
    hastalik:"capo e occhi; febbri che vengono in fretta e in fretta se ne vanno. Guarda il capo dai colpi e dal sole." },
  { tas:"smeraldo e corallo", maden:"rame", renk:"verde",
    gun:"venerdì", kotugun:"martedì",
    is:"terra e giardino, denaro e banca, ciò che si costruisce per durare; voce, canto, tutto ciò che si gusta.",
    hastalik:"gola e nuca; ciò che si accumula e non defluisce. Guardati dal troppo dolce." },
  { tas:"agata e cristallo", maden:"mercurio", renk:"vario",
    gun:"mercoledì", kotugun:"giovedì",
    is:"scrittura, commercio, intermediazione, insegnamento; tutto ciò che passa fra le persone e dev'essere esatto.",
    hastalik:"spalle, braccia, polmoni; respiro e nervi. Guardati dal parlare quando saresti dovuto restare zitto." },
  { tas:"perla e selenite", maden:"argento", renk:"bianco",
    gun:"lunedì", kotugun:"sabato",
    is:"casa, nutrimento, cura, albergo; tutto ciò che accoglie e custodisce.",
    hastalik:"petto e stomaco; ciò che si inghiotte e non si digerisce. Guardati dal serbare rancore." },
  { tas:"diamante e ambra", maden:"oro", renk:"oro",
    gun:"domenica", kotugun:"sabato",
    is:"governo, rappresentanza, scena, oro e gioielli; tutto ciò che viene visto.",
    hastalik:"cuore e schiena; calore ed eccesso. Guardati dallo sforzo che fai per essere visto." },
  { tas:"corniola e giada", maden:"mercurio", renk:"grigio e azzurro",
    gun:"mercoledì", kotugun:"giovedì",
    is:"medicina, conto, archivio, artigianato esatto; tutto ciò che va verificato.",
    hastalik:"ventre e intestino; ciò che si consuma per preoccupazione. Guardati dal rimuginare." },
  { tas:"zaffiro e opale", maden:"rame", renk:"azzurro chiaro",
    gun:"venerdì", kotugun:"martedì",
    is:"diritto, mediazione, arte, tutto ciò che pesa e mette in relazione.",
    hastalik:"reni e fianchi; ciò che perde l'equilibrio. Guardati dal rimandare le decisioni." },
  { tas:"granato e ematite", maden:"ferro", renk:"rosso scuro e nero",
    gun:"martedì", kotugun:"venerdì",
    is:"ricerca, chirurgia, ciò che è nascosto, denaro altrui; tutto ciò che va in profondità.",
    hastalik:"bacino e organi; ciò che si cova. Guardati dal veleno che prepari tu stesso." },
  { tas:"turchese e ametista", maden:"stagno", renk:"porpora",
    gun:"giovedì", kotugun:"mercoledì",
    is:"dottrina, viaggio, diritto, fede; tutto ciò che allarga.",
    hastalik:"anche e cosce; ciò che si strappa per troppa foga. Guardati dal promettere troppo." },
  { tas:"onice e ossidiana", maden:"piombo", renk:"nero e bruno scuro",
    gun:"sabato", kotugun:"martedì",
    is:"carica e amministrazione, pietra e costruzione, terra, tempo ed età, tutto ciò che è lento.",
    hastalik:"ginocchia e ossa, pelle e denti; freddo e secchezza. Calore, olio e riposo." },
  { tas:"zaffiro e lapislazzuli", maden:"piombo", renk:"blu scuro",
    gun:"sabato", kotugun:"domenica",
    is:"scienza, tecnica, associazioni, tutto ciò che è nuovo e per il bene comune.",
    hastalik:"gambe e caviglie; circolazione. Guardati dal restare troppo a lungo nel freddo — in ogni senso." },
  { tas:"ametista e perla", maden:"stagno", renk:"verde mare",
    gun:"giovedì", kotugun:"mercoledì",
    is:"cura, arte, mare, tutto ciò che guarisce e tutto ciò che si sogna.",
    hastalik:"piedi e linfa; ciò che si accoglie dagli altri. Guardati dai mezzi che stordiscono." }
];

/* I sette pianeti: dono e pericolo. */
export const GEZ_IT = [
  /* Şems — il Sole */
  { maden:"oro", renk:"giallo d'oro", tabiat:"caldo e secco",
    armagan:"la considerazione, un cuore largo, la forza di stare al centro senza farsi piccoli",
    tehlike:"la superbia — e l'abitudine di prendere la propria luce per il sole di tutti" },
  /* Zühre — Venere */
  { maden:"rame", renk:"verde e bianco", tabiat:"caldo e umido",
    armagan:"la grazia, il senso della misura e della forma, l'arte, l'amicizia, la mano leggera",
    tehlike:"la mollezza — scansi la lite finché è la lite a cercare te" },
  /* Utarit — Mercurio */
  { maden:"mercurio", renk:"cangiante, grigio", tabiat:"mutevole",
    armagan:"la parola, il calcolo, l'occhio per la strada traversa",
    tehlike:"l'inquietudine — cominci molto e porti a termine poco" },
  /* Kamer — la Luna */
  { maden:"argento", renk:"bianco", tabiat:"freddo e umido",
    armagan:"il sentire, la memoria, la capacità di cambiare senza perdersi",
    tehlike:"l'umore altrui — che prendi per il tuo" },
  /* Zühal — Saturno */
  { maden:"piombo", renk:"nero", tabiat:"freddo e secco",
    armagan:"la costanza, la serietà, e qualcosa che resta più a lungo di te",
    tehlike:"la durezza verso te stesso, molto prima che gli altri diventino duri" },
  /* Müşteri — Giove */
  { maden:"stagno", renk:"blu", tabiat:"caldo e umido",
    armagan:"l'ampiezza, la fiducia, il diritto, persone che ti tengono aperta la porta",
    tehlike:"l'eccesso — che si spaccia volentieri per generosità" },
  /* Merih — Marte */
  { maden:"ferro", renk:"rosso", tabiat:"caldo e secco",
    armagan:"il coraggio, la forza di cominciare, la decisione che altri rimandano",
    tehlike:"la collera — e la lite che vinci mentre perdi la persona" }
];
