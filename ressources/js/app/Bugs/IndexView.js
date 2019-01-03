/*
requires:

app/Core/CoreIndexView.js

 */
window.Bugs = window.Bugs || {};

Bugs.IndexView = class IndexView extends Core.IndexView {
    constructor(template_spl) {
        super(template_spl, 'bugs', 'fehler');
    }

    async index(type) {
        let bugs = await Core.CoreRequest.get(this.ressource_path)
            .then(data => data)
            .catch(err => alert(err));

        let categories = await Core.CoreRequest.get('katfehler')
            .then(data => data)
            .catch(err => alert(err));

        let components = await Core.CoreRequest.get('komponente')
            .then(data => data)
            .catch(err => alert(err));

        let qs_employees = await Core.CoreRequest.get('qsmitarbeiter')
            .then(data => data)
            .catch(err => alert(err));

        qs_employees['data'] = qs_employees['data'].filter(employee => employee['type'] === 1);

        if (type == 0) {
            bugs['data'] = bugs['data'].filter(bug => bug['type'] === 0);
        }

        if (type == 1) {
            bugs['data'] = bugs['data'].filter(bug => bug['type'] === 1);
        }

        if (type == 2) {
            bugs['data'] = bugs['data'].filter(bug => bug['type'] === 2);
        }

        this.render({
            data: {
                bugs,
                categories,
                components,
                qs_employees,
                type
            }
        });
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
            APPUTIL.es_o.publish_px("bugs", ["index", event.target.value]);
        }
    }
};