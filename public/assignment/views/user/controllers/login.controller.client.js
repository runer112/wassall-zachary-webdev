(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($rootScope, $location, userService) {
        $rootScope.title = "Login";

        var model = this;

        model.login = login;

        function login(user) {
            user = userService.findUserByCredentials(user.username, user.password);
            if (user) {
                $location.url("user/" + user._id);
            } else {
                model.errorMessage = "Invalid username or password.";
            }
        }
    }
})();
