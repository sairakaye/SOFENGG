/**
 * Template only. Will be updated.
 */
const express = require("express")
const bodyparser = require("body-parser")
const urlencoder = bodyparser.urlencoded({
  extended : true
})
const router = express.Router()
router.use(urlencoder)
const app = express()

router.use("/user", require("./user"))

router.get("/", function(request, response) {
    console.log("GET /")
    response.render("index.hbs")
})

module.exports = router