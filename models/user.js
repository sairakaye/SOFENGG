/**
 * This contains schema initialization and 
 * model functions for the users
 * October 17, 2018
 * @ver 1.0
 * @author Christian Dequito
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose")
const crypto = require("crypto")
const fdOne = require("./fdOne.js")
const fdOneSchema = mongoose.model('fdOne').schema
const fdTwo = require("./fdTwo.js")
const fdTwoSchema = mongoose.model('fdTwo').schema

/**
 * Setting up User Schema
 */
var userSchema = mongoose.Schema({
    
    username : {
        type : String,
        required : true
    },
    
    password : {
        type : String,
        required : true
    },
    
    firstName : {
        type : String, 
        required : true
    },

    lastName : {
        type : String, 
        required : true
    },
    
    department : {
        type : String, 
        required : true
    },
    
	userType: String, //Admin, Faculty or Library Staff

    status : String, //true = permanent, false = probationary
    
    dateHired : Date,
    
    fdOneForms : [fdOneSchema],
    
    fdTwoForms : [fdTwoSchema]
})

userSchema.pre("save", function(next){
  this.password = crypto.createHash("md5").update(this.password).digest("hex")
  next()
})

var User = mongoose.model("user", userSchema)


/**
 * Creates user record in User Schema 
 *
 * @param {user record to be created} user
 */
exports.create = function(user){
  return new Promise(function(resolve, reject){
    var u = new User(user)
    
    u.save().then((newUser)=>{
      resolve(newUser)
    }, (err)=>{
      reject(err)
    })
  })
}

/**
 * Authenticates user record in User Schema 
 *
 * @param {user record to be authenticated} user
 */
exports.authenticate = function(user){
  return new Promise(function(resolve, reject){
      
    User.findOne({
      username : user.username,
      password : crypto.createHash("md5").update(user.password).digest("hex")
    }).then((user)=>{
      resolve(user)
    },(err)=>{
      reject(err)
    })
  })
}

/**
 * Gets one user record in User Schema 
 *
 * @param {user record to get by username} paramUsername
 */
exports.getUser = function(paramUsername){
    return new Promise(function(resolve, reject){
        User.findOne({
            username : paramUsername
        }).then((userFound)=>{
            resolve(userFound)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets one user record in User Schema 
 *
 * @param {user record to get by name} paramName
 */
exports.getUserByName = function(paramName){
    return new Promise(function(resolve, reject){
        User.findOne({
            username : paramName
        }).then((userFound)=>{
            resolve(userFound)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets all user record in User Schema 
 */
exports.getAllUser = function(){
    return new Promise(function(resolve, reject){
        User.find().then((users)=>{
            resolve(users)
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
exports.getUserByDepartment = function(paramUserDepartment){
    return new Promise(function(resolve, reject){
        User.find({
            department : paramUserDepartment
        }).then((departmentUsers)=>{
            resolve(departmentUsers)
        }, (err)=>{
            reject(err)
        })
    })
    
}

/**
 * Gets user record in user Schema by status
 *
 * @param {Filtering status} paramUserStatus
 */
exports.getUserByStatus = function(paramUserStatus){
    return new Promise(function(resolve, reject){
        User.find({
            status : paramUserStatus
        }).then((statusUsers)=>{
            resolve(statustUsers)
        }, (err)=>{
            reject(err)
        })
    })
    
}

/**
 * Gets FDOne records in user Schema
 *
 * @param {Username of user that contains FDOne} paramUsername
 */
exports.getFDOneFormsByUser = function(paramUsername){
    return new Promise(function(resolve, reject){
        User.findOne({
            username : paramUsername
        }).then((userFound)=>{
            resolve(userFound.fdOneForms)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets FDTwo records in user Schema
 *
 * @param {Username of user that contains FDTwo} paramUsername
 */
exports.getFDTwoFormsByUser = function(paramUsername){
    return new Promise(function(resolve, reject){
        User.findOne({
            username : paramUsername
        }).then((userFound)=>{
            resolve(userFound.fdTwoForms)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Adds FDOne record in User Schema 
 *
 * @param {FDOne record to be added} paramFDOne
 */
exports.addFDOneInUser = function(paramFDOne){
    return new Promise(function(resolve, reject){
        User.findOneAndUpdate({
            username : paramFDOne.ownerUsername
        }, {
            $push : {fdOneForms : {paramFDOne}}
        }).then((updatedUser)=>{
            resolve(updatedUser)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Deletes FDOne record in User Schema 
 *
 * @param {FDOne record to be deleted} paramFDOne
 */
exports.deleteFDOneInUser = function(paramFDOne){
    return new Promise(function(resolve, reject){
        User.findOne({
            username : paramFDOne.username
        }).then((foundUser)=>{
            foundUser.fdOneForms.remove({
                _id : paramFDOne._id
            })
            resolve(foundUser) // error?
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Edits FDOne record in User Schema 
 *
 * @param {FDOne record to be edited} paramFDOne
 */
exports.editFDOneInUser = function(paramFDOne){
    return new Promise(function(resolve, reject){
        User.findOneAndUpdate({
            username : user.username
        }, {
            $set : { "fdOneForms.$" : paramFDOne}
        }).then((updatedUser)=>{
            resolve(updatedUser)
        }, (err)=>{
            reject(err)
        })
    })
}