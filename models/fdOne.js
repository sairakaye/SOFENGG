/**
 * This contains schema initialization and 
 * model functions for the first form
 * October 12, 2018
 * @ver 1.0
 * @author Christian Dequito
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose")
const remark = require("../models/remark")
const remarkSchema = mongoose.model('remark').schema
/**
 * Setting up FD1 Form Schema
 */
var fdOneSchema = mongoose.Schema({
    timestamp: Date,
    formId : String,
    grantName: String,
    ownerIdNumber : String,
    grantStatus: String,
    term : String, 
    startAY : Number,
    endAY : Number,
    firstName : String, 
    lastName: String,
    department : String,
    dateHired : Date,
    rank : String,
    status : String,
    aveTeachingPerformance : Number,
    titleOfPaperOrPublication : String,
    titleOfJournal : String, 
    datePaperSubmitted : Date,
    datePaperAccepted : Date,
    nameOfConference : String, 
    titleOfPaperToBePresented : String,
    dateOfStartConference : Date,
    dateOfEndConference : Date,
    dateOfDeparture : Date,
    placeAndVenue : String,
    dateOfReturn : Date,
    dateOfReturnToWork : Date,
    dateIncentiveLastAvailed : Date,
    remarks : [remarkSchema]
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
        f.timestamp = new Date()
        var i
        
        fdOne.countDocuments().then((count) => {
            if(count == 0){
                f.formId = f.formId + count
                f.save().then((newFDOne)=>{    
                        resolve(newFDOne)
                    }, (err)=>{
                        reject(err)
                    })
            }else{
                fdOne.find().sort({$natural:-1}).limit(1).then((lastDocument)=>{
                    i = parseInt(lastDocument[0].formId.replace("FD1-", ""), 10) + 1
                    f.formId = "FD1-" + i
                    
                    f.save().then((newFDOne)=>{    
                        resolve(newFDOne)
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
 * Deletes FD1 record in FD1 Schema 
 *
 * @param {ID of the record to be deleted} paramID
 */
exports.delete = function(paramID){
    return new Promise(function(resolve, reject){
        fdOne.deleteOne({
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
 * Approves FD1 record in FD1 Schema 
 *
 * @param {FD1 record to be approved} paramID
 */
exports.changeStatusFDOne = function(paramID, status){
    return new Promise(function(resolve, reject){
        fdOne.findOneAndUpdate({
            _id : paramID
        }, {
            "$set" : {"grantStatus" : status}
        }).then((updatedFDOne)=>{
            resolve(updatedFDOne)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Rejects FD1 record in FD1 Schema 
 *
 * @param {FD1 record to be reject} paramID
 */
exports.rejectFDOne = function(paramID){
    return new Promise(function(resolve, reject){
        fdOne.findOneAndUpdate({
            _id : paramID
        }, {
            "$set" : {"grantStatus" : "Rejected"}
        }).then((updatedFDOne)=>{
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
 * Gets one FD1 record in FD1 Schema by _id as the parameter
 *
 * @param {id to use} id
 */
exports.getFDOneByID = function(id){
    return new Promise(function(resolve, reject){
        fdOne.findOne({
            _id : id
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
 * Gets FD1 record in FD1 Schema by user loginID
 *
 * @param {Filtering Login ID} paramFDOneLoginId
 */
exports.getFDOneByLoginId = function(paramFDOneLoginId){
    return new Promise(function(resolve, reject){
        fdOne.find({
            ownerIdNumber : paramFDOneLoginId
        }).then((loginIdFDOne)=>{
            resolve(loginIdFDOne)
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
            grantStatus : paramFDOneStatus
        }).then((statusFDOne)=>{
            resolve(statusFDOne)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Get remarks from FD1 form.
 *
 * @param {Form} paramFDOne
 */
exports.getRemarksFromFDOneForm = function(paramFDOne){
    return new Promise(function(resolve, reject){
        fdOne.findOne({
            _id : paramFDOne._id
        }).then((fdOneFound)=>{
            if(fdOneFound !=null)
                resolve(fdOneFound.remarks)
            resolve(null)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Adds remark in FD1 form.
 *
 * @param {Remark} paramRemark
 */
exports.addRemarkInFDOne = function(paramRemark){
    return new Promise(function(resolve, reject){
        fdOne.findOneAndUpdate({
            _id : paramRemark.formId
        }, {
            $push : {remarks : paramRemark}
        }).then((updatedFdOne)=>{
            resolve(updatedFdOne)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Deletes remark in FD1 form through remark.
 *
 * @param {Remark} paramRemark
 */
exports.deleteRemarkInFDOne = function(paramRemark){
    return new Promise(function(resolve, reject){
        fdOne.findOneAndUpdate({
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