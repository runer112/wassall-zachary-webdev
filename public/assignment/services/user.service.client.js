(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http) {
        var genericService = createGenericService($http, getBaseUrl, getEntityUrl);

        var api = {
            createUser: genericService.create,
            findUserById: genericService.findById,
            findUserByUsername: genericService.queryBy("username"),
            findUserByCredentials: genericService.queryBy("username", "password"),
            updateUser: genericService.update,
            deleteUser: genericService.delete,
        };

        return api;

        function getBaseUrl() {
            return "/api/user";
        }

        function getEntityUrl(entityId) {
            return "/api/user/" + entityId;
        }
    }
})();
