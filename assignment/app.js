require("./database.js");

module.exports = function (app) {
    var services = {};
    services.userService = require("./services/user.service.server.js")(app, function () {
        return services.websiteService.deleteByFk;
    });
    services.websiteService = require("./services/website.service.server.js")(app, services.userService, function () {
        return services.pageService.deleteByFk;
    });
    services.pageService = require("./services/page.service.server.js")(app, services.websiteService, function () {
        // return services.widgetService.deleteByFk;
    });
    // services.widgetService = require("./services/widget.service.server.js")(app, services.pageService, function () {
    //     return null;
    // });
};
