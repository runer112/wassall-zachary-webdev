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
            updateUser: genericService.update,
            deleteUser: genericService.delete,
            login: login,
            logout: logout,
            register: register,
        };

        return api;

        function getBaseUrl() {
            return "/p/api/user";
        }

        function getEntityUrl(entityId) {
            return "/p/api/user/" + entityId;
        }

        function login(user) {
            return $http.post("/p/api/login", user);
        }

        function logout(user) {
            return $http.post("/p/api/logout");
        }

        function register(user) {
            return $http.post("/p/api/register", user);
        }
    }
})();
