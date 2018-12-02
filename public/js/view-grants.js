/**
 * This is the JS file of the view grants page.
 * December 1, 2018
 * @ver 1.3
 * @author Candace Mercado
 */


$(document).ready(function() {
    $('#example thead tr').clone(true).appendTo( '#example thead' );
    $('#example thead tr:eq(1) th').each( function (i) {
        if (i!== 6){
            var title = $(this).text();
            $(this).html( '<div class="ui input fluid"><input style=" height: 20px; padding: 5px; " type="text" placeholder='+title+'></div>' );
         
            $( 'input', this ).on( 'keyup change', function () {
                if ( table.column(i).search() !== this.value ) {
                    table
                        .column(i)
                        .search( this.value )
                        .draw();
                }
            } );
        }
    } );
 
    var table = $('#example').DataTable( {
        pageLength: 10,
        orderCellsTop: true,
        fixedHeader: true,
        language: { 
            "searchPlaceholder": "Keywords", 
            "zeroRecords": "No grant requests found", 
            "info": "Showing _START_ to _END_ of _TOTAL_ grant requests",
            "infoEmpty": "No matches found",
            "infoFiltered": "(filtered from _MAX_  grant requests)"
        },
        columnDefs: [{  "targets": 6, "orderable": false }],   
        order: [[ 1, "desc" ]],
        lengthChange: false,
        aoColumns: [ null, null, null, null, null, null, { "bSearchable": false }],
        buttons: [{           
            extend: 'excel',
            messageTop: 'Submitted to the Office of the Vice Chancellor for Academics as of ' + moment().format("MMMM D, YYYY h:mm A"),
            text: 'Export Table to Excel',
            exportOptions: {
                columns: 'th:not(:last-child)'
            },

        },  
        {
            extend: 'pdf',
            text: 'Export Table to PDF',
            exportOptions: {
                columns: ':visible',
                columns: 'th:not(:last-child)',
                order: 'applied',
            },
            customize: function (doc) {		
                doc.content[1].layout = {
                    hLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 1 : 1;},
                    vLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 1 : 1;},
                    hLineColor: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';},
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';}
                };
             }, 
        }]
    });

    table.buttons().container().appendTo( 
        $('div.eight.column:eq(0)', table.table().container()) 
    );

    $(".buttons-excel").on('click',function(){
        var exportDiv = document.getElementById("done table export")
        $(exportDiv).empty()
        $(exportDiv).append("<i class='check icon'></i>")
        $(exportDiv).append("Table exported to Excel")

        $('.ui.page.dimmer.exportdone').dimmer('show')
        setTimeout(function() {  $('.ui.page.dimmer.exportdone').dimmer('hide'); }, 1000)
    });
    
    $(".buttons-pdf").on('click',function(){
        var exportDiv = document.getElementById("done table export")
        $(exportDiv).empty()
        $(exportDiv).append("<i class='check icon'></i>")
        $(exportDiv).append("Table exported to PDF")

        $('.ui.page.dimmer.exportdone').dimmer('show')
        setTimeout(function() {  $('.ui.page.dimmer.exportdone').dimmer('hide'); }, 1000)
    });
} );

$("button.delete").click(function () {
    var $tr = $(this).closest('tr'); 
    var id = $(this).attr("data-id")
    var grant = $(this).attr("data-grant")

    $.ajax({
        method : "get",
        url : "saveform",
        data : {
            id
        },
        success : function(form){
            if (form){
                var formIdDiv = document.getElementsByClassName("extra formid")
                var nameDiv = document.getElementsByClassName("extra name")
                var departmentDiv = document.getElementsByClassName("extra department")
                var timestampDiv = document.getElementsByClassName("extra datetime")
                var grantDiv = document.getElementsByClassName("extra grant")

                $(formIdDiv).empty()
                $(nameDiv).empty()
                $(departmentDiv).empty()
                $(timestampDiv).empty()
                $(grantDiv).empty()
                
                $(formIdDiv).append("<b>Form ID: </b>"+form.formId)
                $(nameDiv).append("<b>Name: </b>"+form.firstName + " " + form.lastName)
                $(departmentDiv).append("<b>Department: </b>"+form.department) 
                $(timestampDiv).append("<b>Submitted on: </b>"+ moment(form.timestamp).format("MMMM D, YYYY h:mm A"))
                $(grantDiv).append("<b>Grant Requested: </b>"+form.grantName)

                $('.ui.modal.deletion').modal('show');
            } 
        }
    })
    
    $(".ui.button.negative.delete.final").on("click", function(){
        $.ajax({ 
            method : "delete",
            url : "delete-form",
            data : {
                id,
                grant
            },
            success : function(result){
                if (result.n === 1){
                    $tr.remove(); 
                    $('.ui.modal.deletion').modal('hide');
                    $('.ui.page.dimmer.deletiondone').dimmer('show');
                    setTimeout(function() {   $('.ui.page.dimmer.deletiondone').dimmer('hide'); }, 2000);
                } 
            }
        })
    })

    $(".cancel.delete.final").on("click",function(){
        $('.ui.modal.deletion').modal('hide');
    })
  })
  