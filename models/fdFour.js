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
const moment = require("moment")
const remark = require("../models/remark")
const remarkSchema = mongoose.model('remark').schema

/**
 * Setting up FD4 Form Schema
 */
var fdFourSchema = mongoose.Schema({
    timestamp:  Date, 
    formId : String,
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
    dateOfStartConference : Date,
    dateOfEndConference : Date,
    dateOfDeparture : Date,
    placeAndVenue : String,
    dateOfReturn : Date,
    dateOfReturnToWork : Date,
    participantFee : String, 
    noOfLocalConferencesAttendedThisYear : Number,
    dateIncentiveLastAvailed : Date,
    remarks : [remarkSchema]
})

var fdFour = mongoose.model("fdFour", fdFourSchema)

/**
 * Creates FD4 record in FD4 Schema 
 *
 * @param {FD4 record to be created} paramFDFour
 */
exports.create = function(paramFDFour){
    return new Promise(function(resolve, reject){
        
        var f = new fdFour(paramFDFour)
        var i
        
        fdFour.countDocuments().then((count) => {
            if(count == 0){
                f.formId = f.formId + count
                f.save().then((newFDFour)=>{    
                        resolve(newFDFour)
                    }, (err)=>{
                        reject(err)
                    })
            }else{
                fdFour.find().sort({$natural:-1}).limit(1).then((lastDocument)=>{
                    i = parseInt(lastDocument[0].formId.replace("FD4", ""), 10) + 1
                    f.formId = "FD4" + i
                    
                    f.save().then((newFDFour)=>{    
                        resolve(newFDFour)
                    }, (err)=>{
                        reject(err)
                    })
                    
                }, (err)=>{
                    reject(err)
                })
            }               
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
exports.changeStatusFDFour = function(paramID, status){
    return new Promise(function(resolve, reject){
        fdFour.findOneAndUpdate({
            _id : paramID
        }, {
            "$set" : {"grantStatus" : status}
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
            "$set" : {"grantStatus" : "Rejected"}
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

/**
 * Gets remarks from FD4 form.
 *
 * @param {Form} paramFDFour
 */
exports.getRemarksFromFDFourForm = function(paramFDFour){
    return new Promise(function(resolve, reject){
        fdFour.findOne({
            _id : paramFDFour._id
        }).then((fdFourFound)=>{
            if(fdFourFound !=null)
                resolve(fdFourFound.remarks)
            resolve(null)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Adds remark in FD4 form.
 *
 * @param {Form} paramRemark
 */
exports.addRemarkInFDFour = function(paramRemark){
    return new Promise(function(resolve, reject){
        fdFour.findOneAndUpdate({
            _id : paramRemark.formId
        }, {
            $push : {remarks : paramRemark}
        }).then((updatedFdFour)=>{
            resolve(updatedFdFour)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Deletes remark in FD4 form.
 *
 * @param {Remark} paramRemark
 */
exports.deleteRemarkInFDFour = function(paramRemark){
    return new Promise(function(resolve, reject){
        fdFour.findOneAndUpdate({
            _id : paramRemark.formId
        }, {
            $pull : {remarks : {_id : paramRemark._id}}
        }).then((foundRemark)=>{
            resolve(foundRemark)
        }, (err)=>{
            reject(err)
        })
    })
}