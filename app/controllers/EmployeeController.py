# coding: utf-8

from app.core.controller import BaseController
from app.models.Employee import Employee
import cherrypy


class EmployeeController(BaseController):
    TYPE_ERROR = "You must provide key `type´ with either value of 1 or 2"

    def __init__(self):
        BaseController.__init__(self)

    @cherrypy.tools.json_out()
    def index(self):
        if self.__isQSEmployee():
            employees = Employee().allQS()
        elif self.__isSWEmployee():
            employees = Employee().allSW()
        else:
            employees = Employee().all()

        return self.withSuccess(employees)

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self):
        if 'type' not in cherrypy.request.json or self.__requestHasAllowableType():
            return self.withError(self.TYPE_ERROR)

        try:
            employee = Employee().create(cherrypy.request.json)
        except Exception as e:
            return self.withError(str(e))

        return self.withSuccessfullyCreated(employee[0])

    @cherrypy.tools.json_out()
    def show(self, id):
        employee = Employee().find(id)

        if not employee:
            return self.withNotFound()

        return self.withSuccess(employee[0])

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def update(self, id):
        if not Employee().find(id):
            return self.withNotFound()

        if self.__requestHasAllowableType():
            return self.withError(self.TYPE_ERROR)

        try:
            employee = Employee().update(id, cherrypy.request.json)

            if employee:
                return self.withSuccessfullyUpdated(employee[0])
            else:
                return self.withError()
        except Exception as e:
            return self.withError(str(e))

    @cherrypy.tools.json_out()
    def delete(self, id):
        if not Employee().find(id):
            return self.withNotFound()

        if not Employee().delete(id):
            return self.withError()

        return self.withSuccessfullyDeleted()

    def __isQSEmployee(self):
        return cherrypy.url().endswith('qsmitarbeiter')

    def __isSWEmployee(self):
        return cherrypy.url().endswith('swentwickler')

    def __requestHasAllowableType(self):
        return 'type' in cherrypy.request.json and \
               cherrypy.request.json['type'] != Employee.TYPE_QS and \
               cherrypy.request.json['type'] != Employee.TYPE_SW
