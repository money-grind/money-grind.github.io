// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
});

// Snow effect
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '●';
    
    // Random starting position across entire width (accounting for diagonal fall)
    const startX = Math.random() * 150; // 0-150% to cover full width after diagonal movement
    snowflake.style.left = startX + '%';
    
    // Random size
    const size = Math.random() * 0.5 + 0.3; // 0.3em to 0.8em
    snowflake.style.fontSize = size + 'em';
    
    // Random animation duration (fall speed)
    const duration = Math.random() * 5 + 8; // 8-13 seconds
    snowflake.style.animationDuration = duration + 's';
    
    // Random delay
    const delay = Math.random() * 5;
    snowflake.style.animationDelay = delay + 's';
    
    document.body.appendChild(snowflake);
    
    // Remove snowflake after animation completes
    setTimeout(() => {
        snowflake.remove();
    }, (duration + delay) * 1000);
}

// Create snowflakes periodically
function startSnow() {
    setInterval(createSnowflake, 200); // New snowflake every 200ms
    // Initial batch
    for (let i = 0; i < 30; i++) {
        setTimeout(createSnowflake, i * 100);
    }
}

// Check if it's winter (Dec 1 - Feb 28/29)
function isWinter() {
    const now = new Date();
    const month = now.getMonth(); // 0 is January
    // Winter is December (11), January (0), February (1)
    return month === 11 || month === 0 || month === 1;
}

// Start snow after page loads only in winter
window.addEventListener('load', () => {
    if (isWinter()) {
        startSnow();
    }
});

// Custom Parallax - opposite direction to scroll
function initParallax() {
    const parallaxBg = document.querySelector('.parallax-bg');
    if (!parallaxBg) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        // Negative value moves background UP when scrolling DOWN (opposite direction)
        const yPos = -(scrolled * 0.8);
        parallaxBg.style.transform = `translateY(${yPos}px)`;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

initParallax();

// Mobile service card interaction
function initMobileServiceCards() {
    if (window.innerWidth <= 768) {
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (serviceCards.length === 0) return;
        
        serviceCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Close all other cards
                serviceCards.forEach(c => {
                    if (c !== card) {
                        c.classList.remove('active');
                    }
                });
                
                // Toggle current card
                this.classList.toggle('active');
            });
        });
    }
}

initMobileServiceCards();
