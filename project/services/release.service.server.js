var createGenericService = require("./generic.service.server");
var releaseModel = require("../model/release/release.model.server.js");

module.exports = function (app, deleteChildrenByFkSupplier) {
    var releaseService = createGenericService(app, "/p/api/release", "/p/api/release/:releaseId", "releaseId", null, releaseModel, null, deleteChildrenByFkSupplier);

    // internal API setup

    return releaseService;
};
