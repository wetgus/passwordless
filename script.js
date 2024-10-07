// Gmail SMTP settings
const smtpSettings = {
    user: 'your-email@gmail.com',
    pass: 'your-app-password', // App password from Gmail for SMTP
};

// Function to send email using Gmail SMTP
function sendEmail(to, subject, message) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: smtpSettings.user,
        Password: smtpSettings.pass,
        To: to,
        From: smtpSettings.user,
        Subject: subject,
        Body: message,
    }).then(
        message => alert('Email sent successfully')
    ).catch(err => alert('Failed to send email: ' + err));
}

// OTP management
let generatedOTP;

// Function to generate OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to check device registration
function checkDeviceRegistration() {
    const username = localStorage.getItem('currentUser');
    const userDB = JSON.parse(localStorage.getItem('userDB')) || {};

    if (username && userDB[username]) {
        document.getElementById('login').style.display = 'block';
        document.getElementById('registration').style.display = 'none';
        document.getElementById('deleteButton').style.display = 'none'; // Hidden initially
    } else {
        document.getElementById('registration').style.display = 'block';
        document.getElementById('login').style.display = 'none';
    }
}

// Register new user
function registerDevice() {
    const email = document.getElementById('email').value;
    const pin = document.getElementById('pin').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email.');
        return;
    }

    let userDB = JSON.parse(localStorage.getItem('userDB')) || {};
    
    if (userDB[email]) {
        alert('Account already exists. Please log in.');
    } else {
        const token = generateToken();
        const pinHash = hashPin(pin);
        userDB[email] = { token: token, pinHash: pinHash, devices: [token] };
        localStorage.setItem('userDB', JSON.stringify(userDB));
        localStorage.setItem('currentUser', email);
        alert('Registration successful!');
        checkDeviceRegistration();
    }
}

// Send OTP
function sendOtp() {
    const email = document.getElementById('loginEmail').value;
    let userDB = JSON.parse(localStorage.getItem('userDB')) || {};

    if (userDB[email]) {
        generatedOTP = generateOtp();
        sendEmail(email, 'Your OTP Code', `Your OTP code is: ${generatedOTP}`);
        document.getElementById('otpSection').style.display = 'block';
    } else {
        alert('Account not found.');
    }
}

// Verify OTP and enroll device
function verifyOtp() {
    const enteredOtp = document.getElementById('otp').value;
    const newPin = document.getElementById('newPin').value;
    const email = document.getElementById('loginEmail').value;

    let userDB = JSON.parse(localStorage.getItem('userDB')) || {};

    if (generatedOTP === enteredOtp) {
        const token = generateToken();
        const pinHash = hashPin(newPin);
        userDB[email].devices.push(token);
        userDB[email].pinHash = pinHash;  // Store different PIN per device
        localStorage.setItem('userDB', JSON.stringify(userDB));
        localStorage.setItem('currentUser', email);
        alert('Device enrolled successfully!');
        checkDeviceRegistration();
    } else {
        alert('Incorrect OTP.');
    }
}

// Event Listeners
document.getElementById('registerButton').addEventListener('click', registerDevice);
document.getElementById('sendOtpButton').addEventListener('click', sendOtp);
document.getElementById('verifyOtpButton').addEventListener('click', verifyOtp);

// Hide delete button initially
document.getElementById('deleteButton').style.display = 'none';

// Initial check for device registration
checkDeviceRegistration();
