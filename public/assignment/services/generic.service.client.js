function createGenericService() {
    return (function () {
        var entities = [];
        var nextId = 1000;

        var api = {
            entities: entities,
            create: create,
            update: update,
            delete: delete_,
            find: find,
            findById: findById,
            filter: filter,
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

        function update(entityId, entity) {
            var index = api.findIndexOfById(entityId);
            var entityClone = api.clone(entity);
            entityClone._id = entityId;
            api.entities[index] = entityClone;
            return api.clone(entityClone);
        }

        function delete_(entityId, entity) {
            var index = api.findIndexOfById(entityId);
            api.entities.splice(index, 1);
        }

        function find(predicate) {
            var entity = api.entities.find(predicate);
            return api.clone(entity);
        }

        function findById(entityId) {
            return api.find(function (entity) {
                entity._id === entityId;
            })
        }

        function filter(predicate) {
            var filteredEntities = api.entities.filter(predicate);
            return filteredEntities.map(api.clone);
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
