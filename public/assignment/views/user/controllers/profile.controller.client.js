(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($rootScope, $location, $routeParams, userService) {
        $rootScope.title = "Profile";

        var model = this;

        model.logout = logout;
        model.updateUser = updateUser;
        model.uid = $routeParams["uid"];

        userService.findUserById(model.uid)
            .then(function (response) {
                model.user = response.data;
            });

        function logout() {
            $rootScope.user = null;
            $location.url("login");
        }

        function updateUser() {
            userService.updateUser(model.uid, model.user)
                .then(function (response) {
                    model.successMessage = "Changes saved successfully.";
                });
        }
    }
})();
