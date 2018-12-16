/**
 * This contains schema initialization and 
 * model functions for the remarks which is
 * part of every form.
 * November 23, 2018
 * @ver 1.0
 * @author Sai Manalili
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose")
const moment = require("moment")

/**
 * Setting up Remark Schema
 */
var remarkSchema = mongoose.Schema({
    formId : {
      type : String,
      required : true
    },
    date : {
      type : Date,
      required: true
    },
    status : String,
    remark : String
})

var Remark = mongoose.model("remark", remarkSchema)

/**
 * Creates remark in Remark schema.
 *
 * @param {remark to be created} remark
 */
exports.create = function(remark) {
  return new Promise(function(resolve, reject) {
    var r = new Remark(remark)

    r.date = new Date();
    
    r.save().then((newRemark)=>{
      resolve(newRemark)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.delete = function(paramRemarkID){
    return new Promise(function(resolve, reject){
        Remark.deleteOne({
            _id : paramRemarkID
        }).then((deletedRemark)=>{
            resolve(deletedRemark)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets a remark in Remark Schema 
 *
 * @param {Id} formId
 * @param {Id} remarkId
 */
exports.getRemark = function(paramFormId, paramRemarkId){
  return new Promise(function(resolve, reject) {
      Remark.findOne({
          formId : paramFormId,
          _id : paramRemarkId
      }).then((remarkFound)=>{
          resolve(remarkFound)
      }, (err)=>{
          reject(err)
      })
  })
}

/**
 * Gets remarks of a form from the Remark Schema
 *
 * @param {Form} paramForm
 */
exports.getRemarksFromForm = function(paramForm){
  return new Promise(function(resolve, reject){
      Remark.find({
          formId : paramForm._id
      }, null, {
          sort: { date: -1 }
      }).then((remarksForm)=>{
          resolve(remarksForm)
      }, (err)=>{
          reject(err)
      })
  })
}

/**
 * Gets all remarks in Remark schema 
 */
exports.getAllRemarks = function() {
  return new Promise(function(resolve, reject){
      Remark.find().then((remarks)=>{
          resolve(remarks)
      }, (err)=>{
          reject(err)
      })
  })
}

/**
 * Gets the count of remarks in Remark schema 
 * @param {Id} paramFormId
 */
exports.getCountFormRemarks = function(paramFormId) {
    return new Promise(function(resolve, reject){
        Remark.countDocuments({
            formId : paramFormId
        }).then((countRemarks)=>{
            resolve(countRemarks)
        }, (err)=>{
            reject(err)
        })
    })
}