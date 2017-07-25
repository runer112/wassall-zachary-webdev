(function () {
    angular
        .module("WebAppMaker")
        .controller("newWebsiteController", newWebsiteController);

    function newWebsiteController($routeParams, $location, websiteService) {
        var model = this;

        model.validate = validate;
        model.createWebsite = createWebsite;

        model.uid = $routeParams["uid"];
        model.websites = websiteService.findWebsitesByUser(model.uid);
        model.website = {};
        model.website.developerId = model.uid;

        function validate() {
            return !!model.website.name;
        }

        function createWebsite() {
            websiteService.createWebsite(model.website);
            $location.url("user/" + model.uid + "/website");
        }
    }
})();
