import {createAxiosInstance} from "./axios-config.js";

const AXIOS_INSTANCE = createAxiosInstance();

const CSRF_TOKEN_SELECTOR = 'input[name="csrfmiddlewaretoken"]';

const getCsrfToken = () => {
    const csrfInput = document.querySelector(CSRF_TOKEN_SELECTOR);
    return csrfInput ? csrfInput.value : null;
};

export const submitForm = (url, method = 'GET', payload = null) => {
    try {
        const options = {
            url: url,
            data: payload,
            method: method,
            headers: {
                'X-CSRFToken': getCsrfToken(),
            },
        };

        if (['POST', 'PUT', 'PATCH'].includes(options.method) && payload) {
            options.data = transformPayload(payload);
        }

        return AXIOS_INSTANCE.request(options);
    } catch (error) {
        console.error('Error en submitForm:', error.message);
        throw new Error('Error al enviar la solicitud.');
    }
};

const transformPayload = (payload) => {
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

    let transformedData = {...payload};
    transformToNumber(transformedData);

    return JSON.stringify(transformedData);
}