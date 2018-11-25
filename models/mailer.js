/**
 * This contains schema initialization and 
 * model functions for the mailer
 * November 24, 2018
 * @ver 1.0
 * @author Christian Dequito
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose")
//const crypto = require("crypto")

/**
 * Setting up Mailer Schema
 */
var mailerSchema = mongoose.Schema({
    
    emailAddress : {
        type : String,
        required : true
    },
    
    password : {
        type : String,
        required : true
    }
})

//mailerSchema.pre("save", function(next){
//  this.password = crypto.createHash("md5").update(this.password).digest("hex")
//  next()
//})

var Mailer = mongoose.model("mailer", mailerSchema)


/**
 * Creates mailer record in Mailer Schema 
 *
 * @param {mailer record to be created} mailer
 */
exports.create = function(mailer){
  return new Promise(function(resolve, reject){
    var m = new Mailer(mailer)
    
    m.save().then((newMailer)=>{
      resolve(newMailer)
    }, (err)=>{
      reject(err)
    })
  })
}

/**
 * Gets user record in user Schema by department
 *
 * @param {Filtering department} paramUserDepartment
 */
exports.getMailerByEmail = function(paramMailerEmail){
    return new Promise(function(resolve, reject){
        Mailer.findOne({
            emailAddress : paramMailerEmail
        }).then((emailMailer)=>{
            resolve(emailMailer)
        }, (err)=>{
            reject(err)
        })
    })
    
}