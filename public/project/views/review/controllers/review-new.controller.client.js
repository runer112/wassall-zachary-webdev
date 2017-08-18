(function () {
    angular
        .module("ticalcAppStore")
        .controller("newReviewController", newReviewController);

    function newReviewController($rootScope, $routeParams, $location, reviewService) {
        $rootScope.title = "Write a Review";

        var model = this;
        model.createReview = createReview;
        model.appId = $routeParams.appId;
        model.review = {
            author: $rootScope.user._id,
            app: model.appId
        };

        function createReview() {
            reviewService.createReview(model.appId, model.review)
                .then(returnToApp);
        }

        function returnToApp() {
            $location.url("app/" + model.appId);
        }
    }
})();
