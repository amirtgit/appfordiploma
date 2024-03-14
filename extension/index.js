document.getElementById('postForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    chrome.runtime.sendMessage({ type: "submitStarted" });

    const post = document.getElementById('post').value;
    const token= await chrome.storage.session.get(['accessToken']);
    console.log(token.accessToken);
    const url = 'http://localhost:5000/api/make_post';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.accessToken}`,
    };
    const body = JSON.stringify({ 'request': post });
    console.log(post);

    try {
      const response = await fetch(url, { method: 'POST', headers, body });
  
        if (response.ok) {
            const data = await response.json();
            console.log("Server response:", data);
            document.getElementById('postRating').textContent = data.report_rating;
            document.getElementById('postMessage').textContent = data.response;
            window.location.href =  "index.html";
        } else {
            const data = await response.json();
            document.getElementById('errorMessage').textContent = data.error;
            document.getElementById('errorMessage').style.color = 'red';
            document.querySelector('#post').placeholder = "Enter a text.";
            document.querySelector('#post').style.backgroundColor = 'red';
        }
    } catch (error) {
        document.getElementById('errorMessage').textContent = 'Error: ' + error.message;
        document.getElementById('errorMessage').style.color = 'red';
        console.error('Error:', error);
    }
    chrome.runtime.sendMessage({ type: "submitCompleted" });
  });