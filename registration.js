// registration.js

function registerUser() {
    const email = document.getElementById('register-email').value;
    const pin = document.getElementById('register-pin').value;

    // Basic validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (pin.length < 4) {
        alert('PIN must be at least 4 digits.');
        return;
    }

    // Send registration request to the server
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pin })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Automatically log in the user after registration
            alert('Registration successful! Logging in...');
            localStorage.setItem('token', data.token);
            showAccountOptions(); // Update the UI to show the account options
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
