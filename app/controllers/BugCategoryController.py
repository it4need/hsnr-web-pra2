# coding: utf-8

from app.core.controller import BaseController
from app.models.BugCategory import BugCategory
import cherrypy


class BugCategoryController(BaseController):
    def __init__(self):
        BaseController.__init__(self)

    @cherrypy.tools.json_out()
    def index(self):
        bug_categories = BugCategory().all()

        return self.withSuccess(bug_categories)

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self):
        try:
            bug_category = BugCategory().create(cherrypy.request.json)
        except Exception as e:
            return self.withError(str(e))

        return self.withSuccessfullyCreated(bug_category[0])

    @cherrypy.tools.json_out()
    def show(self, id):
        bug_category = BugCategory().find(id)

        if not bug_category:
            return self.withNotFound()

        return self.withSuccess(bug_category[0])

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def update(self, id):
        if not BugCategory().find(id):
            return self.withNotFound()

        try:
            bug_category = BugCategory().update(id, cherrypy.request.json)

            if bug_category:
                return self.withSuccessfullyUpdated(bug_category[0])
            else:
                return self.withError()
        except Exception as e:
            return self.withError(str(e))

    @cherrypy.tools.json_out()
    def delete(self, id):
        if not BugCategory().find(id):
            return self.withNotFound()

        if not BugCategory().delete(id):
            return self.withError()

        return self.withSuccessfullyDeleted()