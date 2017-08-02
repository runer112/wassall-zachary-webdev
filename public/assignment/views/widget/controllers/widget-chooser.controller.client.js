(function () {
    angular
        .module("WebAppMaker")
        .controller("chooseWidgetController", chooseWidgetController);

    function chooseWidgetController($rootScope, $routeParams, $location, widgetService) {
        $rootScope.title = "Choose Widget";

        var model = this;

        model.createWidget = createWidget;
        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];

        function createWidget(widgetType) {
            var widget = {pageId: model.pid, widgetType: widgetType};
            widgetService.createWidget(widget)
                .then(function (response) {
                    widget = response.data;
                    $location.url("user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget/" + widget._id);
                });
        }
    }
})();
