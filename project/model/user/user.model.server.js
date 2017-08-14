var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("PUserModel", userSchema);

module.exports = userModel;
