/**
 * This is the JS file of the View Details
 * pages.
 * November 25, 2018
 * @ver 1.0
 * @author Sai Manalili
 */

/**
 * This is for the initialization of
 * the dropdown.
 */
$('.ui.dropdown').dropdown();

$("#remarks-form").submit(function (e) {
  e.preventDefault();
  
  var status = $("#status").val()
  var formID = $("#submit-button").attr("data-id")
  var grant = $("#submit-button").attr("data-grant")


  $.ajax({
    method: "post",
    url: "change-status",
    data: {
      status,
      formID,
      grant
    },
    success: function() {
      console.log("Grant status changed!")

      var promptDiv = document.getElementById("prompt")
      $(promptDiv).empty()

      var messageDiv = document.createElement("div")

      $(messageDiv).addClass("ui positive message transition hidden fluid")

      var icon = document.createElement("i")
      $(icon).addClass("close icon")

      var headerDiv = document.createElement("div")
      $(headerDiv).addClass("header")
      $(headerDiv).append("Grant Status Changed!")

      var paragraph = document.createElement("p")
      $(paragraph).append("You successfully changed the status! :D")


      $(messageDiv).append(icon)
      $(messageDiv).append(headerDiv)
      $(messageDiv).append(paragraph)
      $(promptDiv).append(messageDiv)

      $('.message .close').on('click', function() { 
        $(this).closest('.message')
        .transition('fade')
      });
    },
    error: function() {
      alert("Something went wrong!")
    }
  })
})