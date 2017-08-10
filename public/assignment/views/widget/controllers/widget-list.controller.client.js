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

        widgetService.findWidgetsByPageId(model.pid, model.pid)
            .then(function (response) {
                var widgets = response.data;

                // delete unintialized widgets
                model.widgets = [];
                widgets.forEach(function (widget) {
                    // __v, _id, _page, type, and dateCreated should always be present, so check for more than 5 keys
                    if (Object.keys(widget).length > 5) {
                        model.widgets.push(widget);
                    } else {
                        widgetService.deleteWidget(widget._id);
                    }
                });
            });

        function getWidgetUrl(type) {
            return "views/widget/templates/widget-" + type.toLowerCase() + ".view.client.html";
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
