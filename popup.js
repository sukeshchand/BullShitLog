let changeColor = document.getElementById('changeColor');

changeColor.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var data = {greeting: "hello"};
        alert("Send: " + data.greeting);
        chrome.tabs.sendMessage(tabs[0].id, data);
      });
};