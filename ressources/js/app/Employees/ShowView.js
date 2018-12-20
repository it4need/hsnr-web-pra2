window.Employee = window.Employee || {};

Employee.ShowView = class {

    constructor(el_spl, template_spl) {
        this.el_s = el_spl;
        this.template_s = template_spl;
    }

    show(id_spl) {
        // Daten anfordern
        let path_s = "/qsmitarbeiter/" + id_spl;
        let requester_o = new APPUTIL.Requester_cl();
        requester_o.request_px(path_s,
            function (responseText_spl) {
                let data_o = JSON.parse(responseText_spl);
                this.doRender_p(data_o);
            }.bind(this),
            function (responseText_spl) {
                alert("Detail - render failed");
            }
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

    update(param) {
        let path_s = "/qsmitarbeiter/" + param['id'];
        let requester_o = new APPUTIL.Requester_cl();
        requester_o.put_px(path_s,
            function (responseText_spl) {
                let data_o = JSON.parse(responseText_spl);
                APPUTIL.es_o.publish_px("employee", ["index", null]);
            }.bind(this),
            function (responseText_spl) {
                alert("Detail - render failed");
            }, param
        );
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
                'id': document.querySelector('#id').value,
                'type': Number(document.querySelector('[name=type]:checked').value),
            };
            APPUTIL.es_o.publish_px("employee", ["update", data]);
            event_opl.preventDefault();
        }
    }
}
