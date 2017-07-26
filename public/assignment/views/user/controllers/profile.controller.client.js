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
        var userStr;
        setUser(userService.findUserById(model.uid));

        function logout() {
            $rootScope.user = null;
            $location.url("login");
        }

        function updateUser() {
            setUser(userService.updateUser(model.uid, model.user));
            model.successMessage = "Changes saved successfully.";
        }

        function setUser(user) {
            model.user = user;
            userStr = JSON.stringify(user);
        }
    }
})();
