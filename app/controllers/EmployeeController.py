# coding: utf-8

from app.core.RESTController import RESTController
from app.models.Employee import Employee
import cherrypy


class EmployeeController(RESTController):
    TYPE_ERROR = "You must provide key `type´ with either value of 1 or 2"

    def __init__(self):
        RESTController.__init__(self)

    def _setupRESTfulModels(self):
        return Employee()

    @cherrypy.tools.json_out()
    def index(self):
        if self.__isQSEmployee():
            return self.withSuccess(self._setupRESTfulModels().allQS())
        elif self.__isSWEmployee():
            return self.withSuccess(self._setupRESTfulModels().allSW())

        return super(EmployeeController, self).index()

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def update(self, id):
        if self.__requestHasAllowableType():
            return self.withError(self.TYPE_ERROR)

        return super(EmployeeController, self).update(id)

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self):
        if 'type' not in cherrypy.request.json or self.__requestHasAllowableType():
            return self.withError(self.TYPE_ERROR)

        return super(EmployeeController, self).store()

    def __isQSEmployee(self):
        return cherrypy.url().endswith('qsmitarbeiter')

    def __isSWEmployee(self):
        return cherrypy.url().endswith('swentwickler')

    def __requestHasAllowableType(self):
        return 'type' in cherrypy.request.json and \
               cherrypy.request.json['type'] != Employee.TYPE_QS and \
               cherrypy.request.json['type'] != Employee.TYPE_SW
