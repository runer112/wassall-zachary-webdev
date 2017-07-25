(function() {
    angular
        .module("WebAppMaker")
        .controller("editPageController", editPageController);

        function editPageController($routeParams, $location, pageService) {
            var model = this;

            model.validate = validate;
            model.updatePage = updatePage;
            model.deletePage = deletePage;

            model.uid = $routeParams["uid"];
            model.wid = $routeParams["wid"];
            model.pid = $routeParams["pid"];
            model.page = pageService.findPageById(model.pid);
            var pageStr = JSON.stringify(model.page);

            function validate() {
                return !!model.page.name
                    && pageStr !== JSON.stringify(model.page);
            }

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
