var createGenericService = require("./generic.service.server");
var reviewModel = require("../model/review/review.model.server.js");

module.exports = function (app, services, deleteChildrenByFkSupplier) {
    var reviewService = createGenericService(app, "/p/api/review", "/p/api/review/:reviewId", "reviewId", null, reviewModel, null, deleteChildrenByFkSupplier);

    // http handlers
    app.get("/p/api/user/:userId/following-reviews", efindByFollowing);
    app.get("/p/api/user/:userId/app-reviews", efindForDeveloper);

    // internal API setup
    var genericCreate = reviewService.create;
    reviewService.create = create;
    reviewService.findByFollowing = findByFollowing;
    reviewService.findForDeveloper = findForDeveloper;
    reviewService.findByApp = reviewService.findBy("app");
    reviewService.findByAuthor = reviewService.findBy("author");

    return reviewService;

    // express API

    function efindByFollowing(req, res) {
        var userId = req.params.userId;
        var promise = findByFollowing(userId);
        reviewService.esend(res, promise);
    }

    function efindForDeveloper(req, res) {
        var userId = req.params.userId;
        var promise = findForDeveloper(userId);
        reviewService.esend(res, promise);
    }

    // API

    function create(review) {
        return genericCreate(review)
            .then(function (review) {
                return services.appService.findById(review.app)
                    .then(function (app) {
                        app.starTotal += review.stars;
                        app.ratingTotal++;
                        app.stars = (app.starTotal - app.ratingTotal) / app.ratingTotal + 1;
                        return services.appService.update(app._id, app)
                            .then(function (app) {
                                return review;
                            }, function (err) {
                                console.log(err);
                            });
                    });
            });
    }

    function findByFollowing(userId) {
        return services.userService.findByIdNoPopulate(userId)
            .then(function (user) {
                return findForList({author: {$in: user.following}});
            });
    }

    function findForDeveloper(userId) {
        return services.appService.findByAuthor(userId)
            .then(function (apps) {
                var appIds = apps.map(function (app) {
                    return app._id;
                });
                return findForList({app: {$in: appIds}});
            });
    }

    function findForList(query) {
        return reviewService
            .find(query)
            .populate('app')
            .populate('author')
            .sort({dateUpdated: -1})
            .limit(20)
            .then(function (reviews) {
                reviews.forEach(function (review) {
                    var author = services.userService.reduce(review.author);
                    review.author = author;
                    var app = services.appService.reduce(review.app);
                    review.app = app;
                });
                return reviews;
            });
    }
};
