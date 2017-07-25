(function () {
    angular
        .module("WebAppMaker")
        .factory("websiteService", websiteService);

    function websiteService() {

        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        var nextId = 1000;

        var api = {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
        };

        return api;

        function createWebsite(website) {
            website._id = nextId.toString();
            nextId++;
            websites.push(website);
            return website;
        }

        function findWebsiteById(websiteId) {
            return websites.find(function (website) {
                return website._id === websiteId;
            });
        }

        function findWebsitesByUser(userId) {
            return websites.filter(function (website) {
                return website.developerId === userId;
            });
        }

        function updateWebsite(websiteId, website) {
            var index = findIndexOfWebsiteById(websiteId);
            websites[index] = website;
            return website;
        }

        function deleteWebsite(websiteId, website) {
            var index = findIndexOfWebsiteById(websiteId);
            websites.splice(index, 1);
        }

        function findIndexOfWebsiteById(websiteId) {
            return websites.findIndex(function (website) {
                return website._id === websiteId;
            });
        }

    }
})();
