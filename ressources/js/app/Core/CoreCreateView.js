/*
requires:

app/Core/CoreView.js
app/Core/CoreUtil.js
app/Core/CoreValidator.js
 */

window.Core = window.Core || {};

Core.CreateView = class CreateView extends Core.CoreView {
    constructor(template_spl, eventController_to_publish, path_to_ressource, validation_obj) {
        super(template_spl);
        this.ressource_path = path_to_ressource;
        this.eventController = eventController_to_publish;
        this.validation_obj = validation_obj;
    }

    create() {
        this.render();
    }

    store(data) {
        this.checkValidationRulesAndDisplayErrors(data);

        Core.CoreRequest.post(this.ressource_path, data)
            .then(data => APPUTIL.es_o.publish_px(this.eventController, ["index", null]))
            .catch(err => alert(err));
    }

    eventHandler(event, that) {
        if (event.target.id === "idBack" && event.target.dataset.controller === this.eventController) {
            this.eventGoToIndex(event, that);
        }

        if (event.target.id === 'createSubmit' && event.target.dataset.controller === this.eventController) {
            this.eventStoreEntry(event, that);
        }
    }

    eventGoToIndex(event, that) {
        APPUTIL.es_o.publish_px(that.eventController, ["index", null]);
        event.preventDefault();
    }

    eventStoreEntry(event, that) {
        let data = Core.CoreUtil.getFormData(event.target.parentNode.parentNode);

        APPUTIL.es_o.publish_px(that.eventController, ["store", data]);
        event.preventDefault();
    }
};