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
};