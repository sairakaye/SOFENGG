const mongoose = require("mongoose")
const crypto = require("crypto")
const fdOne = require("./fdOne.js")
const fdTwo = require("./fdTwo.js")

var userSchema = mongoose.Schema({
    
    userName : {
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