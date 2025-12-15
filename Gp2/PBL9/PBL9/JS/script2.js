document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.signup-box form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    const setError = (element, message) => {
        const inputGroup = element.parentElement;
        let errorDisplay = inputGroup.querySelector('.error-message');
        if (!errorDisplay) {
            errorDisplay = document.createElement('div');
            errorDisplay.classList.add('error-message');
            inputGroup.appendChild(errorDisplay);
        }

        errorDisplay.innerText = message;
        inputGroup.classList.add('error');
        inputGroup.classList.remove('success');
    }

    const setSuccess = (element) => {
        const inputGroup = element.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-message');

        if (errorDisplay) {
            errorDisplay.innerText = '';
        }
        inputGroup.classList.add('success');
        inputGroup.classList.remove('error');
    }

    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateInputs = () => {
        let isValid = true;
        const fullnameValue = fullnameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (fullnameValue === '') {
            setError(fullnameInput, 'Full Name is required');
            isValid = false;
        } else {
            setSuccess(fullnameInput);
        }

        if (emailValue === '') {
            setError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(emailInput, 'Provide a valid email address');
            isValid = false;
        } else {
            setSuccess(emailInput);
        }

        if (passwordValue === '') {
            setError(passwordInput, 'Password is required');
            isValid = false;
        } else if (passwordValue.length < 8) {
            setError(passwordInput, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            setSuccess(passwordInput);
        }

        if (confirmPasswordValue === '') {
            setError(confirmPasswordInput, 'Please confirm your password');
            isValid = false;
        } else if (confirmPasswordValue !== passwordValue) {
            setError(confirmPasswordInput, "Passwords don't match");
            isValid = false;
        } else {
            setSuccess(confirmPasswordInput);
        }
        return isValid;
    }

    form.addEventListener('submit', (e) => {
        if (!validateInputs()) {
            e.preventDefault();
        } else {
             e.preventDefault(); 
             alert('Registration Successful!');
             form.reset();
             document.querySelectorAll('.input-group').forEach(group => {
                group.classList.remove('success', 'error');
             });
        }
    });
});