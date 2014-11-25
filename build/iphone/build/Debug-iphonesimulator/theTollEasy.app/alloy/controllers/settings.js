function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function display() {
        someDummy.set("distanceFilter", "Distance Filter : " + Titanium.App.Properties.getInt("distanceFilter", 0));
        someDummy.set("detectionRange", "Detection Range : " + Titanium.App.Properties.getInt("detectionRange", 0));
    }
    function sendEmail(loc) {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "TheTollEasy debug data";
        emailDialog.toRecipients = [ "phakhruddin@gmail.com" ];
        emailDialog.messageBody = "Debug data on " + new Date();
        var ftxt1 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, "maildebug.txt");
        var ftxt2 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, loc + ".txt");
        var ftxt3 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, loc + "1.txt");
        var location = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, "location.txt");
        emailDialog.addAttachment(ftxt1);
        emailDialog.addAttachment(ftxt2);
        emailDialog.addAttachment(ftxt3);
        emailDialog.addAttachment(location);
        emailDialog.open();
    }
    function csvJSON(csv) {
        var lines = csv.split("\n");
        var result = [];
        var headers = lines[0].split(",");
        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) obj[headers[j]] = currentline[j];
            result.push(obj);
        }
        return JSON.stringify(result);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
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
    Alloy.Collections.instance("plazano");
    Alloy.Models.instance("dummy");
    $.__views.win_settings = Ti.UI.createWindow({
        backgroundColor: "black",
        barColor: "white",
        apiName: "Ti.UI.Window",
        id: "win_settings",
        title: "Settings",
        classes: [ "container" ]
    });
    var __alloyId61 = [];
    $.__views.__alloyId62 = Ti.UI.createTableViewSection({
        apiName: "Ti.UI.TableViewSection",
        headerTitle: "Loc Capture Options",
        id: "__alloyId62",
        classes: []
    });
    __alloyId61.push($.__views.__alloyId62);
    $.__views.row_contupdfg = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_contupdfg",
        Title: "Continous FG Update",
        classes: []
    });
    $.__views.__alloyId62.add($.__views.row_contupdfg);
    $.__views.label_contupdfg = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Detect TollPlaza ON/OFF",
        apiName: "Ti.UI.Label",
        id: "label_contupdfg",
        top: "5",
        left: "20",
        classes: []
    });
    $.__views.row_contupdfg.add($.__views.label_contupdfg);
    $.__views.label_contupdfg1 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        font: {
            fontFamily: "Helvetica",
            fontSize: "8dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        text: "Turn ON/OFF FOREGROUND continous capture",
        apiName: "Ti.UI.Label",
        id: "label_contupdfg1",
        top: "30",
        left: "20",
        classes: []
    });
    $.__views.row_contupdfg.add($.__views.label_contupdfg1);
    $.__views.switch_contupdfg = Ti.UI.createSwitch({
        value: false,
        apiName: "Ti.UI.Switch",
        id: "switch_contupdfg",
        right: "20",
        titleOff: "OFF",
        titleOn: "ON",
        classes: []
    });
    $.__views.row_contupdfg.add($.__views.switch_contupdfg);
    $.__views.__alloyId63 = Ti.UI.createTableViewSection({
        apiName: "Ti.UI.TableViewSection",
        headerTitle: "Data (Optional)",
        id: "__alloyId63",
        classes: []
    });
    __alloyId61.push($.__views.__alloyId63);
    $.__views.row_loaddata = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_loaddata",
        Title: "Load Data",
        classes: []
    });
    $.__views.__alloyId63.add($.__views.row_loaddata);
    $.__views.label_loaddata = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        text: "Load Data >",
        apiName: "Ti.UI.Label",
        id: "label_loaddata",
        top: "5",
        left: "20",
        classes: []
    });
    $.__views.row_loaddata.add($.__views.label_loaddata);
    $.__views.row_loaddataoutput = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_loaddataoutput",
        Title: "Load Data",
        classes: []
    });
    $.__views.__alloyId63.add($.__views.row_loaddataoutput);
    $.__views.label_loaddataoutput = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        text: "Load Data Output >",
        apiName: "Ti.UI.Label",
        id: "label_loaddataoutput",
        top: "5",
        left: "20",
        classes: []
    });
    $.__views.row_loaddataoutput.add($.__views.label_loaddataoutput);
    $.__views.__alloyId64 = Ti.UI.createTableViewSection({
        apiName: "Ti.UI.TableViewSection",
        headerTitle: "Utilities",
        id: "__alloyId64",
        classes: []
    });
    __alloyId61.push($.__views.__alloyId64);
    $.__views.row_debug = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_debug",
        Title: "Debug",
        classes: []
    });
    $.__views.__alloyId64.add($.__views.row_debug);
    $.__views.label_debug = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Debugging ON/OFF",
        apiName: "Ti.UI.Label",
        id: "label_debug",
        top: "5",
        left: "20",
        classes: []
    });
    $.__views.row_debug.add($.__views.label_debug);
    $.__views.switch_debug = Ti.UI.createSwitch({
        apiName: "Ti.UI.Switch",
        id: "switch_debug",
        right: "20",
        titleOff: "OFF",
        titleOn: "ON",
        classes: []
    });
    $.__views.row_debug.add($.__views.switch_debug);
    $.__views.row_mindebug = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_mindebug",
        Title: "Debug",
        classes: []
    });
    $.__views.__alloyId64.add($.__views.row_mindebug);
    $.__views.label_mindebug = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Minimum Debugging ON/OFF",
        apiName: "Ti.UI.Label",
        id: "label_mindebug",
        top: "5",
        left: "20",
        classes: []
    });
    $.__views.row_mindebug.add($.__views.label_mindebug);
    $.__views.switch_mindebug = Ti.UI.createSwitch({
        value: true,
        apiName: "Ti.UI.Switch",
        id: "switch_mindebug",
        right: "20",
        titleOff: "OFF",
        titleOn: "ON",
        classes: []
    });
    $.__views.row_mindebug.add($.__views.switch_mindebug);
    $.__views.row_emaildebug = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_emaildebug",
        Title: "Email Debug",
        classes: []
    });
    $.__views.__alloyId64.add($.__views.row_emaildebug);
    $.__views.label_emaildebug = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        text: "Email Debug Data",
        apiName: "Ti.UI.Label",
        id: "label_emaildebug",
        left: "20",
        classes: []
    });
    $.__views.row_emaildebug.add($.__views.label_emaildebug);
    $.__views.row_caplocdata = Ti.UI.createTableViewRow({
        apiName: "Ti.UI.TableViewRow",
        id: "row_caplocdata",
        Title: "CapLocData",
        classes: []
    });
    $.__views.__alloyId64.add($.__views.row_caplocdata);
    $.__views.label_caplocdata = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        text: "Captured Location Data",
        apiName: "Ti.UI.Label",
        id: "label_caplocdata",
        left: "20",
        classes: []
    });
    $.__views.row_caplocdata.add($.__views.label_caplocdata);
    $.__views.table_settings = Ti.UI.createTableView({
        backgroundColor: "black",
        data: __alloyId61,
        apiName: "Ti.UI.TableView",
        id: "table_settings",
        classes: []
    });
    $.__views.win_settings.add($.__views.table_settings);
    $.__views.tab_settings = Ti.UI.createTab({
        window: $.__views.win_settings,
        apiName: "Ti.UI.Tab",
        id: "tab_settings",
        classes: []
    });
    $.__views.tab_settings && $.addTopLevelView($.__views.tab_settings);
    var __alloyId65 = function() {
        $.switch_debug.value = _.isFunction(Alloy.Models.dummy.transform) ? Alloy.Models.dummy.transform()["debugvalue"] : _.template("<%=dummy.debugvalue%>", {
            dummy: Alloy.Models.dummy.toJSON()
        });
    };
    Alloy.Models.dummy.on("fetch change destroy", __alloyId65);
    exports.destroy = function() {
        Alloy.Models.dummy.off("fetch change destroy", __alloyId65);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    var someDummy = Alloy.Models.dummy;
    console.log("stringify dummy :" + JSON.stringify(someDummy));
    someDummy.set("id", "1234");
    someDummy.fetch();
    display();
    1 == Titanium.App.Properties.getInt("maildebug") && someDummy.set("debugvalue", true);
    exports.openMainWindow = function(_tab) {
        _tab.open($.win_settings);
        console.debug("This is child widow settings.js" + _tab);
    };
    loc = Titanium.App.Properties.getString("loc") ? Titanium.App.Properties.getString("loc") : "newberlin";
    $.switch_contupdfg.addEventListener("change", function() {
        var switchFGValue = $.switch_contupdfg.value;
        Ti.API.info("switch value :" + switchFGValue);
        if (true == switchFGValue) {
            Alloy.Globals.eventDetectTollPlaza("newberlin", "add");
            alert("Detect TollPlaza is ON");
        } else {
            Alloy.Globals.eventDetectTollPlaza("newberlin", "remove");
            alert("Detect TollPlaza is OFF");
        }
    });
    $.row_loaddata.addEventListener("click", function() {
        var tabViewLoadDataController = Alloy.createController("TV1loadData");
        tabViewLoadDataController.openMainWindow($.tab_settings);
    });
    $.row_loaddataoutput.addEventListener("click", function() {
        var tabViewLoadDataOutputController = Alloy.createController("TV1loadDataOutput");
        tabViewLoadDataOutputController.openMainWindow($.tab_settings);
    });
    $.switch_debug.addEventListener("change", function() {
        var switchdebugValue = $.switch_debug.value;
        Ti.API.info("debugging is :" + switchdebugValue);
        if (true == switchdebugValue) {
            Titanium.App.Properties.setInt("maildebug", "1");
            someDummy.set("debugvalue", true);
        } else {
            Titanium.App.Properties.setInt("maildebug", "0");
            someDummy.set("debugvalue", false);
        }
    });
    $.switch_mindebug.addEventListener("change", function() {
        var switchmindebugValue = $.switch_mindebug.value;
        Ti.API.info("Minimum debugging is :" + switchmindebugValue);
        true == switchmindebugValue ? Titanium.App.Properties.setInt("mindebug", "1") : Titanium.App.Properties.setInt("mindebug", "0");
    });
    $.label_emaildebug.addEventListener("click", function() {
        sendEmail();
    });
    $.label_caplocdata.addEventListener("click", function() {
        var locfile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, "location.txt");
        if (locfile.exists()) {
            var contentsin = locfile.read();
            var contents = csvJSON(contentsin.text);
            console.log(contents);
            var contents = JSON.parse(contents);
            for (var i = 0; i < +contents.length; i++) {
                Update = contents[i].Date ? 1 : 0;
                console.log("Updating location DB with :" + contents[i].Date + "," + contents[i].LAT + "," + contents[i].LON + "," + contents[i].Timestamp);
                if (1 == Update) {
                    Alloy.Collections.plazano.deleteTollPlaza(contents[i].Date);
                    var locationModel = Alloy.createModel("plazano", {
                        tollplaza: contents[i].Date,
                        latitude: contents[i].LAT,
                        longitude: contents[i].LON,
                        altitude: "0",
                        heading: "0",
                        speed: "0",
                        hwy: "0",
                        accuracy: "0",
                        timestamp: contents[i].Timestamp,
                        altitudeAccuracy: "0",
                        cost: "0",
                        source: "0",
                        location: "none",
                        note: "none"
                    });
                    locationModel.save();
                }
            }
        } else console.log("no locfile");
        var tabViewCapLocDataController = Alloy.createController("caplocdata");
        tabViewCapLocDataController.openMainWindow($.tab_settings);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;