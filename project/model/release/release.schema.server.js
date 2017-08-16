var mongoose = require("mongoose");

var releaseSchema = mongoose.Schema({
    app: Number,
    name: String,
    dateCreated: Date
}, {collection: "pRelease"});

module.exports = releaseSchema;
