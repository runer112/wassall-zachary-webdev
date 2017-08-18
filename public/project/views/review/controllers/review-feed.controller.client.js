(function () {
    angular
        .module("ticalcAppStore")
        .controller("reviewFeedController", reviewFeedController);

    function reviewFeedController($rootScope, reviewService) {
        $rootScope.title = "Review Feed";

        var model = this;

        reviewService.findReviewsByFollowing($rootScope.user._id)
            .then(function (response) {
                model.reviews = response.data;
            });
    }
})();
