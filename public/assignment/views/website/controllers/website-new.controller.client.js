(function () {
    angular
        .module("WebAppMaker")
        .controller("newWebsiteController", newWebsiteController);

    function newWebsiteController($rootScope, $routeParams, $location, websiteService) {
        $rootScope.title = "New Website";

        var model = this;

        model.createWebsite = createWebsite;
        model.uid = $routeParams["uid"];
        model.website = {developerId: model.uid};

        websiteService.findWebsitesByUser(model.uid, model.uid)
            .then(function (response) {
                model.websites = response.data;
            });

        function createWebsite() {
            websiteService.createWebsite(model.uid, model.website)
                .then(returnToList);
        }

        function returnToList() {
            $location.url("user/" + model.uid + "/website");
        }
    }
})();
