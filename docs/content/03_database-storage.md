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