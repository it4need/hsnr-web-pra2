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