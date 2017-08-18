var model = require("../model/app/app.model.server.js");

var request = require('request');
var $q = require('q');

module.exports = function (app, services) {
    var baseUrl = "/p/api/app";
    var entityUrl = "/p/api/app/:appId";
    var idParam = "appId";

    // http handlers
    app.get(baseUrl, efind);
    app.get(entityUrl, efindById);

    var api = {
        find: find,
        findById: findById,
        findByTicalcId: findByTicalcId,
        update: update,
        reduce: reduce,
    };

    return api;

    // express API

    function esend(res, promise) {
        promise
            .then(function (data) {
                if (data) {
                    res.json(data);
                } else {
                    res.sendStatus(404);
                }
            });
    }

    function efind(req, res) {
        var query = req.query;
        var promise = api.find(query);
        esend(res, promise);
    }

    function efindById(req, res) {
        var entityId = req.params[idParam];
        var promise = api.findById(entityId);
        esend(res, promise);
    }

    // API

    function find(query) {
        var deferred = $q.defer();

        query.q = query.q.trim();

        // abort if query is empty
        if (query.q.length === 0) {
            deferred.reject("Blank query string");

        } else {
            var q = query.q;
            // query must be at least 4 characters, so duplicate the query if not long enough
            while (q.length < 4) {
                q += "+" + query.q;
            }

            var options = {
                url: "http://www.ticalc.org/cgi-bin/websearch.cgi",
                body: "searchstring=" + q + "&idx2=ftp"
            };

            request.post(options, function (err, res, body) {
                if (err) {
                    deferred.reject("Failed to load ticalc search resource");

                } else {
                    var re = /<TD class=t1 ><b><a href="\/archives\/files\/fileinfo\/\d+\/(\d+).html">(.*)<\/a><\/b><\/TD>/g;
                    var match;
                    var ticalcIds = [];

                    while (match = re.exec(body)) {
                        var ticalcId = parseInt(match[1]);
                        ticalcIds.push(ticalcId);
                    }

                    var appsMap = {};
                    var checkDone = function () {
                        if (Object.keys(appsMap).length === ticalcIds.length) {
                            var apps = [];
                            ticalcIds.forEach(function (ticalcId) {
                                var app = appsMap["_" + ticalcId];
                                if (app) {
                                    apps.push(app);
                                }
                            });

                            deferred.resolve(apps);
                        }
                    };

                    ticalcIds.forEach(function (ticalcId) {
                        api.findByTicalcId(ticalcId)
                            .then(function (app) {
                                appsMap["_" + ticalcId] = reduce(app);
                                checkDone();
                            }, function (err) {
                                console.log("Failed to fill in ticalc app " + ticalcId + " for search '" + query.q + "': " + err);
                                appsMap["_" + ticalcId] = null;
                                checkDone();
                            });
                    });
                }
            });
        }

        return deferred.promise;
    }

    function findById(entityId) {
        return model.findById(entityId)
            .then(function (app) {
                if (app) {
                    return populateFull(app)
                        .then(function (app) {
                            return app;
                        }, function (err) {
                            console.log(err);
                        });
                } else {
                    return null;
                }
            });
    }

    function findByTicalcId(ticalcId) {
        var deferred = $q.defer();

        model.findOne({ticalcId: ticalcId})
            .then(function (app) {
                if (app) {
                    deferred.resolve(app);
                } else {
                    findByTicalcIdExternal(ticalcId)
                        .then(function (app) {
                            model.create(app)
                                .then(function (app) {
                                    deferred.resolve(app);
                                });
                        }, function (err) {
                            deferred.reject(err);
                        });
                }
            });

        return deferred.promise;
    }

    function update(appId, app) {
        return model.update({_id: appId}, {$set: app});
    }

    function reduce(app) {
        var category = services.categoryService.findByAbbrev(app.category);
        return {
            _id: app._id,
            name: app.name,
            description: app.description,
            category: app.category,
            categoryName: category.name,
            stars: app.stars
        };
    }

    // internal

    function findByTicalcIdExternal(ticalcId) {
        var deferred = $q.defer();

        request("http://www.ticalc.org/archives/files/fileinfo/" + Math.floor(ticalcId / 100) + "/" + ticalcId + ".html", function (err, res, body) {
            if (err) {
                deferred.reject("Failed to load ticalc app resource");

            } else {
                var artifact;
                var artifactMatch = body.match(/\(<B><A HREF="(.+)">Download<\/A><\/B>\)/)[1];
                if (artifactMatch) {
                    artifact = "http://www.ticalc.org" + artifactMatch;
                } else {
                    deferred.reject("Failed to parse artifact from ticalc app resource");
                    return;
                }

                var name = matchFieldSimple(body, "Title");
                if (!name) {
                    deferred.reject("Failed to parse name from ticalc app resource");
                    return;
                }

                var description = matchFieldSimple(body, "Description");
                // if (!description) {
                //     deferred.reject("Failed to parse description from ticalc app resource");
                //     return;
                // }

                var datePublishedStr = matchFieldSimple(body, "File Date and Time");
                var datePublished = Date.parse(datePublishedStr);
                if (!datePublished) {
                    deferred.reject("Failed to parse date published from ticalc app resource");
                    return;
                }

                var screenshotRe = /\n<IMG SRC="(\/archives\/files\/ss\/[^"]+)"/g;
                var screenshotMatch;
                var screenshots = [];

                while (screenshotMatch = screenshotRe.exec(body)) {
                    var screenshotPath = screenshotMatch[1];
                    var screenshot = "http://www.ticalc.org" + screenshotPath;
                    screenshots.push(screenshot);
                }

                var category;
                var categoryMatch = matchField(body, "Category", "<B><A HREF=\"/pub/([^/\"]+)[^\"]*\">[^<]*</A></B>");
                if (categoryMatch) {
                    category = categoryMatch[1];
                } else {
                    deferred.reject("Failed to parse category from ticalc app resource");
                    return;
                }

                var authorRe = /<A HREF="\/archives\/files\/authors\/\d+\/(\d+).html"><B>([^<]+)<\/B>[^<>]*<\/A> <I>\(<B><A HREF="[^"]*">([^<]*)<\/A><\/B>\)<\/I><BR>/g;
                var authorMatch;
                var authorIds = [];

                while (authorMatch = authorRe.exec(body)) {
                    var authorId = parseInt(authorMatch[1]);
                    var displayName = authorMatch[2];
                    var email = authorMatch[3];
                    email = email ? email : null; // replace blank with null
                    authorIds.push(authorId);

                    (function (authorId, displayName, email) {
                        services.userService.findByTicalcId(authorId)
                            .then(function (author) {
                                if (!author) {
                                    author = {
                                        ticalcId: authorId,
                                        isGenerated: true,
                                        displayName: displayName,
                                        email: email
                                    };
                                    services.userService.create(author);
                                }
                            });
                    })(authorId, displayName, email);
                }

                if (!authorIds.length) {
                    // author may be n/a
                    authorMatch = matchField(body, "Author", "n/a");
                    if (!authorMatch) {
                        deferred.reject("Failed to parse authors from ticalc app resource");
                        return;
                    }
                }

                var app = {
                    ticalcId: ticalcId,
                    name: name,
                    description: description,
                    screenshots: screenshots,
                    authorIds: authorIds,
                    category: category,
                    artifact: artifact,
                    datePublished: datePublished
                };
                deferred.resolve(app);
            }
        });

        return deferred.promise;
    }

    function matchField(body, field, valuePattern) {
        var reStr = "\\n<B>\\n" + field + "\\n(?:<.*>\\n){0,9}" + valuePattern;
        var re = new RegExp(reStr);
        return body.match(re);
    }

    function matchFieldSimple(body, field) {
        var match = matchField(body, field, "(.+)")
        return match ? match[1] : null;
    }

    function populateFull(app) {
        return services.userService.find({ticalcId: {$in: app.authorIds}})
            .then(function (authors) {
                return services.reviewService.findByApp(app._id)
                    .populate('author')
                    .then(function (reviews) {
                        var reviewsWithText = reviews.filter(function (review) {
                            return review.text;
                        });
                        reviewsWithText.forEach(function (review) {
                            var author = services.userService.reduce(review.author);
                            review.author = author;
                        });
                        var category = services.categoryService.findByAbbrev(app.category);
                        return {
                            _id: app._id,
                            name: app.name,
                            description: app.description,
                            screenshots: app.screenshots,
                            authors: authors,
                            category: app.category,
                            categoryName: category.name,
                            artifact: app.artifact,
                            stars: app.stars,
                            starTotal: app.starTotal,
                            ratingTotal: app.ratingTotal,
                            reviews: reviewsWithText,
                            datePublished: app.datePublished,
                        };
                    });
            });
    }
};
