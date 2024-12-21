const ARRAY_TYPE = 'array';
const NUMBER_TYPE = 'number';
const STRING_TYPE = 'string';
const BASE_URL = 'http://127.0.0.1:8000/api/';
let axiosInstance;

document.addEventListener('DOMContentLoaded', () => createAxiosInstance())

document.addEventListener('DOMContentLoaded', function () {
    const sidebarContainer = document.getElementById('sidebar-container');
    const sidebar = document.getElementById('sidebar');
    const pinButton = document.getElementById('pin-button');
    const triggerZone = document.getElementById('trigger-zone');
    const mainContent = document.getElementById('main-content');
    let isPinned = false;
    let isHovering = false;

    function showSidebar() {
        isHovering = true;
        setTimeout(() => {
            if (isHovering) {
                sidebar.classList.remove('-translate-x-full');
                if (isPinned) {
                    mainContent.classList.add('ml-64');
                }
            }
        }, 100);
    }

    function hideSidebar() {
        isHovering = false;
        if (!isPinned) {
            sidebar.classList.add('-translate-x-full');
            mainContent.classList.remove('ml-64');
        }
    }

    function togglePin() {
        isPinned = !isPinned;
        if (isPinned) {
            showSidebar();
            mainContent.classList.add('ml-64');
            pinButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `;
        } else {
            hideSidebar();
            mainContent.classList.remove('ml-64');
            pinButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        `;
        }
    }

    triggerZone.addEventListener('mouseenter', showSidebar);
    sidebarContainer.addEventListener('mouseleave', hideSidebar);
    pinButton.addEventListener('click', togglePin);

    pinButton.addEventListener('mouseenter', (e) => {
        e.stopPropagation();
    });
});

function openCategoryModal() {
    document.getElementById('categoryModal').classList.remove('hidden');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.add('hidden');
}

const createAxiosInstance = () => {
    axiosInstance = axios.create({
        baseURL: BASE_URL, headers: {
            'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            'Content-Type': 'application/json'
        }, timeout: 1000, withCredentials: true
    });
}

const submitCategory = () => {
    let tags = [{
        "propertyName": "name",
        "type": STRING_TYPE,
        "tagName": "category_name"
    }, {"propertyName": "description", "type": STRING_TYPE, "tagName": "category_description"}]
    let payload = getPayload(tags)

    submitForm(BASE_URL + 'categories/', payload)
    closeCategoryModal();
}

const getPayload = (tags) => {
    let payload = {};

    for (let tag in tags) {
        let value = null;
        let tagType = tags[tag]["type"];
        let tagName = tags[tag]["tagName"];
        let property = tags[tag]["propertyName"];

        if (tagType === ARRAY_TYPE) {
            const options = document.getElementById(tagName)?.selectedOptions;
            value = options ? Array.from(options).map(option => option.value) : [];
        } else if (tagType === NUMBER_TYPE) {
            const rawValue = document.getElementById(tagName)?.value;
            value = parseFloat(rawValue);
            if (isNaN(value) || value <= 0) {
                alert('El importe debe ser mayor a 0.');
            }
        } else if (tagType === STRING_TYPE) {
            value = document.getElementById(tagName)?.value || '';
        }

        payload[property] = value;
    }

    return payload;
}

const submitTransaction = () => {
    let tags = [{"propertyName": "name", "type": STRING_TYPE, "tagName": "transaction_name"}, {
        "propertyName": "amount",
        "type": NUMBER_TYPE,
        "tagName": "transaction_amount"
    }, {
        "propertyName": "categories_id",
        "type": ARRAY_TYPE,
        "tagName": "transaction_category"
    }, {
        "propertyName": "description",
        "type": STRING_TYPE,
        "tagName": "transaction_description"
    }, {
        "propertyName": "account_id",
        "type": STRING_TYPE,
        "tagName": "transaction_account"
    }, {
        "propertyName": "transaction_type",
        "type": STRING_TYPE,
        "tagName": "transaction_type"
    }, {"propertyName": "date", "type": STRING_TYPE, "tagName": "transaction_date"},]
    let payload = getPayload(tags)

    submitForm(BASE_URL + 'transactions/', payload)
}

const submitAccount = () => {
    let tags = [{
        "propertyName": "name",
        "type": STRING_TYPE,
        "tagName": "account_name"
    }, {"propertyName": "account_type", "type": STRING_TYPE, "tagName": "account_type"}, {
        "propertyName": "balance",
        "type": NUMBER_TYPE,
        "tagName": "account_balance"
    }, {"propertyName": "description", "type": STRING_TYPE, "tagName": "account_description"} // Nuevo campo
    ];
    let payload = getPayload(tags);

    submitForm('accounts/', payload);
}

const submitForm = (url, payload) => {
    return axiosInstance.post(url, payload)
        .then((res) => {
            if (res.status === 201) {
                alert('Solicitud enviada');
            } else {
                alert('Hubo un problema: ' + res.data.error);
            }
        })
        .catch((err) => {
            if (err.response) {
                console.error('Error en respuesta:', err.response.data);
                alert('Error: ' + err.response.data.error || 'Ocurrió un problema en la solicitud.');
            } else {
                console.error('Error:', err);
                alert('Error desconocido: ' + err.message);
            }
        });
}