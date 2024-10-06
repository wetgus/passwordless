// Function to generate a random token
function generateToken() {
    return Math.random().toString(36).substr(2, 10);
}

// Function to hash the PIN (simple hash for demonstration)
function hashPin(pin) {
    return btoa(pin); // Base64 encode for simplicity
}

// Function to check device registration
function checkDeviceRegistration() {
    const username = localStorage.getItem('currentUser');
    const userDB = JSON.parse(localStorage.getItem('userDB')) || {};

    if (username && userDB[username]) {
        // Device is registered, show login
        document.getElementById('login').style.display = 'block';
        document.getElementById('loginButton').onclick = function() {
            authenticateUser(username);
        };
        document.getElementById('deleteButton').style.display = 'block'; // Show the delete button
        document.getElementById('registration').style.display = 'none'; // Hide registration
    } else {
        // Device not registered, show registration
        document.getElementById('registration').style.display = 'block';
        document.getElementById('registerButton').onclick = function() {
            registerDevice();
        };
        document.getElementById('login').style.display = 'none'; // Hide login
    }
}

// Function to register a device
function registerDevice() {
    const username = document.getElementById('username').value;
    const pin = document.getElementById('pin').value;

    let userDB = JSON.parse(localStorage.getItem('userDB')) || {};
    
    if (userDB[username]) {
        alert('User already exists. Please log in.');
    } else {
        // Generate a new token and hash the PIN
        let token = generateToken();
        let pinHash = hashPin(pin);
        userDB[username] = { token: token, pinHash: pinHash };
        localStorage.setItem('userDB', JSON.stringify(userDB));
        localStorage.setItem('currentUser', username);
        alert('Registration successful!');
        checkDeviceRegistration(); // Refresh the UI
    }
}

// Function to authenticate the user
function authenticateUser(username) {
    const loginPin = document.getElementById('loginPin').value;
    let userDB = JSON.parse(localStorage.getItem('userDB')) || {};

    if (userDB[username] && userDB[username].pinHash === hashPin(loginPin)) {
        alert('Login successful!');
        document.getElementById('deleteButton').style.display = 'block'; // Show the delete button after successful login
    } else {
        alert('Invalid PIN. Please try again.');
    }
}

// Function to delete the user's account
function deleteAccount(username) {
    let userDB = JSON.parse(localStorage.getItem('userDB')) || {};
    
    if (userDB[username]) {
        delete userDB[username];
        localStorage.setItem('userDB', JSON.stringify(userDB));
        localStorage.removeItem('currentUser');
        alert('Account deleted successfully.');
        checkDeviceRegistration(); // Refresh the UI
    } else {
        alert('User not found.');
    }
}

// Event listener for the delete button
document.getElementById('deleteButton').onclick = function() {
    const username = localStorage.getItem('currentUser');
    deleteAccount(username);
};
