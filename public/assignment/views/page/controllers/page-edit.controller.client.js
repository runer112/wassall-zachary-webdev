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

        pageService.findPageById(model.pid)
            .then(function (response) {
                model.page = response.data;
            });

        function updatePage() {
            pageService.updatePage(model.pid, model.page)
                .then(returnToList);
        }

        function deletePage() {
            pageService.deletePage(model.pid)
                .then(returnToList);
        }

        function returnToList() {
            $location.url("user/" + model.uid + "/website/" + model.wid + "/page");
        }
    }
})();
