(function () {
    angular
        .module("ticalcAppStore")
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
            return "/p/api/user";
        }

        function getEntityUrl(entityId) {
            return "/p/api/user/" + entityId;
        }
    }
})();
