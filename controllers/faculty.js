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
  extended: true
})
const moment = require("moment")
const router = express.Router()
router.use(urlencoder)
const app = express()
const nodemailer = require('nodemailer')

const User = require("../models/user")
const Mailer = require("../models/mailer")
const fdOne = require("../models/fdOne")
const fdTwo = require("../models/fdTwo")
const fdThree = require("../models/fdThree")
const fdFour = require("../models/fdFour")
const fdFifteen = require("../models/fdFifteen")
const fdSixteen = require("../models/fdSixteen")
const Remark = require("../models/remark")
const controllerUser = require("./index")

var forms

/**
 * Leads to the page for requesting grants. 
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/request-grant", function (req, res) {
  console.log("GET /request-grant")

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    res.render("request-grant.hbs", {
      user
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Views details based on form id
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/view-details", urlencoder, function (req, res) {
  console.log("POST /view-details")

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  var id = req.body.details

  if (user != null) {
    var forms = getFormById(id, function (forms) {
      if (forms.grantName == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
        var fdOneData = forms

        res.render("preview-form1.hbs", {
          user, fdOneData, viewdetails: "True", remarks: fdOneData.remarks
        })
      } else if (forms.grantName == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
        var fdTwoData = forms
        res.render("preview-form2.hbs", {
          user, fdTwoData, viewdetails: "True", remarks: fdTwoData.remarks
        })
      } else if (forms.grantName == "[FD3] Support for Paper Presentations in Conferences") {
        var fdThreeData = forms
        res.render("preview-form3.hbs", {
          user, fdThreeData, viewdetails: "True", remarks: fdThreeData.remarks
        })
      } else if (forms.grantName == "[FD4] Support for Participation in Local Conferences") {
        var fdFourData = forms
        res.render("preview-form4.hbs", {
          user, fdFourData, viewdetails: "True", remarks: fdFourData.remarks
        })
      } else if (forms.grantName == "[FD15] Support for Local Trainings, Seminars and Workshops") {
        var fdFifteenData = forms
        res.render("preview-form15.hbs", {
          user, fdFifteenData, viewdetails: "True", remarks: fdFifteenData.remarks
        })
      } else if (forms.grantName == "[FD16] Support for Membership in Professional Organizations") {
        var fdSixteenData = forms
        res.render("preview-form16.hbs", {
          user, fdSixteenData, viewdetails: "True", remarks: fdSixteenData.remarks
        })
      }
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Leads to the page of FD1 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-1", urlencoder, function (req, res) {
  console.log("GET /fd-1")

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    res.render("form1", {
      user
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Leads to the page of FD1 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/fd-1", urlencoder, function (req, res) {
  console.log("POST /fd-1")
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
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  var fdOneData = {
    grantName: "[FD1] Incentive for Publication in Pre-Selected High Impact Journal",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, titleOfPaperOrPublication, titleOfJournal,
    datePaperSubmitted, datePaperAccepted, nameOfConference, titleOfPaperToBePresented,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, grantStatus
  }
  
//  console.log(fdOneData)
  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    res.render("form1", {
      user, fdOneData
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Adds to the database the entered information for FD1
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/preview-fd1", urlencoder, function (req, res) {
  console.log("POST /preview-fd1")

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
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  var fdOneData = {
    grantName: "[FD1] Incentive for Publication in Pre-Selected High Impact Journal",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, titleOfPaperOrPublication, titleOfJournal,
    datePaperSubmitted, datePaperAccepted, nameOfConference, titleOfPaperToBePresented,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, grantStatus
  }

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user != null) {
    res.render("preview-form1.hbs", {
      user, fdOneData
    })
  }
})

/**
 * Adds to the database the entered information for FD2
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/preview-fd2", urlencoder, function (req, res) {
  console.log("POST /preview-fd2")

  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var department = req.body.department
  var dateHired = req.body.dateHired
  var rank = req.body.rank
  var status = req.body.status
  var aveTeachingPerformance = req.body.aveTeachingPerformance
  var nameOfConference = req.body.nameOfConference
  var titleOfPaperToBePresented = req.body.titleOfPaperToBePresented
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  var fdTwoData = {
    grantName: "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, nameOfConference, titleOfPaperToBePresented,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, grantStatus
  }

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user != null) {
    res.render("preview-form2.hbs", {
      user, fdTwoData
    })
  }
})

/**
* Adds to the database the entered information for FD3
* form and sets grant status to pending for admin approval
*
* @param {Request} req
* @param {Response} res
*/
router.post("/preview-fd3", urlencoder, function (req, res) {
  console.log("POST /preview-fd3")

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
  var typeOfConference = req.body.typeOfConference
  var nameOfConference = req.body.nameOfConference
  var titleOfPaperToBePresented = req.body.titleOfPaperToBePresented
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var travelAndConferenceSubsidy = req.body.travelAndConferenceSubsidy
  var grantStatus = "Pending"

  var fdThreeData = {
    grantName: "[FD3] Support for Paper Presentations in Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, titleOfPaperOrPublication, titleOfJournal,
    datePaperSubmitted, datePaperAccepted, nameOfConference, typeOfConference, titleOfPaperToBePresented,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    travelAndConferenceSubsidy, dateIncentiveLastAvailed, grantStatus
  }

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user != null) {
    res.render("preview-form3.hbs", {
      user, fdThreeData
    })
  }
})

/**
 * Adds to the database the entered information for FD4
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/preview-fd4", urlencoder, function (req, res) {
  console.log("POST /preview-fd4")

  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var department = req.body.department
  var rank = req.body.rank
  var nameOfConference = req.body.nameOfConference
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var participantFee = req.body.participantFee
  var noOfLocalConferencesAttendedThisYear = req.body.noOfLocalConferencesAttendedThisYear
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  var fdFourData = {
    grantName: "[FD4] Support for Participation in Local Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, nameOfConference,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, participantFee, noOfLocalConferencesAttendedThisYear,
    grantStatus
  }

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user != null) {
    res.render("preview-form4.hbs", {
      user, fdFourData
    })
  }
})

/**
* Adds to the database the entered information for FD2
* form and sets grant status to pending for admin approval
*
* @param {Request} req
* @param {Response} res
*/
router.post("/preview-fd15", urlencoder, function (req, res) {
  console.log("POST /preview-fd15")

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

  var fdFifteenData = {
    grantName: "[FD15] Support for Local Trainings, Seminars and Workshops",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, hostInstitution,
    titleOfSeminar, place, startTime, endTime, dateIncentiveLastAvailed,
    participantFee, grantStatus
  }

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user != null) {
    res.render("preview-form15.hbs", {
      user, fdFifteenData
    })
  }
})

router.post("/preview-fd16", urlencoder, function (req, res) {
  console.log("POST /preview-fd16")

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

  var fdSixteenData = {
    grantName: "[FD16] Support for Membership in Professional Organizations",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, status, nameOfOrganization,
    typeOfMembershipPlace, typeofMembershipDuration, membershipDate,
    coverage, membershipFee, checkPayableTo, grantStatus
  }

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user != null) {
    res.render("preview-form16.hbs", {
      user, fdSixteenData
    })
  }
})

/*************************************/




/**
 * Adds to the database the entered information for FD1
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd1", urlencoder, function (req, res) {
  console.log("POST /submit-fd1")

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
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  var fdOneData = {
    formId: "FD1-", grantName: "[FD1] Incentive for Publication in Pre-Selected High Impact Journal",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, titleOfPaperOrPublication, titleOfJournal,
    datePaperSubmitted, datePaperAccepted, nameOfConference, titleOfPaperToBePresented,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, grantStatus
  }

  fdOne.create(fdOneData).then((newFdOneData) => {
    User.addFDOneInUser(newFdOneData).then((updatedUser) => {
      var remark = {
        remarkId: 1, formId: newFdOneData._id, date: new Date(),
        status: "Waiting for Documents", remark: "Do not forget to complete the form and pass it to Ms. Grace."
      }

      Remark.create(remark).then((addedRemark) => {
        fdOne.addRemarkInFDOne(addedRemark).then((updatedFdOne) => {
          console.log("Remark in FD1 added!")
        }, (err) => {
          res.send(err)
        })
      }, (err) => {
        res.send(err)
      })

      var user = req.session.user
      if (user.userType != 'Faculty')
        res.redirect("/")

      if (user) {
        Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

          User.getUserByType("Administrator").then((adminUser) => {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: newMailer.emailAddress,
                pass: newMailer.password
              }
            })

            var mailOptions = {
              from: newMailer.emailAddress,
              to: adminUser.emailAddress,
              subject: "[OVCA]" + " [" + newFdOneData.formId + "]",
              text: user.firstName + " " + user.lastName + " has requested for " + newFdOneData.grantName
            }

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            })

            res.render("success.hbs", {
              user, formName: "[FD1] Incentive for Publication in Pre-Selected High Impact Journal"
            })

          }, (err) => {
            res.send(err)
          })

        }, (err) => {
          res.send(err)
        })

      } else {
        res.redirect("/")
      }
    }, (err) => {
      res.send(err)
    })

  }, (err) => {
    res.send(err)
  })
})

/**
 * Leads to the page of FD2 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-2", function (req, res) {
  console.log("GET /fd-2")

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    res.render("form2", {
      user
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Leads to the page of FD2 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/fd-2", urlencoder, function (req, res) {
  console.log("POST /fd-2")

  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var department = req.body.department
  var dateHired = req.body.dateHired
  var rank = req.body.rank
  var status = req.body.status
  var aveTeachingPerformance = req.body.aveTeachingPerformance
  var nameOfConference = req.body.nameOfConference
  var titleOfPaperToBePresented = req.body.titleOfPaperToBePresented
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  var fdTwoData = {
    grantName: "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, nameOfConference, titleOfPaperToBePresented,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, grantStatus
  }
    
  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    res.render("form2", {
      user, fdTwoData
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Adds to the database the entered information for the FD2
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd2", urlencoder, function (req, res) {
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
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  var fdTwoData = {
    formId: "FD2-", grantName: "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, nameOfConference, titleOfPaperToBePresented,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, grantStatus
  }

  fdTwo.create(fdTwoData).then((newFdTwoData) => {
    User.addFDTwoInUser(newFdTwoData).then((updatedUser) => {
      var remark = {
        remarkId: 1, formId: newFdTwoData._id, date: new Date(),
        status: "Waiting for Documents", remark: "Do not forget to complete the form and pass it to Ms. Grace."
      }

      Remark.create(remark).then((addedRemark) => {
        fdTwo.addRemarkInFDTwo(addedRemark).then((updatedFdTwo) => {
          console.log("Remark in FD2 added!")
        }, (err) => {
          res.send(err)
        })
      }, (err) => {
        res.send(err)
      })

      var user = req.session.user
      if (user.userType != 'Faculty')
        res.redirect("/")

      if (user) {

        Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

          User.getUserByType("Administrator").then((adminUser) => {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: newMailer.emailAddress,
                pass: newMailer.password
              }
            })

            var mailOptions = {
              from: newMailer.emailAddress,
              to: adminUser.emailAddress,
              subject: "[OVCA]" + " [" + newFdTwoData.formId + "]",
              text: user.firstName + " " + user.lastName + " has requested for " + newFdTwoData.grantName
            }

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            })

            res.render("success.hbs", {
              user, formName: "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences"
            })

          }, (err) => {
            res.send(err)
          })

        }, (err) => {
          res.send(err)
        })
      } else {
        res.redirect("/")
      }
    }, (err) => {
      res.send(err)
    })

  }, (err) => {
    res.send(err)
  })
})

/**
 * Leads to the page of FD3 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-3", function (req, res) {
  console.log("GET /fd-3")

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    res.render("form3", {
      user
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Leads to the page of FD3 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/fd-3", urlencoder, function (req, res) {
  console.log("POST /fd-3")
    
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
  var typeOfConference = req.body.typeOfConference
  var nameOfConference = req.body.nameOfConference
  var titleOfPaperToBePresented = req.body.titleOfPaperToBePresented
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var travelAndConferenceSubsidy = req.body.travelAndConferenceSubsidy
  var grantStatus = "Pending"

  var fdThreeData = {
    grantName: "[FD3] Support for Paper Presentations in Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, titleOfPaperOrPublication, titleOfJournal,
    datePaperSubmitted, datePaperAccepted, nameOfConference, typeOfConference, titleOfPaperToBePresented,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    travelAndConferenceSubsidy, dateIncentiveLastAvailed, grantStatus
  }

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    res.render("form3", {
      user, fdThreeData
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Adds to the database the entered information for FD3
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd3", urlencoder, function (req, res) {
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
  var typeOfConference = req.body.typeOfConference
  var nameOfConference = req.body.nameOfConference
  var titleOfPaperToBePresented = req.body.titleOfPaperToBePresented
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var travelAndConferenceSubsidy = req.body.travelAndConferenceSubsidy
  var grantStatus = "Pending"

  var fdThreeData = {
    formId: "FD3-", grantName: "[FD3] Support for Paper Presentations in Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, titleOfPaperOrPublication, titleOfJournal,
    datePaperSubmitted, datePaperAccepted, nameOfConference, typeOfConference, titleOfPaperToBePresented,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    travelAndConferenceSubsidy, dateIncentiveLastAvailed, grantStatus
  }

  fdThree.create(fdThreeData).then((newFdThreeData) => {

    User.addFDThreeInUser(newFdThreeData).then((updatedUser) => {
      var remark = {
        remarkId: 1, formId: newFdThreeData._id, date: new Date(),
        status: "Waiting for Documents", remark: "Do not forget to complete the form and pass it to Ms. Grace."
      }

      Remark.create(remark).then((addedRemark) => {
        fdThree.addRemarkInFDThree(addedRemark).then((updatedFdThree) => {
          console.log("Remark in FD3 added!")
        }, (err) => {
          res.send(err)
        })
      }, (err) => {
        res.send(err)
      })

      var user = req.session.user
      if (user.userType != 'Faculty')
        res.redirect("/")

      if (user) {

        Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

          User.getUserByType("Administrator").then((adminUser) => {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: newMailer.emailAddress,
                pass: newMailer.password
              }
            })

            var mailOptions = {
              from: newMailer.emailAddress,
              to: adminUser.emailAddress,
              subject: "[OVCA]" + " [" + newFdThreeData.formId + "]",
              text: user.firstName + " " + user.lastName + " has requested for " + newFdThreeData.grantName
            }

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            })

            res.render("success.hbs", {
              user, formName: "[FD3] Support for Paper Presentations in Conferences"
            })

          }, (err) => {
            res.send(err)
          })

        }, (err) => {
          res.send(err)
        })

      } else {
        res.redirect("/")
      }
    }, (err) => {
      res.send(err)
    })

  }, (err) => {
    res.send(err)
  })
})

/**
 * Leads to the page of FD4 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-4", function (req, res) {
  console.log("GET /fd-4")

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    res.render("form4", {
      user
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Leads to the page of FD4 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/fd-4", urlencoder,  function (req, res) {
  console.log("POST /fd-4")

  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var department = req.body.department
  var rank = req.body.rank
  var nameOfConference = req.body.nameOfConference
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var participantFee = req.body.participantFee
  var noOfLocalConferencesAttendedThisYear = req.body.noOfLocalConferencesAttendedThisYear
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  var fdFourData = {
    grantName: "[FD4] Support for Participation in Local Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, nameOfConference,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, participantFee, noOfLocalConferencesAttendedThisYear,
    grantStatus
  }
  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    res.render("form4", {
      user, fdFourData
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Adds to the database the entered information for FD4
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd4", urlencoder, function (req, res) {
  console.log("POST /submit-fd4")

  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var department = req.body.department
  var rank = req.body.rank
  var nameOfConference = req.body.nameOfConference
  var dateOfStartConference = req.body.dateOfStartConference
  var dateOfEndConference = req.body.dateOfEndConference
  var placeAndVenue = req.body.placeAndVenue
  var dateOfDeparture = req.body.dateOfDeparture
  var dateOfReturn = req.body.dateOfReturn
  var dateOfReturnToWork = req.body.dateOfReturnToWork
  var participantFee = req.body.participantFee
  var noOfLocalConferencesAttendedThisYear = req.body.noOfLocalConferencesAttendedThisYear
  var dateIncentiveLastAvailed = req.body.dateIncentiveLastAvailed
  var grantStatus = "Pending"

  var fdFourData = {
    formId: "FD4-", grantName: "[FD4] Support for Participation in Local Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, nameOfConference,
    dateOfStartConference, dateOfEndConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, participantFee, noOfLocalConferencesAttendedThisYear,
    grantStatus
  }

  fdFour.create(fdFourData).then((newFdFourData) => {

    User.addFDFourInUser(newFdFourData).then((updatedUser) => {
      var remark = {
        remarkId: 1, formId: newFdFourData._id, date: new Date(),
        status: "Waiting for Documents", remark: "Do not forget to complete the form and pass it to Ms. Grace."
      }

      Remark.create(remark).then((addedRemark) => {
        fdFour.addRemarkInFDFour(addedRemark).then((updatedFdFour) => {
          console.log("Remark in FD4 added!")
        }, (err) => {
          res.send(err)
        })
      }, (err) => {
        res.send(err)
      })

      var user = req.session.user
      if (user.userType != 'Faculty')
        res.redirect("/")

      if (user) {
        Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

          User.getUserByType("Administrator").then((adminUser) => {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: newMailer.emailAddress,
                pass: newMailer.password
              }
            })

            var mailOptions = {
              from: newMailer.emailAddress,
              to: adminUser.emailAddress,
              subject: "[OVCA]" + " [" + newFdFourData.formId + "]",
              text: user.firstName + " " + user.lastName + " has requested for " + newFdFourData.grantName
            }

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            })

            res.render("success.hbs", {
              user, formName: "[FD4] Support for Participation in Local Conferences"
            })

          }, (err) => {
            res.send(err)
          })

        }, (err) => {
          res.send(err)
        })
      } else {
        res.redirect("/")
      }
    }, (err) => {
      res.send(err)
    })

  }, (err) => {
    res.send(err)
  })
})

/**
 * Leads to the page of FD15 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-15", function (req, res) {
  console.log("GET /fd-15")

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    res.render("form15", {
      user
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Leads to the page of FD15 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/fd-15", urlencoder, function (req, res) {
  console.log("POST /fd-15")

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

  var fdFifteenData = {
    grantName: "[FD15] Support for Local Trainings, Seminars and Workshops",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, hostInstitution,
    titleOfSeminar, place, startTime, endTime, dateIncentiveLastAvailed,
    participantFee, grantStatus
  }
  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    res.render("form15", {
      user, fdFifteenData
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Adds to the database the entered information for FD15
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd15", urlencoder, function (req, res) {
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

  var fdFifteenData = {
    formId: "FD15-", grantName: "[FD15] Support for Local Trainings, Seminars and Workshops",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, hostInstitution,
    titleOfSeminar, place, startTime, endTime, dateIncentiveLastAvailed,
    participantFee, grantStatus
  }

  fdFifteen.create(fdFifteenData).then((newFdFifteenData) => {

    User.addFDFifteenInUser(newFdFifteenData).then((updatedUser) => {
      var remark = {
        remarkId: 1, formId: newFdFifteenData._id, date: new Date(),
        status: "Waiting for Documents", remark: "Do not forget to complete the form and pass it to Ms. Grace."
      }

      Remark.create(remark).then((addedRemark) => {
        fdFifteen.addRemarkInFDFifteen(addedRemark).then((updatedFdFifteen) => {
          console.log("Remark in FD15 added!")
        }, (err) => {
          res.send(err)
        })
      }, (err) => {
        res.send(err)
      })

      var user = req.session.user
      if (user.userType != 'Faculty')
        res.redirect("/")

      if (user) {

        Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

          User.getUserByType("Administrator").then((adminUser) => {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: newMailer.emailAddress,
                pass: newMailer.password
              }
            })

            var mailOptions = {
              from: newMailer.emailAddress,
              to: adminUser.emailAddress,
              subject: "[OVCA]" + " [" + newFdFifteenData.formId + "]",
              text: user.firstName + " " + user.lastName + " has requested for " + newFdFifteenData.grantName
            }

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            })

            res.render("success.hbs", {
              user, formName: "[FD15] Support for Local Trainings, Seminars and Workshops"
            })

          }, (err) => {
            res.send(err)
          })

        }, (err) => {
          res.send(err)
        })
      } else {
        res.redirect("/")
      }
    }, (err) => {
      res.send(err)
    })

  }, (err) => {
    res.send(err)
  })
})

/**
 * Leads to the page of FD16 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-16", function (req, res) {
  console.log("GET /fd-16")

  var user = req.session.user
  if (user.userType != 'Faculty')
   res.redirect("/")

  if (user) {
    res.render("form16", {
      user
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Leads to the page of FD16 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/fd-16", urlencoder, function (req, res) {
  console.log("POST /fd-16")

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

  var fdSixteenData = {
    grantName: "[FD16] Support for Membership in Professional Organizations",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, status, nameOfOrganization,
    typeOfMembershipPlace, typeofMembershipDuration, membershipDate,
    coverage, membershipFee, checkPayableTo, grantStatus
  }    
  var user = req.session.user
  if (user.userType != 'Faculty')
   res.redirect("/")

  if (user) {
    res.render("form16", {
      user, fdSixteenData
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Adds to the database the entered information for FD16
 * form and sets grant status to pending for admin approval
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/submit-fd16", urlencoder, function (req, res) {
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

  var fdSixteenData = {
    formId: "FD16-", grantName: "[FD16] Support for Membership in Professional Organizations",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, status, nameOfOrganization,
    typeOfMembershipPlace, typeofMembershipDuration, membershipDate,
    coverage, membershipFee, checkPayableTo, grantStatus
  }

  fdSixteen.create(fdSixteenData).then((newFdSixteenData) => {

    User.addFDSixteenInUser(newFdSixteenData).then((updatedUser) => {
      var remark = {
        remarkId: 1, formId: newFdSixteenData._id, date: new Date(),
        status: "Waiting for Documents", remark: "Do not forget to complete the form and pass it to Ms. Grace."
      }

      Remark.create(remark).then((addedRemark) => {
        fdSixteen.addRemarkInFDSixteen(addedRemark).then((updatedFdSixteen) => {
          console.log("Remark in FD16 added!")
        }, (err) => {
          res.send(err)
        })
      }, (err) => {
        res.send(err)
      })

      var user = req.session.user
      if (user.userType != 'Faculty')
        res.redirect("/")

      if (user) {
        Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

          User.getUserByType("Administrator").then((adminUser) => {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: newMailer.emailAddress,
                pass: newMailer.password
              }
            })

            var mailOptions = {
              from: newMailer.emailAddress,
              to: adminUser.emailAddress,
              subject: "[OVCA]" + " [" + newFdSixteenData.formId + "]",
              text: user.firstName + " " + user.lastName + " has requested for " + newFdSixteenData.grantName
            }

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            })

            res.render("success.hbs", {
              user, formName: "[FD16] Support for Membership in Professional Organizations"
            })

          }, (err) => {
            res.send(err)
          })

        }, (err) => {
          res.send(err)
        })
      } else {
        res.redirect("/")
      }
    }, (err) => {
      res.send(err)
    })

  }, (err) => {
    res.send(err)
  })
})

/**
 * Leads to the page for viewing all applied grant requests
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/my-requests", function (req, res) {
  console.log("GET /my-requests")

  var user = req.session.user
  if (user.userType != 'Faculty')
    res.redirect("/")

  if (user) {
    forms = getAllForms(forms, function (forms) {
      if (forms == "") {
        res.render("my-requests.hbs", {
          user
        })
      } else {
        res.render("my-requests.hbs", {
          user, forms
        })
      }
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Gets the form with the id being requested, this is 
 * used in exporting the form as pdf file.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/saveform", urlencoder, (req, res) => {
  console.log("GET /saveform ")

  var id = req.query.id

  var forms = getFormById(id, function (forms) {
    res.send(forms)
  })
})

/**
 * Gets the form with the id being requested, this is 
 * used in printing the form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/printform", urlencoder, (req, res) => {
  console.log("GET /printform ")

  var id = req.query.id

  var forms = getFormById(id, function (forms) {
    res.send(forms)
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
hbs.registerHelper('showonlybyuser', function (fname, lname, options) {

  var user = controllerUser.getCurrentUser()
  var firstName = user.firstName
  var lastName = user.lastName

  if (user != undefined || user != null) {
    if (firstName + "" == fname + "") {
      if (lastName + "" == lname + "")
        return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }
})

/**
 * Compares the faculty status from the .hbs files that
 * is retrieved from the database.
 * 
 * @param {status} String
 * @param {options} options.fn
 * @param {options} options.inverse
 */

hbs.registerHelper('facultystatus', function (status, options) {
  if (status == "Probationary") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

/**
 * Compares the employment type (status) from the 
 * .hbs files that is retrieved from the database.
 * 
 * @param {status} String
 * @param {options} options.fn
 * @param {options} options.inverse
 */
hbs.registerHelper('employment', function (status, options) {
  if (status == "Part-time") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

/**
 * For formating of date with the time.
 * 
 * @param {Date} date  
 */
hbs.registerHelper('formatDateTime', function (date) {
  var momentDate = moment(date);
  return momentDate.format("MMMM D, YYYY h:mm A");
})

/**
* For formating of date.
* 
* @param {Date} date  
*/
hbs.registerHelper('formatDate', function (date) {
  var momentDate = moment(date);
  return momentDate.format("MMMM D, YYYY");
})

/**
 * Gets all forms
 *
 * @param {Array to store forms} forms
 */
function getAllForms(forms, callback) {

  fdOne.getAllFDOne().then((fdOneData) => {
    forms = fdOneData
    fdTwo.getAllFDTwo().then((fdTwoData) => {
      forms = forms.concat(fdTwoData)
      fdThree.getAllFDThree().then((fdThreeData) => {
        forms = forms.concat(fdThreeData)
        fdFour.getAllFDFour().then((fdFourData) => {
          forms = forms.concat(fdFourData)
          fdFifteen.getAllFDFifteen().then((fdFifteenData) => {
            forms = forms.concat(fdFifteenData)
            fdSixteen.getAllFDSixteen().then((fdSixteenData) => {
              forms = forms.concat(fdSixteenData)
              callback(forms)
            })
          })
        })
      })
    })
  })
}

/**
 * Gets a form (By ID)
 *
 * @param {Filter} id
 * @param {Callback function} callback
 */
function getFormById(id, callback) {

  fdOne.getFDOneByID(id).then((fdOneData) => {
    forms = fdOneData
    if (forms != null)
      callback(forms)
    fdTwo.getFDTwoByID(id).then((fdTwoData) => {
      forms = fdTwoData
      if (forms != null)
        callback(forms)
      fdThree.getFDThreeByID(id).then((fdThreeData) => {
        forms = fdThreeData
        if (forms != null)
          callback(forms)
        fdFour.getFDFourByID(id).then((fdFourData) => {
          forms = fdFourData
          if (forms != null)
            callback(forms)
          fdFifteen.getFDFifteenByID(id).then((fdFifteenData) => {
            forms = fdFifteenData
            if (forms != null)
              callback(forms)
            fdSixteen.getFDSixteenByID(id).then((fdSixteenData) => {
              forms = fdSixteenData
              if (forms != null)
                callback(forms)
            })
          })
        })
      })
    })
  })
} 