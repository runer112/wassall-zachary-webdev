(function () {
    angular
        .module("WebAppMaker")
        .controller("editWebsiteController", editWebsiteController);

    function editWebsiteController($routeParams, $location, websiteService) {
        var model = this;

        model.validate = validate;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        model.uid = $routeParams["uid"];
        model.websites = websiteService.findWebsitesByUser(model.uid);
        model.wid = $routeParams["wid"];
        model.website = websiteService.findWebsiteById(model.wid);
        var websiteStr = JSON.stringify(model.website);

        function validate() {
            return !!model.website.name
                && websiteStr !== JSON.stringify(model.website);
        }

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
