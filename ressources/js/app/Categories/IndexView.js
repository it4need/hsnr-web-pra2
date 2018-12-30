/*
requires:

app/Core/CoreIndexView.js

 */
window.Categories = window.Categories || {};

Categories.IndexView = class IndexView extends Core.IndexView {
    constructor(template_spl) {
        super(template_spl, 'categories', 'katursache');
    }

    async index(type) {
        let result = {data: {}, type};

        if (type === 'all' || type === 'causes') {
            let causes = await Core.CoreRequest.get(this.ressource_path)
                .then(data => data)
                .catch(err => alert(err));

            Object.keys(causes.data).forEach(function (key) {
                const resultKey = Number(causes.data[key].id);
                result.data['CAUSE' + resultKey] = causes.data[key];
            });
        }

        if (type === 'all' || type === 'categories') {
            let categories = await Core.CoreRequest.get('katfehler')
                .then(data => data)
                .catch(err => alert(err));

            Object.keys(categories.data).forEach(function (key) {
                const resultKey = Number(categories.data[key].id);
                result.data['CATEGORY' + resultKey] = categories.data[key];
            });
        }


        this.render(result);
    }

    delete(data) {
        if (data.type === 'cause') {
            Core.CoreRequest.delete('katursache' + '/' + data.id)
                .then(data => APPUTIL.es_o.publish_px(this.eventController, ["index", null]))
                .catch(err => alert(err));
        }

        if (data.type === 'category') {
            Core.CoreRequest.delete('katfehler' + '/' + data.id)
                .then(data => APPUTIL.es_o.publish_px(this.eventController, ["index", null]))
                .catch(err => alert(err));
        }
    }

    eventDeleteEntry(event, that) {
        let selectedElement = this.getSelectedElementAndEnsureItExists();
        const id = (selectedElement.id).replace('CAUSE', '').replace('CATEGORY', '');

        if (selectedElement.id.includes('CAUSE')) {
            APPUTIL.es_o.publish_px("categories", ["delete", {type: 'cause', id}]);
        }

        if (selectedElement.id.includes('CATEGORY')) {
            APPUTIL.es_o.publish_px("categories", ["delete", {type: 'category', id}]);
        }

        event.preventDefault();
    }

    eventShowEntry(event, that) {
        let selectedElement = this.getSelectedElementAndEnsureItExists();
        const id = (selectedElement.id).replace('CAUSE', '').replace('CATEGORY', '');

        if (selectedElement.id.includes('CAUSE')) {
            APPUTIL.es_o.publish_px("categories", ["show", {type: 'cause', id}]);
        }

        if (selectedElement.id.includes('CATEGORY')) {
            APPUTIL.es_o.publish_px("categories", ["show", {type: 'category', id}]);
        }

        event.preventDefault();
    }

    registerAdditionalEventHandlers() {
        let displayedElement = document.querySelector(this.displayedElement);
        if (displayedElement != null) {
            if (this.eventHandler !== undefined) {
                displayedElement.addEventListener("change", (event) => this.eventHandlerChange(event, this));
            }
        }
    }

    eventHandlerChange(event, that) {
        if (event.target.id === "filter" && event.target.dataset.controller === this.eventController) {
            APPUTIL.es_o.publish_px("categories", ["index", event.target.value]);
        }
    }
};