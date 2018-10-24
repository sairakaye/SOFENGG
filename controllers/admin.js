/**
 * This controller is for users with 
 * administrative rights to the system.
 * October 18, 2018
 * @ver 1.0
 * @author Candace Mercado
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
 * Leads to the page for requesting grants 
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/view-grants", function(req, res, callback){
    console.log("GET /view-grants")
    
    var user = controllerUser.getCurrentUser() 
    forms = getAllForms(forms, function(forms){
        res.render("view-grants.hbs", {
            user, forms
        })
    })

})

router.get("/filterApproved", function(req, res){
    console.log("GET /filterApproved")

    var user = controllerUser.getCurrentUser() 
    var filter = 'Approved'
    var forms = filterAllFormsByStatus(filter, function(forms){
        res.render("view-grants.hbs", {
            user, forms, filter
        })
    })
})


router.get("/filterPending", function(req, res){
  console.log("GET /filterPending")

  var user = controllerUser.getCurrentUser() 
  var filter = 'Pending'
  var forms = filterAllFormsByStatus(filter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, filter
      })
  })
})

router.get("/filterRejected", function(req, res){
  console.log("GET /filterRejected")

  var user = controllerUser.getCurrentUser() 
  var filter = 'Rejected'
  var forms = filterAllFormsByStatus(filter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, filter
      })
  })
})

router.get("/filterCED", function(req, res){
  console.log("GET /filterRejected")

  var user = controllerUser.getCurrentUser() 
  var filter = 'College of Education'
  var forms = filterAllFormsByDepartment(filter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, filter
      })
  })
})

router.get("/filterCCS", function(req, res){
  console.log("GET /filterRejected")

  var user = controllerUser.getCurrentUser() 
  var filter = 'College of Computer Studies'
  var forms = filterAllFormsByDepartment(filter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, filter
      })
  })
})

router.get("/filterCOL", function(req, res){
  console.log("GET /filterRejected")

  var user = controllerUser.getCurrentUser() 
  var filter = 'College of Law'
  var forms = filterAllFormsByDepartment(filter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, filter
      })
  })
})

router.get("/filterCLA", function(req, res){
  console.log("GET /filterRejected")

  var user = controllerUser.getCurrentUser() 
  var filter = 'College of Liberal Arts'
  var forms = filterAllFormsByDepartment(filter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, filter
      })
  })
})

router.get("/filterCOS", function(req, res){
  console.log("GET /filterRejected")

  var user = controllerUser.getCurrentUser() 
  var filter = 'College of Science'
  var forms = filterAllFormsByDepartment(filter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, filter
      })
  })
})

router.get("/filterCOE", function(req, res){
  console.log("GET /filterRejected")

  var user = controllerUser.getCurrentUser() 
  var filter = 'College of Engineering'
  var forms = filterAllFormsByDepartment(filter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, filter
      })
  })
})

router.get("/filterCOB", function(req, res){
  console.log("GET /filterRejected")

  var user = controllerUser.getCurrentUser() 
  var filter = 'College of Business'
  var forms = filterAllFormsByDepartment(filter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, filter
      })
  })
})

router.get("/filterSOE", function(req, res){
  console.log("GET /filterRejected")

  var user = controllerUser.getCurrentUser() 
  var filter = 'School of Economics'
  var forms = filterAllFormsByDepartment(filter, function(forms){
      res.render("view-grants.hbs", {
          user, forms, filter
      })
  })
})

router.post("/searchName", function(req, res){
  console.log("POST /searchName")

  var firstName =req.body.firstNameSearch
  var lastName = req.body.lastNameSearch

  console.log(firstName)
  console.log(lastName)
  var user = controllerUser.getCurrentUser() 
  
  if(firstName != "" && lastName != ""){
      User.getFDOneFormsByFullName(firstName, lastName).then((fdOneData)=>{
          forms = fdOneData
          if(forms != null){
              res.render("view-grants.hbs", {
                  user, forms
              })
          }else{
              fdOne.getAllFDOne().then((fdOneData)=>{
                  forms = fdOneData
                  res.render("view-grants.hbs", {
                      user, forms,
                      error : "Name not found"
                  })
              })
          }
      })
      
  } else if(firstName != ""){
      User.getFDOneFormsByFirstName(firstName).then((fdOneData)=>{
          forms = fdOneData
          if(forms != null){
              res.render("view-grants.hbs", {
                  user, forms
              })
          }else{
              fdOne.getAllFDOne().then((fdOneData)=>{
                  forms = fdOneData
                  res.render("view-grants.hbs", {
                      user, forms,
                      error : "Name not found"
                  })
              })
          }
          
      })
      
  } else if(lastName != ""){
      User.getFDOneFormsByLastName(lastName).then((fdOneData)=>{
          forms = fdOneData
          if(forms != null){
              res.render("view-grants.hbs", {
                  user, forms
              })
          }else{
              fdOne.getAllFDOne().then((fdOneData)=>{
                  forms = fdOneData
                  res.render("view-grants.hbs", {
                      user, forms,
                      error : "Name not found"
                  })
              })
          }
      })
      
  }
  
  
})

/**
 * Deletes a grant request form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.delete("/deleteform", urlencoder, (req, res) => {
    console.log("POST /deleteform " + req.body.id)
    
    
    var grant = req.body.grant
    var id = req.body.id
    
    if(grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal"){
        fdOne.getFDOneByID(id).then((foundFDOne)=>{
            User.deleteFDOneInUser(foundFDOne).then((updatedUser)=>{
                fdOne.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
            })
        })
    }
    else if(grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences"){
        fdTwo.getFDTwoByID(id).then((foundFDTwo)=>{
            User.deleteFDTwoInUser(foundFDTwo).then((updatedUser)=>{
                fdTwo.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
            })
        })  
    }
    else if(grant == "[FD3] Support for Paper Presentations in Conferences"){
        fdThree.getFDThreeByID(id).then((foundFDThree)=>{
            User.deleteFDThreeInUser(foundFDThree).then((updatedUser)=>{
                fdThree.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
            })
        }) 
    }
    else if(grant == "[FD4] Support for Participation in Local Conferences"){
        fdFour.getFDFourByID(id).then((foundFDFour)=>{
            User.deleteFDFourInUser(foundFDFour).then((updatedUser)=>{
                fdFour.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
            })
        }) 
    }
    else if(grant == "[FD15] Incentive for Publication in Pre-Selected High Impact Journal"){
        fdFifteen.getFDFifteenByID(id).then((foundFDFifteen)=>{
            User.deleteFDFifteenInUser(foundFDFifteen).then((updatedUser)=>{
                fdFifteen.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
            })
        }) 
    }
    else if(grant == "[FD16] Support for Membership in Professional Organizations"){
        fdSixteen.getFDSixteenByID(id).then((foundFDSixteen)=>{
            User.deleteFDSixteenInUser(foundFDSixteen).then((updatedUser)=>{
                fdSixteen.delete(req.body.id).then((result) => {	
                    res.send(result)
                })
            })
        }) 
    }
    
})


module.exports = router

/**
 * Compares two values from the .hbs files for ease of
 *  display and acts like an if-else condition function
 *
 * @param {options} options.fn
 * @param {options} options.inverse
 */
hbs.registerHelper('checkstatus', function(p1, p2, options) { 
  if(p1 == p2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

/**
 * Gets all forms by Status
 *
 * @param {Callback function} callback
 */
function getAllForms(callback){
    
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
 * Gets all forms by Status
 *
 * @param {Filter} status
 * @param {Callback function} callback
 */
function filterAllFormsByStatus(status, callback){
    
    fdOne.getFDOneByStatus(status).then((fdOneData)=>{
        forms = fdOneData
        fdTwo.getFDTwoByStatus(status).then((fdTwoData)=>{
            forms = forms.concat(fdTwoData)
            fdThree.getFDThreeByStatus(status).then((fdThreeData)=>{
                forms = forms.concat(fdThreeData)
                fdFour.getFDFourByStatus(status).then((fdFourData)=>{
                    forms = forms.concat(fdFourData)
                    fdFifteen.getFDFifteenByStatus(status).then((fdFifteenData)=>{
                        forms = forms.concat(fdFifteenData)
                        fdSixteen.getFDSixteenByStatus(status).then((fdSixteenData)=>{
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
 * Gets all forms by Department
 *
 * @param {Filter} department
 * @param {Callback function} callback
 */
function filterAllFormsByDepartment(department, callback){
    
    fdOne.getFDOneByDepartment(department).then((fdOneData)=>{
        forms = fdOneData
        fdTwo.getFDTwoByDepartment(department).then((fdTwoData)=>{
            forms = forms.concat(fdTwoData)
            fdThree.getFDThreeByDepartment(department).then((fdThreeData)=>{
                forms = forms.concat(fdThreeData)
                fdFour.getFDFourByDepartment(department).then((fdFourData)=>{
                    forms = forms.concat(fdFourData)
                    fdFifteen.getFDFifteenByDepartment(department).then((fdFifteenData)=>{
                        forms = forms.concat(fdFifteenData)
                        fdSixteen.getFDSixteenByDepartment(department).then((fdSixteenData)=>{
                            forms = forms.concat(fdSixteenData)
                            callback(forms)
                        })
                    }) 
                })
            })
        })
    })
} 