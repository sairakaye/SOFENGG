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
    fdOneTotal : Number,
    fdTwoTotal : Number,
    fdThreeTotal : Number,
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
 * Add new form cost to FD1 Total
 *
 * @param {college to use} college
 */
exports.addFDOneTotal = function(college){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdOneTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            console.log(college)
            collegeTotal = foundOverview.fdOneTotal + 1
            total = foundOverview.Total + 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdOneTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdOneTotal = foundTotalOverview.fdOneTotal + 1
                    overallTotal = foundTotalOverview.Total + 1
                    Overview.findOneAndUpdate({
                        collegeName : "Total"
                    }, {
                        "$set" : {"fdOneTotal" : fdOneTotal, "Total" : overallTotal}
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
 * Add new form cost to FD2 Total
 *
 * @param {college to use} college
 */
exports.addFDTwoTotal = function(college){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdTwoTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            console.log(college)
            collegeTotal = foundOverview.fdTwoTotal + 1
            total = foundOverview.Total + 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdTwoTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdTwoTotal = foundTotalOverview.fdTwoTotal + 1
                    overallTotal = foundTotalOverview.Total + 1
                    Overview.findOneAndUpdate({
                        collegeName : "Total"
                    }, {
                        "$set" : {"fdTwoTotal" : fdTwoTotal, "Total" : overallTotal}
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
 * Add new form cost to FD3 Total
 *
 * @param {college to use} college
 */
exports.addFDThreeTotal = function(college){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdThreeTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            console.log(college)
            collegeTotal = foundOverview.fdThreeTotal + 1
            total = foundOverview.Total + 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdThreeTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdThreeTotal = foundTotalOverview.fdThreeTotal + 1
                    overallTotal = foundTotalOverview.Total + 1
                    Overview.findOneAndUpdate({
                        collegeName : "Total"
                    }, {
                        "$set" : {"fdThreeTotal" : fdThreeTotal, "Total" : overallTotal}
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
            collegeTotal = foundOverview.fdFourTotal + 1
            total = foundOverview.Total + 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdFourTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdFourTotal = foundTotalOverview.fdFourTotal + 1
                    overallTotal = foundTotalOverview.Total + 1
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
            collegeTotal = foundOverview.fdFifteenTotal + 1
            total = foundOverview.Total + 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdFifteenTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdFifteenTotal = foundTotalOverview.fdFifteenTotal + 1
                    overallTotal = foundTotalOverview.Total + 1
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
            collegeTotal = foundOverview.fdSixteenTotal + 1
            total = foundOverview.Total + 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdSixteenTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdSixteenTotal = foundTotalOverview.fdSixteenTotal + 1
                    overallTotal = foundTotalOverview.Total + 1
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

//////////////////SUBTRACT//////////////////////////////////

/**
 * Add new form cost to FD1 Total
 *
 * @param {college to use} college
 */
exports.subtractFDOneTotal = function(college){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdOneTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            console.log(college)
            collegeTotal = foundOverview.fdOneTotal - 1
            total = foundOverview.Total - 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdOneTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdOneTotal = foundTotalOverview.fdOneTotal - 1
                    overallTotal = foundTotalOverview.Total - 1
                    Overview.findOneAndUpdate({
                        collegeName : "Total"
                    }, {
                        "$set" : {"fdOneTotal" : fdOneTotal, "Total" : overallTotal}
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
 * Add new form cost to FD2 Total
 *
 * @param {college to use} college
 */
exports.subtractFDTwoTotal = function(college){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdTwoTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            console.log(college)
            collegeTotal = foundOverview.fdTwoTotal - 1
            total = foundOverview.Total - 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdTwoTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdTwoTotal = foundTotalOverview.fdTwoTotal - 1
                    overallTotal = foundTotalOverview.Total - 1
                    Overview.findOneAndUpdate({
                        collegeName : "Total"
                    }, {
                        "$set" : {"fdTwoTotal" : fdTwoTotal, "Total" : overallTotal}
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
 * Add new form cost to FD3 Total
 *
 * @param {college to use} college
 */
exports.subtractFDThreeTotal = function(college){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdThreeTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            console.log(college)
            collegeTotal = foundOverview.fdThreeTotal - 1
            total = foundOverview.Total - 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdThreeTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdThreeTotal = foundTotalOverview.fdThreeTotal - 1
                    overallTotal = foundTotalOverview.Total - 1
                    Overview.findOneAndUpdate({
                        collegeName : "Total"
                    }, {
                        "$set" : {"fdThreeTotal" : fdThreeTotal, "Total" : overallTotal}
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
 * Add new form cost to FD4 Total
 *
 * @param {college to use} college
 */
exports.subtractFDFourTotal = function(college, cost){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdFourTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            console.log(college)
            collegeTotal = foundOverview.fdFourTotal - 1
            total = foundOverview.Total - 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdFourTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdFourTotal = foundTotalOverview.fdFourTotal - 1
                    overallTotal = foundTotalOverview.Total - 1
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
exports.subtractFDFifteenTotal = function(college, cost){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdFifteenTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            collegeTotal = foundOverview.fdFifteenTotal - 1
            total = foundOverview.Total - 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdFifteenTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdFifteenTotal = foundTotalOverview.fdFifteenTotal - 1
                    overallTotal = foundTotalOverview.Total - 1
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
exports.subtractFDSixteenTotal = function(college, cost){
    return new Promise(function(resolve, reject){
        var collegeTotal = 0
        var total = 0
        var fdSixteenTotal = 0
        var overallTotal = 0
        Overview.findOne({
            collegeName : college
        }).then((foundOverview)=>{
            collegeTotal = foundOverview.fdSixteenTotal - 1
            total = foundOverview.Total - 1
            Overview.findOneAndUpdate({
                collegeName : college
            }, {
                "$set" : {"fdSixteenTotal" : collegeTotal, "Total" : total}
            }).then((updatedOverview)=>{
                Overview.findOne({
                    collegeName : "Total"
                }).then((foundTotalOverview)=>{
                    fdSixteenTotal = foundTotalOverview.fdSixteenTotal - 1
                    overallTotal = foundTotalOverview.Total - 1
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

