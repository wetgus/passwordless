document.getElementById('verify-otp-button').addEventListener('click', function() {
    const enteredOtp = document.getElementById('otp-input').value;
    const storedOtp = localStorage.getItem('otp');

    if (enteredOtp === storedOtp) {
        const newPin = prompt('Enter a new 4-digit PIN for this device:');
        if (newPin.length === 4) {
            localStorage.setItem('pin', btoa(newPin));
            localStorage.setItem('deviceToken', generateToken());  // Enroll the new device
            alert('Device enrolled successfully.');
            location.reload();
        } else {
            alert('PIN must be 4 digits.');
        }
    } else {
        alert('Invalid OTP!');
    }
});
