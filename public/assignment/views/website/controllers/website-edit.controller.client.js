(function () {
    angular
        .module("WebAppMaker")
        .controller("editWebsiteController", editWebsiteController);

    function editWebsiteController($rootScope, $routeParams, $location, websiteService) {
        $rootScope.title = "Edit Website";

        var model = this;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        model.uid = $routeParams["uid"];
        model.websites = websiteService.findWebsitesByUser(model.uid);
        model.wid = $routeParams["wid"];
        model.website = websiteService.findWebsiteById(model.wid);

        function updateWebsite() {
            websiteService.updateWebsite(model.wid, model.website);
            $location.url("user/" + model.uid + "/website");
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.wid);
            $location.url("user/" + model.uid + "/website");
        }
    }
})();
