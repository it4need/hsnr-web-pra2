# coding: utf-8

from app.core.controller import BaseController
from app.models.BugCause import BugCause
import cherrypy


class BugCauseController(BaseController):
    def __init__(self):
        BaseController.__init__(self)

    @cherrypy.tools.json_out()
    def index(self):
        bug_cause = BugCause().all()

        return self.withSuccess(bug_cause)

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self):
        try:
            bug_cause = BugCause().create(cherrypy.request.json)
        except Exception as e:
            return self.withError(str(e))

        return self.withSuccessfullyCreated(bug_cause[0])

    @cherrypy.tools.json_out()
    def show(self, id):
        bug_cause = BugCause().find(id)

        if not bug_cause:
            return self.withNotFound()

        return self.withSuccess(bug_cause[0])

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def update(self, id):
        if not BugCause().find(id):
            return self.withNotFound()

        try:
            bug_cause = BugCause().update(id, cherrypy.request.json)

            if bug_cause:
                return self.withSuccessfullyUpdated(bug_cause[0])
            else:
                return self.withError()
        except Exception as e:
            return self.withError(str(e))

    @cherrypy.tools.json_out()
    def delete(self, id):
        if not BugCause().find(id):
            return self.withNotFound()

        if not BugCause().delete(id):
            return self.withError()

        return self.withSuccessfullyDeleted()