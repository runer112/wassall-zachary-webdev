(function () {
    angular
        .module("WebAppMaker")
        .factory("websiteService", websiteService);

    function websiteService($http) {
        var genericService = createGenericService($http, getBaseUrl, getEntityUrl);

        var api = {
            createWebsite: genericService.create,
            findWebsiteById: genericService.findById,
            findWebsitesByUser: genericService.queryBy("_user"),
            updateWebsite: genericService.update,
            deleteWebsite: genericService.delete,
        };

        return api;

        function getBaseUrl(uid) {
            return "/api/user/" + uid + "/website";
        }

        function getEntityUrl(wid) {
            return "/api/website/" + wid;
        }
    }
})();
