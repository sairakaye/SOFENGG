/**
 * This is the JS file of the preview form
 * pages.
 * November 10, 2018
 * @ver 1.0
 * @author Sai Manalili
 */

 /**
  * Prevents the enter key to be pressed in forms.
  * @param {Event} e
  */
 function stopEnterKey(e) { 
   var e = (e) ? e : ((event) ? event : null); 
   var node = (e.target) ? e.target : ((e.srcElement) ? e.srcElement : null); 
   if ((e.keyCode == 13) && ((node.type=="text") 
       || node.type=="number")) {
     return false;
   }
 }
 
 /**
  * This is initialize to the page where
  * when a key is pressed, it calls for
  * stopEnterKey function.
  */
 document.onkeypress = stopEnterKey;
 
 /**
  * Initializes the Date Hired field.
  * @param {Object} settings - customizing the settings of
  * the calendar
  */
 $('#date-hired').calendar({
   type: 'date',
   maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
 })
 
 /**
  * Initializes the Date of Paper Submitted field.
  * @param {Object} settings - customizing the settings of
  * the calendar
  */
 $('#submit-date').calendar({
   type: 'date',
   maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
   onChange: function (date) {
     var year = date.getFullYear();
     var month = date.getMonth();
     var day = date.getDate();
 
     $('#accept-date').calendar({
       type: 'date',
       minDate: new Date(year, month, day),
       maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
     });
   }
 });
 
 /**
  * Initializes the Date of Acceptance field.
  * @param {Object} settings - customizing the settings of
  * the calendar
  */
 $('#accept-date').calendar({
   type: 'date',
   maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
 
 });
 
 /**
  * Initializes the Date of Conference field.
  * @param {Object} settings - customizing the settings of
  * the calendar
  */
 $('#conference-date').calendar({
   type: 'date',
   minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()), 
   onChange: function (date) {
     var yearCon = date.getFullYear();
     var monthCon = date.getMonth();
     var dayCon = date.getDate();
 
     $('#departure-date').calendar({
       type: 'date',
       maxDate: new Date(yearCon, monthCon, dayCon),
       minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
       onChange: function (date) {
         var year = date.getFullYear();
         var month = date.getMonth();
         var day = date.getDate();
 
         $('#return-date').calendar({
           type: 'date',
           minDate: new Date(yearCon, monthCon, dayCon),
           onChange: function (date) {
             var year = date.getFullYear();
             var month = date.getMonth();
             var day = date.getDate();
     
             $('#expected-date').calendar({
               type: 'date',
               minDate: new Date(year, month, day)
             });
           }
         });
       }
     });
   }
 });
 
 /**
  * Initializes the Date of Departure field.
  * @param {Object} settings - customizing the settings of
  * the calendar
  */
 $('#departure-date').calendar({
   type: 'date',
   minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
 });
 
 /**
  * Initializes the Date of Return field.
  * @param {Object} settings - customizing the settings of
  * the calendar
  */
 $('#return-date').calendar({
   type: 'date',
   minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
 });
 
 /**
  * Initializes the Date of Expected to Return
  * to Work field.
  * @param {Object} settings - customizing the settings of
  * the calendar
  */
 $('#expected-date').calendar({
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
   check();
   var isValid = $('.form').form('validate form');
 
   if (isValid) {
   }
 })