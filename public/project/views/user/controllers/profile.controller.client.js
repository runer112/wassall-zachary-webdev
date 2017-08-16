(function () {
    angular
        .module("ticalcAppStore")
        .controller("profileController", profileController);

    function profileController($rootScope, $location, $routeParams, userService) {
        $rootScope.title = "Profile";

        var model = this;

        model.logout = logout;
        model.updateUser = updateUser;
        model.uid = $rootScope.user._id;
        model.user = $rootScope.user;

        function logout() {
            userService.logout()
                .then(
                    function (response) {
                        $rootScope.user = null;
                        $location.url("/");
                    });
        }

        function updateUser() {
            userService.updateUser(model.uid, model.user)
                .then(function (response) {
                    model.successMessage = "Changes saved successfully.";
                    $rootScope.user = response.data;
                });
        }
    }
})();
