/*
requires:

app/Core/CoreIndexView.js

 */
window.Bugs = window.Bugs || {};

Bugs.IndexView = class IndexView extends Core.IndexView {
    constructor(template_spl) {
        super(template_spl, 'bugs', 'fehler');
    }

    async index() {
        let bugs = await Core.CoreRequest.get(this.ressource_path)
            .then(data => data)
            .catch(err => alert(err));

        let causes = await Core.CoreRequest.get('katursache')
            .then(data => data)
            .catch(err => alert(err));

        let components = await Core.CoreRequest.get('komponente')
            .then(data => data)
            .catch(err => alert(err));

        let qs_employees = await Core.CoreRequest.get('qsmitarbeiter')
            .then(data => data)
            .catch(err => alert(err)); /** @todo: What's which SW-dev */

        qs_employees['data'] = qs_employees['data'].filter(employee => employee['type'] === 1);

        this.render({
            data: {
                bugs,
                causes,
                components,
                qs_employees
            }
        });
    }
};