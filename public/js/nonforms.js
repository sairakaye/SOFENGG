$("div.log-out").click(function () {

    $('.ui.modal.logout')
    .modal('show');

    $(".positive.logout").click(function(){
        window.location = "/logout";
    })
  })