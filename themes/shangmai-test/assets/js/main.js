// Shangmai Test Theme - Enhanced JavaScript

/**
 * Theme Initialization
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeSearch();
    initializeLazyLoading();
    initializeAccessibility();
    initializePerformanceOptimizations();
});

/**
 * Enhanced Navigation System
 */
function initializeNavigation() {
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const mobileClose = document.getElementById('mobile-nav-close');
    const mainNav = document.getElementById('main-nav');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const header = document.getElementById('site-header');
    const langButton = document.getElementById('lang-button');
    const langDropdown = document.getElementById('lang-dropdown');
    
    if (mobileToggle && mainNav) {
        // Mobile menu toggle
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Mobile menu close button
        if (mobileClose) {
            mobileClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeMobileMenu();
            });
        }
        
        // Close mobile menu when clicking backdrop
        if (backdrop) {
            backdrop.addEventListener('click', closeMobileMenu);
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu when window is resized to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1200) {
                closeMobileMenu();
            }
        });
        
        // Manage focus for accessibility
        mainNav.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                trapFocus(e, mainNav);
            }
        });
    }
    
    // Language switcher functionality
    if (langButton && langDropdown) {
        langButton.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLanguageDropdown();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!langButton.contains(e.target) && !langDropdown.contains(e.target)) {
                closeLanguageDropdown();
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && langDropdown.classList.contains('active')) {
                closeLanguageDropdown();
                langButton.focus();
            }
        });
    }
    
    function toggleLanguageDropdown() {
        const isActive = langDropdown.classList.contains('active');
        
        if (isActive) {
            closeLanguageDropdown();
        } else {
            openLanguageDropdown();
        }
    }
    
    function openLanguageDropdown() {
        langDropdown.classList.add('active');
        langButton.setAttribute('aria-expanded', 'true');
    }
    
    function closeLanguageDropdown() {
        langDropdown.classList.remove('active');
        langButton.setAttribute('aria-expanded', 'false');
    }
    
    function toggleMobileMenu() {
        const isActive = mainNav.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        mainNav.classList.add('active');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        
        if (backdrop) {
            backdrop.classList.add('active');
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus first nav link
        const firstLink = mainNav.querySelector('a');
        if (firstLink) {
            firstLink.focus();
        }
    }
    
    function closeMobileMenu() {
        mainNav.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        
        if (backdrop) {
            backdrop.classList.remove('active');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    function trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

/**
 * Advanced Scroll Effects
 */
function initializeScrollEffects() {
    const header = document.getElementById('site-header');
    let lastScrollTop = 0;
    let scrollTimer = null;
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (scrollTimer) {
                cancelAnimationFrame(scrollTimer);
            }
            
            scrollTimer = requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Add/remove scrolled class for backdrop blur effect
                if (scrollTop > 10) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Hide/show header on scroll (optional - can be enabled)
                // if (scrollTop > lastScrollTop && scrollTop > 100) {
                //     header.style.transform = 'translateY(-100%)';
                // } else {
                //     header.style.transform = 'translateY(0)';
                // }
                
                lastScrollTop = scrollTop;
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Intersection Observer Animations
 */
function initializeAnimations() {
    // Enhanced intersection observer for animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Add staggered animation for grid items
                if (entry.target.closest('.product-grid, .grid')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
                
                // Animate counter numbers
                if (entry.target.querySelector('[data-counter]')) {
                    animateCounters(entry.target);
                }
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .scale-in, .card, .product-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        animationObserver.observe(el);
    });
    
    // Counter animation function
    function animateCounters(container) {
        const counters = container.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        });
    }
}

/**
 * Enhanced Search Functionality
 */
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const contentGrid = document.getElementById('content-grid');
    const noResults = document.getElementById('no-results');
    
    if (searchInput && contentGrid) {
        let searchTimeout;
        const allItems = Array.from(contentGrid.children);
        
        // Enhanced search with debouncing
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const searchTerm = this.value.toLowerCase().trim();
            
            searchTimeout = setTimeout(() => {
                performSearch(searchTerm, allItems, noResults);
            }, 300);
        });
        
        // Search shortcuts
        document.addEventListener('keydown', function(e) {
            // Focus search on Ctrl/Cmd + F
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            }
            
            // Clear search on Escape
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.value = '';
                performSearch('', allItems, noResults);
                searchInput.blur();
            }
        });
    }
    
    function performSearch(searchTerm, items, noResultsEl) {
        let visibleCount = 0;
        
        items.forEach((item, index) => {
            const title = item.getAttribute('data-title') || '';
            const tags = item.getAttribute('data-tags') || '';
            const text = item.textContent.toLowerCase();
            
            const isVisible = searchTerm === '' || 
                title.includes(searchTerm) || 
                tags.includes(searchTerm) || 
                text.includes(searchTerm);
            
            // Animate visibility changes
            if (isVisible) {
                item.style.display = 'block';
                item.style.animation = `fadeIn 0.3s ease-out ${index * 0.05}s both`;
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (noResultsEl) {
            noResultsEl.style.display = visibleCount === 0 && searchTerm !== '' ? 'block' : 'none';
        }
        
        // Update URL with search query (optional)
        if (searchTerm && history.replaceState) {
            const url = new URL(window.location);
            url.searchParams.set('q', searchTerm);
            history.replaceState(null, '', url);
        }
    }
}

/**
 * Advanced Lazy Loading with Intersection Observer
 */
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        // Add loading placeholder
                        img.classList.add('loading-shimmer');
                        
                        // Create new image to preload
                        const newImg = new Image();
                        newImg.onload = function() {
                            img.src = img.dataset.src;
                            img.classList.remove('loading-shimmer');
                            img.classList.add('loaded');
                        };
                        newImg.onerror = function() {
                            img.classList.remove('loading-shimmer');
                            img.classList.add('error');
                        };
                        newImg.src = img.dataset.src;
                        
                        delete img.dataset.src;
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                delete img.dataset.src;
            }
        });
    }
}

/**
 * Accessibility Enhancements
 */
function initializeAccessibility() {
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Skip links navigation
        if (e.key === 'Tab' && !e.shiftKey && e.target.matches('a[href^="#"]')) {
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                targetElement.addEventListener('blur', function() {
                    this.removeAttribute('tabindex');
                }, { once: true });
            }
        }
    });
    
    // Announce dynamic content changes for screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Add announcement for search results
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let announceTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(announceTimeout);
            announceTimeout = setTimeout(() => {
                const visibleItems = document.querySelectorAll('#content-grid > *:not([style*="display: none"])').length;
                announceToScreenReader(`${visibleItems} results found`);
            }, 500);
        });
    }
    
    // Focus management for modal-like elements
    const modalElements = document.querySelectorAll('[data-modal]');
    modalElements.forEach(modal => {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const closeButton = modal.querySelector('[data-close]');
                if (closeButton) {
                    closeButton.click();
                }
            }
        });
    });
}

/**
 * Performance Optimizations
 */
function initializePerformanceOptimizations() {
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate layouts if needed
            const event = new CustomEvent('optimizedResize');
            window.dispatchEvent(event);
        }, 150);
    });
    
    // Preload critical resources on user interaction
    let hasInteracted = false;
    const interactionEvents = ['mousedown', 'touchstart', 'keydown'];
    
    interactionEvents.forEach(event => {
        document.addEventListener(event, function() {
            if (!hasInteracted) {
                hasInteracted = true;
                preloadCriticalResources();
            }
        }, { once: true, passive: true });
    });
    
    function preloadCriticalResources() {
        // Preload next page resources
        const nextPageLinks = document.querySelectorAll('a[href^="/"]');
        const importantLinks = Array.from(nextPageLinks).slice(0, 3);
        
        importantLinks.forEach(link => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'prefetch';
            linkElement.href = link.href;
            document.head.appendChild(linkElement);
        });
    }
    
    // Service Worker registration (if available)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').catch(function(error) {
                console.log('Service Worker registration failed:', error);
            });
        });
    }
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page Load Performance:', {
                        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                        totalTime: perfData.loadEventEnd - perfData.fetchStart
                    });
                }
            }, 0);
        });
    }
}

/**
 * Theme Utilities
 */
const ThemeUtils = {
    // Smooth scroll to element
    scrollToElement: function(selector, offset = 80) {
        const element = document.querySelector(selector);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Toggle theme (if dark mode is implemented)
    toggleTheme: function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Announce theme change to screen readers
        const message = `Switched to ${newTheme} theme`;
        this.announceToScreenReader(message);
    },
    
    // Announcement utility
    announceToScreenReader: function(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
};

// Make utilities available globally
window.ThemeUtils = ThemeUtils;

// Handle print styles
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Handle connection status
window.addEventListener('online', function() {
    document.body.classList.remove('offline');
    ThemeUtils.announceToScreenReader('Connection restored');
});

window.addEventListener('offline', function() {
    document.body.classList.add('offline');
    ThemeUtils.announceToScreenReader('Connection lost');
});