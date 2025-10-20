// Theme Toggle
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle")
  const html = document.documentElement

  const currentTheme = localStorage.getItem("theme") || "light"
  html.classList.toggle("dark", currentTheme === "dark")

  themeToggle.addEventListener("click", () => {
    const isDark = html.classList.toggle("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  })
}

// Smooth scroll for alphabet navigation
function initAlphabetNav() {
  const alphabetLinks = document.querySelectorAll(".alphabet-link")

  alphabetLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offset = 120
        const targetPosition = targetSection.offsetTop - offset

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        alphabetLinks.forEach((l) => l.classList.remove("active"))
        link.classList.add("active")
      }
    })
  })

  if (alphabetLinks.length > 0) {
    window.addEventListener("scroll", () => {
      const guideSections = document.querySelectorAll(".guide-section")
      let currentSection = ""

      guideSections.forEach((section) => {
        const sectionTop = section.offsetTop - 150
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute("id")
        }
      })

      alphabetLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active")
        }
      })
    })
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme()
  initAlphabetNav() // Removed initSearch() call
})

// Support page scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const supportCards = document.querySelectorAll('.support-card');
    const supportCta = document.querySelector('.support-cta');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    supportCards.forEach(card => {
        observer.observe(card);
    });
    
    if (supportCta) {
        observer.observe(supportCta);
    }
})
