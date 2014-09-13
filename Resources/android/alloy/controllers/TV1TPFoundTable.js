function Controller() {
    function __alloyId16(e) {
        if (e && e.fromAdapter) return;
        __alloyId16.opts || {};
        var models = __alloyId15.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId10 = models[i];
            __alloyId10.__transform = transformFunction(__alloyId10);
            var __alloyId11 = Ti.UI.createTableViewRow({
                title: "undefined" != typeof __alloyId10.__transform["title"] ? __alloyId10.__transform["title"] : __alloyId10.get("title")
            });
            rows.push(__alloyId11);
            var __alloyId12 = Ti.UI.createLabel({
                color: "white",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                backgroundColor: "transparent",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "18dp",
                    fontStyle: "bold",
                    fontWeight: "normal"
                },
                top: "0",
                text: "undefined" != typeof __alloyId10.__transform["tollplaza"] ? __alloyId10.__transform["tollplaza"] : __alloyId10.get("tollplaza")
            });
            __alloyId11.add(__alloyId12);
            var __alloyId13 = Ti.UI.createLabel({
                color: "blue",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                backgroundColor: "transparent",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "12dp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                top: "20",
                text: "undefined" != typeof __alloyId10.__transform["cost"] ? __alloyId10.__transform["cost"] : __alloyId10.get("cost")
            });
            __alloyId11.add(__alloyId13);
            var __alloyId14 = Ti.UI.createLabel({
                color: "gray",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                backgroundColor: "transparent",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "8dp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                top: "40",
                text: "undefined" != typeof __alloyId10.__transform["custom"] ? __alloyId10.__transform["custom"] : __alloyId10.get("custom")
            });
            __alloyId11.add(__alloyId14);
        }
        $.__views.table_tpfound.setData(rows);
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.title = transform.tollplaza + "," + transform.latitude + "," + transform.longitude + "," + transform.cost + "," + transform.hwy + "," + transform.note;
        transform.timestamp = new Date(transform.timestamp);
        transform.tollplaza = transform.tollplaza;
        transform.cost = " Cost : $" + transform.cost;
        transform.custom = " Latitude :" + transform.latitude + " Longitude: " + transform.longitude + " Timestamp :" + transform.timestamp;
        return transform;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TV1TPFoundTable";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("found");
    $.__views.win_tpfound = Ti.UI.createWindow({
        backgroundColor: "black",
        barColor: "#6d0a0c",
        id: "win_tpfound"
    });
    $.__views.table_tpfound = Ti.UI.createTableView({
        backgroundColor: "black",
        id: "table_tpfound"
    });
    $.__views.win_tpfound.add($.__views.table_tpfound);
    var __alloyId15 = Alloy.Collections["found"] || found;
    __alloyId15.on("fetch destroy change add remove reset", __alloyId16);
    $.__views.tab_tpfound = Ti.UI.createTab({
        window: $.__views.win_tpfound,
        id: "tab_tpfound"
    });
    $.__views.tab_tpfound && $.addTopLevelView($.__views.tab_tpfound);
    exports.destroy = function() {
        __alloyId15.off("fetch destroy change add remove reset", __alloyId16);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function(_tab) {
        _tab.open($.win_tpfound);
        console.log("fetching found");
        Alloy.Collections.found.fetch();
        $.win_tpfound.addEventListener("click", function(e) {
            console.log("JSON stringify e : " + JSON.stringify(e));
            var title = e.row.title;
            var tabViewTV1TPFTDetailController = Alloy.createController("TV1TPFTDetail", {
                title: title
            });
            tabViewTV1TPFTDetailController.openMainWindow($.tab_tpfound);
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;