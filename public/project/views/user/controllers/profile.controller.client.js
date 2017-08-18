(function () {
    angular
        .module("ticalcAppStore")
        .controller("profileController", profileController);

    function profileController($rootScope, $location, $routeParams, userService) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.unfollowUser = unfollowUser;
        model.toggleFollowUser = toggleFollowUser;

        init();

        function init() {
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

                    updateFollowButton();
                });
        }

        function updateUser() {
            userService.updateUser(model.userId, model.user)
                .then(function (response) {
                    model.successMessage = "Changes saved successfully.";
                });
        }

        function deleteUser() {
            userService.deleteUser(model.userId)
                .then(function (response) {
                    $location.url("/admin/users");
                });
        }

        function unfollowUser(userId) {
            var index = model.user.following.indexOf(userId);
            model.user.following.splice(index, 1);
            userService.updateUser(model.user._id, model.user)
                .then(function (response) {
                    // do nothing
                });
        }

        function toggleFollowUser() {
            if (isFollowing()) {
                var index = $rootScope.user.following.indexOf(model.userId);
                $rootScope.user.following.splice(index, 1);
            } else {
                $rootScope.user.following.push(model.userId);
            }
            userService.updateUser($rootScope.user._id, $rootScope.user)
                .then(function (response) {
                    updateFollowButton();
                });
        }

        function updateFollowButton() {
            model.followButtonText = isFollowing() ? "Unfollow" : "Follow";
        }

        function isFollowing() {
            return $rootScope.user && $rootScope.user.following.includes(model.userId);
        }
    }
})();
