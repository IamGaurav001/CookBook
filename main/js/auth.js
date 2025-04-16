// Main event listener that runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality between login and signup forms
  const loginTab = document.getElementById("login-tab")
  const signupTab = document.getElementById("signup-tab")
  const loginForm = document.getElementById("login-form")
  const signupForm = document.getElementById("signup-form")

  // Handle login tab click
  if (loginTab) {
    loginTab.addEventListener("click", () => {
      loginTab.classList.add("tab-active")
      loginTab.classList.remove("tab-inactive")
      signupTab.classList.add("tab-inactive")
      signupTab.classList.remove("tab-active")

      loginForm.classList.remove("hidden")
      signupForm.classList.add("hidden")
    })
  }

  // Handle signup tab click
  if (signupTab) {
    signupTab.addEventListener("click", () => {
      signupTab.classList.add("tab-active")
      signupTab.classList.remove("tab-inactive")
      loginTab.classList.add("tab-inactive")
      loginTab.classList.remove("tab-active")

      signupForm.classList.remove("hidden")
      loginForm.classList.add("hidden")
    })
  }

  // Password visibility toggle functionality
  const togglePasswordButtons = document.querySelectorAll(".toggle-password")

  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const passwordInput = this.parentElement.querySelector("input")
      const icon = this.querySelector("i")

      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        passwordInput.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  })

  // Form validation for signup - Simplified password requirements
  const signupFormElement = document.getElementById("signup-form-element")
  if (signupFormElement) {
    signupFormElement.addEventListener("submit", function (event) {
      event.preventDefault();
      
      const nameInput = document.getElementById("signup-name")
      const emailInput = document.getElementById("signup-email")
      const passwordInput = document.getElementById("signup-password")
      const confirmPasswordInput = document.getElementById("signup-confirm-password")
      const termsCheckbox = document.getElementById("terms")
      const submitButton = this.querySelector('button[type="submit"]')
      let hasError = false
      let errorMessages = []

      // Reset previous error states
      nameInput.classList.remove("error-highlight")
      emailInput.classList.remove("error-highlight")
      passwordInput.classList.remove("error-highlight")
      confirmPasswordInput.classList.remove("error-highlight")

      // Validate name
      if (!nameInput.value.trim()) {
        errorMessages.push("Please enter your name")
        nameInput.classList.add("error-highlight")
        hasError = true
      }

      // Validate email
      if (!emailInput.value.trim()) {
        errorMessages.push("Please enter your email")
        emailInput.classList.add("error-highlight")
        hasError = true
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        errorMessages.push("Please enter a valid email address")
        emailInput.classList.add("error-highlight")
        hasError = true
      }

      // Simplified password validation
      if (!passwordInput.value) {
        errorMessages.push("Please enter a password")
        passwordInput.classList.add("error-highlight")
        hasError = true
      } else if (passwordInput.value.length < 6) {
        errorMessages.push("Password must be at least 6 characters long")
        passwordInput.classList.add("error-highlight")
        hasError = true
      }

      // Confirm password
      if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessages.push("Passwords do not match")
        confirmPasswordInput.classList.add("error-highlight")
        hasError = true
      }

      // Terms checkbox
      if (!termsCheckbox.checked) {
        errorMessages.push("Please accept the Terms of Service")
        hasError = true
      }

      if (hasError) {
        showAlert(errorMessages.join("<br>"), "error")
        return
      }

      // Show processing state
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Creating Account...'
      submitButton.disabled = true

      // Submit the form
      setTimeout(() => {
        this.submit()
      }, 100)
    })
  }

  // Login form handling with visual feedback
  const loginFormElement = document.getElementById("login-form-element")
  if (loginFormElement) {
    loginFormElement.addEventListener("submit", function (event) {
      const submitButton = this.querySelector('button[type="submit"]')
      const emailInput = document.getElementById("login-email")
      const passwordInput = document.getElementById("login-password")
      let hasError = false

      // Reset previous error states
      emailInput.classList.remove("error-highlight")
      passwordInput.classList.remove("error-highlight")

      // Basic validation
      if (!emailInput.value.trim()) {
        emailInput.classList.add("error-highlight")
        hasError = true
      }
      if (!passwordInput.value.trim()) {
        passwordInput.classList.add("error-highlight")
        hasError = true
      }

      if (hasError) {
        event.preventDefault()
        showAlert("Please fill in all fields", "error")
        return
      }

      // Show processing state
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Logging in...'
      submitButton.disabled = true
    })
  }

  // Add button click effects
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 100)
    })
  })

  // Add custom alerts functionality
  window.showAlert = (message, type = "success") => {
    const alertDiv = document.createElement("div")
    alertDiv.className = `fixed top-4 right-4 p-4 rounded-lg z-50 ${
      type === "success" ? "bg-green-100 text-green-700 border border-green-400" : 
      "bg-red-100 text-red-700 border border-red-400"
    }`

    // Add content
    alertDiv.innerHTML = `
      <div class="flex items-center">
        <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"} mr-3"></i>
        <div>
          <p class="font-bold">${type === "success" ? "Success!" : "Error!"}</p>
          <p>${message}</p>
        </div>
        <button class="ml-auto" onclick="this.parentElement.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `

    document.body.appendChild(alertDiv)

    // Auto remove after 5 seconds
    setTimeout(() => {
      alertDiv.style.opacity = "0"
      alertDiv.style.transition = "opacity 0.5s ease"
      setTimeout(() => alertDiv.remove(), 500)
    }, 5000)
  }

  // Add success message display if present in URL
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.has("success")) {
    showAlert("Your account has been created successfully! Please log in.", "success")
  }
  if (urlParams.has("error")) {
    showAlert(urlParams.get("error") || "An error occurred. Please try again.", "error")
  }

  // Check for wrong password in URL parameters
  if (urlParams.has("wrong_password")) {
    const passwordInput = document.getElementById("login-password")
    if (passwordInput) {
      passwordInput.classList.add("error-highlight")
      passwordInput.classList.add("shake-error")

      // Show error message
      showAlert("Incorrect password. Please try again.", "error")

      // Remove the animation class after it completes
      passwordInput.addEventListener("animationend", () => {
        passwordInput.classList.remove("shake-error")
      })
    }
  }
})

