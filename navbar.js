// Load navbar into the page
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        const html = await response.text();
        const navbarContainer = document.getElementById('navbar-container');
        
        if (navbarContainer) {
            navbarContainer.innerHTML = html;
            
            // Initialize mobile menu after navbar is loaded
            initializeMobileMenu();
            
            // Set active nav item based on current page
            setActiveNavItem();
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Initialize mobile menu toggle functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navContent = document.querySelector('.nav-content');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (hamburger && navContent) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navContent.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav item
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navContent.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navContent.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navContent.classList.remove('active');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navContent.classList.remove('active');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                // Remove mobile classes on desktop
                hamburger.classList.remove('active');
                navContent.classList.remove('active');
            }
        });
    }
}

// Set active nav item based on current page
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Load navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}
