# Oracle

Arbeitstitel. Ein Orakel-Rechner nach dem Vorbild des osmanischen
**Yıldıznâme** ("Sternbuch") — Konzept und Regeln werden gerade
zusammengetragen, der Code folgt.

## Aufbau

Statische Seite, keine Baukette:

- `index.html` — die Seite
- `stil.css` — Gestaltung
- `oracle.js` — Logik
- `bump.sh` — hebt `?v=` in den `<link>`/`<script>`-Zeilen an (Cache-Busting)

## Lokal ansehen

Statischer Server auf Port 8920 (Eintrag `oracle` in `~/.claude/launch.json`):

```bash
python3 -m http.server 8920 --directory ~/projects/oracle
```

## Veröffentlichen

Jeder Push auf `main` erscheint über GitHub Pages.
Nach Änderungen an CSS oder JS vorher `./bump.sh` laufen lassen.
