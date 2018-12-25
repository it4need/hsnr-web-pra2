/*
requires:

app/Core/CoreCreateView.js

 */
window.Projects = window.Projects || {};

Projects.CreateView = class CreateView extends Core.CreateView {
    constructor(template_spl) {
        const validation = {
            'name': 'required',
        };

        super(template_spl, 'projects', 'projekt', validation);
    }
};