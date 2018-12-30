/*
requires:

app/Core/CoreIndexView.js

 */
window.Reports = window.Reports || {};

Reports.ProjectsReport = class ProjectsReport extends Core.CoreView {
    constructor(template_spl) {
        super(template_spl);
    }

    index() {
        Core.CoreRequest.get('prolist')
            .then(data => this.render(data))
            .catch(err => alert(err));
    }
};