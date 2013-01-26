var CONST_STORAGE_EMAIL = "__STORAGE_EMAIL__";
var CONST_STORAGE_API_KEY = "__STORAGE_API_KEY__";
var CONST_STORAGE_POBOX_LIST = "__STORAGE_POBOX_LIST__";

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "setLocalStorage"){
        var values = request.values;
        localStorage.setItem(CONST_STORAGE_EMAIL,values.email);
        localStorage.setItem(CONST_STORAGE_API_KEY,values.apiKey);
        if(!values.pobox_list){
            var apiclient = new ClamraAPI(values.email, values.apiKey);
            apiclient.listPobox(function(success, data){
                var pobox_list = [];
                $.each(data, function(index, item){
                    pobox_list.push(item['name']);
                });
                localStorage.setItem(CONST_STORAGE_POBOX_LIST, pobox_list);
            });
        }
        else{
            localStorage.setItem(CONST_STORAGE_POBOX_LIST, values.pobox_list);
        }
    }
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getOptions"){
        if(sendResponse){
            var email = localStorage.getItem(CONST_STORAGE_EMAIL);
            var apiKey = localStorage.getItem(CONST_STORAGE_API_KEY);
            var poboxList = localStorage.getItem(CONST_STORAGE_POBOX_LIST);
            sendResponse({
                email:email,
                apiKey:apiKey,
                poboxList: 
            });
        }
        
    }
    
});

console.log("back-------");
