(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($rootScope, $routeParams, websiteService) {
        $rootScope.title = "Websites";

        var model = this;

        model.uid = $routeParams["uid"];
        model.websites = websiteService.findWebsitesByUser(model.uid);
    }
})();
