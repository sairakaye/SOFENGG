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
const moment = require("moment")
const remark = require("../models/remark")
const remarkSchema = mongoose.model('remark').schema

/**
 * Setting up FD3 Form Schema
 */
var fdThreeSchema = mongoose.Schema({
  timestamp: Date,
  formId: String,
  grantName: String,
  ownerIdNumber: String,
  grantStatus: String,
  term: String,
  startAY: Number,
  endAY: Number,
  firstName: String,
  lastName: String,
  department: String,
  rank: String,
  dateHired: Date,
  rank: String,
  status: String,
  noOfUnitsTaught: Number, //ONLY IF PART-TIME
  nameOfConference: String,
  typeOfConference: String,
  titleOfPaperToBePresented: String,
  dateOfStartConference: Date,
  dateOfEndConference: Date,
  dateOfDeparture: Date,
  placeAndVenue: String,
  dateOfReturn: Date,
  dateOfReturnToWork: Date,
  travelAndConferenceSubsidy: String,
  dateIncentiveLastAvailed: Date,
  remarks: [remarkSchema],
  notif : Boolean,
  notifFaculty : Boolean

})

var fdThree = mongoose.model("fdThree", fdThreeSchema)

/**
 * Creates FD3 record in FD3 Schema 
 *
 * @param {FD3 record to be created} paramFDThree
 */
exports.create = function (paramFDThree) {
  return new Promise(function (resolve, reject) {

    var f = new fdThree(paramFDThree)
    f.timestamp = new Date()
    var i

    fdThree.countDocuments().then((count) => {
      if (count == 0) {
        f.formId = f.formId + count
        f.save().then((newFDThree) => {
          resolve(newFDThree)
        }, (err) => {
          reject(err)
        })
      } else {
        fdThree.find().sort({ $natural: -1 }).limit(1).then((lastDocument) => {
          i = parseInt(lastDocument[0].formId.replace("FD3-", ""), 10) + 1
          f.formId = "FD3-" + i

          f.save().then((newFDThree) => {
            resolve(newFDThree)
          }, (err) => {
            reject(err)
          })

        }, (err) => {
          reject(err)
        })
      }
    }, (err) => {
      reject(err)
    })

  })
}

/**
 * Deletes FD3 record in FD3 Schema 
 *
 * @param {ID of the record to be deleted} paramID
 */
exports.delete = function (paramID) {
  return new Promise(function (resolve, reject) {
    fdThree.deleteOne({
      _id: paramID
    }).then((deletedFDThree) => {
      resolve(deletedFDThree)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Edits FD3 record in FD3 Schema 
 *
 * @param {FD3 record to be edited} paramFDOne
 */
exports.edit = function (paramFDThree) {
  return new Promise(function (resolve, reject) {
    fdThree.findOneAndUpdate({
      _id: paramFDThree._id
    }, paramFDThree).then((updatedFDThree) => {
      resolve(updatedFDThree)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Turns on notification on fd3 
 *
 * @param {FD3 record to be notified} paramID
 */
exports.changeNotif = function(paramForm, notif){
    return new Promise(function(resolve, reject){
        fdThree.findOneAndUpdate({
            _id : paramForm
        }, {
            "$set" : {"notif" : notif}
        }).then((updatedFDThree)=>{
            resolve(updatedFDThree)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Turns on notification on fd3 
 *
 * @param {FD3 record to be notified} paramID
 */
exports.changeNotifFaculty = function(paramForm, notif){
    return new Promise(function(resolve, reject){
        fdThree.findOneAndUpdate({
            _id : paramForm
        }, {
            "$set" : {"notif" : notif}
        }).then((updatedFDThree)=>{
            resolve(updatedFDThree)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Approves FD3 record in FD3 Schema 
 *
 * @param {FD3 record to be approved} paramID
 */
exports.changeStatusFDThree = function (paramID, status) {
  return new Promise(function (resolve, reject) {
    fdThree.findOneAndUpdate({
      _id: paramID
    }, {
        "$set": { "grantStatus": status }
      }).then((updatedFDThree) => {
        resolve(updatedFDThree)
      }, (err) => {
        reject(err)
      })
  })
}

/**
 * Rejects FD3 record in FD3 Schema 
 *
 * @param {FD3 record to be reject} paramID
 */
exports.rejectFDThree = function (paramID) {
  return new Promise(function (resolve, reject) {
    fdThree.findOneAndUpdate({
      _id: paramID
    }, {
        "$set": { "grantStatus": "Rejected" }
      }).then((updatedFDThree) => {
        resolve(updatedFDThree)
      }, (err) => {
        reject(err)
      })
  })
}

/**
 * Gets one FD3 record in FD3 Schema 
 *
 * @param {FD3 record to get} paramFDOne
 */
exports.getFDThree = function (paramFDThree) {
  return new Promise(function (resolve, reject) {
    fdThree.findOne({
      _id: paramFDThree._id
    }).then((foundFDThree) => {
      resolve(foundFDThree)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Gets one FD3 record in FD3 Schema by _id as the parameter
 *
 * @param {id to use} id
 */
exports.getFDThreeByID = function (id) {
  return new Promise(function (resolve, reject) {
    fdThree.findOne({
      _id: id
    }).then((foundFDThree) => {
      resolve(foundFDThree)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Gets all FD3 record in FD3 Schema 
 */
exports.getAllFDThree = function () {
  return new Promise(function (resolve, reject) {
    fdThree.find().then((fdThreeForms) => {
      resolve(fdThreeForms)
    }, (err) => {
      reject(err)
    })
  })
}


/**
 * Gets FD3 record in FD3 Schema by department
 *
 * @param {Filtering department} paramFDOneDepartment
 */
exports.getFDThreeByDepartment = function (paramFDThreeDepartment) {
  return new Promise(function (resolve, reject) {
    fdThree.find({
      department: paramFDThreeDepartment
    }).then((departmentFDThree) => {
      resolve(departmentFDThree)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Gets FD3 record in FD3 Schema by user loginID
 *
 * @param {Filtering Login ID} paramFDThreeLoginId
 */
exports.getFDThreeByLoginId = function (paramFDThreeLoginId) {
  return new Promise(function (resolve, reject) {
    fdThree.find({
      ownerIdNumber: paramFDThreeLoginId
    }).then((loginIdFDThree) => {
      resolve(loginIdFDThree)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Gets FD3 record in FD3 Schema by status
 *
 * @param {Filtering status} paramFDOnestatus
 */
exports.getFDThreeByStatus = function (paramFDThreeStatus) {
  return new Promise(function (resolve, reject) {
    fdThree.find({
      grantStatus: paramFDThreeStatus
    }).then((statusFDThree) => {
      resolve(statusFDThree)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Gets remarks from FD3 form.
 *
 * @param {Form} paramFDThree
 */
exports.getRemarksFromFDThreeForm = function (paramFDThree) {
  return new Promise(function (resolve, reject) {
    fdThree.findOne({
      _id: paramFDThree._id
    }).then((fdThreeFound) => {
      if (fdThreeFound != null)
        resolve(fdThreeFound.remarks)
      resolve(null)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Adds remark in FD3 form.
 *
 * @param {Remark} paramRemark
 */
exports.addRemarkInFDThree = function (paramRemark) {
  return new Promise(function (resolve, reject) {
    fdThree.findOneAndUpdate({
      _id: paramRemark.formId
    }, {
        $push: { remarks: paramRemark }
      }).then((updatedFdThree) => {
        resolve(updatedFdThree)
      }, (err) => {
        reject(err)
      })
  })
}

/**
 * Deletes remark in FD3 form.
 *
 * @param {Remark} paramRemark
 */
exports.deleteRemarkInFDThree = function (paramRemark) {
  return new Promise(function (resolve, reject) {
    fdThree.findOneAndUpdate({
      _id: paramRemark.formId
    }, {
        $pull: { remarks: { _id: paramRemark._id } }
      }).then((foundRemark) => {
        resolve(foundRemark)
      }, (err) => {
        reject(err)
      })
  })
}