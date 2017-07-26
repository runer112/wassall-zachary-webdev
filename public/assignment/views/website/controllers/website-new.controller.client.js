(function () {
    angular
        .module("WebAppMaker")
        .controller("newWebsiteController", newWebsiteController);

    function newWebsiteController($rootScope, $routeParams, $location, websiteService) {
        $rootScope.title = "New Website";

        var model = this;

        model.createWebsite = createWebsite;

        model.uid = $routeParams["uid"];
        model.websites = websiteService.findWebsitesByUser(model.uid);
        model.website = {developerId: model.uid};

        function createWebsite() {
            websiteService.createWebsite(model.website);
            $location.url("user/" + model.uid + "/website");
        }
    }
})();
