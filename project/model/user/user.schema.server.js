var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    facebook: {
        id:    String,
        token: String
    },
    ticalcId: {type: Number, unique: true, sparse: true},
    isAdmin: Boolean,
    isGenerated: {type: Boolean, default: false},
    username: {type: String, unique: true, sparse: true},
    password: String,
    displayName: String,
    email: String,
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "PUserModel"}],
    ownedReleases: [{type: mongoose.Schema.Types.ObjectId, ref: "PReleaseModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "pUser"});

module.exports = userSchema;
