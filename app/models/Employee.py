# coding: utf-8

from app.core.model import BaseModel


class Employee(BaseModel):
    TYPE_QS = 1
    TYPE_SW = 2

    def __init__(self):
        file_name = 'employee'
        data_attributes = ['last_name', 'first_name', 'type']
        BaseModel.__init__(self, file_name, data_attributes)

    def allQS(self):
        return self.all({'type': self.TYPE_QS})

    def allSW(self):
        return self.all({'type': self.TYPE_SW})

    def _transformData(self, employees):
        formattedEmployees = list(employees)

        for employee in formattedEmployees:
            employee['name'] = ''

            if employee['last_name'] is not None:
                employee['name'] = employee['last_name']

            if employee['first_name'] is not None:
                employee['name'] += ', ' + employee['first_name']

            employee['name'] = employee['name'].lstrip(', ')

        return formattedEmployees