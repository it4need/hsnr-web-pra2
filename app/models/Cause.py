# coding: utf-8

from app.core.BaseModel import BaseModel


class Cause(BaseModel):
    def __init__(self):
        file_name = 'causes'
        data_attributes = ['name']
        BaseModel.__init__(self, file_name, data_attributes)