# coding: utf-8

class RouterConfig:
    routes = [
        {
            'name': 'qsmitarbeiter.index',
            'route': '/qsmitarbeiter',
            'method': 'EmployeeController@index',
        },
        {
            'name': 'qsmitarbeiter.store',
            'route': '/qsmitarbeiter',
            'method': 'EmployeeController@store',
            'condition': {'method': ['POST']}
        },
        {
            'name': 'qsmitarbeiter.show',
            'route': '/qsmitarbeiter/:id',
            'method': 'EmployeeController@show',
        },
        {
            'name': 'qsmitarbeiter.update',
            'route': '/qsmitarbeiter/:id',
            'method': 'EmployeeController@update',
            'condition': {'method': ['PUT']}
        },
        {
            'name': 'qsmitarbeiter.delete',
            'route': '/qsmitarbeiter/:id',
            'method': 'EmployeeController@delete',
            'condition': {'method': ['DELETE']}
        },
        {
            'name': 'swentwickler.index',
            'route': '/swentwickler',
            'method': 'EmployeeController@index',
        },
        {
            'name': 'swentwickler.store',
            'route': '/swentwickler',
            'method': 'EmployeeController@store',
            'condition': {'method': ['POST']}
        },
        {
            'name': 'swentwickler.show',
            'route': '/swentwickler/:id',
            'method': 'EmployeeController@show',
        },
        {
            'name': 'swentwickler.update',
            'route': '/swentwickler/:id',
            'method': 'EmployeeController@update',
            'condition': {'method': ['PUT']}
        },
        {
            'name': 'swentwickler.delete',
            'route': '/swentwickler/:id',
            'method': 'EmployeeController@delete',
            'condition': {'method': ['DELETE']}
        },
        {
            'name': 'katfehler.index',
            'route': '/katfehler',
            'method': 'BugCategoryController@index',
        },
        {
            'name': 'katfehler.store',
            'route': '/katfehler',
            'method': 'BugCategoryController@store',
            'condition': {'method': ['POST']}
        },
        {
            'name': 'katfehler.show',
            'route': '/katfehler/:id',
            'method': 'BugCategoryController@show',
        },
        {
            'name': 'katfehler.update',
            'route': '/katfehler/:id',
            'method': 'BugCategoryController@update',
            'condition': {'method': ['PUT']}
        },
        {
            'name': 'katfehler.delete',
            'route': '/katfehler/:id',
            'method': 'BugCategoryController@delete',
            'condition': {'method': ['DELETE']}
        },
    ]

    @staticmethod
    def getAllRoutes():
        allRoutes = {}
        for routes in RouterConfig.routes:
            if 'name' in routes:
                allRoutes[routes['name']] = routes['route']

        return allRoutes
