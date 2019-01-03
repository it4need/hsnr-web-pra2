
# Aufgabe der Anwendung
Der Bug-Tracker ist eine Webapplikation, mit welcher ein Unternehmen 
relevante Informationen bei der Qualitätssicherung von Softwareprodukten erfasst.

# Übersicht der fachlichen Funktionen
Erkannte Fehler werden dokumentiert; dabei werden erfasst:

- erkannte Fehler werden dokumentiert; dabei werden erfasst:
    - Beschreibung des Fehlers
    - der Bearbeiter der Fehlererfassung (QS-Mitarbeiter)
    - das Datum der Erfassung
    - die Fehler werden Komponenten, die in Projekten entwickelt werden, zugeordnet
    - die Fehler werden Kategorien zugeordnet
- die Beseitigung von Fehlern wird mit einer Beschreibung erfasst, zusätzlich werden:
    - der Bearbeiter der Fehlerbeseitigung (SW-Entwickler) vermerkt
    - das Datum der Beseitigung dokumentiert
    - die Fehlerursache beschrieben und einer Kategorie zugeordnet
- zur Zuordnung der Fehler werden Projekte und die darin vorgesehenen Komponenten verwaltet
- es werden Kategorien für die Fehler und die Fehlerursachen verwaltet
- es werden drei Auswertungen vorgesehen:
    - Zusammenstellung der Fehler nach Projekt / Komponente / Status Fehler (erkannt/beseitigt)
    – Zusammenstellung der beseitigten Fehler nach Projekt / Komponente / Zeitdifferenz Beseitigung - Erkennung
    - Zusammenstellung der Fehler nach Kategorie / Status Fehler (erkannt/beseitigt).


# Allgemeines zum Applikationsaufbau
Die Applikation wurde mit CherryPy in Python entwickelt. Es wird das Model-View-Controller (MVC) Entwurfsmuster 
zur Strukturierung der Applikation verwendet, wobei die Views über ein Event-Subscriber-Pattern clientseitig umgesetzt wird.
Die erzeugten Daten der Models  werden in JSON-Dateien gespeichert. Die gesamte Applikation ist API-getrieben und über
öffentliche REST-Schnittstellen erreichbar.

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

# Serverseitige Komponenten
## Beschreibung der Basiskomponenten
In Allgemeinen besteht die gesamte Applikation aus vier Klassen: BaseController.py, RESTContorller, Model.py, Router.py. Diese 
Klassen sind für grundsätzliche applikationsunabhängige Aufgaben zuständig. Sie generalisieren also die Grund-Prozesse 
der Applikation. Im Einzelnen gehen wir auf diese kurz ein und beschreiben die Benutzung dieser.

### BaseController.py
Die Basis-Klasse des Controllers beinhaltet allgemeine Funktionen, welche für alle abgeleiteten Controller sinnvoll sind.
Der Controller arbeitet im MVC-Pattern hauptsächlich mit den Models zur Dateninteraktion und dem Views zur Präsentation
zusammen. Der Controller nimmt vom Router die entsprechende Funktion entgegen und verarbeitet diese dann. 

### RESTController.py
Der REST-Controller stellt alle generalisierten Methoden für die REST-Schnittstellen zur Verfügung.
Die abgeleiteten Controller haben immer folgenden beispielsweisen Aufbau:

| URI | HTTP-Verb | Action | Route Name |
|-------|--------|----------|-----------|
| /employees | GET | index | employees.index |
| /employees/create | GET | create | employees.create |
| /employees/store | POST | store | employees.store |
| /employees/:id  | GET | show | employees.show |
| /employees/:id  | PUT | update | employees.update |
| /employees/:id/delete | DELETE | delete | employees.delete |

Zusätzlich bietet der REST-Controller die Möglichkeit, einfache Validierungen auf `store`/`update`-Requests durchzuführen.

### Model.py
Die Basis-Klasse des Models liefert generalisierte Möglichkeiten zur Datenmanipulation und -interaktion, welche durch
das abgeleitete Model durchgeführt werden können. Das Model wird hauptsächlich mit den Controllern interagieren. 

### Router.py
Der Router ist für das Routing der Applikation zuständig. Er kümmert sich um die Zuordnung der jeweiligen URI-Endpunkte
mit den dafür verantwortlichen Controllern. Er kommuniziert ausschließlich mit den Controllern.

## Programmierschnittstellen

### BaseController.py
* `redirect(string url, dictionary params = {}, dictionary notificationData = {}) : null`
    * Beschreibung
    : erzeugt einen HTTP-Redirect an `url` mit `params` als HTTP-Argumente und `notificationData` als Flash-Message. 
    * Rückgabewerte
    : `null`
    
* `route(string route, dictionary params = {}) : string`
    * Beschreibung
    : generiert eine fertige Route aus `route` mithilfe der angegebenen Parameter in `params`
    * Rückgabewerte
    : `string` Konstrutierte Route, welche `params` enthält
    
### RESTController.py
* `__init__(list required_attributes) : null`
    * Beschreibung
    : erstellt eine Instanz und setzt alle benötigten Attribute für die Existenz einer Ressource
    * Rückgabewerte
    : `null`
    
* `index() : HTTP-Response`
    * Beschreibung
    : `GET`-Request: gibt eine List mit allen Daten einer Ressource zurück
    * Rückgabewerte
    : `json`-HTTP-Response (Statuscode: 200 im Erfolgsfall)
    
* `store(dictonary additional_params = None, list non_allowable_attributes = None) : HTTP-Response`
    * Beschreibung
    : `POST`-Request: speichert die übermittelten POST-Daten nach Validierung von `non_allowable_attributes` und fügt 
    `additional_params` an.
    * Werfende Exceptions
    : `ValidationException`: falls Request ein `non_allowable_attributes` enthält
    * Rückgabewerte
    : `json`-HTTP-Response mit erstellter Ressource (Statuscode: 201 im Erfolgsfall)
    
* `show(int id) : HTTP-Response`
    * Beschreibung
    : `GET`-Request: gibt die Daten einer Ressource mit der ID `id` zurück
    * Werfende Exceptions
    : `NotFoundException`: falls Ressource mit der ID `id` nicht existiert
    * Rückgabewerte
    : `json`-HTTP-Response (Statuscode: 200 im Erfolgsfall)
    
* `update(int id, dictonary additional_params = None, list non_allowable_attributes = None) : HTTP-Response`
    * Beschreibung
    : `PUT`-Request: ändert die übermittelten PUT-Daten nach Validierung von `non_allowable_attributes` und fügt 
    `additional_params` an.
    * Werfende Exceptions
    : `ValidationException`: falls Request ein `non_allowable_attributes` enthält
      `NotFoundException`: falls Ressource mit der ID `id` nicht existiert
    * Rückgabewerte
    : `json`-HTTP-Response mit erstellter Ressource (Statuscode: 200 im Erfolgsfall)

* `delete(int id) : HTTP-Response`
    * Beschreibung
    : `DELETE`-Request: löscht die Ressource mit der ID `id`
    * Werfende Exceptions
    : `NotFoundException`: falls Ressource mit der ID `id` nicht existiert
    * Rückgabewerte
    : `json`-HTTP-Response (Statuscode: 200 im Erfolgsfall)
   
    
### Model.py
* `__init__(string fileName, list data_attributes) : null`
    * Beschreibung
    : erstellt `fileName` als Datei im dazugehörigen Speicherpfad und definiert `data_attributes` als Felder des Models
    * Rückgabewerte
    : `null`
    * Werfende Exceptions
    : `Exception`: falls `data_attributes` den Key `id` beinhaltet
    
* `create(dictionary values) : integer|boolean`
    * Beschreibung
    : erstellt einen Eintrag in der zum Model zugehörigen JSON-Datei mit den Argumenten `values`
    * Rückgabewerte
    : `int`, falls Eintrag mit der ID des übergebenen Eintrags erfolgreich persistiert werden konnte, ansonsten `false`
  
* `find(int id) : list|boolean`
    * Beschreibung
    : liefert den zur `id` zugehörigen Dateneintrag 
    * Rückgabewerte
    : `list` mit untergeordneten `dictionary`, falls Eintrag erfolgreich gefunden werden konnte, ansonsten `false` 
    
* `findOrFail(int id) : list`
    * Beschreibung
    : siehe `find()`
    * Rückgabewerte
    : `list` mit untergeordneten `dictionary`: falls Eintrag erfolgreich gefunden werden konnte
    * Werfende Exceptions
    : `Exception`, falls der Eintrag nicht erfolgreich gefunden werden konnte
      
* `all(dictionary where = None) : list`
    * Beschreibung
    : liefert alle Einträge zurück, welche mit `where` als Bedingung vereinbar sind
    * Rückgabewerte
    : `list`: alle Einträge, welche mit `where` als Bedingung vereinbar sind
    
* `update(integer id, dictionary values) : boolean`
    * Beschreibung
    : Aktualisiert den Eintrag mit der `id` mit den Werten in `values`
    * Rückgabewerte
    : `true`: falls der Eintrag aktualisiert werden konnten, ansonsten `false`
    * Werfende Exceptions
    : `Exception`: falls `values` den Key `id` beinhaltet
    
* `delete(integer id) : boolean`
    * Beschreibung
    : Löscht den Eintrag mit der `id` permanent
    * Rückgabewerte
    : `true`: falls der Eintrag gelöscht werden konnte, ansonsten `false`

### Router.py
* `getAllRoutes(list routerConfig) : RoutesDispatcher`
    * Beschreibung
    : generiert eine `RoutesDispatcher` anhand der übergebenen Liste in `routerConfig` und importiert dynamisch die 
      jeweiligen Controller für die Verwendung (Autoloading)
    * Rückgabewerte
    : `object`: RoutesDispatcher

# Datenablage
Die Models generieren bei initialen Aufruf die JSON-Dateien, welche zur Datenablage verwendet werden. Diese liegen 
standardmäßig im Ordner `/data`. Jedes Model benutzt ein dazugehöriges individuelles Datenerzeugnis. Pivotelemente
werden ebenso in einzelnen Models verwaltet wie die eigentlichen Daten selbst.

## Beispiel einer JSON-Datei
```json
{
   "meta": {
      "maxId": 2,
      "columns": [
         [
            "id",
            "name",
            "description",
            "created_date",
            "qs_employee_id",
            "component_id",
            "cause_id",
            "sw_employee_id",
            "type",
            "solution_description",
            "solved_date"
         ]
      ]
   },
   "data": [
      [
         2,
         "Fehler B",
         "Description 2",
         "2018-12-10 18:04:15",
         10,
         3,
         1,
         11,
         1,
         "test",
         "2018-12-10 18:04:15"
      ]
   ]
}
```

## Transformierung der Daten
Da es über normale 1-n-Beziehungen ebenso Pivottabellen geben muss und grundsätzlich eine Transformierung der Daten
manchmal sinnvoll erscheint, kann in der eigentlich Model-Klasse eine spezielle Funktion mit dem Namen `_transformData`
implementiert werden. Diese Funktion wird dann vor der Datenausgabe aufgerufen und manipuliert das entsprechende Ergebnis.
Als Übergabeparameter enthält diese die aktuelle Liste und muss dann die manipulierte Liste zurückgeben.

### Beispiel der Transformierung im Employee-Model
```python
    def _transformData(self, bugs):
        from app.models.Employee import Employee
        from app.models.ProjectComponents import ProjectComponents
        from app.models.Cause import Cause
        from app.models.BugCategories import BugCategories

        formattedBugs = list(bugs)

        for bug in formattedBugs:
            qs_employee = None
            cause = None

            bug['component'] = ProjectComponents().all({'id': bug['component_id']})
            bug['categories'] = BugCategories().withoutTransform().all({'bug_id': bug['id']})

            if isinstance(bug['qs_employee_id'], int):
                qs_employee = Employee().withoutTransform().find(bug['qs_employee_id'])

            if isinstance(bug['cause_id'], int):
                cause = Cause().withoutTransform().find(bug['cause_id'])

            if bug['sw_employee_id'] is not None:
                sw_employee = Employee().withoutTransform().find(bug['sw_employee_id'])

                if sw_employee:
                    bug['sw_employee'] = sw_employee[0]

            if qs_employee:
                bug['qs_employee'] = qs_employee[0]

            if cause:
                bug['cause'] = cause[0]

        return formattedBugs
```

# REST-Responses
Alle Routen geben immer eine einheitliche Antwort auf alle REST-Anfragen. Damit ist sichergestellt, dass man die 
Responses einheitlich verarbeiten kann.

## Alle REST-Routen
```json
[
    {
        "name": "qsmitarbeiter.index",
        "route": "/qsmitarbeiter",
        "method": "EmployeeController@index",
    },
    {
        "name": "qsmitarbeiter.store",
        "route": "/qsmitarbeiter",
        "method": "EmployeeController@store",
        "condition": {"method": ["POST"]}
    },
    {
        "name": "qsmitarbeiter.show",
        "route": "/qsmitarbeiter/:id",
        "method": "EmployeeController@show",
    },
    {
        "name": "qsmitarbeiter.update",
        "route": "/qsmitarbeiter/:id",
        "method": "EmployeeController@update",
        "condition": {"method": ["PUT"]}
    },
    {
        "name": "qsmitarbeiter.delete",
        "route": "/qsmitarbeiter/:id",
        "method": "EmployeeController@delete",
        "condition": {"method": ["DELETE"]}
    },
    {
        "name": "swentwickler.index",
        "route": "/swentwickler",
        "method": "EmployeeController@index",
    },
    {
        "name": "swentwickler.store",
        "route": "/swentwickler",
        "method": "EmployeeController@store",
        "condition": {"method": ["POST"]}
    },
    {
        "name": "swentwickler.show",
        "route": "/swentwickler/:id",
        "method": "EmployeeController@show",
    },
    {
        "name": "swentwickler.update",
        "route": "/swentwickler/:id",
        "method": "EmployeeController@update",
        "condition": {"method": ["PUT"]}
    },
    {
        "name": "swentwickler.delete",
        "route": "/swentwickler/:id",
        "method": "EmployeeController@delete",
        "condition": {"method": ["DELETE"]}
    },
    {
        "name": "katfehler.index",
        "route": "/katfehler",
        "method": "CategoryController@index",
    },
    {
        "name": "katfehler.store",
        "route": "/katfehler",
        "method": "CategoryController@store",
        "condition": {"method": ["POST"]}
    },
    {
        "name": "katfehler.show",
        "route": "/katfehler/:id",
        "method": "CategoryController@show",
    },
    {
        "name": "katfehler.update",
        "route": "/katfehler/:id",
        "method": "CategoryController@update",
        "condition": {"method": ["PUT"]}
    },
    {
        "name": "katfehler.delete",
        "route": "/katfehler/:id",
        "method": "CategoryController@delete",
        "condition": {"method": ["DELETE"]}
    },
    {
        "name": "katursache.index",
        "route": "/katursache",
        "method": "CauseController@index",
    },
    {
        "name": "katursache.store",
        "route": "/katursache",
        "method": "CauseController@store",
        "condition": {"method": ["POST"]}
    },
    {
        "name": "katursache.show",
        "route": "/katursache/:id",
        "method": "CauseController@show",
    },
    {
        "name": "katursache.update",
        "route": "/katursache/:id",
        "method": "CauseController@update",
        "condition": {"method": ["PUT"]}
    },
    {
        "name": "katursache.delete",
        "route": "/katursache/:id",
        "method": "CauseController@delete",
        "condition": {"method": ["DELETE"]}
    },
    {
        "name": "projekt.index",
        "route": "/projekt",
        "method": "ProjectController@index",
    },
    {
        "name": "projekt.store",
        "route": "/projekt",
        "method": "ProjectController@store",
        "condition": {"method": ["POST"]}
    },
    {
        "name": "projekt.show",
        "route": "/projekt/:id",
        "method": "ProjectController@show",
    },
    {
        "name": "projekt.update",
        "route": "/projekt/:id",
        "method": "ProjectController@update",
        "condition": {"method": ["PUT"]}
    },
    {
        "name": "projekt.delete",
        "route": "/projekt/:id",
        "method": "ProjectController@delete",
        "condition": {"method": ["DELETE"]}
    },
    {
        "name": "komponente.index",
        "route": "/komponente",
        "method": "ProjectComponentsController@index",
    },
    {
        "name": "komponente.store",
        "route": "/komponente",
        "method": "ProjectComponentsController@store",
        "condition": {"method": ["POST"]}
    },
    {
        "name": "komponente.show",
        "route": "/komponente/:id",
        "method": "ProjectComponentsController@show",
    },
    {
        "name": "komponente.update",
        "route": "/komponente/:id",
        "method": "ProjectComponentsController@update",
        "condition": {"method": ["PUT"]}
    },
    {
        "name": "komponente.delete",
        "route": "/komponente/:id",
        "method": "ProjectComponentsController@delete",
        "condition": {"method": ["DELETE"]}
    },
    {
        "name": "projektkomponenten.show",
        "route": "/projektkomponenten/:id",
        "method": "ProjectController@show"
    },
    {
        "name": "fehler.index",
        "route": "/fehler",
        "method": "BugController@index",
    },
    {
        "name": "fehler.store",
        "route": "/fehler",
        "method": "BugController@store",
        "condition": {"method": ["POST"]}
    },
    {
        "name": "fehler.show",
        "route": "/fehler/:id",
        "method": "BugController@show",
    },
    {
        "name": "fehler.update",
        "route": "/fehler/:id",
        "method": "BugController@update",
        "condition": {"method": ["PUT"]}
    },
    {
        "name": "fehler.delete",
        "route": "/fehler/:id",
        "method": "BugController@delete",
        "condition": {"method": ["DELETE"]}
    },
    {
        "name": "report.projectList",
        "route": "/prolist",
        "method": "ReportController@projectList"
    },
    {
        "name": "report.categoryList",
        "route": "/katlist",
        "method": "ReportController@categoryList"
    },
    {
        "name": "template.index",
        "route": "/templates",
        "method": "TemplateController@index"
    }
]
```


## Beispiel einer REST-Antwort nach erfolgreichen Ändern einer Ressource
```json
{
    "status": "success",
    "message": "You have successfully updated the ressource.",
    "code": 200,
    "data": {
        "id": 9,
        "name": "Fehler B",
        "description": "Description B",
        "created_date": "2018-12-30 21:29:06",
        "qs_employee_id": 12,
        "component_id": 4,
        "cause_id": null,
        "sw_employee_id": 11,
        "type": 2,
        "solution_description": "Solution Description B",
        "solved_date": "2018-12-30 21:33:25",
        "component": [
            {
                "id": 4,
                "name": "Testkomponente",
                "project_id": 4,
                "project": {
                    "id": 4,
                    "name": "Projekt A"
                }
            }
        ],
        "categories": [
            {
                "id": 164,
                "bug_id": 9,
                "category_id": 3
            }
        ],
        "sw_employee": {
            "id": 11,
            "last_name": "Entwickler",
            "first_name": "SW",
            "type": 2
        },
        "qs_employee": {
            "id": 12,
            "last_name": "Mitarbeiter",
            "first_name": "QS",
            "type": 1
        }
    }
}
```

# Clientseitige Komponenten
## Beschreibung der Basiskomponenten
Im Allgemeinen besteht die gesamte Applikation aus sieben Klassen: CoreView.js, CoreIndexView.js, CoreCreateView.js, 
CoreShowView.js, CoreRequest.js, CoreUtil.js, CoreValidator.js. Diese 
Klassen sind für grundsätzliche applikationsunabhängige Aufgaben zuständig. Sie generalisieren also die Grund-Prozesse 
der clientseitigen Applikation. Im Einzelnen gehen wir auf diese kurz ein und beschreiben die Benutzung dieser.

### CoreView.js
Das CoreView.js beinhaletet allgemeine Methoden zur Verwendung des Event-Subscriber-Pattern und Hilfsmethoden.

### CoreIndexView.js
Registriert die notwendigen Eventhandles für das IndexView einer Ressource und stellt standardmäßig alle Daten bereit.

### CoreCreateView.js
Registriert die notwendigen Eventhandles für das CreateView einer Ressource. Die Daten werden dann mithilfe eines 
Validators beim Speichern validiert.

### CoreShowViw.js
Registriert die notwendigen Eventhandles für das ShowView einer Ressource. Die Daten werden dann mithilfe eines 
Validators beim Aktualisieren validiert.

### CoreRequest.js
Stellt Hilfsmethoden zur Verfügung, welche mit welcher man mit der Fetch-API REST-Requests durchführen kann.

### CoreRequest.js
Stellt Hilfsmethoden zur Verfügung, welche mit welcher man mit der Fetch-API REST-Requests durchführen kann.

### CoreUtil.js
Stellt eine Hilfsmethode zur Verfügung, um alle Formulardaten eines Formulars als Objekt zu erhalten.

### CoreValidator.js
Stellt Hilfsmethoden zur Verfügung, um Objekte auf Regeln zur Validierung zu untersuchen.

## Event-Service
Events werden ausgelöst und durch das Subscriben der jeweiligen Events wird eine vordefinierte Aktion getriggert.
Diese Aktionen befinden sich in der eigentlichen `app.js`. Ein Beispiel dafür:

```javascript
switch (message_spl) {
case "employees":
    switch (data_opl[0]) {
        case "index":
            if(data_opl[1] == null || data_opl[1] === undefined) {
                this.employees.indexView.index('all');
                break;
            }
            
            this.employees.indexView.index(data_opl[1]);
            break;
        case "create":
            this.employees.createView.create();
            break;
        case "store":
            this.employees.createView.store(data_opl[1]);
            break;
        case "show":
            this.employees.showView.show(data_opl[1]);
            break;
        case "update":
            this.employees.showView.update(data_opl[1]);
            break;
        case "delete":
            this.employees.indexView.delete(data_opl[1]);
            break;
    }
    break;
}
```

## Template-Verarbeitung
Die Templates werden durch einen Parser verarbeitet, welcher in einer seperaten Dokumentation beschrieben wird. 
Beispielhaft kann man sich an folgenden Codeausschnitt orientieren:

 ```html
<h2>Projekte</h2>
@if context['data'].length > 0@
<table>
    <tr>
        <th>ID</th>
        <th>Name</th>
    </tr>
    @var entry_a;@
    @var loop_i;@
    @context['data'].forEach(function(value){@
    <tr id="#value['id']#">
        <td>#value['id']#</td>
        <td>#value['name']#</td>
    </tr>
    @});@
</table>
@else@
<p>Momentan sind noch keine Datensätze vorhanden.</p>
@endif@

<div class="buttons">
    <button id="showEntry" data-controller="projects">Anzeigen</button>
    <button id="createEntry" data-controller="projects">Neu anlegen</button>
    <button id="deleteEntry" data-controller="projects">Löschen</button>
</div>
```

# Validierungen
Die HTML5-Validierungen wurden mithilfe des ["Nu Html Checker"](https://validator.w3.org/nu/#textarea) vom W3C 
durchgeführt. Es wurden keine Fehler gefunden. Die Warnungen können ignoriert werden, da diese lediglich für 
ältere Browser relevant sind (HTML5 polyfilling).
