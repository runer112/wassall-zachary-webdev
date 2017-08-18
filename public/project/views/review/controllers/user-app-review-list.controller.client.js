(function () {
    angular
        .module("ticalcAppStore")
        .controller("userAppReviewListController", userAppReviewListController);

    function userAppReviewListController($rootScope, reviewService) {
        var model = this;

        init();

        function init() {
            $rootScope.title = "Reviews";

            reviewService.findAppReviewsForUser($rootScope.user._id)
                .then(function (response) {
                    model.includeAppNameInReviews = true;
                    model.reviews = response.data;
                });
        }
    }
})();
