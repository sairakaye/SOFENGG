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
	 
     res.render("index.hbs")
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
	var today = new Date();
	today.setHours(0, 0, 0, 0);

//	var user = {
//		username: idnumber,
//		password, 
//		name: 'Candace Claire M. Mercado',
//		department: "College of Computer Studies", 
//		userType: "Faculty",
//		status: "Permanent",
//		dateHired: today, 
//		//fdOneForms: null, 
//		fdTwoForms: null
//	}
//	User.create(user).then((user)=>{
//		 console.log("User Registration Successful")
//		 console.log(user)
//      
//	}, (error)=>{
//			console.log("ERROR")
//			console.log(error)
//	})
 

	let user = {
		username : idnumber,
		password 
	}

	User.authenticate(user).then((user)=>{
		if(user){
			currentUser = user
			console.log("User Found")
			if(user.userType == "Administator")
				res.render("home-admin.hbs", {
					user
				})
			else if(user.userType == "Faculty" || user.userType == "Library Staff")
				res.render("home-user.hbs", {
					user
				})
		} else {			
			res.render("index.hbs", {
				error: "Incorrect ID Number / password. Try again."
			})
		}
	}, (error)=>{
		console.log(error)
		res.send(null)
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

	user = currentUser
	if(user.userType == "Administator")
		res.render("home-admin.hbs", {
			user
		})
	else if(user.userType == "Faculty" || user.userType == "Library Staff")
		res.render("home-user.hbs", {
			user
		})
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

	 res.render("index.hbs")
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