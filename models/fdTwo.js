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
const moment = require("moment")
const remark = require("../models/remark")
const remarkSchema = mongoose.model('remark').schema

/**
 * Setting up FD2 Form Schema
 */
var fdTwoSchema = mongoose.Schema({
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
  dateHired: Date,
  rank: String,
  status: String, //true = permanent, false = probationary
  aveTeachingPerformance: Number,
  nameOfConference: String,
  titleOfPaperToBePresented: String,
  dateOfStartConference: Date,
  dateOfEndConference: Date,
  dateOfDeparture: Date,
  placeAndVenue: String,
  dateOfReturn: Date,
  dateOfReturnToWork: Date,
  dateIncentiveLastAvailed: Date,
  remarks: [remarkSchema],
  notif : Boolean
})

var fdTwo = mongoose.model("fdTwo", fdTwoSchema)

/**
 * Creates FD2 record in FD2 Schema 
 *
 * @param {FD2 record to be created} paramFDTwo
 */
exports.create = function (paramFDTwo) {
  return new Promise(function (resolve, reject) {

    var f = new fdTwo(paramFDTwo)
    f.timestamp = new Date()
    var i

    fdTwo.countDocuments().then((count) => {
      if (count == 0) {
        f.formId = f.formId + count
        f.save().then((newFDTwo) => {
          resolve(newFDTwo)
        }, (err) => {
          reject(err)
        })
      } else {
        fdTwo.find().sort({ $natural: -1 }).limit(1).then((lastDocument) => {
          i = parseInt(lastDocument[0].formId.replace("FD2-", ""), 10) + 1
          f.formId = "FD2-" + i

          f.save().then((newFDTwo) => {
            resolve(newFDTwo)
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
 * Deletes FD2 record in FD2 Schema 
 *
 * @param {ID of the record to be deleted} paramID
 */
exports.delete = function (paramID) {
  return new Promise(function (resolve, reject) {
    fdTwo.deleteOne({
      _id: paramID
    }).then((deletedFDTwo) => {
      resolve(deletedFDTwo)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Edits FD2 record in FD2 Schema 
 *
 * @param {FD2 record to be edited} paramFDTwo
 */
exports.edit = function (paramFDTwo) {
  return new Promise(function (resolve, reject) {
    fdTwo.findOneAndUpdate({
      _id: paramFDTwo._id
    }, paramFDTwo).then((updatedFDTwo) => {
      resolve(updatedFDTwo)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Turns on notification on fd2 
 *
 * @param {FD2 record to be notified} paramID
 */
exports.changeNotif = function(paramForm, notif){
    return new Promise(function(resolve, reject){
        fdTwo.findOneAndUpdate({
            _id : paramForm
        }, {
            "$set" : {"notif" : notif}
        }).then((updatedFDTwo)=>{
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
exports.changeStatusFDTwo = function (paramID, status) {
  return new Promise(function (resolve, reject) {
    fdTwo.findOneAndUpdate({
      _id: paramID
    }, {
        "$set": { "grantStatus": status }
      }).then((updatedFDTwo) => {
        resolve(updatedFDTwo)
      }, (err) => {
        reject(err)
      })
  })
}

/**
 * Rejects FD2 record in FD2 Schema 
 *
 * @param {FD2 record to be reject} paramID
 */
exports.rejectFDTwo = function (paramID) {
  return new Promise(function (resolve, reject) {
    fdTwo.findOneAndUpdate({
      _id: paramID
    }, {
        "$set": { "grantStatus": "Rejected" }
      }).then((updatedFDTwo) => {
        resolve(updatedFDTwo)
      }, (err) => {
        reject(err)
      })
  })
}

/**
 * Gets one FD2 record in FD2 Schema 
 *
 * @param {FD2 record to get} paramFDTwo
 */
exports.getFDTwo = function (paramFDTwo) {
  return new Promise(function (resolve, reject) {
    fdTwo.findOne({
      _id: paramFDTwo._id
    }).then((foundFDTwo) => {
      resolve(foundFDTwo)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Gets one FD2 record in FD2 Schema by _id as the parameter
 *
 * @param {id to use} id
 */
exports.getFDTwoByID = function (id) {
  return new Promise(function (resolve, reject) {
    fdTwo.findOne({
      _id: id
    }).then((foundFDTwo) => {
      resolve(foundFDTwo)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Gets all FD2 record in FD2 Schema 
 */
exports.getAllFDTwo = function () {
  return new Promise(function (resolve, reject) {
    fdTwo.find().then((fdTwoForms) => {
      resolve(fdTwoForms)
    }, (err) => {
      reject(err)
    })
  })
}


/**
 * Gets FD2 record in FD2 Schema by department
 *
 * @param {Filtering department} paramFDTwoDepartment
 */
exports.getFDTwoByDepartment = function (paramFDTwoDepartment) {
  return new Promise(function (resolve, reject) {
    fdTwo.find({
      department: paramFDTwoDepartment
    }).then((departmentFDTwo) => {
      resolve(departmentFDTwo)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Gets FD2 record in FD2 Schema by user loginID
 *
 * @param {Filtering Login ID} paramFDTwoLoginId
 */
exports.getFDTwoByLoginId = function (paramFDTwoLoginId) {
  return new Promise(function (resolve, reject) {
    fdTwo.find({
      ownerIdNumber: paramFDTwoLoginId
    }).then((loginIdFDTwo) => {
      resolve(loginIdFDTwo)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Gets FD2 record in FD2 Schema by status
 *
 * @param {Filtering status} paramFDTwostatus
 */
exports.getFDTwoByStatus = function (paramFDTwoStatus) {
  return new Promise(function (resolve, reject) {
    fdTwo.find({
      grantStatus: paramFDTwoStatus
    }).then((statusFDTwo) => {
      resolve(statusFDTwo)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Get remarks from FD2.
 *
 * @param {Form} paramFDTwo
 */
exports.getRemarksFromFDTwoForm = function (paramFDTwo) {
  return new Promise(function (resolve, reject) {
    fdTwo.findOne({
      _id: paramFDTwo._id
    }).then((fdTwoFound) => {
      if (fdTwoFound != null)
        resolve(fdTwoFound.remarks)
      resolve(null)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Adds remark in FD2 form.
 *
 * @param {Remark} paramRemark
 */
exports.addRemarkInFDTwo = function (paramRemark) {
  return new Promise(function (resolve, reject) {
    fdTwo.findOneAndUpdate({
      _id: paramRemark.formId
    }, {
        $push: { remarks: paramRemark }
      }).then((updatedFdTwo) => {
        resolve(updatedFdTwo)
      }, (err) => {
        reject(err)
      })
  })
}

/**
 * Deletes remark in FD2 form.
 *
 * @param {Remark} paramRemark
 */
exports.deleteRemarkInFDTwo = function (paramRemark) {
  return new Promise(function (resolve, reject) {
    fdTwo.findOneAndUpdate({
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