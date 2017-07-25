(function() {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

        function registerController($scope, $location, userService) {
            var model = this;

            model.register = register;

            $scope.$watch("model.user.username", validateUsername);
            $scope.$watch("model.user.password", validatePassword);
            $scope.$watch("model.verifyPassword", validateVerifyPassword);

            function register(user) {
                user = userService.createUser(user);
                $location.url("user/" + user._id);
            }

            function validateUsername(username) {
                model.usernameMessage = "";
                model.usernameOk = false;
                if (!username) {
                    model.usernameClass = "";
                } else if (userService.findUserByUsername(username)) {
                    model.usernameClass = "has-error";
                    model.usernameMessage = "Username exists.";
                } else {
                    model.usernameClass = "has-success";
                    model.usernameOk = true;
                }
            }

            function validatePassword(password) {
                model.passwordMessage = "";
                model.passwordOk = false;
                if (!password) {
                    model.passwordClass = "";
                } else {
                    model.passwordClass = "has-success";
                    model.passwordOk = true;
                }
            }

            function validateVerifyPassword(verifyPassword) {
                model.verifyPasswordMessage = "";
                model.verifyPasswordOk = false;
                if (!verifyPassword) {
                    model.verifyPasswordClass = "";
                } else if (verifyPassword !== model.user.password) {
                    model.verifyPasswordClass = "has-error";
                    model.verifyPasswordMessage = "Passwords do not match.";
                } else {
                    model.verifyPasswordClass = "has-success";
                    model.verifyPasswordOk = true;
                }
            }
        }
})();
