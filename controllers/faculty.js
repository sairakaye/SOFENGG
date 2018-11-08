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
  
    var user = req.session.user
    if (user) {
        res.render("request-grant.hbs", {
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
router.get("/fd-1", function(req, res){
    console.log("GET /fd-1")
    
    var user = req.session.user
    if (user){
        res.render("form1", {
            user
        })
    }else{
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
router.post("/submit-fd1", urlencoder, function(req,res) {
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
  var dateOfConference = req.body.dateOfConference
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
    dateOfConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, grantStatus
  }

  fdOne.create(fdOneData).then((newFdOneData)=> {
      
      User.addFDOneInUser(newFdOneData).then((updatedUser)=>{
        var user = req.session.user
        if (user) {
          res.render("success.hbs", {
              user, formName : "[FD1] Incentive for Publication in Pre-Selected High Impact Journal"
          })
        } else {
            res.redirect("/")
        }
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

    var user = req.session.user
    if (user){
        res.render("form2", {
            user
        })
    }else{
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
  
  var fdTwoData = {
    grantName: "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, nameOfConference, titleOfPaperToBePresented,
    dateOfConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, grantStatus
  }

  fdTwo.create(fdTwoData).then((newFdTwoData)=> {
      
      User.addFDTwoInUser(newFdTwoData).then((updatedUser)=>{
          var user = req.session.user     
        if (user) {
          res.render("success.hbs", {
              user, formName : "Incentive for Publication in Pre-Selected High Impact Conferences"
          })
        } else {
            res.redirect("/")
        }
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

    var user = req.session.user
    if (user){
        res.render("form3", {
            user
        })
    }else{
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
  
  var fdThreeData = {
    grantName: "[FD3] Support for Paper Presentations in Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, dateHired, rank, status,
    aveTeachingPerformance, titleOfPaperOrPublication, titleOfJournal,
    datePaperSubmitted, datePaperAccepted, nameOfConference, titleOfPaperToBePresented,
    dateOfConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, grantStatus
  }

  fdThree.create(fdThreeData).then((newFdThreeData)=> {
      
      User.addFDThreeInUser(newFdThreeData).then((updatedUser)=>{
        var user = req.session.user 
        if (user) {
          res.render("success.hbs", {
              user, formName : "[FD3] Support for Paper Presentations in Conferences"
          })
        } else {
            res.redirect("/")
        }
      }, (err)=>{
          res.send(err)
      })
      
  }, (err)=> {
      res.send(err)
  })
})

/**
 * Leads to the page of FD4 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-4", function(req, res){
	console.log("GET /fd-4")

    var user = req.session.user
    if (user){
        res.render("form4", {
            user
        })
    }else{
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

  var fdFourData = {
    grantName: "[FD4] Support for Participation in Local Conferences",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, nameOfConference,
    dateOfConference, dateOfDeparture, placeAndVenue, dateOfReturn, dateOfReturnToWork,
    dateIncentiveLastAvailed, participantFee, noOfLocalConferencesAttendedThisYear, 
    grantStatus
  }

  fdFour.create(fdFourData).then((newFdFourData)=> {
      
      User.addFDFourInUser(newFdFourData).then((updatedUser)=>{
        var user = req.session.user
        if (user) {
          res.render("success.hbs", {
              user, formName : "[FD4] Support for Participation in Local Conferences"
          })
        } else {
            res.redirect("/")
        }
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

    var user = req.session.user
    if (user){
        res.render("form15", {
            user
        })
    }else{
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

  var fdFifteenData = {
    grantName: "[FD15] Support for Local Trainings, Seminars and Workshops",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, hostInstitution,
    titleOfSeminar, place, startTime, endTime, dateIncentiveLastAvailed, 
    participantFee, grantStatus
  }

  fdFifteen.create(fdFifteenData).then((newFdFifteenData)=> {
      
      User.addFDFifteenInUser(newFdFifteenData).then((updatedUser)=>{
        var user = req.session.user
        if (user) {
          res.render("success.hbs", {
              user, formName : "[FD15] Support for Local Trainings, Seminars and Workshops"
          })
        } else {
            res.redirect("/")
        }
      }, (err)=>{
          res.send(err)
      })
      
  }, (err)=> {
      res.send(err)
  })
})

/**
 * Leads to the page of FD16 form.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/fd-16", function(req, res){
	console.log("GET /fd-16")

    var user = req.session.user
    if (user){
        res.render("form16", {
            user
        })
    }else{
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

  var fdSixteenData = {
    grantName: "[FD16] Support for Membership in Professional Organizations",
    ownerIdNumber: controllerUser.getCurrentUser().username, term: "1st Term", startAY: 2018, endAY: 2019,
    firstName, lastName, department, rank, status, nameOfOrganization,
    typeOfMembershipPlace, typeofMembershipDuration, membershipDate,
    coverage, membershipFee, checkPayableTo, grantStatus
  }

  fdSixteen.create(fdSixteenData).then((newFdSixteenData)=> {
      
      User.addFDOneInUser(newFdSixteenData).then((updatedUser)=>{
          var user = req.session.user
          if (user){
            res.render("success.hbs", {
                user, formName : "[FD16] Support for Membership in Professional Organizations"
            })
          } else {
              res.redirect("/")
          }
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

  var user = req.session.user
  if (user){
    forms = getAllForms(forms, function(forms){
        res.render("my-requests.hbs", {
            user, forms
        })
    })
  } else {
      res.redirect("/")
  }
})

router.get("/printform", urlencoder, (req, res) => {
    console.log("POST /printform ")
    
    var id = req.query.id

    var forms = getFormById(id, function(forms){
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
hbs.registerHelper('showonlybyuser', function(fname, lname, options) {  

  var user = controllerUser.getCurrentUser() 
  var firstName = user.firstName
  var lastName = user.lastName

  if (user != undefined || user!= null){
      if(firstName+"" == fname+"") {
        if (lastName+"" == lname+"")
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

hbs.registerHelper('facultystatus', function(status, options) { 
  if(status == "Probationary") {
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

/**
 * Gets a form (By ID)
 *
 * @param {Filter} id
 * @param {Callback function} callback
 */
function getFormById(id, callback){
    
    fdOne.getFDOneByID(id).then((fdOneData)=>{
        forms = fdOneData
        if (forms != null)
            callback(forms)
        fdTwo.getFDTwoByID(id).then((fdTwoData)=>{
            forms = fdTwoData
            if (forms != null)
                callback(forms)
            fdThree.getFDThreeByID(id).then((fdThreeData)=>{
                forms = fdThreeData
                if (forms != null)
                    callback(forms)
                fdFour.getFDFourByID(id).then((fdFourData)=>{
                    forms = fdFourData
                    if (forms != null)
                        callback(forms)
                    fdFifteen.getFDFifteenByID(id).then((fdFifteenData)=>{
                        forms = fdFifteenData
                        if (forms != null)
                            callback(forms)
                        fdSixteen.getFDSixteenByID(id).then((fdSixteenData)=>{
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