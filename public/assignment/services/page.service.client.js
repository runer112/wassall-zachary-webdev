(function () {
    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService($http) {
        var genericService = createGenericService($http, getBaseUrl, getEntityUrl);

        var api = {
            createPage: genericService.create,
            findPageById: genericService.findById,
            findPagesByWebsiteId: genericService.queryBy("websiteId"),
            updatePage: genericService.update,
            deletePage: genericService.delete,
        };

        return api;

        function getBaseUrl(wid) {
            return "/api/website/" + wid + "/page";
        }

        function getEntityUrl(pid) {
            return "/api/page/" + pid;
        }
    }
})();
