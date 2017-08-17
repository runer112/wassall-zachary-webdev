(function () {
    angular
        .module("ticalcAppStore")
        .controller("searchController", searchController);

    function searchController($rootScope, $routeParams, $location, appService) {
        $rootScope.title = "Search";

        var model = this;

        model.search = search;
        model.q = $routeParams.q;
        model.rating = 4;

        // if the url includes a query string, fetch the search results
        if (model.q) {
            // if the query string is the same as the last search, return the last results
            if ($rootScope.lastSearch && $rootScope.lastSearch.apps) {
                model.apps = $rootScope.lastSearch.apps;
            } else {
                doSearch(model.q);
            }
        }

        function search() {
            $location.url("/app?q=" + model.q);
        }

        function doSearch(q) {
            $rootScope.lastSearch = {
                q: q
            };

            appService.search(q)
                .then(
                    function (response) {
                        var apps = response.data;
                        model.apps = apps;
                        $rootScope.lastSearch.apps = apps;

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
