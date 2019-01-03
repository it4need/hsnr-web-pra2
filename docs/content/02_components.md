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