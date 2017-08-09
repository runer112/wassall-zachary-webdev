var createGenericService = require("./generic.service.server");
var pageModel = require("../model/page/page.model.server.js");

module.exports = function (app, websiteService, deleteChildrenByFkSupplier) {
    var pageService = createGenericService(app, "/api/website/:wid/page", "/api/page/:pid", "pid", "wid", pageModel, websiteService, "_website", "widgets", deleteChildrenByFkSupplier);
    // var pages = [
    //     { "_id": "321", "name": "Post 1", "_website": "456", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "_website": "456", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "_website": "456", "description": "Lorem" }
    // ];

    return pageService;
};
