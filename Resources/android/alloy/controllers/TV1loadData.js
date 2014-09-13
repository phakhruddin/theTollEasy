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
        barColor: "#6d0a0c",
        id: "loaddatawindow"
    });
    var __alloyId19 = [];
    $.__views.sandiego = Ti.UI.createTableViewRow({
        id: "sandiego",
        Title: "San Diego Test Data"
    });
    __alloyId19.push($.__views.sandiego);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Load San Diego Test Data",
        id: "__alloyId20"
    });
    $.__views.sandiego.add($.__views.__alloyId20);
    $.__views.newberlin = Ti.UI.createTableViewRow({
        id: "newberlin",
        Title: "New Berlin Test Data"
    });
    __alloyId19.push($.__views.newberlin);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "New Berlin Test Data",
        id: "__alloyId21"
    });
    $.__views.newberlin.add($.__views.__alloyId21);
    $.__views.chicago = Ti.UI.createTableViewRow({
        id: "chicago",
        Title: "Chicago Test Data"
    });
    __alloyId19.push($.__views.chicago);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Chicago Test Data",
        id: "__alloyId22"
    });
    $.__views.chicago.add($.__views.__alloyId22);
    $.__views.milwaukee = Ti.UI.createTableViewRow({
        id: "milwaukee",
        Title: "Milwaukee Test Data"
    });
    __alloyId19.push($.__views.milwaukee);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Milwaukee Test Data",
        id: "__alloyId23"
    });
    $.__views.milwaukee.add($.__views.__alloyId23);
    $.__views.loaddatatable = Ti.UI.createTableView({
        backgroundColor: "black",
        data: __alloyId19,
        id: "loaddatatable"
    });
    $.__views.loaddatawindow.add($.__views.loaddatatable);
    $.__views.tab_loaddata = Ti.UI.createTab({
        window: $.__views.loaddatawindow,
        id: "tab_loaddata",
        title: "List View"
    });
    $.__views.tab_loaddata && $.addTopLevelView($.__views.tab_loaddata);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function(_tab) {
        _tab.open($.loaddatawindow);
        console.debug("This is child widow tabViewOneChild.js" + _tab);
        $.loaddatatable.addEventListener("click", function(e) {
            var loc = e.row.id;
            console.log("JSON e : " + JSON.stringify(e));
            Alloy.Globals.getGeneralLocation(loc);
            Alloy.Globals.updateTollPlaza(loc);
            var tabViewLoadDataOutputController = Alloy.createController("TV1loadDataOutput");
            tabViewLoadDataOutputController.openMainWindow($.tab_loaddata);
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;