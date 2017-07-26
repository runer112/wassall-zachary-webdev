function createGenericService(fkName_, childServices_) {
    return (function () {
        var entities = [];
        var nextId = 1000;
        var fkName = fkName_;
        var childServices = childServices_;

        var api = {
            entities: entities,
            create: create,
            find: find,
            findById: findById,
            filter: filter,
            filterByFk: filterByFk,
            update: update,
            delete: delete_,
            deleteByFk: deleteByFk,
            clone: clone,
        };

        return api;

        function create(entity) {
            entity._id = nextId.toString();
            nextId++;
            var entityClone = api.clone(entity);
            api.entities.push(entityClone);
            return api.clone(entityClone);
        }

        function find(predicate) {
            var entity = api.entities.find(predicate);
            return api.clone(entity);
        }

        function findById(entityId) {
            return api.find(function (entity) {
                return entity._id === entityId;
            })
        }

        function filter(predicate) {
            var filteredEntities = api.entities.filter(predicate);
            return filteredEntities.map(api.clone);
        }

        function filterByFk(fk) {
            return api.filter(function (entity) {
                return entity[fkName] === fk;
            })
        }

        function update(entityId, entity) {
            var index = findIndexOfById(entityId);
            var entityClone = api.clone(entity);
            entityClone._id = entityId;
            api.entities[index] = entityClone;
            return api.clone(entityClone);
        }

        function delete_(entityId) {
            var index = findIndexOfById(entityId);
            if (index >= 0) {
                if (childServices) {
                    childServices.forEach(function (childService) {
                        childService.deleteByFk(entityId);
                    });
                }
                api.entities.splice(index, 1);
            }
        }

        function deleteByFk(fk) {
            var entitiesToDelete = api.filter(function (entity) {
                return entity[fkName] === fk;
            });
            var entityIdsToDelete = entitiesToDelete.map(function (entity) {
                return entity._id;
            });
            entityIdsToDelete.forEach(api.delete);
        }

        function findIndexOfById(entityId) {
            return api.entities.findIndex(function (entity) {
                return entity._id === entityId;
            });
        }

        function clone(obj) {
            return obj ? JSON.parse(JSON.stringify(obj)) : obj;
        }
    })();
}
