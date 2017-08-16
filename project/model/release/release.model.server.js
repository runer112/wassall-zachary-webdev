var mongoose = require("mongoose");
var releaseSchema = require("./release.schema.server");
var releaseModel = mongoose.model("PReleaseModel", releaseSchema);

module.exports = releaseModel;
