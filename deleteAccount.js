document.getElementById('delete-account-button').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        localStorage.clear();
        alert('Account deleted successfully.');
        location.reload();  // Redirect back to registration
    }
});
