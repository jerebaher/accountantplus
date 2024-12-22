export const submitForm = (axiosInstance, url, payload) => {
    return axiosInstance({
        url: url,
        data: payload,
        method: 'POST',
        transformRequest: [
            function (data) {
                let regexNumberPattern = /^[0-9]+(\.[0-9]+)?$/;

                const transformToNumber = (obj) => {
                    for (let key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) {
                            if (typeof obj[key] === 'string' && regexNumberPattern.test(obj[key])) {
                                obj[key] = Number(obj[key]);
                            }

                            else if (typeof obj[key] === 'object' && obj[key] !== null) {
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