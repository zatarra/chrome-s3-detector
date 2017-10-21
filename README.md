# chrome-s3-detector

## What does it do?
It scans for unregistered domains and AWS S3 Buckets.

## Why?
Because I'm a security researcher and this is can pose a real threat.

## How? 
Listening to two events:

- chrome.webRequest.onCompleted -> Check for 404 HTTP codes when opening S3 Buckets
- chrome.webRequest.onErrorOccurred ->Checking for "net::ERR_NAME_NOT_RESOLVED" errors when opening domains.


## Bugs?
- Proper internet connection detection is required ( otherwise it might detect false positives for the domains )
- Use a decent regular expression to detect the url's domain for the S3 buckets. 
