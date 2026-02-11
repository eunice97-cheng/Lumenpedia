// website-map.js - Interactive website map functionality

class WebsiteMap {
    constructor() {
        this.originalWidth = 1920; // Original screenshot width
        this.isScaled = false;
        this.tooltip = null;
        this.init();
    }

    init() {
        console.log('Initializing Website Map...');

        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupMap());
        } else {
            this.setupMap();
        }
    }

    setupMap() {
        const img = document.querySelector('img[usemap]');
        const map = document.querySelector('map[name="image-map"]');

        if (!img || !map) {
            console.error('Image map elements not found');
            return;
        }

        // Scale coordinates on initial load
        this.scaleImageMap();

        // Create tooltip
        this.createTooltip();

        // Add event listeners
        this.addEventListeners();

        // Add resize observer
        this.addResizeObserver();

        console.log('Website Map initialized successfully');
    }

    scaleImageMap() {
        const img = document.querySelector('img[usemap]');
        const map = document.querySelector('map[name="image-map"]');
        const areas = map.querySelectorAll('area');

        const currentWidth = img.offsetWidth;
        const scale = currentWidth / this.originalWidth;

        areas.forEach(area => {
            const originalCoords = area.getAttribute('data-original-coords') || area.getAttribute('coords');
            const coordsArray = originalCoords.split(',').map(Number);

            // Store original coordinates if not already stored
            if (!area.getAttribute('data-original-coords')) {
                area.setAttribute('data-original-coords', originalCoords);
            }

            // Scale coordinates
            const scaledCoords = coordsArray.map(coord => Math.round(coord * scale));
            area.setAttribute('coords', scaledCoords.join(','));
        });

        this.isScaled = true;
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'website-map-tooltip';
        document.querySelector('.website-map-image-container').appendChild(this.tooltip);
    }

    showTooltip(text, x, y, area) {
        if (!this.tooltip) return;

        this.tooltip.textContent = text;

        // Remove all arrow classes first - we'll use right arrow for everything
        this.tooltip.classList.remove('arrow-left', 'arrow-up', 'arrow-down');
        this.tooltip.classList.add('arrow-right');

        const img = document.querySelector('img[usemap]');
        const imgRect = img.getBoundingClientRect();
        const tooltipWidth = 220; // Approximate tooltip width

        // Position ALL tooltips to the LEFT of cursor with RIGHT arrow
        const newX = Math.max(x - tooltipWidth - 15, 10); // Keep within image bounds
        this.tooltip.style.left = newX + 'px';
        this.tooltip.style.top = y + 'px';

        this.tooltip.classList.add('show');
    }

    hideTooltip() {
        if (this.tooltip) {
            this.tooltip.classList.remove('show');
        }
    }

    addEventListeners() {
        const areas = document.querySelectorAll('map[name="image-map"] area');
        const img = document.querySelector('img[usemap]');

        // Area hover events
        areas.forEach(area => {
            area.addEventListener('mouseenter', (e) => {
                const rect = img.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.showTooltip(area.getAttribute('title'), x, y, area);
            });

            area.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });

            area.addEventListener('mousemove', (e) => {
                if (!this.tooltip.classList.contains('show')) return;

                const rect = img.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Position ALL tooltips to the LEFT of cursor
                const tooltipWidth = 220;
                const newX = Math.max(x - tooltipWidth - 15, 10);
                this.tooltip.style.left = newX + 'px';
                this.tooltip.style.top = y + 'px';
            });

            area.addEventListener('click', (e) => {
                e.preventDefault();
                const alt = area.getAttribute('alt');
                const title = area.getAttribute('title');
                this.handleAreaClick(alt, title);
            });

            // Add keyboard navigation support
            area.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const alt = area.getAttribute('alt');
                    const title = area.getAttribute('title');
                    this.handleAreaClick(alt, title);
                }
            });

            // Add focus and blur for accessibility
            area.addEventListener('focus', (e) => {
                const rect = img.getBoundingClientRect();
                // Use area center coordinates for focus
                const coords = area.getAttribute('coords').split(',').map(Number);
                let centerX, centerY;

                if (coords.length === 4) { // Rectangle
                    centerX = (coords[0] + coords[2]) / 2;
                    centerY = (coords[1] + coords[3]) / 2;
                } else { // Other shapes, use first coordinates
                    centerX = coords[0];
                    centerY = coords[1];
                }

                this.showTooltip(area.getAttribute('title'), centerX, centerY, area);
            });

            area.addEventListener('blur', () => {
                this.hideTooltip();
            });
        });

        // Image load event
        img.addEventListener('load', () => {
            this.scaleImageMap();
        });

        // Window resize event with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.scaleImageMap();
            }, 250);
        });

        // Click outside to hide tooltip
        document.addEventListener('click', (e) => {
            if (!e.target.closest('area') && !e.target.closest('.website-map-tooltip')) {
                this.hideTooltip();
            }
        });
    }

    addResizeObserver() {
        const img = document.querySelector('img[usemap]');
        if ('ResizeObserver' in window) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    if (entry.contentRect) {
                        this.scaleImageMap();
                    }
                }
            });

            resizeObserver.observe(img);
        }
    }

    handleAreaClick(alt, title) {
        console.log(`Area clicked: ${alt} - ${title}`);
        this.showPopup(alt, title);
        this.highlightArea(alt);
    }

    showPopup(alt, title) {
    const popup = document.getElementById('map-popup');
    const popupTitle = popup.querySelector('.popup-title');
    const popupBody = popup.querySelector('.popup-body');
    
    popupTitle.textContent = title;
    popupBody.innerHTML = this.getPopupContent(alt, title);
    popup.classList.add('active');
    
    // Close button event
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.onclick = () => {
        popup.classList.remove('active');
    };
    
    // Close on background click
    popup.onclick = (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    };
}
    getPopupContent(alt, title) {
    // Custom content for each area - FIXED KEYS to match actual alt attributes
    const contentMap = {
        'language': `
            <p><strong>Function:</strong> Change website language.</p>
            <img src="Images/web-language.png" alt="Language Settings" class="popup-image">
            <p>Switch between available languages - Currently English and Russian are available.</p>
        `,
        'setting': `
            <p><strong>Function:</strong> Website and account settings.</p>
            <img src="Images/web-setting.png" alt="Settings" class="popup-image">
            <p>Adjust sound volume and animation setting.</p>
        `,
        'online counter': `
            <p><strong>Function:</strong> Online Number Counter.</p>
            <p>Display in real time how many online players in game.</p>
        `,
        'currency : lumen': `
            <p><strong>Function:</strong> A currency for purchasing item available in Web Shop or for Web Lotto.</p>
            <br>
            <p>Display your current available Lumen.</p>
            <br>
            <p>Lumen Points - 2.5 Lumen per online hour, 25 per vote (every 12 hrs) and Double voting points every weekends.</p>
        `,
        'currency : web gold': `
            <p><strong>Function:</strong> A currency for purchasing certain items available in Web Shop, for certain Web Lotto and items on Divine Trader. You can also purchase Blood Lumen with this currency from the Market.</p>
            <br>
            <p>Display your current available Lumen.</p>
            <br>
            <p>This Web Gold is the same currency as your in-game gold. 1 in-game gold = 1 web-gold</p>
            <br>
            <p>To exchange your in-game gold to web-gold, send in-game via in-game courier to deposit1, deposit2, up to deposit9 (pick one)</p>
            <br>
            <p>To exchange web-gold to in-game gold, purchase Gold Leaf from the Web Shop (which will be automatically courier to you in-game). Collect them from courier and sell them to npc for the exact amount of gold.</p>
        `,
        'currency : blood lumen': `
            <p><strong>Function:</strong> A currency for purchasing web-gold from Market. You can also send them to in-game as Jaden(s) for purchasing Jaden Mall items or transfer them to another account as Blood Lumen.</p>
            <br>
            <p>Display your current available Blood Lumen.</p>
            <br>
            <p>You can also transfer in-game Jaden(s) to Blood Lumen by purchasing Blood Lumen (under Misc. in your Jaden Mall)</p>
            <br>
            <p>The converstion rate from Blood Lumen to in-game Jaden is 1 : 1 and vise versa.</p>
            <br>
            <p>Blood Lumen & Jaden can be obtain via Donation or Market.</p>
        `,
        'account id': `
            <p><strong>Function:</strong> Display your current logged in account ID</p>
        `,
        'vip level': `
            <p><strong>Function:</strong> Display your current VIP Level</p>
            <br>
            <p>Ranged from VIP 0 to VIP 4 (max) depending on how much donation you made at the current month</p>
        `,
        'logout button': `
            <p><strong>Function:</strong> Click to logout.</p>
        `,
        'home button': `
            <p><strong>Function:</strong> Navigate back to Home Screen.</p>
        `,
        'link to download page': `
            <p><strong>Function:</strong> Navigate to the Download page where you can download Lumen Clients (EN or RU).</p>
            <img src="Images/web-download.png" alt="Download Client(s)" class="popup-image">
        `,
        'link to guides page': `
            <p><strong>Function:</strong> Navigate to the Guides page where you can view some guides available there.</p>
            <img src="Images/web-guide.png" alt="Guides" class="popup-image">
        `,
        'link to hall of fame page': `
            <p><strong>Function:</strong> Navigate to the Hall of Fame page where you can view the names of our heroes and their achievements.</p>
            <img src="Images/web-hof.png" alt="Hall of Fame" class="popup-image">
            <p>Check out what's Available because it is time to put your name amongst other heroes.</p>
        `,
        'link to updates page': `
            <p><strong>Function:</strong> Navigate to the Updates page to find out what's new.</p>
            <img src="Images/web-updates.png" alt="Updates" class="popup-image">
            <p>Find out the latest patch version, changes and updates.</p>
        `,
        'link to rules page': `
            <p><strong>Function:</strong> Navigate to the Rules page to understand the rules dictated by the Ancient Ones and the divine punishments that await those who dare to broke the taboos.</p>
            <img src="Images/web-rules.png" alt="Rules" class="popup-image">
        `,
        'link to yasho invasion mini game': `
            <p><strong>Function:</strong> Navigate to the Yasho Invasion for some fun.</p>
            <img src="Images/web-yasho-invasion.png" alt="Yasho Invasion" class="popup-image">
        `,
        'link to voting page': `
            <p><strong>Function:</strong> Navigate to the Voting page to vote and collect your Lumens.</p>
            <img src="Images/web-vote.png" alt="Yasho Invasion" class="popup-image">
        `,
        'link to web shop': `
            <p><strong>Function:</strong> Navigate to the Web Shop and check out the merchandise.</p>
            <img src="Images/web-shop.png" alt="Web Shop" class="popup-image">
        `,
        'link to account stash': `
            <p><strong>Function:</strong> Navigate to the Account Stash and check out what you hoarded up from rewards etc.</p>
            <img src="Images/web-stash.png" alt="Web Stash" class="popup-image">
        `,
        'link to rewards page': `
            <p><strong>Function:</strong> Navigate to the Rewards page and check out what you are entitled to collect from Online Hours, Level Up etc.</p>
            <img src="Images/web-rewards.png" alt="Web Rewards" class="popup-image">
        `,
        'link to vip page': `
            <p><strong>Function:</strong> Navigate to the VIP page and check out how VIP system works and how to be one yourself.</p>
            <img src="Images/web-vip.png" alt="Web VIP" class="popup-image">
        `,
        'link to donation page': `
            <p><strong>Function:</strong> Navigate to the Donation page and check out how you can support us.</p>
            <img src="Images/web-donation.png" alt="Web Donation" class="popup-image">
        `,
        'link to web lotto': `
            <p><strong>Function:</strong> Navigate to the Lotteries page and test your luck.</p>
            <img src="Images/web-lotto.png" alt="Web Lotto" class="popup-image">
        `,
        'link to divine trader shop': `
            <p><strong>Function:</strong> Navigate to the Divine Trader Shop and check out what treasures he has in stock.</p>
            <img src="Images/web-divine-trader.png" alt="Web Divine Trader" class="popup-image">
        `,
        'link to market': `
            <p><strong>Function:</strong> Navigate to the Market page and check out the rate of buy/sell of Blood Lumen.</p>
            <img src="Images/web-market.png" alt="Web Market" class="popup-image">
        `,
        'link to armory': `
            <p><strong>Function:</strong> Navigate to the Armory page try out the wonderful functions such as Meditation and Vending on web. You can also check inventory from web to make sure you have enough potions to last until you are back in front of your PC.</p>
            <img src="Images/web-the-armory.png" alt="Web The Armory" class="popup-image">
        `,
        'link to leaderboard page': `
            <p><strong>Function:</strong> Navigate to the Leaderboard page to see your PvP standing.</p>
            <img src="Images/web-leaderboards.png" alt="Web Leaderboard" class="popup-image">
        `,
        'link to sponsor page': `
            <p><strong>Function:</strong> Navigate to the Sponsor page and drop some double exp, double drop rate or double gold for the server.</p>
            <img src="Images/web-sponsor.png" alt="Web Sponsor" class="popup-image">
        `,
        'account id display': `
            <p><strong>Function:</strong> Display your account ID.</p>
        `,
        'character account id': `
            <p><strong>Function:</strong> Display your account ID.</p>
        `,
        'cultivation level': `
            <p><strong>Function:</strong> Display your Cultivation Level.</p>
        `,
        'total online hours': `
            <p><strong>Function:</strong> Display your total online hours.</p>
        `,
        'total kills': `
            <p><strong>Function:</strong> Display your total kills in PvP.</p>
        `,
        'total deaths': `
            <p><strong>Function:</strong> Display your total deaths in PvP.</p>
        `,
        'k/d ratio': `
            <p><strong>Function:</strong> Display your Ratio of Kill/Deaths in PvP.</p>
        `,
        'discord avatar': `
            <p><strong>Function:</strong> Your Discord avatar display.</p>
        `,
        'cultivation level display': `
            <p><strong>Function:</strong> Display your current cultivation level.</p>
        `,
        'customize orb appearance': `
            <p><strong>Function:</strong> Customize the appearance of your cultivation orb.</p>
        `,
        'customize orb border': `
            <p><strong>Function:</strong> Customize the border of your cultivation orb.</p>
        `,
        'exp to next cultivation level': `
            <p><strong>Function:</strong> Shows the experience needed to reach the next cultivation level.</p>
        `,
        'current cultivation rank and bonus': `
            <p><strong>Function:</strong> Displays your current cultivation rank and associated bonuses.</p>
        `,
        'reset password button': `
            <p><strong>Function:</strong> Button to reset your account password.</p>
        `,
        'social media buttons tab': `
            <p><strong>Function:</strong> Tab containing social media buttons and links.</p>
        `,
        'toggle view/hide side tab': `
            <p><strong>Function:</strong> Toggle to show or hide the side tab.</p>
        `,
        'connect to discord': `
            <p><strong>Function:</strong> Connect your account to Discord.</p>
        `,
        'view website quests': `
            <p><strong>Function:</strong> View available website quests.</p>
        `,
        'view events': `
            <p><strong>Function:</strong> View current and upcoming events.</p>
        `,
        'view offers (coming soon)': `
            <p><strong>Function:</strong> View special offers (feature coming soon).</p>
        `
    };

    // Find matching content - convert to lowercase and trim for better matching
    const key = alt.toLowerCase().trim();
    
    // Debug log to see what key is being searched
    console.log('Searching for popup content with key:', key);
    
    if (contentMap[key]) {
        return contentMap[key];
    } else {
        // Fallback content for missing entries
        return `
            <p><strong>Function:</strong> ${title}</p>
            <p>Detailed information about this feature will be added soon.</p>
            <p><em>Area: ${alt}</em></p>
        `;
    }
}

    showAreaInfo(alt, title) {
        // Create a simple modal or use your existing modal system
        const info = `${title}\n\nThis area represents: ${alt}`;

        // Using browser alert for simplicity - replace with your modal system
        alert(info);
    }

    highlightArea(alt) {
        // Add visual feedback for the clicked area
        const areas = document.querySelectorAll('map[name="image-map"] area');
        areas.forEach(area => {
            area.style.outline = area.getAttribute('alt') === alt ? '2px solid #14b8a6' : 'none';
        });

        // Remove highlight after 2 seconds
        setTimeout(() => {
            areas.forEach(area => {
                area.style.outline = 'none';
            });
        }, 2000);
    }

    // Public method to manually refresh the map scaling
    refresh() {
        this.scaleImageMap();
    }

    // Public method to get map statistics
    getStats() {
        const areas = document.querySelectorAll('map[name="image-map"] area');
        return {
            totalAreas: areas.length,
            isScaled: this.isScaled,
            currentWidth: document.querySelector('img[usemap]')?.offsetWidth || 0
        };
    }
}

// Initialize the website map when script loads
document.addEventListener('DOMContentLoaded', () => {
    window.websiteMap = new WebsiteMap();
});

// Additional initialization for the map page
document.addEventListener('DOMContentLoaded', function () {
    console.log('Website Map page loaded');

    // Add loading state management
    const img = document.querySelector('.website-map-image');
    if (img) {
        img.addEventListener('load', function () {
            console.log('Website map image loaded successfully');
        });

        img.addEventListener('error', function () {
            console.error('Failed to load website map image');
            // You could show a fallback message here
        });
    }

    // Initialize theme toggle if needed
    if (typeof initThemeToggle === 'function') {
        initThemeToggle();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebsiteMap;
}