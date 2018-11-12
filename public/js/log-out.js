/**
 * This is the JS file for logging out 
 * October 20, 2018
 * @ver 1.0
 * @author Candace Mercado
 */

$("div.log-out").click(function () {

    $('.ui.modal.logout').modal('show');

    $(".positive.logout").click(function(){
        window.location = "/logout";
    })
  })

