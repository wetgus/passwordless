// visibility.js

function checkEnrollment() {
    const token = localStorage.getItem('token');
    if (token) {
        showAccountOptions(); // Show account options if token exists
    } else {
        showRegisterAndLoginOptions(); // Show both options if no token
    }
}

function showAccountOptions() {
    document.getElementById('register-dialog').style.display = 'none';
    document.getElementById('login-dialog').style.display = 'none';
    document.getElementById('account-options').style.display = 'block'; // Show options to delete or log out
}

function showRegisterAndLoginOptions() {
    document.getElementById('register-dialog').style.display = 'block';
    document.getElementById('login-dialog').style.display = 'block';
    document.getElementById('account-options').style.display = 'none'; // Hide account options
}
