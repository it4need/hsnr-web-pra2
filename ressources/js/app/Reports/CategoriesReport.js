/*
requires:

app/Core/CoreIndexView.js

 */
window.Reports = window.Reports || {};

Reports.CategoriesReport = class CategoriesReport extends Core.CoreView {
    constructor(template_spl) {
        super(template_spl);
    }

    index() {
        Core.CoreRequest.get('katlist')
            .then(data => this.render(data))
            .catch(err => alert(err));
    }
};