/**
 * This contains schema initialization and 
 * model functions for the third form
 * October 19, 2018
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
    term : String, 
    startAY : Number,
    endAY : Number,
    nameOfFaculty : String, 
    department : String,
    rank : String,
    dateHired : Date,
    rank : String,
    status : Boolean, //true = full-time, false = part-time
    noOfUnitsTaught : int, //ONLY IF PART-TIME
    nameOfConference : String,
    typeOfConference : Boolean, //true = local, false = international
    titleOfPaperToBePresented : String,
    dateOfConference : Date,
    dateOfDeparture : Date,
    placeAndVenue : String,
    dateOfReturn : Date,
    dateOfReturnToWork : Date,
    travelAndConferenceSubsidy : float, //MONEY
    dateIncentiveLastAvailed : Date,
    //CHECK BOX
    applicationLetter : Boolean,
    copyOfAbstract : Boolean,
    proofOfConference : Boolean,
    proofofPaperAcceptance : Boolean,
    callForPapersOfConference : Boolean,
    copyOfInvitation : Boolean,
    updatedFacultyWebpage : Boolean
})

var fdThree = mongoose.model("fdThree", fdThreeSchema)