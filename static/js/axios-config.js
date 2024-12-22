import { BASE_URL } from './constants.js';

export const createAxiosInstance = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            'Content-Type': 'application/json'
        },
        timeout: 1000,
        withCredentials: true
    });
};