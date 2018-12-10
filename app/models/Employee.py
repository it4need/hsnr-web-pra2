# coding: utf-8

from app.core.BaseModel import BaseModel


class Employee(BaseModel):
    TYPE_QS = 1
    TYPE_SW = 2

    def __init__(self):
        file_name = 'employees'
        data_attributes = ['last_name', 'first_name', 'type']
        BaseModel.__init__(self, file_name, data_attributes)

    def allQS(self):
        return self.all({'type': self.TYPE_QS})

    def allSW(self):
        return self.all({'type': self.TYPE_SW})

    def findQS(self, id):
        qs_employee = self.find(id)

        if qs_employee and qs_employee[0]['type'] == self.TYPE_QS:
            return qs_employee[0]

        return False

    def findSW(self, id):
        sw_employee = self.find(id)

        if sw_employee and sw_employee[0]['type'] == self.TYPE_SW:
            return sw_employee[0]

        return False

    def _transformData(self, employees):
        formattedEmployees = list(employees)

        for employee in formattedEmployees:
            employee = self.__generateFormattedName(employee)

        return formattedEmployees

    def __generateFormattedName(self, employee):
        employee['name'] = ''

        if employee['last_name'] is not None:
            employee['name'] = employee['last_name']

        if employee['first_name'] is not None:
            employee['name'] += ', ' + employee['first_name']

        employee['name'] = employee['name'].lstrip(', ')

        return employee