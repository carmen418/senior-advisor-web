// Get base path for relative URLs
function getBasePath() {
    const path = window.location.pathname;
    // Remove leading/trailing slashes and split
    const parts = path.replace(/^\/|\/$/g, '').split('/').filter(p => p);
    // Count directories (exclude .html files and index.html)
    const depth = parts.filter(p => !p.includes('.html') && p !== 'index.html').length;
    // If we're in a subdirectory, go up one level
    if (depth > 0) {
        return '../';
    }
    // If we're at root, no prefix needed
    return '';
}

// Load footer into the page
async function loadFooter() {
    try {
        const basePath = getBasePath();
        const response = await fetch(basePath + 'footer.html');
        const html = await response.text();
        const footerContainer = document.getElementById('footer-container');
        
        if (footerContainer) {
            footerContainer.innerHTML = html;
            // Initialize privacy modal link after footer loads
            initPrivacyGenModalLink();
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Initialize privacy gen modal link handler
function initPrivacyGenModalLink() {
    const openPrivacyLink = document.getElementById('openPrivacyGenLink');
    const privacyModal = document.getElementById('privacyGenModal');
    
    if (openPrivacyLink && privacyModal) {
        openPrivacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
}

// Load footer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}

