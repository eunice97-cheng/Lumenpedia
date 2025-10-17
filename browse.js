// browse.js - JavaScript for browse.html functionality

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get current theme from localStorage or system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the current theme
    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }
    });
}

function initAlphabetNavigation() {
    const alphabetLinks = document.querySelectorAll('.alphabet-link');
    const alphabetNav = document.getElementById('alphabet-nav');
    
    // Calculate the total height of sticky headers
    function getHeaderOffset() {
        const mainHeader = document.querySelector('.header');
        const alphabetNav = document.getElementById('alphabet-nav');
        return (mainHeader?.offsetHeight || 0) + (alphabetNav?.offsetHeight || 0) + 20; // +20 for extra spacing
    }
    
    alphabetLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            alphabetLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                const offset = getHeaderOffset();
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active letter on scroll
    if (alphabetLinks.length > 0) {
        window.addEventListener('scroll', () => {
            const offset = getHeaderOffset();
            const scrollPosition = window.scrollY + offset;
            
            let currentSection = '';
            
            document.querySelectorAll('.guide-section').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            alphabetLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('browse-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterGuides(searchTerm);
            
            // When searching, remove active states from alphabet links
            if (searchTerm) {
                const alphabetLinks = document.querySelectorAll('.alphabet-link');
                alphabetLinks.forEach(l => l.classList.remove('active'));
            }
        });
    }
}

// Filter guides based on search term
function filterGuides(searchTerm) {
    const guideCards = document.querySelectorAll('.guide-card');
    const guideSections = document.querySelectorAll('.guide-section');
    
    let hasVisibleResults = false;
    let sectionVisibility = {};

    // First, filter individual guide cards
    guideCards.forEach(card => {
        const title = card.querySelector('.guide-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.guide-excerpt').textContent.toLowerCase();
        
        if (searchTerm === '' || title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            card.style.display = 'block';
            // Mark the parent section as having visible content
            const section = card.closest('.guide-section');
            if (section) {
                sectionVisibility[section.id] = true;
            }
        } else {
            card.style.display = 'none';
        }
    });

    // Then, show/hide sections based on whether they have visible content
    guideSections.forEach(section => {
        const sectionId = section.id;
        const hasVisibleCards = sectionVisibility[sectionId] || searchTerm === '';
        
        if (hasVisibleCards) {
            section.style.display = 'block';
            hasVisibleResults = true;
            
            // Update guide count for visible cards
            if (searchTerm !== '') {
                updateVisibleGuideCount(section);
            } else {
                resetGuideCount(section);
            }
        } else {
            section.style.display = 'none';
        }
    });

    // Show no results message if needed
    showNoResultsMessage(!hasVisibleResults && searchTerm !== '');
}

// Update visible guide count for a section during search
function updateVisibleGuideCount(section) {
    const visibleCards = section.querySelectorAll('.guide-card[style="display: block"]');
    const guideCount = section.querySelector('.guide-count');
    
    if (guideCount && visibleCards.length >= 0) {
        guideCount.textContent = `${visibleCards.length} guide${visibleCards.length !== 1 ? 's' : ''}`;
    }
}

// Reset guide count to original value
function resetGuideCount(section) {
    const guideCount = section.querySelector('.guide-count');
    const originalCount = section.getAttribute('data-original-count');
    
    if (guideCount && originalCount) {
        guideCount.textContent = originalCount;
    }
}

// Show/hide no results message
function showNoResultsMessage(show) {
    let noResultsMsg = document.getElementById('no-results-message');
    
    if (show && !noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'no-results-message';
        noResultsMsg.className = 'empty-state';
        noResultsMsg.innerHTML = `
            <p>No guides found matching your search.</p>
            <button class="btn btn-secondary" id="clear-search">Clear Search</button>
        `;
        
        const guidesContainer = document.querySelector('.guides-container');
        guidesContainer.appendChild(noResultsMsg);

        // Add clear search functionality
        document.getElementById('clear-search').addEventListener('click', function() {
            const searchInput = document.getElementById('browse-search-input');
            searchInput.value = '';
            filterGuides('');
        });
    } else if (!show && noResultsMsg) {
        noResultsMsg.remove();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initAlphabetNavigation();
    initSearch();

    // Store original guide counts on page load
    document.querySelectorAll('.guide-section').forEach(section => {
        const guideCount = section.querySelector('.guide-count');
        if (guideCount) {
            section.setAttribute('data-original-count', guideCount.textContent);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const searchInput = document.getElementById('browse-search-input');
        if (e.key === 'Escape' && searchInput && searchInput.value) {
            searchInput.value = '';
            filterGuides('');
            searchInput.focus();
        }
    });
});