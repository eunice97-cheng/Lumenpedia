// Handle avatar image loading
document.addEventListener('DOMContentLoaded', function() {
    const avatarImg = document.querySelector('.avatar-img');
    const avatarContainer = document.querySelector('.discord-avatar');
    
    if (avatarImg) {
        avatarImg.addEventListener('load', function() {
            avatarContainer.classList.add('avatar-loaded');
        });
        
        avatarImg.addEventListener('error', function() {
            avatarContainer.classList.remove('avatar-loaded');
            console.warn('Discord avatar image failed to load');
        });
        
        // Check if image is already loaded (cached)
        if (avatarImg.complete) {
            avatarContainer.classList.add('avatar-loaded');
        }
    }
});

// Handle image loading and fallbacks - Disabled due to using .png instead of .svg
// document.addEventListener('DOMContentLoaded', function() {
//     const assistantImages = document.querySelectorAll('.assistant-img');
    
//     assistantImages.forEach(img => {
//         const parent = img.closest('.hero-image');
        
//         // Check if image loads successfully
//         img.addEventListener('load', function() {
//             parent.classList.add('image-loaded');
//         });
        
//         // Handle image loading errors
//         img.addEventListener('error', function() {
//             parent.classList.remove('image-loaded');
//             console.warn('Assistant image failed to load:', img.src);
//         });
        
//         // Check if image is already loaded (cached)
//         if (img.complete) {
//             parent.classList.add('image-loaded');
//         }
//     });
// });
