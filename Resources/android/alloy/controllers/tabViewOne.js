function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabViewOne";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("found");
    Alloy.Models.instance("dummy");
    $.__views.__alloyId48 = Ti.UI.createWindow({
        backgroundColor: "black",
        title: "HOME",
        id: "__alloyId48"
    });
    var __alloyId49 = [];
    $.__views.__alloyId50 = Ti.UI.createTableViewSection({
        headerTitle: "Location capture switch",
        id: "__alloyId50"
    });
    __alloyId49.push($.__views.__alloyId50);
    $.__views.row_contupd = Ti.UI.createTableViewRow({
        id: "row_contupd",
        Title: "Continous Update"
    });
    $.__views.__alloyId50.add($.__views.row_contupd);
    $.__views.label_contupd = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Detect TollPlaza ON/OFF",
        id: "label_contupd",
        top: "5",
        left: "20"
    });
    $.__views.row_contupd.add($.__views.label_contupd);
    $.__views.label_contupd1 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        font: {
            fontFamily: "Helvetica",
            fontSize: "8dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        text: "Turn ON/OFF background continous capture",
        id: "label_contupd1",
        top: "30",
        left: "20"
    });
    $.__views.row_contupd.add($.__views.label_contupd1);
    $.__views.switch_contupd = Ti.UI.createSwitch({
        value: false,
        id: "switch_contupd",
        right: "20",
        titleOff: "OFF",
        titleOn: "ON"
    });
    $.__views.row_contupd.add($.__views.switch_contupd);
    $.__views.__alloyId51 = Ti.UI.createTableViewSection({
        headerTitle: "Time and GEO Coding Display",
        id: "__alloyId51"
    });
    __alloyId49.push($.__views.__alloyId51);
    $.__views.time = Ti.UI.createTableViewRow({
        id: "time",
        height: "188",
        Title: "time"
    });
    $.__views.__alloyId51.add($.__views.time);
    $.__views.label_localtime = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontSize: "60dp",
            fontStyle: "bold",
            fontWeight: "normal"
        },
        id: "label_localtime",
        top: "10"
    });
    $.__views.time.add($.__views.label_localtime);
    $.__views.label_localdate = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontSize: "20dp",
            fontStyle: "normal",
            fontWeight: "light"
        },
        id: "label_localdate",
        top: "80"
    });
    $.__views.time.add($.__views.label_localdate);
    $.__views.label_lastclosesttoll = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontSize: "12dp",
            fontStyle: "normal",
            fontWeight: "light"
        },
        id: "label_lastclosesttoll",
        top: "110"
    });
    $.__views.time.add($.__views.label_lastclosesttoll);
    $.__views.label_currentaddr = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontSize: "12dp",
            fontStyle: "normal",
            fontWeight: "light"
        },
        id: "label_currentaddr",
        top: "132"
    });
    $.__views.time.add($.__views.label_currentaddr);
    $.__views.label_currentHeading = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontSize: "12dp",
            fontStyle: "normal",
            fontWeight: "light"
        },
        id: "label_currentHeading",
        top: "166"
    });
    $.__views.time.add($.__views.label_currentHeading);
    $.__views.__alloyId52 = Ti.UI.createTableViewSection({
        headerTitle: "TollPlaza",
        id: "__alloyId52"
    });
    __alloyId49.push($.__views.__alloyId52);
    $.__views.location = Ti.UI.createTableViewRow({
        id: "location",
        Title: "location"
    });
    $.__views.__alloyId52.add($.__views.location);
    $.__views.currloc = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        id: "currloc",
        top: "5",
        left: "20",
        textid: "Current Location >",
        text: "Current Location >"
    });
    $.__views.location.add($.__views.currloc);
    $.__views.row_tpfound = Ti.UI.createTableViewRow({
        id: "row_tpfound",
        Title: "TP Found"
    });
    $.__views.__alloyId52.add($.__views.row_tpfound);
    $.__views.label_tpfound = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Toll Plaza Found >",
        id: "label_tpfound",
        top: "5",
        left: "20"
    });
    $.__views.row_tpfound.add($.__views.label_tpfound);
    $.__views.__alloyId53 = Ti.UI.createTableViewSection({
        headerTitle: "Utilities",
        id: "__alloyId53"
    });
    __alloyId49.push($.__views.__alloyId53);
    $.__views.row_payment = Ti.UI.createTableViewRow({
        id: "row_payment",
        Title: "location"
    });
    $.__views.__alloyId53.add($.__views.row_payment);
    $.__views.payment = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        text: "Payment Status >",
        id: "payment",
        top: "5",
        left: "20",
        textid: "Payment Status > "
    });
    $.__views.row_payment.add($.__views.payment);
    $.__views.row_loaddata = Ti.UI.createTableViewRow({
        id: "row_loaddata",
        Title: "Load Data"
    });
    $.__views.__alloyId53.add($.__views.row_loaddata);
    $.__views.label_loaddata = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        text: "Load Data >",
        id: "label_loaddata",
        top: "5",
        left: "20"
    });
    $.__views.row_loaddata.add($.__views.label_loaddata);
    $.__views.row_loaddataoutput = Ti.UI.createTableViewRow({
        id: "row_loaddataoutput",
        Title: "Load Data"
    });
    $.__views.__alloyId53.add($.__views.row_loaddataoutput);
    $.__views.label_loaddataoutput = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        text: "Load Data Output >",
        id: "label_loaddataoutput",
        top: "5",
        left: "20"
    });
    $.__views.row_loaddataoutput.add($.__views.label_loaddataoutput);
    $.__views.row_settings = Ti.UI.createTableViewRow({
        id: "row_settings",
        Title: "Settings"
    });
    $.__views.__alloyId53.add($.__views.row_settings);
    $.__views.label_settings = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        text: "Settings >",
        id: "label_settings",
        top: "5",
        left: "20"
    });
    $.__views.row_settings.add($.__views.label_settings);
    $.__views.__alloyId54 = Ti.UI.createTableViewSection({
        headerTitle: "TollEasy PRO",
        id: "__alloyId54"
    });
    __alloyId49.push($.__views.__alloyId54);
    $.__views.row_mypoi = Ti.UI.createTableViewRow({
        id: "row_mypoi",
        Title: "My POI"
    });
    $.__views.__alloyId54.add($.__views.row_mypoi);
    $.__views.mypoi = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "My Point of Interest >",
        id: "mypoi",
        top: "5",
        left: "20",
        textid: "My Point of Interest > "
    });
    $.__views.row_mypoi.add($.__views.mypoi);
    $.__views.__alloyId55 = Alloy.createController("myPOI", {
        id: "__alloyId55",
        __parentSymbol: $.__views.row_mypoi
    });
    $.__views.__alloyId55.setParent($.__views.row_mypoi);
    $.__views.row_poi = Ti.UI.createTableViewRow({
        id: "row_poi",
        Title: "location"
    });
    $.__views.__alloyId54.add($.__views.row_poi);
    $.__views.poi = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        text: "Point of Interest >",
        id: "poi",
        top: "5",
        left: "20",
        textid: "Point of Interest > "
    });
    $.__views.row_poi.add($.__views.poi);
    $.__views.row_rest = Ti.UI.createTableViewRow({
        id: "row_rest",
        Title: "location"
    });
    $.__views.__alloyId54.add($.__views.row_rest);
    $.__views.rest = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        text: "Rest Area >",
        id: "rest",
        top: "5",
        left: "20",
        textid: "Rest Area > "
    });
    $.__views.row_rest.add($.__views.rest);
    $.__views.row_gas = Ti.UI.createTableViewRow({
        id: "row_gas",
        Title: "location"
    });
    $.__views.__alloyId54.add($.__views.row_gas);
    $.__views.gas = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        text: "Gas Station >",
        id: "gas",
        top: "5",
        left: "20",
        textid: "Gas Station > "
    });
    $.__views.row_gas.add($.__views.gas);
    $.__views.row_emergency = Ti.UI.createTableViewRow({
        id: "row_emergency",
        Title: "location"
    });
    $.__views.__alloyId54.add($.__views.row_emergency);
    $.__views.emergency = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        text: "Emergency Numbers >",
        id: "emergency",
        top: "5",
        left: "20",
        textid: "Emergency Numbers > "
    });
    $.__views.row_emergency.add($.__views.emergency);
    $.__views.row_food = Ti.UI.createTableViewRow({
        id: "row_food",
        Title: "location"
    });
    $.__views.__alloyId54.add($.__views.row_food);
    $.__views.food = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        text: "Food & Drinks >",
        id: "food",
        top: "5",
        left: "20",
        textid: "Food & Drinks > "
    });
    $.__views.row_food.add($.__views.food);
    $.__views.row_plaza = Ti.UI.createTableViewRow({
        id: "row_plaza",
        Title: "location"
    });
    $.__views.__alloyId54.add($.__views.row_plaza);
    $.__views.plaza = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Toll Plaza View (Sample) >",
        id: "plaza",
        top: "5",
        left: "20"
    });
    $.__views.row_plaza.add($.__views.plaza);
    $.__views.row_empty = Ti.UI.createTableViewRow({
        id: "row_empty"
    });
    $.__views.__alloyId54.add($.__views.row_empty);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId49,
        id: "table",
        backgroundColor: "black"
    });
    $.__views.__alloyId48.add($.__views.table);
    $.__views.tab_one = Ti.UI.createTab({
        font: {
            fontSize: "50dp",
            fontWeight: "bold",
            textStyle: Ti.UI.TEXT_STYLE_HEADLINE
        },
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "red",
        window: $.__views.__alloyId48,
        id: "tab_one",
        title: "List View"
    });
    $.__views.tab_one && $.addTopLevelView($.__views.tab_one);
    var __alloyId56 = function() {
        $.label_localtime.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["localtime"] : Alloy.Models.dummy.get("localtime");
        $.label_localtime.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["localtime"] : Alloy.Models.dummy.get("localtime");
        $.label_localdate.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["localdate"] : Alloy.Models.dummy.get("localdate");
        $.label_localdate.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["localdate"] : Alloy.Models.dummy.get("localdate");
        $.label_lastclosesttoll.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lastclosesttoll"] : Alloy.Models.dummy.get("lastclosesttoll");
        $.label_lastclosesttoll.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lastclosesttoll"] : Alloy.Models.dummy.get("lastclosesttoll");
        $.label_currentaddr.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["currentaddr"] : Alloy.Models.dummy.get("currentaddr");
        $.label_currentaddr.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["currentaddr"] : Alloy.Models.dummy.get("currentaddr");
        $.label_currentHeading.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["currentHeading"] : Alloy.Models.dummy.get("currentHeading");
        $.label_currentHeading.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["currentHeading"] : Alloy.Models.dummy.get("currentHeading");
    };
    Alloy.Models.dummy.on("fetch change destroy", __alloyId56);
    exports.destroy = function() {
        Alloy.Models.dummy.off("fetch change destroy", __alloyId56);
    };
    _.extend($, $.__views);
    $.location.addEventListener("click", function(e) {
        console.debug("row index = " + JSON.stringify(e.index));
        Ti.API.info("row rowData = " + JSON.stringify(e.index));
        Ti.API.info("row rowData = " + JSON.stringify(e.rowData));
        console.debug("in open_button click event handler");
        var tabViewOneChildController = Alloy.createController("tabViewOneChild");
        tabViewOneChildController.openMainWindow($.tab_one);
    });
    $.row_loaddata.addEventListener("click", function() {
        var tabViewLoadDataController = Alloy.createController("TV1loadData");
        tabViewLoadDataController.openMainWindow($.tab_one);
    });
    $.row_loaddataoutput.addEventListener("click", function() {
        var tabViewLoadDataOutputController = Alloy.createController("TV1loadDataOutput");
        tabViewLoadDataOutputController.openMainWindow($.tab_one);
    });
    $.row_settings.addEventListener("click", function() {
        var tabViewSettingsController = Alloy.createController("settings");
        tabViewSettingsController.openMainWindow($.tab_one);
    });
    $.row_tpfound.addEventListener("click", function() {
        var tabViewTV1TPFoundController = Alloy.createController("TV1TPFoundTable");
        tabViewTV1TPFoundController.openMainWindow($.tab_one);
    });
    var someDummy = Alloy.Models.dummy;
    console.log("stringify dummy :" + JSON.stringify(someDummy));
    someDummy.set("id", "1234");
    someDummy.fetch();
    setInterval(function() {
        var date = new Date();
        currentaddr = Titanium.App.Properties.getString("currentaddr") ? Titanium.App.Properties.getString("currentaddr") : "no address detected";
        lastclosesttoll = Titanium.App.Properties.getString("outputclosesttollbydist0") ? Titanium.App.Properties.getString("outputclosesttollbydist0") : "no closest toll found";
        currentHeading = Titanium.App.Properties.getString("currentHeading") ? Titanium.App.Properties.getString("currentHeading") : "";
        someDummy.set("localtime", date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2));
        someDummy.set("localdate", date.toString().slice(0, 16));
        someDummy.set("currentaddr", currentaddr);
        someDummy.set("lastclosesttoll", lastclosesttoll);
        someDummy.set("currentHeading", currentHeading);
        someDummy.set("gmttime", new Date());
    }, 1e3);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;