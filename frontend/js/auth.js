document.addEventListener('DOMContentLoaded', function() {
  // Tab switching functionality
  const loginTab = document.getElementById('login-tab');
  const signupTab = document.getElementById('signup-tab');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  
  loginTab.addEventListener('click', function() {
      loginTab.classList.add('tab-active');
      loginTab.classList.remove('tab-inactive');
      signupTab.classList.add('tab-inactive');
      signupTab.classList.remove('tab-active');
      
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
  });
  
  signupTab.addEventListener('click', function() {
      signupTab.classList.add('tab-active');
      signupTab.classList.remove('tab-inactive');
      loginTab.classList.add('tab-inactive');
      loginTab.classList.remove('tab-active');
      
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
  });
  
  // Password visibility toggle
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  
  togglePasswordButtons.forEach(button => {
      button.addEventListener('click', function() {
          const passwordInput = this.parentElement.querySelector('input');
          const icon = this.querySelector('i');
          
          if (passwordInput.type === 'password') {
              passwordInput.type = 'text';
              icon.classList.remove('fa-eye');
              icon.classList.add('fa-eye-slash');
          } else {
              passwordInput.type = 'password';
              icon.classList.remove('fa-eye-slash');
              icon.classList.add('fa-eye');
          }
      });
  });
  
  // Form validation
  const signupFormElement = document.getElementById('signup-form-element');
  
  signupFormElement.addEventListener('submit', function(event) {
      const termsCheckbox = document.getElementById('terms');
      const termsError = document.getElementById('terms-error');
      
      if (!termsCheckbox.checked) {
          event.preventDefault();
          termsError.textContent = 'You must agree to the Terms of Service and Privacy Policy';
          termsError.classList.remove('hidden');
      } else {
          termsError.classList.add('hidden');
      }
  });
});
