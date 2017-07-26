(function () {
    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService(widgetService) {
        var genericService = createGenericService("websiteId", [widgetService]);

        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];
        genericService.entities = pages;

        var api = {
            createPage: genericService.create,
            findPageById: genericService.findById,
            findPagesByWebsiteId: genericService.filterByFk,
            updatePage: genericService.update,
            deletePage: genericService.delete,
            deleteByFk: genericService.deleteByFk,
        };

        return api;
    }
})();
