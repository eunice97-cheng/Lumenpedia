function copyCode() {
    const code = document.getElementById('induction-code');
    const message = document.getElementById('copy-message');
    const copyBtn = document.querySelector('.copy-btn');
    
    // Store original button text
    const originalText = copyBtn.innerHTML;
    
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = code.textContent;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        // Execute copy command
        const successful = document.execCommand('copy');
        
        if (successful) {
            // Show success state
            message.textContent = '✓ Code copied to clipboard!';
            message.className = 'copy-message show success';
            copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>Copied!';
            copyBtn.style.background = 'var(--gradient-green)';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = 'var(--gradient-hero)';
            }, 2000);
        } else {
            throw new Error('Copy command failed');
        }
    } catch (err) {
        // Fallback: Use Clipboard API
        navigator.clipboard.writeText(code.textContent).then(
            function() {
                message.textContent = '✓ Code copied to clipboard!';
                message.className = 'copy-message show success';
                copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>Copied!';
                copyBtn.style.background = 'var(--gradient-green)';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.background = 'var(--gradient-hero)';
                }, 2000);
            },
            function() {
                message.textContent = '✗ Failed to copy code. Please select and copy manually.';
                message.className = 'copy-message show error';
                
                // Show error state briefly
                setTimeout(() => {
                    message.className = 'copy-message';
                }, 3000);
            }
        );
    }
    
    // Remove temporary element
    document.body.removeChild(textArea);
    
    // Hide message after 3 seconds
    setTimeout(() => {
        message.className = 'copy-message';
    }, 3000);
}

// UPDATED: Image zoom functionality with proper zoom out
document.addEventListener('DOMContentLoaded', function() {
    // Create zoom overlay
    const zoomOverlay = document.createElement('div');
    zoomOverlay.className = 'image-zoom-overlay';
    zoomOverlay.innerHTML = `
        <button class="zoom-close">&times;</button>
        <div class="zoomed-image-container">
            <img class="zoomed-image" src="" alt="">
            <div class="zoomed-caption"></div>
        </div>
    `;
    document.body.appendChild(zoomOverlay);
    
    // Function to close zoom
    function closeZoom() {
        zoomOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Function to open zoom
    function openZoom(imgSrc, imgAlt, captionText) {
        const zoomedImg = zoomOverlay.querySelector('.zoomed-image');
        const zoomedCaption = zoomOverlay.querySelector('.zoomed-caption');
        
        // Set zoomed image source and caption
        zoomedImg.src = imgSrc;
        zoomedImg.alt = imgAlt;
        zoomedCaption.textContent = captionText || '';
        
        // Show overlay
        zoomOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Add click handlers to all content images
    const contentImages = document.querySelectorAll('.content-image');
    
    contentImages.forEach(container => {
        const img = container.querySelector('.responsive-image');
        const caption = container.querySelector('.image-caption');
        
        container.addEventListener('click', function(e) {
            e.preventDefault();
            openZoom(img.src, img.alt, caption ? caption.textContent : '');
        });
    });
    
    // Close zoom overlay with close button
    const closeBtn = zoomOverlay.querySelector('.zoom-close');
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        closeZoom();
    });
    
    // Close when clicking on overlay background (FIXED)
    zoomOverlay.addEventListener('click', function(e) {
        // Only close if clicking directly on the overlay background, not on image or close button
        if (e.target === zoomOverlay) {
            closeZoom();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
            closeZoom();
        }
    });
    
    // Add loading state to images
    const images = document.querySelectorAll('.responsive-image');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.parentElement.classList.add('image-loaded');
        });
        
        img.addEventListener('error', function() {
            this.parentElement.classList.add('image-error');
        });
    });
    
    // Add intersection observer for content boxes
    const contentBoxes = document.querySelectorAll('.content-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1
    });
    
    contentBoxes.forEach(box => {
        box.style.opacity = "0";
        box.style.transform = "translateY(20px)";
        box.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(box);
    });
});