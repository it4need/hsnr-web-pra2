window.Employee = window.Employee || {};

Employee.CreateView = class {
    constructor(el_spl, template_spl) {
        this.el_s = el_spl;
        this.template_s = template_spl;
    }

    create() {
        this.doRender_p();
    }

    store(param) {
        let path_s = "/qsmitarbeiter";
        let requester_o = new APPUTIL.Requester_cl();
        requester_o.post_px(path_s,
            function (responseText_spl) {
                let data_o = JSON.parse(responseText_spl);
                APPUTIL.es_o.publish_px("employee", ["index", null]);
            }.bind(this),
            function (responseText_spl) {
                alert("Detail - render failed");
            }, param
        );
    }

    doRender_p(data_opl) {
        let markup_s = APPUTIL.tm_o.execute_px(this.template_s, data_opl);
        let el_o = document.querySelector(this.el_s);
        if (el_o != null) {
            el_o.innerHTML = markup_s;
            this.configHandleEvent_p();
        }
    }

    configHandleEvent_p() {
        let el_o = document.querySelector("form");
        if (el_o != null) {
            el_o.addEventListener("click", this.handleEvent_p);
        }
    }

    handleEvent_p(event_opl) {
        if (event_opl.target.id == "idBack") {
            APPUTIL.es_o.publish_px("employee", ["index", null]);
            event_opl.preventDefault();
        }

        if (event_opl.target.id == 'submit') {
            var data = {
                'first_name': document.querySelector('#first_name').value,
                'last_name': document.querySelector('#last_name').value,
                'type': Number(document.querySelector('[name=type]:checked').value),
            };
            APPUTIL.es_o.publish_px("employee", ["store", data]);
            event_opl.preventDefault();
        }
    }
}
