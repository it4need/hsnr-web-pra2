window.Employee = window.Employee || {};

Employee.ShowView = class ShowView extends Core.ShowView {
    constructor(template_spl) {
        super(template_spl, 'employee', 'qsmitarbeiter');
    }
};