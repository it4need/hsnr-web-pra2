# coding: utf-8

from app.core.BaseModel import BaseModel


class ProjectComponents(BaseModel):
    def __init__(self):
        file_name = 'project_components'
        data_attributes = ['name', 'project_id']
        BaseModel.__init__(self, file_name, data_attributes)

    def _transformData(self, projects):
        from app.models.Project import Project

        formattedProjects = list(projects)

        for project in formattedProjects:
            project['project'] = Project().withoutTransform().findOrFail(project['project_id'])[0]

        return formattedProjects
