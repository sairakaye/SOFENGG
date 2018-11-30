/**
 * This contains schema initialization and 
 * model functions for the overview
 * November 29, 2018
 * @ver 1.0
 * @author Christian Dequito
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose")

/**
 * Setting up Overview Schema
 */
var overviewSchema = mongoose.Schema({
    
    collegeName : String,
    fdFourTotal : Number,
    fdFifteenTotal : Number,
    fdSixteenTotal : Number,
    Total : Number
    
})

var Overview = mongoose.model("overview", overviewSchema)


/**
 * Creates overview record in Overview Schema 
 *
 * @param {overview record to be created} mailer
 */
exports.create = function(overview){
  return new Promise(function(resolve, reject){
    var o = new Overview(overview)
    
    o.save().then((newOverview)=>{
      resolve(newOverview)
    }, (err)=>{
      reject(err)
    })
  })
}

/**
 * Gets one Overview record in Overview Schema by college as the parameter
 *
 * @param {college to use} college
 */
exports.getOverviewByCollege = function(college){
    return new Promise(function(resolve, reject){
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            resolve(foundOverview)
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Gets all Overview record in Overview Schema 
 */
exports.getAllOverview = function(){
    return new Promise(function(resolve, reject){
        Overview.find().then((overviews)=>{
            resolve(overviews)
        }, (err)=>{
            reject(err)
        })
    })
}


/**
 * Add new form cost to FD4 Total
 *
 * @param {college to use} college
 */
exports.addFDFourTotal = function(college, cost){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdFourTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            console.log(college)
            collegeTotal = foundOverview.fdFourTotal + cost
            total = foundOverview.Total + cost
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdFourTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdFourTotal = foundTotalOverview.fdFourTotal + cost
                    overallTotal = foundTotalOverview.Total + cost
                    Overview.findOneAndUpdate({
                        collegeName : "Total"
                    }, {
                        "$set" : {"fdFourTotal" : fdFourTotal, "Total" : overallTotal}
                    }).then((updatedTotalOverView)=>{
                        resolve(updatedTotalOverView)
                    }, (err)=>{
                        reject(err)
                    })
                }, (err)=>{
                    reject(err)
                })
            }, (err)=>{
                reject(err)
            })
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Add new form cost to FD15 Total
 *
 * @param {college to use} college
 */
exports.addFDFifteenTotal = function(college, cost){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdFifteenTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            collegeTotal = foundOverview.fdFifteenTotal + cost
            total = foundOverview.Total + cost
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdFifteenTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdFifteenTotal = foundTotalOverview.fdFifteenTotal + cost
                    overallTotal = foundTotalOverview.Total + cost
                    Overview.findOneAndUpdate({
                        collegeName : "Total"
                    }, {
                        "$set" : {"fdFifteenTotal" : fdFifteenTotal, "Total" : overallTotal}
                    }).then((updatedTotalOverView)=>{
                        resolve(updatedTotalOverView)
                    }, (err)=>{
                        reject(err)
                    })
                }, (err)=>{
                    reject(err)
                })
            }, (err)=>{
                reject(err)
            })
        }, (err)=>{
            reject(err)
        })
    })
}

/**
 * Add new form cost to FD16 Total
 *
 * @param {college to use} college
 */
exports.addFDSixteenTotal = function(college, cost){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdSixteenTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            collegeTotal = foundOverview.fdSixteenTotal + cost
            total = foundOverview.Total + cost
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdSixteenTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdSixteenTotal = foundTotalOverview.fdSixteenTotal + cost
                    overallTotal = foundTotalOverview.Total + cost
                    Overview.findOneAndUpdate({
                        collegeName : "Total"
                    }, {
                        "$set" : {"fdSixteenTotal" : fdSixteenTotal, "Total" : overallTotal}
                    }).then((updatedTotalOverView)=>{
                        resolve(updatedTotalOverView)
                    }, (err)=>{
                        reject(err)
                    })
                }, (err)=>{
                    reject(err)
                })
            }, (err)=>{
                reject(err)
            })
        }, (err)=>{
            reject(err)
        })
    })
}

