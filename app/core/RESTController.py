# coding: utf-8

from app.core.BaseController import BaseController
import cherrypy


class RESTController(BaseController):
    model = None

    def __init__(self):
        BaseController.__init__(self)

    def setModel(self, model):
        if model is None:
            raise Exception("RESTful Controllers needs a model to pass in.")

        self.model = model

    @cherrypy.tools.json_out()
    def index(self):
        self.__setModel()

        return self.withSuccess(self.model.all())

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self):
        self.__setModel()

        try:
            ressource = self.model.create(cherrypy.request.json)
        except Exception as e:
            return self.withError(str(e))

        return self.withSuccessfullyCreated(ressource[0])

    @cherrypy.tools.json_out()
    def show(self, id):
        self.__setModel()

        ressource = self.model.find(id)

        if not ressource:
            return self.withNotFound()

        return self.withSuccess(ressource[0])

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def update(self, id):
        self.__setModel()

        if not self.model.find(id):
            return self.withNotFound()

        try:
            ressource = self.model.update(id, cherrypy.request.json)

            if ressource:
                return self.withSuccessfullyUpdated(ressource[0])
            else:
                return self.withError()
        except Exception as e:
            return self.withError(str(e))

    @cherrypy.tools.json_out()
    def delete(self, id):
        self.__setModel()

        if not self.model.find(id):
            return self.withNotFound()

        if not self.model.delete(id):
            return self.withError()

        return self.withSuccessfullyDeleted()

    def __setModel(self):
        if hasattr(self.__class__, '_setupRESTfulModels') and callable(getattr(self.__class__, '_setupRESTfulModels')):
            self.model = self._setupRESTfulModels()

        if self.model is None:
            raise Exception("RESTful Controllers needs a model to pass in.")