chrome.webRequest.onCompleted.addListener(function(details) {
    if (!navigator.onLine)
        return
    if (details.url.includes("s3.amazonaws.com") && details.statusCode == 404 && !details.url.includes("favicon")) {
        createPopup('S3 bucket vacant', details);
        console.log(details);
    }
}, {
    urls: ["<all_urls>"]
});
chrome.webRequest.onErrorOccurred.addListener(function(details) {
    if (details.error == "net::ERR_NAME_NOT_RESOLVED") {
        createPopup('Unused domain', details);
    }
}, {
    urls: ["<all_urls>"]
});

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
