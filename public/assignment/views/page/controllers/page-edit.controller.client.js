(function () {
    angular
        .module("WebAppMaker")
        .controller("editPageController", editPageController);

    function editPageController($rootScope, $routeParams, $location, pageService) {
        $rootScope.title = "Edit Page";

        var model = this;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.page = pageService.findPageById(model.pid);

        function updatePage() {
            pageService.updatePage(model.pid, model.page);
            $location.url("user/" + model.uid + "/website/" + model.wid + "/page");
        }

        function deletePage() {
            pageService.deletePage(model.pid);
            $location.url("user/" + model.uid + "/website/" + model.wid + "/page");
        }
    }
})();
