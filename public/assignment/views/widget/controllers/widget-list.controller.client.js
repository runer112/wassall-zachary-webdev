(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($rootScope, $routeParams, $sce, widgetService) {
        $rootScope.title = "Widgets";

        var model = this;

        model.getWidgetUrl = getWidgetUrl;
        model.trustAsHtml = trustAsHtml;
        model.trustAsResourceUrl = trustAsResourceUrl;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        var widgets = widgetService.findWidgetsByPageId(model.pid);

        // delete unintialized widgets
        model.widgets = [];
        widgets.forEach(function (widget) {
            // _id, pageId, and widgetType should always be present, so check for more than 3 keys
            if (Object.keys(widget).length > 3) {
                model.widgets.push(widget);
            } else {
                widgetService.deleteWidget(widget._id);
            }
        });

        function getWidgetUrl(widgetType) {
            return "views/widget/templates/widget-" + widgetType + ".view.client.html";
        }

        function trustAsHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function trustAsResourceUrl(resourceUrl) {
            return $sce.trustAsResourceUrl(resourceUrl);
        }

        function getYouTubeEmbedUrl(url) {
            var youTubeEmbedUrlPrefix = "https://www.youtube.com/embed/"
            var splitUrl = url.split("/");
            var id = splitUrl[splitUrl.length - 1];
            var youTubeEmbedUrl = youTubeEmbedUrlPrefix + id;
            return trustAsResourceUrl(youTubeEmbedUrl);
        }
    }
})();
