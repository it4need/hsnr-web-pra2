# coding: utf-8

from app.core.RESTController import RESTController
from app.models.Cause import Cause
import cherrypy


class CauseController(RESTController):
    def __init__(self):
        required_attributes = ['name']
        RESTController.__init__(self, required_attributes)

    def _setupRESTfulModels(self):
        return Cause()
