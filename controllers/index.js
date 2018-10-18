/**
 * This controller is for logging in of users 
 * to the web application
 * October 14, 2018
 * @ver 1.0
 * @author Candace Mercado
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
router.use("/user", require("./user"))
router.use("/faculty", require("./faculty"))

router.get("/", function(request, response) {
     console.log("GET /")
     response.render("index.hbs")
})

router.post("/login", (req, res, next)=>{
  console.log("POST /user/login")

  var idnumber = req.body.idnumber
  var password = req.body.password

  	/* for adding to DB testing
	var today = new Date();
	today.setHours(0, 0, 0, 0);

	var user = {
		username: idnumber,
		password, 
		name: 'Candace Claire M. Mercado',
		department: "College of Computer Studies", 
		status: "Student",
		dateHired: today, 
		fdOneForms: null, 
		fdTwoForms: null
	}
	User.create(user).then((user)=>{
		 console.log("User Registration Successful")
		 console.log(user)
      
	}, (error)=>{
			console.log("ERROR")
			console.log(error)
	}) */
	      
	let user = {
		username : idnumber,
		password 
	}

	User.authenticate(user).then((user)=>{
		if(user){
			console.log("User Found")
			currentUser = user
			console.log(currentUser)
			if(user.userType == "Admin")
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

router.get("/logout", function(req, res){
	 console.log("GET Lead to home")
	 res.render("index.hbs")
})

module.exports = router

exports.getCurrentUser = function() {
    return currentUser
}