# coding: utf-8

from app.core.RESTController import RESTController
from app.models.BugCause import BugCause
import cherrypy

class BugCauseController(RESTController):
    def __init__(self):
        RESTController.__init__(self)

    def _setupRESTfulModels(self):
        return BugCause()