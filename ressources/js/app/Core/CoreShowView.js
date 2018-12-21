/*
requires:

app/Core/CoreView.js
app/Core/CoreUtil.js
 */

window.Core = window.Core || {};

Core.ShowView = class ShowView extends Core.CoreView {
    constructor(template_spl, eventController_to_publish, path_to_ressource) {
        super(template_spl);
        this.ressource_path = path_to_ressource;
        this.eventController = eventController_to_publish;
    }

    show(id) {
        let requester_o = new APPUTIL.Requester_cl();
        requester_o.request_px(this.ressource_path + '/' + id,
            function (responseText_spl) {
                let data_o = JSON.parse(responseText_spl);
                this.render(data_o);
            }.bind(this),
            function (responseText_spl) {
                alert("Detail - render failed");
            }
        );
    }


    update(data) {
        let requester_o = new APPUTIL.Requester_cl();
        requester_o.put_px(this.ressource_path + '/' + data['id'],
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

        if (event.target.id === 'submit') {
            let data = Core.CoreUtil.getFormData(event.target.parentNode);

            APPUTIL.es_o.publish_px(that.eventController, ["update", data]);
            event.preventDefault();
        }
    }
};