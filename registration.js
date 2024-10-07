let enrolledToken = localStorage.getItem('deviceToken');

// Function to display forms based on device enrollment status
function updateForms() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const otpForm = document.getElementById('otp-form');
    const deleteButton = document.getElementById('delete-account');
    const logoutButton = document.getElementById('logout');

    registerForm.classList.add('hidden');
    loginForm.classList.add('hidden');
    otpForm.classList.add('hidden');
    deleteButton.classList.add('hidden');
    logoutButton.classList.add('hidden');

    if (enrolledToken) {
        // Show login form for enrolled device
        loginForm.classList.remove('hidden');
    } else {
        // Show registration form for non-enrolled device
        registerForm.classList.remove('hidden');
    }
}

// Registration function
function register() {
    const email = document.getElementById('registerEmail').value;
    const pin = document.getElementById('registerPin').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (pin.length < 4) {
        alert('PIN should be at least 4 digits long.');
        return;
    }

    // Simulate device enrollment by storing a token
    enrolledToken = generateToken();
    localStorage.setItem('deviceToken', enrolledToken);

    alert('Registration successful! You are now logged in.');
    updateForms();
}

// Login function
function login() {
    const email = document.getElementById('loginEmail').value;
    const pin = document.getElementById('loginPin').value;

    if (!enrolledToken) {
        alert('No device is enrolled.');
        return;
    }

    // Simulate login by checking PIN
    if (pin.length >= 4) {
        alert('Login successful!');
        document.getElementById('delete-account').classList.remove('hidden');
        document.getElementById('logout').classList.remove('hidden');
        document.getElementById('login-form').classList.add('hidden');
    } else {
        alert('Incorrect PIN.');
    }
}

// Logout function
function logout() {
    alert('You have been logged out.');
    updateForms();
}

// Function to delete user account
function deleteAccount() {
    localStorage.removeItem('deviceToken');
    enrolledToken = null;
    alert('Account deleted and device unenrolled.');
    updateForms();
}

// Helper functions
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function generateToken() {
    return Math.random().toString(36).substring(2, 12);
}

// Initial form update when page loads
updateForms();
