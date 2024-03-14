document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    chrome.runtime.sendMessage({ type: "submitStarted" });

    const status= await chrome.storage.session.get(['userLoggedIn']);
    if(status.userLoggedIn==true){
      document.getElementById('loginMessage').textContent = 'Error: already logged and registered';
      return;
    };
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const url = 'http://localhost:5000/api/users';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({ 'username': username, 'email': email, 'password': password });
  
    try {
      const response = await fetch(url, { method: 'POST', headers, body });
  
        if (response.ok) {
            const data = await response.json();
            console.log("Server response:", data);
            window.location.href =  "login.html";
            //chrome.tabs.update({url: "login.html"});
        } else {
            const data = await response.json();
            document.getElementById('registrationMessage').textContent = data.error;
            document.getElementById('registrationMessage').style.color = 'red';
            document.querySelector('#username').placeholder = "Enter a username.";
            document.querySelector('#email').placeholder = "Enter an email.";
            document.querySelector('#password').placeholder = "Enter a password.";
            document.querySelector('#username').style.backgroundColor = 'red';
            document.querySelector('#email').style.backgroundColor = 'red';
            document.querySelector('#password').style.backgroundColor = 'red';
        }
    } catch (error) {
        document.getElementById('errorMessage').textContent = 'Error: ' + error.message;
        document.getElementById('errorMessage').style.color = 'red';
        console.error('Error:', error);
    }
    chrome.runtime.sendMessage({ type: "submitCompleted" });
  });