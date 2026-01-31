/**
 * Baby Shower Website - JavaScript
 * Ocean/Nautical Storybook Theme
 *
 * Features:
 * - Smooth scroll navigation
 * - Mobile menu toggle
 * - Navbar scroll behavior
 * - Back to top button
 * - Form validation and submission (Formspree integration)
 * - Scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavigation();
    initMobileMenu();
    initBackToTop();
    initFormHandling();
    initScrollAnimations();
});

/* --------------------------------------------------------------------------
   Navigation - Smooth Scroll & Active State
   -------------------------------------------------------------------------- */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // Navbar background change on scroll
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for background change
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink(sections, navLinks);

        lastScroll = currentScroll;
    });
}

/**
 * Update active navigation link based on current scroll position
 */
function updateActiveNavLink(sections, navLinks) {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* --------------------------------------------------------------------------
   Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Update aria attributes for accessibility
            const isExpanded = navLinks.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
}

/**
 * Helper function to close mobile menu
 */
function closeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
}

/* --------------------------------------------------------------------------
   Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* --------------------------------------------------------------------------
   Form Handling - RSVP Form with Formspree Integration
   -------------------------------------------------------------------------- */
function initFormHandling() {
    const form = document.getElementById('rsvp-form');
    const successMessage = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    /**
     * Handle form submission
     */
    async function handleFormSubmit(e) {
        e.preventDefault();

        // Basic client-side validation
        if (!validateForm(form)) {
            return;
        }

        // Get form data
        const formData = new FormData(form);

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
        submitBtn.disabled = true;

        try {
            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success - show success message
                form.style.display = 'none';
                successMessage.classList.add('show');

                // Scroll to success message
                successMessage.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            } else {
                // Error from Formspree
                const data = await response.json();
                throw new Error(data.error || 'Form submission failed');
            }
        } catch (error) {
            // Show error message
            console.error('Form submission error:', error);
            showFormError(form, 'Oops! Something went wrong. Please try again or contact us directly.');

            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    }

    /**
     * Validate form fields
     */
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        // Clear previous error states
        clearFormErrors(form);

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showFieldError(field, 'This field is required');
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid email address');
            }
        });

        return isValid;
    }

    /**
     * Check if email is valid
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Show error message for a field
     */
    function showFieldError(field, message) {
        field.classList.add('error');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #d9534f;
            font-size: 0.85rem;
            margin-top: 5px;
        `;

        field.parentNode.appendChild(errorDiv);
    }

    /**
     * Show general form error
     */
    function showFormError(form, message) {
        // Remove existing error
        const existingError = form.querySelector('.form-error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background: #f8d7da;
            color: #721c24;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            text-align: center;
        `;

        form.insertBefore(errorDiv, form.firstChild);
    }

    /**
     * Clear all form errors
     */
    function clearFormErrors(form) {
        const errorFields = form.querySelectorAll('.error');
        const errorMessages = form.querySelectorAll('.field-error, .form-error-message');

        errorFields.forEach(field => field.classList.remove('error'));
        errorMessages.forEach(msg => msg.remove());
    }
}

/* --------------------------------------------------------------------------
   Scroll Animations - Fade in elements on scroll
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.detail-card, .registry-card, .story-paragraph, .story-illustration'
    );

    // Create Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add initial styles and observe elements
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* --------------------------------------------------------------------------
   Utility Functions
   -------------------------------------------------------------------------- */

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait = 10, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* --------------------------------------------------------------------------
   Optional: Countdown Timer (uncomment to enable)
   -------------------------------------------------------------------------- */
/*
function initCountdown() {
    const eventDate = new Date('March 15, 2026 14:00:00').getTime();
    const countdownElement = document.getElementById('countdown');

    if (!countdownElement) return;

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = "The shower has begun!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-item"><span>${days}</span> Days</div>
            <div class="countdown-item"><span>${hours}</span> Hours</div>
            <div class="countdown-item"><span>${minutes}</span> Minutes</div>
            <div class="countdown-item"><span>${seconds}</span> Seconds</div>
        `;
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
}
*/

/* --------------------------------------------------------------------------
   Optional: Guest Book / Comments (uncomment to enable)
   -------------------------------------------------------------------------- */
/*
function initGuestBook() {
    // This would require a backend service like Firebase
    // to store and retrieve guest messages
    console.log('Guest book feature placeholder');
}
*/
