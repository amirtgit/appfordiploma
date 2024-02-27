chrome.runtime.onInstalled.addListener(
  
)

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'login') {
      fetch('https://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: message.username,
          password: message.password
        })
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then(data => {
        browser.storage.local.set({ token: data.token }, () => {
          sendResponse({ success: true });
        });
      })
      .catch(error => {
        console.error(error);
        sendResponse({ success: false, error: error.message });
      });
    } else if (message.action === 'register') {
      // ... similar logic for registration
    }
  });
  