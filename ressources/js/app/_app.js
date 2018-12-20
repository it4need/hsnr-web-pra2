class Application_cl {

    constructor() {
        this.registerEventSubscribers();

        this.partials = {};
        this.employees = {};

        this.partials.sidebarView = new Partials.SidebarView("aside", "sidebar.tpl.html");

        this.employees.indexView = new Employee.IndexView("employees.index.html");
        this.employees.showView = new Employee.ShowView("main", "employees.show.html");
        this.employees.createView = new Employee.CreateView("main", "employees.create.html");
    }

    notify_px(self, message_spl, data_opl) {
        switch (message_spl) {
            case "templates.failed":
                alert("Vorlagen konnten nicht geladen werden.");
                break;
            case "templates.loaded":
                // Templates stehen zur Verfügung, Bereiche mit Inhalten füllen
                // hier zur Vereinfachung direkt
                let markup_s;
                let el_o;
                markup_s = APPUTIL.tm_o.execute_px("header.tpl.html", null);
                el_o = document.querySelector("header");
                if (el_o != null) {
                    el_o.innerHTML = markup_s;
                }
                let nav_a = [
                    ["home", "Startseite"],
                    ["employee.index", "Mitarbeiterverwaltung"]
                ];
                self.partials.sidebarView.render_px(nav_a);
                markup_s = APPUTIL.tm_o.execute_px("home.tpl.html", null);
                el_o = document.querySelector("main");
                if (el_o != null) {
                    el_o.innerHTML = markup_s;
                }
                break;

            case "app.cmd":
                // hier müsste man überprüfen, ob der Inhalt gewechselt werden darf
                switch (data_opl[0]) {
                    case "home":
                        let markup_s = APPUTIL.tm_o.execute_px("home.tpl.html", null);
                        let el_o = document.querySelector("main");
                        if (el_o != null) {
                            el_o.innerHTML = markup_s;
                        }
                        break;
                }
                break;
            case "employee":
                switch (data_opl[0]) {
                    case "index":
                        this.employees.indexView.index();
                        break;
                    case "create":
                        this.employees.createView.create();
                        break;
                    case "store":
                        this.employees.createView.store(data_opl[1]);
                        break;
                    case "show":
                        this.employees.showView.show(data_opl[1]);
                        break;
                    case "update":
                        this.employees.showView.update(data_opl[1]);
                        break;
                    case "delete":
                        this.employees.indexView.delete(data_opl[1]);
                        break;
                }
                break;
        }
    }

    registerEventSubscribers() {
        APPUTIL.es_o.subscribe_px(this, "templates.loaded");
        APPUTIL.es_o.subscribe_px(this, "templates.failed");
        APPUTIL.es_o.subscribe_px(this, "app.cmd");
        APPUTIL.es_o.subscribe_px(this, "employee");
    }
}