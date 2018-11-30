/**
 * This is the JS file of the view grants page.
 * November 26, 2018
 * @ver 1.2
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
        orderCellsTop: true,
        fixedHeader: true,
        language: { "searchPlaceholder": "Keywords"},
        columnDefs: [{  "targets": 6, "orderable": false }],   
        order: [[ 1, "desc" ]],
        lengthChange: false,
        aoColumns: [ null, null, null, null, null, null, { "bSearchable": false }],
        buttons: [{
            extend: 'excel',
            text: 'Export Table to Excel',
            exportOptions: {
                columns: 'th:not(:last-child)'
            }
        },  
        {
            extend: 'pdf',
            text: 'Export Table to PDF',
            exportOptions: {
                columns: 'th:not(:last-child)'
            }
        }],
    });
 
    table.buttons().container().appendTo( 
        $('div.eight.column:eq(0)', table.table().container()) 
    );
} );

$("button.delete").click(function () {
    var $tr = $(this).closest('tr'); 
    var id = $(this).attr("data-id")
    var grant = $(this).attr("data-grant")

    $('.ui.modal.deletion')
    .modal('show');

    $(".negative.delete.final").click(function(){
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
                } else{
                    alert("Something went wrong")
                }
            }
        })
    })
  })
  