(function () {
    angular
        .module("ticalcAppStore")
        .factory("reviewService", reviewService);

    function reviewService($http) {
        var genericService = createGenericService($http, getBaseUrl, getEntityUrl);

        var api = {
            createReview: genericService.create,
            findReviewsByFollowing: findReviewsByFollowing,
            findAppReviewsForUser: findAppReviewsForUser
        };

        return api;

        function getBaseUrl() {
            return "/p/api/review";
        }

        function getEntityUrl(entityId) {
            return "/p/api/review/" + entityId;
        }

        function findReviewsByFollowing(userId) {
            return $http.get("/p/api/user/" + userId + "/following-reviews");
        }

        function findAppReviewsForUser(userId) {
            return $http.get("/p/api/user/" + userId + "/app-reviews");
        }
    }
})();
