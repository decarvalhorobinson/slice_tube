start = 0;
end = 0;

var btn = document.createElement("div");  
btn.innerHTML = "Get start time"; 
btn.className = "style-scope yt-simple-endpoint";
btn.style.zIndex = 9999;
btn.style.cursor = "pointer";
btn.style.fontSize = "1.5em";
btn.style.color="blue";
btn.style.position = "relative";
btn.style.bottom = 0;

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

btn.addEventListener('click', function(){
    if(start == 0){
        start = document.getElementsByTagName('video')[0].currentTime;
        btn.innerHTML = "Get end time";
    }else if(end == 0){
        currentURL = window.location.href;
        url = new URL(currentURL);
        videoId = url.searchParams.get("v");
        btn.innerHTML = "Get start time";
        end =  document.getElementsByTagName('video')[0].currentTime;
        if(end - start < 1){
          end = start + 1;
        }
        urlRedirect = "https://www.youtube.com/embed/"+videoId+"?start="+ Math.floor(start) +"&end=" + Math.floor(end);
        window.open(urlRedirect);

        copyToClipboard(urlRedirect);
        end = 0;
        start = 0;
    }

    //alert("start: " + start + ", end: " + end +  ", videoId: " + videoId);
});



var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    el = document.getElementById('ytd-player');
    if(el){
      document.getElementById('ytd-player').appendChild(btn); 
      observer.disconnect();
    }
  });
});

// Config info for the observer.
var config = {
  childList: true, 
  subtree: true
};

// Observe the body (and its descendants) for `childList` changes.
observer.observe(document.body, config);




