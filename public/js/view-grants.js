/**
 * This is the JS file of the view grants page.
 * November 26, 2018
 * @ver 1.2
 * @author Candace Mercado
 */

$(document).ready(function() {
    var table = $('#example').DataTable( { 
        language: {
            searchPlaceholder: "TO BE ADDED"
        },
        order: [[ 1, "desc" ]],
        lengthChange: false,
        info: false,
        buttons: [  
        {
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
        },
        ]
    } );
 
    table.buttons().container()
        .appendTo( $('div.eight.column:eq(0)', table.table().container()) );
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
  