document.getElementById('login-button').addEventListener('click', function() {
    const email = document.getElementById('login-email').value;
    const pin = document.getElementById('login-pin').value;
    const storedEmail = localStorage.getItem('email');
    const storedPin = atob(localStorage.getItem('pin'));

    if (email === storedEmail && pin === storedPin) {
        alert('Login successful!');
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('after-login-actions').style.display = 'block';
    } else {
        alert('Invalid credentials!');
    }
});
