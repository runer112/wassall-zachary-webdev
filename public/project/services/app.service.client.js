(function () {
    angular
        .module("ticalcAppStore")
        .factory("appService", appService);

    function appService($http) {
        var genericService = createGenericService($http, getBaseUrl, getEntityUrl);

        var api = {
            search: search,
            findAppById: genericService.findById,
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
    }
})();
