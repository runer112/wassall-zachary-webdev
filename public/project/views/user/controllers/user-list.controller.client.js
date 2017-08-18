(function () {
    angular
        .module("ticalcAppStore")
        .controller("userListController", userListController);

    function userListController($rootScope, userService) {
        $rootScope.title = "User List";

        var model = this;
        model.deleteUser = deleteUser;

        userService.findUsers(null, {isGenerated: false})
            .then(function (response) {
                model.users = response.data;
            });

        function deleteUser(userId) {
            var index = model.users.findIndex(function (user) {
                return user._id === userId;
            });
            model.users.splice(index, 1);
            userService.deleteUser(userId)
                .then(function (response) {
                    // do nothing
                });
        }
    }
})();
