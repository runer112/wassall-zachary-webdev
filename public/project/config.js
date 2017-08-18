(function () {
    angular
        .module("ticalcAppStore")
        .config(configuration)
        .run(function ($rootScope, $route, userService) {
            $rootScope.logout = function () {
                userService.logout()
                    .then(
                        function (response) {
                            $rootScope.user = null;
                            $route.reload();
                        });
            }
        });

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

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/p/api/loggedin')
            .then(function (response) {
                var user = response.data;
                if (user && user.isAdmin) {
                    $rootScope.user = user;
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
        return deferred.promise;
    };

    var checkDeveloper = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/p/api/loggedin')
            .then(function (response) {
                var user = response.data;
                if (user && user.ticalcId >= 0) {
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
                templateUrl: "views/app/templates/top-app-list.view.client.html",
                controller: "topAppListController",
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
            .when("/profile/:userId", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {loggedin: getLoggedin}
            })
            .when("/admin/users", {
                templateUrl: "views/user/templates/user-list.view.client.html",
                controller: "userListController",
                controllerAs: "model",
                resolve: {loggedin: checkAdmin}
            })
            // app routes
            .when("/app", {
                templateUrl: "views/app/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model",
                resolve: {loggedin: getLoggedin}
            })
            .when("/app/:appId", {
                templateUrl: "views/app/templates/app.view.client.html",
                controller: "appController",
                controllerAs: "model",
                resolve: {loggedin: getLoggedin}
            })
            .when("/user/:userId/app", {
                templateUrl: "views/app/templates/user-app-list.view.client.html",
                controller: "userAppListController",
                controllerAs: "model",
                resolve: {loggedin: checkDeveloper}
            })
            // review routes
            .when("/review-feed", {
                templateUrl: "views/review/templates/review-feed.view.client.html",
                controller: "reviewFeedController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/app/:appId/review/new", {
                templateUrl: "views/review/templates/review-new.view.client.html",
                controller: "newReviewController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/user/:userId/app-review", {
                templateUrl: "views/review/templates/user-app-review-list.view.client.html",
                controller: "userAppReviewListController",
                controllerAs: "model",
                resolve: {loggedin: checkDeveloper}
            })
    }
})();