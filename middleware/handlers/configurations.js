const fs = require('fs')
const db = require('../libs/database')
const ConfigurationSchema = require('../libs/database/schemas/Configuration')

// Gets configuration from the database.
async function getConfiguration(request, response, next) {
    const appId = request.params.appId
    if (!appId) throw new Error('App Id is not valid.')
    try {
        const ConfigurationModel = db.models.ConfigurationModel
        const conf = await ConfigurationModel.findOne({ appId }).exec()
        response.json({ status: "success", data: (conf && conf.toJSON()) || {} })
    } catch (exc) {
        console.error(exc)
        next(new Error("Could not find the configuration for app id " + appId))
    }

}

// Updates configuration in the database.
async function updateConfiguration(request, response, next) {
    const appId = request.params.appId
    const config = request.body;
    if (!appId) throw new Error('App Id is not valid.')
    try {
        const ConfigurationModel = db.models.ConfigurationModel
        const conf = await ConfigurationModel.updateOne({ appId }, config, { timeStamps: true, new: true }).exec()
        if (conf.acknowledged) {
            response.json({ status: "success", data: config })
        }
        else{
            response.json({ status: "success", data: conf })
        }

    } catch (exc) {
        console.error(exc)
        next(new Error("Could not find the configuration for app id " + appId))
    }
}

// Creates a new configuration
async function createConfiguration(request, response, next) {
    const conf = request.body;
    const appId = conf.appId;
    if (!appId) throw new Error('App Id is not valid.')
    try {
        const ConfigurationModel = db.models.ConfigurationModel
        const config = new ConfigurationModel(conf)
        const result = await config.save();
        response.json({ status: "success", data: result.toJSON() })

    } catch (exc) {
        console.error(exc)
        next(new Error("Could not create the configuration for app id " + appId))
    }
}

module.exports = { createConfiguration, updateConfiguration, getConfiguration }