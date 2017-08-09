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
        findById: findById,
        findByFk: findByFk,
        update: update,
        delete: delete_,
        deleteByFk: deleteByFk,
        addChild: addChild,
        moveChild: moveChild,
        removeChild: removeChild,
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
        var promise = api.find(query);
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
        var promise = api.move(parentId, initial, final);
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
                    parentService.addChild(entity[parentIdField], entity._id)
                        .then(function () {

                        });
                });
        } else {
            return promise;
        }
    }

    function find(query) {
        return model.find(query);
    }

    function findById(entityId) {
        return model.findById(entityId);
    }

    function findByFk(fk) {
        var query = {};
        query[parentIdField] = fk;
        return api.find(query);
    }

    function update(entityId, entity) {
        if (parentIdField) {
            delete entity[parentIdField];
        }
        return model.update({_id: entityId}, {$set: entity});
    }

    function delete_(entityId) {
        var promise = model.remove({_id: entityId});
        var deleteChildrenByFk = deleteChildrenByFkSupplier();
        if (deleteChildrenByFk) {
            return promise
                .then(function () {
                    return deleteChildrenByFk(entityId);
                });
        } else {
            return promise;
        }
    }

    function deleteByFk(fk) {
        var query = {};
        query[parentIdField] = fk;
        return model.remove(query);
    }

    function addChild(entityId, child) {
        return api.findById(entityId)
            .then(function (entity) {
                entity[childrenField].push(child);
                return entity.save();
            });
    }

    function moveChild(entityId, initial, final) {
        return api.findById(entityId)
            .then(function (entity) {
                var children = entity[childrenField];
                var childToMove = children.splice(initial, 1)[0];
                var insertIndex = initial < final ? final - 1 : final;
                children.splice(insertIndex, 0, childToMove);
                entity.save();
            });
    }

    function removeChild(entityId, child) {
        return api.findById(entityId)
            .then(function (entity) {
                entity[childrenField].push(child);
                return entity.save();
            });
    }
};
