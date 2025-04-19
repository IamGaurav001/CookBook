<?php
// Start session and check if user is logged in
session_start();
$isLoggedIn = isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags and page title -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="./img/logo.png" sizes="62x62">
    <title>CookBook | Recipe Management Platform</title>
    
    <!-- External CSS and font imports -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./src/output.css">
    <style>
        /* Custom styles for animations and layout */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');

        /* Smooth scrolling behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Carousel styles */
        .carousel {
            scroll-behavior: smooth;
        }

        .carousel-item {
            min-width: 100%;
            transition: transform 0.5s ease;
        }

        /* Fade-in animation */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
            animation: fadeIn 0.8s ease forwards;
        }

        /* Hero image styling */
        .hero-image {
            filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
        }
    </style>
</head>
<body class="font-sans bg-light text-text">
<!-- Main navigation bar with logo and menu items -->
<nav class="bg-white shadow-sm fixed w-full z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex items-center">
                <div class="flex-shrink-0 flex items-center">
                    <span class="text-[#375A64] font-serif font-bold text-2xl">CookBook</span>
                </div>
                <!-- Desktop navigation links -->
                <div class="hidden sm:ml-10 sm:flex sm:space-x-8">
                    <a href="#about" class="border-transparent text-[#375A64] hover:text-yellow-400 hover:border-yellow-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">About</a>
                    <a href="#reviews" class="border-transparent text-[#375A64] hover:text-yellow-400 hover:border-yellow-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Reviews</a>
                    <a href="#community" class="border-transparent text-[#375A64] hover:text-yellow-400 hover:border-yellow-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Community</a>
                </div>
            </div>
            <!-- User authentication button and mobile menu -->
            <div class="flex items-center">
                <button class="p-2 rounded-full text-text hover:text-yellow-300 focus:outline-none">
                    <?php if($isLoggedIn): ?>
                        <a href="./pages/dashboard.php"><i class="fas fa-user-circle text-2xl"></i></a>
                    <?php else: ?>
                        <a href="./pages/auth.php"><i class="fas fa-user-circle text-2xl"></i></a>
                    <?php endif; ?>
                </button>
                <!-- Mobile menu button -->
                <div class="sm:hidden ml-4">
                    <button id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-[#375A64] hover:text-yellow-400 focus:outline-none">
                        <i class="fas fa-bars text-xl "></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</nav>

    <!-- Mobile Sidebar Menu (Hidden by default) -->
    <div id="mobile-menu" class="md:hidden hidden bg-white text-white w-full absolute z-50 top-16 left-0 shadow-lg">
            <nav class="py-2">
                <ul>
                    <li>
                    <a href="#about" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text hover:bg-gray-50 hover:border-yellow text-[#375A64]">About</a>
                    </li>
                    <li>
                    <a href="#reviews" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text hover:bg-gray-50 hover:border-yellow text-[#375A64]">Reviews</a>
                    </li>
                    <li>
                    <a href="#community" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-text hover:bg-gray-50 hover:border-yellow text-[#375A64]">Community</a>
                    </li>
                </ul>
            </nav>
        </div>

<!-- Hero section with main call-to-action -->
<section class="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center">
            <!-- Hero text content -->
            <div class="md:w-1/2 md:pr-8 mb-10 md:mb-0">
                <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#375A64] mb-6 animate-fade-in" style="animation-delay: 0.2s;">
                    "Cooking is like love. It should be entered into with abandon or not at all."
                </h2>
                <p class="text-lg text-[#375A64] mb-8 animate-fade-in" style="animation-delay: 0.4s;">
                    Welcome to CookBook, where your culinary journey transforms into a masterpiece. Store your favorite recipes, plan meals effortlessly, generate shopping lists, track nutrition, and connect with a community of food enthusiasts.
                </p>
                <!-- Dynamic CTA button based on login status -->
                <div class="flex flex-col sm:flex-row gap-4 animate-fade-in" style="animation-delay: 0.6s;">
                    <button class="bg-[#375A64] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-lg shadow-md ">
                        <?php if($isLoggedIn): ?>
                            <a href="./pages/dashboard.php">Go to Dashboard</a>
                        <?php else: ?>
                            <a href="./pages/auth.php">Get Started</a>
                        <?php endif; ?>
                    </button>
                </div>
            </div>
            <!-- Hero image -->
            <div class="md:w-1/2 animate-fade-in" style="animation-delay: 0.8s;">
                <img src="./img/home.jpg" alt="Chef cooking" class="hero-image w-full h-auto rounded-3xl">
            </div>
        </div>
    </div>
</section>

<!-- Features section highlighting platform capabilities -->
<section id="about" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-serif font-bold text-center mb-16 text-[#375A64]">Why Choose CookBook?</h2>
        
        <!-- Grid of feature cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <!-- Recipe Storage Feature -->
            <div class="bg-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div class="w-16 h-16 bg-yellow-300 bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-book text-black text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4 text-[#375A64]">Recipe Storage</h3>
                <p class="text-gray">Save and organize all your favorite recipes in one place, accessible anytime, anywhere.</p>
            </div>
            
            <!-- Meal Planning Feature -->
            <div class="bg-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div class="w-16 h-16 bg-yellow-300 bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-calendar-alt text-black text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4 text-[#375A64]">Meal Planning</h3>
                <p class="text-[#375A64]">Create weekly meal plans with ease, saving you time and reducing food waste.</p>
            </div>
            
            <!-- Shopping Lists Feature -->
            <div class="bg-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div class="w-16 h-16 bg-yellow-300 bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-shopping-basket text-black text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4 text-[#375A64]">Shopping Lists</h3>
                <p class="text-[#375A64]">Automatically generate shopping lists based on your meal plans and recipes.</p>
            </div>
            
            <!-- Nutrition Tracking Feature -->
            <div class="bg-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div class="w-16 h-16 bg-yellow-300 bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-heartbeat text-black text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4 text-[#375A64]">Nutrition Tracking</h3>
                <p class="text-[#375A64]">Monitor nutritional information for all your meals to maintain a balanced diet.</p>
            </div>
            
            <!-- Recipe Sharing Feature -->
            <div class="bg-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div class="w-16 h-16 bg-yellow-300 bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-share-alt text-black text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4 text-[#375A64]">Recipe Sharing</h3>
                <p class="text-[#375A64]">Share your culinary creations with friends, family, and the community.</p>
            </div>
            
            <!-- Dietary Management Feature -->
            <div class="bg-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div class="w-16 h-16 bg-yellow-300 bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-utensils text-black text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4 text-[#375A64]">Dietary Management</h3>
                <p class="text-[#375A64]">Easily manage dietary restrictions and preferences for personalized meal planning.</p>
            </div>
        </div>
    </div>
</section>

<!-- Testimonials section with carousel -->
<section id="reviews" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-serif font-bold text-center mb-16 text-[#375A64]">What Our Users Say</h2>
        
        <!-- Carousel container -->
        <div class="relative">
            <div class="carousel flex overflow-x-hidden w-full">
                <!-- Testimonial 1 -->
                <div class="carousel-item px-4">
                    <div class="bg-white rounded-xl p-8 shadow-md">
                        <div class="flex items-center mb-6">
                            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                                JD
                            </div>
                            <div>
                                <h4 class="font-bold text-primary">Jane Doe</h4>
                                <div class="flex text-yellow-300">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <p class="text-text italic">"Culinary Canvas has completely transformed how I approach cooking. The meal planning feature saves me hours each week, and I love being able to share recipes with friends!"</p>
                    </div>
                </div>
                
                <!-- Testimonial 2 -->
                <div class="carousel-item px-4">
                    <div class="bg-white rounded-xl p-8 shadow-md">
                        <div class="flex items-center mb-6">
                            <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold mr-4">
                                MS
                            </div>
                            <div>
                                <h4 class="font-bold text-black">Michael Smith</h4>
                                <div class="flex text-yellow-300">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray italic">"As someone with dietary restrictions, this platform has been a game-changer. I can easily filter recipes that match my needs, and the nutritional tracking helps me stay on track with my health goals."</p>
                    </div>
                </div>
                
                <!-- Testimonial 3 -->
                <div class="carousel-item px-4">
                    <div class="bg-white rounded-xl p-8 shadow-md">
                        <div class="flex items-center mb-6">
                            <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold mr-4">
                                AL
                            </div>
                            <div>
                                <h4 class="font-bold text-black">Amanda Lee</h4>
                                <div class="flex text-yellow-300">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <p class="text-black italic">"The shopping list feature alone is worth it! No more forgetting ingredients at the store. Plus, the community section has introduced me to so many new recipes I wouldn't have tried otherwise."</p>
                    </div>
                </div>
            </div>
            
            <!-- Carousel navigation buttons -->
            <button id="prev-btn" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-black hover:text-black focus:outline-none">
                <i class="fas fa-chevron-left text-xl"></i>
            </button>
            
            <button id="next-btn" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-black hover:text-black focus:outline-none">
                <i class="fas fa-chevron-right text-xl"></i>
            </button>
        </div>
        
        <!-- Carousel indicators -->
        <div class="flex justify-center mt-8">
            <button class="carousel-dot w-3 h-3 rounded-full bg-black mx-1 focus:outline-none" data-index="0"></button>
            <button class="carousel-dot w-3 h-3 rounded-full bg-black mx-1 focus:outline-none" data-index="1"></button>
            <button class="carousel-dot w-3 h-3 rounded-full bg-black mx-1 focus:outline-none" data-index="2"></button>
        </div>
    </div>
</section>

<!-- Community section -->
<section id="community" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 md:pr-12 mb-10 md:mb-0">
                <h2 class="text-3xl font-serif font-bold mb-6 text-[#375A64]">Join Our CookBook Community</h2>
                <p class="text-lg text-[#375A64] mb-8">
                    Connect with food enthusiasts from around the world. Share recipes, get inspired, and elevate your cooking skills through our vibrant community.
                </p>
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <div class="flex items-center">
                        <i class="fas fa-users text-yellow-300 text-xl mr-3"></i>
                        <span class="text-[#375A64]">10,000+ Members</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-book-open text-yellow-300 text-xl mr-3"></i>
                        <span class="text-[#375A64]">50,000+ Recipes</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-globe text-yellow-300 text-xl mr-3"></i>
                        <span class="text-[#375A64]">Global Community</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-comments text-yellow-300 text-xl mr-3"></i>
                        <span class="text-[#375A64]">Active Forums</span>
                    </div>
                </div>
                <button class="bg-yellow-300 hover:bg-opacity-90 text-[#375A64] font-medium py-3 px-6 rounded-lg shadow-md">
                    <a href="./pages/community.php">Join Community</a>
                </button>
            </div>
            <div class="md:w-1/2 grid grid-cols-2 gap-4">
                <img src="./img/c1.png" alt="Community cooking" class="rounded-lg shadow-md">
                <img src="./img/c2.png" alt="Food sharing" class="rounded-lg shadow-md mt-8">
                <img src="./img/c3.jpg" alt="Recipe creation" class="rounded-lg shadow-md">
                <img src="./img/c4.jpg" alt="Cooking together" class="rounded-lg shadow-md mt-8">
            </div>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="bg-[#375A64] text-white pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
                <h3 class="text-xl font-serif font-bold mb-4 text-yellow-300">CookBook</h3>
                <p class="text-white mb-4">Your all-in-one recipe management platform for storing, planning, and sharing your culinary creations.</p>
                <div class="flex space-x-4">
                    <a href="#" class="text-white hover:text-yellow-300 transition-colors">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="text-white hover:text-yellow-300 transition-colors">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="text-white hover:text-yellow-300 transition-colors">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="text-white hover:text-yellow-300 transition-colors">
                        <i class="fab fa-pinterest"></i>
                    </a>
                </div>
            </div>
            
            <div>
                <h4 class="text-lg font-bold mb-4 text-yellow-300">Quick Links</h4>
                <ul class="space-y-2">
                    <li><a href="#" class="text-white hover:text-yellow-300 transition-colors">Home</a></li>
                    <li><a href="#about" class="text-white hover:text-yellow-300 transition-colors">About</a></li>
                    <li><a href="#reviews" class="text-white hover:text-yellow-300 transition-colors">Reviews</a></li>
                    <li><a href="#community" class="text-white hover:text-yellow-300 transition-colors">Community</a></li>
                    <li><a href="#" class="text-white hover:text-yellow-300 transition-colors">Blog</a></li>
                </ul>
            </div>
            
            <div>
                <h4 class="text-lg font-bold mb-4 text-yellow-300">Features</h4>
                <ul class="space-y-2">
                    <li><a href="#" class="text-white hover:text-yellow-300 transition-colors">Recipe Storage</a></li>
                    <li><a href="#" class="text-white hover:text-yellow-300 transition-colors">Meal Planning</a></li>
                    <li><a href="#" class="text-white hover:text-yellow-300 transition-colors">Shopping Lists</a></li>
                </ul>
            </div>
            
            <div>
                <h4 class="text-lg font-bold mb-4 text-yellow-300">Contact Us</h4>
                <ul class="space-y-2">
                    <li class="flex items-center">
                        <i class="fas fa-envelope text-yellow-300 mr-3"></i>
                        <a href="mailto:info@culinarycanvas.com" class="text-white hover:text-yellow-300 transition-colors">info@CookBook.com</a>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-phone text-yellow-300 mr-3"></i>
                        <a href="tel:+1234567890" class="text-white hover:text-yellow-300 transition-colors">+91 7989231096</a>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-map-marker-alt text-yellow-300 mr-3"></i>
                        <span class="text-white">123 CookBook St, HYD, 500054</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <p class="text-white mb-4 md:mb-0">&copy; 2025 CookBook. All rights reserved.</p>
                <div class="flex space-x-6">
                    <a href="#" class="text-white hover:text-yellow-300 transition-colors">Privacy Policy</a>
                    <a href="#" class="text-white hover:text-yellow-300 transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </div>
</footer>

<script src="./js/homePage.js"></script>
</body>
</html>