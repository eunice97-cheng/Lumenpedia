// Hero Assistant Interactive Behavior for Server Columns
document.addEventListener('DOMContentLoaded', function() {
    const serverComparison = document.querySelector('.server-comparison');
    const classicCards = document.querySelectorAll('[data-assistant="classic"]');
    const mainCards = document.querySelectorAll('[data-assistant="main"]');
    
    let currentState = 'normal'; // 'normal', 'left-expanded', 'right-expanded'

    // Function to reset to normal state
    function resetToNormal() {
        serverComparison.className = 'server-comparison';
        currentState = 'normal';
        
        // Remove grayed-out states from all assistants
        classicCards.forEach(card => card.classList.remove('grayed-out'));
        mainCards.forEach(card => card.classList.remove('grayed-out'));
        
        // Restore animations
        const classicImgs = document.querySelectorAll('#classic-img, [data-assistant="classic"] .assistant-img');
        const mainImgs = document.querySelectorAll('#main-img, [data-assistant="main"] .assistant-img');
        
        classicImgs.forEach(img => {
            img.style.animation = 'float 6s ease-in-out infinite';
            img.style.animationDelay = '';
        });
        
        mainImgs.forEach(img => {
            img.style.animation = 'float 6s ease-in-out infinite';
            img.style.animationDelay = '1s';
        });
    }

    // Function to expand left (Classic) server
    function expandLeft() {
        serverComparison.className = 'server-comparison left-expanded';
        currentState = 'left-expanded';
        
        // Gray out main assistants
        mainCards.forEach(card => card.classList.add('grayed-out'));
        classicCards.forEach(card => card.classList.remove('grayed-out'));
        
        // Stop animations for grayed out assistants
        const mainImgs = document.querySelectorAll('#main-img, [data-assistant="main"] .assistant-img');
        mainImgs.forEach(img => {
            img.style.animation = 'none';
        });
    }

    // Function to expand right (Main) server
    function expandRight() {
        serverComparison.className = 'server-comparison right-expanded';
        currentState = 'right-expanded';
        
        // Gray out classic assistants
        classicCards.forEach(card => card.classList.add('grayed-out'));
        mainCards.forEach(card => card.classList.remove('grayed-out'));
        
        // Stop animations for grayed out assistants
        const classicImgs = document.querySelectorAll('#classic-img, [data-assistant="classic"] .assistant-img');
        classicImgs.forEach(img => {
            img.style.animation = 'none';
        });
    }

    // Add click handlers to ALL classic assistants
    classicCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (currentState === 'normal' || currentState === 'right-expanded') {
                // Expand left, hide right
                expandLeft();
            } else if (currentState === 'left-expanded') {
                // Return to normal
                resetToNormal();
            }
        });
    });

    // Add click handlers to ALL main assistants
    mainCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (currentState === 'normal' || currentState === 'left-expanded') {
                // Expand right, hide left
                expandRight();
            } else if (currentState === 'right-expanded') {
                // Return to normal
                resetToNormal();
            }
        });
    });

    // Keyboard support for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && (currentState === 'left-expanded' || currentState === 'right-expanded')) {
            resetToNormal();
        }
    });

    // Click outside to return to normal
    document.addEventListener('click', function(e) {
        if ((currentState === 'left-expanded' || currentState === 'right-expanded') && 
            !e.target.closest('.assistant-card') && 
            !e.target.closest('.server-card')) {
            resetToNormal();
        }
    });

    // Handle window resize - reset if layout changes significantly
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (currentState === 'left-expanded' || currentState === 'right-expanded') {
                resetToNormal();
            }
        }, 250);
    });

    // Initialize normal view
    resetToNormal();
});