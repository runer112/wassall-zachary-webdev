(function() {
    angular
        .module("WebAppMaker")
        .controller("newPageController", newPageController);

        function newPageController($routeParams, $location, pageService) {
            var model = this;

            model.validate = validate;
            model.createPage = createPage;

            model.uid = $routeParams["uid"];
            model.wid = $routeParams["wid"];
            model.pages = pageService.findPagesByWebsiteId(model.wid);
            model.page = {};
            model.page.websiteId = model.wid;

            function validate() {
                return !!model.page.name;
            }

            function createPage() {
                pageService.createPage(model.page);
                $location.url("user/" + model.uid + "/website/" + model.wid + "/page");
            }
        }
})();
