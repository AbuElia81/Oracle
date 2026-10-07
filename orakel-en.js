/* ------------------------------------------------------------------------
   orakel-en.js — the oracle tables, in English.

   The table of intent (Niyet), the twelve judgments of name harmony
   (İsim uyumu), and the ten pairings of the elements. The Turkish
   verdicts stay as they are; the German heading and the text are
   translated.
   ------------------------------------------------------------------------ */

export const NIYET_EN = [
  { de:"Yes",
    metin:"The matter is ripe. What you are putting off, you put off out of old habit, not out of caution. Take hold of it, and within these days." },
  { de:"No",
    metin:"Not this road and not these people. You will be assured of the opposite; the assurance itself is the sign." },
  { de:"Wait",
    metin:"Neither yes nor no — not yet. A third party is missing who has not yet come. Ask again after forty days." },
  { de:"Yes, but",
    metin:"You will get what you asked for, in another shape than you thought. Take it anyway; the shape you will understand later." },
  { de:"Beware",
    metin:"A tongue lies in between. Someone you take for indifferent is talking about you. Say nothing of your plan until it is done." },
  { de:"Yes",
    metin:"The answer was there long ago; you were only looking for a witness. Here it is. Act on what you knew in the first moment." },
  { de:"Turn back",
    metin:"The fault lies further back than the question. Go three steps back and mend what was left open there; from there it goes." },
  { de:"No",
    metin:"What you want is not what you need, and you sense it. The loss you fear is the relief you are looking for." },
  { de:"Wait",
    metin:"The hour stands badly, the matter well. Do not change the plan, change the day. Look for the day of your ruling star." },
  { de:"Yes, but quickly",
    metin:"A window stands open and will close soon. What does not begin in this moon will not begin in this year." },
  { de:"Ask differently",
    metin:"You have not asked the question you mean. Write it down in one sentence, without a subordinate clause — and ask again." },
  { de:"Yes",
    metin:"There is blessing on it, but not quickly. It comes slowly and stays long. Reckon in years, not in weeks." }
];

export const UYUM_EN = [
  { hukum:"Very good",
    metin:"The bond stands under an open sign. What you begin together succeeds faster than what either begins alone." },
  { hukum:"Good",
    metin:"Quiet and load-bearing. No fireworks, but it holds across the years — and it is the years that count." },
  { hukum:"Divided",
    metin:"Agreed in word, not in substance. Test on one small shared expense whether you mean the same order." },
  { hukum:"Good",
    metin:"One carries, one drives. That is no imbalance, as long as both know which is which just now." },
  { hukum:"Caution",
    metin:"A third stands between — a person, an office, or an old promise. Until that is settled, nothing else settles." },
  { hukum:"Very good",
    metin:"The same language, the same measure. You can work with each other, not only live with each other; that is rare." },
  { hukum:"Divided",
    metin:"Great attraction, great friction, both for the same reason. It never becomes comfortable and seldom dull." },
  { hukum:"Hard",
    metin:"You resemble each other in what you do not like about yourselves. As long as neither says so, you will quarrel about other things." },
  { hukum:"Good",
    metin:"Blessing on road and house. Travel, moving, and everything you do away from home goes better for you than what is near." },
  { hukum:"Caution",
    metin:"Money or time stands between you. Settle both early and in writing; it is no insult, it is provision." },
  { hukum:"Good",
    metin:"Friendship carries further here than passion. If you remain companions, you remain everything else too." },
  { hukum:"Very good",
    metin:"An old bond, so the books read it — as though you had not met but met again." }
];

export const UNSUR_UYUM_EN = {
  "Ateş|Ateş":  ["Two fires", "You burn bright and you burn fast. As long as you have a shared goal outside yourselves it is good; the moment you take each other for the goal, it turns to quarrel."],
  "Ateş|Hava":  ["Fire and air", "Air feeds fire. The easiest of all bonds — and the one in which measure is most readily lost."],
  "Ateş|Toprak":["Fire and earth", "One wants to be off, the other wants to stay — or the other way round. It can carry, if both can bear that the other grows no faster and no slower."],
  "Ateş|Su":    ["Fire and water", "The one puts out, the other turns to steam. The hardest bond, and at once the one that transforms most if it holds."],
  "Toprak|Toprak":["Two earths", "Firm, dependable, lasting — and in danger of standing still together. Find something that forces you both to move house."],
  "Toprak|Su": ["Earth and water", "Water makes the earth fruitful, earth gives the water a bed. The quietest and most fruitful bond of the four."],
  "Toprak|Hava":["Earth and air", "One talks, the other builds. You seldom understand each other at once and often do in the end — provided neither takes the other's way for a fault."],
  "Hava|Hava": ["Two airs", "You meet in the word and miss each other in the body. See to what is shared and can be touched: a house, a work, a table."],
  "Hava|Su":   ["Air and water", "Air ruffles the water and never lets it settle. Much feeling, little hold — it needs firm arrangements."],
  "Su|Su":     ["Two waters", "Deep, wordless, inside one another. You know everything about each other and say little; so the one danger is that you lose yourselves without noticing."]
};
