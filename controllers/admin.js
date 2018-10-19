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
const controllerUser = require("./index")

/**
 * Leads to the page for requesting grants 
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/overview", function(req, res){
  console.log("GET /overview")
  
	res.render("home.hbs")
})

/**
 * Leads to the page for requesting grants 
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/view-grants", function(req, res){
  console.log("GET /view-grants")
  
  var user = controllerUser.getCurrentUser() 
  fdOne.getAllFDOne().then((fdOneData)=>{
    forms = fdOneData
    res.render("view-grants.hbs", {
       user, forms
    })
  })

})

router.get("/filterApproved", function(req, res){
  console.log("GET /filterApproved")

  var user = controllerUser.getCurrentUser() 
  fdOne.getFDOneByStatus('Approved').then((fdOneData)=>{
    forms = fdOneData
    res.render("view-grants.hbs", {
       user, forms
    })
  })
})

router.get("/filterPending", function(req, res){
  console.log("GET /filterPending")

  var user = controllerUser.getCurrentUser() 
  fdOne.getFDOneByStatus('Pending').then((fdOneData)=>{
    forms = fdOneData
    res.render("view-grants.hbs", {
       user, forms
    })
  })
})

router.get("/filterRejected", function(req, res){
  console.log("GET /filterRejected")

  var user = controllerUser.getCurrentUser() 
  fdOne.getFDOneByStatus('Rejected').then((fdOneData)=>{
    forms = fdOneData
    res.render("view-grants.hbs", {
       user, forms
    })
  })
})

router.post("/searchName", function(req, res){
  console.log("POST /searchName")

  var searchName = req.body.search
  var fullName = searchName.split(" ");
  var firstName =fullName[0];
  var lastName = fullName[1];

  console.log(firstName)
  console.log(lastName)
  var user = controllerUser.getCurrentUser() 
  User.getFDOneFormsByFullName(firstName, lastName).then((fdOneData)=>{
    console.log(fdOneData)
    forms = fdOneData
    res.render("view-grants.hbs", {
       user, forms
    })
  })
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