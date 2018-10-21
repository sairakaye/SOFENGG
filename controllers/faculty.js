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
const controllerUser = require("./index")

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
 * Leads to the page for viewing all applied grant requests
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/my-requests", function(req, res) {
  console.log("GET /my-requests")

  var user = controllerUser.getCurrentUser() 
  fdOne.getAllFDOne().then((fdOneData)=> {
    forms = fdOneData
    res.render("my-requests.hbs", {
      user, forms
    })
  }, (err)=> {
    res.send(err)
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