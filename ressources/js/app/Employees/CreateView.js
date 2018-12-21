window.Employee = window.Employee || {};

Employee.CreateView = class CreateView extends Core.CreateView {
    constructor(template_spl) {
        super(template_spl, 'employee', 'qsmitarbeiter');
    }
};