# coding: utf-8

from app.core.RESTController import RESTController
from app.core.Exceptions.ValidationException import ValidationException
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
    def update(self, id):
        additional_params = None

        try:
            self._checkRequestForExistingModelEntry(
                [ProjectComponents(), 'component_id'],
                [Employee(), 'qs_employee_id'],
                [Employee(), 'sw_employee_id'],
                [Cause(), 'cause_id']
            )

            if self.__isValidBugTypeForUpdate():
                raise ValidationException("An existing bug can only update their type to 1 or 2.")

            if Bug().find(int(id))[0]['type'] is Bug.TYPE_RESOLVED or ('type' in cherrypy.request.json and \
                    cherrypy.request.json['type'] == Bug.TYPE_RESOLVED):
                self.__updateSolvedCategories(id)

                if Bug().find(int(id))[0]['solved_date'] is None:
                    additional_params = {'solved_date': str(strftime("%Y-%m-%d %H:%M:%S", localtime()))}

            return super(BugController, self).update(id, additional_params, ['created_date'])

        except ValidationException as e:
            return self.withError(str(e))

    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def store(self):
        non_allowable_attr = ['sw_employee_id', 'type', 'solution_description', 'solved_date', 'solved_categories',
                              'created_date']

        try:
            self._checkRequestForExistingModelEntry(
                [ProjectComponents(), 'component_id'],
                [Employee(), 'qs_employee_id'],
                [Cause(), 'cause_id']
            )

            return super(BugController, self).store(
                {'type': Bug.TYPE_REPORTED, 'created_date': str(strftime("%Y-%m-%d %H:%M:%S", localtime()))},
                non_allowable_attr
            )
        except ValidationException as e:
            return self.withError(str(e))

    def __updateSolvedCategories(self, id):
        if 'solved_categories' in cherrypy.request.json:
            if not isinstance(cherrypy.request.json['solved_categories'], list):
                raise ValidationException('`solved_categories´ must be an instance of list.')

            number_of_valid_categories = len(cherrypy.request.json['solved_categories'])

            for category in cherrypy.request.json['solved_categories']:
                if Category().find(category):
                    number_of_valid_categories -= 1
                else:
                    raise ValidationException("A category with the given `solved_categories´ list (ID: " + str(
                        category) + ") does not exist.")

            if number_of_valid_categories == 0:
                all_bug_categories = BugCategories().all({'bug_id': int(id)})

                for existing_bug_categories in all_bug_categories:
                    BugCategories().delete(existing_bug_categories['id'])

                for category in cherrypy.request.json['solved_categories']:
                    BugCategories().create({'bug_id': int(id), 'category_id': int(category)})

        return True

    def __isValidBugTypeForUpdate(self):
        return 'type' in cherrypy.request.json and \
               (cherrypy.request.json['type'] > Bug.TYPE_SOULTION_VERIFIED or cherrypy.request.json[
                   'type'] < Bug.TYPE_RESOLVED)