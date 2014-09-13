function Controller() {
    function __alloyId38(e) {
        if (e && e.fromAdapter) return;
        __alloyId38.opts || {};
        var models = __alloyId37.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId33 = models[i];
            __alloyId33.__transform = transformFunction(__alloyId33);
            var __alloyId34 = Ti.UI.createTableViewRow({
                apiName: "Ti.UI.TableViewRow",
                height: Ti.UI.SIZE,
                title: "undefined" != typeof __alloyId33.__transform["title"] ? __alloyId33.__transform["title"] : __alloyId33.get("title"),
                classes: []
            });
            rows.push(__alloyId34);
            var __alloyId35 = Ti.UI.createLabel({
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                backgroundColor: "transparent",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "20dp",
                    fontStyle: "bold",
                    fontWeight: "normal"
                },
                apiName: "Ti.UI.Label",
                top: "5",
                color: "#D8D8BF",
                width: "300",
                height: Ti.UI.SIZE,
                text: "undefined" != typeof __alloyId33.__transform["tollplaza"] ? __alloyId33.__transform["tollplaza"] : __alloyId33.get("tollplaza"),
                classes: []
            });
            __alloyId34.add(__alloyId35);
            var __alloyId36 = Ti.UI.createLabel({
                color: "gray",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                backgroundColor: "transparent",
                font: {
                    fontFamily: "Helvetica",
                    fontSize: "10dp",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                apiName: "Ti.UI.Label",
                top: "47",
                text: "undefined" != typeof __alloyId33.__transform["custom"] ? __alloyId33.__transform["custom"] : __alloyId33.get("custom"),
                classes: []
            });
            __alloyId34.add(__alloyId36);
        }
        $.__views.table_caplocdata.setData(rows);
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.title = transform.tollplaza + "," + transform.latitude + "," + transform.longitude + "," + transform.timestamp;
        transform.timestamp = new Date(transform.timestamp);
        transform.tollplaza = transform.tollplaza;
        transform.custom = " Detected on " + transform.timestamp;
        return transform;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "caplocdata";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("plazano");
    $.__views.win_caplocdata = Ti.UI.createWindow({
        backgroundColor: "black",
        barColor: "white",
        apiName: "Ti.UI.Window",
        id: "win_caplocdata",
        title: "TollPlaza Detected",
        classes: [ "container" ]
    });
    $.__views.table_caplocdata = Ti.UI.createTableView({
        backgroundColor: "black",
        apiName: "Ti.UI.TableView",
        id: "table_caplocdata",
        editable: "true",
        moveable: "true",
        classes: []
    });
    $.__views.win_caplocdata.add($.__views.table_caplocdata);
    var __alloyId37 = Alloy.Collections["plazano"] || plazano;
    __alloyId37.on("fetch destroy change add remove reset", __alloyId38);
    $.__views.tab_caplocdata = Ti.UI.createTab({
        window: $.__views.win_caplocdata,
        apiName: "Ti.UI.Tab",
        id: "tab_caplocdata",
        classes: []
    });
    $.__views.tab_caplocdata && $.addTopLevelView($.__views.tab_caplocdata);
    exports.destroy = function() {
        __alloyId37.off("fetch destroy change add remove reset", __alloyId38);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function(_tab) {
        _tab.open($.win_caplocdata);
        console.log("fetching plazano");
        Alloy.Collections.plazano.fetch();
        $.win_caplocdata.addEventListener("click", function(e) {
            console.log("JSON stringify e : " + JSON.stringify(e));
            e.row.title;
            console.log("title:lat:lon " + e.row.title.split(",")[0] + ":" + e.row.title.split(",")[1] + ":" + e.row.title.split(",")[2]);
            var tabViewTwoChildController = Alloy.createController("tabViewTwoChild", {
                title: e.row.title.split(",")[0],
                latitude: e.row.title.split(",")[1],
                longitude: e.row.title.split(",")[2],
                timestamp: e.row.title.split(",")[3],
                hwy: "none"
            });
            tabViewTwoChildController.openMainTwoWindow($.tab_caplocdata);
        });
    };
    $.table_caplocdata.addEventListener("delete", function(e) {
        console.log("JSON stringify e from table_caplocdata : " + JSON.stringify(e));
        var title = e.row.title;
        var titlesplit = title.split(",");
        var timestampdelete = titlesplit[6];
        console.log("timestamp to be deleted is : " + timestampdelete);
        Alloy.Collections.plazano.deleteTimestamp(timestampdelete);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;