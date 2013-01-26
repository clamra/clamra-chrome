(function() {
    var CLAMRA_API_ENDPOINT =  'http://api.clamra.com/'

    var ClamraAPI = function(account, api_key){
        this.account = account;
        this.api_key = api_key;
    }

    ClamraAPI.prototype = {
        listPobox : function(cb){
            var url = CLAMRA_API_ENDPOINT + 'account/' + this.account + '/poboxes/';
            url += '?' + $.param({'api_key' : this.api_key});
            console.log(url);
            $.ajax({
                url : url,
                type : 'GET',
                dataType : 'json',
                success : function(data){
                    cb(true, data);
                },
                error : function(xhr){
                    cb(false, 'server error: ' + textStatus);
                }
            });
        },
        createPobox : function(cb){
            var url = CLAMRA_API_ENDPOINT + 'account/' + this.account + '/poboxes/';
            url += '?' + $.param({'api_key' : this.api_key});
            $.ajax({
                url : url,
                type : 'POST',
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
