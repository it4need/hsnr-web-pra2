window.Employee = window.Employee || {};

Employee.ShowView = class ShowView extends Core.ShowView {
    constructor(template_spl) {
        const validation = {
            'first_name': 'required',
            'last_name': 'required',
            'type': 'required|min:1|max:2'
        };

        super(template_spl, 'employee', 'qsmitarbeiter', validation);
    }
};