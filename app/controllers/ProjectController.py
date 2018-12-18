# coding: utf-8

from app.core.RESTController import RESTController
from app.models.Project import Project
from app.models.ProjectComponents import ProjectComponents
from app.models.Bug import Bug
from app.models.BugCategories import BugCategories
import cherrypy
import json


class ProjectController(RESTController):
    def __init__(self):
        required_attributes = ['name']
        RESTController.__init__(self, required_attributes)

    def _setupRESTfulModels(self):
        return Project()

    @cherrypy.tools.json_out()
    def delete(self, id):
        projectComponents = ProjectComponents().all({'project_id': int(id)})

        for projectComponent in projectComponents:
            bugs_associated_with_component = Bug().all({'component_id': projectComponent['id']})

            ProjectComponents().delete(projectComponent['id'])

            for bug in bugs_associated_with_component:
                bug_categories = BugCategories().all({'bug_id': bug['id']})

                for bug_category in bug_categories:
                    BugCategories().delete(bug_category['id']);

                Bug().delete(bug['id'])

        return super(ProjectController, self).delete(id)
