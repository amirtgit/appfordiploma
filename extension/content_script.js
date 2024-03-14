chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "showProgressBar") {
      const errorMessageDiv = document.getElementById("errorMessage");
      errorMessageDiv.innerHTML = '<progress class="progress is-small is-primary" max="100"></progress>'; // Replace with your progress bar HTML structure
    }
  });