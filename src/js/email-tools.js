var current = {field: null, left: 0, top: 0, width: 0, height: 0};
var events = {
    onFocusInPassword: new OnEvent(),
    onFocusOutPassword: new OnEvent(),
    onKeyDown: new OnEvent(),
    onResize: new OnEvent()
};
var showIframe, closeIframe, focusIframe, locateIframe;

if (isTopWindow()) {
    (function() {
        /**
         * iframe 通信
         */
        $(window).on('message', function(e) {

            if(e.originalEvent && e.originalEvent.data){
               //console.log("win message",e);
                var data =  e.originalEvent.data
                if(data.action == "setEmail"){
                    if(current.field){
                        current.field.val(data.email);
                    }
                    closeIframe();
                }
                if(data.action == "closeIframe") {
                    closeIframe();
                }
            }
        });
        function updateCurrentFieldBounds(bounds) {
            if (isUndefined(bounds)) {
                var width = current.field.outerWidth();
                var height = current.field.outerHeight();
                var offset = current.field.offset();
                $.extend(current, {left: offset.left, top: offset.top, width: width, height: height});
            } else {
                $.extend(current, {left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height});
            }
        }

        document.showIframe = showIframe = function(bounds) {
            updateCurrentFieldBounds(bounds);
            locateDialog();
            var iframe = $('#flower-password-iframe');
            iframe.width(324);
            iframe.height(88);
            $('#flower-password-iframe').show();
            iframe.show();
            
            
        };
        document.closeIframe = closeIframe= function(focusCurrentField) {
            if ($('#flower-password-iframe').is(':visible')) {
                $('#flower-password-iframe').hide();
                //messages.page.broadcast('iframeClosed', {focusCurrentField: focusCurrentField});
            }
        };
        focusIframe = function() {
            if ($('#flower-password-iframe').is(':visible')) {
                messages.page.broadcast('focusPassword');
            }
        };
        locateIframe = function(bounds) {
            updateCurrentFieldBounds(bounds);
            if ($('#flower-password-iframe').is(':visible')) {
                locateDialog();
            }
        };

        events.onResize.addListener(function() {
            if (current.field) {
                locateIframe();
            } else {
                messages.page.broadcast('windowResized');
            }
        });

        function calculateDialogOffset() {
            var result;
            if (current.left - $(document).scrollLeft() + current.width + $('#flower-password-iframe').outerWidth() <= $(window).width()) {
                result = {left: current.left + current.width, top: current.top};
            } else {
                result = {left: current.left, top: current.top + current.height};
            }
            return result;
        }

        var dialogOffset = null;
        function locateDialog(offset) {
            if (!offset) {
                offset = calculateDialogOffset();
            }
            $('#flower-password-iframe').css({left: offset.left + "px", top: offset.top + "px"});
            dialogOffset = offset;
        }

        function injectIframe() {
            if ($('#flower-password-iframe').size() > 0) {
                return;
            }
            $('body').append('<iframe id="flower-password-iframe" src="' + getURL('iframe.html') + '" style="display: none;"></iframe>');

        }
        $(function(){
             injectIframe();
        })


    })();
} // endif (isTopWindow())



(function(){
    console.log("...",messages);
    messages.page.handlers["iframeClosed"] = function(data){
        console.log("Page message",data);
    }
    var inputSelectors = [
          "input[name*=email]",
          "input[name*=account]"
    ];
    $(document).on('focus.fp', "input",function(e){

        for(var i = 0;i<inputSelectors.length;i++){
            if ($(e.target).is(inputSelectors[i]))  {
                var val = $(this).val();
                current.field = $(this);

                showIframe();

            }
        }
    }).on('focusin.fp mousedown.fp', function(e) {
           // console.log("---------  ");
             var match = false;
            for(var i = 0;i<inputSelectors.length;i++){
                if ($(e.target).is(inputSelectors[i]))  {
                    match = true;
                    //console.log("match")
                   // closeIframe();
                }


            }
            if(!match){
                closeIframe();
            }
        });
})();
