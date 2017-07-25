(function() {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@wonder.com" },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@marley.com" },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@garcia.com" },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@annuzi.com" },
        ];

        var nextId = 1000;

        var api = {
            createUser            : createUser,
            findUserById          : findUserById,
            findUserByUsername    : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser            : updateUser,
            deleteUser            : deleteUser,
        };

        return api;

        function createUser(user) {
            user._id  = nextId.toString();
            nextId++;
            users.push(user);
            return user;
        }

        function findUserById(userId) {
            return users.find(function (user) {
                return user._id === userId;
            });
        }

        function findUserByUsername(username) {
            return users.find(function (user) {
                return user.username === username;
            });
        }

        function findUserByCredentials(username, password) {
            return users.find(function (user) {
                return user.username === username && user.password === password;
            });
        }

        function updateUser(userId, user) {
            var index = findIndexOfUserById(userId);
            users[index] = user;
            return user;
        }

        function deleteUser(userId, user) {
            var index = findIndexOfUserById(userId);
            users.splice(index, 1);
        }

        function findIndexOfUserById(userId) {
            return users.findIndex(function (user) {
                return user._id === userId;
            });
        }

    }
})();
