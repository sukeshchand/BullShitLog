let changeColor = document.getElementById('changeColor');

changeColor.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var data = {greeting: "hello"};
        alert("Send: " + data.greeting);
        chrome.tabs.sendMessage(tabs[0].id, data);

        chrome.cookies.getAll({
            domain: ".bridge-global.com"
          }, function (cookies) {
            alert(cookies);
              
            alert(cookies.length);

            for (var i = 0; i < cookies.length; i++) {
                alert(JSON.stringify(cookies[i]));
        //       chrome.cookies.remove({
        //        url: "https://" + cookies[i].domain + cookies[i].path,
         //       name: cookies[i].name
          //    });
            }
          });


      });
};