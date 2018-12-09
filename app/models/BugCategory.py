# coding: utf-8

from app.core.model import BaseModel


class BugCategory(BaseModel):
    def __init__(self):
        file_name = 'bug_category'
        data_attributes = ['name']
        BaseModel.__init__(self, file_name, data_attributes)