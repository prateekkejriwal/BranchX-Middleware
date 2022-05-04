const Schema = require('mongoose').Schema

// Configuration Schema for BranchX Configuration 
const ConfigurationSchema = new Schema({
    appId: { type: String, required: true, index: true, unique: true },
    appIdentifiers: { type: Map, of: String, requiredPaths: [, 'branchKey'] },
    flippers: { type: Map, of: String, requiredPaths: ['sdk', 'logging', 'testMode'] },
    eventsConfig: { type: Map, of: Object, required: true }
}, { timestamps: true,toJSON:{versionKey:false,transform:function(doc,ret,opt){
    delete ret._id
    delete ret.__v
}} })


module.exports = ConfigurationSchema