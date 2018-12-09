# coding: utf-8

from app.core.BaseModel import BaseModel


class Category(BaseModel):
    def __init__(self):
        file_name = 'categories'
        data_attributes = ['name']
        BaseModel.__init__(self, file_name, data_attributes)