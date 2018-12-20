/*
requires:

app/Core/CoreView.js
 */

window.Core = window.Core || {};

Core.IndexView = class IndexView extends Core.CoreView {
    constructor(template_spl, eventController_to_publish, path_to_ressource) {
        super(template_spl);
        this.ressource_path = path_to_ressource;
        this.eventController = eventController_to_publish;
    }

    index() {
        let requester_o = new APPUTIL.Requester_cl();

        requester_o.request_px(this.ressource_path,
            function (responseText_spl) {
                let data_o = JSON.parse(responseText_spl);
                this.render(data_o);
            }.bind(this),
            function (responseText_spl) {
                alert("List - render failed");
            }
        );
    }

    delete(id) {
        let requester_o = new APPUTIL.Requester_cl();

        requester_o.delete_px(this.ressource_path + "/" + id,
            function (responseText_spl) {
                APPUTIL.es_o.publish_px(this.eventController, ["index", null]);
            }.bind(this),
            function (responseText_spl) {
                alert("Detail - render failed");
            }, id
        );
    }

    eventHandler(event, that) {
        if (event.target.tagName.toLowerCase() === "td") {
            let selectedElement = this.getSelectedEntry();

            if (selectedElement !== false) {
                selectedElement.classList.remove("clSelected");
            }

            event.target.parentNode.classList.add("clSelected");
            event.preventDefault();
        }

        if (event.target.id === "showEntry") {
            let selectedElement = this.getSelectedEntry();

            if (selectedElement === false) {
                alert("Bitte zuerst einen Eintrag auswählen!");
                return;
            }

            APPUTIL.es_o.publish_px(that.eventController, ["show", selectedElement.id]);
            event.preventDefault();
        }

        if (event.target.id === 'deleteEntry') {
            let selectedElement = this.getSelectedEntry();

            if (selectedElement === false) {
                alert("Bitte zuerst einen Eintrag auswählen!");
                return;
            }

            APPUTIL.es_o.publish_px(that.eventController, ["delete", selectedElement.id]);
            event.preventDefault();
        }

        if (event.target.id === 'createEntry') {
            APPUTIL.es_o.publish_px(that.eventController, ["create", null]);
        }
    }

    getSelectedEntry() {
        let selectedEntry = document.querySelector(".clSelected");

        if (selectedEntry == null) {
            return false;
        }

        return selectedEntry;
    }
};