document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // Check for saved email if remember me was checked
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
        emailInput.parentElement.classList.add('active');
    }

    // Form validation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Email validation
        if (!emailInput.value) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Password validation
        if (!passwordInput.value) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        if (isValid) {
            // Handle remember me
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('rememberedEmail', emailInput.value);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            // Simulate login success
            alert('Login successful!');
            loginForm.reset();
        }
    });

    // Floating label effect
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('active');
            }
        });
    });

    // Forgot password handler
    document.getElementById('forgotPassword').addEventListener('click', (e) => {
        e.preventDefault();
        const email = prompt('Enter your email to reset password:');
        if (email && isValidEmail(email)) {
            alert('Password reset link has been sent to your email.');
        } else if (email) {
            alert('Please enter a valid email address.');
        }
    });

    // Register link handler
    document.getElementById('registerLink').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Registration page coming soon!');
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const errorElement = input.parentElement.querySelector('.error-message');
    errorElement.textContent = message;
    input.classList.add('error');
}

function clearError(input) {
    const errorElement = input.parentElement.querySelector('.error-message');
    errorElement.textContent = '';
    input.classList.remove('error');
}