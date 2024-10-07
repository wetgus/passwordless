document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('deviceToken');
    alert('You have been logged out.');
    location.reload();  // Reload the page to show the registration dialogue
});
