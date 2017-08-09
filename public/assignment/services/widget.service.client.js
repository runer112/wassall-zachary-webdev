(function () {
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);

    function widgetService($http) {
        var genericService = createGenericService($http, getBaseUrl, getEntityUrl);

        var api = {
            createWidget: genericService.create,
            findWidgetById: genericService.findById,
            findWidgetsByPageId: genericService.queryBy("_page"),
            updateWidget: genericService.update,
            deleteWidget: genericService.delete,
        };

        return api;

        function getBaseUrl(pid) {
            return "/api/page/" + pid + "/widget";
        }

        function getEntityUrl(wgid) {
            return "/api/widget/" + wgid;
        }
    }
})();
