/**
 * This contains schema initialization and 
 * model functions for the second form
 * October 17, 2018
 * @ver 1.0
 * @author Christian Dequito
 */

const mongoose = require("mongoose");

var fdTwoSchema = mongoose.Schema({
    ownerUsername : String,
    term : String, 
    startAY : Number,
    endAY : Number,
    name : String, 
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