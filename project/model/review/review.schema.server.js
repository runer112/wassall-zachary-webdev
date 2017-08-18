var mongoose = require("mongoose");

var reviewSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "PUserModel"},
    app: {type: mongoose.Schema.Types.ObjectId, ref: "PAppModel"},
    stars: Number,
    title: String,
    text: String,
    dateCreated: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now}
}, {collection: "pReview"});

module.exports = reviewSchema;
