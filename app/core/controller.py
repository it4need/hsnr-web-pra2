# coding: utf-8

import cherrypy
from app.core.view import View
from app.config.app import AppConfig
from app.config.routes import RouterConfig


class BaseController(object):

    def __init__(self):
        self.view = View(AppConfig.view_folder)

    def redirect(self, toUrl, params={}, notificationData={}):
        if toUrl in RouterConfig.getAllRoutes():
            for key, data in notificationData.items():
                cherrypy.session['notifications_' + str(key)] = data
            raise cherrypy.HTTPRedirect(self.route(RouterConfig.getAllRoutes()[toUrl], params))
        else:
            raise cherrypy.HTTPRedirect(toUrl)

    def route(self, route, params={}):
        final_route = route

        for key, value in params.items():
            final_route = final_route.replace(':' + str(key), str(value))

        return final_route

    def withError(self, message="Whooops, somethings went wrong.", code=422):
        return self.__messageWithHTTPStatusCode(message, code, 'error')

    def withNotFound(self, message="The requested ressource was not found", code=404):
        return self.withError(message, code)

    def withSuccess(self, appendRessource=None, message="Operation successful.", code=200):
        return self.__messageWithHTTPStatusCode(message, code, 'success', appendRessource)

    def withSuccessfullyCreated(self, appendRessource=None,
                                message="You have successfully created the requested ressource."):
        return self.withSuccess(appendRessource, message, 201)

    def withSuccessfullyDeleted(self, appendRessource=None,
                                message="You have successfully deleted the ressource."):
        return self.withSuccess(appendRessource, message)

    def withSuccessfullyUpdated(self, appendRessource=None,
                                message="You have successfully updated the ressource."):
        return self.withSuccess(appendRessource, message)

    def __messageWithHTTPStatusCode(self, message, code, type, appendRessource=None):
        self.__setStatusCode(code)
        message = {'status': type, 'message': message, 'code': code}

        if appendRessource or code is 200:
            message['data'] = appendRessource

        return message

    def __setStatusCode(self, code=200):
        cherrypy.response.status = code
