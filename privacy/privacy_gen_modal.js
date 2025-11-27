// Get base path for relative URLs
function getBasePath() {
    const path = window.location.pathname;
    // Remove leading/trailing slashes and split
    const parts = path.replace(/^\/|\/$/g, '').split('/').filter(p => p);
    // Count directories (exclude .html files)
    const depth = parts.filter(p => !p.includes('.html')).length;
    return depth > 0 ? '../'.repeat(depth) : '';
}

// Load privacy gen modal into the page
async function loadPrivacyGenModal() {
    try {
        const basePath = getBasePath();
        const response = await fetch(basePath + 'privacy/privacy_gen_modal.html');
        const html = await response.text();
        const modalContainer = document.getElementById('privacy-gen-modal-container');
        
        if (modalContainer) {
            modalContainer.innerHTML = html;
            initPrivacyGenModal();
        } else {
            // If container doesn't exist, create it
            const container = document.createElement('div');
            container.id = 'privacy-gen-modal-container';
            document.body.appendChild(container);
            container.innerHTML = html;
            initPrivacyGenModal();
        }
    } catch (error) {
        console.error('Error loading privacy gen modal:', error);
    }
}

// Initialize privacy gen modal handlers
function initPrivacyGenModal() {
    const privacyModal = document.getElementById('privacyGenModal');
    const closePrivacyBtn = document.getElementById('closePrivacyGenModal');

    // Find and setup the privacy link (may be loaded dynamically from footer)
    function setupPrivacyLink() {
        const openPrivacyLink = document.getElementById('openPrivacyGenLink');
        if (openPrivacyLink && !openPrivacyLink.dataset.listenerAdded) {
            openPrivacyLink.addEventListener('click', function(e) {
                e.preventDefault();
                if (privacyModal) {
                    privacyModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
            openPrivacyLink.dataset.listenerAdded = 'true';
        }
    }

    // Try to setup link immediately
    setupPrivacyLink();

    // Also try after a delay in case footer loads later
    setTimeout(setupPrivacyLink, 1000);

    // Close modal
    if (closePrivacyBtn) {
        closePrivacyBtn.addEventListener('click', function() {
            if (privacyModal) {
                privacyModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Close modal when clicking outside
    if (privacyModal) {
        privacyModal.addEventListener('click', function(e) {
            if (e.target === privacyModal) {
                privacyModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && privacyModal && privacyModal.style.display === 'flex') {
            privacyModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Load modal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        loadPrivacyGenModal();
        // Also initialize after footer loads
        setTimeout(initPrivacyGenModal, 500);
    });
} else {
    loadPrivacyGenModal();
    setTimeout(initPrivacyGenModal, 500);
}

