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
    grantStatus: String,
    term : String, 
    startAY : Number,
    endAY : Number,
    nameOfFaculty : String, 
    department : String,
    rank : String,
    dateHired : Date,
    rank : String,
    status : String,
    noOfUnitsTaught : Number, //ONLY IF PART-TIME
    nameOfConference : String,
    typeOfConference : String,
    titleOfPaperToBePresented : String,
    dateOfConference : Date,
    dateOfDeparture : Date,
    placeAndVenue : String,
    dateOfReturn : Date,
    dateOfReturnToWork : Date,
    travelAndConferenceSubsidy : Number, //MONEY
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

/**
 * Creates FD1 record in FD1 Schema 
 *
 * @param {FD1 record to be created} paramFDOne
 */
exports.create = function(paramFDThree){
    return new Promise(function(resolve, reject){
        var f = new fdThree(paramFDThree)
        
        f.save().then((newFDThree)=>{
            resolve(newFDThree)
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
        fdThree.deleteOne({
            _id : paramID
        }).then((deletedFDThree)=>{
            resolve(deletedFDThree)
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
exports.edit = function(paramFDThree){
    return new Promise(function(resolve, reject){
        fdThree.findOneAndUpdate({
            _id : paramFDThree._id
        }, paramFDThree).then((updatedFDThree)=>{
            resolve(updatedFDThree)
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
exports.getFDThree = function(paramFDThree){
    return new Promise(function(resolve, reject){
        fdThree.findOne({
            _id : paramFDThree._id
        }).then((foundFDThree)=>{
            resolve(foundFDThree)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets one FD1 record in FD1 Schema by _id as the parameter
 *
 * @param {id to use} id
 */
exports.getFDThreeByID = function(id){
    return new Promise(function(resolve, reject){
        fdThree.findOne({
            _id : id
        }).then((foundFDThree)=>{
            resolve(foundFDThree)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets all FD1 record in FD1 Schema 
 */
exports.getAllFDThree = function(){
    return new Promise(function(resolve, reject){
        fdThree.find().then((fdThreeForms)=>{
            resolve(fdThreeForms)
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
exports.getFDThreeByDepartment = function(paramFDThreeDepartment){
    return new Promise(function(resolve, reject){
        fdThree.find({
            department : paramFDThreeDepartment
        }).then((departmentFDThree)=>{
            resolve(departmentFDThree)
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
exports.getFDThreeByStatus = function(paramFDThreeStatus){
    return new Promise(function(resolve, reject){
        fdThree.find({
            grantStatus : paramFDThreeStatus
        }).then((statusFDThree)=>{
            resolve(statusFDThree)
        }, (err)=>{
            reject(err)
        })
    })
}