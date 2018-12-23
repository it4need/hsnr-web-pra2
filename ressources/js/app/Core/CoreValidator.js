window.Core = window.Core || {};

Core.CoreValidator = class CoreValidator {

    constructor() {
        this.validation_errors = {};
    }

    fails(data, validation_data) {
        let validationError = {};

        Object.keys(validation_data).forEach(function (dataKey) {
            let rules = validation_data[dataKey].split('|');
            rules.forEach(function (rule) {
                let methodArgsArr = rule.split(':');
                let actualRule = methodArgsArr[0];
                let argument;

                if (methodArgsArr.length > 1) {
                    argument = methodArgsArr[1];
                }

                const validationFunction = Core.CoreValidator[actualRule];

                if (argument !== undefined) {
                    if (!validationFunction(data[dataKey], argument)) {
                        validationError[dataKey] = actualRule;
                    }
                } else {
                    if (!validationFunction(data[dataKey])) {
                        validationError[dataKey] = actualRule;
                    }
                }
            });
        });

        this.validation_errors = validationError;

        return Object.keys(validationError).length > 0;
    }

    errors() {
        return this.validation_errors;
    }

    success(data, validation_data) {
        return !this.fails(data, validation_data);
    }

    static required(value) {
        return value != '' ? true : false;
    }

    static min(value, minVal) {
        return value >= minVal;
    }

    static max(value, maxVal) {
        return value <= maxVal;
    }

    static in(value, params) {
        return Core.CoreValidator.getParameterAsArray(params).includes(value)
    }

    static getParameterAsArray(params) {
        return params.split(',');
    }
};

Core.ValidationError = class ValidationError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, ValidationError);
    }
};