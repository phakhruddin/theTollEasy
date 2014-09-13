function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TV1loadData";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("tollplaza");
    $.__views.loaddatawindow = Ti.UI.createWindow({
        backgroundColor: "black",
        barColor: "white",
        apiName: "Ti.UI.Window",
        id: "loaddatawindow",
        classes: [ "container" ],
        title: "TollEasy"
    });
    var __alloyId21 = [];
    $.__views.newberlin = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "newberlin",
        Title: "Illinois Tollway TollPlazas",
        classes: []
    });
    __alloyId21.push($.__views.newberlin);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Illinois Tollway TollPlazas",
        apiName: "Ti.UI.Label",
        id: "__alloyId22",
        classes: []
    });
    $.__views.newberlin.add($.__views.__alloyId22);
    $.__views.loaddatatable = Ti.UI.createTableView({
        backgroundColor: "black",
        data: __alloyId21,
        apiName: "Ti.UI.TableView",
        id: "loaddatatable",
        classes: []
    });
    $.__views.loaddatawindow.add($.__views.loaddatatable);
    $.__views.tab_loaddata = Ti.UI.createTab({
        window: $.__views.loaddatawindow,
        apiName: "Ti.UI.Tab",
        id: "tab_loaddata",
        title: "Load TollPlazas Loc",
        classes: []
    });
    $.__views.tab_loaddata && $.addTopLevelView($.__views.tab_loaddata);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function(_tab) {
        _tab.open($.loaddatawindow);
        console.debug("This is child widow tabViewOneChild.js" + _tab);
        $.loaddatatable.addEventListener("click", function(e) {
            e.row.id;
            console.log("JSON e : " + JSON.stringify(e));
            Alloy.Globals.updateTollPlaza("newberlin");
            var tabViewLoadDataOutputController = Alloy.createController("TV1loadDataOutput");
            tabViewLoadDataOutputController.openMainWindow($.tab_loaddata);
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;