/*
requires:

app/Core/CoreShowView.js

 */
window.Projects = window.Projects || {};

Projects.ShowView = class ShowView extends Core.ShowView {
    constructor(template_spl) {
        const validation = {
            'name': 'required',
        };

        super(template_spl, 'projects', 'projekt', validation);
    }
};