function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabViewOne";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("found");
    Alloy.Collections.instance("tollplaza");
    Alloy.Models.instance("dummy");
    $.__views.__alloyId74 = Ti.UI.createWindow({
        backgroundColor: "black",
        apiName: "Ti.UI.Window",
        title: "TollEasy",
        classes: [ "container" ],
        id: "__alloyId74"
    });
    var __alloyId75 = [];
    $.__views.__alloyId76 = Ti.UI.createTableViewSection({
        apiName: "Ti.UI.TableViewSection",
        headerTitle: "Location capture switch",
        id: "__alloyId76",
        classes: []
    });
    __alloyId75.push($.__views.__alloyId76);
    $.__views.row_contupd = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "40",
        apiName: "Ti.UI.TableViewRow",
        id: "row_contupd",
        Title: "Continous Update",
        classes: []
    });
    $.__views.__alloyId76.add($.__views.row_contupd);
    $.__views.label_contupd = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Detect TollPlaza ON/OFF",
        apiName: "Ti.UI.Label",
        id: "label_contupd",
        top: "5",
        left: "20",
        classes: []
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
        text: "Turn ON/OFF BACKGROUND continous capture",
        apiName: "Ti.UI.Label",
        id: "label_contupd1",
        top: "30",
        left: "20",
        classes: []
    });
    $.__views.row_contupd.add($.__views.label_contupd1);
    $.__views.switch_contupd = Ti.UI.createSwitch({
        value: true,
        apiName: "Ti.UI.Switch",
        id: "switch_contupd",
        right: "20",
        titleOff: "OFF",
        titleOn: "ON",
        classes: []
    });
    $.__views.row_contupd.add($.__views.switch_contupd);
    $.__views.__alloyId77 = Ti.UI.createTableViewSection({
        apiName: "Ti.UI.TableViewSection",
        headerTitle: "Time and GEO Coding Display",
        id: "__alloyId77",
        classes: []
    });
    __alloyId75.push($.__views.__alloyId77);
    $.__views.time = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "218",
        apiName: "Ti.UI.TableViewRow",
        id: "time",
        Title: "time",
        classes: []
    });
    $.__views.__alloyId77.add($.__views.time);
    $.__views.label_localtime = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontFamily: "Helvetica",
            fontSize: "70dp",
            fontStyle: "bold",
            fontWeight: "normal"
        },
        apiName: "Ti.UI.Label",
        id: "label_localtime",
        top: "10",
        classes: []
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
        apiName: "Ti.UI.Label",
        id: "label_localdate",
        top: "90",
        classes: []
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
        apiName: "Ti.UI.Label",
        id: "label_lastclosesttoll",
        top: "120",
        classes: []
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
        apiName: "Ti.UI.Label",
        id: "label_currentaddr",
        top: "142",
        classes: []
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
        apiName: "Ti.UI.Label",
        id: "label_currentHeading",
        top: "196",
        classes: []
    });
    $.__views.time.add($.__views.label_currentHeading);
    $.__views.__alloyId78 = Ti.UI.createTableViewSection({
        apiName: "Ti.UI.TableViewSection",
        headerTitle: "TollPlaza",
        id: "__alloyId78",
        classes: []
    });
    __alloyId75.push($.__views.__alloyId78);
    $.__views.location = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        apiName: "Ti.UI.TableViewRow",
        id: "location",
        Title: "location",
        classes: []
    });
    $.__views.__alloyId78.add($.__views.location);
    $.__views.__alloyId79 = Ti.UI.createImageView({
        apiName: "Ti.UI.ImageView",
        image: "dark_locate.png",
        left: "10",
        id: "__alloyId79",
        classes: []
    });
    $.__views.location.add($.__views.__alloyId79);
    $.__views.currloc = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        apiName: "Ti.UI.Label",
        id: "currloc",
        top: "5",
        left: "50",
        textid: "Current Location >",
        text: "Current Location >",
        classes: []
    });
    $.__views.location.add($.__views.currloc);
    $.__views.row_tpfound = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        apiName: "Ti.UI.TableViewRow",
        id: "row_tpfound",
        Title: "TP Found",
        classes: []
    });
    $.__views.__alloyId78.add($.__views.row_tpfound);
    $.__views.__alloyId80 = Ti.UI.createImageView({
        apiName: "Ti.UI.ImageView",
        image: "dark_target.png",
        left: "10",
        id: "__alloyId80",
        classes: []
    });
    $.__views.row_tpfound.add($.__views.__alloyId80);
    $.__views.label_tpfound = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Toll Plaza Found >",
        apiName: "Ti.UI.Label",
        id: "label_tpfound",
        top: "5",
        left: "50",
        classes: []
    });
    $.__views.row_tpfound.add($.__views.label_tpfound);
    $.__views.__alloyId81 = Ti.UI.createTableViewSection({
        apiName: "Ti.UI.TableViewSection",
        headerTitle: "Utilities",
        id: "__alloyId81",
        classes: []
    });
    __alloyId75.push($.__views.__alloyId81);
    $.__views.row_settings = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        apiName: "Ti.UI.TableViewRow",
        id: "row_settings",
        Title: "Settings",
        classes: []
    });
    $.__views.__alloyId81.add($.__views.row_settings);
    $.__views.__alloyId82 = Ti.UI.createImageView({
        apiName: "Ti.UI.ImageView",
        image: "dark_gears.png",
        left: "10",
        id: "__alloyId82",
        classes: []
    });
    $.__views.row_settings.add($.__views.__alloyId82);
    $.__views.label_settings = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        text: "Settings >",
        apiName: "Ti.UI.Label",
        id: "label_settings",
        top: "5",
        left: "50",
        classes: []
    });
    $.__views.row_settings.add($.__views.label_settings);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId75,
        apiName: "Ti.UI.TableView",
        id: "table",
        backgroundColor: "black",
        classes: []
    });
    $.__views.__alloyId74.add($.__views.table);
    $.__views.tab_one = Ti.UI.createTab({
        font: {
            fontSize: "50dp",
            fontWeight: "bold",
            textStyle: Ti.UI.TEXT_STYLE_HEADLINE
        },
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        window: $.__views.__alloyId74,
        apiName: "Ti.UI.Tab",
        id: "tab_one",
        title: "Main",
        icon: "light_home.png",
        classes: []
    });
    $.__views.tab_one && $.addTopLevelView($.__views.tab_one);
    var __alloyId83 = function() {
        $.label_localtime.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["localtime"] : _.template("<%=dummy.localtime%>", {
            dummy: Alloy.Models.dummy.toJSON()
        });
        $.label_localdate.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["localdate"] : _.template("<%=dummy.localdate%>", {
            dummy: Alloy.Models.dummy.toJSON()
        });
        $.label_lastclosesttoll.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["lastclosesttoll"] : _.template("<%=dummy.lastclosesttoll%>", {
            dummy: Alloy.Models.dummy.toJSON()
        });
        $.label_currentaddr.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["currentaddr"] : _.template("<%=dummy.currentaddr%>", {
            dummy: Alloy.Models.dummy.toJSON()
        });
        $.label_currentHeading.text = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["currentHeading"] : _.template("<%=dummy.currentHeading%>", {
            dummy: Alloy.Models.dummy.toJSON()
        });
    };
    Alloy.Models.dummy.on("fetch change destroy", __alloyId83);
    exports.destroy = function() {
        Alloy.Models.dummy.off("fetch change destroy", __alloyId83);
    };
    _.extend($, $.__views);
    Titanium.App.Properties.getInt("trigger1", 0);
    Titanium.App.Properties.getInt("trigger2", 0);
    Titanium.App.Properties.getInt("trigger3", 0);
    Titanium.App.Properties.getInt("distanceFilter", 0);
    $.location.addEventListener("click", function(e) {
        console.debug("row index = " + JSON.stringify(e.index));
        Ti.API.info("row rowData = " + JSON.stringify(e.index));
        Ti.API.info("row rowData = " + JSON.stringify(e.rowData));
        console.debug("in open_button click event handler");
        var tabViewOneChildController = Alloy.createController("tabViewOneChild");
        tabViewOneChildController.openMainWindow($.tab_one);
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
    var adhocContDateUpd = setInterval(function() {
        var date = new Date();
        currentaddr = Titanium.App.Properties.getString("currentaddr") ? Titanium.App.Properties.getString("currentaddr") : "no address detected";
        lastclosesttoll = Titanium.App.Properties.getString("outputclosesttollbydist0") ? Titanium.App.Properties.getString("outputclosesttollbydist0") : "no closest toll found";
        if (Titanium.App.Properties.getString("currentHeading")) {
            var currentHeading = Titanium.App.Properties.getString("currentHeading");
            var currentHeading = parseFloat(currentHeading).toFixed(2);
            var currentHeading = "Current heading is " + currentHeading + " degrees from North";
        } else var currentHeading = "";
        someDummy.set("localtime", date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2));
        someDummy.set("localdate", date.toString().slice(0, 16));
        someDummy.set("currentaddr", currentaddr);
        someDummy.set("lastclosesttoll", "TollPlaza " + lastclosesttoll.replace("distance : ", "is ") + " ft away");
        someDummy.set("currentHeading", currentHeading);
        someDummy.set("gmttime", new Date());
    }, 1e3);
    adhocContDateUpd = 1;
    $.switch_contupd.addEventListener("change", function() {
        var switchValue = $.switch_contupd.value;
        Ti.API.info("switch value :" + switchValue);
        if (true == switchValue) {
            Ti.API.info("Registering background services");
            if (0 == Titanium.App.Properties.getInt("distanceFilter")) var service = Ti.App.iOS.registerBackgroundService({
                url: "bg-service1-2.js"
            }); else var service = Ti.App.iOS.registerBackgroundService({
                url: "bg-service1-3.js"
            });
            console.log("service after start is: " + JSON.stringify(service));
            Ti.API.info("*** Press home button to pause application ***");
        } else {
            var service = Ti.App.iOS.registerBackgroundService({
                url: "bg-service1-2.js"
            });
            service.stop();
            service.unregister();
            console.log("stopping service :" + JSON.stringify(service));
            var service = Ti.App.iOS.registerBackgroundService({
                url: "bg-service1-3.js"
            });
            service.stop();
            service.unregister();
            console.log("stopping service :" + JSON.stringify(service));
            alert("Detect TollPlaza is OFF");
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;