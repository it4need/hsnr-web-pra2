# coding: utf-8

from app.core.RESTController import RESTController
from app.models.Bug import Bug
from app.models.ProjectComponents import ProjectComponents
from app.models.Employee import Employee
from app.models.Cause import Cause
from app.models.BugCategories import BugCategories
from app.models.Category import Category
from time import localtime, strftime

import cherrypy


class BugController(RESTController):
    def __init__(self):
        required_attributes = ['name', 'description', 'qs_employee_id', 'component_id', 'cause_id']
        RESTController.__init__(self, required_attributes)

    def _setupRESTfulModels(self):
        return Bug()

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self, additional_params=None):
        if 'component_id' in cherrypy.request.json and not ProjectComponents().find(
                cherrypy.request.json['component_id']):
            return self.withError("A component with the given `component_id´ does not exist.")

        if 'qs_employee_id' in cherrypy.request.json and not Employee().find(cherrypy.request.json['qs_employee_id']):
            return self.withError("A employee with the given `qs_employee_id´ does not exist.")

        if 'cause_id' in cherrypy.request.json and not Cause().find(cherrypy.request.json['cause_id']):
            return self.withError("A cause with the given `cause_id´ does not exist.")

        if 'sw_employee_id' in cherrypy.request.json:
            return self.withError("A new bug cannot have a key-value pair of `sw_employee_id´")

        if 'type' in cherrypy.request.json:
            return self.withError("A new bug cannot have a key-value pair of `type´")

        if 'solution_description' in cherrypy.request.json:
            return self.withError("A new bug cannot have a key-value pair of `solution_description´")

        if 'solved_date' in cherrypy.request.json:
            return self.withError("A new bug cannot have a key-value pair of `solved_date´")

        if 'solved_categories' in cherrypy.request.json:
            return self.withError("A new bug cannot have a key-value pair of `solved_categories´")

        return super(BugController, self).store(
            {'type': Bug.TYPE_REPORTED, 'created_date': str(strftime("%Y-%m-%d %H:%M:%S", localtime()))})

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def update(self, id, additional_params=None):
        if 'component_id' in cherrypy.request.json and not ProjectComponents().find(
                cherrypy.request.json['component_id']):
            return self.withError("A component with the given `component_id´ does not exist.")

        if 'qs_employee_id' in cherrypy.request.json and not Employee().find(cherrypy.request.json['qs_employee_id']):
            return self.withError("A employee with the given `qs_employee_id´ does not exist.")

        if 'cause_id' in cherrypy.request.json and not Cause().find(cherrypy.request.json['cause_id']):
            return self.withError("A cause with the given `cause_id´ does not exist.")

        if 'sw_employee_id' in cherrypy.request.json and not Employee().find(cherrypy.request.json['sw_employee_id']):
            return self.withError("A cause with the given `cause_id´ does not exist.")

        if 'type' in cherrypy.request.json and \
                (cherrypy.request.json['type'] > Bug.TYPE_SOULTION_VERIFIED or cherrypy.request.json[
                    'type'] < Bug.TYPE_RESOLVED):
            return self.withError("An existing bug can only update their type to 1 or 2.")

        if 'type' in cherrypy.request.json and cherrypy.request.json['type'] == Bug.TYPE_RESOLVED:
            if 'solved_categories' in cherrypy.request.json:
                if not isinstance(cherrypy.request.json['solved_categories'], list):
                    return self.withError('`solved_categories´ must be an instance of list.')

                number_of_valid_categories = len(cherrypy.request.json['solved_categories'])

                for category in cherrypy.request.json['solved_categories']:
                    if Category().find(category):
                        number_of_valid_categories -= 1
                    else:
                        return self.withError("A category with the given `solved_categories´ list (ID: " + str(
                            category) + ") does not exist.")

                if number_of_valid_categories == 0:
                    all_bug_categories = BugCategories().all({'bug_id': int(id)})

                    for existing_bug_categories in all_bug_categories:
                        BugCategories().delete(existing_bug_categories['id'])

                    for category in cherrypy.request.json['solved_categories']:
                        BugCategories().create({'bug_id': int(id), 'category_id': int(category)})

            currentBug = Bug().find(int(id))[0]
            if currentBug['solved_date'] is None:
                additional_params = {'solved_date': str(strftime("%Y-%m-%d %H:%M:%S", localtime()))}

        return super(BugController, self).update(id, additional_params)
