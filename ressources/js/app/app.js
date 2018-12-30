class Application_cl {

    constructor() {
        this.registerEventSubscribers();

        this.auth = {};
        this.partials = {};
        this.employees = {};
        this.categories = {};
        this.projects = {};
        this.components = {};
        this.bugs = {};
        this.reports = {};

        this.auth.indexView = new Auth.IndexView("auth.index.html");
        this.partials.sidebarView = new Partials.SidebarView("aside", "sidebar.html");

        this.employees.indexView = new Employees.IndexView("employees.index.html");
        this.employees.showView = new Employees.ShowView("employees.show.html");
        this.employees.createView = new Employees.CreateView("employees.create.html");

        this.categories.indexView = new Categories.IndexView("categories.index.html");
        this.categories.showView = new Categories.ShowView("categories.show.html");
        this.categories.createView = new Categories.CreateView("categories.create.html");

        this.projects.indexView = new Projects.IndexView("projects.index.html");
        this.projects.showView = new Projects.ShowView("projects.show.html");
        this.projects.createView = new Projects.CreateView("projects.create.html");

        this.components.indexView = new Components.IndexView("components.index.html");
        this.components.showView = new Components.ShowView("components.show.html");
        this.components.createView = new Components.CreateView("components.create.html");

        this.bugs.indexView = new Bugs.IndexView("bugs.index.html");
        this.bugs.showView = new Bugs.ShowView("bugs.show.html");
        this.bugs.createView = new Bugs.CreateView("bugs.create.html");

        this.reports.categories = new Reports.CategoriesReport("reports.categories.html");
        this.reports.projects = new Reports.ProjectsReport("reports.projects.html");
    }

    notify_px(self, message_spl, data_opl) {
        switch (message_spl) {
            case "templates.failed":
                alert("Vorlagen konnten nicht geladen werden.");
                break;
            case "templates.loaded":
                console.log("templated_loaded_again");
                // Templates stehen zur Verfügung, Bereiche mit Inhalten füllen
                // hier zur Vereinfachung direkt
                let markup_s;
                let el_o;
                markup_s = APPUTIL.tm_o.execute_px("header.html", null);
                el_o = document.querySelector("header");
                if (el_o != null) {
                    el_o.innerHTML = markup_s;
                }

                let nav_a = [];

                if (localStorage.getItem('auth') == null) {
                    nav_a.push(["auth.index", "Login"]);
                }

                if (localStorage.getItem('auth') == 1 || localStorage.getItem('auth') == 2) {
                    nav_a.push(
                        ["bugs.index", "Fehlerverwaltung"],
                        ["projects.index", "Projektverwaltung"],
                        ["components.index", "Komponentenverwaltung"],
                        ["employees.index", "Mitarbeiterverwaltung"],
                        ["categories.index", "Kategorieverwaltung"],
                        ["reports.categories", "Auswertung Kategorie/Fehler"],
                        ["reports.projects", "Auswertung Projekte/Fehler"], ["auth.logout", "Logout"]
                    );
                }

                self.partials.sidebarView.render_px(nav_a);
                this.auth.indexView.index();
                break;
            case "app.cmd":
                switch (data_opl[0]) {
                    case 'home':
                        this.auth.indexView.index();
                        break;
                }
                break;
            case "auth":
                // hier müsste man überprüfen, ob der Inhalt gewechselt werden darf
                switch (data_opl[0]) {
                    case "index":
                        this.auth.indexView.index();
                        break;
                    case "login":
                        this.auth.indexView.login(data_opl[1]);
                        break;
                    case "logout":
                        this.auth.indexView.logout();
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
            case "components":
                switch (data_opl[0]) {
                    case "index":
                        this.components.indexView.index();
                        break;
                    case "create":
                        this.components.createView.create();
                        break;
                    case "store":
                        this.components.createView.store(data_opl[1]);
                        break;
                    case "show":
                        this.components.showView.show(data_opl[1]);
                        break;
                    case "update":
                        this.components.showView.update(data_opl[1]);
                        break;
                    case "delete":
                        this.components.indexView.delete(data_opl[1]);
                        break;
                }
                break;
            case "bugs":
                switch (data_opl[0]) {
                    case "index":
                        this.bugs.indexView.index();
                        break;
                    case "create":
                        this.bugs.createView.create();
                        break;
                    case "store":
                        this.bugs.createView.store(data_opl[1]);
                        break;
                    case "show":
                        this.bugs.showView.show(data_opl[1]);
                        break;
                    case "update":
                        this.bugs.showView.update(data_opl[1]);
                        break;
                    case "delete":
                        this.bugs.indexView.delete(data_opl[1]);
                        break;
                }
                break;
            case "reports":
                switch (data_opl[0]) {
                    case "categories":
                        this.reports.categories.index();
                        break;
                    case "projects":
                        this.reports.projects.index();
                        break;
                }
                break;
        }
    }

    registerEventSubscribers() {
        APPUTIL.es_o.subscribe_px(this, "templates.loaded");
        APPUTIL.es_o.subscribe_px(this, "templates.failed");
        APPUTIL.es_o.subscribe_px(this, "app.cmd");
        APPUTIL.es_o.subscribe_px(this, "auth");
        APPUTIL.es_o.subscribe_px(this, "employees");
        APPUTIL.es_o.subscribe_px(this, "categories");
        APPUTIL.es_o.subscribe_px(this, "projects");
        APPUTIL.es_o.subscribe_px(this, "components");
        APPUTIL.es_o.subscribe_px(this, "bugs");
        APPUTIL.es_o.subscribe_px(this, "reports");
    }
}