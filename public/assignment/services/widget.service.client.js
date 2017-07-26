(function () {
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);

    function widgetService() {
        var genericService = createGenericService();

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        genericService.entities = widgets;

        var api = {
            createWidget: genericService.create,
            findWidgetById: genericService.findById,
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget: genericService.update,
            deleteWidget: genericService.delete,
        };

        return api;

        function findWidgetsByPageId(pageId) {
            return genericService.filter(function (widget) {
                return widget.pageId === pageId;
            });
        }
    }
})();
