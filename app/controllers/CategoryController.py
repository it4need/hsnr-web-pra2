# coding: utf-8

from app.core.RESTController import RESTController
from app.models.Category import Category


class CategoryController(RESTController):
    def __init__(self):
        required_attributes = ['name']
        RESTController.__init__(self, required_attributes)

    def _setupRESTfulModels(self):
        return Category()