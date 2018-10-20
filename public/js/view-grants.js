$('.ui.dropdown').dropdown({forceSelection: false});


$("button.delete").click(function () {
    var $tr = $(this).closest('tr'); 
    var id = $(this).attr("data-id")

    $('.ui.modal.deletion')
    .modal('show');

    $(".positive.delete").click(function(){
        $.ajax({
            method : "delete",
            url : "deleteform",
            data : {
                id
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
  