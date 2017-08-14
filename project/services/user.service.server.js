var createGenericService = require("./generic.service.server");
var userModel = require("../model/user/user.model.server.js");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, deleteWebsitesByFkSupplier) {
    var userService = createGenericService(app, "/p/api/user", "/p/api/user/:uid", "uid", null, userModel, null, null, "websites", deleteWebsitesByFkSupplier);

    // express setup
    app.post('/p/api/login', passport.authenticate('local'), login);
    app.post('/p/api/logout', logout);
    app.post('/p/api/register', register);
    app.get('/p/api/loggedin', loggedin);

    // passport setup
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));

    // internal setup
    userService.findByUsernameAndPassword = userService.findOneBy("username", "password");
    userService.findUserByFacebookId = userService.findOneBy("facebook.id");

    return userService;

    // express API

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var user = req.body;
        userModel
            .create(user)
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : "");
    }

    // passport API

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userService
            .findById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err);
                }
            );
    }

    function localStrategy(username, password, done) {
        userService
            .findOne({username: username, password: password})
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    return done(err);
                }
            );
    }

    // internal API
};
