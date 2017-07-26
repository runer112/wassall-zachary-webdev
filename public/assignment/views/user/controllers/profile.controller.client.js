(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var model = this;

        model.updateUser = updateUser;

        model.uid = $routeParams["uid"];
        var userStr;
        setUser(userService.findUserById(model.uid));

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
