# coding: utf-8
from app.core.BaseModel import BaseModel

class Project(BaseModel):
    def __init__(self):
        file_name = 'projects'
        data_attributes = ['name']
        BaseModel.__init__(self, file_name, data_attributes)

    def _transformData(self, projects):
        from app.models.ProjectComponents import ProjectComponents

        formattedProjects = list(projects)

        for project in formattedProjects:
            project['components'] = ProjectComponents().withoutTransform().all({'project_id': project['id']})

        return formattedProjects
