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
const mongoose = require("mongoose")
const moment = require("moment")
const remark = require("../models/remark")
const remarkSchema = mongoose.model('remark').schema

/**
 * Setting up FD15 Form Schema
 */
var fdFifteenSchema = mongoose.Schema({
    timestamp: Date,
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
    hostInstitution : String,
    titleOfSeminar : String,
    place : String,
    startTime : Date,
    endTime : Date,
    dateIncentiveLastAvailed : Date,
    participantFee : String, //MONEY
    remarks : [remarkSchema]
})

var fdFifteen = mongoose.model("fdFifteen", fdFifteenSchema)

/**
 * Creates FD15 record in FD15 Schema 
 *
 * @param {FD15 record to be created} paramFDFifteen
 */
exports.create = function(paramFDFifteen){
    return new Promise(function(resolve, reject){
        
        var f = new fdFifteen(paramFDFifteen)
        f.timestamp = new Date()
        var i
        
        fdFifteen.countDocuments().then((count) => {
            if(count == 0){
                f.formId = f.formId + count
                f.save().then((newFDFifteen)=>{    
                        resolve(newFDFifteen)
                    }, (err)=>{
                        reject(err)
                    })
            }else{
                fdFifteen.find().sort({$natural:-1}).limit(1).then((lastDocument)=>{
                    i = parseInt(lastDocument[0].formId.replace("FD15-", ""), 10) + 1
                    f.formId = "FD15-" + i
                    
                    f.save().then((newFDFifteen)=>{    
                        resolve(newFDFifteen)
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
 * Deletes FD15 record in FD15 Schema 
 *
 * @param {ID of the record to be deleted} paramID
 */
exports.delete = function(paramID){
    return new Promise(function(resolve, reject){
        fdFifteen.deleteOne({
            _id : paramID
        }).then((deletedFDFifteen)=>{
            resolve(deletedFDFifteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Edits FD15 record in FD15 Schema 
 *
 * @param {FD15 record to be edited} paramFDOne
 */
exports.edit = function(paramFDFifteen){
    return new Promise(function(resolve, reject){
        fdFifteen.findOneAndUpdate({
            _id : paramFDFifteen._id
        }, paramFDFifteen).then((updatedFDFifteen)=>{
            resolve(updatedFDFifteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Approves FD15 record in FD15 Schema 
 *
 * @param {FD15 record to be approved} paramID
 */
exports.changeStatusFDFifteen = function(paramID, status){
    return new Promise(function(resolve, reject){
        fdFifteen.findOneAndUpdate({
            _id : paramID
        }, {
            "$set" : {"grantStatus" : status}
        }).then((updatedFDFifteen)=>{
            resolve(updatedFDFifteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Rejects FD15 record in FD15 Schema 
 *
 * @param {FD15 record to be reject} paramID
 */
exports.rejectFDFifteen = function(paramID){
    return new Promise(function(resolve, reject){
        fdFifteen.findOneAndUpdate({
            _id : paramID
        }, {
            "$set" : {"grantStatus" : "Rejected"}
        }).then((updatedFDFifteen)=>{
            resolve(updatedFDFifteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets one FD15 record in FD15 Schema 
 *
 * @param {FD15 record to get} paramFDOne
 */
exports.getFDFifteen = function(paramFDFifteen){
    return new Promise(function(resolve, reject){
        fdFifteen.findOne({
            _id : paramFDFifteen._id
        }).then((foundFDFifteen)=>{
            resolve(foundFDFifteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets one FD15 record in FD15 Schema by _id as the parameter
 *
 * @param {id to use} id
 */
exports.getFDFifteenByID = function(id){
    return new Promise(function(resolve, reject){
        fdFifteen.findOne({
            _id : id
        }).then((foundFDFifteen)=>{
            resolve(foundFDFifteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets all FD15 record in FD15 Schema 
 */
exports.getAllFDFifteen = function(){
    return new Promise(function(resolve, reject){
        fdFifteen.find().then((fdFifteenForms)=>{
            resolve(fdFifteenForms)
        }, (err)=>{
            reject(err)
        })
    })
}


/**
 * Gets FD15 record in FD15 Schema by department
 *
 * @param {Filtering department} paramFDOneDepartment
 */
exports.getFDFifteenByDepartment = function(paramFDFifteenDepartment){
    return new Promise(function(resolve, reject){
        fdFifteen.find({
            department : paramFDFifteenDepartment
        }).then((departmentFDFifteen)=>{
            resolve(departmentFDFifteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets FD15 record in FD15 Schema by user loginID
 *
 * @param {Filtering Login ID} paramFDFifteenLoginId
 */
exports.getFDFifteenByLoginId = function(paramFDFifteenLoginId){
    return new Promise(function(resolve, reject){
        fdFifteen.find({
            ownerIdNumber : paramFDFifteenLoginId
        }).then((loginIdFDFifteen)=>{
            resolve(loginIdFDFifteen)
        }, (err)=>{
            reject(err)
        })
    })
}


/**
 * Gets FD15 record in FD15 Schema by status
 *
 * @param {Filtering status} paramFDOnestatus
 */
exports.getFDFifteenByStatus = function(paramFDFifteenStatus){
    return new Promise(function(resolve, reject){
        fdFifteen.find({
            grantStatus : paramFDFifteenStatus
        }).then((statusFDFifteen)=>{
            resolve(statusFDFifteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Get remarks from FD15 form.
 *
 * @param {Form} paramFDFifteen
 */
exports.getRemarksFromFDFifteenForm = function(paramFDFifteen){
    return new Promise(function(resolve, reject){
        fdFifteen.findOne({
            _id : paramFDFifteen._id
        }).then((fdFifteenFound)=>{
            if(fdFifteenFound !=null)
                resolve(fdFifteenFound.remarks)
            resolve(null)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Adds remark in FD15 form.
 *
 * @param {Remark} paramRemark
 */
exports.addRemarkInFDFifteen = function(paramRemark){
    return new Promise(function(resolve, reject){
        fdFifteen.findOneAndUpdate({
            _id : paramRemark.formId
        }, {
            $push : {remarks : paramRemark}
        }).then((updatedFdFifteen)=>{
            resolve(updatedFdFifteen)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Deletes remark in FD15 form.
 *
 * @param {Remark} paramRemark
 */
exports.deleteRemarkInFDFifteen = function(paramRemark){
    return new Promise(function(resolve, reject){
        fdFifteen.findOneAndUpdate({
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