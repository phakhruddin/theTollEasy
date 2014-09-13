exports.definition = {
    config: {
        columns: {
            tollplaza: "text",
            longitude: "real",
            latitude: "real",
            altitude: "real",
            heading: "real",
            accuracy: "real",
            speed: "real",
            timestamp: "real",
            altitudeAccuracy: "real",
            cost: "real",
            type: "text",
            hwy: "text",
            data1: "text",
            data2: "text"
        },
        defaults: {
            tollplaza: "0",
            longitude: "0",
            latitude: "0",
            altitude: "0",
            heading: "0",
            accuracy: "0",
            speed: "0",
            timestamp: "0",
            altitudeAccuracy: "0",
            cost: "0",
            type: "none",
            hwy: "none",
            data1: "none",
            data2: "none"
        },
        adapter: {
            type: "sql",
            collection_name: "found"
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
            deleteTYPE: function(type) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + ' WHERE type="' + type + '"';
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            },
            deleteTimestamp: function(timestamp) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + ' WHERE timestamp="' + timestamp + '"';
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

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("found", exports.definition, []);

collection = Alloy.C("found", exports.definition, model);

exports.Model = model;

exports.Collection = collection;