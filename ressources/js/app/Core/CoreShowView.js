/*
requires:

app/Core/CoreView.js
app/Core/CoreUtil.js
app/Core/CoreValidator.js
 */

window.Core = window.Core || {};

Core.ShowView = class ShowView extends Core.CoreView {
    constructor(template_spl, eventController_to_publish, path_to_ressource, validation_obj) {
        super(template_spl);
        this.ressource_path = path_to_ressource;
        this.eventController = eventController_to_publish;
        this.validation_obj = validation_obj;
    }

    show(id) {
        Core.CoreRequest.get(this.ressource_path + '/' + id)
            .then(data => this.render(data))
            .catch(err => alert(err));
    }


    update(data) {
        const validator = new Core.CoreValidator();

        if (validator.fails(data, this.validation_obj)) {
            let error_messages = validator.errors();
            this.displayErrors(error_messages);
            return;
        }

        Core.CoreRequest.put(this.ressource_path + '/' + data['id'], data)
            .then(data => APPUTIL.es_o.publish_px(this.eventController, ["index", null]))
            .catch(err => alert(err));
    }

    eventHandler(event, that) {
        if (event.target.id === "idBack") {
            APPUTIL.es_o.publish_px(that.eventController, ["index", null]);
            event.preventDefault();
        }

        if (event.target.id === 'updateSubmit') {
            let data = Core.CoreUtil.getFormData(event.target.parentNode);

            APPUTIL.es_o.publish_px(that.eventController, ["update", data]);
            event.preventDefault();
        }
    }
};