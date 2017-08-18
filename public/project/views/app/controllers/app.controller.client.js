(function () {
    angular
        .module("ticalcAppStore")
        .controller("appController", appController);

    function appController($rootScope, $routeParams, appService) {
        var model = this;

        model.appId = $routeParams.appId;

        appService.findAppById(model.appId)
            .then(function (response) {
                var app = response.data;
                model.app  = app;
                $rootScope.title = app.name;
            });
    }
})();
