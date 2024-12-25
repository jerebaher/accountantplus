import { submitCategory, openCategoryModal, closeCategoryModal } from './categories.js';
import { submitTransaction, initializeCategorySelect, initializeDatetimeInput } from './transactions.js';
import { submitAccount } from './accounts.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeCategorySelect()

    document.getElementById('submit-category-btn').addEventListener('click',
        () => submitCategory());
    document.getElementById('submit-transaction-btn').addEventListener('click',
        () => submitTransaction());
    document.getElementById('submit-account-btn').addEventListener('click',
        () => submitAccount());
    document.getElementById('open-category-modal').addEventListener('click', openCategoryModal);
    document.getElementById('close-category-modal').addEventListener('click', closeCategoryModal);
    document.getElementById("set-current-datetime").addEventListener("click", initializeDatetimeInput)
});

