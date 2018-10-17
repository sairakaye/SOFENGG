/**
 * This controller is for the faculty users of the
 * web application
 * October 17, 2018
 * @ver 1.0
 * @author Sai Manalili
 */
const express = require("express")
const bodyparser = require("body-parser")
const urlencoder = bodyparser.urlencoded({
  extended : true
})
const router = express.Router()
router.use(urlencoder)
const app = express()

const User = require("../models/user")
const fdOne = require("../models/fdOne")
router.use("/user", require("./user"))

router.get("/request-grant", function(req, res){
	 console.log("GET /request-grant")
	 res.render("request-grant.hbs")
})

router.get("/my-requests", function(req, res) {
  console.log("GET /my-requests")

  fdOne.getAllFDOne().then((fdOneData)=> {
    res.render("my-requests.hbs", {
      fdOneData
    })
  }, (err)=> {
    res.send(err)
  })
})

router.post("/submit", urlencoder, function(req,res) {
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
      ownerIdNumber: 2018, term: "1st Term", startAY: 2018, endAY: 2019,
      name: firstName + " " + lastName, department, dateHired, rank, status,
      aveTeachingPerformance, titleOfPaperOrPublication, titleOfJournal,
      datePaperSubmitted, datePaperAccepted, nameOfConference, titleOfPaperToBePresented,
      dateOfConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
      dateIncentiveLastAvailed, applicationLetter, copyOfJournal, proofOfAcceptance, proofOfPaperAcceptance,
      copyOfInvitation, updatedFacultyWebpage, callForPapersOfConference, grantStatus
    }

    fdOne.create(fdOneData).then((newFdOneData)=> {
      res.render("home-user.hbs")
    }, (err)=> {
      res.send(err)
    })
})

module.exports = router