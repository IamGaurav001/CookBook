// Main event listener that runs when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
  });
  
  // User menu toggle functionality
  const userMenuButton = document.getElementById('user-menu-button');
  const userMenu = document.getElementById('user-menu');
  
  userMenuButton.addEventListener('click', function() {
      userMenu.classList.toggle('hidden');
  });
  
  // Close menus when clicking outside
  document.addEventListener('click', function(event) {
      if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
          mobileMenu.classList.add('hidden');
      }
      
      if (!userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
          userMenu.classList.add('hidden');
      }
  });

  // Recipe card and view modal functionality
  const recipeCards = document.querySelectorAll(".recipe-card")
  const viewRecipeModal = document.getElementById("view-recipe-modal")
  const closeViewModal = document.getElementById("close-view-modal")

  // Add click handlers for recipe cards
  recipeCards.forEach((card) => {
    const viewButton = card.querySelector(".view-recipe")
    if (viewButton) {
      viewButton.addEventListener("click", (e) => {
        e.stopPropagation()
        const recipeId = card.getAttribute("data-recipe")
        fetchRecipeDetails(recipeId)
      })
    }

    card.addEventListener("click", function (e) {
      if (!e.target.closest(".delete-recipe") && !e.target.closest(".view-recipe")) {
        const recipeId = this.getAttribute("data-recipe")
        fetchRecipeDetails(recipeId)
      }
    })
  })

  // Close view modal
  closeViewModal.addEventListener("click", () => {
    viewRecipeModal.classList.add("hidden")
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === viewRecipeModal) {
      viewRecipeModal.classList.add("hidden")
    }
  })

  // Fetch and display recipe details
  function fetchRecipeDetails(recipeId) {
    console.log("Fetching recipe details for ID:", recipeId)
  
    fetch(`add-recipe.php?id=${recipeId}`)
      .then((response) => {
        console.log("Response status:", response.status)
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.status)
        }
        return response.json()
      })
      .then((data) => {
        console.log("Recipe data received:", data)
        if (data.success) {
          populateRecipeModal(data.recipe)
          viewRecipeModal.classList.remove("hidden")
        } else {
          alert("Error loading recipe details: " + (data.message || "Unknown error"))
        }
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error)
        alert("Failed to load recipe details. Please try again.")
      })
  }
  
  // Populate recipe modal with recipe details
  function populateRecipeModal(recipe) {
    console.log("Populating modal with recipe:", recipe)
  
    // Set basic recipe information
    document.getElementById("modal-title").textContent = recipe.name || "Untitled Recipe"
    document.getElementById("modal-prep-time").textContent = (recipe.prep_time || "N/A") + " minutes"
    document.getElementById("modal-calories").textContent = recipe.calories
      ? recipe.calories + " calories"
      : "Not specified"
    document.getElementById("modal-servings").textContent = (recipe.servings || "N/A") + " servings"
  
    // Set nutrition information
    document.getElementById("modal-protein").textContent = recipe.protein ? recipe.protein + " g" : "Not specified"
    document.getElementById("modal-carbs").textContent = recipe.carbs ? recipe.carbs + " g" : "Not specified"
    document.getElementById("modal-fiber").textContent = recipe.fiber ? recipe.fiber + " g" : "Not specified"
  
    // Set category
    if (recipe.category) {
      document.getElementById("modal-category").textContent =
        recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)
    } else {
      document.getElementById("modal-category").textContent = "Uncategorized"
    }
  
    // Set recipe image
    const modalImage = document.getElementById("modal-image")
    if (recipe.image_path) {
      modalImage.src = "../" + recipe.image_path
    } else {
      modalImage.src = "../img/Alfredo.png"
    }
  
    // Populate ingredients list
    const ingredientsList = document.getElementById("modal-ingredients")
    ingredientsList.innerHTML = ""
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      recipe.ingredients.forEach((ingredient) => {
        const li = document.createElement("li")
        li.textContent = ingredient.ingredient
        ingredientsList.appendChild(li)
      })
    } else {
      const li = document.createElement("li")
      li.textContent = "No ingredients listed"
      ingredientsList.appendChild(li)
    }
  
    // Populate instructions list
    const instructionsList = document.getElementById("modal-instructions")
    instructionsList.innerHTML = ""
    if (recipe.instructions && recipe.instructions.length > 0) {
      recipe.instructions.forEach((instruction) => {
        const li = document.createElement("li")
        li.textContent = instruction.instruction
        instructionsList.appendChild(li)
      })
    } else {
      const li = document.createElement("li")
      li.textContent = "No instructions listed"
      instructionsList.appendChild(li)
    }
  
    // Handle recipe notes
    const notesContainer = document.getElementById("modal-notes-container")
    const notesContent = document.getElementById("modal-notes")
    if (recipe.notes) {
      notesContent.textContent = recipe.notes
      notesContainer.classList.remove("hidden")
    } else {
      notesContainer.classList.add("hidden")
    }
  }

  // Function to update shopping list count
  function updateShoppingListCount() {
    fetch('shopping-list.php?get_count=1')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.querySelector('.shopping-list-count').textContent = data.count;
            }
        })
        .catch(error => {
            console.error('Error updating shopping list count:', error);
        });
  }

  // Listen for shopping list updates from other tabs/windows
  window.addEventListener('storage', function(e) {
    if (e.key === 'shoppingListUpdated') {
        updateShoppingListCount();
    }
  });

  // Initial count update
  updateShoppingListCount();
});