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
var forms

/**
 * Leads to the page for requesting grants 
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/view-grants", function(req, res){
    console.log("GET /view-grants")
    
    var user = req.session.user
    if(user){
        forms = getAllForms(function(forms){
            res.render("view-grants.hbs", {
                user, forms
            })
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Filters all Approved Forms
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterApproved", function(req, res){
    console.log("GET /filterApproved")

    var user = req.session.user
    if(user){
        var statusFilter = 'Approved'
        var forms = filterAllFormsByStatus(statusFilter, function(forms){
            if (forms == ""){
                res.render("view-grants.hbs", {
                    user, statusFilter, noforms: "There are no matches found"
                })
            } else {
                res.render("view-grants.hbs", {
                    user, forms, statusFilter
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Filters all Pending Forms
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterPending", function(req, res){
    console.log("GET /filterPending")

    var user = req.session.user
    if(user){
        var statusFilter = 'Pending'
        var forms = filterAllFormsByStatus(statusFilter, function(forms){
            if (forms == ""){
                res.render("view-grants.hbs", {
                    user, statusFilter, noforms: "There are no matches found"
                })
            } else {
                res.render("view-grants.hbs", {
                    user, forms, statusFilter
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Filters all Rejected Forms
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterRejected", function(req, res){
    console.log("GET /filterRejected")

    var user = req.session.user
    if(user){
        var statusFilter = 'Rejected'
        var forms = filterAllFormsByStatus(statusFilter, function(forms){
            if (forms == ""){
                res.render("view-grants.hbs", {
                    user, statusFilter, noforms: "There are no matches found"
                })
            } else {
                res.render("view-grants.hbs", {
                    user, forms, statusFilter
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Filters all CED Departments
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterCED", function(req, res){
  console.log("GET /filterCED")

    var user = req.session.user
    if(user){
        var departmentFilter = 'College of Education'
        var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
            if (forms == ""){
                res.render("view-grants.hbs", {
                    user, departmentFilter, noforms: "There are no matches found"
                })
            } else {
                res.render("view-grants.hbs", {
                    user, forms, departmentFilter
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Filters all CCS Departments
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterCCS", function(req, res){
  console.log("GET /filterCCS")

    var user = req.session.user
    if(user){
        var departmentFilter = 'College of Computer Studies'
        var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
            if (forms == ""){
                res.render("view-grants.hbs", {
                    user, departmentFilter, noforms: "There are no matches found"
                })
            } else {
                res.render("view-grants.hbs", {
                    user, forms, departmentFilter
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Filters all COL Departments
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterCOL", function(req, res){
    console.log("GET /filterCOL")

    var user = req.session.user
    if(user){
        var departmentFilter = 'College of Law'
        var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
            if (forms == ""){
                res.render("view-grants.hbs", {
                    user, departmentFilter, noforms: "There are no matches found"
                })
            } else {
                res.render("view-grants.hbs", {
                    user, forms, departmentFilter
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Filters all CLA Departments
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterCLA", function(req, res){
  console.log("GET /filterCLA")

  var user = req.session.user
  if(user){
      var departmentFilter = 'College of Liberal Arts'
      var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
        if (forms == ""){
            res.render("view-grants.hbs", {
                user, departmentFilter, noforms: "There are no matches found"
            })
        } else {
            res.render("view-grants.hbs", {
                user, forms, departmentFilter
            })
        }
      })
  } else {
    res.redirect("/")
  }
})

/**
 * Filters all COS Departments
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterCOS", function(req, res){
  console.log("GET /filterCOS")

    var user = req.session.user
    if(user){
        var departmentFilter = 'College of Science'
        var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
            if (forms == ""){
                res.render("view-grants.hbs", {
                    user, departmentFilter, noforms: "There are no matches found"
                })
            } else {
                res.render("view-grants.hbs", {
                    user, forms, departmentFilter
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Filters all COE Departments
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterCOE", function(req, res){
  console.log("GET /filterCOE")

  var user = req.session.user
  if(user){
      var departmentFilter = 'College of Engineering'
      var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
        if (forms == ""){
            res.render("view-grants.hbs", {
                user, departmentFilter, noforms: "There are no matches found"
            })
        } else {
            res.render("view-grants.hbs", {
                user, forms, departmentFilter
            })
        }
      })
  } else {
    res.redirect("/")
  }
})

/**
 * Filters all COB Departments
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterCOB", function(req, res){
  console.log("GET /filterCOB")

  var user = req.session.user
  if(user){
      var departmentFilter = 'College of Business'
      var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
        if (forms == ""){
            res.render("view-grants.hbs", {
                user, departmentFilter, noforms: "There are no matches found"
            })
        } else {
          res.render("view-grants.hbs", {
              user, forms, departmentFilter
          })
        }
      })
  } else {
    res.redirect("/")
  }
})

/**
 * Filters all SOE Departments
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterSOE", function(req, res){
   console.log("GET /filterSOE")

    var user = req.session.user
    if(user){
        var departmentFilter = 'School of Economics'
        var forms = filterAllFormsByDepartment(departmentFilter, function(forms){
            if (forms == ""){
                res.render("view-grants.hbs", {
                    user, departmentFilter, noforms: "There are no matches found"
                })
            } else {
                res.render("view-grants.hbs", {
                    user, forms, departmentFilter
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Filters all FD1 Forms
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterFD1", function(req, res){
    console.log("GET /filterFD1")

    var user = req.session.user
    if(user){
        var formFilter = 'FD1'
        fdOne.getAllFDOne().then((forms)=>{
            if (forms == ""){
                res.render("view-grants.hbs", {
                    user, formFilter, noforms: "There are no matches found"
                })
            } else {
                res.render("view-grants.hbs", {
                    user, forms, formFilter
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Filters all FD2 Forms
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterFD2", function(req, res){
  console.log("GET /filterFD2")

  var user = req.session.user
  if(user){
      var formFilter = 'FD2'
      fdTwo.getAllFDTwo().then((forms)=>{
        if (forms == ""){
            res.render("view-grants.hbs", {
                user, formFilter, noforms: "There are no matches found"
            })
        } else {
            res.render("view-grants.hbs", {
                user, forms, formFilter
            })
        }
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Filters all FD3 Forms
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterFD3", function(req, res){
  console.log("GET /filterFD3")

  var user = req.session.user
  if(user){
      var formFilter = 'FD3'
      fdThree.getAllFDThree().then((forms)=>{
        if (forms == ""){
            res.render("view-grants.hbs", {
                user, formFilter, noforms: "There are no matches found"
            })
        } else {
            res.render("view-grants.hbs", {
                user, forms, formFilter
            })
        }
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Filters all FD4 Forms
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterFD4", function(req, res){
  console.log("GET /filterFD4")

  var user = req.session.user
  if(user){
      var formFilter = 'FD4'
      fdFour.getAllFDFour().then((forms)=>{
        if (forms == ""){
            res.render("view-grants.hbs", {
                user, formFilter, noforms: "There are no matches found"
            })
        } else {
            res.render("view-grants.hbs", {
                user, forms, formFilter
            })
        }
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Filters all FD15 Forms
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterFD15", function(req, res){
  console.log("GET /filterFD15")

  var user = req.session.user
  if(user){
      var formFilter = 'FD15'
      fdFifteen.getAllFDFifteen().then((forms)=>{
        if (forms == ""){
            res.render("view-grants.hbs", {
                user, formFilter, noforms: "There are no matches found"
            })
        } else {
            res.render("view-grants.hbs", {
                user, forms, formFilter
            })
        }
    })
  } else {
    res.redirect("/")
  }
})

/**
 * Filters all FD16 Forms
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/filterFD16", function(req, res){
  console.log("GET /filterFD16")

  var user = req.session.user
  if(user){
      var formFilter = 'FD16'
      fdSixteen.getAllFDSixteen().then((forms)=>{
        if (forms == ""){
            res.render("view-grants.hbs", {
                user, formFilter, noforms: "There are no matches found"
            })
        } else {
            res.render("view-grants.hbs", {
                user, forms, formFilter
            })
        }
    })
  } else {
      res.redirect("/")
  }
})

/**
 * Searches the users by name
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/searchName", function(req, res){
    console.log("POST /searchName")
    
    var firstName =req.body.firstNameSearch
    var lastName = req.body.lastNameSearch
    
    firstName = firstName.toLowerCase().split(' ');
    for (var i = 0; i < firstName.length; i++) {
        firstName[i] = firstName[i].charAt(0).toUpperCase() + firstName[i].slice(1); 
    }
    firstName =  firstName.join(' ');
    
    lastName = lastName.toLowerCase().split(' ');
    for (var i = 0; i < lastName.length; i++) {
        lastName[i] = lastName[i].charAt(0).toUpperCase() + lastName[i].slice(1); 
    }
    lastName =  lastName.join(' ');

    var user = req.session.user
    
    if(firstName != "" && lastName != ""){ 
        var forms = filterAllFormsByFullName(firstName, lastName, function(forms){
            if(forms != null && user){
                res.render("view-grants.hbs", {
                    user, forms
                })
            }else if (forms == null) {
                fdOne.getAllFDOne().then((fdOneData)=>{
                    forms = fdOneData
                    res.render("view-grants.hbs", {
                        user, forms,
                        error : "Name not found"
                    })
                })
            } else {
                res.redirect("/")
            }
        })
        
    } else if(firstName != ""){ 
        var forms = filterAllFormsByFirstName(firstName, function(forms){
            if(forms != null && user){
                res.render("view-grants.hbs", {
                    user, forms
                })
            }else if (forms == null){
                fdOne.getAllFDOne().then((fdOneData)=>{
                    forms = fdOneData
                    res.render("view-grants.hbs", {
                        user, forms,
                        error : "Name not found"
                    })
                })
            } else {
                res.redirect("/")
            }
        })
        
    } else if(lastName != ""){
        var forms = filterAllFormsByLastName(lastName, function(forms){
            if(forms != null && user){
                res.render("view-grants.hbs", {
                    user, forms
                })
            }else if (forms == null) {
                fdOne.getAllFDOne().then((fdOneData)=>{
                    forms = fdOneData
                    res.render("view-grants.hbs", {
                        user, forms,
                        error : "Name not found"
                    })
                })
            } else {
                res.redirect("/")
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
 * Gets all forms
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

/**
 * Gets all forms by First Name
 *
 * @param {Filter} firstName
 * @param {Callback function} callback
 */
function filterAllFormsByFirstName(firstName, callback){
    
    User.getFDOneFormsByFirstName(firstName).then((fdOneData)=>{
        forms = fdOneData
        User.getFDTwoFormsByFirstName(firstName).then((fdTwoData)=>{
            forms = forms.concat(fdTwoData)
            User.getFDThreeFormsByFirstName(firstName).then((fdThreeData)=>{
                forms = forms.concat(fdThreeData)
                User.getFDFourFormsByFirstName(firstName).then((fdFourData)=>{
                    forms = forms.concat(fdFourData)
                    User.getFDFifteenFormsByFirstName(firstName).then((fdFifteenData)=>{
                        forms = forms.concat(fdFifteenData)
                        User.getFDSixteenFormsByFirstName(firstName).then((fdSixteenData)=>{
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
 * Gets all forms by Last Name
 *
 * @param {Filter} lastName
 * @param {Callback function} callback
 */
function filterAllFormsByLastName(lastName, callback){
    
    User.getFDOneFormsByLastName(lastName).then((fdOneData)=>{
        forms = fdOneData
        User.getFDTwoFormsByLastName(lastName).then((fdTwoData)=>{
            forms = forms.concat(fdTwoData)
            User.getFDThreeFormsByLastName(lastName).then((fdThreeData)=>{
                forms = forms.concat(fdThreeData)
                User.getFDFourFormsByLastName(lastName).then((fdFourData)=>{
                    forms = forms.concat(fdFourData)
                    User.getFDFifteenFormsByLastName(lastName).then((fdFifteenData)=>{
                        forms = forms.concat(fdFifteenData)
                        User.getFDSixteenFormsByLastName(lastName).then((fdSixteenData)=>{
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
 * Gets all forms by Full Name
 *
 * @param {Filter} fullName
 * @param {Callback function} callback
 */
function filterAllFormsByFullName(firstName, lastName, callback){
    
    User.getFDOneFormsByFullName(firstName, lastName).then((fdOneData)=>{
        forms = fdOneData
        User.getFDTwoFormsByFullName(firstName, lastName).then((fdTwoData)=>{
            forms = forms.concat(fdTwoData)
            User.getFDThreeFormsByFullName(firstName, lastName).then((fdThreeData)=>{
                forms = forms.concat(fdThreeData)
                User.getFDFourFormsByFullName(firstName, lastName).then((fdFourData)=>{
                    forms = forms.concat(fdFourData)
                    User.getFDFifteenFormsByFullName(firstName, lastName).then((fdFifteenData)=>{
                        forms = forms.concat(fdFifteenData)
                        User.getFDSixteenFormsByFullName(firstName, lastName).then((fdSixteenData)=>{
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
  