var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    ticalcId: Number,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "pUser"});

module.exports = userSchema;
