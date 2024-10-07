// Simulating a DB for storing user accounts
let db = JSON.parse(localStorage.getItem('userDB')) || {};
let generatedOtp = '';
let currentUser = null; // Stores current logged-in user

// Validate email
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}

// Send OTP using Gmail SMTP
function sendEmail(to, subject, message) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "your-email@gmail.com",
        Password: "your-app-password",
        To: to,
        From: "your-email@gmail.com",
        Subject: subject,
        Body: message,
    }).then(
        () => alert("OTP sent successfully")
    ).catch(err => alert('Failed to send OTP: ' + err));
}

// Registration function
function register() {
    const email = document.getElementById('registerEmail').value;
    const pin = document.getElementById('registerPin').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (!pin) {
        alert('Please enter a PIN');
        return;
    }

    if (db[email]) {
        alert('Account with this email already exists. Please login.');
        return;
    }

    // Register user in the DB
    const deviceToken = generateToken();
    db[email] = {
        pinHash: btoa(pin), // Hashing PIN for simplicity
        devices: [deviceToken],
    };
    localStorage.setItem('userDB', JSON.stringify(db));
    localStorage.setItem('deviceToken', deviceToken);  // Save the token for the current device

    alert('Account created successfully!');
    currentUser = email;  // Set the current user as logged in
    showPostRegistrationUI();  // Show Delete and Logout
}

// Login function
function login() {
    const email = document.getElementById('loginEmail').value;
    const pin = document.getElementById('loginPin').value;

    if (!validateEmail(email) || !db[email]) {
        alert('No account found with this email.');
        return;
    }

    if (btoa(pin) !== db[email].pinHash) {
        alert('Incorrect PIN.');
        return;
    }

    currentUser = email;

    if (db[email].devices.includes(getDeviceToken())) {
        alert('Login successful!');
        showPostRegistrationUI();
    } else {
        // If new device, send OTP to email
        generatedOtp = generateOtp();
        sendEmail(email, 'Your OTP Code', `Your OTP code is: ${generatedOtp}`);
        document.getElementById('otp-form').classList.remove('hidden');
        document.getElementById('login-form').classList.add('hidden');
    }
}

// Verify OTP for new device enrollment
function verifyOtp() {
    const otpInput = document.getElementById('otpInput').value;

    if (otpInput === generatedOtp) {
        // Enroll device
        db[currentUser].devices.push(generateToken());
        localStorage.setItem('userDB', JSON.stringify(db));

        alert('Device enrolled successfully!');
        showPostRegistrationUI();
        document.getElementById('otp-form').classList.add('hidden');
    } else {
        alert('Incorrect OTP.');
    }
}

// Delete account function
function deleteAccount() {
    delete db[currentUser];
    localStorage.setItem('userDB', JSON.stringify(db));

    alert('Account deleted successfully.');
    logout();  // Call logout function to redirect to Register
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('deviceToken');  // Clear the device token
    location.reload();  // Reload the page to show registration form
}

// Helper functions
function generateToken() {
    return Math.random().toString(36).substring(2, 12);
}

function getDeviceToken() {
    return localStorage.getItem('deviceToken');
}

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Show UI after registration/login
function showPostRegistrationUI() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('delete-account').classList.remove('hidden');
    document.getElementById('logout').classList.remove('hidden');
}

// Show or hide forms based on device enrollment
function init() {
    const deviceToken = getDeviceToken();
    let isDeviceEnrolled = false;

    for (const email in db) {
        if (db[email].devices.includes(deviceToken)) {
            isDeviceEnrolled = true;
            currentUser = email;  // Auto-login if device is recognized
            break;
        }
    }

    if (isDeviceEnrolled) {
        showPostRegistrationUI();  // Show logged-in view
    } else {
        document.getElementById('register-form').classList.remove('hidden');
    }
}

// Initialize the app
init();
