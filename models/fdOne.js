/**
 * This contains schema initialization and 
 * model functions for the first form
 * October 17, 2018
 * @ver 1.0
 * @author Christian Dequito
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose");


/**
 * Setting up FD1 Form Schema
 */
var fdOneSchema = mongoose.Schema({
    grantName: String,
    ownerIdNumber : String,
    dateSubmitted : Date,
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


/**
 * Creates FD1 record in FD1 Schema 
 *
 * @param {FD1 record to be created} paramFDOne
 */
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

/**
 * Deletes FD1 record in FD1 Schema 
 *
 * @param {ID of the record to be deleted} paramID
 */
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

/**
 * Edits FD1 record in FD1 Schema 
 *
 * @param {FD1 record to be edited} paramFDOne
 */
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

/**
 * Gets one FD1 record in FD1 Schema 
 *
 * @param {FD1 record to get} paramFDOne
 */
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

/**
 * Gets all FD1 record in FD1 Schema 
 */
exports.getAllFDOne = function(){
    return new Promise(function(resolve, reject){
        fdOne.find().then((fdOneForms)=>{
            resolve(fdOneForms)
        }, (err)=>{
            reject(err)
        })
    })
}


/**
 * Gets FD1 record in FD1 Schema by department
 *
 * @param {Filtering department} paramFDOneDepartment
 */
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


/**
 * Gets FD1 record in FD1 Schema by status
 *
 * @param {Filtering status} paramFDOnestatus
 */
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

