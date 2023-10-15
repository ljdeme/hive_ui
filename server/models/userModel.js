const mongoose = require("mongoose")


// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true 
    }, 
    email: {
        type:String,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('user', userSchema)