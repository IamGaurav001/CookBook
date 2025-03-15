(() => {
    // Cache DOM elements for better performance
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Tab switching functionality
    function switchTab(activeTab, inactiveTab, showForm, hideForm) {
        activeTab.classList.add('tab-active');
        activeTab.classList.remove('tab-inactive');
        inactiveTab.classList.remove('tab-active');
        inactiveTab.classList.add('tab-inactive');

        showForm.classList.remove('hidden');
        hideForm.classList.add('hidden');
    }

    loginTab.addEventListener('click', () => switchTab(loginTab, signupTab, loginForm, signupForm));
    signupTab.addEventListener('click', () => switchTab(signupTab, loginTab, signupForm, loginForm));

    // Password visibility toggle
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            input.type = input.type === 'password' ? 'text' : 'password';
            button.innerHTML = input.type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    });

    // Form validation and submission handling
    function handleFormSubmit(event, isSignup = false) {
        event.preventDefault();
        
        const form = event.target;
        const email = form.querySelector('[type="email"]').value.trim();
        const password = form.querySelector('[type="password"]').value.trim();

        if (!email || !password) {
            alert('Please fill in all required fields.');
            return;
        }

        if (isSignup) {
            const name = form.querySelector('#signup-name').value.trim();
            const confirmPassword = form.querySelector('#signup-confirm-password').value.trim();
            const dietaryPreference = form.querySelector('#dietary-preference').value;
            const termsAgreed = form.querySelector('#terms').checked;

            if (!name) {
                alert('Please enter your name.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                alert('Password must be at least 8 characters long, with 1 uppercase letter, 1 number, and 1 special character.');
                return;
            }

            if (!termsAgreed) {
                alert('You must agree to the Terms of Service and Privacy Policy.');
                return;
            }

            console.log('Sign-up attempt:', { name, email, dietaryPreference });
            alert('Account created successfully! Redirecting...');
        } else {
            console.log('Login attempt:', { email });
            alert('Login successful! Redirecting...');
        }

        // Simulate redirection
        setTimeout(() => window.location.href = '/dashboard', 1000);
    }

    document.querySelector('#login-form form').addEventListener('submit', event => handleFormSubmit(event));
    document.querySelector('#signup-form form').addEventListener('submit', event => handleFormSubmit(event, true));
})();
