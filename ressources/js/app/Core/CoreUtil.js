window.Core = window.Core || {};

Core.CoreUtil = class CoreUtil {
    static getFormData(form_element) {
        let output = {};
        new FormData(form_element).forEach(
            (value, key) => {
                // Check if property already exist
                if (Object.prototype.hasOwnProperty.call(output, key)) {
                    let current = output[key];
                    if (!Array.isArray(current)) {
                        // If it's not an array, convert it to an array.
                        current = output[key] = [current];
                    }
                    current.push(value); // Add the new value to the array.
                } else {
                    if (document.querySelector(`[name=${key}]`).type === 'select-multiple') {
                        output[key] = [value];
                    } else if (document.querySelector(`[name=${key}]`).type === 'select-one' && value === '') {
                        output[key] = null;
                    } else {
                        output[key] = value;
                    }
                }
            }
        );
        return output;
    }
};