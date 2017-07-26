(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, $sce, widgetService) {
        var model = this;

        model.getWidgetUrl = getWidgetUrl;
        model.trustAsHtml = trustAsHtml;
        model.trustAsResourceUrl = trustAsResourceUrl;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.widgets = widgetService.findWidgetsByPageId(model.pid);

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
