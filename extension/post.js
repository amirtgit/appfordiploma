document.addEventListener('DOMContentLoaded', async function(event) {
        event.preventDefault();
        chrome.runtime.sendMessage({ type: "submitStarted" });

        const token= await chrome.storage.session.get(['accessToken']);
        const username= await chrome.storage.session.get(['user']);
        // Get the target element for the list
        const listContainer = document.getElementById('post_list');
        console.log(token.accessToken);

        const url = 'http://localhost:5000/api/post/'+username.user;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`,
        };
        try {
        const response = await fetch(url, { method: 'GET', headers });

            if (response.ok) {
                const data = await response.json();
                console.log("Server response:", data);
        
                if (data.items.length > 0) {
                    // Clear any existing content within the list container
                    listContainer.innerHTML = '';
                    data.items.reverse();
                  
                    // Iterate through the data and create post structures
                    for (const item of data.items) {
                      // Create a post structure (div)
                      const post = document.createElement('article');
                      // Add the optional CSS class "post" for styling
                      post.classList.add('post');
                      
                      // Create separate elements for each data point
                      const requestElement = document.createElement('h4');
                      requestElement.textContent = `Request: ${item.request}`;
                      const ratingElement = document.createElement('h3');
                      ratingElement.textContent = `Rating ${item.report_rating}/10`;
                      ratingElement.style.color = "blue";
                      const responseElement = document.createElement('p');
                      responseElement.textContent = `${item.response}`;
                      responseElement.classList.add('collapse');
                      responseElement.id = `collapse${item.id}`;

                      //BUTTON to collapse
                      const collapseButton = document.createElement('button');
                      collapseButton.classList.add('button', 'is-primary');
                      collapseButton.setAttribute("type", "button");
                      collapseButton.setAttribute('data-bs-toggle', 'collapse');
                      collapseButton.setAttribute('data-bs-target', `#collapse${item.id}`); // id of item needed
                      collapseButton.setAttribute('aria-expanded', 'false');
                      collapseButton.setAttribute('aria-controls', `collapse${item.id}`);
                      collapseButton.textContent = 'Response';

                      const divRateResponse = document.createElement('div');
                      divRateResponse.classList.add('media');
                      const divRate = document.createElement('div');
                      divRate.classList.add('media-left');
                      const divResponse = document.createElement('div');
                      divResponse.classList.add('media-content');
                  
                      // Append data elements to the post structure
                      post.appendChild(requestElement);
                      divRate.appendChild(ratingElement);
                      divResponse.appendChild(collapseButton);
                      divResponse.appendChild(responseElement);
                      divRateResponse.appendChild(divRate);
                      divRateResponse.appendChild(divResponse);
                      post.appendChild(divRateResponse);
                  
                      // Directly append the post structure to the list container
                      listContainer.appendChild(post);
                      listContainer.appendChild(document.createElement('hr'));
                    }
                  }
            } else {
                const data = await response.json();
                document.getElementById('errorMessage').textContent = data.error;
                document.getElementById('errorMessage').style.color = 'red';
            }
        } catch (error) {
            document.getElementById('errorMessage').textContent = 'Error: ' + error.message;
            document.getElementById('errorMessage').style.color = 'red';
            console.error('Error:', error);
        }
        chrome.runtime.sendMessage({ type: "submitCompleted" });
  });