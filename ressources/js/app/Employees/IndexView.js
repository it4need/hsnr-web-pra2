/*
requires:

app/Core/CoreIndexView.js

 */
window.Employees = window.Employees || {};

Employees.IndexView = class IndexView extends Core.IndexView {
    constructor(template_spl) {
        super(template_spl, 'employees', 'qsmitarbeiter');
    }

    async index(type) {
        let data = await Core.CoreRequest.get(this.ressource_path)
            .then(data => data)
            .catch(err => alert(err));

        data.type = type;

        if(type == 1) {
            data['data'] = data['data'].filter(employee => employee['type'] === 1);
        }

        if(type == 2) {
            data['data'] = data['data'].filter(employee => employee['type'] === 2);
        }

        return this.render(data);
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
            APPUTIL.es_o.publish_px("employees", ["index", event.target.value]);
        }
    }
};