const mongoose = require("mongoose")

mongoose.set("strictQuery", false);

const Schema = mongoose.Schema

const fleetSchema = new Schema({
    ipaddress:{
        type:String,
        required: true
    },

    userid:
    {
        type:String, 
        required: true
    },

    name:{
        type:String,
        required: true
    },

    plugins:[{
        id : String, 
        topic: String,
    }],

    agents:[{
        name : String,
        namespace: String,
        attachments : [{
            id : String,
            topic : String,
        }]
    }]

}, {timestamps:true})

module.exports = mongoose.model('fleet', fleetSchema)