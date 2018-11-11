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
    timestamp: { type: Date, default: Date.now },
    grantName : String,
    ownerIdNumber : String,
    grantStatus: String,
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
    participantFee : String, //MONEY
    noOfLocalConferencesAttendedThisYear : Number,
    dateIncentiveLastAvailed : Date
})

var fdFour = mongoose.model("fdFour", fdFourSchema)

/**
 * Creates FD4 record in FD4 Schema 
 *
 * @param {FD4 record to be created} paramFDOne
 */
exports.create = function(paramFDFour){
    return new Promise(function(resolve, reject){
        var f = new fdFour(paramFDFour)
        
        f.save().then((newFDFour)=>{
            resolve(newFDFour)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Deletes FD4 record in FD4 Schema 
 *
 * @param {ID of the record to be deleted} paramID
 */
exports.delete = function(paramID){
    return new Promise(function(resolve, reject){
        fdFour.deleteOne({
            _id : paramID
        }).then((deletedFDFour)=>{
            resolve(deletedFDFour)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Edits FD4 record in FD4 Schema 
 *
 * @param {FD4 record to be edited} paramFDOne
 */
exports.edit = function(paramFDFour){
    return new Promise(function(resolve, reject){
        fdFour.findOneAndUpdate({
            _id : paramFDFour._id
        }, paramFDFour).then((updatedFDFour)=>{
            resolve(updatedFDFour)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Approves FD4 record in FD4 Schema 
 *
 * @param {FD4 record to be approved} paramID
 */
exports.approveFDFour = function(paramID){
    return new Promise(function(resolve, reject){
        fdFour.findOneAndUpdate({
            _id : paramID
        }, {
            "$set" : {"grantStatus" : "Approve"}
        }).then((updatedFDFour)=>{
            resolve(updatedFDFour)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Rejects FD4 record in FD4 Schema 
 *
 * @param {FD4 record to be reject} paramID
 */
exports.rejectFDFour = function(paramID){
    return new Promise(function(resolve, reject){
        fdFour.findOneAndUpdate({
            _id : paramID
        }, {
            "$set" : {"grantStatus" : "Reject"}
        }).then((updatedFDFour)=>{
            resolve(updatedFDFour)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets one FD4 record in FD4 Schema 
 *
 * @param {FD4 record to get} paramFDOne
 */
exports.getFDFour = function(paramFDFour){
    return new Promise(function(resolve, reject){
        fdFour.findOne({
            _id : paramFDFour._id
        }).then((foundFDFour)=>{
            resolve(foundFDFour)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets one FD4 record in FD4 Schema by _id as the parameter
 *
 * @param {id to use} id
 */
exports.getFDFourByID = function(id){
    return new Promise(function(resolve, reject){
        fdFour.findOne({
            _id : id
        }).then((foundFDFour)=>{
            resolve(foundFDFour)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets all FD4 record in FD4 Schema 
 */
exports.getAllFDFour = function(){
    return new Promise(function(resolve, reject){
        fdFour.find().then((fdFourForms)=>{
            resolve(fdFourForms)
        }, (err)=>{
            reject(err)
        })
    })
}


/**
 * Gets FD4 record in FD4 Schema by department
 *
 * @param {Filtering department} paramFDOneDepartment
 */
exports.getFDFourByDepartment = function(paramFDFourDepartment){
    return new Promise(function(resolve, reject){
        fdFour.find({
            department : paramFDFourDepartment
        }).then((departmentFDFour)=>{
            resolve(departmentFDFour)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets FD4 record in FD4 Schema by status
 *
 * @param {Filtering status} paramFDOnestatus
 */
exports.getFDFourByStatus = function(paramFDFourStatus){
    return new Promise(function(resolve, reject){
        fdFour.find({
            grantStatus : paramFDFourStatus
        }).then((statusFDFour)=>{
            resolve(statusFDFour)
        }, (err)=>{
            reject(err)
        })
    })
}