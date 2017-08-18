(function () {
    angular
        .module("ticalcAppStore")
        .factory("reviewService", reviewService);

    function reviewService($http) {
        var genericService = createGenericService($http, getBaseUrl, getEntityUrl);

        var api = {
            createReview: genericService.create
        };

        return api;

        function getBaseUrl() {
            return "/p/api/review";
        }

        function getEntityUrl(entityId) {
            return "/p/api/review/" + entityId;
        }
    }
})();
