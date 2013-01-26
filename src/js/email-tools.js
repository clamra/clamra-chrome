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
                $.extend(current, {left: offset.left+5, top: offset.top, width: width, height: height});
            } else {
                $.extend(current, {left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height});
            }
        }

        document.showIframe = showIframe = function(bounds) {
            updateCurrentFieldBounds(bounds);
            locateDialog();
            var iframe = $('#claram-email-iframe');
            iframe.width(324);
            iframe.height(88);
            $('#claram-email-iframe').show();
            iframe.show();
            
            
        };
        document.closeIframe = closeIframe= function(focusCurrentField) {
            if ($('#claram-email-iframe').is(':visible')) {
                $('#claram-email-iframe').hide();
                //messages.page.broadcast('iframeClosed', {focusCurrentField: focusCurrentField});
            }
        };
        focusIframe = function() {
            if ($('#claram-email-iframe').is(':visible')) {
                messages.page.broadcast('focusPassword');
            }
        };
        locateIframe = function(bounds) {
            updateCurrentFieldBounds(bounds);
            if ($('#claram-email-iframe').is(':visible')) {
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
            if (current.left - $(document).scrollLeft() + current.width + $('#claram-email-iframe').outerWidth() <= $(window).width()) {
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
            $('#claram-email-iframe').css({left: offset.left + "px", top: offset.top + "px"});
            dialogOffset = offset;
        }

        function injectIframe() {
            if ($('#claram-email-iframe').size() > 0) {
                return;
            }
            $('body').append('<iframe id="claram-email-iframe" src="' + getURL('iframe.html') + '" style="display: none;"></iframe>');

        }
        $(function(){
             injectIframe();
        })


    })();
} // endif (isTopWindow())



(function(){

    var inputSelectors = [
          "input[name*=email]",
          "input[name*=account]",
          "input[name*=mail]",
          "input[id*=account]",
          "input[id*=email]",
          "input[id*=mail]",

          "input[type=email]"
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
