(function() {
    angular
        .module("WebAppMaker")
        .controller("newWebsiteController", newWebsiteController);

        function newWebsiteController($routeParams, $location, websiteService) {
            var model = this;

            model.createWebsite = createWebsite;

            model.uid = $routeParams["uid"];
            model.websites = websiteService.findWebsitesByUser(model.uid);
            model.website = {};
            model.website.developerId = model.uid;

            function createWebsite(website) {
                websiteService.createWebsite(website);
                $location.url("user/" + model.uid + "/website");
            }
        }
})();
