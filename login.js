// login.js

function loginUser() {
    const email = document.getElementById('login-email').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Send login request to the server
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful! An OTP has been sent to your email.');
            // Optionally, redirect to a page to enter OTP
            showOtpDialog(); // Show the OTP dialog for user to enter OTP
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
