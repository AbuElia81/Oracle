# Yıldıznâme

Ein Orakelrechner nach dem osmanischen **Yıldıznâme** („Sternbuch") — dem
Genre, das den Menschen ein Horoskop gab, als kaum jemand seinen Geburtstag
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
| `index.html` | die Seite, fünf Abschnitte |
| `stil.css` | Gestaltung |
| `ebced.js` | Buchstabenwerte, Umschrift, Teilungen |
| `korpus.js` | das Buch: 12 Zeichen, 7 Sterne, 4 Elemente, 28 Herbergen, Tafeln |
| `oracle.js` | Bedienung |
| `bump.sh` | hebt `?v=` in HTML und in den Modul-Importen an |

## Lokal ansehen

Statischer Server auf Port 8920 (Eintrag `oracle` in `~/.claude/launch.json`):

```bash
python3 -m http.server 8920 --directory ~/projects/oracle
```

## Veröffentlichen

Jeder Push auf `main` erscheint über GitHub Pages.
Nach Änderungen an CSS oder JS vorher `./bump.sh` laufen lassen.
