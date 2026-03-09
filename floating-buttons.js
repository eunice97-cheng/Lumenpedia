// floating-buttons.js
(function () {
    const DISCORD_URL = 'https://discord.com/users/909063517280296961';
    const PAYPAL_URL = 'https://www.paypal.com/donate?business=eunice97.cheng%40gmail.com&currency_code=USD';

    const discordIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.11 18.1.127 18.115a19.929 19.929 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.201 13.201 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
    </svg>`;

    const paypalIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 4.643-5.813 4.643h-2.19a.441.441 0 0 0-.437.374l-1.12 7.106-.317 2.003h4.606a.641.641 0 0 0 .633-.54l.026-.163.513-3.253.033-.18a.641.641 0 0 1 .633-.539h.398c2.578 0 4.6-1.047 5.19-4.074.247-1.273.12-2.335-.511-3.09z"/>
    </svg>`;

    const html = `
    <div class="floating-buttons" role="complementary" aria-label="Quick links">
        <a href="${DISCORD_URL}" class="floating-btn floating-btn-discord" target="_blank" rel="noopener noreferrer" aria-label="Chat on Discord">
            <span class="floating-btn-label">Chat on Discord</span>
            <span class="floating-btn-icon">${discordIcon}</span>
        </a>
        <a href="${PAYPAL_URL}" class="floating-btn floating-btn-paypal" target="_blank" rel="noopener noreferrer" aria-label="Donate via PayPal">
            <span class="floating-btn-label">Support Us</span>
            <span class="floating-btn-icon">${paypalIcon}</span>
        </a>
    </div>`;

    document.addEventListener('DOMContentLoaded', function () {
        document.body.insertAdjacentHTML('beforeend', html);
    });
})();
