chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === "popupOpened") {
    // Your script to be executed on popup open
    console.log("Popup window opened!");
    chrome.storage.session.get(null, function(items) {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving data:", chrome.runtime.lastError.message);
      } else {
        console.log("Stored data:");
        for (const key in items) {
          console.log(key, ":", items[key]);
        }
      }
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.session.get(null, function(data) {
    if (chrome.runtime.lastError) {
        console.error('Error retrieving data:', chrome.runtime.lastError.message);
    } else {
        console.log('Data stored in session storage:', data);
    }
});
  //console.log(chrome.storage.session.get(['userLoggedIn']));
  //console.log(chrome.storage.session.get(['user']));
});