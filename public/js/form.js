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