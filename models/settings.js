/**
 * This contains schema initialization and 
 * model functions for the settings which can
 * be modified by the administrator.
 * December 16, 2018
 * @ver 1.0
 * @author Sai Manalili
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose")

/**
 * Setting up Remark Schema
 */
var settingsSchema = mongoose.Schema({
  term: {
    type: String,
    required: true
  },
  startAY: {
    type: Number,
    required: true
  },
  endAY: {
    type: Number,
    required: true
  }
})

var Settings = mongoose.model("settings", settingsSchema)

/**
 * Creates settings in Settings schema.
 *
 * @param {settings to be created} settings
 */
exports.create = function (settings) {
  return new Promise(function (resolve, reject) {
    var s = new Settings(settings)

    s.save().then((newSettings) => {
      resolve(newSettings)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Gets a setting in Setting Schema 
 *
 */
exports.getSettings = function () {
  return new Promise(function (resolve, reject) {
    Settings.find({}).then((settingsFound) => {
      resolve(settingsFound)
    }, (err) => {
      reject(err)
    })
  })
}

/**
 * Updates the setting.
 * 
 */
exports.updateSettings = function (newSettings) {
  return new Promise(function (resolve, reject) {
    Settings.findOneAndUpdate({}, {
      "$set": {
        "term": newSettings.term,
        startAY: newSettings.startAY,
        endAY: newSettings.endAY
      }
    }).then((updatedSettings) => {
      resolve(updatedSettings)
    }, (err) => {
      reject(err)
    })
  })
}