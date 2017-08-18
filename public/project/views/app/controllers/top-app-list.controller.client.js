(function () {
    angular
        .module("ticalcAppStore")
        .controller("topAppListController", topAppListController);

    function topAppListController($rootScope, appService) {
        var model = this;

        init();

        function init() {
            $rootScope.title = "Home";

            appService.findTopApps()
                .then(function (response) {
                    model.apps = response.data;
                });
        }
    }
})();
