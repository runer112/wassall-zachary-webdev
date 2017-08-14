(function () {
    angular
        .module("ticalcAppStore")
        .config(configuration);

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/p/api/loggedin')
            .then(function (response) {
                var user = response.data;
                if (user) {
                    $rootScope.user = user;
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
        return deferred.promise;
    };

    function configuration($routeProvider) {
        $routeProvider
        // home route
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html"
            })
            // user routes
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
    }
})();