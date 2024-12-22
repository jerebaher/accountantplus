import { createAxiosInstance } from './axios-config.js';
import { initializeSidebar } from './sidebar.js';
import { submitCategory, openCategoryModal, closeCategoryModal } from './categories.js';
import { submitTransaction, initializeCategorySelect } from './transactions.js';
import { submitAccount } from './accounts.js';

const axiosInstance = createAxiosInstance();

document.addEventListener('DOMContentLoaded', () => {
    initializeCategorySelect()
    initializeSidebar();
    document.getElementById('submit-category-btn').addEventListener('click',
        () => submitCategory(axiosInstance));
    document.getElementById('submit-transaction-btn').addEventListener('click',
        () => submitTransaction(axiosInstance));
    document.getElementById('submit-account-btn').addEventListener('click',
        () => submitAccount(axiosInstance));
    document.getElementById('open-category-modal').addEventListener('click', openCategoryModal);
    document.getElementById('close-category-modal').addEventListener('click', closeCategoryModal);
});

