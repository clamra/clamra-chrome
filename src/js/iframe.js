$(function(){
      $("#btnOk").click(function(){
           var email =  $("#emailList").val();
         // console.log(email,window,$('#flower-password-iframe').hide());
          window.parent.postMessage({action:"setEmail",email:email},"*")
          //console.log();
          //messages.page.broadcast('iframeClosed', {email:email});
          //messages.page.sendToTop('closeIframe');
      });
})