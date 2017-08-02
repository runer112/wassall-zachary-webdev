(function () {
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($rootScope, $routeParams, pageService) {
        $rootScope.title = "Pages";

        var model = this;

        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];

        pageService.findPagesByWebsiteId(model.wid, model.wid)
            .then(function (response) {
                model.pages = response.data;
            });
    }
})();
