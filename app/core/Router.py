# coding: utf-8
import cherrypy
from importlib import import_module


class RouteDispatcher:
    def getAllRoutes(self, routerConfig):
        dispatcher = cherrypy.dispatch.RoutesDispatcher()
        for route in routerConfig:

            if 'condition' in route:
                routeConditions = route['condition']
            else:
                routeConditions = {'method': ['GET']}

            if 'name' in route:
                routeName = route['name']
            else:
                routeName = route['route'].strip('/').replace('/', '.')

            routeController, routeMethod = route['method'].split('@')

            # Dynamically import controllers for using them
            moduleName = "app.controllers." + routeController
            routeController = self.dynamic_import(moduleName, routeController)()

            dispatcher.connect(
                name=routeName,
                route=route['route'],
                action=routeMethod,
                controller=routeController,
                conditions=routeConditions
            )

        return dispatcher

    def dynamic_import(self, abs_module_path, class_name):
        module_object = import_module(abs_module_path)
        target_class = getattr(module_object, class_name)

        return target_class
