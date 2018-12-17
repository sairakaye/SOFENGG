/**
 * This is the JS file of the FD15 page.
 * October 20, 2018
 * @ver 1.3
 * @author Sai Manalili
 */

/**
 * This is variable creates the date
 * today.
 */
var today = new Date();

/**
 * Prevents the enter key to be pressed in forms.
 * @param {Event} e
 */
function stopEnterKey(e) {
  var e = (e) ? e : ((event) ? event : null);
  var node = (e.target) ? e.target : ((e.srcElement) ? e.srcElement : null);
  if ((e.keyCode == 13) && ((node.type == "text")
    || node.type == "number")) {
    return false;
  }
}

$('.ui.dropdown').dropdown('refresh');
$('.ui.dropdown').dropdown('set selected','PHP')
/**
 * This is initialize to the page where
 * when a key is pressed, it calls for
 * stopEnterKey function.
 */
document.onkeypress = stopEnterKey;
/**
 * Initializes the Duration Start field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#duration-start').calendar({
  type: 'date',
  minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  onChange: function (date) {
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
 * Checks if all input have values, if it does not
 * it scrolls and focuses to that field
 */
function check() {
  var count = 0;

  $('.check').each(function (i, e) {
    if (count == 0) {
      var name = ($(e).attr("name"))
      var val = $("#" + name).val();

      if (val == "" || val == null) {
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
 * This is a custom validation for the fees 
 * 
 * @param {Integer} inputValue - the input of the user
 * @param {Integer} validationValue - the checker value
 */
$.fn.form.settings.rules.decimalLimit = function (inputValue, validationValue) {
  if (inputValue.toString().includes('.')){
    var input = inputValue.toString().split('.')
    console.log(inputValue)
    console.log(input[1].length)
    return input[1].length <= validationValue
  }
  return true
}


/**
 * Initializes the form in order for the form to do
 * form validation.
 * @param {Object} settings - customizing the settings of
 * the form
 */
$('#request-form')
  .form({
    inline: true,
    on: 'blur',
    keyboardShortcuts: false,

    fields: {
      firstName: {
        identifier: 'firstName',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your first name.'
          }
        ]
      },
      lastName: {
        identifier: 'lastName',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your last name.'
          }
        ]
      },
      department: {
        identifier: 'department',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your department.'
          }
        ]
      },
      hostInstitution: {
        identifier: 'hostInstitution',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the host institution.'
          }
        ]
      },
      startTime: {
        identifier: 'startTime',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the start duration.'
          }
        ]
      },
      endTime: {
        identifier: 'endTime',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the end duration.'
          }
        ]
      },
      titleOfSeminar: {
        identifier: 'titleOfSeminar',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the title of the seminar.'
          }
        ]
      },
      place: {
        identifier: 'place',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the place of seminar.'
          }
        ]
      },
      dateIncentiveLastAvailed: {
        identifier: 'dateIncentiveLastAvailed',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the date of last availed incentive.'
          }
        ]
      },
      participantFee: {
        identifier: 'participantFee',
        rules: [ 
          {
            type: 'empty',
            prompt: "Please enter the participant's fee."
          },
          {
            type: 'decimalLimit[2]',
            prompt: 'Please input up to only two decimal places',
          }, 
          {
            type   : 'maxLength[10]',
            prompt: 'Please enter a valid participant fee.'
          }
        ]
      },
    }
  });

/**
 * This part checks if the incentive was not availed,
 * and the user submits the form for preview, it retains
 * the did not avail for incentive check.
 */
var isNoAvailChecked = $('#no-avail').prop('checked');
if (isNoAvailChecked) {
  $("#dateIncentiveLastAvailed").val("N/A");
  $("#dateIncentiveLastAvailed").attr("disabled", "disabled");
  $("#request-form").form('validate field', 'dateIncentiveLastAvailed');
}

/**
* This function checks for the change
* of the checkbox in "Date incentive was last availed of".
*/
$("#no-avail").change(function () {
  if (this.checked) {
    $("#dateIncentiveLastAvailed").val("N/A");
    $("#dateIncentiveLastAvailed").attr("disabled", "disabled");
    $("#request-form").form('validate field', 'dateIncentiveLastAvailed');

  } else {
    $("#dateIncentiveLastAvailed").val("");
    $("#dateIncentiveLastAvailed").removeAttr("disabled");
  }
});