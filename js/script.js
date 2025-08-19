// Dark Kokan Website JavaScript
// Professional iOS-style functionality

class DarkKokanWebsite {
    constructor() {
        this.currentVideoId = null;
        this.isModalOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handlePageLoad();
        this.setupKeyboardNavigation();
    }

    // Initialize all event listeners
    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Modal close events
        const modal = document.getElementById('videoModal');
        if (modal) {
            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                    this.closeVideoModal();
                }
            });

            // Close button
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeVideoModal());
            }
        }

        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Video card interactions
        document.querySelectorAll('.video-card').forEach(card => {
            // Add ripple effect on click
            card.addEventListener('click', this.createRippleEffect);
            
            // Improve accessibility
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });

        // Lazy loading for images
        this.setupLazyLoading();
    }

    // Handle page load animations
    handlePageLoad() {
        window.addEventListener('load', () => {
            // Hide loading screen
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 1500); // Show loading for 1.5 seconds
            }

            // Animate content in
            this.animateContentIn();
        });
    }

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Close modal with Escape key
            if (e.key === 'Escape' && this.isModalOpen) {
                this.closeVideoModal();
            }

            // Tab navigation with arrow keys
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const tabs = document.querySelectorAll('.nav-tab');
                const activeTab = document.querySelector('.nav-tab.active');
                const currentIndex = Array.from(tabs).indexOf(activeTab);
                
                let newIndex;
                if (e.key === 'ArrowRight') {
                    newIndex = (currentIndex + 1) % tabs.length;
                } else {
                    newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                }
                
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    tabs[newIndex].click();
                }
            }
        });
    }

    // Switch between tabs
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
            tab.setAttribute('aria-selected', tab.dataset.tab === tabName);
        });

        // Update content with animation
        document.querySelectorAll('.tab-content').forEach(content => {
            if (content.id === tabName) {
                content.classList.add('active');
                content.style.display = 'block';
                // Trigger reflow for animation
                content.offsetHeight;
            } else {
                content.classList.remove('active');
                // Delay hiding to allow fade out
                setTimeout(() => {
                    if (!content.classList.contains('active')) {
                        content.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Update URL hash without scrolling
        if (history.pushState) {
            history.pushState(null, null, `#${tabName}`);
        }

        // Analytics tracking (if needed)
        this.trackTabSwitch(tabName);
    }

    // Open video modal
    openVideoModal(videoId, title) {
        if (!videoId || !title) {
            console.error('Video ID and title are required');
            return;
        }

        this.currentVideoId = videoId;
        
        const modal = document.getElementById('videoModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContainer = document.getElementById('modalVideoContainer');
        const modalYouTubeLink = document.getElementById('modalYouTubeLink');

        if (!modal || !modalTitle || !modalContainer || !modalYouTubeLink) {
            console.error('Modal elements not found');
            return;
        }

        // Set title
        modalTitle.textContent = title;

        // Create YouTube embed
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        modalContainer.innerHTML = `
            <iframe 
                src="${embedUrl}"
                title="${title}"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;

        // Set YouTube link
        modalYouTubeLink.href = `https://youtu.be/${videoId}`;

        // Show modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        this.isModalOpen = true;

        // Focus management
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.focus();
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Track video open
        this.trackVideoOpen(videoId, title);
    }

    // Close video modal
    closeVideoModal() {
        const modal = document.getElementById('videoModal');
        const modalContainer = document.getElementById('modalVideoContainer');

        if (!modal || !modalContainer) return;

        // Hide modal
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        this.isModalOpen = false;

        // Clear video content to stop playback
        setTimeout(() => {
            modalContainer.innerHTML = '';
        }, 300);

        // Restore body scroll
        document.body.style.overflow = 'auto';

        // Return focus to the video card that opened the modal
        if (this.currentVideoId) {
            const videoCard = document.querySelector(`[onclick*="${this.currentVideoId}"]`);
            if (videoCard) {
                videoCard.focus();
            }
        }

        this.currentVideoId = null;
    }

    // Create ripple effect on click
    createRippleEffect(e) {
        const card = e.currentTarget;
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,107,53,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 10;
        `;

        // Add ripple animation keyframes if not exists
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Setup lazy loading for images
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Animate content when page loads
    animateContentIn() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Observe video cards and sections
        document.querySelectorAll('.video-card, .about-section, .cta-section').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Analytics tracking functions
    trackTabSwitch(tabName) {
        // Add your analytics tracking here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'tab_switch', {
                'tab_name': tabName,
                'page_title': 'Dark Kokan Website'
            });
        }
    }

    trackVideoOpen(videoId, title) {
        // Add your analytics tracking here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'video_open', {
                'video_id': videoId,
                'video_title': title,
                'page_title': 'Dark Kokan Website'
            });
        }
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Check if user prefers reduced motion
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
}

// Global functions for HTML onclick events
function openVideoModal(videoId, title) {
    if (window.darkKokanSite) {
        window.darkKokanSite.openVideoModal(videoId, title);
    }
}

function closeVideoModal() {
    if (window.darkKokanSite) {
        window.darkKokanSite.closeVideoModal();
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main website class
    window.darkKokanSite = new DarkKokanWebsite();

    // Handle initial URL hash
    const hash = window.location.hash.slice(1);
    if (hash && ['videos', 'about'].includes(hash)) {
        window.darkKokanSite.switchTab(hash);
    }

    // Add smooth scroll behavior to the website
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add loading states to buttons
    document.querySelectorAll('.subscribe-btn, .cta-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.textContent;
            this.style.opacity = '0.8';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });

    // Enhanced error handling for images
    document.querySelectorAll('.video-thumbnail').forEach(img => {
        img.addEventListener('error', function() {
            this.src = `https://img.youtube.com/vi/${this.src.split('/vi/')[1]?.split('/')[0]}/hqdefault.jpg`;
        });
    });

    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page load time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
            }, 0);
        });
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    const hash = window.location.hash.slice(1);
    if (hash && ['videos', 'about'].includes(hash)) {
        window.darkKokanSite.switchTab(hash);
    } else {
        window.darkKokanSite.switchTab('videos');
    }
});

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export for ES6 modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkKokanWebsite;
}

