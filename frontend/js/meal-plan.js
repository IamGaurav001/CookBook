document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  document.getElementById("mobile-menu-button").addEventListener("click", () => {
    const mobileMenu = document.getElementById("mobile-menu")
    mobileMenu.classList.toggle("hidden")
  })

  // User menu toggle
  document.getElementById("user-menu-button").addEventListener("click", () => {
    const userMenu = document.getElementById("user-menu")
    userMenu.classList.toggle("hidden")
  })

  // Create Plan Modal
  const createPlanBtn = document.getElementById("create-plan-btn")
  const createPlanModal = document.getElementById("create-plan-modal")
  const closeCreateModal = document.getElementById("close-create-modal")
  const cancelCreatePlan = document.getElementById("cancel-create-plan")

  // Check if empty state button exists
  const emptyCreatePlanBtn = document.getElementById("empty-create-plan-btn")
  if (emptyCreatePlanBtn) {
    emptyCreatePlanBtn.addEventListener("click", () => {
      createPlanModal.classList.remove("hidden")
    })
  }

  if (createPlanBtn) {
    createPlanBtn.addEventListener("click", () => {
      createPlanModal.classList.remove("hidden")
    })
  }

  if (closeCreateModal) {
    closeCreateModal.addEventListener("click", () => {
      createPlanModal.classList.add("hidden")
    })
  }

  if (cancelCreatePlan) {
    cancelCreatePlan.addEventListener("click", () => {
      createPlanModal.classList.add("hidden")
    })
  }

  // Add Meal Modal
  const addMealModal = document.getElementById("add-meal-modal")
  const closeAddMealModal = document.getElementById("close-add-meal-modal")
  const cancelAddMeal = document.getElementById("cancel-add-meal")
  const addMealForm = document.getElementById("add-meal-form")
  const selectedRecipeId = document.getElementById("selected-recipe-id")
  const selectedSlotId = document.getElementById("selected-slot-id")
  const confirmAddMeal = document.getElementById("confirm-add-meal")

  // Add meal buttons
  const addMealBtns = document.querySelectorAll(".add-meal-btn")

  addMealBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const slotId = this.getAttribute("data-slot-id")
      if (slotId) {
        selectedSlotId.value = slotId
        addMealModal.classList.remove("hidden")
      }
    })
  })

  if (closeAddMealModal) {
    closeAddMealModal.addEventListener("click", () => {
      addMealModal.classList.add("hidden")
    })
  }

  if (cancelAddMeal) {
    cancelAddMeal.addEventListener("click", () => {
      addMealModal.classList.add("hidden")
    })
  }

  // Recipe selection
  const recipeItems = document.querySelectorAll(".meal-item[data-recipe-id]")

  recipeItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove selected class from all items
      recipeItems.forEach((i) => i.classList.remove("border-yellow-300", "bg-yellow-50"))

      // Add selected class to clicked item
      this.classList.add("border-yellow-300", "bg-yellow-50")

      // Set selected recipe ID
      selectedRecipeId.value = this.getAttribute("data-recipe-id")

      // Enable submit button
      confirmAddMeal.disabled = false
    })
  })

  // Recipe search
  const recipeSearch = document.getElementById("recipe-search")

  if (recipeSearch) {
    recipeSearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()

      recipeItems.forEach((item) => {
        const recipeName = item.querySelector(".font-medium").textContent.toLowerCase()

        if (recipeName.includes(searchTerm)) {
          item.style.display = "flex"
        } else {
          item.style.display = "none"
        }
      })
    })
  }

  // Remove meal buttons
  const removeMealBtns = document.querySelectorAll(".remove-meal-btn")

  removeMealBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation()
      const slotId = this.getAttribute("data-slot-id")

      if (confirm("Are you sure you want to remove this meal from your plan?")) {
        removeMeal(slotId)
      }
    })
  })

  // Function to remove a meal from the plan
  function removeMeal(slotId) {
    fetch(window.location.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `remove-meal=true&slot_id=${slotId}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Reload the page to show updated meal plan
          location.reload()
        } else {
          showToast(data.message || "Error removing meal from plan", "error")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        showToast("An error occurred while removing the meal", "error")
      })
  }

  // Function to show toast notifications
  function showToast(message, type = "success") {
    const toast = document.getElementById("toast")
    toast.textContent = message
    toast.className = `toast ${type}`

    // Show the toast
    setTimeout(() => {
      toast.classList.add("show")
    }, 100)

    // Hide the toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show")

      // Remove the toast from DOM after animation
      setTimeout(() => {
        toast.className = "toast"
      }, 300)
    }, 3000)
  }

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === createPlanModal) {
      createPlanModal.classList.add("hidden")
    }
    if (e.target === addMealModal) {
      addMealModal.classList.add("hidden")
    }
  })

  // Set default dates for create plan form
  const startDateInput = document.getElementById("start-date")
  const endDateInput = document.getElementById("end-date")

  if (startDateInput && endDateInput) {
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 6)

    startDateInput.valueAsDate = today
    endDateInput.valueAsDate = nextWeek

    // Auto-generate plan name based on dates
    const planNameInput = document.getElementById("plan-name")
    if (planNameInput) {
      const startFormatted = today.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      const endFormatted = nextWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      planNameInput.value = `Weekly Plan (${startFormatted} - ${endFormatted})`

      // Update plan name when dates change
      startDateInput.addEventListener("change", updatePlanName)
      endDateInput.addEventListener("change", updatePlanName)

      function updatePlanName() {
        const start = new Date(startDateInput.value)
        const end = new Date(endDateInput.value)
        const startFormat = start.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        const endFormat = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        planNameInput.value = `Weekly Plan (${startFormat} - ${endFormat})`
      }
    }
  }

  // Handle form submission with AJAX
  if (addMealForm) {
    addMealForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const searchParams = new URLSearchParams()

      for (const pair of formData) {
        searchParams.append(pair[0], pair[1])
      }

      fetch(window.location.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Close modal
            addMealModal.classList.add("hidden")

            // Show success message
            showToast("Meal added to plan successfully!")

            // Reload the page to show updated meal plan
            location.reload()
          } else {
            showToast(data.message || "Error adding meal to plan", "error")
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          showToast("An error occurred while adding the meal", "error")
        })
    })
  }

  // Delete meal plan functionality
  const deletePlanBtns = document.querySelectorAll(".delete-plan-btn")

  deletePlanBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation()
      const planId = this.getAttribute("data-plan-id")

      if (confirm("Are you sure you want to delete this meal plan? This action cannot be undone.")) {
        deleteMealPlan(planId)
      }
    })
  })

  // Function to delete a meal plan
  function deleteMealPlan(planId) {
    fetch(window.location.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `delete_plan=true&plan_id=${planId}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showToast("Meal plan deleted successfully", "success")
          // Reload the page after a short delay
          setTimeout(() => {
            location.reload()
          }, 1000)
        } else {
          showToast(data.message || "Error deleting meal plan", "error")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        showToast("An error occurred while deleting the meal plan", "error")
      })
  }
})
