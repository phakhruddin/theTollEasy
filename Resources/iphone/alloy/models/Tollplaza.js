var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            tollplaza: "TEXT",
            longitude: "real",
            latitude: "real",
            altitude: "real",
            heading: "real",
            speed: "real",
            hwy: "TEXT",
            accuracy: "real",
            timestamp: "real",
            altitudeAccuracy: "real",
            source: "TEXT",
            location: "TEXT",
            cost: "real",
            type: "text",
            hwy: "text",
            note: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "tollplaza"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            deleteAll: function() {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            deleteLOC: function(loc) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + ' WHERE location="' + loc + '"';
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            deleteTollPlaza: function(tollplaza) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + ' WHERE tollplaza="' + tollplaza + '"';
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            deleteLAT: function(lat) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + ' WHERE latitude="' + lat + '"';
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            saveAll: function() {
                var collection = this;
                var dbName = collection.config.adapter.db_name;
                var table = collection.config.adapter.collection_name;
                var columns = collection.config.columns;
                db = Ti.Database.open(dbName);
                db.execute("BEGIN;");
                collection.each(function(model) {
                    if (!model.id) {
                        model.id = guid();
                        model.attributes[model.idAttribute] = model.id;
                    }
                    var names = [], values = [], q = [];
                    for (var k in columns) {
                        names.push(k);
                        values.push(model.get(k));
                        q.push("?");
                    }
                    var sqlInsert = "INSERT INTO " + table + " (" + names.join(",") + ") VALUES (" + q.join(",") + ");";
                    db.execute(sqlInsert, values);
                });
                db.execute("COMMIT;");
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("tollplaza", exports.definition, [ function(migration) {
    migration.name = "tollplaza";
    migration.id = "201406021736172";
    migration.up = function(db) {
        db.createTable({
            columns: {
                tollplaza: "TEXT",
                longitude: "real",
                latitude: "real",
                altitude: "real",
                heading: "real",
                speed: "real",
                hwy: "TEXT",
                accuracy: "real",
                timestamp: "real",
                altitudeAccuracy: "real",
                source: "TEXT",
                location: "TEXT",
                cost: "real",
                type: "text",
                hwy: "text",
                note: "TEXT"
            },
            adapter: {
                type: "sql",
                collection_name: "tollplaza"
            }
        });
    };
    migration.down = function() {};
} ]);

collection = Alloy.C("tollplaza", exports.definition, model);

exports.Model = model;

exports.Collection = collection;