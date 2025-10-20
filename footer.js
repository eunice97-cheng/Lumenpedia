// Lumenpedia Footer JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize footer functionality
    initFooter();
});

function initFooter() {
    // Newsletter form handling - currently disabled
    // const newsletterForm = document.getElementById('newsletterForm');
    // if (newsletterForm) {
    //     newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    // }
    
    // External link handling
    const externalLinks = document.querySelectorAll('.footer-link[target="_blank"]');
    externalLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('.footer-link[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Initialize tooltips for social links
    initSocialTooltips();
    
    // Add animation on scroll
    initScrollAnimation();
}
// Newsletter functionality is currently disabled
// function handleNewsletterSubmit(e) {
//     e.preventDefault();
    
//     const form = e.target;
//     const emailInput = form.querySelector('.newsletter-input');
//     const messageDiv = document.getElementById('newsletterMessage');
    
//     // Simple email validation
//     const email = emailInput.value.trim();
//     if (!isValidEmail(email)) {
//         showMessage(messageDiv, 'Please enter a valid email address.', 'error');
//         return;
//     }
    
//     // Simulate form submission
//     showMessage(messageDiv, 'Submitting...', 'success');
    
//     // In a real implementation, you would send this to your server
//     setTimeout(() => {
//         showMessage(messageDiv, 'Thank you for subscribing to our newsletter!', 'success');
//         form.reset();
        
//         // Hide message after 5 seconds
//         setTimeout(() => {
//             messageDiv.style.display = 'none';
//         }, 5000);
//     }, 1000);
// }

// function isValidEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

// function showMessage(messageDiv, text, type) {
//     messageDiv.textContent = text;
//     messageDiv.className = 'newsletter-message ' + type;
//     messageDiv.style.display = 'block';
// }

function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

function initSocialTooltips() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        const platform = link.getAttribute('aria-label');
        
        // Create tooltip element
        const tooltip = document.createElement('span');
        tooltip.className = 'social-tooltip';
        tooltip.textContent = platform;
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-foreground);
            color: var(--color-background);
            padding: 0.25rem 0.5rem;
            border-radius: var(--radius);
            font-size: 0.75rem;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s ease;
            pointer-events: none;
            z-index: 1000;
        `;
        
        link.style.position = 'relative';
        link.appendChild(tooltip);
        
        // Show tooltip on hover
        link.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            tooltip.style.bottom = 'calc(100% + 5px)';
        });
        
        link.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
            tooltip.style.bottom = '100%';
        });
    });
}

function initScrollAnimation() {
    // Add intersection observer for footer elements
    const footerSections = document.querySelectorAll('.footer-section, .footer-brand');
    // .footer-newsletter, is currently removed

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    footerSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
}

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFooter,
        // handleNewsletterSubmit,
        // isValidEmail
        // Disabled newsletter related exports
    };
}
