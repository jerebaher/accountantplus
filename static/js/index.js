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

function submitCategory() {
    const name = document.getElementById('category_name').value;
    const description = document.getElementById('category_description').value;
    const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    axios.post('/api/categories/',
        {
            name: name,
            description: description
        },
        {
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    )
        .then(response => {
            if (response.status === 201) {
                alert('Categoría añadida con éxito.');
                window.location.reload();
            } else {
                alert('Hubo un problema: ' + response.data.error);
            }
        })
        .catch(error => {
            if (error.response) {
                console.error('Error en respuesta:', error.response.data);
                alert('Error: ' + error.response.data.error || 'Ocurrió un problema al agregar la categoría.');
            } else {
                console.error('Error:', error);
                alert('Error desconocido: ' + error.message);
            }
        });
    closeCategoryModal();
}