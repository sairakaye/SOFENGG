/**
 * This is the JS file of the form page.
 * October 17, 2018
 * @ver 1.0
 * @author Sai Manalili
 */

/**
 * Initializes the Date Hired field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#date-hired').calendar({
  type: 'date'
})

/**
 * Initializes the Date of Paper Submitted field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#submit-date').calendar({
  type: 'date'
});

/**
 * Initializes the Date of Acceptance field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#accept-date').calendar({
  type: 'date'
});

/**
 * Initializes the Date of Conference field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#conference-date').calendar({
  type: 'date'
});

/**
 * Initializes the Date of Departure field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#departure-date').calendar({
  type: 'date'
});

/**
 * Initializes the Date of Return field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#return-date').calendar({
  type: 'date'
});

/**
 * Initializes the Date of Expected to Return
 * to Work field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#expected-date').calendar({
  type: 'date'
});

/**
 * Initializes the Date of last incentive availed field.
 * @param {Object} settings - customizing the settings of
 * the calendar
 */
$('#incentive-date').calendar({
  type: 'date'
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
 * Initializes the form in order for the form to do
 * form validation.
 * @param {Object} settings - customizing the settings of
 * the form
 */
  $('.ui.form')
    .form({
      inline: 'true',
      on: 'blur',
      fields: {
        firstName: {
          identifier: 'firstName',
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
        dateHired: {
          identifier: 'dateHired',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter when you were hired.'
            }
          ]
        },
        rank: {
          identifier: 'rank',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your rank.'
            }
          ]
        },
        numTerms: {
            identifier: 'numTerms',
            rules: [{
              type: 'empty',
              prompt: 'Please enter the number of terms.'
            }]
        },
        titleOfPaperOrPublication: {
          identifier: 'titleOfPaperOrPublication',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your title of publication.'
            }
          ]
        },
        titleOfJournal: {
          identifier: 'titleOfJournal',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your title of journal.'
            }
          ]
        },
        datePaperSubmitted: {
          identifier: 'datePaperSubmitted',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter when the paper is submitted.'
            }
          ]
        },
        datePaperAccepted: {
          identifier: 'datePaperSubmitted',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter when the paper is accepted.'
            }
          ]
        },
        nameOfConference: {
          identifier: 'nameOfConference',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the name of the conference.'
            }
          ]
        },
        titleOfPaperToBePresented: {
          identifier: 'titleOfPaperToBePresented',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the name of the conference.'
            }
          ]
        },
  
        dateOfConference: {
          identifier: 'dateOfConference',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the date of the conference.'
            }
          ]
        },
  
        placeAndVenue: {
          identifier: 'placeAndVenue',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the place and venue.'
            }
          ]
        },
        dateOfDeparture: {
          identifier: 'dateOfDeparture',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the date of departure.'
            }
          ]
        },
        dateOfReturn: {
          identifier: 'dateOfReturn',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the date of return.'
            }
          ]
        },
        dateOfReturnToWork: {
          identifier: 'dateOfReturnToWork',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter the date of return to work.'
            }
          ]
        },
        datePaperAccepted: {
          identifier: 'datePaperAccepted',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter when the paper is accepted.'
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
        status: {
          identifier  : 'status',
          rules: [
            {
              type   : 'checked',
              prompt : 'Please state your status.'
            }
          ]
        }
      }
    });