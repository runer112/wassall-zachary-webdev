function createGenericService($http_, getBaseUrl_, getEntityUrl_) {
    return (function () {
        var $http = $http_;
        var getBaseUrl = getBaseUrl_;
        var getEntityUrl = getEntityUrl_;

        var api = {
            create: create,
            findById: findById,
            query: query,
            queryBy: queryBy,
            queryOne: queryOne,
            queryOneBy: queryOneBy,
            update: update,
            delete: delete_,
        };

        return api;

        function create(urlContext, entity) {
            return $http.post(getBaseUrl(urlContext), entity);
        }

        function findById(urlContext) {
            return $http.get(getEntityUrl(urlContext));
        }

        function query(urlContext, query) {
            var queryStr = Object.keys(query).map(function (key) {
                return "" + key + "=" + query[key];
            }).join("&");
            return $http.get(getBaseUrl(urlContext) + "?" + queryStr);
        }

        function queryBy() {
            var keys = arguments;
            return function (urlContext) {
                var values = arguments;
                var query = {};
                for (var i = 0; i < keys.length; i++) {
                    query[keys[i]] = values[i + 1];
                }
                return api.query(urlContext, query);
            };
        }

        function queryOne(urlContext, query) {
            var promise = api.query(urlContext, query);
            var originalThen = promise.then;
            promise.then = function (successCallback, errorCallback) {
                originalThen(function (response) {
                    if (response.data.length === 1) {
                        response.data = response.data[0];
                        successCallback(response);
                    } else {
                        errorCallback(response);
                    }
                }, errorCallback);
            };
            return promise;
        }

        function queryOneBy() {
            return queryByUsing(api.queryOne);
        }

        function update(urlContext, entity) {
            return $http.put(getEntityUrl(urlContext), entity);
        }

        function delete_(urlContext) {
            return $http.delete(getEntityUrl(urlContext));
        }

        function successCallback(res) {
            return res.data;
        }

        function errorCallback(res) {
            return null;
        }
    })();
}
