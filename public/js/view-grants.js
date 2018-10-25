$('.ui.dropdown').dropdown({forceSelection: false});

$("button.delete").click(function () {
    var $tr = $(this).closest('tr'); 
    var id = $(this).attr("data-id")
    var grant = $(this).attr("data-grant")

    $('.ui.modal.deletion')
    .modal('show');

    $(".negative.delete.final").click(function(){
        $.ajax({ 
            method : "delete",
            url : "deleteform",
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
  