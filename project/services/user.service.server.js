var createGenericService = require("./generic.service.server");
var userModel = require("../model/user/user.model.server.js");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, services, deleteChildrenByFkSupplier) {
    var userService = createGenericService(app, "/p/api/user", "/p/api/user/:userId", "userId", null, userModel, null, deleteChildrenByFkSupplier);

    // express API setup
    app.post('/p/api/login', passport.authenticate('local'), login);
    app.post('/p/api/logout', logout);
    app.post('/p/api/register', register);
    app.get('/p/api/loggedin', loggedin);
    app.get('/p/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/p/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#!/',
            failureRedirect: '/project/#!/login'
        }));

    // passport setup
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));
    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    // internal API setup
    var genericFind = userService.find;
    userService.find = find;
    userService.findByIdNoPopulate = userService.findById;
    userService.findById = findById;
    userService.findByUsername = userService.findOneBy("username");
    userService.findByFacebookId = userService.findOneBy("facebook.id");
    userService.findByTicalcId = userService.findOneBy("ticalcId");
    var genericUpdate = userService.update;
    userService.update = update;
    userService.reduce = reduce;

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
        user.password = bcrypt.hashSync(user.password);
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
        userService.findByIdNoPopulate(user._id)
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
            .findByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    return done(err);
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userService
            .findByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var user = {
                            facebook: {
                                id: profile.id,
                                token: token
                            },
                            displayName: profile.displayName
                        };
                        return userService
                            .create(user)
                            .then(function (user) {
                                return done(null, user);
                            });
                    }
                },
                function (err) {
                    return done(err);
                }
            );
    }

    // internal API

    function find(query) {
        return genericFind(query)
            .then(function (users) {
                users = users.map(reduce);
                return users;
            });
    }

    function findById(userId) {
        return userService.findByIdNoPopulate(userId)
            .populate('following')
            .then(function (user) {
                user.following = user.following.map(services.userService.reduce);
                user.following.sort(function (user1, user2) {
                    var name1 = user1.displayName.toLowerCase();
                    var name2 = user2.displayName.toLowerCase();
                    if (name1 < name2) {
                        return -1;
                    }
                    if (name1 > name2) {
                        return 1;
                    }
                    return 0;
                });
                return user;
            });
    }

    function update(userId, user) {
        if (user.ticalcId) {
            return userService.findByTicalcId(user.ticalcId)
                .then(function (existingUser) {
                    if (!existingUser || existingUser._id == userId) {
                        return genericUpdate(userId, user);
                    } else if (existingUser.isGenerated) {
                        return existingUser.remove()
                            .then(function () {
                                return genericUpdate(userId, user);
                            });
                    } else {
                        return "That ticalc ID has already been claimed";
                    }
                });
        } else {
            return genericUpdate(userId, user);
        }
    }

    function reduce(user) {
        if (!user) {
            return null;
        }
        return {
            _id: user._id,
            displayName: user.displayName ? user.displayName : user.username,
            isGenerated: user.isGenerated
        };
    }
};
