(function () {
    angular
        .module("ticalcAppStore")
        .config(configuration);

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
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
    }
})();