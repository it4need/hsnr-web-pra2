window.Core = window.Core || {};

Core.CoreUtil = class CoreUtil {
    static getFormData(form_element) {
        let formData = new FormData(form_element);
        let data = {};

        for (let key_value of formData.entries()) {
            data[key_value[0]] = key_value[1];
        }

        return data;
    }
};