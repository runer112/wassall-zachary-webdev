(function () {
    angular
        .module("ticalcAppStore")
        .controller("homeController", homeController);

    function homeController($rootScope) {
        $rootScope.title = "Home";

        var model = this;
    }
})();
