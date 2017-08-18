var createGenericService = require("./generic.service.server");
var reviewModel = require("../model/review/review.model.server.js");

module.exports = function (app, services, deleteChildrenByFkSupplier) {
    var reviewService = createGenericService(app, "/p/api/review", "/p/api/review/:reviewId", "reviewId", null, reviewModel, null, deleteChildrenByFkSupplier);

    // http handlers
    app.get("/p/api/user/:userId/following-reviews", efindByFollowing);

    // internal API setup
    var genericCreate = reviewService.create;
    reviewService.create = create;
    reviewService.findByFollowing = findByFollowing;
    reviewService.findByApp = reviewService.findBy("app");
    reviewService.findByAuthor = reviewService.findBy("author");

    return reviewService;

    // express API

    function efindByFollowing(req, res) {
        var userId = req.params.userId;
        var promise = findByFollowing(userId);
        reviewService.esend(res, promise);
    }

    // API

    function create(review) {
        return genericCreate(review)
            .then(function (review) {
                return services.appService.findOneAndUpdate({
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

    function findByFollowing(userId) {
        return services.userService.findByIdNoPopulate(userId)
            .then(function (user) {
                return reviewService
                    .find({author: {$in: user.following}})
                    .populate('app')
                    .populate('author')
                    .sort({dateUpdated: -1})
                    .then(function (reviews) {
                        reviews.forEach(function (review) {
                            var author = services.userService.reduce(review.author);
                            review.author = author;
                            var app = services.appService.reduce(review.app);
                            review.app = app;
                        });
                        return reviews;
                    });
            });
    }
};
