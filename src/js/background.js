var CONST_STORAGE_EMAIL = "__STORAGE_EMAIL__";
var CONST_STORAGE_API_KEY = "__STORAGE_API_KEY__";

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log("back  onRequest...");
    if (request.method == "setLocalStorage"){
        var values = request.values;
        localStorage.setItem(CONST_STORAGE_EMAIL,values.email);
        localStorage.setItem(CONST_STORAGE_API_KEY,values.apiKey);
    }
    
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getOptions"){
        if(sendResponse){
           var email = localStorage.getItem(CONST_STORAGE_EMAIL);
            var apiKey = localStorage.getItem(CONST_STORAGE_API_KEY);
            sendResponse({
                email:email,
                apiKey:apiKey
            });
        }
        
    }
    
});

console.log("back-------");
