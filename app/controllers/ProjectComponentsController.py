# coding: utf-8

from app.core.RESTController import RESTController
from app.models.ProjectComponents import ProjectComponents
from app.models.Project import Project
import cherrypy


class ProjectComponentsController(RESTController):
    def __init__(self):
        RESTController.__init__(self)

    def _setupRESTfulModels(self):
        return ProjectComponents()

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self):
        if 'project_id' not in cherrypy.request.json:
            return self.withError("You must provide a key-value pair of key `project_id´")

        if not Project().find(cherrypy.request.json['project_id']):
            return self.withError("The given `project_id is not associated with a project.")

        return super(ProjectComponentsController, self).store()