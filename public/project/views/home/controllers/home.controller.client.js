(function () {
    angular
        .module("ticalcAppStore")
        .controller("homeController", homeController);

    function homeController($rootScope, $route, userService) {
        $rootScope.title = "Home";

        var model = this;

        model.logout = logout;

        function logout() {
            userService.logout()
                .then(function (response) {
                    $rootScope.user = null;
                    $route.reload();
                });
        }
    }
})();
