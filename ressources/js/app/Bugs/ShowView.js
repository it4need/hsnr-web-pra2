/*
requires:

app/Core/CoreShowView.js

 */
window.Bugs = window.Bugs || {};

Bugs.ShowView = class ShowView extends Core.ShowView {
    constructor(template_spl) {
        const validation = {
            'name': 'required',
            'description': 'required',
            'type': 'required|min:0|max:2',
            'qs_employee_id': 'required|min:1',
            'component_id': 'required|min:1'
        };

        super(template_spl, 'bugs', 'fehler', validation);
    }

    async show(id) {
        let bug = await Core.CoreRequest.get(this.ressource_path + '/' + id)
            .then(data => data)
            .catch(err => alert(err));

        let qs_employees = await Core.CoreRequest.get('qsmitarbeiter')
            .then(data => data)
            .catch(err => alert(err));

        let sw_employees = await Core.CoreRequest.get('swentwickler')
            .then(data => data)
            .catch(err => alert(err));

        let causes = await Core.CoreRequest.get('katursache')
            .then(data => data)
            .catch(err => alert(err));

        let categories = await Core.CoreRequest.get('katfehler')
            .then(data => data)
            .catch(err => alert(err));

        let components = await Core.CoreRequest.get('komponente')
            .then(data => data)
            .catch(err => alert(err));

        this.render({
            data: {
                bug,
                qs_employees,
                sw_employees,
                causes,
                categories,
                components
            }
        });
    }
};