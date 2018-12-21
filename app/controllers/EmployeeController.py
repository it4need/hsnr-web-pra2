# coding: utf-8

from app.core.RESTController import RESTController
from app.models.Employee import Employee
from app.models.Bug import Bug

import cherrypy


class EmployeeController(RESTController):
    TYPE_ERROR = "You must provide key `type´ with either value of 1 or 2"

    def __init__(self):
        required_attributes = ['last_name', 'first_name', 'type']
        RESTController.__init__(self, required_attributes)

    def _setupRESTfulModels(self):
        return Employee()

    @cherrypy.tools.json_out()
    def index(self):
        return self.withSuccess(self._setupRESTfulModels().all())

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self):
        if 'type' not in cherrypy.request.json or self.__requestHasAllowableType():
            return self.withError(self.TYPE_ERROR)

        return super(EmployeeController, self).store() 

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def update(self, id):
        if self.__requestHasAllowableType():
            return self.withError(self.TYPE_ERROR)

        return super(EmployeeController, self).update(id)

    @cherrypy.tools.json_out()
    def delete(self, id):
        employee = Employee().find(int(id))
        column_to_update = None
        bugs = []

        if employee and employee[0]['type'] == Employee.TYPE_SW:
            column_to_update = 'sw_employee_id'
            bugs = Bug().all({column_to_update: int(id)})
        elif employee and employee[0]['type'] == Employee.TYPE_QS:
            column_to_update = 'qs_employee_id'
            bugs = Bug().all({column_to_update: int(id)})

        if len(bugs) > 0:
            for bug in bugs:
                Bug().update(bug['id'], {column_to_update: None})

        return super(EmployeeController, self).delete(int(id))

    def __requestHasAllowableType(self):
            return 'type' in cherrypy.request.json and \
                int(cherrypy.request.json['type']) != Employee.TYPE_QS and \
                int(cherrypy.request.json['type']) != Employee.TYPE_SW