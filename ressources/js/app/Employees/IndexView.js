/*
requires:

app/Core/CoreIndexView.js

 */
window.Employees = window.Employees || {};

Employees.IndexView = class IndexView extends Core.IndexView {
    constructor(template_spl) {
        super(template_spl, 'employees', 'qsmitarbeiter');
    }
};