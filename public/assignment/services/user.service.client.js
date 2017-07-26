(function() {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService(websiteService) {
        var genericService = createGenericService(null, [websiteService]);

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@wonder.com" },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@marley.com" },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@garcia.com" },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@annuzi.com" },
        ];
        genericService.entities = users;

        var api = {
            createUser            : genericService.create,
            findUserById          : genericService.findById,
            findUserByUsername    : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser            : genericService.update,
            deleteUser            : genericService.delete,
        };

        return api;

        function findUserByUsername(username) {
            return genericService.find(function (user) {
                return user.username === username;
            });
        }

        function findUserByCredentials(username, password) {
            return genericService.find(function (user) {
                return user.username === username && user.password === password;
            });
        }
    }
})();
