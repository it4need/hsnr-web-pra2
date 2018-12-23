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
        Core.CoreRequest.get(this.ressource_path)
            .then(data => this.render(data))
            .catch(err => alert(err));
    }

    delete(id) {
        Core.CoreRequest.delete(this.ressource_path + '/' + id)
            .then(data => APPUTIL.es_o.publish_px(this.eventController, ["index", null]))
            .catch(err => alert(err));
    }

    eventHandler(event, that) {
        if (event.target.tagName.toLowerCase() === "td") {
            this.eventSelectTableData(event, that);
        }

        if (event.target.id === "showEntry" && event.target.dataset.controller === this.eventController) {
            this.eventShowEntry(event, that);
        }

        if (event.target.id === 'deleteEntry' && event.target.dataset.controller === this.eventController) {
            this.eventDeleteEntry(event, that);
        }

        if (event.target.id === 'createEntry' && event.target.dataset.controller === this.eventController) {
            this.eventCreateEntry(event, that);
        }
    }

    eventShowEntry(event, that) {
        let selectedElement = this.getSelectedElementAndEnsureItExists();

        APPUTIL.es_o.publish_px(that.eventController, ["show", selectedElement.id]);
        event.preventDefault();
    }

    eventDeleteEntry(event, that) {
        let selectedElement = this.getSelectedElementAndEnsureItExists();

        APPUTIL.es_o.publish_px(that.eventController, ["delete", selectedElement.id]);
        event.preventDefault();
    }

    eventCreateEntry(event, that) {
        APPUTIL.es_o.publish_px(that.eventController, ["create", null]);
    }
};