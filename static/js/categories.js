import {getPayload} from './payload.js';
import {submitForm} from './forms.js';

export const submitCategory = () => {
    const tags = [
        {"propertyName": "name", "type": "string", "tagName": "category_name"},
        {"propertyName": "description", "type": "string", "tagName": "category_description"}
    ];
    const payload = getPayload(tags);

    submitForm('categories/', 'POST', payload)
        .then((res) => {
            if (res.status === 201) {
                console.log(res);
                alert('Categoría creada exitosamente');
                refreshCategorySelect(res.data.body);
                closeCategoryModal();
            } else {
                alert('Hubo un problema: ' + res.data.error);
            }
        })
        .catch((err) => {
            console.error('Error:', err.response?.data || err.message);
            alert('Ocurrió un problema en la solicitud.');
        });
};

export const refreshCategorySelect = (newCategoryId = null) => {
    submitForm('categories/')
        .then((response) => {
            const categorySelect = document.getElementById('transaction_category');
            categorySelect.innerHTML = "";

            if (response.data.categories === undefined) {
                console.warn("Categorías no encontradas.")
                return;
            }

            response.data.categories.forEach(category => {
                const optionElement = document.createElement('option');
                optionElement.value = category.id;
                optionElement.textContent = category.name;

                if (newCategoryId && newCategoryId === category.id) {
                    optionElement.selected = true;
                }

                categorySelect.appendChild(optionElement);
            });
        })
        .catch(error => {
            console.error('Error al actualizar las categorías:', error);
        });
};

export const openCategoryModal = () => {
    document.getElementById('categoryModal').classList.remove('hidden');
};

export const closeCategoryModal = () => {
    document.getElementById('categoryModal').classList.add('hidden');
};