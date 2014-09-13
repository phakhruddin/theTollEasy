function Controller() {
    function __alloyId37(e) {
        if (e && e.fromAdapter) return;
        __alloyId37.opts || {};
        var models = filterFunction(__alloyId36);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId33 = models[i];
            __alloyId33.__transform = transformFunction(__alloyId33);
            var __alloyId34 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId34);
            var __alloyId35 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                left: "110",
                font: {
                    fontSize: "10",
                    fontStyle: "normal"
                },
                color: "gray",
                text: "undefined" != typeof __alloyId33.__transform["custom"] ? __alloyId33.__transform["custom"] : __alloyId33.get("custom")
            });
            __alloyId34.add(__alloyId35);
        }
        $.__views.table_foundloctable.setData(rows);
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.timestamp = new Date(transform.timestamp);
        transform.tollplaza = transform.tollplaza;
        transform.custom = "Tollplaza : " + transform.tollplaza + " Latitude :" + transform.latitude + " Longitude: " + transform.longitude + " Speed: " + transform.speed + " Timestamp :" + transform.timestamp;
        return transform;
    }
    function filterFunction(collection) {
        return collection.where({
            type: "none"
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TV1tollPlazaTableView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("found");
    $.__views.win_foundloctable = Ti.UI.createWindow({
        id: "win_foundloctable"
    });
    $.__views.win_foundloctable && $.addTopLevelView($.__views.win_foundloctable);
    $.__views.table_foundloctable = Ti.UI.createTableView({
        id: "table_foundloctable",
        backgroundColor: "black"
    });
    $.__views.win_foundloctable.add($.__views.table_foundloctable);
    var __alloyId36 = Alloy.Collections["found"] || found;
    __alloyId36.on("fetch destroy change add remove reset", __alloyId37);
    exports.destroy = function() {
        __alloyId36.off("fetch destroy change add remove reset", __alloyId37);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function(_tab) {
        _tab.open($.win_foundloctable);
        console.log("fetching found plaza");
        Alloy.Collections.found.fetch();
        $.win_foundloctable.addEventListener("click", function(e) {
            console.log("JSON stringify e : " + JSON.stringify(e));
        });
    };
    console.log("Opening TV1tollPlazaTableView.js ");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;