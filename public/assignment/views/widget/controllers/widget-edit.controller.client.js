(function () {
    angular
        .module("WebAppMaker")
        .controller("editWidgetController", editWidgetController);

    function editWidgetController($routeParams, $location, widgetService) {
        var model = this;

        model.validate = validate;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.wgid = $routeParams["wgid"];
        model.widget = widgetService.findWidgetById(model.wgid);
        var widgetStr = JSON.stringify(model.widget);

        function validate() {
            return ((model.widget.widgetType === 'HEADING' && !!model.widget.text && !!model.widget.size)
                || (model.widget.widgetType === 'HTML')
                || ((model.widget.widgetType === 'IMAGE') || (model.widget.widgetType === 'YOUTUBE') && !!model.widget.url))
                && widgetStr !== JSON.stringify(model.widget);
        }

        function updateWidget() {
            widgetService.updateWidget(model.wgid, model.widget);
            $location.url("user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.wgid);
            $location.url("user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
        }
    }
})();
