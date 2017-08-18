(function () {
    angular
        .module("ticalcAppStore")
        .controller("appController", appController);

    function appController($rootScope, $routeParams, appService) {
        var model = this;

        init();

        function init() {
            model.appId = $routeParams.appId;

            appService.findAppById(model.appId)
                .then(function (response) {
                    var app = response.data;
                    model.app  = app;
                    model.reviews = app.reviews;
                    $rootScope.title = app.name;
                });
        }
    }
})();
