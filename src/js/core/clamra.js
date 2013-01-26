(function() {
    var CLAMRA_API_ENDPOINT =  'http://api.clamra.com/'

    var ClamraAPI = function(account, api_key){
        this.account = account;
        this.api_key = api_key;
    }

    ClamraAPI.prototype = {
        listPobox : function(cb){
            var url = CLAMRA_API_ENDPOINT + 'account/' + this.account + '/poboxes/';
            $.ajax({
                url : url,
                method : 'GET',
                dataType : 'json',
                success : function(data){
                    cb(true, data);
                },
                error : function(xhr){
                    cb(false, 'server error: ' + textStatus);
                }
            });
        },
        createPobox : function(){
            var url = CLAMRA_API_ENDPOINT + 'account/' + this.account + '/poboxes/';
            $.ajax({
                url : url,
                method : 'POST',
                dataType : 'json',
                success : function(data){
                    cb(true, data);
                },
                error : function(xhr, textStatus){
                    cb(false, 'server error:' + textStatus);
                }
            });
        }
    }

    window.ClamraAPI = ClamraAPI;

})($);
