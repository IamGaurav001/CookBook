// Main event listener that runs when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (carousel && carouselItems.length > 0) {
        let currentIndex = 0;
        const itemWidth = carousel.clientWidth;

        // Update carousel position and dot indicators
        function updateCarousel() {
            carousel.scrollLeft = currentIndex * itemWidth;

            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('bg-yellow-300');
                    dot.classList.remove('bg-black');
                } else {
                    dot.classList.remove('bg-yellow-300');
                    dot.classList.add('bg-black');
                }
            });
        }

        // Previous button click handler
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
                updateCarousel();
            });
        }
        
        // Next button click handler
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });
        }

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });

        // Auto-advance carousel every 5 seconds
        setInterval(function() {
            currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    }

    // Update user icon color if user is logged in
    const userData = localStorage.getItem('cookbook_user');
    if (userData) {
        const userIcon = document.querySelector('.fa-user-circle');
        if (userIcon) {
            userIcon.classList.add('text-yellow-300');
            userIcon.classList.remove('text-text');
        }
    }
});
