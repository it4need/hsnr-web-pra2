# coding: utf-8

from app.core.model import BaseModel


class BugCause(BaseModel):
    def __init__(self):
        file_name = 'bug_cause'
        data_attributes = ['name']
        BaseModel.__init__(self, file_name, data_attributes)