window.Core = window.Core || {};

Core.CoreUtil = class CoreUtil {
    static getFormData(form_element) {
        let formData = new FormData(form_element);
        let data = {};

        for (let key_value of formData.entries()) {
            if (data[key_value[0]] !== undefined) {
                data[key_value[0]] = [data[key_value[0]]];
            } else {
                data[key_value[0]] = key_value[1];
            }
        }

        // todo: make {test: "abc", test: "ted"} -> {test: ["abc", "ted"]}

        return data;
    }
};