(function () {
    angular
        .module("ticalcAppStore")
        .controller("loginController", loginController);

    function loginController($rootScope, $location, userService) {
        var model = this;

        model.login = login;

        init();

        function init() {
            $rootScope.title = "Login";
        }

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
