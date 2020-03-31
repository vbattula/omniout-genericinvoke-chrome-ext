(function() {
    const networkFilters = {
        urls: [
            "*://*/*"
        ]
    };

    chrome.webRequest.onBeforeRequest.addListener((details) => {
        if(details.url.endsWith("services/apexrest/vlocity_cmt/v1/invoke/") 
            || details.url.endsWith("services/apexrest/vlocity_cmt/v1/GenericInvoke/")) {
            var bodyString, bodyJson, targetUrl;
            bodyString = decodeURIComponent(String.fromCharCode.apply(null,
                new Uint8Array(details.requestBody.raw[0].bytes)));
            bodyJson = JSON.parse(bodyString);
            targetUrl = details.url + bodyJson.sClassName + "/" + bodyJson.sMethodName;
            //console.log("Changed URL to => " + targetUrl);
            return {redirectUrl: targetUrl};
        }
       
    }, networkFilters, ["blocking", "requestBody"]);
}());