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

/**
 * Setting up Remark Schema
 */
var remarkSchema = mongoose.Schema({
    remarkId : {
      type: Number,
      required : true
    },
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

    Remark.count({}, function(err, count) {
      if (err) {
        console.log("Error");
      } else {
        r.remarkId = count + 1;
      }
    });
    
    r.save().then((newRemark)=>{
      resolve(newRemark)
    }, (err)=>{
      reject(err)
    })
  })
}

/**
 * Gets a remark record in Remark Schema 
 *
 * @param {remark record to get by formId} formId
 * @param {remark record to get by remarkId} remarkId
 */
exports.getRemark = function(paramFormId, paramRemarkId){
  return new Promise(function(resolve, reject) {
      Remark.findOne({
          formId : paramFormId,
          remarkId : paramRemarkId
      }).then((remarkFound)=>{
          resolve(remarkFound)
      }, (err)=>{
          reject(err)
      })
  })
}

/**
 * Gets remarks record in a form from the Remark Schema
 *
 * @param {filter id} paramFormId
 */
exports.getRemarksFromForm = function(paramFormId){
  return new Promise(function(resolve, reject){
      User.find({
          formId : paramFormId
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
exports.getAllRemark = function(){
  return new Promise(function(resolve, reject){
      Remark.find().then((remarks)=>{
          resolve(remarks)
      }, (err)=>{
          reject(err)
      })
  })
}

/** Will add more functionalities here **/