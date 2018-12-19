# coding: utf-8

from app.core.BaseController import BaseController
from app.config.app import AppConfig
import cherrypy
import os
import os.path
import codecs


class TemplateController(BaseController):
    def __init__(self):
        BaseController.__init__(self)

    @cherrypy.tools.json_out()
    def index(self):
        retVal_o = {
            'templates': {}
        }

        files_a = os.listdir(AppConfig.template_folder)

        for path, subdirs, files in os.walk(AppConfig.template_folder):
            for name in files:
                sub_folder = path.split(AppConfig.template_folder)[-1].lstrip('/')
                file_o = codecs.open(os.path.join(path, name), 'rU',
                                     'utf-8')
                content_s = file_o.read()
                file_o.close()
                template_name = (sub_folder + '.' + name if sub_folder != '' else name)
                retVal_o["templates"][template_name] = content_s

        return retVal_o
