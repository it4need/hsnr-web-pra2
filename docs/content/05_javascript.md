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