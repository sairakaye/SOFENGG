/**
 * This controller is for users with 
 * administrative rights to the system.
 * October 18, 2018
 * @ver 1.0
 * @author Candace Mercado
 */

/**
 * Module dependencies.
 */
const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const moment = require("moment")
const urlencoder = bodyparser.urlencoded({
    extended: true
})
const router = express.Router()
router.use(urlencoder)
const app = express()
const nodemailer = require('nodemailer')
var excel = require('exceljs')
const xlsxj = require("xlsx-to-json")
const path = require("path")    
const multer = require('multer')
var excel = require('exceljs');

const User = require("../models/user")
const Mailer = require("../models/mailer")
const Overview = require("../models/overview")
const fdOne = require("../models/fdOne")
const fdTwo = require("../models/fdTwo")
const fdThree = require("../models/fdThree")
const fdFour = require("../models/fdFour")
const fdFifteen = require("../models/fdFifteen")
const fdSixteen = require("../models/fdSixteen")
const Remark = require("../models/remark")
const Settings = require("../models/settings")
var forms

const UPLOAD_PATH = path.resolve(__dirname, "uploads")
const upload = multer({
  dest: UPLOAD_PATH,
  limits: {
    fileSize : 10000000,
    files : 2
  }
})

/**
 * Leads to the page for requesting grants 
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/view-grants", function (req, res) {
    console.log("GET /view-grants")

    var user = req.session.user
    if (user) {
        if (user.userType != 'Secretary')
            res.redirect("/")
            
        forms = getAllForms(function (forms) {
            if (forms == "") {
                res.render("view-grants.hbs", {
                    user
                })
            } else {
                res.render("view-grants.hbs", {
                    user, forms
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Views details based on form id
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/view-details", urlencoder, function (req, res) {
    console.log("POST /view-details")

    var user = req.session.user
    var id = req.body.details

    if (user) {
        if (user.userType != 'Secretary')
            res.redirect("/")

        var forms = getFormById(id, function (forms) {
            if (forms.grantName == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
                var fdOneData = forms

                Remark.getRemarksFromForm(fdOneData).then((foundRemarks) => {
                    res.render("preview-form1.hbs", {
                        user, fdOneData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdOneData._id, grant: fdOneData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            } else if (forms.grantName == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
                var fdTwoData = forms

                Remark.getRemarksFromForm(fdTwoData).then((foundRemarks) => {
                    res.render("preview-form2.hbs", {
                        user, fdTwoData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdTwoData._id, grant: fdTwoData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            } else if (forms.grantName == "[FD3] Support for Paper Presentations in Conferences") {
                var fdThreeData = forms

                Remark.getRemarksFromForm(fdThreeData).then((foundRemarks) => {
                    res.render("preview-form3.hbs", {
                        user, fdThreeData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdThreeData._id, grant: fdThreeData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            } else if (forms.grantName == "[FD4] Support for Participation in Local Conferences") {
                var fdFourData = forms

                Remark.getRemarksFromForm(fdFourData).then((foundRemarks) => {
                    res.render("preview-form4.hbs", {
                        user, fdFourData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdFourData._id, grant: fdFourData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            } else if (forms.grantName == "[FD15] Support for Local Trainings, Seminars and Workshops") {
                var fdFifteenData = forms

                Remark.getRemarksFromForm(fdFifteenData).then((foundRemarks) => {
                    res.render("preview-form15.hbs", {
                        user, fdFifteenData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdFifteenData._id, grant: fdFifteenData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            } else if (forms.grantName == "[FD16] Support for Membership in Professional Organizations") {
                var fdSixteenData = forms

                Remark.getRemarksFromForm(fdSixteenData).then((foundRemarks) => {
                    res.render("preview-form16.hbs", {
                        user, fdSixteenData, adminAccess: "True", remarks: foundRemarks,
                        formID: fdSixteenData._id, grant: fdSixteenData.grantName
                    })
                }, (err) => {
                    res.send(err)
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Change status of the form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/change-status", urlencoder, function (req, res) {
    console.log("POST /change-status")

    var currentStatus = req.body.currentStatus
    var status = req.body.status
    var id = req.body.formID
    var grant = req.body.grant
    var remark = req.body.remark

    var statusMessage = ""

    if (status == "Approved" || status == "Rejected" || status == "Pending") {
        statusMessage = status

        if (remark == null || remark == "")
            remark = "Status changed to " + status + "."
    } else
        statusMessage = currentStatus

    var remarkObj = {
        formId: id, status: statusMessage, remark
    }

    if (status == "Approved" || status == "Rejected" || status == "Pending") {
        if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
            fdOne.getFDOneByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdOne.changeStatusFDOne(id, status).then((foundFDOne) => {
                        User.changeStatusFDOneInUser(foundFDOne).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdOne.addRemarkInFDOne(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })

                                        if (status == "Approved") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                "\n\nGood day!\n\nYour request for funding at the " + foundFDOne.formId + " " +
                                                foundFDOne.grantName + " has been approved and forwarded to the accounting office.\n\n" +
                                                "Regulations on disbursements shall follow the relevant DLSU accounting procedures." +
                                                " Please contact the Disbursement Section at local 118\n\nRemarks:\n\n" + newRemark.remark +
                                                "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }
                                            Overview.addFDOneTotal(updatedUser.college).then((updatedOverview) => {
                                                console.log("Added to Approved Files!")
                                            }, (err) => {
                                                res.send(err)
                                            })
                                        } else if (status == "Rejected") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nIt is with deep regret for us to inform you that your request for funding for " + foundFDOne.formId + " " + foundFDOne.grantName +
                                                    " has been declined. The reason/s for your declinations are as follows:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }

                                        } else if (status == "Pending") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nYour application for " + foundFDOne.formId + " " + foundFDOne.grantName +
                                                    " has been pended for the following reasons:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }

                                        }


                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })

                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })
        }
        else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
            fdTwo.getFDTwoByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdTwo.changeStatusFDTwo(id, status).then((foundFDTwo) => {
                        User.changeStatusFDTwoInUser(foundFDTwo, status).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdTwo.addRemarkInFDTwo(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })

                                        if (status == "Approved") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nYour request for funding at the " + foundFDTwo.formId + " " +
                                                    foundFDTwo.grantName + " has been approved and forwarded to the accounting office.\n\n" +
                                                    "Regulations on disbursements shall follow the relevant DLSU accounting procedures." +
                                                    " Please contact the Disbursement Section at local 118\n\nRemarks:\n\n" + newRemark.remark +
                                                    "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }
                                            
                                            Overview.addFDTwoTotal(updatedUser.college).then((updatedOverview) => {
                                                console.log("Added to Approved Files!")
                                            }, (err) => {
                                                res.send(err)
                                            })
                                        } else if (status == "Rejected") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nIt is with deep regret for us to inform you that your request for funding for " + foundFDTwo.formId + " " + foundFDTwo.grantName +
                                                    " has been declined. The reason/s for your declinations are as follows:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }

                                        } else if (status == "Pending") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nYour application for " + foundFDTwo.formId + " " + foundFDTwo.grantName +
                                                    " has been pended for the following reasons:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nViceChancellor for Academics Office"
                                            }

                                        }

                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })

                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })
        }
        else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
            fdThree.getFDThreeByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdThree.changeStatusFDThree(id, status).then((foundFDThree) => {
                        User.changeStatusFDThreeInUser(foundFDThree, status).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdThree.addRemarkInFDThree(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })

                                        if (status == "Approved") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nYour request for funding at the " + foundFDThree.formId + " " +
                                                    foundFDThree.grantName + " has been approved and forwarded to the accounting office.\n\n" +
                                                    "Regulations on disbursements shall follow the relevant DLSU accounting procedures." +
                                                    " Please contact the Disbursement Section at local 118\n\nRemarks:\n\n" + newRemark.remark +
                                                    "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }
                                            
                                            Overview.addFDThreeTotal(updatedUser.college).then((updatedOverview) => {
                                                console.log("Added to Approved Files!")
                                            }, (err) => {
                                                res.send(err)
                                            })
                                        } else if (status == "Rejected") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nIt is with deep regret for us to inform you that your request for funding for " + foundFDThree.formId + " " + foundFDThree.grantName +
                                                    " has been declined. The reason/s for your declinations are as follows:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }

                                        } else if (status == "Pending") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nYour application for " + foundFDThree.formId + " " + foundFDThree.grantName +
                                                    " has been pended for the following reasons:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }

                                        }

                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })

                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })


        }
        else if (grant == "[FD4] Support for Participation in Local Conferences") {
            fdFour.getFDFourByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdFour.changeStatusFDFour(id, status).then((foundFDFour) => {
                        User.changeStatusFDFourInUser(foundFDFour, status).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdFour.addRemarkInFDFour(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })

                                        if (status == "Approved") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nYour request for funding at the " + foundFDFour.formId + " " +
                                                    foundFDFour.grantName + " has been approved and forwarded to the accounting office.\n\n" +
                                                    "Regulations on disbursements shall follow the relevant DLSU accounting procedures." +
                                                    " Please contact the Disbursement Section at local 118\n\nRemarks:\n\n" + newRemark.remark +
                                                    "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }
                                            Overview.addFDFourTotal(updatedUser.college).then((updatedOverview) => {
                                                console.log("Added to Approved Files!")
                                            }, (err) => {
                                                res.send(err)
                                            })
                                        } else if (status == "Rejected") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nIt is with deep regret for us to inform you that your request for funding for " + foundFDFour.formId + " " + foundFDFour.grantName +
                                                    " has been declined. The reason/s for your declinations are as follows:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }

                                        } else if (status == "Pending") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nYour application for " + foundFDFour.formId + " " + foundFDFour.grantName +
                                                    " has been pended for the following reasons:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }

                                        }

                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })

                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })
        }
        else if (grant == "[FD15] Support for Local Trainings, Seminars and Workshops") {
            fdFifteen.getFDFifteenByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdFifteen.changeStatusFDFifteen(id, status).then((foundFDFifteen) => {
                        User.changeStatusFDFifteenInUser(foundFDFifteen, status).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdFifteen.addRemarkInFDFifteen(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })

                                        if (status == "Approved") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nYour request for funding at the " + foundFDFifteen.formId + " " +
                                                    foundFDFifteen.grantName + " has been approved and forwarded to the accounting office.\n\n" +
                                                    "Regulations on disbursements shall follow the relevant DLSU accounting procedures." +
                                                    " Please contact the Disbursement Section at local 118\n\nRemarks:\n\n" + newRemark.remark +
                                                    "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }
                                            Overview.addFDFifteenTotal(updatedUser.college).then((updatedOverview) => {
                                                console.log("Added to Approved Files!")
                                            }, (err) => {
                                                res.send(err)
                                            })
                                        } else if (status == "Rejected") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nIt is with deep regret for us to inform you that your request for funding for " + foundFDFifteen.formId + " " + foundFDFifteen.grantName +
                                                    " has been declined. The reason/s for your declinations are as follows:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }

                                        } else if (status == "Pending") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nYour application for " + foundFDFifteen.formId + " " + foundFDFifteen.grantName +
                                                    " has been pended for the following reasons:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }

                                        }

                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })

                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })
        }
        else if (grant == "[FD16] Support for Membership in Professional Organizations") {
            fdSixteen.getFDSixteenByID(id).then((foundForm) => {
                if (foundForm.status !== status) {
                    fdSixteen.changeStatusFDSixteen(id, status).then((foundFDSixteen) => {
                        User.changeStatusFDSixteenInUser(foundFDSixteen).then((updatedUser) => {
                            Remark.create(remarkObj).then((newRemark) => {
                                fdSixteen.addRemarkInFDSixteen(newRemark).then(() => {
                                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: newMailer.emailAddress,
                                                pass: newMailer.password
                                            }
                                        })

                                        if (status == "Approved") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nYour request for funding at the " + foundFDSixteen.formId + " " +
                                                    foundFDSixteen.grantName + " has been approved and forwarded to the accounting office.\n\n" +
                                                    "Regulations on disbursements shall follow the relevant DLSU accounting procedures." +
                                                    " Please contact the Disbursement Section at local 118\n\nRemarks:\n\n" + newRemark.remark +
                                                    "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }
                                            Overview.addFDSixteenTotal(updatedUser.college).then((updatedOverview) => {
                                                console.log("Added to Approved Files!")
                                            }, (err) => {
                                                res.send(err)
                                            })
                                        } else if (status == "Rejected") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nIt is with deep regret for us to inform you that your request for funding for " + foundFDSixteen.formId + " " + foundFDSixteen.grantName +
                                                    " has been declined. The reason/s for your declinations are as follows:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }

                                        } else if (status == "Pending") {
                                            var mailOptions = {
                                                from: newMailer.emailAddress,
                                                to: updatedUser.emailAddress,
                                                subject: "[OVCA]",
                                                text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                                                    "\n\nGood day!\n\nYour application for " + foundFDSixteen.formId + " " + foundFDSixteen.grantName +
                                                    " has been pended for the following reasons:\n\n" +
                                                    newRemark.remark + "\n\nThank You.\n\nVice Chancellor for Academics Office"
                                            }

                                        }

                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        })

                                        res.send(newRemark)
                                    }, (err) => {
                                        res.send(err)
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.send(foundForm)
                }
            })

        }
    } else if (remarkObj !== null) {
        if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
            Remark.create(remarkObj).then((newRemark) => {
                fdOne.addRemarkInFDOne(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
        else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
            Remark.create(remarkObj).then((newRemark) => {
                fdTwo.addRemarkInFDTwo(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
        else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
            Remark.create(remarkObj).then((newRemark) => {
                fdThree.addRemarkInFDThree(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
        else if (grant == "[FD4] Support for Participation in Local Conferences") {
            Remark.create(remarkObj).then((newRemark) => {
                fdFour.addRemarkInFDFour(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
        else if (grant == "[FD15] Incentive for Publication in Pre-Selected High Impact Journal") {
            Remark.create(remarkObj).then((newRemark) => {
                fdFifteen.addRemarkInFDFifteen(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
        else if (grant == "[FD16] Support for Membership in Professional Organizations") {
            Remark.create(remarkObj).then((newRemark) => {
                fdSixteen.addRemarkInFDSixteen(newRemark).then(() => {
                    res.send(newRemark)
                })
            })
        }
    }
})

/**
 * Deletes a grant request form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.delete("/delete-remark", urlencoder, (req, res) => {
    console.log("POST /delete-remark " + req.body.id)

    var grant = req.body.grant
    var formID = req.body.formID
    var remarkID = req.body.id

    if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
        Remark.getRemark(formID, remarkID).then((foundRemark) => {
            fdOne.deleteRemarkInFDOne(foundRemark).then((deletedRemark) => {
                Remark.delete(remarkID).then((deletedResult) => {
                    res.send(deletedResult)
                })
            }, (err) => {
                res.send(err)
            })
        })
    }
    else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
        Remark.getRemark(formID, remarkID).then((foundRemark) => {
            fdTwo.deleteRemarkInFDTwo(foundRemark).then((deletedRemark) => {
                Remark.delete(remarkID).then((deletedResult) => {
                    res.send(deletedResult)
                })
            }, (err) => {
                res.send(err)
            })
        })
    }
    else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
        Remark.getRemark(formID, remarkID).then((foundRemark) => {
            fdThree.deleteRemarkInFDThree(foundRemark).then((deletedRemark) => {
                Remark.delete(remarkID).then((deletedResult) => {
                    res.send(deletedResult)
                })
            }, (err) => {
                res.send(err)
            })
        })
    }
    else if (grant == "[FD4] Support for Participation in Local Conferences") {
        Remark.getRemark(formID, remarkID).then((foundRemark) => {
            fdFour.deleteRemarkInFDFour(foundRemark).then((deletedRemark) => {
                Remark.delete(remarkID).then((deletedResult) => {
                    res.send(deletedResult)
                })
            }, (err) => {
                res.send(err)
            })
        })
    }
    else if (grant == "[FD15] Support for Local Trainings, Seminars and Workshops") {
        Remark.getRemark(formID, remarkID).then((foundRemark) => {
            fdFifteen.deleteRemarkInFDFifteen(foundRemark).then((deletedRemark) => {
                Remark.delete(remarkID).then((deletedResult) => {
                    res.send(deletedResult)
                })
            }, (err) => {
                res.send(err)
            })
        })
    }
    else if (grant == "[FD16] Support for Membership in Professional Organizations") {
        Remark.getRemark(formID, remarkID).then((foundRemark) => {
            fdSixteen.deleteRemarkInFDSixteen(foundRemark).then((deletedRemark) => {
                Remark.delete(remarkID).then((deletedResult) => {
                    res.send(deletedResult)
                })
            }, (err) => {
                res.send(err)
            })
        })
    }
})

/**
 * Deletes a grant request form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.delete("/delete-form", urlencoder, (req, res) => {
    console.log("POST /delete-form " + req.body.id)

    var grant = req.body.grant
    var id = req.body.id

    if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
        fdOne.getFDOneByID(id).then((foundFDOne) => {
            User.deleteFDOneInUser(foundFDOne).then((updatedUser) => {
                fdOne.delete(req.body.id).then((result) => {
                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: newMailer.emailAddress,
                                pass: newMailer.password
                            }
                        })
                        
                        var mailOptions = {
                            from: newMailer.emailAddress,
                            to: updatedUser.emailAddress,
                            subject: "[OVCA]",
                            text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                            "\n\nGood day!\n\nYour application for " + foundFDOne.formId + " " + foundFDOne.grantName +
                            " has been removed\n\n" + "Thank You.\n\nVice Chancellor for Academics Office"
                        }
                        
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        })
                        
                        res.send(result)
                        
                    }, (err)=>{
                        res.send(err)
                    })
                })
            })
        })
    }
    else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
        fdTwo.getFDTwoByID(id).then((foundFDTwo) => {
            User.deleteFDTwoInUser(foundFDTwo).then((updatedUser) => {
                fdTwo.delete(req.body.id).then((result) => {
                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: newMailer.emailAddress,
                                pass: newMailer.password
                            }
                        })
                        
                        var mailOptions = {
                            from: newMailer.emailAddress,
                            to: updatedUser.emailAddress,
                            subject: "[OVCA]",
                            text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                            "\n\nGood day!\n\nYour application for " + foundFDTwo.formId + " " + foundFDTwo.grantName +
                            " has been removed\n\n" + "Thank You.\n\nVice Chancellor for Academics Office"
                        }
                        
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        })
                        
                        res.send(result)
                        
                    }, (err)=>{
                        res.send(err)
                    })
                })
            })
        })
    }
    else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
        fdThree.getFDThreeByID(id).then((foundFDThree) => {
            User.deleteFDThreeInUser(foundFDThree).then((updatedUser) => {
                fdThree.delete(req.body.id).then((result) => {
                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: newMailer.emailAddress,
                                pass: newMailer.password
                            }
                        })
                        
                        var mailOptions = {
                            from: newMailer.emailAddress,
                            to: updatedUser.emailAddress,
                            subject: "[OVCA]",
                            text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                            "\n\nGood day!\n\nYour application for " + foundFDThree.formId + " " + foundFDThree.grantName +
                            " has been removed\n\n" + "Thank You.\n\nVice Chancellor for Academics Office"
                        }
                        
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        })
                        
                        res.send(result)
                        
                    }, (err)=>{
                        res.send(err)
                    })
                })
            })
        })
    }
    else if (grant == "[FD4] Support for Participation in Local Conferences") {
        fdFour.getFDFourByID(id).then((foundFDFour) => {
            User.deleteFDFourInUser(foundFDFour).then((updatedUser) => {
                fdFour.delete(req.body.id).then((result) => {
                     Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: newMailer.emailAddress,
                                pass: newMailer.password
                            }
                        })
                        
                        var mailOptions = {
                            from: newMailer.emailAddress,
                            to: updatedUser.emailAddress,
                            subject: "[OVCA]",
                            text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                            "\n\nGood day!\n\nYour application for " + foundFDFour.formId + " " + foundFDFour.grantName +
                            " has been removed\n\n" + "Thank You.\n\nVice Chancellor for Academics Office"
                        }
                        
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        })
                        
                        res.send(result)
                        
                    }, (err)=>{
                        res.send(err)
                    })
                })
            })
        })
    }
    else if (grant == "[FD15] Support for Local Trainings, Seminars and Workshops") {
        fdFifteen.getFDFifteenByID(id).then((foundFDFifteen) => {
            User.deleteFDFifteenInUser(foundFDFifteen).then((updatedUser) => {
                fdFifteen.delete(req.body.id).then((result) => {
                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: newMailer.emailAddress,
                                pass: newMailer.password
                            }
                        })
                        
                        var mailOptions = {
                            from: newMailer.emailAddress,
                            to: updatedUser.emailAddress,
                            subject: "[OVCA]",
                            text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                            "\n\nGood day!\n\nYour application for " + foundFDFifteen.formId + " " + foundFDFifteen.grantName +
                            " has been removed\n\n" + "Thank You.\n\nVice Chancellor for Academics Office"
                        }
                        
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        })
                        
                        res.send(result)
                        
                    }, (err)=>{
                        res.send(err)
                    })
                })
            })
        })
    }
    else if (grant == "[FD16] Support for Membership in Professional Organizations") {
        fdSixteen.getFDSixteenByID(id).then((foundFDSixteen) => {
            User.deleteFDSixteenInUser(foundFDSixteen).then((updatedUser) => {
                fdSixteen.delete(req.body.id).then((result) => {
                    Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: newMailer.emailAddress,
                                pass: newMailer.password
                            }
                        })
                        
                        var mailOptions = {
                            from: newMailer.emailAddress,
                            to: updatedUser.emailAddress,
                            subject: "[OVCA]",
                            text: "Dear " + updatedUser.salutation + updatedUser.firstName + " "+ updatedUser.middleName +" " + updatedUser.lastName +
                            "\n\nGood day!\n\nYour application for " + foundFDSixteen.formId + " " + foundFDSixteen.grantName +
                            " has been removed\n\n" + "Thank You.\n\nVice Chancellor for Academics Office"
                        }
                        
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        })
                        
                        res.send(result)
                        
                    }, (err)=>{
                        res.send(err)
                    })
                })
            })
        })
    }

})

/**
 * Approves a grant request form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/approveform", urlencoder, (req, res) => {
    console.log("POST /approveform " + req.body.id)

    var grant = req.body.grant
    var id = req.body.id

    if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
        fdOne.approveFDOne(id).then((foundFDOne) => {
            User.changeStatusFDOneInUser(foundFDOne, "Approve").then((updatedUser) => {
                Mailer.getMailerByEmail("ovca.dlsu@gmail.com").then((newMailer) => {

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: newMailer.emailAddress,
                            pass: newMailer.password
                        }
                    })

                    var mailOptions = {
                        from: newMailer.emailAddress,
                        to: updatedUser.emailAddress,
                        subject: "[OVCA]",
                        text: foundFDOne.formId + " of " + foundFDOne.grantName + " has been approved!"
                    }

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    })

                    res.send(updatedUser)
                }, (err) => {
                    res.send(err)
                })
            })
        })
    }
    else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
        fdTwo.approveFDTwo(id).then((foundFDTwo) => {
            User.approveFDTwoInUser(foundFDTwo).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
        fdThree.approveFDThree(id).then((foundFDThree) => {
            User.approveFDThreeInUser(foundFDThree).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD4] Support for Participation in Local Conferences") {
        fdFour.approveFDFour(id).then((foundFDFour) => {
            User.approveFDFourInUser(foundFDFour).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD15] Incentive for Publication in Pre-Selected High Impact Journal") {
        fdFifteen.approveFDFifteen(id).then((foundFDFifteen) => {
            User.approveFDFifteenInUser(foundFDFifteen).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD16] Support for Membership in Professional Organizations") {
        fdSixteen.approveFDSixteen(id).then((foundFDSixteen) => {
            User.approveFDSixteenInUser(foundFDSixteen).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }

})

/**
 * Rejects a grant request form
 *
 * @param {Request} req
 * @param {Response} res
 */
router.post("/rejectform", urlencoder, (req, res) => {
    console.log("POST /rejectform " + req.body.id)

    var grant = req.body.grant
    var id = req.body.id

    if (grant == "[FD1] Incentive for Publication in Pre-Selected High Impact Journal") {
        fdOne.rejectFDOne(id).then((foundFDOne) => {
            User.rejectFDOneInUser(foundFDOne).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD2] Incentive for Publication in Pre-Selected High Impact Conferences") {
        fdTwo.rejectFDTwo(id).then((foundFDTwo) => {
            User.rejectFDTwoInUser(foundFDTwo).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD3] Support for Paper Presentations in Conferences") {
        fdThree.rejectFDThree(id).then((foundFDThree) => {
            User.rejectFDThreeInUser(foundFDThree).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD4] Support for Participation in Local Conferences") {
        fdFour.rejectFDFour(id).then((foundFDFour) => {
            User.rejectFDFourInUser(foundFDFour).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD15] Incentive for Publication in Pre-Selected High Impact Journal") {
        fdFifteen.rejectFDFifteen(id).then((foundFDFifteen) => {
            User.rejectFDFifteenInUser(foundFDFifteen).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }
    else if (grant == "[FD16] Support for Membership in Professional Organizations") {
        fdSixteen.rejectFDSixteen(id).then((foundFDSixteen) => {
            User.rejectFDSixteenInUser(foundFDSixteen).then((updatedUser) => {
                res.send(updatedUser)
            })
        })
    }

})

/**
 * Going to the settings page for the admin.
 * @param {Request} req
 * @param {Response} res
 */
router.get("/settings", (req, res) => {
    console.log("GET /settings")

    var user = req.session.user

    if (user.userType != 'Secretary')
        res.redirect("/")

    if (user) {
        res.render("settings", {
            user
        })
    } else {
        res.redirect("/")
    }
})

/**
 * Saving the settings set by the admin.
 * @param {Request} req
 * @param {Response} res
 */
router.post("/save-settings", urlencoder, (req, res) => {
    console.log("POST /save-settings")

    var user = req.session.user

    var term = req.body.term
    var startAY = req.body.startAY
    var endAY = req.body.endAY

    var newSettings = {
        term, startAY, endAY
    }

    Settings.updateSettings(newSettings).then((updatedSettings) => {
        res.redirect("/")
    })
})

/**
* Updates Faculty List
*
* @param {Request} req
* @param {Response} res
*/
router.post("/upload", upload.single("filename"), (req, res) => {
    /** Multer gives us file info in req.file object */
    try {
        
        xlsxj({
            input: req.file.path,
            output : null
        }, function(err, result) {
            if(err) {
                console.error(err)
            }else {
                User.remove().then((idk)=>{
                    for(var i=0; i<result.length; i++){
                        var updatedUser = {
                            username: result[i].PERSONNELIDNO,
                            password: result[i].PASSWORD,
                            salutation : result[i].SALUTATION,
                            firstName: result[i].FIRSTNAME, 
                            middleName: result[i].MIDDLENAME,
                            lastName: result[i].LASTNAME, 
                            department: result[i].DEPARTMENTCODE, 
                            college : result[i].COLLEGECODE,
                            emailAddress : result[i].EMAILADDRESS,
                            userType: result[i].CATEGORY,
                            employmentType: result[i].CLASSIFICATION,
                            rank: result[i].RANK,
                            status: result[i].EMPLOYMENT_STATUS,
                            aveTeachingPerformance : result[i].AVERAGE_TEACHING_PERFORMANCE,
                            dateHired: Date.parse(result[i].DATE_HIRED),
                        }
                        if(updatedUser.employmentType == "FT"){
                            updatedUser.employmentType = "Full-time"
                        }else if(updatedUser.employmentType == "PT"){
                            updatedUser.employmentType = "Part-time"
                        }
                        User.create(updatedUser).then((user)=>{
                            fdOne.getFDOneByLoginId(user.username).then((userForms)=>{
                                if(userForms){
                                    for(var j=0; j<userForms.length; j++){
                                        User.addFDOneInUser(userForms[j]).then((newUser)=>{
                                        }, (err)=>{
                                            res.send(err)
                                        })
                                    }
                                }
                                fdTwo.getFDTwoByLoginId(user.username).then((userForms)=>{
                                    if(userForms){
                                        for(var j=0; j<userForms.length; j++){
                                            User.addFDTwoInUser(userForms[j]).then((newUser)=>{
                                            }, (err)=>{
                                                res.send(err)
                                            })
                                        }
                                    }
                                    fdThree.getFDThreeByLoginId(user.username).then((userForms)=>{
                                        if(userForms){
                                            for(var j=0; j<userForms.length; j++){
                                                User.addFDThreeInUser(userForms[j]).then((newUser)=>{
                                                }, (err)=>{
                                                    res.send(err)
                                                })
                                            }
                                        }
                                        
                                        fdFour.getFDFourByLoginId(user.username).then((userForms)=>{
                                            if(userForms){
                                                for(var j=0; j<userForms.length; j++){
                                                    User.addFDFourInUser(userForms[j]).then((newUser)=>{
                                                    }, (err)=>{
                                                        res.send(err)
                                                    })
                                                }
                                            }
                                            
                                            fdFifteen.getFDFifteenByLoginId(user.username).then((userForms)=>{
                                                if(userForms){
                                                    for(var j=0; j<userForms.length; j++){
                                                        User.addFDFifteenInUser(userForms[j]).then((newUser)=>{
                                                        }, (err)=>{
                                                            res.send(err)
                                                        })
                                                    }
                                                }
                                                fdSixteen.getFDSixteenByLoginId(user.username).then((userForms)=>{
                                                    if(userForms){
                                                        for(var j=0; j<userForms.length; j++){
                                                            User.addFDSixteenInUser(userForms[j]).then((newUser)=>{
                                                            }, (err)=>{
                                                                res.send(err)
                                                            })
                                                        }
                                                    }
                                                }, (err)=>{
                                                    res.send(err)
                                                })
                                                
                                            }, (err)=>{
                                                res.send(err)
                                            })
                                        }, (err)=>{
                                            res.send(err)
                                        })
                                        
                                    }, (err)=>{
                                        res.send(err)
                                    })
                                    
                                }, (err)=>{
                                    res.send(err)
                                })
                                
                            }, (err)=>{
                                res.send(err)
                            })
                            
                        }, (error)=>{
                            console.log("ERROR")
                            console.log(error)
                        })
                    }
                    
                }, (err)=>{
                    res.send(err)
                })
            }
        })
        
        Overview.getAllOverview().then((totalArray)=>{
            var user = req.session.user
            res.render("home-admin.hbs", {
                user, totalArray
            })
        }, (err)=>{
            res.send(err)
        })
    } catch (e){
        res.send(e)
    }
})

module.exports = router

/**
 * Gets all forms
 *
 * @param {Callback function} callback
 */
function getAllForms(callback) {

    fdOne.getAllFDOne().then((fdOneData) => {
        forms = fdOneData
        fdTwo.getAllFDTwo().then((fdTwoData) => {
            forms = forms.concat(fdTwoData)
            fdThree.getAllFDThree().then((fdThreeData) => {
                forms = forms.concat(fdThreeData)
                fdFour.getAllFDFour().then((fdFourData) => {
                    forms = forms.concat(fdFourData)
                    fdFifteen.getAllFDFifteen().then((fdFifteenData) => {
                        forms = forms.concat(fdFifteenData)
                        fdSixteen.getAllFDSixteen().then((fdSixteenData) => {
                            forms = forms.concat(fdSixteenData)
                            callback(forms)
                        })
                    })
                })
            })
        })
    })
}

/**
 * Compares two values from the .hbs files for ease of
 *  display and acts like an if-else condition function
 *
 * @param {options} options.fn
 * @param {options} options.inverse
 */
hbs.registerHelper('checkstatus', function (p1, p2, options) {
    if (p1 == p2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})

/**
 * For formating of date with the time.
 * 
 * @param {Date} date  
 */
hbs.registerHelper('formatDateTime', function (date) {
    var momentDate = moment(date);
    return momentDate.format("MMMM D, YYYY h:mm A");
})

/**
 * For formating of date.
 * 
 * @param {Date} date  
 */
hbs.registerHelper('formatDate', function (date) {
    if (date == null || date == undefined) {
        momentDate = "N/A"
        return momentDate
    }
    var momentDate = moment(date);
    return momentDate.format("MMMM D, YYYY");
})

/**
 * Gets a form (By ID)
 *
 * @param {Filter} id
 * @param {Callback function} callback
 */
function getFormById(id, callback) {

    fdOne.getFDOneByID(id).then((fdOneData) => {
        forms = fdOneData
        if (forms != null)
            callback(forms)
        fdTwo.getFDTwoByID(id).then((fdTwoData) => {
            forms = fdTwoData
            if (forms != null)
                callback(forms)
            fdThree.getFDThreeByID(id).then((fdThreeData) => {
                forms = fdThreeData
                if (forms != null)
                    callback(forms)
                fdFour.getFDFourByID(id).then((fdFourData) => {
                    forms = fdFourData
                    if (forms != null)
                        callback(forms)
                    fdFifteen.getFDFifteenByID(id).then((fdFifteenData) => {
                        forms = fdFifteenData
                        if (forms != null)
                            callback(forms)
                        fdSixteen.getFDSixteenByID(id).then((fdSixteenData) => {
                            forms = fdSixteenData
                            if (forms != null)
                                callback(forms)
                        })
                    })
                })
            })
        })
    })
}

/**
 * Gets the form with the id being requested, this is 
 * used in exporting the form as pdf file.
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/saveform", urlencoder, (req, res) => {
    console.log("GET /saveform ")

    var user = req.session.user
    var id = req.query.id

    if (user) {
        if (user.userType != 'Secretary')
            res.redirect("/")
            
        var forms = getFormById(id, function (forms) {
            res.send(forms)
        })
    } else {
        res.redirect("/")
    }

})

/**
 * Gets the forms requested, this is 
 * used in exporting the data as an excel file
 *
 * @param {Request} req
 * @param {Response} res
 */
router.get("/export", urlencoder, (req, res) => {
    console.log("GET /export ")
           
        var MongoClient = require('mongodb').MongoClient

        MongoClient.connect('mongodb://localhost', function (err, client) {
            if (err) throw err          
            var workbook = new excel.Workbook();
            var db = client.db('VCA-Database')
    
            db.collection('fdones').find({},{_id:0,user:true,db:true,roles:true } ).toArray(function(err, items)  {     
                var worksheet = workbook.addWorksheet('FD1');
                var font = { name: "Arial", family: 2, size: 16, bold: true, color: {'argb': 'FF1F497D'}};
    
                worksheet.mergeCells('A1', 'K1');
                worksheet.getCell('A1').value = 'FD1 - Pre Selected High Impact Journal, AY 2018-2019'
                worksheet.getCell('L1').value = 'ETD'
                worksheet.getCell("N1").value = 'BUDGET'
                worksheet.getCell("A1").font = font;
                worksheet.getCell("L1").font = font;
                worksheet.getCell("N1").font = font;
                worksheet.getCell('M1').value = { formula :'SUM(L3:L39)' };  
    
                worksheet.getRow(2).values = ['TERM', 'COLLEGE', 'DEPT', 'STATUS', 'FACULTY NAME', 'TITLE OF PAPER OR PUBLICATION', 'TITLE OF JOURNAL', 
                'TITLE OF PAPER TO BE PRESENTED', 'DATE OF CONFERENCE', 'VENUE', 'REMARKS/BENEFIT', 'DOLLAR', 'PESO', 'PRS NO.', 'PAYABLE TO', 'DATE RECEIVED BY ACCTG.', 
                'SUMMARY REPORT(Received by VCAO)', 'LIQUIDATION(Received by VCAO)', 'Remarks'];
                worksheet.getRow(2).font = { size: 9, bold: true };

                for (i = 1; i <= 20; i++)  {
                    worksheet.getRow(2).getCell(i).fill = { type: 'pattern', pattern: 'solid', fgColor:{argb:'FFCDF2BE'}, bgColor:{argb:'FFCDF2BE'}}
                    worksheet.getRow(2).getCell(i).border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
                }

                worksheet.columns = [{key: 'term', width: 7}, {key: 'college', width: 10}, {key: 'dept', width: 13}, {key: 'status', width: 12}, {key: 'facultyname', width: 28}, {key: 'titlepaper', width: 30}, {key: 'titleppresent', width: 30},{key: 'titlejournal', width: 30},
                {key: 'dateconf', width: 28}, {key: 'venue', width: 20}, {key: 'remarksbenefit', width: 28}, {key: 'dollar', width: 9}, {key: 'peso', width: 13}, {key: 'prsno', width: 16},  {key: 'payabto', width: 25}, {key: 'daterecivacct', width: 14}, 
                {key: 'summaryreport', width: 15}, {key: 'liquida', width: 15}, {key: 'remarks', width: 15}]

                items.forEach(function(item) {
                    worksheet.addRow({  term: item.term, dept: item.department, status: item.status, facultyname: item.firstName + " " + item.lastName, titlepaper: item.titleOfPaperOrPublication, 
                    titlejournal: item.titleOfJournal, titleppresent: item.titleOfPaperToBePresented, dateconf: moment(item.dateOfStartConference).format("MMMM D, YYYY")+" - "+moment(item.dateOfEndConference).format("MMMM D, YYYY"), venue: item.placeAndVenue})
                })

                worksheet.columns.forEach(column => {
                    column.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                })

                db.collection('fdtwos').find({},{_id:0,user:true,db:true,roles:true } ).toArray(function(err, items2)  {   
                    var worksheet = workbook.addWorksheet('FD2');

                    worksheet.mergeCells('A1', 'K1');
                    worksheet.getCell('A1').value = 'FD2 - Pre Selected High Impact Conferences, AY 2018-2019'
                    worksheet.getCell('L1').value = 'ETD'
                    worksheet.getCell("N1").value = 'BUDGET'
                    worksheet.getCell("A1").font = font;
                    worksheet.getCell("L1").font = font;
                    worksheet.getCell("N1").font = font;
                    worksheet.getCell('M1').value = { formula :'SUM(L3:L39)' };  

                    worksheet.getRow(2).values = ['TERM', 'COLLEGE', 'DEPT', 'STATUS', 'FACULTY NAME', 'TITLE OF PAPER TO BE PRESENTED', 'NAME OF CONFERENCE', 
                    'DATE OF CONFERENCE', 'VENUE', 'REMARKS/BENEFIT', 'DOLLAR', 'PESO', 'PRS NO.', 'PAYABLE TO', 'DATE RECEIVED BY ACCTG.', 'Remarks'];
                    worksheet.getRow(2).font = { size: 9, bold: true };

                    for (i = 1; i <= 16; i++)  {
                        worksheet.getRow(2).getCell(i).fill = { type: 'pattern', pattern: 'solid', fgColor:{argb:'FFCDF2BE'}, bgColor:{argb:'FFCDF2BE'}}
                        worksheet.getRow(2).getCell(i).border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
                    }

                    worksheet.columns = [{key: 'term', width: 7}, {key: 'college', width: 10}, {key: 'dept', width: 13}, {key: 'status', width: 12}, {key: 'facultyname', width: 28}, {key: 'titlepaper', width: 30}, {key: 'nameofconference', width: 30},
                    {key: 'dateconf', width: 28}, {key: 'venue', width: 20}, {key: 'remarksbenefit', width: 28}, {key: 'dollar', width: 9}, {key: 'peso', width: 13}, {key: 'prsno', width: 16},  {key: 'payabto', width: 25}, {key: 'daterecivacct', width: 14}, 
                    {key: 'remarks', width: 15}]
        
                    items2.forEach(function(item) {
                        worksheet.addRow({  term: item.term, dept: item.department, status: item.status, facultyname: item.firstName + " " + item.lastName, titlepaper: item.titleOfPaperToBePresented, 
                        nameofconference: item.nameOfConference, dateconf: moment(item.dateOfStartConference).format("MMMM D, YYYY")+" - "+moment(item.dateOfEndConference).format("MMMM D, YYYY"), venue: item.placeAndVenue})
                    })  

                    worksheet.columns.forEach(column => {
                        column.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                    })

                    db.collection('fdthrees').find({},{_id:0,user:true,db:true,roles:true } ).toArray(function(err, items3)  {   
                        var worksheet = workbook.addWorksheet('FD3');
    
                        worksheet.mergeCells('A1', 'K1');
                        worksheet.getCell('A1').value = 'FD3 - Support for Paper Presentation in Conferences, AY 2018-2019'
                        worksheet.getCell('L1').value = 'ETD'
                        worksheet.getCell("N1").value = 'BUDGET'
                        worksheet.getCell("A1").font = font;
                        worksheet.getCell("L1").font = font;
                        worksheet.getCell("N1").font = font;
                        worksheet.getCell('M1').value = { formula :'SUM(L3:L39)' };  
        
                        worksheet.getRow(2).values = ['TERM', 'COLLEGE', 'DEPT', 'STATUS', 'FACULTY NAME', 'TYPE OF CONFERENCE', 'TITLE OF PAPER TO BE PRESENTED', 
                        'NAME OF CONFERENCE', 'DATE OF CONFERENCE', 'VENUE', 'REMARKS/BENEFIT', 'DOLLAR', 'PESO', 'PRS NO.', 'CHECK PAYABLE TO', 'DATE RECEIVED BY ACCTG.', 
                        'SUMMARY REPORT (Received by VCAO)', 'LIQUIDATION (Received by VCAO)', 'Remarks'];
                        worksheet.getRow(2).font = { size: 9, bold: true };

                        for (i = 1; i <= 19; i++)  {
                            worksheet.getRow(2).getCell(i).fill = { type: 'pattern', pattern: 'solid', fgColor:{argb:'FFCDF2BE'}, bgColor:{argb:'FFCDF2BE'}}
                            worksheet.getRow(2).getCell(i).border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
                        }

                        worksheet.columns = [{key: 'term', width: 7}, {key: 'college', width: 10}, {key: 'dept', width: 13}, {key: 'status', width: 12}, {key: 'facultyname', width: 28}, {key: 'typeconf', width: 18}, {key: 'titlepaper', width: 30}, {key: 'nameconf', width: 30},
                        {key: 'dateconf', width: 28}, {key: 'venue', width: 20}, {key: 'remarksbenefit', width: 28}, {key: 'dollar', width: 9}, {key: 'peso', width: 13}, {key: 'prsno', width: 16}, {key: 'payabto', width: 25}, {key: 'daterecivacct', width: 14}, 
                        {key: 'summaryreport', width: 15}, {key: 'liquida', width: 15}, {key: 'remarks', width: 15}]

                        items3.forEach(function(item) {
                            worksheet.addRow({  term: item.term, dept: item.department, status: item.status, facultyname: item.firstName + " " + item.lastName, typeconf: item.typeOfConference,
                            titlepaper: item.titleOfPaperToBePresented, nameconf: item.nameOfConference, dateconf: moment(item.dateOfStartConference).format("MMMM D, YYYY")+" - "+moment(item.dateOfEndConference).format("MMMM D, YYYY"), venue: item.placeAndVenue})
                        })
                                
                        worksheet.columns.forEach(column => {
                            column.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                        })

                        db.collection('fdfours').find({},{_id:0,user:true,db:true,roles:true } ).toArray(function(err, items4)  {   
                            var worksheet = workbook.addWorksheet('FD4');
        
                            worksheet.mergeCells('A1', 'K1');
                            worksheet.getCell('A1').value = 'FD4 - Support for Participation in Local Conferences, AY 2018-2019 (twice a year)'
                            worksheet.getCell('L1').value = 'ETD'
                            worksheet.getCell("N1").value = 'BUDGET'
                            worksheet.getCell("A1").font = font;
                            worksheet.getCell("L1").font = font;
                            worksheet.getCell("N1").font = font;
                            worksheet.getCell('M1').value = { formula :'SUM(L3:L39)' };  
        
                            worksheet.getRow(2).values = ['TERM', 'COLLEGE', 'DEPT', 'STATUS', 'FACULTY NAME', 'NAME OF CONFERENCE', 'DATE OF CONFERENCE', 'VENUE', 
                            'REMARKS/BENEFIT', 'DOLLAR', 'PESO', 'PRS NO.', 'CHECK PAYABLE TO', 'DATE RECEIVED BY ACCTG.', 
                            'SUMMARY REPORT (Received by VCAO)', 'LIQUIDATION (Received by VCAO)', 'Remarks'];
                            worksheet.getRow(2).font = { size: 9, bold: true };
                                
                            for (i = 1; i <= 17; i++)  {
                                worksheet.getRow(2).getCell(i).fill = { type: 'pattern', pattern: 'solid', fgColor:{argb:'FFCDF2BE'}, bgColor:{argb:'FFCDF2BE'}}
                                worksheet.getRow(2).getCell(i).border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
                            }

                            worksheet.columns = [{key: 'term', width: 7}, {key: 'college', width: 10}, {key: 'dept', width: 13}, {key: 'status', width: 12}, {key: 'facultyname', width: 28},  {key: 'nameconf', width: 28},
                            {key: 'dateconf', width: 28}, {key: 'venue', width: 20}, {key: 'remarksbenefit', width: 28}, {key: 'dollar', width: 9}, {key: 'peso', width: 13}, {key: 'prsno', width: 11}, {key: 'payabto', width: 25}, {key: 'daterecivacct', width: 14}, 
                            {key: 'summaryreport', width: 15}, {key: 'liquida', width: 15}, {key: 'remarks', width: 15}]

                            items4.forEach(function(item) {
                                worksheet.addRow({  term: item.term, dept: item.department, status: item.rank, facultyname: item.firstName + " " + item.lastName, nameconf: item.nameOfConference, 
                                dateconf: moment(item.dateOfStartConference).format("MMMM D, YYYY")+" - "+moment(item.dateOfEndConference).format("MMMM D, YYYY"), venue: item.placeAndVenue})
                            })
                            
                            worksheet.columns.forEach(column => {
                                column.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                            })
        
                            db.collection('fdfifteens').find({},{_id:0,user:true,db:true,roles:true } ).toArray(function(err, items15)  {   
                                var worksheet = workbook.addWorksheet('FD15');
            
                                worksheet.mergeCells('A1', 'K1');
                                worksheet.getCell('A1').value = 'FD15 - Support for Local Trainings, Seminars and Workshops, AY 2018-2019 (once in a Academic Year)'
                                worksheet.getCell('L1').value = 'ETD'
                                worksheet.getCell("N1").value = 'BUDGET'
                                worksheet.getCell("A1").font = font;
                                worksheet.getCell("L1").font = font;
                                worksheet.getCell("N1").font = font;
                                worksheet.getCell('M1').value = { formula :'SUM(L3:L39)' };  

                                worksheet.getRow(2).values = ['TERM', 'COLLEGE', 'DEPT', 'FACULTY NAME', 'TITLE OF TRAINING/SEMINAR/WORKSHOP', 'HOST INSTITUTION/ORGANIZATION', 
                                'LOCATION', 'DATE OF TRAINING/SEMINAR/ WORKSHOP', 'REMARKS/BENEFIT', 'DOLLAR', 'PESO', 'PRS NO.', 'CHECK PAYABLE TO', 'DATE RECEIVED BY ACCTG.', 
                                'SUMMARY REPORT (Received by VCAO)', 'LIQUIDATION (Received by VCAO)', 'Remarks'];
                                worksheet.getRow(2).font = { size: 9, bold: true };
                                
                                for (i = 1; i <= 17; i++)  {
                                    worksheet.getRow(2).getCell(i).fill = { type: 'pattern', pattern: 'solid', fgColor:{argb:'FFCDF2BE'}, bgColor:{argb:'FFCDF2BE'}}
                                    worksheet.getRow(2).getCell(i).border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
                                }

                                worksheet.columns = [{key: 'term', width: 7 }, {key: 'college', width: 10}, {key: 'dept', width: 13}, {key: 'facultyname', width: 28}, {key: 'titleseminar', width: 30}, {key: 'hostinst', width: 28},
                                {key: 'location', width: 20}, {key: 'dateofsem', width: 28}, {key: 'remarksbenefit', width: 28}, {key: 'dollar', width: 9}, {key: 'peso', width: 13}, {key: 'prsno', width: 11}, {key: 'payabto', width: 25}, {key: 'daterecivacct', width: 14}, 
                                {key: 'summaryreport', width: 15}, {key: 'liquida', width: 15}, {key: 'remarks', width: 15}]
                    
                                items15.forEach(function(item) {
                                    worksheet.addRow({  term: item.term, dept: item.department, facultyname: item.firstName + " " + item.lastName, titleseminar: item.titleOfSeminar, 
                                    hostinst: item.hostInstitution, location: item.place, dateofsem: moment(item.startTime).format("MMMM D, YYYY")+"-"+moment(item.endTime).format("MMMM D, YYYY")})
                                })
                                
                                worksheet.columns.forEach(column => {
                                    column.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                                })
                                
                                db.collection('fdsixteens').find({},{_id:0,user:true,db:true,roles:true } ).toArray(function(err, items16)  {   
                                    var worksheet = workbook.addWorksheet('FD16');
                
                                    worksheet.mergeCells('A1', 'K1');
                                    worksheet.getCell('A1').value = 'FD16 - Support for Membership in Professional Organization, AY 2018-2019'
                                    worksheet.getCell('L1').value = 'ETD'
                                    worksheet.getCell('N1').value = 'BALANCE'
                                    worksheet.getCell("A1").font = font;
                                    worksheet.getCell("L1").font = font;
                                    worksheet.getCell("N1").font = font;
                                    worksheet.getCell('M1').value = { formula :'SUM(L3:L39)' };  
                
                                    worksheet.getRow(2).values = ['TERM', 'COLLEGE', 'DEPT', 'STATUS', 'FACULTY NAME', 'NAME OF ORGANIZATION', 'TYPE OF MEMBERSHIP (LOCAL/INTL) ', 
                                    'TYPE OF MEMBERSHIP (ANNUAL/LIFETIME)', 'MEMBERSHIP DATE', 'COVERAGE', 'DOLLAR', 'PESO', 'PRS NO.', 'CHECK PAYABLE TO', 'DATE RECEIVED BY ACCTG.', 'Remarks'];
                                    worksheet.getRow(2).font = { size: 9, bold: true };

                                    for (i = 1; i <= 16; i++)  {
                                        worksheet.getRow(2).getCell(i).fill = { type: 'pattern', pattern: 'solid', fgColor:{argb:'FFCDF2BE'}, bgColor:{argb:'FFCDF2BE'}}
                                        worksheet.getRow(2).getCell(i).border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}}
                                    }

                                    worksheet.columns = [{key: 'term', width: 7 }, {key: 'college', width: 10}, {key: 'dept', width: 13}, {key: 'status', width: 12}, {key: 'facultyname', width: 28}, {key: 'nameorg', width: 32}, {key: 'typemem', width: 16},
                                    {key: 'typemem2', width: 20}, {key: 'dateofmem', width: 17}, {key: 'coverage', width: 18}, {key: 'dollar', width: 9}, {key: 'peso', width: 13}, {key: 'prsno', width: 11}, {key: 'payabto', width: 25}, {key: 'daterecivacct', width: 14}, 
                                    {key: 'remarks', width: 15}]
                                    
                                    items16.forEach(function(item) {
                                        worksheet.addRow({ term: item.term, dept: item.department, status: item.status, facultyname: item.firstName + " " + item.lastName, nameorg: item.nameOfOrganization, 
                                        typemem: item.typeOfMembershipPlace, typemem2: item.typeofMembershipDuration, dateofmem: moment(item.membershipDate).format("MMMM D, YYYY")})
                                    })
                                    
                                    worksheet.columns.forEach(column => {
                                        column.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                                    })
                
                                    var tempfile = require('tempfile');
                                    var tempFilePath = tempfile('.xlsx');
                                    workbook.xlsx.writeFile(tempFilePath).then(function() {
                                        res.sendFile(tempFilePath, function(err){
                                        });
                                    });
                                })
                            })
                        })
                    })
                })
            });
        });       
})