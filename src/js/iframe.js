$(function(){
      var poboxList = []
      chrome.extension.sendRequest({method: "getOptions"}, function(options){
          if(options.poboxList){
            poboxList = options.poboxList.split(',');
          }
          fillEmailList();
      });

      function fillEmailList(){
          $("#emailList").empty();
          $.each(poboxList, function(i, item){
              $("#emailList").append("<option>" + item + "</option>");
          });
      }
      $("#close").click(function(){
          window.parent.postMessage({action:"closeIframe"},"*");
      });
      $("#btnOk").click(function(){
           var email =  $("#emailList").val();
          window.parent.postMessage({action:"setEmail",email:email},"*")
          //messages.page.broadcast('iframeClosed', {email:email});
          //messages.page.sendToTop('closeIframe');
      });

      $("#btnNew").click(function(){
          chrome.extension.sendRequest({method: "createPobox"}, function(poboxName){
             poboxList.push(poboxName);
             fillEmailList();
          });
      });


})
