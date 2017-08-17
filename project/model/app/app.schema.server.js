var mongoose = require("mongoose");

var appSchema = mongoose.Schema({
    ticalcId: Number,
    name: String,
    description: String,
    screenshots: [String],
    authorIds: [Number],
    category: String,
    artifact: String,
    datePublished: Date
}, {collection: "pApp"});

module.exports = appSchema;
