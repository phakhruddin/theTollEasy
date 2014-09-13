function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myPOI";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.mypoi_win = Ti.UI.createWindow({
        backgroundColor: "black",
        apiName: "Ti.UI.Window",
        id: "mypoi_win",
        title: "My POIs",
        classes: [ "container" ]
    });
    $.__views.mypoi_win && $.addTopLevelView($.__views.mypoi_win);
    var __alloyId51 = [];
    $.__views.mypoi_row = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "mypoi_row",
        Title: "Title Toll Plaza",
        classes: []
    });
    __alloyId51.push($.__views.mypoi_row);
    $.__views.mypoi_label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "My Point of Interest >",
        apiName: "Ti.UI.Label",
        id: "mypoi_label",
        top: "5",
        left: "20",
        classes: []
    });
    $.__views.mypoi_row.add($.__views.mypoi_label);
    $.__views.mypoi_view = Ti.UI.createTableView({
        data: __alloyId51,
        apiName: "Ti.UI.TableView",
        id: "mypoi_view",
        backgroundColor: "black",
        classes: []
    });
    $.__views.mypoi_win.add($.__views.mypoi_view);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;