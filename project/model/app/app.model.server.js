var mongoose = require("mongoose");
var appSchema = require("./app.schema.server");
var appModel = mongoose.model("PAppModel", appSchema);

module.exports = appModel;
