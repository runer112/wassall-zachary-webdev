var createGenericService = require("./generic.service.server");
var reviewModel = require("../model/review/review.model.server.js");

module.exports = function (app, deleteChildrenByFkSupplier) {
    var reviewService = createGenericService(app, "/p/api/review", "/p/api/review/:reviewId", "reviewId", null, reviewModel, null, deleteChildrenByFkSupplier);

    // internal API setup
    reviewService.findByApp = reviewService.findBy("app");
    reviewService.findByAuthor = reviewService.findBy("author");

    return reviewService;
};
