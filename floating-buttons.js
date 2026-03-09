// floating-buttons.js
(function () {
    const DISCORD_URL = 'https://discord.com/users/909063517280296961';
    const KOFI_URL = 'https://ko-fi.com/eunicecheng';
    const discordIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.11 18.1.127 18.115a19.929 19.929 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.201 13.201 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
    </svg>`;

    const kofiIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.93 0 3.5-1.57 3.5-3.5S20.43 3 18.5 3zM16 13c0 2.76-2.24 5-5 5s-5-2.24-5-5V5h10v8zm2.5-3H16V5h2.5c.83 0 1.5.67 1.5 1.5S19.33 10 18.5 10z"/>
    </svg>`;

    const html = `
    <div class="floating-buttons" role="complementary" aria-label="Quick links">
        <a href="${DISCORD_URL}" class="floating-btn floating-btn-discord" target="_blank" rel="noopener noreferrer" aria-label="Chat on Discord">
            <span class="floating-btn-label">Chat on Discord</span>
            <span class="floating-btn-icon">${discordIcon}</span>
        </a>
        <a href="${KOFI_URL}" class="floating-btn floating-btn-kofi" target="_blank" rel="noopener noreferrer" aria-label="Support on Ko-fi">
            <span class="floating-btn-label">Buy Me a Coffee</span>
            <span class="floating-btn-icon">${kofiIcon}</span>
        </a>
    </div>`;

    document.addEventListener('DOMContentLoaded', function () {
        document.body.insertAdjacentHTML('beforeend', html);
    });
})();
