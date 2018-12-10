# coding: utf-8
from app.core.Exceptions.ValidationException import ValidationException
from app.core.RESTController import RESTController
from app.models.ProjectComponents import ProjectComponents
from app.models.Project import Project
import cherrypy


class ProjectComponentsController(RESTController):
    def __init__(self):
        required_attributes = ['name', 'project_id']
        RESTController.__init__(self, required_attributes)

    def _setupRESTfulModels(self):
        return ProjectComponents()

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self):
        try:
            self._checkRequestForExistingModelEntry([Project(), 'project_id'])

            return super(ProjectComponentsController, self).store()
        except ValidationException as e:
            return self.withError(str(e))
