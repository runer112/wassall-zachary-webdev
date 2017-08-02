module.exports = function (app) {
    return function (baseUrl_, entityUrl_, idParam_, fkParam_, fkName_, childServiceDeleteByFkFuncs_) {
        // express internal
        var baseUrl = baseUrl_;
        var entityUrl = entityUrl_;
        var idParam = idParam_;
        var fkParam = fkParam_;

        // JS internal
        var fkName = fkName_;
        var childServiceDeleteByFkFuncs = childServiceDeleteByFkFuncs_;
        var entities = [];
        var nextId = 1000;

        // http handlers
        app.post(baseUrl, ecreate);
        app.get(entityUrl, efindById);
        app.get(baseUrl, equery);
        app.put(entityUrl, eupdate);
        app.put(baseUrl, emove);
        app.delete(entityUrl, edelete);

        var api = {
            entities: entities,
            create: create,
            find: find,
            findById: findById,
            query: query,
            queryByFk: queryByFk,
            update: update,
            move: move,
            delete: delete_,
            deleteByFk: deleteByFk,
        };

        return api;

        // express API

        function esend(res, entity) {
            if (entity) {
                res.json(entity);
            } else {
                res.sendStatus(404);
            }
        }

        function ecreate(req, res) {
            var entity = req.body;
            entity = api.create(entity);
            esend(res, entity);
        }

        function efindById(req, res) {
            var entityId = req.params[idParam];
            var entity = api.findById(entityId);
            esend(res, entity);
        }

        function equery(req, res) {
            var query = req.query;
            var queryEntities = api.query(query);
            esend(res, queryEntities);
        }

        function eupdate(req, res) {
            var entityId = req.params[idParam];
            var entity = req.body;
            entity = api.update(entityId, entity);
            esend(res, entity);
        }

        function emove(req, res) {
            var parentId = req.params[fkParam];
            var initial = parseInt(req.query.initial);
            var final = parseInt(req.query.final);
            api.move(parentId, initial, final);
            esend(res, {});
        }

        function edelete(req, res) {
            var entityId = req.params[idParam];
            var entity = api.delete(entityId);
            esend(res, entity);
        }

        // JS API

        function create(entity) {
            entity._id = nextId.toString();
            nextId++;
            api.entities.push(entity);
            return entity;
        }

        function find(predicate) {
            var entity = api.entities.find(predicate);
            return entity;
        }

        function findById(entityId) {
            var entity = api.find(function (entity) {
                return entity._id === entityId;
            });
            return entity;
        }

        function query(query) {
            var queryEntities = api.entities.filter(function (entity) {
                return Object.keys(query).every(function (key) {
                    return entity[key] === query[key];
                });
            });
            return queryEntities;
        }

        function queryByFk(fk) {
            var queryEntities = api.entities.filter(function (entity) {
                return entity[fkName] === fk;
            });
            return queryEntities;
        }

        function update(entityId, entity) {
            var index = findIndexOfById(entityId);
            if (index >= 0) {
                entity._id = entityId;
                api.entities[index] = entity;
                return entity;
            }
        }

        function move(parentId, initial, final) {
            var entityToMove, iShiftInto, j = 0;
            var entities = api.entities;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                if (entity[fkName] === parentId) {
                    if (initial < final) {
                        if (j === initial) {
                            entityToMove = entity;
                            iShiftInto = i;
                        }
                        if (j >= initial) {
                            entities[iShiftInto] = entity;
                            iShiftInto = i;
                        }
                        if (j === final) {
                            entities[i] = entityToMove;
                            break;
                        }
                    } else if (final < initial) {
                        if (j === final) {
                            entityToMove = entity;
                            iShiftInto = i;
                        }
                        if (j >= final) {
                            entities[i] = entityToMove;
                            entityToMove = entity;
                        }
                        if (j === initial) {
                            entities[iShiftInto] = entity;
                            break;
                        }
                    }
                    j++;
                }
            }
            return {};
        }

        function delete_(entityId) {
            var index = findIndexOfById(entityId);
            if (index >= 0) {
                if (childServiceDeleteByFkFuncs) {
                    childServiceDeleteByFkFuncs.forEach(function (childServiceDeleteByFk) {
                        childServiceDeleteByFk(entityId);
                    });
                }
                var entity = api.entities[index];
                api.entities.splice(index, 1);
                return entity;
            }
        }

        function deleteByFk(fk) {
            var entitiesToDelete = api.queryByFk(fk);
            entitiesToDelete.forEach(function (entity) {
                return api.delete(entity._id);
            });
        }

        // JS internal

        function findIndexOfById(entityId) {
            return api.entities.findIndex(function (entity) {
                return entity._id === entityId;
            });
        }
    }
};