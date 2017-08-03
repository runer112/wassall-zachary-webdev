(function () {
    angular
        .module("WebAppMaker")
        .controller("editWidgetController", editWidgetController);

    function editWidgetController($rootScope, $routeParams, $location, widgetService) {
        $rootScope.title = "Edit Widget";

        var model = this;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.wgid = $routeParams["wgid"];

        widgetService.findWidgetById(model.wgid)
            .then(function (response) {
                model.widget = response.data;
            });

        function updateWidget() {
            widgetService.updateWidget(model.wgid, model.widget)
                .then(returnToList);
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.wgid)
                .then(returnToList);
        }

        function returnToList() {
            $location.url("user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
        }
    }
})();
