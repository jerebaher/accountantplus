export const initializeSidebar = () => {
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
        } else {
            hideSidebar();
            mainContent.classList.remove('ml-64');
        }
    }

    triggerZone.addEventListener('mouseenter', showSidebar);
    sidebarContainer.addEventListener('mouseleave', hideSidebar);
    pinButton.addEventListener('click', togglePin);
    pinButton.addEventListener('mouseenter', (e) => e.stopPropagation());
};