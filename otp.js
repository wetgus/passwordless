// otp.js

function verifyOtp() {
    const otp = document.getElementById('otp-input').value;

    // Send OTP verification request to the server
    fetch('/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Device enrolled successfully!');
            localStorage.setItem('token', data.token);
            showAccountOptions(); // Update UI to show account options
        } else {
            alert('OTP verification failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
