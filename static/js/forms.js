export const submitForm = (axiosInstance, url, payload) => {
    return axiosInstance.post(url, payload);
};