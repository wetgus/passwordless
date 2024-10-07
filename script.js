let currentToken = null;
let currentOtp = null;
let isLoggedIn = false;

// Check device enrollment status on page load
window.onload = function() {
    checkEnrollment();
};

function checkEnrollment() {
    currentToken = localStorage.getItem('token');
    
    // If token is found, show the login dialogue
    if (currentToken) {
        showLogin();
    } else {
        showRegister();
    }
}

// Show Register form
function showRegister() {
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('delete-account').classList.add('hidden');
    document.getElementById('logout').classList.add('hidden');
}

// Show Login form
function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('delete-account').classList.add('hidden');
    document.getElementById('logout').classList.add('hidden');
}

// Register new user
function register() {
    const email = document.getElementById('registerEmail').value;
    const pin = document.getElementById('registerPin').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email.');
        return;
    }

    if (pin.length < 4) {
        alert('PIN must be at least 4 digits long.');
        return;
    }

    // Simulate token and pin hash creation and save to local storage
    const token = generateToken();
    const pinHash = btoa(pin + token);
    
    localStorage.setItem('token', token);
    localStorage.setItem('pinHash', pinHash);
    localStorage.setItem('email', email);

    alert('Registration successful!');
    showPostLoginOptions();
}

// Login user
function login() {
    const email = document.getElementById('loginEmail').value;
    const pin = document.getElementById('loginPin').value;
    const storedToken = localStorage.getItem('token');
    const storedPinHash = localStorage.getItem('pinHash');
    const storedEmail = localStorage.getItem('email');

    if (email !== storedEmail) {
        alert('Email does not match.');
        return;
    }

    const enteredPinHash = btoa(pin + storedToken);

    if (storedPinHash === enteredPinHash) {
        isLoggedIn = true;
        alert('Login successful!');
        showPostLoginOptions();
    } else {
        alert('Incorrect PIN.');
    }
}

// Log out user
function logout() {
    isLoggedIn = false;
    alert('Logged out successfully!');
    checkEnrollment();  // Reset the state to reflect the logout
}

// Show options after login
function showPostLoginOptions() {
    document.getElementById('delete-account').classList.remove('hidden');
    document.getElementById('logout').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
}

// Delete account
function deleteAccount() {
    localStorage.removeItem('token');
    localStorage.removeItem('pinHash');
    localStorage.removeItem('email');
    alert('Account deleted successfully!');
    checkEnrollment();  // Redirect to Register form after deletion
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Generate a random token
function generateToken() {
    return Math.random().toString(36).substring(2, 12);
}
