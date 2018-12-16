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
const Mailer = require("../models/mailer")
const Overview = require("../models/overview")
const fdOne = require("../models/fdOne")
const fdTwo = require("../models/fdTwo")
const fdThree = require("../models/fdThree")
const fdFour = require("../models/fdFour")
const fdFifteen = require("../models/fdFifteen")
const fdSixteen = require("../models/fdSixteen")
const Remark = require("../models/remark")
const Settings = require("../models/settings")
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
		if(user.userType == "Secretary")
            Overview.getAllOverview().then((totalArray)=>{
                res.render("home-admin.hbs", {
                    user, totalArray
                })
            }, (err)=>{
                res.send(err)
            })
		else if(user.userType == "Faculty")
			var forms = getAllForms(forms, function(forms){
				res.redirect("/faculty/my-requests")
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
//	 var today = new Date();
//	 today.setHours(0, 0, 0, 0);
//
//	  var user = {
//	  	username: idnumber,
//	  	password, 
//          salutation : "Ms.",
//	  	firstName: 'Juana', 
//          middleName : 'M.',
//	  	lastName: 'Dela Cruz', 
//	  	department: "ECE", 
//        college : "CCS",
//        emailAddress : "christian_dequito@dlsu.edu.ph",
//	  	userType: 'Faculty', //or Secretary
//	 	employmentType: 'Full-time',
//	 	rank: 'Asso. Prof 4',
//	  	status: "Permanent",
//          notification : "",
//	 	aveTeachingPerformance : 3.8,
//	  	dateHired: today,
//	  }
//	  User.create(user).then((user)=>{
//	  	 console.log("User Registration Successful")
//	  	 console.log(user)
//    
//	  }, (error)=>{
//	  		console.log("ERROR")
//	  		console.log(error)
//	  })
/*  FOR ADDING MAILER TO DB */
//	  var mailer = {
//	  	emailAddress: "ovca.dlsu@gmail.com",
//	  	password : "DLSU1234!"
//	  }
//	  Mailer.create(mailer).then((newMailer)=>{
//	  	 console.log(user)
//    
//	  }, (error)=>{
//	  		console.log(error)
//	  })
/*  FOR ADDING Overviews TO DB */
//	  var CCS = {
//	  	collegeName: "CCS",
//        fdOneTotal : 0,
//        fdTwoTotal : 0,
//        fdThreeTotal : 0,
//        fdFourTotal : 0,
//        fdFifteenTotal : 0,
//        fdSixteenTotal : 0,
//        Total : 0
//	  }
//      var CED = {
//	  	collegeName: "BAGCED",
//        fdOneTotal : 0,
//        fdTwoTotal : 0,
//        fdThreeTotal : 0,
//        fdFourTotal : 0,
//        fdFifteenTotal : 0,
//        fdSixteenTotal : 0,
//        Total : 0
//	  }
//      var CLA = {
//	  	collegeName: "CLA",
//        fdOneTotal : 0,
//        fdTwoTotal : 0,
//        fdThreeTotal : 0,
//        fdFourTotal : 0,
//        fdFifteenTotal : 0,
//        fdSixteenTotal : 0,
//        Total : 0
//	  }
//      var COB = {
//	  	collegeName: "RVRCOB",
//        fdOneTotal : 0,
//        fdTwoTotal : 0,
//        fdThreeTotal : 0,
//        fdFourTotal : 0,
//        fdFifteenTotal : 0,
//        fdSixteenTotal : 0,
//        Total : 0
//	  }
//      var COE = {
//	  	collegeName: "GCOE",
//        fdOneTotal : 0,
//        fdTwoTotal : 0,
//        fdThreeTotal : 0,
//        fdFourTotal : 0,
//        fdFifteenTotal : 0,
//        fdSixteenTotal : 0,
//        Total : 0
//	  }
//      var COL = {
//	  	collegeName: "COL",
//        fdOneTotal : 0,
//        fdTwoTotal : 0,
//        fdThreeTotal : 0,
//        fdFourTotal : 0,
//        fdFifteenTotal : 0,
//        fdSixteenTotal : 0,
//        Total : 0
//	  }
//      var COS = {
//	  	collegeName: "COS",
//        fdOneTotal : 0,
//        fdTwoTotal : 0,
//        fdThreeTotal : 0,
//        fdFourTotal : 0,
//        fdFifteenTotal : 0,
//        fdSixteenTotal : 0,
//        Total : 0
//	  }
//      var SOE = {
//	  	collegeName: "SOE",
//        fdOneTotal : 0,
//        fdTwoTotal : 0,
//        fdThreeTotal : 0,
//        fdFourTotal : 0,
//        fdFifteenTotal : 0,
//        fdSixteenTotal : 0,
//        Total : 0
//	  }
//      var Total = {
//	  	collegeName: "Total",
//        fdOneTotal : 0,
//        fdTwoTotal : 0,
//        fdThreeTotal : 0,
//        fdFourTotal : 0,
//        fdFifteenTotal : 0,
//        fdSixteenTotal : 0,
//        Total : 0
//	  }
//      
//      Overview.create(CCS).then((newOverview)=>{
//          console.log(newOverview)
//          Overview.create(CED).then((newOverview)=>{
//              console.log(newOverview)
//              Overview.create(CLA).then((newOverview)=>{
//                  console.log(newOverview)
//                  Overview.create(COB).then((newOverview)=>{
//                      console.log(newOverview)
//                      Overview.create(COE).then((newOverview)=>{
//                          console.log(newOverview)
//                          Overview.create(COL).then((newOverview)=>{
//                              console.log(newOverview)
//                              Overview.create(COS).then((newOverview)=>{
//                                  console.log(newOverview)
//                                  Overview.create(SOE).then((newOverview)=>{
//                                      console.log(newOverview)
//                                      Overview.create(Total).then((newOverview)=>{
//                                          console.log(newOverview)
//                                          
//                                      }, (error)=>{
//                                          console.log(error)
//                                      })
//                                  }, (error)=>{
//                                      console.log(error)
//                                  })
//                              }, (error)=>{
//                                  console.log(error)
//                              })
//                          }, (error)=>{
//                              console.log(error)
//                          })
//                      }, (error)=>{
//                          console.log(error)
//                      })
//                  }, (error)=>{
//                      console.log(error)
//                  })
//              }, (error)=>{
//                  console.log(error)
//              })
//          }, (error)=>{
//              console.log(error)
//          })
//      }, (error)=>{
//          console.log(error)
//      })

/** FOR THE SETTINGS */
  // var settings = {
  //     term : "1st",
  //     startAY : 2018,
  //     endAY : 2019
  // }

  // Settings.create(settings).then((newSettings)=> {
  //   console.log("Setting is created!")
  // })

  let user = {
      username : idnumber,
      password 
  }
  
  User.authenticate(user).then((user)=>{
      if(user){
          req.session.user = user
          if(user.userType == "Secretary"){
              Overview.getAllOverview().then((totalArray)=>{
                  res.render("home-admin.hbs", {
                      user, totalArray
                  })
              }, (err)=>{
                  res.send(err)
              })
          }
          else if(user.userType == "Faculty"){
              var forms = getAllForms(forms, function(forms){
                  res.redirect("/faculty/my-requests")
              })
              }
          
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
        if(user.userType == "Secretary")
            Overview.getAllOverview().then((totalArray)=>{
                console.log(totalArray)
                res.render("home-admin.hbs", {
                    user, totalArray
                })
            }, (err)=>{
                res.send(err)
            })
        
        else if(user.userType == "Faculty")
            var forms = getAllForms(forms, function(forms){
                res.redirect("/faculty/my-requests")
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

    user = req.session.user
    if (user) {
        req.session.destroy((err) => {      
			if (err) {
				console.log(err)
            } 
            res.render("index.hbs", {
                loggedout: "You have successfully logged out."
            })
        })
	} else {
        res.redirect("/")
    }
})

module.exports = router

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
  