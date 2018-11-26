/**
 * This is the JS file of the my requests page.
 * November 19, 2018
 * @ver 1.2
 * @author Candace Mercado
 */

$(document).ready(function() {
    $('#example').DataTable();
    $('.ui.dropdown').dropdown({forceSelection: false});
} );

$(".item.saveform").click(function () { 
    var id = $(this).attr("data-id")

    $.ajax({ 
        method : "get",
        url : "saveform",
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
                    
                    doc.text(244,83, form.term + "")
                    doc.text(244,571, form.term + "")
                    doc.text(304,83, form.startAY + "")
                    doc.text(304,571, form.startAY + "")
                    doc.text(338,83, form.endAY + "")
                    doc.text(338,571, form.endAY + "")
                    doc.text(135,100, form.firstName +" " +form.lastName)
                    doc.text(136,588, form.firstName +" " +form.lastName)
                    doc.text(401,100, form.department + "")
                    doc.text(401,588, form.department + "")
                    doc.text(80,117, moment(form.dateHired).format('LL')+ "")
                    doc.text(85,606, moment(form.dateHired).format('LL') + "")
                    doc.text(231,117, form.rank + "")
                    doc.text(234,605, form.rank + "")
                    doc.text(258,134, form.aveTeachingPerformance + "")
                    doc.text(258,622, form.aveTeachingPerformance + "")
                    doc.text(133,147, form.titleOfPaperOrPublication + "")
                    doc.text(133,635, form.titleOfPaperOrPublication + "")
                    doc.text(191,165, form.titleOfJournal + "")
                    doc.text(191,653, form.titleOfJournal + "")
                    doc.text(191,179, moment(form.datePaperSubmitted).format('LL') + "")
                    doc.text(191,667, moment(form.datePaperSubmitted).format('LL') + "")
                    doc.text(187,193, moment(form.datePaperAccepted).format('LL') + "")
                    doc.text(187,681, moment(form.datePaperAccepted).format('LL') + "")
                    doc.text(115,210, form.nameOfConference + "")
                    doc.text(115,698, form.nameOfConference + "")
                    doc.text(145,223, form.titleOfPaperToBePresented + "")
                    doc.text(145,711, form.titleOfPaperToBePresented + "")
                    doc.text(113,238, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(113,726, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(110,255, moment(form.dateOfDeparture).format('LL') + "")
                    doc.text(110,743, moment(form.dateOfDeparture).format('LL') + "")
                    doc.text(350,238, form.placeAndVenue + "")
                    doc.text(350,726, form.placeAndVenue + "")
                    doc.text(350,255, moment(form.dateOfReturn).format('LL') + "")
                    doc.text(350,743, moment(form.dateOfReturn).format('LL') + "")
                    doc.text(155,270, moment(form.dateOfReturnToWork).format('LL') + "")
                    doc.text(155,758, moment(form.dateOfReturnToWork).format('LL') + "")
                    doc.text(165,290, moment(form.dateIncentiveLastAvailed).format('LL') + "")
                    doc.text(165,778, moment(form.dateIncentiveLastAvailed).format('LL') + "")    
                    
                    if (form.status == "Permanent"){
                        doc.rect(385, 112, 8, 6, 'F')
                        doc.rect(386, 602, 8, 6, 'F')
                    } else {
                        doc.rect(464,113, 8, 6, 'F')
                        doc.rect(464,602, 8, 6, 'F')
                    }
                    
                    doc.save('[F1] FacultyDevelopmentGrant.pdf')
                    
                } else if (form.grantName == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences"){
                    doc.addImage(form2image, 'JPEG', 0, 0, 612, 1008)
                    doc.text(244,118, form.term + "")
                    doc.text(245,596, form.term + "")
                    doc.text(306,118, form.startAY + "")
                    doc.text(304,596, form.startAY + "")
                    doc.text(338,118, form.endAY + "")
                    doc.text(338,596, form.endAY + "")
                    doc.text(130,136, form.firstName +" " +form.lastName)
                    doc.text(130,623, form.firstName +" " +form.lastName)
                    doc.text(400,136, form.department + "")
                    doc.text(400,623, form.department + "")
                    doc.text(85,152, moment(form.dateHired).format('LL'))
                    doc.text(85,639, moment(form.dateHired).format('LL'))
                    doc.text(232,152, form.rank)
                    doc.text(232,639, form.rank)
                    doc.text(257,168, form.aveTeachingPerformance+"")
                    doc.text(262,655, form.aveTeachingPerformance+"")
                    doc.text(120,181, form.nameOfConference)
                    doc.text(120,668, form.nameOfConference)
                    doc.text(147,197, form.titleOfPaperToBePresented)
                    doc.text(147,684, form.titleOfPaperToBePresented)
                    doc.text(113,213, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(113,700, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(349,213, form.placeAndVenue)
                    doc.text(349,700, form.placeAndVenue)
                    doc.text(110,229, moment(form.dateOfDeparture).format('LL'))
                    doc.text(110,716, moment(form.dateOfDeparture).format('LL'))
                    doc.text(348,229, moment(form.dateOfReturn).format('LL'))
                    doc.text(348,715, moment(form.dateOfReturn).format('LL'))
                    doc.text(156,244, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(156,731, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(164,260, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(164,747, moment(form.dateIncentiveLastAvailed).format('LL'))
                    
                    if (form.status == "Permanent"){
                        doc.rect(386,148, 8, 6, 'F') 
                        doc.rect(386,634, 8, 6, 'F') 
                    } else {
                        doc.rect(465,148, 8, 6, 'F') 
                        doc.rect(465,634, 8, 6, 'F') 
                    }
                    
                    doc.save('[F2] FacultyDevelopmentGrant.pdf')
                } else if (form.grantName ==  "[FD3] Support for Paper Presentations in Conferences"){
                    doc.addImage(form3image, 'JPEG', 0, 0, 612, 1008)

                    doc.text(245, 94, form.term)
                    doc.text(245, 580, form.term)
                    doc.text(304, 94, form.startAY+"")
                    doc.text(304, 580, form.startAY+ "")
                    doc.text(338, 94, form.endAY +"")
                    doc.text(338, 580, form.endAY +"")
                    doc.text(135,127, form.firstName +" " +form.lastName)
                    doc.text(135,611, form.firstName +" " +form.lastName)
                    doc.text(407,126, form.department)
                    doc.text(407,611, form.department)
                    doc.text(67,145, form.rank)
                    doc.text(67,629, form.rank)
                    doc.text(121,164, form.nameOfConference)
                    doc.text(121,649, form.nameOfConference)
                    doc.text(150,177, form.titleOfPaperToBePresented)
                    doc.text(150,663, form.titleOfPaperToBePresented)
                    doc.text(118,195, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(118,678, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(115,210, moment(form.dateOfDeparture).format('LL'))
                    doc.text(115,695, moment(form.dateOfDeparture).format('LL'))
                    doc.text(355,195, form.placeAndVenue)
                    doc.text(355,680, form.placeAndVenue)
                    doc.text(355,209, moment(form.dateOfReturn).format('LL'))
                    doc.text(355,694, moment(form.dateOfReturn).format('LL'))
                    doc.text(167,225, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(167,711, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(205, 242, form.travelAndConferenceSubsidy+"")
                    doc.text(205, 727, form.travelAndConferenceSubsidy+"")
                    doc.text(180,259, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(180,744, moment(form.dateIncentiveLastAvailed).format('LL'))

                    if (form.status == "Full-time"){
                        doc.rect(262,142, 8, 6, 'F') 
                        doc.rect(258,628, 8, 6, 'F') 
                    } else {
                        doc.rect(328,142, 8, 6, 'F') 
                        doc.rect(324,627,  8, 6, 'F') 
                        doc.text(486,146, form.noOfUnitsTaught+"")
                        doc.text(484,630, form.noOfUnitsTaught+"")
                    } 

                    if (form.typeOfConference == "Local"){
                        doc.rect(458,160, 8, 6, 'F') 
                        doc.rect(456,646, 8, 6, 'F') 
                    } else {                        
                        doc.rect(505,160, 8, 6, 'F') 
                        doc.rect(503,646, 8, 6, 'F') 
                    } 

                    doc.save('[F3] FacultyDevelopmentGrant.pdf')
                } else if (form.grantName == "[FD4] Support for Participation in Local Conferences"){
                    doc.addImage(form4image, 'JPEG', 0, 0, 612, 1008)

                    doc.text(248, 85, form.term)
                    doc.text(248, 528, form.term)
                    doc.text(307, 85, form.startAY+"")
                    doc.text(307, 527, form.startAY+ "")
                    doc.text(340, 85, form.endAY +"")
                    doc.text(340, 527, form.endAY +"")
                    doc.text(145,117, form.firstName +" " +form.lastName)
                    doc.text(145,564, form.firstName +" " +form.lastName)
                    doc.text(90,131, form.department)
                    doc.text(90,580, form.department)
                    doc.text(313,131, form.rank)
                    doc.text(313,579, form.rank)
                    doc.text(130,150, form.nameOfConference)
                    doc.text(130,599, form.nameOfConference)
                    doc.text(122,167, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(122,615, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(357, 168, form.placeAndVenue)
                    doc.text(357, 614, form.placeAndVenue)
                    doc.text(118, 182, moment(form.dateOfDeparture).format('LL'))
                    doc.text(118, 630, moment(form.dateOfDeparture).format('LL'))
                    doc.text(360, 182, moment(form.dateOfReturn).format('LL'))
                    doc.text(360, 630, moment(form.dateOfReturn).format('LL'))
                    doc.text(169, 197, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(169, 646, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(181, 215, form.participantFee)
                    doc.text(181, 661, form.participantFee)
                    doc.text(260, 230, form.noOfLocalConferencesAttendedThisYear + "")
                    doc.text(260, 678, form.noOfLocalConferencesAttendedThisYear + "")
                    doc.text(466, 230, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(466, 680, moment(form.dateIncentiveLastAvailed).format('LL'))

                    doc.save('[F4] FacultyDevelopmentGrant.pdf')
                } else if (form.grantName == "[FD15] Support for Local Trainings, Seminars and Workshops"){
                    doc.addImage(form15image, 'JPEG', 0, 0, 612, 1008)

                    doc.text(250, 90, form.term)
                    doc.text(250, 542, form.term)
                    doc.text(308, 90, form.startAY+"")
                    doc.text(308, 542, form.startAY+ "")
                    doc.text(340, 90, form.endAY +"")
                    doc.text(340, 542, form.endAY +"")
                    doc.text(145,113, form.firstName +" " +form.lastName)
                    doc.text(145,565, form.firstName +" " +form.lastName)
                    doc.text(88,130, form.department)
                    doc.text(88,583, form.department)
                    doc.text(308,130, form.rank)
                    doc.text(308,582, form.rank)
                    doc.text(166,148, form.hostInstitution)
                    doc.text(166,601, form.hostInstitution)
                    doc.text(110,166, form.titleOfSeminar)
                    doc.text(110,619, form.titleOfSeminar)
                    doc.text(80,183, form.place)
                    doc.text(80,635, form.place)
                    doc.text(115,200, moment(form.startTime).format('LL'))
                    doc.text(115,653, moment(form.startTime).format('LL'))
                    doc.text(330,200, moment(form.endTime).format('LL'))
                    doc.text(330,653, moment(form.endTime).format('LL'))
                    doc.text(174,216, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(174,668, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(190,235, form.participantFee)
                    doc.text(190,688, form.participantFee)
                    
                    doc.save('[F15] FacultyDevelopmentGrant.pdf')
                } else if (form.grantName == "[FD16] Support for Membership in Professional Organizations"){
                    doc.addImage(form16image, 'JPEG', 0, 0, 612, 1008)

                    doc.text(245, 93, form.term)
                    doc.text(245, 566, form.term)
                    doc.text(308, 93, form.startAY+"")
                    doc.text(308, 566, form.startAY+ "")
                    doc.text(340, 93, form.endAY +"")
                    doc.text(340, 566, form.endAY +"")
                    doc.text(140,113, form.firstName +" " +form.lastName)
                    doc.text(140,586, form.firstName +" " +form.lastName)
                    doc.text(93,130, form.department)
                    doc.text(93,603, form.department)
                    doc.text(310,132, form.rank)
                    doc.text(310,605, form.rank)
                    doc.text(135,167, form.nameOfOrganization)
                    doc.text(135,638, form.nameOfOrganization)
                    doc.text(120,214, moment(form.membershipDate).format('LL'))
                    doc.text(131,687, moment(form.membershipDate).format('LL'))                    
                    doc.text(135,232, form.membershipFee+"")              
                    doc.text(135,705, form.membershipFee+"")
                    doc.text(343,214, form.coverage)
                    doc.text(354,686, form.coverage)
                    doc.text(373,231, form.checkPayableTo)
                    doc.text(386,705, form.checkPayableTo) 

                    if (form.typeOfMembershipPlace == "Local"){
                        doc.rect(150,179, 8, 6, 'F') 
                        doc.rect(165,652, 8, 6, 'F') 
                    } else {
                        doc.rect(234,179, 8, 6, 'F') 
                        doc.rect(248,652, 8, 6, 'F') 
                    } 
                    if (form.typeofMembershipDuration == "Annual"){
                        doc.rect(422,179,8, 6, 'F') 
                        doc.rect(437,652, 8, 6, 'F') 
                    } else {
                        doc.rect(488,179, 8, 6, 'F') 
                        doc.rect(502,652, 8, 6, 'F') 
                    }
                    if (form.status == "Permanent"){
                        doc.rect(70,145, 8, 6, 'F') 
                        doc.rect(85,618, 8, 6, 'F') 
                    } else {
                        doc.rect(149,145, 8, 6, 'F') 
                        doc.rect(164,618, 8, 6, 'F') 
                    }
                    doc.save('[F16] FacultyDevelopmentGrant.pdf')
                }
            } 
        }
    })
})

$(".item.printform").click(function () { 
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
                    
                    doc.text(244,83, form.term + "")
                    doc.text(244,571, form.term + "")
                    doc.text(304,83, form.startAY + "")
                    doc.text(304,571, form.startAY + "")
                    doc.text(338,83, form.endAY + "")
                    doc.text(338,571, form.endAY + "")
                    doc.text(135,100, form.firstName +" " +form.lastName)
                    doc.text(136,588, form.firstName +" " +form.lastName)
                    doc.text(401,100, form.department + "")
                    doc.text(401,588, form.department + "")
                    doc.text(80,117, moment(form.dateHired).format('LL')+ "")
                    doc.text(85,606, moment(form.dateHired).format('LL') + "")
                    doc.text(231,117, form.rank + "")
                    doc.text(234,605, form.rank + "")
                    doc.text(258,134, form.aveTeachingPerformance + "")
                    doc.text(258,622, form.aveTeachingPerformance + "")
                    doc.text(133,147, form.titleOfPaperOrPublication + "")
                    doc.text(133,635, form.titleOfPaperOrPublication + "")
                    doc.text(191,165, form.titleOfJournal + "")
                    doc.text(191,653, form.titleOfJournal + "")
                    doc.text(191,179, moment(form.datePaperSubmitted).format('LL') + "")
                    doc.text(191,667, moment(form.datePaperSubmitted).format('LL') + "")
                    doc.text(187,193, moment(form.datePaperAccepted).format('LL') + "")
                    doc.text(187,681, moment(form.datePaperAccepted).format('LL') + "")
                    doc.text(115,210, form.nameOfConference + "")
                    doc.text(115,698, form.nameOfConference + "")
                    doc.text(145,223, form.titleOfPaperToBePresented + "")
                    doc.text(145,711, form.titleOfPaperToBePresented + "")
                    doc.text(113,238, moment(form.dateOfStartConference).format('LL')  + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(113,726, moment(form.dateOfStartConference).format('LL')  + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(110,255, moment(form.dateOfDeparture).format('LL') + "")
                    doc.text(110,743, moment(form.dateOfDeparture).format('LL') + "")
                    doc.text(350,238, form.placeAndVenue + "")
                    doc.text(350,726, form.placeAndVenue + "")
                    doc.text(350,255, moment(form.dateOfReturn).format('LL') + "")
                    doc.text(350,743, moment(form.dateOfReturn).format('LL') + "")
                    doc.text(155,270, moment(form.dateOfReturnToWork).format('LL') + "")
                    doc.text(155,758, moment(form.dateOfReturnToWork).format('LL') + "")
                    doc.text(165,290, moment(form.dateIncentiveLastAvailed).format('LL') + "")
                    doc.text(165,778, moment(form.dateIncentiveLastAvailed).format('LL') + "")    
                    
                    if (form.status == "Permanent"){
                        doc.rect(385, 112, 8, 6, 'F')
                        doc.rect(386, 602, 8, 6, 'F')
                    } else {
                        doc.rect(464,113, 8, 6, 'F')
                        doc.rect(464,602, 8, 6, 'F')
                    }
                } else if (form.grantName == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences"){
                    doc.addImage(form2image, 'JPEG', 0, 0, 612, 1008)
                    doc.text(244,118, form.term + "")
                    doc.text(245,596, form.term + "")
                    doc.text(306,118, form.startAY + "")
                    doc.text(304,596, form.startAY + "")
                    doc.text(338,118, form.endAY + "")
                    doc.text(338,596, form.endAY + "")
                    doc.text(130,136, form.firstName +" " +form.lastName)
                    doc.text(130,623, form.firstName +" " +form.lastName)
                    doc.text(400,136, form.department + "")
                    doc.text(400,623, form.department + "")
                    doc.text(85,152, moment(form.dateHired).format('LL'))
                    doc.text(85,639, moment(form.dateHired).format('LL'))
                    doc.text(232,152, form.rank)
                    doc.text(232,639, form.rank)
                    doc.text(257,168, form.aveTeachingPerformance+"")
                    doc.text(262,655, form.aveTeachingPerformance+"")
                    doc.text(120,181, form.nameOfConference)
                    doc.text(120,668, form.nameOfConference)
                    doc.text(147,197, form.titleOfPaperToBePresented)
                    doc.text(147,684, form.titleOfPaperToBePresented)
                    doc.text(113,213, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(113,700, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(349,213, form.placeAndVenue)
                    doc.text(349,700, form.placeAndVenue)
                    doc.text(110,229, moment(form.dateOfDeparture).format('LL'))
                    doc.text(110,716, moment(form.dateOfDeparture).format('LL'))
                    doc.text(348,229, moment(form.dateOfReturn).format('LL'))
                    doc.text(348,715, moment(form.dateOfReturn).format('LL'))
                    doc.text(156,244, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(156,731, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(164,260, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(164,747, moment(form.dateIncentiveLastAvailed).format('LL'))
                    
                    if (form.status == "Permanent"){
                        doc.rect(386,148, 8, 6, 'F') 
                        doc.rect(386,634, 8, 6, 'F') 
                    } else {
                        doc.rect(465,148, 8, 6, 'F') 
                        doc.rect(465,634, 8, 6, 'F') 
                    }
                } else if (form.grantName ==  "[FD3] Support for Paper Presentations in Conferences"){
                    doc.addImage(form3image, 'JPEG', 0, 0, 612, 1008)

                    doc.text(245, 94, form.term)
                    doc.text(245, 580, form.term)
                    doc.text(304, 94, form.startAY+"")
                    doc.text(304, 580, form.startAY+ "")
                    doc.text(338, 94, form.endAY +"")
                    doc.text(338, 580, form.endAY +"")
                    doc.text(135,127, form.firstName +" " +form.lastName)
                    doc.text(135,611, form.firstName +" " +form.lastName)
                    doc.text(407,126, form.department)
                    doc.text(407,611, form.department)
                    doc.text(67,145, form.rank)
                    doc.text(67,629, form.rank)
                    doc.text(121,164, form.nameOfConference)
                    doc.text(121,649, form.nameOfConference)
                    doc.text(150,177, form.titleOfPaperToBePresented)
                    doc.text(150,663, form.titleOfPaperToBePresented)
                    doc.text(118,195, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(118,678, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(115,210, moment(form.dateOfDeparture).format('LL'))
                    doc.text(115,695, moment(form.dateOfDeparture).format('LL'))
                    doc.text(355,195, form.placeAndVenue)
                    doc.text(355,680, form.placeAndVenue)
                    doc.text(355,209, moment(form.dateOfReturn).format('LL'))
                    doc.text(355,694, moment(form.dateOfReturn).format('LL'))
                    doc.text(167,225, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(167,711, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(205, 242, form.travelAndConferenceSubsidy+"")
                    doc.text(205, 727, form.travelAndConferenceSubsidy+"")
                    doc.text(180,259, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(180,744, moment(form.dateIncentiveLastAvailed).format('LL'))

                    if (form.status == "Full-time"){
                        doc.rect(262,142, 8, 6, 'F') 
                        doc.rect(258,628, 8, 6, 'F') 
                    } else {
                        doc.rect(328,142, 8, 6, 'F') 
                        doc.rect(324,627,  8, 6, 'F') 
                        doc.text(486,146, form.noOfUnitsTaught+"")
                        doc.text(484,630, form.noOfUnitsTaught+"")
                    } 

                    if (form.typeOfConference == "Local"){
                        doc.rect(458,160, 8, 6, 'F') 
                        doc.rect(456,646, 8, 6, 'F') 
                    } else {                        
                        doc.rect(505,160, 8, 6, 'F') 
                        doc.rect(503,646, 8, 6, 'F') 
                    } 
                } else if (form.grantName == "[FD4] Support for Participation in Local Conferences"){
                    doc.addImage(form4image, 'JPEG', 0, 0, 612, 1008)

                    doc.text(248, 85, form.term)
                    doc.text(248, 528, form.term)
                    doc.text(307, 85, form.startAY+"")
                    doc.text(307, 527, form.startAY+ "")
                    doc.text(340, 85, form.endAY +"")
                    doc.text(340, 527, form.endAY +"")
                    doc.text(145,117, form.firstName +" " +form.lastName)
                    doc.text(145,564, form.firstName +" " +form.lastName)
                    doc.text(90,131, form.department)
                    doc.text(90,580, form.department)
                    doc.text(313,131, form.rank)
                    doc.text(313,579, form.rank)
                    doc.text(130,150, form.nameOfConference)
                    doc.text(130,599, form.nameOfConference)
                    doc.text(122,167, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(122,615, moment(form.dateOfStartConference).format('LL') + "-" +moment(form.dateOfEndConference).format('LL'))
                    doc.text(357, 168, form.placeAndVenue)
                    doc.text(357, 614, form.placeAndVenue)
                    doc.text(118, 182, moment(form.dateOfDeparture).format('LL'))
                    doc.text(118, 630, moment(form.dateOfDeparture).format('LL'))
                    doc.text(360, 182, moment(form.dateOfReturn).format('LL'))
                    doc.text(360, 630, moment(form.dateOfReturn).format('LL'))
                    doc.text(169, 197, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(169, 646, moment(form.dateOfReturnToWork).format('LL'))
                    doc.text(181, 215, form.participantFee)
                    doc.text(181, 661, form.participantFee)
                    doc.text(260, 230, form.noOfLocalConferencesAttendedThisYear + "")
                    doc.text(260, 678, form.noOfLocalConferencesAttendedThisYear + "")
                    doc.text(466, 230, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(466, 680, moment(form.dateIncentiveLastAvailed).format('LL'))

                } else if (form.grantName == "[FD15] Support for Local Trainings, Seminars and Workshops"){
                    doc.addImage(form15image, 'JPEG', 0, 0, 612, 1008)

                    doc.text(250, 90, form.term)
                    doc.text(250, 542, form.term)
                    doc.text(308, 90, form.startAY+"")
                    doc.text(308, 542, form.startAY+ "")
                    doc.text(340, 90, form.endAY +"")
                    doc.text(340, 542, form.endAY +"")
                    doc.text(145,113, form.firstName +" " +form.lastName)
                    doc.text(145,565, form.firstName +" " +form.lastName)
                    doc.text(88,130, form.department)
                    doc.text(88,583, form.department)
                    doc.text(308,130, form.rank)
                    doc.text(308,582, form.rank)
                    doc.text(166,148, form.hostInstitution)
                    doc.text(166,601, form.hostInstitution)
                    doc.text(110,166, form.titleOfSeminar)
                    doc.text(110,619, form.titleOfSeminar)
                    doc.text(80,183, form.place)
                    doc.text(80,635, form.place)
                    doc.text(115,200, moment(form.startTime).format('LL'))
                    doc.text(115,653, moment(form.startTime).format('LL'))
                    doc.text(330,200, moment(form.endTime).format('LL'))
                    doc.text(330,653, moment(form.endTime).format('LL'))
                    doc.text(174,216, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(174,668, moment(form.dateIncentiveLastAvailed).format('LL'))
                    doc.text(190,235, form.participantFee)
                    doc.text(190,688, form.participantFee)
                    
                } else if (form.grantName == "[FD16] Support for Membership in Professional Organizations"){
                    doc.addImage(form16image, 'JPEG', 0, 0, 612, 1008)

                    doc.text(245, 93, form.term)
                    doc.text(245, 566, form.term)
                    doc.text(308, 93, form.startAY+"")
                    doc.text(308, 566, form.startAY+ "")
                    doc.text(340, 93, form.endAY +"")
                    doc.text(340, 566, form.endAY +"")
                    doc.text(140,113, form.firstName +" " +form.lastName)
                    doc.text(140,586, form.firstName +" " +form.lastName)
                    doc.text(93,130, form.department)
                    doc.text(93,603, form.department)
                    doc.text(310,132, form.rank)
                    doc.text(310,605, form.rank)
                    doc.text(135,167, form.nameOfOrganization)
                    doc.text(135,638, form.nameOfOrganization)
                    doc.text(120,214, moment(form.membershipDate).format('LL'))
                    doc.text(131,687, moment(form.membershipDate).format('LL'))                    
                    doc.text(135,232, form.membershipFee+"")              
                    doc.text(135,705, form.membershipFee+"")
                    doc.text(343,214, form.coverage)
                    doc.text(354,686, form.coverage)
                    doc.text(373,231, form.checkPayableTo)
                    doc.text(386,705, form.checkPayableTo) 

                    if (form.typeOfMembershipPlace == "Local"){
                        doc.rect(150,179, 8, 6, 'F') 
                        doc.rect(165,652, 8, 6, 'F') 
                    } else {
                        doc.rect(234,179, 8, 6, 'F') 
                        doc.rect(248,652, 8, 6, 'F') 
                    } 
                    if (form.typeofMembershipDuration == "Annual"){
                        doc.rect(422,179,8, 6, 'F') 
                        doc.rect(437,652, 8, 6, 'F') 
                    } else {
                        doc.rect(488,179, 8, 6, 'F') 
                        doc.rect(502,652, 8, 6, 'F') 
                    }
                    if (form.status == "Permanent"){
                        doc.rect(70,145, 8, 6, 'F') 
                        doc.rect(85,618, 8, 6, 'F') 
                    } else {
                        doc.rect(149,145, 8, 6, 'F') 
                        doc.rect(164,618, 8, 6, 'F') 
                    }
                }
                doc.autoPrint()
                window.open(doc.output('bloburl'), '_blank');
            } 
        }
    })
})




  