// hero-assistant.js - Independent functionality for hero with assistants component

class HeroAssistant {
    constructor() {
        this.assistants = [];
        this.init();
    }

    init() {
        this.handleImageLoading();
        this.setupClickHandlers();
    }

    // Handle image loading with fallbacks
    handleImageLoading() {
        const assistantImages = document.querySelectorAll('.assistant-img');
        
        assistantImages.forEach(img => {
            const parent = img.closest('.hero-assistant');
            
            // Check if image loads successfully
            img.addEventListener('load', function() {
                parent.classList.add('image-loaded');
            });
            
            // Handle image loading errors with fallback
            img.addEventListener('error', function() {
                parent.classList.remove('image-loaded');
                console.warn('Assistant image failed to load:', img.src);
                // Optional: Set a default placeholder image
                // img.src = 'Image/placeholder-assistant.png';
            });
            
            // Check if image is already loaded (cached)
            if (img.complete) {
                parent.classList.add('image-loaded');
            }
        });
    }

    // Setup click handlers for assistant cards
    setupClickHandlers() {
        const assistantCards = document.querySelectorAll('.assistant-card');
        
        assistantCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Let the default link behavior work, but also fire custom event
                const assistantName = card.querySelector('.assistant-name').textContent;
                const assistantImage = card.querySelector('.assistant-img').src;
                
                // Create custom event for assistant click
                const assistantClickEvent = new CustomEvent('assistantClick', {
                    detail: {
                        name: assistantName,
                        image: assistantImage,
                        element: card
                    }
                });
                
                // Dispatch the event
                document.dispatchEvent(assistantClickEvent);
                
                console.log(`Assistant clicked: ${assistantName}`);
            });
        });
    }

    // Method to set assistant links programmatically
    setAssistantLink(assistantSide, url) {
        const assistant = document.querySelector(`.hero-assistant.${assistantSide} .assistant-card`);
        if (assistant) {
            assistant.setAttribute('href', url);
        }
    }

    // Method to update assistant information
    updateAssistant(assistantSide, options = {}) {
        const assistant = document.querySelector(`.hero-assistant.${assistantSide}`);
        if (!assistant) return;

        const { name, image, link } = options;

        if (name) {
            const nameElement = assistant.querySelector('.assistant-name');
            if (nameElement) nameElement.textContent = name;
        }

        if (image) {
            const imgElement = assistant.querySelector('.assistant-img');
            if (imgElement) {
                imgElement.src = image;
                imgElement.alt = name || 'Assistant';
            }
        }

        if (link) {
            this.setAssistantLink(assistantSide, link);
        }
    }

    // Method to get assistant information
    getAssistantInfo(assistantSide) {
        const assistant = document.querySelector(`.hero-assistant.${assistantSide}`);
        if (!assistant) return null;

        const card = assistant.querySelector('.assistant-card');
        const nameElement = assistant.querySelector('.assistant-name');
        const imgElement = assistant.querySelector('.assistant-img');

        return {
            name: nameElement?.textContent || '',
            image: imgElement?.src || '',
            link: card?.getAttribute('href') || ''
        };
    }

    // Method to update hero content
    updateHeroContent(title, description) {
        const content = document.querySelector('.hero-assistants-content');
        if (content) {
            const titleElement = content.querySelector('h1');
            const descElement = content.querySelector('p');
            
            if (titleElement && title) titleElement.textContent = title;
            if (descElement && description) descElement.textContent = description;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.heroAssistant = new HeroAssistant();
    
    // Example usage: Listen for assistant clicks
    document.addEventListener('assistantClick', function(e) {
        const { name, image, element } = e.detail;
        console.log(`Assistant "${name}" was clicked!`);
        
        // You can add your custom logic here
        // For example: track analytics, show loading state, etc.
    });
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroAssistant;
}