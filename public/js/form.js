$("#dp-grants").dropdown({
    onChange: function() {
      var formVal = parseInt($('#dp-grants').dropdown('get value'))  
      /*
      switch (formVal) {
      }
      */
    }
});
