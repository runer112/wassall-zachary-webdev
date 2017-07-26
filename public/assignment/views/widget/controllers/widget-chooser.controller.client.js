(function () {
    angular
        .module("WebAppMaker")
        .controller("chooseWidgetController", chooseWidgetController);

    function chooseWidgetController($routeParams, $location, widgetService) {
        var model = this;

        model.createWidget = createWidget;

        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.widgets = widgetService.findWidgetsByPageId(model.pid);

        function createWidget(widgetType) {
            var widget = {pageId: model.pid, widgetType: widgetType};
            widget = widgetService.createWidget(widget);
            $location.url("user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget/" + widget._id);
        }
    }
})();
