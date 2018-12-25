/*
requires:

app/Core/CoreCreateView.js

 */
window.Components = window.Components || {};

Components.CreateView = class CreateView extends Core.CreateView {
    constructor(template_spl) {
        const validation = {
            'name': 'required',
            'project_id': 'required|min:1'
        };

        super(template_spl, 'components', 'komponente', validation);
    }

    async create() {
        let projects = await Core.CoreRequest.get('projekt')
            .then(data => data)
            .catch(err => alert(err));

        this.render(projects);
    }
};