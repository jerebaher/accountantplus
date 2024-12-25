import {createAxiosInstance} from "./axios-config.js";

const AXIOS_INSTANCE = createAxiosInstance();

const CSRF_TOKEN_SELECTOR = 'input[name="csrfmiddlewaretoken"]';

const getCsrfToken = () => {
    const csrfInput = document.querySelector(CSRF_TOKEN_SELECTOR);
    return csrfInput ? csrfInput.value : null;
};

export const submitForm = (url, payload) => {
    return AXIOS_INSTANCE.request({
        url: url,
        data: payload,
        method: 'POST',
        headers: {
            'X-CSRFToken': getCsrfToken(),
        },
        transformRequest: [
            function (data) {
                let regexNumberPattern = /^[0-9]+(\.[0-9]+)?$/;

                const transformToNumber = (obj) => {
                    for (let key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) {
                            if (typeof obj[key] === 'string' && regexNumberPattern.test(obj[key])) {
                                obj[key] = Number(obj[key]);
                            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                                transformToNumber(obj[key]);
                            }
                        }
                    }
                };

                let transformedData = {...data};
                transformToNumber(transformedData);

                return JSON.stringify(transformedData);
            }
        ]
    });
};