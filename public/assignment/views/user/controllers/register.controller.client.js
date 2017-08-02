(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($rootScope, $scope, $location, userService) {
        $rootScope.title = "Register";

        var model = this;

        model.register = register;

        $scope.$watch("model.user.password", validatePassword);
        $scope.$watch("model.verifyPassword", validateVerifyPassword);

        function register() {
            validateUsername(model.user.username, registerCallback);
        }

        function registerCallback() {
            if (model.usernameOk && model.passwordOk && model.verifyPasswordOk) {
                userService.createUser(null, model.user)
                    .then(function (response) {
                       var user = response.data;
                        $location.url("user/" + user._id);
                    });
            }
        }

        function validateUsername(username, successCallback) {
            model.usernameMessage = "";
            model.usernameOk = false;
            if (!username) {
                model.usernameClass = "";
            } else {
                userService.findUserByUsername(null, username)
                    .then(function (response) {
                        if (response.data.length) {
                            model.usernameClass = "has-error";
                            model.usernameMessage = "Username exists.";
                        } else {
                            model.usernameClass = "has-success";
                            model.usernameOk = true;
                            if (successCallback) {
                                successCallback();
                            }
                        }
                    });
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
