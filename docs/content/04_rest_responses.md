# REST-Responses
Alle Routen geben immer eine einheitliche Antwort auf alle REST-Anfragen. Damit ist sichergestellt, dass man die 
Responses einheitlich verarbeiten kann.

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