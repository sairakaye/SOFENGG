/**
 * This contains schema initialization and 
 * model functions for the first form
 * October 17, 2018
 * @ver 1.0
 * @author Christian Dequito
 */

const mongoose = require("mongoose");

var fdOneSchema = mongoose.Schema({
    grantName: String,
    ownerIdNumber : Number,
    term : String, 
    startAY : Number,
    endAY : Number,
    name : String, 
    department : String,
    dateHired : Date,
    rank : String,
    status : String,
    aveTeachingPerformance : String,
    titleOfPaperOrPublication : String,
    titleOfJournal : String, 
    datePaperSubmitted : Date,
    datePaperAccepted : Date,
    nameOfConference : String, 
    titleOfPaperToBePresented : String,
    dateOfConference : Date,
    dateOfDeparture : Date,
    placeAndVenue : String,
    dateOfReturn : Date,
    dateOfReturnToWork : Date,
    dateIncentiveLastAvailed : Date,
    grantStatus: String,
    
    //CHECK BOX
    applicationLetter : Boolean,
    copyOfJournal : Boolean,
    proofOfAcceptance : Boolean,
    proofOfPaperAcceptance : Boolean,
    callForPapersOfConference : Boolean,
    copyOfInvitation : Boolean,
    updatedFacultyWebpage : Boolean
})

var fdOne = mongoose.model("fdOne", fdOneSchema)

exports.create = function(paramFDOne){
    return new Promise(function(resolve, reject){
        var f = new fdOne(paramFDOne)
        
        f.save().then((newFDOne)=>{
            resolve(newFDOne)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.delete = function(paramID){
    return new Promise(function(resolve, reject){
        fdOne.remove({
            _id : paramID
        }).then((deletedFDOne)=>{
            resolve(deletedFDOne)
        }, (err)=>{
            reject(err)
        })
    })
}

//edit probably erroneous
exports.edit = function(paramFDOne){
    return new Promise(function(resolve, reject){
        fdOne.findOneAndUpdate({
            _id : paramFDOne._id
        }, paramFDOne).then((updatedFDOne)=>{
            resolve(updatedFDOne)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getFDOne = function(paramFDOne){
    return new Promise(function(resolve, reject){
        fdOne.findOne({
            _id : paramFDOne._id
        }).then((foundFDOne)=>{
            resolve(foundFDOne)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAllFDOne = function(){
    return new Promise(function(resolve, reject){
        fdOne.find().then((fdOneForms)=>{
            resolve(fdOneForms)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getFDOneByDepartment = function(paramFDOneDepartment){
    return new Promise(function(resolve, reject){
        fdOne.find({
            department : paramFDOneDepartment
        }).then((departmentFDOne)=>{
            resolve(departmentFDOne)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getFDOneByStatus = function(paramFDOneStatus){
    return new Promise(function(resolve, reject){
        fdOne.find({
            status : paramFDOneStatus
        }).then((statusFDOne)=>{
            resolve(statusFDOne)
        }, (err)=>{
            reject(err)
        })
    })
}

