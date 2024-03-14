document.getElementById('signout').addEventListener('click', async () => {
    console.log("Stored values:", await chrome.storage.session.get(['accessToken', 'user', 'userLoggedIn']));
    
  chrome.storage.session.get(null, function(data) {
    if (chrome.runtime.lastError) {
        console.error('Error retrieving data:', chrome.runtime.lastError.message);
    } else {
        console.log('Data stored in session storage:', data);
    }
  });
    try {
      //const response = await fetch(url, { method: 'DELETE', headers });
      await chrome.storage.session.remove(['accessToken', 'user'], (result) => {
        if (chrome.runtime.lastError) {
          console.error("Error removing", chrome.runtime.lastError.message);
          document.getElementById('errorMessage').textContent = 'Error: ' + chrome.runtime.lastError.message
          document.getElementById('errorMessage').style.color = 'red';
          return;
        } else {
          console.log("Token removed successfully from session storage.");
        }
      });

      try {
        await chrome.storage.session.set({ userLoggedIn: false });
        console.log("User login state updated successfully.");
      } catch (error) {
        console.error("Error setting userLoggedIn:", error);
        document.getElementById('errorMessage').textContent = 'Error: Failed to update login state.';
        document.getElementById('errorMessage').style.color = 'red';
        return;
      }

      // Update UI and potentially redirect (optional)
      document.getElementById('postMessage').textContent = 'Logout successful.';
      chrome.storage.session.get(null, function(data) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving data:', chrome.runtime.lastError.message);
        } else {
            console.log('Data stored in session storage:', data);
        }
      });
      window.location.href =  "auth/login.html";
    } catch (error) {
      console.error("Error logging out:", error);
      document.getElementById('errorMessage').textContent = 'Error: ' + error.message;
      document.getElementById('errorMessage').style.color = 'red';
    }
  });