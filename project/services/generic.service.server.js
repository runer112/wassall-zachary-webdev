var mongoose = require("mongoose");

module.exports = function (app, baseUrl_, entityUrl_, idParam_, fkParam_, model_, parentService_, parentIdField_, childrenField_, deleteChildrenByFkSupplier_) {
    // express internal
    var baseUrl = baseUrl_;
    var entityUrl = entityUrl_;
    var idParam = idParam_;
    var fkParam = fkParam_;

    // mongoose internal
    var model = model_;
    var parentService = parentService_;
    var parentIdField = parentIdField_;
    var childrenField = childrenField_;
    var deleteChildrenByFkSupplier = deleteChildrenByFkSupplier_;

    // http handlers
    app.post(baseUrl, ecreate);
    app.get(baseUrl, efind);
    app.get(entityUrl, efindById);
    app.put(entityUrl, eupdate);
    app.put(baseUrl, emove);
    app.delete(entityUrl, edelete);

    var api = {
        create: create,
        find: find,
        findBy: findBy,
        findOne: findOne,
        findOneBy: findOneBy,
        findById: findById,
        findByFk: findBy(parentIdField),
        update: update,
        delete: delete_,
        deleteByFk: deleteByFk,
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

    function ecreate(req, res) {
        var entity = req.body;
        var promise = api.create(entity);
        esend(res, promise);
    }

    function efind(req, res) {
        var query = req.query;
        var promise;
        if (Object.keys(query).length === 1 && query[parentIdField]) {
            // handle find by fk specially to reflect order in parent
            promise = parentService.findChildren(query[parentIdField]);
        } else {
            promise = api.find(query);
        }
        esend(res, promise);
    }

    function efindById(req, res) {
        var entityId = req.params[idParam];
        var promise = api.findById(entityId);
        esend(res, promise);
    }

    function eupdate(req, res) {
        var entityId = req.params[idParam];
        var entity = req.body;
        var promise = api.update(entityId, entity);
        esend(res, promise);
    }

    function emove(req, res) {
        var parentId = req.params[fkParam];
        var initial = parseInt(req.query.initial);
        var final = parseInt(req.query.final);
        var promise = parentService.moveChild(parentId, initial, final);
        esend(res, promise);
    }

    function edelete(req, res) {
        var entityId = req.params[idParam];
        var promise = api.delete(entityId);
        esend(res, promise);
    }

    // mongoose API

    function create(entity) {
        var promise = model.create(entity);
        if (parentService) {
            return promise
                .then(function (entity) {
                    return parentService.addChild(entity[parentIdField], entity._id)
                        .then(function () {
                            return promise;
                        });
                });
        } else {
            return promise;
        }
    }

    function find(query) {
        return model.find(query);
    }

    function findBy() {
        var findSupplier = function () {
            return api.find;
        };
        var keys = arguments;
        return findBy_(findSupplier, keys);
    }

    function findOne(query) {
        return model.findOne(query);
    }

    function findOneBy() {
        var findSupplier = function () {
            return api.findOne;
        };
        var keys = arguments;
        return findBy_(findSupplier, keys);
    }

    function findBy_(findSupplier, keys) {
        return function () {
            var values = arguments;
            var query = {};
            for (var i = 0; i < keys.length; i++) {
                query[keys[i]] = values[i];
            }
            return findSupplier()(query);
        };
    }

    function findById(entityId) {
        return model.findById(entityId);
    }

    function update(entityId, entity) {
        if (parentIdField) {
            delete entity[parentIdField];
        }
        return model.update({_id: entityId}, {$set: entity});
    }

    function delete_(entityId) {
        var deleteChildrenByFk = deleteChildrenByFkSupplier();
        if (deleteChildrenByFk) {
            // don't wait
            deleteChildrenByFk(entityId);
        }
        return deleteNoCascade(entityId);
    }

    function deleteNoCascade(entityId) {
        return model.remove({_id: entityId});
    }

    // does not return a promise
    function deleteByFk(fk) {
        var query = {};
        query[parentIdField] = fk;
        api.find(query)
            .then(function (entities) {
                entities.forEach(function (entity) {
                    api.delete(entity._id);
                });
            });
    }
};
