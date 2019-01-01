/*
requires:

app/Core/CoreIndexView.js

 */
window.Auth = window.Auth || {};

Auth.IndexView = class IndexView extends Core.IndexView {
    constructor(template_spl) {
        super(template_spl, 'auth', 'assets/js/users.json');
    }

    index() {
        if(localStorage.getItem('auth') == 1 || localStorage.getItem('auth') == 2) {
            APPUTIL.es_o.publish_px('bugs', ["index", null]);
            return;
        }

        super.index();
    }

    login(type) {
        localStorage.setItem('auth', type);
        console.log(type);
        location.reload();
    }

    logout() {
        localStorage.removeItem('auth');
        location.reload();
    }

    eventHandler(event, that) {
        if (event.target.id === "login" && event.target.dataset.controller === this.eventController) {
            this.eventLogin(event, that);
        }
    }

    eventLogin(event, that) {
        let data = Core.CoreUtil.getFormData(document.querySelector('#loginForm'));
        APPUTIL.es_o.publish_px(that.eventController, ["login", data["users"]]);
    }


};