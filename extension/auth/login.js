document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const status= await chrome.storage.local.get(['userLoggedIn']);
  if(status==true){
    document.getElementById('loginMessage').textContent = 'Error: already logged In';
    return;
  };
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const url = 'http://localhost:5000/api/tokens';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(username + ":" + password),
  };

  try {
    const response = await fetch(url, { method: 'POST', headers });

      if (response.ok) {
          const data = await response.json();
          console.log("Server response:", data);
          await chrome.storage.local.set({accessToken: data.token, user: username, userLoggedIn: true})
          console.log("Stored values:", await chrome.storage.local.get(['accessToken', 'user', 'userLoggedIn']));
          //document.getElementById('loginMessage').textContent = 'Successful login.'+data.token;
          //await chrome.storage.local.get(["accessToken"]).then((result) =>{document.getElementById('loginMessage').textContent='Successful login.'+result.accessToken});
          //chrome.action.setPopup({popup: "index.html"});
          chrome.tabs.update({url: "index.html"});
      } else {
          const data = await response.json();
          document.getElementById('loginMessage').textContent = data.error;
          document.querySelector('#username').placeholder = "Enter a username.";
          document.querySelector('#password').placeholder = "Enter a password.";
          document.querySelector('#username').style.backgroundColor = 'red';
          document.querySelector('#password').style.backgroundColor = 'red';
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