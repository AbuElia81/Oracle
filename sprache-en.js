/* ------------------------------------------------------------------------
   sprache-en.js — the imagery of the Essence, in English.

   The figures keep the gender the German gives them: the Sun is a king,
   the Moon a wanderer, Venus a gardener. That is not a claim about
   anything; it is how the old books drew them, and the fable only works
   if the figure stays the same person throughout.

   English has no cases, so the dative and accusative forms are simply
   the nominative — the fields stay, because the Essence asks for them.
   ------------------------------------------------------------------------ */

const f = (figur, kurz, pron, tut, fabel, gabe, preis) =>
  ({ figur, dat: figur, akk: figur, kurz, pron, tut, fabel, gabe, preis });

export const FIGUR_EN = {
  sonne: f("the king in the light", "the king", "he",
    "wants to be seen, and has to be",
    "Helios, who climbs into the chariot every morning because otherwise nobody would",
    "standing, and a large heart",
    "the vanity that takes itself for generosity"),
  mond: f("the wanderer with the many faces", "the wanderer", "she",
    "shows a different face every night and is the same one all along",
    "Penelope at the loom, unpicking by night what she wove by day — not out of indecision, but to buy time",
    "instinct, and a memory for what others let go of",
    "the borrowed mood one takes for one's own"),
  merkur: f("the messenger with the winged shoes", "the messenger", "he",
    "goes back and forth between the worlds and brings along what he hears there",
    "Hermes, who stole the cattle on the first day of his life and invented the lyre by evening to buy himself off",
    "speech, reckoning, and an eye for the way round",
    "the restlessness that finishes nothing"),
  venus: f("the gardener with the apple", "the gardener", "she",
    "makes peace where peace is possible, and makes it beautiful where it stays brittle",
    "the gardener, who knows that nothing can be made to grow — only watered, and waited for",
    "grace, measure, and a light hand",
    "the sidestepping, until the quarrel comes looking for you"),
  mars: f("the smith at the fire", "the smith", "he",
    "decides with the hammer, not with the word",
    "the smith, who can bend the iron only while it glows — and who knows the window is short",
    "courage, and the strength to strike first",
    "the argument you win while losing the person"),
  jupiter: f("the host with the open table", "the host", "he",
    "makes room, invites, speaks justice",
    "Philemon and Baucis, who took in two strangers and only afterwards saw whom they had fed",
    "breadth, confidence, and people who hold the door",
    "the excess that passes itself off as generosity"),
  saturn: f("the old man with the scythe", "the old man", "he",
    "mows down what has had its time, and builds what stands longer than himself",
    "the stonemason setting blocks he knows he will not see the building finished on",
    "endurance, and something that lasts",
    "the hardness against oneself, long before others turn hard"),

  kopf:    f("the door that opens", "the open door", "it", "lets in",
             "the threshold one crosses for the first time", "increase", "losing the overview"),
  schwanz: f("the door that falls shut", "the closing door", "it", "lets out",
             "the threshold one crosses for the last time", "freedom", "loss"),
  rahu:    f("the hunger for what is foreign", "the hunger", "it", "pulls outward",
             "the head that swallows and is never full", "ascent", "the aftertaste"),
  ketu:    f("the letting go", "the letting go", "it", "sets down",
             "what is left once one has stopped grasping", "freedom", "emptiness")
};

/* The twelve signs as a picture, not as a name. */
export const BILD_EN = [
  "the first shoot pushing through the frost",
  "the garden that bears because someone tends it",
  "two who talk and keep walking while they do",
  "the house with the fire inside it",
  "the middle of the room, where the light falls",
  "the hand that sorts out what got mixed up",
  "the scale pan still swinging",
  "the water that lies deep and does not show how deep",
  "the arrow already gone while one is still aiming",
  "the path that climbs the slope",
  "the jug poured out for everyone",
  "the sea, in which the outlines go soft"
];

/* The twelve places in ordinary words. */
export const ORT_EN = [
  "with yourself, in body and bearing",
  "with what you own and earn",
  "on the short roads, among siblings and messages",
  "at home, with origin and parents",
  "with children, pleasure, and everything you bring forth",
  "in work, in service, and in health",
  "with the other — in marriage, in contracts, with open opponents",
  "with what comes from others: inheritance, debt, what is entrusted",
  "abroad, in learning and belief",
  "in office and in reputation",
  "among friends, in alliances and hopes",
  "in the hidden, with what stands in your own way"
];

/* How two figures stand to one another. */
export const NAEHE_EN = {
  "Konjunktion": "stand so close together that one can hardly tell them apart",
  "Opposition":  "face each other like two people looking across a table",
  "Quadrat":     "grind against each other; what the one builds, the other calls into question",
  "Trigon":      "get along well, almost too well — it comes easily, and what comes easily is rarely tested",
  "Sextil":      "reach each other a hand, when asked for it"
};

/* A planet's condition, without the technical words. */
export const STAND_EN = {
  "Domizil":  "There she stands on her own ground: nobody has to be asked for permission.",
  "Erhöhung": "There more is expected than her own measure yields — like a guest one overestimates, who lets nothing show.",
  "Exil":     "There it is foreign country: nothing comes of itself, everything has to be worked for.",
  "Fall":     "There nobody likes to listen. Everything takes twice as long there as elsewhere.",
  "—":        "There nothing is favoured and nothing hindered: it hangs on the circumstances, and on you."
};

/* No cases in English — the image stays as it is. */
export const bildDat_EN = i => BILD_EN[i];
