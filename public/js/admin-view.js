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
    var promptDiv = document.getElementById("prompt")
    $(promptDiv).empty()
    var messageDiv = document.createElement("div")

    $(messageDiv).addClass("ui negative message transition")

    var icon = document.createElement("i")
    $(icon).addClass("close icon")

    var headerDiv = document.createElement("div")
    $(headerDiv).addClass("header")
    $(headerDiv).append("Enter a remark or status first!")

    var paragraph = document.createElement("p")
    $(paragraph).append("Enter a remark or status first before you submit!")


    $(messageDiv).append(icon)
    $(messageDiv).append(headerDiv)
    $(messageDiv).append(paragraph)
    $(promptDiv).append(messageDiv)

    $('.message .close').on('click', function () {
      $(this).closest('.message')
        .transition('fade')
    })
  } else if (status === currentStatus) {
    var promptDiv = document.getElementById("prompt")
    $(promptDiv).empty()
    var messageDiv = document.createElement("div")

    $(messageDiv).addClass("ui yellow message transition")

    var icon = document.createElement("i")
    $(icon).addClass("close icon")

    var headerDiv = document.createElement("div")
    $(headerDiv).addClass("header")
    $(headerDiv).append("Did you set the same status?")

    var paragraph = document.createElement("p")
    $(paragraph).append("You already set " + status + " to the form.")


    $(messageDiv).append(icon)
    $(messageDiv).append(headerDiv)
    $(messageDiv).append(paragraph)
    $(promptDiv).append(messageDiv)

    $('.message .close').on('click', function () {
      $(this).closest('.message')
        .transition('fade')
    })    
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
        var promptDiv = document.getElementById("prompt")
        $(promptDiv).empty()

        var messageDiv = document.createElement("div")

        $(messageDiv).addClass("ui positive message transition")

        var icon = document.createElement("i")
        $(icon).addClass("close icon")

        var headerDiv = document.createElement("div")
        $(headerDiv).addClass("header")
        $(headerDiv).append("Remark added!")

        var paragraph = document.createElement("p")
        if (status != "" && remark == "") {
          $("#form-status").val(status)
          currentStatus = $("#form-status").val()
          $(paragraph).append("You successfully changed the status of " + grant + " to " + status + ".")
        } else if (status == "" && remark != "") {
          $(paragraph).append("You successfully added the remark in " + grant + ".")
        } else if (status != "" || remark != "") {
          $("#form-status").val(status)
          currentStatus = $("#form-status").val()
          $(paragraph).append("You successfully changed the status of " + grant + " to " + status + " and added the remark.")
        }

        $(messageDiv).append(icon)
        $(messageDiv).append(headerDiv)
        $(messageDiv).append(paragraph)
        $(promptDiv).append(messageDiv)

        $('.message .close').on('click', function () {
          $(this).closest('.message')
            .transition('fade')
        })

        if (result._id != "undefined") {
          var tbodyElement = document.getElementById("remarks-body")
          var trElement = document.createElement("tr")
          var tdDate = document.createElement("td")
          var tdStatus = document.createElement("td")
          var tdRemark = document.createElement("td")
          var tdButton = document.createElement("td")
          var deleteButton = document.createElement("button")
          
          $(deleteButton).addClass("ui button red")
          $(deleteButton).attr("data-id", result._id)
          $(deleteButton).attr("id", "delete-button")
          $(deleteButton).append("Delete")

          $(tdDate).append(moment(result.date).format("MMMM D, YYYY h:mm A"))
          $(tdStatus).append(result.status)
          $(tdRemark).append(result.remark)
          $(tdButton).append(deleteButton)

          $(trElement).append(tdDate)
          $(trElement).append(tdStatus)
          $(trElement).append(tdRemark)
          $(trElement).append(tdButton)

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