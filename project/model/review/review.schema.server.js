var mongoose = require("mongoose");

var reviewSchema = mongoose.Schema({
    _author: {type: mongoose.Schema.Types.ObjectId, ref: "PUserModel"},
    authorName: String,
    rating: Number,
    title: String,
    text: String,
    dateCreated: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now}
}, {collection: "pReview"});

module.exports = reviewSchema;
