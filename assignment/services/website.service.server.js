var createGenericService = require("./generic.service.server");
var websiteModel = require("../model/website/website.model.server.js");

module.exports = function (app, userService, deleteChildrenByFkSupplier) {
    var websiteService = createGenericService(app, "/api/user/:uid/website", "/api/website/:wid", "wid", "uid", websiteModel, userService, "_user", "pages", deleteChildrenByFkSupplier);
    // var websites = [
    //     { "_id": "123", "name": "Facebook",    "_user": "456", "description": "Lorem" },
    //     { "_id": "234", "name": "Tweeter",     "_user": "456", "description": "Lorem" },
    //     { "_id": "456", "name": "Gizmodo",     "_user": "456", "description": "Lorem" },
    //     { "_id": "890", "name": "Go",          "_user": "123", "description": "Lorem" },
    //     { "_id": "567", "name": "Tic Tac Toe", "_user": "123", "description": "Lorem" },
    //     { "_id": "678", "name": "Checkers",    "_user": "123", "description": "Lorem" },
    //     { "_id": "789", "name": "Chess",       "_user": "234", "description": "Lorem" }
    // ];

    return websiteService;
};
