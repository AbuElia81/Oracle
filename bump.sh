#!/bin/bash
# Hebt die Versionsnummer aller eingebundenen Dateien an, damit der Browser neu laedt.
# Fasst auch die ?v= in den import-Zeilen der Module an — die stehen nicht im HTML.
cd "$(dirname "$0")"
N=$(( $(grep -ho '?v=[0-9]*' *.html 2>/dev/null | head -1 | tr -d '?v=') + 1 ))
[ -z "$N" ] && N=1
for f in *.html; do
  perl -pi -e "s/\?v=\d+//g; s/(href=\"(?:stil\.css)|src=\"(?:[a-z]+\.js))\"/\$1?v=$N\"/g" "$f"
done
for f in *.js; do
  perl -pi -e "s/(from \"\.\/[a-z]+\.js)(\?v=\d+)?\"/\$1?v=$N\"/g" "$f"
done
echo "Version $N"
