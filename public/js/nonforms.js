$("div.log-out").click(function () {

    $('.ui.modal.logout').modal('show');

    $(".positive.logout").click(function(){
        window.location = "/logout";
    })
  })


  
//   noBack();
//   window.onload=noBack;

//   function noBack(){
//     window.history.forward();
//   }
//   window.onpageshow=function(evt){
//     if(evt.persisted)noBack();
//   }
//   window.onunload=function(){
//     void(0);
//   }