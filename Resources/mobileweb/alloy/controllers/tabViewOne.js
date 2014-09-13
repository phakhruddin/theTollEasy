function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabViewOne";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId3 = Ti.UI.createWindow({
        title: "HOME",
        id: "__alloyId3"
    });
    var __alloyId4 = [];
    $.__views.location = Ti.UI.createTableViewRow({
        id: "location",
        Title: "location"
    });
    __alloyId4.push($.__views.location);
    $.__views.currloc = Ti.UI.createLabel({
        id: "currloc",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Current Location >"
    });
    $.__views.location.add($.__views.currloc);
    $.__views.row_plaza = Ti.UI.createTableViewRow({
        id: "row_plaza",
        Title: "location"
    });
    __alloyId4.push($.__views.row_plaza);
    $.__views.plaza = Ti.UI.createLabel({
        id: "plaza",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Toll Plaza View > "
    });
    $.__views.row_plaza.add($.__views.plaza);
    $.__views.row_mypoi = Ti.UI.createTableViewRow({
        id: "row_mypoi",
        Title: "location"
    });
    __alloyId4.push($.__views.row_mypoi);
    $.__views.mypoi = Ti.UI.createLabel({
        id: "mypoi",
        color: "orange",
        top: "5",
        left: "20",
        textid: "My Point of Interest > "
    });
    $.__views.row_mypoi.add($.__views.mypoi);
    $.__views.row_poi = Ti.UI.createTableViewRow({
        id: "row_poi",
        Title: "location"
    });
    __alloyId4.push($.__views.row_poi);
    $.__views.poi = Ti.UI.createLabel({
        id: "poi",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Point of Interest > "
    });
    $.__views.row_poi.add($.__views.poi);
    $.__views.row_payment = Ti.UI.createTableViewRow({
        id: "row_payment",
        Title: "location"
    });
    __alloyId4.push($.__views.row_payment);
    $.__views.payment = Ti.UI.createLabel({
        id: "payment",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Payment Status > "
    });
    $.__views.row_payment.add($.__views.payment);
    $.__views.row_rest = Ti.UI.createTableViewRow({
        id: "row_rest",
        Title: "location"
    });
    __alloyId4.push($.__views.row_rest);
    $.__views.rest = Ti.UI.createLabel({
        id: "rest",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Rest Area > "
    });
    $.__views.row_rest.add($.__views.rest);
    $.__views.row_gas = Ti.UI.createTableViewRow({
        id: "row_gas",
        Title: "location"
    });
    __alloyId4.push($.__views.row_gas);
    $.__views.gas = Ti.UI.createLabel({
        id: "gas",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Gas Station > "
    });
    $.__views.row_gas.add($.__views.gas);
    $.__views.row_emergency = Ti.UI.createTableViewRow({
        id: "row_emergency",
        Title: "location"
    });
    __alloyId4.push($.__views.row_emergency);
    $.__views.emergency = Ti.UI.createLabel({
        id: "emergency",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Emergency Numbers > "
    });
    $.__views.row_emergency.add($.__views.emergency);
    $.__views.row_food = Ti.UI.createTableViewRow({
        id: "row_food",
        Title: "location"
    });
    __alloyId4.push($.__views.row_food);
    $.__views.food = Ti.UI.createLabel({
        id: "food",
        color: "gray",
        top: "5",
        left: "20",
        textid: "Food & Drinks > "
    });
    $.__views.row_food.add($.__views.food);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId4,
        backgroundColor: "black",
        id: "table"
    });
    $.__views.__alloyId3.add($.__views.table);
    $.__views.tab_one = Ti.UI.createTab({
        window: $.__views.__alloyId3,
        id: "tab_one",
        title: "List View"
    });
    $.__views.tab_one && $.addTopLevelView($.__views.tab_one);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.row_plaza.addEventListener("click", function(e) {
        console.debug("Row1" + e);
        console.debug("row index = " + JSON.stringify(e.index));
        Ti.API.info("row rowData = " + JSON.stringify(e.index));
        Ti.API.info("row rowData = " + JSON.stringify(e.rowData));
    });
    $.location.addEventListener("click", function(e) {
        console.debug("row index = " + JSON.stringify(e.index));
        Ti.API.info("row rowData = " + JSON.stringify(e.index));
        Ti.API.info("row rowData = " + JSON.stringify(e.rowData));
        console.debug("in open_button click event handler");
        var tabViewOneChildController = Alloy.createController("tabViewOneChild");
        tabViewOneChildController.openMainWindow($.tab_one);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;