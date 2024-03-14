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
  console.log('turd');
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
/*
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === "submitStarted") {
    // Show progress bar
    chrome.scripting.executeScript({
      files: ['content_script.js']
    });
  } else if (message.type === "submitCompleted") {
    // Hide progress bar
    chrome.scripting.executeScript({
      func: () => {
        document.getElementById('errorMessage').classList.remove('progress is-small is-primary');
      }
    });
  }
});*/