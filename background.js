
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostContains: 'harvestapp.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
    chrome.cookies.getAll({
      domain: ".bridge-global.com"
    }, function (pmtCookies) {
      var url = "https://pmt.bridge-global.com/hoursheet/index.php?page=register";
      chrome.tabs.create({ url: url }, function (tab) {
        setTimeout(function () {
          chrome.tabs.sendMessage(tab.id, { page: "pmt", data: message, pmtCookies: pmtCookies });
        }, 5000);
      });
    });
  });
});
