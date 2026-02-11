// Server switching functionality
document.addEventListener('DOMContentLoaded', function () {
    const serverTabs = document.querySelectorAll('.server-tab');
    const classicContent = document.querySelector('.classic-content');
    const mainContent = document.querySelector('.main-content');
    const body = document.body;

    // Set initial state
    body.classList.add('server-classic');

    serverTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const server = this.getAttribute('data-server');

            // Update active tab
            serverTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update body class
            body.classList.remove('server-classic', 'server-main');
            body.classList.add(`server-${server}`);
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
});

// Server switching via assistant clicks
document.addEventListener('DOMContentLoaded', function () {
    const classicAssistant = document.querySelector('.hero-assistant.left .assistant-card');
    const mainAssistant = document.querySelector('.hero-assistant.right .assistant-card');
    const body = document.body;

    // Set initial state (Classic server by default)
    let currentServer = 'classic';
    body.classList.add('server-classic');
    classicAssistant.classList.add('active');
    mainAssistant.classList.add('grayed-out');

    // Classic Assistant Click
    classicAssistant.addEventListener('click', function (e) {
        e.preventDefault();

        if (currentServer !== 'classic') {
            currentServer = 'classic';
            body.classList.remove('server-main');
            body.classList.add('server-classic');

            classicAssistant.classList.add('active');
            classicAssistant.classList.remove('grayed-out');
            mainAssistant.classList.remove('active');
            mainAssistant.classList.add('grayed-out');
        }
    });

    // Main Assistant Click
    mainAssistant.addEventListener('click', function (e) {
        e.preventDefault();

        if (currentServer !== 'main') {
            currentServer = 'main';
            body.classList.remove('server-classic');
            body.classList.add('server-main');

            mainAssistant.classList.add('active');
            mainAssistant.classList.remove('grayed-out');
            classicAssistant.classList.remove('active');
            classicAssistant.classList.add('grayed-out');
        }
    });
});