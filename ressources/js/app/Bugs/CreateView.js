/*
requires:

app/Core/CoreCreateView.js

 */
window.Bugs = window.Bugs || {};

Bugs.CreateView = class CreateView extends Core.CreateView {
    constructor(template_spl) {
        const validation = {
            'name': 'required',
            'description': 'required',
            'qs_employee_id': 'required|min:1',
            'component_id': 'required|min:1',
            'categories': 'required|min:1'
        };

        super(template_spl, 'bugs', 'fehler', validation);
    }

    async create() {
         let bugs = await Core.CoreRequest.get(this.ressource_path)
            .then(data => data)
            .catch(err => alert(err));

        let categories = await Core.CoreRequest.get('katfehler')
            .then(data => data)
            .catch(err => alert(err));

        let components = await Core.CoreRequest.get('komponente')
            .then(data => data)
            .catch(err => alert(err));

        let qs_employees = await Core.CoreRequest.get('qsmitarbeiter')
            .then(data => data)
            .catch(err => alert(err));

        this.render({
            data: {
                bugs,
                categories,
                components,
                qs_employees
            }
        });
    }
};