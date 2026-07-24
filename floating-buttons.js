// floating-buttons.js
(function () {
    const DISCORD_URL = 'https://discord.gg/sypZjUwPav';
    const KOFI_URL = 'https://ko-fi.com/eunicecheng';
    const MAIN_DOMAIN_URL = 'https://arcanastudiolabs.com';
    const POKER_URL = 'https://basement-poker.arcanastudiolabs.com/';
    const BLACKJACK_URL = 'https://basement-poker.arcanastudiolabs.com/blackjack';
    const POKER_IMAGE_URL = 'Images/poker.png';
    const BLACKJACK_LOGO_URL = 'Images/asl-blackjack-logo.png';
    const BLACKJACK_PROMO_URL = 'Images/asl-blackjack-promo.png';
    const POKER_AD_STORAGE_KEY = 'lumenpedia_casino_ad_minimized';
    const LEGACY_POKER_AD_STORAGE_KEY = 'lumenpedia_poker_ad_hidden';
    const discordIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.029 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.334-.955 2.419-2.157 2.419z"/>
    </svg>`;

    const kofiIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 8.5h8.5v5.25A4.25 4.25 0 0 1 9.25 18H9a4 4 0 0 1-4-4V8.5Z"/>
        <path d="M13.5 10h1.25a2.25 2.25 0 1 1 0 4.5H13.5"/>
        <path d="M8.15 11.25c.3-.3.79-.3 1.09 0l.41.41.41-.41c.3-.3.79-.3 1.09 0s.3.79 0 1.09L9.65 13.84l-1.5-1.5c-.3-.3-.3-.79 0-1.09Z" fill="currentColor" stroke="none"/>
        <path d="M7.2 5.25c0 .7.38 1.07.8 1.48.45.43.9.88.9 1.77"/>
        <path d="M10.35 5.25c0 .7.38 1.07.8 1.48.45.43.9.88.9 1.77"/>
    </svg>`;
    const mainDomainIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M12 3.2 3.5 9.8v1.7h1.9v8.3h5.5v-5.3h2.2v5.3h5.5v-8.3h1.9V9.8L12 3.2zm5 14.8h-2.7v-5.3H9.7v5.3H7V10.6l5-3.9 5 3.9V18z"/>
    </svg>`;
    const minimizeIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
        <path d="M6 12h12"/>
    </svg>`;
    const expandIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 12h12"/>
        <path d="M12 6v12"/>
    </svg>`;

    const sidebarHtml = `
    <div class="floating-sidebar" role="complementary" aria-label="Quick links">
    <div class="floating-ad-wrap" id="floating-poker-ad">
        <button type="button" class="floating-ad-btn" aria-label="Open Poker and Blackjack promo" aria-haspopup="dialog" aria-controls="floating-casino-modal">
            <span class="floating-ad-icon">
                <img src="${POKER_IMAGE_URL}" alt="" class="floating-ad-image">
            </span>
            <span class="floating-ad-copy">
                <span class="floating-ad-eyebrow">Sponsored</span>
                <span class="floating-ad-title">Poker + Blackjack</span>
            </span>
        </button>
        <button type="button" class="floating-ad-toggle" aria-label="Minimize casino promo" aria-expanded="true">
            ${minimizeIcon}
        </button>
    </div>
    <div class="floating-buttons" aria-label="Quick links">
        <a href="${MAIN_DOMAIN_URL}" class="floating-btn floating-btn-main-domain" target="_blank" rel="noopener noreferrer" aria-label="Visit Arcana Studio Labs">
            <span class="floating-btn-label">Visit Main Site</span>
            <span class="floating-btn-icon">${mainDomainIcon}</span>
        </a>
        <a href="${DISCORD_URL}" class="floating-btn floating-btn-discord" target="_blank" rel="noopener noreferrer" aria-label="Join Discord">
            <span class="floating-btn-label">Join Discord</span>
            <span class="floating-btn-icon">${discordIcon}</span>
        </a>
        <a href="${KOFI_URL}" class="floating-btn floating-btn-kofi" target="_blank" rel="noopener noreferrer" aria-label="Support on Ko-fi">
            <span class="floating-btn-label">Buy Me a Coffee</span>
            <span class="floating-btn-icon">${kofiIcon}</span>
        </a>
    </div>
    </div>
    <div class="casino-promo-modal" id="floating-casino-modal" role="dialog" aria-modal="true" aria-labelledby="casinoPromoTitle" hidden>
        <div class="casino-promo-backdrop" data-casino-promo-close></div>
        <div class="casino-promo-dialog" role="document">
            <button type="button" class="casino-promo-close" aria-label="Close casino promo" data-casino-promo-close>&times;</button>
            <div class="casino-promo-art">
                <img src="${BLACKJACK_PROMO_URL}" alt="ASL BlackJack Lounge now open">
            </div>
            <div class="casino-promo-copy">
                <div class="casino-promo-kicker">Arcana Casino Lounges</div>
                <h2 id="casinoPromoTitle">Poker is back. Blackjack is now open.</h2>
                <p>
                    Take a break from Lumenpedia and enter the shared ASL lounge account system.
                    Play Basement Poker, or step into the new ASL BlackJack Lounge expansion.
                </p>
                <div class="casino-promo-room-list">
                    <a href="${BLACKJACK_URL}" class="casino-promo-room is-blackjack" target="_blank" rel="noopener noreferrer">
                        <span class="casino-room-mark">
                            <img src="${BLACKJACK_LOGO_URL}" alt="">
                        </span>
                        <span>
                            <strong>ASL BlackJack Lounge</strong>
                            <small>New table expansion</small>
                        </span>
                    </a>
                    <a href="${POKER_URL}" class="casino-promo-room is-poker" target="_blank" rel="noopener noreferrer">
                        <span class="casino-room-mark">
                            <img src="${POKER_IMAGE_URL}" alt="">
                        </span>
                        <span>
                            <strong>ASL Basement Poker</strong>
                            <small>Multiplayer tables live</small>
                        </span>
                    </a>
                </div>
                <div class="casino-promo-actions">
                    <a href="${BLACKJACK_URL}" class="casino-promo-primary" target="_blank" rel="noopener noreferrer">Enter Blackjack</a>
                    <a href="${POKER_URL}" class="casino-promo-secondary" target="_blank" rel="noopener noreferrer">Play Poker</a>
                </div>
            </div>
        </div>
    </div>`;

    document.addEventListener('DOMContentLoaded', function () {
        const isPokerAdMinimized = (function () {
            try {
                return localStorage.getItem(POKER_AD_STORAGE_KEY) === '1' ||
                    localStorage.getItem(LEGACY_POKER_AD_STORAGE_KEY) === '1';
            } catch (e) {
                return false;
            }
        })();

        document.body.insertAdjacentHTML('beforeend', sidebarHtml);

        const ad = document.getElementById('floating-poker-ad');
        const adButton = document.querySelector('.floating-ad-btn');
        const toggleButton = document.querySelector('.floating-ad-toggle');
        const modal = document.getElementById('floating-casino-modal');
        const closeButtons = document.querySelectorAll('[data-casino-promo-close]');

        function setPokerAdMinimized(minimized) {
            if (!ad || !toggleButton) {
                return;
            }

            ad.classList.toggle('is-minimized', minimized);
            toggleButton.setAttribute('aria-expanded', minimized ? 'false' : 'true');
            toggleButton.setAttribute('aria-label', minimized ? 'Expand casino promo' : 'Minimize casino promo');
            toggleButton.innerHTML = minimized ? expandIcon : minimizeIcon;

            try {
                localStorage.setItem(POKER_AD_STORAGE_KEY, minimized ? '1' : '0');
                localStorage.removeItem(LEGACY_POKER_AD_STORAGE_KEY);
            } catch (e) {}
        }

        function openCasinoPromo() {
            if (!modal) {
                window.open(BLACKJACK_URL, '_blank', 'noopener');
                return;
            }

            modal.hidden = false;
            document.body.classList.add('casino-promo-open');

            const closeButton = modal.querySelector('.casino-promo-close');
            if (closeButton) {
                closeButton.focus();
            }
        }

        function closeCasinoPromo() {
            if (!modal) {
                return;
            }

            modal.hidden = true;
            document.body.classList.remove('casino-promo-open');

            if (adButton) {
                adButton.focus();
            }
        }

        if (adButton) {
            adButton.addEventListener('click', openCasinoPromo);
        }

        closeButtons.forEach(function (button) {
            button.addEventListener('click', closeCasinoPromo);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal && !modal.hidden) {
                closeCasinoPromo();
            }
        });

        if (toggleButton) {
            toggleButton.addEventListener('click', function () {
                setPokerAdMinimized(!ad.classList.contains('is-minimized'));
            });
        }

        setPokerAdMinimized(isPokerAdMinimized);
    });
})();
