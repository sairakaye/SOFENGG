/**
 * This contains schema initialization and 
 * model functions for the second form
 * October 12, 2018
 * @ver 1.0
 * @author Christian Dequito
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose");


/**
 * Setting up FD2 Form Schema
 */
var fdTwoSchema = mongoose.Schema({
    grantName : String,
    ownerIdNumber : String,
    dateSubmitted : Date,
    term : String, 
    startAY : Number,
    endAY : Number,
    firstName : String, 
    lastName: String,
    department : String,
    dateHired : Date,
    rank : String,
    status : Boolean, //true = permanent, false = probationary
    aveTeachingPerformance : String,
    nameOfConference : String, 
    titleOfPaperToBePresented : String,
    dateOfConference : Date,
    dateOfDeparture : Date,
    placeAndVenue : String,
    dateOfReturn : Date,
    dateOfReturnToWork : Date,
    dateIncentiveLastAvailed : Date,
    //CHECK BOX
    applicationLetter : Boolean,
    copyOfJournal : Boolean,
    proofOfAcceptance : Boolean,
    proofofPaperAcceptance : Boolean,
    callForPapersOfConference : Boolean,
    copyOfInvitation : Boolean,
    updatedFacultyWebpage : Boolean
})

var fdTwo = mongoose.model("fdTwo", fdTwoSchema)