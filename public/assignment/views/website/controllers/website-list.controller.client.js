(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;

        model.uid = $routeParams["uid"];
        model.websites = websiteService.findWebsitesByUser(model.uid);
    }
})();
