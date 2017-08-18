(function () {
    angular
        .module("ticalcAppStore")
        .controller("registerController", registerController);

    function registerController($rootScope, $scope, $location, userService) {
        var model = this;

        model.register = register;
        model.validatePassword = validatePassword;

        init();

        function init() {
            $rootScope.title = "Register";
        }

        function register() {
            validateUsername(model.user.username, registerCallback);
        }

        function registerCallback() {
            if (model.usernameOk && model.passwordOk && model.verifyPasswordOk) {
                userService.register(model.user)
                    .then(function (response) {
                       var user = response.data;
                        $rootScope.user = user;
                        $location.url("");
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

        function validatePassword() {
            model.passwordMessage = "";
            model.passwordOk = false;
            if (!model.user.password) {
                model.passwordClass = "";
            } else {
                model.passwordClass = "has-success";
                model.passwordOk = true;
            }

            model.verifyPasswordMessage = "";
            model.verifyPasswordOk = false;
            if (!model.verifyPassword) {
                model.verifyPasswordClass = "";
            } else if (model.verifyPassword !== model.user.password) {
                model.verifyPasswordClass = "has-error";
                model.verifyPasswordMessage = "Passwords do not match.";
            } else {
                model.verifyPasswordClass = "has-success";
                model.verifyPasswordOk = true;
            }
        }
    }
})();
