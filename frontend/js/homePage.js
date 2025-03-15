(() => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.carousel-dot');
    
    let currentIndex = 0;
    let autoScrollInterval;

    function updateCarousel() {
        carousel.style.scrollBehavior = 'smooth';
        carousel.scrollLeft = currentIndex * carousel.offsetWidth;

        dots.forEach((dot, index) => {
            dot.classList.toggle('bg-accent', index === currentIndex);
            dot.classList.toggle('bg-gray-300', index !== currentIndex);
        });
    }

    function changeSlide(step) {
        currentIndex = (currentIndex + step + carouselItems.length) % carouselItems.length;
        updateCarousel();
        resetAutoScroll(); // Reset auto-scroll timer on manual interaction
    }

    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoScroll();
        });
    });

    // Auto-scroll carousel with throttling
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // Initialize carousel
    updateCarousel();
    startAutoScroll();

    // Smooth scrolling for navigation links
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
})();
