(function () {
    angular
        .module("WebAppMaker")
        .factory("websiteService", websiteService);

    function websiteService(pageService) {
        var genericService = createGenericService("developerId", [pageService]);

        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];
        genericService.entities = websites;

        var api = {
            createWebsite: genericService.create,
            findWebsiteById: genericService.findById,
            findWebsitesByUser: genericService.filterByFk,
            updateWebsite: genericService.update,
            deleteWebsite: genericService.delete,
            deleteByFk: genericService.deleteByFk,
        };

        return api;
    }
})();
