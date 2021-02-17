var showContent = function() {
    alert($("#timesheet-data-island").text());
}

chrome.runtime.onMessage.addListener (function(request, sender, sendResponse) {
    showContent();
});