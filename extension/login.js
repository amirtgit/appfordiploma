/*document.getElementById('loginForm').addEventListener('submit', async function(event, url = 'http://localhost:5000/api/tokens') {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response= await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
        }
    })
    .then(response => {
        if (response.ok) {
            // Redirect or display success message
            document.getElementById('loginMessage').textContent = 'Successful login.';
            return response.json();
        } else {
            // Handle failed login
            document.getElementById('loginMessage').textContent = 'Invalid username or password.';
            return response.json();
        }
    })
    .then(data => {
      localStorage.setItem('accessToken', response['token']);
      localStorage.setItem('user', username);
    })
    .catch(error => {
      document.getElementById('loginMessage').textContent = 'Error: '+response['error'];
      console.error('Error:', error);
    });
});*/


document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const url = 'http://localhost:5000/api/tokens';
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + btoa(username + ":" + password)
          }
      });

      if (response.ok) {
          const data = await response.json();
          localStorage.setItem('accessToken', data.token);
          localStorage.setItem('user', username);
          document.getElementById('loginMessage').textContent = 'Successful login.'+data.token;
      } else {
          const data = await response.json();
          document.getElementById('loginMessage').textContent = data.error;
      }
  } catch (error) {
      document.getElementById('loginMessage').textContent = 'Error: ' + error.message;
      console.error('Error:', error);
  }
});
/*
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  chrome.runtime.sendMessage({ action: 'login', username, password }, (response) => {
    if (response.success) {
      // Handle successful login
    } else {
      // Display error message
      document.getElementById('loginMessage').textContent = 'Invalid username or password.';
    }
  });
});*/