/**
 * This controller is for logging in of users 
 * to the web application
 * October 14, 2018
 * @ver 1.0
 * @author Candace Mercado
 */

/**
 * Module dependencies.
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
const fdTwo = require("../models/fdTwo")
const fdThree = require("../models/fdThree")
const fdFour = require("../models/fdFour")
const fdFifteen = require("../models/fdFifteen")
const fdSixteen = require("../models/fdSixteen")
router.use("/faculty", require("./faculty"))
router.use("/admin", require("./admin"))

/**
 * Leads to the login page index.hbs
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/", function(req, res) {
	 console.log("GET /")
	 
	user = req.session.user
	if(user){
		if(user.userType == "Administrator")
			res.render("home-admin.hbs", {
				user
			})
		else if(user.userType == "Faculty")
			res.render("home-user.hbs", {
				user
			})
	} else {
		res.render("index.hbs")
	}
})

/**
 * Checks the database if user exists and logs in 
 * the user, lead to right page based on user type
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/home", (req, res)=>{
  console.log("POST /home")

  var idnumber = req.body.idnumber
  var password = req.body.password

/*  FOR ADDING USERS TO DB */
	// var today = new Date();
	// today.setHours(0, 0, 0, 0);

	//  var user = {
	//  	username: idnumber,
	//  	password, 
	//  	firstName: 'Juana', 
	//  	lastName: 'Dela Cruz', 
	//  	department: "ECE", 
	//  	userType: 'Faculty',
	// 		employmentType: 'Full-time',
	// 		rank: 'Asso. Prof 4',
	//  	status: "Permanent",
	//  	dateHired: today,
	//  }
	//  User.create(user).then((user)=>{
	//  	 console.log("User Registration Successful")
	//  	 console.log(user)
    
	//  }, (error)=>{
	//  		console.log("ERROR")
	//  		console.log(error)
	//  })
 
	let user = {
		username : idnumber,
		password 
	}

	User.authenticate(user).then((user)=>{
		if(user){
			currentUser = user
			req.session.user = user
			if(user.userType == "Administrator")
				res.render("home-admin.hbs", {
					user
				})
			else if(user.userType == "Faculty")
				var forms = getAllForms(forms, function(forms){
					res.render("my-requests.hbs", {
						user, forms
					})
				})
		} else {	
			res.render("index.hbs", {
				again: idnumber,
				error: "Incorrect Log in details. Try again."
			})	
		}
	})
})

/**
 * Leads the page to home depending on user type
 * after clicking the logo in menu bar
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/home", function(req, res){
	console.log("GET /home")

	user = req.session.user
	if (user){
		if(user.userType == "Administrator")
			res.render("home-admin.hbs", {
				user
			})
		else if(user.userType == "Faculty" )
			var forms = getAllForms(forms, function(forms){
				res.render("my-requests.hbs", {
					user, forms
				})
			})
	} else {
		res.redirect("/")
	}
})

/**
 * Logs the user out of the web application and 
 * redirects to the login page index.hbs
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/logout", function(req, res){
	console.log("GET /logout")

	if (req.session) {
		req.session.destroy((err) => {      
			if (err) {
				console.log(err)
			} 
		})
		currentUser = null
	}
		
	res.render("index.hbs", {
		loggedout: "You have successfully logged out."
	})	
})

module.exports = router

/**
 * Returns the current user object, this is to 
 * make user details reflect in handlebars
 *
 * @return {Object} currentUser
 */
exports.getCurrentUser = function() {
    return currentUser
}

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
  