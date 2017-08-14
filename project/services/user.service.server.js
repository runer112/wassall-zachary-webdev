var createGenericService = require("./generic.service.server");
var userModel = require("../model/user/user.model.server.js");

module.exports = function (app, deleteWebsitesByFkSupplier) {
    var userService = createGenericService(app, "/p/api/user", "/p/api/user/:uid", "uid", null, userModel, null, null, "websites", deleteWebsitesByFkSupplier);

    return userService;
};
