/*
requires:

app/Core/CoreShowView.js

 */
window.Components = window.Components || {};

Components.ShowView = class ShowView extends Core.ShowView {
    constructor(template_spl) {
        const validation = {
            'name': 'required',
            'project_id': 'required|min:1'
        };

        super(template_spl, 'components', 'komponente', validation);
    }

    async show(id) {
        let component = await Core.CoreRequest.get(this.ressource_path + '/' + id)
            .then(data => data)
            .catch(err => alert(err));

        let projects = await Core.CoreRequest.get('projekt')
            .then(data => data)
            .catch(err => alert(err));

        this.render({
            data: {
                component,
                projects
            }
        });
    }
};