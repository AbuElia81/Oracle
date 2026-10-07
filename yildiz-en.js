/* ------------------------------------------------------------------------
   yildiz-en.js — the detail fields of the tables, in English.

   Stone, metal, colour, day, trade and illness for the twelve signs;
   gift and danger for the seven planets. These are the lists on which
   the Yıldıznâme builds its judgment.
   ------------------------------------------------------------------------ */

/* The twelve signs, in the order of Aries. */
export const BURC_DETAIL_EN = [
  { tas:"ruby and red agate", maden:"iron", renk:"red",
    gun:"Tuesday", kotugun:"Friday",
    is:"iron, fire, weapon and tool; soldiering, surgery, everything that calls for a cut and a decision.",
    hastalik:"head and eyes; fevers that come quickly and go quickly. Guard the head against blows and sun." },
  { tas:"emerald", maden:"copper", renk:"green",
    gun:"Friday", kotugun:"Tuesday",
    is:"earth and yield: farming, building, money-changing, hospitality, all the handicrafts of the hand.",
    hastalik:"neck and throat; blockages that come of excess. Less and slower heals more in you than any medicine." },
  { tas:"agate", maden:"quicksilver", renk:"many-coloured",
    gun:"Wednesday", kotugun:"Thursday",
    is:"writing, reckoning, message, trade, translation, brokerage, teaching.",
    hastalik:"shoulders, arms, breath; restlessness that shows itself as exhaustion. Sleep is your medicine." },
  { tas:"pearl and moonstone", maden:"silver", renk:"white and silver-grey",
    gun:"Monday", kotugun:"Saturday",
    is:"water and nourishment, lodging, healing, teaching the young, trade over sea, everything that preserves.",
    hastalik:"chest and stomach; everything you swallow down arrives there. Grief makes you ill sooner than cold." },
  { tas:"gold topaz", maden:"gold", renk:"golden yellow",
    gun:"Sunday", kotugun:"Saturday",
    is:"office and chairmanship, teaching, the stage, gold and ornament, everything that happens before people.",
    hastalik:"heart and back; an excess of heat. Rest is no weakness in you but a remedy." },
  { tas:"jasper", maden:"quicksilver", renk:"earth brown and grey",
    gun:"Wednesday", kotugun:"Thursday",
    is:"healing and herbs, accounting, the writing room, the finer crafts, inspection and oversight.",
    hastalik:"the bowels; worry strikes you in the body. Your illness almost always begins as a thought." },
  { tas:"sapphire", maden:"copper", renk:"light green and rose",
    gun:"Friday", kotugun:"Tuesday",
    is:"law and the judge's office, mediation, art, dress and adornment, trade in beautiful things.",
    hastalik:"kidneys and loins; imbalance, outward as inward. Too much sweetness, too little sleep." },
  { tas:"garnet and bloodstone", maden:"iron", renk:"dark red and black",
    gun:"Tuesday", kotugun:"Friday",
    is:"healing and surgery, mining, the search into what is hidden, the managing of others' goods, inheritances.",
    hastalik:"the lower body; poison and rot, in body as in temper. What you do not say gathers." },
  { tas:"turquoise", maden:"tin", renk:"blue and purple",
    gun:"Thursday", kotugun:"Wednesday",
    is:"teaching and law, matters of belief, foreign parts and travel, horse and road, trade across borders.",
    hastalik:"hips and thighs; excess and the fall. Your danger is seldom want, almost always too much." },
  { tas:"onyx", maden:"lead", renk:"black and dark brown",
    gun:"Saturday", kotugun:"Monday",
    is:"office and administration, stone and building, land, time and age, everything slow and lasting.",
    hastalik:"knees and bones, skin and teeth; cold and dryness. Warmth, oil and company are medicine to you." },
  { tas:"amethyst", maden:"lead and tin", renk:"indigo",
    gun:"Saturday", kotugun:"Sunday",
    is:"new knowledge, the study of the stars and reckoning, waterworks, guild and league, everything held in common.",
    hastalik:"calves and ankles, the circulation; sudden complaints without warning. Regularity suits you, though you despise it." },
  { tas:"moonstone and aquamarine", maden:"tin", renk:"sea green",
    gun:"Thursday", kotugun:"Wednesday",
    is:"healing, prayer and the care of souls, image and sound, sea and fishery, service to the sick.",
    hastalik:"feet, lymph, sleep; numbing of any kind suits you badly. Water and quiet heal you faster than remedies." }
];

export const GEZ_EN = [
  /* Şems — the Sun */
  { maden:"gold", renk:"golden yellow", tabiat:"hot and dry",
    armagan:"standing, a large heart, the strength to be at the centre without growing small",
    tehlike:"pride — and the habit of taking one's own light for everybody's sun" },
  /* Zühre — Venus */
  { maden:"copper", renk:"green and white", tabiat:"warm and moist",
    armagan:"grace, a sense of measure and of form, art, friendship, the light hand",
    tehlike:"softness — you sidestep the quarrel until the quarrel comes looking for you" },
  /* Utarit — Mercury */
  { maden:"quicksilver", renk:"shifting, grey", tabiat:"changeable, takes on what it meets",
    armagan:"speech, writing, reckoning, trade — and a mind that finds the way round",
    tehlike:"inconstancy; the cunning one admits to oneself last" },
  /* Kamer — the Moon */
  { maden:"silver", renk:"white", tabiat:"cold and moist",
    armagan:"feeling, dream, memory, the gift of being at home in change",
    tehlike:"wavering — you take the mood of the room for your own judgment" },
  /* Zühal — Saturn */
  { maden:"lead", renk:"black", tabiat:"cold and dry",
    armagan:"endurance, depth, seriousness; what you build still stands when you no longer do",
    tehlike:"melancholy, and hardness against yourself long before others turn hard" },
  /* Müşteri — Jupiter */
  { maden:"tin", renk:"blue", tabiat:"warm and moist",
    armagan:"blessing, law, breadth, standing among those who understand",
    tehlike:"excess — you take on too much and call it generosity" },
  /* Merih — Mars */
  { maden:"iron", renk:"red", tabiat:"hot and dry",
    armagan:"courage, an edge, the strength to strike first and to stand the answer",
    tehlike:"a sudden temper; you win the argument and lose the person" }
];
