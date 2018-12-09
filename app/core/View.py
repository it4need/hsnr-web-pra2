# coding: utf-8

import cherrypy
from app.config.app import AppConfig
from app.config.routes import RouterConfig
from mako.lookup import TemplateLookup


class View(object):
    def __init__(self, view_search_folder):
        self.lookup_o = TemplateLookup(directories=view_search_folder, input_encoding='utf-8')

    def load(self, template, data_opl={}):
        data_opl['_routes'] = RouterConfig.getAllRoutes()
        data_opl['_notifications'] = self.__getNotificationSessions()
        data_opl['_currentUrl'] = cherrypy.url()

        return self.__render(template, data_opl)

    def __render(self, template_spl, data_opl):
        header = self.__render_header(data_opl)
        footer = self.__render_footer(data_opl)
        content = self.__render_template(template_spl, data_opl)

        self.__cleanupNotificationSessions()

        return header + content + footer

    def __render_header(self, data_opl):
        return self.__render_template('_partials.header', data_opl)

    def __render_footer(self, data_opl):
        return self.__render_template('_partials.footer', data_opl)

    def __render_template(self, template_spl, data_opl):
        template_spl = template_spl.replace('.', '/')
        template = self.lookup_o.get_template(template_spl + AppConfig.view_extension)
        rendered = template.render(data=data_opl)
        return rendered

    def __cleanupNotificationSessions(self):
        for session_key, session_value in enumerate(list(cherrypy.session.items())):
            if session_value[0].startswith('notifications_'):
                cherrypy.session.pop(session_value[0])

    def __getNotificationSessions(self):
        sessionData = {}

        for session_key, session_value in enumerate(cherrypy.session.items()):
            if session_value[0].startswith('notifications_'):
                notification_type = session_value[0].replace('notifications_', '')
                notification_message = session_value[1]
                sessionData[notification_type] = notification_message

        return sessionData
