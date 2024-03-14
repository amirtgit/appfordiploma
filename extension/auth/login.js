document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  chrome.runtime.sendMessage({ type: "submitStarted" });
  chrome.storage.session.get(null, function(data) {
    if (chrome.runtime.lastError) {
        console.error('Error retrieving data:', chrome.runtime.lastError.message);
    } else {
        console.log('Data stored in session storage:', data);
    }
  });

  const status= await chrome.storage.session.get(['userLoggedIn']);
  if(status.userLoggedIn==true){
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
          await chrome.storage.session.set({accessToken: data.token, user: username, userLoggedIn: true});
          console.log("Stored values:", await chrome.storage.session.get(['accessToken', 'user', 'userLoggedIn']));

          document.getElementById('loginMessage').textContent = 'Successful login.';
          window.location.href =  "../index.html";
          //chrome.tabs.update({url: "index.html"});
      } else {
          const data = await response.json();
          document.getElementById('loginMessage').textContent = data.error;
          document.getElementById('loginMessage').style.color = 'red';
          document.querySelector('#username').placeholder = "Enter a username.";
          document.querySelector('#password').placeholder = "Enter a password.";
          document.querySelector('#username').style.backgroundColor = 'red';
          document.querySelector('#password').style.backgroundColor = 'red';
      }
  } catch (error) {
      document.getElementById('errorMessage').textContent = 'Error: ' + error.message;
      document.getElementById('errorMessage').style.color = 'red';
      console.error('Error:', error);
  }
  chrome.runtime.sendMessage({ type: "submitCompleted" });
});