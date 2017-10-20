chrome.webRequest.onCompleted.addListener(
function(details) {
        console.info("CARALHO :" + details.url);
}, 
// filters
{
    urls: [
        "http://*", 
        "https://*", 
    ],
    types: ["image"]
},
["responseHeaders"]);

