var getHarvestLogs = function () {
  return JSON.parse($("#timesheet-data-island").text());
}

chrome.runtime.onMessage.addListener(function (response, sender) {
  if (response.page == "harvest") {
    processHarvestPage(response);
  }
  else if (response.page == "pmt") {
    processPMTPage(response);
  }
});

function processHarvestPage(data) {
  var harvestLog = getHarvestLogs();
  chrome.runtime.sendMessage({
    data: harvestLog
  }, function (response) {
  });
}

function processPMTPage(data) {
  var cookieString = "_ga=" + getCookieValue(data.pmtCookies, '_ga') + "; _hjid=" + getCookieValue(data.pmtCookies, '_hjid') + "; login=" + getCookieValue(data.pmtCookies, 'login') + "; password=" + getCookieValue(data.pmtCookies, 'password') + "; id_user=" + getCookieValue(data.pmtCookies, 'id_user') + "; status_id=" + getCookieValue(data.pmtCookies, 'status_id') + "; PHPSESSID=" + getCookieValue(data.pmtCookies, 'PHPSESSID') + "; ip=" + getCookieValue(data.pmtCookies, 'ip') + "";
  var user = getCookieValue(data.pmtCookies,'id_user');
  var projectId = $('#project option:nth-child(2)').val();
  for (var i = 0; i < data.data.data.day_entries.length; i++) {
    var logData = data.data.data.day_entries[i].client_name + ' - ' + data.data.data.day_entries[i].project_name + ' - ' + data.data.data.day_entries[i].notes;
    updateLog(cookieString, data.data.data.day_entries[i].spent_at, user, projectId, data.data.data.day_entries[i].hours, logData);
  }
  setTimeout(function () {
    window.location.reload();
  }, 5000);
}

var updateLog = function (cookieString, date, user, projectId, hours, logData) {
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
    "body": "pdate1=" + getPMTDateFormat(date) + "&status=block&user_name=" + user + "&reg_id=&project=" + projectId + "&activity=IM&hours=" + hours + "&desc=" + logData + "&button=Submit",
    "method": "POST",
    "mode": "cors"
  });
};

function getCookieValue(cookieObj, name) {
  var filterdData = cookieObj.filter(x => x.name == name);
  if (filterdData.length == 0) return null;
  return filterdData[0].value;
}

function getPMTDateFormat(date) {
  var splitDate = date.split(/\D/g);
  return splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
}