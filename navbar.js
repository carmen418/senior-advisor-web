// Load navbar into the page
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        const html = await response.text();
        const navbarContainer = document.getElementById('navbar-container');
        
        if (navbarContainer) {
            navbarContainer.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Load navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}

