(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($rootScope, $routeParams, websiteService) {
        $rootScope.title = "Websites";

        var model = this;

        model.uid = $routeParams["uid"];

        websiteService.findWebsitesByUser(model.uid, model.uid)
            .then(function (response) {
                model.websites = response.data;
            });
    }
})();
