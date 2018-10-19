/**
 * This contains schema initialization and 
 * model functions for the fourth form
 * October 19, 2018
 * @ver 1.0
 * @author Christian Dequito
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose");


/**
 * Setting up FD4 Form Schema
 */
var fdFifteenSchema = mongoose.Schema({
    grantName : String,
    ownerIdNumber : String,
    dateSubmitted : Date,
    term : String, 
    startAY : Number,
    endAY : Number,
    firstName : String, 
    lastName: String,
    department : String,
    rank : String,
    hostInstitution : String,
    titleOfSeminar : String,
    place : String,
    startTime : Date,
    endTime : Date,
    dateIncentiveLastAvailed : Date,
    participantFee : float, //MONEY
    //CHECK BOX
    applicationLetter : Boolean,
    copyOfAcceptance : Boolean
})

var fdFifteen = mongoose.model("fdFifteen", fdFifteenSchema)