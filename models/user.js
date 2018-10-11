const mongoose = require("mongoose")
const fdOne = require("./fdOne.js")
const fdTwo = require("./fdTwo.js")

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
    
    fdOneForms : [fdOne.fdOneSchema],
    
    fdTwoForms : [fdTwo.fdTwoSchema]
    
})

var User = mongoose.model("user", userSchema)

exports.authenticate = function(user){
    return new Promise(function(resolve, reject){
        User.findOne({
            username : user.username,
            password : user.password
        }).then((userFound)=>{
            resolve(userFound)
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