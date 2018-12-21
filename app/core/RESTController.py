# coding: utf-8

from app.core.BaseController import BaseController
from app.core.Exceptions.ValidationException import ValidationException
from app.core.Exceptions.NotFoundException import NotFoundException
import cherrypy


class RESTController(BaseController):
    model = None
    required_attr = []

    def __init__(self, required_attr=[]):
        BaseController.__init__(self)
        self.__setRequiredAttributes(required_attr)

    @cherrypy.tools.json_out()
    def index(self):
        self.__setModel()

        return self.withSuccess(self.model.all())

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self, additional_params=None, non_allowable_attributes=None):
        self.__setModel()

        try:
            self.__checkRequestForMissingRequiredAttrbiutes()
            self.__checkRequestForEmptyRequiredAttrbiutes()
            self.__checkForNonAllowableAttributes(non_allowable_attributes)

            createdDict = cherrypy.request.json

            if isinstance(additional_params, dict):
                createdDict.update(additional_params)

            ressource = self.model.create(createdDict)
        except ValidationException as e:
            return self.withError(str(e))
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
    def update(self, id, additional_params=None, non_allowable_attributes=None):
        self.__setModel()

        try:
            if not self.model.find(id):
                raise NotFoundException()

            self.__checkForNonAllowableAttributes(non_allowable_attributes)
            self.__checkRequestForEmptyRequiredAttrbiutes()

            createdValues = cherrypy.request.json

            if isinstance(additional_params, dict):
                createdValues.update(additional_params)

            ressource = self.model.update(id, createdValues)

            if ressource:
                return self.withSuccessfullyUpdated(ressource[0])
            else:
                raise Exception("Entry cannot be updated. Reason: unknown.")

        except NotFoundException as e:
            return self.withNotFound(str(e))
        except ValidationException as e:
            return self.withError(str(e))
        except Exception as e:
            return self.withError(str(e))


    @cherrypy.tools.json_out()
    def delete(self, id):
        self.__setModel()

        try:
            if not self.model.find(id):
                raise NotFoundException()

            if not self.model.delete(id):
                raise Exception("Entry cannot be deleted. Reason: unknown.")
        except NotFoundException as e:
            return self.withError(str(e))
        except Exception as e:
            return self.withError(str(e))

        return self.withSuccessfullyDeleted()

    def __setModel(self):
        if hasattr(self.__class__, '_setupRESTfulModels') and callable(getattr(self.__class__, '_setupRESTfulModels')):
            self.model = self._setupRESTfulModels()

        if self.model is None:
            raise Exception("RESTful Controllers needs a model to pass in. Use _setupRESTfulModels to setup.")

    def __setRequiredAttributes(self, attr):
        if isinstance(attr, list):
            self.required_attr = attr

    def _checkRequestForExistingModelEntry(self, *kwargs):
        for modelEntry in kwargs:
            model, key = modelEntry

            if key in cherrypy.request.json and not model.find(cherrypy.request.json[key]):
                raise ValidationException(
                    "A " + model.__class__.__name__ + " with the given `" + key + "´ does not exist.")

    def __checkForNonAllowableAttributes(self, non_allowable_attributes):
        if isinstance(non_allowable_attributes, list):
            for non_allowable_attribute in non_allowable_attributes:
                if non_allowable_attribute in cherrypy.request.json:
                    raise ValidationException(
                        "A " + self.__class__.__name__.replace('Controller', '') +" cannot have a key-value pair of `" + non_allowable_attribute + "´")

    def __checkRequestForMissingRequiredAttrbiutes(self):
        for attr in self.required_attr:
            if attr not in cherrypy.request.json:
                raise ValidationException("You must pass a key-value pair of key `" + attr + "´.")

    def __checkRequestForEmptyRequiredAttrbiutes(self):
        for attr in self.required_attr:
            if attr in cherrypy.request.json and cherrypy.request.json[attr] == '':
                raise ValidationException("You must pass a key-value pair of key `" + attr + "´. Empty values are not allowed!")

