# Grundsätzliches

## Order-Struktur
/app
: enthält die gesamte serverseitige Applikationslogik

/app/config
: enthält die gesamten Konfigurations-Dateien

/app/controllers 
: enthält die spezifischen Applikations-Controller

/app/core
: enthält die Basis-Klassen zur globalen Verwendung

/app/models 
: enthält die spezifischen Models für die Interaktion mit den JSON-Dateien

/content/assets
: enthält alle statischen und kompilierten Elemente

/content/assets/css
: enthält alle statischen und kompilierten CSS-Elemente

/content/assets/js
: enthält alle statischen und konkardinieren JS-Elemente

/data
: enthält die erzeugten JSON-Dateien des Models

/docs
: enthält die Dokumentation der Anwendung

/ressources/
: enthält alle vorkompilierten Dateien

/ressources/js
: enthält alle nicht-konkardinieren JavaScript-Dateien 

/ressources/js/app
: enthält die gesamte clientseitige Applikationslogik

/ressources/js/vendor
: enthält die gesamten clientseitigen Drittressourcen`

/ressources/saas
: enthält alle vorkompilierten CSS-Dateien in Saas
``
/templates
: enthält die tco-Templates zur Anzeige im JavaScript-Format (Dokumentation dazu seperat erhältlich)

/test
: enthält die Tests des REST-Interfaces mit cURL


## Starten des Cherrypy-Servers
Damit der Cherrypy-Applikationsserver gestartet werden kann, wird folgende Kommandozeile ausgeführt:
```bash
$ python3 server.py
```
Die Applikation ist anschließend unter http://localhost:8080 erreichbar.

## Generierung des `test`-Outputs
Voraussetzung zur Generierung des `test`-Outputs:

- jq: brew install jq
- json: npm install json

```bash
$ ./test/tests.sh -v | ./test/ansi_html.sh > test/output.html
```

## Routing
Die Applikation nutzt einen eigenen Routing-Dispatcher, welcher explizites REST-Routing ermöglicht.
Weiterhin ist die Bennung der Funktionen unabhängig von der URL-Struktur und es können verschiedene Parameter 
übergeben werden. Die gesamte Konfiguration des Routings ist in der app/config/routes.py zu finden.