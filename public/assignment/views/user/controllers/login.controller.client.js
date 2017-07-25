(function() {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

        function loginController($location, userService) {
            var model = this;

            model.login = login;

            function init() {
            }
            init();

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
