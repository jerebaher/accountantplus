import {ARRAY_TYPE, NUMBER_TYPE, STRING_TYPE} from './constants.js';

export const getPayload = (tags) => {
    const payload = {};

    for (const tag of tags) {
        let value = null;
        const tagType = tag.type;
        const tagName = tag.tagName;
        const property = tag.propertyName;

        if (tagType === ARRAY_TYPE) {
            const options = document.getElementById(tagName)?.selectedOptions;
            value = options ? Array.from(options).map(option => option.value) : [];
        } else if (tagType === NUMBER_TYPE) {
            const rawValue = document.getElementById(tagName)?.value;
            value = parseFloat(rawValue);
            if (isNaN(value) || value < 0) {
                alert('El importe debe ser mayor a 0.');
            }
        } else if (tagType === STRING_TYPE) {
            value = document.getElementById(tagName)?.value || '';
        }

        payload[property] = value;
    }

    return payload;
};