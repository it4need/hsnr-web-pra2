class Application_cl {

   constructor () {
      // Registrieren zum Empfang von Nachrichten
      APPUTIL.es_o.subscribe_px(this, "templates.loaded");
      APPUTIL.es_o.subscribe_px(this, "templates.failed");
      APPUTIL.es_o.subscribe_px(this, "app.cmd");
      this.sideBar_o = new SideBar_cl("aside", "sidebar.tpl.html");
      this.listView_o = new ListView_cl("main", "employees.index.html");
      this.detailView_o = new DetailView_cl("main", "employees.show.html");
   }
   notify_px (self, message_spl, data_opl) {
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
            ["list", "Liste"]
         ];
         self.sideBar_o.render_px(nav_a);
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
         case "list":
            // Daten anfordern und darstellen
            this.listView_o.render_px();
            break;
         case "detail":
            this.detailView_o.render_px(data_opl[1]);
            break;
         case "save":
            this.detailView_o.save_px(data_opl[1]);
            break;
         case "idBack":
            APPUTIL.es_o.publish_px("app.cmd", ["list", null]);
            break;
         }
         break;
      }
   }
}