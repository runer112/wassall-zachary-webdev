var request = require('request');
var $q = require('q');

module.exports = function (app) {
    var baseUrl = "/p/api/app";
    var entityUrl = "/p/api/app/:appId";
    var idParam = "appId";

    // http handlers
    app.get(baseUrl, efind);
    app.get(entityUrl, efindById);

    var api = {
        find: find,
        findById: findById,
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
            deferred.reject();

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
                    return deferred.reject();
                } else {
                    var regex = /<TD class=t1 ><b><a href="\/archives\/files\/fileinfo\/\d+\/(\d+).html">(.*)<\/a><\/b><\/TD>/g;
                    var match;
                    var result = [];
                    while (match = regex.exec(body)) {
                        var id = match[1];
                        var name = match[2];
                        result.push({
                            id: id,
                            name: name
                        });
                    }
                    deferred.resolve(result);
                }
            });
        }

        return deferred.promise;
    }

    function findById(entityId) {
        return model.findById(entityId);
    }
}
;
