(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var model = this;

        model.updateUser = updateUser;
        model.isChanged = isChanged;

        var uid = $routeParams["uid"];
        var userStr;
        setUser(userService.findUserById(uid));

        function updateUser() {
            setUser(userService.updateUser(model.user._id, model.user));
            model.successMessage = "Changes saved successfully.";
        }

        function isChanged() {
            return !!model.user.email
                && !!model.user.firstName
                && !!model.user.lastName
                && userStr !== JSON.stringify(model.user);
        }

        function setUser(user) {
            model.user = user;
            userStr = JSON.stringify(user);
        }
    }
})();
