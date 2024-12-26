import { getPayload } from './payload.js';
import { submitForm } from './forms.js';

export const submitAccount = () => {
    const tags = [
        {"propertyName": "name", "type": "string", "tagName": "account_name"},
        {"propertyName": "account_type", "type": "string", "tagName": "account_type"},
        {"propertyName": "balance", "type": "number", "tagName": "account_balance"},
        {"propertyName": "description", "type": "string", "tagName": "account_description"}
    ];
    const payload = getPayload(tags);

    submitForm('accounts/', 'POST', payload)
        .then((res) => {
            if (res.status === 201) {
                alert('Cuenta creada exitosamente');
            } else {
                alert('Hubo un problema: ' + res.data.error);
            }
        })
        .catch((err) => {
            console.error('Error:', err.response?.data || err.message);
            alert('Ocurrió un problema en la solicitud.');
        });
};