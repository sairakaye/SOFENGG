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
const fdThree = require("./fdThree.js")
const fdThreeSchema = mongoose.model('fdThree').schema
const fdFour = require("./fdFour.js")
const fdFourSchema = mongoose.model('fdFour').schema
const fdFifteen = require("./fdFifteen.js")
const fdFifteenSchema = mongoose.model('fdFifteen').schema
const fdSixteen = require("./fdSixteen.js")
const fdSixteenSchema = mongoose.model('fdSixteen').schema

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
    
	userType: String, //Administrator or Faculty

    status : String, // Probationary or Permanent

    employmentType : String, // Part-Time or Full-Time

    dateHired : Date,
    
    fdOneForms : [fdOneSchema],  
    fdTwoForms : [fdTwoSchema],
    fdThreeForms : [fdThreeSchema],
    fdFourForms : [fdFourSchema],
    fdFifteenForms : [fdFifteenSchema],
    fdSixteenForms : [fdSixteenSchema],
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
exports.authenticateUsername = function(user){
  return new Promise(function(resolve, reject){
      
    User.findOne({
      username : user.username,
    }).then((user)=>{
      resolve(user)
    },(err)=>{
      reject(err)
    })
  })
}

/**
 * Authenticates user record in User Schema 
 *
 * @param {user record to be authenticated} user
 */
exports.authenticatePassword = function(user){
  return new Promise(function(resolve, reject){
      
    User.findOne({
      username: user.username,
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
 * Gets FDOne records in user Schema by username
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
 * Gets FDOne records in user Schema by Name
 *
 * @param {First name of user that contains FDOne} paramFirstName
 * @param {Last name of user that contains FDOne} paramLastName
 */
exports.getFDOneFormsByFullName = function(paramFirstName, paramLastName){
    return new Promise(function(resolve, reject){
        User.findOne({
            firstName : paramFirstName,
            lastName : paramLastName
        }).then((userFound)=>{
            if(userFound!=null)
                resolve(userFound.fdOneForms)
            
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets FDOne records in user Schema by First Name
 *
 * @param {First Name of user that contains FDOne} paramFirstName
 */
exports.getFDOneFormsByFirstName = function(paramFirstName){
    return new Promise(function(resolve, reject){
        User.findOne({
            firstName : paramFirstName
        }).then((userFound)=>{
            if(userFound!=null)
                resolve(userFound.fdOneForms)
            resolve(null)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets FDOne records in user Schema by Last Name
 *
 * @param {Last Name of user that contains FDOne} paramLastName
 */
exports.getFDOneFormsByLastName = function(paramLastName){
    return new Promise(function(resolve, reject){
        User.findOne({
            lastName : paramLastName
        }).then((userFound)=>{
            if(userFound!=null)
                resolve(userFound.fdOneForms)
            resolve(null)
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
            username : paramFDOne.ownerIdNumber
        }, {
            $push : {fdOneForms : paramFDOne}
        }).then((updatedUser)=>{
            console.log("let it go, go go go")
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
        User.findOneAndUpdate({
            username : paramFDOne.ownerIdNumber
        }, {
            $pull : {fdOneForms : {_id : paramFDOne._id}}
        }).then((foundUser)=>{
            resolve(foundUser)
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
 * Gets FDOne records in user Schema by Name
 *
 * @param {First name of user that contains FDOne} paramFirstName
 * @param {Last name of user that contains FDOne} paramLastName
 */
exports.getFDTwoFormsByFullName = function(paramFirstName, paramLastName){
    return new Promise(function(resolve, reject){
        User.findOne({
            firstName : paramFirstName,
            lastName : paramLastName
        }).then((userFound)=>{
            if(userFound!=null)
                resolve(userFound.fdTwoForms)
            
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets FDOne records in user Schema by First Name
 *
 * @param {First Name of user that contains FDOne} paramFirstName
 */
exports.getFDTwoFormsByFirstName = function(paramFirstName){
    return new Promise(function(resolve, reject){
        User.findOne({
            firstName : paramFirstName
        }).then((userFound)=>{
            if(userFound!=null)
                resolve(userFound.fdTwoForms)
            resolve(null)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets FDOne records in user Schema by Last Name
 *
 * @param {Last Name of user that contains FDOne} paramLastName
 */
exports.getFDTwoFormsByLastName = function(paramLastName){
    return new Promise(function(resolve, reject){
        User.findOne({
            lastName : paramLastName
        }).then((userFound)=>{
            if(userFound!=null)
                resolve(userFound.fdTwoForms)
            resolve(null)
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
exports.addFDTwoInUser = function(paramFDTwo){
    return new Promise(function(resolve, reject){
        User.findOneAndUpdate({
            username : paramFDTwo.ownerIdNumber
        }, {
            $push : {fdTwoForms : paramFDTwo}
        }).then((updatedUser)=>{
            console.log("let it go, go go go")
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
exports.deleteFDTwoInUser = function(paramFDTwo){
    return new Promise(function(resolve, reject){
        User.findOneAndUpdate({
            username : paramFDTwo.ownerIdNumber
        }, {
            $pull : {fdTwoForms : {_id : paramFDTwo._id}}
        }).then((foundUser)=>{
            resolve(foundUser)
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
exports.editFDTwoInUser = function(paramFDTwo){
    return new Promise(function(resolve, reject){
        User.findOneAndUpdate({
            username : user.username
        }, {
            $set : { "fdTwoForms.$" : paramFDTwo}
        }).then((updatedUser)=>{
            resolve(updatedUser)
        }, (err)=>{
            reject(err)
        })
    })
}











/* FD 3EE */
/**
 * Gets FDTwo records in user Schema
 *
 * @param {Username of user that contains FDTwo} paramUsername
 */
exports.getFDThreeFormsByUser = function(paramUsername){
    return new Promise(function(resolve, reject){
        User.findOne({
            username : paramUsername
        }).then((userFound)=>{
            resolve(userFound.fdThreeForms)
        }, (err)=>{
            reject(err)
        })
    })
}


/**
 * Gets FDOne records in user Schema by Name
 *
 * @param {First name of user that contains FDOne} paramFirstName
 * @param {Last name of user that contains FDOne} paramLastName
 */
exports.getFDThreeFormsByFullName = function(paramFirstName, paramLastName){
    return new Promise(function(resolve, reject){
        User.findOne({
            firstName : paramFirstName,
            lastName : paramLastName
        }).then((userFound)=>{
            if(userFound!=null)
                resolve(userFound.fdThreeForms)
            
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets FDOne records in user Schema by First Name
 *
 * @param {First Name of user that contains FDOne} paramFirstName
 */
exports.getFDThreeFormsByFirstName = function(paramFirstName){
    return new Promise(function(resolve, reject){
        User.findOne({
            firstName : paramFirstName
        }).then((userFound)=>{
            if(userFound!=null)
                resolve(userFound.fdThreeForms)
            resolve(null)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets FDOne records in user Schema by Last Name
 *
 * @param {Last Name of user that contains FDOne} paramLastName
 */
exports.getFDThreeFormsByLastName = function(paramLastName){
    return new Promise(function(resolve, reject){
        User.findOne({
            lastName : paramLastName
        }).then((userFound)=>{
            if(userFound!=null)
                resolve(userFound.fdThreeForms)
            resolve(null)
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
exports.addFDThreeInUser = function(paramFDThree){
    return new Promise(function(resolve, reject){
        User.findOneAndUpdate({
            username : paramFDThree.ownerIdNumber
        }, {
            $push : {fdThreeForms : paramFDThree}
        }).then((updatedUser)=>{
            console.log("let it go, go go go")
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
exports.deleteFDThreeInUser = function(paramFDThree){
    return new Promise(function(resolve, reject){
        User.findOneAndUpdate({
            username : paramFDThree.ownerIdNumber
        }, {
            $pull : {fdThreeForms : {_id : paramFDThree._id}}
        }).then((foundUser)=>{
            resolve(foundUser)
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
exports.editFDThreeInUser = function(paramFDThree){
    return new Promise(function(resolve, reject){
        User.findOneAndUpdate({
            username : user.username
        }, {
            $set : { "fdThreeForms.$" : paramFDThree}
        }).then((updatedUser)=>{
            resolve(updatedUser)
        }, (err)=>{
            reject(err)
        })
    })
}