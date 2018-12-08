# coding: utf-8
import cherrypy
import json
from app.config.app import AppConfig
from app.config.routes import RouterConfig
from app.core.router import RouteDispatcher


def main():
    cherrypy.engine.autoreload.unsubscribe()

    static_config = {
        '/': {
            'tools.staticdir.root': AppConfig.root_dir,
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './content',
            'tools.staticdir.index': 'index.html',
            'tools.sessions.on': True,
            'tools.encode.on': True,
            'tools.encode.encoding': 'utf-8',
            'request.show_tracebacks': True,
            'error_page.404': jsonify_error,
            'error_page.500': jsonify_error,
            'error_page.400': jsonify_error,
            'tools.Functions.on': True,
            'request.dispatch': RouteDispatcher().getAllRoutes(RouterConfig.routes),
        }
    }

    cherrypy.tree.mount(root=None, config=static_config)

    cherrypy.tools.Functions = cherrypy.Tool('before_handler', check_testing)

    if AppConfig.mode != 'development':
        cherrypy.config.update({'request.show_tracebacks': False})

    cherrypy.engine.start()
    cherrypy.engine.block()


def check_testing(self=None):
    # check if testing is enabled
    if cherrypy.request.headers.get('Env') == 'testing':
        AppConfig.mode = 'testing'

def jsonify_error(status, message, traceback, version):
    response = cherrypy.response
    response.headers['Content-Type'] = 'application/json'

    if AppConfig.mode == 'development':
        return json.dumps({'code': status, 'message': message, 'traceback': traceback, "status": "error"})
    else:
        return json.dumps({'code': status, 'message': message, "status": "error"})


if __name__ == '__main__':
    main()
# EOF
