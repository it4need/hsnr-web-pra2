# coding: utf-8

from app.core.RESTController import RESTController
from app.models.Category import Category
from app.models.BugCategories import BugCategories
import cherrypy


class CategoryController(RESTController):
    def __init__(self):
        required_attributes = ['name']
        RESTController.__init__(self, required_attributes)

    def _setupRESTfulModels(self):
        return Category()

    @cherrypy.tools.json_out()
    def delete(self, id):
        bug_categories = BugCategories().all({'category_id': int(id)})

        for bugCategory in bug_categories:
            BugCategories().delete(bugCategory['id'])

        return super(CategoryController, self).delete(id)
