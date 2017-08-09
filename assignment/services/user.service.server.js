var createGenericService = require("./generic.service.server");
var userModel = require("../model/user/user.model.server.js");

module.exports = function (app, deleteWebsitesByFkSupplier) {
    var userService = createGenericService(app, "/api/user", "/api/user/:uid", "uid", null, userModel, null, null, "websites", deleteWebsitesByFkSupplier);
    // var users = [
    //     {username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];
    // users.forEach(userService.create);

    return userService;
};
