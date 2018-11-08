/**
 * This is the JS file of the my requests page.
 * November 7, 2018
 * @ver 1.0
 * @author Candace Mercado
 */

$(".button.printform").click(function () { 
    var id = $(this).attr("data-id")

    $.ajax({ 
        method : "get",
        url : "printform",
        data : {
            id
        },
        success : function(form){
            if (form){
                var doc = new jsPDF('p','pt','legal');
                doc.setFontSize(11);

                if (form.grantName == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal"){
                    doc.addImage(form1image, 'JPEG', 0, 0, 612, 1008)
                } else if (form.grantName == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences"){
                    doc.addImage(form2image, 'JPEG', 0, 0, 612, 1008)
                } else if (form.grantName ==  "[FD3] Support for Paper Presentations in Conferences"){
                    doc.addImage(form3image, 'JPEG', 0, 0, 612, 1008)
                } else if (form.grantName == "[FD4] Support for Participation in Local Conferences"){
                    doc.addImage(form4image, 'JPEG', 0, 0, 612, 1008)
                    // doc.text(155,117, form.firstName +" " +form.lastName)
                    // doc.text(93,131, form.department)
                    // doc.text(318,131, form.rank)
                    // doc.text(134,150, form.nameOfConference)
                    // doc.text(127,167, form.dateOfConference)
                    //to be continued
                } else if (form.grantName == "[FD15] Support for Local Trainings, Seminars and Workshops"){
                    doc.addImage(form15image, 'JPEG', 0, 0, 612, 1008)
                } else if (form.grantName == "[FD16] Support for Membership in Professional Organizations"){
                    doc.addImage(form16image, 'JPEG', 0, 0, 612, 1008)
                }
                doc.save('test.pdf')
            } 
        }
    })
})
  