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
        const validator = new Core.CoreValidator();

        if (validator.fails(data, this.validation_obj)) {
            let error_messages = validator.errors();
            this.displayErrors(error_messages);
            return;
        }

        let requester_o = new APPUTIL.Requester_cl();
        requester_o.post_px(this.ressource_path,
            function (responseText_spl) {
                let data_o = JSON.parse(responseText_spl);
                APPUTIL.es_o.publish_px(this.eventController, ["index", null]);
            }.bind(this),
            function (responseText_spl) {
                alert("Detail - render failed");
            }, data
        );
    }

    eventHandler(event, that) {
        if (event.target.id === "idBack") {
            APPUTIL.es_o.publish_px(that.eventController, ["index", null]);
            event.preventDefault();
        }

        if (event.target.id === 'createSubmit') {
            let data = Core.CoreUtil.getFormData(event.target.parentNode);

            APPUTIL.es_o.publish_px(that.eventController, ["store", data]);
            event.preventDefault();
        }
    }
};