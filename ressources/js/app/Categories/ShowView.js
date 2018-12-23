/*
requires:

app/Core/CoreShowView.js

 */
window.Categories = window.Categories || {};

Categories.ShowView = class ShowView extends Core.ShowView {
    constructor(template_spl) {
        const validation = {
            'name': 'required',
            'type': 'in:category,cause'
        };

        super(template_spl, 'categories', 'katursache', validation);
    }

    async show(data) {
        let renderResult = {};

        if (data.type === 'cause') {
            renderResult = await Core.CoreRequest.get('katursache' + '/' + data.id)
                .then(data => data)
                .catch(err => alert(err));
        }

        if (data.type === 'category') {
            renderResult = await Core.CoreRequest.get('katfehler' + '/' + data.id)
                .then(data => data)
                .catch(err => alert(err));
        }

        renderResult.data.type = data.type;
        this.render(renderResult);
    }

    update(data) {
        this.checkValidationRulesAndDisplayErrors(data);

        if (data.type === 'cause') {
            Core.CoreRequest.put('katursache' + '/' + data['id'], data)
                .then(data => APPUTIL.es_o.publish_px(this.eventController, ["index", null]))
                .catch(err => alert(err));
        }

        if (data.type === 'category') {
            Core.CoreRequest.put('katfehler' + '/' + data['id'], data)
                .then(data => APPUTIL.es_o.publish_px(this.eventController, ["index", null]))
                .catch(err => alert(err));
        }
    }

    eventUpdateEntry(event, that) {
        let data = Core.CoreUtil.getFormData(event.target.parentNode);

        APPUTIL.es_o.publish_px(that.eventController, ["update", data]);
        event.preventDefault();
    }
};