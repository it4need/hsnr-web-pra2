/*
requires:

app/Core/CoreCreateView.js

 */
window.Categories = window.Categories || {};

Categories.CreateView = class CreateView extends Core.CreateView {
    constructor(template_spl) {
        const validation = {
            'name': 'required',
            'type': 'in:category,cause'
        };

        super(template_spl, 'categories', 'katursache', validation);
    }

    store(data) {
        this.checkValidationRulesAndDisplayErrors(data);

        if (data.type === 'cause') {
            Core.CoreRequest.post('katursache', data)
                .then(data => APPUTIL.es_o.publish_px(this.eventController, ["index", null]))
                .catch(err => alert(err));
        }

        if (data.type === 'category') {
            Core.CoreRequest.post('katfehler', data)
                .then(data => APPUTIL.es_o.publish_px(this.eventController, ["index", null]))
                .catch(err => alert(err));
        }
    }
};