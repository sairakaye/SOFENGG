const mongoose = require("mongoose")
const crypto = require("crypto")
const fdOne = require("./fdOne.js")
const fdOneSchema = mongoose.model('fdOne').schema
const fdTwo = require("./fdTwo.js")
const fdTwoSchema = mongoose.model('fdTwo').schema


var userSchema = mongoose.Schema({
    
    username : {
        type : String,
        required : true
    },
    
    password : {
        type : String,
        required : true
    },
    
    name : {
        type : String, 
        required : true
    },
    
    department : {
        type : String, 
        required : true
    },
    
    status : String,
    
    dateHired : Date,
    
    fdOneForms : [fdOneSchema],
    
    fdTwoForms : [fdTwoSchema]
})

userSchema.pre("save", function(next){
  this.password = crypto.createHash("md5").update(this.password).digest("hex")
  next()
})

var User = mongoose.model("user", userSchema)

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

exports.findUser = function(paramUsername){
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

exports.findFDOneFormsByUser = function(paramUsername){
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

exports.findFDTwoFormsByUser = function(paramUsername){
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

//erroneous edit in user
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