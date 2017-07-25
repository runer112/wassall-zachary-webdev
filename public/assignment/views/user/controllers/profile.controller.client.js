(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var model = this;

        model.updateUser = updateUser;
        model.isChanged = isChanged;

        var user;
        var userStr;
        var userId = $routeParams["uid"];
        setUser(userService.findUserById(userId));

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
            this.user = user;
            userStr = JSON.stringify(user);
            model.user = JSON.parse(userStr);
        }
    }
})();
