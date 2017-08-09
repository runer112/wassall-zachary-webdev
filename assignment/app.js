require("./database.js");

module.exports = function (app) {
    var createGenericService = require("./services/generic.service.server")(app);
    // var widgetService = require("./services/widget.service.server.js")(app, createGenericService);
    // var pageService = require("./services/page.service.server.js")(app, createGenericService, widgetService);
    // var websiteService = require("./services/website.service.server.js")(app, createGenericService, pageService);
    var userService = require("./services/user.service.server.js")(app, createGenericService, null);
};
