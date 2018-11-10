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

                    doc.text(250, 94, form.term)
                    doc.text(250, 580, form.term)
                    doc.text(308, 94, form.startAY+"")
                    doc.text(308, 580, form.startAY+ "")
                    doc.text(340, 94, form.endAY +"")
                    doc.text(340, 580, form.endAY +"")
                    doc.text(155,127, form.firstName +" " +form.lastName)
                    doc.text(155,611, form.firstName +" " +form.lastName)
                    doc.text(415,126, form.department)
                    doc.text(415,611, form.department)
                    doc.text(75,145, form.rank)
                    doc.text(75,629, form.rank)
                    doc.text(126,164, form.nameOfConference)
                    doc.text(126,649, form.nameOfConference)
                    doc.text(155,177, form.titleOfPaperToBePresented)
                    doc.text(155,663, form.titleOfPaperToBePresented)
                    doc.text(123,195, moment(form.dateOfConference).format('LL'))
                    doc.text(120,678, moment(form.dateOfConference).format('LL'))
                    doc.text(120,210, moment(form.dateOfDeparture).format('LL'))
                    doc.text(120,695, moment(form.dateOfDeparture).format('LL'))
                    doc.text(360,195, form.placeAndVenue)
                    doc.text(360,680, form.placeAndVenue)
                    doc.text(360,209, moment(form.dateOfReturn).format('LL'))
                    doc.text(360,694, moment(form.dateOfReturn).format('LL'))
                    doc.text(172,225, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(172,711, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(210, 242, form.travelAndConferenceSubsidy+"")
                    doc.text(210, 727, form.travelAndConferenceSubsidy+"")
                    doc.text(185,259, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(185,744, moment(form.dateIncentiveLastAvailed).format('LL'))

                    if (form.status == "Full-time"){
                        doc.text(265,148, "/") 
                        doc.text(260,633, "/") 
                    } else {
                        doc.text(330,148, "/")
                        doc.text(326,633, "/")
                        doc.text(486,146, form.noOfUnitsTaught+"")
                        doc.text(484,630, form.noOfUnitsTaught+"")
                    } 

                    if (form.typeOfConference == "Local"){
                        doc.text(460,167, "/") 
                        doc.text(458,652, "/") 
                    } else {
                        doc.text(507,167, "/")
                        doc.text(505,652, "/")
                    } 

                    doc.save('[F3] FacultyDevelopmentGrant.pdf')
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

                    doc.save('[F4] FacultyDevelopmentGrant.pdf')
                } else if (form.grantName == "[FD15] Support for Local Trainings, Seminars and Workshops"){
                    doc.addImage(form15image, 'JPEG', 0, 0, 612, 1008)

                    doc.text(250, 90, form.term)
                    doc.text(250, 542, form.term)
                    doc.text(308, 90, form.startAY+"")
                    doc.text(308, 542, form.startAY+ "")
                    doc.text(340, 90, form.endAY +"")
                    doc.text(340, 542, form.endAY +"")
                    doc.text(155,113, form.firstName +" " +form.lastName)
                    doc.text(155,565, form.firstName +" " +form.lastName)
                    doc.text(93,130, form.department)
                    doc.text(93,583, form.department)
                    doc.text(318,130, form.rank)
                    doc.text(318,582, form.rank)
                    doc.text(171,148, form.hostInstitution)
                    doc.text(171,601, form.hostInstitution)
                    doc.text(115,166, form.titleOfSeminar)
                    doc.text(115,619, form.titleOfSeminar)
                    doc.text(90,183, form.place)
                    doc.text(90,635, form.place)
                    doc.text(125,200, moment(form.startTime).format('LL'))
                    doc.text(125,653, moment(form.startTime).format('LL'))
                    doc.text(340,200, moment(form.endTime).format('LL'))
                    doc.text(340,653, moment(form.endTime).format('LL'))
                    doc.text(184,216, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(184,668, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(200,235, form.participantFee)
                    doc.text(200,688, form.participantFee)
                    
                    doc.save('[F15] FacultyDevelopmentGrant.pdf')
                } else if (form.grantName == "[FD16] Support for Membership in Professional Organizations"){
                    doc.addImage(form16image, 'JPEG', 0, 0, 612, 1008)

                    doc.text(250, 93, form.term)
                    doc.text(250, 566, form.term)
                    doc.text(308, 93, form.startAY+"")
                    doc.text(308, 566, form.startAY+ "")
                    doc.text(340, 93, form.endAY +"")
                    doc.text(340, 566, form.endAY +"")
                    doc.text(155,113, form.firstName +" " +form.lastName)
                    doc.text(155,586, form.firstName +" " +form.lastName)
                    doc.text(93,130, form.department)
                    doc.text(93,603, form.department)
                    doc.text(318,132, form.rank)
                    doc.text(318,605, form.rank)
                    doc.text(140,167, form.nameOfOrganization)
                    doc.text(140,638, form.nameOfOrganization)
                    doc.text(125,214, moment(form.membershipDate).format('LL'))
                    doc.text(136,687, moment(form.membershipDate).format('LL'))                    
                    doc.text(136,232, form.membershipFee+"")              
                    doc.text(136,705, form.membershipFee+"")
                    doc.text(348,214, form.coverage)
                    doc.text(359,686, form.coverage)
                    doc.text(378,231, form.checkPayableTo)
                    doc.text(391,705, form.checkPayableTo) 

                    if (form.typeOfMembershipPlace == "Local"){
                        doc.text(152,185, "/") 
                        doc.text(168,658, "/") 
                    } else {
                        doc.text(237,185, "/")
                        doc.text(252,659, "/")
                    } 
                    if (form.typeofMembershipDuration == "Annual"){
                        doc.text(424,185, "/") 
                        doc.text(439,659, "/") 
                    } else {
                        doc.text(490,185, "/")
                        doc.text(504,658, "/")
                    }
                    doc.save('[F16] FacultyDevelopmentGrant.pdf')
                }
            } 
        }
    })
})
  