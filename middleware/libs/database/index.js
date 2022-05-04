const Mongoose = require('mongoose')
const ConfigurationSchema = require('./schemas/Configuration')
const state = { models: {} }

// Inits connection to database.
async function init() {
    const configurationConnection = await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/configurations`)
    state.models.ConfigurationModel = configurationConnection.model("configuration", ConfigurationSchema,"configurations")
    
}


module.exports = { init, models: state.models }