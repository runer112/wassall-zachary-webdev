var createGenericService = require("./generic.service.server");
var reviewModel = require("../model/review/review.model.server.js");

module.exports = function (app, deleteChildrenByFkSupplier) {
    var reviewService = createGenericService(app, "/p/api/user", "/p/api/user/:uid", "uid", null, reviewModel, null, deleteChildrenByFkSupplier);

    // internal API setup
    reviewService.findByApp = reviewService.findBy("_app");
    reviewService.findByAuthor = reviewService.findBy("_author");

    return reviewService;
};
