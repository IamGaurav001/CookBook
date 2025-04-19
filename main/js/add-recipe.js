// Main event listener that runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle functionality
  document.getElementById("mobile-menu-button").addEventListener("click", () => {
    const mobileMenu = document.getElementById("mobile-menu")
    mobileMenu.classList.toggle("hidden")
  })

  // User menu toggle functionality
  document.getElementById("user-menu-button").addEventListener("click", () => {
    const userMenu = document.getElementById("user-menu")
    userMenu.classList.toggle("hidden")
  })

  // Add recipe modal functionality
  const addRecipeBtn = document.getElementById("add-recipe-btn")
  const addRecipeModal = document.getElementById("add-recipe-modal")
  const closeAddModal = document.getElementById("close-add-modal")
  const cancelAddRecipe = document.getElementById("cancel-add-recipe")

  // Empty state add recipe button functionality
  const emptyAddRecipeBtn = document.getElementById("empty-add-recipe-btn")
  if (emptyAddRecipeBtn) {
    emptyAddRecipeBtn.addEventListener("click", () => {
      addRecipeModal.classList.remove("hidden")
    })
  }

  // Show add recipe modal
  addRecipeBtn.addEventListener("click", () => {
    addRecipeModal.classList.remove("hidden")
  })

  // Close add recipe modal
  closeAddModal.addEventListener("click", () => {
    addRecipeModal.classList.add("hidden")
  })

  // Cancel add recipe
  cancelAddRecipe.addEventListener("click", () => {
    addRecipeModal.classList.add("hidden")
  })

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

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === addRecipeModal) {
      addRecipeModal.classList.add("hidden")
    }
    if (e.target === viewRecipeModal) {
      viewRecipeModal.classList.add("hidden")
    }
  })

  // ingredient input functionality
  const addIngredientBtn = document.getElementById("add-ingredient")
  const ingredientsContainer = document.getElementById("ingredients-container")

  addIngredientBtn.addEventListener("click", () => {
    const newIngredient = document.createElement("div")
    newIngredient.className = "flex items-center gap-2 mb-2"
    newIngredient.innerHTML = `
              <input type="text" name="ingredient[]" class="flex-grow px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300" placeholder="e.g. 2 cups flour" required>
              <button type="button" class="remove-ingredient bg-red-100 text-red-500 p-2 rounded-lg hover:bg-red-200">
                  <i class="fas fa-times"></i>
              </button>
          `
    ingredientsContainer.appendChild(newIngredient)

    // Show remove button for first ingredient if there's more than one
    if (ingredientsContainer.children.length > 1) {
      ingredientsContainer.querySelector(".remove-ingredient").classList.remove("hidden")
    }

    newIngredient.querySelector(".remove-ingredient").addEventListener("click", () => {
      newIngredient.remove()

      if (ingredientsContainer.children.length === 1) {
        ingredientsContainer.querySelector(".remove-ingredient").classList.add("hidden")
      }
    })
  })

  // instruction input functionality
  const addInstructionBtn = document.getElementById("add-instruction")
  const instructionsContainer = document.getElementById("instructions-container")

  addInstructionBtn.addEventListener("click", () => {
    const stepNumber = instructionsContainer.children.length + 1
    const newInstruction = document.createElement("div")
    newInstruction.className = "flex items-center gap-2 mb-2"
    newInstruction.innerHTML = `
              <span class="bg-yellow-300 text-black w-6 h-6 rounded-full flex items-center justify-center font-medium">${stepNumber}</span>
              <textarea name="instruction[]" rows="2" class="flex-grow px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300" placeholder="e.g. Mix all ingredients together" required></textarea>
              <button type="button" class="remove-instruction bg-red-100 text-red-500 p-2 rounded-lg hover:bg-red-200">
                  <i class="fas fa-times"></i>
              </button>
          `
    instructionsContainer.appendChild(newInstruction)

    if (instructionsContainer.children.length > 1) {
      instructionsContainer.querySelector(".remove-instruction").classList.remove("hidden")
    }

    newInstruction.querySelector(".remove-instruction").addEventListener("click", () => {
      newInstruction.remove()

      if (instructionsContainer.children.length === 1) {
        instructionsContainer.querySelector(".remove-instruction").classList.add("hidden")
      }

      updateStepNumbers()
    })
  })

  // Update step numbers in instructions
  function updateStepNumbers() {
    const steps = instructionsContainer.querySelectorAll(".bg-yellow-300")
    steps.forEach((step, index) => {
      step.textContent = index + 1
    })
  }

  // Image upload functionality
  const uploadTrigger = document.getElementById("upload-trigger")
  const fileInput = document.getElementById("recipe-image")

  uploadTrigger.addEventListener("click", () => {
    fileInput.click() 
  })

  fileInput.addEventListener("change", (event) => {
    if (event.target.files.length > 0) {
      const fileName = event.target.files[0].name
      uploadTrigger.textContent = `Selected: ${fileName}` 
    }
  })

  // Fetch and display recipe details
  function fetchRecipeDetails(recipeId) {
    console.log("Fetching recipe details for ID:", recipeId)

    fetch(`get-recipe-data.php?id=${recipeId}`)
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
          console.log("Protein value:", data.recipe.protein)
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
    console.log("Protein value in populate:", recipe.protein)

    // Set basic recipe information
    document.getElementById("modal-title").textContent = recipe.name || "Untitled Recipe"
    document.getElementById("modal-prep-time").textContent = (recipe.prep_time || "N/A") + " minutes"
    document.getElementById("modal-calories").textContent = recipe.calories ? recipe.calories + " calories" : "Not specified"
    document.getElementById("modal-servings").textContent = (recipe.servings || "N/A") + " servings"

    // Set nutrition information with more detailed logging
    const proteinElement = document.getElementById("modal-protein")
    console.log("Protein element:", proteinElement)
    console.log("Protein value before setting:", recipe.protein)
    proteinElement.textContent = recipe.protein ? recipe.protein + " g" : "Not specified"
    console.log("Protein element text after setting:", proteinElement.textContent)

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

  // Delete recipe functionality
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-recipe") || e.target.closest(".delete-recipe")) {
      e.stopPropagation() 
      const recipeCard = e.target.closest(".recipe-card")
      const recipeId = recipeCard.getAttribute("data-recipe")

      if (confirm("Are you sure you want to delete this recipe? This action cannot be undone.")) {
        deleteRecipe(recipeId, recipeCard)
      }
    }
  })

  // Delete recipe from server
  function deleteRecipe(recipeId, recipeCard) {
    fetch(window.location.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `delete_recipe=true&recipe_id=${recipeId}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          recipeCard.remove()
          showAlert("Recipe deleted successfully", "success")

          if (document.querySelectorAll(".recipe-card").length === 0) {
            showEmptyState()
          }
        } else {
          showAlert(data.message || "Error deleting recipe", "error")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        showAlert("An error occurred while deleting the recipe", "error")
      })
  }

  // Show alert message
  function showAlert(message, type) {
    const alertDiv = document.createElement("div")
    alertDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    }`
    alertDiv.textContent = message
    document.body.appendChild(alertDiv)

    setTimeout(() => {
      alertDiv.remove()
    }, 3000)
  }

  // Show empty state when no recipes exist
  function showEmptyState() {
    const recipesContainer = document.getElementById("recipes-container")
    recipesContainer.innerHTML = `
              <div class="col-span-full text-center py-10">
                  <div class="text-4xl text-gray-300 mb-4">
                      <i class="fas fa-book"></i>
                  </div>
                  <h3 class="text-xl font-medium text-gray-500 mb-2">No recipes yet</h3>
                  <p class="text-gray-400 mb-6">Start adding your favorite recipes to your collection</p>
                  <button id="empty-add-recipe-btn" class="bg-yellow-300 text-black px-6 py-2 rounded-lg font-medium">
                      Add Your First Recipe
                  </button>
              </div>
          `

    document.getElementById("empty-add-recipe-btn").addEventListener("click", () => {
      document.getElementById("add-recipe-modal").classList.remove("hidden")
    })
  }
})
