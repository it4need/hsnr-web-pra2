/*
requires:

app/Core/CoreIndexView.js

 */
window.Projects = window.Projects || {};

Projects.IndexView = class IndexView extends Core.IndexView {
    constructor(template_spl) {
        super(template_spl, 'projects', 'projekt');
    }
};