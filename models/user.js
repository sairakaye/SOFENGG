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