document.addEventListener("DOMContentLoaded", () => {
    // Cache DOM elements
    const loginTab = document.getElementById("login-tab")
    const signupTab = document.getElementById("signup-tab")
    const loginForm = document.getElementById("login-form")
    const signupForm = document.getElementById("signup-form")
    const loginFormElement = document.getElementById("login-form-element")
    const signupFormElement = document.getElementById("signup-form-element")
    const toast = document.getElementById("toast")
    const closeToast = document.getElementById("close-toast")
    const toastTitle = document.getElementById("toast-title")
    const toastMessage = document.getElementById("toast-message")
    const toastIcon = document.getElementById("toast-icon")
  
    // Check URL parameters for tab selection
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get("tab")
  
    if (tabParam === "signup") {
      switchTab(signupTab, loginTab, signupForm, loginForm)
    }
  
    // Tab switching functionality
    function switchTab(activeTab, inactiveTab, showForm, hideForm) {
      activeTab.classList.add("tab-active")
      activeTab.classList.remove("tab-inactive")
      inactiveTab.classList.remove("tab-active")
      inactiveTab.classList.add("tab-inactive")
  
      showForm.classList.remove("hidden")
      hideForm.classList.add("hidden")
    }
  
    if (loginTab && signupTab) {
      loginTab.addEventListener("click", () => switchTab(loginTab, signupTab, loginForm, signupForm))
      signupTab.addEventListener("click", () => switchTab(signupTab, loginTab, signupForm, loginForm))
    }
  
    // Password visibility toggle
    document.querySelectorAll(".toggle-password").forEach((button) => {
      button.addEventListener("click", () => {
        const input = button.previousElementSibling
        input.type = input.type === "password" ? "text" : "password"
        button.innerHTML = input.type === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>'
      })
    })
  
    // Show toast notification
    function showToast(title, message, type = "success") {
      if (!toast) return
  
      toastTitle.textContent = title
      toastMessage.textContent = message
  
      if (type === "success") {
        toastIcon.innerHTML = '<i class="fas fa-check-circle"></i>'
        toastIcon.className = "flex-shrink-0 w-6 h-6 mr-3 text-green-500"
      } else if (type === "error") {
        toastIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>'
        toastIcon.className = "flex-shrink-0 w-6 h-6 mr-3 text-red-500"
      }
  
      toast.classList.remove("translate-x-full")
  
      // Auto hide after 5 seconds
      setTimeout(() => {
        hideToast()
      }, 5000)
    }
  
    // Hide toast notification
    function hideToast() {
      if (!toast) return
      toast.classList.add("translate-x-full")
    }
  
    if (closeToast) {
      closeToast.addEventListener("click", hideToast)
    }
  
    // Form validation
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  
    function validatePassword(password) {
      // At least 8 characters, 1 uppercase, 1 number, 1 special character
      const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      return re.test(password)
    }
  
    function showError(inputId, message) {
      const errorElement = document.getElementById(`${inputId}-error`)
      if (!errorElement) return
  
      errorElement.textContent = message
      errorElement.classList.remove("hidden")
      document.getElementById(inputId).classList.add("border-red-500")
    }
  
    function clearError(inputId) {
      const errorElement = document.getElementById(`${inputId}-error`)
      if (!errorElement) return
  
      errorElement.textContent = ""
      errorElement.classList.add("hidden")
      document.getElementById(inputId).classList.remove("border-red-500")
    }
  
    // Login form submission
    if (loginFormElement) {
      loginFormElement.addEventListener("submit", (event) => {
        event.preventDefault()
        let isValid = true
  
        const email = document.getElementById("login-email").value.trim()
        const password = document.getElementById("login-password").value.trim()
  
        // Clear previous errors
        clearError("login-email")
        clearError("login-password")
  
        // Validate email
        if (!email) {
          showError("login-email", "Email is required")
          isValid = false
        } else if (!validateEmail(email)) {
          showError("login-email", "Please enter a valid email address")
          isValid = false
        }
  
        // Validate password
        if (!password) {
          showError("login-password", "Password is required")
          isValid = false
        }
  
        if (isValid) {
          // Store user info in localStorage for demo purposes
          // In a real app, this would be handled by a server
          const userData = {
            email: email,
            name: "Gaurav Kumar Dubey", // Default name for demo
            initials: "GKD",
          }
  
          localStorage.setItem("cookbook_user", JSON.stringify(userData))
  
          showToast("Login Successful", "Redirecting to dashboard...", "success")
  
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            window.location.href = "../pages/dashboard.html"
          }, 1500)
        }
      })
    }
  
    // Signup form submission
    if (signupFormElement) {
      signupFormElement.addEventListener("submit", (event) => {
        event.preventDefault()
        let isValid = true
  
        const name = document.getElementById("signup-name").value.trim()
        const email = document.getElementById("signup-email").value.trim()
        const password = document.getElementById("signup-password").value.trim()
        const confirmPassword = document.getElementById("signup-confirm-password").value.trim()
        const dietaryPreference = document.getElementById("dietary-preference").value
        const termsAgreed = document.getElementById("terms").checked
  
        // Clear previous errors
        clearError("signup-name")
        clearError("signup-email")
        clearError("signup-password")
        clearError("signup-confirm-password")
        clearError("terms")
  
        // Validate name
        if (!name) {
          showError("signup-name", "Name is required")
          isValid = false
        }
  
        // Validate email
        if (!email) {
          showError("signup-email", "Email is required")
          isValid = false
        } else if (!validateEmail(email)) {
          showError("signup-email", "Please enter a valid email address")
          isValid = false
        }
  
        // Validate password
        if (!password) {
          showError("signup-password", "Password is required")
          isValid = false
        } else if (!validatePassword(password)) {
          showError(
            "signup-password",
            "Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character",
          )
          isValid = false
        }
  
        // Validate confirm password
        if (password !== confirmPassword) {
          showError("signup-confirm-password", "Passwords do not match")
          isValid = false
        }
  
        // Validate terms
        if (!termsAgreed) {
          showError("terms", "You must agree to the Terms of Service and Privacy Policy")
          isValid = false
        }
  
        if (isValid) {
          // Get initials from name
          const initials = name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
  
          // Store user info in localStorage for demo purposes
          // In a real app, this would be handled by a server
          const userData = {
            name: name,
            email: email,
            dietaryPreference: dietaryPreference,
            initials: initials,
          }
  
          localStorage.setItem("cookbook_user", JSON.stringify(userData))
  
          showToast("Account Created", "Redirecting to dashboard...", "success")
  
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            window.location.href = "../pages/dashboard.html"
          }, 1500)
        }
      })
    }
  
    // Check if user is already logged in
    const userData = localStorage.getItem("cookbook_user")
    if (userData && window.location.pathname.includes("/Auth.html")) {
      // User is already logged in, redirect to dashboard
      window.location.href = "../pages/dashboard.html"
    }
  })
  
  