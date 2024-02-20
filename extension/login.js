document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (response.ok) {
            // Redirect or display success message
        } else {
            // Handle failed login
            document.getElementById('loginMessage').textContent = 'Invalid username or password.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
