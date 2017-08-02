(function () {
    angular
        .module("wbdvDirectives", ["ngRoute"])
        .directive("wbdvSortable", wbdvSortableDirective);

    function wbdvSortableDirective($http, $routeParams) {
        function linkFunction(scope, element) {
            var pid = $routeParams["pid"];
            var initial;
            var final;
            element.sortable({
                handle : ".handle",
                start: function (event, ui) {
                    initial = $(ui.item).index();
                },
                stop: function (event, ui) {
                    final = $(ui.item).index();
                    console.log([initial, final]);
                    if (initial !== final) {
                        $http.put("/api/page/" + pid + "/widget?initial=" + initial + "&final=" + final);
                    }
                }
            });
        }

        return {
            templateUrl: "views/widget/templates/widget-list.template.view.client.html",
            link: linkFunction
        }
    }
})();