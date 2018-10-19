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
var fdFourSchema = mongoose.Schema({
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
    nameOfConference : String, 
    dateOfConference : Date,
    dateOfDeparture : Date,
    placeAndVenue : String,
    dateOfReturn : Date,
    dateOfReturnToWork : Date,
    participantFee : float, //MONEY
    noOfLocalConferencesAttendedThisYear : int,
    dateIncentiveLastAvailed : Date,
    //CHECK BOX
    applicationLetter : Boolean,
    programOfConference : Boolean,
    copyOfInvitation : Boolean
})

var fdFour = mongoose.model("fdFour", fdFourSchema)