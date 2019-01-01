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