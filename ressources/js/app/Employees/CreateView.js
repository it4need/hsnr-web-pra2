window.Employee = window.Employee || {};

Employee.CreateView = class CreateView extends Core.CreateView {
    constructor(template_spl) {
        const validation = {
            'first_name': 'required',
            'last_name': 'required',
            'type': 'required|min:1|max:2'
        };

        super(template_spl, 'employee', 'qsmitarbeiter', validation);
    }
};