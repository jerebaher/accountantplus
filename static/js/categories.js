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
                alert('Categoría creada exitosamente');
                refreshCategorySelect();
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
        .then((data) => {
            const categorySelect = document.getElementById('transaction_category');
            categorySelect.innerHTML = "";

            data.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;

                if (newCategoryId && newCategoryId === category.id) {
                    option.selected = true;
                }

                categorySelect.appendChild(option);
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