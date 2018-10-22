/**
 * This is the JS file of the FD15 page.
 * October 20, 2018
 * @ver 1.0
 * @author Sai Manalili
 */
var today = new Date();
/**
 * Initializes the Duration Start field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#duration-start').calendar({
  type: 'date',
  minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()), 
  onChange:function (date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    $('#duration-end').calendar({
      type: 'date',
      minDate: new Date(year, month, day)
    });    
   }
});

/**
 * Initializes the Duration End field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#duration-end').calendar({
  type: 'date',
  minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
});

/**
 * Initializes the Date of last incentive availed field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#incentive-date').calendar({
  type: 'date', 
  maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
});

/**
 * Initializes the checkbox buttons including
 * radio buttons.
 */
$('.ui.checkbox').checkbox();

/**
 * Initializes the button with #confirm and checks whether
 * it will show the confirmation modal or not.
 */
$("#confirm").click(function () {
  var isValid = $('.form').form('validate form');

  if (isValid) {
    $('.ui.modal')
      .modal('show');
  }
})

/**
 * Checks if all input have values, if it does not
 * it scrolls and focuses to that field
 */
function check(){

  var items = [];
  var count = 0;

  $('.check').each(function (i, e) {
    if (count == 0){
      var name = ($(e).attr("name")) 
      var val = $("#" + name).val(); 
      
      if (val == "" || val == null){
        count = 1
        $("#" + name).focus();

        $('body').animate({
          scrollTop: $("#" + name).offset()
        }, 2000);
      }
    }
  });
}

/**
 * Initializes the form in order for the form to do
 * form validation.
 * @param {Object} settings - customizing the settings of
 * the form
 */
$('#request-form')
    .form({
      inline: 'true',
      on: 'blur',
      fields: {
        firstName: {
          on: 'blur',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your first name.'
            }
          ]
        },
        lastName: {
          identifier: 'lastName',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your last name.'
            }
          ]
        },
        department: {
          identifier: 'department',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your department.'
            }
          ]
        },
        hostInstitution: {
          identifier: 'hostInstitution',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the host institution.'
            }
          ]
        },
        titleOfSeminar: {
          identifier: 'titleOfSeminar',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the title of the seminar.'
            }
          ]
        },
        place: {
          identifier: 'place',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the place.'
            }
          ]
        },
        dateIncentiveLastAvailed: {
          identifier: 'dateIncentiveLastAvailed',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the date of last availed incentive.'
            }
          ]
        },
        participantFee: {
          identifier: 'participantFee',
          rules: [
            {
              type   : 'empty',
              prompt : "Please enter the participant's fee."
            }
          ]
        },
      }
    });