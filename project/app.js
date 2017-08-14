module.exports = function (app) {
    var services = {};
    services.userService = require("./services/user.service.server.js")(app, function () {
        return null;
    });
};
