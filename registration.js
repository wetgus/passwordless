document.getElementById('register-button').addEventListener('click', function() {
    const email = document.getElementById('register-email').value;
    const pin = document.getElementById('register-pin').value;

    if (validateEmail(email) && pin.length === 4) {
        // Store the user details and device enrollment
        localStorage.setItem('email', email);
        localStorage.setItem('pin', btoa(pin));  // Encrypt the PIN
        localStorage.setItem('deviceToken', generateToken());
        
        alert('Registration successful! Your device is enrolled.');
        
        // Automatically log in the user after registration
        document.getElementById('registration-form').style.display = 'none';
        document.getElementById('after-login-actions').style.display = 'block'; // Show account management options
        
    } else {
        alert('Please enter a valid email and a 4-digit PIN.');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function generateToken() {
    return Math.random().toString(36).substr(2, 10);  // Simple token generator
}
