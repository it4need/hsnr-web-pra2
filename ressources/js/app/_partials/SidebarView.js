window.Partials = window.Partials || {};

Partials.SidebarView = class SidebarView {

   constructor (el_spl, template_spl) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.configHandleEvent_p();
   }
   render_px (data_opl) {
      let markup_s = APPUTIL.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.innerHTML = markup_s;
      }
   }
   configHandleEvent_p () {
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.addEventListener("click", this.handleEvent_p);
      }
   }
   handleEvent_p (event_opl) {
      let action = event_opl.target.dataset.action;
      let publish_event_category;
      let controllerActionArray = action.split('.');

      if(controllerActionArray.length > 1) {
         publish_event_category = controllerActionArray[0];
         action = controllerActionArray[1];
      } else {
         publish_event_category = 'app.cmd';
      }

      console.log(publish_event_category, action);

      APPUTIL.es_o.publish_px(publish_event_category, [action, null]);
   }
}
