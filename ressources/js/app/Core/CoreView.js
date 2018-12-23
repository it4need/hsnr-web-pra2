window.Core = window.Core || {};

Core.CoreView = class {
    constructor(templateToRender, displayedElement = 'main') {
        this.displayedElement = displayedElement;
        this.template = templateToRender;
        this.registerEventHandlers();
    }

    render(data_opl) {
        let markup_s = APPUTIL.tm_o.execute_px(this.template, data_opl);
        let displayedElement = document.querySelector(this.displayedElement);
        if (displayedElement != null) {
            displayedElement.innerHTML = markup_s;
        }
    }

    registerEventHandlers(eventHandler) {
        let displayedElement = document.querySelector(this.displayedElement);
        if (displayedElement != null) {
            displayedElement.addEventListener("click", (event) => this.eventHandler(event, this));
        }
    }

    displayErrors(error_messages) {
        let error_message = 'Validation errors:\n';

        Object.keys(error_messages).forEach(function (dataKey) {

            document.getElementsByName(dataKey).forEach(function(error_element) {
                error_element.classList.add('error');

                error_element.addEventListener('keyup', function() {
                    error_element.classList.remove('error');
                });
            });

            error_message += `${dataKey}: ${error_messages[dataKey]}\n`;
        });

        alert(error_message);
    }

    checkValidationRulesAndDisplayErrors(data) {
        const validator = new Core.CoreValidator();

        if (validator.fails(data, this.validation_obj)) {
            let error_messages = validator.errors();
            this.displayErrors(error_messages);

            throw new Core.ValidationError(error_messages);
        }
    }

    getSelectedEntry() {
        let selectedEntry = document.querySelector(".clSelected");

        if (selectedEntry == null) {
            return false;
        }

        return selectedEntry;
    }

    getSelectedElementAndEnsureItExists() {
        let selectedElement = this.getSelectedEntry();

        if (selectedElement === false) {
            alert("Bitte zuerst einen Eintrag auswählen!");
            return;
        }

        return selectedElement;
    }

    eventSelectTableData(event, that) {
        let selectedElement = this.getSelectedEntry();

        if (selectedElement !== false) {
            selectedElement.classList.remove("clSelected");
        }

        event.target.parentNode.classList.add("clSelected");
        event.preventDefault();
    }

    eventGoToIndex(event, that) {
        APPUTIL.es_o.publish_px(that.eventController, ["index", null]);
        event.preventDefault();
    }
};