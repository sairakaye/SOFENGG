/**
 * This is the JS file of the FD16 page.
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
* Initializes the Membership Date field.
* @param {Object} settings - customizing the settings of
* the calendar
*/
$('#membership-date').calendar({
  type: 'date'
})

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
      rank: {
        identifier: 'rank',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your rank.'
          }
        ]
      },
      nameOfOrganization: {
        identifier: 'nameOfOrganization',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the name of the organization.'
          }
        ]
      },
      membershipDate: {
        identifier: 'membershipDate',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the membership date.'
          }
        ]
      },
      coverage: {
        identifier: 'coverage',
        rules: [
          {
            type: 'empty',
            prompt: 'Please indicate the coverage.'
          }
        ]
      },
      membershipFee: {
        identifier: 'membershipFee',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the membership fee.'
          },
          {
            type: 'decimalLimit[2]',
            prompt: 'Please input up to only two decimal places',
          }, 
          {
            type   : 'maxLength[10]',
            prompt: 'Please enter a valid membership fee.'
          }
        ]
      },
      checkPayableTo: {
        identifier: 'checkPayableTo',
        rules: [
          {
            type: 'empty',
            prompt: 'Please indicate the check payable to.'
          }
        ]
      }
    }
  });

/**
 * This part checks if the it is a lifetime type of
 * membership
 */

var isLifetimeDuration = $('#lifetime-membership').prop('checked');
if (isLifetimeDuration) {
  $("#coverage").val("N/A");
  $("#coverage").attr("disabled", "disabled");
  $("#request-form").form('validate field', 'coverage');
}

$("input[type=radio][name=typeofMembershipDuration]").change(function () {
  if (this.value == "Lifetime") {
    $("#coverage").val("N/A");
    $("#coverage").attr("disabled", "disabled");
    $("#request-form").form('validate field', 'coverage');
  } else {
    $("#coverage").val("");
    $("#coverage").removeAttr("disabled");
  }
});