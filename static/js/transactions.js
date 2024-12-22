import {getPayload} from './payload.js';
import {submitForm} from './forms.js';

export const submitTransaction = (axiosInstance) => {
    const tags = [
        {"propertyName": "name", "type": "string", "tagName": "transaction_name"},
        {"propertyName": "amount", "type": "number", "tagName": "transaction_amount"},
        {"propertyName": "categories_id", "type": "array", "tagName": "transaction_category"},
        {"propertyName": "description", "type": "string", "tagName": "transaction_description"},
        {"propertyName": "account_id", "type": "string", "tagName": "transaction_account"},
        {"propertyName": "transaction_type", "type": "string", "tagName": "transaction_type"},
        {"propertyName": "date", "type": "string", "tagName": "transaction_date"}
    ];
    const payload = getPayload(tags);

    submitForm(axiosInstance, 'transactions/', payload)
        .then((res) => {
            if (res.status === 201) {
                alert('Transacción creada exitosamente');
            } else {
                alert('Hubo un problema: ' + res.data.error);
            }
        })
        .catch((err) => {
            console.error('Error:', err.response?.data || err.message);
            alert('Ocurrió un problema en la solicitud.');
        });
};

export const initializeCategorySelect = () => {
    const categorySelect = document.getElementById('transaction_category');
    if (!categorySelect) {
        console.warn("El elemento con ID 'transaction_category' no se encontró en el DOM.");
        return;
    }

    categorySelect.addEventListener('click', (e) => {
        if (e.target.tagName === 'OPTION') {
            e.preventDefault();
            e.target.selected = !e.target.selected;

            const event = new Event('change', {bubbles: true});
            categorySelect.dispatchEvent(event);
        }
    });

    categorySelect.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'OPTION') {
            e.preventDefault();
        }
    });
};