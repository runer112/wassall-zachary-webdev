(function () {
    angular
        .module("ticalcAppStore")
        .config(configuration);

    var getLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/p/api/loggedin')
            .then(function (response) {
                var user = response.data;
                $rootScope.user = user;
                deferred.resolve(user);
            });
        return deferred.promise;
    };

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

    var checkNotLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/p/api/loggedin')
            .then(function (response) {
                var user = response.data;
                if (user) {
                    deferred.reject();
                    $location.url('/');
                } else {
                    $rootScope.user = user;
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    };

    function configuration($routeProvider) {
        $routeProvider
            // home route
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {loggedin: getLoggedin}
            })
            // user routes
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model",
                resolve: {loggedin: checkNotLoggedin}
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model",
                resolve: {loggedin: checkNotLoggedin}
            })
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            // app routes
            .when("/app", {
                templateUrl: "views/app/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/app/:appId", {
                templateUrl: "views/app/templates/app.view.client.html",
                controller: "appController",
                controllerAs: "model",
                resolve: {loggedin: getLoggedin}
            })
        // .when("/user/:uid", {
        //     templateUrl: "views/user/templates/profile.view.client.html",
        //     controller: "profileController",
        //     controllerAs: "model"
        // })
    }
})();