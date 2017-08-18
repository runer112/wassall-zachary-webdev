(function () {
    angular
        .module("ticalcAppStore")
        .controller("searchController", searchController);

    function searchController($rootScope, $routeParams, $location, appService) {
        var model = this;

        model.search = search;

        init();

        function init() {
            $rootScope.title = "Search";

            model.q = $routeParams.q;
            model.rating = 4;

            // if the url includes a query string, fetch the search results
            if (model.q) {
                doSearch(model.q);
            }
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
