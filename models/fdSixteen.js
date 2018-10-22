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
var fdSixteenSchema = mongoose.Schema({
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
    status : String, //True = Permanent, False = Probationary
    nameOfOrganization : String,
    typeOfMembershipPlace : String, //true = local, false = international
    typeofMembershipDuration : String, //true = annual, false = lifetime
    membershipDate : Date,
    coverage : String,
    membershipFee : Number,
    checkPayableTo : String,
    participantFee : Number, //MONEY
})

var fdSixteen = mongoose.model("fdSixteen", fdSixteenSchema)

/**
 * Creates FD16 record in FD16 Schema 
 *
 * @param {FD16 record to be created} paramFDOne
 */
exports.create = function(paramFDSixteen){
    return new Promise(function(resolve, reject){
        var f = new fdSixteen(paramFDSixteen)
        
        f.save().then((newFDSixteen)=>{
            resolve(newFDSixteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Deletes FD16 record in FD16 Schema 
 *
 * @param {ID of the record to be deleted} paramID
 */
exports.delete = function(paramID){
    return new Promise(function(resolve, reject){
        fdSixteen.deleteOne({
            _id : paramID
        }).then((deletedFDSixteen)=>{
            resolve(deletedFDSixteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Edits FD16 record in FD16 Schema 
 *
 * @param {FD16 record to be edited} paramFDOne
 */
exports.edit = function(paramFDSixteen){
    return new Promise(function(resolve, reject){
        fdSixteen.findOneAndUpdate({
            _id : paramFDSixteen._id
        }, paramFDSixteen).then((updatedFDSixteen)=>{
            resolve(updatedFDSixteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets one FD16 record in FD16 Schema 
 *
 * @param {FD16 record to get} paramFDOne
 */
exports.getFDSixteen = function(paramFDSixteen){
    return new Promise(function(resolve, reject){
        fdSixteen.findOne({
            _id : paramFDSixteen._id
        }).then((foundFDSixteen)=>{
            resolve(foundFDSixteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets one FD16 record in FD16 Schema by _id as the parameter
 *
 * @param {id to use} id
 */
exports.getFDSixteenByID = function(id){
    return new Promise(function(resolve, reject){
        fdSixteen.findOne({
            _id : id
        }).then((foundFDSixteen)=>{
            resolve(foundFDSixteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets all FD16 record in FD16 Schema 
 */
exports.getAllFDSixteen = function(){
    return new Promise(function(resolve, reject){
        fdSixteen.find().then((fdSixteenForms)=>{
            resolve(fdSixteenForms)
        }, (err)=>{
            reject(err)
        })
    })
}


/**
 * Gets FD16 record in FD16 Schema by department
 *
 * @param {Filtering department} paramFDOneDepartment
 */
exports.getFDSixteenByDepartment = function(paramFDSixteenDepartment){
    return new Promise(function(resolve, reject){
        fdSixteen.find({
            department : paramFDSixteenDepartment
        }).then((departmentFDSixteen)=>{
            resolve(departmentFDSixteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets FD16 record in FD16 Schema by status
 *
 * @param {Filtering status} paramFDOnestatus
 */
exports.getFDSixteenByStatus = function(paramFDSixteenStatus){
    return new Promise(function(resolve, reject){
        fdSixteen.find({
            grantStatus : paramFDSixteenStatus
        }).then((statusFDSixteen)=>{
            resolve(statusFDSixteen)
        }, (err)=>{
            reject(err)
        })
    })
}