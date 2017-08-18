(function () {
    angular
        .module("ticalcAppStore")
        .controller("userAppListController", userAppListController);

    function userAppListController($rootScope, appService) {
        var model = this;

        init();

        function init() {
            $rootScope.title = "My Apps";

            appService.findAppsByAuthor($rootScope.user.ticalcId)
                .then(function (response) {
                    model.apps = response.data;
                });
        }
    }
})();
