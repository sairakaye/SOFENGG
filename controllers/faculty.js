/**
 * This controller is for the faculty users of the
 * web application
 * October 17, 2018
 * @ver 1.0
 * @author Sai Manalili
 */

/**
 * Module dependencies.
 */
const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const urlencoder = bodyparser.urlencoded({
  extended : true
})
const router = express.Router()
router.use(urlencoder)
const app = express()

const User = require("../models/user")
const fdOne = require("../models/fdOne")
const fdTwo = require("../models/fdTwo")
const fdThree = require("../models/fdThree")
const fdFour = require("../models/fdFour")
const fdFifteen = require("../models/fdFifteen")
const fdSixteen = require("../models/fdSixteen")
const controllerUser = require("./index")

var forms
/**
 * Leads to the page for requesting grants. 
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/request-grant", function(req, res){
  console.log("GET /request-grant")
  
	var user = controllerUser.getCurrentUser() 
	res.render("request-grant.hbs", {
		user
	})
})

/**
 * Leads to the page of FD1 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-1", function(req, res){
	console.log("GET /fd-1")
	var user = controllerUser.getCurrentUser()
	res.render("form1", {
		  user
	})
})

/**
 * Adds to the database the entered information for FD1
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd1", urlencoder, function(req,res) {
  console.log("POST /submit")
  
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var department = req.body.department
  var rank = req.body.rank
  var dateHired = req.body.dateHired
  var status = req.body.status
  var aveTeachingPerformance = req.body.aveTeachingPerformance
  var titleOfPaperOrPublication = req.body.titleOfPaperOrPublication
  var titleOfJournal = req.body.titleOfJournal
  var datePaperSubmitted = req.body.datePaperSubmitted
  var datePaperAccepted = req.body.datePaperAccepted
  var nameOfConference = req.body.nameOfConference
  var titleOfPaperToBePresented = req.body.titleOfPaperToBePresented
  var dateOfConference = req.body.dateOfConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  // Checkboxes
  var applicationLetter = req.body.applicationLetter
  var copyOfJournal = req.body.copyOfJournal
  var proofOfAcceptance = req.body.proofOfAcceptance
  var proofOfPaperAcceptance = req.body.proofOfPaperAcceptance
  var copyOfInvitation = req.body.copyOfInvitation
  var updatedFacultyWebpage = req.body.updatedFacultyWebpage
  var callForPapersOfConference = req.body.callForPapersOfConference

  if (applicationLetter != null)
    applicationLetter = true;
  else
    applicationLetter = false;

  if (copyOfJournal != null)
    copyOfJournal = true;
  else
    copyOfJournal = false;
  
  if (proofOfAcceptance != null)
    proofOfAcceptance = true;
  else
    proofOfAcceptance = false;

  if (proofOfPaperAcceptance != null)
    proofOfPaperAcceptance = true;
  else
    proofOfPaperAcceptance = false;

  if (copyOfInvitation != null)
    copyOfInvitation = true;
  else
    copyOfInvitation = false;

  if (updatedFacultyWebpage != null)
    updatedFacultyWebpage = true;
  else
    updatedFacultyWebpage = false;

  if (callForPapersOfConference != null)
    callForPapersOfConference = true;
  else
    callForPapersOfConference = false;
  
  var fdOneData = {
    grantName: "[FD1] Incentive for Publication in Pre-Selected High Impact Journal",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, titleOfPaperOrPublication, titleOfJournal,
    datePaperSubmitted, datePaperAccepted, nameOfConference, titleOfPaperToBePresented,
    dateOfConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, applicationLetter, copyOfJournal, proofOfAcceptance, proofOfPaperAcceptance,
    copyOfInvitation, updatedFacultyWebpage, callForPapersOfConference, grantStatus
  }

  fdOne.create(fdOneData).then((newFdOneData)=> {
      
      User.addFDOneInUser(newFdOneData).then((updatedUser)=>{
          var user = controllerUser.getCurrentUser()
          res.render("success.hbs", {
              user, formName : "[FD1] Incentive for Publication in Pre-Selected High Impact Journal"
          })
      }, (err)=>{
          res.send(err)
      })
      
  }, (err)=> {
      res.send(err)
  })
})

/**
 * Leads to the page of FD2 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-2", function(req, res){
	console.log("GET /fd-2")
	var user = controllerUser.getCurrentUser()
	res.render("form2", {
		  user
	})
})

/**
 * Adds to the database the entered information for the FD2
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd2", urlencoder, function(req,res) {
  console.log("POST /submit-fd2")
  
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var department = req.body.department
  var dateHired = req.body.dateHired
  var rank = req.body.rank
  var status = req.body.status
  var aveTeachingPerformance = req.body.aveTeachingPerformance
  var nameOfConference = req.body.nameOfConference
  var titleOfPaperToBePresented = req.body.titleOfPaperToBePresented
  var dateOfConference = req.body.dateOfConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  // Checkboxes
  var applicationLetter = req.body.applicationLetter
  var callForPapersOfConference = req.body.callForPapersOfConference
  var copyOfConferencePaper = req.body.copyOfConferencePaper
  var proofOfAcceptance = req.body.proofOfAcceptance
  var copyOfInvitation = req.body.copyOfInvitation
  var updatedFacultyWebpage = req.body.updatedFacultyWebpage

  if (applicationLetter != null)
    applicationLetter = true;
  else
    applicationLetter = false;

  if (copyOfConferencePaper != null)
    copyOfConferencePaper = true;
  else
    copyOfConferencePaper = false;
  
  if (proofOfAcceptance != null)
    proofOfAcceptance = true;
  else
    proofOfAcceptance = false;

  if (copyOfInvitation != null)
    copyOfInvitation = true;
  else
    copyOfInvitation = false;

  if (updatedFacultyWebpage != null)
    updatedFacultyWebpage = true;
  else
    updatedFacultyWebpage = false;

  if (callForPapersOfConference != null)
    callForPapersOfConference = true;
  else
    callForPapersOfConference = false;
  
  var fdTwoData = {
    grantName: "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, nameOfConference, titleOfPaperToBePresented,
    dateOfConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, applicationLetter, copyOfConferencePaper, proofOfAcceptance,
    copyOfInvitation, updatedFacultyWebpage, callForPapersOfConference, grantStatus
  }

  fdTwo.create(fdTwoData).then((newFdTwoData)=> {
      
      User.addFDTwoInUser(newFdTwoData).then((updatedUser)=>{
          var user = controllerUser.getCurrentUser()
          res.render("success.hbs", {
              user, formName : "Incentive for Publication in Pre-Selected High Impact Conferences"
          })
      }, (err)=>{
          res.send(err)
      })
      
  }, (err)=> {
      res.send(err)
  })
})

/**
 * Leads to the page of FD3 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-3", function(req, res){
	console.log("GET /fd-3")
	var user = controllerUser.getCurrentUser()
	res.render("form3", {
		  user
	})
})

/**
 * Adds to the database the entered information for FD3
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd3", urlencoder, function(req,res) {
  console.log("POST /submit-fd3")
  
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var department = req.body.department
  var rank = req.body.rank
  var dateHired = req.body.dateHired
  var status = req.body.status
  var aveTeachingPerformance = req.body.aveTeachingPerformance
  var titleOfPaperOrPublication = req.body.titleOfPaperOrPublication
  var titleOfJournal = req.body.titleOfJournal
  var datePaperSubmitted = req.body.datePaperSubmitted
  var datePaperAccepted = req.body.datePaperAccepted
  var nameOfConference = req.body.nameOfConference
  var titleOfPaperToBePresented = req.body.titleOfPaperToBePresented
  var dateOfConference = req.body.dateOfConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  // Checkboxes
  var applicationLetter = req.body.applicationLetter
  var copyOfJournal = req.body.copyOfJournal
  var proofOfAcceptance = req.body.proofOfAcceptance
  var proofOfPaperAcceptance = req.body.proofOfPaperAcceptance
  var copyOfInvitation = req.body.copyOfInvitation
  var updatedFacultyWebpage = req.body.updatedFacultyWebpage
  var callForPapersOfConference = req.body.callForPapersOfConference

  if (applicationLetter != null)
    applicationLetter = true;
  else
    applicationLetter = false;

  if (copyOfJournal != null)
    copyOfJournal = true;
  else
    copyOfJournal = false;
  
  if (proofOfAcceptance != null)
    proofOfAcceptance = true;
  else
    proofOfAcceptance = false;

  if (proofOfPaperAcceptance != null)
    proofOfPaperAcceptance = true;
  else
    proofOfPaperAcceptance = false;

  if (copyOfInvitation != null)
    copyOfInvitation = true;
  else
    copyOfInvitation = false;

  if (updatedFacultyWebpage != null)
    updatedFacultyWebpage = true;
  else
    updatedFacultyWebpage = false;

  if (callForPapersOfConference != null)
    callForPapersOfConference = true;
  else
    callForPapersOfConference = false;
  
  var fdThreeData = {
    grantName: "[FD3] Support for Paper Presentations in Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, titleOfPaperOrPublication, titleOfJournal,
    datePaperSubmitted, datePaperAccepted, nameOfConference, titleOfPaperToBePresented,
    dateOfConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, applicationLetter, copyOfJournal, proofOfAcceptance, proofOfPaperAcceptance,
    copyOfInvitation, updatedFacultyWebpage, callForPapersOfConference, grantStatus
  }

  fdThree.create(fdThreeData).then((newFdThreeData)=> {
      
      User.addFDThreeInUser(newFdThreeData).then((updatedUser)=>{
          var user = controllerUser.getCurrentUser()
          res.render("success.hbs", {
              user, formName : "[FD3] Support for Paper Presentations in Conferences"
          })
      }, (err)=>{
          res.send(err)
      })
      
  }, (err)=> {
      res.send(err)
  })
})

/**
 * Leads to the page of FD1 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-4", function(req, res){
	console.log("GET /fd-4")
	var user = controllerUser.getCurrentUser()
	res.render("form4", {
		  user
	})
})

/**
 * Adds to the database the entered information for FD1
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd4", urlencoder, function(req,res) {
  console.log("POST /submit-fd4")
  
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var department = req.body.department
  var rank = req.body.rank
  var nameOfConference = req.body.nameOfConference
  var dateOfConference = req.body.dateOfConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var participantFee = req.body.participantFee
  var noOfLocalConferencesAttendedThisYear = 
      req.body.noOfLocalConferencesAttendedThisYear
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  // Checkboxes
  var applicationLetter = req.body.applicationLetter
  var programOfConference = req.body.programOfConference
  var copyOfInvitation = req.body.copyOfInvitation

  if (applicationLetter != null)
    applicationLetter = true;
  else
    applicationLetter = false;

  if (programOfConference != null)
    programOfConference = true;
  else
    programOfConference = false;

  if (copyOfInvitation != null)
    copyOfInvitation = true;
  else
    copyOfInvitation = false;

  var fdFourData = {
    grantName: "[FD4] Support for Participation in Local Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, nameOfConference,
    dateOfConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, participantFee, noOfLocalConferencesAttendedThisYear, 
    applicationLetter, programOfConference, copyOfInvitation, grantStatus
  }

  fdFour.create(fdFourData).then((newFdFourData)=> {
      
      User.addFDFourInUser(newFdFourData).then((updatedUser)=>{
          var user = controllerUser.getCurrentUser()
          res.render("success.hbs", {
              user, formName : "[FD4] Support for Participation in Local Conferences"
          })
      }, (err)=>{
          res.send(err)
      })
      
  }, (err)=> {
      res.send(err)
  })
})

/**
 * Leads to the page of FD15 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-15", function(req, res){
	console.log("GET /fd-15")
	var user = controllerUser.getCurrentUser()
	res.render("form15", {
		  user
	})
})

/**
 * Adds to the database the entered information for FD1
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd15", urlencoder, function(req,res) {
  console.log("POST /submit-fd15")
  
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var department = req.body.department
  var rank = req.body.rank
  var hostInstitution = req.body.hostInstitution
  var titleOfSeminar = req.body.titleOfSeminar
  var place = req.body.place
  var startTime = req.body.startTime
  var endTime = req.body.endTime
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var participantFee = req.body.participantFee
  var grantStatus = "Pending"

  // Checkboxes
  var applicationLetter = req.body.applicationLetter
  var copyOfAcceptance = req.body.copyOfAcceptance

  if (applicationLetter != null)
    applicationLetter = true;
  else
    applicationLetter = false;

  if (copyOfAcceptance != null)
    copyOfAcceptance = true;
  else
    copyOfAcceptance = false;
  
  var fdFifteenData = {
    grantName: "[FD15] Incentive for Publication in Pre-Selected High Impact Journal",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, hostInstitution,
    titleOfSeminar, place, startTime, endTime, dateIncentiveLastAvailed, 
    participantFee, applicationLetter, copyOfAcceptance, grantStatus
  }

  fdFifteen.create(fdFifteenData).then((newFdFifteenData)=> {
      
      User.addFDFifteenInUser(newFdFifteenData).then((updatedUser)=>{
          var user = controllerUser.getCurrentUser()
          res.render("success.hbs", {
              user, formName : "[FD15] Support for Local Trainings, Seminars and Workshops"
          })
      }, (err)=>{
          res.send(err)
      })
      
  }, (err)=> {
      res.send(err)
  })
})

/**
 * Leads to the page of FD1 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-16", function(req, res){
	console.log("GET /fd-16")
	var user = controllerUser.getCurrentUser()
	res.render("form16", {
		  user
	})
})

/**
 * Adds to the database the entered information for FD1
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd16", urlencoder, function(req,res) {
  console.log("POST /submit-fd16")
  
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var department = req.body.department
  var rank = req.body.rank
  var status = req.body.status
  var nameOfOrganization = req.body.nameOfOrganization
  var typeOfMembershipPlace = req.body.typeOfMembershipPlace
  var typeofMembershipDuration = req.body.typeofMembershipDuration
  var membershipDate = req.body.membershipDate
  var coverage = req.body.coverage
  var membershipFee = req.body.membershipFee
  var checkPayableTo = req.body.checkPayableTo
  var grantStatus = "Pending"

  // Checkboxes
  var membershipFormForOrganizationForAnnual = 
    req.body.membershipFormForOrganizationForAnnual
  var membershipFormForOrganizationForLifetime = 
    req.body.membershipFormForOrganizationForLifetime
  var printoutsOfOrganizationForAnnual = 
    req.body.printoutsOfOrganizationForAnnual
  var printoutsOfOrganizationForLifetime = 
    req.body.printoutsOfOrganizationForLifetime
  var copyOfOrganizationAnnualConferenceAndMeetingProgram 
    = req.body.copyOfOrganizationAnnualConferenceAndMeetingProgram

  if (membershipFormForOrganizationForAnnual != null)
    membershipFormForOrganizationForAnnual = true;
  else
    membershipFormForOrganizationForAnnual = false;

  if (membershipFormForOrganizationForLifetime != null)
    membershipFormForOrganizationForLifetime = true;
  else
    membershipFormForOrganizationForLifetime = false;
  
  if (printoutsOfOrganizationForAnnual != null)
    printoutsOfOrganizationForAnnual = true;
  else
    printoutsOfOrganizationForAnnual = false;

  if (printoutsOfOrganizationForLifetime != null)
    printoutsOfOrganizationForLifetime = true;
  else
    printoutsOfOrganizationForLifetime = false;

  if (copyOfOrganizationAnnualConferenceAndMeetingProgram 
      != null)
    copyOfOrganizationAnnualConferenceAndMeetingProgram = true;
  else
    copyOfOrganizationAnnualConferenceAndMeetingProgram = false;

  var fdSixteenData = {
    grantName: "[FD16] Support for Membership in Professional Organizations",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, status, nameOfOrganization,
    typeOfMembershipPlace, typeofMembershipDuration, membershipDate,
    coverage, membershipFee, checkPayableTo, membershipFormForOrganizationForAnnual,
    membershipFormForOrganizationForLifetime, printoutsOfOrganizationForAnnual,
    printoutsOfOrganizationForLifetime, 
    copyOfOrganizationAnnualConferenceAndMeetingProgram,
    grantStatus
  }

  fdSixteen.create(fdSixteenData).then((newFdSixteenData)=> {
      
      User.addFDOneInUser(newFdSixteenData).then((updatedUser)=>{
          var user = controllerUser.getCurrentUser()
          res.render("success.hbs", {
              user, formName : "[FD16] Support for Membership in Professional Organizations"
          })
      }, (err)=>{
          res.send(err)
      })
      
  }, (err)=> {
      res.send(err)
  })
})

/**
 * Leads to the page for viewing all applied grant requests
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/my-requests", function(req, res) {
  console.log("GET /my-requests")

  var user = controllerUser.getCurrentUser() 
  forms = getAllForms(forms, function(forms){
      res.render("my-requests.hbs", {
          user, forms
      })
  })
})

module.exports = router

/**
 * Compares form's name from the .hbs files with
 * the current logged in user's name to filter in the  
 * view grants of the admin user
 *
 * @param {options} options.fn
 * @param {options} options.inverse
 */
hbs.registerHelper('showonlybyuser', function(fname, lname, options) {  
  var currentUser = controllerUser.getCurrentUser() 
  var firstName = currentUser.firstName
  var lastName = currentUser.lastName

  if (currentUser != undefined || currentUser!= null){
      if(firstName+"" == fname+"") {
        if (lastName+"" == lname+"")
            return options.fn(this);
      } else {
        return options.inverse(this);
      }
  }
})

hbs.registerHelper('facultystatus', function(status, options) { 
  if(status == "Probationary") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

hbs.registerHelper('employment', function(status, options) { 
  if(status == "Part-time") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

/**
 * Gets all forms
 *
 * @param {Array to store forms} forms
 */
function getAllForms(forms, callback){
    
  fdOne.getAllFDOne().then((fdOneData)=>{
      forms = fdOneData
      fdTwo.getAllFDTwo().then((fdTwoData)=>{
          forms = forms.concat(fdTwoData)
          fdThree.getAllFDThree().then((fdThreeData)=>{
              forms = forms.concat(fdThreeData)
              fdFour.getAllFDFour().then((fdFourData)=>{
                  forms = forms.concat(fdFourData)
                  fdFifteen.getAllFDFifteen().then((fdFifteenData)=>{
                      forms = forms.concat(fdFifteenData)
                      fdSixteen.getAllFDSixteen().then((fdSixteenData)=>{
                          forms = forms.concat(fdSixteenData)
                          callback(forms)
                      })
                  })
              })
          })
      })
  })
}