# coding: utf-8

from app.core.RESTController import RESTController
from app.models.Project import Project


class ProjectController(RESTController):
    def __init__(self):
        RESTController.__init__(self)

    def _setupRESTfulModels(self):
        return Project()