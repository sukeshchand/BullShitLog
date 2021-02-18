var showContent = function() {
    alert($("#timesheet-data-island").text());
}

var updateLog = function(cookieString, date, user, projectId, hours, logData){
    fetch("https://pmt.bridge-global.com/hoursheet/index.php?page=register", {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9,kn;q=0.8,sv;q=0.7,ml;q=0.6",
          "cache-control": "no-cache",
          "content-type": "application/x-www-form-urlencoded",
          "pragma": "no-cache",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "cookie": cookieString
        },
        "referrer": "https://pmt.bridge-global.com/hoursheet/index.php?page=register",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "pdate1="+ date +"&status=block&user_name=" + user + "&reg_id=&project="  + projectId +  "&activity=IM&hours="+ hours +"&desc=" + logData + "&button=Submit",
        "method": "POST",
        "mode": "cors"
      });
};

function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}

chrome.runtime.onMessage.addListener (function(response, sender) {
    debugger;
    var cookieObj = response.cookies;
    var cookieString = "_ga=" + getCookieValue(cookieObj, '_ga') + "; _hjid=" + getCookieValue(cookieObj,'_hjid') + "; login=" + getCookieValue(cookieObj,'login') + "; password=" + getCookieValue(cookieObj,'password') + "; id_user=" + getCookieValue(cookieObj,'id_user') + "; status_id=" + getCookieValue(cookieObj,'status_id') + "; PHPSESSID=" + getCookieValue(cookieObj,'PHPSESSID') + "; ip=" + getCookieValue(cookieObj,'ip') + "";
    var user = getCookieValue(cookieObj,'id_user');
    var data = JSON.parse($("#timesheet-data-island").text())
    location.href = "https://pmt.bridge-global.com/hoursheet/index.php?page=register";
    for(var i = 0; i< data.day_entries.length; i++){
      var logData = data.day_entries[i].client_name + ' - '  + data.day_entries[i].project_name + ' - ' + data.day_entries[i].notes;
      updateLog(cookieString, data.day_entries[i].spent_at, user, 1023, data.day_entries[i].hours, logData);
    }
    alert('data updated');
    window.open("https://pmt.bridge-global.com/hoursheet/index.php?page=register");
    //showContent();
});



function getCookieValue(cookieObj, name){
  var filterdData = cookieObj.filter(x=>x.name == name);
  if(filterdData.length == 0) return null;
  return filterdData[0].value;
}

chrome.webRequest.onBeforeSendHeaders.addEventListener(function(details){
  debugger;
  var newRef = "https://pmt.bridge-global.com/hoursheet/index.php?page=register";
  var hasRef = false;
  for(var n in details.requestHeaders){
      hasRef = details.requestHeaders[n].name == "Referer";
      if(hasRef){
          details.requestHeaders[n].value = newRef;
       break;
      }
  }
  if(!hasRef){
      details.requestHeaders.push({name:"Referer",value:newRef});
  }
  return {requestHeaders:details.requestHeaders};
},
{
  urls: ["<all_urls>"],
},
[
  "requestHeaders",
  "blocking"
]);