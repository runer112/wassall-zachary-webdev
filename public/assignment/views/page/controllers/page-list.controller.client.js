(function () {
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($rootScope, $routeParams, pageService) {
        $rootScope.title = "Pages";

        var model = this;

        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];
        model.pages = pageService.findPagesByWebsiteId(model.wid);
    }
})();
