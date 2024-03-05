document.getElementById('signout').addEventListener('click', async () => {
    console.log("Stored values:", await chrome.storage.local.get(['accessToken', 'user', 'userLoggedIn']));
    const status= await chrome.storage.local.get(['userLoggedIn']);
    const token= await chrome.storage.local.get(['accessToken']);
    console.log(token.accessToken);
    if(status==false || status==undefined){
      document.getElementById('loginMessage').textContent = 'Error: already logged Out';
      return;
    };
    const url = 'http://localhost:5000/api/tokens';
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token.accessToken}`,
  };

    try {
      const response = await fetch(url, { method: 'DELETE', headers });
  
      if (response.ok) {
        const data = await response;
        // Remove the stored token securely
        await chrome.storage.local.remove(['accessToken', 'user'], (result) => {
          if (chrome.runtime.lastError) {
            console.error("Error removing", chrome.runtime.lastError.message);
          } else {
            console.log("Token removed successfully from local storage.");
          }
        });
        await chrome.storage.local.set({userLoggedIn: false});
        // Update UI and potentially redirect (optional)
        document.getElementById('postMessage').textContent = 'Logout successful.';
        console.log("Stored values:", await chrome.storage.local.get(['accessToken', 'user', 'userLoggedIn']));
        chrome.tabs.update({url: "auth/login.html"});
        //chrome.action.setPopup({popup: "login.html"});
        //chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //chrome.tabs.update(tabs[0].id, { url: "login.html" });
        //});
      } else {
        console.error("Error logging out:", response.statusText);
        document.getElementById('postMessage').textContent = "Logout failed.";
      }
    } catch (error) {
      console.error("Error logging out:", error);
      document.getElementById('postMessage').textContent = 'Error: ' + error.message;
    }
  });