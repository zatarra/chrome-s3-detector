window.addEventListener('load', function() {

	    links = JSON.parse(localStorage.getItem("links"));
	        for (v in links) {
			        document.getElementById("links").innerHTML += v + "<br/>";
				    }
});

function cleanup() {
	    document.getElementById("links").innerHTML = '';
	        localStorage.clear();
    chrome.runtime.sendMessage({ "resetIcon" : true});
}
document.getElementById("myBtn").addEventListener("click", cleanup);
