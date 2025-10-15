// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = mobileMenu.classList.contains('active') 
            ? 'rotate(45deg) translateY(8px)' : '';
        spans[1].style.opacity = mobileMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = mobileMenu.classList.contains('active') 
            ? 'rotate(-45deg) translateY(-8px)' : '';
    });
}

// Category Filter Functionality
const categoryChips = document.querySelectorAll('.category-chip');
const toolCards = document.querySelectorAll('.tool-card');

categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
        // Remove active class from all chips
        categoryChips.forEach(c => c.classList.remove('active'));
        // Add active class to clicked chip
        chip.classList.add('active');
        
        const selectedCategory = chip.dataset.category;
        
        // Filter tool cards
        toolCards.forEach(card => {
            if (selectedCategory === 'all') {
                card.classList.remove('hidden');
            } else {
                const cardCategories = card.dataset.category;
                if (cardCategories.includes(selectedCategory)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// Search Functionality
const searchInput = document.querySelector('.search-input');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        toolCards.forEach(card => {
            const toolName = card.querySelector('.tool-name').textContent.toLowerCase();
            const toolDescription = card.querySelector('.tool-description').textContent.toLowerCase();
            
            if (toolName.includes(searchTerm) || toolDescription.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Reset category filter when searching
        if (searchTerm.length > 0) {
            categoryChips.forEach(chip => chip.classList.remove('active'));
        }
    });
}

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('.newsletter-input').value;
        
        // Show success message (in a real app, this would send to a backend)
        alert(`Thank you for subscribing with ${email}! We'll keep you updated on the latest AI tools.`);
        newsletterForm.reset();
    });
}

// Smooth Scroll for Anchor Links
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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    }
});
