/*
requires:

app/Core/CoreCreateView.js

 */
window.Bugs = window.Bugs || {};

Bugs.CreateView = class CreateView extends Core.CreateView {
    constructor(template_spl) {
        const validation = {
            'name': 'required',
            'project_id': 'required|min:1'
        };

        super(template_spl, 'bugs', 'fehler', validation);
    }

    /* async create() {
        let projects = await Core.CoreRequest.get('projekt')
            .then(data => data)
            .catch(err => alert(err));

        this.render(projects);
    }*/
};