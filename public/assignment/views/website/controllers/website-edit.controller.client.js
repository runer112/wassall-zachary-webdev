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
        model.wid = $routeParams["wid"];

        websiteService.findWebsitesByUser(model.uid, model.uid)
            .then(function (response) {
                model.websites = response.data;
            });
        websiteService.findWebsiteById(model.wid)
            .then(function (response) {
                model.website = response.data;
            });

        function updateWebsite() {
            websiteService.updateWebsite(model.wid, model.website)
                .then(returnToList);
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.wid)
                .then(returnToList);
        }

        function returnToList() {
            $location.url("user/" + model.uid + "/website");
        }
    }
})();
