var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            state: "string",
            country: "string",
            city: "string",
            tollprovider: "string",
            data1: "string",
            data2: "string",
            data3: "string",
            data4: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "tollsource"
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
            deleteCountry: function(country) {
                var collection = this;
                var sql = "DELETE FROM " + collection.config.adapter.collection_name + ' WHERE country="' + country + '"';
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
                collection.trigger("sync");
            }
        });
        return Collection;
    }
};

model = Alloy.M("tollsource", exports.definition, []);

collection = Alloy.C("tollsource", exports.definition, model);

exports.Model = model;

exports.Collection = collection;