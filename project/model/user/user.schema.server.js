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
    followedReviewers: [{type: mongoose.Schema.Types.ObjectId, ref: "PUserModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "pUser"});

module.exports = userSchema;
