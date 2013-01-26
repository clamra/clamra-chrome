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
