module.exports = function (app) {
    var services = {};
    services.userService = require("./services/user.service.server.js")(app, function () {
        return null;
    });
    services.reviewService = require("./services/review.service.server.js")(app, function () {
        return null;
    });
    services.releaseService = require("./services/release.service.server.js")(app, function () {
        return null;
    });
    services.appService = require("./services/app.service.server.js")(app, function () {
        return null;
    });
};
