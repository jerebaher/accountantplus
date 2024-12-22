import {getPayload} from './payload.js';
import {submitForm} from './forms.js';

export const submitCategory = (axiosInstance) => {
    const tags = [
        {"propertyName": "name", "type": "string", "tagName": "category_name"},
        {"propertyName": "description", "type": "string", "tagName": "category_description"}
    ];
    const payload = getPayload(tags);

    submitForm(axiosInstance, 'categories/', payload)
        .then((res) => {
            if (res.status === 201) {
                alert('Categoría creada exitosamente');
            } else {
                alert('Hubo un problema: ' + res.data.error);
            }
        })
        .catch((err) => {
            console.error('Error:', err.response?.data || err.message);
            alert('Ocurrió un problema en la solicitud.');
        });
};

export const openCategoryModal = () => {
    document.getElementById('categoryModal').classList.remove('hidden');
};

export const closeCategoryModal = () => {
    document.getElementById('categoryModal').classList.add('hidden');
};