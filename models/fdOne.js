const mongoose = "mongoose"

var fdOneSchema = mongoose.Schema({
    term : String, 
    startAY : int,
    endAY : int,
    name : String, 
    department : String,
    dateHired : Date,
    rank : String,
    status : Boolean, //true = permanent, false = probationary
    aveTeachingPerformance : String,
    titleOfPaper : String,
    titleOfJournal : String, 
    datePaperSubmitted : Date,
    datePaperAccepted : Date,
    nameOfConference : String, 
    titleOfPaperToBePresented : String,
    dateOfConference : Date,
    dateOfDeparture : Date,
    place : String,
    dateOfReturn : Date,
    dateOfReturnToWork : Date,
    dateIncentiveLastAvailed : Date,
    //CHECK BOX INCOMPLETE
    applicationLetter : Boolean,
    
})