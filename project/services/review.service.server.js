var createGenericService = require("./generic.service.server");
var reviewModel = require("../model/review/review.model.server.js");

module.exports = function (app, services, deleteChildrenByFkSupplier) {
    var reviewService = createGenericService(app, "/p/api/review", "/p/api/review/:reviewId", "reviewId", null, reviewModel, null, deleteChildrenByFkSupplier);

    // internal API setup
    var genericCreate = reviewService.create;
    reviewService.create = create;
    reviewService.findByApp = reviewService.findBy("app");
    reviewService.findByAuthor = reviewService.findBy("author");

    return reviewService;

    function create(review) {
        return genericCreate(review)
            .then(function (review) {
                services.appService.findOneAndUpdate({
                    _id: review.app
                }, {
                    $inc: {
                        starTotal: review.stars,
                        ratingTotal: 1
                    }
                }).then(function () {
                    return review;
                }, function (err) {
                    console.log(err);
                });
            });
    }
};
