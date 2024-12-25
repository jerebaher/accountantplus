import { BASE_URL } from './constants.js';

export const createAxiosInstance = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 1000,
        withCredentials: true
    });
};