
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({userLoggedIn: false});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'userLogin') {
    const username = request.username;
    const password = request.password;

    // Your existing code to fetch the token and set storage
    // ...

    sendResponse({ success: true });
  }
});