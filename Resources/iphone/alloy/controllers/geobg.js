function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "geobg";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win_geobg = Ti.UI.createWindow({
        apiName: "Ti.UI.Window",
        id: "win_geobg",
        title: "TollEasy PRO",
        classes: [ "container" ]
    });
    var __alloyId40 = [];
    $.__views.__alloyId41 = Ti.UI.createTableViewSection({
        apiName: "Ti.UI.TableViewSection",
        headerTitle: "TollEasy PRO",
        id: "__alloyId41",
        classes: []
    });
    __alloyId40.push($.__views.__alloyId41);
    $.__views.row_mypoi = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_mypoi",
        Title: "My POI",
        classes: []
    });
    $.__views.__alloyId41.add($.__views.row_mypoi);
    $.__views.mypoi = Ti.UI.createLabel({
        text: "My Point of Interest >",
        apiName: "Ti.UI.Label",
        id: "mypoi",
        color: "gray",
        top: "5",
        left: "20",
        textid: "My Point of Interest > ",
        classes: []
    });
    $.__views.row_mypoi.add($.__views.mypoi);
    $.__views.__alloyId42 = Alloy.createController("myPOI", {
        apiName: "Alloy.Require",
        id: "__alloyId42",
        classes: [],
        __parentSymbol: $.__views.row_mypoi
    });
    $.__views.__alloyId42.setParent($.__views.row_mypoi);
    $.__views.row_poi = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_poi",
        Title: "location",
        leftimage: "dark_locate.png",
        classes: []
    });
    $.__views.__alloyId41.add($.__views.row_poi);
    $.__views.poi = Ti.UI.createLabel({
        text: "Point of Interest >",
        apiName: "Ti.UI.Label",
        id: "poi",
        color: "gray",
        top: "5",
        left: "50",
        leftimage: "dark_locate.png",
        textid: "Point of Interest > ",
        classes: []
    });
    $.__views.row_poi.add($.__views.poi);
    $.__views.row_rest = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_rest",
        Title: "location",
        classes: []
    });
    $.__views.__alloyId41.add($.__views.row_rest);
    $.__views.rest = Ti.UI.createLabel({
        text: "Rest Area >",
        apiName: "Ti.UI.Label",
        id: "rest",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Rest Area > ",
        classes: []
    });
    $.__views.row_rest.add($.__views.rest);
    $.__views.row_gas = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_gas",
        Title: "location",
        classes: []
    });
    $.__views.__alloyId41.add($.__views.row_gas);
    $.__views.gas = Ti.UI.createLabel({
        text: "Gas Station >",
        apiName: "Ti.UI.Label",
        id: "gas",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Gas Station > ",
        classes: []
    });
    $.__views.row_gas.add($.__views.gas);
    $.__views.row_emergency = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_emergency",
        Title: "location",
        classes: []
    });
    $.__views.__alloyId41.add($.__views.row_emergency);
    $.__views.emergency = Ti.UI.createLabel({
        text: "Emergency Numbers >",
        apiName: "Ti.UI.Label",
        id: "emergency",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Emergency Numbers > ",
        classes: []
    });
    $.__views.row_emergency.add($.__views.emergency);
    $.__views.row_food = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_food",
        Title: "location",
        classes: []
    });
    $.__views.__alloyId41.add($.__views.row_food);
    $.__views.food = Ti.UI.createLabel({
        text: "Food & Drinks >",
        apiName: "Ti.UI.Label",
        id: "food",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Food & Drinks > ",
        classes: []
    });
    $.__views.row_food.add($.__views.food);
    $.__views.row_plaza = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_plaza",
        Title: "location",
        classes: []
    });
    $.__views.__alloyId41.add($.__views.row_plaza);
    $.__views.plaza = Ti.UI.createLabel({
        text: "Toll Plaza View (Sample) >",
        apiName: "Ti.UI.Label",
        id: "plaza",
        color: "white",
        top: "5",
        left: "20",
        classes: []
    });
    $.__views.row_plaza.add($.__views.plaza);
    $.__views.row_empty = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_empty",
        classes: []
    });
    $.__views.__alloyId41.add($.__views.row_empty);
    $.__views.__alloyId39 = Ti.UI.createTableView({
        data: __alloyId40,
        apiName: "Ti.UI.TableView",
        id: "__alloyId39",
        classes: []
    });
    $.__views.win_geobg.add($.__views.__alloyId39);
    $.__views.tab_geobg = Ti.UI.createTab({
        window: $.__views.win_geobg,
        apiName: "Ti.UI.Tab",
        id: "tab_geobg",
        classes: []
    });
    $.__views.tab_geobg && $.addTopLevelView($.__views.tab_geobg);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function(_tab) {
        _tab.open($.win_geobg);
        console.log("geobg open");
        Ti.Media.vibrate([ 0, 2e3 ]);
    };
    $.row_plaza.addEventListener("click", function(e) {
        console.debug("row index = " + JSON.stringify(e.index));
        Ti.API.info("row rowData = " + JSON.stringify(e.index));
        Ti.API.info("row rowData = " + JSON.stringify(e.rowData));
        console.debug("in open_button click event handler");
        var tabViewOneChildController = Alloy.createController("tollPlazaView");
        tabViewOneChildController.openMainWindow($.tab_geobg);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;