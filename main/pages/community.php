<?php
session_start();
require_once "../../config.php";

// Fetch public recipes
$public_recipes = array();
$sql = "SELECT r.*, u.name as author_name 
        FROM recipes r 
        JOIN users u ON r.user_id = u.id 
        WHERE r.visibility = 'public' 
        ORDER BY r.created_at DESC";

if($result = mysqli_query($conn, $sql)) {
    while($row = mysqli_fetch_assoc($result)) {
        $public_recipes[] = $row;
    }
    mysqli_free_result($result);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CookBook | Community</title>
    <link rel="icon" type="image/png" href="../img/logo.png" sizes="62x62">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        
        html {
            scroll-behavior: smooth;
        }
        
        body {
            font-family: 'Inter', sans-serif;
        }
        
        .font-serif {
            font-family: 'Cormorant Garamond', serif;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
            animation: fadeIn 0.8s ease forwards;
        }
        
        .recipe-card {
            transition: all 0.3s ease;
        }
        
        .recipe-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .recipe-image {
            transition: transform 0.3s ease;
        }
        
        .recipe-card:hover .recipe-image {
            transform: scale(1.05);
        }
        
        .loading-spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #FFD700;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .empty-state {
            text-align: center;
            padding: 3rem;
            background: #f8f9fa;
            border-radius: 0.5rem;
        }
        
        .empty-state-icon {
            font-size: 4rem;
            color: #6c757d;
            margin-bottom: 1rem;
        }
        
        .filter-badge {
            transition: all 0.2s ease;
        }
        
        .filter-badge:hover {
            background-color: #FFD700;
            color: #375A64;
        }
        
        .filter-badge.active {
            background-color: #FFD700;
            color: #375A64;
        }

        .hero-section {
            position: relative;
            background-image: url('../img/image.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(55, 90, 100, 0.6), rgba(45, 74, 83, 0.7));
            z-index: 1;
        }

        .hero-content {
            position: relative;
            z-index: 2;
        }
    </style>
</head>
<body class="bg-gray-50 text-[#375A64]">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-sm fixed w-full z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <a href="../index.php" class="text-[#375A64] font-serif font-bold text-2xl">CookBook</a>
                    </div>
                    <div class="hidden sm:ml-10 sm:flex sm:space-x-8">
                        <a href="index.php#about" class="border-transparent text-[#375A64] hover:text-yellow-400 hover:border-yellow-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">About</a>
                        <a href="index.php#reviews" class="border-transparent text-[#375A64] hover:text-yellow-400 hover:border-yellow-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Reviews</a>
                        <a href="#" class="border-yellow-400 text-[#375A64] hover:text-yellow-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Community</a>
                    </div>
                </div>
                <div class="flex items-center">
                    <?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true): ?>
                        <a href="dashboard.php" class="text-[#375A64] hover:text-yellow-400 mr-4">
                            <i class="fas fa-user-circle text-2xl"></i>
                        </a>
                    <?php else: ?>
                        <a href="auth.php" class="text-[#375A64] hover:text-yellow-400">
                            <i class="fas fa-user-circle text-2xl"></i>
                        </a>
                    <?php endif; ?>
                    <div class="sm:hidden ml-4">
                        <button id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-[#375A64] hover:text-yellow-400 focus:outline-none">
                            <i class="fas fa-bars text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Mobile menu -->
        <div id="mobile-menu" class="sm:hidden hidden bg-white border-t border-gray-200">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <a href="index.php#about" class="block px-3 py-2 rounded-md text-base font-medium text-[#375A64] hover:bg-gray-100">About</a>
                <a href="index.php#reviews" class="block px-3 py-2 rounded-md text-base font-medium text-[#375A64] hover:bg-gray-100">Reviews</a>
                <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-[#375A64] bg-gray-100">Community</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section pt-24 pb-10 md:pt-32 md:pb-16">
        <div class="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6 animate-fade-in">
                Community Recipes
            </h1>
            <p class="text-lg text-gray-100 mb-8 max-w-3xl mx-auto animate-fade-in">
                Discover delicious recipes shared by our community of food enthusiasts. Get inspired, try something new, and share your own culinary creations.
            </p>
            <?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true): ?>
                <div class="flex justify-center animate-fade-in">
                    <a href="add-recipe.php" class="bg-yellow-400 hover:bg-yellow-500 text-[#375A64] font-medium py-3 px-6 rounded-lg shadow-md transition duration-300">
                        Share Your Recipe
                    </a>
                </div>
            <?php else: ?>
                <div class="flex justify-center animate-fade-in">
                    <a href="auth.php" class="bg-yellow-400 hover:bg-yellow-500 text-[#375A64] font-medium py-3 px-6 rounded-lg shadow-md transition duration-300">
                        Sign In to Share Recipes
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="py-8 bg-white shadow-md sticky top-16 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div class="relative flex-grow max-w-lg">
                    <input type="text" id="search-input" placeholder="Search recipes by name, ingredients, or author..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-search text-gray-400"></i>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-2">
                    <select id="category-filter" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200">
                        <option value="">All Categories</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="dessert">Dessert</option>
                        <option value="snack">Snack</option>
                    </select>
                    
                    <select id="dietary-filter" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200">
                        <option value="">All Diets</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="gluten-free">Gluten-Free</option>
                        <option value="keto">Keto</option>
                        <option value="paleo">Paleo</option>
                    </select>
                </div>
            </div>
            
            <div class="mt-4 flex flex-wrap gap-2" id="active-filters">
                <!-- Active filters will be displayed here -->
            </div>
        </div>
    </section>

    <!-- Recipe Grid -->
    <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-3xl font-serif font-bold text-[#375A64] animate-fade-in">Explore Community Recipes</h2>
                <div class="text-sm text-gray-600">
                    <span id="recipe-count"><?php echo count($public_recipes); ?></span> recipes found
                </div>
            </div>
            
            <div id="loading-state" class="hidden">
                <div class="flex justify-center items-center py-12">
                    <div class="loading-spinner"></div>
                    <span class="ml-3 text-gray-600">Loading recipes...</span>
                </div>
            </div>
            
            <div id="empty-state" class="hidden">
                <div class="empty-state">
                    <i class="fas fa-utensils empty-state-icon"></i>
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">No recipes found</h3>
                    <p class="text-gray-600 mb-4">Try adjusting your search or filters</p>
                    <button onclick="resetFilters()" class="bg-yellow-400 hover:bg-yellow-500 text-[#375A64] font-medium py-2 px-4 rounded-lg shadow-md transition duration-300">
                        Reset Filters
                    </button>
                </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="recipes-container">
                <?php if(empty($public_recipes)): ?>
                    <div class="col-span-full">
                        <div class="empty-state">
                            <i class="fas fa-utensils empty-state-icon"></i>
                            <h3 class="text-xl font-semibold text-gray-700 mb-2">No recipes available yet</h3>
                            <p class="text-gray-600 mb-4">Be the first to share your recipe with the community!</p>
                            <?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true): ?>
                                <a href="add-recipe.php" class="bg-yellow-400 hover:bg-yellow-500 text-[#375A64] font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 inline-block">
                                    Share Your Recipe
                                </a>
                            <?php else: ?>
                                <a href="auth.php" class="bg-yellow-400 hover:bg-yellow-500 text-[#375A64] font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 inline-block">
                                    Sign In to Share
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php else: ?>
                    <?php foreach($public_recipes as $recipe): ?>
                        <div class="recipe-card bg-white rounded-lg overflow-hidden shadow-md animate-fade-in" 
                             data-diet="<?php echo htmlspecialchars($recipe['diet_type'] ?? ''); ?>"
                             data-rating="<?php echo htmlspecialchars($recipe['rating'] ?? '0'); ?>"
                             data-views="<?php echo htmlspecialchars($recipe['views'] ?? '0'); ?>">
                            <div class="relative h-48 overflow-hidden">
                                <?php if(!empty($recipe['image_path'])): ?>
                                    <img src="../img/recipes/<?php echo htmlspecialchars(basename($recipe['image_path'])); ?>" 
                                         alt="<?php echo htmlspecialchars($recipe['name']); ?>" 
                                         class="w-full h-full object-cover recipe-image">
                                <?php else: ?>
                                    <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <i class="fas fa-utensils text-4xl text-gray-400"></i>
                                    </div>
                                <?php endif; ?>
                                <div class="absolute top-2 right-2">
                                    <span class="bg-yellow-400 text-[#375A64] px-3 py-1 rounded-full text-sm font-medium">
                                        <?php echo htmlspecialchars($recipe['category']); ?>
                                    </span>
                                </div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-xl font-semibold text-[#375A64] mb-2"><?php echo htmlspecialchars($recipe['name']); ?></h3>
                                <p class="text-gray-600 text-sm mb-2">By <?php echo htmlspecialchars($recipe['author_name']); ?></p>
                                <p class="text-gray-600 text-sm mb-4">
                                    <i class="far fa-clock mr-1"></i> <?php echo htmlspecialchars($recipe['prep_time']); ?> mins
                                    <span class="mx-2">•</span>
                                    <i class="fas fa-utensils mr-1"></i> <?php echo htmlspecialchars($recipe['servings']); ?> servings
                                </p>
                                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                                    <?php echo $recipe['notes'] ? htmlspecialchars(substr($recipe['notes'], 0, 100)) . '...' : ''; ?>
                                </p>
                                <button onclick="showRecipeDetails(<?php echo htmlspecialchars(json_encode($recipe)); ?>)" 
                                        class="w-full bg-yellow-400 hover:bg-yellow-500 text-[#375A64] font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center justify-center">
                                    <i class="fas fa-eye mr-2"></i> View Recipe
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- Recipe Details Modal -->
    <div id="recipeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-start mb-6">
                    <h2 id="modalRecipeName" class="text-2xl font-bold text-[#375A64]"></h2>
                    <button onclick="closeRecipeModal()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img id="modalRecipeImage" src="" alt="" class="w-full h-64 object-cover rounded-lg">
                    </div>
                    <div>
                        <p class="text-gray-600 mb-2">By <span id="modalRecipeAuthor"></span></p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span id="modalRecipeCategory" class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"></span>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div class="bg-gray-50 p-3 rounded-lg">
                                <p class="text-sm text-gray-600">Prep Time</p>
                                <p id="modalPrepTime" class="font-semibold"></p>
                            </div>
                            <div class="bg-gray-50 p-3 rounded-lg">
                                <p class="text-sm text-gray-600">Servings</p>
                                <p id="modalServings" class="font-semibold"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-8">
                    <h3 class="text-xl font-semibold text-[#375A64] mb-4">Ingredients</h3>
                    <ul id="modalIngredients" class="list-disc list-inside space-y-2 text-gray-700"></ul>
                </div>

                <div class="mt-8">
                    <h3 class="text-xl font-semibold text-[#375A64] mb-4">Instructions</h3>
                    <ol id="modalInstructions" class="list-decimal list-inside space-y-2 text-gray-700"></ol>
                </div>

                <div class="mt-8">
                    <h3 class="text-xl font-semibold text-[#375A64] mb-4">Nutrition Information</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <p class="text-sm text-gray-600">Calories</p>
                            <p id="modalCalories" class="font-semibold"></p>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <p class="text-sm text-gray-600">Protein</p>
                            <p id="modalProtein" class="font-semibold"></p>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <p class="text-sm text-gray-600">Carbs</p>
                            <p id="modalCarbs" class="font-semibold"></p>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <p class="text-sm text-gray-600">Fiber</p>
                            <p id="modalFiber" class="font-semibold"></p>
                        </div>
                    </div>
                </div>

                <div class="mt-8">
                    <h3 class="text-xl font-semibold text-[#375A64] mb-4">Notes</h3>
                    <p id="modalNotes" class="text-gray-700"></p>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-[#375A64] text-white pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div>
                    <h3 class="text-xl font-serif font-bold mb-4 text-yellow-300">CookBook</h3>
                    <p class="text-gray-300 mb-4">Your all-in-one recipe management platform for storing, planning, and sharing your culinary creations.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-300 hover:text-yellow-300 transition-colors">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="text-gray-300 hover:text-yellow-300 transition-colors">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="text-gray-300 hover:text-yellow-300 transition-colors">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="text-gray-300 hover:text-yellow-300 transition-colors">
                            <i class="fab fa-pinterest"></i>
                        </a>
                    </div>
                </div>
                
                <div>
                    <h4 class="text-lg font-bold mb-4 text-yellow-300">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="index.php" class="text-gray-300 hover:text-yellow-300 transition-colors">Home</a></li>
                        <li><a href="index.php#about" class="text-gray-300 hover:text-yellow-300 transition-colors">About</a></li>
                        <li><a href="index.php#reviews" class="text-gray-300 hover:text-yellow-300 transition-colors">Reviews</a></li>
                        <li><a href="#" class="text-yellow-300 transition-colors">Community</a></li>
                        <li><a href="#" class="text-gray-300 hover:text-yellow-300 transition-colors">Blog</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-bold mb-4 text-yellow-300">Features</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-300 hover:text-yellow-300 transition-colors">Recipe Storage</a></li>
                        <li><a href="#" class="text-gray-300 hover:text-yellow-300 transition-colors">Meal Planning</a></li>
                        <li><a href="#" class="text-gray-300 hover:text-yellow-300 transition-colors">Shopping Lists</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-bold mb-4 text-yellow-300">Contact Us</h4>
                    <ul class="space-y-2">
                        <li class="flex items-center">
                            <i class="fas fa-envelope text-yellow-300 mr-3"></i>
                            <a href="mailto:info@cookbook.com" class="text-gray-300 hover:text-yellow-300 transition-colors">info@CookBook.com</a>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-phone text-yellow-300 mr-3"></i>
                            <a href="tel:+917989231096" class="text-gray-300 hover:text-yellow-300 transition-colors">+91 7989231096</a>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-map-marker-alt text-yellow-300 mr-3"></i>
                            <span class="text-gray-300">123 CookBook St, HYD, 500054</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <p class="text-gray-300 mb-4 md:mb-0">&copy; 2025 CookBook. All rights reserved.</p>
                    <div class="flex space-x-6">
                        <a href="#" class="text-gray-300 hover:text-yellow-300 transition-colors">Privacy Policy</a>
                        <a href="#" class="text-gray-300 hover:text-yellow-300 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });

        // Enhanced search functionality
        document.getElementById('search-input').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const recipeCards = document.querySelectorAll('.recipe-card');
            let visibleCount = 0;
            
            recipeCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const author = card.querySelector('.text-gray-600').textContent.toLowerCase();
                const description = card.querySelector('.line-clamp-2').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || author.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            updateRecipeCount(visibleCount);
            toggleEmptyState(visibleCount === 0);
        });
        
        // Enhanced filter functionality
        function filterRecipes() {
            const category = document.getElementById('category-filter').value;
            const dietary = document.getElementById('dietary-filter').value;
            const sortBy = document.getElementById('sort-by').value;
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            
            // Show loading state
            document.getElementById('loading-state').classList.remove('hidden');
            document.getElementById('recipes-container').classList.add('hidden');
            
            // Get all recipe cards
            const recipeCards = document.querySelectorAll('.recipe-card');
            let visibleCount = 0;
            
            recipeCards.forEach(card => {
                const recipeCategory = card.querySelector('.bg-yellow-400').textContent.trim().toLowerCase();
                const recipeTitle = card.querySelector('h3').textContent.toLowerCase();
                const recipeAuthor = card.querySelector('.text-gray-600').textContent.toLowerCase();
                const recipeDescription = card.querySelector('.line-clamp-2').textContent.toLowerCase();
                
                // Check if recipe matches all active filters
                const matchesCategory = !category || recipeCategory === category.toLowerCase();
                const matchesDietary = !dietary || card.getAttribute('data-diet') === dietary;
                const matchesSearch = !searchTerm || 
                    recipeTitle.includes(searchTerm) || 
                    recipeAuthor.includes(searchTerm) || 
                    recipeDescription.includes(searchTerm);
                
                if (matchesCategory && matchesDietary && matchesSearch) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Sort recipes if needed
            if (sortBy !== 'newest') {
                const container = document.getElementById('recipes-container');
                const cards = Array.from(container.querySelectorAll('.recipe-card'));
                
                cards.sort((a, b) => {
                    if (sortBy === 'popular') {
                        const ratingA = parseFloat(a.getAttribute('data-rating') || 0);
                        const ratingB = parseFloat(b.getAttribute('data-rating') || 0);
                        return ratingB - ratingA;
                    } else if (sortBy === 'rating') {
                        const viewsA = parseInt(a.getAttribute('data-views') || 0);
                        const viewsB = parseInt(b.getAttribute('data-views') || 0);
                        return viewsB - viewsA;
                    }
                    return 0;
                });
                
                cards.forEach(card => container.appendChild(card));
            }
            
            // Update active filters display
            updateActiveFilters(category, dietary, sortBy);
            
            // Update recipe count and empty state
            updateRecipeCount(visibleCount);
            toggleEmptyState(visibleCount === 0);
            
            // Hide loading state and show results
            setTimeout(() => {
                document.getElementById('loading-state').classList.add('hidden');
                document.getElementById('recipes-container').classList.remove('hidden');
            }, 300);
        }
        
        function updateActiveFilters(category, dietary, sortBy) {
            const activeFilters = document.getElementById('active-filters');
            activeFilters.innerHTML = '';
            
            if (category) {
                addFilterBadge('Category: ' + category, 'category');
            }
            if (dietary) {
                addFilterBadge('Diet: ' + dietary, 'dietary');
            }
            if (sortBy) {
                addFilterBadge('Sort: ' + sortBy, 'sort');
            }
        }
        
        function addFilterBadge(text, type) {
            const badge = document.createElement('span');
            badge.className = 'filter-badge active inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-[#375A64]';
            badge.innerHTML = text + ' <button onclick="removeFilter(\'' + type + '\')" class="ml-2 text-[#375A64] hover:text-yellow-600"><i class="fas fa-times"></i></button>';
            document.getElementById('active-filters').appendChild(badge);
        }
        
        function removeFilter(type) {
            switch(type) {
                case 'category':
                    document.getElementById('category-filter').value = '';
                    break;
                case 'dietary':
                    document.getElementById('dietary-filter').value = '';
                    break;
                case 'sort':
                    document.getElementById('sort-by').value = 'newest';
                    break;
            }
            filterRecipes();
        }
        
        function resetFilters() {
            document.getElementById('category-filter').value = '';
            document.getElementById('dietary-filter').value = '';
            document.getElementById('sort-by').value = 'newest';
            document.getElementById('search-input').value = '';
            filterRecipes();
        }
        
        function updateRecipeCount(count) {
            document.getElementById('recipe-count').textContent = count;
        }
        
        function toggleEmptyState(isEmpty) {
            document.getElementById('empty-state').classList.toggle('hidden', !isEmpty);
        }
        
        // Initialize filters
        document.getElementById('category-filter').addEventListener('change', filterRecipes);
        document.getElementById('dietary-filter').addEventListener('change', filterRecipes);
        document.getElementById('sort-by').addEventListener('change', filterRecipes);

        function showRecipeDetails(recipe) {
            document.getElementById('modalRecipeName').textContent = recipe.name;
            document.getElementById('modalRecipeAuthor').textContent = recipe.author_name;
            document.getElementById('modalRecipeCategory').textContent = recipe.category;
            document.getElementById('modalPrepTime').textContent = recipe.prep_time + ' minutes';
            document.getElementById('modalServings').textContent = recipe.servings;
            document.getElementById('modalCalories').textContent = recipe.calories + ' kcal';
            document.getElementById('modalProtein').textContent = recipe.protein + 'g';
            document.getElementById('modalCarbs').textContent = recipe.carbs + 'g';
            document.getElementById('modalFiber').textContent = recipe.fiber + 'g';
            document.getElementById('modalNotes').textContent = recipe.notes || 'No notes available';

            // Set image
            const imagePath = '../img/recipes/';
            const placeholderImage = '../img/recipes/recipe-placeholder.jpg';
            const imageName = recipe.image_path ? recipe.image_path.split('/').pop() : 'recipe-placeholder.jpg';
            const imageUrl = imagePath + imageName;
            document.getElementById('modalRecipeImage').src = imageUrl;
            document.getElementById('modalRecipeImage').alt = recipe.name;

            // Fetch and display ingredients
            fetchIngredients(recipe.id);

            // Fetch and display instructions
            fetchInstructions(recipe.id);

            // Show modal
            document.getElementById('recipeModal').classList.remove('hidden');
        }

        function closeRecipeModal() {
            document.getElementById('recipeModal').classList.add('hidden');
        }

        function fetchIngredients(recipeId) {
            fetch(`get-recipe-data.php?type=ingredients&id=${recipeId}`)
                .then(response => response.json())
                .then(data => {
                    const ingredientsList = document.getElementById('modalIngredients');
                    ingredientsList.innerHTML = '';
                    data.forEach(ingredient => {
                        const li = document.createElement('li');
                        li.textContent = ingredient.ingredient;
                        ingredientsList.appendChild(li);
                    });
                });
        }

        function fetchInstructions(recipeId) {
            fetch(`get-recipe-data.php?type=instructions&id=${recipeId}`)
                .then(response => response.json())
                .then(data => {
                    const instructionsList = document.getElementById('modalInstructions');
                    instructionsList.innerHTML = '';
                    data.forEach(instruction => {
                        const li = document.createElement('li');
                        li.textContent = instruction.instruction;
                        instructionsList.appendChild(li);
                    });
                });
        }

        // Close modal when clicking outside
        document.getElementById('recipeModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeRecipeModal();
            }
        });
    </script>
</body>
</html>