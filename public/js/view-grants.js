$('.ui.dropdown').dropdown({forceSelection: false});

$("button.delete").click(function(){
    var id = $(this).attr("data-id")
    var $tr = $(this).closest('tr'); 
    
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

  