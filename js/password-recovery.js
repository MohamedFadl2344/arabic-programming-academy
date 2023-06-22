document.addEventListener('DOMContentLoaded', function() {
    // Form Elements
    const recoveryForm = document.getElementById('recovery-form');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const otpInputs = document.querySelectorAll('.otp-input');
    
    // Add password toggle to password fields
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
    });
    
    // Handle OTP Input
    if (otpInputs.length) {
        otpInputs.forEach((input, index) => {
            // Handle input
            input.addEventListener('input', function(e) {
                if (e.inputType !== 'deleteContentBackward') {
                    // Move to next input
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    }
                }
            });
            
            // Handle keydown
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && !this.value) {
                    // Move to previous input
                    if (index > 0) {
                        otpInputs[index - 1].focus();
                    }
                }
            });
            
            // Handle paste
            input.addEventListener('paste', function(e) {
                e.preventDefault();
                const pasteData = e.clipboardData.getData('text').slice(0, otpInputs.length);
                
                // Distribute pasted data across inputs
                pasteData.split('').forEach((char, i) => {
                    if (i < otpInputs.length) {
                        otpInputs[i].value = char;
                        if (i < otpInputs.length - 1) {
                            otpInputs[i + 1].focus();
                        }
                    }
                });
            });
        });
        
        // Start Timer
        let timeLeft = 120; // 2 minutes
        const timerCount = document.getElementById('timer-count');
        const resendButton = document.getElementById('resend-button');
        
        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerCount.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            if (timeLeft === 0) {
                resendButton.classList.add('active');
                resendButton.disabled = false;
            } else {
                timeLeft--;
                setTimeout(updateTimer, 1000);
            }
        };
        
        updateTimer();
        
        // Handle Resend
        resendButton.addEventListener('click', function() {
            // Reset timer
            timeLeft = 120;
            this.classList.remove('active');
            this.disabled = true;
            updateTimer();
            
            // TODO: Add API call to resend code
            console.log('Resending code...');
        });
    }
    
    // Handle Password Reset
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    
    if (newPassword && confirmPassword) {
        // Password match validation
        confirmPassword.addEventListener('input', function() {
            if (newPassword.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('كلمات المرور غير متطابقة');
            } else {
                confirmPassword.setCustomValidity('');
            }
        });

        // Password strength validation
        newPassword.addEventListener('input', function() {
            const value = newPassword.value;
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
                newPassword.setCustomValidity('كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، و8 أحرف على الأقل');
            } else {
                newPassword.setCustomValidity('');
            }
        });
    }
    
    // Handle form submission
    if (recoveryForm) {
        recoveryForm.addEventListener('submit', function(event) {
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
        });
    }
});
