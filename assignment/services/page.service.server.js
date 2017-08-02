module.exports = function (app, createGenericService, widgetService) {
    var pageService = createGenericService("/api/website/:wid/page", "/api/page/:pid", "pid", "wid", "websiteId", [widgetService.deleteByFk]);
    pageService.entities = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    return pageService;
};
