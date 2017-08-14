(function () {
    angular
        .module("ticalcAppStore")
        .controller("loginController", loginController);

    function loginController($rootScope, $location, userService) {
        $rootScope.title = "Login";

        var model = this;

        model.login = login;

        function login(user) {
            userService.login(user)
                .then(
                    function (response) {
                        var user = response.data;
                        $rootScope.user = user;
                        $location.url("");
                    },
                    function (err) {
                        model.errorMessage = "Invalid username or password.";
                    });
        }
    }
})();
