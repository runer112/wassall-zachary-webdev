(function () {
    angular
        .module("ticalcAppStore")
        .controller("reviewFeedController", reviewFeedController);

    function reviewFeedController($rootScope, reviewService) {
        var model = this;

        init();

        function init() {
            $rootScope.title = "Review Feed";

            reviewService.findReviewsByFollowing($rootScope.user._id)
                .then(function (response) {
                    model.reviews = response.data;
                });
        }
    }
})();
