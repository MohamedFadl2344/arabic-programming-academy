document.addEventListener('DOMContentLoaded', function() {
    // Form Elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    // Add password toggle to all password fields
    passwordInputs.forEach(input => {
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'password-toggle-btn';
        toggleButton.innerHTML = '<i class="far fa-eye"></i>';
        toggleButton.setAttribute('aria-label', 'تبديل رؤية كلمة المرور');
        
        // Wrap input in a container
        const wrapper = document.createElement('div');
        wrapper.className = 'password-field';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        wrapper.appendChild(toggleButton);
        
        // Show/hide toggle button based on input content
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                toggleButton.classList.add('visible');
            } else {
                toggleButton.classList.remove('visible');
                // Reset to password type if empty
                if (this.type === 'text') {
                    this.type = 'password';
                    toggleButton.querySelector('i').className = 'far fa-eye';
                }
            }
        });
        
        // Toggle password visibility
        toggleButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'far fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'far fa-eye';
            }
            input.focus();
        });
        
        // Check initial state
        if (input.value.length > 0) {
            toggleButton.classList.add('visible');
        }
    });
    
    // Register Form Validation
    if (registerForm) {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        
        // Password match validation
        confirmPassword.addEventListener('input', function() {
            if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('كلمات المرور غير متطابقة');
            } else {
                confirmPassword.setCustomValidity('');
            }
        });

        // Password strength validation
        password.addEventListener('input', function() {
            const value = password.value;
            const hasLower = /[a-z]/.test(value);
            const hasUpper = /[A-Z]/.test(value);
            const hasNumber = /\d/.test(value);
            const isLongEnough = value.length >= 8;
            
            const strengthIndicator = document.getElementById('password-strength');
            let strength = 0;
            let message = '';
            
            if (hasLower) strength++;
            if (hasUpper) strength++;
            if (hasNumber) strength++;
            if (isLongEnough) strength++;
            
            switch(strength) {
                case 0:
                    message = 'ضعيفة جداً';
                    strengthIndicator.className = 'password-strength very-weak';
                    break;
                case 1:
                    message = 'ضعيفة';
                    strengthIndicator.className = 'password-strength weak';
                    break;
                case 2:
                    message = 'متوسطة';
                    strengthIndicator.className = 'password-strength medium';
                    break;
                case 3:
                    message = 'قوية';
                    strengthIndicator.className = 'password-strength strong';
                    break;
                case 4:
                    message = 'قوية جداً';
                    strengthIndicator.className = 'password-strength very-strong';
                    break;
            }
            
            strengthIndicator.textContent = `قوة كلمة المرور: ${message}`;
            
            if (strength < 4) {
                password.setCustomValidity('كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، و8 أحرف على الأقل');
            } else {
                password.setCustomValidity('');
            }
        });
        
        registerForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Login Form Validation
    if (loginForm) {
        loginForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Handle form submission
    function handleFormSubmit(event) {
        if (!this.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            
            // Show error messages with animation
            const invalidInputs = this.querySelectorAll(':invalid');
            invalidInputs.forEach(input => {
                input.parentElement.classList.add('shake');
                setTimeout(() => {
                    input.parentElement.classList.remove('shake');
                }, 650);
            });
        }
        this.classList.add('was-validated');
    }
    
    // Add floating label effect
    document.querySelectorAll('.auth-input').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check initial state
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});
