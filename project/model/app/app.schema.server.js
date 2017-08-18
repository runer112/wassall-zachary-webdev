var mongoose = require("mongoose");

var appSchema = mongoose.Schema({
    ticalcId: Number,
    name: String,
    description: String,
    screenshots: [String],
    authorIds: [Number],
    category: String,
    artifact: String,
    stars: Number,
    starTotal: {type: Number, default: 0},
    ratingTotal: {type: Number, default: 0},
    datePublished: Date
}, {collection: "pApp"});

module.exports = appSchema;
