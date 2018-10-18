/**
 * This is the JS file of the form page.
 * October 17, 2018
 * @ver 1.0
 * @author Sai Manalili
 */

 
$("#dp-grants").dropdown({
    onChange: function() {
      var formVal = parseInt($('#dp-grants').dropdown('get value'))
      $("#form-dp").val(formVal);
    }
});

$('#date-hired').calendar({
  type: 'date'
})

$('#submit-date').calendar({
  type: 'date'
});

$('#accept-date').calendar({
  type: 'date'
});

$('#conference-date').calendar({
  type: 'date'
});

$('#departure-date').calendar({
  type: 'date'
});

$('#return-date').calendar({
  type: 'date'
});


$('#expected-date').calendar({
  type: 'date'
});


$('#incentive-date').calendar({
  type: 'date'
});

$('.ui.form')
  .form({
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
      aveTeachingPerformance: {
        identifier: 'aveTeachingPerformance',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your average teaching performance.'
          }
        ]
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
  })
;