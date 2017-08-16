var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("PReviewModel", reviewSchema);

module.exports = reviewModel;
