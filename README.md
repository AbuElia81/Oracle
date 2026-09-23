# Oracle

### → **[Die Seite öffnen: abuelia81.github.io/Oracle](https://abuelia81.github.io/Oracle/)**

Orakelrechner nach alten Büchern. Auf der Startseite **Meine Daten** trägt man
einmal die beiden Namen und die Geburtsangaben ein; alle Abschnitte rechnen
dann von selbst damit, ohne Knopfdruck und über das Neuladen hinweg.

| Abschnitt | Woher |
|---|---|
| **Das Horoskop** | Radix in Ganzzeichen-Häusern: Planeten, Würden, Aspekte, Sekte — dazu Transite und sekundäre Progressionen. Grundlage der Zeittechniken |
| **Yıldıznâme** | osmanisches Sternbuch: Zeichen, Stern, Element und Mondstation aus Name und Muttername im Ebced |
| **Niyet** | Tafel der Absicht: Frage, Name und Planetenstunde |
| **İsim uyumu** | Verträglichkeit zweier Menschen aus beiden Namenssummen |
| **Der rechte Zeitpunkt** | Elektion: Vorhaben eintragen, Urteil aus dem heutigen Mondstand nach den 28 Stationen, zu- oder abnehmendem Mond und der verbrannten Bahn — samt besseren Tagen |
| **Spirit Name** | Agrippa, *De Occulta Philosophia* III.26: Geistname aus den fünf hylegischen Örtern |
| **Der Lebensbogen** | Primärdirektionen |
| **Zodiacal Releasing** | hellenistische Zeitalter aus dem Los des Glücks |
| **Antiszien** | Schattenzwillinge |
| **Die Essenz** | liest alles Gefundene zu einem Text zusammen |

Alles rechnet im Browser; nichts geht an einen Server dieser Seite, es gibt keinen.
Die Ortssuche fragt auf Knopfdruck einmalig Nominatim (OpenStreetMap).

---

## Das Yıldıznâme

Das Genre, das den Menschen ein Horoskop gab, als kaum jemand seinen Geburtstag
kannte. Statt des Himmels zur Geburtsstunde befragt es den Namen: den eigenen
und den der Mutter, denn die Mutter ist zweifelsfrei.

## Die Rechnung

1. Beide Namen werden arabisch geschrieben.
2. Jeder Buchstabe trägt seinen Zahlwert im **Ebced-i kebîr**
   (ا 1 · ب 2 · ج 3 · د 4 … غ 1000).
3. Beide Summen werden addiert.
4. Der **Rest** der Teilung zeigt das Fach im Buch:
   - ÷ 12 → das Zeichen (burç)
   - ÷ 7 → der Wandelstern, chaldäisch von der Sonne abwärts
   - ÷ 4 → das Element
   - ÷ 28 → die Mondherberge (menzil)

Die Rechnung ist nicht das Orakel, sondern nur der Zeigefinger; das Orakel ist
der Text, auf den er zeigt. Deshalb liegt das Gewicht in `korpus.js`.

## Vier Modi

- **Sternbild** — das volle Kapitel, getrennt für Mann und Frau: Gemüt, Element,
  Herrscherstern, Stein, Metall, Farbe, Zahl, guter und schwerer Tag, Erwerb,
  Ehe, Krankheit, Mondherberge, Rat.
- **Niyet** — die Tafel der Absicht: Frage, Name und Planetenstunde ergeben ein
  Urteil. Dieselbe Frage bekommt zu anderer Stunde eine andere Antwort.
- **İsim uyumu** — zwei Menschen, vier Namen, beide Summen gegeneinander,
  dazu die alte Regel der Elemente.
- **Die 28 Herbergen** — die *menâzil-i kamer* als Nachschlagetafel.

## Der Geist des 11. Hauses

Ein zweites Buch neben dem Yıldıznâme: **Cornelius Agrippas** *De Occulta
Philosophia* (Buch III, Kap. 26). Aus Geburtsdatum, -zeit und -ort berechnet
`geist.js` den Aszendenten selbst (julianisches Datum → Greenwich-Sternzeit →
Ortssternzeit → Aszendent, mit der Schiefe der Ekliptik und einer
Sonnenposition niedriger Präzision nach Meeus — für diesen symbolischen
Gebrauch reichlich genau), bestimmt daraus den **Almuten des 11. Hauses**
(fünf Würdenarten, klassisch gewichtet), zählt vom Aszendenten gradweise das
hebräische Alphabet um den Tierkreis bis zur Spitze des 11. Hauses
(Ganzzeichen-Vereinfachung) und leitet daraus einen persönlichen
**Geistnamen** ab. Die Ortssuche fragt auf Knopfdruck einmalig
[Nominatim (OpenStreetMap)](https://nominatim.openstreetmap.org); wer das
nicht möchte, trägt Breite, Länge und UTC-Offset direkt ein — sonst bleibt
alles im Browser.

## Meine Daten — ein Profil für drei Rechner

Der Geist des 11. Hauses, der Lebensbogen und Zodiacal Releasing brauchen
alle denselben wirklichen Himmel zur Geburtsstunde. Der Reiter **Meine
Daten** (`profil.js`/`profil-ui.js`) speichert Name, Geburtsdatum, -zeit,
-ort, Breite/Länge und UTC-Offset einmal in `localStorage`; die drei Rechner
lesen es automatisch und rechnen beim Öffnen des Reiters sofort — kein Feld
wird zweimal verlangt.

## Der Lebensbogen — Primärdirektionen

Nach **Ptolemäus** (Tetrabiblos III) und **Martin Gansten** (*Primary
Directions*, 2009): Nicht die Planeten bewegen sich, sondern der Himmel
dreht sich um die Weltachse; ein Promissor "kommt zur Richtung", wenn diese
Drehung ihn auf die Stelle eines Signifikators bringt. `astro.js` liefert
dafür Sonne, Mond und die fünf Planeten aus niedrig-präzisen Bahnelementen
(Kepler-Gleichung per Newton-Verfahren) sowie Aszendent/MC und die schiefe
Auf-/Untergangsrektaszension; `direktionen.js` rechnet die Bögen — exakt zu
den vier Achsen (Ptolemäus' eigenes, geschlossen lösbares Verfahren),
vereinfacht "im Tierkreis" zwischen zwei Planeten (keine
Häusertrisektion nach Regiomontanus oder Placidus). Das Ergebnis ist eine
ziehbare Zeitleiste: der Schieber zeigt beim Ziehen Alter, ungefähres
Datum und die nächstliegenden Richtungen live an.

## Zodiacal Releasing

Eine hellenistische Zeitherren-Technik, überliefert bei **Vettius Valens**,
in der Neuzeit vor allem durch **Robert Hand** erschlossen (`zr.js`). Vom
Los des Glücks oder vom Los des Geistes werden die zwölf Zeichen der Reihe
nach freigesetzt, jedes für die "kleineren Jahre" seines Herrschers; jede
Stufe (hier L1–L3) verschachtelt dieselbe Zählung anteilig in sich selbst,
mit der Verdopplungsregel (Herrscher der Periode natal im eigenen Zeichen).
Die "Lösung des Bandes" ist bewusst nicht umgesetzt — die genaue Bedingung
ließ sich nicht mit Sicherheit rekonstruieren. Auch hier: eine ziehbare
Zeitleiste, als verschachtelte Bänder je Stufe.

## Die Umschrift

Der heikelste Schritt ist nicht die Rechnung, sondern die arabische Schreibung:
Vokale werden nicht geschrieben, und ein Name schreibt sich nach seiner
Herkunft, nicht nach seinem türkischen Klang. Darum schlägt `ebced.js` eine
Schreibung vor (Wortverzeichnis für die geläufigen Namen, Regelwerk für alles
andere) und legt sie in einer **Korrekturzeile** offen: jeder Buchstabe ist
austauschbar, streichbar, ergänzbar, und die Rechnung folgt sofort.

Die verbreitete Bequemlichkeitsvariante, lateinische Buchstaben unmittelbar in
Ebced-Zahlen zu setzen, ist gerade nicht die Tradition — sie umgeht den Schritt,
an dem die Tradition hängt.

## Zur Quellenlage

Es gibt kein kanonisches Yıldıznâme. Das Genre wird Cafer-i Sâdık zugeschrieben
— eine Autoritätszuschreibung, keine Autorschaft; die erhaltenen Handschriften
sind osmanisch (Süleymaniye, Millet Yazma Eser, Milli Kütüphane Ankara) und
weichen voneinander ab. Die Deutungen hier sind im Ton der Vorlage neu gefasst,
nicht aus einer einzelnen Handschrift abgeschrieben.

## Aufbau

Statische Seite, keine Baukette:

| Datei | Inhalt |
|---|---|
| `index.html` | die Seite, alle Abschnitte |
| `stil.css` | Gestaltung |
| `profil.js` · `profil-ui.js` | das gemeinsame Profil (Startseite „Meine Daten") |
| `yildiz-profil.js` · `geist-profil.js` | Brücken vom Profil in die einzelnen Abschnitte |
| `ebced.js` · `korpus.js` · `oracle.js` | Yıldıznâme: Buchstabenwerte, Textkorpus, Bedienung |
| `astro.js` · `direktionen.js` | gemeinsame Astronomie und Primärdirektionen |
| `horoskop.js` | Radix, Transite, Progression — und die Auskunft, die andere Abschnitte abfragen |
| `geist.js` · `lebensbogen.js` · `zr.js` · `antiszien.js` · `profektionen.js` | die einzelnen Rechner |
| `deutung.js` · `jahr.js` | Deutungskästen und Jahresüberblick neben den Tafeln |
| `auto-rechnen.js` · `zugang.js` | alles rechnet von selbst; die Hauptseite ist das Tor |
| `elektion.js` | die Wahlastrologie zum rechten Zeitpunkt |
| `essenz.js` | die Zusammenschau |
| `bump.sh` | hebt `?v=` in HTML und in den Modul-Importen an |

## Lokal ansehen

Statischer Server auf Port 8920 (Eintrag `oracle` in `~/.claude/launch.json`):

```bash
python3 -m http.server 8920 --directory ~/projects/oracle
```

## Veröffentlichen

Live: **https://abuelia81.github.io/Oracle/** — klassische GitHub Pages,
Quelle `main` / Root, kein CNAME. Jeder Push auf `main` erscheint dort
automatisch. Der Pfad ist großgeschrieben, weil das Repo `Oracle` heißt.
Nach Änderungen an CSS oder JS vorher `./bump.sh` laufen lassen.
