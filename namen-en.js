/* ------------------------------------------------------------------------
   namen-en.js — the names themselves.

   As long as the planets are called Merkur and the signs Skorpion, no
   translation holds: the names turn up inside almost every sentence.
   Here are the seven planets, the twelve signs, the twelve fields and
   the four elements.
   ------------------------------------------------------------------------ */

export const PLANET_NAME_EN = {
  sonne:"the Sun", mond:"the Moon", merkur:"Mercury", venus:"Venus",
  mars:"Mars", jupiter:"Jupiter", saturn:"Saturn"
};

/* English has no cases, but the two lights take an article. */
export const PLANET_ARTIKEL_EN = { sonne:"the Sun", mond:"the Moon" };

export const ZEICHEN_NAME_EN = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

export const HAUS_EN = [
  "in the body itself and in one's bearing",
  "in goods and earnings",
  "on the near roads, among siblings and messages",
  "at home, with origin and parents",
  "with children, pleasure, and everything brought forth",
  "in work, in service and in health",
  "with the other — marriage, contracts, declared opponents",
  "in loss, in inheritance and in everything borrowed",
  "in foreign country, in study and in faith",
  "in office and in reputation",
  "among friends, in alliances and hopes",
  "in the hidden, and in one's own way"
];

export const ELEMENT_NAME_EN = { "Feuer":"Fire", "Erde":"Earth", "Luft":"Air", "Wasser":"Water" };

/* The descriptions of the Arabic parts. */
export const PUNKT_EN = {
  fortuna: { name:"Fortune",
    was:"The body and what falls to one's lot. The oldest and most used place of all: where " +
        "fortune comes from outside, without having been earned." },
  geist: { name:"Spirit",
    was:"The counterpart of Fortune. Not what falls to one's lot, but what comes of oneself — " +
        "will, intent, the thing wanted. The old writers say: Fortune is what happens to you, " +
        "Spirit what you do." },
  liebe: { name:"Love",
    was:"Where affection arises and what it turns towards — not marriage, but the liking " +
        "itself, for things and for arts as well." },
  not: { name:"Necessity",
    was:"Where one stands under constraint and has no choice. The Arabic authors place quarrel " +
        "and debt here too." },
  sieg: { name:"Victory",
    was:"Where one gets through. Not luck, but succeeding against resistance — and where the " +
        "trust of others comes back." },
  kuehn: { name:"Boldness",
    was:"Where one dares and where one overrates oneself. The place of courage and, in the same " +
        "place, of rashness." },
  nemesis: { name:"Nemesis",
    was:"Where something returns that one set in motion oneself — for good as for ill. The old " +
        "writers name the hidden and the past here as well." },
  vater: { name:"Father",
    was:"The father and what comes from him: origin, name, inheritance in the wider sense." },
  mutter: { name:"Mother",
    was:"The mother and what comes from her: nourishment, shelter, the first ground." },
  geschwister: { name:"Siblings",
    was:"Brothers and sisters and all those one grows up alongside." },
  kinder: { name:"Children",
    was:"Children and everything one has brought forth that takes on a life of its own." },
  ehe: { name:"Marriage",
    was:"The bond and its coming about. Bonatti reckons it differently for a man and for a " +
        "woman — here stands the form matching the sex given." },
  glaube: { name:"Faith",
    was:"What one holds to without proof — religion, conviction, trust in a teaching." },
  reise: { name:"Journey",
    was:"The going away and the foreign country: where setting out leads." }
};

/* What each planet signifies, in one half-sentence. */
export const PLANET_WAS_EN = {
  sonne:"your will and your standing",
  mond:"your temper and your need",
  merkur:"your thinking and your speaking",
  venus:"what you love and what you find beautiful",
  mars:"your drive and your anger",
  jupiter:"your trust and your measure",
  saturn:"your seriousness and your limit"
};

/* The manner of each sign. */
export const ART_EN = [
  "straightforward and quick", "steadfast and sensuous", "mobile and curious",
  "sensitive and sheltering", "generous and mindful of effect", "testing and exact",
  "weighing and bent on balance", "unconditional and deep", "far-reaching and convinced",
  "serious and built to last", "self-willed and matter-of-fact", "permeable and compassionate"
];

/* The dignities in plain words. */
export const WUERDE_TEXT_EN = {
  "Domizil":"in its own sign — has what it needs and works unhindered",
  "Erhöhung":"exalted — is esteemed here beyond its own measure",
  "Exil":"in exile — has to work against the grain here",
  "Fall":"in fall — comes into its own here only with difficulty",
  "—":"without particular dignity — works here according to circumstance"
};

/* The tone of each aspect. */
export const ASPEKT_TON_EN = {
  "Konjunktion":"fused", "Sextil":"as an opportunity", "Quadrat":"under tension",
  "Trigon":"lightly", "Opposition":"facing each other"
};

/* The eight phases of the moon. */
export const PHASEN_EN = [
  "new moon — a beginning nobody has noticed yet",
  "waxing crescent — the plan takes shape, against resistance",
  "first quarter — now it must be decided",
  "waxing gibbous — building out, pace, becoming visible",
  "full moon — it stands in the light, and one also sees what is missing",
  "waning gibbous — harvest, passing on, spreading",
  "last quarter — the matter is checked over and set straight",
  "waning crescent — letting go, clearing up, preparing for the next"
];
