var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    facebook: {
        id:    String,
        token: String
    },
    ticalcId: Number,
    username: String,
    password: String,
    displayName: String,
    email: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "pUser"});

module.exports = userSchema;
