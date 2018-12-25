class Application_cl {

    constructor() {
        this.registerEventSubscribers();

        this.partials = {};
        this.employees = {};
        this.categories = {};
        this.projects = {};

        this.partials.sidebarView = new Partials.SidebarView("aside", "sidebar.tpl.html");

        this.employees.indexView = new Employees.IndexView("employees.index.html");
        this.employees.showView = new Employees.ShowView("employees.show.html");
        this.employees.createView = new Employees.CreateView("employees.create.html");

        this.categories.indexView = new Categories.IndexView("categories.index.html");
        this.categories.showView = new Categories.ShowView("categories.show.html");
        this.categories.createView = new Categories.CreateView("categories.create.html");

        this.projects.indexView = new Projects.IndexView("projects.index.html");
        this.projects.showView = new Projects.ShowView("projects.show.html");
        this.projects.createView = new Projects.CreateView("projects.create.html");
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
                    ["projects.index", "Projektverwaltung"],
                    ["employees.index", "Mitarbeiterverwaltung"],
                    ["categories.index", "Kategorieverwaltung"],
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
            case "employees":
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
            case "categories":
                switch (data_opl[0]) {
                    case "index":
                        this.categories.indexView.index();
                        break;
                    case "create":
                        this.categories.createView.create();
                        break;
                    case "store":
                        this.categories.createView.store(data_opl[1]);
                        break;
                    case "delete":
                        this.categories.indexView.delete(data_opl[1]);
                        break;
                    case "show":
                        this.categories.showView.show(data_opl[1]);
                        break;
                    case "update":
                        this.categories.showView.update(data_opl[1]);
                        break;
                }
                break;
            case "projects":
                switch (data_opl[0]) {
                    case "index":
                        this.projects.indexView.index();
                        break;
                    case "create":
                        this.projects.createView.create();
                        break;
                    case "store":
                        this.projects.createView.store(data_opl[1]);
                        break;
                    case "show":
                        this.projects.showView.show(data_opl[1]);
                        break;
                    case "update":
                        this.projects.showView.update(data_opl[1]);
                        break;
                    case "delete":
                        this.projects.indexView.delete(data_opl[1]);
                        break;
                }
                break;
        }
    }

    registerEventSubscribers() {
        APPUTIL.es_o.subscribe_px(this, "templates.loaded");
        APPUTIL.es_o.subscribe_px(this, "templates.failed");
        APPUTIL.es_o.subscribe_px(this, "app.cmd");
        APPUTIL.es_o.subscribe_px(this, "employees");
        APPUTIL.es_o.subscribe_px(this, "categories");
        APPUTIL.es_o.subscribe_px(this, "projects");
    }
}