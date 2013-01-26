$(function(){

      var poboxList = []
      chrome.extension.sendRequest({method: "getOptions"}, function(options){
          poboxList = options.poboxList.split(',');
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
         // console.log(email,window,$('#flower-password-iframe').hide());
          window.parent.postMessage({action:"setEmail",email:email},"*")
          //console.log();
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
