(function () {
    angular
        .module("ticalcAppStore")
        .controller("searchController", searchController);

    function searchController($rootScope, $routeParams, $location, appService) {
        $rootScope.title = "Search";

        var model = this;

        model.search = search;
        model.q = $routeParams.q;
        if (model.q) {
            doSearch(model.q);
        }

        function search() {
            $location.url("/app?q=" + model.q);
        }

        function doSearch(q) {
            appService.search(q)
                .then(
                    function (response) {
                        var apps = response.data;
                        model.apps = apps;
                        if (!apps.length) {
                            model.errorMessage = "No results found.";
                        }
                    },
                    function (err) {
                        model.errorMessage = "Failed to execute search.";
                    });
        }
    }
})();
