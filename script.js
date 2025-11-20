// Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
    // Scroll reveal for elements
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.classList.add('mobile-menu-toggle');
            toggle.innerHTML = '☰';
            toggle.style.cssText = 'background: none; border: 2px solid #6366f1; color: #6366f1; font-size: 1.5rem; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; display: block;';
            
            toggle.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
                navLinks.style.padding = '1rem';
            });
            
            nav.querySelector('.nav-container').appendChild(toggle);
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
    
    // Add active class to current nav link
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(link => {
        if (link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
        }
    });
    
    // Animate cards on hover
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('Portfolio loaded successfully!');
});

// Recommendation Form Handling
const recommendationForm = document.getElementById('recommendation-form');
if (recommendationForm) {
    recommendationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('recommender-name').value;
        const title = document.getElementById('recommender-title').value;
        const organization = document.getElementById('recommender-org').value;
        const recommendation = document.getElementById('recommendation-text').value;
        
        // Create new recommendation card
        const newRecommendation = document.createElement('div');
        newRecommendation.className = 'recommendation-card';
        newRecommendation.innerHTML = `
            <div class="recommendation-header">
                <h3>${name}</h3>
                <p class="recommender-title">${title}</p>
                <p class="recommender-org">${organization}</p>
            </div>
            <p class="recommendation-text">"${recommendation}"</p>
        `;
        
        // Add to recommendations list
        const recommendationsList = document.getElementById('recommendations-list');
        recommendationsList.appendChild(newRecommendation);
        
        // Reset form
        recommendationForm.reset();
        
        // Show popup
        showPopup();
    });
}

// Popup Functions
function showPopup() {
    const popup = document.getElementById('popup-modal');
    if (popup) {
        popup.style.display = 'flex';
    }
}

function closePopup() {
    const popup = document.getElementById('popup-modal');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Close popup when clicking outside
window.addEventListener('click', function(event) {
    const popup = document.getElementById('popup-modal');
    if (event.target === popup) {
        closePopup();
    }
});

// Close popup with X button
const closeBtn = document.querySelector('.popup-close');
if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
}
