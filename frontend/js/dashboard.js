document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
  });
  
  const userMenuButton = document.getElementById('user-menu-button');
  const userMenu = document.getElementById('user-menu');
  
  userMenuButton.addEventListener('click', function() {
      userMenu.classList.toggle('hidden');
  });
  
  document.addEventListener('click', function(event) {
      if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
          mobileMenu.classList.add('hidden');
      }
      
      if (!userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
          userMenu.classList.add('hidden');
      }
  });


    const recipeCards = document.querySelectorAll('.recipe-card');
    const viewRecipeModal = document.getElementById('view-recipe-modal');
    const closeModal = document.getElementById('close-view-modal');

    recipeCards.forEach(card => {
        card.addEventListener('click', function() {
            const recipeId = this.getAttribute('data-recipe');
            fetchRecipeDetails(recipeId);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            viewRecipeModal.classList.add('hidden');
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === recipeModal) {
            viewRecipeModal.classList.add('hidden');
        }
    });

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
    function populateRecipeModal(recipe) {
        console.log("Populating modal with recipe:", recipe)
    
        document.getElementById("modal-title").textContent = recipe.name || "Untitled Recipe"
        document.getElementById("modal-prep-time").textContent = (recipe.prep_time || "N/A") + " minutes"
        document.getElementById("modal-calories").textContent = recipe.calories
          ? recipe.calories + " calories"
          : "Not specified"
        document.getElementById("modal-servings").textContent = (recipe.servings || "N/A") + " servings"
    
        if (recipe.category) {
          document.getElementById("modal-category").textContent =
            recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)
        } else {
          document.getElementById("modal-category").textContent = "Uncategorized"
        }
    
        const modalImage = document.getElementById("modal-image")
        if (recipe.image_path) {
          modalImage.src = "../" + recipe.image_path
        } else {
          modalImage.src = "../img/Alfredo.png"
        }
    
        // Populate ingredients with error checking
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
    
        const notesContainer = document.getElementById("modal-notes-container")
        const notesContent = document.getElementById("modal-notes")
        if (recipe.notes) {
          notesContent.textContent = recipe.notes
          notesContainer.classList.remove("hidden")
        } else {
          notesContainer.classList.add("hidden")
        }
      }
    

});