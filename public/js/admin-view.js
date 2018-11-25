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
    },
    error: function() {
      alert("Something went wrong!")
    }
  })
})