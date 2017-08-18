(function () {
    angular
        .module("ticalcAppStore")
        .controller("profileController", profileController);

    function profileController($rootScope, $location, $routeParams, userService) {
        var model = this;

        model.updateUser = updateUser;
        model.userId = $routeParams.userId;
        userService.findUserById(model.userId)
            .then(function (response) {
                model.user = response.data;
                if (model.user._id === $rootScope.user._id) {
                    $rootScope.title = "Profile";
                } else {
                    $rootScope.title = (model.user.displayName ? model.user.displayName : model.user.username)
                        + "'s Profile";
                }
            });

        function updateUser() {
            userService.updateUser(model.userId, model.user)
                .then(function (response) {
                    model.successMessage = "Changes saved successfully.";
                    $rootScope.user = response.data;
                });
        }
    }
})();
