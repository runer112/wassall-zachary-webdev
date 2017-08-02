(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($rootScope, $location, userService) {
        $rootScope.title = "Login";

        var model = this;

        model.login = login;

        function login(user) {
            userService.findUserByCredentials(null, user.username, user.password)
                .then(function (response) {
                    if (response.data.length == 1) {
                        var user = response.data[0];
                        $rootScope.user = user;
                        $location.url("user/" + user._id);
                    } else {
                        model.errorMessage = "Invalid username or password.";
                    }
                });
        }
    }
})();
