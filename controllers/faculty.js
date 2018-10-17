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
router.use("/user", require("./user"))

router.get("/request-grant", function(req, res){
	 console.log("GET /request-grant")
	 res.render("request-grant.hbs")
})

router.post("/submit", urlencoder, function(req,res) {
    var firstName = req.body
    console.log(test)

    if (test == null)
        console.log("mamamo")
})

module.exports = router