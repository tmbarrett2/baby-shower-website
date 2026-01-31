/**
 * Baby Barrett - Minimal Site JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initMobileMenu();
    initForm();
});

// Navigation scroll effect
function initNav() {
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                closeMobileMenu();
            }
        });
    });
}

// Mobile menu
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            links.classList.toggle('active');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMobileMenu();
        });
    }
}

function closeMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
        toggle.classList.remove('active');
        links.classList.remove('active');
    }
}

// Form handling
function initForm() {
    const form = document.getElementById('rsvp-form');
    const success = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = form.querySelector('.btn');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.style.display = 'none';
                    success.classList.add('show');
                } else {
                    throw new Error('Failed');
                }
            } catch (err) {
                btn.textContent = 'Error - Try Again';
                btn.disabled = false;
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            }
        });
    }
}
