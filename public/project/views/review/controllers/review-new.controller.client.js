(function () {
    angular
        .module("ticalcAppStore")
        .controller("newReviewController", newReviewController);

    function newReviewController($rootScope, $routeParams, $location, reviewService) {
        var model = this;

        model.createReview = createReview;

        init();

        function init() {
            $rootScope.title = "Write a Review";

            model.appId = $routeParams.appId;
            model.review = {
                author: $rootScope.user._id,
                app: model.appId
            };
        }

        function createReview() {
            reviewService.createReview(model.appId, model.review)
                .then(returnToApp);
        }

        function returnToApp() {
            $location.url("app/" + model.appId);
        }
    }
})();
