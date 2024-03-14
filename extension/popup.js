document.getElementById('Btn').addEventListener('click', async function(event) {
    event.preventDefault();
    chrome.storage.session.get(null, function(data) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving data:', chrome.runtime.lastError.message);
        } else {
            console.log('Data stored in session storage:', data);
        }
      });

      const status= await chrome.storage.session.get(['userLoggedIn']);
      console.log(status.userLoggedIn);
      if (status.userLoggedIn == true) {
        console.log('index');
        window.location.href =  "index.html";
      } else {
        console.log('login');
       window.location.href =  "auth/login.html";
      }
    return;
});