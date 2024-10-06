// Simple user database in localStorage
let userDB = localStorage.getItem('userDB') ? JSON.parse(localStorage.getItem('userDB')) : {};

// Check if device is already registered on page load
window.onload = function () {
    const currentDeviceToken = localStorage.getItem('deviceToken');
    
    if (currentDeviceToken) {
        // If device is registered, show the login section
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('auth-section').style.display = 'block';
    } else {
        // If device is new, show the registration section
        document.getElementById('register-section').style.display = 'block';
        document.getElementById('auth-section').style.display = 'none';
    }
}

// Function to generate a random token for device registration
function generateToken() {
    return Math.random().toString(36).substr(2, 10);
}

// Register the user
function registerUser() {
    const username = document.getElementById('username').value;
    if (username) {
        if (!userDB[username]) {
            userDB[username] = { token: '', pinHash: '' };
            localStorage.setItem('userDB', JSON.stringify(userDB));
            alert("Account created successfully. Now, set up your device.");
            document.getElementById('register-section').style.display = 'none';
            document.getElementById('pin-section').style.display = 'block';
        } else {
            alert("Username already exists!");
        }
    } else {
        alert("Please enter a username.");
    }
}

// Setup PIN and register device
function setupPIN() {
    const username = document.getElementById('username').value;
    const pin = document.getElementById('pin').value;
    
    if (pin.length >= 4) {
        const token = generateToken();
        const pinHash = btoa(pin + token);  // Simple encoding for demo purposes

        // Store token and PIN hash
        userDB[username].token = token;
        userDB[username].pinHash = pinHash;
        localStorage.setItem('userDB', JSON.stringify(userDB));
        
        // Store the device token locally
        localStorage.setItem('deviceToken', token);
        
        alert("Device registered and PIN set successfully.");
        
        // Show authentication section
        document.getElementById('pin-section').style.display = 'none';
        document.getElementById('auth-section').style.display = 'block';
    } else {
        alert("PIN must be at least 4 characters long.");
    }
}

// Authenticate user with PIN
function authenticate() {
    const username = document.getElementById('username').value;
    const pin = document.getElementById('login-pin').value;
    const currentDeviceToken = localStorage.getItem('deviceToken');
    
    if (userDB[username]) {
        const storedToken = userDB[username].token;
        const storedPinHash = userDB[username].pinHash;
        const enteredPinHash = btoa(pin + currentDeviceToken);

        if (enteredPinHash === storedPinHash) {
            document.getElementById('auth-status').innerHTML = "Authentication successful!";
        } else {
            document.getElementById('auth-status').innerHTML = "Incorrect PIN!";
        }
    } else {
        alert("User not found. Please register.");
    }
}
