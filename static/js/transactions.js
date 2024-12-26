import {getPayload} from './payload.js';
import {submitForm} from './forms.js';

export const submitTransaction = () => {
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

    submitForm('transactions/', 'POST', payload)
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

export const initializeDatetimeInput = () => {
    const datetimeInput = document.getElementById("transaction_date");

    const now = new Date();
    datetimeInput.value = now.toISOString().slice(0, 16);
}

export const initializeRemoveCategory = () => {
    const transactionsBody = document.getElementById('transactions-body');

    if (!transactionsBody) {
        console.warn("El elemento con ID 'transactions-body' no se encontró en el DOM.");
        return;
    }

    transactionsBody.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.closest('.category-tag')) {
            const categoryTag = e.target.closest('.category-tag');

            const transactionId = categoryTag.getAttribute('data-transaction-id');
            const categoryId = categoryTag.getAttribute('data-category-id');

            if (!transactionId || !categoryId) {
                alert('No se pudo identificar la transacción o categoría.');
                return;
            }

            if (!confirm('¿Estás seguro de eliminar esta categoría de la transacción?')) {
                return;
            }

            submitForm('transactions/remove_category/', {
                transaction_id: transactionId,
                category_id: categoryId,
            })
                .then((response) => {
                    alert('Categoría eliminada con éxito.');
                    categoryTag.remove(); // Remover el tag del DOM
                })
                .catch((error) => {
                    console.error('Error al eliminar la categoría:', error.response?.data || error.message);
                    alert('Hubo un problema al intentar eliminar la categoría.');
                });
        }
    });
};