# coding: utf-8
from app.core.BaseModel import BaseModel


class Bug(BaseModel):
    TYPE_REPORTED = 0
    TYPE_RESOLVED = 1
    TYPE_SOULTION_VERIFIED = 2

    def __init__(self):
        file_name = 'bugs'
        data_attributes = ['name', 'description', 'created_date', 'qs_employee_id', 'component_id', 'cause_id',
                           'sw_employee_id', 'type', 'solution_description', 'solved_date']
        BaseModel.__init__(self, file_name, data_attributes)

    def _transformData(self, bugs):
        from app.models.Employee import Employee
        from app.models.ProjectComponents import ProjectComponents
        from app.models.Cause import Cause
        from app.models.BugCategories import BugCategories

        formattedBugs = list(bugs)

        for bug in formattedBugs:
            bug['component'] = ProjectComponents().all({'id': bug['component_id']})
            bug['qs_employee'] = Employee().withoutTransform().find(bug['qs_employee_id'])[0]
            bug['cause'] = Cause().withoutTransform().find(bug['cause_id'])[0]
            bug['solved_categories'] = BugCategories().withoutTransform().all({'bug_id': bug['id']})

            if bug['sw_employee_id'] is not None:
                sw_employee = Employee().withoutTransform().find(bug['sw_employee_id'])

                if sw_employee:
                    bug['sw_employee'] = sw_employee[0]

        return formattedBugs
