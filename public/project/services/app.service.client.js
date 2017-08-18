(function () {
    angular
        .module("ticalcAppStore")
        .factory("appService", appService);

    function appService($http) {
        var genericService = createGenericService($http, getBaseUrl, getEntityUrl);

        var api = {
            search: search,
            findTopApps: findTopApps,
            findAppById: genericService.findById,
            findAppsByAuthor: findAppsByAuthor,
        };

        return api;

        function getBaseUrl() {
            return "/p/api/app";
        }

        function getEntityUrl(entityId) {
            return "/p/api/app/" + entityId;
        }

        function search(searchString) {
            var query = {
                q: searchString
            };
            return genericService.query(null, query);
        }

        function findTopApps() {
            return $http.get(getBaseUrl() + "-top");
        }

        function findAppsByAuthor(userId) {
            return $http.get("/p/api/user/" + userId + "/app");
        }
    }
})();
