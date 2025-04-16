// Main event listener that runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Tab switching functionality between login and signup forms
    const loginTab = document.getElementById("login-tab")
    const signupTab = document.getElementById("signup-tab")
    const loginForm = document.getElementById("login-form")
    const signupForm = document.getElementById("signup-form")
  
    // Handle login tab click
    loginTab.addEventListener("click", () => {
      loginTab.classList.add("tab-active")
      loginTab.classList.remove("tab-inactive")
      signupTab.classList.add("tab-inactive")
      signupTab.classList.remove("tab-active")
  
      loginForm.classList.remove("hidden")
      signupForm.classList.add("hidden")
    })
  
    // Handle signup tab click
    signupTab.addEventListener("click", () => {
      signupTab.classList.add("tab-active")
      signupTab.classList.remove("tab-inactive")
      loginTab.classList.add("tab-inactive")
      loginTab.classList.remove("tab-active")
  
      signupForm.classList.remove("hidden")
      loginForm.classList.add("hidden")
    })
  
    // Password visibility toggle functionality - FIXED to work inside the input box
    const togglePasswordButtons = document.querySelectorAll(".toggle-password")
  
    togglePasswordButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const passwordInput = this.parentElement.querySelector("input")
        const icon = this.querySelector("i")
  
        // Toggle password visibility and icon
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
  
    // Form validation for signup - SIMPLIFIED password requirements
    const signupFormElement = document.getElementById("signup-form-element")
    const signupPassword = document.getElementById("signup-password")
    const signupConfirmPassword = document.getElementById("signup-confirm-password")
    const passwordError = document.getElementById("signup-password-error")
  
    if (signupFormElement) {
      signupFormElement.addEventListener("submit", function (event) {
        const termsCheckbox = document.getElementById("terms")
        const termsError = document.getElementById("terms-error")
        let hasError = false
  
        // Validate terms checkbox
        if (!termsCheckbox.checked) {
          event.preventDefault()
          termsError.textContent = "You must agree to the Terms of Service and Privacy Policy"
          termsError.classList.remove("hidden")
          hasError = true
        } else {
          termsError.classList.add("hidden")
        }
  
        // Simple password validation - just check if passwords match
        if (signupPassword && signupConfirmPassword) {
          if (signupPassword.value !== signupConfirmPassword.value) {
            event.preventDefault()
            passwordError.textContent = "Passwords do not match"
            passwordError.classList.remove("hidden")
            signupConfirmPassword.classList.add("error-highlight")
            signupConfirmPassword.classList.add("shake-error") // Add shake effect for wrong password
            hasError = true
  
            // Remove the animation class after it completes
            signupConfirmPassword.addEventListener(
              "animationend",
              () => {
                signupConfirmPassword.classList.remove("shake-error")
              },
              { once: true },
            )
          } else {
            passwordError.classList.add("hidden")
            signupConfirmPassword.classList.remove("error-highlight")
          }
        }
  
        // Show success alert if no errors
        if (!hasError) {
          // Add loading state to button
          const submitButton = this.querySelector('button[type="submit"]')
          submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Creating Account...'
          submitButton.disabled = true
  
          // We'll let the form submit naturally to process on the server
        }
      })
    }
  
    // Login form validation and wrong password feedback
    const loginFormElement = document.getElementById("login-form-element")
    const loginPassword = document.getElementById("login-password")
    const loginEmail = document.getElementById("login-email")
  
    if (loginFormElement) {
      loginFormElement.addEventListener("submit", function (event) {
        // We'll add client-side validation here, but also handle server-side errors
        const submitButton = this.querySelector('button[type="submit"]')
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Logging in...'
        submitButton.disabled = true
  
        // The form will submit naturally and PHP will handle validation
      })
    }
  
    // Add button click effects - ENHANCED
    const allButtons = document.querySelectorAll("button")
    allButtons.forEach((button) => {
      // Add ripple effect to all buttons
      button.addEventListener("click", function (e) {
        // Create ripple element
        const ripple = document.createElement("span")
        this.appendChild(ripple)
  
        // Get position
        const x = e.clientX - this.getBoundingClientRect().left
        const y = e.clientY - this.getBoundingClientRect().top
  
        // Add ripple class and position
        ripple.className = "ripple"
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
  
        // Remove ripple after animation completes
        setTimeout(() => {
          ripple.remove()
        }, 600)
  
        // Add scale effect
        this.classList.add("button-clicked")
        setTimeout(() => {
          this.classList.remove("button-clicked")
        }, 200)
      })
    })
  
    // Add specific handling for submit buttons
    const submitButtons = document.querySelectorAll('button[type="submit"]')
    submitButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Add loading state
        const originalText = this.innerHTML
        if (!this.classList.contains("loading")) {
          this.classList.add("loading")
  
          // Only show loading state if form is valid
          const form = this.closest("form")
          if (form && form.checkValidity()) {
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...'
          }
        }
      })
    })
  
    // Handle error alerts
    const loginErrorAlert = document.getElementById("login-error-alert")
    if (loginErrorAlert) {
      // Add shake animation when error is displayed
      setTimeout(() => {
        const passwordInput = document.getElementById("login-password")
        if (passwordInput) {
          passwordInput.classList.add("shake-error")
          passwordInput.classList.add("error-highlight")
  
          // Remove the animation class after it completes
          passwordInput.addEventListener("animationend", () => {
            passwordInput.classList.remove("shake-error")
          })
        }
      }, 100)
  
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        loginErrorAlert.style.opacity = "0"
        loginErrorAlert.style.transition = "opacity 0.5s ease"
        setTimeout(() => {
          loginErrorAlert.style.display = "none"
        }, 500)
      }, 5000)
    }
  
    // Add custom alerts functionality
    window.showAlert = (message, type = "success") => {
      // Create alert element
      const alertDiv = document.createElement("div")
      alertDiv.className =
        type === "success"
          ? "fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50"
          : "fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50"
  
      // Add content
      alertDiv.innerHTML = `
              <strong class="font-bold">${type === "success" ? "Success!" : "Error!"}</strong>
              <span class="block sm:inline"> ${message}</span>
              <button class="absolute top-0 right-0 px-4 py-3">
                  <i class="fas fa-times"></i>
              </button>
          `
  
      // Add to body
      document.body.appendChild(alertDiv)
  
      // Add close button functionality
      const closeButton = alertDiv.querySelector("button")
      closeButton.addEventListener("click", () => {
        alertDiv.remove()
      })
  
      // Auto remove after 5 seconds
      setTimeout(() => {
        alertDiv.style.opacity = "0"
        alertDiv.style.transition = "opacity 0.5s ease"
        setTimeout(() => {
          alertDiv.remove()
        }, 500)
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
  