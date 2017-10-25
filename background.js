chrome.webRequest.onCompleted.addListener(function(details) {
    if (!navigator.onLine)
        return

    if (details.url.includes("s3.amazonaws.com") && details.statusCode == 404 && !details.url.includes("favicon") && !checkIfExists(details.url)) {
        createPopup('S3 bucket vacant', details);
        chrome.browserAction.setIcon({path:"iconNew.png"});
        console.log(details);
    }
}, {
    urls: ["<all_urls>"]
});

chrome.webRequest.onErrorOccurred.addListener(function(details) {
    if (!navigator.onLine)
        return

    chrome.browserAction.setIcon({path:"iconNew.png"});
    if (details.error == "net::ERR_NAME_NOT_RESOLVED" && !checkIfExists(details.url)) {
        createPopup('Unused domain', details);
    }
}, {
    urls: ["<all_urls>"]
});

function checkIfExists(url) {
saved = JSON.parse(localStorage.getItem("links"));
    if (saved == null) {
        saved = {}
    }

if (url in saved)
  return true
return false

}

function createPopup(title, details) {
    saved = JSON.parse(localStorage.getItem("links"));
    if (saved == null) {
        saved = {}
    }

    if (!(details.url in saved)) {
        saved[details.url] = details;
        new Notification(title, {
            icon: 'icon.png',
            body: details.url,
        });
    }
    localStorage.setItem("links", JSON.stringify(saved));

}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.browserAction.setIcon({
            path: (request.resetIcon ? "icon.png" : "iconNew.png"),
        });
    });
