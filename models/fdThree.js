/**
 * This contains schema initialization and 
 * model functions for the third form
 * October 17, 2018
 * @ver 1.0
 * @author Christian Dequito
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose");


/**
 * Setting up FD3 Form Schema
 */
var fdThreeSchema = mongoose.Schema({
    grantName : String,
    ownerIdNumber : String,
    dateSubmitted : Date,
    nameOfFaculty : String, 
    department : String,
    rank : String,
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

var fdThree = mongoose.model("fdThree", fdTwoSchema)