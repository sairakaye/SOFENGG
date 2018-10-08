/**
 * Template only. Will be updated.
 */
const express = require("express")
const router = express.Router()
const app = express()

router.get("/", function(request, response) {
    console.log("GET /")

    response.render("index.hbs")
})

module.exports = router