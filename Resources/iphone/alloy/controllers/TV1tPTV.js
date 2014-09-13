function Controller() {
    function __alloyId30(e) {
        if (e && e.fromAdapter) return;
        __alloyId30.opts || {};
        var models = filterFunction(__alloyId29);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId26 = models[i];
            __alloyId26.__transform = transformFunction(__alloyId26);
            var __alloyId27 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId27);
            var __alloyId28 = Ti.UI.createLabel({
                color: "gray",
                text: "undefined" != typeof __alloyId26.__transform["custom"] ? __alloyId26.__transform["custom"] : __alloyId26.get("custom")
            });
            __alloyId27.add(__alloyId28);
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
    this.__controllerPath = "TV1tPTV";
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
    var __alloyId29 = Alloy.Collections["found"] || found;
    __alloyId29.on("fetch destroy change add remove reset", __alloyId30);
    exports.destroy = function() {
        __alloyId29.off("fetch destroy change add remove reset", __alloyId30);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function(_tab) {
        _tab.open($.win_foundloctable);
        console.debug("This is child widow TV1tollPlazaTableView.js" + _tab);
        Alloy.Collections.found.fetch();
        $.win_foundloctable.addEventListener("click", function(e) {
            console.log("JSON stringify e : " + JSON.stringify(e));
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;