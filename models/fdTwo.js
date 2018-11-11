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
    timestamp: { type: Date, default: Date.now },
    grantName : String,
    ownerIdNumber : String,
    grantStatus : String,
    term : String, 
    startAY : Number,
    endAY : Number,
    firstName : String, 
    lastName: String,
    department : String,
    dateHired : Date,
    rank : String,
    status : String, //true = permanent, false = probationary
    aveTeachingPerformance : String,
    nameOfConference : String, 
    titleOfPaperToBePresented : String,
    dateOfConference : Date,
    dateOfDeparture : Date,
    placeAndVenue : String,
    dateOfReturn : Date,
    dateOfReturnToWork : Date,
    dateIncentiveLastAvailed : Date
})

var fdTwo = mongoose.model("fdTwo", fdTwoSchema)

/**
 * Creates FD1 record in FD1 Schema 
 *
 * @param {FD1 record to be created} paramFDOne
 */
exports.create = function(paramFDTwo){
    return new Promise(function(resolve, reject){
        var f = new fdTwo(paramFDTwo)
        
        f.save().then((newFDTwo)=>{
            resolve(newFDTwo)
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
        fdTwo.deleteOne({
            _id : paramID
        }).then((deletedFDTwo)=>{
            resolve(deletedFDTwo)
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
exports.edit = function(paramFDTwo){
    return new Promise(function(resolve, reject){
        fdTwo.findOneAndUpdate({
            _id : paramFDTwo._id
        }, paramFDTwo).then((updatedFDTwo)=>{
            resolve(updatedFDTwo)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Approves FD2 record in FD2 Schema 
 *
 * @param {FD2 record to be approved} paramID
 */
exports.approveFDTwo = function(paramID){
    return new Promise(function(resolve, reject){
        fdTwo.findOneAndUpdate({
            _id : paramID
        }, {
            "$set" : {"grantStatus" : "Approve"}
        }).then((updatedFDTwo)=>{
            resolve(updatedFDTwo)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Rejects FD2 record in FD2 Schema 
 *
 * @param {FD2 record to be reject} paramID
 */
exports.rejectFDTwo = function(paramID){
    return new Promise(function(resolve, reject){
        fdTwo.findOneAndUpdate({
            _id : paramID
        }, {
            "$set" : {"grantStatus" : "Reject"}
        }).then((updatedFDTwo)=>{
            resolve(updatedFDTwo)
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
exports.getFDTwo = function(paramFDTwo){
    return new Promise(function(resolve, reject){
        fdTwo.findOne({
            _id : paramFDTwo._id
        }).then((foundFDTwo)=>{
            resolve(foundFDTwo)
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
exports.getFDTwoByID = function(id){
    return new Promise(function(resolve, reject){
        fdTwo.findOne({
            _id : id
        }).then((foundFDTwo)=>{
            resolve(foundFDTwo)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets all FD1 record in FD1 Schema 
 */
exports.getAllFDTwo = function(){
    return new Promise(function(resolve, reject){
        fdTwo.find().then((fdTwoForms)=>{
            resolve(fdTwoForms)
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
exports.getFDTwoByDepartment = function(paramFDTwoDepartment){
    return new Promise(function(resolve, reject){
        fdTwo.find({
            department : paramFDTwoDepartment
        }).then((departmentFDTwo)=>{
            resolve(departmentFDTwo)
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
exports.getFDTwoByStatus = function(paramFDTwoStatus){
    return new Promise(function(resolve, reject){
        fdTwo.find({
            grantStatus : paramFDTwoStatus
        }).then((statusFDTwo)=>{
            resolve(statusFDTwo)
        }, (err)=>{
            reject(err)
        })
    })
}