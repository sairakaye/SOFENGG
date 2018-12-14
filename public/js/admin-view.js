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

var formID = $("#submit-button").attr("data-id")
var grant = $("#submit-button").attr("data-grant")
var currentStatus = $("#form-status").val()
var $tr
var id

$("button#delete-button").on("click", function (e) {
  $tr = $(this).closest('tr')
  id = $(this).attr("data-id")

  $('.ui.modal.deletion')
    .modal('show');
})

$(".negative.delete.final").on("click", function () {
  $.ajax({
    method: "delete",
    url: "delete-remark",
    data: {
      id,
      formID,
      grant
    },
    success: function (result) {
      if (result.n == 1) {
        $tr.remove();
        $tr = null
        id = null
      } else
        alert("Something went wrong!")
    }
  })
})


$("#reset-button").on("click", function() {
  $(".dropdown").dropdown('restore defaults');
  $("#status-dropdown").val("")
  $("#remark").val("")
})

$("#remarks-form").submit(function (e) {
  e.preventDefault();

  var status = $("#status-dropdown").val()
  var remark = $("#remark").val()
  
  if (remark == "" && status == "") {
    toastr.info("Enter a remark or status first before you submit!", "Enter a remark or status first!").css("width", "50%")
  } else if (status === currentStatus) {
    toastr.warning("You already set " + status + " to the form.", "Did you set the same status?").css("width", "50%")
  } else {
    $.ajax({
      method: "post",
      url: "change-status",
      data: {
        status,
        formID,
        grant,
        remark,
        currentStatus
      },
      success: function (result) {
        var header = "Remark added!"

        if (status != "" && remark == "") {
          $("#form-status").val(status)
          currentStatus = $("#form-status").val()
          toastr.success("You successfully changed the status of " + grant + " to " + status + ".", header)
            .css("width", "50%")
        } else if (status == "" && remark != "") {
          toastr.success("You successfully added the remark in " + grant + ".", header)
            .css("width", "50%")
        } else if (status != "" || remark != "") {
          $("#form-status").val(status)
          currentStatus = $("#form-status").val()
          toastr.success("You successfully changed the status of " + grant + " to " + status + " and added the remark.", header)
            .css("width", "50%")
        }
        
        if (result._id != "undefined") {
          var tbodyElement = document.getElementById("remarks-body")
          var trElement = document.createElement("tr")
          var tdDate = document.createElement("td")
          var tdStatus = document.createElement("td")
          var tdRemark = document.createElement("td")

          $(tdDate).append(moment(result.date).format("MMMM D, YYYY h:mm A"))
          $(tdStatus).append(result.status)
          $(tdRemark).append(result.remark)
          
          $(trElement).append(tdDate)
          $(trElement).append(tdStatus)
          $(trElement).append(tdRemark)

          $(tbodyElement).append(trElement)

          $(document).on("click", "#delete-button", function() {
            $tr = $(this).closest('tr')
            id = $(this).attr("data-id")
          
            $('.ui.modal.deletion')
              .modal('show');         
          })

          $(".dropdown").dropdown('restore defaults');
          $("#status-dropdown").val("")
          $("#remark").val("")
        }
      },

      error: function (err) {
        alert("Something went wrong! " + err)
      }
    })
  }
})
