# coding: utf-8

from app.core.BaseModel import BaseModel


class BugCategories(BaseModel):
    def __init__(self):
        file_name = 'bug_categories'
        data_attributes = ['bug_id', 'category_id']
        BaseModel.__init__(self, file_name, data_attributes)