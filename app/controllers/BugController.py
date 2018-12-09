# coding: utf-8

from app.core.RESTController import RESTController
from app.models.Bug import Bug
from app.models.ProjectComponents import ProjectComponents
from app.models.Employee import Employee
import cherrypy


class BugController(RESTController):
    def __init__(self):
        required_attributes = ['name', 'description', 'created_date', 'qs_employee_id', 'component_id', 'cause_id']
        RESTController.__init__(self, required_attributes)

    def _setupRESTfulModels(self):
        return Bug()

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self):
        if 'component_id' in cherrypy.request.json and not ProjectComponents().find(
                cherrypy.request.json['component_id']):
            return self.withError("A component with the given `component_id´ does not exist.")

        if 'qs_employee_id' in cherrypy.request.json and not Employee().find(cherrypy.request.json['qs_employee_id']):
            return self.withError("A employee with the given `qs_employee_id´ does not exist.")

        if 'cause_id' in cherrypy.request.json and not Employee().find(cherrypy.request.json['cause_id']):
            return self.withError("A cause with the given `cause_id´ does not exist.")

        return super(BugController, self).store({'type': Bug.TYPE_REPORTED})
