document.getElementById('login-button').addEventListener('click', function() {
    const email = document.getElementById('login-email').value;
    // Generate OTP and send it to the provided email
    const otp = Math.floor(100000 + Math.random() * 900000);  // 6-digit OTP
    localStorage.setItem('otp', otp);

    sendEmail(email, otp);
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('otp-form').style.display = 'block';
});

function sendEmail(email, otp) {
    Email.send({
        SecureToken : "your-smtp-secure-token",
        To : email,
        From : "your-email@gmail.com",
        Subject : "Your OTP Code",
        Body : `Your OTP is ${otp}`
    }).then(
      message => alert("OTP has been sent to your email.")
    );
}
