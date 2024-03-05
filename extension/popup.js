document.getElementById('Btn').addEventListener('click', async function(event) {
    event.preventDefault();
    chrome.tabs.create({ url: "auth/login.html" });
    //chrome.runtime.sendMessage({ message: "redirect", url: "login.html" });
    return;
});