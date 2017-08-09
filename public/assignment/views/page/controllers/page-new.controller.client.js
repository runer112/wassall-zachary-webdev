(function () {
    angular
        .module("WebAppMaker")
        .controller("newPageController", newPageController);

    function newPageController($rootScope, $routeParams, $location, pageService) {
        $rootScope.title = "New Page";

        var model = this;

        model.createPage = createPage;
        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];
        model.page = {_website: model.wid};

        pageService.findPagesByWebsiteId(model.wid, model.wid)
            .then(function (response) {
                model.pages = response.data;
            });

        function createPage() {
            pageService.createPage(model.wid, model.page)
                .then(returnToList);
        }

        function returnToList() {
            $location.url("user/" + model.uid + "/website/" + model.wid + "/page");
        }
    }
})();
