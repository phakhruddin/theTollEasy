function Controller() {
    function __alloyId33(e) {
        if (e && e.fromAdapter) return;
        __alloyId33.opts || {};
        var models = filterFunction(__alloyId32);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId26 = models[i];
            __alloyId26.__transform = transformFunction(__alloyId26);
            var __alloyId27 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId27);
            var __alloyId28 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                left: "20",
                font: {
                    fontSize: "14",
                    fontStyle: "bold"
                },
                color: "orange",
                text: "undefined" != typeof __alloyId26.__transform["tollplaza"] ? __alloyId26.__transform["tollplaza"] : __alloyId26.get("tollplaza")
            });
            __alloyId27.add(__alloyId28);
            var __alloyId29 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                left: "110",
                font: {
                    fontSize: "10",
                    fontStyle: "normal"
                },
                color: "gray",
                text: "undefined" != typeof __alloyId26.__transform["latitude"] ? __alloyId26.__transform["latitude"] : __alloyId26.get("latitude")
            });
            __alloyId27.add(__alloyId29);
            var __alloyId30 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                left: "200",
                font: {
                    fontSize: "10",
                    fontStyle: "normal"
                },
                color: "gray",
                text: "undefined" != typeof __alloyId26.__transform["longitude"] ? __alloyId26.__transform["longitude"] : __alloyId26.get("longitude")
            });
            __alloyId27.add(__alloyId30);
            var __alloyId31 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                left: "300",
                font: {
                    fontSize: "10",
                    fontStyle: "normal"
                },
                color: "gray",
                text: ">"
            });
            __alloyId27.add(__alloyId31);
        }
        $.__views.table_loaddataoutput.setData(rows);
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        console.log("transform data : " + JSON.stringify(transform));
        transform.timestamp = new Date(transform.timestamp);
        transform.latitude = "LAT : " + transform.latitude;
        transform.longitude = "LON: " + transform.longitude;
        return transform;
    }
    function filterFunction(collection) {
        var loc = "newberlin";
        return collection.where({
            location: loc
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TV1loadDataOutput";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("tollplaza");
    $.__views.win_loaddataoutput = Ti.UI.createWindow({
        backgroundColor: "white",
        barColor: "#6d0a0c",
        id: "win_loaddataoutput"
    });
    $.__views.win_loaddataoutput && $.addTopLevelView($.__views.win_loaddataoutput);
    $.__views.table_loaddataoutput = Ti.UI.createTableView({
        backgroundColor: "black",
        id: "table_loaddataoutput"
    });
    $.__views.win_loaddataoutput.add($.__views.table_loaddataoutput);
    var __alloyId32 = Alloy.Collections["tollplaza"] || tollplaza;
    __alloyId32.on("fetch destroy change add remove reset", __alloyId33);
    exports.destroy = function() {
        __alloyId32.off("fetch destroy change add remove reset", __alloyId33);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function(_tab) {
        _tab.open($.win_loaddataoutput);
        console.log("fetching tollplaza");
        Alloy.Collections.tollplaza.fetch();
        $.win_loaddataoutput.addEventListener("click", function(e) {
            console.log("JSON stringify e : " + JSON.stringify(e));
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;