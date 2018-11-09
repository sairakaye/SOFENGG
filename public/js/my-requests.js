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
                doc.addFont('TimesMS', 'Times', 'normal');
                doc.setFont('Times');
                doc.setFontSize(10);

                if (form.grantName == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal"){
                    doc.addImage(form1image, 'JPEG', 0, 0, 612, 1008)
                } else if (form.grantName == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences"){
                    doc.addImage(form2image, 'JPEG', 0, 0, 612, 1008)
                } else if (form.grantName ==  "[FD3] Support for Paper Presentations in Conferences"){
                    doc.addImage(form3image, 'JPEG', 0, 0, 612, 1008)
                } else if (form.grantName == "[FD4] Support for Participation in Local Conferences"){
                    doc.addImage(form4image, 'JPEG', 0, 0, 612, 1008)

                    doc.text(250, 85, form.term)
                    doc.text(250, 528, form.term)
                    doc.text(308, 85, form.startAY+"")
                    doc.text(308, 527, form.startAY+ "")
                    doc.text(340, 85, form.endAY +"")
                    doc.text(340, 527, form.endAY +"")
                    doc.text(155,117, form.firstName +" " +form.lastName)
                    doc.text(155,564, form.firstName +" " +form.lastName)
                    doc.text(93,131, form.department)
                    doc.text(93,580, form.department)
                    doc.text(318,131, form.rank)
                    doc.text(318,579, form.rank)
                    doc.text(134,150, form.nameOfConference)
                    doc.text(134,599, form.nameOfConference)
                    doc.text(127,167, moment(form.dateOfConference).format('LL'))
                    doc.text(127,615, moment(form.dateOfConference).format('LL'))
                    doc.text(367, 168, form.placeAndVenue)
                    doc.text(367, 614, form.placeAndVenue)
                    doc.text(128, 182, moment(form.dateOfDeparture).format('LL'))
                    doc.text(128, 630, moment(form.dateOfDeparture).format('LL'))
                    doc.text(370, 182, moment(form.dateOfReturn).format('LL'))
                    doc.text(370, 630, moment(form.dateOfReturn).format('LL'))
                    doc.text(179, 197, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(179, 646, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(191, 215, form.participantFee)
                    doc.text(191, 661, form.participantFee)
                    doc.text(270, 230, form.noOfLocalConferencesAttendedThisYear + "")
                    doc.text(270, 678, form.noOfLocalConferencesAttendedThisYear + "")
                    doc.text(476, 230, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(476, 680, moment(form.dateIncentiveLastAvailed).format('LL'))

                    doc.save('[FORM4] FacultyDevelopmentGrant.pdf')
                } else if (form.grantName == "[FD15] Support for Local Trainings, Seminars and Workshops"){
                    doc.addImage(form15image, 'JPEG', 0, 0, 612, 1008)
                } else if (form.grantName == "[FD16] Support for Membership in Professional Organizations"){
                    doc.addImage(form16image, 'JPEG', 0, 0, 612, 1008)
                }
            } 
        }
    })
})
  