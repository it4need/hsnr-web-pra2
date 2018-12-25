/*
requires:

app/Core/CoreIndexView.js

 */
window.Components = window.Components || {};

Components.IndexView = class IndexView extends Core.IndexView {
    constructor(template_spl) {
        super(template_spl, 'components', 'komponente');
    }

    async index() {
        let components = await Core.CoreRequest.get(this.ressource_path)
            .then(data => data)
            .catch(err => alert(err));

        let projects = await Core.CoreRequest.get('projekt')
            .then(data => data)
            .catch(err => alert(err));

        this.render({
            data: {
                components,
                projects
            }
        });
    }
};