# coding: utf-8

from app.core.RESTController import RESTController
from app.models.Cause import Cause
from app.models.Bug import Bug

import cherrypy


class CauseController(RESTController):
    def __init__(self):
        required_attributes = ['name']
        RESTController.__init__(self, required_attributes)

    def _setupRESTfulModels(self):
        return Cause()

    @cherrypy.tools.json_out()
    def delete(self, id):
        bugs = Bug().all({'cause_id': int(id)})

        for bug in bugs:
            Bug().update(bug['id'], {'cause_id': None})

        return super(CauseController, self).delete(id)